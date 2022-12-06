import React from 'react';
import { css } from '@emotion/css';
import { Link } from 'react-router-dom'; 
import './index.css'
export default function Footer() {
  return (
    <div className='footer'> 
        <p>
            This virtual photo booth is inspired by the AWS community and dedicated to the AWS community. This can be customised. Work is in progress!
        </p>
        <h2>Copyright © 2022. Virtual Photobooth</h2>
      
    </div>
  )
}

const footer = css`
  padding-top: 5px;
`
 