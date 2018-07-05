provider "google" {
  credentials = "${file("credentials.json")}"
  project     = "godlyd-207607"
  region      = "europe-west3"
}

data "google_compute_image" "server_image" {
  name = "packer-1529307002"
}

resource "google_compute_network" "godlyd_vpc" {
  name                    = "godlyd"
  auto_create_subnetworks = "true"
}

resource "google_compute_instance" "server" {
  name                      = "server"
  machine_type              = "n1-standard-1"
  zone                      = "europe-west3-a"
  allow_stopping_for_update = true

  boot_disk {
    initialize_params {
      image = "${data.google_compute_image.server_image.self_link}"
    }
  }

  network_interface {
    network = "${google_compute_network.godlyd_vpc.name}"

    access_config {
      // Ephemeral IP
    }
  }

  metadata {
    gce-container-declaration = "spec:\n  containers:\n  - image: eu.gcr.io/godlyd-207607/julyrepo\n    name: july\n    securityContext:\n      privileged: false\n    stdin: false\n    tty: false\n    volumeMounts: []\n  restartPolicy: Always\n  volumes: []\n"
  }

  service_account {
    email  = "cloud-adm@godlyd-207607.iam.gserviceaccount.com"
    scopes = ["userinfo-email", "compute-rw", "storage-rw", "logging-write", "monitoring-write"]
  }
}

resource "google_compute_firewall" "firewall" {
  network = "${google_compute_network.godlyd_vpc.name}"
  name    = "firewall"

  allow {
    protocol = "tcp"
    ports    = ["80", "22", "433", "4000"]
  }
}

resource "google_sql_database_instance" "master" {
  name             = "main-instance-db2"
  database_version = "POSTGRES_9_6"
  region           = "europe-west3"

  settings {
    tier = "db-f1-micro"
  }
}