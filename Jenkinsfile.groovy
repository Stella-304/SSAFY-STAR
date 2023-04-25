pipeline {
  agent any

  stages {
    stage('connect test') {
      steps {
        sh "echo init"
      }
    }
      
    stage('Build Backend') {
      steps {
        sh "echo build"
        sh "cd ${env.WORKSPACE}/BackEnd && chmod +x ./gradlew && ./gradlew build"
      }
    }

    stage('Remove Containers') {
      steps {
        sh 'docker ps -aq --filter "name=springboot" | xargs docker stop'
        sh 'docker ps -aq --filter "name=springboot" | xargs docker rm'
        sh 'docker ps -aq --filter "name=react" | xargs docker stop'
        sh 'docker ps -aq --filter "name=react" | xargs docker rm'
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