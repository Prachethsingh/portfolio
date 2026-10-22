/** Public repository names confirmed through GitHub on 22 October 2026. */
export const repositories = [
  'self-learning-AI-agent',
  'business.in',
  'Full-Stack-Mini-Operations-ERP',
  'ai-powered-voice-based-24.7-booking-system',
  'AI-for-Low-Digital-Literacy',
  'The-Celluloid-Cafe',
  'ERP-CRM-system',
  'cool-_city_ai',
  'Waste-Seggregation',
  'lane-detection',
  'saas_product',
  'defi-blockchain-Ai',
  'python',
  'git',
  'inside-hotel',
  'Prachethsingh',
];

export function initializeRepositoryDirectory() {
  const search = document.querySelector('#repository-search');
  const list = document.querySelector('#repository-list');
  const status = document.querySelector('#repository-status');

  function render() {
    const query = search.value.trim().toLowerCase();
    const matches = repositories.filter(name => name.toLowerCase().includes(query));
    list.replaceChildren();

    for (const name of matches) {
      const link = document.createElement('a');
      link.href = `https://github.com/Prachethsingh/${name}`;
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
      link.className = 'repository-link';
      const title = document.createElement('span');
      title.textContent = name;
      const arrow = document.createElement('span');
      arrow.textContent = '↗';
      arrow.setAttribute('aria-hidden', 'true');
      link.append(title, arrow);
      list.append(link);
    }

    status.textContent = matches.length
      ? `${matches.length} of ${repositories.length} public repositories`
      : 'No matching repositories. Try “AI”, “ERP”, or “python”.';
  }

  search.addEventListener('input', render);
  render();
}
