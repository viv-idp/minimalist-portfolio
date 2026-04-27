# Frontend CrashLoopBackOff - Fixes Applied

## Issues Found & Fixed

### 1. ✅ Incorrect Backend Service Name in nginx.conf
**Problem**: nginx.conf was referencing `http://backend:5000/` but Kubernetes service is named `backend-service`
**Fix**: Updated nginx.conf to use `http://backend-service:5000/`

```diff
- proxy_pass http://backend:5000/;
+ proxy_pass http://backend-service:5000/;
```

### 2. ✅ Missing Nginx Startup Command in Dockerfile
**Problem**: Dockerfile was missing CMD to start nginx with `daemon off`
**Fix**: Added proper docker CMD and health checks

```dockerfile
CMD ["nginx", "-g", "daemon off;"]

HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
    CMD wget --no-verbose --tries=1 --spider http://localhost/index.html || exit 1
```

### 3. ✅ Missing Kubernetes Health Checks
**Problem**: Pods had no liveness/readiness probes
**Fix**: Added HTTP health checks to both frontend and backend deployments

```yaml
livenessProbe:
  httpGet:
    path: /
    port: 80
  initialDelaySeconds: 10
  periodSeconds: 10
  failureThreshold: 3

readinessProbe:
  httpGet:
    path: /
    port: 80
  initialDelaySeconds: 5
  periodSeconds: 5
  failureThreshold: 2
```

### 4. ✅ No Resource Limits
**Problem**: Deployments had no resource requests/limits
**Fix**: Added resource limits to prevent resource starvation

**Frontend:**
- Requests: 100m CPU, 64Mi Memory
- Limits: 500m CPU, 256Mi Memory

**Backend:**
- Requests: 100m CPU, 128Mi Memory
- Limits: 500m CPU, 512Mi Memory

### 5. ✅ Image Pull Policy Not Set
**Problem**: Deployments might be using cached old images
**Fix**: Added `imagePullPolicy: Always` to both deployments

### 6. ✅ Inefficient Deployments in Jenkinsfile
**Problem**: Jenkins wasn't forcing image updates after push
**Fix**: Added `kubectl rollout restart` and `kubectl rollout status` to ensure deployments get latest images

```groovy
kubectl rollout restart deployment/backend-deployment -n $K8S_NAMESPACE
kubectl rollout restart deployment/frontend-deployment -n $K8S_NAMESPACE
kubectl rollout status deployment/backend-deployment -n $K8S_NAMESPACE --timeout=5m
kubectl rollout status deployment/frontend-deployment -n $K8S_NAMESPACE --timeout=5m
```

## Files Modified

1. **frontend/nginx.conf** - Backend service name reference
2. **frontend/Dockerfile** - Startup command and health check
3. **k8s/deployment.yaml** - Health checks and resource limits
4. **Jenkinsfile** - Deployment rollout and status checks

## ✅ Deployment Steps

### Option 1: Using Jenkins (Recommended)
1. Commit and push changes to GitHub
2. Jenkins will automatically trigger pipeline
3. Pipeline will build new images and deploy

```bash
git add .
git commit -m "Fix frontend CrashLoopBackOff and add health checks"
git push origin main
```

### Option 2: Manual Deployment

1. **Rebuild frontend image:**
```bash
cd frontend
docker build -t venky2222/minimalist-portfolio-frontend:latest .
docker push venky2222/minimalist-portfolio-frontend:latest
```

2. **Apply updated Kubernetes manifests:**
```bash
kubectl apply -f k8s/deployment.yaml
```

3. **Force restart deployments:**
```bash
kubectl rollout restart deployment/backend-deployment -n minimalist-portfolio-ns
kubectl rollout restart deployment/frontend-deployment -n minimalist-portfolio-ns
```

4. **Monitor deployment:**
```bash
kubectl rollout status deployment/frontend-deployment -n minimalist-portfolio-ns --timeout=5m
```

## Verification

Check if pods are running:
```bash
kubectl get pods -n minimalist-portfolio-ns
```

Expected output:
```
pod/backend-deployment-xxxxx    1/1     Running   0    2m
pod/frontend-deployment-xxxxx   1/1     Running   0    2m
```

Check logs:
```bash
kubectl logs -n minimalist-portfolio-ns deployment/frontend-deployment
kubectl logs -n minimalist-portfolio-ns deployment/backend-deployment
```

Access application:
```bash
# Get the node IP
kubectl get nodes -o wide

# Access via NodePort
http://<node-ip>:30080
```

## Additional Commands

### View pod details
```bash
kubectl describe pod -n minimalist-portfolio-ns <pod-name>
```

### View deployment details
```bash
kubectl describe deployment -n minimalist-portfolio-ns frontend-deployment
```

### Scale deployments (optional)
```bash
kubectl scale deployment/frontend-deployment --replicas=2 -n minimalist-portfolio-ns
kubectl scale deployment/backend-deployment --replicas=2 -n minimalist-portfolio-ns
```

### Port forward for local testing
```bash
kubectl port-forward -n minimalist-portfolio-ns svc/frontend-service 3000:80
# Access at http://localhost:3000
```

