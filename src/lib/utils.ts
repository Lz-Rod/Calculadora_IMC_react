import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
 
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatNumber(num: number, digits = 2){
    return num.toLocaleString('pt-BR', {
        minimumFractionDigits: digits,
        maximumFractionDigits: digits
    })//essa função localiza automaticamente os digitos para o padrão usado no Brasil
}