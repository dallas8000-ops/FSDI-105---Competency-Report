// This file demonstrates the use of object literals and array manipulation 
// separate from the main salon application logic in script.js.

// 1. Create 5 pet object literals, matching the initial clients in script.js
// All objects now include the new attributes: paymentMethod and retainer
let pet1 = {
   name: "Kobie",
   age: 3,
   gender: "Male",
   service: "Full Grooming",
   breed: "Cane Corso",
   paymentMethod: "Card",
   retainer: "Monthly" // Added
};

let pet2 = {
   name: "Cooper",
   age: 7,
   gender: "Female",
   service: "Nail Trim & Filing",
   breed: "German Shepherd",
   paymentMethod: "Cash",
   retainer: "Bi-Weekly" // Added
};

let pet3 = {
   name: "Barkley",
   age: 5,
   gender: "Male",
   service: "Dental Cleaning",
   breed: "Doberman",
   paymentMethod: "Venmo",
   retainer: "None" // Added
};

let pet4 = {
   name: "Shep",
   age: 4,
   gender: "Male",
   service: "De-shedding Treatment",
   breed: "Belgian Malinois",
   paymentMethod: "Card",
   retainer: "Weekly" // Added
};

let pet5 = {
   name: "Boss",
   age: 6,
   gender: "Male",
   service: "Deep Conditioning Wash",
   breed: "Thai Ridgeback",
   paymentMethod: "Cash",
   retainer: "None" // Added
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

const averageAge = calculateAverageAge(petsList);
console.log("Average Age:", averageAge);