import axios from 'axios'

interface IGetApiResponseParams {
  endpoint: string
}

interface IGetApiResponseSuccessResponse<T> {
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

export const getApiResponse = async <T>({endpoint}: IGetApiResponseParams): Promise<IGetApiResponseSuccessResponse<T>> => {
  const response = await axios.get<IGetApiResponseSuccessResponse<T>>(`/api/${endpoint}`)

  return response.data
}
