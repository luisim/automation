terraform {
  backend "gcs" {
    prefix = "training-client"
  }
}
