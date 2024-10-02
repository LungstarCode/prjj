const tf = require('@tensorflow/tfjs');
const fs = require('fs');

// Load the dataset
const rawData = fs.readFileSync('data.json');
const data = JSON.parse(rawData);

// Prepare training data
const patterns = [];
const labels = [];

data.intents.forEach(intent => {
    intent.patterns.forEach(pattern => {
        patterns.push(pattern);
        labels.push(intent.tag);
    });
});

// Convert text data to tensors
const labelSet = Array.from(new Set(labels));
const labelIndices = labelSet.reduce((acc, label, index) => {
    acc[label] = index;
    return acc;
}, {});

const xs = tf.tensor(patterns.map(pattern => Array.from(pattern).map(char => char.charCodeAt(0))));
const ys = tf.tensor(labels.map(label => {
    const oneHot = Array(labelSet.length).fill(0);
    oneHot[labelIndices[label]] = 1;
    return oneHot;
}));

// Create a simple model
const model = tf.sequential();
model.add(tf.layers.dense({ units: 16, activation: 'relu', inputShape: [xs.shape[1]] }));
model.add(tf.layers.dense({ units: labelSet.length, activation: 'softmax' }));

model.compile({ optimizer: 'adam', loss: 'categoricalCrossentropy', metrics: ['accuracy'] });

// Train the model
(async () => {
    await model.fit(xs, ys, { epochs: 200, verbose: 1 });
    
    // Save the model
    await model.save('file://model');
    console.log('Model trained and saved successfully!');
})();
