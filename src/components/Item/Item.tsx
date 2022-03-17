import React, { useEffect, useState } from 'react';
import './Item.scss';
import moment from 'moment';

export default function Item(props: any) {

  const [ daysLeft, setDaysLeft ] = useState<string>('days');

  useEffect(() => {
    const updateDay = moment(props.date).format("YYYY-MM-d");
    const today = moment(new Date()).format("YYYY-MM-d");

    const diff: number = moment(today).diff(moment(updateDay), 'month', true);
    
    if (props.payment === 10000) {
      if ((30 - Math.trunc(diff * 30)) <= 0) return setDaysLeft('Expired monthly payment');
      else return setDaysLeft(`${30 - Math.trunc(diff * 30)} days`);
    }

    if (props.payment === 5000) {
      if (Math.trunc(diff * 30) > 16) return setDaysLeft('Expired monthly payment');
      else return setDaysLeft(`${14 - Math.trunc(diff * 30)} days`);
    }

    if (props.payment === 3000) {
      if (Math.trunc(diff * 30) > 8) return setDaysLeft('Expired monthly payment');
      else return setDaysLeft(`${7 - Math.trunc(diff * 30)} days`);
    }
  }, [])

  return (
    <div className='item-container'>
      <div className='client'>
        <h3 className='name'>{ props.name }</h3>
        <h4 className='days-left'>{ daysLeft }</h4>
      </div>
      <div className='actions'>
        <button className='button edit'><i className='fas fa-edit'></i></button>
        <button onClick={() => props.handleDelete(props.id)} className='button delete'><i className='fas fa-trash-alt'></i></button>
      </div>
    </div>
  )
}
