from flask import Flask, render_template, request, jsonify, session
import openai
import os
from dotenv import load_dotenv

load_dotenv()  # Load environment variables from .env

app = Flask(__name__)
app.secret_key = '14'  # Change this to a secure random value

API_KEY = os.getenv('API_KEY')  # Get API key from environment
print("API_KEY loaded:", API_KEY)
@app.route('/')
def home():
    return render_template('index.html')

@app.route('/chat', methods=['POST'])
def chat():
    user_message = request.json.get('message')
    if 'history' not in session:
        session['history'] = []
    session['history'].append({'role': 'user', 'content': user_message})

    messages = session['history']

    # Custom answers for specific questions
    user_message_lower = user_message.lower()
    if "corona" in user_message_lower or "covid" in user_message_lower:
        bot_message = "Coronavirus symptoms include fever, cough, tiredness, loss of taste or smell, and difficulty breathing."
    elif "fever" in user_message_lower and ("symptom" in user_message_lower or "sign" in user_message_lower):
        bot_message = "Common symptoms of fever are high temperature, chills, sweating, headache, and muscle aches."
    elif "python" in user_message_lower:
        bot_message = "Python is a popular, easy-to-learn programming language used for web development, data science, AI, and more."
    elif "c language" in user_message_lower or ("c" in user_message_lower and "language" in user_message_lower):
        bot_message = "C is a powerful programming language used for system/software development and embedded programming."
    elif "html" in user_message_lower:
        bot_message = "HTML is the standard markup language for creating web pages."
    elif "css" in user_message_lower:
        bot_message = "CSS is a stylesheet language used to describe the look and formatting of a website written in HTML."
    else:
        try:
            client = openai.OpenAI(
                api_key=API_KEY,
                base_url="https://api.groq.com/openai/v1"
            )
            response = client.chat.completions.create(
                model="llama3-8b-8192",  # Or your preferred model
                messages=messages
            )
            bot_message = response.choices[0].message.content
        except Exception as e:
            print("API error:", e)
            bot_message = "Sorry, I couldn't process your request right now."
    session['history'].append({'role': 'assistant', 'content': bot_message})
    session.modified = True
    return jsonify({'response': bot_message, 'history': session['history']})

@app.route('/history', methods=['GET'])
def history():
    return jsonify(session.get('history', []))

@app.route('/clear_history', methods=['POST'])
def clear_history():
    session['history'] = []
    session.modified = True
    return jsonify({'success': True})

@app.route('/delete_chat', methods=['POST'])
def delete_chat():
    session.pop('history', None)
    session.modified = True
    return jsonify({'success': True})

if __name__ == '__main__':
    app.run(debug=True)