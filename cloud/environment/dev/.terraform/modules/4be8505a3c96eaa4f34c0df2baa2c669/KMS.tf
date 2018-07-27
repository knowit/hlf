#### VARIABLES ####
variable "password_ciphertext" {}

output "hlf_password" {
  value = "${var.password_ciphertext}"
}

resource "google_kms_key_ring" "hlf_key_ring" {
  project = "godlydpatruljen"
  location = "${var.region}"
  name = "hlf_key_ring"
}

resource "google_kms_crypto_key" "hlf_crypto_key" {
  key_ring = "${google_kms_key_ring.hlf_key_ring.id}"
  name = "hlf_crypto_key"
}
/*
data "google_kms_secret" "sql_user_password" {
  crypto_key = "${google_kms_crypto_key.hlf_crypto_key.id}"
  ciphertext = "${var.password_ciphertext}"
}
*/