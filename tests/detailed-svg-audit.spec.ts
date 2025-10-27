import { test, expect } from '@playwright/test';

const pages = [
  { name: 'Homepage', url: '/' },
  { name: 'Silvacore', url: '/silvacore/' },
  { name: 'Ecodrive', url: '/ecodrive/' },
  { name: 'Socialverse', url: '/socialverse/' },
  { name: 'Über-mich', url: '/ueber-mich/' },
  { name: 'Service-Entwicklung', url: '/services/entwicklung/' },
  { name: 'Service-DevSecOps', url: '/services/devsecops/' },
  { name: 'Service-Design', url: '/services/design/' },
  { name: 'Service-IT-Service', url: '/services/it-service/' },
  { name: 'Service-SmartHome', url: '/services/smarthome/' },
];

test.describe('Detailed SVG Audit - Find all SVG Icons', () => {
  for (const page of pages) {
    test(`Analyze SVGs: ${page.name}`, async ({ page: browserPage }) => {
      await browserPage.goto(page.url);
      await browserPage.waitForLoadState('networkidle');
      
      // Scroll nach unten und zurück
      await browserPage.evaluate(async () => {
        window.scrollTo(0, document.body.scrollHeight);
        await new Promise(resolve => setTimeout(resolve, 500));
        window.scrollTo(0, 0);
      });
      await browserPage.waitForTimeout(3000);
      
      // Finde alle SVG-Elemente und ihre Kontexte
      const svgDetails = await browserPage.evaluate(() => {
        const svgs = Array.from(document.querySelectorAll('svg'));
        
        return svgs.map((svg, index) => {
          // Finde das nächste Elternelement mit einer Klasse oder ID
          let parent = svg.parentElement;
          let context = '';
          let depth = 0;
          
          while (parent && depth < 5) {
            if (parent.className || parent.id) {
              const classes = parent.className?.toString().split(' ').slice(0, 3).join(' ') || '';
              context = `${parent.tagName}${parent.id ? '#' + parent.id : ''}${classes ? '.' + classes.replace(/\s+/g, '.') : ''}`;
              break;
            }
            parent = parent.parentElement;
            depth++;
          }
          
          // Hole den vorherigen Text-Content für Kontext
          let textBefore = '';
          let prevSibling = svg.previousElementSibling;
          if (prevSibling) {
            textBefore = prevSibling.textContent?.trim().substring(0, 50) || '';
          }
          
          // Hole das viewBox für Icon-Identifikation
          const viewBox = svg.getAttribute('viewBox') || '';
          const svgClasses = svg.className?.baseVal || '';
          
          return {
            index: index + 1,
            context,
            textBefore,
            viewBox,
            classes: svgClasses,
            width: svg.getAttribute('width') || 'auto',
            height: svg.getAttribute('height') || 'auto',
          };
        });
      });
      
      // Finde alle FA-Icons für Vergleich
      const faIconsCount = await browserPage.locator('i[class*="fa-"]').count();
      
      console.log(`\n${'='.repeat(80)}`);
      console.log(`📊 ${page.name} - SVG Audit`);
      console.log(`${'='.repeat(80)}`);
      console.log(`Total SVGs: ${svgDetails.length}`);
      console.log(`Total FA-Icons: ${faIconsCount}`);
      console.log(`Coverage: ${Math.round((faIconsCount / (faIconsCount + svgDetails.length)) * 100)}% FA-Icons\n`);
      
      if (svgDetails.length > 0) {
        console.log('🔍 SVG Details:\n');
        svgDetails.slice(0, 20).forEach((svg) => {
          console.log(`  [${svg.index}] ${svg.context || 'No context'}`);
          if (svg.textBefore) {
            console.log(`      Text: "${svg.textBefore}"`);
          }
          if (svg.viewBox) {
            console.log(`      ViewBox: ${svg.viewBox}`);
          }
          if (svg.classes) {
            console.log(`      Classes: ${svg.classes}`);
          }
          console.log('');
        });
        
        if (svgDetails.length > 20) {
          console.log(`  ... und ${svgDetails.length - 20} weitere SVGs\n`);
        }
      }
      
      // Gruppiere SVGs nach Kontext
      const groupedByContext = svgDetails.reduce((acc, svg) => {
        const key = svg.context || 'Unknown';
        if (!acc[key]) {
          acc[key] = 0;
        }
        acc[key]++;
        return acc;
      }, {} as Record<string, number>);
      
      console.log('📦 SVGs gruppiert nach Kontext:');
      Object.entries(groupedByContext)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 10)
        .forEach(([context, count]) => {
          console.log(`  ${count}x - ${context}`);
        });
      console.log('');
    });
  }
});
