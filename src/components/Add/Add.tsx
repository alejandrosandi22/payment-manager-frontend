import React from 'react';
import './Add.scss';

export default function(props: any) {
  return (
    <div className={`add-container ${!props.init ? 'preload' : ''} ${props.toggle ? 'show' : 'hide'}`}>
      <div className='form-wrapper'>
        <h2 className='title'>Add New Client</h2>
        <i onClick={props.modalEvents} className='fal fa-times close'></i>
        <form className='form'>
          <div className='wrapper'>
            <label htmlFor="id">Identification card: </label>
            <input type="text" id='id' placeholder='Id card' required />
          </div>
          <div className='wrapper'>
            <label htmlFor="name">Name: </label>
            <input type="text" id='name' placeholder='Name' required />
          </div>
          <div className='wrapper'>
            <label htmlFor="payment">Select payment: </label>
            <select name="payment" id="payment" required>
              <option value="null">Select payment</option>
              <option value="10000">Month</option>
              <option value="5000">Fortnight</option>
              <option value="3000">Week</option>
            </select>
          </div>
          <button>Save</button>
        </form>
      </div>
    </div>
  )
}
