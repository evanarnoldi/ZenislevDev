// Animate On Scroll setup (moved out of resume.js so a resume bug can't stop the page from revealing)
document.addEventListener('DOMContentLoaded', function () {
    if (typeof AOS === 'undefined') return;

    // Respect visitors who have turned off animations in their OS settings
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: true,          // animate each section the first time it appears, not on every scroll back
        disable: reduceMotion
    });
});
