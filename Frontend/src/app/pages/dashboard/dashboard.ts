import { Component, OnInit } from '@angular/core';
import { StatsWidget } from './components/statswidget';
import { RecentSalesWidget } from './components/recentsaleswidget';
import { BestSellingWidget } from './components/bestsellingwidget';
import { OrderService } from '../../services/admin/order.service';

@Component({
    selector: 'app-dashboard',
    imports: [RecentSalesWidget, BestSellingWidget, StatsWidget],
    template: `
        <div class="grid grid-cols-12 gap-8">
            <app-stats-widget class="contents" [data]="statsData" />
            <div class="col-span-12 xl:col-span-6">
                <app-recent-sales-widget [orders]="recentData" />
            </div>
            <div class="col-span-12 xl:col-span-6">
                <app-best-selling-widget [data]="bestSellingData" />
            </div>
        </div>
    `
})
export class Dashboard implements OnInit {
    statsData: any;
    recentData: any;
    bestSellingData: any;

    constructor(
        private orderService: OrderService
    ) { }

    ngOnInit(): void {
        this.getAllDataDashboard();
    }

    getAllDataDashboard() {
        this.orderService.getDataDashboard().subscribe(
            (res: any) => {
                const result = res.data
                this.statsData = {
                    totalOrders: result.totalOrders,
                    totalCustomers: result.totalCustomers,
                    totalTestimoni: result.totalTestimoni,
                    totalRevenue: result.totalRevenue,
                    totalOrderThisMonth: result.totalOrderThisMonth,
                    totalCustomerThisMonth: result.totalCustomerThisMonth,
                    totalTestimoniThisMonth: result.totalTestimoniThisMonth,
                    totalRevenueThisMonth: result.totalRevenueThisMonth
                }
                this.recentData = result.recentOrders;
                this.bestSellingData = result.bestSellingOrder
            }
        )
    }
}
