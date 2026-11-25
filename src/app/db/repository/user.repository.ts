import User from "@/app/db/Model/user.model.js";
import BaseRepo from "@/app/db/repository/base.repository.js";
import type { IUser } from "@/app/types/user.types.js";
import { AppError } from "@/app/utils/app-error.util.js";

class UserRepo extends BaseRepo<IUser> {
  constructor() {
    super(User);
  }

  findByEmail(email: string) {
    return this.model.findOne({ email });
  }

  findByUsername(username: string) {
    return this.model.findOne({ username });
  }

  async ensureAvailable(field: "email" | "username" = "email", value: string) {
    const exists = await this.exists({
      [field]: value.trim().toLowerCase(),
    });

    if (exists) {
      throw new AppError(
        `${field} has been using by another user`,
        409,
        `Please try another ${field}`,
      );
    }
  }

  async ensureAvailableForUpdate(
    field: "email" | "username" = "email",
    value: string,
    userId: string,
  ) {
    const exists = await this.exists({
      [field]: value.trim().toLowerCase(),
      _id: { $ne: userId },
    });

    if (exists) {
      throw new AppError(
        `${field} has been using by another user`,
        409,
        `Please try another ${field}`,
      );
    }
  }
}

export default new UserRepo();
