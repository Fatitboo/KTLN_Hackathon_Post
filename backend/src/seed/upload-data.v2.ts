import { ApiClient, requests } from 'recombee-api-client';
const client = new ApiClient(
  'hackadev-dev',
  'sm5J6wstSiT380OU1PC65CKKbKabs6fXB1asBYYKqZ6q2q6pOEgDmSZaKmGanFG4',
  { region: 'ap-se' },
);

async function uploadItem() {
  const req = [
    new requests.SetItemValues(
      'item-001',
      {
        name: 'Seam Miniapp Challenge',
        organization_name: 'Seam',
        location: 'Online',
        themes: ['Mobile', 'Music/Art', 'Web'],
        prize: 1050,
      },
      {
        cascadeCreate: true,
      },
    ),
    new requests.SetItemValues(
      'item-002',
      {
        name: 'Seam Miniapp Challenge v2',
        organization_name: 'Seam',
        location: 'Online',
        themes: ['Mobile', 'Music/Art', 'Web'],
        prize: 1050,
      },
      {
        cascadeCreate: true,
      },
    ),
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

uploadItem();
