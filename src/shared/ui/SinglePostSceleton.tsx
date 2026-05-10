import { Layout } from '@consta/uikit/Layout';
import { SkeletonBrick } from '@consta/uikit/Skeleton';

const SinglePostSkeleton = () => (
  <Layout direction="column" className="single-post-skeleton" style={{ padding: '20px 0', gap: '16px' }}>
    <Layout>
      <SkeletonBrick width={120} height={32} />
    </Layout>
    <Layout direction="column" style={{ gap: '8px' }}>
      <SkeletonBrick width={60} height={16} />
      <SkeletonBrick width="80%" height={36} />
      <SkeletonBrick width={140} height={20} />
    </Layout>
    <Layout>
      <SkeletonBrick width="100%" height={100} />
    </Layout>
    <Layout direction="column" style={{ gap: '12px' }}>
      {[1, 2, 3].map((i) => (
        <Layout key={i} style={{ padding: '12px', border: '1px solid var(--color-bg-border)' }}>
          <SkeletonBrick width="90%" height={40} />
        </Layout>
      ))}
    </Layout>
  </Layout>
);

export default SinglePostSkeleton;