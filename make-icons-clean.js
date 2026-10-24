const sharp = require('sharp');
const fs = require('fs');

async function makeIcon(inputFile, size) {
  try {
    const tempFile = `./public/icon-${size}.png.tmp`;

    // Ridimensiona MANTENENDO aspect ratio (senza distorsioni)
    // Aggiunge padding trasparente se necessario per riempire lo spazio
    await sharp(inputFile)
      .resize(size, size, {
        fit: 'contain',
        background: { r: 0, g: 0, b: 0, alpha: 0 }
      })
      .png({ quality: 95 })
      .toFile(tempFile);

    fs.renameSync(tempFile, `./public/icon-${size}.png`);
    console.log(`✅ icon-${size}.png: ${size}x${size}px (NO distorsioni, aspect ratio perfetto)`);
  } catch (err) {
    console.error(`❌ Errore: ${err.message}`);
    process.exit(1);
  }
}

async function main() {
  await makeIcon('./public/logo.png', 192);
  await makeIcon('./public/logo.png', 512);
  console.log('✅ Icone create (clean, senza distorsioni)!');
}

main();
