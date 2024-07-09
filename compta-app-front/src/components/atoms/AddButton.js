import React from "react";
import "./AddButtonStyle.css"

export default function AddButton({onClick}) {
  return (
    <>
        <lord-icon id="addButton" onClick={onClick}
            src="https://cdn.lordicon.com/pdsourfn.json"
            trigger="hover">
        </lord-icon>
    </>
  );
}
