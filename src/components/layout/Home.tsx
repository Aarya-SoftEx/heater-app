import React from "react";

const Home: React.FC = () => {
  return (
    <div className="container">
      <div className="d-flex justify-content-end align-items-center">
        <div className="card final-price-card">
          <p className="text-secondary f-16 mb-2">Final Price</p>
          <h3 className="f-24 text-black fw-700 mb-2">₹ 14,450</h3>
          <p className="text-secondary f-16 mb-2">$160.28</p>
        </div>
      </div>
    </div>
  );
};

export default Home;
