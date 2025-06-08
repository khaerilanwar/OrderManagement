import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { MenuModule } from 'primeng/menu';
import { MeterGroupModule } from 'primeng/metergroup'

@Component({
    standalone: true,
    selector: 'app-best-selling-widget',
    imports: [CommonModule, ButtonModule, MenuModule, MeterGroupModule],
    template: `
    @if (data) {
    <div class="card">
        <div class="flex justify-between items-center mb-6">
            <div class="font-semibold text-xl">Best Selling Products</div>
        </div>
        <ul class="list-none p-0 m-0">
            @for (item of data; track $index) {
                <li class="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
                    <div>
                        <span class="text-surface-900 dark:text-surface-0 font-medium mr-2 mb-1 md:mb-0"> {{item.category.name}} </span>
                        <div class="mt-1 text-muted-color"> {{item.category.product_category.name}} </div>
                    </div>
                    <div class="mt-2 md:mt-0 flex flex-col">
                        <div class="bg-surface-300 dark:bg-surface-500 rounded-border overflow-hidden w-40 lg:w-24" style="height: 8px">
                            <p-metergroup [value]="item.meter" />
                        </div>
                        <span class="text-primary-500 ml-4 font-medium"> {{item.totalOrders}} </span>
                    </div>
                </li>
            }
        </ul>
    </div>}`
})
export class BestSellingWidget implements OnChanges, OnInit {
    @Input() data: any;

    ngOnChanges(changes: SimpleChanges): void {
        if (changes['data']) {
            this.data = changes['data'].currentValue;
            if (this.data && this.data.length > 0) {
                const topProducts = this.data[0].totalOrders
                this.data = this.data.map((item: any) => {
                    const percentage = (item.totalOrders / topProducts) * 100;
                    return {
                        ...item,
                        meter: [
                            { label: 'Percentage', value: percentage, color: 'var(--p-primary-color)' }
                        ]
                    };
                })
            }
        }
    }
    constructor() { }
    ngOnInit(): void {
    }
}
