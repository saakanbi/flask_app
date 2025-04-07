use securedb;
db.messages.insertMany([
  { text: "Hello from MongoDB, this is Team32 static page!" },
  { text: "This app uses HTTPS via Let's Encrypt" },
  { text: "Deployed securely with Ansible and Jenkins" }
]);