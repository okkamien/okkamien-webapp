import {dehydrate, DehydratedState, QueryClient} from '@tanstack/react-query'
import {IncomingMessage} from 'http'

import {IApiItem, TApiItems} from '@/app/features/api/types'
import {getApiResponse, getQueryKey, IGetApiResponseParams, IGetApiResponseSuccessResponse} from '@/app/features/api/utils'

interface IGetDehydratedStateParams<T extends TApiItems> {
  payloads: IGetApiResponseParams<T>[]
  req?: IncomingMessage
}

interface IGetDehydratedStateReturn {
  dehydratedState: DehydratedState
  hasData: boolean
}

export const getDehydratedState = async <T extends TApiItems>({
  payloads,
  req,
}: IGetDehydratedStateParams<T>): Promise<IGetDehydratedStateReturn> => {
  const queryClient = new QueryClient()
  const responses: IGetApiResponseSuccessResponse<T>[] = []

  await Promise.all(
    payloads.map(async (payload) => {
      const response = await getApiResponse<T>({req, ...payload})

      responses.push(response)
      await queryClient.prefetchQuery({
        queryKey: getQueryKey({payload, currentPage: payload.pagination?.page, pageSize: payload.pagination?.pageSize}),
        queryFn: () => response,
      })
    }),
  )

  return {
    dehydratedState: dehydrate(queryClient),
    hasData: responses.every((response) => Boolean(response.data.length)),
  }
}
