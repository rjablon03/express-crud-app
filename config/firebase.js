const admin = require("firebase-admin");

const serviceAccount = require("./firebaseServiceAccount.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();
db.settings({ignoreUndefinedProperties: true});

module.exports = db;
