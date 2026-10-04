const puppeteer = require('puppeteer');

(async () => {
  let browser;
  try {
    browser = await puppeteer.launch({ headless: 'new' });
    const page = await browser.newPage();

    console.log('🌐 Aprendo localhost:8000...');
    await page.goto('http://localhost:8000', { waitUntil: 'networkidle2' });

    console.log('🗑️  Pulisco localStorage...');
    await page.evaluate(() => {
      localStorage.clear();
      sessionStorage.clear();
    });

    console.log('♻️  Ricarico la pagina...');
    await page.reload({ waitUntil: 'networkidle2' });

    // Prendi screenshot
    await page.screenshot({ path: 'screenshot.png' });
    console.log('📸 Screenshot salvato: screenshot.png');

    // Estrai dati dalla pagina
    const pageInfo = await page.evaluate(() => ({
      title: document.title,
      localStorage: { count: Object.keys(localStorage).length },
      hasErrors: !!document.querySelector('[style*="error"]'),
      isLoaded: !document.querySelector('#page-splash.active')
    }));

    console.log('\n✅ Risultati:');
    console.log('  Titolo:', pageInfo.title);
    console.log('  localStorage items:', pageInfo.localStorage.count);
    console.log('  Errori visibili:', pageInfo.hasErrors ? 'Sì ⚠️' : 'No ✓');
    console.log('  Pagina caricata:', pageInfo.isLoaded ? 'Sì ✓' : 'No (splash screen)');

  } catch (error) {
    console.error('❌ Errore:', error.message);
  } finally {
    if (browser) await browser.close();
  }
})();
