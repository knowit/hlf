#### VARIABLES ####
variable "project" { default = "godlydpatruljen"}
variable "region" { default = "europe-west3" }
variable "key_ring" { default = "secret_ring" }
variable "crypto_key" { default = "secret_key"}

#### BACKEND ####
terraform {
  backend "gcs" {
    bucket = "eu.artifacts.godlydpatruljen.appspot.com"
    prefix = "terraform/state/prod"
  }
}



#### MODULE ####
module "production" {
  source = "../../tf_config"

  ## Add variables that can be changed
  env = "prod"
  project = "${var.project}"
  region = "${var.region}"
  zone = "${var.region}-a"

  health_check_path = "/healthcheck"
  vpc_network_allowed_ports = ["80", "22", "443", "4000"]
  ssl_certificate = "godlyd-cert-1537950449"

  crypto_key_id = "${var.project}/${var.region}/${var.key_ring}/${var.crypto_key}"

  username_ciphertext = "CiQAGVs+tEvhcBraVsYr4v1w6Cdj2Yh/sdaJUEn1EiKy37ZzaZoSMwD6RTZgt8ro/h4qATsPGFv8zod1AbiM1WbzYtrvE9099eMK/J/VFhZ2FjkK5iIn70GZlg=="
  password_ciphertext = "CiQAGVs+tG3BXnzS0g4x1lrrtQUOfHbzdR9ub/RtgtiAWjUv5c8SWwD6RTZgUh+el+lAt9TdveKEZvdTvdM2MchbUtIxUh4zOelCfSdDBWNqp0D0M07qBHhwMzHMTqa1AiMi31zCUQ2syb+ulqsr9BjWjuSsxR/8be/zEBggxY+c7Kg="

  server_machine_type = "n1-standard-1"
  gce_container_config = ""
  service_account = "terraform@godlydpatruljen.iam.gserviceaccount.com"
}
