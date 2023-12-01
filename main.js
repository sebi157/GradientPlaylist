function getAccessTokenFromURL() {
    const queryParams = new URLSearchParams(window.location.search);
    const accessToken = queryParams.get('access_token');
    return accessToken;
}

function getPlaylistID(link) {
    const url = new URL(link);
    const pathnameParts = url.pathname.split('/');
    const playlistIndex = pathnameParts.indexOf('playlist');
    return pathnameParts[playlistIndex + 1];
}

function fetchSongs(playlistLink){
    const playlistID = getPlaylistID(playlistLink);

    const apiUrl = `https://api.spotify.com/v1/playlists/${playlistID}/tracks`;

    fetch(apiUrl, {
        headers: {
            'Authorization': `Bearer ${accessToken}`
        }
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        console.log('Playlist Tracks:', data.items);
    })
    .catch(error => {
        console.error('There was a problem fetching the playlist:', error);
    });
}

function fetchPlaylist(playlistLink, accessToken) {
    const playlistSongsDiv = document.getElementById('playlistSongs');

    data = fetchSongs(playlistLink);
    
    playlistSongsDiv.innerHTML = '';
    data.forEach(song => {
        const songElement = document.createElement('p');
        songElement.textContent = `${song.name} - ${song.artist}`;
        playlistSongsDiv.appendChild(songElement);
    });

    playlistSongsDiv.classList.remove('invisible');
    playlistSongsDiv.classList.add('visible');
}
document.getElementById('spotifyForm').addEventListener('submit', function (event) {
    event.preventDefault();
    console.log("pula pula pula");
    

    const playlistLink = document.getElementById('playlistLink').value;
    const accessToken = getAccessTokenFromURL();

    fetchPlaylist(playlistLink, accessToken);
});