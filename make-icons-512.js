const sharp = require('sharp');
const fs = require('fs');

async function makeIcons(inputFile) {
  try {
    // Ridimensiona il logo 5% più grande, poi crop al centro
    const biggerSize = 512;  // 512px (no scaling)

    const logo512Full = await sharp(inputFile)
      .resize(biggerSize, biggerSize, {
        fit: 'contain',
        background: { r: 0, g: 0, b: 0, alpha: 0 }
      })
      .toBuffer();

    // Crop al centro per ottenere 512x512
    const logo512 = await sharp(logo512Full)
      .extract({
        left: Math.floor((biggerSize - 512) / 2),
        top: Math.floor((biggerSize - 512) / 2),
        width: 512,
        height: 512
      })
      .png({ quality: 95 })
      .toBuffer();

    fs.writeFileSync('./public/icon-512.png', logo512);
    console.log('✅ icon-512.png: 512x512px (logo +5%)');

    // Ridimensiona a 192
    const logo192 = await sharp(logo512)
      .resize(192, 192)
      .png({ quality: 95 })
      .toBuffer();

    fs.writeFileSync('./public/icon-192.png', logo192);
    console.log('✅ icon-192.png: 192x192px (+5%)');

    console.log('✅ Icone create (logo +5%)!');
  } catch (err) {
    console.error(`❌ Errore: ${err.message}`);
    process.exit(1);
  }
}

makeIcons('./public/logo-original.png');
