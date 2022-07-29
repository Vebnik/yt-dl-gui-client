import React, {useMemo, useState} from "react";
import {Box, SimpleGrid, useBreakpointValue} from "@chakra-ui/react";
import MainApiRoute from "../service/MainApiRoute";
import DownloadModel from "./DownloadModel";
import SaveModel from "./SaveModel";

// TODO Подгрузка списка скаченых видео при клике по вкладкам и работа с кнопками контроля окна

const SavePage = ({element}) => {

	const variant = useBreakpointValue({ base: 1, md: 2 })

	return (
		<SimpleGrid position={'relative'} maxW={'1400px'} w={'100%'} p={1} justifyContent={'center'} alignItems={'center'} columns={element.length ? variant : 1} gap={5}>
			{
				element.length
					? element.map((el, i) => <SaveModel config={el.dataValues} key={i}/>)
					: <Box m={'auto'} rounded={5} bg={'gray.700'} fontSize={'20px'} px={20} py={4} color={'red.400'}>Empty download list</Box>
			}
		</SimpleGrid>
	)
}

export default SavePage