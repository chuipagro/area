import { REST, Routes } from "discord.js";
import { config } from "./config";

const rest = new REST({ version: "10" }).setToken(config.DISCORD_TOKEN);

type DeployCommandsProps = {
  guildId: string;
};

/**
 * This function deploy all commands bot
 *
 */
export async function deployCommands({ guildId }: DeployCommandsProps) {
  try {
    console.log("Started refreshing application (/) commands.");

    await rest.put(
      Routes.applicationGuildCommands(config.DISCORD_CLIENT_ID, guildId),
      {
        body: null,
      }
    );

    console.log("Successfully reloaded application (/) commands.");
  } catch (error) {
    console.error(error);
  }
}
