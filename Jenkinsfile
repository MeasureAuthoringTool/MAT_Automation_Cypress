node {
    parameters {
        choice(choices: ['dev', 'test', 'prod'], description: 'test environment to run tests', name: 'CYPRESS_ENV')
    }
    stage('Clean Workspace') {
        slackSend(color: "#cccccc", message: "${env.JOB_NAME} #${env.BUILD_NUMBER} (<${env.BUILD_URL}|Open>) - UI Smoke Tests Build Started")
        cleanWs()
    }
    stage('Cleanup Old Containers') {
        sh 'docker stop mat_ui || true'
        sh 'docker rm mat_ui || true'
    }
    stage('Start Containers') {
        sh '''
	aws ecr get-login-password --region us-east-1 | docker login --username AWS --password-stdin 900648361868.dkr.ecr.us-east-1.amazonaws.com
	docker run --name=mat_ui -v $WORKSPACE:/usr/src/app/reports -e "CYPRESS_ENV=${CYPRESS_ENV}" -td 900648361868.dkr.ecr.us-east-1.amazonaws.com/mat-dev-cypress-ecr:latest
	'''
    }
    stage('Run UI Tests') {
        try {
            slackSend(color: "#ffff00", message: "${env.JOB_NAME} #${env.BUILD_NUMBER} (<${env.BUILD_URL}|Open>) - UI Smoke Tests Started")
            sh '''
	    docker exec mat_ui bash -c "google-chrome --version"
            docker exec mat_ui bash -c "npm run lint:cypress"
            docker exec mat_ui bash -c "npm run lint:standard"
            docker exec mat_ui bash -c "npm run ui:smoke"
	    '''
            slackSend(color: "#00ff00", message: "${env.JOB_NAME} #${env.BUILD_NUMBER} (<${env.BUILD_URL}|Open>) - UI Smoke Tests Passed")
        }
        catch (Exception e) {
            sh 'echo UI tests failed!;'
            slackSend(color: "#ff0000", message: "${env.JOB_NAME} #${env.BUILD_NUMBER} (<${env.BUILD_URL}|Open>) - UI Smoke Tests Failed")
            throw e;
        }
        finally {
            sh 'docker stop mat_ui || true'
            sh 'docker rm mat_ui || true'
        }
    }
}
