#### VARIABLES ####
variable "vpc_network_allowed_ports" {type = "list"}


#### RESOURCES ####
resource "google_compute_network" "godlyd_vpc" {
  name                    = "godlyd-${var.env}"
  auto_create_subnetworks = "true"
}

resource "google_compute_firewall" "firewall" {
  network = "${google_compute_network.godlyd_vpc.name}"
  name    = "firewall-${var.env}"

  allow {
    protocol = "tcp"
    ports    = "${var.vpc_network_allowed_ports}"
  }
}