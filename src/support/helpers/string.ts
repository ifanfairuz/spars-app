
export function ellipsis(text: string, max: number) {
  return (text.length > max) ? `${text.substring(0, max-3)}...` : text;
}

export function capitalize(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1)
}

export function getOrDash(str?: string, max?: number) {
  return (!str || str.length <= 0) ? '-' : ( max && max > 0 ? ellipsis(str, max) : str );
}