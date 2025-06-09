import React, { useState } from 'react';

function HomeScreen({ onSearch }) {
    // State to hold all form input values
    const [from, setFrom] = useState('');
    const [to, setTo] = useState('');
    const [date, setDate] = useState('');
    const [returnDate, setReturnDate] = useState('');
    const [passengers, setPassengers] = useState(1);
    const [tripType, setTripType] = useState('one-way');
    
    // State for validation errors
    const [errors, setErrors] = useState({});

    const handleSearchClick = () => {
        const newErrors = {};

        // 1. Validate inputs
        if (!from) newErrors.from = "'From' field is required.";
        if (!to) newErrors.to = "'To' field is required.";
        if (!date) newErrors.date = "Departure date is required.";
        if (tripType === 'round-trip' && !returnDate) {
            newErrors.returnDate = "Return date is required for a round-trip.";
        }

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }
        
        // 2. If validation passes, call onSearch with all data
        setErrors({});
        onSearch({ from, to, date, passengers, tripType, returnDate });
    };

    return (
        <div className="container text-center py-5 view">
            <h1 className="display-4 fw-bold">Find Your Next Getaway</h1>
            <p className="lead mb-4">Book your dream trip with confidence and ease.</p>
            <div className="card p-4 shadow-sm mx-auto" style={{ maxWidth: '700px' }}>
                
                {/* Trip Type Selection */}
                <div className="d-flex justify-content-center mb-3">
                    <div className="form-check form-check-inline">
                        <input className="form-check-input" type="radio" name="tripType" id="one-way" value="one-way" checked={tripType === 'one-way'} onChange={() => setTripType('one-way')} />
                        <label className="form-check-label" htmlFor="one-way">One-way</label>
                    </div>
                    <div className="form-check form-check-inline">
                        <input className="form-check-input" type="radio" name="tripType" id="round-trip" value="round-trip" checked={tripType === 'round-trip'} onChange={() => setTripType('round-trip')} />
                        <label className="form-check-label" htmlFor="round-trip">Round-trip</label>
                    </div>
                </div>

                <div className="row g-3">
                    {/* From & To Fields */}
                    <div className="col-md-6"><input type="text" className={`form-control form-control-lg ${errors.from ? 'is-invalid' : ''}`} placeholder="From" value={from} onChange={(e) => setFrom(e.target.value)} />{errors.from && <div className="invalid-feedback text-start">{errors.from}</div>}</div>
                    <div className="col-md-6"><input type="text" className={`form-control form-control-lg ${errors.to ? 'is-invalid' : ''}`} placeholder="To" value={to} onChange={(e) => setTo(e.target.value)} />{errors.to && <div className="invalid-feedback text-start">{errors.to}</div>}</div>
                    
                    {/* Date Fields */}
                    <div className="col-md-6"><label className="form-label text-start w-100 ps-1">Depart</label><input type="date" className={`form-control form-control-lg ${errors.date ? 'is-invalid' : ''}`} value={date} onChange={(e) => setDate(e.target.value)} />{errors.date && <div className="invalid-feedback text-start">{errors.date}</div>}</div>
                    
                    {/* Conditional Return Date Field */}
                    {tripType === 'round-trip' && (
                        <div className="col-md-6"><label className="form-label text-start w-100 ps-1">Return</label><input type="date" className={`form-control form-control-lg ${errors.returnDate ? 'is-invalid' : ''}`} value={returnDate} onChange={(e) => setReturnDate(e.target.value)} />{errors.returnDate && <div className="invalid-feedback text-start">{errors.returnDate}</div>}</div>
                    )}
                    
                    {/* Passenger Selection */}
                    <div className="col-12"><label className="form-label text-start w-100 ps-1">Passengers</label><select className="form-select form-select-lg" value={passengers} onChange={(e) => setPassengers(parseInt(e.target.value, 10))}>{[1, 2, 3, 4, 5, 6].map(p => <option key={p} value={p}>{p}</option>)}</select></div>
                    
                    <div className="col-12 mt-4"><button onClick={handleSearchClick} className="btn btn-coral btn-lg w-100">Find Flights <i className="bi bi-search"></i></button></div>
                </div>
            </div>
        </div>
    );
}

export default HomeScreen;