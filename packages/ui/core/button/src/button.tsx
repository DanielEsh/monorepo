import {forwardRef} from "react";

interface ButtonProps {

}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(() => {
    return (
        <div>
            Button
        </div>
    )
})