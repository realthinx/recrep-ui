import { RecrepUiPage } from './app.po';

describe('recrep-ui App', function() {
  let page: RecrepUiPage;

  beforeEach(() => {
    page = new RecrepUiPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('recrep');
  });
});
