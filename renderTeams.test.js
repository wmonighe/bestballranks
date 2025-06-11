import { JSDOM } from 'jsdom';
import { renderTeams } from './exposureRater.js';

test('renderTeams adds cards to the grid', () => {
  const dom = new JSDOM('<main><section class="teams-grid"></section><div data-state="empty"></div></main>', { runScripts: 'outside-only' });
  global.document = dom.window.document;
  const teams = [{ name: 'Test', rating: 9.2, roster: [{ a:1 }] }];
  renderTeams(teams);
  const cards = dom.window.document.querySelectorAll('.team-card');
  expect(cards.length).toBe(1);
});
