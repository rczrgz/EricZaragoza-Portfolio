import { useState, useRef, useEffect } from "react";
import { ThemeContext } from "../context/ThemeContext";
import { useContext } from "react";

const SYSTEM_PROMPT = `You are a helpful assistant for Eric Zaragoza's portfolio website.
Answer questions about his skills, projects, and experience.
Keep answers short — 2-3 sentences max. Be friendly and direct.

PERSONAL INFO:
- Full Name: Eric C. Zaragoza
- Location: Marikina City, Philippines
- Phone: +63 975 553 9103
- Email: eric.zaragoza27@gmail.com
- Portfolio: https://eric-zaragoza-portfolio.vercel.app/

PROJECTS:
- Self-Shoot Website: A self-service photography studio app for bookings, inventory management, and employee monitoring. Built with Figma.
- OptiSnap: A dashboard/management system built with PHP, MySQL, HTML and more.
- Weather Wheater Lang: A weather app built with Flutter and Dart (Mobile App).
- ER PCR: A healthcare app using Flutter, Mapbox API, and Healthcare Workflow for real-time patient tracking.
- Love To Dream: WordPress/WooCommerce e-commerce site with custom plugin development.
- Mamas & Papas: Shopify store with shipping rules and e-commerce optimization.

PROFESSIONAL EXPERIENCE:
- Junior Web Developer at Bullseye Solution Inc. (Nov 2026 – Present)
  Builds and maintains responsive websites and e-commerce platforms using WordPress, WooCommerce, and Shopify.
  Implements custom features, UI improvements, third-party APIs, payment gateways, and shipping solutions.
  Troubleshoots and optimizes website performance for reliability, speed, and security.

- Software Engineer Intern – Mobile Development at Pragtechnologies Corp. (Mar – Jun 2025)
  Developed an Ambulance Module using Clean Architecture with real-time patient location tracking.
  Integrated Mapbox API and API communication from Elixir backend to Flutter-based mobile apps.
  Collaborated on a cross-functional team for a large-scale, high-impact project.

SKILLS:
- Frontend: React, JavaScript, HTML, CSS, Tailwind CSS, Figma
- Mobile: Flutter, Dart
- Backend/CMS: WordPress, WooCommerce, Shopify, PHP, MySQL
- APIs & Tools: Mapbox API, Custom Plugin Development, E-commerce Optimization

If asked for contact info, provide Eric's email or suggest visiting the Contact section.`;

const GROQ_API_KEY = process.env.REACT_APP_GROQ_API_KEY;
const GROQ_API_URL = "https://api.groq.com/openai/v1/chat/completions";
const GROQ_MODEL = "llama-3.3-70b-versatile";

const INITIAL_MESSAGES = [
  { role: "assistant", text: "Hi! I'm Eric's assistant. Ask me anything about his work 👋" }
];

