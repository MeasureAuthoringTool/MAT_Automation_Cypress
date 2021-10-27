node {
    parameters {
        choice(choices: ['dev:mat:cqllibrary:search:tests:report','dev:all:mat:tests:report','dev:mat:smoke:tests:report'], description:
        'Choose the Test script to run', name: 'TEST_SCRIPT')
    }
    stage('Clean Workspace') {
        slackSend(color: "#cccccc", message: "#${env.BUILD_NUMBER} (<${env.BUILD_URL}|Open>) - QA Cypress Build Started")
        cleanWs()
    }
    stage('Cleanup Old Containers') {
        sh 'docker stop cydev || true'
        sh 'docker rm cydev || true'
    }
    stage('Start Containers') {
        withCredentials([string(credentialsId: 'CYPRESS_DEV_USERNAME', variable: 'CYPRESS_DEV_USERNAME'),
        string(credentialsId: 'CYPRESS_DEV_PASSWORD', variable: 'CYPRESS_DEV_PASSWORD'), string(credentialsId:
        'CYPRESS_DEV_ALT_USERNAME', variable: 'CYPRESS_DEV_ALT_USERNAME'), string(credentialsId: 'CYPRESS_DEV_ALT_PASSWORD',
        variable: 'CYPRESS_DEV_ALT_PASSWORD'), string(credentialsId: 'CYPRESS_VSAC_API_KEY', variable:
        'CYPRESS_VSAC_API_KEY'),]) {
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
        try {
            slackSend(color: "#ffff00", message: "#${env.BUILD_NUMBER} (<${env.BUILD_URL}|Open>) - ${TEST_SCRIPT} Tests Started")

            sh 'docker exec -t cydev bash -c "npm run ${TEST_SCRIPT}"'

            slackSend(color: "#00ff00", message: "${env.JOB_NAME} #${env.BUILD_NUMBER} (<${env.BUILD_URL}|Open>) - ${TEST_SCRIPT} Tests Finished, Review console in Jenkins for Results")
        }
        catch (Exception e) {
            sh 'echo UI tests failed!;'
            slackSend(color: "#ff0000", message: "${env.JOB_NAME} #${env.BUILD_NUMBER} (<${env.BUILD_URL}|Open>) - ${TEST_SCRIPT} Tests Failed to Run or complete successfully")
            throw e;
        }
        finally {
            sh 'docker stop cydev || true'
            sh 'docker rm cydev || true'
            sh 'docker volume prune -f'
        }
    }
}
