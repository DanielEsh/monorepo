import {ReactNode} from "react";
import './Typography.css'

interface TypographyProps {
    children: ReactNode
}

export const TypographyImpl = ({children}: TypographyProps) => {
    return (
        {children}
    )
}

export const TypographyH1 = ({children}: TypographyProps) => {
    return (
        <div className="typography-h1">
            {children}
        </div>
    )
}

export const TypographyH2 = ({children}: TypographyProps) => {
    return (
        <div className="typography-h2">
            {children}
        </div>
    )
}

export const Typography = Object.assign(TypographyImpl, {
    h1: TypographyH1,
    h2: TypographyH2,
})