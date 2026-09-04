// Game Data - Simplified for immediate use or fetching
let games = [];

// DOM Elements
const catalogView = document.getElementById('catalog-view');
const playerView = document.getElementById('player-view');
const gamesGrid = document.getElementById('games-grid');
const gameContainer = document.getElementById('game-container');
const playingTitle = document.getElementById('playing-title');
const aboutTitle = document.getElementById('about-title');
const gameDescription = document.getElementById('game-description');

// Initialize App
async function init() {
    try {
        // Try to fetch from the local path
        const response = await fetch('./games.json');
        games = await response.json();
        renderCatalog();
    } catch (error) {
        console.error('Error loading games:', error);
        // Fallback data if fetch fails
        games = [
            { id: "2048", title: "2048", description: "Join the numbers and get to the 2048 tile!", iframe: "<iframe src=\"https://play2048.co/\" style=\"width:100%;height:100%;border:none;\" allowfullscreen></iframe>", thumbnail: "https://placehold.co/600x400/222/white?text=2048" }
        ];
        renderCatalog();
    }
}

function renderCatalog() {
    gamesGrid.innerHTML = games.map(game => `
        <div class="group bg-white rounded-2xl border border-neutral-200 overflow-hidden hover:shadow-xl hover:shadow-neutral-200/50 transition-all duration-300 cursor-pointer" onclick="playGame('${game.id}')">
            <div class="relative aspect-video overflow-hidden bg-neutral-100">
                <img src="${game.thumbnail}" alt="${game.title}" class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" referrerpolicy="no-referrer">
                <div class="absolute inset-0 bg-neutral-900/0 group-hover:bg-neutral-900/40 transition-colors duration-300 flex items-center justify-center">
                    <div class="bg-white text-neutral-900 p-3 rounded-full opacity-0 scale-90 group-hover:opacity-100 group-hover:scale-100 transition-all duration-300 shadow-lg">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" stroke="none"><polygon points="5 3 19 12 5 21 5 3"/></svg>
                    </div>
                </div>
            </div>
            <div class="p-5">
                <h3 class="font-bold text-lg mb-1">${game.title}</h3>
                <p class="text-neutral-500 text-sm line-clamp-2 mb-4">${game.description}</p>
                <button class="w-full py-2 bg-neutral-50 border border-neutral-200 rounded-xl text-sm font-semibold hover:bg-neutral-900 hover:text-white hover:border-neutral-900 transition-all">
                    Play Now
                </button>
            </div>
        </div>
    `).join('');
}

function playGame(gameId) {
    const game = games.find(g => g.id === gameId);
    if (!game) return;

    // Update Player View Content
    playingTitle.textContent = game.title;
    aboutTitle.textContent = `About ${game.title}`;
    gameDescription.textContent = game.description;
    
    // Inject the raw iframe HTML string from JSON
    gameContainer.innerHTML = game.iframe;

    // Switch Views
    catalogView.classList.add('hidden');
    playerView.classList.remove('hidden');
    
    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function showCatalog() {
    // Stop the game by clearing the container
    gameContainer.innerHTML = "";
    
    // Switch Views
    playerView.classList.add('hidden');
    catalogView.classList.remove('hidden');
}

// Start the app
init();
