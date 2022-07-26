import React, {useState} from 'react';
import {Box, Icon, IconButton, Input, InputGroup, InputLeftElement, useDisclosure} from "@chakra-ui/react";
import {FaLink, FaSearch} from "react-icons/all";
import ModalSearch from "./ModalSearch";
import {dataSearch} from "../react-utils/downloadModelTest";

const Header = () => {

	const [value, setValue] = useState('')
	const [searchData, setData] = useState({})
	const { isOpen, onOpen, onClose } = useDisclosure()

	const search = async () => {
		await setData(dataSearch)
		await onOpen()
		await setValue('')
	}

	return (
		<Box w={'100%'} maxW={'800px'} h={'50px'} bg={'gray.700'} my={2} rounded={5}>

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