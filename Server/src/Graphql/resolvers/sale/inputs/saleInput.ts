import { InputType, Field } from "type-graphql";

// ========================================================================================================

@InputType()
export class CreateSaleInput {
  @Field()
  sale: string;

  @Field()
  startDate: Date;

  @Field()
  endDate: Date;

  @Field({ nullable: true })
  productId?: string;

  @Field({ nullable: true })
  categories?: string;
}
