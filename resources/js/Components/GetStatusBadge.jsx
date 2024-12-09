import { STATUS } from "@/lib/utils";
import { Badge } from "./ui/badge";

export default function GetStatusBadge({ status }) {
    const {TODO, IN_PROGRESS, ONREVIEW, DONE, UNKOWN} = STATUS
    let badge, text

    switch (status) {
        case TODO:
            badge = "bg-red-500 hover:bg-red-600"
            text = "Urgent"
            break;
        case IN_PROGRESS:
            badge = "bg-orange-500 hover:bg-orange-600"
            text = "High"
            break;
        case ONREVIEW:
            badge = "bg-yellow-500 hover:bg-yellow-600"
            text = "Medium"
            break;
        case DONE:
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