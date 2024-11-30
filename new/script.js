document.addEventListener('DOMContentLoaded', () => {
    const unitSelectionScreen = document.getElementById('unit-selection-screen');
    const exerciseSelectionScreen = document.getElementById('exercise-selection-screen');
    const exerciseScreen = document.getElementById('exercise-screen');
    const backToUnitsBtn = document.getElementById('back-to-units');
    const backToExercisesBtn = document.getElementById('back-to-exercises');
    const questionDiv = document.getElementById('question');
    const optionsDiv = document.getElementById('options');
    let currentUnit = null;
    let selectedExercise = null;
    let currentQuestionIndex = 0;
  
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
        unitCard.addEventListener('click', () => openExerciseSelection(unit));
        unitList.appendChild(unitCard);
      });
    }
  
    // Egzersiz seçim ekranını aç
    function openExerciseSelection(unit) {
      currentUnit = unit;
      unitSelectionScreen.classList.add('hidden');
      exerciseSelectionScreen.classList.remove('hidden');
    }
  
    // Egzersiz başlatma
    function startExercise(exerciseType) {
      selectedExercise = exerciseType;
      currentQuestionIndex = 0;
      exerciseSelectionScreen.classList.add('hidden');
      exerciseScreen.classList.remove('hidden');
      loadQuestion();
    }
  
    // Soru yükleme
    function loadQuestion() {
      const word = currentUnit.words[currentQuestionIndex];
      if (!word) {
        alert('Egzersiz tamamlandı!');
        resetToUnits();
        return;
      }
  
      if (selectedExercise === 'word-guess') {
        renderWordGuess(word);
      } else if (selectedExercise === 'word-writing') {
        renderWordWriting(word);
      }
      // Diğer egzersizler eklenecek...
    }
  
    // Kelime Bulma Egzersizi
    function renderWordGuess(word) {
      const direction = Math.random() > 0.5 ? 'tr-en' : 'en-tr';
      const questionText = direction === 'tr-en' ? word.turkish : word.english;
      const correctAnswer = direction === 'tr-en' ? word.english : word.turkish;
  
      questionDiv.innerHTML = `<p>${questionText}</p><img src="${word.image}" alt="Kelime Görseli">`;
      generateOptions(correctAnswer, direction);
      textToSpeech(questionText, 'tr');
    }
  
    // Kelime Yazma Egzersizi
    function renderWordWriting(word) {
      const direction = Math.random() > 0.5 ? 'tr-en' : 'en-tr';
      const questionText = direction === 'tr-en' ? word.turkish : word.english;
      questionDiv.innerHTML = `<p>${questionText}</p><img src="${word.image}" alt="Kelime Görseli">`;
      optionsDiv.innerHTML = `<input type="text" id="answer-input" placeholder="Cevabınızı yazın">`;
      textToSpeech(questionText, 'tr');
    }
  
    // Seçenek oluşturma
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
          alert(option === correctAnswer ? 'Doğru!' : 'Yanlış!');
          currentQuestionIndex++;
          loadQuestion();
        });
        optionsDiv.appendChild(btn);
      });
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
  
    // Geri butonları
    backToUnitsBtn.addEventListener('click', resetToUnits);
    backToExercisesBtn.addEventListener('click', resetToExercises);
  
    function resetToUnits() {
      exerciseSelectionScreen.classList.add('hidden');
      exerciseScreen.classList.add('hidden');
      unitSelectionScreen.classList.remove('hidden');
    }
  
    function resetToExercises() {
      exerciseScreen.classList.add('hidden');
      exerciseSelectionScreen.classList.remove('hidden');
    }
  });
  