import { Layout } from '@consta/uikit/Layout';
import { SkeletonBrick, SkeletonCircle  } from '@consta/uikit/Skeleton';

const SingleUserSkeleton = () => (
  <Layout direction="column" className="single-user-skeleton" style={{ padding: '20px 0', gap: '12px' }}>
    <Layout>
      <SkeletonCircle size={32}/>
        <Layout direction='column' style={{gap: '4px'}}>
        <SkeletonBrick width={200} height={32} />
        <SkeletonBrick width={100} height={24} />
        </Layout>
    </Layout>
    <Layout direction="column" style={{ gap: '1em' }}>
      <Layout style={{ gap: '1em', alignItems: 'baseline' }}>
        <SkeletonBrick width={80} height={20} />
        <SkeletonBrick width={200} height={20} />
      </Layout>
      <Layout style={{ gap: '1em', alignItems: 'baseline' }}>
        <SkeletonBrick width={80} height={20} />
        <SkeletonBrick width={120} height={20} />
      </Layout>
    </Layout>
  </Layout>
);

export default SingleUserSkeleton;