import moment from 'moment';
import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import './Client.scss';

import { format } from '../../services/daysLeft';


function ClientBox(props: any) {

  const [daysLeft, setDaysLeft] = useState<string>('');

  useEffect(() => {
    format(setDaysLeft,props);
  }, [])

  return(
    <div className='client'>
    <h3 className='name'>{ props.name }</h3>
    <h4 className='days-left'>Days left: { daysLeft }</h4>
    <h4 className='last-update-date'>Last update: { moment(props.date).format("YYYY/MM/DD") }</h4>
    <h4 className='last-update-payment'>Last payment: ₡{ props.payment }</h4>
</div>
  );
}

export default function Client() {
  
  interface clientType {name: string, id: number, date: Date, payment: number}

  const [ singleClient, setSingleClient ] = useState<JSX.Element>(<ClientBox />);
  const clients = useRef<Array<object>>([]);

  const { id } = useParams();

  useEffect(() => {
    new Promise( async (res: any) => {
       const response: Response = await fetch('http://localhost:4000/clients');
       clients.current = await response.json();
       return res(clients);

     }).then((clients: any) => {
      clients.current = clients.current.filter((client: clientType) => {
        return client.id.toString() === id;
     })

     setSingleClient(clients.current.map((client: any) => {
       return <ClientBox key={client.id} name={client.name} date={client.date} payment={client.payment}/>
     }))

     
    })
   }, []);

  return (
    <div className='client-container'>
      { singleClient }
    </div>
  )
}