// Show Password
const showPasswordElements = document.body.querySelectorAll('[data-show-password]');

for (const showElement of showPasswordElements) {
    const passwordElement = document.body.querySelector(`input[type="password"][name=${showElement.dataset.showPassword}]`);
    if (passwordElement === null) continue;

    if (showElement.checked && passwordElement.type !== 'text') {
        passwordElement.type = 'text';
    }

    showElement.addEventListener('click', () => {
        if (showElement.checked && passwordElement.type === 'password') {
            passwordElement.type = 'text';
        } else if (!showElement.checked) {
            passwordElement.type = 'password';
        }
    })
}

// Animation
const observer = new IntersectionObserver((entries) => {    
    for (const entry of entries) {        
        if (!entry.isIntersecting) continue;

        entry.target.setAttribute('data-animation', 'visible');
        observer.unobserve(entry.target);
    }
}, { threshold: 0.03 });

for (const element of document.body.querySelectorAll('[data-animation]'))
    observer.observe(element);

// Form
const form = document.body.querySelector('form');
const firstName = form.querySelector('[data-form-firstname]');
const lastName = form.querySelector('[data-form-lastname]');

form.addEventListener('submit', () => {
    window.alert(`Form submited for: '${firstName.value}, ${lastName.value}'`);
})
