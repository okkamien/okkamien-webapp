import {IApiFilters, TApiCommonItem} from '@/app/features/api'

export interface ISelectedFilter<T extends TApiCommonItem> {
  filters: IApiFilters<T>[]
  label: string
}
