import asyncio
import os
import edge_tts

os.makedirs('public/assets/audio', exist_ok=True)

chapters = [
    {
        'file': 'public/assets/audio/tour_chapter_1.mp3',
        'text': "Welcome to my portfolio. I am Salman Khan, an AI Engineer and Product Builder completing my B.Tech in Artificial Intelligence and Data Science with an 8.72 CGPA."
    },
    {
        'file': 'public/assets/audio/tour_chapter_2.mp3',
        'text': "I have architected over 30 autonomous multi-agent pipelines on n8n, orchestrating specialized GPT-4o sub-agents for real-time compliance and predictive intelligence."
    },
    {
        'file': 'public/assets/audio/tour_chapter_3.mp3',
        'text': "With 15 deployed full-stack applications across fintech, logistics, and AI career tools, I engineer systems designed for sub-second latency and measurable business impact."
    },
    {
        'file': 'public/assets/audio/tour_chapter_4.mp3',
        'text': "I am actively seeking industry opportunities to contribute applied AI and full-stack engineering to high-performing teams. Let's connect and build what's next."
    }
]

async def generate_all():
    # Use ultra-realistic studio narrator voice
    voice = 'en-US-ChristopherNeural'
    for idx, chap in enumerate(chapters):
        print(f"Generating HD Neural TTS for chapter {idx+1}...")
        communicate = edge_tts.Communicate(chap['text'], voice, rate="+2%", pitch="+0Hz")
        await communicate.save(chap['file'])
        print(f"Successfully saved {chap['file']} ({os.path.getsize(chap['file'])} bytes)")

if __name__ == '__main__':
    asyncio.run(generate_all())
