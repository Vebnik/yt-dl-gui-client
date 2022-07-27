import {Badge, Box, Icon, IconButton, Image, Text, Wrap} from "@chakra-ui/react";


const ModalSearchBody = ({config}) => {

		//export interface ytVideoInfo {
		// 	thumbnail: string
		// 	url: string
		// 	duration: string
		// 	title: string
		// 	searchDate: string
		// }

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
						{config.searchDate}
					</Badge>
				</Box>
			</Box>
		</Box>
	);
};

export default ModalSearchBody