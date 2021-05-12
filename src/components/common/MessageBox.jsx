import React from 'react';
import "./MessageBox.css"

export const MessageBox = (props) => {
    return (
        <div className={`alert alert-${props.variant || 'info'}`}>
            {props.children}
        </div>
    );
};