import { InputType, Field } from "type-graphql";

// ========================================================================================================

@InputType()
export class UpdateSaleInput {
  @Field({ nullable: true })
  sale?: string;

  @Field({ nullable: true })
  startDate?: Date;

  @Field({ nullable: true })
  endDate?: Date;

  @Field({ nullable: true })
  discount?: string;

  @Field({ nullable: true })
  productId?: string;

  @Field({ nullable: true })
  categoryId?: string;
}