export default function Chatbot() {
  const { theme } = useContext(ThemeContext);

  const [isDark, setIsDark] = useState(
    document.documentElement.classList.contains("dark")
  );

  useEffect(() => {
    const observer = new MutationObserver(() => {
      setIsDark(document.documentElement.classList.contains("dark"));
    });
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });
    return () => observer.disconnect();
  }, []);

  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState(INITIAL_MESSAGES);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [isBusy, setIsBusy] = useState(false);
  const bottomRef = useRef(null);
  const historyRef = useRef([]);
  const lastSentRef = useRef(0);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async (overrideMessage) => {
    const now = Date.now();
    if (now - lastSentRef.current < 3000) return;
    lastSentRef.current = now;

    const userMessage = (overrideMessage || input).trim();
    if (!userMessage || loading) return;

    setInput("");
    setMessages(prev => [...prev, { role: "user", text: userMessage }]);
    setLoading(true);

    historyRef.current.push({ role: "user", content: userMessage });

    try {
      const response = await fetch(GROQ_API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${GROQ_API_KEY}`
        },
        body: JSON.stringify({
          model: GROQ_MODEL,
          messages: [
            { role: "system", content: SYSTEM_PROMPT },
            ...historyRef.current
          ],
          max_tokens: 300,
          temperature: 0.7
        })
      });

      if (!response.ok) {
        const err = await response.json();
        console.error("API Error:", err);
        throw new Error(err?.error?.message || `HTTP ${response.status}`);
      }

      const data = await response.json();
      const reply = data.choices?.[0]?.message?.content || "Sorry, I couldn't get a response.";

      historyRef.current.push({ role: "assistant", content: reply });

      setIsBusy(false);
      setMessages(prev => [...prev, { role: "assistant", text: reply }]);
    } catch (error) {
      console.error("Chatbot error:", error);
      const isRateLimit =
        error.message?.includes("429") ||
        error.message?.includes("quota") ||
        error.message?.includes("rate");

      if (isRateLimit) {
        setIsBusy(true);
        setMessages(prev => [...prev, {
          role: "assistant",
          text: "I'm a bit busy right now. Please try again in a moment! ⏳"
        }]);
      } else {
        setMessages(prev => [...prev, {
          role: "assistant",
          text: "Oops, something went wrong. Please try again!"
        }]);
      }

      historyRef.current.pop();
    } finally {
      setLoading(false);
    }
  };

  const c = {
    primary:         isDark ? "#818cf8" : "#6366f1",
    chatBg:          isDark ? "#1a202c" : "#ffffff",
    chatBorder:      isDark ? "#2d3748" : "#e5e7eb",
    messagesBg:      isDark ? "#1a202c" : "#f3f4f6",
    assistantBubble: isDark ? "#2d3748" : "#ffffff",
    assistantText:   isDark ? "#e2e8f0" : "#1f2937",
    userBubble:      isDark ? "#818cf8" : "#6366f1",
    userText:        "#ffffff",
    inputBg:         isDark ? "#2d3748" : "#f3f4f6",
    inputBorder:     isDark ? "#4a5568" : "#e5e7eb",
    inputText:       isDark ? "#e2e8f0" : "#1f2937",
    suggestBg:       isDark ? "#2d3748" : "#eef2ff",
    suggestBorder:   isDark ? "#818cf8" : "#c7d2fe",
    suggestText:     isDark ? "#818cf8" : "#6366f1",
    suggestArea:     isDark ? "#1a202c" : "#f3f4f6",
    divider:         isDark ? "#2d3748" : "#e5e7eb",
    typingText:      isDark ? "#718096" : "#9ca3af",
    shadow:          isDark ? "rgba(0,0,0,0.5)" : "rgba(0,0,0,0.15)",
    statusDot:       isBusy ? "#f59e0b" : "#22c55e",
    statusText:      isBusy ? "#fcd34d" : "#86efac",
  };

  return (
    <>
      {/* ✅ Chat Window — independently fixed, anchored bottom-right above button */}
      {isOpen && (
        <div style={{
          position: "fixed",
          bottom: "90px",   // sits above the 56px button + 10px gap
          right: "24px",
          zIndex: 1000,
          width: "340px",
          height: "480px",
          background: c.chatBg,
          borderRadius: "16px",
          boxShadow: `0 8px 32px ${c.shadow}`,
          display: "flex",
          flexDirection: "column",
          border: `1px solid ${c.chatBorder}`,
          overflow: "hidden",
          transition: "background 0.3s ease, border-color 0.3s ease"
        }}>

          {/* Header */}
          <div style={{
            padding: "12px 16px",
            background: `linear-gradient(135deg, ${c.primary}, #8b5cf6)`,
            color: "#fff",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "10px"
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <div style={{ position: "relative", flexShrink: 0 }}>
                <img
                  src="/eager.jpg"
                  alt="Eric Zaragoza"
                  style={{
                    width: "40px", height: "40px", borderRadius: "50%",
                    border: "2px solid rgba(255,255,255,0.6)",
                    objectFit: "cover", display: "block"
                  }}
                  onError={e => {
                    e.target.style.display = "none";
                    e.target.nextSibling.style.display = "flex";
                  }}
                />
                <div style={{
                  display: "none", width: "40px", height: "40px",
                  borderRadius: "50%", background: "rgba(255,255,255,0.3)",
                  border: "2px solid rgba(255,255,255,0.6)",
                  alignItems: "center", justifyContent: "center",
                  fontWeight: 700, fontSize: "14px", color: "#fff"
                }}>
                  EZ
                </div>
                <div style={{
                  position: "absolute", bottom: "1px", right: "1px",
                  width: "11px", height: "11px", borderRadius: "50%",
                  background: c.statusDot, border: "2px solid #fff",
                  transition: "background 0.5s ease"
                }} />
              </div>

              <div>
                <div style={{ fontWeight: 600, fontSize: "14px", lineHeight: 1.2 }}>
                  Eric Zaragoza
                </div>
                <div style={{
                  fontSize: "11px", opacity: 0.9,
                  display: "flex", alignItems: "center", gap: "4px"
                }}>
                  <span style={{ color: c.statusText, transition: "color 0.5s ease" }}>●</span>
                  {isBusy ? "Busy — try again shortly" : "Online"}
                </div>
              </div>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              style={{
                background: "rgba(255,255,255,0.15)", border: "none",
                color: "#fff", width: "28px", height: "28px",
                borderRadius: "50%", cursor: "pointer", fontSize: "14px",
                display: "flex", alignItems: "center", justifyContent: "center",
                flexShrink: 0, outline: "none"
              }}
            >
              ✕
            </button>
          </div>

          {/* Messages */}
          <div style={{
            flex: 1, overflowY: "auto", padding: "12px",
            display: "flex", flexDirection: "column", gap: "8px",
            background: c.messagesBg,
            transition: "background 0.3s ease"
          }}>
            {messages.map((msg, i) => (
              <div key={i} style={{
                alignSelf: msg.role === "user" ? "flex-end" : "flex-start",
                background: msg.role === "user" ? c.userBubble : c.assistantBubble,
                color: msg.role === "user" ? c.userText : c.assistantText,
                padding: "10px 14px",
                borderRadius: msg.role === "user" ? "16px 16px 4px 16px" : "16px 16px 16px 4px",
                maxWidth: "82%", fontSize: "13.5px", lineHeight: "1.5",
                boxShadow: `0 1px 3px ${c.shadow}`,
                transition: "background 0.3s ease, color 0.3s ease"
              }}>
                {msg.text}
              </div>
            ))}

            {loading && (
              <div style={{
                alignSelf: "flex-start", background: c.assistantBubble,
                padding: "10px 14px", borderRadius: "16px 16px 16px 4px",
                fontSize: "13px", color: c.typingText,
                boxShadow: `0 1px 3px ${c.shadow}`,
                transition: "background 0.3s ease"
              }}>
                Typing...
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          {/* Suggested Questions */}
          {messages.length === 1 && (
            <div style={{
              padding: "8px 12px", display: "flex", flexWrap: "wrap", gap: "6px",
              background: c.suggestArea, borderTop: `1px solid ${c.divider}`,
              transition: "background 0.3s ease"
            }}>
              {["What are Eric's skills?", "Show me his projects", "How to contact Eric?"].map((q) => (
                <button key={q} onClick={() => sendMessage(q)} style={{
                  fontSize: "11px", padding: "4px 10px", borderRadius: "20px",
                  border: `1px solid ${c.suggestBorder}`,
                  background: c.suggestBg, color: c.suggestText, cursor: "pointer",
                  outline: "none",
                  transition: "background 0.3s ease, color 0.3s ease"
                }}>
                  {q}
                </button>
              ))}
            </div>
          )}

          {/* Input */}
          <div style={{
            padding: "12px", borderTop: `1px solid ${c.divider}`,
            display: "flex", gap: "8px", background: c.chatBg,
            transition: "background 0.3s ease"
          }}>
            <input
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === "Enter" && sendMessage()}
              placeholder="Type a message..."
              style={{
                flex: 1, padding: "9px 14px", borderRadius: "24px",
                border: `1px solid ${c.inputBorder}`, fontSize: "13.5px",
                outline: "none", background: c.inputBg, color: c.inputText,
                transition: "background 0.3s ease, color 0.3s ease, border-color 0.3s ease"
              }}
            />
            <button
              onClick={() => sendMessage()}
              disabled={loading}
              style={{
                width: "38px", height: "38px", borderRadius: "50%",
                background: loading ? (isDark ? "#4f46e5" : "#c7d2fe") : c.primary,
                color: "#fff", border: "none", outline: "none",
                cursor: loading ? "not-allowed" : "pointer",
                fontSize: "16px", display: "flex",
                alignItems: "center", justifyContent: "center", flexShrink: 0,
                transition: "background 0.3s ease"
              }}
            >
              ↑
            </button>
          </div>
        </div>
      )}

      {/* ✅ Toggle Button — independently fixed, never moves regardless of isOpen */}
      <button
        onClick={() => setIsOpen(prev => !prev)}
        style={{
          position: "fixed",
          bottom: "24px",
          right: "24px",
          zIndex: 1000,
          width: "56px",
          height: "56px",
          borderRadius: "50%",
          background: `linear-gradient(135deg, ${c.primary}, #8b5cf6)`,
          border: "none",
          outline: "none",
          color: "#fff",
          fontSize: "24px",
          cursor: "pointer",
          boxShadow: `0 4px 20px ${isDark ? "rgba(129,140,248,0.4)" : "rgba(99,102,241,0.4)"}`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          transition: "transform 0.2s ease, background 0.3s ease",
        }}
        onMouseEnter={e => e.currentTarget.style.transform = "scale(1.1)"}
        onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}
      >
        💬
      </button>
    </>
  );
}