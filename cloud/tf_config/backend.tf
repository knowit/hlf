variable "artifact_bucket" { default = "eu.artifacts.godlydpatruljen.appspot.com" }

terraform {
  backend "gcs" {}
}

data "terraform_remote_state" "godlyd_state" {
  backend = "gcs"
  config {
    bucket = "${var.artifact_bucket}"
    prefix = "terraform/state/${var.env}"
  }
}