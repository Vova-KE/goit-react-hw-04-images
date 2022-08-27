import React, { useState } from "react";
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import styles from './styles.module.css';

const SearchBar = ({onSubmit}) => {
    const [inputQuery, setInputQuery] = useState('');

    const handleInput = (event) => {
        setInputQuery(event.currentTarget.value.trim().toLowerCase());
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        
        if (inputQuery.trim() === '') {
            toast.error('Enter a request');
            return;
        };
        
        onSubmit(inputQuery);
        setInputQuery('');
    };

    return (
        <header className={styles.searchBar}>
            <form className={styles.searchForm} onSubmit={handleSubmit}>
                <button type="submit" className={styles.searchFormButton}>
                    <svg role="img" xmlns="http://www.w3.org/2000/svg"
                        width="24px"
                        height="24px"
                        viewBox="0 0 24 24"
                        aria-labelledby="searchIconTitle"
                        stroke="#000"
                        strokeWidth="2"
                        strokeLinecap="square"
                        strokeLinejoin="miter"
                        fill="none"
                        color="#000"
                    >
                        <path d="M14.4121122,14.4121122 L20,20" />
                        <circle cx="10" cy="10" r="6" />
                    </svg>

                    <span className={styles.searchFormButtonLabel}>Search</span>
                </button>

                <input
                    className={styles.searchFormInput}
                    type="text"
                    autoComplete="off"
                    autoFocus
                    placeholder="Search images and photos"
                    value={inputQuery}
                    onChange={handleInput}
                />
            </form>
        </header>
    )
};

SearchBar.propTypes = {
    onSubmit: PropTypes.func.isRequired,
};

export default SearchBar;