import gsap from 'gsap';
import {navigateTo} from "../router.js";

export function fromHomeToSpoons() {
    const menuButtons = document.querySelectorAll('.home-menu');
    if (!menuButtons) return;
    menuButtons.forEach((btn, i) => {
        btn.addEventListener("touchstart", () => {
            leaveAnimation(menuButtons);
        })
    })
}

function leaveAnimation(btns) {
    if (!btns.length > 0) return;
    const width = window.innerWidth;
    console.log(typeof width)

    btns.forEach((btn, i) => {
        gsap.to(btn, {
            x: i % 2 === 0 ? -width : width,
            duration: 0.4,
            ease: "power2.out",
            onComplete: () => backgroundAnimation()
        });
    })
}

function backgroundAnimation() {
    const app = document.getElementById('app');
    if (!app) return;

    gsap.to(app, {
        opacity: 0,
        duration: 0.8,
        ease: "power2.out",
        onComplete: () => {
            const view = '/spoons';
            navigateTo(view)
            gsap.fromTo(app, {
                opacity: 0
            }, {
                opacity: 1,
                duration: 0.8,
                ease: "power2.in"
            })
        }
    })
}
