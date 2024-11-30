// app.js dosyası güncellendi
document.addEventListener('DOMContentLoaded', () => {
    const appElement = document.getElementById('app');
    let currentExerciseIndex = 0;
    let totalScore = 0;

    // JSON verilerini çek
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
            unitCard.addEventListener('click', () => renderExercises(unit));

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

    function renderExercises(unit) {
        const container = document.createElement('div');
        container.classList.add('container');

        const exerciseSection = document.createElement('div');
        exerciseSection.classList.add('exercise-section');

        // Kelime Eşleştirme Egzersizi
        renderWordMatchingExercise(exerciseSection, unit.wordPairs);

        // Kelime Yazma Egzersizi 
        renderWordWritingExercise(exerciseSection, unit.wordPairs);

        // Cümle Oluşturma Egzersizi
        renderSentenceConstructionExercise(exerciseSection, unit.sentences);

        // Cümle Tamamlama Egzersizi
        renderSentenceCompletionExercise(exerciseSection, unit.sentences);

        container.appendChild(exerciseSection);
        appElement.innerHTML = '';
        appElement.appendChild(container);
    }

    function renderWordMatchingExercise(container, wordPairs) {
        const exerciseCard = document.createElement('div');
        exerciseCard.classList.add('exercise-card');

        const title = document.createElement('h3');
        title.textContent = 'Kelime Eşleştirme';

        const wordPairList = document.createElement('div');

        const currentPair = wordPairs[currentExerciseIndex];

        const wordInput = document.createElement('input');
        wordInput.type = 'text';
        wordInput.placeholder = 'Kelimeyi girin';
        wordInput.addEventListener('input', () => checkWordMatch(wordInput, currentPair));

        const optionsContainer = document.createElement('div');
        optionsContainer.classList.add('options');

        const options = shuffleArray([
            { value: currentPair.translation, isCorrect: true },
            { value: getRandomTranslation(wordPairs, currentPair.translation), isCorrect: false },
            { value: getRandomTranslation(wordPairs, currentPair.translation), isCorrect: false },
            { value: getRandomTranslation(wordPairs, currentPair.translation), isCorrect: false }
        ]);

        options.forEach(option => {
            const optionButton = document.createElement('button');
            optionButton.textContent = option.value;
            optionButton.classList.add('option-btn');
            optionButton.addEventListener('click', () => checkWordMatch(optionButton, option));
            optionsContainer.appendChild(optionButton);
        });

        const scoreElement = document.createElement('div');
        scoreElement.classList.add('score');
        scoreElement.textContent = `Puan: ${totalScore}`;

        const feedbackElement = document.createElement('div');
        feedbackElement.classList.add('feedback');

        exerciseCard.appendChild(title);
        exerciseCard.appendChild(wordInput);
        exerciseCard.appendChild(optionsContainer);
        exerciseCard.appendChild(scoreElement);
        exerciseCard.appendChild(feedbackElement);
        container.appendChild(exerciseCard);

        function checkWordMatch(element, option) {
            if (option.isCorrect) {
                element.classList.add('correct');
                totalScore += 3;
                playAudio('correct');
            } else {
                element.classList.add('incorrect');
                totalScore -= 1;
                playAudio('incorrect');
                feedbackElement.textContent = `Doğru cevap: ${currentPair.translation}`;
            }
            scoreElement.textContent = `Puan: ${totalScore}`;
            currentExerciseIndex++;
            if (currentExerciseIndex < wordPairs.length) {
                renderWordMatchingExercise(container, wordPairs);
            } else {
                currentExerciseIndex = 0;
                renderExercises(unit);
            }
        }
    }

    function renderWordWritingExercise(container, wordPairs) {
        const exerciseCard = document.createElement('div');
        exerciseCard.classList.add('exercise-card');

        const title = document.createElement('h3');
        title.textContent = 'Kelime Yazma';

        const wordList = document.createElement('div');
        wordList.classList.add('word-list');

        const currentPair = wordPairs[currentExerciseIndex];

        const wordLabel = document.createElement('label');
        wordLabel.textContent = currentPair.word;

        const wordInput = document.createElement('input');
        wordInput.type = 'text';
        wordInput.placeholder = 'Anlamını yazın';
        wordInput.addEventListener('input', () => checkWordWriting(wordInput, currentPair));

        const scoreElement = document.createElement('div');
        scoreElement.classList.add('score');
        scoreElement.textContent = `Puan: ${totalScore}`;

        const feedbackElement = document.createElement('div');
        feedbackElement.classList.add('feedback');

        exerciseCard.appendChild(title);
        exerciseCard.appendChild(wordLabel);
        exerciseCard.appendChild(wordInput);
        exerciseCard.appendChild(scoreElement);
        exerciseCard.appendChild(feedbackElement);
        container.appendChild(exerciseCard);

        function checkWordWriting(input, pair) {
            if (input.value.trim().toLowerCase() === pair.translation.toLowerCase()) {
                input.classList.add('correct');
                totalScore += 10;
                playAudio('correct');
                feedbackElement.textContent = 'Doğru!';
            } else {
                input.classList.add('incorrect');
                totalScore -= 1;
                playAudio('incorrect');
                feedbackElement.textContent = 'Yanlış, tekrar deneyin.';
            }
            scoreElement.textContent = `Puan: ${totalScore}`;
            currentExerciseIndex++;
            if (currentExerciseIndex < wordPairs.length) {
                renderWordWritingExercise(container, wordPairs);
            } else {
                currentExerciseIndex = 0;
                renderExercises(unit);
            }
        }
    }

    function renderSentenceConstructionExercise(container, sentences) {
        const exerciseCard = document.createElement('div');
        exerciseCard.classList.add('exercise-card');

        const title = document.createElement('h3');
        title.textContent = 'Cümle Oluşturma';

        const sentenceList = document.createElement('div');
        sentenceList.classList.add('sentence-list');

        const currentSentence = sentences[currentExerciseIndex];

        const wordList = currentSentence.english.split(' ').map(word => {
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
        submitButton.addEventListener('click', () => checkSentence(sentenceContainer, currentSentence));

        const scoreElement = document.createElement('div');
        scoreElement.classList.add('score');
        scoreElement.textContent = `Puan: ${totalScore}`;

        const feedbackElement = document.createElement('div');
        feedbackElement.classList.add('feedback');

        exerciseCard.appendChild(title);
        exerciseCard.appendChild(sentenceContainer);
        exerciseCard.appendChild(submitButton);
        exerciseCard.appendChild(scoreElement);
        exerciseCard.appendChild(feedbackElement);
        container.appendChild(exerciseCard);

        function checkSentence(container, sentence) {
            const words = container.querySelectorAll('.word');
            const userSentence = Array.from(words).map(word => word.textContent).join(' ');

            if (userSentence.trim().toLowerCase() === sentence.english.trim().toLowerCase()) {
                container.classList.add('correct');
                totalScore += 8;
                playAudio('correct');
                feedbackElement.textContent = 'Doğru!';
            } else {
                container.classList.add('incorrect');
                totalScore -= 1;
                playAudio('incorrect');
                feedbackElement.textContent = `Doğru cümle: ${sentence.english}`;
            }
            scoreElement.textContent = `Puan: ${totalScore}`;
            currentExerciseIndex++;
            if (currentExerciseIndex < sentences.length) {
                renderSentenceConstructionExercise(container, sentences);
            } else {
                currentExerciseIndex = 0;
                renderExercises(unit);
            }
        }
    }

    function renderSentenceCompletionExercise(container, sentences) {
        const exerciseCard = document.createElement('div');
        exerciseCard.classList.add('exercise-card');

        const title = document.createElement('h3');
        title.textContent = 'Cümle Tamamlama';

        const sentenceList = document.createElement('div');
        sentenceList.classList.add('sentence-list');

        const currentSentence = sentences[currentExerciseIndex];

        const sentenceText = currentSentence.english.split(' ');
        const missingIndex = Math.floor(Math.random() * sentenceText.length);
        const missingWord = sentenceText[missingIndex];
        sentenceText[missingIndex] = '_____';

        const sentenceElement = document.createElement('div');
        sentenceElement.classList.add('sentence');
        sentenceElement.textContent = sentenceText.join(' ');

        const input = document.createElement('input');
        input.type = 'text';
        input.placeholder = 'Kelimeyi doldurun';
        input.addEventListener('input', () => checkSentenceCompletion(input, missingWord));

        const scoreElement = document.createElement('div');
        scoreElement.classList.add('score');
        scoreElement.textContent = `Puan: ${totalScore}`;

        const feedbackElement = document.createElement('div');
        feedbackElement.classList.add('feedback');

        exerciseCard.appendChild(title);
        exerciseCard.appendChild(sentenceElement);
        exerciseCard.appendChild(input);
        exerciseCard.appendChild(scoreElement);
        exerciseCard.appendChild(feedbackElement);
        container.appendChild(exerciseCard);

        function checkSentenceCompletion(input, correctAnswer) {
            if (input.value.trim().toLowerCase() === correctAnswer.toLowerCase()) {
                input.classList.add('correct');
                totalScore += 5;
                playAudio('correct');
                feedbackElement.textContent = 'Doğru!';
            } else {
                input.classList.add('incorrect');
                totalScore -= 1;
                playAudio('incorrect');
                feedbackElement.textContent = `Doğru cevap: ${correctAnswer}`;
            }
            scoreElement.textContent = `Puan: ${totalScore}`;
            currentExerciseIndex++;
            if (currentExerciseIndex < sentences.length) {
                renderSentenceCompletionExercise(container, sentences);
            } else {
                currentExerciseIndex = 0;
                renderExercises(unit);
            }
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

    function playAudio(type) {
        const audio = new Audio(`sounds/${type}.mp3`);
        audio.play();
    }
});