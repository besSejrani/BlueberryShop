// Database
import { prop as Property, getModelForClass } from "@typegoose/typegoose";
import { ObjectId } from "mongodb";

// GraphQL
import { Field, ObjectType } from "type-graphql";

// Validation
import { IsEmail } from "class-validator";

// Hash
import bcrypt from "bcryptjs";

// ========================================================================================================

@ObjectType()
export class User {
  @Field()
  readonly _id: ObjectId;

  @Property()
  googleId?: string;

  @Property()
  githubId?: string;

  @Field()
  @Property({ required: [true, "Please provide a username"], unique: true, trim: true, minlength: 3, maxlength: 20 })
  username: string;

  @Field()
  @Property({
    required: [true, "Please provide your email"],
    unique: true,
    trim: true,
    lowercase: true,
  })
  @IsEmail()
  email: string;

  @Property({ required: [true, "Please provide a password"], trim: true, minlength: 8 })
  password: string;

  @Field()
  @Property({ enum: ["user", "dev", "designer", "admin"], default: "user" })
  role: string;

  @Property({ default: false })
  confirmed: boolean;

  @Property()
  profileImageUrl?: string;

  @Property({ default: Date.now() })
  createdAt?: Date;

  // ========================================================================================================

  /**
   * @description Compare hashed passwords
   */
  public async comparePasswords(candidatePassword: string, userPassword: string): Promise<boolean> {
    return await bcrypt.compare(candidatePassword, userPassword);
  }

  // ========================================================================================================
}

export const UserModel = getModelForClass(User);
