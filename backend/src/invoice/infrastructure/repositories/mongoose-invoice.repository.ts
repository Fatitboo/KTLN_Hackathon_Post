import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { InvoiceRepository } from 'src/invoice/domain/repositories/invoice.repository';
import { InvoiceDocument } from '../schemas/invoice.schema';
import * as crypto from 'crypto';
import * as https from 'https';

export class MongooseInvoiceRepository implements InvoiceRepository {
  constructor(
    @InjectModel(InvoiceDocument.name)
    private readonly invoiceModel: Model<InvoiceDocument>,
  ) {}

  async payment(createInvoiceDTO: any) {
    //https://developers.momo.vn/#/docs/en/aiov2/?id=payment-method
    //parameters
    const partnerCode = 'MOMO';
    const accessKey = 'F8BBA842ECF85';
    const secretkey = 'K951B6PE1waDMi640xX08PD3vg6EkVlz';
    const requestId = partnerCode + new Date().getTime();
    const orderId = requestId;
    const orderInfo = 'pay with MoMo';
    const redirectUrl = 'http://localhost:5173/Seeker/brower-hackathons';
    const ipnUrl = 'http://localhost:3000/api/v1/users';
    // const ipnUrl = redirectUrl = "https://webhook.site/454e7b77-f177-4ece-8236-ddf1c26ba7f8";
    const amount = createInvoiceDTO?.price ?? '1000';
    const requestType = 'captureWallet';
    const extraData = ''; //pass empty value if your merchant does not have stores

    //before sign HMAC SHA256 with format
    //accessKey=$accessKey&amount=$amount&extraData=$extraData&ipnUrl=$ipnUrl&orderId=$orderId&orderInfo=$orderInfo&partnerCode=$partnerCode&redirectUrl=$redirectUrl&requestId=$requestId&requestType=$requestType
    const rawSignature =
      'accessKey=' +
      accessKey +
      '&amount=' +
      amount +
      '&extraData=' +
      extraData +
      '&ipnUrl=' +
      ipnUrl +
      '&orderId=' +
      orderId +
      '&orderInfo=' +
      orderInfo +
      '&partnerCode=' +
      partnerCode +
      '&redirectUrl=' +
      redirectUrl +
      '&requestId=' +
      requestId +
      '&requestType=' +
      requestType;
    //puts raw signature
    console.log('--------------------RAW SIGNATURE----------------');
    console.log(rawSignature);
    //signature
    const signature = crypto
      .createHmac('sha256', secretkey)
      .update(rawSignature)
      .digest('hex');
    console.log('--------------------SIGNATURE----------------');
    console.log(signature);

    //json object send to MoMo endpoint
    const requestBody = JSON.stringify({
      partnerCode: partnerCode,
      accessKey: accessKey,
      requestId: requestId,
      amount: amount,
      orderId: orderId,
      orderInfo: orderInfo,
      redirectUrl: redirectUrl,
      ipnUrl: ipnUrl,
      extraData: extraData,
      requestType: requestType,
      signature: signature,
      lang: 'en',
    });
    //Create the HTTPS objects
    const options = {
      hostname: 'test-payment.momo.vn',
      port: 443,
      path: '/v2/gateway/api/create',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(requestBody),
      },
    };
    return new Promise<string>((resolve, reject) => {
      const req = https.request(options, (res) => {
        let result = '';

        console.log(`Status: ${res.statusCode}`);
        console.log(`Headers: ${JSON.stringify(res.headers)}`);

        res.setEncoding('utf8');
        res.on('data', (body) => {
          result += body;
          console.log('Body: ');
          console.log(body);
          console.log('resultCode: ');
          console.log(JSON.parse(body).resultCode);
        });

        res.on('end', () => {
          console.log('No more data in response.');
          // Resolve the promise with the result when the request is complete
          const originalResponse = JSON.parse(result);

          // Create an object for additional information
          const additionalInfo = {
            ipnUrl: ipnUrl,
            redirectUrl: redirectUrl,
            orderInfo: orderInfo,
            // invoiceId: invoiceId,
          };

          // Add additional information to the original response
          originalResponse.additionalInfo = additionalInfo;

          // Resolve the promise with the modified JSON response
          resolve(JSON.stringify(originalResponse));
        });
      });

      req.on('error', (e) => {
        console.log(`Problem with request: ${e.message}`);
        // Reject the promise with the error if there is a problem with the request
        reject(e.message);
      });

      // Write data to the request body
      console.log('Sending....');
      req.write(requestBody);

      // End the request
      req.end();
    });
  }
  create(id: string, invoice: any): Promise<InvoiceDocument | null> {
    throw new Error('Method not implemented.');
  }
}
