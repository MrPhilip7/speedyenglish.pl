// Contact Form Handler
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');

    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            // Get form data
            const formData = new FormData(this);
            const data = Object.fromEntries(formData);

            // Basic validation
            if (!validateForm(data)) {
                return;
            }

            // Show loading state
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i>Wysyłanie...';
            submitBtn.disabled = true;

            // Simulate form submission (replace with actual API call)
            setTimeout(() => {
                // Reset button
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;

                // Show success message
                showMessage('Dziękujemy za wiadomość! Odpowiemy najszybciej jak to możliwe.', 'success');

                // Reset form
                this.reset();
            }, 2000);
        });
    }

    function validateForm(data) {
        const errors = [];

        // First name validation
        if (!data.firstName || data.firstName.trim().length < 2) {
            errors.push('Imię musi mieć co najmniej 2 znaki');
        }

        // Last name validation  
        if (!data.lastName || data.lastName.trim().length < 2) {
            errors.push('Nazwisko musi mieć co najmniej 2 znaki');
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!data.email || !emailRegex.test(data.email)) {
            errors.push('Podaj prawidłowy adres email');
        }

        // Message validation
        if (!data.message || data.message.trim().length < 10) {
            errors.push('Wiadomość musi mieć co najmniej 10 znaków');
        }

        if (errors.length > 0) {
            showMessage(errors.join('<br>'), 'error');
            return false;
        }

        return true;
    }

    function showMessage(message, type) {
        // Remove existing messages
        const existingMessage = document.querySelector('.alert-message');
        if (existingMessage) {
            existingMessage.remove();
        }

        // Create new message
        const messageDiv = document.createElement('div');
        messageDiv.className = `alert alert-message ${type === 'success' ? 'alert-success' : 'alert-danger'} mt-3`;
        messageDiv.style.borderRadius = '8px';
        messageDiv.innerHTML = message;

        // Insert after form
        contactForm.appendChild(messageDiv);

        // Auto remove after 5 seconds
        setTimeout(() => {
            if (messageDiv.parentNode) {
                messageDiv.remove();
            }
        }, 5000);
    }

    // Add smooth focus effects
    const formInputs = document.querySelectorAll('.form-control');
    formInputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.style.transform = 'translateY(-2px)';
            this.style.boxShadow = '0 8px 25px rgba(37, 99, 235, 0.15)';
        });
        
        input.addEventListener('blur', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '';
        });
    });
});