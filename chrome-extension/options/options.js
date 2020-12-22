//toggle function for the emote replacement switch
function updateHover() {
  if (document.getElementById("onoffSwitch").checked) {
    document.getElementById("onoffSwitch").checked = false;
    chrome.storage.local.set({
      emote_replace: "off"
    }, function() {});
  } else {
    document.getElementById("onoffSwitch").checked = true;
    chrome.storage.local.set({
      emote_replace: "on"
    }, function() {});
  }
}

//function to add custom emote
function addCustomEmote() {
  let name = document.getElementById('customName').value;
  let link = document.getElementById('customLink').value;
  window.activeEmotes.add(name);
  window.customlist.push({
    "name": name,
    "url": link,
    "enabled": true
  });

  showCustomList();
  document.getElementById('addCustom').setAttribute("disabled", "");
  chrome.storage.local.set({
    customlist: window.customlist
  }, function() {});

  document.getElementById('customName').value = "";
  document.getElementById('customLink').value = "";
}


//fucntion to render and custom list
function showCustomList() {
  let cmotes = window.customlist;
  cmotes.sort((a, b) => (a.name < b.name) ? -1 : 1);
  let res = ""
  for (var i = 0; i < cmotes.length; i++) {
    if (cmotes[i].enabled) {
      res += '<label class="container"></span><span class="emoteImg"><img src="' +
        cmotes[i].url + '">  </span><span class="emoteText">' + cmotes[i].name + '</span><input type="checkbox" checked="checked"><span class="checkmark"></span><div class="customX">\u00D7</div></label>';
    } else {
      res += '<label class="container" style="filter: contrast(0.3) brightness(1.5);"></span><span class="emoteImg"><img src="' +
        cmotes[i].url + '">  </span><span class="emoteText">' + cmotes[i].name + '</span><input type="checkbox"><span class="checkmark"></span><div class="customX">\u00D7</div></label>';
    }
  }
  document.getElementById('customEDiv').innerHTML = res;
  let clist = document.getElementById('customEDiv').children;
  for (var i = 0; i < clist.length; i++) {

    //add click listener
    clist[i].addEventListener('click', function() {
      if (this.children[2].checked) {
        for (var j = 0; j < window.customlist.length; j++) {
          if (window.customlist[j].name == this.children[1].innerText) {
            window.customlist[j].enabled = false;
            break;
          }
        }
        window.activeEmotes.delete(this.children[1].innerText);
        this.children[2].checked = false;
        this.style = "filter: contrast(0.3) brightness(1.5);"
      } else {
        for (var j = 0; j < window.customlist.length; j++) {
          if (window.customlist[j].name == this.children[1].innerText) {
            window.customlist[j].enabled = true;
            break;
          }
        }
        window.activeEmotes.add(this.children[1].innerText);
        this.children[2].checked = true;
        this.style = ""
      }
      chrome.storage.local.set({
        customlist: window.customlist
      }, function() {});
    });

    clist[i].children[4].addEventListener('click', function(){
      for (var j = 0; j < window.customlist.length; j++) {
        if (window.customlist[j].name == this.parentElement.children[1].innerText) {
          window.customlist.splice(j, 1);
          break;
        }
      }
      chrome.storage.local.set({
        customlist: window.customlist
      }, function() {
      });
      this.parentElement.remove();
    })
  }
}


//function to show/unshow error message for custom emotes
function showError(err) {
  if (err == "") {
    document.getElementById('customError').style = "display: none;";
  } else {
    document.getElementById('customError').innerText = err;
    document.getElementById('customError').style = "";
  }
}

//customImg oninput validation
function validateCustom() {
  let img = document.getElementById('customImg');
  if (document.getElementById('customName').value == "") {
    showError("Invalid emote name");
  } else if (window.activeEmotes.has(document.getElementById('customName').value)) {
    showError("Duplicate emote name, please remove/disable emotes with the same name");
  } else if (document.getElementById('customLink').value != "") {
    img.src = document.getElementById('customLink').value;
    img.onerror = function() {
      document.getElementById('addCustom').setAttribute("disabled", "");
      showError("Invalid image link");
    }
    img.onload = function() {
      if (this.complete && this.naturalHeight !== 0) {
        document.getElementById('addCustom').removeAttribute('disabled');
        showError("");
      } else {
        document.getElementById('addCustom').setAttribute("disabled", "");
        showError("Invalid image/link");
      }
    }
  } else {
    document.getElementById('addCustom').setAttribute("disabled", "");
    img.src = "error";
    showError("No image link");
  }
} //https://cdn.discordapp.com/emojis/784476766135123989.png

//load the emotes json into a global variable
function saveJson(emotesJson) {
  window.emotesJson = emotesJson;
  window.emotesJson.emotes.sort((a, b) => (a.name < b.name) ? -1 : 1);

  let res = ""
  for (var i = 0; i < window.emotesJson.emotes.length; i++) {
    res += '<label class="container"></span><span class="emoteImg"><img src="' + window.emotesJson.emotes[i].url + '">  </span><span class="emoteText">' + window.emotesJson.emotes[i].name + '</span><input type="checkbox"><span class="checkmark"></label>';
  }
  document.getElementById('defaultEDiv').innerHTML = res;

  let clist = document.getElementById('defaultEDiv').children;
  for (var i = 0; i < clist.length; i++) {

    //set the value and style
    if (!window.banlist.has(clist[i].children[1].innerText)) {
      clist[i].children[2].checked = true;
      clist[i].style = "";
      window.activeEmotes.add(clist[i].children[1].innerText);
    } else {
      clist[i].style = "filter: contrast(0.3) brightness(1.5);"
      window.activeEmotes.delete(clist[i].children[1].innerText);
    }

    //add click listener
    clist[i].addEventListener('click', function() {
      if (this.children[2].checked) {
        window.banlist.add(this.children[1].innerText);
        window.activeEmotes.delete(this.children[1].innerText);
        this.children[2].checked = false;
        this.style = "filter: contrast(0.3) brightness(1.5);"
      } else {
        window.banlist.delete(this.children[1].innerText);
        window.activeEmotes.add(this.children[1].innerText);
        this.children[2].checked = true;
        this.style = ""
      }
      chrome.storage.local.set({
        banlist: Array.from(window.banlist)
      }, function() {});
    });
  }
}

//get the data for on off
chrome.storage.local.get({
  emote_replace: 'on',
  banlist: [],
  customlist: []
}, function(data) {

  if (data.hover == 'off') {
    document.getElementById("onoffSwitch").checked = false;
  } else {
    document.getElementById("onoffSwitch").checked = true;
  }
  window.banlist = new Set(data.banlist);
  window.customlist = data.customlist;
  window.activeEmotes = new Set([]);

  console.log(window.banlist);
  console.log(window.customlist);

  showCustomList();

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
});

// listeners for various elements
document.getElementById("onoffSwitch").parentElement.addEventListener('click', function() {
  updateHover();
});

document.getElementById("addCustom").addEventListener('click', function() {
  if (!this.hasAttribute('disabled')) {
    addCustomEmote();
  }
});

document.getElementById('customLink').oninput = function() {
  validateCustom();
}
document.getElementById('customName').oninput = function() {
  validateCustom();
}

document.getElementById('customLink').addEventListener("keyup", function(e) {
  console.log(document.getElementById('customLink').value);
  validateCustom();
});

document.getElementById('customName').addEventListener("keyup", function(e) {
  console.log(document.getElementById('customLink').value);
  validateCustom();
});
