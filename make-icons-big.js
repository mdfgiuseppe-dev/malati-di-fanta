const sharp = require('sharp');
const fs = require('fs');

async function makeIcon(inputFile, size) {
  try {
    // Leggi metadata per crop intelligente
    const image = sharp(inputFile);
    const metadata = await image.metadata();

    console.log(`📸 Input: ${metadata.width}x${metadata.height}px`);

    // Crop quadrato dal centro (la parte più importante del logo)
    const cropSize = Math.min(metadata.width, metadata.height);
    const cropX = Math.max(0, Math.floor((metadata.width - cropSize) / 2));
    const cropY = Math.max(0, Math.floor((metadata.height - cropSize) / 2));

    console.log(`✂️ Crop: ${cropSize}x${cropSize} da (${cropX},${cropY})`);

    const tempFile = `./public/icon-${size}.png.tmp`;

    // Crop → resize a grandezza piena (100%) → sfondo trasparente
    await sharp(inputFile)
      .extract({ left: cropX, top: cropY, width: cropSize, height: cropSize })
      .resize(size, size, { fit: 'fill' })
      .png({ quality: 95 })
      .toFile(tempFile);

    fs.renameSync(tempFile, `./public/icon-${size}.png`);
    console.log(`✅ icon-${size}.png: ${size}x${size}px (100% riempito)`);
  } catch (err) {
    console.error(`❌ Errore: ${err.message}`);
    process.exit(1);
  }
}

async function main() {
  await makeIcon('./public/logo-full.png', 192);
  await makeIcon('./public/logo-full.png', 512);
  console.log('✅ Icone create (logo GRANDE)!');
}

main();
