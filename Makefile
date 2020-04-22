install: 
	npm install

run:
	npx babel-node src/bin/gendiff.js before.json /home/nick/hexlet/frontend-project-lvl2/after.json

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