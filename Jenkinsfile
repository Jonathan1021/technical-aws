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
                [ key: 'clone_url', value: '$.repository.clone_url' ],
                [ key: 'repo_name_full', value: '$.repository.full_name' ],
            ],
            causeString: '$committer_name pushed to $clone_url referencing $commit',
            token: 'technical-aws',
            printContributedVariables: false,
            printPostContent: false,

            regexpFilterText: '$ref',
            regexpFilterExpression: '^refs/(heads/(develop|main|master|nonprod|release\\/.*|feature\\/.*))$'
        )
    }

    environment {
        GITHUB_TOKEN = credentials('token-jenkins')
    }

    stages {
        stage('Git checkout') {
            steps {
                script {
                    checkout scm
                }
            }
        }
        stage('Build') {
            steps {
                script {
                    sh '''
                    printenv
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

    post {
        success {
            script {
                createTag()
            }
        }    
    }
}

def createTag() {
    def currentDate = new Date()
    def year = currentDate.format('yy')
    def month = currentDate.format('MM')
    def day = currentDate.format('dd')
    def hour = currentDate.format('HH')

    def tagSuffixMap = [
        'origin/develop': '-beta',     
        'origin/feature/*': '-beta', 
        'origin/release/*': '-rc'
        'default': ''
    ]

    def prefix = tagSuffixMap.get(env.GIT_BRANCH, tagSuffixMap['default'])

    def tag = "v${year}.${month}.${day}${prefix}.$BUILD_ID"

    // Usar el token para autenticar con GitHub y crear el tag
    sh """
        git config --global user.email "${env.committer_email}"
        git config --global user.name "${env.committer_name}"
        git tag ${tag}
        git push https://$GITHUB_TOKEN@github.com/${env.repo_name_full}.git ${tag}
    """
}
