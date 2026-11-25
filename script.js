// Animation
const observer = new IntersectionObserver((entries) => {    
    for (const entry of entries) {        
        if (!entry.isIntersecting) continue

        entry.target.setAttribute('data-animation', 'visible')
        observer.unobserve(entry.target)
    }
}, { threshold: 0.03 })

for (const element of document.body.querySelectorAll('[data-animation]'))
    observer.observe(element)

// Show Password
const showPasswordElements = document.body.querySelectorAll('[data-show-password]')

for (const showElement of showPasswordElements) {
    const passwordElement = document.body.querySelector(`input[type="password"][name=${showElement.dataset.showPassword}]`)
    if (passwordElement === null) continue

    if (showElement.checked && passwordElement.type !== 'text') {
        passwordElement.type = 'text'
    }

    showElement.addEventListener('click', () => {
        if (showElement.checked && passwordElement.type === 'password') {
            passwordElement.type = 'text'
        } else if (!showElement.checked) {
            passwordElement.type = 'password'
        }
    })
}

// Form
const attrs = {
    form: 'form',
    firstName: '[data-form-firstname]',
    lastName: '[data-form-lastname]',
    invalid: '[data-form-invalid]',
    email: '[data-form-email]',
    password: '[data-form-password]',
    submit: 'button:not([type])'
}

const form = document.body.querySelector(attrs.form)
const formSubmit = form.querySelector(attrs.submit)

const firstName = form.querySelector(attrs.firstName)
const firstNameInvalid = form.querySelector(
    `${attrs.firstName} + ${attrs.invalid}`
)

const lastName = form.querySelector(attrs.lastName)
const lastNameInvalid = form.querySelector(
    `${attrs.lastName} + ${attrs.invalid}`
)

const email = form.querySelector(attrs.email)
const emailInvalid = form.querySelector(
    `${attrs.email} + ${attrs.invalid}`
)

const password = form.querySelector(attrs.password)
const passwordInvalid = form.querySelector(
    `${attrs.password} + ${attrs.invalid}`
)

form.addEventListener('reset', () => {
    setTimeout(() => {
        updateFormState()

        for (const invalid of form.querySelectorAll(attrs.invalid))
            invalid.hidden = true
    }, 0)
})

form.addEventListener('input', updateFormState)
form.addEventListener('change', updateFormState)
updateFormState()

firstName.addEventListener('input', (event) => updateInputState(
    event.target, firstNameInvalid
))
updateInputState(firstName, firstNameInvalid)

lastName.addEventListener('input', (event) => updateInputState(
    event.target, lastNameInvalid
))
updateInputState(lastName, lastNameInvalid)

email.addEventListener('input', (event) => updateInputState(
    event.target, emailInvalid
))
updateInputState(email, emailInvalid)

password.addEventListener('input', (event) => updateInputState(
    event.target, passwordInvalid
))
updateInputState(password, passwordInvalid)

function updateInputState(input, invalidMessage) {
    invalidMessage.hidden = input.value === "" || input.checkValidity()
}

function updateFormState() {
    formSubmit.disabled = !form.checkValidity()
}

form.addEventListener('submit', () => {
    event.preventDefault()

    if (!form.checkValidity()) return

    console.log({
        firstName: firstName.value,
        lastName: lastName.value,
        email: email.value,
        password: password.value
    })
})
