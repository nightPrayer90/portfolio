import { Routes } from '@angular/router';
import { MainContent } from './shared/components/main-content/main-content';
import { Imprint } from './shared/components/imprint/imprint';


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
