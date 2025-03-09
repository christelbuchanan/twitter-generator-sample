// This is a tweet generator that mimics CZ's style
// It can use either a local template-based approach or the Anthropic API

import { generateTweetWithAnthropic } from './anthropicClient';

interface TweetTemplate {
  prefix: string[]
  middle: string[]
  suffix: string[]
  hashtags: string[]
  emojis: string[]
  philosophy: string[]
}

const tweetTemplates: Record<string, TweetTemplate> = {
  informative: {
    prefix: [
      "Just to clarify,",
      "FYI,",
      "For those asking,",
      "To be clear,",
      "Simple explanation:",
    ],
    middle: [
      "this is how it works.",
      "we are working on this.",
      "this is our approach.",
      "this is what's happening.",
      "this is the situation.",
    ],
    suffix: [
      "Stay tuned for updates.",
      "We will keep you posted.",
      "As always, thanks for your support.",
      "Appreciate your understanding.",
      "We're here for the long term.",
    ],
    hashtags: ["#Binance", "#BNB", "#Crypto", "#BUIDL", "#SAFU"],
    emojis: ["🔶", "👍", "💪", "🙏", "🚀"],
    philosophy: [
      "In tech, we must balance innovation with responsibility.",
      "The best technologies are those that empower without controlling.",
      "True progress comes from solving real problems, not chasing trends.",
      "Technology should enhance human potential, not replace human judgment.",
      "The most valuable systems are those that remain resilient through uncertainty.",
    ]
  },
  optimistic: {
    prefix: [
      "Good progress.",
      "Exciting times ahead.",
      "This is just the beginning.",
      "We keep building.",
      "Steady growth.",
    ],
    middle: [
      "The future is bright for crypto.",
      "adoption continues to increase.",
      "more innovations are coming.",
      "we're seeing positive developments.",
      "the ecosystem is expanding.",
    ],
    suffix: [
      "Onwards and upwards.",
      "The best is yet to come.",
      "Long term thinking wins.",
      "Focus on building real value.",
      "We're just getting started.",
    ],
    hashtags: ["#BNB", "#Crypto", "#BUIDL", "#Adoption", "#Innovation"],
    emojis: ["🚀", "💪", "🔶", "📈", "🌱"],
    philosophy: [
      "The most profound technologies are those that disappear into the background of our lives.",
      "Innovation isn't about following the crowd, but about seeing what others don't.",
      "True disruption comes from understanding human needs, not just technical possibilities.",
      "The best builders are those who can weather the storms of uncertainty with conviction.",
      "Technology should liberate us from constraints, not create new dependencies.",
    ]
  },
  cautious: {
    prefix: [
      "Be careful.",
      "Please note,",
      "A friendly reminder:",
      "Important to understand:",
      "Take note:",
    ],
    middle: [
      "always do your own research.",
      "security should be your priority.",
      "markets will fluctuate, that's normal.",
      "there are risks in every investment.",
      "verify information from official sources only.",
    ],
    suffix: [
      "Stay SAFU.",
      "Protect your assets.",
      "Think long term.",
      "Don't invest more than you can afford to lose.",
      "Education is key.",
    ],
    hashtags: ["#SAFU", "#Security", "#DYOR", "#CryptoSafety", "#Binance"],
    emojis: ["🔒", "⚠️", "🛡️", "🔶", "👀"],
    philosophy: [
      "Security isn't just a feature, it's a mindset that must permeate every decision we make.",
      "The most secure systems are those designed with the assumption that they will be attacked.",
      "Trust must be earned through consistent action, not merely promised through words.",
      "In a digital world, vigilance is not paranoia—it's prudence.",
      "The greatest risk isn't in making mistakes, but in failing to learn from them.",
    ]
  },
  neutral: {
    prefix: [
      "Just sharing,",
      "Observation:",
      "My thoughts:",
      "Perspective:",
      "For what it's worth,",
    ],
    middle: [
      "this is an interesting development.",
      "we're monitoring the situation.",
      "there are multiple factors at play.",
      "it's important to consider all angles.",
      "the market is evolving as expected.",
    ],
    suffix: [
      "Let's see how it unfolds.",
      "Time will tell.",
      "We remain focused on our goals.",
      "Adaptability is key in this space.",
      "We continue to serve our users.",
    ],
    hashtags: ["#Crypto", "#Blockchain", "#Binance", "#BNB", "#Industry"],
    emojis: ["🔶", "👀", "🤔", "📊", "🌐"],
    philosophy: [
      "The most valuable insights often come from observing patterns across seemingly unrelated domains.",
      "Progress isn't linear—it's cyclical, with periods of rapid advancement followed by consolidation.",
      "The ability to maintain perspective during volatility is what separates wisdom from reaction.",
      "True understanding comes not from certainty, but from embracing the complexity of systems.",
      "The best decisions emerge from balancing data with intuition, technology with humanity.",
    ]
  },
  announcement: {
    prefix: [
      "We are pleased to announce",
      "Excited to share that",
      "New update:",
      "Important announcement:",
      "Just in:",
    ],
    middle: [
      "we've launched a new feature.",
      "we're introducing improvements to our platform.",
      "we've reached a new milestone.",
      "we're expanding our services.",
      "we've formed a new partnership.",
    ],
    suffix: [
      "Check it out now.",
      "More details on our blog.",
      "Thanks to our community for the support.",
      "This is just the beginning.",
      "Feedback welcome.",
    ],
    hashtags: ["#Binance", "#BNB", "#Announcement", "#Crypto", "#Innovation"],
    emojis: ["🔶", "🎉", "✨", "🚀", "🆕"],
    philosophy: [
      "The most meaningful innovations are those that solve real problems, not those that create the most buzz.",
      "Building for the long term means making decisions that may not be immediately popular but create lasting value.",
      "True progress comes not from disruption alone, but from thoughtful evolution that brings users along.",
      "The best products aren't just technically superior—they understand and respect human psychology.",
      "Innovation without accessibility is just experimentation; true breakthroughs reach everyone.",
    ]
  },
};

