
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { useState } from "react";

const GlitchGuide = () => {
  const [step, setStep] = useState(1);
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 py-8">
      <div className="container mx-auto px-4">
        <div className="flex items-center mb-6">
          <Link to="/" className="flex items-center text-blue-600 hover:text-blue-800">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Voltar para a página inicial
          </Link>
        </div>
        
        <h1 className="text-3xl md:text-4xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-green-500">
          Tutorial de Hospedagem no Glitch
        </h1>
        
        <div className="mb-8">
          <div className="flex space-x-2 mb-6">
            {[1, 2, 3, 4, 5].map((s) => (
              <Button
                key={s}
                onClick={() => setStep(s)}
                variant={s === step ? "default" : "outline"}
                className={s === step ? "" : "text-gray-500"}
              >
                Passo {s}
              </Button>
            ))}
          </div>
          
          <Card className="p-6">
            {step === 1 && (
              <div className="space-y-4">
                <h2 className="text-2xl font-bold">1. Crie uma conta no Glitch</h2>
                <p>Acesse <a href="https://glitch.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">glitch.com</a> e crie uma conta ou faça login usando sua conta GitHub, Google ou Facebook.</p>
                <img src="https://cdn.glitch.global/5e138dc0-38ff-4f47-8ece-02c645e8aa7f/glitch-signup.png" alt="Página de cadastro do Glitch" className="rounded-lg border shadow-sm max-w-full h-auto" />
              </div>
            )}
            
            {step === 2 && (
              <div className="space-y-4">
                <h2 className="text-2xl font-bold">2. Crie um novo projeto</h2>
                <p>Na dashboard do Glitch, clique no botão "New Project" e selecione "hello-express" para começar com um template básico de Node.js.</p>
                <img src="https://cdn.glitch.global/5e138dc0-38ff-4f47-8ece-02c645e8aa7f/new-project-glitch.png" alt="Criando novo projeto no Glitch" className="rounded-lg border shadow-sm max-w-full h-auto" />
              </div>
            )}
            
            {step === 3 && (
              <div className="space-y-4">
                <h2 className="text-2xl font-bold">3. Configure seu projeto</h2>
                <p>Substitua o conteúdo do arquivo <code className="bg-gray-100 px-2 py-1 rounded">package.json</code> pelo código abaixo:</p>
                <pre className="bg-gray-800 text-gray-100 p-4 rounded-lg overflow-auto text-sm">
                  {`{
  "name": "whatsapp-bot-aluguel",
  "version": "1.0.0",
  "description": "Bot de WhatsApp para aluguel de lojas",
  "main": "server.js",
  "scripts": {
    "start": "node server.js"
  },
  "dependencies": {
    "express": "^4.18.2",
    "@wppconnect-team/wppconnect": "^1.29.0",
    "qr-image": "^3.2.0",
    "node-fetch": "^2.7.0"
  },
  "engines": {
    "node": "16.x"
  }
}`}
                </pre>
                
                <p>Agora, substitua o conteúdo do arquivo <code className="bg-gray-100 px-2 py-1 rounded">server.js</code> pelo código abaixo:</p>
                <pre className="bg-gray-800 text-gray-100 p-4 rounded-lg overflow-auto text-sm">
                  {`const express = require('express');
const wppconnect = require('@wppconnect-team/wppconnect');
const qr = require('qr-image');
const fetch = require('node-fetch');
const app = express();

let qrCode = null;
let client = null;

app.use(express.static('public'));

// Endpoint para visualizar o QR Code
app.get('/qrcode', (req, res) => {
  if (qrCode) {
    const code = qr.image(qrCode, { type: 'png' });
    res.type('png');
    code.pipe(res);
  } else {
    res.status(404).send('QR Code não disponível ainda. Inicie a sessão primeiro.');
  }
});

// Endpoint para iniciar a sessão
app.get('/start', (req, res) => {
  if (client) {
    res.send('Bot já está em execução');
    return;
  }

  wppconnect.create({
    session: 'loja-aluguel',
    autoClose: false,
    puppeteerOptions: { 
      args: ['--no-sandbox', '--disable-setuid-sandbox'] 
    }
  })
  .then((clientCreated) => {
    client = clientCreated;
    
    // Captura o QR code
    client.onQR((qr) => {
      qrCode = qr;
      console.log('QR Code gerado:', qr);
    });
    
    client.onStateChange((state) => {
      console.log('Estado:', state);
      if (state === 'CONNECTED') {
        startBot(client);
      }
    });
    
    res.send('Iniciando sessão do bot. Acesse /qrcode para escanear o QR Code.');
  })
  .catch((error) => {
    console.log(error);
    res.status(500).send('Erro ao iniciar sessão');
  });
});

function startBot(client) {
  client.onMessage(async (message) => {
    // Mensagem de boas-vindas
    if (message.body.toLowerCase() === 'oi' || 
        message.body.toLowerCase() === 'olá' || 
        message.body.toLowerCase() === 'inicio') {
      
      await client.sendText(message.from, 
      \`Olá! 👋 Obrigado pelo contato. Estamos aqui para ajudar com mais informações sobre as nossas lojas disponíveis para locação.
      Temos as seguintes opções:
      LOJA 01 – 55m²
      
      Digite "loja 01" para mais detalhes.\`);
    }
    
    // Detalhes da Loja 01
    if (message.body.toLowerCase().includes('loja 01')) {
      await client.sendText(message.from, 
      \`Você escolheu a LOJA 01. Aqui estão os detalhes:
      📏 Área total: 55m²
      📍 Localização: Selim de Sales, 1408, loja de esquina com ótima visibilidade
      ⚡ Energia: Instalação trifásica
      💰 Aluguel mensal: R$ 2.500,00
      📅 Contrato mínimo: 1 ano
      
      Digite "mais" para mais informações ou "agendar" para marcar uma visita.\`);
    }
    
    // Mais informações
    if (message.body.toLowerCase().includes('mais')) {
      await client.sendText(message.from, 
      \`Para alugar qualquer uma das lojas, solicitamos:
      📄 Garantias locatícias: Fiador ou depósito caução
      🔍 Certidão negativa de débitos com SPC e Serasa
      
      A locação é feita diretamente com o proprietário, proporcionando um contato mais próximo e direto.
      
      Digite "agendar" para marcar uma visita ou "inicio" para voltar ao início.\`);
    }
    
    // Agendamento
    if (message.body.toLowerCase().includes('agendar')) {
      await client.sendText(message.from, 
      \`Ótima escolha! Para agendar uma visita, acesse o link abaixo:
      
      https://calendly.com/moema-lopes-mg/30min?month=2025-05
      
      Digite "inicio" para voltar ao menu principal.\`);
    }
  });
}

// Sistema de ping para manter o bot online
const pingInterval = 5 * 60 * 1000; // 5 minutos
setInterval(() => {
  fetch(\`https://\${process.env.PROJECT_DOMAIN}.glitch.me\`)
    .then(() => console.log('Ping realizado para evitar hibernação'))
    .catch(err => console.error('Erro no ping:', err));
}, pingInterval);

// Criar página inicial com instruções
app.get('/', (req, res) => {
  res.send(\`
    <html>
      <head>
        <title>Bot de WhatsApp para Aluguel</title>
        <style>
          body { font-family: Arial, sans-serif; max-width: 800px; margin: 0 auto; padding: 20px; }
          h1 { color: #128C7E; }
          .btn { background-color: #25D366; color: white; padding: 10px 15px; text-decoration: none; border-radius: 5px; display: inline-block; margin: 10px 0; }
          pre { background-color: #f4f4f4; padding: 10px; border-radius: 5px; overflow-x: auto; }
        </style>
      </head>
      <body>
        <h1>Bot de WhatsApp para Aluguel de Lojas</h1>
        <p>Siga estes passos para configurar seu bot:</p>
        <ol>
          <li><a href="/start" class="btn">Iniciar Bot</a> (Clique aqui primeiro)</li>
          <li>Depois que o bot iniciar, <a href="/qrcode" target="_blank" class="btn">Visualize o QR Code</a></li>
          <li>Escaneie o QR Code com seu WhatsApp Business</li>
          <li>Pronto! O bot estará conectado e responderá mensagens automaticamente</li>
        </ol>
        <p>Importante: Este bot permanecerá online enquanto o projeto do Glitch estiver ativo. Projetos gratuitos no Glitch "adormecem" após 5 minutos de inatividade, mas este código inclui um sistema de ping para evitar isso.</p>
      </body>
    </html>
  \`);
});

const listener = app.listen(process.env.PORT, () => {
  console.log('Bot iniciado na porta ' + listener.address().port);
});`}
                </pre>
              </div>
            )}
            
            {step === 4 && (
              <div className="space-y-4">
                <h2 className="text-2xl font-bold">4. Inicie o bot</h2>
                <p>Depois que os arquivos forem atualizados, o Glitch vai automaticamente reiniciar o seu projeto.</p>
                <ol className="list-decimal pl-5 space-y-2">
                  <li>Na parte superior do painel do Glitch, clique em "Preview" e depois em "Open in a new window"</li>
                  <li>Na página que abrir, clique no botão "Iniciar Bot"</li>
                  <li>Em seguida, clique em "Visualize o QR Code" - uma nova janela abrirá com o QR code</li>
                  <li>Escaneie o QR code com seu WhatsApp Business</li>
                </ol>
                <img src="https://cdn.glitch.global/5e138dc0-38ff-4f47-8ece-02c645e8aa7f/glitch-preview.png" alt="Preview no Glitch" className="rounded-lg border shadow-sm max-w-full h-auto" />
              </div>
            )}
            
            {step === 5 && (
              <div className="space-y-4">
                <h2 className="text-2xl font-bold">5. Mantenha seu bot online</h2>
                <p>Projetos gratuitos do Glitch "adormecem" após 5 minutos de inatividade. O código já inclui um sistema de ping para evitar isso, mas você pode garantir maior disponibilidade com:</p>
                <ul className="list-disc pl-5 space-y-2">
                  <li>Usando um serviço de monitoramento externo como <a href="https://uptimerobot.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">UptimeRobot</a> (gratuito) para enviar pings ao seu projeto a cada 5 minutos</li>
                  <li>Atualizando para o plano pago do Glitch, que mantém projetos sempre online</li>
                </ul>
                <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <svg className="h-5 w-5 text-yellow-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <p className="text-sm text-yellow-700">
                        <strong>Importante:</strong> O WhatsApp não permite oficialmente bots em contas pessoais. Use o WhatsApp Business e evite automação excessiva para reduzir o risco de bloqueio da sua conta.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </Card>
        </div>
        
        <div className="text-center mt-10">
          <Link to="/">
            <Button>Voltar para a simulação do bot</Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default GlitchGuide;
