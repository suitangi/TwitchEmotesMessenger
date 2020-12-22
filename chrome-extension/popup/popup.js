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


document.getElementById("replaceSwitch").parentElement.addEventListener('click', function() {
  updateReplace();
});
document.getElementById("optionsLink").addEventListener("click", function() {
  chrome.runtime.openOptionsPage();
});
