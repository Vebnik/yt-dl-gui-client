import React from 'react';
import MainApiRoute from "../service/MainApiRoute";
import {Badge, Box, Icon, IconButton, Image, Progress, Text, Wrap} from "@chakra-ui/react";
import {FaYoutube} from "react-icons/all";

const SaveModel = ({config}) => {

	const openSource = () => {
		MainApiRoute.childProcExec(`explorer "${config.url}"`)
			.catch(err => console.error(err))
	}

	return (
		<Box p={2} w={'100%'} rounded={5} bg={'gray.700'} fontSize={'18px'} color={'gray.300'} display={'flex'} flexDirection={'column'}>
			<Box display={'flex'} justifyContent={'space-between'} alignItems={'center'} flexDirection={'row'}>
				<Box w={'300px'}>
					<Text noOfLines={1} m={1} borderBottom={'1px'}>
						{config.title}
					</Text>
					<Badge colorScheme={'red'} w={'max-content'} m={1}>
						{(config.duration/60).toFixed(2)} Min
					</Badge>
					<Badge colorScheme={'green'} w={'max-content'} m={1}>
						{config.createdAt.toISOString()}
					</Badge>
				</Box>
				<Wrap w={'10%'}/>
				<Image rounded={5} width={'100px'} name='Thumbnail' src={config.thumbnail} mx={1}/>
				<IconButton onClick={openSource} color={'red.600'} fontSize={'30px'} icon={<Icon as={FaYoutube}/>} aria-label={'open source'} width={"max-content"}/>
			</Box>
			<Progress value={100} size='xs' colorScheme='linkedin' rounded={5}/>
		</Box>
	)
}

export default SaveModel;