import type { QueryFilter } from "mongoose";
import type { Model } from "mongoose";

export default class BaseRepo<T> {
  protected readonly model: Model<T>;

  constructor(model: Model<T>) {
    this.model = model;
  }

  create(data: Partial<T>) {
    return this.model.create(data);
  }

  findAll() {
    return this.model.find();
  }

  findById(id: string) {
    return this.model.findById(id);
  }

  findOne(filter: Partial<T>) {
    return this.model.findOne(filter);
  }

  updateById(id: string, data: Partial<T>) {
    return this.model.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true,
    });
  }

  deleteById(id: string) {
    return this.model.findByIdAndDelete(id);
  }

  async exists(filter: QueryFilter<T>) {
    return Boolean(await this.model.exists(filter));
  }
}
