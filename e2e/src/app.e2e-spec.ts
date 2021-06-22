import { browser, by, element, logging } from 'protractor';
import { AppPage } from './app.po';

describe('workspace-project App', () => {
  let page: AppPage;

  beforeEach(async () => {
    page = new AppPage();

    await browser.waitForAngularEnabled(false);
    await browser.get('/');  // reload your SPA
  });

  it('should display dashboard title', async () => {
    await page.navigateTo();
    expect(await page.getDashboardText()).toEqual('Collaboration');
  });


  it('should display posts button', async () => {
    await page.navigateTo();
    expect(await page.getPostsButtonText()).toEqual('library_books\nPosts');
  });
});
