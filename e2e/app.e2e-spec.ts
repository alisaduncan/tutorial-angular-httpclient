import { TutorialAngularHttpclientPage } from './app.po';

describe('tutorial-angular-httpclient App', () => {
  let page: TutorialAngularHttpclientPage;

  beforeEach(() => {
    page = new TutorialAngularHttpclientPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
