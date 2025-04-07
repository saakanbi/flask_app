use securedb;

// Explicitly create collections (optional)
db.createCollection("messages");
db.createCollection("users");
db.createCollection("sessions");
db.createCollection("tokens");
db.createCollection("products");
db.createCollection("orders");
db.createCollection("carts");

// Seed messages
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
print("✅ Inserted new messages (no duplication).");

// Seed default user
const user = {
  username: "admin",
  password: "admin123"
};
db.users.updateOne(
  { username: user.username },
  { $setOnInsert: user },
  { upsert: true }
);
print("✅ Inserted new user (no duplication).");
// Seed default session