import React from 'react';
import classNames from 'classnames';
import './Button.scss';

export const Button = ({ title = '', className = '', onClick, children }) => {
    const buttonClassName = classNames({
        Button: true,
        [className]: className,
    });

    return (
        <button className={buttonClassName} onClick={onClick}>
            {title}
            {children}
        </button>
    );
};
