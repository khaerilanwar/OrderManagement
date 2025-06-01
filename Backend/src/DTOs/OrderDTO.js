export class OrderDTO {
    constructor(order) {
        this.id = order.id;
        this.title = order.title;
        this.customer = order.customer.name;
        this.invoice = order.invoice;
        this.category = order.category.name;
        this.status = order.status.detail;
        this.createdAt = order.created_at;
    }
}