import { Text, type TextProps } from '@consta/uikit/Text';
import type { PropsWithChildren } from 'react';

const Heading = ({ children, ...props }: PropsWithChildren<TextProps>) => (
    <Text weight="bold" lineHeight="l" view="primary" {...props}>
        {children}
    </Text>
);

export default Heading;
