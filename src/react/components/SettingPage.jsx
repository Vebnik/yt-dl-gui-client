import React, {useContext, useState} from 'react';
import {Box, Button, Input, InputGroup, InputRightElement, Stack} from "@chakra-ui/react";
import MainApiRoute from "../service/MainApiRoute";
import {Context} from "../../index";
import {observer} from "mobx-react-lite";

const SettingPage = observer(() => {

	const {store} = useContext(Context)

	const saveDefPath = () => {
		MainApiRoute.savePath().then(results => {
			store.setDefPath(results.message[0])
			console.log(store.user)
		})

	}

	return (
		<Box width={'50%'} m={'auto'} minW={'500px'}>
			<Stack spacing={3}>
				<InputGroup size='md'>
					<Input value={store.user.path} variant='filled' placeholder='Default save path' />
					<InputRightElement width='4.5rem'>
						<Button onClick={saveDefPath} h='1.75rem' size='sm'>Save</Button>
					</InputRightElement>
				</InputGroup>
				<InputGroup size='md'>
					<Input variant='filled' placeholder='Filled' />
					<InputRightElement width='4.5rem'>
						<Button isDisabled={true} h='1.75rem' size='sm'>Save</Button>
					</InputRightElement>
				</InputGroup>
			</Stack>
		</Box>
	);
});

export default SettingPage;