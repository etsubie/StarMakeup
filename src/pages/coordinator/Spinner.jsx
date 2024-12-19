// Spinner.jsx
import React from 'react';

const Spinner = () => (
    <div className="loader"></div>
);

// Add CSS for the spinner
const spinnerStyle = `
.loader {
    border: 8px solid #f3f3f3; /* Light grey */
    border-top: 8px solid #3498db; /* Blue */
    border-radius: 50%;
    width: 60px;
    height: 60px;
    animation: spin 2s linear infinite;
}

@keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
}
`;

// Optionally inject styles if using CSS-in-JS solution
// Or move the spinnerStyle to a CSS file

export default Spinner; // Ensure default export