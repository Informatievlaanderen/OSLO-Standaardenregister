-include .env
export

VERSION := $(shell cat VERSION)
# PUBLISHED is a file that contains the docker image to publish to. If it doesn't exist, use the default DOCKER_IMAGE which is an enviorment variable in CI
PUBLISHEDIMAGE := $(shell if [ -f PUBLISHED ]; then cat PUBLISHED; else echo $(DOCKER_IMAGE); fi)

build-base:
	docker build -f Dockerfile.base --build-arg "NPM_TOKEN=${NPM_TOKEN}" -t informatievlaanderen/standaardenregister-base:${VERSION} .

build-base-linux:
	docker build --platform=linux/amd64 -f Dockerfile.base --build-arg "NPM_TOKEN=${NPM_TOKEN}" -t informatievlaanderen/standaardenregister-base:${VERSION} .

exec:
	docker run -it --rm --name standaardenregister -p 3000:3000 informatievlaanderen/standaardenregister:${VERSION} sh

run:
	docker run -d --rm --name standaardenregister -p 3000:3000 terraformtestcontainerregistry.azurecr.io/oslo2/oslo-standaardenregister-run:latest


stop:
	docker stop standaardenregister

publish-base:
	docker tag informatievlaanderen/standaardenregister-base:${VERSION} ${PUBLISHEDIMAGE}-base:${VERSION}
	docker push ${PUBLISHEDIMAGE}-base:${VERSION}
	docker tag informatievlaanderen/standaardenregister-base:${VERSION} ${PUBLISHEDIMAGE}-base:latest
	docker push ${PUBLISHEDIMAGE}-base:latest
