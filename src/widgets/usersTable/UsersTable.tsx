import type { UserWithSurname } from '@/entities/user/user';
import { getUsers } from '@/shared/api/hooks/getUsers';
import { useAppStore } from '@/shared/appStore/useAppStore';
import TableSkeleton from '@/shared/ui/TableSkeleton';
import { Table, type TableColumn } from '@consta/table/Table';
import { ResponsesEmptyBox } from '@consta/uikit/ResponsesEmptyBox';
import { useNavigate, useSearchParams } from 'react-router';

const UsersTable = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const { perPage } = useAppStore();
    const page = Number(searchParams.get('page')) || 1;

    const { data: rows, isLoading, isError } = getUsers({ page: page, perPage: perPage });
    const columns: TableColumn<UserWithSurname>[] = [
        {
            title: 'ID',
            accessor: 'id',
        },
        {
            title: 'Имя',
            accessor: 'name',
        },
        {
            title: 'Фамилия',
            accessor: 'surname',
        },
        {
            title: 'Email',
            accessor: 'email',
        },
    ];
    if (isError) {
        return (
            <ResponsesEmptyBox
                title="Произошла ошибка при загрузке данных"
                description="Проверьте токен и попробуйте еще раз"
                actions={[]}
            />
        );
    }

    const handleRowClick = (row: UserWithSurname) => {
        navigate(`/users/${row.id}`);
    };

    return (
        <>
            {isLoading || !rows ? (
                <TableSkeleton cols={columns.length} rows={rows} />
            ) : (
                <Table
                    rows={rows}
                    columns={columns}
                    zebraStriped
                    stickyHeader
                    rowHoverEffect={true}
                    onRowClick={handleRowClick}
                />
            )}
        </>
    );
};

export default UsersTable;
