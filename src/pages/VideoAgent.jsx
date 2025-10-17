import React, { useRef, useState, useEffect } from "react";
import { startConversation, endConversation } from "../api";

export default function VideoAgent() {
  const [conversationUrl, setConversationUrl] = useState("");
  const [conversationId, setConversationId] = useState("");
  const frameRef = useRef(null);

  const start = async () => {
    const { conversationUrl, conversationId } = await startConversation("Demo Call");
    setConversationUrl(conversationUrl);
    setConversationId(conversationId);
  };

  const stop = async () => {
    if (conversationId) await endConversation(conversationId);
    setConversationId("");
    setConversationUrl("");
  };

  useEffect(() => {
    if (frameRef.current && conversationUrl) frameRef.current.src = conversationUrl;
  }, [conversationUrl]);

  return (
    <div style={{ padding: 20, maxWidth: 960, margin: "0 auto" }}>
      <h1 style={{ fontSize: 28 }}>Talk to your AI Video Agent 🎥</h1>
      {!conversationUrl ? (
        <button
          onClick={start}
          style={{ marginTop: 20, padding: "10px 16px", borderRadius: 8, background: "#1f2937", color: "white" }}
        >
          Start Conversation
        </button>
      ) : (
        <button
          onClick={stop}
          style={{ marginTop: 20, padding: "10px 16px", borderRadius: 8, background: "#7f1d1d", color: "white" }}
        >
          End Conversation
        </button>
      )}

      {conversationUrl && (
        <iframe
          ref={frameRef}
          title="AI Video Agent"
          allow="camera; microphone; autoplay; clipboard-write; display-capture"
          style={{ width: "100%", height: "70vh", marginTop: 16, border: "0", borderRadius: 16, background: "black" }}
        />
      )}
    </div>
  );
}