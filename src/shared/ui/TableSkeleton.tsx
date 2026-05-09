import { SkeletonBrick } from '@consta/uikit/Skeleton';
import { Layout } from '@consta/uikit/Layout';

const TableSkeleton = ({cols = 3, rows = 10 }: {cols?: number, rows?: number }) => {
  return (
    <Layout direction="column" style={{ width: '100%', gap: "10px" }}>
        <Layout style={{padding: '12px 0'}}>
        {[...Array(cols)].map((_, j) => (
          <SkeletonBrick 
            key={`head-${j}`} 
            height={40}
            style={{ width: `${100 / cols}%` }} 
          />
        ))}
      </Layout>
      {[...Array(rows)].map((_, i) => (
        <Layout key={i} gap="s">
        {[...Array(cols)].map((_, j) => (
          <SkeletonBrick key={j} height={40} style={{ width: `${100/cols}%` }} />
        ))}
        </Layout>
      ))}
    </Layout>
  );
};

export default TableSkeleton;