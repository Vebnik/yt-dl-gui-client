import React, {useState} from 'react';
import {Box, SimpleGrid, useBreakpointValue} from "@chakra-ui/react";
import DownloadModel from "./DownloadModel";
import {DownloadModelTest} from "../react-utils/downloadModelTest";

const DownloadedPage = () => {

	const [element, setElement] = useState(DownloadModelTest) // DownloadModelTest
	const variant = useBreakpointValue({ base: 1, md: 2 })


	return (
		<SimpleGrid position={'relative'} overflow={'scroll'} maxW={'1400px'} w={'100%'} p={1} justifyContent={'center'} alignItems={'center'} columns={element.length ? variant : 1} gap={5}>
			{
				element.length
					? element.map((el, i) => <DownloadModel config={el} key={i}/>)
					: <Box m={'auto'} rounded={5} bg={'gray.700'} fontSize={'20px'} px={20} py={4} color={'red.400'}>Empty download list</Box>
			}
		</SimpleGrid>
	)
}

export default DownloadedPage;