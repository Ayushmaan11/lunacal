import React, { useEffect, useRef, useState } from "react";
import "./App.css";
import questionTable from "./assets/question-table.png";
import rectangle from "./assets/rectangle.png";
import leftArrow from "./assets/left-arrow.png";
import rightArrow from "./assets/right-arrow.png";
import sliderImage from "./assets/slider-image.jpg";
import bigRectangle from "./assets/big-rectangle.png";

function App() {
  
  const sliderRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [images, setImages] = useState([1, 2, 3, 4]); 
  const imageWidth = 280;
  const gap = 20;
  const totalImages = images.length;
  const visibleImages = 3;

  const slideLeft = () => {
    if (currentIndex > 0) setCurrentIndex((prev) => prev - 1);
  };

  const slideRight = () => {
    if (currentIndex < totalImages - visibleImages)
      setCurrentIndex((prev) => prev + 1);
  };

  
  const addImage = () => {
    const newImageNumber = images.length + 1;
    setImages(prev => [...prev, newImageNumber]);
    
    
    setTimeout(() => {
      if (newImageNumber > currentIndex + visibleImages) {
        setCurrentIndex(newImageNumber - visibleImages);
      }
    }, 100);
  };

  useEffect(() => {
    if (sliderRef.current) {
      const translateX = currentIndex * (imageWidth + gap);
      sliderRef.current.style.transform = `translateX(-${translateX}px)`;
    }
  }, [currentIndex, images]);

  
  const tabs = ["about", "experiences", "recommended"];
  const [activeTab, setActiveTab] = useState("about");
  const slidingBgRef = useRef(null);

  useEffect(() => {
    const tabIndex = tabs.indexOf(activeTab);
    const slideWidth = 100 / tabs.length;
    const newPosition = tabIndex * slideWidth;
    if (slidingBgRef.current) {
      slidingBgRef.current.style.left = `calc(${newPosition}% + 10px)`;
    }
  }, [activeTab]);

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.substring(1);
      if (tabs.includes(hash)) setActiveTab(hash);
    };
    handleHashChange();
    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  return (
    <div className="main">
      
      
      <div className="widget-container">
        <div className="navbar">
          <div className="icons">
            <img src={questionTable} alt="question-table-icons" />
          </div>

          <div className="content">
            <ul className="navbar-list">
              {tabs.map((tab) => (
                <li
                  key={tab}
                  className={`list-item ${activeTab === tab ? "active" : ""}`}
                  onClick={() => {
                    setActiveTab(tab);
                    window.location.hash = tab;
                  }}
                >
                  <a href={`#${tab}`} data-tab={tab}>
                    {tab.charAt(0).toUpperCase() + tab.slice(1)}
                  </a>
                </li>
              ))}
              <div className="sliding-bg" ref={slidingBgRef}></div>
            </ul>

            <div className="navbar-content">
              <p className="para1">
                Hello! I'm Dave, your sales rep here from Salesforce. I've been
                working at this awesome company for 3 years now.
              </p>
              <p className="para2">
                I was born and raised in Albany, NY & have been living in Santa
                Carla for the past 10 years my wife Tiffany and my 4 year old twin
                daughters- Emma and Ella. Both of them are just starting school,
                so my calendar is usually blocked between 9-10 AM. This is a...
              </p>
            </div>
          </div>

          <div className="rectangle">
            <img src={rectangle} alt="rectangle-icon" />
          </div>
        </div>
        
   
        <div className="widget-line">
          <img src={bigRectangle} alt="divider-line" className="big-rectangle-img" />
        </div>
      </div>
 
      
      <div className="widget-container">
        <div className="navbar">
          <div className="icons">
            <img src={questionTable} alt="question-table-icons" />
          </div>

          <div className="content">
            <div className="second-section">
              <div className="Gallery">
                <h1>Gallery</h1>
              </div>
              <div className="Add-image" onClick={addImage}>
                <h1>+ADD IMAGE</h1>
              </div>

              <div className="left-arrow">
                <button onClick={slideLeft} disabled={currentIndex === 0}>
                  <img src={leftArrow} alt="left-arrow" />
                </button>
              </div>

              <div className="right-arrow">
                <button
                  onClick={slideRight}
                  disabled={currentIndex >= totalImages - visibleImages}
                >
                  <img src={rightArrow} alt="right-arrow" />
                </button>
              </div>

              <div className="slider-container">
                <div className="slider-wrapper">
                  <div className="slider" ref={sliderRef}>
                    {images.map((n) => (
                      <img
                        key={n}
                        className={`img-${n}`}
                        src={sliderImage}
                        alt={`slider-${n}`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="rectangle">
            <img src={rectangle} alt="rectangle-icon" />
          </div>
        </div>
        

        <div className="widget-line">
          <img src={bigRectangle} alt="divider-line" className="big-rectangle-img" />
        </div>
      </div>
    </div>
  );
}

export default App;