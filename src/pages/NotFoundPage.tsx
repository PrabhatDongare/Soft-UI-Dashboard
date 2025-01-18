import React from "react";

const NotFoundPage: React.FC = () => {
  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div className="text-center">
        <h1>404 - Page Not Found</h1>
        <p>Sorry, the page you're looking for doesn't exist.</p>
      </div>
    </div>
  );
};

export default NotFoundPage;
