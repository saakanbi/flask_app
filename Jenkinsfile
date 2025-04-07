pipeline {
    agent { label 'agent' }

    environment {
        PROJECT_DIR = "${WORKSPACE}" // Root of your workspace
    }

    stages {
        stage('Install Prerequisites on Agent') {
            steps {
                sh '''
                    sudo yum update -y
                    sudo yum install -y git ansible python3-pip curl unzip jq
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

        // ✅ INSERTED HERE
        stage('Update DNS via Cloudflare') {
            environment {
                CF_API_TOKEN = credentials('CF_API_TOKEN')
            }
            steps {
                sh '''
                    chmod +x ./update-cloudflare-dns.sh
                    ./update-cloudflare-dns.sh
                '''
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
