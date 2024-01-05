import axios from 'axios'
import {IncomingMessage} from 'http'

export interface IGetApiResponseParams {
  endpoint: string
  filters?: {
    [key: string]: string
  }
  req?: IncomingMessage
}

export interface IGetApiResponseSuccessResponse<T> {
  data: T[]
  meta: {
    pagination: {
      page: number
      pageSize: number
      pageCount: number
      total: number
    }
  }
  success: true
}

export interface IPageWithInitialData<T> {
  initialData?: IGetApiResponseSuccessResponse<T>
  payload: IGetApiResponseParams
  slug?: string
}

export const getApiResponse = async <T>({endpoint, filters, req}: IGetApiResponseParams): Promise<IGetApiResponseSuccessResponse<T>> => {
  const host = req ? `${req.headers['x-forwarded-proto'] ?? 'http'}://${req.headers.host}` : ''
  const response = await axios.get<IGetApiResponseSuccessResponse<T>>(`${host}/api/${endpoint}`, {
    params: {
      filters,
    },
  })

  return response.data
}
