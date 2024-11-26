import React from 'react';
import Button from '@mui/material/Button';

interface CustomButtonProps {
    label: string;
    onClick: () => void;
    variant?: 'contained' | 'outlined' | 'text'; // Tipos de botão do MUI
    color?: 'primary' | 'secondary' | 'error' | 'warning' | 'info' | 'success'; // Cores disponíveis
    disabled?: boolean;
}

const CustomButton: React.FC<CustomButtonProps> = ({
    label,
    onClick,
    variant = 'contained',
    color = 'primary',
    disabled = false,
}) => {
    return (
        <Button 
            variant={variant} 
            color={color} 
            onClick={onClick} 
            disabled={disabled}
        >
            {label}
        </Button>
    );
};

export default CustomButton;
