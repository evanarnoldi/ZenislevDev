// Mobile menu toggle. Replaces Bootstrap's JavaScript bundle (~23K), which the site only used for this.
// Uses Bootstrap's own CSS classes (collapse / collapsing / show), so the look and animation are unchanged.
document.addEventListener('DOMContentLoaded', function () {
    const toggler = document.querySelector('.navbar-toggler');
    const menu = toggler && document.getElementById(toggler.getAttribute('aria-controls'));
    if (!menu) return;

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let animating = false;

    function isOpen() {
        return menu.classList.contains('show');
    }

    function finish(open) {
        menu.classList.remove('collapsing');
        menu.classList.add('collapse');
        menu.classList.toggle('show', open);
        menu.style.height = '';
        animating = false;
    }

    function setOpen(open) {
        if (animating || open === isOpen()) return;
        toggler.setAttribute('aria-expanded', String(open));
        toggler.classList.toggle('collapsed', !open);

        if (reduceMotion) {
            finish(open);
            return;
        }

        animating = true;
        if (open) {
            // Expand from 0 to the menu's natural height
            menu.classList.remove('collapse');
            menu.classList.add('collapsing');
            menu.style.height = menu.scrollHeight + 'px';
        } else {
            // Pin the current height, then animate down to 0
            menu.style.height = menu.getBoundingClientRect().height + 'px';
            void menu.offsetHeight; // force the browser to apply the pinned height first
            menu.classList.remove('collapse', 'show');
            menu.classList.add('collapsing');
            menu.style.height = '';
        }

        // Bootstrap's .collapsing transition is 0.35s; the timeout is a safety net if transitionend never fires
        let done = false;
        const end = function () {
            if (done) return;
            done = true;
            menu.removeEventListener('transitionend', onEnd);
            finish(open);
        };
        // Links inside the menu have their own hover transitions; only the menu's height counts
        const onEnd = function (e) {
            if (e.target === menu && e.propertyName === 'height') end();
        };
        menu.addEventListener('transitionend', onEnd);
        setTimeout(end, 450);
    }

    toggler.addEventListener('click', function () {
        setOpen(!isOpen());
    });

    // Close the menu after picking a section, so it doesn't cover the content you jumped to
    menu.querySelectorAll('a').forEach(function (link) {
        link.addEventListener('click', function () {
            if (isOpen()) setOpen(false);
        });
    });

    // Escape closes the menu and returns focus to the button
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && isOpen()) {
            setOpen(false);
            toggler.focus();
        }
    });
});
