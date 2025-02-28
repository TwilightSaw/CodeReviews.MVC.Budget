import React, { useState } from "react";
import { Category, Transaction } from "../models/Models";

interface PointerProps {
    text: string;
    png: string;
};

const Pointer: React.FC<PointerProps> = ({ text, png }) => {

    const [texts, setTexts] = useState("");
    return (
        <span className = "pointer">
            <img src = {png}/>
            {text}
        </span>
    );
}

export default Pointer;