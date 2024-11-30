let score = 0;
let correctAnswer = "saçlarımı taramak"; // Örnek doğru cevap

// Sesli Okuma Fonksiyonu
function playAudio() {
    const audio = new Audio('path_to_audio_file.mp3');  // Ses dosyasını burada belirtin
    audio.play();
}

// Cevap Kontrol Fonksiyonu
function checkAnswer() {
    const selectedOption = document.querySelector('.option-button.selected');
    if (!selectedOption) {
        alert('Lütfen bir seçenek seçin!');
        return;
    }
    
    if (selectedOption.textContent === correctAnswer) {
        alert('Tebrikler, doğru cevap!');
        score += 3;
    } else {
        alert('Yanlış cevap, tekrar deneyin!');
        score -= 1;
    }

    document.getElementById('score').textContent = `Puan: ${score}`;
}

// Sonraki Egzersize Geçiş Fonksiyonu
function nextExercise() {
    // Yeni egzersizlere geçiş fonksiyonu
    alert('Sonraki egzersize geçiliyor...');
}

// Seçenekleri Seçme
document.querySelectorAll('.option-button').forEach(button => {
    button.addEventListener('click', () => {
        document.querySelectorAll('.option-button').forEach(b => b.classList.remove('selected'));
        button.classList.add('selected');
    });
});
