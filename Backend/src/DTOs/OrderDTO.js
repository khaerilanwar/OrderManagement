export class OrderDTO {
    constructor(order) {
        this.id = order.id;
        this.title = order.title;
        this.customer = order.customer.name;
        this.category = order.category.name;
        this.status = order.status.name;
        this.createdAt = order.created_at;
    }
}