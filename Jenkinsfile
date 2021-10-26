node {
    parameters {
        choice(choices: ['DEV'], description: 'test environment to run tests', name: 'CYPRESS_ENV')
    }
    stage('Clean Workspace') {
        slackSend(color: "#cccccc", message: "${env.JOB_NAME} #${env.BUILD_NUMBER} (<${env.BUILD_URL}|Open>) - UI Smoke Tests Build Started")
        cleanWs()
    }
    stage('Cleanup Old Containers') {
        sh 'docker stop cydev || true'
        sh 'docker rm cydev || true'
    }
    stage('Start Containers') {
        sh 'docker run --name=cydev \
        -v $WORKSPACE:/usr/src/app/reports \
        -e "CYPRESS_ENV=${CYPRESS_ENV}" \
        -td cydev'
    }
    stage('Run UI Tests') {
        try {
            slackSend(color: "#ffff00", message: "${env.JOB_NAME} #${env.BUILD_NUMBER} (<${env.BUILD_URL}|Open>) - UI Smoke Tests Started")
            sh 'docker exec -t cydev bash -c "npm run dev:mat:cqllibrary:search:tests:report"'
            slackSend(color: "#00ff00", message: "${env.JOB_NAME} #${env.BUILD_NUMBER} (<${env.BUILD_URL}|Open>) - UI Smoke Tests Passed")
        }
        catch (Exception e) {
            sh 'echo UI tests failed!;'
            slackSend(color: "#ff0000", message: "${env.JOB_NAME} #${env.BUILD_NUMBER} (<${env.BUILD_URL}|Open>) - UI Smoke Tests Failed")
            throw e;
        }
        finally {
            sh 'docker stop cydev || true'
            sh 'docker rm cydev || true'
            sh 'docker volume prune -f'
        }
    }
}
