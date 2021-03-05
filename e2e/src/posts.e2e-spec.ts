import { browser, element, by } from "protractor";

describe('Posts section', () => {
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
});