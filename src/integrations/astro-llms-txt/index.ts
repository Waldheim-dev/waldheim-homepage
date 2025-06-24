import type { AstroIntegration } from 'astro';
import fs from 'fs';
import path from 'path';
import glob from 'fast-glob';
import { fileURLToPath } from 'node:url';
import ollama from 'ollama';
import OpenAI from 'openai';
import {GoogleGenAI} from '@google/genai';

/**
 * Optionen für das llms.txt-Plugin
 */
export interface LlmsTxtOptions {
  projectName?: string;
  description?: string;
  sectionTitle?: string;
  aiProvider?: 'openai' | 'gemini' | 'ollama';
  aiApiKey?: string;
  aiModel?: string;
  aiUrl?: string;
  site?: string; // Domain/URL für llms.txt-Links
  maxInputLength?: number; // Maximale Länge für KI-Input
}

/**
 * Astro Integration: llms.txt Generator
 *
 * Dieses Plugin erzeugt bei jedem Astro-Build eine LLM-optimierte llms.txt im Build-Output.
 * Es extrahiert relevante Inhalte aus allen gerenderten HTML-Seiten, fasst sie per KI (Ollama, OpenAI, Gemini) zusammen
 * und gibt sie mit vollqualifizierten Web-URLs aus. Die Einträge werden nach Root-Sections (z. B. /blog/, /services/) gruppiert.
 *
 * Features:
 * - Extraktion von Titel, Description, H1, H2, H3, allen <p>-Texten
 * - KI-gestützte Zusammenfassung (Provider/Modell/Key/Endpoint konfigurierbar)
 * - KI-Response-Caching (SHA256, .llms-txt-cache im dist)
 * - Robuste Entfernung lokaler Pfadanteile (OS-unabhängig)
 * - Section-Gruppierung nach Web-Pfad
 * - Debug-Logging, Fehlererkennung, Build-Abbruch bei Fehlern
 *
 * @param {LlmsTxtOptions} options - Konfiguration für das Plugin
 * @returns {AstroIntegration}
 */
