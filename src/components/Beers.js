import React from "react";

const Beers = ({ beers, loading }) => {
  return (
    <div>
      <h3>
        Search Results: ({beers.length}){" "}
        {loading && <img src="/ajax-loader.gif" alt="" />}
      </h3>
      {beers.length > 0 && (
        <ul style={{ listStyleType: "none" }}>
          {beers.map(beer => (
            <li key={beer.id}>
              <figure style={{ display: "inline-block" }}>
                <img src={beer.image_url} alt="" height={100} />
              </figure>
              <p style={{ display: "inline-block" }}>
                {beer.name} <small>{beer.tagline}</small>
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Beers;
