import React from 'react';
import './Button.css';

interface ButtonProps {
  onClick: () => void;
  children: React.ReactNode;
  variant?: 'primary' | 'secondary';
  disabled?: boolean;
}

export const Button: React.FC<ButtonProps> = ({ 
  onClick, 
  children, 
  variant = 'primary',
  disabled = false 
}) => {
  return (
    <button
      className={`tg-button tg-button-${variant}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};