const cdk = require("@aws-cdk/core");
const s3 = require("@aws-cdk/aws-s3");
const s3deploy = require("@aws-cdk/aws-s3-deployment");
const cloudfront = require("@aws-cdk/aws-cloudfront");

class BlogCdkStack extends cdk.Stack {
    constructor(scope, id, props) {
        super(scope, id, props);

        const bucket = new s3.Bucket(this, "simonguest.com", {
            versioned: true,
            bucketName: "simonguest.com",
            websiteIndexDocument: "index.html",
            websiteErrorDocument: "index.html",
            removalPolicy: cdk.RemovalPolicy.DESTROY,
            publicReadAccess: true,
        });

        new s3deploy.BucketDeployment(this, "DeployWebsite", {
            sources: [s3deploy.Source.asset("./dist")],
            destinationBucket: bucket,
        });

        new cloudfront.CloudFrontWebDistribution(this, "CDKCRAStaticDistribution", {
            originConfigs: [
                {
                    s3OriginSource: {
                        s3BucketSource: bucket,
                    },
                    behaviors: [{isDefaultBehavior: true}],
                },
            ],
            errorConfigurations: [
                {
                    errorCode: 403,
                    responseCode: 200,
                    responsePagePath: '/index.html'
                },
                {
                    errorCode: 404,
                    responseCode: 200,
                    responsePagePath: '/index.html'
                }
            ],
        });
    }
}

const app = new cdk.App();
new BlogCdkStack(app, 'BlogCdkStack', {});
