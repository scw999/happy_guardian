// ============================================
// 캐릭터 선택 카루셀
// ============================================
let currentCharacterIndex = 0;
const totalCharacters = 4;

function changeCharacter(direction) {
    currentCharacterIndex += direction;

    if (currentCharacterIndex < 0) {
        currentCharacterIndex = totalCharacters - 1;
    } else if (currentCharacterIndex >= totalCharacters) {
        currentCharacterIndex = 0;
    }

    updateCarousel();
}

function goToCharacter(index) {
    currentCharacterIndex = index;
    updateCarousel();
}

function updateCarousel() {
    const carousel = document.getElementById('character-carousel');
    if (!carousel) return;

    carousel.style.transform = `translateX(-${currentCharacterIndex * 100}%)`;

    // 인디케이터 업데이트
    const indicators = document.querySelectorAll('.carousel-indicator');
    indicators.forEach((indicator, index) => {
        if (index === currentCharacterIndex) {
            indicator.classList.add('active');
        } else {
            indicator.classList.remove('active');
        }
    });
}

// 터치 스와이프 지원
let touchStartX = 0;
let touchEndX = 0;

document.addEventListener('DOMContentLoaded', () => {
    const carousel = document.getElementById('character-carousel');
    if (!carousel) return;

    carousel.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    });

    carousel.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    });
});

function handleSwipe() {
    const swipeThreshold = 50;
    const diff = touchStartX - touchEndX;

    if (Math.abs(diff) > swipeThreshold) {
        if (diff > 0) {
            // 왼쪽으로 스와이프 (다음)
            changeCharacter(1);
        } else {
            // 오른쪽으로 스와이프 (이전)
            changeCharacter(-1);
        }
    }
}
