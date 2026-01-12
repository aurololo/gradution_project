type ClassValue = string | number | boolean | undefined | null | { [key: string]: any } | ClassValue[]

export function cn(...inputs: ClassValue[]): string {
  return inputs
    .filter(Boolean)
    .map((input) => {
      if (typeof input === "string") return input
      if (typeof input === "object" && input !== null) {
        if (Array.isArray(input)) {
          return cn(...input)
        }
        return Object.entries(input)
          .filter(([_, value]) => Boolean(value))
          .map(([key]) => key)
          .join(" ")
      }
      return ""
    })
    .filter(Boolean)
    .join(" ")
}
