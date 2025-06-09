import React, { useState } from 'react';
import './App.css';


import Header from './components/Header';
import Footer from './components/Footer';
import HomeScreen from './screens/HomeScreen';
import ResultsScreen from './screens/ResultsScreen';
import CheckoutScreen from './screens/CheckoutScreen';
import ConfirmationScreen from './screens/ConfirmationScreen';

const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
const formatDuration = (minutes) => `${Math.floor(minutes / 60)}h ${minutes % 60}m`;

function App() {
    const [currentView, setCurrentView] = useState('home');
    const [flights, setFlights] = useState([]);
    const [selectedFlight, setSelectedFlight] = useState(null);
    const [searchCriteria, setSearchCriteria] = useState({}); 

    const generateAndSetFlights = () => {
        const airlines = ['Delta', 'Southwest', 'United'];
        const baseDuration = 360; 

 
        let generatedFlights = airlines.map((airline, index) => ({
            id: index + 1,
            airline: airline,
            price: getRandomInt(300, 500), 
            durationInMinutes: baseDuration + getRandomInt(-30, 30),
            tag: null,
            tagColor: null,
        }));
  
        const cheapestFlight = generatedFlights.reduce((prev, curr) => (prev.price < curr.price ? prev : curr));
        const fastestFlight = generatedFlights.reduce((prev, curr) => (prev.durationInMinutes < curr.durationInMinutes ? prev : curr));
        
        const cheapestRef = generatedFlights.find(f => f.id === cheapestFlight.id);
        if (cheapestRef) {
            cheapestRef.tag = 'Best Value!';
            cheapestRef.tagColor = 'coral';
        }

        const fastestRef = generatedFlights.find(f => f.id === fastestFlight.id);
        if (fastestRef) {
            fastestRef.tag = fastestRef.tag ? `${fastestRef.tag} & Fastest` : 'Fastest';
            fastestRef.tagColor = 'blue';
        }

        generatedFlights.forEach(flight => {
            flight.durationString = formatDuration(flight.durationInMinutes);
        });

        setFlights(generatedFlights);
    };

    const handleSearch = (criteria) => {
        setSearchCriteria(criteria);
        generateAndSetFlights(); 
        setCurrentView('results');
    };

    const handleSelectFlight = (flight) => {
        setSelectedFlight(flight);
        setCurrentView('checkout');
    };

    const handleConfirm = () => {
        setCurrentView('confirmation');
    };
    
    const handleBookAnother = () => {
        setCurrentView('home');
    };

    const renderView = () => {
        switch (currentView) {
            case 'home':
                return <HomeScreen onSearch={handleSearch} />;
            case 'results':
                return <ResultsScreen flights={flights} criteria={searchCriteria} onSelectFlight={handleSelectFlight} />;
            case 'checkout':
                return <CheckoutScreen flight={selectedFlight} criteria={searchCriteria} onConfirm={handleConfirm} />;
            case 'confirmation':
                return <ConfirmationScreen onBookAnother={handleBookAnother} />;
            default:
                return <HomeScreen onSearch={handleSearch} />;
        }
    };

    return (
        <div className="d-flex flex-column min-vh-100">
            <Header />
            <main className="flex-grow-1">
                {renderView()}
            </main>
            <Footer />
        </div>
    );
}

export default App;