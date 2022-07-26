import React from 'react';
import {Box, ButtonGroup, Icon, IconButton, Wrap} from "@chakra-ui/react";
import {FaWindowClose, FaWindowMaximize, FaWindowMinimize} from "react-icons/all";

const TitleBar = () => {

	const winDrive = (ev) => {
		console.log(ev.target.innerText)
	}

	return (
		<Box w={'100%'} bg={'gray.600'} h={'30px'} justifyContent={'space-between'} display={'flex'}>
			<Wrap style={{WebkitAppRegion: 'drag'}} width={'100%'}/>
			<ButtonGroup zIndex={1000} justifyContent={'center'} alignItems={'center'}>
				<IconButton onClick={winDrive} bg={'none'} h={'80%'} aria-label={'1'} icon={<Icon as={FaWindowMinimize}/>}/>
				<IconButton onClick={winDrive} bg={'none'} h={'80%'} aria-label={'2'} icon={<Icon as={FaWindowMaximize}/>}/>
				<IconButton onClick={winDrive} bg={'none'} h={'80%'} aria-label={'3'} icon={<Icon as={FaWindowClose}/>}/>
			</ButtonGroup>
		</Box>
	);
}


export default TitleBar;