import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());

// Mock AI Chat Endpoint
app.post('/api/chat', async (req, res) => {
  try {
    const { message, context } = req.body;
    
    if (!message) {
      return res.status(400).json({ error: 'Message is required' });
    }

    let reply = "I am the official Indian Election AI Assistant. I can help you understand the election process, voting machines, or any other query!";
    const lowerMessage = message.toLowerCase();
    
    // Improved contextual matching
    if (lowerMessage.includes('evm')) {
      reply = "An Electronic Voting Machine (EVM) is a device used to securely record and count votes. It ensures faster counting and eliminates invalid votes. The EVM consists of a Control Unit and a Ballot Unit connected by a cable.";
    } else if (lowerMessage.includes('vvpat')) {
      reply = "VVPAT stands for Voter Verifiable Paper Audit Trail. It's an independent printer system attached to the EVM that allows voters to verify that their vote was cast as intended by viewing a physical paper slip for 7 seconds.";
    } else if (lowerMessage.includes('nota')) {
      reply = "NOTA stands for 'None of the Above'. It allows a voter to register a vote of rejection for all candidates contesting in their constituency. If NOTA gets the highest votes, the candidate with the next highest votes is declared the winner.";
    } else if (lowerMessage.includes('nomination') || lowerMessage.includes('register')) {
      reply = "During the nomination phase, candidates file their papers. They must meet eligibility criteria, like being at least 25 years old for Lok Sabha. A Returning Officer scrutinizes these papers to ensure they are valid.";
    } else if (lowerMessage.includes('voting process') || lowerMessage.includes('how to vote')) {
      reply = "1. Find your polling booth. 2. Verify identity with Polling Officer. 3. Get finger inked. 4. Sign the register. 5. Proceed to the voting compartment. 6. Press the button against your chosen candidate on the EVM. 7. Verify the VVPAT slip.";
    } else if (lowerMessage.includes('who can vote') || lowerMessage.includes('eligibility')) {
      reply = "Any Indian citizen who is 18 years of age or older on January 1st of the year of the revision of the electoral roll, and is not disqualified by law, is eligible to vote.";
    } else if (lowerMessage.includes('hint') || lowerMessage.includes('explain the last answer')) {
      reply = "In the quiz, focus on understanding the core concepts. For example, the voting age was reduced from 21 to 18 by the 61st Amendment Act of 1988.";
    } else if (lowerMessage.includes('win') || lowerMessage.includes('budget')) {
      reply = "In a simulation, balancing high-reach methods (like social media) with high-conversion methods (like door-to-door) usually yields the best results. Managing your budget efficiently is key.";
    } else {
      // Fallback based on context
      if (context === 'timeline') {
        reply = "I see you are looking at the timeline. The Indian election timeline starts with the ECI notification and ends with counting. Do you have a question about a specific stage?";
      } else if (context === 'flashcards') {
        reply = "Flashcards are a great way to memorize terms. A key term is EVM (Electronic Voting Machine). Would you like me to explain another term?";
      } else if (context === 'quiz') {
        reply = "Quizzes test your knowledge on election facts, like the minimum voting age being 18. Need help with a specific question?";
      } else {
        reply = "I am ready to assist. You can ask me about EVMs, NOTA, the voting process, or how candidates are nominated.";
      }
    }

    // Artificial delay to simulate AI typing
    setTimeout(() => {
      res.json({ reply });
    }, 1200);

  } catch (error) {
    console.error('Chat error:', error);
    res.status(500).json({ error: 'Failed to process chat message' });
  }
});

// Serve static frontend files in production
if (process.env.NODE_ENV === 'production') {
  const buildPath = path.join(__dirname, 'dist');
  app.use(express.static(buildPath));
  
  app.use((req, res) => {
    res.sendFile(path.join(buildPath, 'index.html'));
  });
} else {
  // If not production, it implies Vite handles the frontend on port 5173
  app.get('/', (req, res) => {
    res.send('API is running. In dev, React is handled by Vite (usually on port 5173).');
  });
}

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
