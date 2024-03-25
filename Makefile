VERSION := $(shell cat VERSION)
PUBLISHEDIMAGE := $(shell cat PUBLISHED)

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
