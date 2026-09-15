import readline from 'readline';
import { getAIChatResponse } from './src/services/aiAgent.js';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const conversationHistory = [];

console.log('\n' + '='.repeat(68));
console.log('🤖  SALMAN KHAN AI ASSISTANT — INTERACTIVE TERMINAL TEST CLI');
console.log('='.repeat(68));
console.log('• Direct Connection: Local GPU LLM (Ollama - Qwen 2.5)');
console.log('• Zero API Keys Required');
console.log('• Multi-turn conversation memory is active');
console.log("• Type your message and press ENTER. Type 'exit' or 'quit' to exit.");
console.log('='.repeat(68) + '\n');

function askQuestion() {
  rl.question('\x1b[36m👤 You > \x1b[0m', async (userInput) => {
    const input = userInput.trim();

    if (!input) {
      askQuestion();
      return;
    }

    if (input.toLowerCase() === 'exit' || input.toLowerCase() === 'quit' || input.toLowerCase() === 'q') {
      console.log('\n👋 Exiting AI Test CLI. Have a great day!\n');
      rl.close();
      process.exit(0);
    }

    if (input.toLowerCase() === 'clear' || input.toLowerCase() === 'reset') {
      conversationHistory.length = 0;
      console.log('\n🔄 [Conversation history cleared]\n');
      askQuestion();
      return;
    }

    try {
      process.stdout.write('\x1b[33m⏳ Thinking...\x1b[0m\r');
      const startTime = Date.now();
      
      const response = await getAIChatResponse(input, conversationHistory);
      const elapsed = Date.now() - startTime;

      // Clear the "Thinking..." line
      readline.clearLine(process.stdout, 0);
      readline.cursorTo(process.stdout, 0);

      console.log(`\x1b[32m🤖 AI (${response.model || 'Local LLM'} - ${elapsed}ms) >\x1b[0m`);
      console.log(response.reply);

      if (response.action_card) {
        console.log('\n\x1b[35m[Interactive Email Action Card Attached]\x1b[0m');
        console.log(`  To: ${response.action_card.recipient}`);
        console.log(`  Subject: ${response.action_card.subject}`);
      }

      // Save to session history
      conversationHistory.push({ role: 'user', content: input });
      conversationHistory.push({ role: 'assistant', content: response.reply });

      console.log('\n' + '-'.repeat(68) + '\n');
    } catch (err) {
      readline.clearLine(process.stdout, 0);
      readline.cursorTo(process.stdout, 0);
      console.error('\x1b[31m❌ Error generating AI response:\x1b[0m', err.message);
    }

    askQuestion();
  });
}

askQuestion();
