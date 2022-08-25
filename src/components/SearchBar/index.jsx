import React, { Component } from "react";
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import styles from './styles.module.css';

class SearchBar extends Component {
    state = {
        inputQuery: '',
    };

    handleInput = (event) => {
        this.setState({ inputQuery: event.currentTarget.value.trim().toLowerCase()})
    };

    handleSubmit = (event) => {
        event.preventDefault();
        
        if (this.state.inputQuery.trim() === '') {
            toast.error('Enter a request');
            return;
        };
        
        this.props.onSubmit(this.state.inputQuery);
        this.setState({inputQuery: ''});
    };


    render() {
        const { inputQuery } = this.state;

        return (
        <header className={styles.searchBar}>
            <form className={styles.searchForm} onSubmit={this.handleSubmit}>
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
                    onChange={this.handleInput}
                />
            </form>
        </header>
    )
    }
};

SearchBar.propTypes = {
    onSubmit: PropTypes.func.isRequired,
};

export default SearchBar;