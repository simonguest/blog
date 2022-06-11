const cdk = require("@aws-cdk/core");
const s3 = require("@aws-cdk/aws-s3");
const s3deploy = require("@aws-cdk/aws-s3-deployment");
const cloudfront = require("@aws-cdk/aws-cloudfront");
const cm = require("@aws-cdk/aws-certificatemanager")

class BlogCdkStack extends cdk.Stack {
    constructor(scope, id, props) {
        super(scope, id, props);

        const bucket = new s3.Bucket(this, "simonguest.com", {
            versioned: false,
            bucketName: "simonguest.com",
            websiteIndexDocument: "index.html",
            websiteErrorDocument: "index.html",
            removalPolicy: cdk.RemovalPolicy.DESTROY,
            publicReadAccess: true,
        });

        const certificate = cm.Certificate.fromCertificateArn(
            this,
            process.env.CERTIFICATE_ID,
            process.env.CERTIFICATE_ARN
        );

        const distribution = new cloudfront.CloudFrontWebDistribution(this, "CDKCRAStaticDistribution", {
            originConfigs: [
                {
                    customOriginSource: {
                        domainName: "simonguest.com.s3-website-us-west-2.amazonaws.com"
                    },
                    behaviors: [{isDefaultBehavior: true}],
                },
            ],
            viewerCertificate: cloudfront.ViewerCertificate.fromAcmCertificate(
                certificate, {aliases: ['simonguest.com']}
            ),
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

        new s3deploy.BucketDeployment(this, "DeployWebsite", {
            sources: [s3deploy.Source.asset("./dist")],
            destinationBucket: bucket,
            distribution: distribution,
            distributionPaths: ['/*']
        });
    }
}

const app = new cdk.App();
new BlogCdkStack(app, 'BlogCdkStack', {});
