//loads css file
function loadCSS(file) {
  var link = document.createElement("link");
  link.href = chrome.extension.getURL(file + '.css');
  link.id = file;
  link.type = "text/css";
  link.rel = "stylesheet";
  document.getElementsByTagName("head")[0].appendChild(link);
}

//unloads css file
function unloadCSS(file) {
  var cssNode = document.getElementById(file);
  cssNode && cssNode.parentNode.removeChild(cssNode);
}

//load the emotes json into a global variable
function saveJson(emotesJson){
  window.emotesJson = emotesJson;
}

//Classchanged function for the MutationObserver for active conversation
function classChanged() {
	var act = document.getElementsByClassName("_1ht2")[0];
    window.convoSwitchOB.observe(act, {
      attributes: true,
      attributeFilter: ["class"]
    });

  //implementing the observe for newMessageob
  var newMOBSetter = setInterval(function(){
      if(document.getElementsByClassName("_2k8v")[0] != null){
        window.newMesssageOb.observe(document.getElementsByClassName("_2k8v")[0].nextSibling ,{
          childList: true,
          subtree: true
        });
        clearInterval(newMOBSetter);
      }
  }, 100);
}

//tags all emotes
function tagEmotes(){
  if(window.messageList.length <= 0){
    setTimeout(function(){tagEmotes();}, 500);
  }
  else{
    //for message text
    for(i = 0; i < window.messageList.length; i++){
      if(!window.messageList[i].hasAttribute("EmoteChecked")){
        for (j = 0; j < window.emotesJson.emotes.length; j++){
          // console.log(window.messageList[i].innerHTML + ", " + window.emotesJson.emotes[j].name + ', ' + window.emotesJson.emotes[j].url);
          var emoteName = window.emotesJson.emotes[j].name;
          var emoteURL = window.emotesJson.emotes[j].url;

          var str = window.messageList[i].innerHTML;


          if (str == emoteName){ //Message is one emote
            var res = "<span class=\"emote\">" + emoteName + "<img class=\"textHover\" style=\"display:none\" src=\"" + emoteURL + "\"></span>";
            window.messageList[i].innerHTML = res;
            break;
          }
          else if (str.includes(emoteName)){ //Message is multiple emotes
            //spaces
            var res = str.replace(new RegExp(emoteName + " ", 'g'), "<span class=\"emote\">" + emoteName + "<img class=\"textHover\" style=\"display:none\" src=\"" + emoteURL + "\"></span> ");
            res = res.replace(new RegExp(" " + emoteName, 'g'), " <span class=\"emote\">" + emoteName + "<img class=\"textHover\" style=\"display:none\" src=\"" + emoteURL + "\"></span>");
            //new lines
            res = res.replace(new RegExp(emoteName + "\n", 'g'), "<span class=\"emote\">" + emoteName + "<img class=\"textHover\" style=\"display:none\" src=\"" + emoteURL + "\"></span>\n");
            res = res.replace(new RegExp("\n" + emoteName, 'g'), "\n<span class=\"emote\">" + emoteName + "<img class=\"textHover\" style=\"display:none\" src=\"" + emoteURL + "\"></span>");
            //punctuation
            res = res.replace(new RegExp(" " + emoteName + "!", 'g'), " <span class=\"emote\">" + emoteName + "<img class=\"textHover\" style=\"display:none\" src=\"" + emoteURL + "\"></span>!");
            res = res.replace(new RegExp(" " + emoteName + "\\.", 'g'), " <span class=\"emote\">" + emoteName + "<img class=\"textHover\" style=\"display:none\" src=\"" + emoteURL + "\"></span>.");
            res = res.replace(new RegExp(" " + emoteName + ",", 'g'), " <span class=\"emote\">" + emoteName + "<img class=\"textHover\" style=\"display:none\" src=\"" + emoteURL + "\"></span>,");
            window.messageList[i].innerHTML = res;
          }
        }
        //set the emotechecked attribute
        var att = document.createAttribute("EmoteChecked");
        window.messageList[i].setAttributeNode(att);
      }
    }
  }
}

