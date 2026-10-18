const sharp = require('sharp');
const fs = require('fs');

async function makeIcon(inputFile, size) {
  try {
    const tempFile = `./public/icon-${size}.png.tmp`;
    const logoSize = Math.floor(size * 0.75);  // Logo occupa 75% dello spazio

    // Crea icona con sfondo nero/blu scuro, logo centrato
    await sharp(inputFile)
      .resize(logoSize, logoSize, {
        fit: 'contain',
        background: { r: 0, g: 0, b: 0, alpha: 0 }
      })
      .extend({
        top: Math.floor((size - logoSize) / 2),
        bottom: Math.ceil((size - logoSize) / 2),
        left: Math.floor((size - logoSize) / 2),
        right: Math.ceil((size - logoSize) / 2),
        background: { r: 26, g: 42, b: 71, alpha: 1 }  // Blu scuro (#1a2a47)
      })
      .png({ quality: 95 })
      .toFile(tempFile);

    fs.renameSync(tempFile, `./public/icon-${size}.png`);
    console.log(`✅ icon-${size}.png: ${size}x${size}px (logo 75% + sfondo blu scuro)`);
  } catch (err) {
    console.error(`❌ Errore: ${err.message}`);
    process.exit(1);
  }
}

async function main() {
  await makeIcon('./public/logo-original.png', 192);
  await makeIcon('./public/logo-original.png', 512);
  console.log('✅ Icone create (logo + sfondo, NO tagliato)!');
}

main();
