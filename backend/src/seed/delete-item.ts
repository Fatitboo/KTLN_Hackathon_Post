import { ApiClient, requests } from 'recombee-api-client';
const client = new ApiClient(
  'hackadev-dev',
  'sm5J6wstSiT380OU1PC65CKKbKabs6fXB1asBYYKqZ6q2q6pOEgDmSZaKmGanFG4',
  { region: 'ap-se' },
);

async function deleteItem() {
  const req = [
    new requests.DeleteItem('item-001'),
    new requests.DeleteItem('item-002'),
  ];

  await client
    .send(new requests.Batch(req))
    .then((result) => {
      console.log(result);
    })
    .catch((error) => {
      console.error(error);
    });
}

deleteItem();
