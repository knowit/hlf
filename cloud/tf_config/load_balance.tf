#### VARIABLES ####
variable "health_check_path" {}
variable "load_balancer_static_ip" {}

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
  ip_address = "${var.load_balancer_static_ip}"
}
