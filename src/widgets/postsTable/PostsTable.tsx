import type { Post } from '@/entities/post/post';
import { getPosts } from '@/shared/api/hooks/getPosts';
import { useAppStore } from '@/shared/appStore/useAppStore';
import TableSkeleton from '@/shared/ui/TableSkeleton';
import { Table, type TableColumn } from '@consta/table/Table';
import { ResponsesConnectionError } from '@consta/uikit/ResponsesConnectionError';
import { useNavigate, useSearchParams } from 'react-router';

const PostsTable = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const { perPage } = useAppStore();
    const page = Number(searchParams.get('page')) || 1;

    const { data: rows, isLoading, isError } = getPosts({ page: page, perPage: perPage });
    const columns: TableColumn<Post>[] = [
        {
            title: 'ID',
            accessor: 'id',
        },
        {
            title: 'Заголовок',
            accessor: 'title',
        },
    ];
    if (isError) {
        return (
            <ResponsesConnectionError
                description="Произошла ошибка при загрузке данных. Проверьте токен и попробуйте еще раз"
                actions={[]}
            />
        );
    }

    const handleRowClick = (row: Post) => {
        navigate(`/posts/${row.id}`);
    };

    return (
        <>
            {isLoading || !rows ? (
                <TableSkeleton cols={columns.length} rows={perPage} />
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

export default PostsTable;
