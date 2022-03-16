import React, { useRef, useState } from 'react';
import './Add.scss';

export default function(props: any) {

  const [ client, setClient ] = useState<any>({
    id: '',
    name: '',
    payment: '',
    date: `${new Date().getFullYear()}-${new Date().getMonth()}-${new Date().getDate()}`
  });

  const [loading, setLoading] = useState<boolean>(false);

  const form = useRef<any>();

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    setLoading(true);
    
    const res = await fetch('http://localhost:4000/clients', {
      method: 'POST',
      body: JSON.stringify(client),
      headers: { 'Content-Type': 'application/json' }
    })
    const data = await res.json();
    console.log(data);
    
    setLoading(false);
    form.current.reset();
    props.modalEvents();
  }
  
  const handleChange = (e: any) => setClient({...client, [e.target.name]: e.target.value });
  

  return (
    <div className={`add-container ${!props.init ? 'preload' : ''} ${props.toggle ? 'show' : 'hide'}`}>
      <div className='form-wrapper'>
        <h2 className='title'>Add New Client</h2>
        <i onClick={props.modalEvents} className='fal fa-times close'></i>
        <form ref={form} onSubmit={handleSubmit} className='form'>
          <div className='wrapper'>
            <label htmlFor="id">Identification card: </label>
            <input onChange={handleChange} type="text" id='id' name="id" placeholder='Id card' required />
          </div>
          <div className='wrapper'>
            <label htmlFor="name">Name: </label>
            <input onChange={handleChange} type="text" id='name' name='name' placeholder='Name' required />
          </div>
          <div className='wrapper'>
            <label htmlFor="payment">Select payment: </label>
            <select onChange={handleChange} name="payment" id="payment" required>
              <option value="null">Select payment</option>
              <option value="10000">Month</option>
              <option value="5000">Fortnight</option>
              <option value="3000">Week</option>
            </select>
          </div>
          <button disabled={loading} >{!props.update ? 'Save' : 'Update'} <i className={loading ? 'fal fa-spinner-third' : ''}></i></button>
        </form>
      </div>
    </div>
  )
}
