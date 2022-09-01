import * as React from 'react';
import { useState, useEffect, useRef } from 'react';


import './App.css';

function App() {
  const celebImage = require('./images/logo.webp');
  const [bibleText, setBibleText] = useState(['', '']);
  const [celebData, setCelebData] = useState(['', '']);
  const [state, setState] = useState(false);
  const verseText = useRef('');
  const verseOrigin = useRef('');
  const animatedEls = (document.querySelectorAll('.animated') as NodeListOf<HTMLElement> | null);

  useEffect(() => {
    fetch('https://labs.bible.org/api/?passage=random')
      .then(response => {
        return response.text()
      })
      .then(text => {
        console.log(text);
        let separatedScripture: string[] = text.split(`/b>`);
        separatedScripture[0] += `/b>`;
        setBibleText(prev => separatedScripture);
        verseText.current = separatedScripture[1];
        verseOrigin.current = (separatedScripture[0].slice(3, separatedScripture[0].lastIndexOf(`<`)));

        

        
      });

    fetch('/api/get/celebrities/random')
    .then(response => response.json())
    .then(json => {
      console.log(json.name);
      console.log(json);
    });

      if(animatedEls) {

        const timeoutFunctionAnimations = () => setTimeout(() => { animatedEls.forEach(el => el.style.animationName = "") }, 0)

        animatedEls.forEach(el => {
          el.style.animationName = "none"; //odd CSS trick. Resets css animations for affected elements by setting animation name         
        })  
        requestAnimationFrame(() => {timeoutFunctionAnimations()});
        
        return () => {  //runs before a second useEffect, to clear out any remaining weirdness
          clearTimeout(timeoutFunctionAnimations());
        }

        }

  }, [state])



  return (
    <div className="App">
      <h1 className="cool-site-brand">AmazingCelebrityBibleQuotes.com</h1>
      <h1 className='celeb-name animated'>Greta Thunberg</h1>
      <img src={celebImage} alt="hello" className='celeb-image animated'/>
      <div className="verse-box">
        <span className="animated">Favorite Bible Verse</span>
        {/*<p className="verse-text">“Happy is the one who seizes your infants and dashes them against the rocks.”</p>*/}
        <p className="verse-text animated">{verseText.current}</p>
        <h3 className="verse-origin animated">{verseOrigin.current}</h3>
      </div>
        <button className="fetchButton" onClick={() => {setState(!state);}}>New Verse</button>
    </div>
  );
}


export default App;
