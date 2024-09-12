import * as React from 'react';
import { useState } from 'react';
import { Modal, Box, Button, Typography } from '@mui/material';
import BasicButton from 'components/button/basicbutton';

const CreateModal = () => {
	const [step, setStep] = useState(1);

	return (
		<Modal>
			<BasicButton></BasicButton>
		</Modal>
	);
};

export default CreateModal;
