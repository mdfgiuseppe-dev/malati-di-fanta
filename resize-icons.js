const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

async function resizeIcon(inputFile, size) {
  try {
    const tempFile = inputFile + '.tmp';
    await sharp(inputFile)
      .resize(size, size, {
        fit: 'contain',
        background: { r: 26, g: 71, b: 42, alpha: 1 }
      })
      .png({ quality: 95 })
      .toFile(tempFile);

    fs.unlinkSync(inputFile);
    fs.renameSync(tempFile, inputFile);

    console.log(`✅ ${path.basename(inputFile)}: ${size}x${size}px`);
  } catch (err) {
    console.error(`❌ Errore: ${err.message}`);
    process.exit(1);
  }
}

async function main() {
  await resizeIcon('./public/icon-192.png', 192);
  await resizeIcon('./public/icon-512.png', 512);
  console.log('✅ Icone ridimensionate!');
}

main();
