/**
 * Interactive Terminal Chat for Salman Portfolio AI Assistant
 * Model: Qwen 2.5 (Local GPU LLM) / Ollama
 * 
 * Run with: node chat_terminal.js
 */

import readline from 'readline';
import { getAIChatResponse } from './src/services/aiAgent.js';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

console.clear();
console.log('===============================================================');
console.log('  🤖 SALMAN KHAN AI PORTFOLIO — TERMINAL INTERACTIVE CHAT');
console.log('  Model Engine: Qwen 2.5 (Local Downloaded GPU Model)');
console.log('===============================================================');
console.log('Type your message and press ENTER. Type "exit" or "quit" to stop.\n');

const history = [];

function promptUser() {
  rl.question('\n👤 USER: ', async (input) => {
    const text = input.trim();
    if (!text) {
      promptUser();
      return;
    }
    if (text.toLowerCase() === 'exit' || text.toLowerCase() === 'quit') {
      console.log('\n👋 Goodbye! Thanks for testing Qwen 2.5.');
      rl.close();
      process.exit(0);
    }

    console.log('⏳ Thinking with Qwen 2.5...');
    try {
      const response = await getAIChatResponse(text, history);
      console.log(`\n🤖 AI (${response.model}):`);
      console.log(response.reply);

      if (response.action_card) {
        console.log('\n📬 ACTION CARD DETECTED:', JSON.stringify(response.action_card, null, 2));
      }

      history.push({ role: 'user', content: text });
      history.push({ role: 'assistant', content: response.reply });
    } catch (err) {
      console.error('❌ Error getting response:', err.message);
    }

    promptUser();
  });
}

promptUser();
