import React, {useContext} from 'react';
import {Box, Button, Input, InputGroup, InputRightElement, Stack} from "@chakra-ui/react";
import MainApiRoute from "../service/MainApiRoute";
import {Context} from "../../index";
import {observer} from "mobx-react-lite";

const SettingPage = observer(() => {

	const {store} = useContext(Context)

	const saveDefPath = () => {
		MainApiRoute.savePath().then(results => {
			console.log(results.message[0])
			store.setDefPath(results.message[0])
		})
	}

	const openSaveDefPath = () => {
		MainApiRoute.openSavePath()
			.then(results => {})
	}

	return (
		<Box width={'50%'} m={'auto'} minW={'500px'}>
			<Stack spacing={3}>
				<InputGroup size='md'>
					<Input isDisabled value={store.user.savePath} variant='filled' placeholder='Default save path' />
					<InputRightElement width='6.5rem'>
						<Button mx={1} onClick={saveDefPath} h='1.75rem' size='sm'>Save</Button>
						<Button onClick={openSaveDefPath} h='1.75rem' size='sm'>Open</Button>
					</InputRightElement>
				</InputGroup>
				<InputGroup size='md'>
					<Input isDisabled variant='filled' placeholder='Filled' />
					<InputRightElement width='4.5rem'>
						<Button isDisabled={true} h='1.75rem' size='sm'>Save</Button>
					</InputRightElement>
				</InputGroup>
			</Stack>
		</Box>
	);
});

export default SettingPage;