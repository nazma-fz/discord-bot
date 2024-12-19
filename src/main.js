
require('dotenv').config();
const {Client, IntentsBitField, EmbedBuilder, PermissionsBitField, AttachmentBuilder, Attachment} = require('discord.js');
const { GoogleGenerativeAI } = require("@google/generative-ai");




const client = new Client({
    intents : [
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMembers,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.MessageContent,
    ],
});



const quotes = require('../data/quotes.js');
const fs = require('fs');
const toxicWords = require('../data/toxicWords.js');
const genAI = new GoogleGenerativeAI(process.env.API_KEY);
const tenorKey = process.env.TENOR_KEY
const geminiPro = genAI.getGenerativeModel({ model: "gemini-pro" });
const geminiFlash = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
const path = require('path');

client.on('ready', (c) => {
  console.log(`${c.user.tag} is ready`);
})

client.on('messageCreate', async (message) => {

  if (toxicWords.checkToxicWords(message.content)) {

    if (message.author.bot) return;

    await message.delete();
    const warning = await message.channel.send(`${message.author} dilarang toxic`)
    
    const embed = new EmbedBuilder()
    .setColor('#df2c14')
    .setTitle(`${message.author.username} Was toxic`)
    .setDescription(`they said ${message.content} at ${message.channel.name}`)

    client.channels.cache.get('1310896908918718467').send({
      embeds : [embed]
    })
    
    setTimeout(()=>{
      warning.delete().
      catch (console.error)
    }, 5000)
    console.log(`${message.author.username} has said ${message.content}`);
   
   };

  if (message.mentions.has(client.user)) {
    
    if (message.content.includes('here')) {

      message.reply('Kalau mau aku baikan, dont ever tag me!!')

    } else if (message.content.includes('Here')){

      message.reply('Kalau mau aku baikan, dont ever tag me!!')

    }else if (message.content.includes('Assalamualaikum')){

      message.reply('Waalaikumsalam')
      
    }else if (message.content.includes('assalamualaikum')){

      message.reply('waalaikumsalam')
      
    }else {

      message.reply('Mana anjing anjing yang ngetag aku tadi?')
    }
  }

});




client.on('interactionCreate', async interaction => {
    if (!interaction.isCommand()) return;

    const { commandName } = interaction;

    if (commandName === 'ping')   {
        const timeTaken = Date.now() - interaction.createdTimestamp;

        await interaction.reply(`Pong! your latency is ${timeTaken}ms`);
        console.log(`${timeTaken}ms`);
        
    }

    if (interaction.commandName === 'ask') {

      await interaction.deferReply();

      const question = interaction.options.getString('question');
      const modelChoice = interaction.options.getString('model');

      try {
        let response;

        if (modelChoice === 'gemini-pro') {
          response = await geminiPro.generateContent(question)
        } else if (modelChoice === 'gemini-1.5-flash') {
          response = await geminiFlash.generateContent(question)
        }

        const result = response.response.text()

        if (result.length <= 2000) {
          await interaction.editReply(result);
        } else {
        
          const chunks = result.match(/.{1,2000}/g) || [];
          await interaction.editReply(chunks[0]);
          
          for (let i = 1; i < chunks.length; i++) {
            await interaction.followUp(chunks[i]);
          }
        }
  
        await console.log(`success generating answer\nquestion: ${question}\nusing: ${modelChoice}`);
      }
       catch (error) {
      console.error('Error generating response', error)
      }
  }

  if (interaction.commandName === 'quotes') {

    const authorChoice = interaction.options.getString('author');
    const quotePutu = quotes.quotesP();
    const quoteJidat = quotes.quotesJ();

    if (authorChoice === 'putu') {
    await interaction.reply(quotePutu);
    console.log(`success generating quote\nAuthor: ${authorChoice}\nQuote: ${quotePutu}\n`)
    } else {
      await interaction.reply(quoteJidat);
      console.log(`success generating quote\nAuthor: ${authorChoice}\nQuote: ${quoteJidat}\n`)
    }
  }

  if (interaction.commandName === 'image') {

    const imageFolder = path.join(__dirname, '../images');
        
    const imageFiles = fs.readdirSync(imageFolder)
        .filter(file => 
            file.endsWith('.png') || 
            file.endsWith('.jpg') || 
            file.endsWith('.jpeg') || 
            file.endsWith('.gif')
        );
    
    if (imageFiles.length === 0) {
        return interaction.reply('Tidak ada gambar dalam folder!');
    }
    
    
    const randomImage = imageFiles[Math.floor(Math.random() * imageFiles.length)];
    
    
    const imagePath = path.join(imageFolder, randomImage);
    
    const embed = new EmbedBuilder()
    .setColor('#0099ff')
    .setTitle('Here your image')
    .setImage(`attachment://${randomImage}`)
    
    interaction.reply({
      embeds : [embed],
      files: [imagePath]
    });
}
});

client.login(process.env.TOKEN);