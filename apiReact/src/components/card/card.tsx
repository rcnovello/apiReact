import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';

interface CustomCardProps {
    title: string;
    children: React.ReactNode;
}

const CustomCard: React.FC<CustomCardProps> = ({ title, children }) => {
    return (
        <Card sx={{ maxWidth: 400, margin: '20px auto', padding: '10px' }}>
            <Typography variant='h5' component='div' gutterBottom>
                {title}
            </Typography>
            <CardContent>
                {children}
            </CardContent>
        </Card>
    );
};

export default CustomCard;
