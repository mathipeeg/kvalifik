
import { browser, element, by } from 'protractor';
import { AppPage } from './app.po';

describe('Events section', () => {
    let page: AppPage;

    beforeEach(async () => {
      page = new AppPage();

        await browser.waitForAngularEnabled(false);
        await browser.get('/');  // reload your SPA
    });

    it('Navigate to edit post page', async() => {
      await page.navigateToEvents();
      await browser.sleep(1000);
      await element(by.css('.edit-button')).click();
      expect(await element(by.css('.title')).getText()).toEqual('Edit Event');
    });

    it('Navigate to new event page', async() => {
      await page.navigateToEvents();
      await browser.sleep(1000);
      await element(by.css('.new-event-btn')).click();
      expect(await element(by.css('.title')).getText()).toEqual('Create Event');
    });

    it('Create new event', async() => { // todo: get to work with firefox as well. 1 and 2 hhm
      await page.navigateToEvents();
      await browser.sleep(1000);
      const eventsBeforeAdding: number = await (await element.all(by.css('.edit-button'))).length;

      await page.clickNewEventButton();
      await browser.sleep(1000);
      await element(by.id('e2e-title')).sendKeys('e2e Test Event');
      await element(by.id('e2e-start-date')).sendKeys('2021-06-20T17:54:36.066Z');
      await element(by.id('e2e-start-time')).sendKeys('10.00');
      await element(by.id('e2e-end-date')).sendKeys('2021-06-20T17:54:36.066Z');
      await element(by.id('e2e-end-time')).sendKeys('12.00');
      await element(by.id('e2e-description')).sendKeys('HY THSIHAISDHJFKSAHFJKASD');
      await element(by.id('e2e-photo')).sendKeys('Empty photo url');
      await element(by.id('e2e-location')).sendKeys('e2e Location test');
      await element(by.id('savePost')).click();
      // await browser.get('events');
      await page.navigateToEvents();
      await browser.refresh();
      await browser.sleep(1000);
      const eventsAfterAdding: number = await (await element.all(by.css('.edit-button'))).length;
      expect(eventsAfterAdding).toEqual(eventsBeforeAdding + 1);
    });

    it('Edit event', async() => {
      await page.navigateToEvents();
      await browser.sleep(1000);
      const amount: number = await (await element.all(by.css('.edit-button'))).length;
      await element.all(by.css('.edit-button')).get(amount - 3).click();
      await browser.sleep(1000);
      await element(by.id('e2e-title-edit')).sendKeys('e2e UPDATED TITLE');
      await page.clickSave();
      await browser.sleep(1000)
      await page.navigateToEvents();
      await browser.sleep(1000);
      await element.all(by.css('.edit-button')).get(amount - 3).click();
      await browser.sleep(1000);
      await element(by.id('e2e-title-edit')).click();
      await browser.sleep(1000);
      const title: string = await element(by.id('e2e-title-edit')).getAttribute('placeholder');
      expect(title).toEqual('e2e UPDATED TITLE');
    });

    it('Delete event', async() => {
      await page.navigateToEvents();
      await browser.sleep(1000);
      const eventsBeforeAdding: number = await (await element.all(by.css('.edit-button'))).length;
      await element.all(by.css('.edit-button')).get(eventsBeforeAdding - 3).click();
      await browser.sleep(1000);
      await page.clickDelete();
      await element(by.id('e2e-delete')).click();
      await browser.sleep(1000)
      // await browser.get('events');
      await page.navigateToEvents();
      await browser.refresh();
      await browser.sleep(1000);
      const eventsAfterAdding: number = await (await element.all(by.css('.edit-button'))).length;
      expect(eventsAfterAdding).toEqual(eventsBeforeAdding - 1);
    });
})
