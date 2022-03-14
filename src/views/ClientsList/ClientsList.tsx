import React from "react";
import './ClientsList.scss';
import Item from "../../components/Item/Item";

export default function ClientsList() {

  const searchClient = (e: any) => {
    console.log(e.target.value.toLowerCase());
  }

  return(
    <div className='clients-list-container'>
      <div className='panel'>
        <label className='label' htmlFor="search">Search client: </label>
        <input onChange={(e: any) => searchClient(e)} className='search-input' type="search" name="search" id="search" placeholder="Client name" />
      </div>
      <Item />
      <Item />
    </div>
  );
}