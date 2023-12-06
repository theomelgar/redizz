import React from "react";
import { Button } from "./button";

export const MobileController = ({
  circleId,
  handleUndo,
  lastAction,
  handleClear,
  handleRedo,
  unlimitedRedo,
  setUnlimitedRedo,
  setHideController,
}) => {
  return (
    <div className="mobile-fixed-top z-10
    bg-gradient-radial from-fuchsia-500 to-black/90 p-2 overflow-auto rounded-lg
    md:h-[320px] md:top-10 md:left-10">
      <div
        className="absolute top-0 right-4 text-5xl"
        role="button"
        onTouchStart={() => setHideController(true)}
              >
        -
      </div>
      <div className="flex items-center justify-center gap-x-4 p-2 text-white flex-wrap">
        {"Clicks -> "}
        <span className="text-3xl rounded-md p-3">{circleId}</span>
      </div>
      <hr className="h-[1px] "></hr>
      <div className="flex-col justify-center items-center mt-5 ">
        <div className="flex justify-evenly mb-1">
          <Button
            onTouchStart={handleUndo}
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
              onTouchStart={handleRedo}
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
              onTouchStart={handleRedo}
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
              onTouchStart={handleRedo}
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
        <label className="text-lg font-bold p-2">
          Selecione o tipo de refazer:
        </label>
        <select
          className=" bg-black p-4 w-full rounded-xl"
          onChange={() => setUnlimitedRedo(!unlimitedRedo)}
        >
          <option value={false}>Refazer limitado</option>
          <option value={true}>Refazer ilimitado</option>
        </select>
        <div className="flex justify-center items-center w-auto">
          <Button
            className=" text-white p-3 gap-x-4 mt-2 bg-red-500 hover:bg-red-500/60"
            onTouchStart={handleClear}
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
  );
};
