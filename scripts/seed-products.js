import { applicationDefault, initializeApp } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import { localProducts } from '../src/products.js';

const projectId = process.argv[2];
if (!projectId) {
  console.error('Usage: npm run seed:products -- <firebase-project-id>');
  process.exit(1);
}

const app = initializeApp({ credential: applicationDefault(), projectId });
const db = getFirestore(app);
const batch = db.batch();

localProducts.forEach((product, order) => {
  const id = product.image.split('/').pop().replace(/\.webp$/, '');
  batch.create(db.collection('products').doc(id), { ...product, order });
});

try {
  await batch.commit();
  console.log(`Created ${localProducts.length} products in ${projectId}.`);
} catch (error) {
  console.error('Could not create products. No existing product documents were overwritten:', error);
  process.exitCode = 1;
}
