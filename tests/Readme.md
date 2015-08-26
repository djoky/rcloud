# Automation Guide

## Installation of dependancies
* For installation of the dependancies refer following links. Choose appropriate package depending on system specifications:
	- [PhantomJS] (https://bitbucket.org/ariya/phantomjs/downloads)
	- [CasperJS] (http://docs.casperjs.org/en/latest/installation.html)
	- [SlimerJS] (https://slimerjs.org/download.html)
 

## Execution of the automation scripts
- **RCloud must started to execute the automation scripts**
- Below is the command used for execution of the automation test scripts:

```sh
	$ cd data/rcloud/test
```
- With UI

```sh
	$ sudo casperjs test --engine=slimerjs testsuite_name/testcase_name.js --username=github_username --password=github_password --url=rcloud_url --xunit=testsuite_name/report_name.xml
```
- Without UI (headless)

```sh
	$ sudo xvfb-run -a casperjs test --engine=slimerjs testsuite_name/testcase_name.js --username=github_username --password=github_password --url=rcloud_url --xunit=testsuite_name/report_name.xml
```
- rcloud_url e.g.: "http://127.0.0.1:8080/logn.R"

* The XML report will be generated in respective testsuite directory

## For more reference :
- [CasperJS] (http://casperjs.readthedocs.org/en/latest/)
- [SlimerJS] (http://slimerjs.org/)
- [PhantomJS] (http://phantomjs.org/)
