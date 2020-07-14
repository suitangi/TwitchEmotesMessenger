
# TwitchEmotesMessenger
This project is a browser extension that replaces Twitch and some BTTV emote texts to actual image emotes for Facebook's Messenger on [messenger.com](messenger.com).

![Screenshot](https://raw.githubusercontent.com/suitangi/TwitchEmotesMessenger/master/screenshots/SC4.png)


## Usage
There are two ways to use this project:

#### Chrome Webstore
Download the published extension here:
- [Chrome](https://chrome.google.com/webstore/detail/twitch-emotes-for-messeng/hmpnchjkbdnnjpcojmdghmjcmiiemdla) ([support page](https://suitangi.github.io/TwitchEmotesMessenger/support/))

#### Manual Download
Clone this repository:
```
git clone https://github.com/suitangi/TwitchEmotesMessenger.git
```
or download the latest version in [Releases](https://github.com/suitangi/TwitchEmotesMessenger/releases)


Just make sure to turn on developer options in chrome://extensions/ and 'Load Unpacked' and then select the folder where `manifest.json` is located.

This option allows you to [use your own emotes lists](#using-your-own).

## Options
To change options, click on the extension button on the right side of the URL bar.
![Screenshot](https://raw.githubusercontent.com/suitangi/TwitchEmotesMessenger/master/screenshots/SC1.png)

- Emote replacement: Replaces text in messages as emotes (images).
- Hover: Hover over emote for the text OR hover over the text for emote (if emote replacement is off).
*Both emote replacement and hover are on by default*

### Emote Replacement On & Hover On
![Screenshot](https://raw.githubusercontent.com/suitangi/TwitchEmotesMessenger/master/screenshots/SC2.png)

### Emote Replacement Off & Hover On
![Screenshot](https://raw.githubusercontent.com/suitangi/TwitchEmotesMessenger/master/screenshots/SC3.png)

## Emote List
Not every emote is support (especially since many are channel-specific/have many duplicate forms).
The list of supported emotes can be found [here](https://suitangi.github.io/TwitchEmotesMessenger/support/emotes-list).

### Using Your Own
The emotes.json has a simple structure like this:
```json
{"emotes": [
  {"name": "emote1", "url":"https://link.to.emote.1.file"},
  {"name": "emote2", "url":"https://link.to.emote.2.file"},
  {"name": "emote3", "url":"https://link.to.emote.3.file"}
  ]
}
```
Where the `emotes` list can have any number of emotes listed. See the default [ `emotes.json`](https://raw.githubusercontent.com/suitangi/TwitchEmotesMessenger/master/chrome-extension/emotes.json) for an example.

## Other Information
**This is a third party extension and is not affiliated with Facebook Messenger or Twitch. All emotes and images belong to their respective owners.**

### Browser permissions
- messenger.com: To change the appearnce (show emotes) of messenger.com
- storage: To store your preferences

## Changelog
```
‣ 1.3.1 Added more recently relevant emotes. Uses remote data to fetch emotes so it can be updated more often.
‣ 1.3.0 Added popup menu, options for hover and on off, optimizations
‣ 1.2.2 Optimization, improved hover for emotes
‣ 1.2.1 Emotes now show up correctly in quotes
‣ 1.2.0 Added most Twitch Global emotes
‣ 1.1.3 Fixed single emote message not showing up bug
‣ 1.1.2 Alt text and Hover title for emotes
‣ 1.1.1 Icons added and bug fixes
‣ 1.1.0 Initial Release
‣ 1.0.0 Beta Release
```
