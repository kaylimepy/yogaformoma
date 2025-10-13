// Curated yoga videos for seniors - Verified working videos
const yogaVideos = {
    chair: [
        { id: '-Ts01MC2mIo', title: 'Chair Yoga | Yoga With Adriene' },
    ],
    regular: [
        { id: 'kFhG-ZzLNN4', title: 'Yoga For Seniors | Slow and Gentle | Yoga With Adriene' },
    ]
};

// Load watch history from localStorage
function loadWatchHistory() {
    const history = localStorage.getItem('yogaWatchHistory');
    return history ? JSON.parse(history) : [];
}

// Save watch history to localStorage
function saveWatchHistory(history) {
    localStorage.setItem('yogaWatchHistory', JSON.stringify(history));
}

// Get a random unwatched video
function getRandomVideo(type) {
    const videos = yogaVideos[type];
    const history = loadWatchHistory();

    // Get list of watched video IDs for this type
    const watchedIds = history
        .filter(item => item.type === type)
        .map(item => item.videoId);

    // Find unwatched videos
    const unwatchedVideos = videos.filter(video => !watchedIds.includes(video.id));

    // If all videos have been watched, reset for this type
    if (unwatchedVideos.length === 0) {
        const resetHistory = history.filter(item => item.type !== type);
        saveWatchHistory(resetHistory);
        return videos[Math.floor(Math.random() * videos.length)];
    }

    // Return random unwatched video
    return unwatchedVideos[Math.floor(Math.random() * unwatchedVideos.length)];
}

// Open video and log it
function openVideo(type) {
    const video = getRandomVideo(type);
    const history = loadWatchHistory();

    // Add to history
    history.push({
        videoId: video.id,
        title: video.title,
        type: type,
        timestamp: new Date().toISOString()
    });

    saveWatchHistory(history);
    updateStats();

    // Open YouTube video
    window.open(`https://www.youtube.com/watch?v=${video.id}`, '_blank');
}

// Update stats display
function updateStats() {
    const history = loadWatchHistory();
    document.getElementById('count').textContent = history.length;
}

// Reset all data
function resetAll() {
    if (confirm('Reset all watch history and broken video tracking?')) {
        localStorage.removeItem('yogaWatchHistory');
        localStorage.removeItem('brokenVideos');
        updateStats();
        alert('Reset complete!');
    }
}

// Event listeners
document.getElementById('chair-yoga').addEventListener('click', () => openVideo('chair'));
document.getElementById('regular-yoga').addEventListener('click', () => openVideo('regular'));
document.getElementById('reset-btn').addEventListener('click', resetAll);

// Initialize stats on load
updateStats();
