const form = document.getElementById('contact-form');
const formButton = document.querySelector('.contact-cta-button');
const successMessage = document.getElementById('success-message');

formButton.addEventListener('click', (event) => {
    event.preventDefault();
    formValidate();
});

function formValidate() {
    clearErrors();

    const name = document.getElementById('name');
    const email = document.getElementById('email');
    const message = document.getElementById('message');

    let hasError = false;

    if (name.value.trim().length < 2) {
        showError(name, 'O nome deve ter pelo menos 2 caracteres.');
        hasError = true;
    }

    if (!validateEmail(email.value.trim())) {
        showError(email, 'Por favor, insira um e-mail válido.');
        hasError = true;
    }

    if (message.value.trim().length < 10) {
        showError(message, 'A mensagem deve ter pelo menos 10 caracteres.');
        hasError = true;
    }

    if (!hasError) {
        showSuccessMessage();
        form.reset();
    }
}

function showError(element, message) {
    element.classList.add('error');
    document.getElementById(element.id + '-error').innerText = message;
}

function clearErrors() {
    document.querySelectorAll('.error-message').forEach(el => el.innerText = '');
    document.querySelectorAll('.error').forEach(el => el.classList.remove('error'));
}

function validateEmail(email) {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
}

function showSuccessMessage() {
    successMessage.style.display = 'block';
    requestAnimationFrame(() => {
        successMessage.classList.add('show');
    });
    setTimeout(() => {
        successMessage.classList.remove('show');
        setTimeout(() => {
            successMessage.style.display = 'none';
        }, 800);
    }, 3000);
}
