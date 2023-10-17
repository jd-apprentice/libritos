## BOT

development:
	cd bot && npm run dev

## Compose

compose-up:
	cd infra && docker-compose up -d --build

## AWS

include infra/config/aws.mk

create:
	aws ec2 run-instances \
	--image-id $(image_id) \
	--instance-type $(instance_type) \
	--key-name $(key_name) \
	--security-group-ids $(security_group_ids) \
	--subnet-id $(subnet_id) \
	--tag-specifications 'ResourceType=instance,Tags=[{Key=Name,Value=$(name)}]' \
	--associate-public-ip-address