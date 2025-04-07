use securedb;

const messages = [
  { sender: "Team32", content: "Hello from MongoDB, this is Team32 static page!" },
  { sender: "Team32", content: "This app uses HTTPS via Let's Encrypt" },
  { sender: "Team32", content: "Deployed securely with Ansible and Jenkins" }
];

messages.forEach(msg => {
  db.messages.updateOne(
    { content: msg.content },
    { $setOnInsert: msg },
    { upsert: true }
  );
});

print("✅ Upserted Team32 messages with sender/content format.");
const users = [
  { username: "admin", password: "admin" },
  { username: "user", password: "user" }
];  