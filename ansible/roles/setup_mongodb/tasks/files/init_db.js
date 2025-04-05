use securedb;
db.messages.insertMany([
  { text: "Hello from MongoDB!" },
  { text: "Secure DevOps app deployed with verified artifact!" }
  { text: "This app uses HTTPS via Let's Encrypt" },
  { text: "Deployed securely with Ansible and Jenkins" }
]);
