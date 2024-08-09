import { type ClientSchema, a, defineData } from "@aws-amplify/backend";

const schema = a.schema({
  Snippet: a
    .model({
      title: a.string().required(),
      code: a.string().required(),
      iv: a.string().required(),
      expire: a.integer().required(),
      language: a.string().required(),
    })
    .authorization(allow => [allow.guest()]),
});

export type Schema = ClientSchema<typeof schema>;

export const data = defineData({
  schema,
  authorizationModes: {
    defaultAuthorizationMode: "iam",
  },
});
