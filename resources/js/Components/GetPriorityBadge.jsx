import { PRIORITY } from "@/lib/utils";
import { Badge } from "./ui/badge";

export default function GetPriorityBadge({ priority }) {
    const {URGENT, HIGHT, MEDIUM, LOW, UNKNOWN} = PRIORITY
    let badge, text

    switch (priority) {
        case URGENT:
            badge = "bg-red-500 hover:bg-red-600"
            text = "Urgent"
            break;
        case HIGHT:
            badge = "bg-orange-500 hover:bg-orange-600"
            text = "High"
            break;
        case MEDIUM:
            badge = "bg-yellow-500 hover:bg-yellow-600"
            text = "Medium"
            break;
        case LOW:
            badge = "bg-green-500 hover:bg-green-600"
            text = "Low"
            break;
        case UNKNOWN:
            badge = "bg-gray-500 hover:bg-gray-600"
            text = "Unknown"
            break;
        default: 
            badge = "bg-gray-500 hover:bg-gray-600"
            text = "Unknown"
            break;
    }

    return (
        <Badge className={badge}>
            {text}
        </Badge>
    );
}