import React, {useState} from 'react';
import {Box, Icon, Tab, TabList, TabPanel, TabPanels, Tabs} from "@chakra-ui/react";
import Header from "./Header";
import DownloadedPage from "./DownloadedPage";
import {FaCogs, FaDownload, FaSave} from "react-icons/all";
import SettingPage from "./SettingPage";
import SavePage from "./SavePage";
import MainApiRoute from "../service/MainApiRoute";

const TabsSelector = () => {

	const [element, setElement] = useState([])

	const getAllDownload = () => {
		MainApiRoute.getHistory().then(results => {
			console.log(results)
			setElement(results.message)
		})
	}

	return (
		<Tabs isManual variant='enclosed' w={'100%'} marginTop={3} color={'bisque'}>
			<TabList>
				<Tab><Icon as={FaDownload} marginRight={1}/>Download</Tab>
				<Tab onClick={getAllDownload}><Icon as={FaSave} marginRight={1}/>Saves</Tab>
				<Tab><Icon as={FaCogs} marginRight={1}/>Setting</Tab>
			</TabList>
			<TabPanels>
				<TabPanel justifyContent={'center'} alignItems={'center'} display={'flex'} flexDirection={'column'}>
					<Header/>
					<DownloadedPage/>
				</TabPanel>
				<TabPanel justifyContent={'center'} alignItems={'center'} display={'flex'} flexDirection={'column'}>
					<SavePage getAllDownload={getAllDownload} element={element}/>
				</TabPanel>
				<TabPanel>
					<SettingPage/>
				</TabPanel>
			</TabPanels>
		</Tabs>
	);
};

export default TabsSelector;