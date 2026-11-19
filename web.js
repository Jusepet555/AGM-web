const detail = document.querySelector('.detail');

if (typeof detail.showModal === 'function') {
  const image = detail.querySelector('.detail-image');
  const title = detail.querySelector('h2');
  const description = detail.querySelector('p');
  const contact = detail.querySelector('[data-detail-contact]');

  document.querySelectorAll('.card').forEach(card => {
    const photo = card.querySelector('img');
    const heading = card.querySelector('h3');
    const copy = card.querySelector('p');
    const button = document.createElement('button');
    button.className = 'card-action';
    button.type = 'button';
    button.setAttribute('aria-label', 'Més informació sobre ' + heading.textContent.toLocaleLowerCase('ca'));
    button.setAttribute('aria-haspopup', 'dialog');
    button.innerHTML = '<span class="icon-ne" aria-hidden="true"></span>';
    button.addEventListener('click', () => {
      image.src = photo.currentSrc || photo.src;
      image.alt = photo.alt;
      title.textContent = heading.textContent;
      description.textContent = copy.textContent;
      detail.showModal();
    });
    card.append(button);
  });

  contact.addEventListener('click', () => detail.close());
  detail.addEventListener('click', event => {
    if (event.target === detail) detail.close();
  });
}

if ('IntersectionObserver' in window) {
  const sectionIntro = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('section-intro-visible');
        sectionIntro.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });

  document.querySelectorAll('.years, #services-title, #contact-title')
    .forEach(heading => sectionIntro.observe(heading));
}
