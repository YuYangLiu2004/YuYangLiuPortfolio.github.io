import React from 'react';

function CheckoutScreen({ flight, criteria, onConfirm }) {
    if (!flight || !criteria) return <div className="container py-5 text-center">Please select a flight first.</div>;

    // --- UPDATED Price Calculation Logic ---
    // This is the one-way price for all passengers.
    const oneWayTotal = flight.price * criteria.passengers;
    
    // The final total is doubled if it's a round-trip.
    let finalTotal = oneWayTotal;
    if (criteria.tripType === 'round-trip') {
        finalTotal = oneWayTotal * 2;
    }
    // ------------------------------------

    const formatDate = (dateString) => {
        if (!dateString) return 'N/A';
        return new Date(dateString + 'T00:00:00').toLocaleDateString('en-US', {
            weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
        });
    };

    return (
        <div className="container py-5 view">
            <h2 className="text-center mb-4">Confirm and Purchase</h2>
            <div className="card shadow-sm p-4 mx-auto" style={{ maxWidth: '700px' }}>
                {/* Trip Details Section */}
                <h4 className="mb-3"><i className="bi bi-airplane-fill text-muted"></i> Your Trip Details</h4>
                <hr />
                <p className="mb-2 fs-5"><strong>Route:</strong> {criteria.from} → {criteria.to}</p>
                <p className="mb-2 fs-5"><strong>Trip Type:</strong> <span className="text-capitalize">{criteria.tripType.replace('-', ' ')}</span></p>
                <p className="mb-2 fs-5"><strong>Passengers:</strong> {criteria.passengers}</p>
                <p className="mb-2 fs-5"><strong>Departure:</strong> {formatDate(criteria.date)}</p>
                {criteria.tripType === 'round-trip' && (
                    <p className="mb-2 fs-5"><strong>Return:</strong> {formatDate(criteria.returnDate)}</p>
                )}
                <p className="mb-2 fs-5"><strong>Airline:</strong> {flight.airline}</p>
                
                {/* Price Breakdown Section */}
                <h4 className="mt-4 mb-3"><i className="bi bi-tag-fill text-muted"></i> Price Breakdown</h4>
                <hr />
                <div className="d-flex justify-content-between">
                    <p className="mb-1">{criteria.passengers} x Ticket(s) at ${flight.price} each (one-way):</p>
                    <span>${oneWayTotal}</span>
                </div>
                {/* Updated display logic for round-trip */}
                {criteria.tripType === 'round-trip' && (
                    <div className="d-flex justify-content-between">
                        <p className="mb-1">Return Trip:</p>
                        <span>+${oneWayTotal}</span>
                    </div>
                )}
                <hr />
                
                {/* Final Total */}
                <div className="d-flex justify-content-between align-items-center">
                    <h4 className="mb-0">Total Price:</h4>
                    <span className="price-tag fs-2">${finalTotal}</span>
                </div>

                <button onClick={onConfirm} className="btn btn-coral btn-lg mt-4">
                    Purchase Ticket
                </button>
            </div>
        </div>
    );
}

export default CheckoutScreen;