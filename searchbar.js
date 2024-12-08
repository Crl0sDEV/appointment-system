const serviceLinks = {
    "2D Echo w/ Doppler": "EchoDoppler.html",
    "12-Lead ECG": "ECG.html",
    "COVID-19 Tests": "covid.html",
    "Doctor's Clinic": "clinic.html",
    "Drug Testing": "drug.html",
    "Laboratory Test": "labtest.html",
    "Minor Surgery": "minorsur.html",
    "Pharmacy": "pharma.html",
    "Ultrasound": "ultra.html",
    "X-ray": "ray.html"
};

function searchServices() {
    const searchInput = document.getElementById('serviceSearch').value.trim();
    const normalizedInput = searchInput.toLowerCase();

    for (const [serviceName, link] of Object.entries(serviceLinks)) {
        if (serviceName.toLowerCase() === normalizedInput) {
            window.location.href = link; 
            return;
        }
    }

    alert("Service not found. Please try again.");
}

function showSuggestions() {
    const input = document.getElementById('serviceSearch').value.trim().toLowerCase();
    const suggestionsBox = document.getElementById('suggestions');

    if (!input) {
        suggestionsBox.classList.add('hidden');
        return;
    }
    
    const matchingServices = Object.keys(serviceLinks).filter(service =>
        service.toLowerCase().includes(input)
    );

    if (matchingServices.length > 0) {
        suggestionsBox.innerHTML = matchingServices
            .map(service => 
                `<p onclick="selectSuggestion('${service.replace(/'/g, "\\'")}')">${service}</p>`
            )
            .join('');
        suggestionsBox.classList.remove('hidden');
    } else {
        suggestionsBox.innerHTML = "<p>No matching services found.</p>";
        suggestionsBox.classList.remove('hidden');
    }
}

function selectSuggestion(service) {
    document.getElementById('serviceSearch').value = service;
    document.getElementById('suggestions').classList.add('hidden');
}

document.addEventListener('click', (event) => {
    const suggestionsBox = document.getElementById('suggestions');
    if (!suggestionsBox.contains(event.target) && event.target.id !== 'serviceSearch') {
        suggestionsBox.classList.add('hidden');
    }
});





function sortServices() {
    const sortBy = document.getElementById('sortBy').value;
    const container = document.getElementById('servicesContainer');
    const cards = Array.from(container.getElementsByClassName('service-card'));

    
    cards.sort((a, b) => {
        switch (sortBy) {
            case 'nameAsc':
                return a.getAttribute('data-name').localeCompare(b.getAttribute('data-name'));
            case 'nameDesc':
                return b.getAttribute('data-name').localeCompare(a.getAttribute('data-name'));
            case 'ratesHigh':
                return b.getAttribute('data-rate') - a.getAttribute('data-rate');
            case 'ratesLow':
                return a.getAttribute('data-rate') - b.getAttribute('data-rate');
            default:
                return 0; 
        }
    });

    
    container.innerHTML = '';
    cards.forEach(card => container.appendChild(card));
}