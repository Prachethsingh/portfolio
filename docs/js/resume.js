import { projects } from './content.js';

const projectList = document.querySelector('#resume-projects');
projectList.innerHTML = projects.map(project => `
  <article>
    <h3>${project.title}</h3>
    <p>${project.tags.join(' · ')}</p>
    <p>${project.contribution}</p>
    ${project.url ? `<p><a href="${project.url}">${project.url}</a></p>` : ''}
    ${project.repository ? `<p><a href="${project.repository}">${project.repository}</a></p>` : ''}
  </article>
`).join('');

document.querySelector('#print-resume').addEventListener('click', () => window.print());
