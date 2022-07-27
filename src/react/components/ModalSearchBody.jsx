import {Badge, Box, Icon, IconButton, Image, Radio, RadioGroup, Stack, Text, Wrap} from "@chakra-ui/react";


const ModalSearchBody = ({config, setFilter, filter}) => {

	return (
		<Box w={'100%'} rounded={5} bg={'gray.700'} fontSize={'18px'} color={'gray.300'} display={'flex'} flexDirection={'column'}>
			<Image rounded={5} width={'auto'} name='Thumbnail' src={config.thumbnail} />
			<Box py={1} display={'flex'} justifyContent={'space-between'} alignItems={'center'} flexDirection={'column'}>
				<Box bg={'gray.800'} p={1} rounded={5} my={1} w={'100%'}>
					<Text noOfLines={1} borderBottom={'1px'}>
						{config.title}
					</Text>
					<Badge title={'duration'} colorScheme={'red'} w={'max-content'} m={1}>
						{config.duration} Min
					</Badge>
					<Badge title={'searchDate'} author colorScheme={'green'} w={'max-content'} m={1}>
						{config.searchDate}
					</Badge>
					<Badge title={'author'} colorScheme={'green'} w={'max-content'} m={1}>
						{config.author}
					</Badge>
					<Badge title={'view count'} colorScheme={'green'} w={'max-content'} m={1}>
						{config.published} View
					</Badge>
				</Box>
				<RadioGroup onChange={setFilter} value={filter} bg={'gray.800'} p={1} rounded={5} w={'100%'}>
					<Stack direction={'column'}>
						<Radio value='highestvideo'>Video only</Radio>
						<Radio value='highestaudio'>Audio only</Radio>
						<Radio value='highest'>Video and Audio</Radio>
					</Stack>
				</RadioGroup>
			</Box>
		</Box>
	);
};

export default ModalSearchBody