// Class-Validator
import { IsInt } from "class-validator";

// GraphQL
import { InputType, Field } from "type-graphql";

// ========================================================================================================

@InputType()
export class ProductPaginationInput {
  @Field()
  @IsInt()
  pageNumber: number;

  @Field()
  @IsInt()
  pageSize: number;
}
