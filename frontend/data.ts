export const portfolioData = {
  personal: {
    name: "Bandi Venkatesh",
    role: "DevOps Engineer",
    tagline: "Kubernetes | Cloud Infrastructure",
    location: "Hyderabad, India",
    phone: "+91-8555012224",
    email: "bandivenky2222@gmail.com",
    linkedin: "linkedin.com/in/bandi-venkatesh-819a9420a",
    summary: "DevOps Engineer focused on building and operating production-grade Kubernetes platforms on Google Cloud Platform. Experienced in GKE, Terraform, CI/CD, GitOps, and observability for multi-tenant SaaS and high-traffic applications. Strong at debugging complex Kubernetes issues and driving reliability, performance, and cost efficiency in cloud environments."
  },
  skills: [
    {
      category: "Kubernetes & Containers",
      items: ["Kubernetes", "Deployments", "StatefulSets", "RBAC", "Network Policies", "Resource Quotas", "Docker", "Helm", "Kustomize", "GKE"]
    },
    {
      category: "Cloud & Infrastructure",
      items: ["Google Cloud Platform (GCP)", "Compute Engine", "Cloud SQL", "Cloud Storage", "Terraform (IaC)", "Ansible"]
    },
    {
      category: "CI/CD & Automation",
      items: ["Jenkins", "GitLab CI/CD", "Google Cloud Build", "Git/GitHub", "DevSecOps"]
    },
    {
      category: "Observability",
      items: ["Prometheus", "Grafana", "Datadog", "Kubernetes Metrics Server"]
    },
    {
      category: "Scripting & OS",
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
      institution: "Aurora’s Polytech Academy - Hyderabad, Telangana",
      period: "2014 - 2018"
    }
  ],
  certifications: [
    {
      name: "Google Cloud Platform Associate Cloud Engineer",
      date: "Completed May 2022",
      issuer: "Google Cloud"
    },
    {
      name: "Certified Kubernetes Administrator (CKA)",
      date: "Completed March 2026",
      issuer: "CNCF/Linux Foundation",
      link: "#"
    }
  ]
};