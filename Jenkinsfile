node {
 properties([
  pipelineTriggers([
    [$class: 'GenericTrigger',
      genericVariables: [
      [ key: 'committer_name', value: '$.head_commit.author.name' ],
      [ key: 'committer_email', value: '$.head_commit.author.email' ],
      [ key: 'ref', value: '$.ref'],
      // [ key: 'tag', value: '$.changes[0].refId', regexpFilter: 'refs/tags/'],
      [ key: 'commit', value: '$.head_commit.id' ],
      [ key: 'repo_name', value: '$.repository.name' ],
      [ key: 'clone_url', value: '$.repository.clone_url' ]
      ],
      
      causeString: '$committer_name pushed tag  to $clone_url referencing $commit',
      
      token: 'abc123',
    ]
  ])
 ])

 stage("Prepare") {
  deleteDir()
  sh '''
  echo git clone $clone_url
  echo git checkout $commit
  sleep 1
  '''
 }

 stage("Build") {
  sh '''
  echo Validate that artifact version is 
  echo Or, set artifact version to , without committing it or pushing!
  echo ./gradlew build
  sleep 2
  '''
 }

 stage("Upload") {
  sh '''
    echo Uploading...
    sleep 1
  '''
 }

 stage("Email") {
   def subject = ""
   def bodyText = ""
   if (currentBuild.currentResult == 'SUCCESS') {
   subject = "Released  in $repo_name"
   bodyText = """
    Hi there!!
    
    You pushed in $clone_url and it is now released.

    Version  was built from $commit
    
    See job here: $BUILD_URL

    See log here: $BUILD_URL/consoleText
    """
   } else {
   subject = "Failed to release  in $repo_name"
   bodyText = """
    Hi there!!
    
    You pushed  in $clone_url and the release failed (${currentBuild.currentResult}).
    
    See job here: $BUILD_URL

    See log here: $BUILD_URL/consoleText
    """
   }
   echo "Sending email with subject '$subject' and content:\n$bodyText"
   //emailext subject: subject
   // to: "$committer_email",
   // from: 'jenkins@company.com',
   // body: bodyText
 }

}