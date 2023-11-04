import { Client, GatewayIntentBits, TextChannel } from 'discord.js';
import { config } from "./config";
import { deployCommands } from "./deploy-commands";
import express from "express";

const client = new Client({ intents: [GatewayIntentBits.GuildMessages] });

client.once("ready", () => {
  console.log("Discord bot is ready.");
});

client.on("guildCreate", async (guild) => {
  await deployCommands({ guildId: guild.id });
});

client.login(config.DISCORD_TOKEN);

const app = express();

app.use(express.json())
app.get('/', (req, res) => {
  res.send("Area Discord Bot Is Alive !");
})

app.post('/sendMessage', (req, res) => {
  client.channels.fetch(req.body['channel_id']).then((channel) => {

    if (channel != null && req.body['message'] != undefined) {
      channel.send({content: `Got request from an action \n${req.body['message']}\n`});
      console.log("Send");
      res.send("success");
    } else {
      console.log("Error !");
      res.send("FAIL");
    }

  });
})

app.listen(9999, () => {
  console.log(`Server listening`);
});
