pipeline {
    agent { label 'agent' } // Replace with actual agent label or use 'any'

    environment {
        PROJECT_DIR = "${WORKSPACE}/project"
    }

    stages {
        stage('Package Flask App') {
            steps {
                dir('project') {
                    sh '''
                        tar -czvf app.tar.gz app/
                        sha256sum app.tar.gz > hash.txt
                    '''
                }
            }
        }

        stage('Archive Artifacts') {
            steps {
                archiveArtifacts artifacts: 'project/app.tar.gz, project/hash.txt', fingerprint: true
            }
        }

        stage('Run Ansible Deployment') {
            steps {
                dir('project/ansible') {
                    sh '''
                        ansible-playbook -i inventory.ini site.yml
                    '''
                }
            }
        }
    }

    post {
        success {
            echo '✅ Deployment complete! Visit your app via EC2 public IP.'
        }
        failure {
            echo '❌ Deployment failed. Check the console output above for details.'
        }
    }
}
