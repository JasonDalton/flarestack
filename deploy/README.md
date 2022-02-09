# Introduction
This is a Hashicorp Terraform module that provisions an AWS EC2 instance
for the purpose of running a given `docker-compose.yml` file.

# Usage
```terraform
# ===== OUR MAGIC DOCKER-COMPOSE.YML FILE HERE =====
# It is also possible to get Terraform to read an external `docker-compose.yml`
# file and load it into this variable.
# We'll be showing off a demo nginx page.
variable "example_docker_compose" {
    type = string
    default =  <<EOF
version: "3.1"
services:
  hello:
    image: nginxdemos/hello
    restart: always
    ports:
      - 80:80
EOF
}

# Configure the VPC that we will use.
resource "aws_vpc" "prod" {
  cidr_block = "10.0.0.0/16"
  enable_dns_hostnames = true
}

resource "aws_internet_gateway" "prod" {
  vpc_id = aws_vpc.prod.id
}

resource "aws_route" "prod__to_internet" {
  route_table_id = aws_vpc.prod.main_route_table_id
  destination_cidr_block = "0.0.0.0/0"
  gateway_id = aws_internet_gateway.prod.id
}

resource "aws_subnet" "prod" {
  vpc_id = aws_vpc.prod.id
  availability_zone = "us-east-1a"
  cidr_block = "10.0.0.0/18"
  map_public_ip_on_launch = true
  depends_on = [aws_internet_gateway.prod]
}

# Allow port 80 so we can connect to the container.
resource "aws_security_group" "allow_http" {
    name = "allow_http"
    description = "Show off how we run a docker-compose file."

    ingress {
        from_port = 80
        to_port = 80
        protocol = "tcp"
        cidr_blocks = ["0.0.0.0/0"]
    }
    egress {
        from_port = 0
        to_port = 0
        protocol = "-1"
        cidr_blocks = ["0.0.0.0/0"]
    }
}

# Make sure to download the other files into the `modules/one_docker_instance_on_ec2`
# directory
module "run_docker_example" {
    source =  "./modules/one_docker_instance_on_ec2"
    name = "one_docker_instance_on_ec2_demo"
    key_name = "name_of_your_ssh_key_here"
    instance_type = "t3.nano"
    docker_compose_str = var.example_docker_compose
    subnet_id = aws_subnet.prod.id
    availability_zone = aws_subnet.prod.availability_zone
    vpc_security_group_ids = [aws_security_group.allow_http.id]
    associate_public_ip_address = true
    persistent_volume_size_gb = 1
}
```

# TODO
I want to configure the AWS instance's permissions to allow pulling
containers from private AWS Elastic Container Registry repositories.
It should just involve adding the relevant permissions to the EC2 IAM
instance profile, and then making the corresponding change with the registry.

I would also like to set up the AWS EC2 Client VPN so I can access the
containers over the Internet without having to expose them to the Internet.


docker context use myecscontext
