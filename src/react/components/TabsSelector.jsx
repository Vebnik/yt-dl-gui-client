import React, {useState} from 'react';
import {Box, Icon, ScaleFade, Tab, TabList, TabPanel, TabPanels, Tabs, useDisclosure} from "@chakra-ui/react";
import Header from "./Header";
import DownloadedPage from "./DownloadedPage";
import {FaCogs, FaDownload, FaSave} from "react-icons/all";
import SettingPage from "./SettingPage";
import SavePage from "./SavePage";
import MainApiRoute from "../service/MainApiRoute";

const TabsSelector = () => {

	const [element, setElement] = useState([])
	const [isOpen1, setToggle1] = useState(true)
	const [isOpen2, setToggle2] = useState(false)
	const [isOpen3, setToggle3] = useState(false)

	const getAllDownload = () => {
		MainApiRoute.getHistory().then(results => {
			console.log(results)
			setElement(results.message)
		})
	}

	const frameMotion = () => {
		setToggle1(false)
		setToggle2(false)
		setToggle3(false)
	}

	return (
		<Tabs isManual variant='enclosed' w={'100%'} marginTop={3} color={'bisque'}>
			<TabList>
				<Tab onClick={() => {frameMotion(); setToggle1(true)}}><Icon as={FaDownload} marginRight={1}/>Download</Tab>
				<Tab onClick={() => {frameMotion(); setToggle2(true); getAllDownload()}}><Icon as={FaSave} marginRight={1}/>Saves</Tab>
				<Tab onClick={() => {frameMotion(); setToggle3(true)}}><Icon as={FaCogs} marginRight={1}/>Setting</Tab>
			</TabList>
			<TabPanels>
				<TabPanel>
					<ScaleFade in={isOpen1} initialScale={0.8}>
						<Header/>
						<DownloadedPage/>
					</ScaleFade>
				</TabPanel>
				<TabPanel >
					<ScaleFade in={isOpen2} initialScale={0.8}>
						<SavePage getAllDownload={getAllDownload} element={element}/>
					</ScaleFade>
				</TabPanel>
				<TabPanel>
					<ScaleFade in={isOpen3} initialScale={0.8}>
						<SettingPage/>
					</ScaleFade>
				</TabPanel>
			</TabPanels>
		</Tabs>
	);
};

export default TabsSelector;