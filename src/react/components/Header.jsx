import React, {useState} from 'react';
import {
	Box,
	Icon,
	IconButton,
	Input,
	InputGroup,
	InputLeftElement,
	Spinner,
	useDisclosure,
	useToast
} from "@chakra-ui/react";
import {FaLink, FaSearch} from "react-icons/all";
import ModalSearch from "./ModalSearch";
import {dataSearch} from "../react-utils/downloadModelTest";
import MainApiRoute from "../service/MainApiRoute";
import ModalSpiner from "./ModalSpiner";

const Header = () => {

	const [value, setValue] = useState('')
	const [searchData, setData] = useState({})
	const [showSpinner, setShow] = useState(false)
	const { isOpen, onOpen, onClose } = useDisclosure()
	const toast = useToast()

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

	const search = async () => {

		if (!localStorage.getItem('savePath'))
			return createAlert('warning', 'Not found save path! Please write path in setting.')

		setShow(true)

		MainApiRoute.searchVideo(value).then(async dataSearch => {

			setShow(false)

			if(dataSearch.ok === false)
				return createAlert('error', dataSearch.message.toString())

			console.log(dataSearch)

			await setData(dataSearch)
			await onOpen()
			await setValue('')
		})
	}

	return (
		<Box w={'100%'} maxW={'800px'} h={'50px'} bg={'gray.700'} my={2} rounded={5}>

			<ModalSpiner showSpinner={showSpinner}/>
			<ModalSearch onClose={onClose} isOpen={isOpen} config={searchData}/>

			<Box display={'flex'} p={1} justifyContent={'center'} alignItems={'center'} >
				<InputGroup>
					<InputLeftElement pointerEvents='none' children={<Icon as={FaLink} color={'gray.400'}/>}/>
					<Input value={value} onChange={ev => setValue(ev.target.value)} type='text' placeholder='URL to video' variant={'flushed'}/>
				</InputGroup>
				<IconButton mx={1} onClick={search} aria-label={'search'} icon={<Icon as={FaSearch}/>}/>
			</Box>

		</Box>
	);
};

export default Header;