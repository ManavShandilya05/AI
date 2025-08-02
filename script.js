document.addEventListener("DOMContentLoaded", () => {
  const navbar = document.querySelector(".navbar");
  const hamburger = document.querySelector(".hamburger");
  const navLinks = document.querySelector(".nav-links");
  const dropdownToggle = document.querySelector(".dropdown-toggle");
  const dropdownContent = document.querySelector(".dropdown-content");

  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  });

  hamburger.addEventListener("click", () => {
    navLinks.classList.toggle("nav-active");
  });
  let count = 0;
  dropdownToggle.addEventListener("click", (event) => {
    count++;
    event.preventDefault(); // Prevent default anchor click behavior
    // dropdownContent.classList.toggle("show");
    if (count % 2 != 0) {
      dropdownContent.classList.add("show");
    } else {
      dropdownContent.classList.remove("show");
    }
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const openModal = (modalId) => {
    document.getElementById(modalId).style.display = "flex";
  };

  const closeModal = (modalId) => {
    document.getElementById(modalId).style.display = "none";
  };

  window.openModal = openModal;
  window.closeModal = closeModal;
});

// document.querySelectorAll(".leader-card").forEach((card) => {
//   card.addEventListener("click", () => {
//     card.classList.toggle("active");
//   });
// });

document.addEventListener("DOMContentLoaded", () => {
  const container = document.querySelector(".container");
  const clients = Array.from(container.children);
  console.log(clients);
  const totalClients = clients.length;

  // Duplicate clients to create a continuous scrolling effect
  clients.forEach((client) => {
    container.appendChild(client.cloneNode(true));
  });

  function setScrollSpeed() {
    const containerWidth = container.scrollWidth / 2;
    const scrollDuration = containerWidth / 200; // Adjust the speed by changing the divisor

    container.style.animationDuration = `${scrollDuration}s`;
  }

  setScrollSpeed();

  window.addEventListener("resize", setScrollSpeed);
});

