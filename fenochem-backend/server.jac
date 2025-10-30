walker fenochem_chat {

    # Store recent context
    has context: str = ""

    can respond_to(message:str) -> str {

        message_lower = message.lower()
        self.context += message_lower + ";"

        # Greetings
        if message_lower.contains("hello") or message_lower.contains("hi") {
            return "Hello! 👋 Welcome back to Fenochem! How can I help you today?"
        }

        # Help / issues
        if message_lower.contains("help") or message_lower.contains("issue") {
            return "Sure! Please describe your problem, and I’ll guide you step by step."
        }

        # Price inquiries
        if message_lower.contains("price") or message_lower.contains("cost") {
            return "Our product prices are listed on the website. Do you want me to provide a direct link?"
        }

        # Contact support
        if message_lower.contains("contact") or message_lower.contains("support") {
            return "You can contact us at support@fenochem.com or call +123456789. Would you like me to connect you to a live agent?"
        }

        # Thanks
        if message_lower.contains("thank") {
            return "You're welcome! 😊 Anything else I can help you with?"
        }

        # Contextual suggestion
        if self.context.contains("price") and message_lower.contains("link") {
            return "Here’s the direct link to our product prices: https://fenochem.com/prices"
        }

        # Default fallback
        return "I’m here to help! 😊 Can you give me a bit more detail so I can assist you better?"
    }
}
