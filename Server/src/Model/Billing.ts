// Database
import {
  prop as Property,
  //  getModelForClass
} from "@typegoose/typegoose";

// ========================================================================================================

export class Billing {
  @Property()
  country?: string;

  @Property()
  address?: string;

  @Property({ default: "" })
  city?: string;

  @Property()
  zip?: number;
}
