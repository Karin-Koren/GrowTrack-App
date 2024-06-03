export class Expense {
  constructor(id, description, amount, date, categoryTitle) {
    this.description = description;
    this.amount = amount;
    this.date = date;
    this.categoryTitle = categoryTitle;
    this.id = id;
  }
}
