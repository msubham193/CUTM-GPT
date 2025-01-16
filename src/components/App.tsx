"use client";
import React, { useState, useRef, useEffect } from "react";
import { Send, Bot, User, Brain, Sparkles } from "lucide-react";
import Image from "next/image";
import SparklesText from "./ui/sparkles-text";
import ShimmerButton from "./ui/shimmer-button";
import { BorderBeam } from "./ui/border-beam";
import ShineBorder from "./ui/shine-border";
import AnimatedGradientText from "./ui/animated-gradient-text";
import { cn } from "@/lib/utils";

interface Message {
  type: "user" | "bot";
  content: string;
}

const sampleQueries = [
  "What programs does CUTM offer?",
  "Tell me about research opportunities at CUTM",
  "What are the admission requirements?",
  "How can I contact the faculty?",
];

const dummyResponse =
  "Thank you for your query. CUTM (Centurion University of Technology and Management) is committed to providing quality education and fostering innovation. We offer various programs across different disciplines including Engineering, Management, Agriculture, Applied Sciences, and more. Our state-of-the-art facilities and experienced faculty ensure that students receive the best possible education to prepare them for their future careers.";

function App() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    // Add user message
    setMessages((prev) => [...prev, { type: "user", content: input }]);
    setInput("");
    setIsTyping(true);

    // Simulate bot response
    setTimeout(() => {
      setMessages((prev) => [...prev, { type: "bot", content: dummyResponse }]);
      setIsTyping(false);
    }, 1500);
  };

  const handleSampleQuery = (query: string) => {
    setInput(query);
  };

  return (
    <div className="min-h-screen bg-[#0C0E10] text-gray-100 font-poppins">
      {/* Header */}
      <div className="backdrop-blur-md bg-[#0C0E10] border-b border-gray-800 p-4 sticky top-0 z-10">
        <div className="max-w-full mx-auto flex items-center gap-2 px-10 ">
          <div className="animate-glow rounded-full p-2">
            <Image
              src={"/cutmologo2.png"}
              alt="CUTM Logo"
              width={45}
              height={45}
            />
          </div>
          <h1 className="text-xl font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent flex items-center gap-2">
            CUTM GPT
          </h1>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto p-4 flex flex-col h-[calc(100vh-80px)] ">
        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto mb-4 space-y-4 scrollbar-thin scrollbar-thumb-blue-500 scrollbar-track-gray-800">
          {messages.length === 0 && (
            <div className="text-center mt-20 animate-fadeIn">
              {/* <SparklesText text="CUTM GPT" /> */}
              <div className="animate-glow inline-block rounded-full p-4 mb-4">
                <Image
                  src={"/cutmlogo.png"}
                  alt="CUTM Logo"
                  width={52}
                  height={52}
                />
              </div>
              <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-white to-gray-700 bg-clip-text text-transparent">
                Welcome to Centurion Univerity GPT
              </h2>

              {/* <ShimmerButton /> */}

              <AnimatedGradientText>
                <span
                  className={cn(
                    `inline animate-gradient bg-gradient-to-r from-white via-gray-500 to-gray-400 bg-[length:var(--bg-size)_100%] bg-clip-text text-transparent`
                  )}
                >
                  Ask me anything about CUTM
                </span>
              </AnimatedGradientText>
            </div>
          )}

          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex items-start gap-4 relative ${
                message.type === "user" ? "justify-end" : ""
              } animate-fadeIn`}
            >
              {/* <BorderBeam /> */}
              {message.type === "bot" && (
                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 flex items-center justify-center shadow-lg shadow-blue-500/20">
                  <Bot className="w-5 h-5" />
                </div>
              )}
              <div
                className={`max-w-[80%] p-4 rounded-lg backdrop-blur-md shadow-lg ${
                  message.type === "user"
                    ? "bg-blue-600/80 shadow-blue-500/20"
                    : "bg-gray-800/80 shadow-gray-900/20"
                }`}
              >
                {message.content}
              </div>
              {message.type === "user" && (
                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 to-purple-600 flex items-center justify-center shadow-lg shadow-purple-500/20">
                  <User className="w-5 h-5" />
                </div>
              )}
            </div>
          ))}
          {isTyping && (
            <div className="flex items-center gap-2 text-gray-400 animate-fadeIn">
              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 flex items-center justify-center shadow-lg shadow-blue-500/20">
                <Bot className="w-5 h-5" />
              </div>
              <div className="flex gap-2">
                <span className="w-2 h-2 bg-blue-400 rounded-full animate-bounce shadow-lg shadow-blue-500/50"></span>
                <span className="w-2 h-2 bg-blue-400 rounded-full animate-bounce [animation-delay:0.2s] shadow-lg shadow-blue-500/50"></span>
                <span className="w-2 h-2 bg-blue-400 rounded-full animate-bounce [animation-delay:0.4s] shadow-lg shadow-blue-500/50"></span>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Sample Queries */}
        {messages.length === 0 && (
          <div className="grid grid-cols-2 gap-4 mb-4">
            {sampleQueries.map((query, index) => (
              <ShineBorder
                className="2xl:text-lg  relative flex h-full w-full flex-col items-center justify-center overflow-hidden backdrop-blur-md   border  md:shadow-xl bg-gray-900/50  text-white  hover:bg-gray-800/50 transition-all duration-300 text-left hover:shadow-lg hover:shadow-blue-500/20 group  rounded-lg"
                color={["#A07CFE", "#FE8FB5", "#FFBE7B"]}
                key={index}
              >
                <button
                  key={index}
                  onClick={() => handleSampleQuery(query)}
                  className="p-4 relative  w-full text-left "
                >
                  {/* <BorderBeam /> */}
                  <Sparkles className="w-4 h-4  mb-2 opacity-0 group-hover:opacity-100 transition-opacity text-white" />
                  {query}
                </button>
              </ShineBorder>
            ))}
          </div>
        )}

        {/* Input Area */}
        <form onSubmit={handleSubmit} className="relative">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message..."
            className="w-full backdrop-blur-md bg-gray-900/50 rounded-lg pl-4 pr-12 py-4 focus:outline-none focus:ring-2 focus:ring-blue-500/50 border border-gray-700 focus:border-blue-500/50 transition-all duration-300"
          />

          <button
            type="submit"
            className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center bg-blue-500 rounded-lg hover:bg-blue-600 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/20"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
}

export default App;
