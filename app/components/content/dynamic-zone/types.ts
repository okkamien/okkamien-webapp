import {BlocksContent} from '@strapi/blocks-react-renderer'

import {IApiFiles, IApiGallery, IApiImage, IApiRelation, TApiEvent, TApiLocation, TApiStaff} from '@/app/features/api'

interface TApiDynamicZoneEmpty {
  anchor?: never
  contact?: never
  content?: never
  description?: never
  events?: never
  files?: never
  image?: never
  images?: never
  location?: never
  staff?: never
  title?: never
  when?: never
}

export interface TApiDynamicZoneDetailsSection extends Omit<TApiDynamicZoneEmpty, 'anchor' | 'contact' | 'where' | 'when'> {
  __component: 'two-columns.details-section'
  anchor?: {
    label: string
  }
  contact?: {
    phone?: string
    email?: string
  }
  where?: {
    location: IApiRelation<TApiLocation>
  }
  when?: {
    from: string
    time: string
    to: string
  }
}
export interface TApiDynamicZoneFiles extends Omit<TApiDynamicZoneEmpty, 'files' | 'title'> {
  __component: 'two-columns.files'
  files: IApiFiles
  title: string
}
export interface TApiDynamicZoneGallery extends Omit<TApiDynamicZoneEmpty, 'images' | 'title'> {
  __component: 'two-columns.gallery'
  images: IApiGallery
  title: string
}
export interface TApiDynamicZoneRelatedEvents extends Omit<TApiDynamicZoneEmpty, 'events' | 'title'> {
  __component: 'two-columns.related-events'
  events: IApiRelation<TApiEvent[]>
  title: string
}
export interface TApiDynamicZoneRelatedPeople extends Omit<TApiDynamicZoneEmpty, 'staff' | 'title'> {
  __component: 'two-columns.related-people'
  staff: IApiRelation<TApiStaff[]>
  title: string
  withContact: boolean
}
export interface TApiDynamicZonePoster extends Omit<TApiDynamicZoneEmpty, 'description' | 'image'> {
  __component: 'two-columns.poster'
  description?: string
  image: IApiImage
}
export interface TApiDynamicZoneTextContent extends Omit<TApiDynamicZoneEmpty, 'content' | 'title'> {
  __component: 'two-columns.text-content'
  content?: BlocksContent
  title?: string
}

export type TApiDynamicZone = (
  | TApiDynamicZoneDetailsSection
  | TApiDynamicZoneFiles
  | TApiDynamicZoneGallery
  | TApiDynamicZonePoster
  | TApiDynamicZoneRelatedEvents
  | TApiDynamicZoneRelatedPeople
  | TApiDynamicZoneTextContent
) & {
  id: number
}
