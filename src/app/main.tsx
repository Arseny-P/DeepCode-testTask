import MainPage from '@/pages/main/MainPage';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Theme, presetGpnDefault } from '@consta/uikit/Theme';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router';
import ErrorPage from '@/pages/error/ErrorPage';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import SinglePost from '@/pages/singlePost/SinglePost';
import SingleUser from '@/pages/singleUser/SingleUser';

const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
    <QueryClientProvider client={queryClient}>
        <BrowserRouter>
            <StrictMode>
                <Theme preset={presetGpnDefault}>
                    <Routes>
                        <Route path="/" element={<Navigate to="/main" replace />} />
                        <Route path="/main" element={<MainPage />} />
                        <Route path="/users/:userId" element={<SingleUser />} />
                        <Route path="/posts/:postId" element={<SinglePost />} />
                        <Route path="*" element={<ErrorPage />} />
                    </Routes>
                </Theme>
            </StrictMode>
        </BrowserRouter>
        <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
);
