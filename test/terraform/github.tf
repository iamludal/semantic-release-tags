resource "github_repository" "dummy_repo" {
  name        = var.repository
  description = "Dummy GitHub repository to test semantic release"
  visibility  = "private"
}
