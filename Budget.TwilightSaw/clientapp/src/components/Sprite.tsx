import React, { useRef, useEffect, useState } from "react";
import Popover from "./Popover";
import SpeechBubble from "./SpeechPopover";

type Sprite = {
    sprite: any;
    characterName: any;
    dialogue: any;
    onNext: any;
    speechBubbleColor: any;
    speechBubbleVisible: any;
    speechBubblePosition?: { top: number; left: number }; // Робимо необов’язковим
};

const Sprite: React.FC<Sprite> = ({
    sprite,
    characterName,
    dialogue,
    onNext,
    speechBubbleColor,
    speechBubblePosition,
    speechBubbleVisible,
}) => {
    const spriteRef = useRef<HTMLImageElement>(null);
    const [bubblePosition, setBubblePosition] = useState({ top: 0, left: 0 });

    useEffect(() => {
        if (spriteRef.current) {
            const rect = spriteRef.current.getBoundingClientRect();
            setBubblePosition({
                top: rect.top + window.scrollY - rect.height * 0.2, // Піднімаємо бульбашку трохи вище
                left: rect.left + window.scrollX + rect.width * 0.6, // Центруємо ближче до персонажа
            });
        }
    }, [spriteRef.current]);


    return (
        <div className="persona-dialog-sprite">
            <img ref={spriteRef} src={sprite} alt={characterName} />
        </div>
    );
};

export default Sprite;
