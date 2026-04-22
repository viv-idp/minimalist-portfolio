# CI/CD Pipeline Setup Guide

## Project Structure
```
minimalist-portfolio/
├── Jenkinsfile              # Main pipeline configuration (ROOT)
├── backend/
│   ├── Dockerfile
│   ├── package.json
│   ├── server.js
│   └── .env.local
├── frontend/
│   ├── Dockerfile
│   ├── package.json
│   ├── index.tsx
│   └── nginx.conf
├── k8s/                     # Kubernetes manifests (ROOT)
│   ├── namespace.yaml
│   └── deployment.yaml
└── docker-compose.yml
```

## Prerequisites

### On Jenkins Server
- Docker installed and running
- kubectl installed and configured
- git installed
- Access to GitHub repository

### Credentials Setup in Jenkins
Create the following credentials:

1. **docker-hub-creds** (Username/Password)
   - Username: `venky2222`
   - Password: Your Docker Hub token/password

2. **jenkins-k8s-token** (Secret text)
   - Secret: Kubernetes service account token

### GitHub Webhook Setup

#### Step 1: Configure Jenkins GitHub Plugin
1. Go to **Manage Jenkins** → **Configure System**
2. Find **GitHub** section
3. Add GitHub Server:
   - Name: `GitHub`
   - API URL: `https://api.github.com`
   - Credentials: (if your repo is private, add GitHub token)

#### Step 2: Configure GitHub Webhook
1. Go to your GitHub repository: https://github.com/viv-idp/minimalist-portfolio
2. Navigate to **Settings** → **Webhooks**
3. Click **Add webhook**
4. Fill in the details:
   - **Payload URL**: `http://your-jenkins-server:8080/github-webhook/`
   - **Content type**: `application/json`
   - **Events**: Select "Push events" (or "Just the push event")
   - **Active**: ✓ (checked)
5. Click **Add webhook**

#### Step 3: Create Jenkins Pipeline Job
1. Go to Jenkins dashboard
2. Click **New Item**
3. Enter job name: `minimalist-portfolio-pipeline`
4. Select **Pipeline**
5. Click **OK**
6. Under **Build Triggers**, check:
   - ✓ **GitHub hook trigger for GITScm polling**
7. Under **Pipeline**:
   - Definition: **Pipeline script from SCM**
   - SCM: **Git**
   - Repository URL: `https://github.com/viv-idp/minimalist-portfolio.git`
   - Branch: `*/main`
   - Script Path: `Jenkinsfile`
8. Click **Save**

### Pipeline Flow

```
Commit to GitHub
    ↓
GitHub sends webhook to Jenkins
    ↓
Jenkins Pipeline Triggered
    ↓
Stage 1: Checkout (Pull latest code)
    ↓
Stage 2: Build Backend Image (docker build)
    ↓
Stage 3: Build Frontend Image (docker build)
    ↓
Stage 4: Push Images to Docker Hub (docker push)
    ↓
Stage 5: Deploy to Kubernetes (kubectl apply)
    ↓
Post: Cleanup (docker system prune)
```

## Pipeline Stages Explained

### 1. Checkout
- Clones the repository from GitHub branch `main`
- Triggered by GitHub webhook

### 2. Build Backend Image
- Navigates to `backend/` directory
- Builds Docker image: `venky2222/minimalist-portfolio-backend:BUILD_NUMBER`
- Tags as latest: `venky2222/minimalist-portfolio-backend:latest`

### 3. Build Frontend Image
- Navigates to `frontend/` directory
- Builds Docker image: `venky2222/minimalist-portfolio-frontend:BUILD_NUMBER`
- Tags as latest: `venky2222/minimalist-portfolio-frontend:latest`

### 4. Push Images to Docker Hub
- Logs into Docker Hub using stored credentials
- Pushes both build-numbered and latest tags
- Images stored at: `docker.io/venky2222/minimalist-portfolio-*`

### 5. Deploy to Kubernetes
- Configures kubectl with Kubernetes cluster credentials
- Creates/updates namespace: `minimalist-portfolio-ns`
- Deploys services and pods from `k8s/deployment.yaml`
- Frontend accessible via NodePort 30080

## Accessing the Application

After successful deployment:

```bash
# Check deployment status
kubectl get deployments -n minimalist-portfolio-ns

# Check pods
kubectl get pods -n minimalist-portfolio-ns

# Check services
kubectl get services -n minimalist-portfolio-ns

# Forward port locally (optional)
kubectl port-forward -n minimalist-portfolio-ns svc/frontend-service 3000:80
```

Access application:
- **URL**: `http://<kubernetes-node-ip>:30080`
- **Backend API**: `http://backend-service:5000` (internal)

## Troubleshooting

### Webhook not triggering?
- Verify GitHub webhook delivery in repo settings (Settings → Webhooks → Recent Deliveries)
- Check Jenkins logs: `docker logs jenkins` or check Jenkins UI logs
- Ensure Jenkins URL is publicly accessible from GitHub

### Docker build fails?
- Check Docker is running on Jenkins agent
- Verify Dockerfile paths are correct
- Check available disk space

### Kubernetes deployment fails?
- Verify kubectl is configured: `kubectl config view`
- Check if namespace exists: `kubectl get namespaces`
- Verify service account token is valid
- Check cluster connectivity: `kubectl cluster-info`

### Credentials issues?
- Verify credentials IDs match exactly (case-sensitive)
- Test Docker Hub login: `docker login -u venky2222`
- Test Kubernetes token: `kubectl auth can-i get pods --as=system:serviceaccount:default:jenkins`

## Monitoring & Logs

### View Jenkins Build Logs
1. Go to Jenkins job
2. Click build number
3. View **Console Output**

### View Kubernetes Logs
```bash
# Backend logs
kubectl logs -n minimalist-portfolio-ns deployment/backend-deployment

# Frontend logs
kubectl logs -n minimalist-portfolio-ns deployment/frontend-deployment

# Real-time logs
kubectl logs -n minimalist-portfolio-ns deployment/backend-deployment -f
```

## Next Steps

1. Test the webhook by pushing a commit
2. Monitor the first pipeline run
3. Verify application is accessible
4. Set up monitoring and alerting
5. Implement automated rollbacks on failure

