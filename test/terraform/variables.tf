variable "owner" {
  description = "Your GitHub username"
  type        = string
}

variable "repository" {
  description = "Dummy GitHub repository name"
  type        = string
}

variable "token" {
  description = "Your GitHub personal access token"
  type        = string
  sensitive   = true
}
