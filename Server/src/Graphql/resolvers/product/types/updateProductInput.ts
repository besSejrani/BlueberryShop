//GraphQL
import { InputType, Field } from "type-graphql";

// ========================================================================================================

@InputType()
export class UpdateProductInput {
  @Field({ nullable: true })
  name?: string;

  @Field({ nullable: true })
  price?: number;

  @Field({ nullable: true })
  description?: string;

  @Field({ nullable: true })
  stock?: number;

  @Field({nullable:true})
  promotion?: boolean;
}
