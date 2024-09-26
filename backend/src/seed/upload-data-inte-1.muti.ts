import { ApiClient, requests } from 'recombee-api-client';
import arr1 from './inte-1.js';
import arr2 from './inte-2.js';
import arr3 from './inte-3.js';
const client = new ApiClient(
  'hackadev-dev',
  'sm5J6wstSiT380OU1PC65CKKbKabs6fXB1asBYYKqZ6q2q6pOEgDmSZaKmGanFG4',
  { region: 'ap-se' },
);

async function uploadItem() {
  const req = [];
  arr1.forEach((item) => {
    req.push(
      new requests.AddDetailView(item.userId, item.movieId, {
        cascadeCreate: true,
        timestamp: item.timestamp,
      }),
    );
  });
  arr2.forEach((item) => {
    req.push(
      new requests.AddPurchase(item.userId, item.movieId, {
        cascadeCreate: true,
        timestamp: item.timestamp,
      }),
    );
  });
  arr3.forEach((item) => {
    req.push(
      new requests.AddCartAddition(item.userId, item.movieId, {
        cascadeCreate: true,
        timestamp: item.timestamp,
      }),
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
