class Pet {
    // UPDATED: Constructor now accepts 'paymentMethod' and 'retainer'
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
        { name: "Blueberry Facial", price: 10, description: "Tear stain removal and face brightening." },
        { name: "Scented Spritz", price: 5, description: "A finishing spray with premium pet cologne." },
        { name: "Pet-Safe Hair Coloring", price: 50, description: "Creative coloring using non-toxic, pet-safe dyes." }
    ]
};

class Salon {
    constructor(petsList) {
        this.pets = petsList.map((pet, index) => new Pet(
            pet.name, 
            pet.age, 
            pet.gender, 
            pet.breed, 
            pet.service, 
            pet.type || 'Dog', // Default to 'Dog' if type is missing from initial data
            pet.paymentMethod, // New property
            pet.retainer // New property
        ));
        this.nextId = this.pets.length + 1;
    }

    registerNewPet(name, age, gender, breed, service, type, paymentMethod, retainer) {
        let newPet = new Pet(name, age, gender, breed, service, type, paymentMethod, retainer);
        this.pets.push(newPet);
        this.displayRow();
    }

    deletePet(id) {
        // IDs are 1-based, array indices are 0-based
        this.pets.splice(id - 1, 1); 
        this.displayRow();
    }

    // New method to retrieve a pet by its 1-based ID for editing
    getPetById(id) {
        return this.pets[id - 1];
    }
    
    // New method to handle updating an existing pet
    updatePet(id, name, age, gender, breed, service, type, paymentMethod, retainer) {
        let pet = this.getPetById(id);
        if (pet) {
            pet.Name = name;
            pet.Age = parseInt(age);
            pet.Gender = gender;
            pet.Breed = breed;
            pet.Service = service;
            pet.Type = type;
            pet.PaymentMethod = paymentMethod;
            pet.Retainer = retainer;
            this.displayRow(); // Re-render the table
            return true;
        }
        return false;
    }

    // Updated displayRow to include Payment and Retainer
    displayRow() {
        const tableBody = document.querySelector('#petsTable tbody');
        if (!tableBody) return;
        
        tableBody.innerHTML = '';
        
        this.pets.forEach((pet, index) => {
            const row = tableBody.insertRow();
            const id = index + 1;
            
            // Add Pet ID
            let cellId = row.insertCell();
            cellId.textContent = id; 

            // Add Pet properties
            row.insertCell().textContent = pet.Name;
            row.insertCell().textContent = pet.Age;
            row.insertCell().textContent = pet.Gender;
            row.insertCell().textContent = pet.Breed;
            row.insertCell().textContent = pet.Service;
            row.insertCell().textContent = pet.Type;
            // NEW: Add Payment Method
            row.insertCell().textContent = pet.PaymentMethod; 
            // NEW: Add Retainer Schedule (centered)
            let cellRetainer = row.insertCell();
            cellRetainer.textContent = pet.Retainer;
            cellRetainer.classList.add('text-center');

            // Add Actions (Edit/Delete buttons)
            let cellActions = row.insertCell();
            cellActions.classList.add('text-center');
            
            // Edit Button
            const editBtn = document.createElement('button');
            editBtn.textContent = 'Edit';
            editBtn.classList.add('btn', 'btn-sm', 'btn-info', 'me-2');
            editBtn.addEventListener('click', () => {
                // Pass the 1-based ID for lookup
                handleEdit(id); 
            });
            cellActions.appendChild(editBtn);

            // Delete Button
            const deleteBtn = document.createElement('button');
            deleteBtn.textContent = 'Delete';
            deleteBtn.classList.add('btn', 'btn-sm', 'btn-danger');
            deleteBtn.addEventListener('click', () => {
                // Pass the 1-based ID for lookup
                if (confirm(`Are you sure you want to delete ${pet.Name}?`)) {
                    this.deletePet(id);
                }
            });
            cellActions.appendChild(deleteBtn);
        });
        
        // Update stats on the dashboard
        if (document.getElementById('totalClients')) {
            this.updateDashboardStats();
        }
    }

