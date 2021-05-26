// Class-Validator
import { MaxLength } from "class-validator";

// GraphQL
import { InputType, Field } from "type-graphql";
import { Status } from "../../../enums/statusEnum";

// ========================================================================================================

@InputType()
export class UpdateProductInput {
  @Field({ nullable: true })
  @MaxLength(25, { message: "Product name can not be longer than 25 characters" })
  name?: string;

  @Field({ nullable: true })
  price?: number;

  @Field({ nullable: true })
  @MaxLength(250, { message: "Product name can not be longer than 250 characters" })
  description?: string;

  @Field({ nullable: true })
  stock?: number;

  @Field({ nullable: true })
  promotion?: boolean;

  @Field(() => Status, { nullable: true })
  status: Status;
}
