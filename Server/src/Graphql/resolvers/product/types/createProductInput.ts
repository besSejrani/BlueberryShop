//GraphQL
import { InputType, Field } from "type-graphql";
import { Status } from "./statusEnum";

// ========================================================================================================

@InputType()
export class CreateProductInput {
  @Field()
  name: string;

  @Field()
  price: string;

  @Field()
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
