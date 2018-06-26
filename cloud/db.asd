resource "google_sql_database_instance" "master" {
  name             = "main-instance-db1"
  database_version = "POSTGRES_9_6"

  settings {
    tier = "db-f1-micro"
  }
}

data "google_compute_image" "server_image" {
  name = "packer-1529307002"
}