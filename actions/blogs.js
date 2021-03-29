import axios from 'axios'
import { useAPIHandler, fetcher } from '@/actions'
import useSWR from 'swr'

export const useCreateBlog = () => useAPIHandler((data) => axios.post('/api/v1/blogs', data))
export const useUpdateBlog = () => useAPIHandler((id, data) => axios.patch(`/api/v1/blogs/${id}`, data))

export const useGetBlog = id => {   
    const { data, error, ...rest } = useSWR(id ? `/api/v1/blogs/${id}` : null, fetcher)
    return { data, error, loading: !data && !error, ...rest }
}

export const useGetUserBlogs = () => {   
    const { data, error, ...rest } = useSWR(`/api/v1/blogs/me`, fetcher)
    return { data, error, loading: !data && !error, ...rest }
}