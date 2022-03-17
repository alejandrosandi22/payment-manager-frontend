import React, { useEffect, useRef, useState } from "react";
import './ClientsList.scss';
import Item from "../../components/Item/Item";

interface clientType {name: string, id: number, date: Date, payment: number}

export default function ClientsList(props: any) {

  const [ listClients, setListClients ] = useState<JSX.Element>(<Item/>);
  const [ findedClients, setFindedClients ] = useState<any>([]);
  const clients = useRef<Array<object>>([])

 useEffect(() => {
   new Promise( async (res: any) => {
     console.log('Test')
      const response: Response = await fetch('http://localhost:4000/clients');
      clients.current = await response.json();
      return res(clients);
    }).then((clients: any) => {
      setListClients(clients.current.map((client: clientType) => {
      return <Item key={client.id} id={client.id} name={client.name} date={client.date} payment={client.payment} handleDelete={handleDelete} />
    }))
   })
  }, [props.eventEmitted]);

  const handleDelete = async (id: number) => {
    try {
      await fetch(`http://localhost:4000/clients/${id}`, {method: "DELETE"});
      clients.current = clients.current.filter((client: any) => client.id !== id);
      props.handleEvent();
    } catch (error) {
      throw (error);
    }
  }

  const searchClient = (e: any) => {
    const wordToFind: string = e.target.value.toLowerCase();
    setFindedClients(clients.current.filter((client: any) => {
      return client.id.includes(wordToFind);
    }))

    setFindedClients(findedClients.map((client: clientType) => {
      return <Item key={client.id} id={client.id} name={client.name} date={client.date} payment={client.payment} handleDelete={handleDelete} />
    }))
    console.log(findedClients)
  }

  return(
    <div className='clients-list-container'>
      <div className='panel'>
        <label className='label' htmlFor="search">Search client: </label>
        <input onChange={searchClient} className='search-input' type="search" name="search" id="search" placeholder="Client name" />
      </div>
      { findedClients.length !== 0 ? findedClients : listClients }
    </div>
  );
}