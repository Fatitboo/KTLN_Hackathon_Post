export const templateConfirmRegisterHTML = (
  linkHackathon: string,
  receiverName: string,
  hackathonName: string,
  hackathonTime: string,
  hackathonLocation: string,
  themes: string,
) => {
  return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Hackathon Registration Confirmation</title>
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
            <h1>Successful Hackathon Registration!</h1>
        </div>
        <div class="content">
            <h2>Hello ${receiverName},</h2>
            <p>Thank you for registering to participate in our upcoming Hackathon! We are excited to have you join us and can’t wait to see the amazing projects you and your team will come up with.</p>
            <p><strong>Event Details:</strong></p>
            <ul>
                <li><strong>Name: </strong> ${hackathonName}</li>
                <li><strong>Time: </strong> ${hackathonTime}</li>
                <li><strong>Location:</strong> ${hackathonLocation}</li>
                <li><strong>Theme:</strong> ${themes}</li>
            </ul>
            <p>Your registration is now confirmed! We’ll be in touch with any additional information you may need as the event draws nearer.</p>
            <p>In the meantime, feel free to visit our event page <a href=${linkHackathon} target="_blank">here</a> for more details.</p>
            <p>We look forward to seeing you at the event!</p>
        </div>

        <div class="footer">
            <p>If you have any questions, feel free to contact us at hackathon_post@gmail.com</p>
            <p>Good luck and have fun!</p>
        </div>
    </div>
</body>
</html>
`;
};
