terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 3.74.2"
    }
  }
  required_version = ">= 0.14.5"
}
provider "aws" {
  region  = var.aws_region
  profile = var.profile
}

resource "aws_instance" "app_server" {
  ami                         = var.ami
  instance_type               = var.instance_type
  subnet_id                   = "subnet-d6d9d99b"
  vpc_security_group_ids      = ["sg-04049e5818ccf0dbc"]
  associate_public_ip_address = true
  key_name                    = var.ssh_key_name
  tags = {
    Name = var.instance_name
  }
}



