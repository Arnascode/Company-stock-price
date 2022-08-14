import css from './Header.module.scss';

export function refreshPage() {
  window.location.reload();
}

function Header(props) {
  return (
    <header className={css.header}>
      <nav>
        <div>
          <img onClick={refreshPage} className={css.img} src='../img/logo.png' alt='' srcset='' />
        </div>
      </nav>
    </header>
  );
}
export default Header;
