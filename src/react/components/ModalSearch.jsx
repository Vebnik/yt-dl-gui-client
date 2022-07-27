import React, {useState} from 'react';
import {
	Button, Icon,
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalFooter,
	ModalHeader,
	ModalOverlay, useToast
} from "@chakra-ui/react";
import ModalSearchBody from "./ModalSearchBody";
import {FaVideo} from "react-icons/all";
import MainApiRoute from "../service/MainApiRoute";
import ModalSpiner from "./ModalSpiner";


const ModalSearch = ({isOpen, onClose, config}) => {

	const toast = useToast()
	const [showSpinner, setShow] = useState(false)
	const [filter, setFilter] = useState('audioAndVideo')
	const createAlert = (status, description) => {
		toast({
			title: 'Warning',
			description: description,
			status: status,
			duration: 2000,
			isClosable: true,
			position: 'top'
		})
	}

	const download = async () => {
		setShow(true)

		MainApiRoute.downloadVideo({url: config.url, filter}).then(results => {
			setShow(false)

			if(results.ok === false)
				return createAlert('error', results.message.toString())

			onClose()
		})
	}


	return (
		<Modal isOpen={isOpen} onClose={onClose} size={'3xl'}>
			<ModalOverlay />
			<ModalContent>
				<ModalHeader display={'flex'} alignItems={'center'} justifyContent={'left'}>
					<Icon mx={2} as={FaVideo}/>Video
				</ModalHeader>
				<ModalCloseButton/>
				<ModalBody>
					<ModalSpiner showSpinner={showSpinner}/>
					<ModalSearchBody config={config} setFilter={setFilter} filter={filter}/>
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