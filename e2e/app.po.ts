import { browser, element, by } from 'protractor';

export class RecrepUiPage {

  navigateTo() {
    browser.ignoreSynchronization = true;
    return browser.get('/');
  }

  getParagraphText() {
    return element(by.css('rec-app')).getText();
  }
}
