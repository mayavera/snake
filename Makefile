SHELL := /bin/bash

.PHONY: build clean ensure start dev test lint lint-fix
default: build

build:
	pushd app; make build; popd

clean:
	pushd app; make clean; popd

ensure:
	pushd app; make ensure; popd

start:

dev: build
	pushd app; make dev; popd

test:
	pushd app; make test; popd

lint:
	pushd app; make lint; popd

lint-fix:
	pushd app; make lint-fix; popd