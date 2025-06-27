document.addEventListener('DOMContentLoaded', function () {

    const menuIcon = document.querySelector('.menu-icon');
    const mobileNav = document.querySelector('.mobile-nav-links');

    menuIcon.addEventListener('click', (event) => {
        event.stopPropagation();
        mobileNav.classList.toggle('show');
    });

    document.addEventListener('click', (event) => {
        const clickedOutsideMenu = !mobileNav.contains(event.target);
        const clickedOutsideIcon = !menuIcon.contains(event.target);

        if (mobileNav.classList.contains('show') && clickedOutsideMenu && clickedOutsideIcon) {
            mobileNav.classList.remove('show');
        }
    });

    const filterButtons = document.querySelectorAll('.filter-button');
    const portfolioCards = document.querySelectorAll('.portfolio-card');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            const filterValue = button.getAttribute('data-filter');

            portfolioCards.forEach(card => {
                const cardCategory = card.getAttribute('data-category');

                if (filterValue === 'all' || cardCategory === filterValue) {
                    card.style.display = 'block';

                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'scale(1)';
                    }, 50);
                } else {

                    card.style.opacity = '0';
                    card.style.transform = 'scale(0.95)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });

            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
        });
    });

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
        const errorElement = document.getElementById(element.id + '-error');
        if (errorElement) {
            errorElement.innerText = message;
        }
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
});
