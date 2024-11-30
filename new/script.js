// Harici JSON dosyasından veri çek
fetch('data.json')
  .then((response) => response.json())
  .then((jsonData) => {
    renderUnits(jsonData.units);
  })
  .catch((error) => {
    console.error('JSON verisi yüklenemedi:', error);
  });

// Üniteleri ekrana listele
function renderUnits(units) {
  const unitList = document.getElementById('unit-list');
  units.forEach((unit) => {
    const unitCard = document.createElement('div');
    unitCard.classList.add('unit-card');
    unitCard.innerHTML = `
      <img src="${unit.unitImage}" alt="${unit.unitName}">
      <h3>${unit.unitName}</h3>
    `;
    unitCard.addEventListener('click', () => {
      alert(`Seçilen Ünite: ${unit.unitName}`);
      // Egzersiz ekranına yönlendir
      showExerciseSelection(unit);
    });
    unitList.appendChild(unitCard);
  });
}

// Egzersiz seçim ekranı (Placeholder)
function showExerciseSelection(unit) {
  console.log(`Egzersiz seçimi için ${unit.unitName} yüklendi.`);
  // Burada egzersiz ekranına yönlendirme yapılacak
}
