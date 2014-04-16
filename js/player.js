var Player = new Class({

	init: function() {
		var that = this;
		audio = document.getElementById('audio');

		var playlistid = localStorage['playlist'] || null;
		var trackid = localStorage['track'] || null;

		if (playlistid && trackid) {
			track = new Track(playlistid, trackid);
			track.load();
			currentlyPlayingTrack = trackid;
			currentlyPlayingPlaylist = playlistid;
			playlist = new Playlist(playlistid);
			playlist.show();
		} else {
			this.switchTrack(0, 0);
			audio.pause();
			playlist = new Playlist(0);
			playlist.show();
		}
		this.loadPlaylists(playlists);
	},

	loadPlaylists: function(playlists) {
		for (var i = 0; i < playlists.length; i++) {
			playlistHtml = "<div class='playlist' onclick='player.switchPlaylist(" + i + ")'>" + playlists[i].name + "</div>";
			$('.playlist-list').append(playlistHtml);
		};
	},

	switchPlaylist: function(playlistid) {
		playlist.clear();
		playlist = new Playlist(playlistid);
		playlist.show();
	},

	switchTrack: function(playlistid, trackid, click) {
		this.clear();
		track = new Track(playlistid, trackid);
		track.load();
		currentlyPlayingTrack = trackid;
		currentlyPlayingPlaylist = playlistid;

		if (click == 1) {
			this.playPause();
		}	else if (localStorage['playing'] === 'true') {
			this.playPause();
		}
	},
	
	playPause: function() {
		if (audio.paused) {
			audio.play();
			localStorage['playing'] = true;
			$('#play-pause').removeClass('play-btn');
			$('#play-pause').addClass('pause-btn');
			$('#play-pause').empty();
			$('#play-pause').html('&#10072;&#10072;');
		} else {
			audio.pause();
			localStorage['playing'] = false;
			$('#play-pause').removeClass('pause-btn');
			$('#play-pause').addClass('play-btn');
			$('#play-pause').empty();
			$('#play-pause').html('&#9654;');
		}
	},

	nextTrack: function() {
		if (playlist.tracks[parseInt(currentlyPlayingTrack) + 1]) {
			this.switchTrack(parseInt(currentlyPlayingPlaylist), parseInt(currentlyPlayingTrack) + 1);
		} else if (!playlist.tracks[parseInt(currentlyPlayingTrack) + 1] && playlists[parseInt(currentlyPlayingPlaylist) + 1]) {
			this.switchTrack(parseInt(currentlyPlayingPlaylist + 1), 0);
		} else {
			this.switchTrack(0, 0);
		}
	},

	prevTrack: function() {
		if (playlists[currentlyPlayingPlaylist].tracks[parseInt(currentlyPlayingTrack) - 1]) {
			this.switchTrack(parseInt(currentlyPlayingPlaylist), parseInt(currentlyPlayingTrack) - 1);
		} else if (!playlists[currentlyPlayingPlaylist].tracks[parseInt(currentlyPlayingTrack) - 1] && playlists[parseInt(currentlyPlayingPlaylist) - 1]) {
			this.switchTrack(parseInt(currentlyPlayingPlaylist) - 1, parseInt(playlists[currentlyPlayingPlaylist].tracks.length - 1));
		} else {
			this.switchTrack(parseInt(playlists.length - 1), parseInt(playlists[playlists.length - 1].tracks.length - 1));
		}
	},

	clear: function () {
    $('.track-progress').width(0 + "%");
		localStorage['currentTime'] = 0;
		localStorage['playlist'] = null;
		localStorage['track'] = null;
	},
});
