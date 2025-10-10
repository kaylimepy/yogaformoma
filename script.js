// Curated yoga videos for seniors
const yogaVideos = {
    chair: [
        { id: 'KNfFCRTNzfM', title: 'Chair Yoga for Seniors - 30 Min Full Body Stretch' },
        { id: '3OE6VbLZKFY', title: 'Gentle Chair Yoga - Seated Exercise for Seniors' },
        { id: 'VHrHdWBgJQw', title: '20 Minute Chair Yoga Workout for Seniors' },
        { id: 'sJhwx4RNO_s', title: 'Chair Yoga - Full Body Stretch' },
        { id: 'GZzhfPUMsl0', title: 'Relaxing Chair Yoga for Seniors' },
        { id: '5XzBp-1GcX0', title: '15 Min Chair Yoga - Easy & Gentle' },
        { id: 'tAUf7aajBWE', title: 'Chair Yoga Flow for Flexibility' },
        { id: 'bEv5k1GmnGo', title: 'Morning Chair Yoga for Seniors' },
        { id: 'aG0YJlR3h0o', title: 'Chair Yoga Stretches - Full Session' },
        { id: 'Khz8uD0wIvU', title: 'Gentle Chair Yoga Practice' }
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

// Event listeners
document.getElementById('chair-yoga').addEventListener('click', () => openVideo('chair'));
document.getElementById('regular-yoga').addEventListener('click', () => openVideo('regular'));

// Initialize stats on load
updateStats();
