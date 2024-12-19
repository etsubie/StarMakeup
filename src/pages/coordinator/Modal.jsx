import React from 'react';

const Modal = ({ isOpen, onClose, description }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white rounded-lg p-6 max-w-lg w-full">
                <h2 className="text-2xl font-semibold mb-4">Course Description</h2>
                <p>{description}</p>
                <button 
                    className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                    onClick={onClose}
                >
                    Close
                </button>
            </div>
        </div>
    );
};

export default Modal;