import React from "react";

function Footer() {
  const todaytYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <p className="footer__copyright">© {todaytYear} Mesto Russia</p>
    </footer>
  );
}

export default Footer;
