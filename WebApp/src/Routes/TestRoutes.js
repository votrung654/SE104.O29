import React, {lazy} from 'react';

const routes = [
    {
        path : '/setup',
        exact : true,
        main : lazy(() => import("../Containers/Pages/Setup"))
    }
];

export default routes;