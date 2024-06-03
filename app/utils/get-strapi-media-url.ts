export const getStrapiMediaUrl = (url: string): string => {
  return url.startsWith('http') ? url : `${process.env.NEXT_PUBLIC_DATABASE_URL}${url}`
}
