#### VARIABLES ####
variable "database_username" {}

#### RESOURCES ####
resource "google_sql_database_instance" "database" {
  name             = "database-hlf-${var.env}"
  database_version = "POSTGRES_9_6"
  region           = "${var.region}"

  settings {
    tier = "db-f1-micro"

    backup_configuration {enabled = true}

    //ip_configuration {
      //authorized_networks {value = "${google_compute_instance.server.network_interface.access_config.nat_ip}"}
    //}
  }
}

resource "google_sql_user" "user" {
  instance = "${google_sql_database_instance.database.name}"
  name = "${var.database_username}"
  password = "hlf123" //"${data.google_kms_secret.sql_user_password.plaintext}"
}

resource "google_sql_database" "godlyd-database" {
  instance = "${google_sql_database_instance.database.name}"
  name = "godlyd"
}