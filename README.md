# AI Chatbot with Hitesh & Piyush Sir 🤖💬

Welcome to the **AI Chatbot** project—a fun web app where you can chat with virtual versions of your favourite tech gurus, Hitesh Choudhary and Piyush Garg! Built with Python, Flask, and OpenAI's API, this chatbot lets you ask tech questions (or anything, really) and get responses in their signature style—complete with humour and a coding tip at the end. 🎉

This project is deployed on [Render](https://persona-bot-ui.onrender.com) (replace with your actual Render URL after deployment). Let's dive into what this project is all about and how you can run it locally!

## 🚀 Features
- **Chat with Personas**: Choose between Hitesh Sir or Piyush Sir and chat with them via a sleek web interface.
- **AI-Powered Responses**: Powered by OpenAI's GPT-4o model for smart, conversational replies.
- **Rate Limiting**: Users can send only 5 messages every 5 minutes (bhai, thoda control rakho! 😅).
- **Fun & Engaging**: Responses include humour and a coding/tech tip, just like Hitesh and Piyush's teaching style.
- **Responsive Design**: Glassmorphism UI with particle effects for a modern look.

## 🖥️ Tech Stack
- **Backend**: Python, Flask
- **Frontend**: HTML, CSS, JavaScript
- **AI**: OpenAI API (GPT-4o)
- **Dependencies**: `flask`, `openai`, `python-dotenv`
- **Deployment**: Render

## 📂 Project Structure
```
ai_chatbot/
├── app.py              # Main Flask app
├── persona.py          # Persona definitions (Hitesh & Piyush)
├── requirements.txt    # Python dependencies
├── templates/          # HTML templates
│   ├── index.html
│   ├── chat.html
├── static/             # Static files (CSS, JS, images)
│   ├── style.css
│   ├── script.js
│   ├── chat.js
│   ├── double-ticks.png
└── README.md           # You're reading this!
```

## 🎯 How It Works
1. Visit the landing page (`/`) and click "Start".
2. On the cards page (`/cards`), choose between Hitesh Sir or Piyush Sir.
3. Chat with your selected persona on the chat page (`/chat?persona=hitesh` or `/chat?persona=piyush`).
4. Ask questions, and the AI will respond in the persona's style with a fun coding tip at the end.
5. Rate limiting ensures you can send only 5 messages every 5 minutes (client-side via `sessionStorage`).

## 🛠️ Setup and Running Locally

### Prerequisites
- Python 3.8 or above
- Git
- An OpenAI API key (sign up at [OpenAI](https://platform.openai.com/), add $5 credit, and generate an API key)

### Steps to Run Locally
1. **Clone the Repository**:
   ```bash
   git clone https://github.com/your-username/ai_chatbot.git
   cd ai_chatbot
   ```

2. **Set Up a Virtual Environment**:
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

3. **Install Dependencies**:
   ```bash
   pip install -r requirements.txt
   ```

4. **Set Up Environment Variables**:
   - Create a `.env` file in the project root:
     ```bash
     echo "OPENAI_API_KEY=sk-your-openai-api-key-here" > .env
     ```
   - Replace `sk-your-openai-api-key-here` with your actual OpenAI API key. **Never commit this file to Git!** It's already in `.gitignore`.

5. **Run the App**:
   ```bash
   python app.py
   ```
   - The app will start on `http://localhost:5000`.

6. **Access the App**:
   - Open your browser and go to `http://localhost:5000/`.
   - Navigate to `/cards`, select a persona, and start chatting!

### Example Interaction
- Go to `http://localhost:5000/chat?persona=hitesh`.
- Send a message: "How do I debug a Python loop?"
- Response (example):
  ```
  Hanji bhai! Debugging a Python loop is like finding your lost socks—tricky but doable! First, add print statements inside the loop to see what’s happening, like print(i) for each iteration. If that doesn’t help, use a debugger like pdb—set a breakpoint with import pdb; pdb.set_trace() and step through the loop. Oh, and if your loop is infinite, Ctrl+C is your best friend! 😅 Fun tip: Did you know Python’s enumerate() can give you both the index and value in a loop? Try for i, val in enumerate(my_list)—saves you a headache!
  ```

## 🌐 Deploying on Render
This project is already deployed on Render! Here’s how you can deploy your own instance:

1. **Push to GitHub**:
   - Ensure your repository is on GitHub (without the `.env` file).

2. **Create a Render Account**:
   - Sign up at [Render](https://render.com/).

3. **Deploy the App**:
   - Create a new "Web Service" on Render.
   - Connect your GitHub repository.
   - Set the following:
     - **Runtime**: Python 3
     - **Build Command**: `pip install -r requirements.txt`
     - **Start Command**: `python app.py`
   - Add an environment variable in Render’s dashboard:
     - Key: `OPENAI_API_KEY`
     - Value: Your OpenAI API key
   - Deploy! You’ll get a URL like `https://your-project-name.onrender.com`.

## 📝 Notes
- **Rate Limiting**: Implemented client-side using `sessionStorage` in `chat.js`. Users are limited to 5 messages every 5 minutes.
- **Personas**: Defined in `persona.py`. Hitesh Sir and Piyush Sir are virtual personas inspired by popular Indian tech educators, delivering responses with humour and tech tips.
- **Security**: Never expose your OpenAI API key. Use environment variables (`OPENAI_API_KEY`) and keep `.env` out of version control.

## 📰 Read My Article Here
- **Hashnode**: [Link](https://gen-ai-with-python.hashnode.dev/building-a-persona-ai-chatbot-with-python-a-fun-guide-to-chatting-with-hitesh-and-piyush-sir)

## 📸 Product Screenshots
![ss1](https://github.com/user-attachments/assets/6cd06cc9-5bb7-4c0f-bb9e-0c78ff3a2cba)
![ss2](https://github.com/user-attachments/assets/2bc27f1c-0953-4e8b-9cab-d2b9ee769e8a)
![ss3](https://github.com/user-attachments/assets/bbb1a033-4b86-48bb-94b7-052bc23b1277)

## 🤝 Contributing
Found a bug or want to add a new persona? Feel free to open a pull request! Let’s make this project even more awesome together. 😄

## 📧 Contact
Have questions? Reach out to me on [LinkedIn](https://www.linkedin.com/in/siddharthsonii/). Let’s sip chai and code together! ☕

## 🙏 Acknowledgements
- Inspired by Hitesh Choudhary and Piyush Garg’s amazing teaching style.
- Thanks to OpenAI for their awesome API.
- Built with ❤️ for the Indian coding community!

---

Happy coding, bhai log! Keep learning, keep building, and don’t forget to take chai breaks! ☕
