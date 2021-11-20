import React, { useState } from "react";
import "./SearchBar.css";
import axios from 'axios';
import SearchIcon from "@material-ui/icons/Search";
import CloseIcon from "@material-ui/icons/Close";

const SearchBar = ({placeholder,handleChange}) =>{
  

  /*function handleChange(event){
    axios.post('http://localhost:8080/searchName',{ID : event.target.value})
    .then(function (response) {
      const var1=response;
      setSrchData(var1);
      console.log("hi",srchData);
    })
    .catch(function (error) {
      console.log(error);
    }); 

};*/

  
   

  return(
   
      <input type='search' className='search' placeholder={placeholder} onChange = {handleChange} />
      
  )
}

export default SearchBar;






