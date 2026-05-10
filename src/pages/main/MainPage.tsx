import { TextField } from '@consta/uikit/TextField';
import { Layout } from '@consta/uikit/Layout';
import { ChoiceGroup } from '@consta/uikit/ChoiceGroup';
import { Select } from '@consta/uikit/Select';
import { Pagination } from '@consta/uikit/Pagination';
import { useCallback, useEffect, useState } from 'react';
import debounce from 'lodash/debounce';
import UsersTable from '@/widgets/usersTable/UsersTable';
import PostsTable from '@/widgets/postsTable/PostsTable';
import { useAppStore } from '@/shared/appStore/useAppStore';
import { useSearchParams } from 'react-router';
import Heading from '@/shared/ui/Heading';
import styles from './MainPage.module.scss';

const MainPage = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const tabs = ['Пользователи', 'Посты'];

    const activeTab = searchParams.get('tab');
    if (searchParams.size === 0) {
        setSearchParams({ tab: tabs[0], page: '1' });
    }

    const page = Number(searchParams.get('page')) || 1;

    const { setToken, totalPages, token, perPage, setPerPage } = useAppStore();

    const [localToken, setLocalToken] = useState(token);
    const [tokenStatus, setStatus] = useState<'warning' | undefined>(undefined);

    const pageChange = (page: number) => {
        setSearchParams({ tab: activeTab || tabs[0], page: page.toString() });
    };
    const tabChange = (tab: string) => {
        setSearchParams({ tab, page: '1' });
    };
    const changeGlobalToken = useCallback(
        debounce((value: string) => {
            setToken(value);
        }, 200),
        []
    );

    useEffect(() => {
        setLocalToken(token);
    }, [token]);

    const handleChange = (value: string | null) => {
        const newValue = value || '';
        setLocalToken(newValue);
        if (newValue) {
            setStatus(undefined);
            changeGlobalToken(newValue);
        } else {
            setStatus('warning');
        }
    };

    const selectItems: { label: number; id: number }[] = [
        { label: 10, id: 1 },
        { label: 25, id: 1 },
        { label: 50, id: 1 },
    ];
    // убрать инлайн стили
    return (
        <div>
            <Layout direction="column" className={styles.page}>
                <Heading view="brand" size="3xl" className={styles.title}>
                    ДИП : КОД
                </Heading>
                <Layout direction="column" flex={1} className={styles.controls}>
                    <TextField
                        label="Введите Ваш Access token"
                        value={localToken}
                        onChange={handleChange}
                        status={tokenStatus}
                        caption={tokenStatus ? 'Обязательное поле' : undefined}
                        type="text"
                        placeholder="Access token"
                        withClearButton
                    />
                    <Layout flex={1}>
                        <ChoiceGroup
                            value={activeTab}
                            onChange={tabChange}
                            items={tabs}
                            getItemLabel={(t) => t}
                            multiple={false}
                            name="tablesGroup"
                            form="round"
                        />
                    </Layout>
                    <Layout flex={1}>
                        <Select
                            className={styles.select}
                            value={selectItems.find((item) => item.label === perPage)}
                            onChange={(value: { label: number; id: number } | null) =>
                                value?.label && setPerPage(value.label)
                            }
                            getItemLabel={(item) => String(item.label)}
                            items={selectItems}
                            form="round"
                            label="Отображать элементов:"
                            labelPosition="left"
                        />
                    </Layout>
                </Layout>
                <Layout flex={1} className={styles.tableContainer}>
                    {activeTab === 'Пользователи' ? <UsersTable /> : <PostsTable />}
                </Layout>
                <Layout flex={1} className={styles.pagination}>
                    <Pagination
                        items={totalPages}
                        value={page}
                        onChange={pageChange}
                        showFirstPage
                        showLastPage
                        arrows={[{ label: 'Предыдущая' }, { label: 'Следующая' }]}
                        visibleCount={7}
                    />
                </Layout>
            </Layout>
        </div>
    );
};

export default MainPage;
