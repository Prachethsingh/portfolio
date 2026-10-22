import { knowledge } from './knowledge.js';

// Small local corpus: lexical retrieval avoids model downloads and external calls.
const stopWords = new Set('a an the is are was were do does did can could would should i me my you your he his him it its to of in on for and or with about tell please what which how has have pracheth singh'.split(' '));
const aliases = { jobs: 'job', internships: 'internship', colleges: 'college', degrees: 'degree', graduated: 'graduation', resumes: 'resume', projects: 'projects', repos: 'repositories', qualifications: 'qualification' };

export function tokenize(text) {
  return (text.toLowerCase().match(/[a-z0-9]+/g) || [])
    .filter(word => !stopWords.has(word))
    .map(word => aliases[word] || word);
}

const index = knowledge.map(document => ({
  document,
  terms: tokenize(`${document.title} ${document.keywords} ${document.text}`),
  keywords: new Set(tokenize(`${document.title} ${document.keywords}`)),
}));
const averageLength = index.reduce((sum, entry) => sum + entry.terms.length, 0) / index.length;

/** BM25-style ranked retrieval, plus a small curated keyword boost. */
export function retrieve(question, limit = 2) {
  const terms = [...new Set(tokenize(question))];
  if (!terms.length) return [];
  return index.map(entry => {
    let score = 0;
    let matched = 0;
    for (const term of terms) {
      const frequency = entry.terms.filter(token => token === term).length;
      if (!frequency) continue;
      matched++;
      const documentFrequency = index.filter(item => item.terms.includes(term)).length;
      const rarity = Math.log(1 + (index.length - documentFrequency + 0.5) / (documentFrequency + 0.5));
      score += rarity * (frequency * 2.2) / (frequency + 1.2 * (0.25 + 0.75 * entry.terms.length / averageLength));
      if (entry.keywords.has(term)) score += 1.4;
    }
    return { ...entry.document, score, coverage: matched / terms.length };
  }).filter(result => result.score >= 2 && result.coverage >= 0.35)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit);
}

export function answerQuestion(question) {
  const normalized = question.trim().toLowerCase();
  if (!normalized) return { text: 'Ask a question about Pracheth’s portfolio.', sources: [] };
  if (/^(hi|hello|hey|thanks|thank you)[!. ]*$/.test(normalized)) {
    return { text: 'Hello! I can help you explore Pracheth’s projects, skills, education, experience, and contact details. What would you like to know?', sources: [] };
  }
  if (/\b(salary|age|birthday|married|phone|address|accuracy|benchmark|doi|isbn|joining date)\b/.test(normalized)) {
    return { text: 'That specific information is not documented in this portfolio. I can show the relevant project or experience, but I cannot supply an unverified detail. For clarification, contact Pracheth directly.', sources: [{title: 'Contact Pracheth', href: '#contact'}] };
  }
  const profileQuestion = /who (is|are)|introduce|tell me about pracheth/.test(normalized);
  const results = retrieve(profileQuestion ? 'profile introduction' : question);
  if (!results.length) {
    return { text: 'I couldn’t find a reliable answer in this portfolio. Try asking about projects, technical skills, education, internships, or contact details.', sources: [] };
  }
  return {
    text: results.map(result => `${result.title}\n${result.text}`).join('\n\n'),
    sources: results.map(({title, href}) => ({title, href})),
  };
}
