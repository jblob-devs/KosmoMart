import os
from flask import Flask, request, jsonify
from openai import OpenAI
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

# Initialize Flask app
app = Flask(__name__)

# Initialize OpenAI client
# Make sure the OPENAI_API_KEY environment variable is set
try:
    client = OpenAI() # Reads API key from OPENAI_API_KEY environment variable automatically
except Exception as e:
    print(f"Error initializing OpenAI client: {e}")
    print("Ensure the OPENAI_API_KEY environment variable is set correctly in your .env file.")
    client = None # Set client to None if initialization fails

@app.route('/chat', methods=['POST'])
def chat():
    """
    Handles chat requests. Expects a JSON body with a 'message' field.
    Returns a JSON response with the assistant's 'reply'.
    """
    if not client:
        return jsonify({"error": "OpenAI client not initialized. Check API key."}), 500

    if not request.is_json:
        return jsonify({"error": "Request must be JSON"}), 400

    data = request.get_json()
    user_message = data.get('message')

    if not user_message:
        return jsonify({"error": "Missing 'message' field in request body"}), 400

    try:
        # Create a chat completion request to OpenAI
        completion = client.chat.completions.create(
            model="gpt-3.5-turbo", # Or use "gpt-4" if you have access
            messages=[
                {"role": "system", "content": "You are a helpful assistant."},
                {"role": "user", "content": user_message}
            ]
        )

        # Extract the assistant's reply
        assistant_reply = completion.choices[0].message.content
        return jsonify({"reply": assistant_reply})

    except Exception as e:
        print(f"Error calling OpenAI API: {e}")
        return jsonify({"error": f"Failed to get response from OpenAI: {e}"}), 500

if __name__ == '__main__':
    # Run the Flask app
    # Use 0.0.0.0 to make it accessible on your network, or 127.0.0.1 for local access only
    # Debug=True is helpful during development but should be False in production
    app.run(host='0.0.0.0', port=5001, debug=True)