import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import styles from './styles.module.css';

    const Modal = ({onModalClose,modalPhoto, tags}) => {

    useEffect(() => {
        window.addEventListener('keydown', handleEscapeCloseModal)

        return () => window.removeEventListener('keydown', handleEscapeCloseModal);
    })

    const handleEscapeCloseModal = event => {
        if (event.code === 'Escape') {
            onModalClose();
        }
    };

    const handleBackDropClick = event => {
        if (event.target === event.currentTarget) {
            onModalClose();
        }
    };

        return (
        <div className={styles.overlay} onClick={handleBackDropClick}>
            <div className={styles.modal}>
                <img src={modalPhoto} alt={tags} />
            </div>
        </div>
    )
};

Modal.propTypes = {
    onModalClose: PropTypes.func.isRequired,
    modalPhoto: PropTypes.string.isRequired,
    tags: PropTypes.string,
};

export default Modal;