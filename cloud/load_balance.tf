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
