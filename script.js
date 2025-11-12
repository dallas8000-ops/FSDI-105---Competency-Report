// --- Global Data Array ---

/**
 * The main array to store pet objects.
 * INITIALIZED with 5 pets, including the two new ones (Shep and Boss).
 */
let pets = [
    {
        Name: "Kobie",
        Age: 3,
        Gender: "Male",
        Service: "Full Grooming",
        Breed: "Cane Corso"
    },
    {
        Name: "Cooper",
        Age: 7,
        Gender: "Female",
        Service: "Nail Trim",
        Breed: "German Shepherd"
    },
    {
        Name: "Barkley",
        Age: 5,
        Gender: "Male",
        Service: "Dental Cleaning",
        Breed: "Doberman"
    },
    // --- NEW PET 1 (Shepherd Image) ---
    {
        Name: "Shep",
        Age: 4,
        Gender: "Male",
        Service: "De-shedding Treatment",
        Breed: "Belgian Malinois"
    },
    // --- NEW PET 2 (Boss Image) ---
    {
        Name: "Boss",
        Age: 6,
        Gender: "Male",
        Service: "Deep Conditioning Wash",
        Breed: "Thai Ridgeback"
    }
];

// --- Functionalities ---

/**
 * Function to calculate and display the total number of registered pets.
 * Targets the element with id="petCount".
 */
function displayRegisteredPetsCount() {
    // Get the length of the pets array
    let count = pets.length; 

    // Use getElementById to find the span and update its text content
    let petCountElement = document.getElementById("petCount");
    if (petCountElement) {
        petCountElement.textContent = count;
    }
}

/**
 * Function to iterate through the pets array and display their names.
 * Targets the <ul> element with id="petList".
 */
function displayPetNames() {
    // Get the <ul> element where the names will be listed
    let petListElement = document.getElementById("petList");

    // Exit if the element is not found (e.g., if on a different page)
    if (!petListElement) return;

    // Clear any existing content before updating
    petListElement.innerHTML = '';

    // Iterate through the pets array using a for loop
    for (let i = 0; i < pets.length; i++) {
        let listItem = document.createElement("li");
        // Access the pet's name property
        listItem.textContent = pets[i].Name;
        petListElement.appendChild(listItem);
    }
}

// --- Extra Challenge: Average Age ---

/**
 * Function to calculate the average age of all registered pets.
 * Targets the element with id="averageAge".
 */
function calculateAverageAge() {
    if (pets.length === 0) {
        // Return 0 if there are no pets to avoid division by zero
        let averageAgeElement = document.getElementById("averageAge");
        if (averageAgeElement) {
            averageAgeElement.textContent = "0 years";
        }
        return 0;
    }

    let totalAge = 0;
    // Iterate through pets to sum the ages
    for (let pet of pets) {
        totalAge += pet.Age;
    }

    // Calculate average and round to one decimal place
    let average = (totalAge / pets.length).toFixed(1);

    // Display the result
    let averageAgeElement = document.getElementById("averageAge");
    if (averageAgeElement) {
        averageAgeElement.textContent = average + " years";
    }

    return average;
}

// --- Initialization ---

// Wait for the entire HTML document to load before running the functions
document.addEventListener("DOMContentLoaded", function() {
    console.log("Pet Salon script loaded and initialized.");
    displayRegisteredPetsCount();
    displayPetNames();
    calculateAverageAge();
});