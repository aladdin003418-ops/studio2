import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { formatDistanceToNowStrict } from 'date-fns'
import { fa } from 'date-fns/locale'


export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatRelativeDate(date: Date) {
  return formatDistanceToNowStrict(date, { addSuffix: true, locale: fa });
}
