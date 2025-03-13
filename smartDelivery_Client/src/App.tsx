import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { PartnersPage } from './pages/partnersPage';
import { OrdersPage } from './pages/ordersPage';
import { AssignmentPage } from './pages/assignmentPage';
import { Layout } from './pages/layoutPage';
import { DashboardPage } from './pages/dashboardPage';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Toaster } from 'react-hot-toast';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<DashboardPage />} />
            <Route path="/partner" element={<PartnersPage />} />
            <Route path="/orders" element={<OrdersPage />} />
            <Route path="/assignment" element={<AssignmentPage />} />
          </Routes>
        </Layout>
      </Router>

      <Toaster
        position="top-right"
        reverseOrder={false}
        toastOptions={{
          duration: 3000,
          style: {
            background: '#0f172a',
            color: '#f9fafb',  
            border: '1px solid #1e293b', 
          },
        }}
      />
    </QueryClientProvider>
  );
}

export default App;
