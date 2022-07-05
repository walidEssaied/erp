import React, { useState } from 'react';
import SupportIcon from "/src/images/support.svg"

function Banner() {

  const [bannerOpen, setBannerOpen] = useState(true);

  return (
    <>
    { bannerOpen && (
      <div className="fixed bottom-0 right-0 w-full md:bottom-8 md:right-12 md:w-auto z-60">
        <div className="bg-slate-800 text-slate-50 text-sm p-4 md:rounded-full shadow-emerald-500 flex justify-between cursor-pointer items-center">
          {/* <button className="text-slate-500 hover:text-slate-400 ml-5 flex"> */}
          <img src={SupportIcon} className="w-7 h-7"/>
          {/* </button> */}
        </div>
      </div>
    )}
    </>
  );
}

export default Banner;