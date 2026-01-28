import React from 'react';

const FingoButton = ({ onClick, children, variant = 'primary', className = '', type = 'button', disabled = false }) => {
    const baseStyle = "font-bold rounded-xl transition-all active:translate-y-[2px] disabled:opacity-50 disabled:cursor-not-allowed";

    const variants = {
        primary: "bg-[#22C55E] text-white shadow-[0_4px_0_0_#15803D] hover:shadow-[0_2px_0_0_#15803D] hover:translate-y-[1px] active:shadow-none",
        secondary: "bg-white text-[#22C55E] border-2 border-gray-100 shadow-[0_4px_0_0_#E2E8F0] hover:shadow-[0_2px_0_0_#E2E8F0] hover:translate-y-[1px] active:shadow-none",
        danger: "bg-red-500 text-white shadow-[0_4px_0_0_#991B1B] hover:shadow-[0_2px_0_0_#991B1B] hover:translate-y-[1px] active:shadow-none",
        white: "bg-white text-gray-700 border-2 border-gray-200 shadow-[0_4px_0_0_#E5E7EB] hover:shadow-[0_2px_0_0_#E5E7EB] hover:translate-y-[1px] active:shadow-none"
    };

    return (
        <button
            type={type}
            onClick={onClick}
            disabled={disabled}
            className={`${baseStyle} ${variants[variant] || variants.primary} ${className} px-6 py-3`}
        >
            {children}
        </button>
    );
};

export default FingoButton;
