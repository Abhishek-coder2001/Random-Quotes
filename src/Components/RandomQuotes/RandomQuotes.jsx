// "use client"
// import React, { useState } from 'react'
// import './RandomQuotes.css'
// import cross_icon from '../Assets/cross.jpg'
// import retry_icon from '../Assets/retry.png'


// const RandomQuotes = () => {

//     let quotes=[];     //Main Variable to store all the api data.

//     async function fetchQuotes(){
//         const rawdata=await fetch(`https://type.fit/api/quotes`)
//         quotes=await rawdata.json();
//     }

//     const [quote, setquote] = useState({
//         text: "Difficulties accept the nearer we get to the goal",
//         author: "Jhon Gal Gadot",
//     });

//     const retry=()=>{       // For reload one by one quotes
//         const retryQuotes=quotes[Math.floor(Math.random)*quotes.length];
//         setquote(retryQuotes);
//     }

//     fetchQuotes();
//     return (

//         <div className="main">
//             <div className='container'>
//                 <div className="quote">{quote.text}</div>
//                 <div>
//                     <div className="line"></div>
//                     <div className="bottom">
//                         <div className="author">{quote.author}</div>
//                         <div className="icon">
//                             <img src={cross_icon} alt="" />
//                             <img src={retry_icon} 
//                             onClick={()=>{
//                                 retry()
//                             }} alt="" />
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>

//     )
// }

// export default RandomQuotes


import React, { useState, useEffect } from 'react';
import './RandomQuotes.css';
import share_icon from '../Assets/share.png';
import retry_icon from '../Assets/retry.png';

const RandomQuotes = () => {
  const [quotes, setQuotes] = useState([]);
  const [quote, setQuote] = useState({
    text: "Difficulties accept the nearer we get to the goal",
    author: "Jhon Gal Gadot",
  });

  useEffect(() => {
    async function fetchQuotes() {
      try {
        const rawdata = await fetch('https://type.fit/api/quotes');
        const data = await rawdata.json();
        setQuotes(data);
      } catch (error) {
        console.error('Error fetching quotes:', error);
      }
    }

    fetchQuotes();
  }, []);

  const retry = () => {
    const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
    setQuote(randomQuote);
  };

  const share=()=>{
    window.open(`https://facebook.com/intent/post?text=${quote.text} - ${quote.author.split(',')[0]}`)
  }

  return (
    <div className="main">
      <div className='container'>
        <div className="quote">{quote.text}</div>
        <div>
          <div className="line"></div>
          <div className="bottom">
            <div className="author">Author: {quote.author.split(',')[0]}</div>
            <div className="icon">
              <img src={share_icon} 
              onClick={()=>{
                share()
              }} alt="" />
              <img
                src={retry_icon}
                onClick={retry}
                alt=""
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RandomQuotes;

