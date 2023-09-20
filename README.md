# CDK Local Bundling Demo

Steps to create this project:
 - `nvm install 18` - get node 18
 - `npm i -g aws-cdk@latest` - install CDK CLI
 - `cdk init app --language=typescript` - init empty app
 - `npm i -S dynamodb-onetable @aws-sdk/client-dynamodb` - install runtime dependencies
 - `npm i -D esbuild@0` - install local bundler
 - Wrote some code; took maybe 10 minutes.
 - `npm run cdk -- deploy` - deploy to AWS; synthesis took 7 seconds

Output:
```
> cdk deploy

Bundling asset SerbanCdkExampleStack/Lambda/Code/Stage...

  cdk.out/bundling-temp-1e2e3f155f2419da5c761ceda245613a42c34d9e49860ee43aafa1fe7b89fbb5/index.js  1.3mb ⚠️

⚡ Done in 63ms

✨  Synthesis time: 7.13s

SerbanCdkExampleStack: deploying... [1/1]
SerbanCdkExampleStack: creating CloudFormation changeset...

 ✅  SerbanCdkExampleStack

✨  Deployment time: 52.13s

Outputs:
...
```

 - `aws lambda invoke --function-name SerbanCdkExampleStack-Lambda... out.json` - run Lambda


Output:
```json
{
    "StatusCode": 200,
    "ExecutedVersion": "$LATEST"
}
```

See out.json for results.