//replace all emotes
function replaceEmotes(){
  // console.log("Emotes Successfully Replaced");
  if(window.messageList.length <= 0){
    setTimeout(function(){replaceEmotes();}, 500);
  }
  else{
    //for quoted text
    var quoteList = document.getElementsByClassName("_4k7e _4ik4 _4ik5");
    for(i = 0; i < quoteList.length; i++){
      if(!quoteList[i].hasAttribute("EmoteChecked")){
        for (j = 0; j < window.emotesJson.emotes.length; j++){
          // console.log(quoteList[i].innerHTML + ", " + window.emotesJson.emotes[j].name + ', ' + window.emotesJson.emotes[j].url);
          var emoteName = window.emotesJson.emotes[j].name;
          var emoteURL = window.emotesJson.emotes[j].url;

          var str = quoteList[i].innerHTML;


          if (str == emoteName){ //Message is one emote
            var res = "<img src=\"" + emoteURL + "\" alt=\"" + emoteName + "\"></span>";
            quoteList[i].innerHTML = res;
            break;
          }
          else if (str.includes(emoteName)){ //Message is multiple emotes
            //spaces
            var res = str.replace(new RegExp(emoteName + " ", 'g'), "<img src=\"" + emoteURL + "\" alt=\"" + emoteName + "\"> ");
            res = res.replace(new RegExp(" " + emoteName, 'g'), " <img src=\"" + emoteURL + "\" alt=\"" + emoteName + "\">");
            //new lines
            res = res.replace(new RegExp(emoteName + "\n", 'g'), "<img src=\"" + emoteURL + "\" alt=\"" + emoteName + "\">\n");
            res = res.replace(new RegExp("\n" + emoteName, 'g'), "\n<img src=\"" + emoteURL + "\" alt=\"" + emoteName + "\">");
            //punctuation
            res = res.replace(new RegExp(" " + emoteName + "!", 'g'), " <img src=\"" + emoteURL + "\" alt=\"" + emoteName + "\">!");
            res = res.replace(new RegExp(" " + emoteName + "\\.", 'g'), " <img src=\"" + emoteURL + "\" alt=\"" + emoteName + "\">.");
            res = res.replace(new RegExp(" " + emoteName + ",", 'g'), " <img src=\"" + emoteURL + "\" alt=\"" + emoteName + "\">,");
            quoteList[i].innerHTML = res;
          }
        }
        //set the emotechecked attribute
        var att = document.createAttribute("EmoteChecked");
        quoteList[i].setAttributeNode(att);
      }
    }

    //for message text
    for(i = 0; i < window.messageList.length; i++){
      if(!window.messageList[i].hasAttribute("EmoteChecked")){
        for (j = 0; j < window.emotesJson.emotes.length; j++){
          // console.log(window.messageList[i].innerHTML + ", " + window.emotesJson.emotes[j].name + ', ' + window.emotesJson.emotes[j].url);
          var emoteName = window.emotesJson.emotes[j].name;
          var emoteURL = window.emotesJson.emotes[j].url;

          var str = window.messageList[i].innerHTML;


          if (str == emoteName){ //Message is one emote
            var res = "<span class=\"emote\" data=\"" + emoteName + "\"><img src=\"" + emoteURL + "\" alt=\"" + emoteName + "\"></span>";
            window.messageList[i].innerHTML = res;
            break;
          }
          else if (str.includes(emoteName)){ //Message is multiple emotes
            //spaces
            var res = str.replace(new RegExp(emoteName + " ", 'g'), "<span class=\"emote\" data=\"" + emoteName + "\"><img src=\"" + emoteURL + "\" alt=\"" + emoteName + "\"></span> ");
            res = res.replace(new RegExp(" " + emoteName, 'g'), " <span class=\"emote\" data=\"" + emoteName + "\"><img src=\"" + emoteURL + "\" alt=\"" + emoteName + "\"></span>");
            //new lines
            res = res.replace(new RegExp(emoteName + "\n", 'g'), "<span class=\"emote\" data=\"" + emoteName + "\"><img src=\"" + emoteURL + "\" alt=\"" + emoteName + "\"></span>\n");
            res = res.replace(new RegExp("\n" + emoteName, 'g'), "\n<span class=\"emote\" data=\"" + emoteName + "\"><img src=\"" + emoteURL + "\" alt=\"" + emoteName + "\"></span>");
            //punctuation
            res = res.replace(new RegExp(" " + emoteName + "!", 'g'), " <span class=\"emote\" data=\"" + emoteName + "\"><img src=\"" + emoteURL + "\" alt=\"" + emoteName + "\"></span>!");
            res = res.replace(new RegExp(" " + emoteName + "\\.", 'g'), " <span class=\"emote\" data=\"" + emoteName + "\"><img src=\"" + emoteURL + "\" alt=\"" + emoteName + "\"></span>.");
            res = res.replace(new RegExp(" " + emoteName + ",", 'g'), " <span class=\"emote\" data=\"" + emoteName + "\"><img src=\"" + emoteURL + "\" alt=\"" + emoteName + "\"></span>,");
            window.messageList[i].innerHTML = res;
          }
        }
        //set the emotechecked attribute
        var att = document.createAttribute("EmoteChecked");
        window.messageList[i].setAttributeNode(att);
      }
    }
  }
}


