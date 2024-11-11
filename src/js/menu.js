'use strict'

const menuBurger = document.querySelector('.header__burger')
const menu = document.querySelector('.menu')
const cross = document.querySelector('.menu__cross')

console.log(menuBurger)

menuBurger.addEventListener('click', () => {
    menu.classList.add('active')
})

cross.addEventListener('click', () => {
    menu.classList.remove('active')
})