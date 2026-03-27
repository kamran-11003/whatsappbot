const fs = require('fs');
const {
  APP_CONFIG,
  SERVICE_TREE,
  LOCATIONS,
  LOCATIONS_UR,
  LOCATION_KEYS
} = require('./src/services.js');
const { DETAILS } = require('./src/seed.js');

let md = '# Complete Services Directory\n\n';
md += 'This document contains all the provinces, categories, and specific services offered by the WhatsApp bot, along with their bilingual details.\n\n';

for (let i = 0; i < LOCATION_KEYS.length; i++) {
  const locKey = LOCATION_KEYS[i];
  const locEn = LOCATIONS[i];
  const locUr = LOCATIONS_UR[i];
  
  md += `## 📍 ${locEn} | ${locUr}\n\n`;
  
  const tree = SERVICE_TREE[locKey];
  if (!tree) continue;
  
  if (tree.hasTabs) {
    for (const [tabKey, tabData] of Object.entries(tree.tabs)) {
      md += `### ${tabData.labelEn} | ${tabData.labelUr}\n\n`;
      for (const cat of tabData.categories) {
        md += `#### ${cat.labelEn} | ${cat.labelUr}\n\n`;
        for (const svc of cat.services) {
          md += `**Service:** ${svc.labelEn} | ${svc.labelUr}\n\n`;
          let detailStr = DETAILS[svc.id] || 'Details not found';
          md += '```text\n' + detailStr + '\n```\n\n';
        }
      }
    }
  } else {
    for (const cat of tree.categories) {
      md += `### ${cat.labelEn} | ${cat.labelUr}\n\n`;
      for (const svc of cat.services) {
        md += `**Service:** ${svc.labelEn} | ${svc.labelUr}\n\n`;
        let detailStr = DETAILS[svc.id] || 'Details not found';
        md += '```text\n' + detailStr + '\n```\n\n';
      }
    }
  }
}

fs.writeFileSync('c:\\\\Users\\\\zainy\\\\.gemini\\\\antigravity\\\\brain\\\\9744b476-fbbe-4d96-92c4-e29221edcffb\\\\services_directory.md', md);
console.log('Done writing artifact!');
