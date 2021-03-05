import { browser, by, element, logging } from 'protractor';
import { AppPage } from './app.po';

describe('workspace-project App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  // it('should display welcome message', async () => {
  //   await page.navigateTo();
  //   expect(await page.getTitleText()).toEqual('kvalifik app is running!');
  // });

  it('Navigate to the edit post page', async() => {
    // code here to test...
    await browser.waitForAngularEnabled(false);
    await browser.get('/');  // reload your SPA
    await element(by.css(".e2e-posts")).click();
    
    await element.all(by.css(".e2e-edit")).first().click();
    
    expect(await element(by.css("h3")).getText()).toEqual("Edit Post");
  });

  it('Navigate to the new post page', async() => {
    // code here to test...
    await browser.waitForAngularEnabled(false);
    await browser.get('/'); // reload your SPA
    await element(by.css(".e2e-posts")).click();
    
    await element(by.id('newPostBtn')).click();
    
    expect(await element(by.css("h3")).getText()).toEqual("Create New Post");
  });

  afterEach(async () => {
    // Assert that there are no errors emitted from the browser
    const logs = await browser.manage().logs().get(logging.Type.BROWSER);
    expect(logs).not.toContain(jasmine.objectContaining({
      level: logging.Level.SEVERE,
    } as logging.Entry));
  });
});
