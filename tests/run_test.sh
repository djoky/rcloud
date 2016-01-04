#Session Key Server Setup
cd services
git clone https://github.com/s-u/SessionKeyServer.git
cd SessionKeyServer
sudo make
cd /home/travis/build/sanketd11/rcloud/services

sudo sed -i -e '2iROOT=/home/travis/build/sanketd11/rcloud\' rcloud-sks
sudo sh rcloud-sks &

Rscript -e 'chooseCRANmirror(ind=81)'
Rscript -e 'install.packages("XML", repos=c("http://RForge.net", "http://R.research.att.com"), type="source")'
Rscript -e 'install.packages("rcloud.dcplot", repos="http://rforge.net")'
Rscript -e 'install.packages("rpython2", repos="http://rforge.net")'
cat /home/travis/build/sanketd11/rcloud/conf/rcloud.conf
cd /home/travis/build/sanketd11/rcloud/tests
pwd
echo "Executing testscripts from $1"
sudo xvfb-run -a casperjs test --ssl-protocol=any --engine=slimerjs $1 --username=iPrateek032 --password=P12345678k --url=http://127.0.0.1:8080/login.R --xunit=Reports/report.xml

echo -e "Starting to update AUTO_IMG\n"
#copy data we're interested in to other place
cp -R /home/travis/build/sanketd11/rcloud/tests/edit_html.png $HOME/Images/

  #go to home and setup git
cd $HOME
git config --global user.email "travis@travis-ci.org"
git config --global user.name "travis"

#using token clone gh-pages branch
git clone --quiet --branch=AUTO_IMG https://${GH_TOKEN}@github.com/sanketd11/rcloud.git  AUTO_IMG > /dev/null

  #go into diractory and copy data we're interested in to that directory
cd AUTO_IMG
cp -Rf $HOME/Images/* ./tests/

  #add, commit and push files
git add -f .
git commit -m "Travis build $TRAVIS_BUILD_NUMBER pushed to AUTO_IMG"
git push -fq origin AUTO_IMG > /dev/null
echo -e "The test images are uploaded \n"

# Calling Parse.R to parse the xml test reports generated by casprJS
Rscript parse.R

if [ $? -eq 0 ]
then
  echo "Build Pass"
else
  echo "Build Fail"
exit 1
fi



