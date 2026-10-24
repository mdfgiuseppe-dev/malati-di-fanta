const fs = require('fs');
const https = require('https');

// Scarica l'immagine da Google Drive
https.get('https://drive.google.com/thumbnail?id=1KTDVuBrY8DTvva0RlyGknFaCCZmHOul1&sz=w512', (res) => {
  const chunks = [];
  res.on('data', chunk => chunks.push(chunk));
  res.on('end', () => {
    const buffer = Buffer.concat(chunks);
    fs.writeFileSync('./public/icon-512.png', buffer);
    console.log('✅ icon-512.png salvato');
    process.exit(0);
  });
}).on('error', err => {
  console.error('❌ Errore:', err.message);
  process.exit(1);
});
