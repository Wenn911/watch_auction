import { Navigate, Route, Routes } from 'react-router-dom';
import { Header } from './containers/Header';
import { Navbar } from './containers/Navbar';
import AboutPage from './pages/About';
import ActivePage from './pages/Active';
import EndPage from './pages/End';
import ItemPage from './pages/Item';
import WinPage from './pages/Win';

function App() {
    return (
        <div className="grid min-h-dvh grid-rows-[auto_1fr_auto] gap-[16px_24px] pt-(--tg-content-safe-area-inset-top) pb-(--tg-content-safe-area-inset-bottom)">
            <Header />
            <Navbar />
            <main className="col-start-1 -col-end-1 mx-auto my-0 w-full max-w-600 px-24">
                <Routes>
                    <Route element={<Navigate replace to="/active" />} path="/" />
                    <Route element={<ActivePage />} path="/active" />
                    <Route element={<AboutPage />} path="/about" />
                    <Route element={<EndPage />} path="/end" />
                    <Route element={<WinPage />} path="/win" />
                    <Route element={<ItemPage />} path="/:itemId" />
                </Routes>
            </main>
        </div>
    );
}

export default App;
