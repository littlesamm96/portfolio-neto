import axios from 'axios'
import { useAPIHandler } from '@/actions'
import useSWR from 'swr'
import { fetcher } from '@/actions'

export const useCreatePortfolio = () => useAPIHandler((data) => axios.post('/api/v1/portfolios', data))

export const useUpdatePortfolio = () => useAPIHandler((id, data) => axios.patch(`/api/v1/portfolios/${id}`, data))

export const useDeletePortfolio = () => useAPIHandler((id) => axios.delete(`/api/v1/portfolios/${id}`))

export const useGetPortfolio = (id) => {   
    const { data, error, ...rest } = useSWR(id ? `/api/v1/portfolios/${id}` : null, fetcher)
    return { data, error, loading: !data && !error, ...rest }
}
