import React, { useState, useEffect } from 'react'


import Posts from './Posts';

export default function virtualPhotobooth({
  posts = []
}) {
  return (
    <>
      <div className="row">
        <div className="side guide">
          <h2>How to use ?</h2>
          <div className="stepper-wrapper">
            <div className="stepper-item completed">
              <div className="step-counter">1</div>
              <div className="step-name">Select your frame first</div>
            </div>
            <div className="stepper-item completed">
              <div className="step-counter">2</div>
              <div className="step-name">Adjust your camera in right position</div>
            </div>
            <div className="stepper-item completed">
              <div className="step-counter">3</div>
              <div className="step-name">Capture photo</div>
            </div>
            <div className="stepper-item completed">
              <div className="step-counter">4</div>
              <div className="step-name">Review it & download</div>
            </div>
          </div>
        </div>
      </div>
      <div className='container'>
        <div className="row">
          <Posts posts={posts} />
        </div>
      </div>
    
    </>
  )
}