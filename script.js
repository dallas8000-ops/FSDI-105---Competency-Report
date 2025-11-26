class Pet {
    // UPDATED: Constructor now accepts all attributes
    constructor(name, age, gender, breed, service, type, paymentMethod, retainer) { 
        this.Name = name;
        this.Age = parseInt(age);
        this.Gender = gender;
        this.Breed = breed;
        this.Service = service;
        this.Type = type;
        this.PaymentMethod = paymentMethod;
        this.Retainer = retainer; 
    }
}

// Service data structure used by both the Service Page and the Registration Form
const serviceMenu = {
    "Grooming Packages": [
        { name: "Full Grooming", price: 65, description: "Includes bath, cut, dry, and brush." },
        { name: "De-shedding Treatment", price: 35, description: "Specialized bath and brushing for heavy shedders." },
        { name: "Deep Conditioning Wash", price: 40, description: "Moisturizing bath and blow-dry." }
    ],
    "Health & Wellness": [
        { name: "Nail Trim & Filing", price: 15, description: "Gentle trim followed by filing." },
        { name: "Dental Cleaning", price: 80, description: "Non-anesthetic dental hygiene service." },
        { name: "Paw Pad Treatment", price: 10, description: "Moisturizing balm and light massage." }
    ],
    "Specialty Services": [
        { name: "Blueberry Facial", price: 15, description: "Brightening and stain reduction." },
        { name: "Creative Color", price: "Varies", description: "Temporary pet-safe coat coloring. Price requires consultation." }
    ]
};


class Salon {
    constructor(name) {
        this.name = name;
        this.pets = [
            new Pet("Kobie", 3, "Male", "Cane Corso", "Full Grooming", "Dog", "Card", "Monthly"),
            new Pet("Cooper", 7, "Female", "German Shepherd", "Nail Trim & Filing", "Dog", "Cash", "Bi-Weekly"),
            new Pet("Barkley", 5, "Male", "Doberman", "Dental Cleaning", "Dog", "Venmo", "None"),
            new Pet("Shep", 4, "Male", "Belgian Malinois", "De-shedding Treatment", "Dog", "Card", "Weekly"),
            new Pet("Boss", 6, "Male", "Thai Ridgeback", "Deep Conditioning Wash", "Dog", "Cash", "None"),
        ];
    }
    
    // Method to register a new pet object
    registerPet(pet) {
        this.pets.push(pet);
        console.log(`Pet ${pet.Name} registered!`);
    }

    // Displays the current pets list in the table on registration.html
    displayRow() {
        const tableBody = document.querySelector('#petsTable tbody');
        if (!tableBody) return;

        tableBody.innerHTML = ''; // Clear table before displaying
        this.pets.forEach((pet, index) => {
            let row = tableBody.insertRow();
            row.insertCell().textContent = pet.Name;
            row.insertCell().textContent = pet.Age;
            row.insertCell().textContent = pet.Type; // Added Type field to table display
            row.insertCell().textContent = pet.Gender;
            row.insertCell().textContent = pet.Breed;
            row.insertCell().textContent = pet.Service;
            row.insertCell().textContent = pet.PaymentMethod; 
            row.insertCell().textContent = pet.Retainer;
            
            // Add Action Cell (Combined Edit and Delete)
            let actionCell = row.insertCell();

            // --- NEW: Add Edit Button ---
            let editBtn = document.createElement('button');
            editBtn.className = 'btn btn-warning btn-sm me-2';
            editBtn.textContent = 'Edit';
            editBtn.onclick = () => this.editPet(index);
            actionCell.appendChild(editBtn);
            
            // Add Delete Button
            let deleteBtn = document.createElement('button');
            deleteBtn.className = 'btn btn-danger btn-sm';
            deleteBtn.textContent = 'Delete';
            deleteBtn.onclick = () => this.deletePet(index);
            actionCell.appendChild(deleteBtn);
        });

        // After updating the table, update all stats 
        this.displaySalonData();
    }
    
    // Deletes a pet from the array by its index
    deletePet(index) {
        if (confirm(`Are you sure you want to delete ${this.pets[index].Name}?`)) {
            this.pets.splice(index, 1);
            this.displayRow(); // Re-render the table
        }
    }
    
