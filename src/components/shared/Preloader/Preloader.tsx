import React from 'react';
import s from './Preloader.module.scss';

let Preloader = () => {
    return (
        <div className={s.spinnerWrap}>
            <div className={s.spinner}>
            </div>
        </div>
    );
};

export default Preloader;
