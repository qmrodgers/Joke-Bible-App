import { Handler, HandlerEvent, HandlerContext } from "@netlify/functions";

const handler: Handler = async (event: HandlerEvent, context: HandlerContext) => {
  // your server-side functionality
    //
    

    let passageArray = Array.from({length: 5}, (element => {
        await fetch('https://labs.bible.org/api/?passage=random').then(
            response => {
                return response.text();
        })));

    passageArray.map
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
};

export { handler };
