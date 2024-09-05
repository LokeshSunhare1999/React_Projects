import React from "react";

function Card({ imgUrl, title, description, gitUrl, previewUrl }) {
  return (
    <>
      <div className="card" style={{ width: "18rem" }}>
        <img src={imgUrl} className="card-img-top" alt="..." />
        <div className="card-body text-center">
          <h5 className="card-title">{title}</h5>
          <h6 className="card-text">{description}</h6>
          <a href={gitUrl} className="btn btn-primary">
            Go somewhere
          </a>
        </div>
      </div>
    </>
  );
}

export default Card;
