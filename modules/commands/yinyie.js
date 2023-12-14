module.exports.config = {
  name: "yinyie",
  version: "1.0.0",
  hasPermssion: 0,
  credits: "Shunny",
  description: "Random Yin Yie pics",
  commandCategory: "images",
  usages: "yinyie",
  cooldowns: 5,
  dependencies: {
    "request":"",
    "fs-extra":"",
    "axios":""
  }
    
};

module.exports.run = async({api,event,args,Users,Threads,Currencies}) => {
const axios = global.nodemodule["axios"];
const request = global.nodemodule["request"];
const fs = global.nodemodule["fs-extra"];
  var link = [

     "https://i.postimg.cc/9M33mS0p/image.jpg",
     "https://i.postimg.cc/J7k3vz9v/image.jpg",
     "https://i.postimg.cc/vTh5hcNN/image.jpg",
     "https://i.postimg.cc/vTh5hcNN/image.jpg",
     "https://i.postimg.cc/vmX1Cpz4/image.jpg",
     "https://i.postimg.cc/nrksvgPK/321101368-1076466257084284-4758060768680549055-n.jpg",
     "https://i.postimg.cc/nrksvgPK/321101368-1076466257084284-4758060768680549055-n.jpg",
     "https://i.postimg.cc/9Xtq5wQ4/326362339-440300741556227-6708255523606543443-n.jpg",
     "https://i.postimg.cc/HkKr4QBN/353614983-794734355517036-5012925943213679813-n.jpg",
     "https://i.postimg.cc/x1qkzsyH/355662199-794734342183704-6127676580214483860-n.jpg",
     "https://i.postimg.cc/7YKGbv7w/355898494-794734338850371-6707375255340696274-n.jpg",
     "https://i.postimg.cc/cJnrDrzL/357801755-803199148003890-524823540426304778-n.jpg",
     "https://i.postimg.cc/ydCW27qX/358373655-803199161337222-3859015879842163017-n.jpg",
     "https://i.postimg.cc/HWQbYPBk/376270606-838082904515514-8967680260559014867-n.jpg",
     "https://i.postimg.cc/6pQZh6w8/378347253-838019084521896-8603113621705220454-n.jpg",
     "https://i.postimg.cc/rFMxKCPC/381367386-841813094142495-5007980851279419150-n.jpg",
     "https://i.postimg.cc/QM2Wsp77/381408195-842968244026980-455068938139666945-n.jpg",
     "https://i.postimg.cc/DZQmTRnV/387006674-850104453313359-7305512184851091094-n.jpg",
     "https://i.postimg.cc/vZSV2RH3/391682347-852393073084497-6509025236733281159-n.jpg",
     "https://i.postimg.cc/KjFk3xJv/392887839-858018169188654-4763905425905631756-n.jpg",
     "https://i.postimg.cc/1tDVzf0j/397339565-862069332116871-8456169884575333370-n.jpg",
     "https://i.postimg.cc/q7hC9mN0/401534240-869772084679929-5438544111383798292-n.jpg",
     "https://i.postimg.cc/65cRR4ss/405569043-874852557505215-5590358430814142272-n.jpg",
     "https://i.postimg.cc/LX50KFz5/286080972-550825023241305-1814833077394052663-n.jpg",
     "https://i.postimg.cc/jjZkFSnB/287056801-550825039907970-7833905883794525660-n.jpg",
     "https://i.postimg.cc/s2VNmhxp/346041618-216358881131481-3197314446649634155-n.jpg",
     "https://i.postimg.cc/dtypVFgT/352761912-1242029583113600-4088181580355240684-n.jpg",
     "https://i.postimg.cc/rw2bdbLZ/357703719-799213601735778-4241069688748442046-n.jpg",
     "https://i.postimg.cc/qvcF2LJJ/359463950-804466651210473-1099466755634417661-n.jpg",
     "https://i.postimg.cc/NGVZtFCc/387000153-848466273477177-7989638541757889955-n.jpg"

    
    ];
      var callback = () => api.sendMessage({body:`Random YinYie pic\nNumber of photos: ${link.length}`,attachment: fs.createReadStream(__dirname + "/cache/1.jpg")}, event.threadID, () => fs.unlinkSync(__dirname + "/cache/1.jpg"), event.messageID);  
      return request(encodeURI(link[Math.floor(Math.random() * link.length)])).pipe(fs.createWriteStream(__dirname+"/cache/1.jpg")).on("close",() => callback()); 
    

}
  
