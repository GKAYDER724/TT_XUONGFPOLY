// LoadingOverlay.js
import React from 'react';

const LoadingOverlay = () => (
    <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'green',
        color: 'white',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '2rem',
        zIndex: 1000
    }}>
        Loading...
    </div>
);

export default LoadingOverlay;
