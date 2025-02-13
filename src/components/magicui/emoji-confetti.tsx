"use client";

import confetti from 'canvas-confetti';

// Define custom options type to include content property
type CustomConfettiOptions = Parameters<typeof confetti>[0] & {
  content?: string;
};

const emojis = ['❤️', '🎊', '💍', '💐', '💌'];

export const fireEmojiConfetti = () => {
    const colors = ['#ff0000', '#ff69b4', '#ff1493'];

    const defaults = {
        spread: 360,
        ticks: 100,
        gravity: 0.5,
        decay: 0.94,
        startVelocity: 30,
        shapes: ['circle'],
        colors: colors,
    };

    function fire(particleRatio: number, opts: Partial<CustomConfettiOptions>) {
        confetti({
            ...defaults,
            ...opts,
            particleCount: Math.floor(200 * particleRatio),
        } as confetti.Options);
    }

    // Regular confetti bursts
    fire(0.25, {
        spread: 26,
        startVelocity: 55,
    });

    fire(0.2, {
        spread: 60,
    });

    fire(0.35, {
        spread: 100,
        decay: 0.91,
        scalar: 0.8,
    });

    fire(0.1, {
        spread: 120,
        startVelocity: 25,
        decay: 0.92,
        scalar: 1.2,
    });

    fire(0.1, {
        spread: 120,
        startVelocity: 45,
    });

    // Emoji particles
    emojis.forEach((emoji, index) => {
        setTimeout(() => {
            const opts: CustomConfettiOptions = {
                particleCount: 1,
                startVelocity: 30,
                spread: 360,
                ticks: 60,
                origin: {
                    x: Math.random(),
                    y: Math.random() * 0.5 + 0.3,
                },
                colors: ['#ff0000'],
                shapes: ['circle'],
                scalar: 2,
                content: emoji,
            };

            confetti(opts as confetti.Options);
        }, index * 200);
    });
};