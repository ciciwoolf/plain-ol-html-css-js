// form-handler.js - Basic form functionality

document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('main-form');
  const formMessages = document.getElementById('form-messages');

  if (form) {
    // Form submission handler
    form.addEventListener('submit', function (event) {
      event.preventDefault(); // Prevent default form submission

      // Get form data
      const formData = new FormData(form);
      const data = {};

      // Convert FormData to regular object
      for (let [key, value] of formData.entries()) {
        if (data[key]) {
          // Handle multiple values (like checkboxes)
          if (Array.isArray(data[key])) {
            data[key].push(value);
          } else {
            data[key] = [data[key], value];
          }
        } else {
          data[key] = value;
        }
      }

      // Basic validation
      if (!data.firstName || !data.lastName || !data.email) {
        showMessage('Please fill in all required fields.', 'error');
        return;
      }

      // Simulate saving to localStorage
      try {
        const existingEntries = JSON.parse(
          localStorage.getItem('formEntries') || '[]'
        );
        const newEntry = {
          ...data,
          id: Date.now(),
          timestamp: new Date().toISOString(),
        };

        existingEntries.push(newEntry);
        localStorage.setItem('formEntries', JSON.stringify(existingEntries));

        showMessage(
          'Form submitted successfully! Data saved to localStorage.',
          'success'
        );

        // Clear form after successful submission
        form.reset();
      } catch (error) {
        console.error('Error saving to localStorage:', error);
        showMessage('Error saving data. Please try again.', 'error');
      }
    });

    // Clear form button handler
    const clearButton = document.getElementById('clear-form');
    if (clearButton) {
      clearButton.addEventListener('click', function () {
        form.reset();
        showMessage('Form cleared.', 'success');
      });
    }
  } else {
    console.log('Form not found');
  }

  // Helper function to show messages
  function showMessage(message, type) {
    if (formMessages) {
      formMessages.textContent = message;
      formMessages.className = `form-messages ${type}`;
      formMessages.style.display = 'block';

      // Hide message after 5 seconds
      setTimeout(() => {
        formMessages.style.display = 'none';
      }, 5000);
    }
  }
});
