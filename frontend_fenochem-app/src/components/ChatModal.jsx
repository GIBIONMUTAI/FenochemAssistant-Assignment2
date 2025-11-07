import React, { useState, useRef, useEffect } from "react";
import { Modal, Form, InputGroup, Button, Spinner } from "react-bootstrap";
import axios from "axios";
import { IoSend, IoWarningOutline } from "react-icons/io5";
import { BsPersonCircle } from "react-icons/bs";
import { MdOutlineSupportAgent } from "react-icons/md";

const BOT_NAME = "Fenochem Assistant";
const API_ENDPOINT = "http://localhost:4000/api/chat";

const ChatModal = ({ show, handleClose }) => {
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([
    {
      sender: BOT_NAME,
      text: "Hello 👋, welcome to Fenochem! How may I assist you today?",
      isBot: true,
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const chatBodyRef = useRef(null);

  // Auto-scroll to latest message
  useEffect(() => {
    if (chatBodyRef.current) {
      chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight;
    }
  }, [chat]);

  const handleSend = async (e) => {
    e.preventDefault();
    const trimmed = message.trim();
    if (!trimmed || isLoading) return;

    const userMsg = { sender: "You", text: trimmed, isBot: false };
    setChat((prev) => [...prev, userMsg]);
    setMessage("");
    setIsLoading(true);

    try {
      const res = await axios.post(API_ENDPOINT, {
        message: trimmed,
        session_id: "default",
      });

      // ✅ handle both Gemini and offline Jac replies
      const botReply =
        res.data.reply ||
        res.data.response ||
        "I'm here to help! 😊 (Offline Jac mode)";

      const botMsg = { sender: BOT_NAME, text: botReply, isBot: true };
      setChat((prev) => [...prev, botMsg]);
    } catch (err) {
      console.error("Chat API error:", err);

      // fallback message when backend is offline
      const fallbackMsg = {
        sender: BOT_NAME,
        text: (
          <>
            <IoWarningOutline className="me-1 text-danger" />
            I'm currently offline — but you can still describe your issue and
            I’ll store it for later. 💾
          </>
        ),
        isBot: true,
      };
      setChat((prev) => [...prev, fallbackMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const renderMessage = (msg, i) => {
    const isUser = !msg.isBot;
    const align = isUser ? "justify-content-end" : "justify-content-start";
    const bubbleClass = isUser
      ? "bg-success text-white"
      : "bg-light text-dark border";

    return (
      <div key={i} className={`d-flex ${align} mb-2`}>
        {!isUser && (
          <MdOutlineSupportAgent
            size={24}
            className="me-2 mt-1 text-success"
            style={{ flexShrink: 0 }}
          />
        )}

        <div className="p-2 rounded shadow-sm" style={{ maxWidth: "80%" }}>
          <div className={`fw-bold mb-1 ${isUser ? "text-end" : "text-start"}`}>
            {isUser ? "You" : msg.sender}
          </div>

          <div
            className={bubbleClass}
            style={{
              borderRadius: isUser ? "10px 10px 0 10px" : "10px 10px 10px 0",
              padding: "8px 12px",
              whiteSpace: "pre-wrap",
            }}
          >
            {msg.text}
          </div>
        </div>

        {isUser && (
          <BsPersonCircle
            size={24}
            className="ms-2 mt-1 text-secondary"
            style={{ flexShrink: 0 }}
          />
        )}
      </div>
    );
  };

  return (
    <Modal show={show} onHide={handleClose} centered scrollable>
      <Modal.Header closeButton className="py-2 border-bottom">
        <MdOutlineSupportAgent size={24} className="me-2 text-success" />
        <Modal.Title className="h5 mb-0 fw-bold">{BOT_NAME}</Modal.Title>
      </Modal.Header>

      <Modal.Body
        ref={chatBodyRef}
        style={{ minHeight: "250px", maxHeight: "400px", padding: "15px" }}
        className="d-flex flex-column"
      >
        {chat.map(renderMessage)}
      </Modal.Body>

      <Modal.Footer className="p-2 border-top">
        <Form onSubmit={handleSend} className="w-100">
          <InputGroup>
            <Form.Control
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type your message..."
              disabled={isLoading}
            />
            <Button
              type="submit"
              variant="success"
              disabled={!message.trim() || isLoading}
            >
              {isLoading ? (
                <Spinner
                  as="span"
                  animation="border"
                  size="sm"
                  role="status"
                  aria-hidden="true"
                />
              ) : (
                <IoSend size={20} />
              )}
            </Button>
          </InputGroup>
        </Form>
      </Modal.Footer>
    </Modal>
  );
};

export default ChatModal;
