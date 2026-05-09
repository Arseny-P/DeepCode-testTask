import { getSingleUser } from '@/shared/api/hooks/getSingleUser';
import Heading from '@/shared/ui/Heading';
import { Button } from '@consta/uikit/Button';
import { Layout } from '@consta/uikit/Layout';
import { Text } from '@consta/uikit/Text';
import { Avatar } from '@consta/uikit/Avatar';
import { Badge } from '@consta/uikit/Badge';
import { useNavigate, useParams } from 'react-router';

const SingleUser = () => {
    const navigate = useNavigate();
  let params = useParams();
  const {data, isLoading, isError} = getSingleUser(Number(params.userId));
  return (
    <>
        <Layout direction='column'>
            <Button label="На главную" onClick={() => navigate("/")}/>
            <Layout flex={1}>
                <Avatar name={data?.name}/>
                <Heading size='3xl'>{data?.name}</Heading>
            </Layout>
            <Badge label={data?.status} status={data?.status === "active" ? "success" : "system"}/>
            <Layout flex={1}>
                <Text size="m" lineHeight='m' as="p">ID: {data?.id}</Text>
                <Text size="m" lineHeight='m' as="p">Email: {data?.email}</Text>
                <Text size="m" lineHeight='m' as="p">Gender: {data?.gender}</Text>
            </Layout>
        </Layout>
    </>
  )
}

export default SingleUser