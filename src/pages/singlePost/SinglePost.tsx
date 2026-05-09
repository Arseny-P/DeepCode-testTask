import { getSinglePost } from '@/shared/api/hooks/getSinglePost'
import { useNavigate, useParams } from 'react-router';
import { Loader } from '@consta/uikit/Loader';
import Heading from '@/shared/ui/Heading';
import { Text } from '@consta/uikit/Text';
import { Button } from '@consta/uikit/Button';
import { Layout } from '@consta/uikit/Layout';
import { Card } from '@consta/uikit/Card';
import { getSingleUser } from '@/shared/api/hooks/getSingleUser';

type Comment = {
    id: number,
    post_id: number,
    name: string,
    email: string,
    body: string
}

type Post = {
    id: number,
    user_id: number,
    title: string,
    body: string
}

const SinglePost = () => {
  const navigate = useNavigate();
  let params = useParams();
  const {data: post, isLoading: isPostLoading, isError: isPostError} = getSinglePost(Number(params.postId));

  if(isPostLoading) {
    return <Loader />
  }
  const {postData, comments}: {postData: Post, comments: Comment[]} = post || {postData: {}, comments: []};
  const {data: author} = getSingleUser(postData.user_id);
  return (
    <>  
        <Layout direction='column'>
            <Button label="На главную" onClick={() => navigate("/")}/>
            <Layout flex={2}>
                <Text view="ghost" size='xs'>{postData.id}</Text>
                <Heading size='3xl'>{postData.title}</Heading>
                <Text size='s'>Автор: {author?.name}</Text>
            </Layout>
            <Layout flex={3}>
                <Text size="m" lineHeight='m' as="p">{postData.body}</Text>
            </Layout>
            <Layout direction='column'>
                {comments.map((comment) => {
                    return (
                        <Card key={comment.id} verticalSpace="s" horizontalSpace="s">
                            <Text size="m" lineHeight='m' as="p">{comment.body}</Text>
                        </Card>
                    )
                })}
            </Layout>
        </Layout>
        
    </>
  )
}

export default SinglePost