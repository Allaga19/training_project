// 'use strict';
import countTimer from './modules/countTimer';
import toggleMenu from './modules/toggleMenu';
import togglePopup from './modules/togglePopup';
import tabs from './modules/tabs';
import slider from './modules/slider';
import commandPhotoMouseEnter from './modules/commandPhotoMouseEnter';
import calc from './modules/calc';
import sendForm from './modules/sendForm';
// -------------------- Timer
countTimer('04 03 2022');
// ---------------------- MENU -----------
toggleMenu();
// ---------------------- POPUP ----------
togglePopup();
// ---------------------- ТАБЫ -----------
tabs();
// --------------------- СЛАЙДЫ -----------
slider();
// ------------------- COMMAND ------------
commandPhotoMouseEnter();
// --------------- Калькулятор ------------
calc(100);
// --------------- send-ajax-form ------------
sendForm('form1'); // форма в header
sendForm('form2'); // форма в footer
sendForm('form3'); // форма модального окна
// sendForm();
