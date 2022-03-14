import React from 'react';
import './Item.scss';

export default function Item() {
  return (
    <div className='item-container'>
      <div className='client'>
        <h3 className='name'>Daniel-Benoît Thibault</h3>
        <h4 className='days-left'>20 days</h4>
      </div>
      <div className='actions'>
        <button className='button edit'><i className='fas fa-edit'></i></button>
        <button className='button delete'><i className='fas fa-trash-alt'></i></button>
      </div>
    </div>
  )
}
