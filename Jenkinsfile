pipeline {
    agent any
    triggers {
        GenericTrigger(
            genericVariables: [
                [ key: 'committer_name', value: '$.actor.displayName' ],
                [ key: 'committer_email', value: '$.actor.emailAddress' ],
                [ key: 'ref', value: '$.changes[0].refId'],
                [ key: 'tag', value: '$.changes[0].refId', regexpFilter: 'refs/tags/', defaultValue: 'v1.0'],
                [ key: 'commit', value: '$.changes[0].toHash' ],
                [ key: 'repo_slug', value: '$.repository.slug' ],
                [ key: 'project_key', value: '$.repository.project.key' ],
                [ key: 'clone_url', value: '$.repository.links.clone[0].href' ]
            ],

            causeString: '$committer_name pushed tag $tag to $clone_url referencing $commit',
            
            token: '3acf2811-8148-4e73-9a2b-d760c3dee985',
            
            printContributedVariables: true,
            printPostContent: true,
            
            regexpFilterText: '$ref',
            regexpFilterExpression: '^refs/tags/.*'
        )
    }

    stages {
        stage("Prepare") {
            steps {
                deleteDir()
                sh '''
                echo committer_name: $committer_name
                echo committer_email: $committer_email
                echo ref: $ref
                echo tag: $tag
                echo commit: $commit
                echo repo_slug: $repo_slug
                echo project_key: $project_key
                echo clone_url: $clone_url
                '''
            }
        }

        stage("Build") {
            steps {
                sh '''
                echo Validate that artifact version is $tag
                echo Or, set artifact version to $tag, without committing it or pushing!
                echo ./gradlew build
                '''
            }
        }

        stage("Upload") {
            steps {
                sh '''
                echo Uploading...
                '''
            }
        }
    }
}