const fs = require('fs');
const path = require('path');

const suiteDir = path.join(__dirname, '..', 'src', 'pages', 'suite');
const pagesConfig = {
  'index.astro': { particle: '#0ea5e9', line: '#6366f1', depth: 2 },
  'forge/index.astro': { particle: '#22c55e', line: '#10b981', depth: 3 },
  'aether/index.astro': { particle: '#f43f5e', line: '#ec4899', depth: 3 },
  'ecodrive/index.astro': { particle: '#10b981', line: '#06b6d4', depth: 3 },
  'socialverse/index.astro': { particle: '#8b5cf6', line: '#6366f1', depth: 3 },
  'portal/index.astro': { particle: '#0ea5e9', line: '#3b82f6', depth: 3 },
  'preise/index.astro': { particle: '#eab308', line: '#6366f1', depth: 3 },
  'properties/index.astro': { particle: '#f97316', line: '#f43f5e', depth: 3 },
  'relay/index.astro': { particle: '#06b6d4', line: '#3b82f6', depth: 3 },
  'conductor/index.astro': { particle: '#6366f1', line: '#8b5cf6', depth: 3 },
  'treasury/index.astro': { particle: '#eab308', line: '#f97316', depth: 3 }
};

Object.entries(pagesConfig).forEach(([file, colors]) => {
  const filePath = path.join(suiteDir, file);
  if (!fs.existsSync(filePath)) {
    console.log(`File not found: ${filePath}`);
    return;
  }
  
  console.log(`Processing Suite Page: ${file}`);
  let content = fs.readFileSync(filePath, 'utf8');
  
  // 1. Inject import
  const relativePrefix = '../'.repeat(colors.depth);
  const importStatement = `import InteractiveHeroCanvas from '${relativePrefix}components/InteractiveHeroCanvas.astro';`;
  
  if (!content.includes('import InteractiveHeroCanvas')) {
    // Find the first line after --- frontmatter start
    const parts = content.split('---');
    if (parts.length >= 3) {
      parts[1] = '\n' + importStatement + parts[1];
      content = parts.join('---');
    }
  }
  
  // 2. Inject canvas tag inside the first <section> container
  // We want to find the first <section> and inject the canvas right after its start tag.
  const sectionRegex = /(<section[^>]*class="[^"]*relative[^"]*pt-[^"]*")>/;
  if (!content.includes('InteractiveHeroCanvas') || content.indexOf('<InteractiveHeroCanvas') === -1) {
    // Wait, let's verify if there is a relative section
    const match = content.match(sectionRegex);
    if (match) {
      const fullSectionTag = match[0];
      const canvasTag = `\n    <!-- Three.js Interactive WebGL Background -->\n    <InteractiveHeroCanvas particleColor="${colors.particle}" lineColor="${colors.line}" />\n`;
      content = content.replace(sectionRegex, `${fullSectionTag}>\n    ${canvasTag}`);
    } else {
      // Fallback: find first <section> tag
      const fallbackRegex = /(<section[^>]*>)/;
      const matchFallback = content.match(fallbackRegex);
      if (matchFallback) {
        const fullSectionTag = matchFallback[0];
        const canvasTag = `\n    <!-- Three.js Interactive WebGL Background -->\n    <InteractiveHeroCanvas particleColor="${colors.particle}" lineColor="${colors.line}" />\n`;
        content = content.replace(fallbackRegex, `${fullSectionTag}\n    ${canvasTag}`);
      }
    }
  }
  
  // 3. Inject gsap-fadein classes to section headers & grids (except the hero itself)
  content = content.replace(/<header class="(?![^"]*gsap-fadein)/g, '<header class="gsap-fadein ');
  content = content.replace(/<article class="(?![^"]*gsap-fadein)/g, '<article class="gsap-fadein ');
  content = content.replace(/<div class="mx-auto max-w-3xl text-center(?![^"]*gsap-fadein)/g, '<div class="mx-auto max-w-3xl text-center gsap-fadein');
  
  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`Successfully updated Suite Page: ${file}`);
});

console.log('Finished Suite pages updates.');
