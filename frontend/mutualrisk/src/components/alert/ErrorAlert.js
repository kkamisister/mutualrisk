import * as React from 'react';
import Alert from '@mui/material/Alert';

export default function ErrorAlert({ message }) {
	return <Alert severity="error">{message}</Alert>;
}
