import "./LoadingPage.css";

const LoadingPage = () => {
  return (
    <div className="full-screen-container">
        <div className="loader-container">
            <div className="lds-grid">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>
            <h3 className="loading-text">Loading...</h3>
        </div>
    </div>
  );
};

export default LoadingPage;
