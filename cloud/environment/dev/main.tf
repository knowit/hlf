#### DATA SOURCES ####
data "google_compute_image" "server_image" {
  name = "packer-1531395416"
  project = "godlydpatruljen"
}

module "develop" {
  source = "../../tf_config"

  ## Add variables that can be changed
  env = "dev"
  server_image = "${data.google_compute_image.server_image.self_link}"

  health_check_path = "/healthcheck"

  vpc_network_allowed_ports = ["80", "22", "433", "4000"]

  database_username = "hlf"
  password_ciphertext = "" //"${file("${path.module}/crypto-password1.txt")}"
  server_machine_type = "n1-standard-1"
  gce_container_config = "${file("${path.module}/gce_container_config.txt")}"
}