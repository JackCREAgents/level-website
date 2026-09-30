import './styles/main.css';
import { team } from './data/team.js';

// Mobile nav toggle
const toggle = document.querySelector('.nav-toggle');
const nav = document.querySelector('.site-nav');
toggle?.addEventListener('click', () => {
  const open = nav.classList.toggle('is-open');
  toggle.setAttribute('aria-expanded', String(open));
});
nav?.addEventListener('click', (e) => {
  if (e.target.closest('a')) nav.classList.remove('is-open');
});

// Contact form: opens the visitor's email app, addressed to the selected team.
const form = document.querySelector('#contact-form');
form?.addEventListener('submit', (e) => {
  e.preventDefault();
  const data = new FormData(form);
  const to = data.get('audience');
  const subject = `Inquiry from ${data.get('name')}`;
  const body = `${data.get('message')}\n\n— ${data.get('name')}\n${data.get('email')}`;
  window.location.href = `mailto:${to}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
});

// Team directory
const grid = document.querySelector('#team-grid');
if (grid) {
  grid.innerHTML = team
    .map(
      (m) => `
      <article class="team-card">
        ${m.photo
          ? `<img src="${m.photo}" alt="Portrait of ${m.name}" loading="lazy" />`
          : `<div class="portrait-placeholder" aria-hidden="true"></div>`}
        <h3>${m.name}</h3>
        <p class="role">${m.role}</p>
        <p>${m.bio}</p>
        <a href="mailto:${m.email}">${m.email}</a>
      </article>`,
    )
    .join('');
}

document.querySelectorAll('[data-year]').forEach((el) => (el.textContent = new Date().getFullYear()));
