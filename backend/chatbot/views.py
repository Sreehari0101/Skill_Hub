import os
import json
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from dotenv import load_dotenv
from openai import OpenAI

load_dotenv()

client = OpenAI(
  api_key= os.getenv("OPENAI_API_KEY"),
 )

@csrf_exempt
def chatbot_view(request):
    if request.method == "POST":
        try:
            data = json.loads(request.body.decode("utf-8"))
            user_input = data.get("userInput", "")

            chatbot_reply = chat_gpt(user_input)

            return JsonResponse({"chatbotReply": chatbot_reply})

        except Exception as e:
            return JsonResponse({"error": str(e)}, status=500)

    return JsonResponse({"error": "Invalid method"}, status=400)

def chat_gpt(prompt):
    try:
        response = client.chat.completions.create(
            model="gpt-3.5-turbo",
            messages=[
                {"role": "system", "content": "You are a chatbot."},
                {"role": "user", "content": prompt}
            ],
            max_tokens = 100
        )

        message_content = response.choices[0].message.content
        return message_content

    except Exception as e:
        return str(e)