    // New method to populate service dropdowns on all relevant pages
    populateServiceDropdown() {
        const registrationDropdown = document.getElementById('selService');
        const bookingDropdown = document.getElementById('bookServiceSelect');

        [registrationDropdown, bookingDropdown].forEach(dropdown => {
            if (dropdown) {
                // Clear existing options (keep the disabled 'Select...' option)
                Array.from(dropdown.options).slice(1).forEach(option => option.remove());

                for (const category in serviceMenu) {
                    const optgroup = document.createElement('optgroup');
                    optgroup.label = category;

                    serviceMenu[category].forEach(service => {
                        const option = document.createElement('option');
                        option.value = service.name;
                        option.textContent = service.name;
                        optgroup.appendChild(option);
                    });
                    dropdown.appendChild(optgroup);
                }
            }
        });
    }

    // New method to update service details on the services page
    updateServiceDetails() {
        const dropdown = document.getElementById('bookServiceSelect');
        const priceInput = document.getElementById('bookServicePrice');
        const descTextarea = document.getElementById('bookServiceDescription');

        if (!dropdown || !priceInput || !descTextarea) return;

        const selectedServiceName = dropdown.value;
        let selectedService = null;

        if (selectedServiceName) {
            // Iterate through all categories in serviceMenu to find the selected service
            for (const category in serviceMenu) {
                selectedService = serviceMenu[category].find(service => service.name === selectedServiceName);
                if (selectedService) break;
            }
        }

        if (selectedService) {
            priceInput.value = `$${selectedService.price}`;
            descTextarea.value = selectedService.description;
        } else {
            // Default state or when "Select a Service" is chosen
            priceInput.value = '—';
            descTextarea.value = '';
        }
    }


    updateDashboardStats() {
        if (!document.getElementById('totalClients')) return;

        // Total Clients
        document.getElementById('totalClients').textContent = this.pets.length;
        
        // Average Age
        const totalAge = this.pets.reduce((sum, pet) => sum + pet.Age, 0);
        const averageAge = this.pets.length > 0 ? (totalAge / this.pets.length).toFixed(1) : '0.0';
        document.getElementById('averageAge').textContent = `${averageAge} years`;

        // Service Distribution (Top 3)
        const serviceCounts = this.pets.reduce((counts, pet) => {
            counts[pet.Service] = (counts[pet.Service] || 0) + 1;
            return counts;
        }, {});
        
        const sortedServices = Object.entries(serviceCounts)
            .sort(([, countA], [, countB]) => countB - countA)
            .slice(0, 3);
        
        const topServicesList = document.getElementById('topServicesList');
        topServicesList.innerHTML = '';
        if (sortedServices.length > 0) {
            sortedServices.forEach(([service, count]) => {
                const li = document.createElement('li');
                li.textContent = `${service} (${count})`;
                topServicesList.appendChild(li);
            });
        } else {
            const li = document.createElement('li');
            li.textContent = 'No data available';
            topServicesList.appendChild(li);
        }

        // Retainer Clients (New Metric)
        const retainerClients = this.pets.filter(pet => pet.Retainer !== 'None').length;
        document.getElementById('retainerClients').textContent = retainerClients;
        
        // Favorite Payment Method (New Metric)
        const paymentCounts = this.pets.reduce((counts, pet) => {
            counts[pet.PaymentMethod] = (counts[pet.PaymentMethod] || 0) + 1;
            return counts;
        }, {});
        
        const topPayment = Object.entries(paymentCounts).sort(([, a], [, b]) => b - a)[0];
        document.getElementById('favoritePayment').textContent = topPayment ? topPayment[0] : 'N/A';
        
        // Top 5 Clients (New Metric) - For simplicity, using first 5 registered
        const topClientsList = document.getElementById('topClientsList');
        topClientsList.innerHTML = '';
        this.pets.slice(0, 5).forEach(pet => {
            const li = document.createElement('li');
            li.textContent = pet.Name;
            topClientsList.appendChild(li);
        });
    }

}

// Initialize the Salon with the data from registration.js
let salon = new Salon(petsList);

// --- Event Handlers and Initialization for registration.html ---

// Handles the form submission for both new registration and edit mode
function handleFormSubmission(event) {
    event.preventDefault(); // Stop the form from refreshing the page

    const form = event.target;
    const petId = document.getElementById('petId').value;
    const name = document.getElementById('txtName').value;
    const age = document.getElementById('txtAge').value;
    const gender = document.getElementById('txtGender').value;
    const breed = document.getElementById('txtBreed').value;
    const service = document.getElementById('selService').value;
    const type = document.getElementById('txtType').value;
    const paymentMethod = document.getElementById('selPayment').value;
    const retainer = document.getElementById('selRetainer').value;

    if (petId) {
        // EDIT MODE
        salon.updatePet(parseInt(petId), name, age, gender, breed, service, type, paymentMethod, retainer);
        alert(`${name}'s profile updated successfully!`);
    } else {
        // NEW REGISTRATION MODE
        salon.registerNewPet(name, age, gender, breed, service, type, paymentMethod, retainer);
        alert(`${name} has been successfully registered!`);
    }
    
    // Reset the form and clear hidden ID field
    form.reset();
    document.getElementById('petId').value = '';
    document.getElementById('registerBtn').textContent = 'REGISTER PET';
    document.getElementById('cancelBtn').style.display = 'none';

}

