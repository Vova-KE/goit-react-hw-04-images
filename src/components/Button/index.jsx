import React from 'react';
import PropTypes from 'prop-types';
import styles from './styles.module.css';

const Button = ({onClick, isLoading}) => {
    return (
        <div className={styles.buttonWrap}>
            <button
                type='button'
                className={styles.button}
                onClick={onClick}
            >
                {isLoading ? 'Loading...' : 'Load more'}
            </button>
        </div>
    )
};

Button.propTypes = {
    onClick: PropTypes.func.isRequired,
    isLoading: PropTypes.bool.isRequired,
};

export default Button;