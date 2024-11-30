document.addEventListener('DOMContentLoaded', () => {
    const unitSelectionScreen = document.getElementById('unit-selection-screen');
    const exerciseScreen = document.getElementById('exercise-screen');
    const backToUnitsBtn = document.getElementById('back-to-units');
    const questionDiv = document.getElementById('question');
    const optionsDiv = document.getElementById('options');
    let currentUnit = null;
    let currentQuestionIndex = 0;
    let selectedAnswer = null;
  
    // JSON'dan veri çekme
    fetch('data.json')
      .then((response) => response.json())
      .then((data) => {
        renderUnits(data.units);
      });
  
    // Ünite listesi oluşturma
    function renderUnits(units) {
      const unitList = document.getElementById('unit-list');
      units.forEach((unit) => {
        const unitCard = document.createElement('div');
        unitCard.classList.add('unit-card');
        unitCard.innerHTML = `
          <img src="${unit.unitImage}" alt="${unit.unitName}">
          <h3>${unit.unitName}</h3>
        `;
        unitCard.addEventListener('click', () => startExercise(unit));
        unitList.appendChild(unitCard);
      });
    }
  
    // Egzersiz başlatma
    function startExercise(unit) {
      currentUnit = unit;
      currentQuestionIndex = 0;
      unitSelectionScreen.classList.add('hidden');
      exerciseScreen.classList.remove('hidden');
      loadQuestion();
    }
  
    // Soru yükleme
    function loadQuestion() {
      const word = currentUnit.words[currentQuestionIndex];
      const direction = Math.random() > 0.5 ? 'tr-en' : 'en-tr';
      const questionText = direction === 'tr-en' ? word.turkish : word.english;
      const correctAnswer = direction === 'tr-en' ? word.english : word.turkish;
  
      questionDiv.innerHTML = `<p>${questionText}</p><img src="${word.image}" alt="Kelime Görseli">`;
      generateOptions(correctAnswer, direction);
      textToSpeech(questionText, 'tr'); // Soruyu seslendir
    }
  
    // Seçenekleri oluşturma
    function generateOptions(correctAnswer, direction) {
      optionsDiv.innerHTML = '';
      const allOptions = [...currentUnit.words.map((w) => (direction === 'tr-en' ? w.english : w.turkish))];
      shuffleArray(allOptions);
      const options = allOptions.slice(0, 3);
      options.push(correctAnswer);
      shuffleArray(options);
  
      options.forEach((option) => {
        const btn = document.createElement('button');
        btn.textContent = option;
        btn.addEventListener('click', () => {
          selectedAnswer = option;
          checkAnswer(correctAnswer);
        });
        optionsDiv.appendChild(btn);
      });
    }
  
    // Cevabı kontrol et
    function checkAnswer(correctAnswer) {
      if (selectedAnswer === correctAnswer) {
        alert('Doğru!');
        textToSpeech('Tebrikler!', 'tr');
      } else {
        alert('Yanlış!');
        textToSpeech('Tekrar deneyin.', 'tr');
      }
  
      currentQuestionIndex++;
      if (currentQuestionIndex < currentUnit.words.length) {
        loadQuestion();
      } else {
        alert('Egzersiz tamamlandı!');
        reset();
      }
    }
  
    // Ekranları sıfırlama
    function reset() {
      exerciseScreen.classList.add('hidden');
      unitSelectionScreen.classList.remove('hidden');
    }
  
    // Rastgele karıştırma
    function shuffleArray(array) {
      return array.sort(() => Math.random() - 0.5);
    }
  
    // Text-to-Speech
    function textToSpeech(text, lang) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = lang;
      speechSynthesis.speak(utterance);
    }
  
    // Geri dön butonu
    backToUnitsBtn.addEventListener('click', reset);
  });
  