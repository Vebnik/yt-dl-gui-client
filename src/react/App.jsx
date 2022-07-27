import React, {useContext} from 'react';
import {ChakraProvider, Container, extendTheme} from '@chakra-ui/react';
import TitleBar from "./components/TitleBar";
import TabsSelector from "./components/TabsSelector";
import MainApiRoute from "./service/MainApiRoute";
import {Context} from "../index";

const myTheme = extendTheme({
	styles: {
		global: (props) => ({
			'body, html': {
				background: props.colorMode === 'light' ? 'gray.900' : 'gray.900',
			},
			'::-webkit-scrollbar': {
				width: '0'
			}
		})
	},
	config: {
		initialColorMode: 'dark'
	}
})

const App = () => {

	const {store} = useContext(Context)

	const getConfig = () => {
		MainApiRoute.getUserConfig().then(data => {
			localStorage.setItem('savePath', data.dataValues.savePath)
			store.setUser(data.dataValues)
		})
	}; getConfig()

	return (
		<ChakraProvider theme={myTheme}>
			<TitleBar/>
			<Container minW={'600px'} maxW={'100%'}>
				<TabsSelector/>
			</Container>
		</ChakraProvider>
	);
}

export default React.memo(App);