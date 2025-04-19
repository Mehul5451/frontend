import React from "react";
import img1 from '../../public/retro.jpg';
import img2 from '../../public/wedding.jpg';
import img3 from '../../public/marriage.jpg';
import img4 from '../../public/artist.jpg';

const FeaturedDJs=()=> {
  const djs = [
    { name: "CLUB DJ", image: img1,description: "Specializes in EDM and parties" },
    { name: "CEREMONY DJ", image:  img2,description: "dance, mixed genres, and pre-recorded wedding ceremony music. " },
    { name: "MARRIAGE DJ", image:  img3,description: "rock and roll, R&B, Latin, jazz, and classical" },
    { name: "RETRO DJ", image:  img4 ,description: "classic rock, disco, synthwave, and retro pop. "},
  ];

  return (
    <div className="featured-djs">
      <h2>Featured DJs</h2>
      <div className="dj-list">
        {djs.map((dj, index) => (
          <div className="dj-card" key={index}>
            <img src={dj.image} alt={dj.name} className="dj-image" />
            <h3>{dj.name}</h3>
            <p className="desc">{dj.description}</p>  
            {/*  <button className="btn">View Profile</button>  */}
          </div>
          
        ))}
        
      </div>
    </div>
  );
}

export default FeaturedDJs;
