import React from 'react';

const Footer = () => {
  return (
    <div>
      <footer>
        Made with &nbsp;<img src="" alt="" />&nbsp;
      </footer>
      <style jsx>{`
        footer {
          width: 100%;
          height: 100px;
          border-top: 1px solid #eaeaea;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .logo {
          height: 1em;
          margin: 5px;
        }
      `}</style>
    </div>
  );
};

export default Footer;
