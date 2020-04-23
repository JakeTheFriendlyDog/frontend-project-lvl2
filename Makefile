install: 
	npm install

run:
	npx babel-node src/bin/gendiff.js __tests__/__fixtures__/before.yml __tests__/__fixtures__/after.yaml

build:
	rm -rf dist
	npm run build

test:
	npm test

test-coverage:
	npm test -- --coverage

lint:
	npx eslint .

publish:
	npm publish

.PHONY: test