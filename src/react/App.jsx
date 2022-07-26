import React from 'react';
import {ChakraProvider, Container, theme, useBreakpointValue, extendTheme, Center, Box} from '@chakra-ui/react';
import TitleBar from "./components/TitleBar";
import TabsSelector from "./components/TabsSelector";

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

	return (
		<ChakraProvider theme={myTheme}>
			<TitleBar/>
			<Container minW={'600px'} maxW={'100%'}>
				<TabsSelector/>
			</Container>
		</ChakraProvider>
	);
}

export default App;