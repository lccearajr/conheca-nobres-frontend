import Header from './components/Layout/Header';
import AppRoutes from './routes/AppRoutes';

// O Router fica fora do App (BrowserRouter no cliente, StaticRouter no prerender).
function App() {
  return (
    <>
      <Header />
      <AppRoutes />
    </>
  );
}

export default App;
