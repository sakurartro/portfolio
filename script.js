const paragraph = document.querySelector('.reveal-text');
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
if (paragraph && !reducedMotion.matches) {
  const text = paragraph.textContent;
  paragraph.setAttribute('aria-label', text);
  paragraph.textContent = '';
  let index = 0;
  for (const word of text.split(' ')) {
    const wrapper = document.createElement('span');
    wrapper.className = 'word';
    wrapper.setAttribute('aria-hidden', 'true');
    for (const letter of word) {
      const character = document.createElement('span');
      character.className = 'char';
      character.textContent = letter;
      character.dataset.index = index++;
      wrapper.append(character);
    }
    paragraph.append(wrapper, ' ');
    index++;
  }
  const chars = paragraph.querySelectorAll('.char');
  const update = () => {
    const rect = paragraph.getBoundingClientRect();
    const progress = Math.max(0, Math.min(1, (innerHeight * .8 - rect.top) / (innerHeight * .6 + rect.height)));
    chars.forEach(char => {
      const at = Number(char.dataset.index) / index;
      const start = Math.max(0, at - .1), end = Math.min(1, at + .05);
      char.style.opacity = .2 + .8 * Math.max(0, Math.min(1, (progress - start) / (end - start)));
    });
  };
  addEventListener('scroll', update, {passive:true});
  addEventListener('resize', update);
  update();
}
