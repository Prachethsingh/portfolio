/** Original schematic artwork, not screenshots of the projects. */
const frame = (content) => `<svg viewBox="0 0 540 270" aria-hidden="true" fill="none" xmlns="http://www.w3.org/2000/svg">${content}</svg>`;

export function projectArtwork(id) {
  if (id === 'agent') {
    const nodes = [[270,135],[140,75],[135,200],[400,65],[410,200],[270,30],[270,245]];
    const edges = nodes.slice(1).map(([x,y]) => `<path d="M270 135L${x} ${y}" stroke="#7d9367" stroke-width="1"/><circle cx="${x}" cy="${y}" r="19" stroke="#78915e"/><circle cx="${x}" cy="${y}" r="4" fill="#aec288"/>`).join('');
    return frame(`<ellipse cx="270" cy="135" rx="180" ry="92" stroke="#57684b" stroke-dasharray="3 7"/>${edges}<circle cx="270" cy="135" r="42" fill="#293723" stroke="#b4c394"/><path d="M252 145v-20l18-11 18 11v20l-18 11zM270 114v42M252 125l36 20M288 125l-36 20" stroke="#c2d5a3"/>`);
  }
  if (id === 'alert') {
    const bars = Array.from({length:45},(_,i) => {
      const h = 8 + Math.pow(Math.sin(i * 0.7),2) * (18 + 70 * Math.exp(-Math.pow((i-22)/13,2)));
      return `<path d="M${55+i*7} ${135-h/2}v${h}" stroke="${i>14&&i<30?'#d6ad83':'#78634d'}" stroke-width="3" stroke-linecap="round"/>`;
    }).join('');
    return frame(`${bars}<path d="M390 135h28" stroke="#897155" stroke-dasharray="3 4"/><rect x="428" y="104" width="62" height="62" rx="15" stroke="#cead81"/><path d="M451 145h16m-20-6h24l-4-8v-9a8 8 0 00-16 0v9z" stroke="#d8b88f"/><circle cx="459" cy="135" r="48" stroke="#76604b" stroke-dasharray="2 5"/>`);
  }
  if (id === 'business') {
    const lines = Array.from({length:9},(_,i)=>`<path d="M${40+i*50} 245L${100+i*43} 25M40 ${35+i*25}L510 ${25+i*25}" stroke="#4e6766" stroke-width=".6"/>`).join('');
    const blocks = [[130,140,45],[200,160,80],[260,100,50],[340,145,100],[390,90,42]].map(([x,y,h])=>`<path d="M${x} ${y}l25 12 25-12v-${h}l-25-12-25 12z" fill="#35514d" stroke="#82a59b"/><path d="M${x} ${y-h}l25 12 25-12m-25 12v${h}" stroke="#82a59b"/>`).join('');
    return frame(`<g transform="translate(0 20)">${lines}${blocks}<circle cx="280" cy="185" r="6" fill="#ddb085"/><ellipse cx="280" cy="185" rx="45" ry="20" stroke="#ddb085"/></g>`);
  }
  const rows = [80,120,160,200].map((y,i)=>`<rect x="145" y="${y}" width="300" height="26" rx="2" fill="#313333"/><path d="M160 ${y+13}h${50+i*15}M310 ${y+13}h35" stroke="#8e9891"/><rect x="380" y="${y+8}" width="45" height="10" rx="5" fill="${i===2?'#95795f':'#64785b'}"/>`).join('');
  return frame(`<rect x="75" y="30" width="390" height="210" rx="5" fill="#202424" stroke="#697166"/><path d="M75 60h390M125 60v180" stroke="#59604f"/><circle cx="90" cy="45" r="3" fill="#cfaa81"/><path d="M92 85h15m-15 25h15m-15 25h15" stroke="#8b9580"/>${rows}`);
}
