import React from 'react';

import classes from './Input.module.css';

const input = (props) => {
    let element = null;
    let validationError = null;
    const inputClasses = [classes.InputElement]

    if (props.invalid && props.shouldValidate && props.touched) {
        inputClasses.push(classes.Invalid);
        validationError = <p className={classes.ValidationError}>{props.errorMessage == null
            ? `Please enter a valid ${props.valueType}`
            : props.errorMessage}</p>
    }

    switch (props.elementType) {
        case ('input'):
            element = <input {...props.elementConfig}
                className={inputClasses.join(' ')}
                value={props.value}
                onChange={props.changed} />;
            break;
        case ('textArea'):
            element = <textarea {...props.elementConfig}
                className={inputClasses.join(' ')}
                value={props.value}
                onChange={props.changed} />;
            break;
        case ('select'):
            element = (
                <select
                    className={inputClasses.join(' ')}
                    onChange={props.changed}
                    value={props.value}>
                    {props.elementConfig.options.map(option => (
                        <option key={option.value} value={option.value}>{option.displayValue}</option>
                    ))}
                </select>
            );
            break;
        default:
            element = <input {...props.elementConfig}
                className={inputClasses.join(' ')}
                value={props.value}
                onChange={props.changed} />;
            break;
    }

    return (
        <div className={classes.Input}>
            <label className={classes.Label}>{props.label}</label>
            {element}
            {validationError}
        </div>
    );
}

export default input;