import { ApiClient, requests } from 'recombee-api-client';
import arr from './Hackathons_data.js';
const client = new ApiClient(
  'hackadev-dev',
  'sm5J6wstSiT380OU1PC65CKKbKabs6fXB1asBYYKqZ6q2q6pOEgDmSZaKmGanFG4',
  { region: 'ap-se' },
);
function dateStringToTimestamp(dateString: string): number {
  const date = new Date(dateString);
  return date.getTime() / 1000; // Returns the timestamp in milliseconds
}
function stringToArray(str: string): string[] {
  // Replace single quotes with double quotes and remove surrounding brackets
  const formattedStr = str.replace(/'/g, '"').replace(/^\[|\]$/g, '');

  // Parse the formatted string into an array
  return JSON.parse(`[${formattedStr}]`);
}
async function uploadItem() {
  const req = [];
  arr.forEach((item) => {
    req.push(
      new requests.SetItemValues(
        item.item_id,
        {
          name: item.name,
          location: item.location,
          currency: item.currency,
          prize: item.price,
          participants: item.participants,
          organization_name: item.organizer,
          period: item.period,
          invite: item.invite.toLowerCase() === 'true',
          themes: stringToArray(item.tags),
          logo_link: item.logo_link,
          start_date: dateStringToTimestamp(item.start_date),
          end_date: dateStringToTimestamp(item.end_date),
        },
        { cascadeCreate: true },
      ),
    );
  });

  await client
    .send(new requests.Batch(req))
    .then((result) => {
      console.log(result);
    })
    .catch((error) => {
      console.error(error);
    });
}

uploadItem();
