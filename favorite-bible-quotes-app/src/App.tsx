import * as React from 'react';
import { useState, useEffect, useRef} from 'react';
import { FisherYatesShuffleArray } from './lib/shuffle'

import './App.css';

function App() {
  const [bibleText, setBibleText] = useState({verse: "", text: ""});
  const [celebData, setCelebData] = useState([{full_name: "", image_url: ""}]);
  const [celebCountdown, setCelebCountdown] = useState(0);
  const [state, setState] = useState(false);
  const animatedEls = (document.querySelectorAll('.animated') as NodeListOf<HTMLElement> | null);
  
  useEffect(() => {
        
        

        if (!celebData || celebData[0].full_name === "") {(async () => {
            const celebs = fetch('/.netlify/functions/getImageData').then(data => data.json());
            const bibleQuote = fetch('https://labs.bible.org/api/?passage=random')
            .then(data => data.text())
            .then(text => {
                        const splitText = text.split('/b>'); // Verse and Text come batched together in a single string. Need to separate it'
                        const regex = /<b>|</ig;
                        return {
                                verse: splitText[0].replaceAll(regex, ''),
                                text: splitText[1]
                            };
                        });
            await Promise.all([celebs, bibleQuote]).then(data => {
                setCelebCountdown(data[0].length - 1);
                setCelebData(data[0]);
                setBibleText(data[1]);
                })
        })();
        }
        else if (celebCountdown < 0) { 
            setCelebData(FisherYatesShuffleArray(celebData));
            setCelebCountdown(celebData.length - 1);
            (async () => await fetch('https://labs.bible.org/api/?passage=random')
            .then(data => data.text())
            .then(text => {
                        const splitText = text.split('/b>'); // Verse and Text come batched together in a single string. Need to separate it'
                        const regex = /<b>|</ig;
                        setBibleText( {
                                verse: splitText[0].replaceAll(regex, ''),
                                text: splitText[1]
                            }
                        ); 
                        return; }))();

        }
        else {
            setCelebCountdown(celebCountdown => celebCountdown - 1);

            (async () => await fetch('https://labs.bible.org/api/?passage=random')
            .then(data => data.text())
            .then(text => {
                        const splitText = text.split('/b>'); // Verse and Text come batched together in a single string. Need to separate it'
                        const regex = /<b>|</ig;
                        setBibleText( {
                                verse: splitText[0].replaceAll(regex, ''),
                                text: splitText[1]
                            }
                        ); 
                        return; }))();
            }
        

        

    }, [state]);


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

      <h1 className='celeb-name animated'>{celebData[celebCountdown].full_name}</h1>
      <img src={celebData[celebCountdown].image_url} alt="Random Celebrity" className='celeb-image animated'/>
      <div className="verse-box">
        <span className="">Favorite Bible Verse</span>
        {/*<p className="verse-text">“Happy is the one who seizes your infants and dashes them against the rocks.”</p>*/}
        <p className="verse-text animated">{bibleText.text}</p>
        <h3 className="verse-origin animated">{bibleText.verse}</h3>
      </div>
        <button className="fetchButton" onClick={() => {setState(!state)}}>Next Celebrity</button>
    </div>
    <p className="authorCredit">Created by Quaid Rodgers</p>
    </>
  );
}


export default App;
