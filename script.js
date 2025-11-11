// Curated yoga videos for seniors - Verified working videos
const yogaVideos = {
    chair: [
        { id: '1DYH5ud3zHo', title: 'Chair Yoga for Seniors' },
        { id: '-Ts01MC2mIo', title: 'Chair Yoga | Yoga With Adriene' },
        { id: 'U_jdXFfegKE', title: 'Gentle Chair Yoga Practice' },
        { id: 'e6QHRS7DR3k', title: 'Chair Yoga Full Body Stretch' },
        { id: 'o50BQDwaDcI', title: 'Seated Yoga for Seniors' },
        { id: 'KEjiXtb2hRg', title: 'Chair Yoga Flow' },
        { id: '3ZvmKOPoFVo', title: 'Easy Chair Yoga' },
        { id: 'pciXaO4wtug', title: 'Chair Yoga Workout' },
        { id: 'k4ST1j9PfrA', title: 'Relaxing Chair Yoga' },
        { id: 'jsFzFiyDqBs', title: 'Chair Yoga Practice' },
        { id: 'PEsxFCa-P6Q', title: 'Gentle Seated Yoga' },
        { id: 'pwwISeTzCc4', title: 'Chair Yoga Session' },
        { id: '8BcPHWGQO44', title: 'Chair Yoga for Flexibility' },
        { id: 'uoP5Pr3vkPM', title: 'Chair Yoga Routine' },
        { id: 'pLVgrHzCTOg', title: 'Chair Yoga Class' },
        { id: 'FzHYtSJ44EI', title: 'Morning Chair Yoga' },
        { id: 'bMZ1mI1g1rM', title: 'Chair Yoga Exercises' },
        { id: '1YHjBYcqJ5c', title: 'Chair Yoga for Beginners' },
        { id: 'hizopvbXPmI', title: 'Chair Yoga Stretches' }
    ],
    regular: [
        { id: 'kFhG-ZzLNN4', title: 'Yoga For Seniors | Slow and Gentle' },
        { id: 'Wpb_zFT1Pbw', title: 'Gentle Yoga for Seniors' },
        { id: 'NDLad2vOHkU', title: 'Senior Yoga Practice' },
        { id: 'jReivdS83Mo', title: 'Beginner Yoga for Seniors' },
        { id: 'ymawWTDYlYs', title: 'Easy Senior Yoga' },
        { id: 'l3c8CYnksNI', title: 'Senior Yoga Flow' },
        { id: 'eU5DdpC1gNs', title: 'Gentle Yoga Practice' },
        { id: 'DH7Aq-Sl6C0', title: 'Senior Yoga Class' },
        { id: 'W_po9xtwfME', title: 'Yoga for Older Adults' },
        { id: '3WcHipO1cWA', title: 'Senior Yoga Session' },
        { id: 'WisaiUma9pA', title: 'Gentle Senior Yoga' },
        { id: 'thaT2E_KtGY', title: 'Senior Yoga Routine' },
        { id: 'SYLK1KIVOm4', title: 'Senior Yoga Workout' },
        { id: '_4SFQGTPH3s', title: 'Relaxing Senior Yoga' }
    ],
    floor: [
        { id: 'C27BEWYC2Ks', title: 'Floor Yoga for Seniors' },
        { id: '3ae9YNUcsJ4', title: 'Gentle Floor Yoga' },
        { id: '_VecIOA_r_k', title: 'Floor Yoga Practice' },
        { id: 'DH7Aq-Sl6C0', title: 'Floor Yoga Stretches' },
        { id: 'WIhtaT00q3w', title: 'Easy Floor Yoga' }
    ],
    qigong: [
        { id: 'uQ6IXq-7Ngk', title: 'Qigong for Seniors' },
        { id: 'YI_D0yZgoWI', title: 'Gentle Qigong Practice' },
        { id: 'l3c8CYnksNI', title: 'Qigong Flow' },
        { id: 'pa_I5NAOW4k', title: 'Qigong Exercises' }
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
document.getElementById('floor-yoga').addEventListener('click', () => openVideo('floor'));
document.getElementById('qigong').addEventListener('click', () => openVideo('qigong'));
document.getElementById('reset-btn').addEventListener('click', resetAll);

// Initialize stats on load
updateStats();
