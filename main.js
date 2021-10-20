const msgerForm = get(".msger-inputarea");
const msgerInput = get(".msger-input");
const msgerChat = get(".msger-chat");
const BOT_IMG = "user.png";
const PERSON_IMG = "user.png";
const BOT_NAME = "Soporte tecnico";
const PERSON_NAME = "User";
const prompts = [
  ["Hola", "Oye", "Hola", "Buenos días", "buenas tardes"],
  ["cómo estás", "como es la vida", "Cómo están las cosas"],
  ["Que estas haciendo", "Que esta pasando", "Qué pasa"],
  ["Cuántos años tienes"],
  ["Quién eres tú", "Eres humano", "eres Bot", "Eres humano o bot"],
  ["Quien te creó", "quien te hizo"],
  [
    "tu nombre por favor",
    "tu nombre",
    "puedo saber tu nombre",
    "cuál es tu nombre",
    "como te llamas a ti mismo"
  ],
  ["te quiero"],
  ["Feliz", "Bueno", "divertido", "maravilloso", "fantástico", "cool"],
  ["malo", "aburrido", "cansado"],
  ["ayúdame", "cuéntame una historia", "dime una broma"],
  ["ah", "si", "ok", "vale", "nice"],
  ["adiós", "adiós", "adiós", "hasta luego"],
  ["que debo comer hoy"],
  ["bro"],
  ["que", "por que", "cómo", "dónde", "cuando"],
  ["no", "No estoy seguro", "quizás", "no, gracias"],
  [""],
  ["Jajaj", "ha", "jaja", "jeje", "gracioso", "broma"]
]
const replies = [
  ["Hola!", "hola!", "hey!", "Hola!", "Hola"],
  [
    "¿Bien como estas tu?",
    "Bastante bien, ¿cómo estás?",
    "Fantástico como estas"
  ],
  [
    "Poco",
    "A punto de irme a dormir",
    "¿Puedes adivinar?",
    "No lo se en realidad"
  ],
  ["Soy infinito"],
  ["Solo soy un bot "," soy un bot. ¿Qué vas a?"],
  ["El único Dios verdadero, JavaScript"],
  ["No tengo nombre "," no tengo nombre"],
  ["Yo también te amo ", "yo también"],
  ["¿Alguna vez te has sentido mal? "," Encantado de escucharlo"],
  ["¿Alguna vez te has sentido mal? "," Encantado de escucharlo"],
  ["¿Sobre qué? "," Érase una vez ..."],
  ["Cuéntame una historia "," Cuéntame un chiste "," Cuéntame sobre ti"],
  ["Adiós "," Adiós "," Hasta luego"],
  ["Sushi", "Pizza"],
  ["Bro!"],
  ["Gran pregunta"],
  ["Está bien "," Entiendo "," ¿De qué quieres hablar?"],
  ["Por favor di algo :("],
  ["Jaja! "," Bueno!"]
];
const alternative = [
  "Mismo",
  "Seguir...",
  "Bro...",
  "Intentalo otra vez",
  "Estoy escuchando...",
  "No entiendo :/"
]
const robot = ["¿Cómo estás, compañero humano? "," No soy un bot"];
msgerForm.addEventListener("submit", event => {
  event.preventDefault();
  const msgText = msgerInput.value;
  if (!msgText) return;
  msgerInput.value = "";
  addChat(PERSON_NAME, PERSON_IMG, "right", msgText);
  output(msgText);
});
function output(input) {
  let product;
  let text = input.toLowerCase().replace(/[^\w\s]/gi, "").replace(/[\d]/gi, "").trim();
  text = text
    .replace(/ a /g, " ")  
    .replace(/i feel /g, "")
    .replace(/whats/g, "what is")
    .replace(/please /g, "")
    .replace(/ please/g, "")
    .replace(/r u/g, "are you");
  if (compare(prompts, replies, text)) {
    product = compare(prompts, replies, text);
  } else if (text.match(/thank/gi)) {
    product = "You're welcome!"
  } else if (text.match(/(robot|bot|robo)/gi)) {
    product = robot[Math.floor(Math.random() * robot.length)];
  } else {
    product = alternative[Math.floor(Math.random() * alternative.length)];
  }
  const delay = input.split(" ").length * 100;
  setTimeout(() => {
    addChat(BOT_NAME, BOT_IMG, "left", product);
  }, delay);
}
function compare(promptsArray, repliesArray, string) {
  let reply;
  let replyFound = false;
  for (let x = 0; x < promptsArray.length; x++) {
    for (let y = 0; y < promptsArray[x].length; y++) {
      if (promptsArray[x][y] === string) {
        let replies = repliesArray[x];
        reply = replies[Math.floor(Math.random() * replies.length)];
        replyFound = true;
        break;
      }
    }
    if (replyFound) {
      break;
    }
  }
  return reply;
}
function addChat(name, img, side, text) {
  const msgHTML = `
    <div class="msg ${side}-msg">
      <div class="msg-img" style="background-image: url(${img})"></div>
      <div class="msg-bubble">
        <div class="msg-info">
          <div class="msg-info-name">${name}</div>
          <div class="msg-info-time">${formatDate(new Date())}</div>
        </div>
        <div class="msg-text">${text}</div>
      </div>
    </div>
  `;
  msgerChat.insertAdjacentHTML("beforeend", msgHTML);
  msgerChat.scrollTop += 500;
}
function get(selector, root = document) {
  return root.querySelector(selector);
}
function formatDate(date) {
  const h = "0" + date.getHours();
  const m = "0" + date.getMinutes();
  return `${h.slice(-2)}:${m.slice(-2)}`;
}
function random(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}