import css from './Header.module.scss';

function Header(props) {
  return (
    <header className={css.header}>
      <nav>
        <div>
          <img className={css.img} src='../img/logo.png' alt='' srcset='' />
        </div>
      </nav>
    </header>
  );
}
export default Header;
