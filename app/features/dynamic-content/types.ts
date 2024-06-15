import {IApiFilters, TApiCommonItem} from '@/app/features/api'

export * from './components/dynamic-content'

export interface ISelectedFilter<T extends TApiCommonItem> {
  filters: IApiFilters<T>[]
  label: string
}
