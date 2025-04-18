import { Routes } from "@angular/router";
import { MvcComponent } from "./mvc/mvc.component";
import { FullstackComponent } from "./fullstack/fullstack.component";

export default [
    { path: 'mvc', component: MvcComponent },
    { path: 'fullstack', component: FullstackComponent }
] as Routes