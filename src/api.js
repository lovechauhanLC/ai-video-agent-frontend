import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE || "http://localhost:3000",
  withCredentials: true
});

export const startConversation = async (name) => {
  const { data } = await api.post("/api/convo/start", { name });
  return data;
};

export const endConversation = async (conversationId) => {
  const { data } = await api.post("/api/convo/end", { conversationId });
  return data;
};