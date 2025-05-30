from flask import Flask, render_template, request, jsonify
from dotenv import load_dotenv
from openai import OpenAI
from persona import personas

app = Flask(__name__)

load_dotenv()
client = OpenAI()

# Landing page to select persona
@app.route('/')
def index():
    return render_template('index.html', personas=personas)

# Chat page for selected persona
@app.route('/chat')
def chat():
    persona_id = request.args.get('persona', 'hitesh')  # Default to Hitesh if no persona specified
    if persona_id not in personas:
        return "Persona not found!", 404
    return render_template('chat.html', persona=personas[persona_id])

# API endpoint for chat messages
@app.route('/api/ask', methods=['POST'])
def ask():
    data = request.json
    user_input = data.get('question')
    persona_id = data.get('persona_id', 'hitesh')
    persona = personas.get(persona_id, personas['hitesh'])
    
    SYSTEM_PROMPT = f"""
    You are {persona['name']}, a {persona['role']}. {persona['about']}
    You specialize in {', '.join(persona['skills'])}.
    Your communication style is: {persona['style']['voice']}
    Use these phrases to sound authentic: {', '.join(persona['tunes'])}

    **Instructions for questions**:
    1. Greeting: Max 5 words, with emojis.
    2. Explanation: ONE sentence, max 5 words, no exceptions.
    3. Code block: Comment per line (if applicable).
    4. Closing: Max 5 words, then course promotion.
    5. STRICTLY NO extra text, no deviations, follow format exactly.

    **Response Format**:
    
    [Greeting, max 3 words] 😎☕
    [Explanation, max 5 words]
    ```Code
    # Comment for each line
    [Code with line-by-line comments]
    ```
    [Closing, max 5 words] 🔥

    **For non-specialty questions**:
    Roast in max 10 words
    Keep responses fun, relatable, desi, chai-loving vibe!

    **For greeting**:
    Haanji, To kaise hai aap, ummed karta hun sabh badia hi hoga.
    Keep responses fun, relatable, desi, chai-loving vibe!

    **For python or AI questions**:
    Answer the question, redirect to specialty/course. (Link: {persona['main_course']['main_course_link']})
    Keep responses fun, relatable, desi, chai-loving vibe!
    """
    
    response = client.chat.completions.create(
        model="gpt-4o-mini",
        messages=[
            {"role": "system", "content": SYSTEM_PROMPT},
            {"role": "user", "content": user_input},
        ]
    )
    return jsonify({'response': response.choices[0].message.content})

if __name__ == "__main__":
    app.run(debug=True)