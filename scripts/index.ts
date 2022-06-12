const rollBtn: HTMLButtonElement = document.querySelector(".roll-btn")!;
const adviceId: HTMLTitleElement = document.querySelector(".advice-title")!;
const adviceParagraph: HTMLParagraphElement = document.querySelector(".advice-paragraph")!;

const url: string = "https://api.adviceslip.com/advice";

interface Sentence {
   id: number;
   advice: string;
}

rollBtn.addEventListener("click", () => {
   generatedAdvice();
   // taking into consideration advice is changing every 2sec in the API REST, i decide to implement a visual effect to not refresh too soon.
   rollBtn.classList.add("roll-btn-cd");
   rollBtn.classList.remove("roll-btn-ok");
   setTimeout(() => {
      rollBtn.classList.add("roll-btn-ok");
      rollBtn.classList.remove("roll-btn-cd");
   }, 1800);
});

const generatedAdvice = async () => {
   const response = await fetch(url);
   if (response.status < 300) {
      const advice: any = await response.json();
      const generatedAdvice: Sentence = advice.slip;
      adviceId.textContent = `ADVICE #${generatedAdvice.id}`;
      adviceParagraph.textContent = "“" + generatedAdvice.advice + "”";
   } else {
      console.log("error while fetching data, status :", response.status);
   }
};

generatedAdvice();
