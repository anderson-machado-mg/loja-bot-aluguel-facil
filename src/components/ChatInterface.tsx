
import React from 'react';
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface MessageProps {
  content: React.ReactNode;
  sender: 'bot' | 'user';
  timestamp?: string;
}

const Message: React.FC<MessageProps> = ({ content, sender, timestamp }) => {
  return (
    <div className={cn(
      "flex",
      sender === 'user' ? "justify-end" : "justify-start",
      "mb-4"
    )}>
      <div className={cn(
        "message-bubble animate-bounce-in",
        sender === 'user' ? 
          "bg-white text-gray-800 user" :
          "bg-whatsapp-light text-gray-800 bot"
      )}>
        {content}
        <div className={cn(
          "text-xs mt-1",
          sender === 'user' ? "text-right" : "text-left",
          "text-gray-500"
        )}>
          {timestamp || new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </div>
      </div>
    </div>
  );
};

interface ChatButtonProps {
  text: string;
  onClick: () => void;
  icon?: string;
}

const ChatButton: React.FC<ChatButtonProps> = ({ text, onClick, icon }) => {
  return (
    <Button 
      onClick={onClick}
      className="bg-whatsapp hover:bg-whatsapp-dark text-white mr-2 mb-2 transition-all"
    >
      {icon && <span className="mr-1">{icon}</span>}
      {text}
    </Button>
  );
};

interface ChatInterfaceProps {
  messages: MessageProps[];
  currentScreen: string;
  onSelectOption: (screen: string) => void;
}

const ChatInterface: React.FC<ChatInterfaceProps> = ({ 
  messages, 
  currentScreen,
  onSelectOption
}) => {
  return (
    <div className="flex flex-col h-full">
      <div className="bg-whatsapp-dark py-3 px-4 flex items-center rounded-t-lg">
        <div className="w-10 h-10 bg-gray-300 rounded-full mr-3 flex items-center justify-center">
          <span className="text-xl">🏢</span>
        </div>
        <div>
          <h2 className="text-white font-semibold">Aluguel Fácil</h2>
          <p className="text-green-100 text-xs">Online</p>
        </div>
      </div>
      
      <div 
        className="flex-1 overflow-y-auto px-4 py-3 bg-[#e5ddd5]"
        style={{backgroundImage: `url("data:image/svg+xml,%3Csvg width='64' height='64' viewBox='0 0 64 64' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M8 16c4.418 0 8-3.582 8-8s-3.582-8-8-8-8 3.582-8 8 3.582 8 8 8zm0-2c3.314 0 6-2.686 6-6s-2.686-6-6-6-6 2.686-6 6 2.686 6 6 6zm33.414-6l5.95-5.95L45.95.636 40 6.586 34.05.636 32.636 2.05 38.586 8l-5.95 5.95 1.414 1.414L40 9.414l5.95 5.95 1.414-1.414L41.414 8zM40 48c4.418 0 8-3.582 8-8s-3.582-8-8-8-8 3.582-8 8 3.582 8 8 8zm0-2c3.314 0 6-2.686 6-6s-2.686-6-6-6-6 2.686-6 6 2.686 6 6 6zM9.414 40l5.95-5.95-1.414-1.414L8 38.586l-5.95-5.95L.636 34.05 6.586 40l-5.95 5.95 1.414 1.414L8 41.414l5.95 5.95 1.414-1.414L9.414 40z' fill='%239C92AC' fill-opacity='0.08' fill-rule='evenodd'/%3E%3C/svg%3E")`}}
      >
        {messages.map((msg, index) => (
          <Message key={index} {...msg} />
        ))}
      </div>
      
      <div className="bg-gray-100 p-3 rounded-b-lg">
        {currentScreen === "welcome" && (
          <div>
            <ChatButton 
              text="LOJA 01 – 55m²" 
              onClick={() => onSelectOption("loja01")}
              icon="🏬"
            />
          </div>
        )}
        
        {currentScreen === "loja01" && (
          <div>
            <ChatButton 
              text="Agendar Visita" 
              onClick={() => onSelectOption("schedule")}
              icon="📅"
            />
            <ChatButton 
              text="Mais Informações" 
              onClick={() => onSelectOption("more_info")}
              icon="ℹ️"
            />
            <ChatButton 
              text="Voltar ao Início" 
              onClick={() => onSelectOption("welcome")}
              icon="🔙"
            />
          </div>
        )}
        
        {currentScreen === "more_info" && (
          <div>
            <ChatButton 
              text="Agendar Visita" 
              onClick={() => onSelectOption("schedule")}
              icon="📅"
            />
            <ChatButton 
              text="Voltar à Loja" 
              onClick={() => onSelectOption("loja01")}
              icon="🏬"
            />
            <ChatButton 
              text="Voltar ao Início" 
              onClick={() => onSelectOption("welcome")}
              icon="🔙"
            />
          </div>
        )}
        
        {currentScreen === "schedule" && (
          <div>
            <ChatButton 
              text="Voltar às Informações" 
              onClick={() => onSelectOption("more_info")}
              icon="ℹ️"
            />
            <ChatButton 
              text="Voltar à Loja" 
              onClick={() => onSelectOption("loja01")}
              icon="🏬"
            />
            <ChatButton 
              text="Voltar ao Início" 
              onClick={() => onSelectOption("welcome")}
              icon="🔙"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatInterface;
