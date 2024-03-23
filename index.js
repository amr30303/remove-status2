const { Client, GatewayIntentBits, ActivityType, TextChannel } = require('discord.js');
require('dotenv').config();
const express = require('express');
const client = new Client({
  intents: Object.keys(GatewayIntentBits).map((a) => {
    return GatewayIntentBits[a];
  }),
});

const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send('YaY Your Bot Status Changed✨');
});

app.listen(port, () => {
  console.log(`🔗 Listening to shaf3ey: http://localhost:${port}`);
  console.log(`🔗 Powered By shaf3ey`);
});

let statusIndex = 0;

const status = [
  {
    name: "shaf3ey is here",
    type: 'STREAMING', // Using string instead of ActivityType
    url: "https://www.youtube.com/watch?v=8y4pc-pGeh0"
  },
  {
    name: "Watching Foxi Community", // Example status
    type: 'WATCHING' // Using string instead of ActivityType
  },
  {
    name: "Playing 21redrum", // Example status
    type: 'PLAYING' // Using string instead of ActivityType
  }
];

async function login() {
  try {
    await client.login(process.env.TOKEN);
    console.log(`\x1b[36m%s\x1b[0m`, `|    🐇 Logged in as ${client.user.tag}`);
  } catch (error) {
    console.error('Failed to log in:', error);
    process.exit(1);
  }
}

function updateStatusAndSendMessages() {
  const currentStatus = status[statusIndex];

  // Set presence using client.user.setPresence
  client.user.setPresence({
    activities: [{ name: currentStatus.name, type: currentStatus.type }],
    status: 'dnd'
  });

  // Increment status index and reset if it exceeds array length
  statusIndex = (statusIndex + 1) % status.length;
}

client.once('ready', () => {
  console.log(`\x1b[36m%s\x1b[0m`, `|    ✅ Bot is ready as ${client.user.tag}`);
  console.log(`\x1b[36m%s\x1b[0m`, `|    ✨HAPPY NEW YEAR MY DEAR FAMILY`);
  console.log(`\x1b[36m%s\x1b[0m`, `|    ❤️WELCOME TO 2024`);
  updateStatusAndSendMessages();

  setInterval(() => {
    updateStatusAndSendMessages();
  }, 3000); // Adjusted interval to 3000 milliseconds
});

login();
