"use strict";
const rollBtn = document.querySelector(".roll-btn");
const adviceId = document.querySelector(".advice-title");
const adviceParagraph = document.querySelector(".advice-paragraph");
const url = "https://api.adviceslip.com/advice";
rollBtn.addEventListener("click", () => {
    generatedAdvice();
    // taking into consideration advice is changing every 2sec in the API REST, i decide to add a CD on button
    btnCooldown(1800);
});
const btnCooldown = (ms) => {
    rollBtn.classList.add("roll-btn-cd");
    rollBtn.classList.remove("roll-btn-ok");
    rollBtn.disabled = true;
    setTimeout(() => {
        rollBtn.classList.add("roll-btn-ok");
        rollBtn.classList.remove("roll-btn-cd");
        rollBtn.disabled = false;
    }, ms);
};
const generatedAdvice = async () => {
    const response = await fetch(url);
    if (response.status < 300) {
        const advice = await response.json();
        const generatedAdvice = advice.slip;
        adviceId.textContent = `ADVICE #${generatedAdvice.id}`;
        adviceParagraph.textContent = "“" + generatedAdvice.advice + "”";
    }
    else {
        console.log("error while fetching data, status :", response.status);
    }
};
generatedAdvice();
