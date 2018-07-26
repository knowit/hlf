resource "google_compute_backend_service" "load-balancer" {
  name        = "loadbalancer"
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
  name               = "default-healthcheck"
  request_path       = "/healthcheck"
  check_interval_sec = 1
  timeout_sec        = 1
}

resource "google_compute_url_map" "god_lyd_map" {
  name            = "godlyd-map"
  default_service = "${google_compute_backend_service.load-balancer.self_link}"
}

resource "google_compute_target_http_proxy" "godlyd_http_proxy" {
  name    = "godlyd-http-proxy"
  url_map = "${google_compute_url_map.god_lyd_map.self_link}"
}

resource "google_compute_global_forwarding_rule" "godlyd_http_forward" {
  name       = "godlyd-http-forward"
  target     = "${google_compute_target_http_proxy.godlyd_http_proxy.self_link}"
  port_range = 80
}
