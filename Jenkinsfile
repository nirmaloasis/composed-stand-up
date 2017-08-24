node {
  stage 'checkout'
      checkout scm

docker.image(env.DOCKER_REGISTRY + "/compozed/ci-base:0.6").inside('--privileged')  {
 withEnv(['HOME=.']){ 
  withCredentials(
    [usernamePassword
      (credentialsId: '3f4db467-b514-49b0-99be-2ff0e85d017f',
        passwordVariable: 'CF_PASSWORD',
        usernameVariable: 'CF_USERNAME')
      ])
    {
          stage "node module install"
              sh "npm install --verbose"  
          stage "Deploy Server"
              sh "cf login -a api.cf.nonprod-mpn.ro11.allstate.com -u ${CF_USERNAME} -p ${CF_PASSWORD} -o IS-COMPOZED-ACCELERATOR -s INT --skip-ssl-validation;cf push -f ./manifest.yml"
    }

 }
}
}