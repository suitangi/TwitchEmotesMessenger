//loads css file
function loadCSS(file) {
  let link = document.createElement("link");
  link.href = chrome.extension.getURL(file + '.css');
  link.id = file;
  link.type = "text/css";
  link.rel = "stylesheet";
  document.getElementsByTagName("head")[0].appendChild(link);
}

//unloads css file
function unloadCSS(file) {
  let cssNode = document.getElementById(file);
  cssNode && cssNode.parentNode.removeChild(cssNode);
}

//load the emotes json into a global variable
function saveJson(emotesJson) {
  window.emotesJson = emotesJson;

  console.log(window.banlist);

  //remove those from the banlist
  for (var i = 0; i < window.emotesJson.emotes.length; i++) {
    if (window.banlist.has(window.emotesJson.emotes[i].name)) {
      window.emotesJson.emotes.splice(i, 1);
      i -= 1;
    }
  }

  //add from custom list
  for (var i = 0; i < window.customlist.length; i++) {
    if (window.customlist[i].enabled) {
      window.emotesJson.emotes.push(window.customlist[i]);
    }
  }

  window.emotesJson.emotes.sort((a, b) => (a.name < b.name) ? 1 : -1);
  if (window.emoteReplace)
    replaceEmotes();
}

//Classchanged function for the MutationObserver for active conversation
function classChanged() {
  let act = document.getElementsByClassName("i224opu6")[0];
  window.convoSwitchOB.disconnect();
  window.convoSwitchOB.observe(act, {
    attributes: true,
    attributeFilter: ["class"]
  });

  // implementing the observe for newMessageob
  let newMOBSetter = setInterval(function() {
    if (document.querySelectorAll('[aria-label="Messages"]')[0] != null &&
      window.currentMessageBoard != document.querySelectorAll('[aria-label="Messages"]')[0]) {
      window.currentMessageBoard = document.querySelectorAll('[aria-label="Messages"]')[0]
      window.newMessageOb.observe(window.currentMessageBoard, {
        childList: true,
        subtree: true
      });
      clearInterval(newMOBSetter);
    }
  }, 100);
}

function emote2Html(emoteName, emoteURL, str) {
  let res = str, pas = "";

  //in a word by itself
  while (res != pas){
    pas = res;
    res = res.replace(new RegExp(" " + emoteName + " ", 'g'), " <span class=\"emote\" data=\"" + emoteName + "\"><img class=\"emoteImg\" src=\"" + emoteURL + "\" alt=\"" + emoteName + "\" title=\"" + emoteName + "\"></span> ");
  }
  //beginning or end of string
  res = res.replace(new RegExp("^" + emoteName + " ", 'g'), "<span class=\"emote\" data=\"" + emoteName + "\"><img class=\"emoteImg\" src=\"" + emoteURL + "\" alt=\"" + emoteName + "\" title=\"" + emoteName + "\"></span> ");
  res = res.replace(new RegExp(" " + emoteName + "$", 'g'), " <span class=\"emote\" data=\"" + emoteName + "\"><img class=\"emoteImg\" src=\"" + emoteURL + "\" alt=\"" + emoteName + "\" title=\"" + emoteName + "\"></span>");
  //new lines
  res = res.replace(new RegExp(emoteName + "\n", 'g'), "<span class=\"emote\" data=\"" + emoteName + "\"><img class=\"emoteImg\" src=\"" + emoteURL + "\" alt=\"" + emoteName + "\"></span>\n");
  res = res.replace(new RegExp("\n" + emoteName, 'g'), "\n<span class=\"emote\" data=\"" + emoteName + "\"><img class=\"emoteImg\" src=\"" + emoteURL + "\" alt=\"" + emoteName + "\"></span>");
  //punctuation
  res = res.replace(new RegExp(" " + emoteName + "!", 'g'), " <span class=\"emote\" data=\"" + emoteName + "\"><img class=\"emoteImg\" src=\"" + emoteURL + "\" alt=\"" + emoteName + "\" title=\"" + emoteName + "\"></span>!");
  res = res.replace(new RegExp(" " + emoteName + "\\.", 'g'), " <span class=\"emote\" data=\"" + emoteName + "\"><img class=\"emoteImg\" src=\"" + emoteURL + "\" alt=\"" + emoteName + "\" title=\"" + emoteName + "\"></span>.");
  res = res.replace(new RegExp(" " + emoteName + ",", 'g'), " <span class=\"emote\" data=\"" + emoteName + "\"><img class=\"emoteImg\" src=\"" + emoteURL + "\" alt=\"" + emoteName + "\" title=\"" + emoteName + "\"></span>,");
  return res;
}

