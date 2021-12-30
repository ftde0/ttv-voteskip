# ttv-voteskip

!voteskip for Twitch.

---

**ttv-voteskip** connects to your Twitch chat via a WebSocket and listens to chat messages.

When "!voteskip" is sent, it is counted and logged. Once the number of voteskips matches the number in the config, a Next Track key is pressed, skipping a song if using a Media Player.

## Building

- Open **skip_song/** in Visual Studio, set a Build Configuration and build. Put the executable in your repo directory.

## Running

- Adjust **config.ini** to suit your needs.
- Start **twitch-chat.js** using node.