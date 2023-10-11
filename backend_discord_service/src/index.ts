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

const CHANNEL_ID = "1161200916326789191";

client.login(config.DISCORD_TOKEN);

const app = express();

app.use(express.json())
app.post('/', (req, res) => {
  client.channels.fetch(CHANNEL_ID).then((x) => {
    res.send("Area Discord Bot Is Alive !");
  });

})

app.post('/spotify', (req, res) => {
  client.channels.fetch(CHANNEL_ID).then((x) => {
    if (x != null && req.body["action_service"] != 'spotify') {
      x.send({content: `error`});
    }
    if (x != null && req.body["action_details"]["type_action"] == "Nouvelle Sortie") {
      x.send({content: `Got request from an action \n${JSON.stringify(req.body["action_details"]["type_action"])}\n${JSON.stringify(req.body["action_details"]["data"]["albums"])}`});
      console.log("Send");
    }
  });

  res.send("success");
})

app.listen(9999, () => {
  console.log(`Server listening`);
});
