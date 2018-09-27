#### VARIABLES ####
variable "project" { default = "godlydpatruljen"}
variable "region" { default = "europe-west3" }
variable "key_ring" { default = "hlf_key_ring" }
variable "crypto_key" { default = "hlf_crypto_key" }

#### BACKEND ####
terraform {
  required_version = ">= 0.11.8"
  backend "gcs" {
    bucket = "eu.artifacts.godlydpatruljen.appspot.com"
    prefix = "terraform/state/dev"
  }
}

#### RESOURCES ####
resource "google_kms_key_ring" "hlf_key_ring" {
  project = "${var.project}"
  location = "${var.region}"
  name = "${var.key_ring}"
}

resource "google_kms_crypto_key" "hlf_crypto_key" {
  key_ring = "${google_kms_key_ring.hlf_key_ring.id}"
  name = "${var.crypto_key}"
}

#### MODULE ####
module "develop" {
  source = "../../tf_config/"

  ## Add variables that can be changed
  env = "dev"
  project = "${var.project}"
  region = "${var.region}"
  zone = "${var.region}-a"

  health_check_path = "/healthcheck"
  vpc_network_allowed_ports = ["80", "22", "433", "4000"]
  ssl_certificate = "godlyd-cert-1537451281"

  # key_ring = "${var.key_ring}"
  # crypto_key = "${var.crypto_key}"
  crypto_key_id = "${var.project}/${var.region}/${var.key_ring}/${var.crypto_key}"

  username_ciphertext = "CiQAb/AUO9ABw1iW/X7SoiEswauxc8U3HgELMoEixkFdFG5kXBoSLAAtNd4bSuuVdGWBS95UyoZbytI38vOl5s/eBZtQu74kDoIqUSoRJ5BB5vu/"
  password_ciphertext = "CiQAb/AUO/GFeV2bQJ+fWaG9Mvon4xQ/AJCYfz8I4zKydB1F5o0SLwAtNd4b3jF8J05LUIqRpby4LHDO74s6lY5c7ZE99i3eraVvkBQgQrhngpSAgY47"

  server_machine_type = "n1-standard-1"
  gce_container_config = "${file("${path.module}/gce_container_config.txt")}"
  service_account = "terraform@godlydpatruljen.iam.gserviceaccount.com"
}
