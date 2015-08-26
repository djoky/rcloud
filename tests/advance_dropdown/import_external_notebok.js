/* 
 Author: Prateek (tc_7.3.1.js)
 Description:This is a casperjs automated test script for showing that,The user can import notebooks that are stored in a different repository, 
 * into the current repository and save it in a folder. This can be done by selecting the option "Import External Notebooks" under 
 * 'Advanced' drop-down present on the top-right corner of the page. A pop-up window will open. Enter the Source repo api URL, Notebook IDs and prefix.
 * The prefix needs to be written as "<folder_name>/". On importing, a folder will be created in 'My Notebooks' list having all the notebooks with 
 * the same name, whose IDs were mentioned
 */

//Begin Tests
casper.test.begin("Importing a Notebook in a folder", 5, function suite(test) {

    var x = require('casper').selectXPath;
    var github_username = casper.cli.options.username;
    var github_password = casper.cli.options.password;
    var rcloud_url = casper.cli.options.url;
    var functions = require(fs.absolute('basicfunctions'));
    var prefix_name = '1st_Prefix';
    var Notebook_ID = '7488c770fd8690bfebf2';

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

    //open the Advanced Dropdown 
    functions.open_advanceddiv(casper);

    casper.then(function () {
        this.evaluate(function () {
            $('#import_notebooks').click();
        });
        this.echo('opened import notebook dialog box');
        this.wait(2000);
        casper.evaluate(function () {
            $('#import-gists').val(Notebook_ID);
        });
        this.echo('Entering notebook ID');
        this.wait(2000);
        casper.evaluate(function () {
            $('#import-prefix').val(prefix_name);
        });
        this.echo('Entering Prefix name');
        this.wait(2000);
        this.evaluate(function () {
            $('#import-notebooks-dialog span.btn-primary').click();
            console.log("Clicking on import button");
        });
    });

    casper.wait(2000);

    casper.then(function () {
        for (var i = 1; i < 10; i++) {
            var text = this.fetchText({
                type: 'xpath',
                path: ".//*[@id='editor-book-tree']/ul/li[1]/ul/li[1]/ul/li[" + i + "]/div/span[1]"
            });
        }
        this.wait(5000);
        this.test.assertSelectorHasText({
            type: 'xpath',
            path: ".//*[@id='editor-book-tree']"
        }, prefix_name, "Verifying whether the imported notebook's prefix name exists or not under My Notebook tree");
    });

    casper.then(function () {
        this.click({type: 'css', path: '.jqtree_common.jqtree-toggler.jqtree-closed'});
        this.wait(5000);
        this.test.assertSelectorHasText({
            type: 'xpath',
            path: ".//*[@id='editor-book-tree']/ul/li[1]/ul/li[1]/ul"
        }, 'Notebook_import', 'Imported Notebook found');
    });

    casper.run(function () {
        test.done();
    });
});

