/* 
 Author: Prateek  (tc_29.1.1)
 Description:    This is a casperjs automated test script for showing that, Executing valid R code produces expected output or not
 */

//Begin Tests

casper.test.begin("Executing valid R code produces expected output or not ", 6, function suite(test) {

    var x = require('casper').selectXPath;
    var github_username = casper.cli.options.username;
    var github_password = casper.cli.options.password;
    var rcloud_url = casper.cli.options.url;
    var input = "a<-50+50\n a";
    var functions = require(fs.absolute('basicfunctions'));
    var notebookid;

    casper.start(rcloud_url, function () {
        casper.page.injectJs('jquery-1.10.2.js');
    });
    casper.wait(10000);

    casper.viewport(1024, 768).then(function () {
        functions.login(casper, github_username, github_password, rcloud_url);
    });

    casper.viewport(1024, 768).then(function () {
        this.wait(9000);
        console.log("validating that the Main page has got loaded properly by detecting if some of its elements are visible. Here we are checking for Shareable Link and Logout options");
        functions.validation(casper);
	});
    
    //Add new notebook
    casper.then(function(){
		functions.create_notebook(casper); 
		this.wait(5000);
	});
    
    //Add new cell
    casper.then(function () {
        functions.addnewcell(casper);
    });
    
    //Adding contents to cell
	functions.addcontentstocell(casper,input);
	
	//fetch the output text and compare
    casper.then(function () {
		console.log('Testing if The R code has produced the expected output');
		test.assertSelectorHasText({ type : 'xpath' , path : '/html/body/div[3]/div/div[2]/div/div[1]/div/div[3]/div[2]/pre/code' }, '100',"Valid Rcode has produced expected output");
		this.echo('100 is the expected output for valid R code');
    });
    
    casper.run(function () {
        test.done();
    });
});
	
	
	
