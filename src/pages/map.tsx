import { useEffect } from "react";

const Map = () => {
  const initMap = () => {
    ILITEAPI.init({
      divId: "iapi",
      width: "100%",
      height: "80svh",
      activeGpMapId: "gp0",
      activeGpMaps: ["gp0", "gp1"],
      activeGpActions: ["pan", "fullExtent"],
      scale: 3500,
      marker: [
        {
          x: 362269,
          y: 362264,
          scale: 2000,
          opts: {
            title: "dymek nr 1",
            content: "dymek",
          },
        },
        {
          x: 361968,
          y: 362234,
          scale: 2000,
          opts: {
            title: "dymek nr 2",
            content: "dymek",
          },
        },
      ],
    });
  };

  useEffect(() => {
    initMap();
  }, []);

  return (
    <>
      <div className="h-[80svh] ">
        <div id="iapi"></div>
      </div>
    </>
  );
};

export default Map;
