// Class-Validator
import { IsDate } from "class-validator";

// GraphQL
import { InputType, Field } from "type-graphql";

// ========================================================================================================

@InputType()
export class CreateSaleInput {
  @Field()
  sale: string;

  @Field()
  @IsDate()
  startDate: Date;

  @Field()
  @IsDate()
  endDate: Date;

  @Field()
  discount: string;

  @Field({ nullable: true })
  productId?: string;

  @Field({ nullable: true })
  categoryId?: string;
}
