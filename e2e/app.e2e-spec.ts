import { LemurClientPage } from './app.po';

describe('lemur-client App', function() {
  let page: LemurClientPage;

  beforeEach(() => {
    page = new LemurClientPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
