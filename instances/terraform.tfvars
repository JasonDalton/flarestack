
#arn:aws:iam::782410482932:user/TerraformUser

ami           = "ami-04505e74c0741db8d"
aws_region    = "us-east-1"
instance_name = "FlareStack-UI"
instance_type = "t2.medium"
ssh_key_name  = "ai_deploy"
profile       = "jason.dalton-flarestack"


# ssh -i "~/.ssh/fsui.pem" ubuntu@ec2-3-238-88-254.compute-1.amazonaws.com
