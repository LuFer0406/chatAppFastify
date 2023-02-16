let messages = [{message: "Hola.", hour:1676132967}];

export const chatSocket = (fastify) => {

  fastify.io.on("connection", (socket) => {
    console.log("Usuario conectado", socket.id);

    // Controlador
    const sendMessages = () => {
      fastify.io.emit("server:getMessages", messages);
    };

    sendMessages();

    socket.on("client:addMessage", (message) => {
      messages.push(message)
      sendMessages();
    });

    socket.on("disconnect", () => {
      console.log("Usuario desconectado");
    });
  });
};
