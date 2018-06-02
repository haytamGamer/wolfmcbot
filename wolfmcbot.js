const Discord = require('discord.js')
const bot = new Discord.Client()
const config = require('./config.json')
const { prefix, token } = require('./config.json')


bot.on('ready', function () {
    console.log("Je suis connecté !")
    bot.user.setStatus('Online')
    bot.user.setGame('W!Help')


})
bot.on("guildMemberAdd", function(member) {
    let role = member.guild.roles.find("name", "Guest");
    member.addRole(role).catch(console.error);

})

bot.on('guildMemberRemove', member => {
    member.guild.channels.get('439792255365021696').setName(`Total Users: ${member.guild.memberCount}`)
    let humans = member.guild.members.filter(m => !m.user.bot).size;
    member.guild.channels.get('439793088001736725').setName(`Member Count: ${humans}`)
    let bots = member.guild.members.filter(m => m.user.bot).size;
    member.guild.channels.get('439793716052623361').setName(`Bot Count: ${bots}`)
});

bot.on('ready', function() {
    bot.user.setActivity('W!help')
    bot.user.setAvatar('Wolf')


})

bot.on('message', message => {


    if (!message.content.startsWith(prefix) || message.author.bot) return

const args = message.content.slice(prefix.length).split(' ')
const command = args.shift().toLowerCase();


if (command === 'avatar') {
    if (!message.mentions.users.size) {
        return message.channel.send(`Your avatar: ${message.author.displayAvatarURL}`);
    }

    const avatarList = message.mentions.users.map(user => {
        return `${user.username}'s avatar: ${user.displayAvatarURL}`;
});

    message.channel.send(avatarList)
}

if (command === "help") {
    message.channel.send({embed: {
            color: 0xff0000,
            fields: [{
                name: "Command Is: ↓",
                value:
                "`1.` W!help\n`2.` W!avatar \n`3.` W!ping \n`4.` W!react \n`5.` W!server \n`6.` W!me  \n`7.` W!fruits "
            }]
    }
    })
}

if (command === 'ping') {
    let startTime = Date.now();
    var embed = new Discord.RichEmbed()
        .setColor("RANDOM")
        .addField("Ping local:", `**:heartbeat: Ping = ${Math.round(Date.now() - startTime)} ms**`, true)
        .addField("API:", `**:stopwatch: Ping = ${Math.round(bot.ping).toFixed(0)} ms**`, true)
        .setFooter("Requête envoyé par " + message.author.username, message.author.avatarURL)

    message.channel.send('*Calcul du ping...*').then(m => m.edit(embed))

}

if (command === 'fruits') {
    message.react('🍎');
    message.react('🍊');
    message.react('🍇');
}


if (command === `react`){
    message.react('437156715214012418')
    message.react('👌')
    message.react('😄')
}

if (command === 'server'){
    message.channel.send(`Name : \n ${message.guild.name}\n\nMembers: \n ${message.guild.memberCount}`)
}



if (command === 'me') {
        message.channel.send(`Your Name Is : ${message.author.username}`)
}

if(command === "say") {
    // makes the bot say something and delete the message. As an example, it's open to anyone to use. 
    // To get the "message" itself we join the `args` back into a string with spaces: 
    const sayMessage = args.join("Welcome To WolfMC Injoy :D !");
    // Then we delete the command message (sneaky, right?). The catch just ignores the error with a cute smiley thing.
    message.delete().catch(O_o=>{}); 
    // And we get the bot to say the thing: 
    message.channel.send(xD);
}

})

bot.login(token);
