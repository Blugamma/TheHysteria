import { REST } from 'node:@discordjs/rest';
import { WebSocketManager } from 'node:@discordjs/ws';
import { GatewayDispatchEvents, GatewayIntentBits, InteractionType, MessageFlags, Client } from 'node:@discordjs/core';
export async function onRequest(context) {
    
    const rest = new REST({ version: '10' }).setToken('NjM5NTYxOTYxNDQwMjgwNTkw.GGPR5J.zo392IP6syC2_qVkZrw4C4w7WCQ7RZIWpIXxUY');

    const gateway = new WebSocketManager({
        token: 'NjM5NTYxOTYxNDQwMjgwNTkw.GGPR5J.zo392IP6syC2_qVkZrw4C4w7WCQ7RZIWpIXxUY',
        intents: GatewayIntentBits.GuildMessages | GatewayIntentBits.MessageContent,
        rest,
    });
    
    const client = new Client({ rest, gateway });
    // Create a new Discord client


    client.on(GatewayDispatchEvents.InteractionCreate, async ({ data: interaction, api }) => {
        if (interaction.type !== InteractionType.ApplicationCommand || interaction.data.name !== 'ping') {
            return;
        }
    
        await api.interactions.reply(interaction.id, interaction.token, { content: 'Pong!', flags: MessageFlags.Ephemeral });
    });
    // Listen for the ready event
    client.once(GatewayDispatchEvents.Ready, () => console.log('Ready!'));
    // Start the WebSocket connection.
    gateway.connect();

    return new Response('Discord bot is running!');
  }
