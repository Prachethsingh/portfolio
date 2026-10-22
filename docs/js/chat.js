import { answerQuestion } from './retrieval.js';

/** Accessible portfolio Q&A. Messages are held in memory and never transmitted. */
export function initializePortfolioChat() {
  const launcher = document.querySelector('#chat-launcher');
  const dialog = document.querySelector('#chat-dialog');
  const messages = document.querySelector('#chat-messages');
  const form = document.querySelector('#chat-form');
  const input = document.querySelector('#chat-question');

  function appendMessage(role, text, sources = []) {
    const message = document.createElement('article');
    message.className = `chat-message chat-message--${role}`;
    const label = document.createElement('strong');
    label.textContent = role === 'user' ? 'You' : 'Portfolio assistant';
    const body = document.createElement('p');
    body.textContent = text;
    message.append(label, body);

    if (sources.length) {
      const citations = document.createElement('div');
      citations.className = 'chat-sources';
      sources.forEach(source => {
        const link = document.createElement('a');
        link.href = source.href;
        link.textContent = `${source.title} ↗`;
        link.addEventListener('click', () => dialog.close());
        citations.append(link);
      });
      message.append(citations);
    }
    messages.append(message);
    // Bound DOM growth during long sessions without persisting visitor messages.
    while (messages.children.length > 40) messages.firstElementChild.remove();
    messages.scrollTop = messages.scrollHeight;
  }

  function resetConversation() {
    messages.replaceChildren();
    appendMessage('assistant', 'Ask me about Pracheth’s projects, skills, education, or experience. I retrieve documented portfolio facts and link to their sources.');
    input.value = '';
  }

  function ask(question) {
    const text = question.trim().slice(0, 500);
    if (!text) return;
    appendMessage('user', text);
    const response = answerQuestion(text);
    appendMessage('assistant', response.text, response.sources);
    input.value = '';
    input.focus();
  }

  launcher.addEventListener('click', () => {
    dialog.showModal();
    launcher.setAttribute('aria-expanded', 'true');
    input.focus();
  });
  dialog.addEventListener('close', () => {
    launcher.setAttribute('aria-expanded', 'false');
    launcher.focus();
  });
  document.querySelector('#chat-close').addEventListener('click', () => dialog.close());
  document.querySelector('#chat-clear').addEventListener('click', () => { resetConversation(); input.focus(); });
  form.addEventListener('submit', event => { event.preventDefault(); ask(input.value); });
  document.querySelectorAll('[data-question]').forEach(button => {
    button.addEventListener('click', () => ask(button.dataset.question));
  });
  resetConversation();
}
