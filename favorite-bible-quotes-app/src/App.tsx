import * as React from 'react';
import { useState, useEffect, useRef} from 'react';
import { FisherYatesShuffleArray } from './lib/shuffle'
// Components
import { Celeb } from './components/Celeb';
import { Modal, ModalButton, ModalContent, ButtonProps } from './components/Modal'
import { UserBar }from './components/UserBar';

import './styles/App.css';

function App() {

  return (
    <div className="main-wrapper animate-background">
    <UserBar/>
    
    <div className="fixed-description-container">
      <h3>Everyone loves the Bible, right?!</h3>
      <h3>So do celebrities!</h3>
      <p>See the bible quotes that inspire the people that inspire you!</p>
      <p>Click the button to see the Authentic*, REAL* choices of a random celebrity!</p>
      <p className='disclaimer-text'>* = May be entirely inaccurate or a lie</p>
    </div>
    <Celeb/>
    <p className="authorCredit">Created by Quaid Rodgers</p>
    </div>
  );
}


export default App;
