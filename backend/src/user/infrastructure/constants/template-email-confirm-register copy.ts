export const templateHackathonUpdateHTML = (
  linkHackathon: string,
  receiverName: string,
  hackathonName: string,
  hackathonTime: string,
  hackathonLocation: string,
) => {
  return `<!DOCTYPE html>
  <html lang="en">
  <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Hackathon Update</title>
      <style>
          body {
              font-family: Arial, sans-serif;
              line-height: 1.6;
              margin: 0;
              padding: 0;
              background-color: #f9f9f9;
          }
          .email-container {
              max-width: 600px;
              margin: 20px auto;
              background: #ffffff;
              border: 1px solid #e0e0e0;
              border-radius: 8px;
              overflow: hidden;
              box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          }
          .header {
              background: #1abc9c;
              color: #ffffff;
              padding: 20px;
              text-align: center;
          }
          .header h1 {
              margin: 0;
          }
          .content {
              padding: 20px;
              color: #333333;
          }
          .content h2 {
              margin-top: 0;
          }
          .cta {
              text-align: center;
              margin: 20px 0;
          }
          .cta a {
              background: #3498db;
              color: #ffffff;
              text-decoration: none;
              padding: 10px 20px;
              border-radius: 4px;
              font-size: 16px;
          }
          .cta a:hover {
              background: #2980b9;
          }
          .footer {
              text-align: center;
              padding: 10px;
              font-size: 12px;
              color: #666666;
              background: #f0f0f0;
          }
      </style>
  </head>
  <body>
      <div class="email-container">
          <div class="header">
              <h1>Important Hackathon Update</h1>
          </div>
          <div class="content">
              <h2>Hello ${receiverName},</h2>
              <p>We have some exciting updates regarding the Hackathon you're participating in!</p>
              <p><strong>Updated Details:</strong></p>
              <ul>
                  <li><strong>Name:</strong> ${hackathonName}</li>
                  <li><strong>Updated Time:</strong> ${hackathonTime}</li>
                  <li><strong>Updated Location:</strong> ${hackathonLocation}</li>
              </ul>
              <p>We’ve made these changes to ensure a better experience for all participants. Please review the updated information and reach out if you have any questions.</p>
              <p>For more information, you can check the updated Hackathon details by clicking the link below:</p>
          </div>
          <div class="cta">
              <a href=${linkHackathon} target="_blank">View Updated Hackathon Details</a>
          </div>
          <div class="footer">
              <p>If you have any questions, feel free to contact us at hackathon_post@gmail.com</p>
              <p>Thank you for your enthusiasm and participation!</p>
          </div>
      </div>
  </body>
  </html>`;
};
