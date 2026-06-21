const fs = require('fs');
const path = require('path');

const servicesDir = path.join(__dirname, '..', 'src', 'pages', 'services');
const servicePages = [
  'entwicklung/index.astro',
  'devsecops/index.astro',
  'it-service/index.astro',
  'smarthome/index.astro',
  'design/index.astro'
];

servicePages.forEach(file => {
  const filePath = path.join(servicesDir, file);
  if (!fs.existsSync(filePath)) {
    console.log(`File not found: ${filePath}`);
    return;
  }
  
  console.log(`Processing: ${file}`);
  let content = fs.readFileSync(filePath, 'utf8');
  
  // 1. Inject gsap-fadein into <header class="..."> (avoiding duplicate class names)
  content = content.replace(/<header class="(?![^"]*gsap-fadein)/g, '<header class="gsap-fadein ');
  
  // 2. Inject gsap-fadein into <article class="..."> (avoiding duplicate class names)
  // Let's add delay to cards by modifying card rendering or adding inline delays.
  // Wait, let's just add the class first.
  content = content.replace(/<article class="(?![^"]*gsap-fadein)/g, '<article class="gsap-fadein ');
  
  // 3. Inject gsap-fadein into the CTA container (usually max-w-3xl text-center)
  content = content.replace(/<div class="mx-auto max-w-3xl text-center(?![^"]*gsap-fadein)/g, '<div class="mx-auto max-w-3xl text-center gsap-fadein');
  
  // 4. Inject gsap-fadein into FAQ section headers
  content = content.replace(/<h2 id="[^"]*-faq-heading" class="(?![^"]*gsap-fadein)/g, (match) => match + 'gsap-fadein ');
  content = content.replace(/<h2 class="text-3xl font-bold text-center mb-12(?![^"]*gsap-fadein)/g, '<h2 class="text-3xl font-bold text-center mb-12 gsap-fadein');
  
  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`Successfully updated: ${file}`);
});

console.log('Finished injecting gsap-fadein classes.');
