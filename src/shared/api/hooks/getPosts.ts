import { useAppStore } from '@/shared/appStore/useAppStore';
import { api } from '../api';
import { useQuery } from '@tanstack/react-query';

export function getPosts({ page = 1, perPage = 10 }: { page: number; perPage: number }) {
    const { token, setTotalPages } = useAppStore();

    return useQuery({
        queryKey: ['posts', page, perPage, token],
        queryFn: async () => {
            const { data, headers } = await api.get(`/posts?per_page=${perPage}&page=${page}`);

            const totalPages: number = Number(headers['x-pagination-pages']) || 0;
            setTotalPages(totalPages);

            return data;
        },
        enabled: !!token,
    });
}