//replace all emotes
function replaceEmotes() {
  // console.log("Emotes Successfully Replaced");
  if (window.messageList.length <= 0) {
    setTimeout(function() {
      replaceEmotes();
    }, 500);
  } else {
    //for quoted text
    let quoteList = document.getElementsByClassName("osnr6wyh");
    for (i = 0; i < quoteList.length; i++) {
      if (!quoteList[i].hasAttribute("EmoteChecked")) {

        let ele = quoteList[i];
        let str = ele.innerText;
        let res = str;

        for (j = 0; j < window.emotesJson.emotes.length; j++) {
          // console.log(quoteList[i].innerHTML + ", " + window.emotesJson.emotes[j].name + ', ' + window.emotesJson.emotes[j].url);
          let emoteName = window.emotesJson.emotes[j].name;
          let emoteURL = window.emotesJson.emotes[j].url;

          if (str == emoteName) { //Message is one emote
            res = "<span class=\"emote\" data=\"" + emoteName + "\"><img class=\"emoteImg\" src=\"" + emoteURL + "\" alt=\"" + emoteName + "\" title=\"" + emoteName + "\"></span>";
            break;
          } else if (str.includes(emoteName)) { //Message is multiple words
            res = emote2Html(emoteName, emoteURL, res);
          }
        }
        //set the innerHTML
        ele.innerHTML = ele.innerHTML.replace(ele.innerText, res);
        //set the emotechecked attribute
        let att = document.createAttribute("EmoteChecked");
        quoteList[i].setAttributeNode(att);
      }
    }

    //for message text
    for (i = 0; i < window.messageList.length; i++) {
      if (!window.messageList[i].hasAttribute("EmoteChecked")) {

        let ele = window.messageList[i];
        let str = ele.innerText;
        let res = str;

        for (j = 0; j < window.emotesJson.emotes.length; j++) {
          // console.log(window.messageList[i].innerHTML + ", " + window.emotesJson.emotes[j].name + ', ' + window.emotesJson.emotes[j].url);
          let emoteName = window.emotesJson.emotes[j].name;
          let emoteURL = window.emotesJson.emotes[j].url;

          if (str == emoteName) { //Message is one emote
            res = "<span class=\"emote\" data=\"" + emoteName + "\"><img class=\"emoteImg\" src=\"" + emoteURL + "\" alt=\"" + emoteName + "\" title=\"" + emoteName + "\"></span>";
            break;
          } else if (str.includes(emoteName)) { //Message is multiple words
            res = emote2Html(emoteName, emoteURL, res);
          }
        }
        //set the innerHTML
        ele.innerHTML = ele.innerHTML.replace(ele.innerText, res);
        //set the emotechecked attribute
        let att = document.createAttribute("EmoteChecked");
        window.messageList[i].setAttributeNode(att);
      }
    }
  }
}


///////////////////////////////////Start the scripts///////////////////////////////////
//load the storage variables
//get the emote_replace
chrome.storage.local.get({
  emote_replace: 'on',
  banlist: [],
  customlist: []
}, function(data) {
  if (data.emote_replace == 'off') {
    window.emoteReplace = false;
  } else {
    window.emoteReplace = true;
  }
  window.banlist = new Set(data.banlist);
  window.customlist = data.customlist;
});

//to load at the start of the DOM after it has been dynamically built
let start = setInterval(function() {
  console.log("Twitch Emotes Loading...");

  //wait for react to build messenger page only load after a message element has been detected
  if (document.querySelectorAll('[data-testid="message-container"]').length > 0) {

    //set the messageList HTMLCollection
    window.messageList = document.getElementsByClassName("ljqsnud1");

    //get the emotes json
    //first try the server
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "https://raw.githubusercontent.com/suitangi/TwitchEmotesMessenger/master/chrome-extension/emotes.json", true);
    xhr.onreadystatechange = function() {
      if (xhr.readyState == 4 && this.status == 200) {
        //when readyState is 4 and status is 200, the response is ready
        var resp = JSON.parse(xhr.responseText);
        console.log("Successfully connected to cloud emote list");
        saveJson(resp);
      } else if (xhr.status == 404) {
        //can't connect to server for updated json, use local json
        console.log("Couldn't connect to cloud emote list, using local list (might have less emotes).");
        const jsonUrl = chrome.runtime.getURL('emotes.json');
        fetch(jsonUrl)
          .then((response) => response.json()) //assuming file contains json
          .then((json) => saveJson(json));
      }
    }
    xhr.send();

    //load css styles for the emotes
    loadCSS('emote');

    //MutationObserver for switching conversations
    window.convoSwitchOB = new MutationObserver(function() {
      setTimeout(function() {
        if (window.emoteReplace)
          replaceEmotes();
        classChanged();
      }, 500);
    });
    let act = document.getElementsByClassName("i224opu6")[0];
    window.convoSwitchOB.observe(act, {
      attributes: true,
      attributeFilter: ["class"]
    });


    //the mutation observer for new messages
    window.newMessageOb = new MutationObserver(function() {
      setTimeout(function() {
        if (window.emoteReplace)
          replaceEmotes();
      }, 500);
    });

    //implementing the observe for newMessageob
    let newMOBSetter = setInterval(function() {
      window.currentMessageBoard = document.querySelectorAll('[aria-label="Messages"]')[0];
      if (document.querySelectorAll('[aria-label="Messages"]')[0] != null) {
        window.newMessageOb.observe(window.currentMessageBoard, {
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
