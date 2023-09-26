// script.js

const pets = [
    { id: 1, name: "Buddy", species: "dog", age: 3, category: "Friendly", description: "Playful and friendly dog looking for a loving home.",image:"buddy.jpg" },
    { id: 2, name: "Max", species: "dog", age: 2, category: "Energetic", description: "Energetic dog that loves outdoor activities." ,image:"max.jpeg"},
    { id: 3, name: "Bailey", species: "dog", age: 4, category: "Loyal", description: "Loyal companion with a gentle demeanor.",image:"bailey.au_fs_e05e73c0-6ff2-488c-af16-584f8fe69003" },
    { id: 4, name: "Luna", species: "cat", age: 2, category: "Cuddly", description: "Cuddly and affectionate cat seeking a forever family.",image:"luna.jpg" },
    { id: 5, name: "Whiskers", species: "cat", age: 3, category: "Playful", description: "Playful cat that enjoys interactive toys.",image:"whiskers.webp" },
    { id: 6, name: "Oliver", species: "cat", age: 1, category: "Independent", description: "Independent and curious cat.",image:"oliver.jpg" },
    { id: 7, name: "Hopper", species: "rabbit", age: 1, category: "Energetic", description: "Energetic rabbit that loves hopping around.",image:"hopper.jpg" },
    { id: 8, name: "Snowball", species: "rabbit", age: 2, category: "Fluffy", description: "Fluffy and gentle rabbit with a calm demeanor.",image:"snowball.webp" },
    { id: 9, name: "Bunny", species: "rabbit", age: 1, category: "Playful", description: "Playful bunny with a sweet personality.",image:"bunny.jpg" },
    { id: 10, name: "Tweety", species: "bird", age: 2, category: "Colorful", description: "Colorful bird with a beautiful song.",image:"tweety.jpg" },
    { id: 11, name: "Sunny", species: "bird", age: 1, category: "Sociable", description: "Sociable bird that enjoys interacting with people.",image:"sunny.jpg" },
    { id: 12, name: "Rocky", species: "dog", age: 5, category: "Active", description: "Active dog ready for outdoor adventures.",image:"rocky.jpg" },
    { id: 13, name: "Mittens", species: "cat", age: 4, category: "Gentle", description: "Gentle cat that loves cuddles.",image:"mittens.webp" },
    { id: 14, name: "Oreo", species: "rabbit", age: 2, category: "Lop-Eared", description: "Lop-eared rabbit with a sweet disposition.",image:"oreo.jpg" },
    { id: 15, name: "Polly", species: "bird", age: 3, category: "Talkative", description: "Talkative parrot with a vast vocabulary.",image:"polly.jpg" },
    // Add more pet data here
];


const itemsPerPage = 4;
let currentPage = 1;

function displayPets() {
    const petList = document.getElementById("pet-list");
    const speciesFilter = document.getElementById("species-filter");
    const categoryFilter = document.getElementById("category-filter");
    const selectedSpecies = speciesFilter.value;
    const selectedCategory = categoryFilter.value;

    petList.innerHTML = "";

    const filteredPets = pets.filter((pet) => {
        return (selectedSpecies === "all" || pet.species === selectedSpecies) &&
               (selectedCategory === "all" || pet.category === selectedCategory);
    });

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const paginatedPets = filteredPets.slice(startIndex, endIndex);

    paginatedPets.forEach((pet) => {
        const petCard = document.createElement("div");
        petCard.className = "pet-card";
        petCard.innerHTML = `
            <img src="${pet.image}" alt="${pet.name}" class="pet-image">
            <h2>${pet.name}</h2>
            <p><strong>Species:</strong> ${pet.species}</p>
            <p><strong>Category:</strong> ${pet.category}</p>
            <p><strong>Age:</strong> ${pet.age} years old</p>
            <button class="show-details-button" data-id="${pet.id}">Show Details</button>
            <button class="favorite-button" data-id="${pet.id}">Add to Favorites</button>
        `;
        petList.appendChild(petCard);
    });

    displayPagination(filteredPets.length);
}

function displayPagination(totalPets) {
    const pagination = document.getElementById("pagination");
    const totalPages = Math.ceil(totalPets / itemsPerPage);

    pagination.innerHTML = "";

    for (let i = 1; i <= totalPages; i++) {
        const pageButton = document.createElement("button");
        pageButton.textContent = i;
        pageButton.addEventListener("click", () => {
            currentPage = i;
            displayPets();
        });
        pagination.appendChild(pageButton);
    }
}

function showPetDetails(id) {
    const pet = pets.find((p) => p.id === id);

    const petModal = document.getElementById("pet-modal");
    petModal.innerHTML = `
        <div class="modal-content">
            <span class="close-button" id="close-modal">&times;</span>
            <h2>${pet.name}</h2>
            <p><strong>Species:</strong> ${pet.species}</p>
            <p><strong>Category:</strong> ${pet.category}</p>
            <p><strong>Age:</strong> ${pet.age} years old</p>
            <p><strong>Description:</strong> ${pet.description}</p>
        </div>
    `;

    petModal.style.display = "block";

    const closeModalButton = document.getElementById("close-modal");
    closeModalButton.addEventListener("click", () => {
        petModal.style.display = "none";
    });
}

function addToFavorites(id) {
    // Implement your favorite functionality here (e.g., store favorite pets in local storage).
    alert("Added to Favorites!");
}

document.getElementById("species-filter").addEventListener("change", () => {
    currentPage = 1;
    displayPets();
});

document.getElementById("category-filter").addEventListener("change", () => {
    currentPage = 1;
    displayPets();
});

document.getElementById("pet-list").addEventListener("click", (event) => {
    if (event.target.classList.contains("show-details-button")) {
        const petId = parseInt(event.target.getAttribute("data-id"));
        showPetDetails(petId);
    } else if (event.target.classList.contains("favorite-button")) {
        const petId = parseInt(event.target.getAttribute("data-id"));
        addToFavorites(petId);
    }
});

// Call the displayPets function when the page loads
window.onload = displayPets;
