import React, { useEffect, useRef, useState } from "react";
import './ClientsList.scss';
import Item from "../../components/Item/Item";

export default function ClientsList() {

  const [ listClients, setListClients ] = useState<JSX.Element>(<Item/>);
  const clients = useRef<Array<object>>([]);

 useEffect(() => {
   new Promise( async (res: any) => {
      const response: any = await fetch('http://localhost:4000/clients');
      const data: Array<object> = await response.json();
      clients.current = data;
      return res(data);
   }).then((data: any) => {
    setListClients(data.map((client: any) => {
      return <Item key={client.id} id={client.id} name={client.name} date={client.date} payment={client.payment} />
    }))
   })
  }, [])

  const searchClient = (e: any) => {
    const wordToFind: string = e.target.value.toLowerCase();
    console.log(clients.current)
    clients.current.filter((client) => {

    })
  }

  return(
    <div className='clients-list-container'>
      <div className='panel'>
        <label className='label' htmlFor="search">Search client: </label>
        <input onChange={searchClient} className='search-input' type="search" name="search" id="search" placeholder="Client name" />
      </div>
      { listClients }
    </div>
  );
}