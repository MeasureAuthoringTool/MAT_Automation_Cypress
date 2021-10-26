node {
    parameters {
        choice(choices: ['DEV'], description: 'test environment to run tests', name: 'CYPRESS_ENV')
    }
    environment {
            CYPRESS_DEV_USERNAME     = credentials('CYPRESS_DEV_USERNAME')
            CYPRESS_DEV_PASSWORD     = credentials('CYPRESS_DEV_PASSWORD')
            CYPRESS_DEV_ALT_USERNAME     = credentials('CYPRESS_DEV_ALT_USERNAME')
            CYPRESS_DEV_ALT_PASSWORD     = credentials('CYPRESS_DEV_ALT_PASSWORD')
            CYPRESS_VSAC_API_KEY     = credentials('CYPRESS_VSAC_API_KEY')
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
        -e "CYPRESS_DEV_USERNAME=${CYPRESS_DEV_USERNAME}" \
        -e "CYPRESS_DEV_PASSWORD=${CYPRESS_DEV_PASSWORD}" \
        -e "CYPRESS_DEV_ALT_USERNAME=${CYPRESS_DEV_ALT_USERNAME}" \
        -e "CYPRESS_DEV_ALT_PASSWORD=${CYPRESS_DEV_ALT_PASSWORD}" \
        -e "CYPRESS_VSAC_API_KEY=${CYPRESS_VSAC_API_KEY}" \
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
