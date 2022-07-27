import { ColorModeScript } from '@chakra-ui/react';
import React, {createContext} from 'react';
import * as ReactDOM from 'react-dom/client';
import App from './react/App';
import GlobalStore from "./react/userGlobalStore/GlobalStore";

const store = new GlobalStore()
const container = document.getElementById('entrypoint');
const root = ReactDOM.createRoot(container);
export const Context = createContext({store})

root.render(
  <Context.Provider value={{store}}>
    <ColorModeScript/>
    <App/>
  </Context.Provider>
)
