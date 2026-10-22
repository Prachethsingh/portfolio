import { initializePortfolioChat } from './chat.js';
import { initializeRepositoryDirectory } from './repositories.js';
import { projects, skills, studyTopics, experiments } from './content.js';
import { projectArtwork } from './project-art.js';
import { initializeEraJourney } from './era-journey.js';

const projectGrid = document.querySelector('#projects');
const projectDialog = document.querySelector('#project-dialog');

// All markup below uses local, author-maintained content, never visitor input.
projectGrid.innerHTML = projects.map((project, index) => `
  <article class="project-card" data-category="${project.category}">
    <div class="project-visual">
      <span class="project-index">0${index + 1} / SELECTED PROJECT</span>
      ${projectArtwork(project.id)}
      <span class="visual-caption">${project.caption} · SCHEMATIC</span>
    </div>
    <div class="project-title">
      <h3>${project.title}</h3>
      <button data-project="${project.id}" aria-label="Read about ${project.title}">↗</button>
    </div>
    <p>${project.subtitle}</p>
    <div class="tags">${project.tags.map(tag => `<span>${tag}</span>`).join('')}</div>
  </article>
`).join('');

document.querySelector('#skills').innerHTML = skills.map(([number, title, tools]) => `
  <article class="skill-group"><span class="eyebrow">/${number}</span><h3>${title}</h3><p>${tools}</p></article>
`).join('');

document.querySelector('#study-topics').innerHTML = studyTopics.map(([title, description]) => `
  <article><h3>${title}</h3><p>${description}</p></article>
`).join('');

document.querySelector('#experiments').innerHTML = experiments.map(([name, status]) => `
  <div class="experiment-row"><span>${name}</span><small>${status}</small></div>
`).join('');

document.querySelectorAll('[data-filter]').forEach(button => {
  button.addEventListener('click', () => {
    const filter = button.dataset.filter;
    document.querySelectorAll('[data-filter]').forEach(item => {
      const selected = item === button;
      item.classList.toggle('active', selected);
      item.setAttribute('aria-pressed', String(selected));
    });
    document.querySelectorAll('.project-card').forEach(card => {
      card.hidden = filter !== 'all' && card.dataset.category !== filter;
    });
  });
});

projectGrid.addEventListener('click', (event) => {
  const button = event.target.closest('[data-project]');
  if (!button) return;
  const project = projects.find(item => item.id === button.dataset.project);
  document.querySelector('#project-detail').innerHTML = `
    <div class="dialog-body">
      <p class="eyebrow accent">PROJECT NOTES / ${project.category.toUpperCase()}</p>
      <h2 id="dialog-title">${project.title}</h2>
      <p>${project.subtitle}</p>
      <h3>The problem</h3><p>${project.problem}</p>
      <h3>The approach</h3><p>${project.approach}</p>
      <h3>My contribution</h3><p>${project.contribution}</p>
      <h3>System flow</h3><ol>${project.flow.map(step => `<li>${step}</li>`).join('')}</ol>
      <h3>Evaluation & limitations</h3><p>${project.limitation}</p>
      <div class="dialog-links">
        ${project.url ? `<a href="${project.url}" target="_blank" rel="noopener noreferrer">Visit project ↗</a>` : ''}
        ${project.repository ? `<a href="${project.repository}" target="_blank" rel="noopener noreferrer">Source repository ↗</a>` : '<a href="https://github.com/Prachethsingh" target="_blank" rel="noopener noreferrer">GitHub profile ↗</a>'}
      </div>
    </div>`;
  projectDialog.showModal();
  document.body.style.overflow = 'hidden';
});

projectDialog.querySelector('.dialog-close').addEventListener('click', () => projectDialog.close());
projectDialog.addEventListener('close', () => { document.body.style.overflow = ''; });
projectDialog.addEventListener('click', (event) => { if (event.target === projectDialog) {
  const bounds = projectDialog.getBoundingClientRect();
  if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) projectDialog.close();
} });

document.querySelector('#year').textContent = new Date().getFullYear();
initializeEraJourney();

initializeRepositoryDirectory();

initializePortfolioChat();
