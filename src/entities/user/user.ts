export type User = {
    id: number;
    name: string;
    email: string;
    gender: string;
    status: string;
};

export type UserWithSurname = User & {
    surname: string;
}