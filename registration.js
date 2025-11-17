// This file demonstrates the use of object literals and array manipulation 
// separate from the main salon application logic in script.js.

// 1. Create 5 pet object literals, matching the initial clients in script.js
let pet1 = {
   name: "Kobie",
   age: 3,
   gender: "Male",
   service: "Full Grooming",
   breed: "Cane Corso"
};

let pet2 = {
   name: "Cooper",
   age: 7,
   gender: "Female",
   service: "Nail Trim & Filing",
   breed: "German Shepherd"
};

let pet3 = {
   name: "Barkley",
   age: 5,
   gender: "Male",
   service: "Dental Cleaning",
   breed: "Doberman"
};

let pet4 = {
   name: "Shep",
   age: 4,
   gender: "Male",
   service: "De-shedding Treatment",
   breed: "Belgian Malinois"
};

let pet5 = {
   name: "Boss",
   age: 6,
   gender: "Male",
   service: "Deep Conditioning Wash",
   breed: "Thai Ridgeback"
};

// 2. Create a list of pets (array)
let petsList = [pet1, pet2, pet3, pet4, pet5];
console.log("Current Pet List:", petsList);

// 3. Display the pets count
console.log("Total Pets:", petsList.length);

// 4. Display pet's name
console.log("Pet Names:");
for(let i = 0; i < petsList.length; i++){
    // Corrected array access: use square brackets []
    console.log(petsList[i].name);
}

// 5. Calculate and display Average age
function calculateAverageAge(list) {
    if (list.length === 0) {
        return 0;
    }
    const totalAge = list.reduce((sum, pet) => sum + pet.age, 0);
    return (totalAge / list.length).toFixed(1);
}

const avgAge = calculateAverageAge(petsList);
console.log(`Average Client Age: ${avgAge} years`); 

// NEW FUNCTION: displayRow (replaces displayPet)
function displayRow() {
    // This function would typically handle the logic to render
    // the pet data into a table row in the registration.html page.
    console.log("The displayRow function would execute here to render data on the HTML page.");
}

// Example call of the new function
displayRow();