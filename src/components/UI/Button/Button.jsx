import css from './Button.module.scss';

function Button(props) {
  return (
    <button
      type={props.submit ? 'submit' : 'button'}
      onClick={props.onClick}
      className={props.secondary ? css.secondary : css.primary}
    >
      {props.children}
    </button>
  );
}

export default Button;
