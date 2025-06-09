import React from 'react';

function ConfirmationScreen({ onBookAnother }) {
    return (
        <div className="container text-center py-5 view">
            <i className="bi bi-check-circle-fill text-success" style={{ fontSize: '6rem' }}></i>
            <h1 className="display-4 mt-3">Booking Confirmed!</h1>
            <p className="lead">Enjoy your Flight, thank you for choosing G36 Air.</p>
            <button onClick={onBookAnother} className="btn btn-outline-secondary mt-3">
                Book Another Flight
            </button>
        </div>
    );
}

export default ConfirmationScreen;