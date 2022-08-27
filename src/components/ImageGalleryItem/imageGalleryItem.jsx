import React from 'react';
import PropTypes from 'prop-types';
import styles from './styles.module.css';

const ImageGalleryItem = ({ webformatURL, tags, onClickPhoto }) => {
    return (
        <li className={styles.imageGalleryItem} onClick={onClickPhoto}>
            <img
                className={styles.imageGalleryItem__image}
                src={webformatURL}
                alt={tags}
            />
        </li>
    )
};

ImageGalleryItem.propTypes = {
    onClickPhoto: PropTypes.func.isRequired,
    webformatURL: PropTypes.string.isRequired,
    tags: PropTypes.string.isRequired,
};

export default ImageGalleryItem;