import './style.css';
import { fetchAllJokesRandomized, type Joke } from './jokes';

const app = document.querySelector<HTMLDivElement>('#app')!;

let jokes: Joke[] = [];
let index = 0;

function renderLoading(): void {
  app.innerHTML = `
    <div class="spinner"></div>
    <p class="loading-label">Loading jokes...</p>
  `;
}

function renderJoke(): void {
  const joke = jokes[index];
  app.innerHTML = `
    <div class="joke-card">
      <img src="/DadJokeLogo128.png" alt="Dad Joke logo" />
      <p class="joke-question">${escapeHtml(joke.question)}</p>
      <p class="joke-answer">${escapeHtml(joke.answer)}</p>
    </div>
    <button class="load-joke-button" type="button">
      <span aria-hidden="true">&#8634;</span>
      <span>Load Random Joke</span>
    </button>
  `;
  app.querySelector('.load-joke-button')!.addEventListener('click', loadNextJoke);
}

function loadNextJoke(): void {
  index++;
  if (index > jokes.length - 1) {
    index = 0;
  }
  renderJoke();
}

function escapeHtml(value: string): string {
  const div = document.createElement('div');
  div.textContent = value;
  return div.innerHTML;
}

async function init(): Promise<void> {
  renderLoading();
  jokes = await fetchAllJokesRandomized();
  index = 0;
  renderJoke();
}

init();
