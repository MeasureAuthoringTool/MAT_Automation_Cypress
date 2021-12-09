pipeline{
    agent any

    options {
        buildDiscarder(logRotator(numToKeepStr:'20'))
    }

    parameters {
        choice(choices: ['dev:mat:cqllibrary:search:tests:report','dev:all:mat:tests:report','dev:mat:smoke:tests:report','test:all:mat:tests:report', 'dev:bonnieFHIR:measures:tests:report', 'dev:all:bonnieFHIR:tests:report', 'dev:all:bonnieQDM56:tests:report', 'dev:all:bonnieQDM55:tests:report', 'test:all:bonnieFHIR:tests:report', 'test:all:bonnieQDM56:tests:report'], description:'Choose the Test script to run', name: 'TEST_SCRIPT')
        choice(name:'BUILD_CONTAINER', description:'Rebuild Cypress Container?', choices:['no','yes'])
    }

    environment{
        AWS_ACCOUNT = credentials('HCQIS_NONPROD')
        CYPRESS_DEV_USERNAME=credentials('CYPRESS_DEV_USERNAME')
        CYPRESS_DEV_PASSWORD=credentials('CYPRESS_DEV_PASSWORD')
        CYPRESS_DEV_ALT_USERNAME=credentials('CYPRESS_DEV_ALT_USERNAME')
        CYPRESS_DEV_ALT_PASSWORD=credentials('CYPRESS_DEV_ALT_PASSWORD')
        CYPRESS_TEST_USERNAME=credentials('CYPRESS_TEST_USERNAME')
        CYPRESS_TEST_PASSWORD=credentials('CYPRESS_TEST_PASSWORD')
        CYPRESS_TEST_ALT_USERNAME=credentials('CYPRESS_TEST_ALT_USERNAME')
        CYPRESS_TEST_ALT_PASSWORD=credentials('CYPRESS_TEST_ALT_PASSWORD')
        CYPRESS_VSAC_API_KEY=credentials('CYPRESS_VSAC_API_KEY')
        CYPRESS_DEVQDM56_DB_MONGO_GROUPID=credentials('CYPRESS_DEVQDM56_DB_MONGO_GROUPID')
        CYPRESS_DEVQDM55_DB_MONGO_GROUPID=credentials('CYPRESS_DEVQDM55_DB_MONGO_GROUPID')
        CYPRESS_DEVFHIR_DB_MONGO_GROUPID=credentials('CYPRESS_DEVFHIR_DB_MONGO_GROUPID')
        CYPRESS_TESTQDM56_DB_MONGO_GROUPID=credentials('CYPRESS_TESTQDM56_DB_MONGO_GROUPID')
        CYPRESS_MONGO_URL=credentials('CYPRESS_MONGO_URL')
        CYPRESS_MONGO_SSLCERT=credentials('CYPRESS_MONGO_SSLCERT')
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
		args '-u 0 -v $HOME/.npm:/.npm'
                reuseNode true
            }
        }
            steps {
                slackSend(color: "#ffff00", message: "#${env.BUILD_NUMBER} (<${env.BUILD_URL}|Open>) - ${TEST_SCRIPT} Tests Started")
                sh '''
                cd /app/cypress
                npm run ${TEST_SCRIPT}
                tar -czf /app/mochawesome-report-${BUILD_NUMBER}.tar.gz -C /app/mochawesome-report/ . 
                cp /app/mochawesome-report-${BUILD_NUMBER}.tar.gz ${WORKSPACE}/
                '''
            }
        }
   }

  post {
      always{
        archiveArtifacts artifacts: "mochawesome-report-${BUILD_NUMBER}.tar.gz"
      }
      success{
        slackSend(color: "#00ff00", message: "${env.JOB_NAME} #${env.BUILD_NUMBER} (<${env.BUILD_URL}|Open>) ${TEST_SCRIPT} Tests Finished, Review console/artifacts in Jenkins for Results and Report")
      }
      failure{
	sh 'echo fail'
        slackSend(color: "#ff0000", message: "${env.JOB_NAME} #${env.BUILD_NUMBER} (<${env.BUILD_URL}|Open>) ${TEST_SCRIPT} Tests Failed to Run or complete successfully")
      }
  }
}
