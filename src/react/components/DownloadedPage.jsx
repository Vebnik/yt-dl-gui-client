import React, {useMemo, useState} from 'react';
import {Box, SimpleGrid, useBreakpointValue} from "@chakra-ui/react";
import DownloadModel from "./DownloadModel";

const DownloadedPage = () => {

	const [element, setElement] = useState([])
	const variant = useBreakpointValue({ base: 1, md: 2 })

	useMemo(() => {
		console.log('rendered DownloadedPage')
		window.YTApi.getDownload((ev, args) => { setElement(args) })
	}, [])

	return (
		<SimpleGrid position={'relative'} maxW={'1400px'} w={'100%'} p={1} justifyContent={'center'} alignItems={'center'} columns={element.length ? variant : 1} gap={5}>
			{
				element.length
					? element.map((el, i) => <DownloadModel config={el} key={i}/>)
					: <Box m={'auto'} rounded={5} bg={'gray.700'} fontSize={'20px'} px={20} py={4} color={'red.400'}>Empty download list</Box>
			}
		</SimpleGrid>
	)
}

export default DownloadedPage;