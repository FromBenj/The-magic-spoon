// dotenv

// Data
// import {protectDataAccess} from "./data/data-page-protection.js";

// Styles
import 'bootstrap/dist/css/bootstrap.min.css';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import '/src/app.scss';

// Js
import 'bootstrap';
import {loadHome} from './js/home.js';
import {appRouter} from "./router.js";
document.addEventListener('DOMContentLoaded', async () => {
    appRouter();
    loadHome();
})

console.log('main.js is running correctly');
