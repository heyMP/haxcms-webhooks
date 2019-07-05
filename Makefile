SHELL := /usr/bin/env bash
include .env
export $(shell sed 's/=.*//' .env)
USER=$(shell whoami)

up:
	docker-compose -f docker-compose.yml -f docker-compose-dev.yml build --pull
	docker-compose -f docker-compose.yml -f docker-compose-dev.yml up --renew-anon-volumes

down:
	docker-compose -f docker-compose.yml -f docker-compose-dev.yml down