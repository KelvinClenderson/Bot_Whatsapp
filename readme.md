# Bot whatsapp

### Criando iniciando a biblioteca Node

npm init -y

### Configurando o TypeScript

npm install -D tsx typescript @types/node

### Gerando o TS Config

tsc --init

### Caso dê erro os dados no arquivo tsconfig terá que ser esse

{
"compilerOptions": {
"target": "es2020",
"module": "commonjs",
"rootDir": "src",
"outDir": "./dist",
"moduleResolution": "node",
"esModuleInterop": true,
"forceConsistentCasingInFileNames": true,
"strict": true,
"skipLibCheck": true
}
}

## Utilizei o Web.Js - https://wwebjs.dev/guide/#installation

(NodeJS v12 ou superior é necessário)

### Para pode obter o módulo do npm

npm i whatsapp-web.js

npm i qrcode-terminal

### Criei uma pasta src e um arquivo index.ts com esse codigo para gerar o qr code e poder conectar ao client.

const { Client } = require('whatsapp-web.js');
const client = new Client();

client.on('qr', (qr) => {
console.log('QR RECEIVED', qr);
});

client.on('ready', () => {
console.log('Client is ready!');
});

client.initialize();

O codigo abaixo contém as mensagens que utilizei para teste

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

## Para rodar o projeto:

"scripts": {
"build": "tsc",
"start": "node dist/index.js",
"start:prod": "tsc && node dist/index.js",
"start:dev": "tsx watch src/index.ts"
}
