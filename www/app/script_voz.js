/*----------Script que se encarga del reconocimineto de voz----------------------- */

//Inicialización del reconocimiento de voz y de la gramatica
var SpeechRecognition = window.SpeechRecognition || webkitSpeechRecognition;
var SpeechGrammarList = window.SpeechGrammarList || webkitSpeechGrammarList;

const recognition = new SpeechRecognition();
const speechRecognitionList = new SpeechGrammarList();

//Gramática de reconocimiento de voz
const grammar ="#JSGF V1.0; grammar colors; public <accion> = ordenar | armario | maniqui | perfil | favoritos | escaner| probador | pagar;";

//Configuración del reconocimiento de voz
speechRecognitionList.addFromString(grammar, 1);
recognition.grammars = speechRecognitionList;
recognition.continuous = false;
recognition.lang = "es-ES";
recognition.interimResults = false;
recognition.maxAlternatives = 1;


//Función para iniciar el reconocomiento de voz
const voz = () =>{
  recognition.start();
} 

//Evento que se activa cuando se detecta voz.
recognition.onresult = function(event) {
  const result = event.results[0][0].transcript.toLowerCase();

  //Dependiendo de la palabra que se detecte se hace una ación diferente
  switch (result) {
    case "ordenar":
      if (armario.style.display === 'block') {
        ordenar_favorito();
      }
      break;
    case "armario":
      act_pag_armario();
      break;
    case "maniquí":
      act_pag_maniqui();
      break;
    case "favoritos":
      act_pag_favoritos();
      break;
    case "escáner":
      act_pag_esc_ropa();
      break;
    case "perfil":
      act_pag_perfil();
      break;
    case "probador":
      act_pag_maniqui();
      cambiar_probador();
      break;
    case "pagar":
      if(dado.style.display == "block"){
        pagar();
      }

    default:
      break;

  };
};

//Evebto para detectar cuando termina de hablar y detiene el reconocimiento 
recognition.onspeechend = function() {
  recognition.stop();
};

//Evento que se activa cuando se termina de hablar, reinicia el reconocimeinto
recognition.onend = function() {
  recognition.start();
}

//Evento que se produce cuando no hay coincidencias
recognition.onnomatch = function() {
  recognition.stop();
};

//Evento que se produce cuando hay un error
recognition.onerror = function(event) {
  console.log(`Error occurred in recognition: ${event.error}`);
};