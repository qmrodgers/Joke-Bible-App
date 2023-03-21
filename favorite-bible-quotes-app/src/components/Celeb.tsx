import {type CelebrityData, Celebrity} from '../lib/types'
import React, {useState, useEffect, useRef} from 'react'
import axios from 'axios';

type BibleQuote = {
verse: string,
text: string
}


type CelebrityPacket = {
celebrity: Celebrity,
quote: BibleQuote
}


async function getBibleQuote(): Promise<BibleQuote> {
const quote = await axios.get('https://labs.bible.org/api/?passage=random')
.then(response => response.data)
.then(text => {
        const splitText = text.split('/b>'); // Verse and Text come batched together in a single string. Need to separate it'
        const regex = /<b>|</ig;
        return {
                verse: splitText[0].replaceAll(regex, ''),
                text: splitText[1]
        };
    });

return quote;
}


async function getLoadedImageWithURL(celeb: CelebrityPacket | Celebrity) {
    
    const isCelebrityPacket = ("celebrity" in celeb);

    const imageData = isCelebrityPacket ? 
    await axios.get(celeb.celebrity.image_url, {responseType: 'arraybuffer'}).then(response => new Blob([new Uint8Array(response.data)], {type: `image/${response.headers['content-type'].split('/')[1]}`})) :
    await axios.get(celeb.image_url, {responseType: 'arraybuffer'}).then(response => new Blob([new Uint8Array(response.data)], {type: `image/${response.headers['content-type'].split('/')[1]}`}));

    if (isCelebrityPacket) {
        celeb.celebrity.image_url = URL.createObjectURL(imageData);
        return celeb;
    }
    else {
        celeb.image_url = URL.createObjectURL(imageData);
        return celeb;
    }

}
// [{full_name: '', image_url: ''}])

export function Celeb() {
  const fetchedCelebData = useRef<Celebrity[] | undefined>(undefined);
  const fetchedCelebCountdown = useRef<number>(0);
  const celebSet = useRef<CelebrityPacket[] | undefined>(undefined);
  const [currentCeleb, setCurrentCeleb] = useState<CelebrityPacket | undefined>(undefined);
  //const [state, setState] = useState(false);
  const animatedEls = (document.querySelectorAll('.animated') as NodeListOf<HTMLElement> | null);


  async function refreshCelebData(): Promise<void> {
      console.log('running refresh on celeb data')
          const data = await axios.get('/.netlify/functions/getImageData').then(response => response.data)

          .catch(err => { console.error('err'); return undefined });
      console.log(data);
      console.log('after');
      if (!data) {console.log('no data'); return;}
      fetchedCelebData.current = data;
      if (!fetchedCelebData.current) {console.log('no data'); return;}
      fetchedCelebCountdown.current = fetchedCelebData.current.length - 1;
      return;
  } // Refresh randomized list of celebrities (and user-generated content);

  async function nextCelebrityData(): Promise<boolean> {
      console.log('running next celeb data')
          if (!celebSet.current) { console.log('no celeb set'); return false;}
      console.log(`setting celebrity ${celebSet.current[0].celebrity.full_name}`)
      setCurrentCeleb(celebSet.current[0]);
      iterateCelebritySet();
      return true;
  } // Iterate onto the next celebrity. This should be what triggers the useEffect hook in this implementation

  async function prepareInitialCelebritySet(): Promise<boolean> {

      console.log('running prepare initial set of celeb data')
          if (!Array.isArray(fetchedCelebData.current)) { console.log('is not array'); return false; }
      // initialize 5 images and quotes to quickly load
      const array = await Promise.all(Array.from(new Array(5))
              .map(async (el) => {
                  if (fetchedCelebCountdown.current <= 0) {
                  await refreshCelebData();
                  }
                  const celebIndex = fetchedCelebCountdown.current;
                  fetchedCelebCountdown.current = fetchedCelebCountdown.current - 1;
                  const imageData = (fetchedCelebData.current) ? await getLoadedImageWithURL(fetchedCelebData.current[celebIndex]) : await getLoadedImageWithURL({full_name: '', image_url: ''});
                  console.log(`should set name to ${("celebrity" in imageData) ? imageData.celebrity.full_name : imageData.full_name}`)
                  const celebrityData: CelebrityPacket = {
                    celebrity: {
                        image_url: ("celebrity" in imageData) ? imageData.celebrity.image_url : imageData.image_url,
                        full_name: ("celebrity" in imageData) ? imageData.celebrity.full_name : imageData.full_name
                    }, 
                    quote: await getBibleQuote()
                    }
                    console.log(celebIndex);

                    return celebrityData
            }
));


celebSet.current = array;
console.log(celebSet.current);
console.log('set celebrities');
return true;
} // Run only once, when the component mounts, loading images as HTMLImageElements to allocate in user memory


  async function iterateCelebritySet(): Promise<boolean> {
      
      console.log('running iterate')
       if (!celebSet.current) {
            return false;
        }
    
        if (fetchedCelebCountdown.current <= 0) await refreshCelebData();

        const imageData = (fetchedCelebData.current) ? await getLoadedImageWithURL(fetchedCelebData.current[fetchedCelebCountdown.current]) : await getLoadedImageWithURL({full_name: '', image_url: ''});
        const celebrityData: CelebrityPacket = {
            celebrity: {
                image_url: ("celebrity" in imageData) ? imageData.celebrity.image_url : imageData.image_url,
                full_name: ("celebrity" in imageData) ? imageData.celebrity.full_name : imageData.full_name
           }, 
            quote: await getBibleQuote()
        }
        fetchedCelebCountdown.current = fetchedCelebCountdown.current - 1;
        celebSet.current = [...celebSet.current.splice(1), celebrityData]

        
        

        return true;
    } // Splice celebSet from index 1 onward, appending another at the end, and allocating another image
  

  useEffect(() => {
        

        console.log('start of useEffect');

        (async () => {
            await refreshCelebData();
            console.log(fetchedCelebData.current)
            

            if (!fetchedCelebData.current) {
            console.log('no celebrity data to sort into image');
            return;
            }
            console.log('yeah');
            const fetchedImage = fetchedCelebData.current[fetchedCelebCountdown.current];
            const bibleQuote = await getBibleQuote();
            
            const packet = await getLoadedImageWithURL({
                celebrity: fetchedImage,
                quote: bibleQuote
            }) as CelebrityPacket
        console.log('setting data'); 
        setCurrentCeleb(packet);    
        await prepareInitialCelebritySet();
        })();
        




        

    }, []);


    if (!currentCeleb) return (<>hi</>);
    return (
    <div className="App">
      <h1 className='celeb-name animated'>{currentCeleb.celebrity.full_name}</h1>
      <img src={currentCeleb.celebrity.image_url} alt={currentCeleb.celebrity.full_name} className='celeb-image animated'/>
      <div className="verse-box">
        <span className="">Favorite Bible Verse</span>
        {/*<p className="verse-text">“Happy is the one who seizes your infants and dashes them against the rocks.”</p>*/}
        <p className="verse-text animated">{currentCeleb.quote.text}</p>
        <h3 className="verse-origin animated">{currentCeleb.quote.verse}</h3>
      </div>
        <button className="fetchButton" onClick={() => {nextCelebrityData()}}>Next Celebrity</button>
    </div>
    )
      



}
