@app.route("/", methods=["GET"])
def index():
    """
    Serves the web interface for testing the chat functionality
    """
    # Generate a new session ID if one doesn't exist
    if "conversation_id" not in session:
        session["conversation_id"] = str(uuid.uuid4())
        conversations[session["conversation_id"]] = []

    html_template = (
        """
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>KosmoMart Chat Interface</title>
        <style>
            body {
                font-family: Arial, sans-serif;
                max-width: 800px;
                margin: 0 auto;
                padding: 20px;
                background-color: #f5f5f5;
            }
            .chat-container {
                background-color: white;
                border-radius: 10px;
                padding: 20px;
                box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
            }
            .chat-box {
                height: 400px;
                overflow-y: auto;
                border: 1px solid #ddd;
                padding: 10px;
                margin-bottom: 10px;
                border-radius: 5px;
            }
            .message {
                margin-bottom: 10px;
                padding: 10px;
                border-radius: 5px;
            }
            .user {
                background-color: #e3f2fd;
                text-align: right;
                margin-left: 20%;
            }
            .assistant {
                background-color: #f1f1f1;
                text-align: left;
                margin-right: 20%;
            }
            .input-area {
                display: flex;
                gap: 10px;
            }
            #user-input {
                flex-grow: 1;
                padding: 10px;
                border: 1px solid #ddd;
                border-radius: 5px;
            }
            button {
                padding: 10px 15px;
                background-color: #4CAF50;
                color: white;
                border: none;
                border-radius: 5px;
                cursor: pointer;
            }
            button:hover {
                background-color: #45a049;
            }
            h1 {
                color: #333;
            }
        </style>
    </head>
    <body>
        <h1>KosmoMart Chat Interface</h1>
        <div class="chat-container">
            <div class="chat-box" id="chat-box"></div>
            <div class="input-area">
                <input type="text" id="user-input" placeholder="Type your message here...">
                <button onclick="sendMessage()">Send</button>
            </div>
            <div style="margin-top: 10px;">
                <button onclick="resetConversation()" style="background-color: #f44336;">Reset Conversation</button>
            </div>
        </div>
        
        <script>
            const chatBox = document.getElementById('chat-box');
            const userInput = document.getElementById('user-input');
            let conversationId = '"""
        + session["conversation_id"]
        + """';
            
            // Send initial message to get started
            window.onload = function() {
                addMessage("A regal looking person steps out of the ship, and looks contempt at others nearby, and signals to the others in its ship to clear out the area near the ship.", "user");
                fetchReply("A regal looking person steps out of the ship, and looks contempt at others nearby, and signals to the others in its ship to clear out the area near the ship.");
            };
            
            function addMessage(message, sender) {
                const messageDiv = document.createElement('div');
                messageDiv.className = `message ${sender}`;
                messageDiv.textContent = message;
                chatBox.appendChild(messageDiv);
                chatBox.scrollTop = chatBox.scrollHeight;
            }
            
            function sendMessage() {
                const message = userInput.value.trim();
                if (!message) return;
                
                addMessage(message, 'user');
                userInput.value = '';
                
                fetchReply(message);
            }
            
            function fetchReply(message) {
                fetch('/chat', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ 
                        message: message,
                        conversation_id: conversationId 
                    }),
                })
                .then(response => response.json())
                .then(data => {
                    if (data.reply) {
                        addMessage(data.reply, 'assistant');
                    } else if (data.error) {
                        addMessage(`Error: ${data.error}`, 'assistant');
                    }
                })
                .catch(error => {
                    console.error('Error:', error);
                    addMessage('Failed to get response from server.', 'assistant');
                });
            }
            
            function resetConversation() {
                fetch('/reset', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    }
                })
                .then(response => response.json())
                .then(data => {
                    conversationId = data.conversation_id;
                    chatBox.innerHTML = '';
                    addMessage("A regal looking person steps out of the ship, and looks contempt at others nearby, and signals to the others in its ship to clear out the area near the ship.", "user");
                    fetchReply("A regal looking person steps out of the ship, and looks contempt at others nearby, and signals to the others in its ship to clear out the area near the ship.");
                });
            }
            
            // Submit on Enter key
            userInput.addEventListener('keypress', function(e) {
                if (e.key === 'Enter') {
                    sendMessage();
                }
            });
        </script>
    </body>
    </html>
    """
    )
    return render_template_string(html_template)
