export const templateHTML = (
  type: string,
  linkOrOtp: string,
  fullname: string,
) => {
  const title = type === 'reset' ? 'Reset password' : 'Verify Your Email';
  const contentMessage =
    type === 'reset'
      ? 'You have requested a password reset. Please enter the code below within 10 minutes.'
      : 'Thank you for signing up! Please confirm your email address by clicking the button below.';
  const contentEmail =
    type === 'reset'
      ? `<p class="order-details">Mã của bạn là: </p>
        <p class="thank-you">${linkOrOtp}</p>`
      : `<div class="button">
        <a href=${linkOrOtp} target="_blank">Verify Email</a>
        </div>`;

  const footerMessage =
    type === 'reset'
      ? 'If you did not request a password reset, please ignore this email and contact us immediately.'
      : `If you didn't create an account, you can safely ignore this email.`;
  return `<!DOCTYPE html>
        <html lang="en">
        <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>${title}</title>
        <style>
            /* General Styles */
            body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 0;
            }

            .container {
            max-width: 600px;
            margin: 50px auto;
            background-color: #ffffff;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
            }

            h1 {
            color: #333333;
            text-align: center;
            }

            p {
            color: #666666;
            font-size: 16px;
            line-height: 1.6;
            }

            .button {
            display: block;
            width: 100%;
            text-align: center;
            margin: 30px 0;
            }

            a {
            background-color: #4CAF50;
            color: #ffffff;
            text-decoration: none;
            padding: 15px 25px;
            border-radius: 5px;
            font-size: 18px;
            font-weight: bold;
            display: inline-block;
            }

            a:hover {
            background-color: #45a049;
            }

            .footer {
            text-align: center;
            margin-top: 30px;
            color: #aaaaaa;
            font-size: 12px;
            }
        </style>
        </head>
        <body>
        <div class="container">
            <h1>${title}</h1>
            <p>Hi ${fullname},</p>
            <p>${contentMessage}</p>

            ${contentEmail}

            <p>${footerMessage}</p>

            <div class="footer">
            <p>&copy; 2024 Your Company. All rights reserved.</p>
            </div>
        </div>
        </body>
        </html>

    `;
};
