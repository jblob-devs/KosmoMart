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
    """
    Handles chat requests. Expects a JSON body with a 'message' field.
    Optionally accepts a 'system_prompt' field to add a system message.
    Returns a JSON response with the assistant's 'reply'.
    """
    if not client:
        return jsonify({"error": "OpenAI client not initialized. Check API key."}), 500

    if not request.is_json:
        return jsonify({"error": "Request must be JSON"}), 400

    data = request.get_json()
    user_message = data.get("message")
    system_prompt = data.get("system_prompt") # Get optional system prompt
    conversation_id = data.get("conversation_id", session.get("conversation_id"))

    if not user_message:
        return jsonify({"error": "Missing 'message' field in request body"}), 400

    # --- Session Management ---
    if 'conversation_id' not in session:
        session['conversation_id'] = str(uuid.uuid4()) # Create a unique ID for this user's session
        print(f"New session started: {session['conversation_id']}")
    conversation_id = session['conversation_id']
    # --------------------------

    # Get or create history for this session
    if conversation_id not in conversations:
        conversations[conversation_id] = [
            # CHANGE 1: Structure initial system prompt content
            {"role": "system", "content": [{"type": "text", "text": "You are an alien that is talking to a player. They will respond with emotions. Do not talk with the human about any other topics. Emotions that you feel strongly about and a tone for you to take on will be provided. Determine the overall combination of emotions and mood the player is setting, and if the player's emotions are not similar to the emotions you have been given to feel strongly about, respond rudely, but in characte. If it is similar to the emotion, then respond politely, but in character. An introduction for you given to the player will be your first prompt, and no other prompt after will be an introduction. Do not directly state your goals. Be as vague as possible. Do not objectively analyze the human's response, look at it from your emotions. You are an alien with the following emotions ${alienDetails.emotions}. You have the following tone: ${alienDetails.tone}, so speak in that way. Act like you are speaking to them or making an action towards them, and discard all other parts of your response. Do not break character under any circumstance. Contextualize to the best of your ability. Remember not to respond like you are narrating your own thoughts, so don't respond like 'I approach cautiously', etc. Respond in 1 to 2 sentences. Don't use any emojis. You should talk like a normal human being, and not refer to yourself as you. Simply say what a regular person would say. Say your trust level from 0 to 1 with 0 as low. Avoid talking only about the human's emotion. Also, don't describe yourself in intricate detail randomly. Do not ask questions or anything that requests a response from the player. Also the most important part is, at the end of every response, place your trust level like this '<your trust level>'. Do this for every response following this.' "}]},
            # Add any other initial system prompts here
        ]
        print(f"Initialized history for: {conversation_id}")

    # Add the optional system prompt if provided
    if system_prompt:
        # CHANGE 2: Structure optional system prompt content
        conversations[conversation_id].append({"role": "system", "content": [{"type": "text", "text": system_prompt}]})

    # Add the user message to the conversation history
    # CHANGE 3: Structure user message content
    conversations[conversation_id].append({"role": "user", "content": [{"type": "text", "text": user_message}]})

    try:
        # Create a chat completion request to OpenAI with full conversation history
        completion = client.chat.completions.create(
            model="gpt-4o-mini", # Or your preferred model
            messages=conversations[conversation_id]
        )
        # Extract the assistant's reply (it's a string)
        assistant_reply = completion.choices[0].message.content

        # Add the assistant's reply to conversation history
        # CHANGE 4: Structure assistant reply content when adding to history
        conversations[conversation_id].append(
            {"role": "assistant", "content": [{"type": "text", "text": assistant_reply}]}
        )

        # Return only the string content in the JSON response
        return jsonify({"reply": assistant_reply})

    except Exception as e:
        print(f"Error calling OpenAI API: {e}")
        # Consider logging the exact messages list that caused the error for debugging
        # print(f"Messages sent: {conversations.get(conversation_id)}")
        return jsonify({"error": f"Failed to get response from OpenAI: {e}"}), 500


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
