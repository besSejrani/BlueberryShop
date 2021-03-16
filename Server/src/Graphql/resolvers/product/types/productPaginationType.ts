import { Field, ObjectType } from "type-graphql";

// Database
import { Product } from "../../../../Model/Product";

// ========================================================================================================

@ObjectType()
export class ProductPagination {
  @Field(() => [Product])
  products: string[];

  @Field()
  count: number;
}
