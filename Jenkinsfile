pipeline {
    agent any
    triggers {
        GenericTrigger(
            genericVariables: [
                [ key: 'committer_name', value: '$.head_commit.author.name' ],
                [ key: 'committer_email', value: '$.head_commit.author.email' ],
                [ key: 'ref', value: '$.ref' ],
                [ key: 'commit', value: '$.head_commit.id' ],
                [ key: 'repo_name', value: '$.repository.name' ],
                [ key: 'clone_url', value: '$.repository.clone_url' ]
            ],
            causeString: '$committer_name pushed to $clone_url referencing $commit',
            token: 'technical-aws',
            printContributedVariables: true,
            printPostContent: true,

            regexpFilterText: '$ref',
            regexpFilterExpression: '^refs/(heads/(develop|main|master|nonprod|release\\/.*|feature\\/.*)|tags/v.*)$'
        )
    }

    environment {
        WORKSPACE = "${env.BUILD_URL}/{env.ref}"
    }

    stages {
        stage('Build') {
            steps {
                script {
                    sh '''
                    echo Hola Mundo release 3
                    currentBuild.displayName = "Build-${BUILD_NUMBER}-${BRANCH_NAME}-${GIT_COMMIT}"
                    echo "Build name set to: ${currentBuild.displayName}"

                    '''
                }
            }
        }

        stage('Upload') {
            steps {
                script {
                    sh '''
                    echo Uploading...
                    '''
                }
            }
        }

        stage('Email') {
            steps {
                script {
                    def subject = ""
                    def bodyText = ""
                    if (currentBuild.currentResult == 'SUCCESS') {
                        subject = "Released in ${env.repo_name}"
                        bodyText = """
                        Hi there!!

                        You pushed in ${env.clone_url} and it is now released.

                        Version was built from ${env.commit}

                        See job here: ${env.BUILD_URL}

                        See log here: ${env.BUILD_URL}consoleText
                        """
                    } else {
                        subject = "Failed to release in ${env.repo_name}"
                        bodyText = """
                        Hi there!!

                        You pushed in ${env.clone_url} and the release failed (${currentBuild.currentResult}).

                        See job here: ${env.BUILD_URL}

                        See log here: ${env.BUILD_URL}console
                        """
                    }
                    echo "Sending email with subject '${subject}' and content:\n${bodyText}"
                    //emailext subject: subject
                    // to: "${env.committer_email}",
                    // from: 'jenkins@company.com',
                    // body: bodyText
                }
            }
        }
    }
}
