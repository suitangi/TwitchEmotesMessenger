function updateReplace() {
  if (document.getElementById("replaceSwitch").checked) {
    document.getElementById("replaceSwitch").checked = false;
    chrome.storage.local.set({
      emote_replace: "off"
    }, function() {});
  } else {
    document.getElementById("replaceSwitch").checked = true;
    chrome.storage.local.set({
      emote_replace: "on"
    }, function() {});
  }
}

function updateHover() {
  if (document.getElementById("hoverSwitch").checked) {
    document.getElementById("hoverSwitch").checked = false;
    chrome.storage.local.set({
      emote_hover: "off"
    }, function() {});
  } else {
    document.getElementById("hoverSwitch").checked = true;
    chrome.storage.local.set({
      emote_hover: "on"
    }, function() {});
  }
}

chrome.storage.local.get({
  emote_replace: 'on'
}, function(data) {

  if (data.emote_replace == 'off') {
    document.getElementById("replaceSwitch").checked = false;
  } else {
    console.log("test");
    document.getElementById("replaceSwitch").checked = true;
  }
});

chrome.storage.local.get({
  emote_hover: 'on'
}, function(data) {

  if (data.emote_hover == 'off') {
    document.getElementById("hoverSwitch").checked = false;
  } else {
    console.log("test");
    document.getElementById("hoverSwitch").checked = true;
  }
});

document.getElementById("replaceSwitch").parentElement.addEventListener('click', function() {
  updateReplace();
});

document.getElementById("hoverSwitch").parentElement.addEventListener('click', function() {
  updateHover();
});
