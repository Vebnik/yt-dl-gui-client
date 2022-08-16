import React from 'react';
import {Badge, Box, Icon, IconButton, Image, Progress, Text, Wrap} from "@chakra-ui/react";
import {FaYoutube} from "react-icons/all";
import MainApiRoute from "../service/MainApiRoute";

const DownloadModel = ({config}) => {

	const openSource = () => {
		MainApiRoute.childProcExec(`explorer "${config.info.video_url}"`)
			.catch(err => console.error(err))
	}

	return (
		<Box p={2} w={'100%'} rounded={5} bg={'gray.700'} fontSize={'18px'} color={'gray.300'} display={'flex'} flexDirection={'column'}>
			<Box display={'flex'} justifyContent={'space-between'} alignItems={'center'} flexDirection={'row'}>
				<Box>
					<Text noOfLines={1} m={1} borderBottom={'1px'}>
						{config.info.title}
					</Text>
					<Badge colorScheme={'red'} w={'max-content'} m={1}>
						{(config.info.lengthSeconds/60).toFixed(2)} Min
					</Badge>
					<Badge colorScheme={'green'} w={'max-content'} m={1}>
						{config.info.viewCount} Viewer
					</Badge>
				</Box>
				<Wrap w={'10%'}/>
				<Image rounded={5} width={'100px'} name='Thumbnail' src={config.info.thumbnails[0].url} mx={1}/>
				<IconButton onClick={openSource} color={'red.600'} fontSize={'30px'} icon={<Icon as={FaYoutube}/>} aria-label={'open source'} width={"max-content"}/>
			</Box>
			<Progress value={+config.totalPercent.video} size='xs' colorScheme='red' rounded={5}/>
		</Box>
	)
}

export default DownloadModel;
