import qrcode from "qrcode-terminal";
import { Client, LocalAuth } from "whatsapp-web.js";

const client = new Client({
    authStrategy: new LocalAuth(),
});

client.on("qr", (qr) => {
    qrcode.generate(qr, { small: true });
});

client.on("ready", () => {
    console.log("Client is ready");
});

client.on("message", (message) => {
    const content = message.body;

    switch (content) {
        case "Oi":
            client.sendMessage(message.from, "Olá! Como posso te ajudar?");
            break;
        case "Tchau":
            client.sendMessage(
                message.from,
                "Até logo, quando quiser conversar novamente, envie 'Oi' ou 'Olá')"
            );
            break;
        case "Olá":
            client.sendMessage(message.from, "Olá! Como posso te ajudar?2");
            break;
        case "Até logo":
            client.sendMessage(
                message.from,
                "Até logo, quando quiser conversar novamente, envie 'Oi' ou 'Olá'2"
            );
            break;

        default:
            // Se a mensagem não corresponder a nenhum dos casos anteriores
            client.sendMessage(
                message.from,
                "Desculpe, não entendi o que você quis dizer."
            );
            break;
    }
});

client.initialize();
