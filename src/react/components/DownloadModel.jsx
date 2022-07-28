import React from 'react';
import {Avatar, Badge, Box, Icon, IconButton, Image, Progress, SimpleGrid, Text, Wrap} from "@chakra-ui/react";
import {FaYoutube} from "react-icons/all";
import MainApiRoute from "../service/MainApiRoute";


//TODO вспылвающее окно при начале скачивания видео, модальное окно с инфой о видео

const DownloadModel = ({config}) => {

	const openSource = () => {
		MainApiRoute.childProcExec(`explorer "${config.url}"`)
			.catch(err => console.error(err))
	}

	return (
		<Box p={2} w={'100%'} rounded={5} bg={'gray.700'} fontSize={'18px'} color={'gray.300'} display={'flex'} flexDirection={'column'}>
			<Box display={'flex'} justifyContent={'space-between'} alignItems={'center'} flexDirection={'row'}>
				<Box>
					<Text noOfLines={1} m={1} borderBottom={'1px'} w={'max-content'}>
						{config.title}
					</Text>
					<Badge colorScheme={'red'} w={'max-content'} m={1}>
						{(config.duration/60).toFixed(2)} Min
					</Badge>
					<Badge colorScheme={'green'} w={'max-content'} m={1}>
						{config.dateAtDownload}
					</Badge>
				</Box>
				<Wrap w={'10%'}/>
				<Image rounded={5} width={'100px'} name='Thumbnail' src={config.thumbnail} />
				<IconButton onClick={openSource} color={'red.600'} fontSize={'30px'} icon={<Icon as={FaYoutube}/>} aria-label={'open source'} width={"max-content"}/>
			</Box>
			<Progress value={100} size='xs' colorScheme='green' rounded={5}/>
		</Box>
	);
};

export default DownloadModel;

//	{
// 		title: 'Feint 2016 Megamix',
// 		url: 'https://youtu.be/meSQf3z-Yh0',
// 		duration: '59:16',
// 		storage: 'localstorage',
// 		thumbnail: 'https://i.ytimg.com/vi/J3fDOQEK5Ko/hqdefault.jpg?sqp=-oaymwEiCKgBEF5IWvKriqkDFQgBFQAAAAAYASUAAMhCPQCAokN4AQ==&rs=AOn4CLA3Sjr30hoGMicRuWj2Uz9sJEBQcw'
// 	}
