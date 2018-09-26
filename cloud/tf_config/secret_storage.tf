#### VARIABLES ####
variable "username_ciphertext" {}
variable "password_ciphertext" {}
variable "crypto_key_id" {}


#### RESOURCES ####
data "google_kms_secret" "db_username" {
  crypto_key = "${var.crypto_key_id}"
  ciphertext = "${var.username_ciphertext}"
}

data "google_kms_secret" "db_password" {
  crypto_key = "${var.crypto_key_id}"
  ciphertext = "${var.password_ciphertext}"
}
