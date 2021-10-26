node {
    parameters {
        choice(choices: ['test_canary', 'dev_canary', 'dev_stable', 'test_stable', 'val1', 'val2', 'impl1', 'impl2', 'prod1', 'prod2'], description: 'test environment to run tests', name: 'CYPRESS_ENV')
    }
    stage('Clean Workspace') {
        slackSend(color: "#cccccc", message: "${env.JOB_NAME} #${env.BUILD_NUMBER} (<${env.BUILD_URL}|Open>) - UI Smoke Tests Build Started")
        cleanWs()
    }
    stage('Cleanup Old Containers') {
        sh 'docker stop qpp_ui || true'
        sh 'docker rm qpp_ui || true'
    }
    stage('Start Containers') {
        sh 'docker run --name=qpp_ui \
        -v $WORKSPACE:/usr/src/app/reports \
        -e "CYPRESS_ENV=${CYPRESS_ENV}" \
        -td qppui'
    }
    stage('Run UI Tests') {
        try {
            slackSend(color: "#ffff00", message: "${env.JOB_NAME} #${env.BUILD_NUMBER} (<${env.BUILD_URL}|Open>) - UI Smoke Tests Started")
            sh 'CID=$(docker ps --latest --quiet);echo $CID;docker exec -t $CID bash -c "google-chrome --version"'
            sh 'CID=$(docker ps --latest --quiet);echo $CID;docker exec -t $CID bash -c "npm run lint:cypress"'
            sh 'CID=$(docker ps --latest --quiet);echo $CID;docker exec -t $CID bash -c "npm run lint:standard"'
            sh 'CID=$(docker ps --latest --quiet);echo $CID;docker exec -t $CID bash -c "npm run ui:smoke"'
            slackSend(color: "#00ff00", message: "${env.JOB_NAME} #${env.BUILD_NUMBER} (<${env.BUILD_URL}|Open>) - UI Smoke Tests Passed")
        }
        catch (Exception e) {
            sh 'echo UI tests failed!;'
            slackSend(color: "#ff0000", message: "${env.JOB_NAME} #${env.BUILD_NUMBER} (<${env.BUILD_URL}|Open>) - UI Smoke Tests Failed")
            throw e;
        }
        finally {
            junit '**/QPP*.xml'
            archiveArtifacts '**/QPP*.xml'
            sh 'docker stop qpp_ui || true'
            sh 'docker rm qpp_ui || true'
            sh 'docker volume prune -f'
        }
    }
}
