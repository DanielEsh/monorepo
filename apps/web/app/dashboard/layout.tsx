import {ReactNode} from "react";
import "../globals.css";

interface Props {
    children: ReactNode
}

export default function DashboardLayout({children}: Props) {
    return (
        <div className="overflow-hidden bg-gray-100 hs-overlay-body-open">
            {children}
        </div>
    );
}