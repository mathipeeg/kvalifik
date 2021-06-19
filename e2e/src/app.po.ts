import { browser, by, element } from 'protractor';

export class AppPage {
  async navigateTo(): Promise<unknown> {
    return browser.get(browser.baseUrl);
  }

  async navigateToPosts() {
    await element(by.css('.e2e-posts')).click();
  }

  async navigateToEvents() {
    await element(by.css('.e2e-events')).click();
  }

  async navigateToProfile() {
    await element(by.css('.e2e-profile')).click();
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
  async clickNewPostButton() {
    await element(by.css('.new-post-btn')).click();
  }

  async clickNewEventButton() {
    await element(by.css('.new-event-btn')).click();
  }

  async clickEditFirst() {
    await element.all(by.css('.edit-button')).first().click();
  }

  async clickEditLatest() {
    await element.all(by.css('.edit-button')).last().click();
  }

  async clickDelete() {
    await element(by.id('delete-btn')).click();
  }

  async clickSave() {
    await element(by.id('savePost')).click();
  }
}
