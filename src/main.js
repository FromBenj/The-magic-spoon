// dotenv

// Data
// import {protectDataAccess} from "./data/data-page-protection.js";

// Styles
import 'bootstrap/dist/css/bootstrap.min.css';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import '@fortawesome/fontawesome-free/css/all.css';
import '/src/app.scss';

// Js
import 'bootstrap';
import {appRouter} from "./router.js";

document.addEventListener('DOMContentLoaded', () => {
    appRouter();
})

console.log('main.js is running correctly');
