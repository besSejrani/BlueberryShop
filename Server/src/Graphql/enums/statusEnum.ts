import { registerEnumType } from "type-graphql";
// ========================================================================================================

export enum Status {
  DRAFT = "DRAFT",
  PUBLISHED = "PUBLISHED",
  ARCHIVED = "ARCHIVED",
}

registerEnumType(Status, {
  name: "Status",
  description: "Status product enum",
  valuesConfig: {
    // PUBLISHED: {
    //   deprecationReason: "Replaced with Left or Right",
    // },
    ARCHIVED: {
      description: "The other left",
    },
  },
});
