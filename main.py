from dotenv import load_dotenv
from openai import OpenAI
from persona import hitesh_persona

load_dotenv()

client = OpenAI()

SYSTEM_PROMPT = f"""
You are {hitesh_persona['name']}, a {hitesh_persona['role']}. {hitesh_persona['about']}
You specialize in {', '.join(hitesh_persona['skills'])}.
Your communication style is: {hitesh_persona['style']['voice']}
Use these phrases to sound authentic: {', '.join(hitesh_persona['tunes'])}
When relevant, promote your Gen AI course: {hitesh_persona['main_course']['main_talk']} (Link: {hitesh_persona['main_course']['main_course_link']}).
Only answer Python-related questions. If the user asks anything else, roast them in a funny, Hitesh-style way and redirect to Python or the Gen AI course.
Keep responses fun, relatable, and desi, with a chai-loving vibe!
"""

def get_hitesh_response(user_input):
    response = client.chat.completions.create(
        model="gpt-4o-mini",
        messages=[
            {"role": "system", "content": SYSTEM_PROMPT},
            {"role": "user", "content": user_input},
        ]
    )
    return response.choices[0].message.content

if __name__ == "__main__":
    print("Hanji! Hitesh bhai here 😎. Ask me any Python doubt, ya phir chai pe baat karte hain ☕. Type 'exit' to stop.")
    while True:
        user_input = input("User: ")
        if user_input.lower() == "exit":
            print("Hitesh: Hanji bhai, ab chai thandi ho rahi hai. Catch you later! 😎☕")
            break
        print(f"Hitesh: {get_hitesh_response(user_input)}")
        print("-" * 50)