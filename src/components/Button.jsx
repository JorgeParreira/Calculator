import React from "react";
import './Button.css';

/*
 export default props =>
    <button className={`
        button
        ${props.operation ? 'operation' : ''}
        ${props.doble ? 'doble' : ''}
        ${props.triple ? 'triple' : ''}
    `}>
        {props.label}
        </button>
 */

export default props => {

    let classes = 'button '
    classes += props.operation ? 'operation' : ''
    classes += props.double ? 'double' : ''
    classes += props.triple ? 'triple' : ''

    return (
        <button 
            onClick={e => props.click(props.label)}
            className={classes}>
            {props.label}
        </button>
    )
}
