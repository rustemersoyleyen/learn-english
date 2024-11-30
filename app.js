document.addEventListener('DOMContentLoaded', () => {
    const appElement = document.getElementById('app');
  
    // Veri JSON dosyasından çekiliyor
    fetch('data.json')
      .then(response => response.json())
      .then(data => {
        renderUnitList(data.units);
      })
      .catch(error => {
        console.error('Veri çekilirken hata:', error);
      });
  
    function renderUnitList(units) {
      const container = document.createElement('div');
      container.classList.add('container');
  
      units.forEach(unit => {
        const unitCard = document.createElement('div');
        unitCard.classList.add('unit-card');
        unitCard.addEventListener('click', () => renderUnitExercises(unit));
  
        const image = document.createElement('img');
        image.src = unit.image;
        image.alt = unit.name;
  
        const title = document.createElement('h2');
        title.textContent = unit.name;
  
        unitCard.appendChild(image);
        unitCard.appendChild(title);
        container.appendChild(unitCard);
      });
  
      appElement.innerHTML = '';
      appElement.appendChild(container);
    }
  
    function renderUnitExercises(unit) {
      const container = document.createElement('div');
      container.classList.add('container');
  
      const exerciseSection = document.createElement('div');
      exerciseSection.classList.add('exercise-section');
  
      // Kelime eşleştirme egzersizi oluşturuluyor
      renderWordPairExercise(exerciseSection, unit.wordPairs);

  
      // Kelime yazma egzersizi oluşturuluyor
      renderWordWritingExercise(exerciseSection, unit.wordPairs);
  
      // Cümle oluşturma egzersizi oluşturuluyor
      renderSentenceBuildingExercise(exerciseSection, unit.sentences);
  
      // Cümle tamamlama egzersizi oluşturuluyor
      renderSentenceCompletionExercise(exerciseSection, unit.sentences);
  
      container.appendChild(exerciseSection);
      appElement.innerHTML = '';
      appElement.appendChild(container);
    }
  
    // Egzersiz oluşturma fonksiyonları
function renderWordPairExercise(container, wordPairs) {
  // Kelime eşleştirme egzersizi bileşeni
  const exerciseCard = document.createElement('div');
  exerciseCard.classList.add('exercise-card');

  const title = document.createElement('h3');
  title.textContent = 'Kelime Eşleştirme';

  const wordPairList = document.createElement('div');

  wordPairs.forEach(pair => {
    const wordPairItem = document.createElement('div');
    wordPairItem.classList.add('word-pair');

    const wordInput = document.createElement('input');
    wordInput.type = 'text';
    wordInput.placeholder = 'Kelimeyi girin';

    const optionsContainer = document.createElement('div');
    optionsContainer.classList.add('options');

    const options = shuffleArray([
      { value: pair.translation, isCorrect: true },
      { value: getRandomTranslation(wordPairs, pair.translation), isCorrect: false },
      { value: getRandomTranslation(wordPairs, pair.translation), isCorrect: false },
      { value: getRandomTranslation(wordPairs, pair.translation), isCorrect: false }
    ]);

    options.forEach(option => {
      const optionButton = document.createElement('button');
      optionButton.textContent = option.value;
      optionButton.classList.add('option-btn');
      optionButton.addEventListener('click', () => checkAnswer(optionButton, option.isCorrect));
      optionsContainer.appendChild(optionButton);
    });

    wordPairItem.appendChild(wordInput);
    wordPairItem.appendChild(optionsContainer);
    wordPairList.appendChild(wordPairItem);
  });

  exerciseCard.appendChild(title);
  exerciseCard.appendChild(wordPairList);
  container.appendChild(exerciseCard);

  function checkAnswer(button, isCorrect) {
    if (isCorrect) {
      button.classList.add('correct');
      // Doğru cevap için alkış efekti veya puan artışı
    } else {
      button.classList.add('incorrect');
      // Yanlış cevap için uyarı efekti veya puan azalışı
    }
  }

  function shuffleArray(array) {
    return array.sort(() => Math.random() - 0.5);
  }

  function getRandomTranslation(wordPairs, exclude) {
    const randomIndex = Math.floor(Math.random() * wordPairs.length);
    const randomPair = wordPairs[randomIndex];
    return randomPair.translation !== exclude ? randomPair.translation : getRandomTranslation(wordPairs, exclude);
  }
}
  
function renderWordWritingExercise(container, wordPairs) {
  // Kelime yazma egzersizi bileşeni
  const exerciseCard = document.createElement('div');
  exerciseCard.classList.add('exercise-card');

  const title = document.createElement('h3');
  title.textContent = 'Kelime Yazma';

  const wordList = document.createElement('div');
  wordList.classList.add('word-list');

  wordPairs.forEach(pair => {
    const wordItem = document.createElement('div');
    wordItem.classList.add('word-item');

    const wordLabel = document.createElement('label');
    wordLabel.textContent = pair.word;

    const wordInput = document.createElement('input');
    wordInput.type = 'text';
    wordInput.placeholder = 'Anlamını yazın';
    wordInput.addEventListener('input', () => checkAnswer(wordInput, pair.translation));

    const feedback = document.createElement('div');
    feedback.classList.add('feedback');

    wordItem.appendChild(wordLabel);
    wordItem.appendChild(wordInput);
    wordItem.appendChild(feedback);
    wordList.appendChild(wordItem);
  });

  exerciseCard.appendChild(title);
  exerciseCard.appendChild(wordList);
  container.appendChild(exerciseCard);

  function checkAnswer(input, correctAnswer) {
    const feedback = input.parentElement.querySelector('.feedback');
    if (input.value.trim().toLowerCase() === correctAnswer.toLowerCase()) {
      feedback.textContent = 'Doğru!';
      feedback.classList.add('correct');
      // Doğru cevap için puan artışı
    } else {
      feedback.textContent = 'Yanlış, tekrar deneyin.';
      feedback.classList.add('incorrect');
      // Yanlış cevap için puan azalışı
    }
  }
}
  
function renderSentenceBuildingExercise(container, sentences) {
  // Cümle oluşturma egzersizi bileşeni
  const exerciseCard = document.createElement('div');
  exerciseCard.classList.add('exercise-card');

  const title = document.createElement('h3');
  title.textContent = 'Cümle Oluşturma';

  const sentenceList = document.createElement('div');
  sentenceList.classList.add('sentence-list');

  sentences.forEach(sentence => {
    const sentenceItem = document.createElement('div');
    sentenceItem.classList.add('sentence-item');

    const wordList = sentence.english.split(' ').map(word => {
      const wordElement = document.createElement('div');
      wordElement.classList.add('word');
      wordElement.textContent = word;
      return wordElement;
    });

    wordList.sort(() => Math.random() - 0.5);

    const sentenceContainer = document.createElement('div');
    sentenceContainer.classList.add('sentence-container');
    sentenceContainer.append(...wordList);

    const submitButton = document.createElement('button');
    submitButton.textContent = 'Cümleyi Oluştur';
    submitButton.addEventListener('click', () => checkSentence(sentenceContainer, sentence.english));

    sentenceItem.appendChild(sentenceContainer);
    sentenceItem.appendChild(submitButton);
    sentenceList.appendChild(sentenceItem);
  });

  exerciseCard.appendChild(title);
  exerciseCard.appendChild(sentenceList);
  container.appendChild(exerciseCard);

  function checkSentence(container, correctSentence) {
    const words = container.querySelectorAll('.word');
    const userSentence = Array.from(words).map(word => word.textContent).join(' ');

    if (userSentence.trim().toLowerCase() === correctSentence.trim().toLowerCase()) {
      container.classList.add('correct');
      // Doğru cümle için puan artışı
    } else {
      container.classList.add('incorrect');
      // Yanlış cümle için puan azalışı
    }
  }
}
function renderSentenceCompletionExercise(container, sentences) {
  // Cümle tamamlama egzersizi bileşeni
  const exerciseCard = document.createElement('div');
  exerciseCard.classList.add('exercise-card');

  const title = document.createElement('h3');
  title.textContent = 'Cümle Tamamlama';

  const sentenceList = document.createElement('div');
  sentenceList.classList.add('sentence-list');

  sentences.forEach(sentence => {
    const sentenceItem = document.createElement('div');
    sentenceItem.classList.add('sentence-item');

    const sentenceText = sentence.english.split(' ');
    const missingIndex = Math.floor(Math.random() * sentenceText.length);
    const missingWord = sentenceText[missingIndex];
    sentenceText[missingIndex] = '_____';

    const sentenceElement = document.createElement('div');
    sentenceElement.classList.add('sentence');
    sentenceElement.textContent = sentenceText.join(' ');

    const input = document.createElement('input');
    input.type = 'text';
    input.placeholder = 'Kelimeyi doldurun';
    input.addEventListener('input', () => checkAnswer(input, missingWord));

    const feedback = document.createElement('div');
    feedback.classList.add('feedback');

    sentenceItem.appendChild(sentenceElement);
    sentenceItem.appendChild(input);
    sentenceItem.appendChild(feedback);
    sentenceList.appendChild(sentenceItem);
  });

  exerciseCard.appendChild(title);
  exerciseCard.appendChild(sentenceList);
  container.appendChild(exerciseCard);

  function checkAnswer(input, correctAnswer) {
    const feedback = input.parentElement.querySelector('.feedback');
    if (input.value.trim().toLowerCase() === correctAnswer.toLowerCase()) {
      feedback.textContent = 'Doğru!';
      feedback.classList.add('correct');
      // Doğru cevap için puan artışı
    } else {
      feedback.textContent = 'Yanlış, tekrar deneyin.';
      feedback.classList.add('incorrect');
      // Yanlış cevap için puan azalışı
    }
  }
}
  });