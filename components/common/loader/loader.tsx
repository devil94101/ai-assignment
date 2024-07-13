import React, { CSSProperties, useEffect } from 'react';

import {FadeLoader} from 'react-spinners';
import './loader.css';

const override: CSSProperties = {
    display: "block",
    margin: "0 auto",
    borderColor: "red",
  };

export const LoaderComponent = () => {

  return <div className='fixed flex w-full h-screen z-999 justify-center items-center top-0 left-0 bg-[rgb(0,0,0,0.5)] overflow-hidden '>
    <FadeLoader
        cssOverride={override}
        color={"#72543b"}
        loading={true}
        speedMultiplier={1.5}
        aria-label="Loading Spinner"
        data-testid="loader"
    />
  </div>
};

export default LoaderComponent;
