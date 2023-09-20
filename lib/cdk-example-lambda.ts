import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { Entity, Model, Table } from "dynamodb-onetable";

const TableSchema = {
  format: "onetable:1.1.0",
  version: "0.0.1",
  indexes: {
    primary: { hash: "PK", sort: "SK" },
  },
  models: {
    Account: {
      PK: { type: String, value: "ACCOUNT#${id}" },
      SK: { type: String, value: "ACCOUNT#${id}" },
      id: {
        type: String,
        generate: "ulid",
        validate: /^[0123456789ABCDEFGHJKMNPQRSTVWXYZ]{26}$/i,
      },
      name: { type: String, required: true },
      status: { type: String, default: "active" },
    },
  },
};

type Account = Entity<typeof TableSchema.models.Account>;

export async function handler(): Promise<Account> {
  const table = new Table({
    client: new DynamoDBClient(),
    name: process.env.DYNAMODB_TABLE_NAME!,
    schema: TableSchema,
  });

  const accounts: Model<Account> = table.getModel("Account");
  const account = await accounts.create({
    name: `My Test Account ${new Date().toISOString()}`,
  });
  return account;
}
