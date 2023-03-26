// dark - light switcher

const block = document.getElementsByClassName('dark-light-switch')
const switcher = document.getElementsByClassName('switcher');
let count_clicker = 0;

//
// Анимации туда-сюда
//

const keyframes_right = [
  { left: '.25em', backgroundColor: 'black'},
  { left: '2.25em', backgroundColor: 'white'}
];

const keyframes_left = [
  { left: '2.25em', backgroundColor: 'white'},
  { left: '.25em', backgroundColor: 'black' }
];

//
// Тайминги
//

const animate_timing = {
  duration: 150,
};

//
// Event
//

block[0].addEventListener('click', function () {
    if (count_clicker % 2 == 0){
        switcher[0].style.backgroundColor = '#fff';
        switcher[0].animate(keyframes_right, animate_timing);
        switcher[0].style.left = '2.25em';
        //
        // смена страницы на Светлую
        document.body.classList.add('light-theme-body');
        document.querySelector('.main-content').classList.add('light-theme-body2');

        // header
        document.querySelector('.header').classList.add('light-theme-header-footer');
        document.querySelectorAll('ul:not(.dropdown-menu) li')
            .forEach((el) => el.classList.add('light-theme-header-footer'));
        document.querySelectorAll('ul:not(.dropdown-menu) li :is(a)')
            .forEach((el) => el.classList.add('light-theme-header-footer'));

        // footer
        document.querySelector('.footer').classList.add('light-theme-header-footer');

        // основные блоки
        // document.querySelector('.content').classList.add('light-theme-content');
        document.querySelectorAll('.name-items:not(#active)').forEach((el) => {
           el.classList.add('light-theme-content');
        });
        document.querySelectorAll('.some-info').forEach((el) => {
           el.classList.add('light-theme-content');
        });
    }
    else {
        switcher[0].style.backgroundColor = '#1f1f1f';
        switcher[0].animate(keyframes_left, animate_timing);
        switcher[0].style.left = '.25em';
        //
        // смена страницы на Темную
        document.body.classList.remove('light-theme-body');
        document.querySelector('.main-content').classList.remove('light-theme-body2');

        // header
        document.querySelector('.header').classList.remove('light-theme-header-footer');
        document.querySelectorAll('ul:not(.dropdown-menu) li')
            .forEach((el) => el.classList.remove('light-theme-header-footer'));
        document.querySelectorAll('ul:not(.dropdown-menu) li :is(a)')
            .forEach((el) => el.classList.remove('light-theme-header-footer'));

        // footer
        document.querySelector('.footer').classList.remove('light-theme-header-footer');

        // основные блоки
        // document.querySelector('.content').classList.remove('light-theme-content');
        document.querySelectorAll('.name-items:not(#active)').forEach((el) => {
           el.classList.remove('light-theme-content');
        });
        document.querySelectorAll('.some-info').forEach((el) => {
           el.classList.remove('light-theme-content');
        });
    }

    count_clicker = count_clicker + 1;
});
