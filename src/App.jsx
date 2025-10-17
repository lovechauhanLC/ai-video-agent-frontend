import React, { useState, useRef, useEffect } from "react";
import { startConversation, endConversation } from "./api.js";

export default function App() {
  const [conversationUrl, setConversationUrl] = useState("");
  const [conversationId, setConversationId] = useState("");
  const frameRef = useRef(null);

  const start = async () => {
    const { data } = await startConversation("AI Video Agent");
    setConversationUrl(data.conversationUrl);
    setConversationId(data.conversationId);
  };

  const stop = async () => {
    if (conversationId) await endConversation(conversationId);
    setConversationUrl("");
    setConversationId("");
  };

  useEffect(() => {
    if (frameRef.current && conversationUrl) frameRef.current.src = conversationUrl;
  }, [conversationUrl]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] flex items-center justify-center text-white px-6 relative overflow-hidden">
      
      <div className="absolute inset-0 bg-gradient-to-t from-blue-600/20 to-transparent blur-3xl animate-pulse"></div>

      <div className="max-w-3xl w-full bg-white/10 backdrop-blur-2xl rounded-3xl shadow-[0_0_40px_rgba(0,0,0,0.5)] p-10 border border-white/20 relative">
        
        <h1 className="text-5xl font-extrabold text-center mb-4 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-400 bg-clip-text text-transparent animate-pulse-slow drop-shadow-lg">
          Tavus AI Video Agent
        </h1>

        <p className="text-gray-300 text-center mb-8 leading-relaxed">
          Experience an immersive real-time conversation with your AI video assistant.
          Please allow access to your camera and microphone to begin.
        </p>

        {!conversationUrl ? (
          <button
            onClick={start}
            className="w-full py-4 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-2xl font-semibold text-lg shadow-lg hover:shadow-cyan-400/40 hover:scale-[1.03] transition-all duration-300 active:scale-[0.97]"
          >
            Start Conversation
          </button>
        ) : (
          <button
            onClick={stop}
            className="w-full py-4 bg-gradient-to-r from-red-500 to-pink-500 rounded-2xl font-semibold text-lg shadow-lg hover:shadow-pink-500/40 hover:scale-[1.03] transition-all duration-300 active:scale-[0.97]"
          >
            End Conversation
          </button>
        )}

        {conversationUrl && (
          <div className="mt-10 relative w-full aspect-video rounded-3xl overflow-hidden border border-white/20 shadow-[0_0_40px_rgba(0,0,0,0.3)] animate-float">
            <iframe
              ref={frameRef}
              title="AI Video Agent"
              allow="camera; microphone; autoplay; clipboard-write; display-capture"
              className="w-full h-full rounded-3xl"
            />
          </div>
        )}
      </div>

     
      
    </div>
  );
}