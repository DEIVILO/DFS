import mongoose, { Document, Model, Schema } from "mongoose";
import bcrypt from "bcryptjs";

export interface IUser extends Document {
    username: string;
    password: string;
    email: string;
    isVerified: boolean;
    resetPasswordToken?: string;
    resetPasswordExpires?: Date;

    comparePassword(candidatePassword: string): Promise<boolean>;
}

const UserSchema: Schema<IUser> = new Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isVerified: { type: Boolean, default: false },
    resetPasswordToken: { type: String },
    resetPasswordExpires: { type: Date }
})

UserSchema.pre<IUser>("save", async function (next) {
    if (!this.isModified("password")) {
        return next()
    }
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
    next()
})

UserSchema.methods.comparePassword = function (candidatePassword: string): Promise<boolean> {
    return bcrypt.compare(candidatePassword, this.password);
};

const User: Model<IUser> = mongoose.models.Users || mongoose.model<IUser>("User", UserSchema)

export default User