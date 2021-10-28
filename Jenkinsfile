pipeline{
    agent { label 'jenkins-02' }

    options {
        buildDiscarder(logRotator(numToKeepStr:'20'))
        disableConcurrentBuilds()
    }

    parameters {
        choice(choices: ['dev:mat:cqllibrary:search:tests:report','dev:all:mat:tests:report','dev:mat:smoke:tests:report'], description:'Choose the Test script to run', name: 'TEST_SCRIPT')
    }

    environment{
	CYPRESS_DEV_USERNAME=credentials('CYPRESS_DEV_USERNAME')
	CYPRESS_DEV_PASSWORD=credentials('CYPRESS_DEV_PASSWORD')
	CYPRESS_DEV_ALT_USERNAME=credentials('CYPRESS_DEV_ALT_USERNAME')
	CYPRESS_DEV_ALT_PASSWORD=credentials('CYPRESS_DEV_ALT_PASSWORD')
	CYPRESS_VSAC_API_KEY=credentials('CYPRESS_VSAC_API_KEY')
    }

 stages {
    stage('Start Containers') {
      steps {
        sh 'docker run --name=cydev \
        -v ${WORKSPACE}/mochawesome-report:/app/mochawesome-report \
        -e "CYPRESS_DEV_USERNAME=${CYPRESS_DEV_USERNAME}" \
        -e "CYPRESS_DEV_PASSWORD=${CYPRESS_DEV_PASSWORD}" \
        -e "CYPRESS_DEV_ALT_USERNAME=${CYPRESS_DEV_ALT_USERNAME}" \
        -e "CYPRESS_DEV_ALT_PASSWORD=${CYPRESS_DEV_ALT_PASSWORD}" \
        -e "CYPRESS_VSAC_API_KEY=${CYPRESS_VSAC_API_KEY}" \
        -td cydev'
        }
   }
   stage('Run UI Tests') {
        steps {
            slackSend(color: "#ffff00", message: "#${env.BUILD_NUMBER} (<${env.BUILD_URL}|Open>) - ${TEST_SCRIPT} Tests Started")
            sh 'docker exec -t cydev bash -c "npm run ${TEST_SCRIPT}"'
        }
   }
 }
  post {
      always{
        sh 'docker stop cydev || true'
        sh 'docker rm cydev || true'
        sh 'docker volume prune -f'	
      }
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




