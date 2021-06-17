import { browser, by, element } from 'protractor';

export class AppPage {
  async navigateTo(): Promise<unknown> {
    return browser.get(browser.baseUrl);
  }

  async getDashboardText(): Promise<string> {
    return element(by.css('app-dashboard h1')).getText();
  }

  async getButtonByRouterLink(): Promise<string> {
    return element(by.css('[routerlink="/router-link"]')).getText();
  }

  async getPostsButtonText(): Promise<string> {
    return element(by.css('.e2e-posts')).getText();
  }

  async navigateToPosts() {
    await element(by.css('.e2e-posts')).click();
  }

  async clickNewPostButton() {
    await element(by.css('.new-post-btn')).click();
  }

  async clickEditLatestPostButton() {
    await element.all(by.css('.edit-button')).last().click();
  }

  async clickDeletePost() {
    await element(by.id('delete-btn')).click();
  }

  async getAmountOfPosts() {
    return element.all(by.css('.edit-button'));
  }
}
