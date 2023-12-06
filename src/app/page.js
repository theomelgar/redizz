"use client";

import { useEffect, useRef, useState } from "react";
import { getRandomGradient, getRandomSize } from "@/randoms";
import { Controller } from "./components/controller";
import Draggable from "react-draggable";
import { MobileController } from "./components/mobile-controller";
import { ControllerMinimized } from "./components/controller-minimized";

export default function Home() {
  const [circles, setCircles] = useState([]);
  const [circlesInDisplay, setCirclesInDisplay] = useState([]);
  const [undoneCircles, setUndoneCircles] = useState([]);
  const [circleId, setCircleId] = useState(0);
  const [lastAction, setLastAction] = useState(null);
  const [maxWidth, setMaxWidth] = useState(null);
  const [unlimitedRedo, setUnlimitedRedo] = useState(false);
  const [hideController, setHideController] = useState(false);
  const containerRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      const isMobileDevice = window.innerWidth <= 768; // Adjust this value as needed for your definition of mobile
      setIsMobile(isMobileDevice);
    };

    handleResize(); // Check on initial render

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

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

  const handleClickMobile = (e) => {
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
      const newHeight = Math.max(
        rect.height,
        e.pageY + circleSize,
        window.innerHeight
      );
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
    // SE QUISER MOSTRAR TODOS OS ITEMS QUE JA FORAM DESFEITOS E COLOCA-LOS EM ORDEM DE VOLTA
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
      {hideController ? (
        isMobile ? (
          <div
            className="fixed top-0 left-0 z-10
              bg-gradient-radial from-fuchsia-500 to-black/90 h-[30px] p-2 overflow-auto rounded-lg
              w-full md:top-10 md:left-10"
          >
            <ControllerMinimized setHideController={setHideController} />
          </div>
        ) : (
          <Draggable>
            <div
              className="fixed top-0 left-0 z-10
              bg-gradient-radial from-fuchsia-500 to-black/90 h-[30px] p-2 overflow-auto rounded-lg
              w-[310px] md:top-10 md:left-10"
            >
              <ControllerMinimized setHideController={setHideController} />
            </div>
          </Draggable>
        )
      ) : isMobile ? (
        <div
          className="fixed top-0 left-0 z-10
        bg-gradient-radial from-fuchsia-500 to-black/90 p-2 overflow-auto rounded-lg
        md:h-[320px] md:top-10 md:left-10"
        >
          <MobileController
            circleId={circleId}
            handleUndo={handleUndo}
            lastAction={lastAction}
            handleClear={handleClear}
            handleRedo={handleRedo}
            unlimitedRedo={unlimitedRedo}
            setUnlimitedRedo={setUnlimitedRedo}
            setHideController={setHideController}
          ></MobileController>
        </div>
      ) : (
        <Draggable>
          <div
            className="fixed top-0 left-0 z-10 bg-gradient-radial
            from-fuchsia-500 to-black/90 p-2 overflow-auto 
              rounded-lg w-[310px] md:h-[320px] md:top-10 md:left-10"
          >
            <Controller
              circleId={circleId}
              handleUndo={handleUndo}
              lastAction={lastAction}
              handleClear={handleClear}
              handleRedo={handleRedo}
              unlimitedRedo={unlimitedRedo}
              setUnlimitedRedo={setUnlimitedRedo}
              setHideController={setHideController}
            />
          </div>
        </Draggable>
      )}

      {isMobile ? (
        <div
          ref={containerRef}
          className="w-full h-screen bg-slate-50  overflow-x-hidden"
          onClick={handleClickMobile}
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
           justify-center flex absolute   overflow-x-hidden
           `}
            ></div>
          ))}
        </div>
      ) : (
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
      )}
    </main>
  );
}
