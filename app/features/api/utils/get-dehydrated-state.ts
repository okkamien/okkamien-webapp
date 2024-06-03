import {dehydrate, DehydratedState, QueryClient} from '@tanstack/react-query'
import {IncomingMessage} from 'http'

import {IApiItem} from '@/app/features/api/types'
import {
  getApiCollectionResponse,
  getQueryKey,
  IGetApiCollectionResponseParams,
  IGetApiCollectionResponseSuccessResponse,
} from '@/app/features/api/utils'

interface IGetDehydratedStateParams<T extends IApiItem<unknown>> {
  payloads: IGetApiCollectionResponseParams<T>[]
  req: IncomingMessage
}

interface IGetDehydratedStateReturn {
  dehydratedState: DehydratedState
  hasData: boolean
}

export const getDehydratedState = async <T extends IApiItem<unknown>>({
  payloads,
  req,
}: IGetDehydratedStateParams<T>): Promise<IGetDehydratedStateReturn> => {
  const queryClient = new QueryClient()
  const responses: IGetApiCollectionResponseSuccessResponse<T>[] = []

  await Promise.all(
    payloads.map(async (payload) => {
      const response = await getApiCollectionResponse<T>({req, ...payload})

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
