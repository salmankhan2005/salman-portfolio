import asyncio
import os
import edge_tts

os.makedirs('public/assets/audio', exist_ok=True)

chapters_text = [
    {
        'id': 1,
        'title': 'Introduction & Mission',
        'text': "Welcome to my portfolio. I am Salman Khan, an AI Engineer and Product Builder completing my B.Tech in Artificial Intelligence and Data Science with an 8.72 CGPA."
    },
    {
        'id': 2,
        'title': 'Autonomous Multi-Agents & Architecture',
        'text': "I have architected over 30 autonomous multi-agent pipelines on n8n, orchestrating specialized GPT-4o sub-agents for real-time compliance and predictive intelligence."
    },
    {
        'id': 3,
        'title': 'Production Apps & Enterprise Impact',
        'text': "With 15 deployed full-stack applications across fintech, logistics, and AI career tools, I engineer systems designed for sub-second latency and measurable business impact."
    },
    {
        'id': 4,
        'title': 'Ready for Industry Opportunities',
        'text': "I am actively seeking industry opportunities to contribute applied AI and full-stack engineering to high-performing teams. Let's connect and build what's next."
    }
]

voices = {
    'salman': {
        'code': 'en-IN-PrabhatNeural',
        'rate': '+1%',
        'pitch': '+0Hz',
        'name': 'Salman Khan (AI Neural Clone)'
    },
    'christopher': {
        'code': 'en-US-ChristopherNeural',
        'rate': '+2%',
        'pitch': '+0Hz',
        'name': 'Christopher (Deep Executive)'
    },
    'ava': {
        'code': 'en-US-AvaMultilingualNeural',
        'rate': '+1%',
        'pitch': '+0Hz',
        'name': 'Ava (Studio Broadcaster)'
    },
    'andrew': {
        'code': 'en-US-AndrewMultilingualNeural',
        'rate': '+2%',
        'pitch': '+0Hz',
        'name': 'Andrew (Conversational Tech Lead)'
    }
}

async def generate_all():
    for v_key, v_info in voices.items():
        print(f"\n[TTS] Generating HD Neural TTS for Voice Persona: {v_info['name']}...")
        for chap in chapters_text:
            filename = f"public/assets/audio/tour_chapter_{chap['id']}_{v_key}.mp3"
            communicate = edge_tts.Communicate(chap['text'], v_info['code'], rate=v_info['rate'], pitch=v_info['pitch'])
            await communicate.save(filename)
            print(f"  + Saved {filename} ({os.path.getsize(filename)} bytes)")
            
            # Save salman voice as the default tour_chapter_X.mp3 as well
            if v_key == 'salman':
                default_file = f"public/assets/audio/tour_chapter_{chap['id']}.mp3"
                communicate_default = edge_tts.Communicate(chap['text'], v_info['code'], rate=v_info['rate'], pitch=v_info['pitch'])
                await communicate_default.save(default_file)
                print(f"  + Saved default alias {default_file}")

if __name__ == '__main__':
    asyncio.run(generate_all())
