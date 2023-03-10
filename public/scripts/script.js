const body = document.querySelector("body");

const btnSignin = document.querySelector("#signin")
const btnSignup = document.querySelector("#signup")

const toggle = document.querySelector('#toggle')
const sidebar = document.querySelector('#sidebar')

const eyeiconRegistration = document.getElementById('eyeicon-registration')
const passwordRegistration = document.getElementById('password-registration')

const eyeiconLogin = document.getElementById('eyeicon-login')
const passwordLogin = document.getElementById('password-login')

const detailsVac = document.querySelectorAll('.details')
const registration = document.querySelectorAll('.registration')


if (btnSignin) {
    btnSignin.addEventListener('click', function () {
        body.className = 'sign-in'
    })
}

if (btnSignup) {
    btnSignup.addEventListener('click', function () {
        body.className = 'sign-up'
    })
}



if (eyeiconRegistration) {
    eyeiconRegistration.addEventListener('click', function () {
        if (passwordRegistration.type == 'password') {
            passwordRegistration.type = 'text'
            eyeiconRegistration.src = '/assets/images/eye-open.png'
            eyeiconRegistration.alt = 'Imagem de olho aberto demonstrando que a senha está visível'
        } else {
            passwordRegistration.type = 'password'
            eyeiconRegistration.src = '/assets/images/eye-close.png'
            eyeiconRegistration.alt = 'Imagem de olho fechado demonstrando que a senha está oculta'
        }
    })
}

if (eyeiconLogin) {
    eyeiconLogin.addEventListener('click', function () {
        if (passwordLogin.type == 'password') {
            passwordLogin.type = 'text'
            eyeiconLogin.src = '/assets/images/eye-open.png'
            eyeiconLogin.alt = 'Imagem de olho aberto demonstrando que a senha está visível'
        } else {
            passwordLogin.type = 'password'
            eyeiconLogin.src = '/assets/images/eye-close.png'
            eyeiconLogin.alt = 'Imagem de olho fechado demonstrando que a senha está oculta'
        }
    })
}


if (toggle) {
    toggle.addEventListener('click', function () {
        toggle.classList.toggle('active')
        sidebar.classList.toggle('active')
    })

    document.onclick = function (e) {
        if (e.target.id !== 'sidebar' && e.target.id !== 'toggle') {
            toggle.classList.remove('active')
            sidebar.classList.remove('active')
        }
    }
}

if (detailsVac) {
    detailsVac.forEach(element => {
        element.addEventListener('click', function () {
            const elementoFatherDetails = element.parentElement

            const nameDetails = elementoFatherDetails.children.item(0)

            const lotDetails = elementoFatherDetails.children.item(1)

            const descriptionVac = elementoFatherDetails.children.item(5)

            document.getElementById('name-details').textContent = nameDetails.textContent
            document.getElementById('lot-details').textContent = lotDetails.textContent
            document.getElementById('decription-details').textContent = descriptionVac.textContent
        })
    })
}

if (registration) {
    registration.forEach(element => {
        element.addEventListener('click', function () {
            const elementFatherRegistration = element.parentElement

            const idRegistration = elementFatherRegistration.getAttribute('id')

            const nameRegistration = elementFatherRegistration.children.item(0)

            const lotRegistration = elementFatherRegistration.children.item(1)

            const detailRegistration = elementFatherRegistration.children.item(2)

            document.getElementById('id-registration').value = idRegistration
            document.getElementById('name-registration').value = nameRegistration.textContent.trim()
            document.getElementById('lot-registration').value = lotRegistration.textContent.trim()
            document.getElementById('description-registration').textContent = detailRegistration.textContent
        })
    })
}