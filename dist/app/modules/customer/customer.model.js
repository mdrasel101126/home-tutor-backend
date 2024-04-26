"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Customer = void 0;
const mongoose_1 = require("mongoose");
const CusomerSchema = new mongoose_1.Schema({
    name: {
        firstName: {
            type: String,
            required: true,
        },
        lastName: {
            type: String,
            required: true,
        },
    },
    email: {
        type: String,
        required: true,
    },
    division: {
        type: String,
        required: true,
    },
    district: {
        type: String,
        required: true,
    },
    policeStation: {
        type: String,
        required: true,
    },
    contactNo: {
        type: String,
        required: true,
    },
    profileImg: {
        type: String,
    },
}, {
    timestamps: true,
});
/* CusomerSchema.statics.isCusomerExist = async function (
  id: string
): Promise<ICusomer | null> {
  return await Cusomer.findById(id).select("+password").lean();
};

CusomerSchema.statics.isPasswordMatched = async function (
  givenPassword: string,
  savedPassword: string
): Promise<boolean> {
  return await bcrypt.compare(givenPassword, savedPassword);
};
 */
/* CusomerSchema.pre("save", async function (next) {
  // password hash
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const Cusomer = this;
  Cusomer.password = await bcrypt.hash(
    Cusomer.password,
    Number(config.bcrypt_salt_round)
  );
  next();
});
CusomerSchema.pre("findOneAndUpdate", async function (next) {
  const update = this.getUpdate() as Partial<ICusomer>;
  if (update?.password) {
    update.password = await bcrypt.hash(
      update.password,
      Number(config.bcrypt_salt_round)
    );
  }
  next();
}); */
/* CusomerSchema.methods.toJSON = function () {
  const obj = this.toObject();
  delete obj.password;
  delete obj.__v;
  delete obj.createdAt;
  delete obj.updatedAt;
  return obj;
}; */
exports.Customer = (0, mongoose_1.model)("Customer", CusomerSchema);
