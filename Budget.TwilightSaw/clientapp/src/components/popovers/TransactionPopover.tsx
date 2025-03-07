import React, { useState } from "react";
import { Category } from "../../models/Models";

type TransactionPopoverProps = {
    color: string;
    category: Category | null;
    position: { top: number; left: number };
    visible: boolean;
    onClose: () => void;
    onSubmit: (data: { fname: string }) => Promise<void>;
    onDelete: () => Promise<void>;
};

const TransactionPopover: React.FC<TransactionPopoverProps> = ({
    color,
    category,
    position,
    visible,
    onClose,
    onSubmit,
    onDelete,
}) => {
    const [fname, setFname] = useState("");

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        await onSubmit({ fname });
    };

    return (
        <div
            id="popover"
            className={`popover ${visible ? 'persona-appear' : 'persona-disappear'}`}
            style={{
                position: "absolute",
                top: position.top,
                left: position.left,
            }}
        >
            <svg className="persona-dialog" viewBox="0 0 500 200">
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
                <g id="g" transform="scale(0.75) translate(10,50)" filter="url(#outerStroke)">
                    <polygon points="50,90 460,20 470,200 50,180" fill={color} />
                    <foreignObject x="90" y="110" width="400" height="100">
                        <div
                            style={{
                                width: "100%",
                                height: "100%",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "space-between",
                            }}
                        >
                            <form id="popup-form" onSubmit={handleSubmit}>
                                <input
                                    type="text"
                                    id="fname"
                                    name="fname"
                                    autoComplete="off"
                                    placeholder={category ? category.name : "Add category"}
                                    required
                                    value={fname}
                                    onChange={(e) => setFname(e.target.value)}
                                />
                            </form>
                        </div>
                    </foreignObject>

                    {category?.name && (
                        <>
                            <polygon points="417,57 463,52 466,98 422,103" fill="black" />
                            <polygon
                                points="420,60 520,50 520,90 425,100"
                                fill="#e76c6f"
                                style={{ cursor: "pointer" }}
                                onClick={async (e) => {
                                    e.stopPropagation();
                                    await onDelete();
                                }}
                            />
                            <text
                                x="470"
                                y="78"
                                textAnchor="middle"
                                dominantBaseline="middle"
                                fill="black"
                                fontSize="20"
                                fontWeight="bold"
                                pointerEvents="none"
                            >
                                Delete
                            </text>
                        </>
                    )}
                    <polygon points="-10,150 60,200 120,150 0,130" fill={color} />
                    <polygon points="-20,125 -25,170 -3,170 15,134" fill={color} />
                    <polygon points="-50,160 -7,180 2,160" fill={color} />
                </g>
            </svg>
        </div>
    );
};

export default TransactionPopover;