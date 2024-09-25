import { createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom';
import App from '../pages/app-main/App';
import Character from '../pages/character/Character';
import ErrorPage from '../pages/error-page/ErrorPage';

type Props = {}

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route
            path='/'
            element={<App />}
            // loader={rootLoader}
            errorElement={<ErrorPage />}
        >
            <Route errorElement={<ErrorPage />} />
            <Route
                path='contacts/:contactId'
                element={<Character />}
            // loader={contactLoader}
            // action={contactAction}
            />
            {/* <Route
                    path='contacts/:contactId/edit'
                    element={<EditContact />}
                loader={contactLoader}
                action={editAction}
                /> */}
            {/* <Route
                    path='contacts/:contactId/destroy'
                    action={destroyAction}
                /> */}
        </Route>
    )
);

export default router;