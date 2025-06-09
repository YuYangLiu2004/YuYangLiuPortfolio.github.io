import React from 'react';

function ResultsScreen({ flights, criteria, onSelectFlight }) {
    return (
        <div className="container py-5 view">
            <h2 className="text-center mb-4">Available Flights: {criteria.from} → {criteria.to}</h2>
            <div className="row g-4">
                {flights.map(flight => (
                    <div key={flight.id} className="col-md-12">
                        <div className="card flight-card h-100" style={{ cursor: 'pointer' }} onClick={() => onSelectFlight(flight)}>
                            <div className="card-body p-4 d-flex justify-content-between align-items-center">
                                <div>
                                    <h4 className="card-title mb-1">{flight.airline}</h4>
                                    <p className="card-text text-muted mb-0">{flight.durationString}</p>
                                </div>
                                <div className="text-end">
                                    <span className="price-tag fs-2">${flight.price}</span>
                                    {flight.tag && (
                                        <p className="mb-0 mt-1">
                                            <span className={`badge ${flight.tagColor === 'coral' ? 'badge-coral' : 'badge-blue'}`}>
                                                {flight.tag}
                                            </span>
                                        </p>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ResultsScreen;