import { createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom';
import App from '../pages/app-main/App';
import ErrorPage from '../pages/error-page/ErrorPage';
import DetailCharacter from '../pages/detail-character/DetailCharacter';

DetailCharacter
const router = createBrowserRouter(
    createRoutesFromElements(
        <Route
            path='/'
            element={<App />}
            errorElement={<ErrorPage />}
        >
            <Route errorElement={<ErrorPage />} />
            <Route
                path='character/:id'
                element={<DetailCharacter />}
            />
        </Route>
    )
);

export default router;