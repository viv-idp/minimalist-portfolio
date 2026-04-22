pipeline {
    agent any

    environment {
        DOCKER_HUB_REPO = 'venky2222/minimalist-portfolio'
        K8S_SERVER = 'https://10.128.0.8:6443'
        K8S_NAMESPACE = 'minimalist-portfolio-ns'
    }

    triggers {
        githubPush()
    }

    options {
        buildDiscarder(logRotator(numToKeepStr: '10'))
        timestamps()
    }

    stages {
        stage('Checkout') {
            steps {
                git branch: 'main', url: 'https://github.com/viv-idp/minimalist-portfolio.git'
            }
        }

        stage('Build Backend Image') {
            steps {
                dir('backend') {
                    sh 'docker build -t $DOCKER_HUB_REPO-backend:$BUILD_NUMBER .'
                    sh 'docker tag $DOCKER_HUB_REPO-backend:$BUILD_NUMBER $DOCKER_HUB_REPO-backend:latest'
                }
            }
        }

        stage('Build Frontend Image') {
            steps {
                dir('frontend') {
                    sh 'docker build -t $DOCKER_HUB_REPO-frontend:$BUILD_NUMBER .'
                    sh 'docker tag $DOCKER_HUB_REPO-frontend:$BUILD_NUMBER $DOCKER_HUB_REPO-frontend:latest'
                }
            }
        }

        stage('Push Images to Docker Hub') {
            steps {
                withCredentials([usernamePassword(credentialsId: 'docker-hub-creds', usernameVariable: 'DOCKER_USER', passwordVariable: 'DOCKER_PASS')]) {
                    sh 'echo $DOCKER_PASS | docker login -u $DOCKER_USER --password-stdin'
                    sh 'docker push $DOCKER_HUB_REPO-backend:$BUILD_NUMBER'
                    sh 'docker push $DOCKER_HUB_REPO-backend:latest'
                    sh 'docker push $DOCKER_HUB_REPO-frontend:$BUILD_NUMBER'
                    sh 'docker push $DOCKER_HUB_REPO-frontend:latest'
                }
            }
        }

        stage('Deploy to Kubernetes') {
            steps {
                withCredentials([string(credentialsId: 'jenkins-k8s-token', variable: 'K8S_TOKEN')]) {
                    sh '''
                        kubectl config set-cluster k8s-cluster --server=$K8S_SERVER --insecure-skip-tls-verify=true
                        kubectl config set-credentials jenkins --token=$K8S_TOKEN
                        kubectl config set-context k8s-context --cluster=k8s-cluster --user=jenkins --namespace=$K8S_NAMESPACE
                        kubectl config use-context k8s-context
                        kubectl apply -f k8s/namespace.yaml
                        kubectl apply -f k8s/deployment.yaml
                        
                        echo "Waiting for backend deployment to be ready..."
                        kubectl rollout status deployment/backend-deployment -n $K8S_NAMESPACE --timeout=10m || true
                        
                        echo "Waiting for frontend deployment to be ready..."
                        kubectl rollout status deployment/frontend-deployment -n $K8S_NAMESPACE --timeout=10m || true
                        
                        echo "Deployment Summary:"
                        kubectl get deployments,pods,svc -n $K8S_NAMESPACE
                    '''
                }
            }
        }
    }

    post {
        always {
            sh 'docker system prune -f'
        }
        success {
            echo 'Pipeline succeeded!'
        }
        failure {
            echo 'Pipeline failed!'
        }
    }
}
// added line to trigger pipeline on commit to main branch