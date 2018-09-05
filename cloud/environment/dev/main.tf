#### DATA SOURCES ####
data "google_compute_image" "server_image" {
  name = "packer-1536144075"
  project = "godlydpatruljen"
}

data "google_compute_global_address" "hlf-address" {
  name = "load-balancer-static-ip"
  project = "godlydpatruljen"
}

#### MODULES ####
module "develop" {
  source = "../../tf_config/"

  ## Add variables that can be changed
  env = "dev"
  server_image = "${data.google_compute_image.server_image.self_link}"

  load_balancer_static_ip = "${data.google_compute_global_address.hlf-address.address}"

  health_check_path = "/healthcheck"

  vpc_network_allowed_ports = ["80", "22", "433", "4000"]

  database_username = "hlf"
  password_ciphertext = "" //"${file("${path.module}/crypto-password1.txt")}"
  server_machine_type = "n1-standard-1"
  gce_container_config = "${file("${path.module}/gce_container_config.txt")}"
}