pipeline {
    agent { label 'agent' }

    environment {
        PROJECT_DIR = "${WORKSPACE}" // Root of your workspace
    }

    stages {
        stage('Install Prerequisites on Agent') {
            steps {
                sh '''
                    sudo apt update
                    sudo apt install -y git ansible python3-pip curl unzip
                '''
            }
        }

        stage('Package Flask App') {
            steps {
                sh '''
                    tar -czvf app.tar.gz app/
                    sha256sum app.tar.gz > hash.txt
                '''
            }
        }

        stage('Archive Artifacts') {
            steps {
                archiveArtifacts artifacts: 'app.tar.gz, hash.txt', fingerprint: true
            }
        }

        stage('Run Ansible Deployment') {
            steps {
                sh 'cp app.tar.gz hash.txt ansible/'
                dir('ansible') {
                    sh 'ansible-playbook -i ../inventory.ini site.yml'
                }
            }
        }
    }

    post {
        success {
            echo '✅ Deployment complete! Visit your app on the server.'
        }
        failure {
            echo '❌ Deployment failed. Check the logs above.'
        }
    }
}
// This Jenkinsfile is designed to run on a Jenkins agent with the label 'agent'.
// It installs prerequisites, packages a Flask app, archives artifacts, and runs an Ansible deployment.
// The pipeline consists of several stages:
// 1. **Install Prerequisites on Agent**: Installs necessary packages on the Jenkins agent.             