@echo off
echo ===================================================
echo   SmartEVAC AI - AWS ECR ^& ECS Deployment Script
echo ===================================================

if "%AWS_ACCOUNT_ID%"=="" (
    echo [ERROR] Please set AWS_ACCOUNT_ID environment variable.
    echo Example: set AWS_ACCOUNT_ID=123456789012
    exit /b 1
)

if "%AWS_REGION%"=="" (
    set AWS_REGION=us-east-1
)

set ECR_REPO=smartevac-ai
set FULL_IMAGE=%AWS_ACCOUNT_ID%.dkr.ecr.%AWS_REGION%.amazonaws.com/%ECR_REPO%:latest

echo [1/4] Logging in to AWS ECR...
aws ecr get-login-password --region %AWS_REGION% | docker login --username AWS --password-stdin %AWS_ACCOUNT_ID%.dkr.ecr.%AWS_REGION%.amazonaws.com

echo [2/4] Building Docker Image...
docker build -t %ECR_REPO%:latest .

echo [3/4] Tagging and Pushing Image to ECR...
docker tag %ECR_REPO%:latest %FULL_IMAGE%
docker push %FULL_IMAGE%

echo [4/4] Registering ECS Task Definition...
aws ecs register-task-definition --cli-input-json file://ecs-task-definition.json

echo ===================================================
echo   AWS Deployment Successful! Image: %FULL_IMAGE%
echo ===================================================
