import { browser, element, by } from 'protractor';
import { AppPage } from './app.po';

describe('Posts section', () => {
    let page: AppPage;

    beforeEach(async () => {
      page = new AppPage();

        await browser.waitForAngularEnabled(false);
        await browser.get('/');  // reload your SPA
    });

    it('Show sorry message when not logged in', async() => {
      await page.navigateToProfile();
      await browser.sleep(1000);
      expect(await element(by.css('.sorry')).isPresent());
    });

    it('Do not show profile when not logged in', async() => {
      await page.navigateToProfile();
      await browser.sleep(1000);
      expect(!await element(by.tagName('h1')).isPresent())
    });
})
