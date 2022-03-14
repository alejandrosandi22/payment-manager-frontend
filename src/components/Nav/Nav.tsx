import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Nav.scss';

export default function Nav(props: any) {

  const [ scroll, setScroll ] = useState<boolean>(false);

  useEffect(() => {
    window.addEventListener('scroll', () => {
      if (window.pageYOffset >= 40) setScroll(true);
      else setScroll(false); 
    })
  }, [])

  return (
    <div className={`nav-container ${scroll ? 'scroll' : ''}`}>
      <h1 className='logo'>Manager</h1>
      <ul>
        <li className='list'><Link to='/'>List</Link></li>
        <li onClick={props.modalEvents} className='add'>Add Client</li>
      </ul>
    </div>
  )
}
