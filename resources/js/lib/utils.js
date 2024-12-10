import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs))
}

export const STATUS = {
  TODO : "In Progress",
  IN_PROGRESS : "In Progress",
  ONREVIEW : "On Review",
  DONE : "Done",
}

export const PRIORITY = {
  URGENT : "Urgent",
  LOW : "Low",
  MEDIUM : "Medium",
  HIGH : "High",
  UNKOWN : "Unknown",
}

export function flashMessage(params){
  return params.props.flash_message
}
