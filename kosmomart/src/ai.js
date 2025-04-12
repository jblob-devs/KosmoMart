// AI chat functionality module

// Store conversation state
let conversationId = null;

const API_URL = "http://127.0.0.1:5001"; // Or your backend URL

/**
 * Fetches a reply from the AI backend
 * @param {string} message - The message to send
 * @param {string} [systemPrompt] - An optional system prompt to send
 * @returns {Promise<string>} The AI's response
 */
export async function fetchReply(message, systemPrompt = null) {
  try {
    // Check if backend is available with a short timeout
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000);

    const requestBody = {
        message: message,
        conversation_id: conversationId
    };

    // Add system_prompt to the body if it's provided
    if (systemPrompt) {
        requestBody.system_prompt = systemPrompt;
    }

    const response = await fetch(`${API_URL}/chat`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
      signal: controller.signal,
      // Add credentials to handle cookies if needed
      credentials: 'include'
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ detail: 'Failed to parse error response' }));
      throw new Error(errorData.detail || `HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    if (data.error) {
      throw new Error(data.error);
    }

    return data.reply;
  } catch (error) {
    console.error("Error in fetchReply:", error);

    // Provide fallback behavior when API is unavailable
    if (error.name === 'AbortError' || error.message.includes('NetworkError')) {
      console.warn("Backend server unavailable, using fallback responses");
      return getFallbackResponse(message);
    }
    throw new Error("Backend server unavailable, using fallback responses");
  }
}

/**
 * Resets the conversation with the AI
 * @returns {Promise<string>} The new conversation ID
 */
export async function resetConversation() {
  try {
    const response = await fetch(`${API_URL}/reset`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include'
    });
    console.log("Conversation reset requested.");

    if (!response.ok) {
      throw new Error(`Server responded with ${response.status}`);
    }

    const data = await response.json();
    conversationId = data.conversation_id;
    return conversationId;
  } catch (error) {
    console.error("Error resetting conversation:", error);
  }
}

/**
 * Provides fallback responses when the backend is unavailable
 * @param {string} message - The user's message
 * @returns {string} A fallback response
 */
function getFallbackResponse(message) {
  // Simple emotion detection for fallback mode
  const emotions = {
    "Happy": ["The alien seems pleased with your happiness.", "The alien smiles back at you."],
    "Angry": ["The alien takes a step back, cautious of your anger.", "The alien mirrors your frustration."],
    "Surprised": ["The alien tilts its head, intrigued by your surprise.", "The alien mimics your surprised expression."],
    "Confused": ["The alien points to various objects, trying to help.", "The alien shows a diagram on a small device."],
    "Excited": ["The alien bounces slightly, matching your excitement.", "The alien makes a cheerful sound."]
  };

  // Check if message contains any emotion keywords
  for (const [emotion, responses] of Object.entries(emotions)) {
    if (message.includes(emotion)) {
      return responses[Math.floor(Math.random() * responses.length)];
    }
  }

  const fallbacks = [
    "The alien gestures in a way you don't understand.",
    "The alien makes a series of clicking sounds.",
    "The alien waits for you to continue.",
    "The alien observes you carefully.",
    "The alien adjusts something on its suit."
  ];

  return fallbacks[Math.floor(Math.random() * fallbacks.length)];
}