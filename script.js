class Pet {
    // UPDATED: Constructor now accepts 'paymentMethod'
    constructor(name, age, gender, breed, service, type, paymentMethod) { 
        this.Name = name;
        this.Age = parseInt(age);
        this.Gender = gender;
        this.Breed = breed;
        this.Service = service;
        this.Type = type;
        this.PaymentMethod = paymentMethod; // NEW PROPERTY
    }
}

const salon = {
    // UPDATED: Initial clients now include 'PaymentMethod'
    clients: [
        new Pet("Kobie", 3, "Male", "Cane Corso", "Full Grooming", "Dog", "Card"),
        new Pet("Cooper", 7, "Female", "German Shepherd", "Nail Trim & Filing", "Dog", "Cash"),
        new Pet("Barkley", 5, "Male", "Doberman", "Dental Cleaning", "Dog", "Venmo"),
        new Pet("Shep", 4, "Male", "Belgian Malinois", "De-shedding Treatment", "Dog", "Card"),
        new Pet("Boss", 6, "Male", "Thai Ridgeback", "Deep Conditioning Wash", "Dog", "Cash")
    ],

    calculateAverageAge: function() {
        if (this.clients.length === 0) {
            return 0;
        }

        const totalAge = this.clients.reduce((sum, client) => sum + client.Age, 0);
        return (totalAge / this.clients.length).toFixed(1);
    },

    displaySalonData: function() {
        const petCountElement = document.getElementById('petCount');
        if (petCountElement) {
            petCountElement.textContent = this.clients.length;
        }

        const averageAgeElement = document.getElementById('averageAge');
        if (averageAgeElement) {
            averageAgeElement.textContent = `${this.calculateAverageAge()} years`;
        }
    },

    registerNewPet: function(newClient) {
        this.clients.push(newClient);
        console.log("Registered a new client:", newClient);
        this.displayRow();
        this.displaySalonData();
    },

    // NEW FUNCTION: Handles pet deletion and re-renders the table
    deletePet: function(index) {
        if (index >= 0 && index < this.clients.length) {
            console.log(`Deleting pet: ${this.clients[index].Name} at index ${index}`);
            // Remove 1 element starting from the given index
            this.clients.splice(index, 1);
            // Re-render the table and update dashboard data
            this.displayRow();
            this.displaySalonData();
        } else {
            console.error("Invalid index for deletion:", index);
        }
    },

    displayRow: function() {
        const tableBody = document.querySelector('#petsTable tbody');
        if (!tableBody) return;

        let html = "";
        // Loop through the clients array
        for (let i = 0; i < this.clients.length; i++) {
            const pet = this.clients[i];
            html += `
                <tr class="align-middle">
                    <td class="text-center">${i + 1}</td>
                    <td>${pet.Name}</td>
                    <td>${pet.Age}</td>
                    <td>${pet.Gender}</td>
                    <td>${pet.Breed}</td>
                    <td>${pet.Service}</td>
                    <td class="text-uppercase fw-bold">${pet.PaymentMethod}</td> 
                    <td class="text-center">
                        <button class="btn btn-sm btn-danger shadow-sm" onclick="salon.deletePet(${i})">
                            <i class="fas fa-trash-alt me-1"></i> Delete
                        </button>
                    </td>
                </tr>
            `;
        }
        tableBody.innerHTML = html;
    }
};

/**
 * NEW FUNCTION: Handles form submission using jQuery for validation and reset.
 * Visual errors are displayed by adding the Bootstrap 'is-invalid' class (red border).
 */
function handleFormSubmission(e) {
    e.preventDefault();

    let isValid = true;
    const $form = $(e.target);
    
    // Use jQuery selector to find all required fields (excluding the hidden one)
    const $requiredFields = $('#petName, #petAge, #petGender, #petBreed, #petService, #petPayment');
    
    // Clear previous invalid visual feedback using jQuery
    $requiredFields.removeClass('is-invalid');
    
    // --- Validation using jQuery ---
    $requiredFields.each(function() {
        const $field = $(this);
        const value = $field.val().trim();
        
        let fieldIsValid = true;

        if (!value) {
            fieldIsValid = false;
        } 
        
        // Specific validation for age field
        if ($field.attr('id') === 'petAge') {
            const parsedAge = parseInt(value);
            if (isNaN(parsedAge) || parsedAge <= 0) {
                fieldIsValid = false;
            }
        }
        
        // Highlight field if invalid
        if (!fieldIsValid) {
            $field.addClass('is-invalid'); // Adds red border
            isValid = false;
        }
    });

    // Stop submission if validation failed
    if (!isValid) {
        return; 
    }

    // --- Successful Registration ---
    
    // Read values using jQuery's .val()
    const name = $('#petName').val().trim();
    const age = $('#petAge').val().trim();
    const breed = $('#petBreed').val().trim();
    const gender = $('#petGender').val();
    const service = $('#petService').val();
    const paymentMethod = $('#petPayment').val(); 
    const type = $('#petType').val();

    // Instantiate new Pet object
    const newClient = new Pet(name, parseInt(age), gender, breed, service, type, paymentMethod);

    salon.registerNewPet(newClient);

    // Reset the form and remove all red borders using jQuery
    $form.get(0).reset(); // Native DOM reset on the form element
    $form.find('.is-invalid').removeClass('is-invalid'); // Ensure no red borders remain
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
        // Use jQuery to attach the submit listener
        $('#petRegistrationForm').on('submit', handleFormSubmission);
    }
    
    const tableBody = document.querySelector('#petsTable tbody');
    if (tableBody) {
        salon.displayRow();
    }
});