import { useHistory } from "react-router-dom";
import KeyboardBackspaceIcon from "@material-ui/icons/KeyboardBackspace";
import Button from "@material-ui/core/Button";
import React from "react";

function BackButton({ children, switchTo }) {
    return (
        <Button
            onClick={switchTo}
            onMouseDown={switchTo}
        >
            <KeyboardBackspaceIcon/>
            {children}
        </Button>
    )
}
export default BackButton;