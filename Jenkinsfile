pipeline {
    agent { label 'agent' }

    environment {
        PROJECT_DIR = "${WORKSPACE}" // Now it points to the root directly
    }

    stages {
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
