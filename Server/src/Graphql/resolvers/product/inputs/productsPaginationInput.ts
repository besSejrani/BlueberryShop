//GraphQL
import { InputType, Field } from "type-graphql";

// ========================================================================================================

@InputType()
export class ProductPaginationInput {
  @Field()
  pageNumber: number;

  @Field()
  pageSize: number;
}
