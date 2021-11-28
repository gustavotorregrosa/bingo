import confetti from 'canvas-confetti'

const myCanvas = document.createElement('canvas');

const myConfetti = confetti.create(myCanvas, {
    resize: true,
    useWorker: true
});

export const callConfetti = () => confetti({
    particleCount: 1300,
    spread: 1000

})
