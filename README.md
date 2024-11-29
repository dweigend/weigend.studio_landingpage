# weigend.studio

A minimalist personal website with a retro terminal aesthetic, featuring a unique ASCII art display and interactive terminal interface.

## Features
- Dynamic ASCII art animation
- Interactive terminal interface
- Keyboard shortcuts for quick navigation
- Minimalist black and white design
- Secure contact form with email functionality
- Responsive design for all devices

## Quick Navigation
- `X` - Visit Twitter/X
- `L` - Visit LinkedIn
- `M` - Send a message

## Setup
1. Install dependencies:
```bash
npm install
```

2. Set up environment variables:
Create a `.env` file in the root directory with:
```
EMAIL_USER=your.email@gmail.com
EMAIL_PASS=your-gmail-app-password
```

3. Start the server:
```bash
npm start
```

The website will be available at `http://localhost:3000`

## Project Structure
```
weigend.studio/
├── public/
│   ├── fonts/         # Micro5 font files
│   ├── styles/        # CSS styles
│   │   └── main.css   # Main stylesheet
│   ├── scripts/       # Client-side JavaScript
│   │   └── main.js    # Main JavaScript file
│   └── index.html     # Main HTML file
├── server.js          # Express server with email functionality
├── package.json       # Project dependencies
└── .env              # Environment variables (not in repo)
```

## Technical Details
- **Frontend:**
  - Vanilla JavaScript for terminal simulation
  - Custom CSS animations
  - Micro5 font for authentic terminal look (https://fonts.google.com/specimen/Micro+5, Designed by Sarah Cadigan-Fried)
  - Responsive design using flexbox

- **Backend:**
  - Node.js with Express
  - Nodemailer for email functionality
  - Environment-based configuration

## Development
- Clone the repository
- Install dependencies with `npm install`
- Create `.env` file with email credentials
- Run `npm start` for development
- Access via `http://localhost:3000`

## Deployment
1. Ensure all environment variables are set
2. Build and deploy to your hosting service
3. Configure email service in production

## Security
- Email credentials stored in environment variables
- Input sanitization for contact form
- No external dependencies for core functionality

## License
MIT License - See LICENSE file for details

## Author
David Weigend - 2024
Berlin, Germany
