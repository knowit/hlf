#### VARIABLES ####
variable "health_check_path" {}
# variable "load_balancer_static_ip" {}
variable "ssl_certificate" {}

#### RESOURCES ####
resource "google_compute_backend_service" "load-balancer" {
  name        = "loadbalancer-${var.env}"
  port_name   = "http"
  protocol    = "HTTP"
  timeout_sec = 10
  enable_cdn  = false

  backend = {
    group = "${google_compute_instance_group.server_group.self_link}"
  }

  health_checks = ["${google_compute_http_health_check.default_health_check.self_link}"]
}

resource "google_compute_global_address" "load_balancer_static_ip_address" {
  name = "lb-static-ip-address-${var.env}"
}

resource "google_compute_http_health_check" "default_health_check" {
  name               = "healthcheck-${var.env}"
  request_path       = "${var.health_check_path}"
  check_interval_sec = 1
  timeout_sec        = 1
}

resource "google_compute_url_map" "god_lyd_map" {
  name            = "godlyd-map-${var.env}"
  default_service = "${google_compute_backend_service.load-balancer.self_link}"
}

resource "google_compute_target_http_proxy" "godlyd_http_proxy" {
  name    = "godlyd-http-proxy-${var.env}"
  url_map = "${google_compute_url_map.god_lyd_map.self_link}"
}

resource "google_compute_global_forwarding_rule" "godlyd_http_forward" {
  name       = "godlyd-http-forward-${var.env}"
  target     = "${google_compute_target_http_proxy.godlyd_http_proxy.self_link}"
  port_range = 80
  # ip_address = "${var.load_balancer_static_ip}"
  ip_address = "${google_compute_global_address.load_balancer_static_ip_address.address}"
}

/*
resource "google_compute_ssl_certificate" "godlyd_ssl_certificate" {
  certificate = ""
  private_key = ""
}
*/

resource "google_compute_target_https_proxy" "godlyd_https_proxy" {
  name = "godlyd-https-proxy-${var.env}"
  url_map = "${google_compute_url_map.god_lyd_map.self_link}"
  ssl_certificates = ["${var.ssl_certificate}"]
}

resource "google_compute_global_forwarding_rule" "godlyd_https_forward" {
  name       = "godlyd-https-forward-${var.env}"
  target     = "${google_compute_target_https_proxy.godlyd_https_proxy.self_link}"
  port_range = 443
  # ip_address = "${var.load_balancer_static_ip}"
  ip_address = "${google_compute_global_address.load_balancer_static_ip_address.address}"
}


