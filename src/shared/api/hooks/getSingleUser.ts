import { api } from "../api";
import { useQuery } from "@tanstack/react-query";

export function getSingleUser(id: number) {
    return useQuery({
        queryKey: ["user", id],
        queryFn: async () => {
            const { data } = await api.get(`/users/${id}`)
            return data;
        },
    })
}