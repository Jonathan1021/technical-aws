pipeline {
    agent any
    when {
        branch 'master|main|release/*|feature/*'
    }
    stages {
        stage('Build') {
            steps {
                echo 'Building..'
            }
        }
        stage('Test') {
            steps {
                echo 'Testing..'
                sh 'printenv'
            }
        }
        stage('Deploy') {
            steps {
                echo 'Deploying.... Release Branding'
            }
        }
    }
}