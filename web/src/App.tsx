import { Layout } from 'antd';
import Waiting from 'components/Waiting';
import Sider from 'features/Sider';
import React, { lazy, Suspense } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

const HomePage = lazy(() => import('pages/Home'));
const ChatDetectPage = lazy(() => import('pages/ChatDetect'));
function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<Waiting />}>
        <Layout>
          <Sider />
          <Layout>
            <Layout.Content>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/chat" element={<ChatDetectPage />} />
              </Routes>
            </Layout.Content>
          </Layout>
        </Layout>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
