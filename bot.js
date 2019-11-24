const Discord = require("discord.js");
const client = new Discord.Client();
const fs = require("fs");
const config = require("./config.json");

client.login(config.token);

client.on("ready", () => {
  console.log("Joined all available servers.\nhttps://discordapp.com/oauth2/authorize?client_id=" + config.id + "&scope=bot");
  client.user.setGame('!ul 1+1|創作者:UL#1188')
});

function getSubstringIndex(str, substring, n) {
    var times = 0, index = null;
    while (times < n && index !== -1) {
        index = str.indexOf(substring, index+substring.length);
        times++;
    }
    return index;
}

client.on("message", (message) => {
  if ((!message.content.startsWith(config.prefix) && !message.content.toLowerCase().startsWith("ul.")) || message.author.bot) return;
  if (message.content.startsWith("ul.ping")) {
    message.channel.send("Pong!");
  } else if (message.content.startsWith("ul.invite")) {
    message.author.send("https://discordapp.com/oauth2/authorize?client_id=" + config.id + "&scope=bot");
    message.react("✔");
  } else if (message.content.startsWith("ul.server")) {
    message.author.send("https://discord.gg/Z9P4BCk");
    message.react("✔");
  } else if (message.content.toLowerCase().startsWith("ul.help")) {
    message.channel.send("```ul.help     顯示此資訊.\nul.ping     Pings 我.\nul.invite   邀請其他人去你現在的Discord何服器.\nul.server   邀請你去我何服器.\n\n" + config.prefix + "             前綴.\n+             加數(+).\n-             減數(-).\n*             (x).\n/             除數(÷).\n%             模除.\n\npow(x, y)     Raises x to the power of y.\nsqrt(x)       Square root of x.\nfloor(x)      Rounds x down to nearest integer.\nceil(x)       Rounds x up to nearest integer.```");
  } else if (message.content.startsWith(config.prefix)) {
    let calculate = "=" + message.content.toLowerCase().substring(config.prefix.length);
    if (isFinite(calculate.replace(/\=|\+|\-|\*|\/|\÷|\%|\(|\)|\,|\ |math.|pow|sqrt|round|floor|ceiling|ceil|pi|π|euler|absolute|abs|exp|logarithm|log|random|rand|rng/g,''))) {
      calculate = calculate.replace(/ /g, "").replace(/÷/g, "/").replace(/power|pow/g, "Math.pow").replace(/sqrt|squareroot/g, "Math.sqrt").replace(/round/g, "Math.round").replace(/floor/g, "Math.floor").replace(/ceiling|ceil/g, "Math.ceil").replace(/pi|π/g, "Math.PI").replace(/euler/g, "Math.E").replace(/absolute|abs/g, "Math.abs").replace(/exp/g, "Math.exp").replace(/logarithm|log/g, "Math.log").replace(/random|rand|rng/g, "Math.random()");/*.replace(/acos|arccosine/g, "Math.acos").replace(/asin|arcsine/g, "Math.asin").replace(/atan|arctangent|atan1|arctangent1/g, "Math.atan").replace(/atan2|arctangent2/g, "Math.atan2").replace(/cos|cosine/g, "Math.cos").replace(/sin|sine/g, "Math.sin").replace(/tan|tangent/g, "Math.tan")*/;
      if (calculate.replace(/[^%]/g, "").length > 0) {
        for (let i = 0; i < calculate.replace(/[^%]/g, "").length; i++) {
          while ((calculate[getSubstringIndex(calculate, "%", i+1) + 1] == "+" || calculate[getSubstringIndex(calculate, "%", i+1) + 1] == "-" || calculate[getSubstringIndex(calculate, "%", i+1) + 1] == "*" || calculate[getSubstringIndex(calculate, "%", i+1) + 1] == "/" || calculate[getSubstringIndex(calculate, "%", i+1) + 1] == "(" || calculate[getSubstringIndex(calculate, "%", i+1) + 1] == ")" || calculate[getSubstringIndex(calculate, "%", i+1) + 1] == "," || getSubstringIndex(calculate, "%", i+1) + 1 == calculate.length) && calculate.replace(/[^%]/g, "").length > 0) {
            for (let j = getSubstringIndex(calculate, "%", i+1); j > -1; j--) {
              if (calculate[j] == "=" || calculate[j] == "+" || calculate[j] == "-" || calculate[j] == "*" || calculate[j] == "/" || calculate[j] == "(" || calculate[j] == ")" || calculate[j] == ",") {
                calculate = calculate.substring(0, j+1) + (calculate.substring(j+1, getSubstringIndex(calculate, "%", i+1))/100) + calculate.substring(getSubstringIndex(calculate, "%", i+1)+1, calculate.length);
                break;
              }
            }
          }
        }
      }
      calculate =  calculate.replace(/=/g, "");
      if (isFinite(eval(calculate))) message.channel.send(eval(calculate));
    }
  }
});
