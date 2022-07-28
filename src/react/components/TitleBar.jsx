import React from 'react';
import {Box, ButtonGroup, Icon, IconButton, Wrap} from "@chakra-ui/react";
import {FaWindowClose, FaWindowMaximize, FaWindowMinimize} from "react-icons/all";
import MainApiRoute from "../service/MainApiRoute";

const TitleBar = () => {

	const winDriveMin = () => MainApiRoute.windowDrive('minimize')
	const winDriveMax = () => MainApiRoute.windowDrive('maximize')
	const winDriveClose = () => MainApiRoute.windowDrive('close')

	return (
		<Box w={'100%'} bg={'gray.600'} h={'30px'} justifyContent={'space-between'} display={'flex'}>
			<Wrap style={{WebkitAppRegion: 'drag'}} width={'100%'}/>
			<ButtonGroup  zIndex={1000} justifyContent={'center'} alignItems={'center'}>
				<IconButton onClick={winDriveMin} bg={'none'} h={'80%'} aria-label={'1'} icon={<Icon as={FaWindowMinimize}/>}/>
				<IconButton onClick={winDriveMax} bg={'none'} h={'80%'} aria-label={'2'} icon={<Icon as={FaWindowMaximize}/>}/>
				<IconButton onClick={winDriveClose} bg={'none'} h={'80%'} aria-label={'3'} icon={<Icon as={FaWindowClose}/>}/>
			</ButtonGroup>
		</Box>
	);
}


export default TitleBar;