import { Routes } from "@angular/router";
import { FacebookComponent } from "./facebook/facebook.component";
import { InstagramComponent } from "./instagram/instagram.component";

export default [
    { path: 'facebook', component: FacebookComponent },
    { path: 'instagram', component: InstagramComponent }
] as Routes