SHELL := /bin/bash
PATH := $(PATH):node_modules/.bin

.PHONY: clean build dev build-fresh lint lint-fix ensure test
default: build

clean:
	rm -rf build

build:
	webpack-cli --progress

dev: 
	webpack-cli --progress --watch

build-fresh: clean build
	
lint:
	eslint .

lint-fix:
	eslint . --fix

ensure:
	npm install

test:
	nyc --reporter=lcov --reporter=html mocha test/**/*.test.js

test-watch:
	nyc --reporter=lcov --reporter=html mocha test/**/*.test.js -w 

serve:
	http-server ../