// Các hàm tiện ích
const API_URL = 'https://pokeapi.co/api/v2/pokemon/';

async function fetchPokemon(query) {
    try {
        const response = await fetch(`${API_URL}${query}`);
        if (!response.ok) {
            throw new Error('Không tìm thấy Pokémon này');
        }
        return await response.json();
    } catch (error) {
        console.error(error);
        return null;
    }
}

function renderPokemon(container, data) {
    if (!data) {
        container.innerHTML = `<p>Không tìm thấy Pokémon.</p>`;
        return;
    }
    container.innerHTML = `
        <h2>${data.name.charAt(0).toUpperCase() + data.name.slice(1)}</h2>
        <img src="${data.sprites.front_default}" alt="${data.name}">
        <p>ID: ${data.id}</p>
        <p>Hệ: ${data.types.map(t => t.type.name).join(', ')}</p>
        <h3>Chỉ số:</h3>
        <ul>
            ${data.stats.map(s => `<li>${s.stat.name}: ${s.base_stat}</li>`).join('')}
        </ul>
    `;
}

// Chức năng chuyển đổi giữa các tab
const sections = document.querySelectorAll('main section');
document.querySelectorAll('nav button').forEach(button => {
    button.addEventListener('click', () => {
        sections.forEach(sec => sec.classList.remove('active'));
        sections.forEach(sec => sec.classList.add('hidden'));
        const targetId = button.id.replace('nav-', '') + '-pokemon-section';
        document.getElementById(targetId).classList.add('active');
        document.getElementById(targetId).classList.remove('hidden');
    });
});

// 1. Phần ngẫu nhiên
const randomBtn = document.getElementById('random-btn');
const randomContainer = document.getElementById('random-container');

randomBtn.addEventListener('click', async () => {
    randomContainer.innerHTML = '<p>Đang tìm kiếm...</p>';
    const randomId = Math.floor(Math.random() * 1000) + 1;
    const pokemon = await fetchPokemon(randomId);
    renderPokemon(randomContainer, pokemon);
});

// 2. Phần tìm kiếm
const searchBtn = document.getElementById('search-btn');
const searchInput = document.getElementById('pokemon-search-input');
const searchContainer = document.getElementById('search-container');

searchBtn.addEventListener('click', async () => {
    const query = searchInput.value.toLowerCase();
    searchContainer.innerHTML = '<p>Đang tìm kiếm...</p>';
    const pokemon = await fetchPokemon(query);
    renderPokemon(searchContainer, pokemon);
});

// 3. Phần Quiz
const quizQuestionDiv = document.getElementById('quiz-question');
const quizChoicesDiv = document.getElementById('quiz-choices');
const quizFeedbackP = document.getElementById('quiz-feedback');
const quizNextBtn = document.getElementById('quiz-next-btn');
let currentPokemon, correctType;

async function startQuiz() {
    quizFeedbackP.textContent = '';
    quizChoicesDiv.innerHTML = '';
    quizNextBtn.style.display = 'none';

    const randomId = Math.floor(Math.random() * 100) + 1; // Giới hạn cho quiz dễ hơn
    currentPokemon = await fetchPokemon(randomId);

    if (!currentPokemon) {
        quizQuestionDiv.textContent = 'Lỗi tải câu hỏi.';
        return;
    }

    correctType = currentPokemon.types[0].type.name;
    const allTypes = await getAllPokemonTypes();
    const incorrectTypes = allTypes.filter(type => type !== correctType).sort(() => 0.5 - Math.random()).slice(0, 3);
    const choices = [...incorrectTypes, correctType].sort(() => 0.5 - Math.random());

    quizQuestionDiv.innerHTML = `
        <h2>Pokémon này thuộc hệ gì?</h2>
        <img src="${currentPokemon.sprites.front_default}" alt="${currentPokemon.name}">
    `;

    choices.forEach(type => {
        const button = document.createElement('button');
        button.textContent = type.charAt(0).toUpperCase() + type.slice(1);
        button.addEventListener('click', () => checkAnswer(button, type));
        quizChoicesDiv.appendChild(button);
    });
}

function checkAnswer(button, chosenType) {
    if (chosenType === correctType) {
        quizFeedbackP.textContent = 'Chính xác! 🎉';
        quizFeedbackP.style.color = 'green';
    } else {
        quizFeedbackP.textContent = `Sai rồi. Nó thuộc hệ ${correctType}.`;
        quizFeedbackP.style.color = 'red';
    }
    document.querySelectorAll('#quiz-choices button').forEach(btn => btn.disabled = true);
    quizNextBtn.style.display = 'block';
}

async function getAllPokemonTypes() {
    const response = await fetch('https://pokeapi.co/api/v2/type');
    const data = await response.json();
    return data.results.map(type => type.name);
}

document.getElementById('nav-quiz').addEventListener('click', startQuiz);
quizNextBtn.addEventListener('click', startQuiz);


// 4. Phần Đấu
const startBattleBtn = document.getElementById('start-battle-btn');
const playerPokemonInput = document.getElementById('player-pokemon-input');
const battleResultsDiv = document.getElementById('battle-results');

startBattleBtn.addEventListener('click', async () => {
    const playerQuery = playerPokemonInput.value.toLowerCase();
    const randomOpponentId = Math.floor(Math.random() * 1000) + 1;

    battleResultsDiv.innerHTML = '<p>Đang chuẩn bị trận đấu...</p>';

    const [playerPokemon, opponentPokemon] = await Promise.all([
        fetchPokemon(playerQuery),
        fetchPokemon(randomOpponentId)
    ]);

    if (!playerPokemon || !opponentPokemon) {
        battleResultsDiv.innerHTML = '<p>Không thể bắt đầu trận đấu. Vui lòng kiểm tra tên Pokémon của bạn.</p>';
        return;
    }

    displayBattle(playerPokemon, opponentPokemon);
});

function displayBattle(player, opponent) {
    const playerStats = player.stats.find(s => s.stat.name === 'attack').base_stat + player.stats.find(s => s.stat.name === 'defense').base_stat;
    const opponentStats = opponent.stats.find(s => s.stat.name === 'attack').base_stat + opponent.stats.find(s => s.stat.name === 'defense').base_stat;

    let winner;
    if (playerStats > opponentStats) {
        winner = 'Bạn thắng!';
    } else if (opponentStats > playerStats) {
        winner = 'Bạn thua rồi.';
    } else {
        winner = 'Hòa!';
    }

    battleResultsDiv.innerHTML = `
        <div class="pokemon-card">
            <h3>Bạn</h3>
            <p>${player.name.toUpperCase()}</p>
            <img src="${player.sprites.front_default}" alt="${player.name}">
            <p>Tổng chỉ số công/thủ: ${playerStats}</p>
        </div>
        <div class="pokemon-card">
            <h3>Đối thủ</h3>
            <p>${opponent.name.toUpperCase()}</p>
            <img src="${opponent.sprites.front_default}" alt="${opponent.name}">
            <p>Tổng chỉ số công/thủ: ${opponentStats}</p>
        </div>
        <h3>Kết quả: ${winner}</h3>
    `;
}