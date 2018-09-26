#### VARIABLES ####

#### RESOURCES ####
resource "google_sql_database_instance" "database" {
  name             = "database-hlf-${var.env}"
  database_version = "POSTGRES_9_6"
  region           = "${var.region}"

  settings {
    tier = "db-f1-micro"
    backup_configuration {enabled = true}
    ip_configuration {
      authorized_networks {
        name = "${google_compute_address.hlf-static-ip-address.name}"
        value = "${google_compute_address.hlf-static-ip-address.address}"}
    }
  }
}

resource "google_sql_user" "user" {
  instance = "${google_sql_database_instance.database.name}"
  name = "${data.google_kms_secret.db_username.plaintext}"
  password = "${data.google_kms_secret.db_password.plaintext}"
}

resource "google_sql_database" "godlyd-database" {
  instance = "${google_sql_database_instance.database.name}"
  name = "godlyd"
}