require('dotenv').config();
const { REST, Routes, Options, ApplicationCommandOptionType, ApplicationCommand, PermissionFlagsBits, SlashCommandBuilder } = require('discord.js');

const commands = [
  {
    name: 'ask',
    description: 'ask something with GeminiAI?',
    options:[
      {
        name: 'model',
        description: 'choose the model you wanna use',
        type: ApplicationCommandOptionType.String,
        required: true,
        choices: [
          {
            name: 'Gemini Pro',
            value: 'gemini-pro',
            description: 'designed for tasks with high complexity, such as writing emails and poetry'
          },
          {
            name: 'Gemini Flash',
            value: 'gemini-1.5-flash',
            description: 'designed for answering the simple question with fast response and efficiency'
          }
        ]
      },

      {
        name: 'question',
        description: 'text your question',
        type: ApplicationCommandOptionType.String,
        required: true,
      }
    ]
  },
  {
    name: 'ping',
    description: 'test your latency',
  },
  {
    name: 'quotes',
    description: "motivated yourself with some quotes",
    options:[
      {
        name: 'author',
        description: 'choose the author',
        type: ApplicationCommandOptionType.String,
        required: true,
        choices:
        [
          {name: 'Putu Prima',
          value: 'putu',
          },
          
          {name: 'Jidat',
          value: 'jidat',
            }
        ]
      }

    ]
  },
  {
    name: 'mute',
    description : "mute the inapproiacte member",
    options:[
      {name: 'member',
        description: 'mute member you want to',
        type: ApplicationCommandOptionType.Mentionable,
        required: true
      },
      {name: 'reason',
        description: 'the reason why you wanna mute them',
        type: ApplicationCommandOptionType.String,
        required: true
      }
    ]
  },
  {
    name: 'ban',
    description : "ban the inapproiacte member",
    options:[
      {name: 'member',
        description: 'ban member you want to',
        type: ApplicationCommandOptionType.Mentionable,
        required: true
      },
      {name: 'reason',
        description: 'the reason why you wanna ban them',
        type: ApplicationCommandOptionType.String,
        required: true
      }
    ]
  }
];

module.exports = commands;