
import React, { useState, useEffect } from 'react';
import ChatInterface from '@/components/ChatInterface';
import SimulatorContainer from '@/components/SimulatorContainer';

type MessageType = {
  content: React.ReactNode;
  sender: 'bot' | 'user';
  timestamp?: string;
};

const Index = () => {
  const [messages, setMessages] = useState<MessageType[]>([]);
  const [currentScreen, setCurrentScreen] = useState("welcome");

  const welcomeMessage = (
    <div>
      <p className="font-medium">Olá! 👋 Obrigado pelo contato. Estamos aqui para ajudar com mais informações sobre as nossas lojas disponíveis para locação.</p>
      <p className="mt-2">Temos as seguintes opções:</p>
      <p className="font-medium mt-1">LOJA 01 – 55m²</p>
    </div>
  );

  const loja01Message = (
    <div>
      <p className="font-medium">Você escolheu a LOJA 01. Aqui estão os detalhes:</p>
      <p className="mt-2">📏 Área total: 55m²</p>
      <p>📍 Localização: Selim de Sales, 1408, loja de esquina com ótima visibilidade</p>
      <p>⚡ Energia: Instalação trifásica</p>
      <p>💰 Aluguel mensal: R$ 2.500,00</p>
      <p>📅 Contrato mínimo: 1 ano</p>
    </div>
  );

  const moreInfoMessage = (
    <div>
      <p className="font-medium">Para alugar qualquer uma das lojas, solicitamos:</p>
      <p className="mt-2">📄 Garantias locatícias: Fiador ou depósito caução</p>
      <p>🔍 Certidão negativa de débitos com SPC e Serasa</p>
      <p className="mt-2">A locação é feita diretamente com o proprietário, proporcionando um contato mais próximo e direto.</p>
    </div>
  );

  const scheduleMessage = (
    <div>
      <p className="font-medium">Ótima escolha! Para agendar uma visita, acesse o link abaixo:</p>
      <a 
        href="https://calendly.com/moema-lopes-mg/30min?month=2025-05" 
        target="_blank" 
        rel="noopener noreferrer"
        className="text-blue-600 underline block mt-2"
      >
        https://calendly.com/moema-lopes-mg/30min?month=2025-05
      </a>
    </div>
  );

  const handleSelectOption = (screen: string) => {
    let userMessage: string;
    let botResponse: React.ReactNode;
    
    switch(screen) {
      case "loja01":
        userMessage = "Quero informações sobre a LOJA 01";
        botResponse = loja01Message;
        break;
      case "more_info":
        userMessage = "Quero mais informações";
        botResponse = moreInfoMessage;
        break;
      case "schedule":
        userMessage = "Quero agendar uma visita";
        botResponse = scheduleMessage;
        break;
      case "welcome":
      default:
        userMessage = "Olá, gostaria de informações sobre lojas para alugar";
        botResponse = welcomeMessage;
        break;
    }
    
    setMessages(prev => [
      ...prev, 
      { content: userMessage, sender: 'user' },
      { content: botResponse, sender: 'bot' }
    ]);
    
    setCurrentScreen(screen);
  };

  useEffect(() => {
    // Initial message when component mounts
    setTimeout(() => {
      setMessages([{ content: welcomeMessage, sender: 'bot' }]);
    }, 500);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 py-8">
      <div className="container mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-green-500">
            Aluguel Fácil - Bot de WhatsApp
          </h1>
          <p className="text-gray-600 mt-2">
            Sistema de automação para atendimento de interessados em lojas comerciais
          </p>
        </div>
        
        <SimulatorContainer>
          <ChatInterface 
            messages={messages} 
            currentScreen={currentScreen}
            onSelectOption={handleSelectOption}
          />
        </SimulatorContainer>
      </div>
    </div>
  );
};

export default Index;
