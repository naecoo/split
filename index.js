window.addEventListener('load', () => {
  const $ = document.querySelector.bind(document);
  const origin = $('.origin');
  const num = 4;
  const limit = 8;
  const event = 'mouseenter';
  const boxClass = 'box';
  const splitClass = 'box-container';

  origin.addEventListener(event, handleMouseEnter);

  function handleMouseEnter(e) {
    const target = e.target;
    target.removeEventListener(event, handleMouseEnter);
    if (target.classList.contains(boxClass)) {
      const level = +target.dataset.level;
      if (level >= limit) return;
      target.classList.remove(boxClass);
      target.classList.add(splitClass);
      target.style.backgroundColor = 'transparent';
      // split to four box
      for (let i = 0; i < num; ++i) {
        const el = createBox(level + 1);
        el.style.backgroundColor = Color();
        setTimeout(() => {
          el.addEventListener(event, handleMouseEnter);
        }, 300)
        target.appendChild(el);
      }
    }
    e.preventDefault();
  }

  function createBox(level) {
    const span = document.createElement('span');
    span.classList.add(boxClass);
    span.dataset.level = level.toString();
    return span;
  }

  function Color() {
    const r = Math.floor(Math.random() * 255);
    const g = Math.floor(Math.random() * 255);
    const b = Math.floor(Math.random() * 255);
    return `rgba(${r}, ${g}, ${b}, 0.8)`;
  }
});