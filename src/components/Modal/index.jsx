import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './styles.module.css';

class Modal extends Component {
    componentDidMount() {
        window.addEventListener('keydown', this.handleEscapeCloseModal)
    };

    componentWillUnmount() {
        window.removeEventListener('keydown', this.handleEscapeCloseModal)
    }

    handleEscapeCloseModal = event => {
        if (event.code === 'Escape') {
            this.props.onModalClose();
        }
    };

    handleBackDropClick = event => {
        if (event.target === event.currentTarget) {
            this.props.onModalClose();
        }
    };

    render() {
        const { modalPhoto, tags } = this.props;

        return (
        <div className={styles.overlay} onClick={this.handleBackDropClick}>
            <div className={styles.modal}>
                <img src={modalPhoto} alt={tags} />
            </div>
        </div>
    )}
};

Modal.propTypes = {
    onModalClose: PropTypes.func.isRequired,
    modalPhoto: PropTypes.string.isRequired,
    tags: PropTypes.string,
};

export default Modal;