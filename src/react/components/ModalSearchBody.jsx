import {Badge, Box, Icon, IconButton, Image, Text, Wrap} from "@chakra-ui/react";
import {FaYoutube} from "react-icons/all";


const ModalSearchBody = ({config}) => {

	return (
		<Box maxWidth={'100%'} rounded={5} bg={'gray.700'} fontSize={'18px'} color={'gray.300'} display={'flex'} flexDirection={'column'}>
			<Image rounded={5} width={'auto'} name='Thumbnail' src={config.thumbnail} />
			<Box py={1} display={'flex'} justifyContent={'space-between'} alignItems={'center'} flexDirection={'row'}>
				<Box>
					<Text noOfLines={1} borderBottom={'1px'}>
						{config.title}
					</Text>
					<Badge colorScheme={'red'} w={'max-content'} m={1}>
						{config.duration} Min
					</Badge>
					<Badge colorScheme={'green'} w={'max-content'} m={1}>
						SomeData
					</Badge>
				</Box>
				<Wrap w={'10%'}/>
				<IconButton color={'red.600'} fontSize={'30px'} icon={<Icon as={FaYoutube}/>} aria-label={'open source'} width={"max-content"}/>
			</Box>
		</Box>
	);
};

export default ModalSearchBody


// {
// 	title: 'Feint 2016 Megamix',
// 	url: 'https://youtu.be/meSQf3z-Yh0',
// 	duration: '59:16',
// 	dateAtDownload: '27/07/2022 15:49',
// 	storage: 'localstorage',
// 	thumbnail: 'https://i.ytimg.com/vi/J3fDOQEK5Ko/hqdefault.jpg?sqp=-oaymwEiCKgBEF5IWvKriqkDFQgBFQAAAAAYASUAAMhCPQCAokN4AQ==&rs=AOn4CLA3Sjr30hoGMicRuWj2Uz9sJEBQcw'
// }