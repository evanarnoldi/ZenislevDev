document.addEventListener('DOMContentLoaded', function () {
    // Each button finds its own card, so a card missing a button can't break the others
    function setFlipped(card, flipped) {
        const front = card.querySelector('.project-card-front');
        const back = card.querySelector('.project-card-back');
        card.classList.toggle('flipped', flipped);

        // Only the visible face can receive keyboard focus or be read by screen readers
        front.inert = flipped;
        back.inert = !flipped;

        // Move focus to the control on the face that's now showing
        const target = card.querySelector(flipped ? '.close-details-btn' : '.view-details-btn');
        if (target) target.focus({ preventScroll: true });
    }

    document.querySelectorAll('.view-details-btn').forEach(function (btn) {
        btn.addEventListener('click', function () {
            setFlipped(btn.closest('.project-card'), true);
        });
    });

    document.querySelectorAll('.close-details-btn').forEach(function (btn) {
        btn.addEventListener('click', function () {
            setFlipped(btn.closest('.project-card'), false);
        });
    });
});
