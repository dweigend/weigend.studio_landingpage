/**
 * 🚀 weigend.studio
 * 📧 Express server with email functionality
 * 🌐 2024 David Weigend
 */

require('dotenv').config();
const express = require('express');
const nodemailer = require('nodemailer');
const path = require('path');

// ✨ Validate environment variables
if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
    console.error('Error: Missing email credentials in environment variables');
    process.exit(1);
}

// 🔧 Initialize Express app
const app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// 📧 Email configuration
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

// ✅ Verify email configuration
transporter.verify((error) => {
    if (error) {
        console.error('Error with email configuration:', error);
    } else {
        console.log('Server is ready to send emails');
    }
});

// 📨 Email endpoint
app.post('/send-message', async (req, res) => {
    const { message } = req.body;

    if (!message || message.trim().length === 0) {
        return res.status(400).json({ message: 'Message cannot be empty' });
    }

    try {
        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: process.env.EMAIL_USER, // Send to same email
            subject: 'New Message from weigend.studio',
            text: message,
            replyTo: process.env.EMAIL_USER
        });

        res.status(200).json({ message: 'Email sent successfully' });
    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).json({ 
            message: 'Failed to send email',
            error: error.message 
        });
    }
});

// ⚠️ Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ 
        message: 'Internal server error',
        error: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
});

// 🚀 Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
});
