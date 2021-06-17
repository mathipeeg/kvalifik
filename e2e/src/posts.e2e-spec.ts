import { browser, element, by } from 'protractor';
import { AppPage } from './app.po';

describe('Posts section', () => {
    let page: AppPage;

    beforeEach(async () => {
      page = new AppPage();

        await browser.waitForAngularEnabled(false);
        await browser.get('/');  // reload your SPA
    });

    it('Navigate to edit post page', async() => {
      await page.navigateToPosts();
      await browser.sleep(1000);
      await element(by.css('.edit-button')).click();
      expect(await element.all(by.css('mat-label')).first().getText()).toEqual('Title');
    });

    it('Navigate to new post page', async() => {
      await page.navigateToPosts();
      await browser.sleep(1000);
      await element(by.css('.new-post-btn')).click();
      expect(await element.all(by.css('mat-label')).first().getText()).toEqual('Title');
    });

    it('Create new post', async() => { // todo: get to work with firefox as well. 1 and 2 hhm
      await page.navigateToPosts();
      await browser.sleep(1000);
      const postsBeforeAdding: number = await (await element.all(by.css('.edit-button'))).length;

      await page.clickNewPostButton();
      await browser.sleep(1000);
      await element(by.id('e2e-title')).sendKeys('e2e Test Post');
      await element(by.id('e2e-text')).sendKeys('e2e Test Post Text');
      await element(by.id('e2e-media')).sendKeys('Empty media url');
      await element(by.id('savePost')).click();
      await page.navigateToPosts();
      await browser.sleep(1000);
      const postsAfterAdding: number = await (await element.all(by.css('.edit-button'))).length;
      expect(postsAfterAdding).toEqual(postsBeforeAdding + 1);
    });

    it('Delete post', async() => {
      await page.navigateToPosts();
      await browser.sleep(1000);
      const postsBeforeAdding: number = await (await element.all(by.css('.edit-button'))).length;
      await page.clickEditLatestPostButton();
      await browser.sleep(1000);
      await page.clickDeletePost();
      await element(by.id('e2e-delete')).click();
      await page.navigateToPosts();
      await browser.sleep(1000);
      const postsAfterAdding: number = await (await element.all(by.css('.edit-button'))).length;
      expect(postsAfterAdding).toEqual(postsBeforeAdding - 1);
    });
})
