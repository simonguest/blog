# blog

![CI workflow](https://github.com/simonguest/blog/actions/workflows/ci.yml/badge.svg)

The code in this repo is a minimal blog I use to host [simonguest.com](https://simonguest.com). It's a lightweight, statically generated site, built from the ground up. It's responsive for mobile devices and supports full keyboard navigation and ARIA-compliant markup.

This blog is not a "framework" per se, but if you want to clone it, the following information will help you run in your own environment:

## Running

To run the blog locally, clone the repo, ```npm install``` the required devDependencies, and ```npm run server``` to build the content and run a server on ```http://localhost:8000```.

## Writing Content

All content (articles, presentations, projects, and the about page) is located in the ```/content``` directory. 

Each article is a markdown file that includes YAML metadata containing title, created, updated (optional), and and synopsis fields.

## Build Process

The blog uses [pandoc](https://pandoc.org/) to generate the build artifacts, which can be found in the ```/dist``` folder. You can manually generate these artifacts with ```npm run build```.

## Deploying

The blog uses Github Actions and AWS CDK to build and deploy to an AWS S3 endpoint hosted via a CloudFront distribution. If you want to reproduce this deployment in your own environment, you'll need to setup Github secret keys for AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY, and AWS_DEFAULT_REGION corresponding with an IAM account that has permissions to create/delete CloudFormation stacks, assuming IAM roles, create and upload to S3 buckets, and create CloudFront distributions.

In addition, you'll need to supply CERTIFICATE_ID and CERTIFICATE_ARN which point to the ID and ARN of an existing ACM-based certificate for your domain.

Finally, you'll want to edit ```cdk-deploy.js``` to specify the S3 buckets and CloudFront domains corresponding with your site. This script synthesizes a CloudFormation stack which creates the required S3 bucket, uploads the content (from ```/dist```), and sets up the CloudFront distribution.

## Post-Deployment

After deployment, you'll need to create an A record for your domain pointing to the generated CloudFront distribution.




