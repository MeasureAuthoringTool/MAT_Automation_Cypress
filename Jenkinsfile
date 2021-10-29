pipeline{
    agent any

    options {
        buildDiscarder(logRotator(numToKeepStr:'20'))
    }

    parameters {
        choice(choices: ['dev:mat:cqllibrary:search:tests:report','dev:all:mat:tests:report','dev:mat:smoke:tests:report'], description:'Choose the Test script to run', name: 'TEST_SCRIPT')
        choice(name:'BUILD_CONTAINER', description:'Rebuild Cypress Container?', choices:['no','yes'])
    }

    environment{
        AWS_ACCOUNT = credentials('HCQIS_NONPROD')
        CYPRESS_DEV_USERNAME=credentials('CYPRESS_DEV_USERNAME')
        CYPRESS_DEV_PASSWORD=credentials('CYPRESS_DEV_PASSWORD')
        CYPRESS_DEV_ALT_USERNAME=credentials('CYPRESS_DEV_ALT_USERNAME')
        CYPRESS_DEV_ALT_PASSWORD=credentials('CYPRESS_DEV_ALT_PASSWORD')
        CYPRESS_VSAC_API_KEY=credentials('CYPRESS_VSAC_API_KEY')
    }

 stages {
    stage('ECR Login'){
      steps{
        sh 'aws ecr get-login-password --region us-east-1 | docker login --username AWS --password-stdin ${AWS_ACCOUNT}.dkr.ecr.us-east-1.amazonaws.com'
      }
    }
    stage('Build Cypress Container'){
      when{
        expression { BUILD_CONTAINER == 'yes' }
      }
      steps{
          sh '''
            docker build -t mat-dev-cypress-ecr .
            docker tag mat-dev-cypress-ecr:latest ${AWS_ACCOUNT}.dkr.ecr.us-east-1.amazonaws.com/mat-dev-cypress-ecr:latest
            docker push ${AWS_ACCOUNT}.dkr.ecr.us-east-1.amazonaws.com/mat-dev-cypress-ecr:latest
          '''
      }
    }
    
    stage('Run Tests') {
        agent {
            docker { 
                image '${AWS_ACCOUNT}.dkr.ecr.us-east-1.amazonaws.com/mat-dev-cypress-ecr:latest'
                args "-v ${WORKSPACE}/mochawesome-report:/app/mochawesome-report"
                args "-e CYPRESS_DEV_USERNAME=${CYPRESS_DEV_USERNAME}"
                args "-e CYPRESS_DEV_PASSWORD=${CYPRESS_DEV_PASSWORD}"
                args "-e CYPRESS_DEV_ALT_USERNAME=${CYPRESS_DEV_ALT_USERNAME}"
                args "-e CYPRESS_DEV_ALT_PASSWORD=${CYPRESS_DEV_ALT_PASSWORD}"
                args "-e CYPRESS_VSAC_API_KEY=${CYPRESS_VSAC_API_KEY}"
                reuseNode true
            }
        }
            steps {
                slackSend(color: "#ffff00", message: "#${env.BUILD_NUMBER} (<${env.BUILD_URL}|Open>) - ${TEST_SCRIPT} Tests Started")
                sh 'npm run ${TEST_SCRIPT}'
            }
        }
   }
 
  post {
      success{
        sh 'tar -czf mochawesome-report.tar.gz mochawesome-report/'
        slackSend(color: "#00ff00", message: "${env.JOB_NAME} #${env.BUILD_NUMBER} (<${env.BUILD_URL}|Open>) - ${TEST_SCRIPT} Tests Finished, Review console in Jenkins for Results")
        slackUploadFile filePath: "mochawesome-report.tar.gz", initialComment:  "Report"
      }
      failure{
        slackSend(color: "#ff0000", message: "${env.JOB_NAME} #${env.BUILD_NUMBER} (<${env.BUILD_URL}|Open>) - ${TEST_SCRIPT} Tests Failed to Run or complete successfully")
      }
  }
}
