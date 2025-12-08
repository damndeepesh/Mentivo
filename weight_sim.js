const moods = [
    { name: 'sad', count: 1 },
    { name: 'angry', count: 1 },
    { name: 'calm', count: 2 },
    { name: 'proud', count: 1 },
    { name: 'happy', count: 2 },
    { name: 'frustrated', count: 1 }
];

const scenarios = [
    { name: 'User Case', moods: moods },
    { name: 'Happy + Angry', moods: [{ name: 'happy', count: 1 }, { name: 'angry', count: 1 }] },
    { name: 'Happy + Sad', moods: [{ name: 'happy', count: 1 }, { name: 'sad', count: 1 }] },
    { name: 'Mostly Happy + 1 Bad', moods: [{ name: 'happy', count: 5 }, { name: 'angry', count: 1 }] }
];

function testWeights(weights, name) {
    console.log(`\nTesting Weights: ${name}`);

    scenarios.forEach(scenario => {
        let totalScore = 0;
        let totalCount = 0;

        scenario.moods.forEach(m => {
            totalScore += (weights[m.name] || 0) * m.count;
            totalCount += m.count;
        });

        const valid = totalCount > 0;
        const average = valid ? totalScore / totalCount : 0;

        // Find closest
        let closestMood = '';
        let minDiff = Infinity;

        Object.entries(weights).forEach(([mood, weight]) => {
            const diff = Math.abs(weight - average);
            if (diff < minDiff) {
                minDiff = diff;
                closestMood = mood;
            }
        });

        console.log(`  Scenario: ${scenario.name}`);
        console.log(`    Avg: ${average.toFixed(2)} -> ${closestMood} (${weights[closestMood]})`);
    });
}

// Set 1: Current (User Complaint)
const currentWeights = {
    excited: 5,
    happy: 4, grateful: 4, loving: 4, proud: 4,
    hopeful: 3, confident: 3,
    calm: 1,
    perplexed: 0,
    bored: -1, tired: -1,
    anxious: -2, sad: -2,
    lonely: -3, jealous: -3, frustrated: -3,
    angry: -4
};

// Set 2: Proposed (Soft Negatives, Higher Calm)
const proposedWeights = {
    excited: 5,
    happy: 4, grateful: 4, loving: 4, proud: 4,
    hopeful: 3, confident: 3,
    calm: 2, // Bumped to 2
    perplexed: 0,
    bored: 0, tired: -1, // Bored to neutral?
    anxious: -1, sad: -1, // Softened
    lonely: -2, jealous: -2, frustrated: -2, // Softened
    angry: -3 // Softened
};

// Set 3: Wide Scale (More granularity?)
// Maybe spread positive more?
// 0: Neutral. 1: Ok. 2: Calm. 3: Good. 4: Happy...

testWeights(currentWeights, "Current (Calm=1, Angry=-4)");
testWeights(proposedWeights, "Proposed (Calm=2, Angry=-3)");
