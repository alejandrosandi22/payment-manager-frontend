import moment from 'moment';
import { useEffect, useRef, useState } from 'react';
import './Add.scss';

export default function(props: any) {

  const [ client, setClient ] = useState<any>({
    id: '',
    name: '',
    payment: '',
    date: moment().format("YYYY-MM-DD")
  });

  const idInput = useRef<any>();
  const nameInput = useRef<any>();

  const [loading, setLoading] = useState<boolean>(false);

  const form = useRef<any>();

  useEffect(() => {
    if (props.currentClient && props.update) {
      nameInput.current.value = props.currentClient.name;
      idInput.current.value = props.currentClient.id;
    }
  }, [props.update])

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    setLoading(true);

    if (!props.update) {

      await fetch('https://gym-customer-payment-manager.herokuapp.com/clients', {
        method: 'POST',
        body: JSON.stringify(client),
        headers: { 'Content-Type': 'application/json' }
      })
    } else {
      console.log('client data: ', client)
      try {
        await fetch(`https://gym-customer-payment-manager.herokuapp.com/clients/${props.currentClient.id}`, {
          method: 'PUT',
          body: JSON.stringify(client),
          headers: { 'Content-Type': 'application/json' }
        });
      } catch (error) {
        throw (error);
      }
    }
    
    
    setLoading(false);
    form.current.reset();
    handleClose();
    props.handleEvent();
  }

  const handleClose = () => {
    form.current.reset();
    !props.update ? props.modalEvents() : props.modalUpdate();
  }
  
  const handleChange = (e: any) => setClient({...client, [e.target.name]: e.target.value });
  

  return (
    <div className={`add-container ${!props.init ? 'preload' : ''} ${props.toggle ? 'show' : 'hide'}`}>
      <div className='form-wrapper'>
        <h2 className='title'>{props.update ? 'Update Client' : 'Add New Client'}</h2>
        <i onClick={handleClose} className='fal fa-times close'></i>
        <form ref={form} onSubmit={handleSubmit} className='form'>
          <div className='wrapper'>
            <label htmlFor="id">Identification card: </label>
            <input ref={idInput} value={client.id} onChange={handleChange} type="text" id='id' name="id" placeholder='Id card' required />
          </div>
          <div className='wrapper'>
            <label htmlFor="name">Name: </label>
            <input ref={nameInput} value={client.name} onChange={handleChange} type="text" id='name' name='name' placeholder='Name' required />
          </div>
          <div className='wrapper'>
            <label htmlFor="payment">Select payment: </label>
            <select value={client.payment} onChange={handleChange} name="payment" id="payment" required>
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
