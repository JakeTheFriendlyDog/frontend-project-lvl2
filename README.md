This CLI utility compares two configuration files and shows a difference.

# map-difference

[![Maintainability](https://api.codeclimate.com/v1/badges/e344b251e41bc9bd8e2f/maintainability)](https://codeclimate.com/github/JakeTheFriendlyDog/frontend-project-lvl2/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/e344b251e41bc9bd8e2f/test_coverage)](https://codeclimate.com/github/JakeTheFriendlyDog/frontend-project-lvl2/test_coverage)
![Node CI](https://github.com/JakeTheFriendlyDog/frontend-project-lvl2/workflows/Node%20CI/badge.svg)


## Setup
Download package from npm using:

```sh
$ npm install map-difference
```

Install it by running:
```sh
$ make install
```


## Compare JSON files
[![asciicast](https://asciinema.org/a/U1hEsNtjN1T7DVjJjvU1q09Va.svg)](https://asciinema.org/a/U1hEsNtjN1T7DVjJjvU1q09Va)

## Compare YAML/YML files
[![asciicast](https://asciinema.org/a/J9gnRJKXjnkiITtIM0uXL83iV.svg)](https://asciinema.org/a/J9gnRJKXjnkiITtIM0uXL83iV)

## Compare INI files
[![asciicast](https://asciinema.org/a/veU1VdO3GsUA53ckRHnLzVrbz.svg)](https://asciinema.org/a/veU1VdO3GsUA53ckRHnLzVrbz)


## Supports different output formats

### Plain
Try it by running:
```sh
$ gendiff --format 'plain' fileOne fileTwo
```
[![asciicast](https://asciinema.org/a/PTZ2VA2vCKNDP5FTVbTswptph.svg)](https://asciinema.org/a/PTZ2VA2vCKNDP5FTVbTswptph)

### JSON 
Try it by running:
```sh
$ gendiff --format 'json' fileOne fileTwo
```
[![asciicast](https://asciinema.org/a/y473QWn90fohshVPJWSwVBZFH.svg)](https://asciinema.org/a/y473QWn90fohshVPJWSwVBZFH)

## Run tests

```sh
$ make test
```