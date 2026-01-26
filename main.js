const contactForm = document.querySelector('.contact-form');

if (contactForm) {
  contactForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const button = contactForm.querySelector('button');
    if (!button) {
      return;
    }

    button.textContent = 'Mengirim...';
    button.disabled = true;

    window.setTimeout(() => {
      contactForm.reset();
      button.textContent = 'Pesan terkirim';
      window.setTimeout(() => {
        button.textContent = 'Kirim pesan';
        button.disabled = false;
      }, 2000);
    }, 1000);
  });
}
