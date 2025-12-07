export const GENERIC_PROMPTS = [
    "What's occupying your mind right now?",
    "What are you looking forward to?",
    "Describe a moment of peace you found today.",
    "What made you smile today?",
];

export const MOOD_PROMPTS: Record<string, string[]> = {
    happy: [
        "What was the highlight of your day?",
        "Who did you share your joy with today?",
        "How can you make this feeling last?",
    ],
    excited: [
        "What are you most looking forward to?",
        "What gave you this burst of energy?",
        "How will you channel this excitement?",
    ],
    grateful: [
        "Who are you thankful for today?",
        "What small thing made your day better?",
        "What is a privilege you enjoyed today?",
    ],
    proud: [
        "What did you accomplish today?",
        "What strength did you show recently?",
        "Celebrate a small win you had today.",
    ],
    confident: [
        "What makes you feel unstoppable right now?",
        "How did you handle a challenge today?",
        "What do you love about yourself today?",
    ],
    loving: [
        "Who made you feel loved today?",
        "How did you show kindness to someone?",
        "What is something beautiful you saw?",
    ],
    calm: [
        "What helped you find peace today?",
        "Describe your surroundings right now.",
        "What is a quiet moment you enjoyed?",
    ],
    hopeful: [
        "What is a dream you are holding onto?",
        "What is the best possible outcome for tomorrow?",
        "What gives you hope right now?",
    ],
    // Negative / Challenging
    sad: [
        "What do you need right now to feel supported?",
        "It's okay not to be okay. What's hurting?",
        "What is one small way you can be kind to yourself?",
    ],
    frustrated: [
        "What is blocking your path?",
        "What would you like to say but haven't?",
        "Complete the sentence: I just want...",
    ],
    anxious: [
        "What is one thing within your control right now?",
        "Write down your worries to get them out of your head.",
        "What is a grounding thought you can hold onto?",
    ],
    jealous: [
        "What does this feeling tell you about what you value?",
        "How can you turn this envy into inspiration?",
        "What do you have that is unique to you?",
    ],
    perplexed: [
        "What is confusing you right now?",
        "What questions are running through your mind?",
        "If you had to guess, what is the answer?",
    ],
    bored: [
        "What is something new you'd like to learn?",
        "If you could be anywhere else, where would it be?",
        "What is a creative idea you've had recently?",
    ],
    tired: [
        "What drained your energy today?",
        "How can you rest and recharge tonight?",
        "What can you say 'no' to tomorrow?",
    ],
    lonely: [
        "Who is one person you could reach out to?",
        "What kind of connection are you craving?",
        "How can you be your own best friend right now?",
    ],
    angry: [
        "What boundary was crossed?",
        "Write a letter to what made you angry (then delete it).",
        "How can you release this energy physically?",
    ],
};
