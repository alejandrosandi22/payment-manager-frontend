import React, { useEffect, useState } from 'react';
import './Item.scss';
import moment from 'moment';
import { Link } from 'react-router-dom';
import { format } from '../../services/daysLeft';

export default function Item(props: any) {

  const [ daysLeft, setDaysLeft ] = useState<string>('days');

  useEffect(() => {
    format(setDaysLeft, props);
  }, [])

  return (
    <div className='item-container'>
      <div className='client'>
        <Link className='name' to={`/client/${props.id}`}>{ props.name }</Link>
        <h4 className='days-left'>{ daysLeft }</h4>
      </div>
      <div className='actions'>
        <button onClick={() => props.modalUpdate(props)} className='button edit'><i className='fas fa-edit'></i></button>
        <button onClick={() => props.handleDelete(props.id)} className='button delete'><i className='fas fa-trash-alt'></i></button>
      </div>
    </div>
  )
}
