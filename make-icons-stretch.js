const sharp = require('sharp');
const fs = require('fs');

async function makeIcon(inputFile, size) {
  try {
    const tempFile = `./public/icon-${size}.png.tmp`;

    // Resize a 5% più grande, crop al centro, aspect ratio corretto
    const biggerSize = Math.ceil(size * 1.05);

    await sharp(inputFile)
      .resize(biggerSize, biggerSize, { fit: 'cover', withoutEnlargement: false })
      .extract({ left: Math.floor((biggerSize - size) / 2), top: Math.floor((biggerSize - size) / 2), width: size, height: size })
      .png({ quality: 95 })
      .toFile(tempFile);

    fs.renameSync(tempFile, `./public/icon-${size}.png`);
    console.log(`✅ icon-${size}.png: ${size}x${size}px (cover+crop, aspect ratio corretto)`);
  } catch (err) {
    console.error(`❌ Errore: ${err.message}`);
    process.exit(1);
  }
}

async function main() {
  await makeIcon('./public/logo-full.png', 192);
  await makeIcon('./public/logo-full.png', 512);
  console.log('✅ Icone create (aspect ratio corretto)!');
}

main();
