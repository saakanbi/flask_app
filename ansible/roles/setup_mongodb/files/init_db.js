use securedb;
db.messages.insertMany([
  { text: "Hello from MongoDB! This is team32 statis page"},
  { text: "This app uses HTTPS via Let's Encrypt" },
  { text: "Deployed securely with Ansible and Jenkins" }
]);