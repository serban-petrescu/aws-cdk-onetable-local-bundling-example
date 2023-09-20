import { CfnOutput, Duration, Stack, StackProps } from "aws-cdk-lib";
import { AttributeType, BillingMode, Table } from "aws-cdk-lib/aws-dynamodb";
import { NodejsFunction } from "aws-cdk-lib/aws-lambda-nodejs";
import { Construct } from "constructs";
import { join } from "path";

export class CdkExampleStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const table = new Table(this, "Table", {
      partitionKey: {
        name: "PK",
        type: AttributeType.STRING,
      },
      sortKey: {
        name: "SK",
        type: AttributeType.STRING,
      },
      billingMode: BillingMode.PAY_PER_REQUEST,
    });

    const lambda = new NodejsFunction(this, "Lambda", {
      entry: join(__dirname, "cdk-example-lambda.ts"),
      timeout: Duration.seconds(30),
      environment: {
        DYNAMODB_TABLE_NAME: table.tableName,
      },
    });
    table.grantReadWriteData(lambda);

    new CfnOutput(this, "LambdaArnOutput", { value: lambda.functionArn });
  }
}
