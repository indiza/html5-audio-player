var Track = new Class({

	init: function(_playlistid, _trackid) {
		// TODO: check what filetype browser needs and return appropriate file format
		var that = this;
		var track = playlists[_playlistid].tracks[_trackid];

		var id = this.id = _trackid;
		var playlistid = this.playlistid = _playlistid;
		var name = this.name = track.name;
		var artist = this.artist = track.artist;
		var album = this.album = track.album;
		var src = this.src = track.src;
	},

	load: function() {
		var that = this;
		audio.src = that.src;
		audio.load();

		$('.track-name').html(that.name);
		$('.track-artist').html(that.artist + " // " + that.album);
		$('.played').html("0:00");

		localStorage['playlist'] = that.playlistid;
		localStorage['track'] = that.id;

		// highlight track
	},

	updateProgress: function () {
		var progress = audio.currentTime;
    var duration = audio.duration;
    var percent = (progress / duration) * 100;
    $('.track-progress').width(percent + "%");
    $('.played').html(formatTime(audio.currentTime));
	}
});