const sharp = require('sharp');
const fs = require('fs');

async function recreateIcon(inputFile, size) {
  try {
    // Leggi l'immagine originale
    const image = sharp(inputFile);
    const metadata = await image.metadata();

    console.log(`📸 ${inputFile}: ${metadata.width}x${metadata.height}px originale`);

    // Crop intelligente: prendi il centro dell'immagine (che è più importante)
    const cropSize = Math.min(metadata.width, metadata.height);
    const cropX = Math.max(0, Math.floor((metadata.width - cropSize) / 2));
    const cropY = Math.max(0, Math.floor((metadata.height - cropSize) / 2));

    const tempFile = inputFile + '.tmp';

    // Crop → resize → sfondo bianco
    await sharp(inputFile)
      .extract({ left: cropX, top: cropY, width: cropSize, height: cropSize })
      .resize(size, size)
      .png({ quality: 95 })
      .toFile(tempFile);

    fs.unlinkSync(inputFile);
    fs.renameSync(tempFile, inputFile);

    console.log(`✅ ${inputFile}: ${size}x${size}px (crop intelligente)`);
  } catch (err) {
    console.error(`❌ Errore: ${err.message}`);
    process.exit(1);
  }
}

async function main() {
  await recreateIcon('./public/icon-192.png', 192);
  await recreateIcon('./public/icon-512.png', 512);
  console.log('✅ Icone ricreate!');
}

main();
