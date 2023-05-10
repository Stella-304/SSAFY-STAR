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
        sh 'docker ps -f name=springboot -q | xargs --no-run-if-empty -r docker container stop'
        sh 'docker ps -f name=react -q | xargs --no-run-if-empty -r docker container stop'
        sh 'docker container ls -a -f name=springboot -q | xargs --no-run-if-empty -r docker container rm'
        sh 'docker container ls -a -f name=react -q | xargs --no-run-if-empty -r docker container rm'

      }
    }

    stage('Remove Images') {
      steps {
        sh 'docker images springboot-image:latest -q | xargs --no-run-if-empty -r docker rmi'
        sh 'docker images react-image:latest -q | xargs --no-run-if-empty -r docker rmi'
      }
    }

//    stage('Remove Volume') {
//      steps {
//        sh 'docker volume ssafy-star-volume -q | xargs --no-run-if-empty -r docker volume rm'
//      }
//    }

//    stage('Create Volume') {
//      steps {
//        sh 'docker volume create --name ssafy-star-volume -d local --opt type=none --opt device=/usr/share/nginx/html --opt o=bind'
//      }
//    }

    stage('Build Springboot Image') {
      steps {
        script {
          def backendDir = "${env.WORKSPACE}/BackEnd"
          def dockerfile = "${backendDir}/Dockerfile"

          docker.build("springboot-image", "-f ${dockerfile} ${backendDir}")
        }

        sh 'docker inspect --format='{{.GraphDriver.Data.UpperDir}}' react-image -q | xargs --no-run-if-empty -r'
      }
    }

    stage('Build React.JS Image') {
      steps {
        script {
          def frontendDir = "${env.WORKSPACE}/FrontEnd"
          def dockerfile = "${frontendDir}/Dockerfile"

          docker.build("react-image", "-f ${dockerfile} ${frontendDir}")
        }
        sh 'sudo rm -rf /usr/host/share/nginx/html/*'
        sh 'cp -r $(docker inspect --format='{{.GraphDriver.Data.UpperDir}}/app' react-image)/* /usr/host/share/nginx/html'
      }
    }

    stage('Run Containers') {
      steps {
        script {
          docker.image('springboot-image').run("--name springboot -p 8080:8080")
          // docker.image('react-image').run("-v ssafy-star-volume:/usr/share/nginx/html --name react -p 3000:3000")
        }
      }
    }
  }
}
