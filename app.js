const rollButton = document.querySelector("#rollButton");
const statusMessage = document.querySelector("#statusMessage");
const resultArea = document.querySelector("#resultArea");
const mainRollElement = document.querySelector("#mainRoll");
const effectDescription = document.querySelector("#effectDescription");
const extraRollSection = document.querySelector("#extraRollSection");
const extraDiceLabel = document.querySelector("#extraDiceLabel");
const extraRollResult = document.querySelector("#extraRollResult");
const finalEffect = document.querySelector("#finalEffect");

let effects = [];

function rollDie(sides) {
  return Math.floor(Math.random() * sides) + 1;
}

function findEffect(value) {
  return effects.find((effect) => value >= effect.min && value <= effect.max);
}

function resetExtraRoll() {
  extraRollSection.hidden = true;
  extraDiceLabel.textContent = "Dodatkowy rzut";
  extraRollResult.textContent = "—";
  finalEffect.textContent = "";
}

function showError(message) {
  statusMessage.textContent = message;
  statusMessage.classList.add("error");
}

function clearError() {
  statusMessage.classList.remove("error");
}

function performRoll() {
  if (!effects.length) {
    showError("Tabela efektów nie została jeszcze załadowana.");
    return;
  }

  clearError();
  resetExtraRoll();

  const mainRoll = rollDie(100);
  const effect = findEffect(mainRoll);

  resultArea.hidden = false;
  mainRollElement.textContent = mainRoll;

  if (!effect) {
    effectDescription.textContent = "Nie znaleziono efektu dla tego wyniku.";
    showError(`Brakuje efektu dla wyniku ${mainRoll}. Sprawdź plik effects.json.`);
    return;
  }

  effectDescription.textContent = effect.description;
  statusMessage.textContent = "Losowanie zakończone.";

  if (effect.extraRoll) {
    const sides = Number(effect.extraRoll.dice);
    const rolled = rollDie(sides);
    const resultText = effect.extraRoll.results[String(rolled)];

    extraDiceLabel.textContent = `Dodatkowy rzut: k${sides}`;
    extraRollResult.textContent = rolled;
    finalEffect.textContent = resultText ?? "Brak opisu dla tego wyniku dodatkowego.";
    extraRollSection.hidden = false;
  }
}

async function loadEffects() {
  rollButton.disabled = true;
  statusMessage.textContent = "Ładowanie tabeli efektów…";

  try {
    const response = await fetch("effects.json", { cache: "no-store" });

    if (!response.ok) {
      throw new Error(`Błąd HTTP ${response.status}`);
    }

    const data = await response.json();

    if (!Array.isArray(data)) {
      throw new Error("Plik effects.json nie zawiera listy efektów.");
    }

    effects = data;
    statusMessage.textContent = "Aplikacja jest gotowa do losowania.";
    clearError();
  } catch (error) {
    console.error(error);
    showError("Nie udało się załadować tabeli efektów.");
  } finally {
    rollButton.disabled = false;
  }
}

rollButton.addEventListener("click", performRoll);

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("./service-worker.js").catch((error) => {
      console.error("Nie udało się zarejestrować service workera:", error);
    });
  });
}

loadEffects();
