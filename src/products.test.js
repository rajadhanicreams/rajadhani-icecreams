import { test } from 'node:test';
import assert from 'node:assert/strict';
import { localProducts, normalizeProducts } from './products.js';

test('orders Firestore products without mutating the input', () => {
  const products = [{ ...localProducts[1], order: 1 }, { ...localProducts[0], order: 0 }];
  assert.deepEqual(normalizeProducts(products).map((product) => product.name), [localProducts[0].name, localProducts[1].name]);
  assert.equal(products[0].order, 1);
});

test('rejects empty, incomplete and ambiguously ordered product collections', () => {
  assert.throws(() => normalizeProducts([]));
  assert.throws(() => normalizeProducts([{ ...localProducts[0], order: 0, theme: {} }]));
  assert.throws(() => normalizeProducts([{ ...localProducts[0], order: 0 }, { ...localProducts[1], order: 0 }]));
});
