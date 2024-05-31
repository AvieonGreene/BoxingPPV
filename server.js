const express = require('express');
const bodyParser = require('body-parser');
const { SMTPServer } = require('smtp-server');
const path = require('path');

const app = express();
const port = 3000;

// Middleware to parse form data
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname)));

// Route to serve the HTML form
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'Contact.html'));
});

// Route to handle form submission
app.post('/submit', (req, res) => {
    const { name, email, numb, message_tab } = req.body;
    console.log(`Name: ${name}, Email: ${email}, Phone Number: ${numb}, Message: ${message_tab}`);
    res.send(`Thank you for your message, ${name}!`);
});

// Start the Express server
app.listen(port, () => {
    console.log(`Express server running at http://localhost:${port}/`);
});

// Create an SMTP server to receive emails
const smtpServer = new SMTPServer({
    authOptional: true,
    onData(stream, session, callback) {
        let emailData = '';
        stream.on('data', (chunk) => {
            emailData += chunk.toString();
        });
        stream.on('end', () => {
            console.log('Received email:', emailData);
            callback(null, 'Message accepted');
        });
    },
    onAuth(auth, session, callback) {
        // Accept all logins
        callback(null, { user: 'user' });
    }
});

// Start the SMTP server
smtpServer.listen(2525, () => {
    console.log('SMTP server listening on port 2525');
});


