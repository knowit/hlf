#### VARIABLES ####
variable "server_image" {}
variable "server_machine_type" {}
variable "gce_container_config" {}


#### RESOURCES ####
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
      image = "${var.server_image}"
    }
  }

  network_interface {
    network = "${google_compute_network.godlyd_vpc.name}"

    access_config { // Ephemeral IP
    }
  }

  metadata {
    gce-container-declaration = "${var.gce_container_config}"
    //"spec:\n  containers:\n  - image: eu.gcr.io/godlydpatruljen/server\n    name: godlyd\n    securityContext:\n      privileged: false\n    stdin: false\n    tty: false\n    volumeMounts: []\n  restartPolicy: Always\n  volumes: []\n"
  }

  service_account {
    email  = "terraform@godlydpatruljen.iam.gserviceaccount.com"
    scopes = ["userinfo-email", "compute-rw", "storage-rw", "logging-write", "monitoring-write"]
  }
}
