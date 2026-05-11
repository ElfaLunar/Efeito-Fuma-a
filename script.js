const smoky = document.getElementById("smoky");

const letters = smoky.querySelectorAll("li");

let timeoutList = [];

/* mouse entra */

smoky.addEventListener("mouseenter", () => {

  letters.forEach((letter, index) => {

    const timeout = setTimeout(() => {

      letter.classList.add("active");

    }, index * 300);

    timeoutList.push(timeout);

  });

});

/* mouse sai */

smoky.addEventListener("mouseleave", () => {

  timeoutList.forEach(timeout => {
    clearTimeout(timeout);
  });

  timeoutList = [];

  letters.forEach(letter => {

    letter.classList.remove("active");

  });

});
