pipeline {
  agent any
  stages {
    stage('build') {
      agent {
        docker {
          image 'docker.io/node:8.11.2-alpine'
        }

      }
      steps {
        echo 'Starting build the app.....'
        sh 'npm config set registry https://registry.npm.taobao.org'
        sh 'npm config set sass_binary_site https://npm.taobao.org/mirrors/node-sass/'
        sh 'npm install'
        sh 'npm run build'
        sh 'sed -i "s/dl-cdn.alpinelinux.org/mirrors.ustc.edu.cn/g" /etc/apk/repositories'
        sh 'apk add --update --no-cache openssh sshpass'
        script {
          if (env.BRANCH_NAME == 'master') {
            withCredentials(bindings: [usernamePassword(credentialsId: 'server-47.106.155.153', usernameVariable: 'USERNAME', passwordVariable: 'PASSWORD')]) {
              sh 'sshpass -p $PASSWORD ssh -v -o StrictHostKeyChecking=no $USERNAME@47.106.155.153 rm -rf /root/service/elpida-web'
              sh 'sshpass -p $PASSWORD ssh -v -o StrictHostKeyChecking=no $USERNAME@47.106.155.153 mkdir /root/service/elpida-web'
              sh 'sshpass -p $PASSWORD scp -v -o StrictHostKeyChecking=no docker-compose.yml $USERNAME@47.106.155.153:/root/service/elpida-web/docker-compose.yml'
              sh 'sshpass -p $PASSWORD scp -v -o StrictHostKeyChecking=no -r dist/* $USERNAME@47.106.155.153:/root/service/elpida-web/'
              sh 'sshpass -p $PASSWORD ssh -v -o StrictHostKeyChecking=no $USERNAME@47.106.155.153 docker-compose -f /root/service/elpida-web/docker-compose.yml stop '
              sh 'sshpass -p $PASSWORD ssh -v -o StrictHostKeyChecking=no $USERNAME@47.106.155.153 docker-compose -f /root/service/elpida-web/docker-compose.yml rm -f '
              sh 'sshpass -p $PASSWORD ssh -v -o StrictHostKeyChecking=no $USERNAME@47.106.155.153 docker-compose -f /root/service/elpida-web/docker-compose.yml up -d'
              bearychatSend 'elpida-web正式环境发布成功，访问地址为https://elpida.aimeow.com/'
            }
          }
        }

      }
    }
  }
}