// Helper function to get random item from array
const getRandomItem = (array: string[]): string => {
  return array[Math.floor(Math.random() * array.length)];
};

// Helper function to capitalize first letter
const capitalizeFirstLetter = (string: string): string => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

// Additional philosophical reflections for longer tweets
const additionalPhilosophicalReflections = [
  "As we navigate this technological revolution, we must remember that tools should serve humanity, not the other way around.",
  "The blockchain represents more than technology—it's a philosophical shift toward transparency and decentralization.",
  "True innovation happens at the intersection of technical capability and human understanding.",
  "In a world of increasing complexity, simplicity becomes the ultimate sophistication.",
  "The most valuable systems are those that align incentives with positive outcomes for all participants.",
  "Technology should expand human potential rather than constrain it through unnecessary complexity.",
  "The future belongs not to those who can predict it, but to those who can build it responsibly.",
  "Progress isn't measured by features added, but by problems solved and lives improved.",
  "The most enduring technologies are those that evolve with human needs while maintaining core principles.",
  "In the rush toward innovation, we must not forget the wisdom embedded in established systems.",
];

// Industry insights for longer tweets
const industryInsights = [
  "The crypto industry is maturing beyond speculation toward genuine utility and value creation.",
  "Regulatory clarity, while challenging in the short term, ultimately benefits legitimate innovation.",
  "Mass adoption requires both technological advancement and thoughtful user experience design.",
  "The most successful projects will be those that bridge traditional finance and decentralized systems.",
  "Security and scalability aren't opposing forces—they're complementary necessities for sustainable growth.",
  "Education remains our greatest challenge and opportunity in expanding the blockchain ecosystem.",
  "The next wave of innovation will come from solving real-world problems, not creating speculative assets.",
  "Sustainable growth comes from building infrastructure that can withstand market cycles.",
  "The distinction between competing technologies will increasingly be about governance, not just technical specs.",
  "True decentralization is a spectrum, not a binary state—and finding the right balance is key.",
];

