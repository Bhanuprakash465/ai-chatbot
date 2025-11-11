const readline = require('readline');

class InteractiveChatbot {
    constructor() {
        this.appointments = [];
        this.state = 'waiting';
        this.currentAppointment = {};
    }

    parseInput(input) {
        const lower = input.toLowerCase().trim();

        if (this.state === 'waiting') {
            if (lower.includes('book appointment')) {
                this.state = 'gettingName';
                return 'Sure! What is your name?';
            }
            return 'Hello! You can say "Book appointment" to schedule an appointment.';
        } else if (this.state === 'gettingName') {
            this.currentAppointment.name = input.trim();
            this.state = 'gettingDate';
            return `Thanks, ${this.currentAppointment.name}. What date do you prefer? (YYYY-MM-DD)`;
        } else if (this.state === 'gettingDate') {
            if (/^\d{4}-\d{2}-\d{2}$/.test(input.trim())) {
                this.currentAppointment.date = input.trim();
                this.state = 'gettingTime';
                return 'Great! What time would you like? (HH:MM)';
            } else {
                return 'Please provide the date in YYYY-MM-DD format.';
            }
        } else if (this.state === 'gettingTime') {
            if (/^\d{2}:\d{2}$/.test(input.trim())) {
                this.currentAppointment.time = input.trim();
                // Save appointment
                this.appointments.push(this.currentAppointment);
                const response = `Appointment booked successfully for ${this.currentAppointment.name} on ${this.currentAppointment.date} at ${this.currentAppointment.time}. Thank you!`;
                this.currentAppointment = {};
                this.state = 'waiting';
                return response;
            } else {
                return 'Please provide the time in HH:MM format.';
            }
        }
        return 'Sorry, I can only assist with appointment bookings for now.';
    }

    start() {
        const rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });
        console.log('Interactive Healthcare Appointment Chatbot CLI started. Type your messages.');

        rl.on('line', (input) => {
            const response = this.parseInput(input);
            console.log(response);
        });
    }
}

const chatbot = new InteractiveChatbot();
chatbot.start();
