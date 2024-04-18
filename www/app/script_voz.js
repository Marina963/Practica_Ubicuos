var SpeechRecognition = window.SpeechRecognition || webkitSpeechRecognition;
var SpeechGrammarList = window.SpeechGrammarList || webkitSpeechGrammarList;

const recognition = new SpeechRecognition();
const speechRecognitionList = new SpeechGrammarList();

//Gramatica de reconocimiento de voz
const grammar ="#JSGF V1.0; grammar colors; public <accion> = ordenar | armario | maniqui | perfil | favoritos | escaner| camara ;";


speechRecognitionList.addFromString(grammar, 1);
recognition.grammars = speechRecognitionList;
recognition.continuous = false;
recognition.lang = "es-ES";
recognition.interimResults = false;
recognition.maxAlternatives = 1;


//Inicia reconocomiento de voz
const voz = () =>{
  recognition.start();
} 

//Reconoce las palabras y llama a las funciones corresponidentes
recognition.onresult = function(event) {
  const result = event.results[0][0].transcript.toLowerCase();
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
      act_pag_ubicacion();
      break;
    case "cámara":
      act_pag_maniqui();
      quitarModelo();
      div_video_ropa.style.display = "block";
      maniqui_camara.style.display = "none";
      iniciar_grabacion_ropa();
      productos_camara();
      break;
    default:
      console.log("Comando no reconocido.");
      break;

  };
};

//Funcione para detectar cuando termina de hablar y si termina volver iniciar el reconocimiento de voz
recognition.onspeechend = function() {
  recognition.stop();
};

recognition.onend = function() {
  recognition.start();
}

recognition.onnomatch = function() {
  recognition.stop();
};

recognition.onerror = function(event) {
  console.log(`Error occurred in recognition: ${event.error}`);
};