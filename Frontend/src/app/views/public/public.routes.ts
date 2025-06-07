import { Routes } from "@angular/router";
import { MainComponent } from "./main/main.component";
import { OrderComponent } from "./order/order.component";
import { authCustomerGuard } from "../../guards/auth.guard";
import { DetailComponent } from "./detail/detail.component";
import { ProductComponent } from "./product/product.component";
import { TestimoniComponent } from "./testimoni/testimoni.component";
import { ChattingComponent } from "./chatting/chatting.component";

export default [
    { path: '', component: MainComponent },
    {
        path: 'product',
        component: ProductComponent
    },
    {
        path: 'testimoni',
        component: TestimoniComponent
    },
    {
        canActivate: [authCustomerGuard],
        path: 'my-order',
        component: OrderComponent
    },
    {
        canActivate: [authCustomerGuard],
        path: 'detail-order/:id',
        component: DetailComponent
    },
    {
        canActivate: [authCustomerGuard],
        path: 'chat',
        component: ChattingComponent
    }
] as Routes