import {TApiCommonItem} from '@/app/features/api'

export const sortByIdList = (ids: string[], a: TApiCommonItem, b: TApiCommonItem) => {
  return ids.indexOf(a.id.toString()) - ids.indexOf(b.id.toString())
}
