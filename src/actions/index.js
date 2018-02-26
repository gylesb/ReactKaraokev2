import * as types from "./../constants/ActionTypes";
import v4 from 'uuid/v4';

// Takes the title from our form as the argument
export function fetchSongId(title) {
  return function (dispatch) {
    // Creates a local ID with UUID
    const localSongId = v4();
    dispatch(requestSong(title, localSongId));
    // Replaces spaces with underscores (API can't handle spaces)
    title = title.replace(' ', '_');
    // Returns the result of the fetch() function contacting the API endpoint
    return fetch('http://api.musixmatch.com/ws/1.1/track.search?&q_track=' + title + '&page_size=1&s_track_rating=desc&apikey=711d08cc4ff670c0e84b0501b9c6088b').then(
      // Retrieves JSON response from API:
      response => response.json(),
      // Prints error to the console if call is unsuccessful:
      error => console.log('An error occured. Please try again later.', error))
      // Waits until code preceding it finishes to run and returns value from first then() s
      .then(function(json) {
      console.log('API RESPONSE!', json)
    });
  };
}

export const nextLyric = (currentSongId) => ({
  type: types.NEXT_LYRIC,
  currentSongId
});

export const restartSong = (currentSongId) => ({
  type: types.RESTART_SONG,
  currentSongId
});

export const requestSong = (title, localSongId) => ({
  type: types.REQUEST_SONG,
  title,
  songId: localSongId
});
