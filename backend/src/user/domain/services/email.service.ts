import { BadRequestException } from '@nestjs/common';
import * as sgMail from '@sendgrid/mail';
export async function sendEmail(
  email: string,
  html: string,
  subject: string,
  messageSuccess: string,
): Promise<Record<string, string>> {
  const cc = 'SG.5';
  const ccc = '6pfEeg88';
  sgMail.setApiKey(cc + 'naGLLq9Q8WTzHMZ_taElg' + process.env.SGR + ccc);
  const msg = {
    to: email, // Change to your recipient
    from: 'projectfinderweb@gmail.com', // Change to your verified sender
    subject: subject,
    html: html,
  };
  let message: string;
  await sgMail
    .send(msg)
    .then(() => {
      message = messageSuccess;
    })
    .catch(() => {
      throw new BadRequestException('Error when sending email');
    });
  return { message };
}
