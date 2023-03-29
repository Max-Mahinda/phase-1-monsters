const createMonster = document.querySelector("#create-monster");
const monsterContainer = document.querySelector("#monster-container");
const backButton = document.querySelector("#back");
const forwardButton = document.querySelector("#forward");

function getMonsters() {
  fetch("http://localhost:3000/monsters")
    .then((response) => response.json())
    .then((monsters) => {
      monsters.forEach((monster) => {
        const monsterCard = createMonsterCard(monster);
        monsterContainer.appendChild(monsterCard);
      });
    });
}
getMonsters();
function createMonsterCard(monster) {
  const monsterCard = document.createElement("div");
  monsterCard.innerHTML = `
    <h2>${monster.name}</h2>
    <p><strong>Age: </strong>${monster.age}</p>
    <p><strong>Description: </strong>${monster.description}</p>
    `;
  return monsterCard;
}
createMonsterCard();

function createMonsterForm() {
  const form = document.createElement("form");
  const nameInput = document.createElement("input");
  const ageInput = document.createElement("input");
  const desInput = document.createElement("input");
  const submitButton = document.createElement("button");

  nameInput.type = "text";
  nameInput.placeholder = "Name";

  ageInput.type = "number";
  ageInput.placeholder = "Age";

  desInput.type = "text";
  desInput.placeholder = "Description";

  submitButton.type = "submit";
  submitButton.innerText = "Create Monster";

  form.append(nameInput, ageInput, desInput, submitButton);
  createMonster.append(form);

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const name = formData.get("name");
    const age = formData.get("age");
    const description = formData.get("description");

    fetch("http://localhost:3000/monsters"),
      {
        method: "POST",
        headers: {
          "content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({ name, age, description })
          .then((response) => response.json())
          .then((newMonster) => {
            const monsterCard = createMonsterCard(newMonster);
            monsterContainer.prepend(monsterCard);
            form.reset();
          }),
      };
  });
}
createMonsterForm();