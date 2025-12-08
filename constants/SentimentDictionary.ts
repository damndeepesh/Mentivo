export const SENTIMENT_DICTIONARY: Record<string, number> = {
    // ==========================================
    // POSITIVE MOODS
    // ==========================================

    // === EXCITED (+5) ===
    'excited': 5, 'excitement': 5,
    'gym': 5, 'workout': 5, 'run': 5, 'running': 5, 'sprint': 5, 'marathon': 5,
    'hike': 5, 'hiking': 5, 'climb': 5, 'climbing': 5, 'swim': 5, 'swimming': 5,
    'productive': 5, 'productivity': 5, 'accomplish': 5, 'accomplished': 5,
    'win': 5, 'winning': 5, 'won': 5, 'success': 5, 'succeeded': 5,
    'promotion': 5, 'raise': 5, 'bonus': 5, 'hired': 5,
    'party': 5, 'partying': 5, 'club': 5, 'dancing': 5, 'dance': 5,
    'concert': 5, 'festival': 5, 'rave': 5, 'gig': 5, 'performance': 5,
    'travel': 5, 'traveling': 5, 'trip': 5, 'vacation': 5, 'holiday': 5,
    'adventure': 5, 'explore': 5, 'exploring': 5, 'journey': 5,
    'thrill': 5, 'thrilled': 5, 'ecstatic': 5, 'euphoric': 5, 'elated': 5,
    'amazing': 5, 'incredible': 5, 'awesome': 5, 'fantastic': 5, 'phenomenal': 5,
    'massive': 5, 'huge': 5, 'legendary': 5, 'epic': 5, 'unforgettable': 5,
    'energetic': 5, 'energy': 5, 'pumped': 5, 'hyped': 5, 'stoked': 5,
    'passionate': 5, 'passion': 5, 'intense': 5, 'fire': 5, 'lit': 5,

    // === HAPPY / GRATEFUL / LOVING / PROUD (+4) ===
    'happy': 4, 'happiness': 4, 'glad': 4, 'joy': 4, 'joyful': 4,
    'grateful': 4, 'gratitude': 4, 'thankful': 4, 'blessed': 4, 'appreciate': 4,
    'appreciation': 4,
    'loving': 4, 'love': 4, 'loved': 4, 'adore': 4, 'adored': 4,
    'proud': 4, 'pride': 4, 'achievement': 4, 'achieve': 4, 'goal': 4,
    'crush': 4, 'romance': 4, 'romantic': 4, 'date': 4, 'dating': 4,
    'kiss': 4, 'cuddle': 4, 'hug': 4, 'sex': 4, 'intimacy': 4,
    'friends': 4, 'friend': 4, 'friendship': 4, 'buddy': 4, 'pal': 4,
    'family': 4, 'mom': 4, 'dad': 4, 'sister': 4, 'brother': 4,
    'good': 4, 'great': 4, 'nice': 4, 'lovely': 4, 'beautiful': 4,
    'fun': 4, 'funny': 4, 'laugh': 4, 'laughing': 4, 'laughter': 4,
    'smile': 4, 'smiling': 4, 'grin': 4, 'cheer': 4, 'cheerful': 4,
    'delicious': 4, 'tasty': 4, 'yummy': 4, 'feast': 4, 'treat': 4, 'dinner': 4,
    'gift': 4, 'present': 4, 'surprise': 4, 'reward': 4, 'medal': 4,

    // === HOPEFUL / CONFIDENT (+3) ===
    'hope': 3, 'hopeful': 3, 'hoping': 3, 'optimistic': 3, 'optimism': 3,
    'confident': 3, 'confidence': 3, 'brave': 3, 'courage': 3, 'bold': 3,
    'strong': 3, 'strength': 3, 'powerful': 3, 'power': 3, 'capable': 3,
    'motivated': 3, 'motivation': 3, 'inspire': 3, 'inspired': 3, 'inspiration': 3,
    'creative': 3, 'create': 3, 'art': 3, 'music': 3, 'design': 3,
    'learn': 3, 'learning': 3, 'study': 3, 'studying': 3, 'class': 3,
    'grow': 3, 'growth': 3, 'improve': 3, 'improvement': 3, 'better': 3,
    'plan': 3, 'planning': 3, 'future': 3, 'dream': 3, 'dreaming': 3,
    'prepare': 3, 'ready': 3, 'set': 3, 'focus': 3, 'focused': 3,
    'solution': 3, 'solved': 3, 'fix': 3, 'fixed': 3, 'repair': 3,

    // === CALM (+1) ===
    'calm': 1, 'calming': 1, 'relax': 1, 'relaxed': 1, 'relaxing': 1,
    'rest': 1, 'resting': 1, 'rested': 1, 'sleep': 1, 'sleeping': 1, 'slept': 1,
    'nap': 1, 'napping': 1, 'doze': 1, 'snooze': 1, 'bed': 1,
    'peace': 1, 'peaceful': 1, 'quiet': 1, 'silence': 1, 'silent': 1,
    'meditate': 1, 'meditation': 1, 'mindful': 1, 'mindfulness': 1, 'yoga': 1,
    'read': 1, 'reading': 1, 'book': 1, 'novel': 1, 'library': 1,
    'movie': 1, 'film': 1, 'show': 1, 'series': 1, 'watch': 1, 'watching': 1,
    'coffee': 1, 'tea': 1, 'cafe': 1, 'latte': 1, 'drink': 1,
    'walk': 1, 'stroll': 1, 'park': 1, 'nature': 1, 'garden': 1,
    'chill': 1, 'chilling': 1, 'cool': 1, 'easy': 1, 'simple': 1,
    'comfort': 1, 'comfortable': 1, 'cozy': 1, 'warm': 1, 'soft': 1,
    'bath': 1, 'shower': 1, 'spa': 1, 'massage': 1, 'sauna': 1,
    'home': 1, 'house': 1, 'stay': 1, 'weekend': 1, 'sunday': 1,

    // ==========================================
    // NEUTRAL MOODS
    // ==========================================

    // === PERPLEXED (0) ===
    'perplexed': 0, 'confused': 0, 'confusing': 0, 'puzzled': 0, 'unsure': 0,
    'ok': 0, 'okay': 0, 'fine': 0, 'average': 0, 'normal': 0,
    'maybe': 0, 'perhaps': 0, 'guess': 0, 'wonder': 0, 'think': 0,
    'weird': 0, 'strange': 0, 'odd': 0, 'bizarre': 0, 'random': 0,
    'wait': 0, 'waiting': 0, 'pause': 0, 'stop': 0,

    // ==========================================
    // NEGATIVE MOODS
    // ==========================================

    // === BORED / TIRED (-1) ===
    'bored': -1, 'boring': -1, 'dull': -1, 'meh': -1, 'blah': -1,
    'tired': -1, 'tiring': -1, 'exhausted': -1, 'fatigued': -1, 'sleepy': -1,
    'drained': -1, 'weary': -1, 'lethargic': -1, 'lazy': -1, 'unproductive': -1,
    'long': -1, 'slow': -1, 'drag': -1, 'forever': -1,
    'work': -1, 'job': -1, 'office': -1, 'task': -1, 'chore': -1,
    'cleaning': -1, 'laundry': -1, 'dishes': -1, 'mess': -1, 'dirty': -1,
    'cold': -1, 'hot': -1, 'humid': -1, 'rain': -1, 'weather': -1,
    'poor': -1, 'bad': -1, 'mediocre': -1, 'subpar': -1, 'lame': -1,

    // === ANXIOUS / SAD (-2) ===
    'anxious': -2, 'anxiety': -2, 'nervous': -2, 'nerve': -2, 'worry': -2,
    'worried': -2, 'scared': -2, 'scary': -2, 'fear': -2, 'afraid': -2,
    'stress': -2, 'stressed': -2, 'stressful': -2, 'pressure': -2, 'tense': -2,
    'sad': -2, 'sadness': -2, 'unhappy': -2, 'cry': -2, 'crying': -2,
    'tears': -2, 'weep': -2, 'sorrow': -2, 'grief': -2, 'mourn': -2,
    'miss': -2, 'missing': -2, 'lost': -2, 'lose': -2, 'gone': -2,
    'sick': -2, 'ill': -2, 'illness': -2, 'flu': -2,
    'pain': -2, 'painful': -2, 'hurting': -2, 'ache': -2,
    'headache': -2, 'migraine': -2, 'stomach': -2, 'nausea': -2, 'dizzy': -2,
    'doctor': -2, 'hospital': -2, 'clinic': -2, 'meds': -2, 'medicine': -2,
    'hungover': -2, 'hangover': -2, 'burnout': -2,
    'negative': -2, 'unlucky': -2, 'unpleasant': -2, 'uncomfortable': -2, 'uncertain': -2,
    'noisy': -2, 'panicked': -2, 'panic': -2,

    // === LONELY / JEALOUS / FRUSTRATED (-3) ===
    'lonely': -3, 'alone': -3, 'isolate': -3, 'isolated': -3, 'isolation': -3,
    'jealous': -3, 'jealousy': -3, 'envy': -3, 'envious': -3, 'resent': -3,
    'frustrated': -3, 'frustration': -3, 'annoyed': -3, 'annoying': -3, 'irritated': -3,
    'bother': -3, 'bothered': -3, 'bug': -3, 'pest': -3, 'nuisance': -3,
    'traffic': -3, 'commute': -3, 'driver': -3, 'road': -3, 'stuck': -3,
    'late': -3, 'delay': -3, 'delayed': -3,
    'fail': -3, 'failed': -3, 'failure': -3, 'mistake': -3, 'error': -3,
    'wrong': -3, 'incorrect': -3, 'crash': -3, 'broken': -3,
    'compare': -3, 'comparison': -3, 'inferior': -3, 'insecure': -3,
    'broke': -3, 'money': -3, 'expensive': -3, 'cost': -3,
    'debt': -3, 'bill': -3, 'tax': -3, 'fee': -3,
    'disappointed': -3, 'disappointment': -3, 'letdown': -3, 'warn': -3,
    'unfair': -3, 'unsafe': -3, 'unwanted': -3, 'useless': -3, 'ugly': -3,
    'unhealthy': -3, 'upset': -3, 'upsetting': -3, 'nasty': -3, 'neglect': -3,
    'refuse': -3, 'regret': -3, 'damn': -3, 'crap': -3,

    // === ANGRY (-4) ===
    'angry': -4, 'anger': -4, 'mad': -4,
    'fight': -4, 'fighting': -4, 'fought': -4, 'argue': -4, 'argument': -4,
    'yell': -4, 'yelling': -4, 'scream': -4, 'screaming': -4, 'shout': -4,
    'awful': -4, 'terrible': -4, 'horrible': -4,
    'suck': -4, 'sucks': -4, 'shit': -4,
    'stupid': -4, 'idiot': -4, 'fool': -4,
    'nightmare': -4, 'insult': -4, 'offensive': -4, 'rude': -4, 'mean': -4,
    'danger': -4, 'dangerous': -4, 'reject': -4, 'rejected': -4, 'rejection': -4,
    'ruin': -4, 'ruined': -4, 'wreck': -4, 'damage': -4,

    // === FURIOUS / SEVERE (-5) ===
    'furious': -5, 'rage': -5,
    'hate': -5, 'hatred': -5, 'detest': -5, 'despise': -5, 'loathe': -5,
    'hit': -5, 'punch': -5, 'violence': -5, 'violent': -5, 'hurt': -5,
    'enemy': -5, 'rival': -5, 'bully': -5, 'harass': -5, 'abuse': -5,
    'horrific': -5, 'disaster': -5, 'worst': -5,
    'fuck': -5,
    'kill': -5, 'death': -5, 'dead': -5, 'die': -5, 'loss': -5,
    'suicidal': -5, 'hopeless': -5, 'despair': -5,
    'terror': -5, 'terrified': -5, 'trauma': -5,
    'betray': -5, 'betrayed': -5, 'cheat': -5, 'cheated': -5, 'lie': -5,
    'liar': -5, 'steal': -5, 'stole': -5, 'thief': -5, 'crime': -5,
    'prison': -5, 'jail': -5, 'arrest': -5, 'court': -5, 'sue': -5,
    'cruel': -5, 'toxic': -5, 'poison': -5, 'destroy': -5
};
