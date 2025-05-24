export class CategoryDTO {
    constructor(category) {
        this.id = category.id;
        this.name = category.name;
        this.description = category.description;
        this.countOrder = category.orders.length
        this.createdAt = category.created_at;
    }
}