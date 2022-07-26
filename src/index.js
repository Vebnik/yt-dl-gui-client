import { ColorModeScript } from '@chakra-ui/react';
import React, {createContext} from 'react';
import * as ReactDOM from 'react-dom/client';
import App from './react/App';

const container = document.getElementById('entrypoint');
const root = ReactDOM.createRoot(container);
export const Context = createContext(null)

root.render(
  <Context.Provider value={{user: {name: 'test'}}}>
    <ColorModeScript/>
    <App/>
  </Context.Provider>
)
