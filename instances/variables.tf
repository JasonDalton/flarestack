

variable "ami" {
  description = "ID of the AMI to provision. Default is Free tier eligible Amazon Linux 2 AMI Base Image"
  default     = "ami-04505e74c0741db8d"
}


variable "aws_region" {
  description = "The region Terraform deploys your instance"
  default     = "us-east-1"
}

variable "profile" {
  description = "AWS IAM profile"
  default     = ""
}

variable "instance_name" {
  description = "Value of the Name tag for the EC2 instance"
  type        = string
}

variable "instance_type" {
  description = "type of EC2 instance to provision."
  default     = "t2.medium"
}

variable "owner_tag" {
  description = "Tag identifying instance owner"
  default     = "terraform-instance"
}


variable "ssh_key_name" {
  description = "Existing aws key to be associated with instance"
  default     = ""
}

#variable "site_domain" {
#  type        = string
#  description = "The domain name to use for the static site"
#}

#variable "cidr_vpc" {
##  description = "CIDR block for the VPC"
# default     = "10.1.0.0/16"
#}

##variable "cidr_subnet" {
# description = "CIDR block for the subnet"
# default     = "10.1.0.0/24"
#}

