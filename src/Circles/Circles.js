import React from 'react';
import './Circles.css';

// Margit teki tänne pelkän function-based componentin, koska statet on App.js:stä. Appin on hankala
// mennä etsimään stateja eri tiedostosta.
const Circles = (props) => {
    return (
        <div 
        className={'circle' + (props.active ? ' active' : '')}
        onClick={props.click}
        style={{ backgroundColor: props.active ? props.active : props.buttonColor }}
        >
        </div>
    )
}


export default Circles;