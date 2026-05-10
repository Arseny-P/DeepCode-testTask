import { getSingleUser } from '@/shared/api/hooks/getSingleUser';
import { Button } from '@consta/uikit/Button';
import { Layout } from '@consta/uikit/Layout';
import { Text } from '@consta/uikit/Text';
import { User } from '@consta/uikit/User';
import { IconArrowUndone } from '@consta/icons/IconArrowUndone';
import { Badge } from '@consta/uikit/Badge';
import { useNavigate, useParams } from 'react-router';
import ErrorPage from '../error/ErrorPage';
import SingleUserSkeleton from '@/shared/ui/SingleUserSceleton';

const SingleUser = () => {
    const navigate = useNavigate();
    const params = useParams();
    const { data, isLoading, isError } = getSingleUser(Number(params.userId));

    if (isError) {
        return <ErrorPage />;
    }

    if (isLoading) {
        return <SingleUserSkeleton />;
    }

    return (
        <>
            <Layout direction="column" style={{ padding: '20px 0', gap: '12px' }}>
                <Layout>
                    <Button
                        size="s"
                        iconLeft={IconArrowUndone}
                        view="clear"
                        label="На главную"
                        onClick={() => navigate('/')}
                    />
                </Layout>
                <Layout flex={1}>
                    <User name={data?.name} info={data?.id} size="l" />
                </Layout>
                <Layout flex={1}>
                    <Badge
                        label={data?.status}
                        status={data?.status === 'active' ? 'success' : 'system'}
                    />
                </Layout>
                <Layout flex={1} direction="column">
                    <Layout flex={1} style={{ gap: '1em', alignItems: 'baseline' }}>
                        <Text size="l" as="p" weight="bold">
                            Email:
                        </Text>
                        <Text size="m" as="p">
                            {data?.email}
                        </Text>
                    </Layout>
                    <Layout flex={1} style={{ gap: '1em', alignItems: 'baseline' }}>
                        <Text size="l" as="p" weight="bold">
                            Gender:{' '}
                        </Text>
                        <Text size="m" as="p">
                            {data?.gender}
                        </Text>
                    </Layout>
                </Layout>
            </Layout>
        </>
    );
};

export default SingleUser;
