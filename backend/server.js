// backend/server.js

const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = 3000;

app.use(bodyParser.json());

// In-memory storage for simplicity
let appointments = [];

app.get('/', (req, res) => {
    res.send('Welcome to Healthcare Appointment AI Chatbot Backend');
});

// Endpoint to book an appointment
app.post('/book', (req, res) => {
    const { name, date, time } = req.body;
    if(!name || !date || !time) {
        return res.status(400).json({ message: 'Missing required fields' });
    }
    const appointment = { id: appointments.length + 1, name, date, time };
    appointments.push(appointment);
    res.status(201).json({ message: 'Appointment booked successfully', appointment });
});

app.get('/appointments', (req, res) => {
    res.json(appointments);
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
