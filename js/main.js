// TODO: check if browser supports local storage and if not use alternative

function init() {
	playlists = getAllPlaylists();
	player = new Player();
}

function getAllPlaylists() {
	// Get playlists from wherever they are stored
	// Using sample playlists_json file to simulate response
	return playlists_json;
}


$('#audio').on('loadeddata', function() {
	audio.currentTime = localStorage['currentTime'];
  $('.duration').html(formatTime(audio.duration));

	$('#audio').off('timeupdate');

	$('#audio').on('timeupdate', throttle(function() {
		track.updateProgress();
		localStorage['currentTime'] = audio.currentTime;
	}));
});


$('#audio').on('ended', function() {
	player.nextTrack();
});