import React from 'react';
import {
	Button, Icon,
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalFooter,
	ModalHeader,
	ModalOverlay
} from "@chakra-ui/react";
import ModalSearchBody from "./ModalSearchBody";
import {FaVideo} from "react-icons/all";


const ModalSearch = ({isOpen, onClose, config}) => {

	const download = async () => {
		await console.log(config)
		await onClose()
	}

	return (
		<Modal isOpen={isOpen} onClose={onClose}>
			<ModalOverlay />
			<ModalContent>
				<ModalHeader display={'flex'} alignItems={'center'} justifyContent={'left'}>
					<Icon mx={2} as={FaVideo}/>Video
				</ModalHeader>
				<ModalCloseButton />
				<ModalBody>
					<ModalSearchBody config={config}/>
				</ModalBody>

				<ModalFooter>
					<Button colorScheme='green' mr={3} onClick={download}>
						Download
					</Button>
				</ModalFooter>
			</ModalContent>
		</Modal>
	);
};

export default ModalSearch;