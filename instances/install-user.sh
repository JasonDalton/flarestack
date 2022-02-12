#!/usr/bin/env bash
set -x

# Setup SSH
sudo cp /etc/sudoers /etc/sudoers.orig
echo "developer  ALL=(ALL) NOPASSWD:ALL" | sudo tee /etc/sudoers.d/ubuntu

# Installing SSH key
sudo ssh-keygen -f mykey -t rsa -b 4096 -m PEM -N ''
sudo mkdir -p /home/ubuntu/.ssh
sudo chmod 700 /home/ubuntu/.ssh
 cat "mykey.pub">> ~/.ssh/authorized_keys
sudo chmod 600 /home/ubuntu/.ssh/authorized_keys

# Create GOPATH for developer user & download the webapp from github
sudo -H -i -u developer -- env bash <<EOF
whoami
cd /home/ubuntu
EOF
