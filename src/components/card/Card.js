// import { NavLink } from 'react-router-dom';
import css from './Card.module.scss';
// import { useState } from 'react';
// import Button from '../UI/Button/Button';
// import Icon from '../UI/Icon/Icon';

function Card(props) {
  return (
    <div className={css.card}>
      <h2>{props.id}</h2>
      <h2 className={css.title}>{props.name}</h2>
      <h3 className={css.text}>{props.country}</h3>
      <h3 className={css.text}>{props.currency}</h3>
      <h3 className={css.text}>{props.weburl}</h3>
    </div>
  );
}

export default Card;
