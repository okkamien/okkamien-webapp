export type ExtractKeys<T extends {[k: string]: unknown}> = T extends infer G ? string & keyof G : never
