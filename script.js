class Pet {
    constructor(name, age, gender, breed, service, type) {
        this.Name = name;
        this.Age = parseInt(age);
        this.Gender = gender;
        this.Breed = breed;
        this.Service = service;
        this.Type = type;
    }
}

const salon = {
    clients: [
        new Pet("Kobie", 3, "Male", "Cane Corso", "Full Grooming", "Dog"),
        new Pet("Cooper", 7, "Female", "German Shepherd", "Nail Trim & Filing", "Dog"),
        new Pet("Barkley", 5, "Male", "Doberman", "Dental Cleaning", "Dog"),
        new Pet("Shep", 4, "Male", "Belgian Malinois", "De-shedding Treatment", "Dog"),
        new Pet("Boss", 6, "Male", "Thai Ridgeback", "Deep Conditioning Wash", "Dog")
    ],

    calculateAverageAge: function() {
        if (this.clients.length === 0) {
            return 0;
        }

        const totalAge = this.clients.reduce((sum, client) => sum + client.Age, 0);
        return (totalAge / this.clients.length).toFixed(1);
    },

    displaySalonData: function() {
        // --- Display Pet Count (for index.html) ---
        const petCountElement = document.getElementById('petCount');
        if (petCountElement) {
            petCountElement.textContent = this.clients.length;
        }

        // --- Display Pet List (for index.html) ---
        const petListElement = document.getElementById('petList');
        if (petListElement) {
            petListElement.innerHTML = '';

            this.clients.forEach(client => {
                const listItem = document.createElement('li');
                listItem.textContent = client.Name;
                petListElement.appendChild(listItem);
            });
        }

        // --- Display Average Age (for index.html) ---
        const averageAgeElement = document.getElementById('averageAge');
        if (averageAgeElement) {
            const avgAge = this.calculateAverageAge();
            averageAgeElement.textContent = `${avgAge} years`;
        }
    },
    
    // REQUIRED FUNCTION: displayRow() to render table rows
    displayRow: function() {
        const tableBody = document.querySelector('#petsTable tbody');
        if (!tableBody) {
            return; // Exit if the table body doesn't exist
        }
        
        let html = '';
        
        this.clients.forEach((pet, index) => {
            const rowNumber = index + 1;

            html += `
                <tr>
                    <th scope="row">${rowNumber}</th>
                    <td>${pet.Name}</td>
                    <td>${pet.Age}</td>
                    <td>${pet.Gender}</td>
                    <td>${pet.Breed}</td>
                    <td>${pet.Service}</td>
                    <td><button class="btn btn-sm btn-danger delete-btn" data-index="${index}">Delete</button></td>
                </tr>
            `;
        });

        tableBody.innerHTML = html;
        
        // Attaching Delete event listeners (optional for now, but good practice)
        document.querySelectorAll('.delete-btn').forEach(button => {
            button.addEventListener('click', (e) => {
                const petIndex = parseInt(e.target.getAttribute('data-index'));
                console.log(`Attempting to delete pet at index: ${petIndex}`);
                // Deletion function would be called here.
            });
        });
    },
    
    registerNewPet: function(newPet) {
        this.clients.push(newPet);
        this.displaySalonData(); // Update dashboard metrics
        this.displayRow(); // Update the table on registration.html
    }
};

function handleFormSubmission(e) {
    e.preventDefault();

    const name = document.getElementById('petName').value.trim();
    const age = document.getElementById('petAge').value;
    const breed = document.getElementById('petBreed').value.trim();
    const gender = document.getElementById('petGender').value;
    const service = document.getElementById('petService').value;
    // Note: petType is read from a hidden field in registration.html
    const type = document.getElementById('petType').value; 

    // --- Validation ---
    const parsedAge = parseInt(age);
    if (isNaN(parsedAge) || parsedAge <= 0 || name === "" || breed === "" || !gender || !service) {
        alert("Please ensure all fields are entered correctly.");
        return; 
    }
    // --------------------

    const newClient = new Pet(name, parsedAge, gender, breed, service, type);

    salon.registerNewPet(newClient);

    // Reset the form after successful submission
    e.target.reset();
}

document.addEventListener("DOMContentLoaded", function() {
    // If on index.html, display dashboard data
    const petCountElement = document.getElementById('petCount');
    if (petCountElement) {
        salon.displaySalonData();
    }
    
    // If on registration.html: attach form listener AND display the table
    const registrationForm = document.getElementById('petRegistrationForm');
    if (registrationForm) {
        registrationForm.addEventListener('submit', handleFormSubmission);
    }
    
    const tableBody = document.querySelector('#petsTable tbody');
    if (tableBody) {
        salon.displayRow(); // Call the new displayRow function to populate the table
    }
});