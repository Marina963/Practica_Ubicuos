var SpeechRecognition = window.SpeechRecognition || webkitSpeechRecognition;
var SpeechGrammarList = window.SpeechGrammarList || webkitSpeechGrammarList;

const recognition = new SpeechRecognition();
const speechRecognitionList = new SpeechGrammarList();

const grammar ="#JSGF V1.0; grammar colors; public <accion> = ordenar | armario | maniqui | perfil | favoritos | escanerar productos | parar   ;";

speechRecognitionList.addFromString(grammar, 1);
recognition.grammars = speechRecognitionList;
recognition.continuous = false;
recognition.lang = "es-ES";
recognition.interimResults = false;
recognition.maxAlternatives = 1;



const voz = () =>{
  recognition.start();
  //console.log("Listo para recibir un comando de color.");
} 

recognition.onresult = function(event) {
  const result = event.results[0][0].transcript;
  console.log(`Resultado: ${result}.`);
  console.log(`Confianza: ${event.results[0][0].confidence}`);

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
    case "escanear":
      act_pag_esc_ropa();
      break;
    case "perfil":
      act_pag_perfil();
      break;
    case "parar":
      recognition.abort();
      break;
    default:
      console.log("Comando no reconocido.");
      break;

  };
};
recognition.onspeechend = function() {
  //console.log("speechend");
  recognition.stop();
};

/* Para habilitar reconocimiento continuo */
recognition.onend = function() {
  //console.log("end");
  recognition.start();
}

recognition.onnomatch = function() {
  //console.log("No he reconocido el color");
  recognition.stop();
  //btnSpeech.disabled = false;
};

recognition.onerror = function(event) {
  console.log(`Error occurred in recognition: ${event.error}`);
};