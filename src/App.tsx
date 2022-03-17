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
  let [ update, setUpdate ] = useState<boolean>(false);
  const [ eventEmitted, setEventEmitted ] = useState<boolean>(false)

  const handleEvent = () => eventEmitted ? setEventEmitted(false) : setEventEmitted(true);

  const modalEvents = () => {
    setInit(init = true);
    
    if (toggle) setToggle(toggle = false);
    else setToggle(toggle = true);
  }

  const handleUpdate = () => {
    if (update) setUpdate(false);
    else setUpdate(true);
  }

  return (
    <BrowserRouter>
    <div className='App'>
    <Add handleEvent={handleEvent} toggle={toggle} init={init} modalEvents={modalEvents} update={update} />
      <Nav modalEvents={modalEvents} />
      <Routes>
        <Route path='/client/:id' element={<Client />}/>
        <Route path='/' element={<ClientsList handleEvent={handleEvent} eventEmitted={eventEmitted} />}/>
      </Routes>
    </div>
    </BrowserRouter>
  );
}

export default App;
