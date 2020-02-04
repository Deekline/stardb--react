import React from "react";
import './error-indicator.css';
import icon from './death-star.png';


const ErrorIndicator = () => {
    return (
        <div className='error-indicator'>
            <img src={ icon } alt="Death-star"/>
            <span className='boom'>
                BOOM!
            </span>
            <span>something goes wrong</span>
            <span>(but we have already sand drones to fix it)</span>
        </div>
    );
};

export default ErrorIndicator;