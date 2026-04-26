/* ================================= */
/* ===== NAVBAR SCROLL EFFECT ===== */
/* ================================= */

const navbar = document.querySelector(".navbar");

window.addEventListener("scroll", () => {

    if (!navbar) return;

    if (window.scrollY > 40) {
        navbar.style.boxShadow = "0 10px 30px rgba(0,0,0,0.08)";
    } else {
        navbar.style.boxShadow = "none";
    }

});


/* ================================= */
/* ===== SMOOTH SCROLL ============ */
/* ================================= */

document.querySelectorAll("a[href^='#']").forEach(anchor => {

    anchor.addEventListener("click", function (e) {

        const target = document.querySelector(this.getAttribute("href"));

        if (target) {
            e.preventDefault();
            target.scrollIntoView({
                behavior: "smooth"
            });
        }

    });

});


/* ================================= */
/* ===== CHATBOT FLOAT BUTTON ===== */
/* ================================= */

const chatbotBtn = document.querySelector(".chatbot-float");

if (chatbotBtn) {

    chatbotBtn.addEventListener("click", () => {

        alert("🤖 Chatbot Coming Soon");

        // Future:
        // Open Chat Modal
        // OR Redirect WhatsApp
    });

}


/* ================================= */
/* ===== FOOTER AUTO YEAR ========= */
/* ================================= */

const footerYear = document.querySelector("#footerYear");

if (footerYear) {
    footerYear.textContent = new Date().getFullYear();
}


/* ================================= */
/* ===== SIMPLE FADE IN ON LOAD === */
/* ================================= */

window.addEventListener("load", () => {

    document.body.style.opacity = "1";

});

/* ============================= */
/* ===== CLEAN HUMAN TYPE in terminal ====== */
/* ============================= */
function humanTypeEffect(){

  const lines = document.querySelectorAll(".type-text");

  // 🔥 Store original text once
  const originalTexts = [];

  lines.forEach(el=>{
    originalTexts.push(
      el.dataset.text || el.textContent
    );
  });

  function startTyping(){

    let lineIndex = 0;

    function typeLine(){

      if(lineIndex >= lines.length){

        // Restart after delay
        setTimeout(()=>{
          startTyping();
        },2000);

        return;
      }

      const el = lines[lineIndex];
      const fullText = originalTexts[lineIndex];

      el.textContent = "";
      el.style.opacity = 1;

      let charIndex = 0;

      function typeChar(){

        if(charIndex < fullText.length){

          el.textContent += fullText.charAt(charIndex);
          charIndex++;

          const speed = 40 + Math.random()*60;

          setTimeout(typeChar, speed);

        }else{

          lineIndex++;
          setTimeout(typeLine, 400);

        }

      }

      typeChar();

    }

    typeLine();

  }

  startTyping();

}

document.addEventListener("DOMContentLoaded", humanTypeEffect);

/* ===============================
   HAMBURGER MENU FINAL
================================ */

const hamburger = document.getElementById("hamburger");
const navMenu = document.querySelector(".nav-menu");

if(hamburger && navMenu){

// OPEN CLOSE MENU
hamburger.addEventListener("click", () => {
hamburger.classList.toggle("active");
navMenu.classList.toggle("active");
});

// CLOSE WHEN LINK CLICK
document.querySelectorAll(".nav-menu a").forEach(link=>{
link.addEventListener("click",()=>{
hamburger.classList.remove("active");
navMenu.classList.remove("active");
});
});

}


/* ================================= */
/* ===== PAGE SAFE INIT =========== */
/* ================================= */

console.log("🚀 Main JS Loaded Successfully");
