document.addEventListener("DOMContentLoaded", () => {
    const introTexts = document.querySelectorAll('.intro-text-group text');
    const backgroundRect = document.querySelector('.banner-svg rect');
    let blinkCount = 0;
    let animationState = 'blinkIntro';

    function animate() {
        switch(animationState) {
            case 'blinkIntro':
                blinkIntro();
                break;
            case 'revealLetters':
                revealLetters();
                break;
        }
    }

    function blinkIntro() {
        backgroundRect.classList.remove('banner-bg-start');
        backgroundRect.classList.add('banner-bg-end');

        if (blinkCount < 5) {
            introTexts.forEach(text => {
                text.style.opacity = text.style.opacity === '0' ? '1' : '0';
            });
            setTimeout(() => {
                blinkCount++;
                animate();
            }, 500);
        } else {
            introTexts.forEach(text => text.style.opacity = '0');
            animationState = 'revealLetters';
            setTimeout(animate, 500);
        }
    }

    function revealLetters() {
        const letters = document.querySelectorAll('.letter');
        let letterIndex = 0;

        function showNextLetter() {
            if (letterIndex < letters.length) {
                letters[letterIndex].style.opacity = '1';
                letterIndex++;
                setTimeout(showNextLetter, 500);
            } else {
                backgroundRect.classList.remove('banner-bg-end');
                backgroundRect.classList.add('banner-bg-start');
                resetAnimation();
            }
        }

        showNextLetter();
    }

    function resetAnimation() {
        blinkCount = 0;
        animationState = 'blinkIntro';
        introTexts.forEach(text => text.style.opacity = '0');
        document.querySelectorAll('.letter').forEach(letter => letter.style.opacity = '0');
        setTimeout(animate, 2500);
    }

    animate();
});
