"use client";

import { useRef, useState } from "react";
import { Button } from "./components/button";
import { getRandomGradient, getRandomSize } from "@/randoms";

export default function Home() {
  const [circles, setCircles] = useState([]);
  const [circlesInDisplay, setCirclesInDisplay] = useState([]);
  const [undoneCircles, setUndoneCircles] = useState([]);
  const [circleId, setCircleId] = useState(0);
  const [lastAction, setLastAction] = useState(null);
  const [maxWidth, setMaxWidth] = useState(null);
  const [unlimitedRedo, setUnlimitedRedo] = useState(false);
  const containerRef = useRef(null);

  const handleClick = (e) => {
    const circleSize = getRandomSize();
    const newCircle = {
      x: e.pageX - circleSize / 2,
      y: e.pageY - circleSize / 2,
      id: circleId,
      size: circleSize,
      animate: true,
      background: getRandomGradient(),
    };
    const newCircles = [...circles, newCircle];
    setCircles(newCircles);
    setCircleId(circleId + 1);
    setLastAction("create");

    //ISSO SERVE PARA AUMENTAR AS BEIRADAS
    const container = containerRef.current;
    if (container) {
      const rect = container.getBoundingClientRect();
      const newWidth = Math.max(
        rect.height,
        e.pageX + circleSize,
        window.innerWidth,
        maxWidth
      );
      const newHeight = Math.max(
        rect.height,
        e.pageY + circleSize,
        window.innerHeight
      );
      setMaxWidth(newWidth);
      container.style.width = `${newWidth}px`;
      container.style.height = `${newHeight}px`;
    }
    setTimeout(() => {
      const updatedCircles = newCircles.map((circle) =>
        circle.id === circleId ? { ...circle, animate: false } : circle
      );
      setCircles(updatedCircles);
    }, 50);
  };

  const handleUndo = () => {
    const lastCircle = circles[circles.length - 1];
    if (lastCircle) {
      const newUndoneCircles = [...undoneCircles, lastCircle];
      setUndoneCircles(newUndoneCircles);

      const newCircles = circles.slice(0, circles.length - 1);
      setCircles(newCircles);
      setLastAction("undo");
    }
  };

  const handleRedo = () => {
    const lastUndoneCircle = undoneCircles[undoneCircles.length - 1];
    // SE QUISER MOSTRAR TODOS OS ITEMS QUE JA FORAM DESFEITOS E COLOCALOS EM ORDEM DE VOLTA
    if (lastUndoneCircle && lastAction === "undo") {
      const newCircles = [...circles, lastUndoneCircle];
      setCircles(newCircles);

      const newUndoneCircles = undoneCircles.slice(0, undoneCircles.length - 1);
      setUndoneCircles(newUndoneCircles);
      setLastAction("redo");
    }
    // SE QUISER MOSTRAR APENAS O ULTIMO ITEM DESFEITO
    if (unlimitedRedo && lastUndoneCircle) {
      const newCircles = [...circles, lastUndoneCircle];
      setCircles(newCircles);

      const newUndoneCircles = undoneCircles.slice(0, undoneCircles.length - 1);
      setUndoneCircles(newUndoneCircles);
      setLastAction("redo");
    }
    if (lastAction === "clear") {
      const circlesInScreen = circles;
      setUndoneCircles(circlesInScreen);

      setCircles(circlesInDisplay);
      setLastAction("redo");
    }
  };

  const handleClear = () => {
    const circlesInScreen = circles;
    setCirclesInDisplay(circlesInScreen);
    setUndoneCircles(circlesInScreen);

    const clearCircles = [];
    setCircles(clearCircles);
    setLastAction("clear");
  };

  return (
    <main>
      <div
        className="fixed top-0 left-0 z-10
      bg-gradient-radial from-fuchsia-500 to-black/90 w-full  p-2 overflow-auto rounded-lg
      md:w-[310px] md:h-[320px] md:top-10 md:left-10"
      >
        <div className="flex items-center justify-center gap-x-4 p-2 text-white flex-wrap">
          {"Clicks -> "}
          <span className="text-3xl rounded-md p-3">{circleId}</span>
        </div>
        <hr className="h-[1px] "></hr>
        <div className="flex-col justify-center items-center mt-5 ">
          <div className="flex justify-evenly mb-1">
            <Button
              onClick={handleUndo}
              className="flex  text-white p-3 gap-x-4 bg-black  hover:bg-black/60"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 15L3 9m0 0l6-6M3 9h12a6 6 0 010 12h-3"
                />
              </svg>
              Desfazer
            </Button>
            {lastAction === "undo" || lastAction === "clear" ? (
              <Button
                className="flex  text-white p-3 gap-x-4  bg-black  hover:bg-black/60"
                onClick={handleRedo}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 15l6-6m0 0l-6-6m6 6H9a6 6 0 000 12h3"
                  />
                </svg>
                Refazer
              </Button>
            ) : unlimitedRedo ? (
              <Button
                className="flex  text-white p-3 gap-x-4  bg-black hover:bg-black/60"
                onClick={handleRedo}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 15l6-6m0 0l-6-6m6 6H9a6 6 0 000 12h3"
                  />
                </svg>
                Refazer
              </Button>
            ) : (
              <Button
                className="flex  text-white p-3 gap-x-4  bg-black/60 cursor-not-allowed"
                onClick={handleRedo}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 15l6-6m0 0l-6-6m6 6H9a6 6 0 000 12h3"
                  />
                </svg>
                Refazer
              </Button>
            )}
          </div>
          <label className="text-bold text-lg">Selecione o tipo de refazer:</label>
          <select 
            className=" bg-black p-4 w-full rounded-xl"
            onChange={() => setUnlimitedRedo(!unlimitedRedo)}>
              <option value={false}>Refazer limitado</option>
              <option value={true}>Refazer ilimitado</option>
            </select>
          <div className="flex justify-center items-center w-auto">
            <Button
              className=" text-white p-3 gap-x-4 mt-2 bg-red-500 hover:bg-red-500/60"
              onClick={handleClear}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                />
              </svg>
              {lastAction === "clear" ? "Limpar cache" : "Limpar"}
            </Button>
            
          </div>
        </div>
      </div>

      <div
        ref={containerRef}
        className="w-screen h-screen bg-slate-50  overflow-x-hidden"
        onClick={handleClick}
      >
        {circles.map((circle) => (
          <div
            key={circle.id}
            style={{
              left: circle.x,
              top: circle.y,
              width: circle.size,
              height: circle.size,
              background: circle.background,
              transition: "transform 0.5s ease-out",
              transform: circle.animate ? "scale(0)" : "scale(1)",
            }}
            className={`
             rounded-full items-center 
            justify-center flex absolute
            `}
          ></div>
        ))}
      </div>
    </main>
  );
}
