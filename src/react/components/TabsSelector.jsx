import React from 'react';
import {Box, Icon, Tab, TabList, TabPanel, TabPanels, Tabs} from "@chakra-ui/react";
import Header from "./Header";
import DownloadedPage from "./DownloadedPage";
import {FaCogs, FaDownload, FaSave} from "react-icons/all";

const TabsSelector = () => {
	return (
		<Tabs isManual variant='enclosed' w={'100%'} marginTop={3} color={'bisque'}>
			<TabList>
				<Tab><Icon as={FaDownload} marginRight={1}/>Download</Tab>
				<Tab><Icon as={FaSave} marginRight={1}/>Saves</Tab>
				<Tab><Icon as={FaCogs} marginRight={1}/>Setting</Tab>
			</TabList>
			<TabPanels>
				<TabPanel justifyContent={'center'} alignItems={'center'} display={'flex'} flexDirection={'column'}>
					<Header/>
					<DownloadedPage/>
				</TabPanel>
				<TabPanel>
					<Box bg={'gray.700'} h={'100px'} rounded={5}>
					</Box>
				</TabPanel>
			</TabPanels>
		</Tabs>
	);
};

export default TabsSelector;