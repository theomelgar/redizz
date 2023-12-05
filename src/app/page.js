"use client";

import { useRef, useState } from "react";
import { Button } from "./components/button";
import { getRandomGradient, getRandomSize } from "@/randoms";
import { Controller } from "./components/controller";

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
      <Controller
      circleId={circleId}
      handleUndo={handleUndo}
      lastAction={lastAction}
      handleClear={handleClear}
      handleRedo={handleRedo}
      unlimitedRedo={unlimitedRedo}
      setUnlimitedRedo={setUnlimitedRedo}

      />

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