///////////////////////////////////Start the scripts///////////////////////////////////
//load the storage variables
//get the emote_replace
chrome.storage.local.get({emote_replace: 'on'}, function(data) {
      if(data.emote_replace == 'off'){
        window.emoteReplace = false;
      }
      else{
        window.emoteReplace = true;
      }
      //get emote_hover
      chrome.storage.local.get({emote_hover: 'on'}, function(data) {
            if(data.emote_hover == 'off'){
              window.emoteHover = false;
            }
            else{
              window.emoteHover = true;
            }
            console.log(window.emoteReplace);
            console.log(window.emoteHover);
            if(window.emoteHover){
              console.log("ok");
              if(window.emoteReplace){
                loadCSS('emoteHover')
                console.log("ok2");
              }
              else{
                loadCSS('txtHover');
                console.log("ok1");
              }
            }
      });
});

//to load at the start of the DOM after it has been dynamically built
var start = setInterval(function(){
    console.log("Twitch Emotes Loading...");

    if(document.getElementsByClassName("_6-xl _6-xm").length > 0){

      //set the messageList HTMLCollection
      window.messageList = document.getElementsByClassName("_3oh- _58nk");

      //get the emotes json
      const jsonUrl = chrome.runtime.getURL('emotes.json');
      fetch(jsonUrl)
          .then((response) => response.json()) //assuming file contains json
          .then((json) => saveJson(json));

      //MutationObserver for switching conversations
      window.convoSwitchOB = new MutationObserver(function() {
        setTimeout(function(){
          if(window.emoteReplace){
            replaceEmotes();
          }
          else {
            tagEmotes();
          }
        }, 500);
        classChanged();
      });
      var act = document.getElementsByClassName("_1ht2")[0];
      window.convoSwitchOB.observe(act, {
        attributes: true,
        attributeFilter: ["class"]
      });


      //the mutation observer for new messages
      window.newMesssageOb = new MutationObserver(function() {
        setTimeout(function(){
          if(window.emoteReplace){
            replaceEmotes();
          }
          else {
            tagEmotes();
          }
        }, 500);
      });

      //implementing the observe for newMessageob
      var newMOBSetter = setInterval(function(){
          if(document.getElementsByClassName("_2k8v")[0] != null){
            window.newMesssageOb.observe(document.getElementsByClassName("_2k8v")[0].nextSibling ,{
              childList: true,
              subtree: true
            });
            clearInterval(newMOBSetter);
          }
      }, 100);

      //clears the start loop after successfully starting
      clearInterval(start);
  }

}, 1000);
