#### VARIABLES ####
variable "env" {}
variable "region" { default = "europe-west3" }
variable "zone" { default = "europe-west3-a" }

#### RESOURCES ####
provider "google" {
  project     = "godlydpatruljen"
  region      = "${var.region}"
}