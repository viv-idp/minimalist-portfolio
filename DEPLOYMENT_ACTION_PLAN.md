# 🚀 DEPLOYMENT ACTION PLAN

## ✅ All Fixes Applied

| Issue | Status | Solution |
|-------|--------|----------|
| Backend 404 health check | ✅ Fixed | Added `/health` and `/ready` endpoints |
| Pipeline stuck | ✅ Fixed | Added grace period, preStop hooks, better strategy |
| Incorrect probe paths | ✅ Fixed | Updated to valid endpoints |
| Aggressive health checks | ✅ Fixed | Increased initialDelaySeconds |
| Jenkins timeout | ✅ Fixed | Increased to 10m |

---

## 🎯 IMMEDIATE NEXT STEPS

### Step 1: Commit & Push Changes
```bash
git add -A
git commit -m "Fix all deployment issues: health checks, rolling strategy, probe paths"
git push origin main
```

**Time:** ~30 seconds

### Step 2: Jenkins Pipeline Executes
- GitHub webhook triggers Jenkins
- Pipeline runs automatically
- Watch the console output

**Time:** ~5 minutes

### Step 3: Verify Deployment
```bash
# In your k8s-master terminal
kubectl get pods -n minimalist-portfolio-ns -w
```

Expected output (within 2-3 minutes):
```
NAME                                   READY   STATUS    RESTARTS
backend-deployment-xxxxx               1/1     Running   0
frontend-deployment-xxxxx              1/1     Running   0
```

---

## 🔧 IF JENKINS FAILS

### Run Manual Fix Script
```bash
cd /path/to/minimalist-portfolio
./DEPLOY_FIX.sh
```

OR manually:

```bash
# 1. Delete old resources
kubectl delete deployments,pods -n minimalist-portfolio-ns --grace-period=30

# 2. Wait for termination
sleep 10

# 3. Reapply manifests
kubectl apply -f k8s/deployment.yaml

# 4. Monitor
kubectl rollout status deployment/backend-deployment -n minimalist-portfolio-ns --timeout=10m
kubectl rollout status deployment/frontend-deployment -n minimalist-portfolio-ns --timeout=10m
```

---

## ✅ VERIFICATION CHECKLIST

Once deployments complete, verify:

- [ ] **Pods Running**
```bash
kubectl get pods -n minimalist-portfolio-ns
# Should show: 1/1 Running for all pods
```

- [ ] **Health Endpoints Responding**
```bash
kubectl port-forward -n minimalist-portfolio-ns svc/backend-service 5000:5000 &
curl http://localhost:5000/health
# Should return: {"status":"healthy",...}
```

- [ ] **Frontend Accessible**
```bash
# Get node IP
NODE_IP=$(kubectl get nodes -o jsonpath='{.items[0].status.addresses[?(@.type=="InternalIP")].address}')
curl http://$NODE_IP:30080/index.html
# Should return: HTML content
```

- [ ] **No Restart Loops**
```bash
kubectl describe pod -n minimalist-portfolio-ns <backend-pod-name>
# Check "Restart Count: 0"
```

---

## 📊 MONITORING COMMANDS

### Real-time Pod Status
```bash
watch -n 1 'kubectl get pods -n minimalist-portfolio-ns'
```

### Live Logs
```bash
# Backend
kubectl logs -n minimalist-portfolio-ns deployment/backend-deployment -f

# Frontend
kubectl logs -n minimalist-portfolio-ns deployment/frontend-deployment -f
```

### Detailed Pod Info
```bash
kubectl describe pod -n minimalist-portfolio-ns <pod-name>
```

### Top Resource Usage
```bash
kubectl top pods -n minimalist-portfolio-ns
```

---

## 📈 SUCCESS INDICATORS

✅ All criteria should match:

1. **Pods Status**: `1/1 Running`
2. **Ready Count**: All replicas ready
3. **Restart Count**: 0 (no loops)
4. **Age**: > 2 minutes (stable)
5. **Events**: No recent "Unhealthy" warnings
6. **HTTP Endpoints**: Responding with 200 status
7. **Frontend**: Accessible at `http://<node-ip>:30080`

---

## 🔄 IF STILL HAVING ISSUES

### Check Backend Logs
```bash
kubectl logs -n minimalist-portfolio-ns deployment/backend-deployment --tail=50
```
Look for:
- "Vertex AI Backend listening" = Started successfully
- Errors in connection/startup

### Check Frontend Logs  
```bash
kubectl logs -n minimalist-portfolio-ns deployment/frontend-deployment --tail=50
```
Look for:
- Nginx config errors
- Port binding issues

### Force Clean Redeploy
```bash
# Nuclear option - delete namespace and recreate
kubectl delete namespace minimalist-portfolio-ns
sleep 5
kubectl apply -f k8s/namespace.yaml
kubectl apply -f k8s/deployment.yaml
kubectl rollout status deployment/backend-deployment -n minimalist-portfolio-ns --timeout=10m
kubectl rollout status deployment/frontend-deployment -n minimalist-portfolio-ns --timeout=10m
```

---

## 📝 NOTES

- **Health checks** now target real endpoints: `/health`, `/ready`, `/index.html`
- **Grace period** allows connections to drain before shutdown
- **preStop hooks** give containers 10 seconds to finish requests
- **Rolling update** prevents simultaneous pod replacement conflicts
- **Longer timeouts** account for image pulls and startup time

---

## 🎉 EXPECTED TIMELINE

```
T+0m:  Push to GitHub
T+1m:  Jenkins triggered by webhook
T+2m:  Images built and pushed
T+3m:  Deployment starts
T+5m:  Pods running and ready
T+6m:  Application accessible
```

---

**Status**: Ready to deploy ✅
**All files**: Committed and ready
**Jenkins**: Waiting for trigger

Next action: Push to GitHub! 🚀
