const sharp = require('sharp');
const fs = require('fs');

async function makeIcon(origFile, size) {
  try {
    const tempFile = `./public/icon-${size}.png.tmp`;

    // Ridimensiona mantenendo aspect ratio, sfondo TRASPARENTE
    const resizeSize = Math.floor(size * 0.90);
    const padding = Math.ceil(size * 0.05);
    await sharp(origFile)
      .resize(resizeSize, resizeSize, { fit: 'inside', withoutEnlargement: true })
      .extend({
        top: padding,
        bottom: padding,
        left: padding,
        right: padding,
        background: { r: 0, g: 0, b: 0, alpha: 0 }
      })
      .png({ quality: 95 })
      .toFile(tempFile);

    fs.renameSync(tempFile, `./public/icon-${size}.png`);
    console.log(`✅ icon-${size}.png creato (sfondo bianco)`);
  } catch (err) {
    console.error(`❌ Errore ${size}: ${err.message}`);
    process.exit(1);
  }
}

async function main() {
  await makeIcon('./public/logo-max.png', 192);
  await makeIcon('./public/logo-max.png', 512);
  console.log('✅ Icone finali create!');
}

main();
