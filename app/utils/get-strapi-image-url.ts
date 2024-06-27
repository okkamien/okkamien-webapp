import {IApiImageAttributes} from '@/app/features/api'
import {getStrapiMediaUrl} from '@/app/utils'

export const getStrapiImageUrl = (image: IApiImageAttributes, prefferedSize?: (keyof IApiImageAttributes['formats'])[]): string => {
  const url = prefferedSize?.reverse().reduce<string>((last, current) => image.formats[current]?.url ?? last, image.url) ?? image.url

  return getStrapiMediaUrl(url)
}
