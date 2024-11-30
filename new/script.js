// Mock JSON data
const jsonData = {
    "units": [
      {
        "unitName": "Animals",
        "unitImage": "animals.png"
      },
      {
        "unitName": "Fruits",
        "unitImage": "fruits.png"
      },
      {
        "unitName": "Vehicles",
        "unitImage": "vehicles.png"
      }
    ]
  };
  
  // Render units dynamically
  const unitList = document.getElementById("unit-list");
  
  jsonData.units.forEach((unit) => {
    const unitCard = document.createElement("div");
    unitCard.classList.add("unit-card");
    unitCard.innerHTML = `
      <img src="${unit.unitImage}" alt="${unit.unitName}">
      <h3>${unit.unitName}</h3>
    `;
    unitCard.addEventListener("click", () => {
      alert(`Selected Unit: ${unit.unitName}`);
      // Here, navigate to the exercise selection screen
    });
    unitList.appendChild(unitCard);
  });
  