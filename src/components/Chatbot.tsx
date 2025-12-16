import React, { useState, useRef, useEffect } from "react";
import { FiMessageSquare, FiX, FiSend, FiChevronDown } from "react-icons/fi";
import { useTranslation } from "react-i18next";

type Message = {
  id: string;
  text: string;
  sender: "user" | "bot";
  timestamp: Date;
};

type QuickAction = {
  id: string;
  text: string;
  action: () => void;
};

const Chatbot: React.FC = () => {
  const { t, i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [showQuickActions, setShowQuickActions] = useState(true);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Initialize welcome message on component mount and language change
  useEffect(() => {
    setMessages([
      {
        id: "1",
        text: t(
          "chatbot.welcome",
          "Hi 👋 Welcome to Azaroth Tech-Hive. How can we help you today?"
        ),
        sender: "bot",
        timestamp: new Date(),
      },
    ]);
  }, [i18n.language, t]);

  const quickActions: QuickAction[] = [
    {
      id: "quote",
      text: t("chatbot.actions.quote", "Request a Quote"),
      action: () =>
        handleQuickAction(t("chatbot.actions.quote", "Request a Quote")),
    },
    {
      id: "consultation",
      text: t("chatbot.actions.consultation", "Get Free Consultation"),
      action: () =>
        handleQuickAction(
          t("chatbot.actions.consultation", "Get Free Consultation")
        ),
    },
    {
      id: "services",
      text: t("chatbot.actions.services", "Our Services"),
      action: () =>
        handleQuickAction(
          t("chatbot.actions.services", "Tell me about your services")
        ),
    },
    {
      id: "sales",
      text: t("chatbot.actions.sales", "Talk to Sales"),
      action: () =>
        handleQuickAction(
          t("chatbot.actions.sales", "I want to talk to sales")
        ),
    },
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setShowQuickActions(false);
    setIsTyping(true);

    // Simulate bot response
    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: getBotResponse(inputValue),
        sender: "bot",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botResponse]);
      setIsTyping(false);
    }, 1000);
  };

  const handleQuickAction = (actionText: string) => {
    setInputValue(actionText);
    // Trigger send message after a small delay to allow the input to update
    setTimeout(() => {
      const formEvent = { preventDefault: () => {} } as React.FormEvent;
      handleSendMessage(formEvent);
    }, 100);
  };

  const getBotResponse = (message: string): string => {
    const lowerMessage = message.toLowerCase();

    if (lowerMessage.includes("quote") || lowerMessage.includes("pricing")) {
      return t(
        "chatbot.responses.quote",
        "I can help you with a quote. Could you please provide some details about your project requirements?"
      );
    } else if (
      lowerMessage.includes("consultation") ||
      lowerMessage.includes("meeting")
    ) {
      return t(
        "chatbot.responses.consultation",
        "I'd be happy to schedule a free consultation. When would be a good time for you?"
      );
    } else if (
      lowerMessage.includes("service") ||
      lowerMessage.includes("offer")
    ) {
      return t(
        "chatbot.responses.services",
        "We offer a wide range of services including web development, mobile apps, cloud solutions, and AI/ML services. Which one are you interested in?"
      );
    } else if (
      lowerMessage.includes("sales") ||
      lowerMessage.includes("contact")
    ) {
      return t(
        "chatbot.responses.sales",
        "I can connect you with our sales team. Could you please provide your contact information and the best time to reach you?"
      );
    } else if (
      lowerMessage.includes("hi") ||
      lowerMessage.includes("hello") ||
      lowerMessage.includes("hey")
    ) {
      return t(
        "chatbot.responses.greeting",
        "Hello! How can I assist you today?"
      );
    } else {
      return t(
        "chatbot.responses.default",
        "Thank you for your message. Our team will get back to you shortly with more information."
      );
    }
  };

  const toggleChat = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      setShowQuickActions(true);
      // Focus input when opening chat
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Chat Button */}
      <button
        onClick={toggleChat}
        className="w-14 h-14 rounded-full bg-gradient-to-r from-blue-600 to-blue-500 text-white shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 flex items-center justify-center relative"
        aria-label={t("chatbot.open_chat", "Open chat")}
      >
        {isOpen ? (
          <FiX size={24} />
        ) : (
          <>
            <FiMessageSquare size={24} />
          </>
        )}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div
          className="absolute bottom-20 right-0 w-80 h-[500px] bg-white/80 backdrop-blur-lg rounded-2xl shadow-2xl overflow-hidden flex flex-col border border-white/20"
          style={{
            background: "rgba(255, 255, 255, 0.9)",
            backdropFilter: "blur(12px)",
            boxShadow: "0 10px 30px rgba(0, 0, 0, 0.1)",
          }}
        >
          {/* Chat Header */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-500 text-white p-4">
            <div className="flex justify-between items-center">
              <h3 className="font-semibold">
                {t("chatbot.assistant", "Azaroth Assistant")}
              </h3>
              <button
                onClick={toggleChat}
                className="text-white/80 hover:text-white"
              >
                <FiX size={20} />
              </button>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 p-4 overflow-y-auto">
            <div className="space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  aria-label={t("chatbot.send_message", "Send message")}
                  className={`flex ${
                    message.sender === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-[80%] rounded-2xl px-4 py-2 ${
                      message.sender === "user"
                        ? "bg-blue-500 text-white rounded-br-none"
                        : "bg-gray-100 text-gray-800 rounded-bl-none"
                    }`}
                  >
                    {message.text}
                    <div className="text-xs opacity-70 mt-1 text-right">
                      {message.timestamp.toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </div>
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-gray-100 text-gray-800 rounded-2xl rounded-bl-none px-4 py-2">
                    <div className="flex space-x-1">
                      <div
                        className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                        style={{ animationDelay: "0ms" }}
                      ></div>
                      <div
                        className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                        style={{ animationDelay: "150ms" }}
                      ></div>
                      <div
                        className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                        style={{ animationDelay: "300ms" }}
                      ></div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick Actions */}
            {showQuickActions && (
              <div className="mt-4 space-y-2">
                <div className="text-xs text-gray-500 flex items-center">
                  <span>{t("chatbot.quick_actions", "Quick actions")}</span>
                  <FiChevronDown
                    size={16}
                    className={i18n.dir() === "rtl" ? "mr-1" : "ml-1"}
                  />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {quickActions.map((action) => (
                    <button
                      key={action.id}
                      onClick={action.action}
                      className="text-xs bg-white/50 hover:bg-white/80 text-gray-800 border border-gray-200 rounded-lg px-3 py-2 transition-colors duration-200 text-left"
                    >
                      {action.text}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Input Area */}
          <form
            onSubmit={handleSendMessage}
            className="p-4 border-t border-gray-200 bg-white/50"
          >
            <div className="flex space-x-2">
              <input
                ref={inputRef}
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder={t(
                  "chatbot.input_placeholder",
                  "Type your message..."
                )}
                className="flex-1 px-4 py-2 text-sm border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <button
                type="submit"
                disabled={!inputValue.trim()}
                className="w-10 h-10 rounded-full bg-blue-500 text-white flex items-center justify-center hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <FiSend size={18} />
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default Chatbot;
