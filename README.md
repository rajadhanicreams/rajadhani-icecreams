# Rajadhani Ice Creams

## Development

Run `npm install` and `npm run dev`. Create `.env.local` using the Firebase web app configuration from Firebase Console → Project settings → General:

```text
VITE_FIREBASE_API_KEY=
VITE_FIREBASE_AUTH_DOMAIN=
VITE_FIREBASE_PROJECT_ID=
VITE_FIREBASE_APP_ID=
```

Restart Vite after changing the file. Configure the same values in your deployment environment before building.

## Firestore products

The website reads the `products` collection in Firestore once when it loads. If the collection cannot be read, is empty, or contains an invalid product, it shows the bundled menu and a notice instead. Product images and videos currently remain in `public/products`; the `image` and `video` fields can later contain Firebase Storage URLs.

Publish the rules in `firestore.rules` using the Firestore Rules tab. They allow public product reads and deny all client writes. Review the rules before publishing if the database is also used by other applications.

To create the existing eight products, authenticate locally with a Google account that has permission to write to the project using `gcloud auth application-default login`, then run:

```sh
npm run seed:products -- YOUR_FIREBASE_PROJECT_ID
```

The script uses Application Default Credentials and creates all eight documents in one batch. It fails without changing any documents if a product with the same ID already exists. The Google Cloud CLI must be installed separately. Do not put credentials in the repository or share them.

Each product has `name`, `note`, `image`, `video`, `color`, `accent`, a `theme` map (`background`, `text`, `muted`, `line`, `glow`), and a unique non-negative integer `order`. Update products through the Firebase Console or another trusted administrative tool.
