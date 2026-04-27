export const portfolioData = {
  personal: {
    name: "Bandi Venkatesh",
    role: "DevOps Engineer",
    roles: ["DevOps Engineer", "Cloud Architect", "Kubernetes Specialist", "Platform Engineer"],
    tagline: "Kubernetes | Cloud Infrastructure",
    location: "Hyderabad, India",
    phone: "+91-8555012224",
    email: "bandivenky2222@gmail.com",
    linkedin: "www.linkedin.com/in/venkatesh-bandi-819a9420a",
    github: "github.com/Bandi-Events",
    resumeUrl: "/Bandi_Venkatesh_DevOps_Resume.pdf",
    summary: "DevOps Engineer focused on building and operating production-grade Kubernetes platforms on Google Cloud Platform. Experienced in GKE, Terraform, CI/CD, GitOps, and observability for multi-tenant SaaS and high-traffic applications. Strong at debugging complex Kubernetes issues and driving reliability, performance, and cost efficiency in cloud environments."
  },
  stats: [
    { label: "Years Experience", value: 4, suffix: "+" },
    { label: "Environments Managed", value: 15, suffix: "+" },
    { label: "Cloud Certifications", value: 2, suffix: "" },
    { label: "Production Clusters", value: 10, suffix: "+" },
  ],
  skills: [
    {
      category: "Kubernetes & Containers",
      icon: "⎈",
      items: ["Kubernetes", "Deployments", "StatefulSets", "RBAC", "Network Policies", "Resource Quotas", "Docker", "Helm", "Kustomize", "GKE"]
    },
    {
      category: "Cloud & Infrastructure",
      icon: "☁",
      items: ["Google Cloud Platform (GCP)", "Compute Engine", "Cloud SQL", "Cloud Storage", "Terraform (IaC)", "Ansible"]
    },
    {
      category: "CI/CD & Automation",
      icon: "⚙",
      items: ["Jenkins", "GitLab CI/CD", "Google Cloud Build", "Git/GitHub", "DevSecOps"]
    },
    {
      category: "Observability",
      icon: "📊",
      items: ["Prometheus", "Grafana", "Datadog", "Kubernetes Metrics Server"]
    },
    {
      category: "Scripting & OS",
      icon: "🐧",
      items: ["Bash/Shell", "YAML", "Linux"]
    }
  ],
  experience: [
    {
      title: "DevOps Engineer",
      company: "Uncommon Design Services",
      period: "03/2025 - Present",
      responsibilities: [
        "Architected and managed GKE-based platforms for multiple fintech, e-commerce, and on-demand delivery products, with isolated namespaces and clear resource boundaries per client.",
        "Implemented standardized CI/CD pipelines for mobile and web backends, enabling fast, repeatable deployments across environments.",
        "Deployed and tuned Prometheus and Grafana dashboards for production workloads to improve visibility into latency, errors, and saturation.",
        "Optimized GCP spend by applying rightsizing, autoscaling policies, and spot instances across client Kubernetes workloads.",
        "Collaborated closely with development teams to define deployment patterns, rollout strategies, and environment promotion workflows."
      ]
    },
    {
      title: "DevOps Engineer",
      company: "WFM Technologies Pvt. Ltd",
      period: "01/2024 - 02/2025",
      responsibilities: [
        "Served as dedicated DevOps engineer for a US-based pharmacy management SaaS platform serving thousands of pharmacy locations.",
        "Deployed and managed production GKE clusters, including database-backed services using StatefulSets and containerized microservices with Docker.",
        "Built CI/CD pipelines with Jenkins and GitLab CI/CD, integrating tests, vulnerability scans, and blue-green deployments for safer releases.",
        "Implemented DevSecOps controls such as vulnerability scanning, security checks, and infrastructure hardening aligned with healthcare data needs.",
        "Tuned Kubernetes resource requests/limits and autoscaling to handle variable pharmacy transaction volumes without over-provisioning."
      ]
    },
    {
      title: "Process Executive (Cloud & DevOps Operations)",
      company: "Cognizant Technology Solutions India Pvt. Ltd",
      period: "06/2021 - 12/2023",
      responsibilities: [
        "Started in Google Maps geospatial operations and transitioned into cloud/DevOps after completing GCP Associate Cloud Engineer training.",
        "Earned Google Cloud Associate Cloud Engineer certification (May 2022) through a company-sponsored training program.",
        "Supported GCP infrastructure projects, including Kubernetes deployments on GKE and automated provisioning using Python scripts and GCP APIs.",
        "Contributed to CI/CD implementations with Jenkins and Google Cloud Build, and managed Linux VMs, containers, and monitoring for cloud resources."
      ]
    }
  ],
  projects: [
    {
      title: "Multi-Tenant GKE Platform",
      description: "Designed and deployed a production-grade multi-tenant Kubernetes platform on GKE for fintech and e-commerce clients with namespace isolation, RBAC, and resource quotas.",
      tech: ["GKE", "Terraform", "Helm", "RBAC", "Network Policies"],
      category: "Platform Engineering"
    },
    {
      title: "GitOps CI/CD Pipeline",
      description: "Built end-to-end CI/CD pipelines with Jenkins and GitLab CI/CD, featuring automated testing, vulnerability scanning, blue-green deployments, and GitOps-driven promotion across 15+ environments.",
      tech: ["Jenkins", "GitLab CI", "ArgoCD", "Docker", "Helm"],
      category: "CI/CD"
    },
    {
      title: "Observability Stack",
      description: "Deployed and configured a full observability stack with Prometheus, Grafana, and Datadog for real-time monitoring of latency, error rates, and resource saturation across production clusters.",
      tech: ["Prometheus", "Grafana", "Datadog", "Alertmanager"],
      category: "Monitoring"
    },
    {
      title: "Infrastructure as Code",
      description: "Automated provisioning of GCP resources including VPCs, GKE clusters, Cloud SQL, and IAM using Terraform modules with state management and drift detection.",
      tech: ["Terraform", "GCP", "Cloud SQL", "VPC", "IAM"],
      category: "IaC"
    },
    {
      title: "DevSecOps Pipeline",
      description: "Integrated security scanning (Trivy, SonarQube) into CI/CD pipelines, implemented Pod Security Standards, and hardened Kubernetes clusters for healthcare compliance.",
      tech: ["Trivy", "SonarQube", "PSS", "OPA", "Falco"],
      category: "Security"
    },
    {
      title: "Cost Optimization Engine",
      description: "Reduced GCP cloud spend by 35% through rightsizing recommendations, spot instance adoption, autoscaling policies, and resource quota enforcement.",
      tech: ["GKE Autopilot", "HPA", "VPA", "Spot VMs", "Billing API"],
      category: "FinOps"
    }
  ],
  highlights: [
    "Managed production Kubernetes infrastructure across fintech, healthcare, and e-commerce workloads on GKE.",
    "Created reusable Helm charts and deployment standards to simplify and standardize application onboarding to Kubernetes.",
    "Architected multi-tenant GKE clusters with GitOps workflows, RBAC policies, and full observability stacks (Prometheus, Grafana, Datadog).",
    "Built end-to-end CI/CD pipelines with integrated security scanning and automated deployments across 15+ environments.",
    "Resolved complex issues around pod scheduling, CNI networking, resource exhaustion, and cluster performance bottlenecks.",
    "Delivered Infrastructure as Code with Terraform for consistent, automated provisioning of GCP resources."
  ],
  education: [
    {
      degree: "Diploma in Mechanical Engineering",
      institution: "Aurora's Polytech Academy - Hyderabad, Telangana",
      period: "2014 - 2018"
    }
  ],
  certifications: [
    {
      name: "Google Cloud Platform Associate Cloud Engineer",
      date: "May 2022 — Expired May 2025",
      issuer: "Google Cloud",
      link: "https://www.credential.net/profile/bandivenkatesh",
      expired: true
    },
    {
      name: "Certified Kubernetes Administrator (CKA)",
      date: "Completed March 2026",
      issuer: "CNCF/Linux Foundation",
      link: "https://www.credly.com/badges/0211e96e-91cd-4a6c-b65e-d4a7f5f9385d/public_url"
    }
  ]
};