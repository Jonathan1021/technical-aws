pipeline {
    agent any
    stages {
        stage('Build') {
            when {
                branch 'master|main|release/*|feature/*'
            }
            steps {
                echo 'Building..'
            }
        }
        stage('Test') {
            when {
                branch 'master|main|release/*|feature/*'
            }
            steps {
                echo 'Testing..'
                sh 'printenv'
            }
        }
        stage('Deploy') {
            when {
               branch 'master|main|release/*|feature/*'
            }
            steps {
                echo 'Deploying.... Release Branding'
            }
        }
    }
}