pipeline {
  agent any

  stages {
    stage('Build Backend') {
      steps {
        sh "echo build"
        sh "cd ${env.WORKSPACE}/BackEnd && chmod +x ./gradlew && ./gradlew build"
      }
    }

    stage('Remove Containers') {
      steps {
        sh 'docker ps -f name=springboot -q | xargs --no-run-if-empty docker container stop'
        sh 'docker ps -f name=react -q | xargs --no-run-if-empty docker container stop'
        sh 'docker container ls -a -f name=springboot -q | xargs --no-run-if-empty -r docker container rm'
        sh 'docker container ls -a -f name=react -q | xargs -r --no-run-if-empty docker container rm'

      }
    }

    stage('Build Springboot Image') {
      steps {
        script {
          def backendDir = "${env.WORKSPACE}/BackEnd"
          def dockerfile = "${backendDir}/Dockerfile"

          docker.build("springboot-image", "-f ${dockerfile} ${backendDir}")
        }
      }
    }

    stage('Build React.JS Image') {
      steps {
        script {
          def frontendDir = "${env.WORKSPACE}/FrontEnd"
          def dockerfile = "${frontendDir}/Dockerfile"

          docker.build("react-image", "-f ${dockerfile} ${frontendDir}")
        }
      }
    }

    stage('Run Containers') {
      steps {
        script {
          docker.networks.create('ssafystar-network')

          docker.image('springboot-image').run("-d --network ssafystar-network --name springboot -p 8080:8080")
          docker.image('react-image').run("-d --network ssafystar-network --name react -p 3000:3000")
        }
      }
    }
  }
}