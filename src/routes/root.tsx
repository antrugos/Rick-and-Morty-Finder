import { createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom';
import App from '../pages/app-main/App';
import Character from '../pages/character/Character';
import ErrorPage from '../pages/error-page/ErrorPage';

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
                element={<Character />}
            // loader={contactLoader}
            // action={contactAction}
            />
        </Route>
    )
);

export default router;