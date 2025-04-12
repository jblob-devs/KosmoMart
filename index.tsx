import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

export default function App() {
    return (
        <div style={{ backgroundColor: 'black', color: 'white', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <h1>Welcome to KosmoMart</h1>
        </div>
    )
};

ReactDOM.render(<App />, document.getElementById('root'));