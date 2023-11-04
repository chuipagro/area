import { Client } from "discord.js";
import { config } from "./config";
import { deployCommands } from "./deploy-commands";
import express from "express";

export const client = new Client({
  intents: ["Guilds", "GuildMessages", "DirectMessages"],
});

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

  client.channels.fetch(req.body["body"]['channel_id']).then((message) => {

    if (message != null && req.body["body"]['message'] != undefined) {
      message.send({content: `Got request from an action \n${req.body["body"]['message']}\n`});
      console.log("Send");
    } else {
      console.log("Error !");
    }

  });
  res.send("success");
})

app.listen(9999, () => {
  console.log(`Server listening`);
});
