// GLOOBIE.JS - International & Personalized
const gloobieData = {
    en: {
        welcome: "Hello! I'm Gloobie. What is your name?",
        greet: "Hi {name}! Ready to study?",
        bio: "Biology is the study of life. Check Unit 1!",
        unknown: "I'm still learning that! Try 'Biology'."
    },
    es: {
        welcome: "¡Hola! Soy Gloobie. ¿Cómo te llamas?",
        greet: "¡Hola {name}! ¿Listo para estudiar?",
        bio: "La biología es el estudio de la vida. ¡Mira la Unidad 1!",
        unknown: "¡Aún estoy aprendiendo eso! Intenta con 'Biología'."
    },
    fr: {
        welcome: "Bonjour ! Je suis Gloobie. Quel est votre nom ?",
        greet: "Salut {name} ! Prêt à étudier ?",
        bio: "La biologie est l'étude de la vie. Voir l'unité 1 !",
        unknown: "J'apprends encore cela ! Essayez 'Biologie'."
    },
    pt: {
        welcome: "Olá! Eu sou o Gloobie. Qual é o seu nome?",
        greet: "Olá {name}! Pronto para estudar?",
        bio: "A biologia é o estudo da vida. Confira a Unidade 1!",
        unknown: "Ainda estou aprendendo isso! Tente 'Biologia'."
    }
};

let currentLang = localStorage.getItem('omniLang') || 'en';
let userName = localStorage.getItem('omniName') || null;

function injectGloobie() {
    const style = document.createElement('style');
    style.innerHTML = `
        .gloobie-bot { width: 80px; height: 80px; background-color: #22c55e; border-radius: 50%; position: relative; background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Cpath fill='%230ea5e9' d='M10,20 Q30,0 50,20 T80,30 Q90,60 60,70 T20,60 Z'/%3E%3C/svg%3E"); background-size: cover; box-shadow: inset -8px -8px 15px rgba(0,0,0,0.4); }
        .glasses { position: absolute; top: 32%; left: 5%; width: 90%; height: 15px; border-top: 4px solid #1e293b; display: flex; justify-content: space-around; }
        .lens { width: 22px; height: 22px; border: 4px solid #1e293b; background: rgba(255,255,255,0.7); border-radius: 50%; margin-top: -6px; }
        #gloobie-box { background: white; border: 3px solid #1e293b; padding: 15px; border-radius: 30px 30px 0 30px; margin-bottom: 10px; font-weight: 800; font-size: 13px; box-shadow: 6px 6px 0px #878CD8; width: 280px; display: none; }
    `;
    document.head.appendChild(style);

    const initialMsg = userName ? gloobieData[currentLang].greet.replace('{name}', userName) : gloobieData[currentLang].welcome;

    const helperHTML = `
        <div id="gloobie-helper" style="position: fixed; bottom: 30px; right: 30px; z-index: 1000; display: flex; flex-direction: column; align-items: flex-end;">
            <div id="gloobie-box">
                <div id="gloobie-response">${initialMsg}</div>
                <input type="text" id="user-input" style="width: 100%; border: 2px solid #1e293b; border-radius: 20px; padding: 8px 15px; margin-top: 10px; font-size: 12px; outline: none;" placeholder="..." onkeypress="handleGloobieInput(event)">
            </div>
            <div style="cursor: pointer;" onclick="toggleGloobie()"><div class="gloobie-bot"><div class="glasses"><div class="lens"></div><div class="lens"></div></div></div></div>
        </div>
    `;
    document.body.insertAdjacentHTML('beforeend', helperHTML);
}

function handleGloobieInput(e) {
    if (e.key === 'Enter') {
        const input = document.getElementById('user-input');
        const response = document.getElementById('gloobie-response');
        const val = input.value.trim();

        if (!userName) {
            userName = val;
            localStorage.setItem('omniName', userName);
            response.innerText = gloobieData[currentLang].greet.replace('{name}', userName);
        } else {
            const query = val.toLowerCase();
            if (query.includes("bio")) response.innerText = gloobieData[currentLang].bio;
            else response.innerText = gloobieData[currentLang].unknown;
        }
        input.value = "";
    }
}

function toggleGloobie() {
    const box = document.getElementById('gloobie-box');
    box.style.display = (box.style.display === 'block') ? 'none' : 'block';
}

window.addEventListener('DOMContentLoaded', injectGloobie);