// Handles the click of the Edit button from the table
function handleEdit(id) {
    const pet = salon.getPetById(id);
    if (!pet) return;

    // 1. Populate the form fields with pet data
    document.getElementById('petId').value = id;
    document.getElementById('txtName').value = pet.Name;
    document.getElementById('txtAge').value = pet.Age;
    document.getElementById('txtGender').value = pet.Gender;
    document.getElementById('txtBreed').value = pet.Breed;
    document.getElementById('selService').value = pet.Service;
    document.getElementById('txtType').value = pet.Type;
    document.getElementById('selPayment').value = pet.PaymentMethod;
    document.getElementById('selRetainer').value = pet.Retainer;

    // 2. Change the button text and show the cancel button
    document.getElementById('registerBtn').textContent = 'SAVE CHANGES';
    document.getElementById('cancelBtn').style.display = 'inline-block';

    // 3. Scroll to the top of the form
    document.getElementById('petRegistrationForm').scrollIntoView({ behavior: 'smooth' });
}

// Handles the click of the Cancel Edit button
function handleCancel() {
    const form = document.getElementById('petRegistrationForm');
    form.reset();
    document.getElementById('petId').value = ''; // Clear hidden ID
    document.getElementById('registerBtn').textContent = 'REGISTER PET';
    document.getElementById('cancelBtn').style.display = 'none';
}

// --- Event Handler for services.html ---
function handleServiceBooking(event) {
    event.preventDefault();

    const petName = document.getElementById('bookPetName').value;
    const service = document.getElementById('bookServiceSelect').value;
    
    // Simple validation
    if (!petName || !service) {
        alert('Please enter a pet name and select a service.');
        return;
    }

    // This part would typically involve API calls and persistent storage
    alert(`Appointment booked successfully for ${petName}! \nService: ${service}`);

    // Reset form after successful submission
    document.getElementById('serviceBookingForm').reset();
    // Re-initialize service details (clears price/description)
    salon.updateServiceDetails(); 
}

// --- Global Dark Mode Logic (runs on all pages) ---
function setupDarkMode() {
    const toggle = document.getElementById('darkModeToggle');
    const body = document.body;

    // Load saved preference or default to light
    const isDarkMode = localStorage.getItem('darkMode') === 'true';

    // Apply initial state
    if (isDarkMode) {
        body.classList.add('dark-mode');
        toggle.innerHTML = '<i class="fas fa-sun"></i> Light Mode';
    } else {
        toggle.innerHTML = '<i class="fas fa-moon"></i> Dark Mode';
    }

    // Toggle logic
    toggle.addEventListener('click', () => {
        body.classList.toggle('dark-mode');
        const newIsDarkMode = body.classList.contains('dark-mode');
        localStorage.setItem('darkMode', newIsDarkMode);

        if (newIsDarkMode) {
            toggle.innerHTML = '<i class="fas fa-sun"></i> Light Mode';
        } else {
            toggle.innerHTML = '<i class="fas fa-moon"></i> Dark Mode';
        }
    });
}


// --- Main Initialization ---
$(document).ready(function() {
    
    // 1. Dark Mode setup (must run on all pages)
    setupDarkMode();

    // 2. Logic specific to index.html (Dashboard)
    if (document.getElementById('totalClients')) {
        salon.updateDashboardStats();
    }

    // 3. Logic specific to registration.html (Form and Table)
    const registrationForm = document.getElementById('petRegistrationForm');
    if (registrationForm) {
        // Use jQuery to attach the submission handler (from remote)
        $('#petRegistrationForm').on('submit', handleFormSubmission);
    }
    
    const tableBody = document.querySelector('#petsTable tbody');
    if (tableBody) {
        salon.displayRow();
    }
    
    // Attach listener to the Cancel button to reset edit mode
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