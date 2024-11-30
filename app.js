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
      // Kelime eşleştirme egzersizinin kodu burada yazılacak
    }
  
    function renderWordWritingExercise(container, wordPairs) {
      // Kelime yazma egzersizinin kodu burada yazılacak
    }
  
    function renderSentenceBuildingExercise(container, sentences) {
      // Cümle oluşturma egzersizinin kodu burada yazılacak
    }
  
    function renderSentenceCompletionExercise(container, sentences) {
      // Cümle tamamlama egzersizinin kodu burada yazılacak
    }
  });