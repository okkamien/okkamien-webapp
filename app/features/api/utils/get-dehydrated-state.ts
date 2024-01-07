import {dehydrate, DehydratedState, QueryClient} from '@tanstack/react-query'
import {IncomingMessage} from 'http'

import {DEFAULT_PAGE, DEFAULT_PAGE_SIZE} from '@/app/features/api/constants'
import {IApiItem} from '@/app/features/api/types'
import {getApiResponse, IGetApiResponseParams} from '@/app/features/api/utils'

interface IGetDehydratedStateParams<T extends IApiItem<unknown>> {
  payload: IGetApiResponseParams<T>
  req?: IncomingMessage
  slug?: string
}

interface IGetDehydratedStateReturn {
  dehydratedState: DehydratedState
  hasData: boolean
}

export const getDehydratedState = async <T extends IApiItem<unknown>>({
  payload,
  req,
  slug,
}: IGetDehydratedStateParams<T>): Promise<IGetDehydratedStateReturn> => {
  const queryClient = new QueryClient()
  const response = await getApiResponse<T>({req, ...payload})

  await queryClient.prefetchQuery({
    queryKey: [
      payload.endpoint,
      ...(slug ? [slug] : [payload.pagination?.pageSize ?? DEFAULT_PAGE_SIZE, payload.pagination?.page ?? DEFAULT_PAGE]),
    ],
    queryFn: () => response,
  })

  return {
    dehydratedState: dehydrate(queryClient),
    hasData: Boolean(response.data.length),
  }
}
