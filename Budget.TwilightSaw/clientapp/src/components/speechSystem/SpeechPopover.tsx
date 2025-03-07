import React from "react";

type PopoverProps = {
  color: string;
  position: { top: number; left: number };
  visible: boolean;
};

const SpeechPopover: React.FC<PopoverProps> = ({ color, position, visible }) => {
  return (
    <div
      id="popover"
      className={`popover-bubble ${visible ? "persona-appear" : "persona-disappear"}`}
      style={{
        position: "absolute",
        top: position.top,
        left: position.left,
      }}
    >
      <svg
              className="bubble"
              viewBox="0 0 700 200"
              width="300px"
              height="auto"
              preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          <filter id="outerStroke" filterUnits="userSpaceOnUse">
            <feMorphology
              in="SourceAlpha"
              operator="dilate"
              radius="3"
              result="dilated"
            />
            <feComposite
              in="dilated"
              in2="SourceAlpha"
              operator="out"
              result="outline"
            />
            <feFlood floodColor="black" result="floodColor" />
            <feComposite
              in="floodColor"
              in2="outline"
              operator="in"
              result="coloredOutline"
            />
            <feMerge>
              <feMergeNode in="coloredOutline" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        <g filter="url(#outerStroke)">
          {/* Головна бульбашка */}
          <polygon points="120,90 640,20 670,200 120,180" fill={color} />

          {/* Текстовий блок */}
          <foreignObject x="150" y="100" width="450" height="100">
            <div
              style={{
                width: "100%",
                height: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              {/* Контент */}
            </div>
          </foreignObject>

          {/* Хвостик бульбашки */}
          <polygon points="80,150 150,200 210,150 90,130" fill={color} />
          <polygon points="70,125 65,170 87,170 105,134" fill={color} />
          <polygon points="40,160 83,180 92,160" fill={color} />
        </g>
      </svg>
    </div>
  );
};

export default SpeechPopover;
