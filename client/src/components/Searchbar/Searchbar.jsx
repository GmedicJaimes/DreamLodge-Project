import React, { useState } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import styles from "./SearchBar.module.css";
import { searchProperty } from "../../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react"




const SearchBar = () => {


  const [input,setInput] = useState("")
  const dispatch = useDispatch()

  const handleChange = (e) =>{
    setInput(e.target.value)

  }




    useEffect(()=>{
      dispatch(searchProperty(input))
    },[])


  return (
    <div className={styles.searchContainer}>
      <input type="text" className={styles.inputSearch} placeholder="Search..." value={input} onChange={(e)=>{handleChange(e)}} />
      <span className={styles.searchIcon}>
      <FontAwesomeIcon icon={faSearch} />

      </span>
    </div>
  );
};

export default SearchBar;
