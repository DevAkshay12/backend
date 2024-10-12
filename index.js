const express = require('express');
const mongoose = require('mongoose');
const app = express();

// Middleware to parse JSON request bodies
app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/service', {
    // Removed deprecated options
}).then(() => {
    console.log('Connected to MongoDB');
}).catch((err) => {
    console.error('Error connecting to MongoDB:', err);
});

// Define a schema and model for democol
const democolSchema = new mongoose.Schema({
    name: { type: String, required: true },
    password: { type: String, required: true }
});

const Democol = mongoose.model('credentails', democolSchema);

// API route to insert a document into democol collection
app.post('/insert', async (req, res) => {
    try {
        const newDocument = new Democol(req.body); // Use the request body for new document
        await newDocument.save(); // Save the document
        res.send('Document inserted successfully');
    } catch (err) {
        console.error('Error inserting document:', err);
        res.status(500).send('Error inserting document');
    }
});

// API route to fetch data from democol collection
app.get('/data', async (req, res) => {
    try {
        const data = await Democol.find();  // Find all documents
        console.log('Fetched data:', data);  // Log the fetched data
        res.json(data);  // Send data as JSON
    } catch (err) {
        console.error('Error fetching data:', err);
        res.status(500).send('Server error');
    }
});

// Start the server
app.listen(3001, () => {
    console.log('Server is running on port 3001');
});
