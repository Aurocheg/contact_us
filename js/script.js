window.addEventListener('DOMContentLoaded', () => {
    'use strict'

    AOS.init()

    const burger = (selector, menu) => {
        const burgerMenu = document.querySelector(selector)
        const list = document.querySelector(menu)

        burgerMenu.addEventListener('click', () => {
            burgerMenu.classList.toggle('active')
            list.classList.toggle('active')

            if (burgerMenu.classList.contains('active')) {
                document.body.classList.add('lock')
            } else {
                document.body.classList.remove('lock')
            }
        })
    }

    document.addEventListener('scroll', () => {
        if (window.screen.availWidth > 992) {
            const element = document.querySelector('.header__menu')
            const scrollTop = window.pageYOffset ? window.pageYOffset : (document.documentElement.scrollTop ? document.documentElement.scrollTop : document.body.scrollTop);

            if (scrollTop >= 1) {
                element.classList.add('stiky')
            } else {
                element.classList.remove('stiky')
            }
        }
    })

    const forms = () => {
        const form = document.querySelector('form'),
              inputs = document.querySelectorAll('input');

        const message = {
            loading: 'Loading...',
            success: 'Thanks! Your message has been sent',
            failure: 'Something went wrong...',
            spinner: '../img/spinner.gif',
            ok: '../img/ok.svg',
            fail: '../img/fail.png'
        }

        const postData = async (url, data) => {
            // document.querySelector('.status').textContent = message.loading
            let res = await fetch(url, {
                method: 'POST',
                body: data
            })

            return await res.text()
        }

        const clearInputs = () => {
            inputs.forEach(input => {
                input.value = ''
            })
        }

        form.addEventListener('submit', (e) => {
            e.preventDefault()

            let statusMessage = document.createElement('div')
            statusMessage.classList.add('status')
            form.parentNode.appendChild(statusMessage)

            form.classList.add('animated', 'fadeOutUp')
            setTimeout(() => {
                form.style.display = 'none'
            }, 400)

            let statusImg = document.createElement('img')
            statusImg.setAttribute('src', message.spinner)
            statusImg.classList.add('animated', 'fadeInUp')
            statusMessage.appendChild(statusImg)

            let textMessage = document.createElement('div')
            textMessage.textContent = message.loading
            statusMessage.appendChild(textMessage)

            const formData = new FormData(form)

            postData('../server.php', formData)
                .then(() => {
                    statusImg.setAttribute('src', message.ok)
                    textMessage.textContent = message.success
                })
                .catch(() => {
                    statusImg.setAttribute('src', message.fail)
                    textMessage.textContent = message.failure
                })
                .finally(() => {
                    clearInputs()
                    setTimeout(() => {
                        statusMessage.remove()
                        form.style.display = 'block'
                        form.classList.remove('fadeOutUp')
                        form.classList.add('fadeInUp')
                    }, 5000);
                })
        })
    }

    const swiper = new Swiper('.swiper-container', {
        direction: 'vertical',
        slidesPerView: 'auto',
        navigation: {
            nextEl: '.article__next',
            prevEl: '.article__prev',
        },
        grabCursor: true
    })

    burger('.header__burger', '.header__list')
    forms()
})