import { Routes } from '@angular/router';
import { MainContent } from './shared/components/main-content/main-content';
import { Imprint } from './shared/components/imprint/imprint';
import { PrivacyPolicy } from './shared/components/privacy-policy/privacy-policy';


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
        path: 'privacy-policy',
        component: PrivacyPolicy
    },
    {
        path:'**',
        redirectTo:""
    }
];
