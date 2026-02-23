import { ReactNode } from "react";

export function LineButton({
    icon,
    onClick,
    activated
}: {
    icon: ReactNode;
    onClick: () => void;
    activated: boolean;
}) {

    return <div className={`pointer rounded-full border p-2 ${activated ? "bg-blue-500" : "bg-black"} hover:bg-gray-700`} onClick={onClick}>
        {icon}
    </div>
}