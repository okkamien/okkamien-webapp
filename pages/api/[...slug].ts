import axios, {AxiosError} from 'axios'
import {NextApiHandler} from 'next'

const handler: NextApiHandler = async ({method, query: {slug, ...query}}, res) => {
  if (method === 'GET') {
    try {
      const {data} = await axios.get(`${process.env.NEXT_PUBLIC_DATABASE_URL}/api/${(slug as string[]).join('/')}`, {
        params: query,
        headers: {
          Authorization: `bearer ${process.env.DATABASE_API_TOKEN}`,
        },
      })

      return res.status(200).json({
        success: true,
        ...data,
      })
    } catch (e) {
      if (e instanceof AxiosError) {
        return res.status(e.response?.status ?? 500).json({
          success: false,
          error: e.response?.data.error.name,
        })
      } else
        return res.status(500).json({
          success: false,
          error: 'UnknownError',
        })
    }
  } else return res.status(405).end()
}

export default handler
