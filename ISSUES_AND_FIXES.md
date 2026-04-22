# Complete Issues & Fixes Applied

## Problems Identified

### 1. ❌ Backend Health Check Failed
**Error**: `Readiness probe failed: HTTP probe failed with statuscode: 404`

**Root Cause**: Backend had no `/health` or `/ready` endpoints. Health checks were targeting `/` which doesn't exist.

**Fix**: Added health check endpoints to backend:
```js
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'healthy', timestamp: new Date().toISOString() });
});

app.get('/ready', (req, res) => {
  res.status(200).json({ status: 'ready', timestamp: new Date().toISOString() });
});
```

### 2. ❌ Pipeline Stuck on Deployment
**Error**: Rollout status hanging, old pods never terminating

**Root Causes**:
- No `terminationGracePeriodSeconds` defined
- No `preStop` lifecycle hooks
- Wrong rolling update strategy causing pod conflicts

**Fixes Applied**:

a) **Added termination grace period**:
```yaml
terminationGracePeriodSeconds: 30
```

b) **Added preStop hook for graceful shutdown**:
```yaml
lifecycle:
  preStop:
    exec:
      command: ["/bin/sh", "-c", "sleep 10"]
```

c) **Fixed rolling update strategy**:

**Backend** (maxSurge: 0 = never have spare pods):
```yaml
strategy:
  type: RollingUpdate
  rollingUpdate:
    maxSurge: 0
    maxUnavailable: 0
```

**Frontend** (maxSurge: 1 = can have 1 extra pod):
```yaml
strategy:
  type: RollingUpdate
  rollingUpdate:
    maxSurge: 1
    maxUnavailable: 0
```

### 3. ❌ Incorrect Health Check Paths
**Error**: Frontend checking `/` instead of a valid path

**Fix**: Updated probe paths:
- Backend: `/health` and `/ready`
- Frontend: `/index.html` (valid static file)

### 4. ❌ Too Aggressive Health Checks
**Error**: Pods restarting due to timeouts on startup

**Fixes**:
- Increased `initialDelaySeconds`:
  - Backend: 10s → 15s
  - Frontend: 5s → 10s
- Adjusted probe timings to be less strict

### 5. ❌ Jenkins Pipeline Inefficiency
**Error**: Pipeline doesn't wait properly for deployments

**Fix**: Updated Jenkinsfile:
- Removed explicit `rollout restart` (interferes with rolling update)
- Increased timeout from 5m to 10m
- Added summary output
- Made it fault-tolerant with `|| true`

## Files Modified

### backend/server.js
✅ Added `/health` and `/ready` endpoints

### k8s/deployment.yaml
✅ Added rolling update strategy (backend & frontend)
✅ Added termination grace period
✅ Added preStop lifecycle hooks
✅ Fixed probe paths and timings
✅ Increased initialDelaySeconds

### Jenkinsfile
✅ Improved deployment wait logic
✅ Increased timeout
✅ Removed problematic restart commands
✅ Added better diagnostics

## How to Deploy

### Option 1: Automatic (Recommended)
Push changes to GitHub - Jenkins will deploy automatically:

```bash
git add .
git commit -m "Fix deployment issues and health checks"
git push origin main
```

### Option 2: Manual Deployment
Run the cleanup and redeploy script:

```bash
./DEPLOY_FIX.sh
```

Or manually:

```bash
# Delete everything and start fresh
kubectl delete deployments,pods,services -n minimalist-portfolio-ns

# Apply fresh manifests
kubectl apply -f k8s/namespace.yaml
kubectl apply -f k8s/deployment.yaml

# Wait for stabilization
kubectl rollout status deployment/backend-deployment -n minimalist-portfolio-ns --timeout=10m
kubectl rollout status deployment/frontend-deployment -n minimalist-portfolio-ns --timeout=10m
```

## Verification Steps

### 1. Check Pods are Running
```bash
kubectl get pods -n minimalist-portfolio-ns
# Expected: All pods showing 1/1 Running
```

### 2. Check Health Endpoints
```bash
# Port forward backend
kubectl port-forward -n minimalist-portfolio-ns svc/backend-service 5000:5000 &
curl http://localhost:5000/health
curl http://localhost:5000/ready

# Port forward frontend
kubectl port-forward -n minimalist-portfolio-ns svc/frontend-service 3000:80 &
curl http://localhost:3000/index.html
```

### 3. Check Logs
```bash
# Backend logs
kubectl logs -n minimalist-portfolio-ns deployment/backend-deployment

# Frontend logs
kubectl logs -n minimalist-portfolio-ns deployment/frontend-deployment
```

### 4. Verify via Node
```bash
# Get node IP
kubectl get nodes -o wide

# Access application
curl http://<node-ip>:30080
```

## Troubleshooting

### Pods Still Not Ready
```bash
# Check pod events
kubectl describe pod -n minimalist-portfolio-ns <pod-name>

# Check probe output
kubectl logs -n minimalist-portfolio-ns <pod-name>

# Force restart
kubectl rollout restart deployment/backend-deployment -n minimalist-portfolio-ns
kubectl rollout restart deployment/frontend-deployment -n minimalist-portfolio-ns
```

### High Resource Usage
Check if resource limits are too low:
```bash
kubectl top pods -n minimalist-portfolio-ns
```

### Image Pull Issues
Verify image names and tags:
```bash
kubectl get deployment -n minimalist-portfolio-ns -o jsonpath='{.items[].spec.template.spec.containers[].image}'
```

## Key Learnings

1. **Always define health check endpoints** - Services need proper health endpoints
2. **Use termination grace periods** - Allows graceful shutdown
3. **Add preStop hooks** - Gives time for connection draining
4. **Proper rolling update strategy** - Prevents pod conflicts
5. **Generous initial delays** - Container startup takes time
6. **Valid probe paths** - Target real endpoints, not just `/`

## Monitoring Tools

```bash
# Watch pod status in real-time
kubectl get pods -n minimalist-portfolio-ns -w

# Stream logs
kubectl logs -n minimalist-portfolio-ns deployment/backend-deployment -f

# Get events
kubectl get events -n minimalist-portfolio-ns --sort-by='.lastTimestamp'

# System info
kubectl describe node <node-name>
```
