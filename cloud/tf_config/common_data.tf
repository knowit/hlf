#### VARIABLES ####
variable "env" {}
variable "project" {}
variable "region" {}
variable "zone" {}

#### RESOURCES ####
provider "google" {
  project     = "${var.project}"
  region      = "${var.region}"
}