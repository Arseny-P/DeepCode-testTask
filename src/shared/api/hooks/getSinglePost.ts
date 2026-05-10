import { api } from '../api';
import { useQuery } from '@tanstack/react-query';

async function singlePost(id: number) {
    const { data: postData } = await api.get(`/posts/${id}`);
    const { data: comments } = await api.get(`/posts/${id}/comments`);
    return {
        postData: postData,
        comments,
    };
}

export function getSinglePost(id: number) {
    return useQuery({
        queryKey: ['singlePost', id],
        queryFn: () => singlePost(id),
    });
}
