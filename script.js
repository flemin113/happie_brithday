import confetti from 'canvas-confetti';

document.addEventListener('DOMContentLoaded', () => {
    const surpriseBtn = document.getElementById('surpriseBtn');
    const videoModal = document.getElementById('videoModal');
    const video = document.getElementById('surpriseVideo');
    const closeBtn = document.getElementById('closeVideoBtn');
    let isConfettiPlaying = false;

    surpriseBtn.addEventListener('click', () => {
        // Show Video Modal
        videoModal.classList.remove('hidden');

        // Play Video
        video.play().catch(e => {
            console.log("Video play failed:", e);
        });

        // Trigger Confetti (if not already looping or overwhelmed)
        if (!isConfettiPlaying) {
            fireConfetti();
        }
    });

    closeBtn.addEventListener('click', () => {
        // Hide Modal
        videoModal.classList.add('hidden');

        // Pause Video and Reset
        video.pause();
        video.currentTime = 0;
    });

    // Close modal on click outside video
    videoModal.addEventListener('click', (e) => {
        if (e.target === videoModal) {
            closeBtn.click();
        }
    });

    function fireConfetti() {
        isConfettiPlaying = true;
        const duration = 3000;
        const animationEnd = Date.now() + duration;
        const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 101 }; // Higher zIndex on top of modal

        function randomInRange(min, max) {
            return Math.random() * (max - min) + min;
        }

        const interval = setInterval(function () {
            const timeLeft = animationEnd - Date.now();

            if (timeLeft <= 0) {
                isConfettiPlaying = false;
                return clearInterval(interval);
            }

            const particleCount = 50 * (timeLeft / duration);

            confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.1, 0.3), y: randomInRange(0.2, 0.5) } }));
            confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.7, 0.9), y: randomInRange(0.2, 0.5) } }));
        }, 250);
    }
});
