const sharp = require('sharp');
const fs = require('fs');

async function makeIcon(inputFile, size) {
  try {
    const tempFile = `./public/icon-${size}.png.tmp`;
    const reducedSize = Math.floor(size * 0.85);  // 85% della dimensione

    // Ridimensiona a 85%, poi centra in uno spazio più grande con padding
    await sharp(inputFile)
      .resize(reducedSize, reducedSize, {
        fit: 'contain',
        background: { r: 0, g: 0, b: 0, alpha: 0 }
      })
      .extend({
        top: Math.floor((size - reducedSize) / 2),
        bottom: Math.ceil((size - reducedSize) / 2),
        left: Math.floor((size - reducedSize) / 2),
        right: Math.ceil((size - reducedSize) / 2),
        background: { r: 0, g: 0, b: 0, alpha: 0 }
      })
      .png({ quality: 95 })
      .toFile(tempFile);

    fs.renameSync(tempFile, `./public/icon-${size}.png`);
    console.log(`✅ icon-${size}.png: ${size}x${size}px (logo 85%, NOT tagliato)`);
  } catch (err) {
    console.error(`❌ Errore: ${err.message}`);
    process.exit(1);
  }
}

async function main() {
  await makeIcon('./public/logo-original.png', 192);
  await makeIcon('./public/logo-original.png', 512);
  console.log('✅ Icone create (logo ridotto 85%, SAFE)!');
}

main();
