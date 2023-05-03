pipeline {
  agent any

  stages {
    stage('Build Backend') {
      steps {
        sh "echo build"
        sh "cd ${env.WORKSPACE}/BackEnd && chmod +x ./gradlew && ./gradlew clean build"
      }
    }

    stage('Remove Containers') {
      steps {
        sh 'docker ps -f name=springboot-master -q | xargs --no-run-if-empty -r docker container stop'
        sh 'docker ps -f name=react-master -q | xargs --no-run-if-empty -r docker container stop'
        sh 'docker container ls -a -f name=springboot-master -q | xargs --no-run-if-empty -r docker container rm'
        sh 'docker container ls -a -f name=react-master -q | xargs --no-run-if-empty -r docker container rm'

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
          docker.image('springboot-image-master').run("-d --network ssafystar-network-master --name springboot -p 8081:8081")
          docker.image('react-image-master').run("-d --network ssafystar-network --name react -p 3001:3001")
        }
      }
    }
  }
}