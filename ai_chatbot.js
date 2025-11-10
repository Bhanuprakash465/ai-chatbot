const readline = require('readline');

class SimpleChatbot {
    constructor() {
        this.appointments = [];
    }

    parseInput(input) {
        const lower = input.toLowerCase();
        if(lower.includes('book appointment')) {
            return 'Please provide your name, date (YYYY-MM-DD), and time (HH:MM) to book the appointment.';
        }
        const match = input.match(/name: (\w+), date: (\d{4}-\d{2}-\d{2}), time: (\d{2}:\d{2})/i);
        if(match) {
            const [, name, date, time] = match;
            this.appointments.push({ name, date, time });
            return `Appointment booked for ${name} on ${date} at ${time}.`;
        }
        return 'Sorry, I can only assist with appointment bookings.';
    }

    start() {
        const rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });
        console.log('Healthcare Appointment Chatbot CLI started. Type your messages.');

        rl.on('line', (input) => {
            const response = this.parseInput(input);
            console.log(response);
        });
    }
}

const chatbot = new SimpleChatbot();
chatbot.start();
