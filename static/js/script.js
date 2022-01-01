jQuery(function($) {
    'use strict'
    var supportsAudio = !!document.createElement('audio').canPlayType;
    if (supportsAudio) {
        var player = new Plyr('#audio1', {
            controls: [
                'restart',
                'play',
                'progress',
                'current-time',
                'duration',
                'mute',
                'volume',
                'download'
            ]
        });
        var index = 0,
            extension = '',
            playing = false,
            tracks = [{
                "name": "Oh Wonder - Shark (Illenium Remix)",
                "artist": "ILLENIUM",
                "cover": "https://i1.sndcdn.com/artworks-000094845967-6wb79s-t500x500.jpg",
                "source": "./songs/OhWonderSharkIlleniumRemix.mp3",
                "favorited": "false"
            }, ],

            buildPlaylist = $.each(tracks.sort(() => Math.random() - 0.5), function(key, value) {
                var trackName = value.name,
                    trackPicture = value.cover;

                $('#plList').append('<li> \
                    <div class="plItem"> \
                        <span class="plNum">' + trackName + '.</span> \
                        <span class="plLength"><img style="height:50px; position:absolute; top:-10px; left: -30px ;width:50px;" src= "' + trackPicture + '"></span> \
                    </div> \
                </li>');
            }),

            trackCount = tracks.length,
            npAction = $('#npAction'),
            npTitle = $('#npTitle'),
            audio = $('#audio1').on('play', function() {
                playing = true;
                document.getElementById('animation').style = 'visibility:visible;width: 100px;';
                npAction.text('Now Playing...');
            }).on('pause', function() {
                playing = false;
                document.getElementById('animation').style = 'visibility:hidden;width: 100px;';
                npAction.text('User Paused Song...');
            }).on('ended', function() {
                npAction.text('User Paused Song...');
                if ((index + 1) < trackCount) {
                    index++;
                    loadTrack(index);
                    audio.play();
                } else {
                    audio.pause();
                    index = 0;
                    loadTrack(index);
                }
            }).get(0),
            btnPrev = $('#btnPrev').on('click', function() {
                if ((index - 1) > -1) {
                    index--;
                    loadTrack(index);
                    if (playing) {
                        audio.play();
                    }
                } else {
                    audio.pause();
                    index = 0;
                    loadTrack(index);
                }
            }),
            btnNext = $('#btnNext').on('click', function() {
                if ((index + 1) < trackCount) {
                    index++;
                    loadTrack(index);
                    if (playing) {
                        audio.play();
                    }
                } else {
                    audio.pause();
                    index = 0;
                    loadTrack(index);
                }
            }),
            li = $('#plList li').on('click', function() {
                var id = parseInt($(this).index());
                if (id !== index) {
                    playTrack(id);
                }
            }),
            loadTrack = function(id) {
                $('.plSel').removeClass('plSel');
                $('#plList li:eq(' + id + ')').addClass('plSel');
                npTitle.text(tracks[id].name);
                index = id;
                audio.src = tracks[id].source;
                document.getElementById('coverart').src = tracks[id].cover;
                updateDownload(id, audio.src);
            },
            updateDownload = function(id, source) {
                player.on('loadedmetadata', function() {
                    $('a[data-plyr="download"]').attr('href', source);
                });
            },
            playTrack = function(id) {
                loadTrack(id);
                audio.play();

            };
        extension = audio.canPlayType('audio/mpeg') ? '.mp3' : audio.canPlayType('audio/ogg') ? '.ogg' : '';
        loadTrack(index);
    } else {
        // no audio support
        $('.column').addClass('hidden');
        var noSupport = $('#audio1').text();
        $('.container').append('<p class="no-support">' + noSupport + '</p>');
    }
});