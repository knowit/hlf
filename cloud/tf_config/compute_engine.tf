#### VARIABLES ####
variable "server_machine_type" { default = "n1-standard-1" }
variable "gce_container_config" { default = "" }
variable "service_account" { default = "terraform@godlydpatruljen.iam.gserviceaccount.com" }

#### DATA ####
data "google_compute_image" "server_image" {
  family = "godlydpatruljen-${var.env}"
  project = "${var.project}"
}

#### RESOURCES ####
resource "google_compute_address" "hlf-static-ip-address" {
  name = "static-ip-address-${var.env}"
}

resource "google_compute_instance_group" "server_group" {
  name = "godlyd-server-group-${var.env}"
  zone = "${var.zone}"

  instances = ["${google_compute_instance.server.self_link}"]
}

resource "google_compute_instance" "server" {
  name                      = "server-hlf-${var.env}"
  machine_type              = "${var.server_machine_type}"
  zone                      = "${var.zone}"
  allow_stopping_for_update = true

  boot_disk {
    initialize_params {
      # image = "${var.server_image}"
      image = "${data.google_compute_image.server_image.self_link}"
    }
  }

  network_interface {
    network = "${google_compute_network.godlyd_vpc.name}"
    access_config {
      nat_ip = "${google_compute_address.hlf-static-ip-address.address}"
    }
  }
  metadata {
    gce-container-declaration = "${var.gce_container_config}"
  }

  service_account {
    email  = "${var.service_account}"
    scopes = ["userinfo-email", "compute-rw", "storage-rw", "logging-write", "monitoring-write"]
  }
}