    // Method to load a pet's data into the form for editing (NEW)
    editPet(index) {
        const petToEdit = this.pets[index];
        
        // 1. Populate the form fields with the pet's current data
        document.getElementById('petId').value = index; // Store the array index as a hidden ID
        document.getElementById('txtName').value = petToEdit.Name;
        document.getElementById('txtAge').value = petToEdit.Age;
        document.getElementById('selGender').value = petToEdit.Gender;
        document.getElementById('txtBreed').value = petToEdit.Breed;
        document.getElementById('selService').value = petToEdit.Service;
        document.getElementById('selType').value = petToEdit.Type;
        document.getElementById('selPayment').value = petToEdit.PaymentMethod;
        document.getElementById('selRetainer').value = petToEdit.Retainer;
        
        // 2. Adjust button visibility
        document.getElementById('addPetBtn').style.display = 'none'; // Hide Register
        document.getElementById('saveChangesBtn').style.display = 'inline-block'; // Show Save Changes
        
        // Scroll to the top of the form
        document.getElementById('petRegistrationForm').scrollIntoView({ behavior: 'smooth' });
    }

    // Method to save changes from the form back to the pet array (NEW)
    savePetChanges(index, updatedPet) {
        if (index >= 0 && index < this.pets.length) {
            // Overwrite the existing pet object with the new data
            this.pets[index] = updatedPet;
            console.log(`Pet ${updatedPet.Name} updated!`);
            
            // Reset the form and buttons after saving
            document.getElementById('petRegistrationForm').reset();
            document.getElementById('petId').value = ''; 
            document.getElementById('addPetBtn').style.display = 'inline-block';
            document.getElementById('saveChangesBtn').style.display = 'none';
            
            // Re-display the table
            this.displayRow(); 
        }
    }


    // Populates the Service dropdown in both registration.html and services.html
    populateServiceDropdown() {
        const registrationDropdown = document.getElementById('selService');
        const bookingDropdown = document.getElementById('bookServiceSelect');

        const dropdowns = [registrationDropdown, bookingDropdown].filter(d => d);

        dropdowns.forEach(dropdown => {
            // Clear existing options, but keep the first 'Choose a Service...' option
            let initialOption = dropdown.querySelector('option[value=""]');
            if (initialOption) {
                dropdown.innerHTML = '';
                dropdown.appendChild(initialOption.cloneNode(true));
            } else {
                 dropdown.innerHTML = '<option value="">Choose a Service...</option>';
            }


            for (const category in serviceMenu) {
                // Create an Optgroup for the category
                const optGroup = document.createElement('optgroup');
                optGroup.label = category;

                serviceMenu[category].forEach(service => {
                    const option = document.createElement('option');
                    option.value = service.name;
                    option.textContent = `${service.name} (${service.price === "Varies" ? "Ask for price" : "$" + service.price})`;
                    
                    // Attach the price and description as data attributes for easy retrieval
                    option.dataset.price = service.price;
                    option.dataset.description = service.description;
                    
                    optGroup.appendChild(option);
                });
                dropdown.appendChild(optGroup);
            }
        });
    }
    
    // Updates the description and price fields on the services.html page 
    updateServiceDetails() {
        const select = document.getElementById('bookServiceSelect');
        const descriptionInput = document.getElementById('bookServiceDescription');
        const priceInput = document.getElementById('bookServicePrice');

        if (!select || !descriptionInput || !priceInput) return;

        const selectedOption = select.options[select.selectedIndex];
        
        if (selectedOption && selectedOption.value !== "") {
            descriptionInput.value = selectedOption.dataset.description || "No description available.";
            priceInput.value = selectedOption.dataset.price || "N/A";
        } else {
            descriptionInput.value = "";
            priceInput.value = "";
        }
    }

    // Updates the count and average age stats on index.html
    displaySalonData() {
        const petCountElement = document.getElementById('petCount');
        const averageAgeElement = document.getElementById('averageAge');
        
        if (!petCountElement || !averageAgeElement) return;

        // 1. Update Pet Count
        petCountElement.textContent = this.pets.length;

        // 2. Calculate and Update Average Age
        let totalAge = this.pets.reduce((sum, pet) => sum + pet.Age, 0);
        let averageAge = this.pets.length > 0 ? (totalAge / this.pets.length).toFixed(1) : "0.0";
        averageAgeElement.textContent = `${averageAge} years`;
    }

    // Finds unique breeds and services for the stats page (optional, based on your needs)
    findUnique(property) {
        // Implementation for finding unique breeds/services goes here
    }
}

// Global instance of the salon
const salon = new Salon("Pimp Your Pet Salon");

// --- Dark Mode Initialization ---
// Function to handle the click (toggle)
function toggleDarkMode() {
    const body = document.body;
    const isDarkMode = body.classList.toggle('dark-mode');
    
    // Save the user's preference to local storage
    localStorage.setItem('darkMode', isDarkMode ? 'enabled' : 'disabled');

    // Update the button text/icon
    const darkModeToggle = document.getElementById('darkModeToggle');
    if (darkModeToggle) {
        if (isDarkMode) {
            darkModeToggle.innerHTML = '<i class="fas fa-sun"></i> Light Mode';
        } else {
            darkModeToggle.innerHTML = '<i class="fas fa-moon"></i> Dark Mode';
        }
    }
}

