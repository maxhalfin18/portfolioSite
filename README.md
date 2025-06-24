# Max Halfin Portfolio Website

This is my personal portfolio site designed to showcase selected projects and allow visitors to get in touch directly.

## Features

- Responsive and clean web design using HTML, CSS, and JavaScript
- Project presentation section featuring live GitHub projects
- Contact form with backend support using Node.js and Express
- Nodemailer integration to send emails directly from the website

## Technologies Used

- HTML5, CSS3, JavaScript (Vanilla)
- Node.js + Express
- Nodemailer
- Hosted assets (images, profile, project banners)

## File Structure
```
├── index.html          # Main portfolio page
├── style.css           # Styling for all components
├── server.js           # Express server with contact form backend
├── /assets             # Profile images, logos, banners
```
## Contact Form Setup

To make the contact form work:
1. Set up a Gmail account for sending emails.
2. Generate a Gmail App Password.
3. Replace the credentials in `server.js` under the `nodemailer.createTransport` config.

```js
auth: {
  user: 'your_email@gmail.com',
  pass: 'your_generated_app_password'
}
```

## How to Run Locally

1. Clone the repository:
   ```
   git clone https://github.com/your-username/portfolioSite.git
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Start the server:
   ```
   node server.js
   ```

4. Open in your browser:
   ```
   http://localhost:3000
   ```

## Author

Max Halfin  
[GitHub Profile](https://github.com/maxhalfin18)
