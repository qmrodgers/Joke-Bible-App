import * as React from 'react';
import { useState, useEffect, useRef } from 'react';


import './App.css';

function App() {
  const [bibleText, setBibleText] = useState(['', '']);
  const [celebData, setCelebData] = useState(['', '']);
  const [state, setState] = useState(false);
  const verseText = useRef('');
  const verseOrigin = useRef('');
  const celebrityName = useRef('');
  const celebrityImgSrc = useRef('');
  const animatedEls = (document.querySelectorAll('.animated') as NodeListOf<HTMLElement> | null);

  useEffect(() => {
    


    fetch('https://labs.bible.org/api/?passage=random')
      .then(response => {
        return response.text()
      })
      .then(text => {
        //console.log(text);
        let separatedScripture: string[] = text.split(`/b>`);
        separatedScripture[0] += `/b>`;
        setBibleText(prev => separatedScripture);
        verseText.current = separatedScripture[1];
        verseOrigin.current = (separatedScripture[0].slice(3, separatedScripture[0].lastIndexOf(`<`)));

        

        
      });

    fetch('https://favorite-bible-quotes-api.herokuapp.com/api/get/celebrity/random', {
      headers: {
      'Content-Type': 'application/json'
    }})
    .then(response => response.json())
    .then(json => {
      setCelebData([json.name, json.img_src]);
      //console.log(json.name);
      //console.log(json);

      

    });


    /*
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

*/


      

  }, [state])



  return (
    <>
    <div className="fixed-description-container">
      <h3>Everyone loves the Bible, right?!</h3>
      <h3>So do celebrities!</h3>
      <p>See the bible quotes that inspire the people that inspire you!</p>
      <p>Click the button to see the Authentic*, REAL* choices of a random celebrity!</p>
      <p className='disclaimer-text'>* = May be entirely inaccurate or a lie</p>
    </div>
    <div className="App">

      <h1 className='celeb-name animated'>{celebData[0]}</h1>
      <img src={`./images/${celebData[1]}.webp`} alt="Random Celebrity Image" className='celeb-image animated'/>
      <div className="verse-box">
        <span className="">Favorite Bible Verse</span>
        {/*<p className="verse-text">“Happy is the one who seizes your infants and dashes them against the rocks.”</p>*/}
        <p className="verse-text animated">{verseText.current}</p>
        <h3 className="verse-origin animated">{verseOrigin.current}</h3>
      </div>
        <button className="fetchButton" onClick={() => {setState(!state)}}>Next Celebrity</button>
    </div>
    <p className="authorCredit">Created by Quaid Rodgers</p>
    </>
  );
}


export default App;
