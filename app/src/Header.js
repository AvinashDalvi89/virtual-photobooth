import React from 'react';
import { css } from '@emotion/css';
import { Link } from 'react-router-dom';
import logo from './logo.png';
import './index.css'
export default function Header() {
  return (
    <div className={headerContainer}>
      <Link to="/" className={linkStyle}>
        <div>
          <img className={logoStyle} alt="post" src={logo} />
          <h1 className={headerStyle}>Virtual Photobooth | Click me & frame me !</h1>
        </div>
      </Link>
      {/* <Link to="/Admin" className={linkStyle}>Admin</Link> */}
    </div>
  )
}

const headerContainer = css`
  padding-top: 20px;
`

const headerStyle = css`
  font-size: 20px;
  margin-top: 0px;
`

const linkStyle = css`
  color: black;
  font-weight: bold;
  text-decoration: none;
  margin-right: 10px;
  \:hover {
    color: #058aff;
  }
`

const logoStyle = css`
  width: 6em;
  display: flex;
  margin-top: 7px;
  margin-left: auto;
  margin-right: auto;
  `
