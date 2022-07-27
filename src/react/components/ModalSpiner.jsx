import React from 'react';
import {Modal, ModalContent, ModalOverlay, Spinner} from "@chakra-ui/react";


const ModalSpiner = ({showSpinner}) => {

	return (
		<Modal isOpen={showSpinner}>
			<ModalOverlay/>
			<ModalContent shadow={'none'} display={'flex'} bg={'transparent'} m={'auto'} justifyContent={'center'} alignItems={'center'}>
				<Spinner
					thickness='4px'
					speed='0.65s'
					emptyColor='gray.200'
					color='blue.500'
					size='xl'
				/>
			</ModalContent>
		</Modal>
	);
};

export default ModalSpiner;