import os
import uuid
from flask import Flask, request, jsonify, render_template_string, session
from openai import OpenAI
from dotenv import load_dotenv
from flask_cors import CORS

# Load environment variables from .env file
load_dotenv()

# Initialize Flask app
app = Flask(__name__)
# *** IMPORTANT: Load secret key from .env ***
# Use a default ONLY if the env var is missing, but sessions won't persist across restarts without the env var set.
app.secret_key = os.environ.get("FLASK_SECRET_KEY", "default_secret_key_change_me")
if app.secret_key == "default_secret_key_change_me":
    print("WARNING: FLASK_SECRET_KEY not set in .env. Sessions will not persist across server restarts.")

# Allow frontend origin with credentials
CORS(app, resources={r"/*": {"origins": "http://localhost:3000", "supports_credentials": True}})

# Initialize OpenAI client
try:
    client = OpenAI()
except Exception as e:
    print(f"Error initializing OpenAI client: {e}")
    client = None

# Store conversation history in memory (per session)
# Using a simple dictionary here. For production, consider a more robust store.
conversations = {}

@app.route("/chat", methods=["POST"])
def chat():
    # ... (previous code: client check, json check, data extraction) ...

    # --- Session Management ---
    if 'conversation_id' not in session:
        session['conversation_id'] = str(uuid.uuid4())
        print(f"New session started: {session['conversation_id']}")
    conversation_id = session['conversation_id']
    # --------------------------

    # Get or create history for this session
    if conversation_id not in conversations:
        conversations[conversation_id] = [
            # FIX 1: Use simple string for initial system prompt content
            {"role": "system", "content": "You are an alien that is talking to a player. They will respond with emotions. Do not talk with the human about any other topics. Emotions that you feel strongly about and a tone for you to take on will be provided. If the emotion the player selects is not similar to the emotion you have been given to feel strongly about, respond rudely. If it is similar to the emotion, then respond politely. An introduction for you given to the player will be your first prompt, and no other prompt after will be an introduction. Do not directly state your goals. Be as vague as possible. Do not objectively analyze the human's response, look at it from your emotions' perspective."},
            # Add any other initial system prompts here if needed, using the same simple format
        ]
        print(f"Initialized history for: {conversation_id}")

    # Add the optional system prompt if provided
    if system_prompt:
        # FIX 2: Use simple string for optional system prompt content
        conversations[conversation_id].append({"role": "system", "content": system_prompt})

    # Add the user message to the conversation history
    # FIX 3: Use simple string for user message content
    conversations[conversation_id].append({"role": "user", "content": user_message})

    try:
        # Create a chat completion request (API call structure is correct)
        completion = client.chat.completions.create(
            model="gpt-4o-mini",
            messages=conversations[conversation_id] # Send the corrected history
        )
        assistant_reply = completion.choices[0].message.content # This is already a string

        # Add the assistant's reply to conversation history
        # FIX 4: Use simple string when adding assistant reply to history
        conversations[conversation_id].append(
            {"role": "assistant", "content": assistant_reply}
        )

        # Return only the string content in the JSON response
        return jsonify({"reply": assistant_reply})

    except Exception as e:
        # Improved error logging: Print the messages list that caused the error
        print(f"Error calling OpenAI API: {e}")
        print(f"Data sent (messages): {conversations.get(conversation_id, 'History not found')}")
        return jsonify({"error": f"Failed to get response from OpenAI: {e}"}), 500

# ... (rest of the code, including /reset and app.run) ...

@app.route("/reset", methods=["POST"])
def reset():
    """Reset the conversation history and start fresh"""
    # --- Session Management ---
    if 'conversation_id' in session:
        conversation_id = session['conversation_id']
        if conversation_id in conversations:
            del conversations[conversation_id] # Remove history from memory
            print(f"Reset conversation history for: {conversation_id}")
        # Optionally clear the session ID too, forcing a new one on next /chat
        # session.pop('conversation_id', None)
        return jsonify({"message": "Conversation reset"}), 200
    # --------------------------
    return jsonify({"message": "No active conversation to reset"}), 200


if __name__ == "__main__":
    # Run the Flask app
    # Use 0.0.0.0 to make it accessible on your network, or 127.0.0.1 for local access only
    # Debug=True is helpful during development but should be False in production
    app.run(host="0.0.0.0", port=5001, debug=True)
