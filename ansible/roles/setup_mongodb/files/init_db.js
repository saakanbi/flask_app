use securedb;

// 💥 Delete all existing messages first
db.messages.deleteMany({});

// 📨 Now insert fresh messages
db.messages.insertMany([
  { sender: "Team32", content: "Hello from MongoDB! This is team32 static page" },
  { sender: "Team32", content: "This app uses HTTPS via Let's Encrypt" },
  { sender: "Team32", content: "Deployed securely with Ansible and Jenkins" }
]);

print("✅ Inserted messages with sender + content format.");