document
  .getElementById("contactForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    const templateParams = {
      from_name: document.getElementById("name").value,
      from_mobile: document.getElementById("mobile").value,
      from_email: document.getElementById("email").value,
      subject: document.getElementById("subject").value,
      message: document.getElementById("message").value,
    };

    emailjs.send("service_0k092ve", "template_eja213b", templateParams).then(
      function (response) {
        Toastify({
          text: "Email sent successfully!",
          duration: 3000,
          close: true,
          gravity: "top", // `top` or `bottom`
          position: "right", // `left`, `center` or `right`
          backgroundColor: "linear-gradient(to right, #00b09b, #96c93d)",
          stopOnFocus: true, // Prevents dismissing of toast on hover
        }).showToast();
      },
      function (error) {
        Toastify({
          text: "Failed to send email!",
          duration: 3000,
          close: true,
          gravity: "top", // `top` or `bottom`
          position: "right", // `left`, `center` or `right`
          backgroundColor: "linear-gradient(to right, #ff5f6d, #ffc371)",
          stopOnFocus: true, // Prevents dismissing of toast on hover
        }).showToast();
      }
    );
  });


  document.addEventListener('DOMContentLoaded', () => {
    // --- Hamburger Menu Logic ---
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    if (hamburger) {
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('nav-active');
        });
    }

    // --- Licenses Page Logic ---
    // Simulate authorized users. In a real app, this comes from a secure backend.
    const ALLOWED_EMAILS = ['admin@example.com', 'manager@example.com'];

    // DOM Elements for Licenses
    const licensesGrid = document.getElementById('licenses-grid');
    const yearFilter = document.getElementById('year-filter');
    const uploadBtn = document.getElementById('upload-btn');
    const uploadModal = document.getElementById('upload-modal');
    const closeUploadModal = document.getElementById('close-upload-modal');
    const uploadForm = document.getElementById('upload-form');
    const lightboxModal = document.getElementById('lightbox-modal');
    const lightboxImg = document.getElementById('lightbox-img');
    const closeLightboxModal = document.getElementById('close-lightbox-modal');

    // Initial data - this would typically come from a database.
    // documentUrl can be a real URL or a Base64 string.
    let licenses = [
        {
            id: 1,
            financialYear: '23-24',
            fileName: 'Company Registration Certificate',
            documentUrl: 'assets/sample-license-1.jpg', // Use a placeholder image
            isPdf: false
        },
        {
            id: 2,
            financialYear: '23-24',
            fileName: 'Tax Compliance Certificate',
            documentUrl: 'assets/sample-license-2.jpg', // Use a placeholder image
            isPdf: false
        },
        {
            id: 3,
            financialYear: '24-25',
            fileName: 'Operating License 24-25',
            documentUrl: 'assets/sample-license-3.jpg', // Use a placeholder image
            isPdf: false
        }
    ];

    // Function to render license cards
    const renderLicenses = (filterYear = 'all') => {
        if (!licensesGrid) return; // Exit if not on the licenses page
        
        licensesGrid.innerHTML = ''; // Clear existing cards
        

        const filteredLicenses = licenses.filter(license =>
            filterYear === 'all' || license.financialYear === filterYear
        );

        if (filteredLicenses.length === 0) {
            licensesGrid.innerHTML = '<p>No licenses found for this period.</p>';
            return;
        }

        filteredLicenses.forEach(license => {
            const card = document.createElement('div');
            card.className = 'license-card';
            card.dataset.documentUrl = license.documentUrl;
            card.dataset.isPdf = license.isPdf;

            // Display an image or a PDF icon
            let cardContent = '';
            if (license.isPdf) {
                cardContent = '<div class="pdf-icon"><i class="fas fa-file-pdf"></i></div>';
            } else {
                cardContent = `<img src="${license.documentUrl}" alt="${license.fileName}">`;
            }

            card.innerHTML = `
                ${cardContent}
                <div class="card-overlay">
                    <span>${license.fileName}</span>
                </div>
            `;

            // Event listener for opening the lightbox
            card.addEventListener('click', () => {
                if (license.isPdf) {
                    // For PDFs, open in a new tab as lightbox can't display them.
                    window.open(license.documentUrl, '_blank');
                } else {
                    lightboxImg.src = license.documentUrl;
                    lightboxModal.style.display = 'flex';
                }
            });

            licensesGrid.appendChild(card);
        });
    };

    // --- Event Listeners ---

    // Filter licenses when dropdown changes
    if (yearFilter) {
        yearFilter.addEventListener('change', (e) => {
            renderLicenses(e.target.value);
        });
    }

    // Modal Open/Close Logic
    if (uploadBtn) {
        uploadBtn.addEventListener('click', () => {
            console.log('Upload button clicked');
            uploadModal.style.display = 'block';
        });
    }

    const closeModal = (modal) => {
        if (modal) {
            modal.style.display = 'none';
        }
    };
    
    if (closeUploadModal) closeUploadModal.addEventListener('click', () => closeModal(uploadModal));
    if (closeLightboxModal) closeLightboxModal.addEventListener('click', () => closeModal(lightboxModal));
    
    window.addEventListener('click', (e) => {
        if (e.target === uploadModal) closeModal(uploadModal);
        if (e.target === lightboxModal) closeModal(lightboxModal);
    });

    // Handle Upload Form Submission
    if (uploadForm) {
        uploadForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const email = document.getElementById('email').value;
            const financialYear = document.getElementById('financial-year').value;
            const fileName = document.getElementById('filename').value;
            const fileInput = document.getElementById('document-upload');
            const file = fileInput.files[0];

            // 1. Authorization Check (Simulated)
            if (!ALLOWED_EMAILS.includes(email.toLowerCase())) {
                alert('Error: You are not authorized to upload documents.');
                return;
            }

            if (!file) {
                alert('Please select a file to upload.');
                return;
            }
            
            // 2. File Handling with FileReader API
            const reader = new FileReader();

            reader.onload = function (event) {
                const documentUrl = event.target.result; // This is the Base64 Data URL
                const isPdf = file.type === "application/pdf";

                const newLicense = {
                    id: licenses.length + 1,
                    financialYear,
                    fileName,
                    documentUrl,
                    isPdf
                };

                // Add to our "database" and re-render
                licenses.push(newLicense);
                renderLicenses(yearFilter.value);

                alert('File uploaded successfully!');
                uploadForm.reset();
                closeModal(uploadModal);
            };

            reader.onerror = function() {
                alert('Error reading file.');
            };

            // Read the file as a Data URL
            reader.readAsDataURL(file);
        });
    }

    // Initial render of licenses on page load
    renderLicenses();
});
