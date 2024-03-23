const { Client, GatewayIntentBits, ActivityType, TextChannel } = require('discord.js');
require('dotenv').config();
const express = require('express');
const fs = require('fs');
const path = require('path');
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

/*const statusMessages = ["Watching Foxi Community","Listening to Shaf3ey","Playing 21redrum"];*/
exports.bot.client.once('ready', () => {
    console.log(`🙂 ${exports.bot.client.user.tag} is online`);

    let statusIndex = 0;

    setInterval(() => {
        exports.bot.client.user.setActivity(status[statusIndex]);

        // Increment the status index and reset to 0 if it exceeds the array length
        statusIndex = (statusIndex + 1) % status.length;
    }, 3000);
});

let status = [
    {
        name: "shaf3ey is here",
        type: ActivityType.Streaming,
        url: "https://www.youtube.com/watch?v=8y4pc-pGeh0"
    },
    {
        name: `${exports.bot.client.guilds.cache.reduce((a, g) => a + g.memberCount, 1)} Users`,
        type: ActivityType.Watching
    },
    {
        name: "Bot v1.0.0",
        type: ActivityType.Playing
    }
];

let currentIndex = 0;
const channelId = '';

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
  const currentStatus = statusMessages[currentIndex];
  const nextStatus = statusMessages[(currentIndex + 1) % statusMessages.length];

  client.user.setPresence({
    activities: [{ name: currentStatus, type: ActivityType.Custom}],
    status: 'dnd',
  });

  
  const textChannel = client.channels.cache.get(channelId);

  if (textChannel instanceof TextChannel) {
   
    textChannel.send(`Bot status is: ${currentStatus}`);
  } else {

  }

  currentIndex = (currentIndex + 1) % statusMessages.length;
}

client.once('ready', () => {
  console.log(`\x1b[36m%s\x1b[0m`, `|    ✅ Bot is ready as ${client.user.tag}`);
  console.log(`\x1b[36m%s\x1b[0m`, `|    ✨HAPPY NEW YEAR MY DEAR FAMILY`);
  console.log(`\x1b[36m%s\x1b[0m`, `|    ❤️WELCOME TO 2024`);
  updateStatusAndSendMessages();

  setInterval(() => {
    updateStatusAndSendMessages();
  }, 10000);
});

login();


