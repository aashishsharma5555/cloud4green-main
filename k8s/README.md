# Cloud4Green Kubernetes Deployment

## Prerequisites

The AKS cluster must contain exactly two worker nodes.

```powershell
az aks nodepool scale `
  --resource-group Hex-user `
  --cluster-name cloud4green-aks `
  --name agentpool `
  --node-count 2
```

## Install the Metrics Server

AKS already includes Metrics Server. Verify it before applying the HPA:

```powershell
kubectl get deployment metrics-server -n kube-system
kubectl get apiservice v1beta1.metrics.k8s.io
```

If unavailable, install the Metrics Server:

```powershell
kubectl apply -f https://github.com/kubernetes-sigs/metrics-server/releases/latest/download/components.yaml
kubectl top nodes
kubectl top pods -n cloud4green
```

## Install the Ingress Controller

```powershell
helm repo add ingress-nginx https://kubernetes.github.io/ingress-nginx
helm repo update
helm upgrade --install ingress-nginx ingress-nginx/ingress-nginx `
  --namespace ingress-nginx `
  --create-namespace `
  --set controller.service.type=LoadBalancer
kubectl get ingressclass
kubectl get service ingress-nginx-controller -n ingress-nginx
```

## TLS Secret

The manifest reserves TLS through `cloud4green-tls`. Create it with a certificate for
`cloud4green.com` and `www.cloud4green.com`:

```powershell
kubectl create secret tls cloud4green-tls `
  -n cloud4green `
  --cert=path/to/tls.crt `
  --key=path/to/tls.key
```

If cert-manager is installed later, its `ClusterIssuer` and certificate can replace this secret.

## Deploy

```powershell
kubectl apply -k k8s
kubectl rollout status deployment/cloud4green -n cloud4green
kubectl get pods -n cloud4green -o wide
kubectl get service,hpa,pdb,ingress -n cloud4green
```

## Verify HPA, Health, and Recovery

```powershell
kubectl get hpa cloud4green -n cloud4green --watch
kubectl get pods -n cloud4green -o wide
kubectl get nodes -o wide
kubectl describe pod -n cloud4green -l app.kubernetes.io/name=cloud4green
```

To recover a failed pod:

```powershell
kubectl delete pod -n cloud4green <pod-name>
```

The Deployment controller restarts containers or replaces deleted pods automatically.

## External Egress Dependencies

No server-side HTTP/API client dependencies were found in the repository. Browser-loaded services
include the Microsoft Booking iframe at `bookings.cloud.microsoft`, the LinkedIn URL, and the
Spline scene hosted by `prod.spline.design`; these execute in the user's browser and are not
outbound requests from application pods.

The `cloud4green-egress` policy allows DNS and namespace-local traffic only. Do not add external
domains or CIDRs until a server-side dependency is identified. Kubernetes NetworkPolicy cannot
filter arbitrary public domains reliably; verified destinations must be added by IP/CIDR or through
a controlled egress proxy.
