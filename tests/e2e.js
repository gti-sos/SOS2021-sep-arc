const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto('https://sos2021-sep-arc.herokuapp.com/');
    
    await page.setViewport({ width: 2000, height: 750 });
    await page.screenshot({ path: './tests/imagenSchizophrenia.png' });

    const[response] = await Promise.all([
        page.waitForNavigation(),
        page.click("#apis > div > div > div.row > div.col-lg-4.col-md-4.text-center > div > a"),
    ]);
    await page.waitForTimeout(1000);

    await page.screenshot({ path: './tests/schizophreniaclick.png' });

    var rowCount = (await page.$$("body > main > main > table > tbody > tr")).length;

    console.log(`Inital row count=  ${rowCount}`);

    await page.focus('#country');
    await page.keyboard.type("Barcelona");

    await page.focus('#year');
    await page.keyboard.type("2019");

    await page.focus('#schizophrenia_women');
    await page.keyboard.type("2.63");

    await page.focus('#schizophrenia_men');
    await page.keyboard.type("5.79");

    await page.focus('#schizophrenia_population');
    await page.keyboard.type("8.69");

    await page.screenshot({ path: './tests/datosSchizophrenia.png' });

    await page.waitForTimeout(1000);

    await page.click("#addSchizophrenia"),

    await page.waitForTimeout(2000);

    await page.screenshot({ path: './tests/añadidoSchizophrenia.png' });

    await browser.close();
})();