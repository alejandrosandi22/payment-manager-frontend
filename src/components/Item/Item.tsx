import React, { useEffect, useState } from 'react';
import './Item.scss';
import moment from 'moment';

export default function Item(props: any) {

  const [ daysLeft, setDaysLeft ] = useState<string>('days');

  useEffect(() => {
    const updateDay = moment(props.date).format("YYYY-MM-d");
    const today = moment(new Date()).format("YYYY-MM-d");

    const diff: number = moment(today).diff(moment(updateDay), 'days');

    if (props.payment === 10000) {
      if (diff < 31) return setDaysLeft('Expired monthly payment');
    }

    if (props.payment === 5000) {
      if (diff < 16) return setDaysLeft('Expired monthly payment');
    }

    if (props.payment === 3000) {
      if (diff < 8) return setDaysLeft('Expired monthly payment');
    }

    setDaysLeft(diff.toString());
  })

  const handleDelete = async (id: number) => {
    console.log(id)
    await fetch(`http://localhost:4000/clients/${id}`, {
      method: "DELETE",
    })
  }

  return (
    <div className='item-container'>
      <div className='client'>
        <h3 className='name'>{ props.name }</h3>
        <h4 className='days-left'>{ daysLeft }</h4>
      </div>
      <div className='actions'>
        <button className='button edit'><i className='fas fa-edit'></i></button>
        <button onClick={() => handleDelete(props.id)} className='button delete'><i className='fas fa-trash-alt'></i></button>
      </div>
    </div>
  )
}