// Function to apply the saved preference on page load
function initializeDarkMode() {
    const savedMode = localStorage.getItem('darkMode');
    const darkModeToggle = document.getElementById('darkModeToggle');

    if (savedMode === 'enabled') {
        // Apply the class immediately
        document.body.classList.add('dark-mode');
        // Update the button text right away
        if (darkModeToggle) {
            darkModeToggle.innerHTML = '<i class="fas fa-sun"></i> Light Mode';
        }
    }
}

// --- Event Handlers ---

// Handles pet registration form submission on registration.html (UPDATED to handle Edit/Save)
function handleFormSubmission(event) {
    event.preventDefault();

    const petId = document.getElementById('petId').value; // Get the hidden ID (index)
    const name = document.getElementById('txtName').value;
    const age = document.getElementById('txtAge').value;
    const gender = document.getElementById('selGender').value;
    const breed = document.getElementById('txtBreed').value;
    const service = document.getElementById('selService').value;
    const type = document.getElementById('selType').value;
    const paymentMethod = document.getElementById('selPayment').value;
    const retainer = document.getElementById('selRetainer').value;

    if (name && age && gender && breed && service && type && paymentMethod && retainer) {
        const petData = new Pet(name, age, gender, breed, service, type, paymentMethod, retainer);
        
        if (petId) {
            // If petId exists, we are editing (updating) an existing pet
            salon.savePetChanges(parseInt(petId), petData);
        } else {
            // If petId is empty, we are registering a NEW pet
            salon.registerPet(petData);

            // Clear the form
            document.getElementById('petRegistrationForm').reset();
            
            // Re-display the table and update dashboard stats
            salon.displayRow(); 
        }
    } else {
        alert('Please fill out all required fields.');
    }
}

// Handles service booking form submission on services.html
function handleServiceBooking(event) {
    event.preventDefault();

    const petName = document.getElementById('bookPetName').value;
    const service = document.getElementById('bookServiceSelect').value;

    if (petName && service) {
        alert(`${petName} has been booked for ${service}! (Data would typically be saved here)`);
        
        // Clear the form
        document.getElementById('serviceBookingForm').reset();
        
        // Update service details to clear the description/price fields
        salon.updateServiceDetails();
    } else {
        alert('Please provide the pet name and select a service.');
    }
}

// Function to handle the Cancel/Reset button
function handleCancel() {
    // Reset the hidden ID and show/hide buttons for registration mode
    document.getElementById('petId').value = ''; 
    document.getElementById('addPetBtn').style.display = 'inline-block';
    document.getElementById('saveChangesBtn').style.display = 'none';
}


// --- Main Execution Block ---
document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Initialize Dark Mode state first AND attach listener to button 
    initializeDarkMode(); 
    const darkModeToggle = document.getElementById('darkModeToggle');
    if (darkModeToggle) {
        darkModeToggle.addEventListener('click', toggleDarkMode);
    }

    // 2. Logic for index.html: display stats
    const petCountElement = document.getElementById('petCount');
    if (petCountElement) {
        salon.displaySalonData();
    }
    
    // 3. Logic for registration.html: attach form listener AND display the table
    const registrationForm = document.getElementById('petRegistrationForm');
    if (registrationForm) {
        registrationForm.addEventListener('submit', handleFormSubmission);
    }
    
    const tableBody = document.querySelector('#petsTable tbody');
    if (tableBody) {
        salon.displayRow();
    }
    
    // Attach listener to the Cancel button to reset edit mode (NEW)
    const cancelBtn = document.getElementById('cancelBtn');
    if (cancelBtn) {
        cancelBtn.addEventListener('click', handleCancel);
    }
    
    // 4. Logic for all pages: populate service dropdowns
    // Check for both registration form dropdown ('selService') and booking dropdown ('bookServiceSelect')
    salon.populateServiceDropdown();

    // 5. Logic specific to services.html: attach listeners to booking form
    const serviceSelectDropdown = document.getElementById('bookServiceSelect');
    if (serviceSelectDropdown) {
        // Listener to update description/price when a service is selected
        serviceSelectDropdown.addEventListener('change', salon.updateServiceDetails.bind(salon));
        
        const serviceBookingForm = document.getElementById('serviceBookingForm');
        if (serviceBookingForm) {
            // Listener to handle the booking submission
            serviceBookingForm.addEventListener('submit', handleServiceBooking);
        }
        
        // Call it once on load to initialize fields if the default option is not selected
        salon.updateServiceDetails(); 
    }
});