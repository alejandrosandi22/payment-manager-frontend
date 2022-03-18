import React, { useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.scss';
import ClientsList from './views/ClientsList/ClientsList';
import Nav from './components/Nav/Nav';
import Add from './components/Add/Add';
import Client from './views/Client/Client';

function App() {
  let [ init, setInit ] = useState<boolean>(false);
  let [ update, setUpdate ] = useState<boolean>(false);
  const [ toggle, setToggle ] = useState<boolean>(false);
  const [ currentClient, setCurrentClient ] = useState<any>();
  const [ eventEmitted, setEventEmitted ] = useState<boolean>(false)

  const handleEvent = () => eventEmitted ? setEventEmitted(false) : setEventEmitted(true);

  const modalEvents = () => {
    setInit(init = true);
    
    if (toggle) setToggle(false);
    else setToggle(true);
  }

  const modalUpdate = (e: any) => {
    if (update) setUpdate(false);
    else setUpdate(true);

    modalEvents();
    setCurrentClient(e);
  }

  return (
    <BrowserRouter>
    <div className='App'>
    <Add handleEvent={handleEvent} toggle={toggle} init={init} modalEvents={modalEvents} update={update} modalUpdate={modalUpdate} currentClient={currentClient} />
      <Nav modalEvents={modalEvents} />
      <Routes>
        <Route path='/client/:id' element={<Client />}/>
        <Route path='/' element={<ClientsList handleEvent={handleEvent} eventEmitted={eventEmitted} modalUpdate={modalUpdate} />}/>
      </Routes>
    </div>
    </BrowserRouter>
  );
}

export default App;
