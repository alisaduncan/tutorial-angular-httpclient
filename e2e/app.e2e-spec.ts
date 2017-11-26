import { TutorialAngularHttpclientPage } from './app.po';

describe('tutorial-angular-httpclient App', () => {
  let page: TutorialAngularHttpclientPage;

  beforeEach(() => {
    page = new TutorialAngularHttpclientPage();
  });

  it('should display the title', () => {
    page.navigateTo();
    expect(page.getToolbarText()).toEqual('Angular HttpClient');
  });
});
