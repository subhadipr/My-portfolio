/* =================================
   DARK MODE TOGGLE
================================= */

const darkToggle = document.getElementById("darkToggle");
const mobileDarkToggle = document.getElementById("mobileDarkToggle");

/* LOAD SAVED THEME */

function loadSavedTheme() {

    const savedTheme = localStorage.getItem("theme");

    if(savedTheme === "dark"){

        document.body.classList.add("dark");

        if(darkToggle){
            darkToggle.innerHTML = "☀️";
        }

        if(mobileDarkToggle){
            mobileDarkToggle.innerHTML = "☀️ Light Mode";
        }

    }

}

/* THEME FUNCTION */

function toggleTheme(){

    document.body.classList.toggle("dark");

    const isDark = document.body.classList.contains("dark");

    if(isDark){

        localStorage.setItem("theme","dark");

        if(darkToggle){
            darkToggle.innerHTML = "☀️";
        }

        if(mobileDarkToggle){
            mobileDarkToggle.innerHTML = "☀️ Light Mode";
        }

    }else{

        localStorage.setItem("theme","light");

        if(darkToggle){
            darkToggle.innerHTML = "🌙";
        }

        if(mobileDarkToggle){
            mobileDarkToggle.innerHTML = "🌙 Dark Mode";
        }

    }

}

/* DESKTOP BUTTON */

if(darkToggle){
    darkToggle.addEventListener("click", toggleTheme);
}

/* MOBILE MENU BUTTON */

if(mobileDarkToggle){
    mobileDarkToggle.addEventListener("click", toggleTheme);
}

/* INIT */

loadSavedTheme();

console.log("🌙 Dark Mode Ready");