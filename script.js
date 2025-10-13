// Curated yoga videos for seniors
const yogaVideos = {
    chair: [
        { id: 'kS4GHa4E3Yo', title: 'Chair Yoga for Seniors - Gentle Stretches' },
        { id: 'fQvy7pck2zk', title: 'Seated Yoga for Seniors - Full Body Stretch' },
        { id: 'zNoN-LLVyZw', title: '20 Min Chair Yoga for Flexibility' },
        { id: 'QL_TbZFXaUQ', title: 'Gentle Chair Yoga - Morning Routine' },
        { id: 'Yz1tRCJ5vwM', title: 'Chair Yoga Flow - Easy Stretches' },
        { id: 'x3GYK2dRO4U', title: '15 Minute Chair Yoga for Beginners' },
        { id: 'kU9Xzh32zns', title: 'Relaxing Chair Yoga Practice' },
        { id: '2kAHDIJ0ydM', title: 'Chair Yoga Full Body Workout' },
        { id: 'R1E3DfP8fxg', title: 'Gentle Seated Yoga for Seniors' },
        { id: 'e0RKVqwBZok', title: 'Chair Yoga - Balance and Strength' }
    ],
    regular: [
        { id: 'j7rKKpwdXNE', title: 'Gentle Yoga for Seniors - Full Class' },
        { id: 'v7AYKMP6rOE', title: 'Senior Yoga - 20 Minute Gentle Practice' },
        { id: 'YzLA3JqpbQg', title: 'Beginner Yoga for Seniors' },
        { id: 'biIVKf7vZLQ', title: 'Gentle Yoga Flow for Seniors - 30 Minutes' },
        { id: '4pKly2JojMw', title: 'Senior Yoga - Balance and Flexibility' },
        { id: 'CLyKxqOFboE', title: 'Gentle Morning Yoga for Seniors' },
        { id: 'LqXZ628YNj4', title: 'Beginner Friendly Senior Yoga' },
        { id: 'A0pkEgZiRG8', title: 'Easy Yoga for Seniors - Full Body' },
        { id: 'fuPYZ2HJlJQ', title: 'Senior Yoga Practice - Gentle Flow' },
        { id: 'T2mAUj8KcHg', title: 'Relaxing Yoga for Older Adults' }
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

// Check if video is available
async function checkVideoAvailability(videoId) {
    try {
        const response = await fetch(`https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${videoId}&format=json`);
        return response.ok;
    } catch (error) {
        return false;
    }
}

// Mark video as broken
function markVideoBroken(videoId) {
    const brokenVideos = JSON.parse(localStorage.getItem('brokenVideos') || '[]');
    if (!brokenVideos.includes(videoId)) {
        brokenVideos.push(videoId);
        localStorage.setItem('brokenVideos', JSON.stringify(brokenVideos));
    }
}

// Get list of broken videos
function getBrokenVideos() {
    return JSON.parse(localStorage.getItem('brokenVideos') || '[]');
}

// Get a random unwatched, working video
function getRandomVideo(type) {
    const videos = yogaVideos[type];
    const history = loadWatchHistory();
    const brokenVideos = getBrokenVideos();

    // Get list of watched video IDs for this type
    const watchedIds = history
        .filter(item => item.type === type)
        .map(item => item.videoId);

    // Find unwatched, non-broken videos
    const availableVideos = videos.filter(video =>
        !watchedIds.includes(video.id) && !brokenVideos.includes(video.id)
    );

    // If all videos have been watched or are broken, reset watched history for this type
    if (availableVideos.length === 0) {
        const resetHistory = history.filter(item => item.type !== type);
        saveWatchHistory(resetHistory);
        // Return random non-broken video
        const workingVideos = videos.filter(video => !brokenVideos.includes(video.id));
        return workingVideos.length > 0
            ? workingVideos[Math.floor(Math.random() * workingVideos.length)]
            : videos[Math.floor(Math.random() * videos.length)];
    }

    // Return random available video
    return availableVideos[Math.floor(Math.random() * availableVideos.length)];
}

// Open video and log it
async function openVideo(type) {
    const video = getRandomVideo(type);

    // Check if video is available
    const isAvailable = await checkVideoAvailability(video.id);

    if (!isAvailable) {
        // Mark as broken and try again
        markVideoBroken(video.id);
        alert('Video unavailable. Trying another one...');
        openVideo(type);
        return;
    }

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
