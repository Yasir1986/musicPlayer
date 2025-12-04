# React Test - Music Player

This repo contains three MP3 files in the public folder. Your task is to build a simple player for the tracks. We expect candidates to spend 1-2hrs on the test. Please submit your solution by opening a PR on the repository you have been given access to.

## Requirements

The player should:

- Show a list of all three available tracks.
- Allow a track to be selected from this list.
- At minimum, your player should support a single play/pause button that toggles play/pause of the currently selected track.
- When paused, selecting a new track should NOT automatically start playing.
- When playing, selecting a new track should start playing from the beginning.
- Feel free to add more controls **if you want** e.g. volume. Don't feel pressured to do this. We'd rather see a small set of robust features than many that aren't as polished.
- Any components you build should have associated unit test(s)

We hope we've covered all the necessary requirements. Normally you'd be able to go back and forth to clarify things. For the purpose of the test though, if you feel anything has been left ambiguous or unclear in the above, use your best judgement and provide details in your PR comments.

## Current Components

We've left skeleton components in to help start your solution off. Feel free to add more components and structure things as you see fit.

- Track - Shows the name of a track and can be clicked to select it.
- Player - Should render the audio element referencing the currently selected track.
- PlayPauseButton - Toggles play and pause of the currently selected track.

## Styles

Style the player however you like. You don't need to be an amazing designer but we would like to see examples of a usable interface. At minimum, you need to visually distinguish the selected track form all other tracks. Some styles have been included. Feel free to change or remove these.

## Tip: Audio Element

The HTML `audio` element can be used to play the MP3 files. The element's `src` attribute can be used to reference the MP3 file. The element also has `play()` and `pause()` methods which start and stop the track. You can find more information on [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/audio)

## Music Attribution

- Battle of the Dragons by [17406877](https://pixabay.com/users/17406877-17406877/)
- Forest Lullaby by [Lesfm](https://pixabay.com/users/lesfm-22579021/)
- Sedative by [Lesfm](https://pixabay.com/users/lesfm-22579021/)