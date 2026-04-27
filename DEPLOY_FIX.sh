#!/bin/bash

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

NAMESPACE="minimalist-portfolio-ns"

echo -e "${YELLOW}=== Deployment Fix Script ===${NC}"

# Step 1: Clean up old replicasets
echo -e "${YELLOW}Step 1: Cleaning up old replicasets...${NC}"
kubectl delete replicaset -n $NAMESPACE --all --cascade=foreground --grace-period=30 || true
sleep 5

# Step 2: Delete old pods to force recreation
echo -e "${YELLOW}Step 2: Deleting old pods...${NC}"
kubectl delete pods -n $NAMESPACE --all --grace-period=30 || true
sleep 5

# Step 3: Apply fresh deployments
echo -e "${YELLOW}Step 3: Applying deployment manifests...${NC}"
kubectl apply -f k8s/namespace.yaml
kubectl apply -f k8s/deployment.yaml

# Step 4: Wait for deployments
echo -e "${YELLOW}Step 4: Waiting for deployments to stabilize...${NC}"
kubectl rollout status deployment/backend-deployment -n $NAMESPACE --timeout=10m || true
kubectl rollout status deployment/frontend-deployment -n $NAMESPACE --timeout=10m || true

# Step 5: Verify
echo -e "${YELLOW}Step 5: Verifying deployment status...${NC}"
kubectl get all -n $NAMESPACE

echo -e "${GREEN}=== Deployment Complete ===${NC}"
echo -e "${GREEN}Access application at: http://<node-ip>:30080${NC}"
