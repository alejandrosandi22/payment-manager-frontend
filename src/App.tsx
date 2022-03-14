import React, { useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.scss';
import ClientsList from './views/ClientsList/ClientsList';
import Nav from './components/Nav/Nav';
import Add from './components/Add/Add';
import Client from './views/Client/Client';

function App() {
  let [ init, setInit ] = useState<boolean>(false);
  let [ toggle, setToggle ] = useState<boolean>(false);

  const modalEvents = () => {
    setInit(init = true);
    
    if (toggle) setToggle(toggle = false);
    else setToggle(toggle = true);
  }

  return (
    <BrowserRouter>
    <div className='App'>
    <Add toggle={toggle} init={init} modalEvents={modalEvents} />
      <Nav modalEvents={modalEvents} />
      <Routes>
        <Route path='/' element={<ClientsList />}/>
        <Route path='/clients' element={<Client />}/>
      </Routes>
    </div>
    </BrowserRouter>
  );
}

export default App;
