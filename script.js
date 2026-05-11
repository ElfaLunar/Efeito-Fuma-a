const letters = document.querySelectorAll(".smoky li");

/*
cada letra reage individualmente
conforme o mouse passa
*/

letters.forEach(letter => {

  letter.addEventListener("mouseenter", () => {

    letter.classList.add("smoke");

  });

  letter.addEventListener("mouseleave", () => {

    setTimeout(() => {

      letter.classList.remove("smoke");

    }, 300);

  });

});
