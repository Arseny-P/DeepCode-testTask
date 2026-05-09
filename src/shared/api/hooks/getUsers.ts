import type { User } from "@/entities/user/user";
import { api } from "../api";
import { useQuery } from "@tanstack/react-query";
import { useAppStore } from "@/shared/appStore/useAppStore";

export function getUsers({page = 1, perPage = 10}: {page: number, perPage: number}) {
    const { token, setTotalPages } = useAppStore();

    return useQuery({
        queryKey: ["users", page, perPage, token],
        queryFn: async () => {
            const { data, headers } = await api.get(`/users?per_page=${perPage}&page=${page}`)

            const totalPages: number = Number(headers["x-pagination-pages"]) || 0;
            setTotalPages(totalPages);

            return data.map((u: User) => {
                const [name, surname] = u.name.split(' ');
                return {...u, name, surname}
            });
        }
    })
}