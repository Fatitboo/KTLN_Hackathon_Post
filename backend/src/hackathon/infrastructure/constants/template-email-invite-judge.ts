export const templateInviteJudgeHTML = (
  linkInvite: string,
  linkHackathon: string,
  senderName: string,
  receiverName: string,
  senderEmail: string,
  hackathonName: string,
  hackathonTime: string,
  hackathonLocation: string,
) => {
  return `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Hackathon Invitation</title>
        <style>
            body {
                font-family: Arial, sans-serif;
                line-height: 1.6;
                margin: 0;
                margin-top: 10px;
                padding: 0;
                background-color: #f9f9f9;
            }
            .email-container {
                max-width: 600px;
                margin: 0 auto;
                background: #ffffff;
                border: 1px solid #e0e0e0;
                border-radius: 8px;
                overflow: hidden;
                box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            }
            .header {
                background: #2c3e50;
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
                <h1>Join Our Team Hackathon As Judge!</h1>
            </div>
            <div class="content">
                <h2>Hello ${receiverName},</h2>
                <p>Are you ready to showcase your skills, solve challenging problems, and collaborate with like-minded individuals? We're thrilled to invite you to participate in our upcoming Hackathon event!</p>
                <p><strong>Event Details:</strong></p>
                <ul>
                    <li><strong>Name: </strong> ${hackathonName}</li>
                    <li><strong>Time: </strong> ${hackathonTime}</li>
                    <li><strong>Location:</strong> ${hackathonLocation}</li>
                </ul>
                <p>This is your chance to win amazing prizes, gain exposure, and network with industry professionals. Don't miss out!</p>
                To learn more about the competition click <a href=${linkHackathon} target="_blank">this link</a>
                <p >User ${senderName}(with mail ${senderEmail}) has invited you to join the team to participate in this Hackathon!</p>
            </div>

            <div class="cta">
                <a href=${linkInvite} target="_blank">Accept now</a>
            </div>
            <div class="footer">
                <p>If you have any questions, feel free to contact us at hackathon_post@gmail.com</p>
                <p>We look forward to seeing you there!</p>
            </div>
        </div>
    </body>
    </html>

    `;
};
