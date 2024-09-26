import { ApiClient, requests } from 'recombee-api-client';
import arr1 from './inte-1.js';
import arr2 from './inte-2.js';
import arr3 from './inte-3.js';
const client = new ApiClient(
  'hackadev-dev',
  'sm5J6wstSiT380OU1PC65CKKbKabs6fXB1asBYYKqZ6q2q6pOEgDmSZaKmGanFG4',
  { region: 'ap-se' },
);
function getRandomFormattedNumber(nx: number): string {
  const num: number = Math.floor(Math.random() * 1000) + 1;
  const formattedNum: string = num.toString().padStart(nx, '0');
  return formattedNum;
}
function getRandomTimestamp(startYear: number, endYear: number): number {
  const startDate = new Date(startYear, 0, 1).getTime(); // Ngày bắt đầu: 1/1/2016
  const endDate = new Date(endYear, 0, 1).getTime(); // Ngày kết thúc: 1/1/2025
  const randomTimestamp =
    Math.floor(Math.random() * (endDate - startDate)) + startDate;
  return randomTimestamp / 1000;
}

async function uploadItem() {
  const req = [];
  for (let index = 0; index < 20000; index++) {
    req.push(
      new requests.AddRating(
        `user-${getRandomFormattedNumber(4)}`,
        `item-${getRandomFormattedNumber(5)}`,
        Math.random() * 2 - 1,
        {
          cascadeCreate: true,
          timestamp: getRandomTimestamp(2016, 2024),
        },
      ),
    );
  }
  for (let index = 0; index < 20000; index++) {
    req.push(
      new requests.AddBookmark(
        `user-${getRandomFormattedNumber(4)}`,
        `item-${getRandomFormattedNumber(5)}`,
        {
          cascadeCreate: true,
          timestamp: getRandomTimestamp(2016, 2024),
        },
      ),
    );
  }
  for (let index = 0; index < 20000; index++) {
    req.push(
      new requests.SetViewPortion(
        `user-${getRandomFormattedNumber(4)}`,
        `item-${getRandomFormattedNumber(5)}`,
        Math.random(),
        {
          cascadeCreate: true,
          timestamp: getRandomTimestamp(2016, 2024),
        },
      ),
    );
  }
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
