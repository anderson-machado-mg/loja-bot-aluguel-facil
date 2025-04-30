
import React from 'react';
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface SimulatorContainerProps {
  children: React.ReactNode;
}

const SimulatorContainer: React.FC<SimulatorContainerProps> = ({ children }) => {
  return (
    <div className="max-w-4xl mx-auto p-4">
      <Tabs defaultValue="preview" className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-4">
          <TabsTrigger value="preview">Prévia do WhatsApp</TabsTrigger>
          <TabsTrigger value="setup">Configurações</TabsTrigger>
        </TabsList>
        <TabsContent value="preview" className="mt-0">
          <Card className="w-full max-w-sm mx-auto h-[600px] overflow-hidden shadow-lg">
            {children}
          </Card>
        </TabsContent>
        <TabsContent value="setup">
          <Card className="p-6">
            <h2 className="text-2xl font-bold mb-4">Como configurar seu bot de WhatsApp</h2>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold mb-2">1. Plataformas Gratuitas Recomendadas</h3>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-medium mb-1">Opção 1: WPPConnect (Gratuito e Open Source)</h4>
                  <p className="text-sm mb-2">Uma biblioteca Node.js para automatização do WhatsApp que pode ser hospedada gratuitamente.</p>
                  <a href="https://github.com/wppconnect-team/wppconnect" className="text-blue-600 hover:underline text-sm" target="_blank" rel="noopener noreferrer">github.com/wppconnect-team/wppconnect</a>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-lg mt-3">
                  <h4 className="font-medium mb-1">Opção 2: Dialogflow + Kommunicate (Plano Gratuito Limitado)</h4>
                  <p className="text-sm mb-2">Dialogflow para criar o fluxo de conversação e Kommunicate para integração com WhatsApp Business API.</p>
                  <a href="https://kommunicate.io/integrations/dialogflow-chatbot" className="text-blue-600 hover:underline text-sm" target="_blank" rel="noopener noreferrer">kommunicate.io/integrations/dialogflow-chatbot</a>
                </div>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold mb-2">2. Configuração Passo a Passo com WPPConnect</h3>
                <ol className="list-decimal pl-5 space-y-3">
                  <li className="text-sm">Clone o repositório WPPConnect do GitHub</li>
                  <li className="text-sm">Instale as dependências com <code className="bg-gray-100 px-1 rounded">npm install</code></li>
                  <li className="text-sm">Crie um arquivo JavaScript com o código do bot (exemplo abaixo)</li>
                  <li className="text-sm">Execute com <code className="bg-gray-100 px-1 rounded">node seu-arquivo.js</code></li>
                  <li className="text-sm">Escaneie o código QR que aparecerá no terminal</li>
                </ol>
                
                <div className="mt-4">
                  <h4 className="font-medium mb-2">Exemplo de Código:</h4>
                  <pre className="bg-gray-100 p-3 rounded-lg text-xs overflow-auto">
{`const wppconnect = require('@wppconnect-team/wppconnect');

wppconnect.create().then((client) => {
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
      Garantias locatícias: Fiador ou depósito caução
      Certidão negativa de débitos com SPC e Serasa
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
}).catch((error) => console.log(error));`}
                  </pre>
                </div>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold mb-2">3. Alternativas Pagas de Baixo Custo</h3>
                <ul className="list-disc pl-5 space-y-1">
                  <li className="text-sm"><strong>ManyChat</strong> - Planos a partir de $15/mês</li>
                  <li className="text-sm"><strong>Landbot</strong> - Planos a partir de $20/mês</li>
                  <li className="text-sm"><strong>Twilio</strong> - Pagamento por uso (custo por mensagem)</li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold mb-2">4. Ressalvas Importantes</h3>
                <ul className="list-disc pl-5 space-y-1 text-sm">
                  <li>O WhatsApp não permite oficialmente bots em contas pessoais. Use WhatsApp Business.</li>
                  <li>WhatsApp Business API oficial exige aprovação da Meta e normalmente requer parceria com provedores certificados.</li>
                  <li>Soluções não-oficiais como WPPConnect podem funcionar, mas há risco de bloqueio da conta.</li>
                </ul>
              </div>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SimulatorContainer;
