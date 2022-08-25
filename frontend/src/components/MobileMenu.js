function MobileMenu ({ emailUser, onSignOut, isMobileMenuOpen }) {

  return (
    <div className={isMobileMenuOpen ? "mobile-menu_opened" : "mobile-menu" }>
      <h2 className="mobile-menu__email">{emailUser}</h2>
      <button className="mobile-menu__exit" type="button" onClick={onSignOut}>Выйти</button>
    </div>
  );
};

export default MobileMenu;
