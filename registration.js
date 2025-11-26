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
   retainer: "Monthly" 
};

let pet2 = {
   name: "Cooper",
   age: 7,
   gender: "Female",
   service: "Nail Trim & Filing",
   breed: "German Shepherd",
   paymentMethod: "Cash",
   retainer: "Bi-Weekly" 
};

let pet3 = {
   name: "Barkley",
   age: 5,
   gender: "Male",
   service: "Dental Cleaning",
   breed: "Doberman",
   paymentMethod: "Venmo",
   retainer: "None" 
};

let pet4 = {
   name: "Shep",
   age: 4,
   gender: "Male",
   service: "De-shedding Treatment",
   breed: "Belgian Malinois",
   paymentMethod: "Card",
   retainer: "Weekly" 
};

let pet5 = {
   name: "Boss",
   age: 6,
   gender: "Male",
   service: "Deep Conditioning Wash",
   breed: "Thai Ridgeback",
   paymentMethod: "Cash",
   retainer: "None" 
};

// 2. Create a list of pets (array)
let petsList = [pet1, pet2, pet3, pet4, pet5];