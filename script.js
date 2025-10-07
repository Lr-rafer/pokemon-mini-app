// Lấy các phần tử HTML mà chúng ta cần tương tác
const pokemonContainer = document.getElementById('pokemon-container');
const randomPokemonBtn = document.getElementById('random-pokemon-btn');

// Thêm sự kiện click vào nút bấm
randomPokemonBtn.addEventListener('click', getRandomPokemon);

/**
 * Hàm không đồng bộ để lấy dữ liệu của một Pokémon ngẫu nhiên từ PokéAPI
 */
async function getRandomPokemon() {
    try {
        // Xóa nội dung cũ để chuẩn bị hiển thị Pokémon mới
        pokemonContainer.innerHTML = '';
        pokemonContainer.innerHTML = '<h2>Đang tải...</h2>';

        // Tạo một ID ngẫu nhiên từ 1 đến 1000
        const randomId = Math.floor(Math.random() * 1000) + 1;

        // Gọi API để lấy dữ liệu Pokémon theo ID ngẫu nhiên
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${randomId}`);
        
        if (!response.ok) {
            throw new Error('Không thể lấy dữ liệu Pokémon');
        }

        const data = await response.json();

        // Hiển thị dữ liệu lên giao diện
        displayPokemon(data);

    } catch (error) {
        // Xử lý và hiển thị lỗi nếu có
        pokemonContainer.innerHTML = `<h2>Có lỗi xảy ra: ${error.message}</h2>`;
        console.error('Lỗi khi lấy dữ liệu Pokémon:', error);
    }
}

/**
 * Hàm để hiển thị thông tin Pokémon đã lấy được lên giao diện người dùng
 * @param {Object} pokemonData - Dữ liệu Pokémon được trả về từ API
 */
function displayPokemon(pokemonData) {
    // Xóa thông báo tải
    pokemonContainer.innerHTML = '';

    // Tạo các phần tử HTML để hiển thị thông tin
    const pokemonName = document.createElement('h2');
    pokemonName.textContent = pokemonData.name.charAt(0).toUpperCase() + pokemonData.name.slice(1);

    const pokemonImage = document.createElement('img');
    pokemonImage.src = pokemonData.sprites.front_default;
    pokemonImage.alt = pokemonData.name;

    const pokemonId = document.createElement('p');
    pokemonId.textContent = `ID: ${pokemonData.id}`;

    const pokemonType = document.createElement('p');
    const types = pokemonData.types.map(typeInfo => typeInfo.type.name.charAt(0).toUpperCase() + typeInfo.type.name.slice(1)).join(', ');
    pokemonType.textContent = `Hệ: ${types}`;

    // Thêm các phần tử đã tạo vào vùng chứa
    pokemonContainer.appendChild(pokemonName);
    pokemonContainer.appendChild(pokemonImage);
    pokemonContainer.appendChild(pokemonId);
    pokemonContainer.appendChild(pokemonType);
}