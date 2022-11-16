import { React } from 'react';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import './css/navbar.css';

export function Navbar() {
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <a className="navbar-brand" href="/">Arbit</a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <a className="nav-link active" aria-current="page" href="/">Swap</a>
              </li>
              <li className="nav-item">
                <a className="nav-link active" aria-current="page" href="/">Addresses</a>
              </li>
              <li className="nav-item">
                <a className="nav-link active" aria-current="page" href="/">About</a>
              </li>
              <li className="nav-item">
                <a className="nav-link active" aria-current="page" href="/">Contact</a>
              </li>
            </ul>
            <ConnectButton className="cus-connect" />
          </div>
        </div>
      </nav>
    </>
  );
}
