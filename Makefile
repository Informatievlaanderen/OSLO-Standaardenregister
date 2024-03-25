VERSION:=`cat VERSION`
PUBLISHEDIMAGE:=`cat PUBLISHED`

build-base:
	docker build -f Dockerfile.base --build-arg "NPM_AUTH_TOKEN=${NPM_AUTH_TOKEN}" -t informatievlaanderen/standaardenregister:${VERSION} .

# first build-base should have been run
build:
	docker build -f Dockerfile.build -t  --build-arg "VERSION=${VERSION}" informatievlaanderen/standaardenregister:${VERSION} .

exec:
	docker run -it --rm --name standaardenregister -p 3000:3000 informatievlaanderen/standaardenregister:${VERSION} sh

run:
	docker run -d --rm --name standaardenregister -p 3000:3000 informatievlaanderen/standaardenregister:${VERSION}


stop:
	docker stop standaardenregister


publish:
	docker tag informatievlaanderen/standaardenregister:${VERSION} ${PUBLISHEDIMAGE}:${VERSION}
	docker push ${PUBLISHEDIMAGE}:${VERSION}
