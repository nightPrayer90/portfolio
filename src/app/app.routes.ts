import { Routes } from '@angular/router';
import { MainContent } from './layout/main-content/main-content';
import { Imprint } from './layout/imprint/imprint';

export const routes: Routes = [
    {
        path: '',
        component: MainContent
    },
    {
        path: 'imprint',
        component: Imprint
    },
    {
        path:'**',
        redirectTo:""
    }
];
