const socket = io();

const qrcode = new QRCode("qrcode", {
  text: "localhost:3000/app/index_app.html",
  width: 512,
  height: 512,
  colorDark: "#000000",
  colorLight: "#ffffff",
  correctLevel: QRCode.CorrectLevel.H
});

socket.on("connect", () => {  

  socket.emit("CLIENT_CONNECTED", { id: 1 });

  socket.on("ACK_CONNECTION", () => {
    console.log("ACK", socket.id);
    console.log("ACK");
  });

  socket.on("NEW_POINTER", (data) => {
    const code = document.getElementById("qrcode");
    code.style.display = "none";
    console.log("new pointer");
  })


});