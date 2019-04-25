import React from 'react';
import './App.css';
import CitiesContainer from "./containers/CitiesContainer";
import NavMenu from './components/NavMenu';


function App() {
    return (
        <div>
            <NavMenu/>
            <CitiesContainer/>
        </div>
    );
}

export default App;
