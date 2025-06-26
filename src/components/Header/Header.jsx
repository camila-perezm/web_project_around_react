import logo from "../../images/logo.png";

function Header() {
  return (
    <header className="header">
      <div className="header__img">
        <img
          src={logo}
          alt="Around the U.S logo"
          className="logo header__logo"
        />
      </div>
    </header>
  );
}

export default Header;
