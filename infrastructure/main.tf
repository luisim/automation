# SPA bucket configs
resource "google_storage_bucket" "app_bucket" {
  name          = "training-client-${var.environment}"
  location      = "us-central1"
  force_destroy = true

  website {
    main_page_suffix = "index.html"
    not_found_page   = "index.html"
  }
}

# SPA bucket access control
resource "google_storage_bucket_iam_member" "app_bucket" {
  bucket = google_storage_bucket.app_bucket.name
  role   = "roles/storage.objectViewer"
  member = "allUsers"
}

# Backend bucket used by the LB
resource "google_compute_backend_bucket" "app_bucket" {
  name        = "training-client-be-${var.environment}"
  bucket_name = google_storage_bucket.app_bucket.name
  enable_cdn  = true
  cdn_policy {
    default_ttl = var.environment != "prod" ? 60 : 3600
    max_ttl     = var.environment != "prod" ? 60 : 86400
    client_ttl  = var.environment != "prod" ? 60 : 3600
  }
}

# Get the managed DNS zone
data "google_dns_managed_zone" "dns_zone" {
  name = "training-client-zone"
}

# Reserve an external IP
resource "google_compute_global_address" "website" {
  name = "training-client-load-balancer-ip-${var.environment}"
}

# Add the IP to the DNS
resource "google_dns_record_set" "website" {
  name         = "${var.environment != "prod" ? "${var.environment}." : ""}${data.google_dns_managed_zone.dns_zone.dns_name}"
  type         = "A"
  ttl          = 300
  managed_zone = data.google_dns_managed_zone.dns_zone.name
  rrdatas      = [google_compute_global_address.website.address]
}

# Create HTTPS certificate
resource "google_compute_managed_ssl_certificate" "certificate" {
  name        = "training-client-ssl-cert-${var.environment}"
  description = "The default certificate for Training Client"
  managed {
    domains = ["${var.environment != "prod" ? "${var.environment}." : ""}${data.google_dns_managed_zone.dns_zone.dns_name}"]
  }
  lifecycle {
    create_before_destroy = true
  }
}

# LB configs
resource "google_compute_url_map" "default" {
  name            = "training-client-lb-${var.environment}"
  default_service = google_compute_backend_bucket.app_bucket.self_link
}

# HTTPS proxy
resource "google_compute_target_https_proxy" "default" {
  name             = "training-client-proxy-${var.environment}"
  url_map          = google_compute_url_map.default.self_link
  ssl_certificates = [google_compute_managed_ssl_certificate.certificate.self_link]
}

# LB frontend
resource "google_compute_global_forwarding_rule" "default" {
  name                  = "training-client-lb-frontend-${var.environment}"
  ip_protocol           = "TCP"
  load_balancing_scheme = "EXTERNAL"
  target                = google_compute_target_https_proxy.default.self_link
  port_range            = 443
  ip_address            = google_compute_global_address.website.address
}

resource "google_compute_url_map" "http-to-https" {
  name = "training-client-http-to-https-${var.environment}"

  default_url_redirect {
    https_redirect         = true
    strip_query            = false
    redirect_response_code = "PERMANENT_REDIRECT"
  }
}

# HTTP Proxy
resource "google_compute_target_http_proxy" "proxy" {
  name    = "training-client-http-proxy-${var.environment}"
  url_map = google_compute_url_map.http-to-https.self_link
}

# LB Frontend to redirect
resource "google_compute_global_forwarding_rule" "http-v4" {
  name       = "training-client-http-redirect-${var.environment}"
  target     = google_compute_target_http_proxy.proxy.self_link
  ip_address = google_compute_global_address.website.address
  port_range = "80"
}
