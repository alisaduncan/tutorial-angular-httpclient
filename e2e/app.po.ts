import { browser, by, element } from 'protractor';

export class TutorialAngularHttpclientPage {
  navigateTo() {
    return browser.get('/');
  }

  getToolbarText() {
    return element(by.css('body md-toolbar')).getText();
  }
}
