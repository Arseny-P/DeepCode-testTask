import { getSinglePost } from '@/shared/api/hooks/getSinglePost';
import { useNavigate, useParams } from 'react-router';
import Heading from '@/shared/ui/Heading';
import { Text } from '@consta/uikit/Text';
import { Button } from '@consta/uikit/Button';
import { Layout } from '@consta/uikit/Layout';
import { Card } from '@consta/uikit/Card';
import { getSingleUser } from '@/shared/api/hooks/getSingleUser';
import { IconArrowUndone } from '@consta/icons/IconArrowUndone';
import ErrorPage from '../error/ErrorPage';
import SinglePostSkeleton from '@/shared/ui/SinglePostSceleton';
import type { Comment } from '@/entities/post/post';
import styles from './SinglePost.module.scss';

const SinglePost = () => {
    const navigate = useNavigate();
    const params = useParams();
    const {
        data: post,
        isLoading: isPostLoading,
        isError: isPostError,
    } = getSinglePost(Number(params.postId));

    const postData = post?.postData;
    const comments = post?.comments || [];

    const { data: author } = getSingleUser(postData?.user_id);
    if (isPostError) {
        return <ErrorPage />;
    }

    if (isPostLoading || !postData) {
        return <SinglePostSkeleton />;
    }
    return (
        <>
            <Layout direction="column" className={styles.container}>
                <Layout>
                    <Button
                        className={styles.backButton}
                        size="s"
                        iconLeft={IconArrowUndone}
                        view="clear"
                        label="На главную"
                        onClick={() => navigate('/')}
                    />
                </Layout>
                <Layout direction="column">
                    <Text view="ghost" size="xs">
                        #{postData.id}
                    </Text>
                    <Heading size="3xl">{postData.title}</Heading>
                    <Text size="s">Автор: {author?.name || 'Неизвестен'}</Text>
                </Layout>
                <Layout>
                    <Text size="m" lineHeight="m" as="p">
                        {postData.body}
                    </Text>
                </Layout>
                <Layout direction="column">
                    {comments.map((comment: Comment) => {
                        return (
                            <Card key={comment.id} verticalSpace="s" horizontalSpace="s">
                                <Text size="m" lineHeight="m" as="p">
                                    {comment.body}
                                </Text>
                            </Card>
                        );
                    })}
                </Layout>
            </Layout>
        </>
    );
};

export default SinglePost;
