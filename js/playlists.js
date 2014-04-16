var Playlist = new Class({

	init: function(_playlistid) {
		var that = this;
		var playlist = playlists[_playlistid];

		var id = this.id = _playlistid;
		var name = this.name = playlist.name;
		var tracks = this.tracks = playlist.tracks;
	},
	
	show: function() {
		var that = this;

		playlistTitleHtml = "<p>" + that.name + "</p>";
		$('.current-playlist').append(playlistTitleHtml);

		for (var i = 0; i < that.tracks.length; i++) {
			trackHtml = '<div class="track" onclick="player.switchTrack(' + that.id + ', \'' + i + '\', 1);">' + that.tracks[i].name + '</div>';
			$('.current-playlist').append(trackHtml);
		};

		// highlight playlist
	},

	clear: function() {
		$('.current-playlist').empty();
	},

	play: function() {
		// play a playlist all the way through
		// allow shuffle
		// looping
	}
});
