// navigation items
const mobileNav = document.querySelector('.nav-mobile__box')
const mobileNavigation = document.querySelector('.nav-mobile')
const burgerBtn = document.querySelector('.burger-btn')
const allNavItems = document.querySelectorAll('.nav-mobile__box-item')
const allDesktopNavItems = document.querySelectorAll('.nav-desktop__items-item')
const desktopNavigation = document.querySelector('.nav-desktop')
const allSections = document.querySelectorAll('.section')

// form items
const title = document.querySelector('#title')
const email = document.querySelector('#mail')
const msg = document.querySelector('#msg')
const sendBtn = document.querySelector('.contact__form-btn')

// cookie
const cookieBox = document.querySelector('.alert')
const cookieBtn = document.querySelector('.alert-btn')

// other items
const lastSection = document.querySelector('a:last-of-type')
const arrowItem = document.querySelector('.arrow-icon__box--link')
const spanYear = document.querySelector('.footer__year')

const ShowCookieAlert = () => {
	const cookieItem = localStorage.getItem('cookieAlert')

	if(cookieItem) {
		cookieBox.classList.add('hide')
	}
}

const handleCookieAlert = () => {
	localStorage.setItem('cookieAlert', 'true')
	cookieBox.classList.add('hide')
}

const checkForm = input => {
	input.forEach(el => {
		if (el.value === '') {
			showError(el, el.placeholder)
		} else {
			deleteErrors(el)
		}
	})
}

const showError = (input, message) => {
	const formBox = input.parentElement
	const errorMessage = formBox.querySelector('.contact__form-box--error-text')

	formBox.classList.add('error')
	errorMessage.textContent = message
}

const checkErrors = () => {
	const allInputs = document.querySelectorAll('.contact__form-box')
	let errorCount = 0

	allInputs.forEach(el => {
		if (el.classList.contains('error')) {
			errorCount++
		}
	})

	if (errorCount === 0) {
		;[title, email, msg].forEach(el => {
			el.value = ''
		})
	}

	console.log(errorCount)
}

const deleteErrors = input => {
	const formBox = input.parentElement
	formBox.classList.remove('error')
}

const checkLength = (input, min) => {
	if (input.value.length < min) {
		showError(input, `${input.previousElementSibling.innerText.slice(0, -1)} składa się z min. ${min} znaków.`)
	}
}

const checkEmail = mail => {
	const re =
		/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

	if (re.test(mail.value)) {
		deleteErrors(mail)
	} else {
		showError(mail, 'Adres e-mail jest nie prawidłowy')
	}
}

sendBtn.addEventListener('click', e => {
	e.preventDefault()

	checkForm([title, email, msg])
	checkLength(title, 5)
	checkLength(msg, 15)
	checkEmail(email)
	checkErrors()
})

const showNavigation = () => {
	mobileNav.classList.toggle('active-nav')

	setTimeout(() => {
		document.body.classList.toggle('elo')
	}, 400)
}

allNavItems.forEach(e => {
	e.addEventListener('click', () => {
		mobileNav.classList.remove('active-nav')
		document.body.classList.remove('elo')
	})
})

document.addEventListener('DOMContentLoaded', function () {
	const addBgToNavigation = () => {
		if (window.scrollY >= 100) {
			mobileNavigation.classList.add('bg-nav')
			desktopNavigation.classList.add('bg-nav')
		} else {
			mobileNavigation.classList.remove('bg-nav')
			desktopNavigation.classList.remove('bg-nav')
		}
	}

	window.addEventListener('scroll', addBgToNavigation)
})

const changeArrowOpacity = () => {
	setTimeout(() => {
		arrowItem.classList.add('arrow-icon-active')
	}, 750)
}

const handleCurrentYear = () => {
	const year = new Date().getFullYear()
	spanYear.textContent = year
}

const handleScrollSpy = () => {
	if (document.body.classList.contains('main-page')) {
		const sections = []

		allSections.forEach(section => {
			if (window.scrollY <= section.offsetTop + section.offsetHeight - 15) {
				sections.push(section)

				const activeSections = document.querySelector(`[href*="${sections[0].id}"]`)

				allDesktopNavItems.forEach(item => item.classList.remove('active-nav-item'))
				activeSections.classList.add('active-nav-item')
			}

			if (window.scrollY >= 1800) {
				allDesktopNavItems.forEach(item => item.classList.remove('active-nav-item'))

				lastSection.classList.add('active-nav-item')
			}
		})
	}
}

handleCurrentYear()
changeArrowOpacity()
ShowCookieAlert()
window.addEventListener('scroll', handleScrollSpy)
burgerBtn.addEventListener('click', showNavigation)
cookieBtn.addEventListener('click', handleCookieAlert)