// Topic-specific insights for different crypto topics
const topicSpecificInsights: Record<string, string[]> = {
  bitcoin: [
    "Bitcoin's resilience through market cycles demonstrates the power of decentralized consensus.",
    "Bitcoin remains the benchmark against which all crypto assets are measured.",
    "The Bitcoin halving reminds us that predictable monetary policy is a feature, not a bug.",
    "Bitcoin's simplicity is its strength—solving one problem exceptionally well.",
  ],
  ethereum: [
    "Ethereum's ecosystem growth shows the power of programmable blockchains.",
    "Layer 2 solutions are crucial for Ethereum's scalability journey.",
    "Smart contract platforms must balance innovation with security and stability.",
    "Ethereum's transition to proof-of-stake represents a significant technical achievement.",
  ],
  defi: [
    "DeFi protocols are reimagining financial services from first principles.",
    "Composability in DeFi creates exponential innovation possibilities.",
    "Risk management remains the biggest challenge in decentralized finance.",
    "True DeFi adoption requires better user experiences and clearer regulatory frameworks.",
  ],
  nft: [
    "NFTs are about more than digital art—they're about verifiable digital ownership.",
    "The next phase of NFTs will focus on utility rather than speculation.",
    "NFT technology enables new creator-audience relationships that weren't possible before.",
    "Digital scarcity is a powerful concept when applied to the right use cases.",
  ],
  regulation: [
    "Thoughtful regulation can protect users while enabling innovation.",
    "Regulatory clarity is essential for institutional adoption of crypto assets.",
    "The most effective regulations will be those that focus on principles rather than specific technologies.",
    "Self-regulation and industry standards are important complements to formal regulatory frameworks.",
  ],
  security: [
    "Security in crypto requires both technical excellence and user education.",
    "The most secure systems anticipate attacks rather than just responding to them.",
    "Multi-layer security approaches provide the best protection for digital assets.",
    "Security is a process, not a product—requiring constant vigilance and improvement.",
  ],
  market: [
    "Market volatility is the price we pay for long-term technological transformation.",
    "Short-term price movements matter less than long-term adoption trends.",
    "Market cycles separate sustainable projects from temporary phenomena.",
    "True value emerges over time as speculation gives way to utility.",
  ],
};

/**
 * Generates a tweet using either the local template-based approach or the Anthropic API
 * @param topic The topic to generate a tweet about
 * @param tone The tone of the tweet (informative, optimistic, cautious, etc.)
 * @param length The desired length of the tweet (short, medium, long)
 * @param useAI Whether to use the Anthropic API (true) or local templates (false)
 * @returns A promise that resolves to the generated tweet
 */
export const generateTweet = async (
  topic: string, 
  tone: string, 
  length: string,
  useAI: boolean = false
): Promise<string> => {
  // Try to use the Anthropic API if requested
  if (useAI) {
    try {
      return await generateTweetWithAnthropic(topic, tone, length);
    } catch (error) {
      console.error('Error using Anthropic API, falling back to template-based generation:', error);
      // Fall back to template-based generation if API fails
    }
  }
  
  // Template-based generation (fallback or default)
  const template = tweetTemplates[tone] || tweetTemplates.informative;
  
  // Generate topic-specific content
  let topicContent = "";
  if (topic) {
    // Check if we have specific insights for this topic category
    const lowerTopic = topic.toLowerCase();
    let topicCategory = Object.keys(topicSpecificInsights).find(category => 
      lowerTopic.includes(category)
    );
    
    if (topicCategory && Math.random() > 0.5) {
      // Use a topic-specific insight 50% of the time when available
      topicContent = getRandomItem(topicSpecificInsights[topicCategory]);
    } else {
      // Otherwise use a generic topic phrase
      const topicPhrases = [
        `${topic} is an important area we're focusing on.`,
        `Regarding ${topic}, we're making steady progress.`,
        `${topic} continues to evolve in the crypto space.`,
        `We're seeing interesting developments in ${topic}.`,
        `Our team is working hard on ${topic}.`,
        `${topic} presents both challenges and opportunities.`,
        `The community's feedback on ${topic} has been valuable.`,
        `${topic} is showing promising signs.`,
        `${topic} requires a balanced approach.`,
        `We're closely monitoring developments in ${topic}.`,
        `${topic} is part of our long-term vision.`,
        `The potential of ${topic} is just beginning to be realized.`,
      ];
      topicContent = getRandomItem(topicPhrases);
    }
  }
  
  // Build the tweet based on length
  let tweet = "";
  const prefix = getRandomItem(template.prefix);
  const middle = topicContent || getRandomItem(template.middle);
  const suffix = getRandomItem(template.suffix);
  const philosophy = getRandomItem(template.philosophy);
  
  if (length === "short") {
    tweet = `${prefix} ${middle} ${getRandomItem([philosophy, suffix])}`;
  } else if (length === "medium") {
    const extraPhilosophy = getRandomItem(additionalPhilosophicalReflections);
    tweet = `${prefix} ${middle} ${philosophy} ${suffix}`;
  } else {
    // For long tweets, add multiple philosophical elements
    const extraPhilosophy = getRandomItem(additionalPhilosophicalReflections);
    const industryInsight = getRandomItem(industryInsights);
    tweet = `${prefix} ${middle} ${philosophy} ${extraPhilosophy} ${suffix}`;
  }
  
  // Add hashtag and emoji with some probability
  if (Math.random() > 0.3) {
    tweet += ` ${getRandomItem(template.hashtags)}`;
  }
  
  if (Math.random() > 0.5) {
    tweet += ` ${getRandomItem(template.emojis)}`;
  }
  
  return capitalizeFirstLetter(tweet);
};
