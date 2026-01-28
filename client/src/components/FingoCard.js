import React from 'react';

const FingoCard = ({ children, className = '', ...props }) => {
    return (
        <div className={`bg-white rounded-3xl border-2 border-gray-100 shadow-xl p-6 ${className}`} {...props}>
            {children}
        </div>
    );
};

export default FingoCard;
