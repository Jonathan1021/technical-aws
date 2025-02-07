pipeline {
    agent any

    stages {
        stage('Configure Git') {
            steps {
                sh 'git config --global user.email "tu-email@example.com"'
                sh 'git config --global user.name "Tu Nombre"'
            }
        }
        stage('Build') {
            steps {
                echo 'Building..'
            }
        }
        stage('Test') {
            steps {
                echo 'Testing..'
            }
        }
        stage('Deploy') {
            steps {
                echo 'Deploying....'
            }
        }
    }
}