export default function llmsTxtIntegration(options: LlmsTxtOptions = {}): AstroIntegration {
  const {
    projectName = 'Projektname',
    description = 'Automatisch generierte Übersicht für LLMs.',
    sectionTitle = 'Seitenübersicht',
    site = '',
    maxInputLength = 8000,
  } = options;
  return {
    name: 'astro-llms-txt',
    hooks: {
      'astro:build:done': async ({ dir, logger }) => {
        // 1. Alle HTML-Seiten im dist/-Verzeichnis finden
        const distPath = fileURLToPath(dir);
        // Nutze path.resolve für distPath, falls fileURLToPath ein relativer Pfad ist
        const resolvedDistPath = path.resolve(distPath);
        logger.info(`Starte llms.txt-Generierung für ${projectName}... (Suche in: ${resolvedDistPath})`);
        const htmlFiles = await glob('**/*.html', { cwd: resolvedDistPath, absolute: true });
        logger.info('Gefundene HTML-Dateien: ' + JSON.stringify(htmlFiles));
        if (!htmlFiles.length) {
          logger.error('Keine HTML-Dateien im Build-Output gefunden! Prüfe Astro-Konfiguration ("outDir") und baue das Projekt vollständig.');
          throw new Error('Build abgebrochen: Keine HTML-Dateien gefunden.');
        }
        // Ollama als Default-Provider
        const aiProvider = options.aiProvider || 'ollama';
        const aiApiKey = options.aiApiKey || '';
        const aiModel = options.aiModel || 'llama3';
        const aiPrompt = 'Fasse den folgenden Webseiteninhalt für LLMs in 2 Sätzen prägnant zusammen:';
        // KI-Requests jetzt SEQUENZIELL statt parallel
        const pageInfos = [];
        // Cache-Verzeichnis anlegen
        const cacheDir = path.join(resolvedDistPath, '.llms-txt-cache');
        if (!fs.existsSync(cacheDir)) fs.mkdirSync(cacheDir);
        // Basis-URL aus der Astro-Konfiguration (site) verwenden
        const baseUrl = site ? site.replace(/\/$/, '') : '';
        for (const file of htmlFiles) {
          const html = fs.readFileSync(file, 'utf-8');
          // --- URL-Korrektur: Nur Web-Pfad ab /dist/ verwenden, OS-unabhängig ---
          // 1. Relativen Pfad ab dist ermitteln (funktioniert für Windows & Unix)
          let relUrl = path.relative(resolvedDistPath, file).replace(/\\/g, '/');
          if (!relUrl.startsWith('/')) relUrl = '/' + relUrl;
          relUrl = relUrl.replace(/index\.html$/, '');
          // 2. Sicherstellen, dass keine lokalen Pfadanteile (z. B. C:/Users/...) enthalten sind
          //    (path.relative entfernt bereits den absoluten Teil)
          // 3. Optional: /dist/ am Anfang entfernen, falls noch vorhanden
          relUrl = relUrl.replace(/^\/dist\//, '/');
          // 4. Doppelte Slashes vermeiden
          relUrl = relUrl.replace(/\/+/g, '/');
          // 5. Basis-URL aus der Astro-Konfiguration (site) verwenden
          const fullUrl = baseUrl + relUrl;
          logger.info(`Verarbeite Datei: ${file}`);
          const title = extractTagContent(html, 'title');
          const description = extractMetaContent(html, 'description');
          const h1 = extractTagContent(html, 'h1');
          const firstP = extractTagContent(html, 'p');
          // logger.info(`URL: ${url} | Title: ${title} | H1: ${h1} | FirstP: ${firstP}`); // entfernt, da zu viel Logging
          // Mehr Kontext für die KI: Titel, H1, erster Absatz, alle H2 und H3, alle p-Texte
          const h2s = Array.from(html.matchAll(/<h2[^>]*>([\s\S]*?)<\/h2>/gi)).map(m => m[1].trim()).join('\n');
          const h3s = Array.from(html.matchAll(/<h3[^>]*>([\s\S]*?)<\/h3>/gi)).map(m => m[1].trim()).join('\n');
          const allPs = Array.from(html.matchAll(/<p[^>]*>([\s\S]*?)<\/p>/gi)).map(m => m[1].trim()).join(' ');
          const kiInput = [title, h1, h2s, h3s, allPs].filter(Boolean).join('\n');
          // Input für KI ggf. beschneiden
          const kiInputShort = kiInput.length > maxInputLength ? kiInput.slice(0, maxInputLength) : kiInput;
          let summary = description || firstP;
          if (aiProvider && summary) {
            try {
              summary = await generateAISummary(logger, aiProvider, aiApiKey, aiModel, aiPrompt, kiInputShort, options.aiUrl, cacheDir);
              if (!summary) {
                logger.warn('KI hat keine Antwort geliefert oder die Antwort war leer!');
              }
            } catch (e) {
              logger.warn('KI-Zusammenfassung fehlgeschlagen: ' + (e instanceof Error ? e.message : String(e)));
            }
          }
          pageInfos.push({
            url: fullUrl,
            title: title || h1,
            summary,
          });
        }
        // Prüfe, ob mindestens eine Seite eine nicht-leere KI-Antwort/Summary hat
        const validPages = pageInfos.filter(info => info.summary && info.summary.trim().length > 0);
        if (!validPages.length) {
          logger.error('Keine KI-Antworten/Summaries für Seiten erhalten! Build wird abgebrochen.');
          throw new Error('Build abgebrochen: Keine KI-Antworten/Summaries erhalten.');
        }
        // Gruppiere Seiten nach Root-Section
        // baseUrl muss hier im Scope sein
        const sectionMap = new Map();
        for (const info of pageInfos) {
          const match = info.url.replace(baseUrl, '').match(/^\/([^/]+)\//);
          const section = match ? match[1] : 'Allgemein';
          if (!sectionMap.has(section)) sectionMap.set(section, []);
          sectionMap.get(section).push(info);
        }
        // 2. llms.txt-Inhalt generieren (Basisstruktur)
        let llmsTxt = `# ${projectName}\n\n`;
        llmsTxt += `> ${description}\n\n`;
        for (const [section, entries] of sectionMap.entries()) {
          llmsTxt += `## ${section.charAt(0).toUpperCase() + section.slice(1)}\n\n`;
          for (const info of entries) {
            llmsTxt += `- [${info.url}](${info.url}): ${info.title} ${info.summary}\n`;
          }
          llmsTxt += '\n';
        }
        logger.info('llms.txt Inhalt: ' + llmsTxt);
        // 3. Datei speichern
        const outPath = path.join(distPath, 'llms.txt');
        fs.writeFileSync(outPath, llmsTxt, 'utf-8');
        logger.info('llms.txt erfolgreich erstellt!');
      },
    },
  };
}

/**
 * Generiert eine KI-Zusammenfassung für den gegebenen Text.
 * @param logger {any} Astro Logger-Objekt (typisiert als any, da AstroLogger nicht exportiert wird)
 * @param provider {string} KI-Provider ('ollama', 'openai', 'gemini')
 * @param apiKey {string} API-Key für den Provider
 * @param model {string} Modellname
 * @param prompt {string} Prompt für die KI
 * @param text {string} Input-Text
 * @param aiUrl {string} Optional: URL für Ollama-API
 * @param cacheDir {string} Optional: Cache-Verzeichnis
 * @returns {Promise<string>} KI-Zusammenfassung
 */
async function generateAISummary(
  logger: any,
  provider: string,
  apiKey: string,
  model: string,
  prompt: string,
  text: string,
  aiUrl?: string,
  cacheDir?: string
): Promise<string> {
  if (!provider || (provider !== 'ollama' && !apiKey)) {
    logger.warn('[DEBUG] Kein KI-Provider angegeben oder API-Key fehlt! Es wird keine KI-Zusammenfassung erstellt.');
    return '';
  }
  // Caching: Erzeuge Hash aus Modell+Prompt+Text
  const crypto = await import('crypto');
  const hash = crypto.createHash('sha256').update([provider, model, prompt, text].join('||')).digest('hex');
  let cachePath = '';
  if (cacheDir) {
    cachePath = path.join(cacheDir, `${hash}.json`);
    if (fs.existsSync(cachePath)) {
      try {
        const cached = JSON.parse(fs.readFileSync(cachePath, 'utf-8'));
        if (cached && typeof cached.summary === 'string') {
          logger.info(`KI-Cache-Hit für Hash ${hash}`);
          return cached.summary;
        }
      } catch (e) {
        logger.warn('Fehler beim Lesen des KI-Caches: ' + (e instanceof Error ? e.message : String(e)));
      }
    }
  }
  // ...OpenAI, Gemini, Ollama-Logik wie zuvor...
  let summary = '';
  if (provider === 'openai') {
    logger.info('OpenAI-Request wird vorbereitet (SDK)...');
    try {
      const client = new OpenAI({ apiKey: apiKey });
      const completion = await client.responses.create({
        model: model || 'gpt-4o',
        instructions: prompt,
        input: text,
        temperature: 0.5
      });
      summary = completion.output_text?.trim() || '';
      // Nach erfolgreicher KI-Antwort cachen
      if (cacheDir && summary) {
        try {
          fs.writeFileSync(cachePath, JSON.stringify({ summary }), 'utf-8');
          logger.info(`KI-Response gecached unter ${cachePath}`);
        } catch (e) {
          logger.warn('Fehler beim Schreiben des KI-Caches: ' + (e instanceof Error ? e.message : String(e)));
        }
      }
    } catch (e) {
      logger.warn('OpenAI-SDK-Request fehlgeschlagen: ' + (e instanceof Error ? e.message : String(e)));
      summary = '';
    }
  }
  if (provider === 'gemini') {
    logger.info('Gemini-Request wird vorbereitet (SDK)...');
    try {
      // Dynamischer Import, damit das SDK nur bei Bedarf geladen wird
      const ai = new GoogleGenAI({ apiKey: apiKey });
      const response = await ai.models.generateContent({
        model: model || 'gemini-2.0-pro',
        contents: prompt + '\n' + text,
      });
      // Die SDK gibt die Antwort als response.text zurück
      summary = response.text?.trim() || '';
      // Nach erfolgreicher KI-Antwort cachen
      if (cacheDir && summary) {
        try {
          fs.writeFileSync(cachePath, JSON.stringify({ summary }), 'utf-8');
          logger.info(`KI-Response gecached unter ${cachePath}`);
        } catch (e) {
          logger.warn('Fehler beim Schreiben des KI-Caches: ' + (e instanceof Error ? e.message : String(e)));
        }
      }
    } catch (e) {
      logger.error('Gemini-SDK-Request fehlgeschlagen: ' + (e instanceof Error ? e.message : String(e)));
      summary = '';
    }
  }
  if (provider === 'ollama') {
    logger.info('Starte Ollama-Request (chat)...');
    // Retry-Mechanismus für Ollama
    const maxRetries = 5;
    const delayMs = 2000;
    let lastError = null;
    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      try {
        logger.info(`[OLLAMA-DEBUG] Versuch ${attempt}/${maxRetries}`);
        logger.info(`[OLLAMA-DEBUG] Modell: ${model || 'llama3'}`);
        logger.info(`[OLLAMA-DEBUG] Prompt: ${prompt}`);
        logger.info(`[OLLAMA-DEBUG] Input (erster Teil): ${text.substring(0, 500)}... (Länge: ${text.length})`);
        if (process.env.OLLAMA_HOST) {
          logger.info(`[OLLAMA-DEBUG] OLLAMA_HOST: ${process.env.OLLAMA_HOST}`);
        }
        const requestObj = {
          model: model || 'llama3',
          messages: [{ role: 'user', content: prompt + '\n' + text }],
        };
        logger.info('[OLLAMA-DEBUG] Request-Objekt: ' + JSON.stringify(requestObj));
        const response = await ollama.chat(requestObj);
        logger.info('[OLLAMA-DEBUG] RAW-Response: ' + JSON.stringify(response));
        if (!response.message?.content || !response.message.content.trim()) {
          logger.warn(`[OLLAMA-DEBUG] Antwort ist leer (Versuch ${attempt})!`);
          lastError = new Error('Ollama: Antwort ist leer');
        } else {
          summary = response.message.content.trim();
          // Nach erfolgreicher KI-Antwort cachen
          if (cacheDir && summary) {
            try {
              fs.writeFileSync(cachePath, JSON.stringify({ summary }), 'utf-8');
              logger.info(`KI-Response gecached unter ${cachePath}`);
            } catch (e) {
              logger.warn('Fehler beim Schreiben des KI-Caches: ' + (e instanceof Error ? e.message : String(e)));
            }
          }
          return summary;
        }
      } catch (e) {
        logger.warn(`[OLLAMA-DEBUG] Request fehlgeschlagen (Versuch ${attempt}): ` + (e instanceof Error ? e.stack || e.message : String(e)));
        lastError = e;
      }
      if (attempt < maxRetries) {
        logger.info(`[OLLAMA-DEBUG] Warte ${delayMs / 1000}s vor erneutem Versuch...`);
        await new Promise(resolve => setTimeout(resolve, delayMs));
      }
    }
    logger.error('Keine gültige Antwort nach mehreren Versuchen! Letzter Fehler: ' + (lastError instanceof Error ? lastError.stack || lastError.message : String(lastError)));
    return '';
  }
  return '';
}

function extractTagContent(html: string, tag: string): string {
  const match = html.match(new RegExp(`<${tag}[^>]*>([\s\S]*?)<\/${tag}>`, 'i'));
  return match ? match[1].trim() : '';
}

function extractMetaContent(html: string, name: string): string {
  const match = html.match(new RegExp(`<meta[^>]+name=["']${name}["'][^>]+content=["']([^"']+)["'][^>]*>`, 'i'));
  return match ? match[1].trim() : '';
}
