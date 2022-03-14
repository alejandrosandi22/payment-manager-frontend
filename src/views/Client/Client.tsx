import React from 'react';
import './Client.scss';

export default function Client() {
  return (
    <div className='client-container'>
      <div className='client'>
          <h3 className='name'>Daniel-Benoît Thibault</h3>
          <h4 className='days-left'>Days left: 20 days</h4>
          <h4 className='last-update-date'>Last update: 10/02/2022</h4>
          <h4 className='last-update-payment'>Last payment: ₡10.000</h4>
      </div>
    </div>
  )
}
