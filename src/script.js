function updateTime() {
    const timeElement = document.getElementById('currentTime');
    // Checking if the element exists (it's only on index.html)
    if (timeElement) {
        timeElement.textContent = Date.now();
    }
}

updateTime();
setInterval(updateTime, 1000);



document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('contactForm');
    if (!form) return; // Stopping if we're not on the contact.html page

    const nameInput = document.getElementById('fullName');
    const emailInput = document.getElementById('email');
    const subjectInput = document.getElementById('subject');
    const messageInput = document.getElementById('message');
    const successMessage = document.getElementById('successMessage');

    // Helper function to show/hide errors
    const setError = (inputElement, message, errorTestId) => {
        const errorElement = document.getElementById(inputElement.getAttribute('aria-describedby'));
        if (errorElement) {
            errorElement.textContent = message;
        }
        inputElement.classList.toggle('invalid', !!message);
    };

    // Helper function to validate email format
    const isValidEmail = (email) => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    };

    const validateForm = (event) => {
        event.preventDefault(); // Prevent default submission initially

        let isValid = true;

        // Reset all errors and success message
        successMessage.style.display = 'none';
        setError(nameInput, '', 'test-contact-error-name');
        setError(emailInput, '', 'test-contact-error-email');
        setError(subjectInput, '', 'test-contact-error-subject');
        setError(messageInput, '', 'test-contact-error-message');

        // 1. Validation
        if (nameInput.value.trim() === '') {
            setError(nameInput, 'Full Name is required.', 'test-contact-error-name');
            isValid = false;
        }


        if (emailInput.value.trim() === '') {
            setError(emailInput, 'Email is required.', 'test-contact-error-email');
            isValid = false;
        } else if (!isValidEmail(emailInput.value.trim())) {
            setError(emailInput, 'Please enter a valid email address.', 'test-contact-error-email');
            isValid = false;
        }


        if (subjectInput.value.trim() === '') {
            setError(subjectInput, 'Subject is required.', 'test-contact-error-subject');
            isValid = false;
        }


        if (messageInput.value.trim() === '') {
            setError(messageInput, 'Message is required.', 'test-contact-error-message');
            isValid = false;
        } else if (messageInput.value.trim().length < 10) {
            setError(messageInput, 'Message must be at least 10 characters.', 'test-contact-error-message');
            isValid = false;
        }

        // Handle Submission
        if (isValid) {
            // Success Logic
            console.log('Form submitted successfully:', {
                name: nameInput.value.trim(),
                email: emailInput.value.trim(),
                subject: subjectInput.value.trim(),
                message: messageInput.value.trim(),
            });

            successMessage.style.display = 'block';
            form.reset();

            setTimeout(() => {
                successMessage.style.display = 'none';
            }, 5000);

        } else {
            // If invalid, focus on the first input with an error for accessibility
            const firstInvalid = form.querySelector('.invalid');
            if (firstInvalid) {
                firstInvalid.focus();
            }
        }
    };

    // Attach the validation function to the form's submit event
    form.addEventListener('submit', validateForm);
});