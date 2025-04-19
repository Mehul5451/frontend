import React from "react";

// Main App Component
export const App = () => {
  return (
    <React.Fragment>
      {/* Rendering multiple Card components */}
      <Cards />
      <Cards />
      <Cards />
      <Cards />
      <Cards />
    </React.Fragment>

    
  );
};
//first way
 {/*  [<Cards key="1"/>,<Cards key="2"/>,<Cards key="3"/>,<Cards key="4"/>]  */}
 //second way
{/* <div>
     Main Movie Section 
       <div>
         <img
           src="insect.webp"
           alt="A representation of the movie"
           width="20%"
           height="40%"
    
       </div>
       <div>
         <h2>Name: Insect (2010)</h2>
         <h3>Rating: 8.5</h3>
         <p>
           One of the most celebrated movies of recent times, *Inception* (2010),
           directed by Christopher Nolan, is a masterful blend of science
           fiction, action, and psychological thriller. The film follows Dom
           Cobb, played by Leonardo DiCaprio, a skilled thief who specializes in
           extracting secrets from people's subconscious during their dreams.
           Tasked with the seemingly impossible mission of "inception"—
           implanting an idea into someone's mind—Cobb assembles a team of
           specialists to navigate the layers of a target's dreamscape. With its
           intricate plot, stunning visual effects, and thought-provoking themes
           about reality and memory, *Inception* leaves viewers questioning the
           boundaries between dreams and waking life. Its iconic soundtrack by
           Hans Zimmer and the famous "spinning top" ending make it a cinematic
           experience that continues to captivate audiences worldwide.
         </p>
       </div>

        Cards Section 
       <div> 
         <Cards />
      </div>
    </div> */}
// Cards Component

const age = 20;
let whowatch = "Not Available";

if (age >= 18) {
  whowatch = "Available";
}
const name="Insect (2010)";
const rating = "8.5";
const summary="One of the most celebrated movies of recent times, *Inception* (2010), directed by Christopher Nolan, is a masterful blend of science  fiction, action, and psychological thriller. The film follows Dom Cobb, played by Leonardo DiCaprio, a skilled thief who specializes in extracting crets from people's subconscious during their dreams Tasked with the seemingly impossible mission of inception implanting an idea into someone's and—Cobb assembles a team of specialists to navigate the layers of a target's dreamscape. With its intricate plot, stunning visual effects, and thought-provoking themes about reality and memory, *Inception* leaves viewers questioning the boundaries between dreams and waking life. Its iconic soundtrack by Hans Zimmer and the famous `spinning top ending make it a cinematic experience that continues to captivate audiences worldwide.";


export const Cards = () => {

  //first way
// if(age<18)
 
//   {
    
//     return (
//       <div>
//         <div>
//           <img
//             src="insect.webp"
//             alt="A representation of the movie"
//             width="20%"
//             height="40%"
//           />
//         </div>
//         <div>
      
//           <h2>Name: {name}</h2>
//           <h3>Rating: {rating} 
//           </h3>
//           <p>
//           {summary}
//           </p>  
//           <button>Not Available</button>
//         </div>
//       </div>
//     );
//   }  

 
  return (
    <div>
      <div>
        <img
          src="insect.webp"
          alt="A representation of the movie"
          width="20%"
          height="40%"
        />
      </div>
      <div>
    
        <h2>Name: {name}</h2>
        <h3>Rating: {rating} 
        </h3>
        <p>
        {summary}
        </p>
{/*secod way */}       
    {/*    <button>{age >= 18 ? "WATCH NOW" : "NOT AVAILABLE FOR YOU"}</button>*/}

    {/*third way*/}
<button>{whowatch}</button>
      </div>
    </div>
  );
};
