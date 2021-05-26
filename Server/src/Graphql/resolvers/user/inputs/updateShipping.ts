// Class-Validator
import { MaxLength, IsInt } from "class-validator";

// GraphQL
import { InputType, Field } from "type-graphql";

// ========================================================================================================

@InputType()
export class UpdateShipping {
  @Field({ nullable: true })
  @MaxLength(25, { message: "Country information can not be longer than 25 characters" })
  country?: string;

  @Field({ nullable: true })
  @MaxLength(40, { message: "Address information can not be longer than 40 characters" })
  address?: string;

  @Field({ nullable: true })
  @MaxLength(25, { message: "City information can not be longer than 25 characters" })
  city?: string;

  @Field({ nullable: true })
  @IsInt()
  @MaxLength(10, { message: "Zip information can not be longer than 10 characters" })
  zip?: number;
}
