// Class-Validator
import { MaxLength } from "class-validator";

// GraphQL
import { InputType, Field } from "type-graphql";
import { Status } from "../../../enums/statusEnum";

// ========================================================================================================

@InputType()
export class CreateProductInput {
  @Field()
  @MaxLength(25, { message: "Product name can not be longer than 25 characters" })
  name: string;

  @Field()
  price: string;

  @Field()
  @MaxLength(250, { message: "Product name can not be longer than 250 characters" })
  description: string;

  @Field()
  stock: string;

  @Field()
  category: string;

  @Field()
  promotion: boolean;

  @Field(() => Status)
  status: Status;
}
