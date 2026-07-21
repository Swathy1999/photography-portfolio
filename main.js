
// Photography Packages

const packages = [
    {
        type: "Wedding",
        name: "Basic Wedding",
        price: 25000,
        duration: "8 Hours",
        photos: 500,
        drone: false,
        album: false
    },
    {
        type: "Wedding",
        name: "Premium Wedding",
        price: 45000,
        duration: "Full Day",
        photos: 1000,
        drone: true,
        album: true
    },
    {
        type: "Wedding",
        name: "Luxury Wedding",
        price: 75000,
        duration: "2 Days",
        photos: 2000,
        drone: true,
        album: true
    },
    {
        type: "Portrait",
        name: "Portrait Session",
        price: 5000,
        duration: "2 Hours",
        photos: 50,
        drone: false,
        album: false
    },
    {
        type: "Baby",
        name: "Baby Shoot",
        price: 8000,
        duration: "3 Hours",
        photos: 100,
        drone: false,
        album: true
    },
    {
        type: "Birthday",
        name: "Birthday Package",
        price: 10000,
        duration: "4 Hours",
        photos: 250,
        drone: false,
        album: true
    },
    {
        type: "Fashion",
        name: "Fashion Shoot",
        price: 15000,
        duration: "5 Hours",
        photos: 300,
        drone: true,
        album: false
    },
    {
        type: "Travel",
        name: "Travel Photography",
        price: 12000,
        duration: "6 Hours",
        photos: 350,
        drone: true,
        album: false
    }
];


// Search Packages

function searchPackage() {

    const search = document
        .getElementById("search")
        .value
        .trim()
        .toLowerCase();

    const result = document.getElementById("result");

    if (search === "") {

        result.innerHTML = `
        <div class="col-12">
            <div class="alert alert-info text-center">
                Please enter a photography type or budget.
            </div>
        </div>
        `;

        return;
    }

    let filteredPackages = [];

    if (isNaN(search)) {

        filteredPackages = packages.filter(pkg =>
            pkg.type.toLowerCase().includes(search)
        );

    } else {

        filteredPackages = packages.filter(pkg =>
            pkg.price <= Number(search)
        );

    }

    displayPackages(filteredPackages);

}

// Display Cards

function displayPackages(data) {

    const result = document.getElementById("result");

    result.innerHTML = "";

    if (data.length === 0) {

        result.innerHTML = `
        <div class="col-12">
            <div class="alert alert-danger text-center">
                No Packages Found
            </div>
        </div>
        `;
        return;
    }

    let html = "";

    data.forEach(pkg => {

        html += `

        <div class="col-lg-4 col-md-6 mb-4">

            <div class="card package shadow h-100 border-0">

                <div class="card-body">

                    <span class="badge bg-primary mb-3">
                        ${pkg.type}
                    </span>

                    <h4 class="fw-bold">
                        ${pkg.name}
                    </h4>

                    <h2 class="text-success fw-bold">
                        ₹${Number(pkg.price).toLocaleString()}
                    </h2>

                    <hr>

                    <p>
                        ${pkg.duration}
                    </p>

                    <p>
                        ${pkg.photos} Edited Photos
                    </p>

                    <p>
                       
                        Drone:
                        <b>${pkg.drone ? "Included" : "Not Included"}</b>
                    </p>

                    <p>
                        Album:
                        <b>${pkg.album ? "Included" : "Not Included"}</b>
                    </p>

                    <a href="#contactForm" class="btn btn-primary w-100 mt-3">
                        
                        Book Now
                    </a>

                </div>

            </div>

        </div>

        `;

    });

    result.innerHTML = html;
}


// Search on Enter


document.getElementById("search").addEventListener("keypress", function (e) {

    if (e.key === "Enter") {

        searchPackage();

    }

});



// Animated Counter

const counters = document.querySelectorAll(".counter");

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const counter = entry.target;
            const target = +counter.dataset.target;
            let count = 0;
            const increment = target / 100;

            const updateCounter = () => {
                if (count < target) {
                    count += increment;
                    counter.innerText = Math.ceil(count);

                    if (target === 49) {
                        counter.innerText = (count / 10).toFixed(1) + " ★";
                    }

                    requestAnimationFrame(updateCounter);
                } else {
                    if (target === 49) {
                        counter.innerText = "4.9 ★";
                    } else {
                        counter.innerText = target + "+";
                    }
                }
            };

            updateCounter();
            observer.unobserve(counter);
        }
    });
}, {
    threshold: 0.5
});

counters.forEach(counter => observer.observe(counter));


// Smooth Scroll


document.querySelectorAll('a[href^="#"]').forEach(anchor => {

    anchor.addEventListener("click", function (e) {

        e.preventDefault();

        document.querySelector(this.getAttribute("href")).scrollIntoView({

            behavior: "smooth"

        });

    });

});

// Back To Top Button

const topButton = document.createElement("button");

topButton.innerHTML = '<i class="fas fa-arrow-up"></i>';

topButton.className = "btn btn-primary";

topButton.style.position = "fixed";
topButton.style.bottom = "20px";
topButton.style.right = "20px";
topButton.style.width = "50px";
topButton.style.height = "50px";
topButton.style.borderRadius = "50%";
topButton.style.display = "none";
topButton.style.zIndex = "1000";

document.body.appendChild(topButton);

window.addEventListener("scroll", () => {

    if (window.scrollY > 300) {

        topButton.style.display = "block";

    } else {

        topButton.style.display = "none";

    }

});

topButton.onclick = () => {

    window.scrollTo({

        top: 0,

        behavior: "smooth"

    });

};
// Enquiry Message
const form = document.getElementById("contactForm");
const message = document.getElementById("message");

form.addEventListener("submit", function (e) {
    e.preventDefault();

    const name = document.getElementById("name");
    const phone = document.getElementById("phone");
    const event = document.getElementById("event");

    let valid = true;

    // Regular Expressions
    const namePattern = /^[A-Za-z\s]+$/;
    const phonePattern = /^[0-9]{10}$/;

    // Clear previous validation
    [name, phone, event].forEach(field => {
        field.classList.remove("is-valid", "is-invalid");
    });

    // Name Validation
    if (
        name.value.trim().length < 3 ||
        !namePattern.test(name.value.trim())
    ) {
        name.classList.add("is-invalid");
        valid = false;
    } else {
        name.classList.add("is-valid");
    }

    // Phone Validation
    if (!phonePattern.test(phone.value.trim())) {
        phone.classList.add("is-invalid");
        valid = false;
    } else {
        phone.classList.add("is-valid");
    }

    // Event Validation
    if (event.value.trim().length < 10) {
        event.classList.add("is-invalid");
        valid = false;
    } else {
        event.classList.add("is-valid");
    }

    // If everything is valid
    if (valid) {
        message.innerHTML = `
            <div class="alert alert-success mt-3">
                <strong>Thank you, ${name.value}!</strong><br>
                Your inquiry has been submitted successfully.
            </div>
        `;

        form.reset();

        // Remove validation classes after reset
        [name, phone, event].forEach(field => {
            field.classList.remove("is-valid", "is-invalid");
        });
    } else {
        message.innerHTML = "";
    }
});

// Allow only letters and spaces in the name
document.getElementById("name").addEventListener("input", function () {
    this.value = this.value.replace(/[^A-Za-z\s]/g, "");
});

// Allow only numbers in the phone field
document.getElementById("phone").addEventListener("input", function () {
    this.value = this.value.replace(/\D/g, "").slice(0, 10);
});

