#!/usr/bin/env node
import "source-map-support/register";
import * as cdk from "aws-cdk-lib";
import { CdkExampleStack } from "../lib/cdk-example-stack";

const app = new cdk.App();
new CdkExampleStack(app, "SerbanCdkExampleStack", {}).tags.setTag(
  "Owner",
  "Serban.Petrescu@trilogy.com"
);
