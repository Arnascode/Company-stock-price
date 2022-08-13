import { NavLink } from 'react-router-dom';
import css from './Header.module.scss';

function Header(props) {
  return (
    <header className={css.header}>
      <nav>
        <div>
          <NavLink replace to={'/'}>
            <img className={css.img} src='../img/logo.png' alt='' srcset='' />
          </NavLink>
          
        </div>
      </nav>
    </header>
  );
}
export default Header;
