// Anthropic API client for generating tweets

interface AnthropicResponse {
  content: Array<{
    text: string;
    type: string;
  }>;
}

// Collection of CZ's common phrases and patterns to help the model learn his style
const czCommonPhrases = [
  "Funds are SAFU.",
  "We will continue to BUIDL.",
  "Not financial advice.",
  "DYOR.",
  "Long term thinking.",
  "Steady lads.",
  "Ignore the noise, focus on building.",
  "Patience is key.",
  "Blockchain is still in its early days.",
  "Adoption takes time.",
  "Simple.",
  "Protect users first.",
  "Transparency is key.",
  "Stay SAFU.",
  "Focus on users.",
  "Compliance is a journey, not a destination.",
  "We listen to our community.",
  "Slow and steady wins the race.",
  "Security is our top priority.",
  "We are here for the long term.",
  "Innovation continues.",
  "Onwards and upwards.",
  "Keep building.",
  "Fundamentals matter.",
  "Ignore FUD, focus on building.",
  "Education is key.",
  "Blockchain has no borders.",
  "Crypto adoption is still early.",
  "Protect our users.",
  "Compliance is not a choice.",
];

// CZ's common tweet structures
const czTweetStructures = [
  "Simple. [statement about topic]",
  "[observation about topic]. Steady lads.",
  "[statement about topic]. #BUIDL",
  "[brief update]. We keep building.",
  "[market observation]. Long term thinking.",
  "[statement]. Not financial advice.",
  "[observation]. DYOR.",
  "[statement about topic]. Onwards and upwards.",
  "[statement]. Ignore FUD.",
  "[statement]. Funds are SAFU.",
  "[observation]. Adoption takes time.",
  "[statement]. We are here for the long term.",
  "[statement]. Focus on users.",
  "[statement]. Security is our top priority.",
  "[statement]. Blockchain is still in its early days.",
];

/**
 * Generates a tweet using the Anthropic Claude API
 * @param topic The topic to generate a tweet about
 * @param tone The tone of the tweet (informative, optimistic, cautious, etc.)
 * @param length The desired length of the tweet (short, medium, long)
 * @returns A promise that resolves to the generated tweet
 */
export const generateTweetWithAnthropic = async (
  topic: string,
  tone: string,
  length: string
): Promise<string> => {
  const apiKey = import.meta.env.VITE_ANTHROPIC_API_KEY;
  
  if (!apiKey || apiKey === 'your_anthropic_api_key_here') {
    throw new Error('Anthropic API key is not configured. Please add your API key to the .env file.');
  }

  // Determine the maximum length based on the selected option
  let maxLength = 100;
  if (length === 'medium') {
    maxLength = 200;
  } else if (length === 'long') {
    maxLength = 350;
  }

  // Select a few random examples of CZ's common phrases to include in the prompt
  const selectedPhrases = [];
  const phraseCount = Math.min(8, czCommonPhrases.length);
  const phraseIndices = new Set<number>();
  
  while (phraseIndices.size < phraseCount) {
    phraseIndices.add(Math.floor(Math.random() * czCommonPhrases.length));
  }
  
  phraseIndices.forEach(index => {
    selectedPhrases.push(czCommonPhrases[index]);
  });

  // Select a few random examples of CZ's tweet structures
  const selectedStructures = [];
  const structureCount = Math.min(5, czTweetStructures.length);
  const structureIndices = new Set<number>();
  
  while (structureIndices.size < structureCount) {
    structureIndices.add(Math.floor(Math.random() * czTweetStructures.length));
  }
  
  structureIndices.forEach(index => {
    selectedStructures.push(czTweetStructures[index]);
  });

  // Create a prompt that instructs Claude to generate a tweet in CZ's style
  const prompt = `Generate a tweet in the style of Changpeng Zhao (CZ), the founder of Binance, about "${topic}".

Tweet Requirements:
- Tone: ${tone}
- Length: Approximately ${maxLength} characters
- Must directly address the topic: "${topic}"

CZ's Common Phrases (use some of these or similar phrases if appropriate):
${selectedPhrases.map(phrase => `- "${phrase}"`).join('\n')}

Common Tweet Structures CZ Uses (for inspiration):
${selectedStructures.map(structure => `- ${structure}`).join('\n')}

Style Guidelines:
- Concise but thoughtful
- Simple, direct language
- Philosophical yet practical
- Forward-looking and optimistic about crypto/blockchain
- Balanced and measured perspective
- Occasionally uses emojis like 🔶 (Binance logo color), 👍, 💪, 🙏, 🚀
- Sometimes includes hashtags like #Binance, #BNB, #Crypto, #BUIDL, #SAFU
- Often focuses on long-term thinking, building, and user protection
- Avoids hype or exaggeration
- Maintains a calm, steady tone even when discussing volatile topics
- Occasionally uses short, simple sentences like "Simple." or "Steady lads."

Please generate only the tweet text without any additional commentary or explanation.`;

  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: 'claude-3-haiku-20240307',
        max_tokens: 1024,
        messages: [
          {
            role: 'user',
            content: prompt
          }
        ]
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`Anthropic API error: ${errorData.error?.message || response.statusText}`);
    }

    const data = await response.json() as AnthropicResponse;
    
    // Extract the generated text from the response
    const generatedTweet = data.content[0]?.text?.trim() || '';
    
    return generatedTweet;
  } catch (error) {
    console.error('Error generating tweet with Anthropic:', error);
    throw error;
  }
};
