VERSION := $(shell cat VERSION)
# PUBLISHED is a file that contains the docker image to publish to. If it doesn't exist, use the default DOCKER_IMAGE which is an enviorment variable in CI
PUBLISHEDIMAGE := $(shell if [ -f PUBLISHED ]; then cat PUBLISHED; else echo DOCKER_IMAGE; fi)

build-base:
	docker build -f Dockerfile.base --build-arg "NPM_AUTH_TOKEN=${NPM_AUTH_TOKEN}" -t informatievlaanderen/standaardenregister-base:${VERSION} .

# first build-base should have been run
build:
	docker build -f Dockerfile.build --build-arg "VERSION=${VERSION}" -t informatievlaanderen/standaardenregister:${VERSION} .

# first build-base should have been run
# Build latest to always contain the most recent information of all the standards inside the /content folder
build-latest:
	docker build -f Dockerfile.build --build-arg "VERSION=${VERSION}" -t informatievlaanderen/standaardenregister:latest .

exec:
	docker run -it --rm --name standaardenregister -p 3000:3000 informatievlaanderen/standaardenregister:${VERSION} sh

run:
	docker run -d --rm --name standaardenregister -p 3000:3000 informatievlaanderen/standaardenregister:${VERSION}


stop:
	docker stop standaardenregister

publish:
	docker tag informatievlaanderen/standaardenregister:${VERSION} ${PUBLISHEDIMAGE}:${VERSION}
	docker push ${PUBLISHEDIMAGE}:${VERSION}

publish-latest:
	docker tag informatievlaanderen/standaardenregister:${VERSION} ${PUBLISHEDIMAGE}:latest
	docker push ${PUBLISHEDIMAGE}:${VERSION}
