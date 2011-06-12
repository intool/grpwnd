#Welcome to GrPwnd!
This is a log for everything I've done with the project.
Its structured chronologically so you can follow at home :-)

#**ZERO Warranty is implied or suggested by OpenSourcing this code!!** 

If you don't know what you are doing '*under the hood*' of a PC or you have never written any code, this will not be the best place to learn... Not that the log is incomplete, just because I do not recommend trying to *fly* before you can crawl! Go read up on [JavaScript](http://en.wikipedia.org/wiki/JavaScript), [HTML](http://en.wikipedia.org/wiki/HTML) [Servers](http://en.wikipedia.org/wiki/Web_server) and [How Web Servers Work](http://www.howstuffworks.com/web-server.htm/printable) before attempting any of the *fancy* **NodeJS** stuff! NodeJS is the ClusterBomb of Programming... Seriously kids, don't play with weapons! 

##Enough Chat Lets Pwn Some Knowledge!

There are plenty of excellent NodeJS resources

###Crawling and XML/HTML Parsing 

####Brief review of [NodeJS XML Modules](https://github.com/joyent/node/wiki/modules#parsers-xml)

As usual, there is no clear direction on which XML Parsing module to use, so I will test a handful until I find one that works.

#####[FAIL] [Node-XML](https://github.com/robrighter/node-xml/wiki) - the aparantly simple choice...?

	$ npm install node-xml **FAILS**
	
	$ mkdir crawlie
	$ git clone git://github.com/robrighter/node-xml.git

Its an OK module but a quick search reveals taht the node.io module has 10x the watchers on github so looking into that instead... :-O

#####[node.io](https://github.com/chriso/node.io)
	
	$ su -
	$ npm install node.io -g

Success:

	node.io@0.3.0 /usr/local/lib/node_modules/node.io 
	├── coffee-script@1.1.1
	├── htmlparser@1.7.3
	└── jquery@1.5.1


to include the lib call:

	require('/usr/local/lib/node_modules/node.io') 

Test file:

	$ gedit crawlie.js

Paste: 

	require('/usr/local/lib/node_modules/node.io').scrape(function() {
    		this.getHtml('http://www.reddit.com/', function(err, $) {
        	var stories = [];
        	$('a.title').each(function(title) {
            		stories.push(title.text);
        	});
        	this.emit(stories);
    		});
	});

Run:

	$ node crawlie.js

it works.
Now lets setup **CRON** to run it every minute:

	$ crontab -e

Paste:	

	*/1 * * * * /home/user/node/node /home/user/grpwnd/betadash/crawlie/crawlie.js

Ok so we are slurping in the raw html/xml data now we need to parse it.

#####[node-xml2js](https://github.com/Leonidas-from-XIV/node-xml2js)

Simple XML to JavaScript object converter taht uses sax-js

	$ npm install xml2js

	xml2js@0.1.6 ./node_modules/xml2js 
	└── sax@0.1.2

*note: this is in the list to install in Appendix A * :-)

######Simple Usage:

	var sys = require('sys'),
    	fs = require('fs'),
    	xml2js = require('xml2js');

	var parser = new xml2js.Parser();
	parser.addListener('end', function(result) {
    		console.log(sys.inspect(result));
    		console.log('Done.');
	});
	fs.readFile(__dirname + '/foo.xml', function(err, data) {
    	parser.parseString(data);
	});

Had to call it a day on xml2js because *at the time of writing* June 2011 there is no wiki, documentation or any sort of usage examples...
And I agree with [this issue](https://github.com/Leonidas-from-XIV/node-xml2js/issues/1) on github regarding the syntax.

	$ node parse_test.js

Outputs:

	city: { '@': [Object], country: [Object] },
        type: { '@': [Object] },
        status: { '@': [Object] } } }

There is no clear way to assign the parsed object to an array and then access the atributes.
So...

Must keep trying.



#####[libxmljs](https://github.com/polotek/libxmljs)

Decided to try [libxmljs](https://github.com/polotek/libxmljs) as it has better documentation...
But fails when trying to install via npm... :-(
Added a [comment](https://github.com/polotek/libxmljs/issues/34#issuecomment-1306054) to the issue Q on github.
If I get a response, I will re-try libxmljs but for now so *onto the next one...*


#####[node-o3-xml](https://github.com/ajaxorg/node-o3-xml)

According to [this stack faq](http://stackoverflow.com/questions/5672151/any-recommendation-for-xml-to-json-for-node-js) the next one to try is node-o3-xml.
Lets go!

	$ npm install node-o3-xml **[FAIL]**
	$ cd node_modules
	$ git clone https://github.com/ajaxorg/node-o3-xml

Success outputs:

	Cloning into node-o3-xml...
	remote: Counting objects: 255, done.
	remote: Compressing objects: 100% (135/135), done.
	remote: Total 255 (delta 79), reused 255 (delta 79)
	Receiving objects: 100% (255/255), 39.42 MiB | 147 KiB/s, done.
	Resolving deltas: 100% (79/79), done.

A **40 MB** Lib!! WTF! Just to parse a bit of XML... don't know efficient this is going to be.

So tried the [example.js](https://github.com/ajaxorg/node-o3-xml/blob/master/example/example.js) note had to change the require resource to: 
`var xml = require("../node-o3-xml/lib/o3-xml");` but got a 

	**Segmentation Fault**

As per [this issue](https://github.com/ajaxorg/node-o3-xml/issues/11) *I'm a Sad Panda...* :-(

Never a good sign when you see this:

	Count :: 208
	(node) warning: possible EventEmitter memory leak detected. 11 listeners added. Use emitter.setMaxListeners() to increase limit.



##Appendix A - Up And Running

###Requirements

To replicate you will need:

+ A modern computer (pc or mac) that will run linux (almost all will!) prefferably with a CD-Writer so you can burn a Linux OS. 

+ 512MB+ RAM pref 1GB (I run my Linux Guest OS with 2GB...) [YMMV](http://en.wiktionary.org/wiki/your_mileage_may_vary)

+ Download a copy of the latest [Debian](http://debian.org) OS (you will need a writeable CD to burn the OS to) **or** you can order a CD from [ubuntu](http://www.ubuntu.com/download/ubuntu/cds) (costs may apply)

+ If you don't have a CD-Writer or Blank CDs to hand :-( you can try [Pen Drive Linux](http://www.pendrivelinux.com/) on a USB Stick!

+ Aprox 2hours of time to play with :-)

Note: if the PC you are working with is not '*spare*' or you still need the windows/mac system that is on it, you will also need to [download](http://www.virtualbox.org/wiki/Downloads) and install [VirtualBox](http://en.wikipedia.org/wiki/VirtualBox) to allow you to run Linux as a ["Guest OS"](http://www.virtualbox.org/wiki/Guest_OSes) on your PC. 

###Instalation

Right, first you need to install Debian Linux on your system either natively/dual-boot or using Virtual Box so...

####Linux in a Virtual Machine

1. Download [VirtualBox](http://www.virtualbox.org/wiki/Downloads) and install it in the *standard* way for your operating system. (if you don't know how to do this, please stop reading now!) 
2. Donwload [Debian](http://debian.org) Linux and record the ISO onto a CD-R/RW. (if you are on windows I recommend Alex Feinman's [IsoRecorder](http://alexfeinman.com/isorecorder.htm) for writing the Debian ISO to a writeable CD.
3. Open VirtuaBox and create a new VM. Its a simple wizard... (Sorry to gloss over installing linux but its quite well documented online.) See: [http://www.wikihow.com/Install-Ubuntu-on-VirtualBox](http://www.wikihow.com/Install-Ubuntu-on-VirtualBox)

Once you have a working install of Linux open the *Terminal*  and run:

	$ sudo apt-get install g++ curl libssl-dev apache2-utils git-core

That will install everything you need to build & run a basic NodeJS app.

####Install NodeJS
![node logo](http://nodejs.org/logo.png "Node Logo ")

Clone a copy of Node from GitHub:
	$ git clone git://github.com/joyent/node.git
	$ cd node
	$ ./configure
	$ make install

if the message you get looks like:

	>> Waf: Leaving directory `/home/user/node/build'
	>> 'install' finished successfully (8m24.781s)

You are ready to *Node*!
If you got any error messages please go to: [Node install wiki](https://github.com/joyent/node/wiki/Installation) for troubleshooting.

#####Hello World App (to test its working!)
In your terminal type:
'gedit hello.js'
and paste:

	var http = require('http');
	http.createServer(function (req, res) {
	  res.writeHead(200, {'Content-Type': 'text/plain'});
	  res.end('Hello World\n');
	}).listen(80);
	console.log('Server running at http://127.0.0.1:80/');

Save.
In the terminal run:

	$ su -

( we want to test if we can run node as root to get access to port 80 )

	$ node hello.js

Open a WebBrowser and visit the page: [http://127.0.0.1/](http://127.0.0.1/)

To escape the Node server in terminal type: **CTRL + C**

#####A Few Resources
[Node Beginner Toutorials](http://nodebeginner.org)

####NPM (Node Package Manager)

Run this command in your terminal:

	$ curl http://npmjs.org/install.sh | sh

Success message:

	>> /usr/local/bin/npm -> /usr/local/lib/node_modules/npm/bin/npm.js npm@1.0.9 /usr/local/lib/node_modules/npm 
	>> It worked

else troubleshoot at: [https://github.com/isaacs/npm](https://github.com/isaacs/npm)

####MongoDB (the place to store all our data)

Please note this installation is **Specific** to **Debian/Ubuntu** Linux! Visit [mongodb](http://www.mongodb.org/downloads) if you have anything else!

	$ sudo apt-key adv --keyserver keyserver.ubuntu.com --recv 7F0CEB10

Now add this line to your sources: 

	deb http://downloads-distro.mongodb.org/repo/ubuntu-upstart dist 10gen

Then run:

	$ sudo apt-get update 
	$ sudo apt-get install mongodb-10gen **IGNORE** use mongodb instead of the 10gen version!

Output:

	The following NEW packages will be installed:
  	mongodb-10gen
	0 upgraded, 1 newly installed, 0 to remove and 0 not upgraded.
	Need to get 26.9 MB of archives.
	After this operation, 68.2 MB of additional disk space will be used.
	Get:1 http://downloads-distro.mongodb.org/repo/ubuntu-upstart/ dist/10gen mongodb-10gen i386 1.8.1 [26.9 MB]
	**Fetched 26.9 MB in 2min 38s (169 kBs)**
	Selecting previously deselected package mongodb-10gen.
	(Reading database ... 132715 files and directories currently installed.)
	Unpacking mongodb-10gen (from .../mongodb-10gen_1.8.1_i386.deb) ...
	Processing triggers for man-db ...
	Setting up mongodb-10gen (1.8.1) ...
	Adding system user `mongodb' (UID 109) ...
	Adding new user `mongodb' (UID 109) with group `nogroup' ...
	Not creating home directory `/home/mongodb'.
	Adding group `mongodb' (GID 117) ...
	Done.

Now we need to create the data dir:

	$ sudo mkdir /data /data/db
	$ sudo chown mongodb /data/db
	$ sudo chown `id -u` /data/db

Check the settings at **/etc/mongodb.conf**

	$  cat /etc/mongodb.conf

Tried:
	sudo apt-get install mongodb-stable

got:

	E: Package 'mongodb-stable' has no installation candidate
So:

	$ sudo apt-get install mongodb

#####Starting Up

To start the MongoDatabase server, type this command:

	$ mongod 

You should see something like:

	mongod --help for help and startup options
	Sun Jun  6 06:24:57 Mongo DB : starting : pid = 2743 port = 27017 dbpath = /data/db/ master = 0 slave = 0  32-bit 

	** NOTE: when using MongoDB 32 bit, you are limited to about 2 gigabytes of data
	**       see http://blog.mongodb.org/post/137788967/32-bit-limitations for more

	Mon Jun  6 09:24:57 db version v1.4.4, pdfile version 4.5
	Mon Jun  6 09:24:57 git version: nogitversion
	Mon Jun  6 09:24:57 sys info: Linux murphy 2.6.32.14-dsa-ia32 #1 SMP Thu May 27 16:19:20 CEST 2010 i686 	BOOST_LIB_VERSION=1_42
	Mon Jun  6 09:24:57 waiting for connections on **port 27017**
	Mon Jun  6 09:24:57 **web admin interface listening on port 28017**

**GREAT SUCCESS!!** - if not, google the *exact* err msg you get when starting up and you easily find the solution... :-)

Now go thru the [short tutorial](http://api.mongodb.org/wiki/current/Tutorial.html)

	MongoDB shell version: 1.8.1
	usage: mongo [options] [db address] [file names (ending in .js)]
	db address can be:
	  foo                   foo database on local machine
	  192.169.0.5/foo       foo database on 192.168.0.5 machine
	  192.169.0.5:9999/foo  foo database on 192.168.0.5 machine on port 9999
	options:
	  --shell               run the shell after executing files
	  --nodb                don't connect to mongod on startup - no 'db address' 

####Repairing After a *Hard Shutdown*, Server Fail or Power Outage [Durability & Repair](http://www.mongodb.org/display/DOCS/Durability+and+Repair)

If for any reason your mongod server is shut down, you may need to run this command:

	$ mongod --repair

####Authentication [Security](http://www.mongodb.org/display/DOCS/Security+and+Authentication)

If no users are configured in admin.system.users, one may access the database from the localhost interface without authenticating. Thus, from the server running the database (and thus on localhost), run the database shell and configure an administrative user:

	$ ./mongo
	> use admin
	> db.addUser("theadmin", "anadminpassword") // sorry, not putting actuals in a public log - for obvious reasons! :-p
	{
	"user" : "theadmin",
	"readOnly" : false,
	"pwd" : "d020be8fae8e5a9952001660b1519d70"
	}


We now have a user created for database admin. Note that if we have not previously authenticated, we now must if we wish to perform further operations, as there is a user in admin.system.users.

	> db.auth("theadmin", "anadminpassword")

We can view existing users for the database with the command:

	> db.system.users.find()

**Causing Connection Error with Native Driver...!**

	> db.removeUser( theadmin )

####MongoDB NodeJS Modules

Need to do a quick eval of the different [MongoDB NodeJS Modules](https://github.com/joyent/node/wiki/modules#db-nosql-mongo) to confirm which is the fastes/easiest to use.

-  [Node-MongoDB-Native](https://github.com/christkv/node-mongodb-native) - from the number of watchers on GitHub (664) appears to be the obvious choice.

Syntax:

	var client = new Db('test', new Server("127.0.0.1", 27017, {})),
    		test = function (err, collection) {
     	 		collection.insert({a:2}, function(err, docs) {

        		collection.count(function(err, count) {
          		test.assertEquals(1, count);
        		});

        	// Locate all the entries using find
        	collection.find().toArray(function(err, results) {
          		test.assertEquals(1, results.length);
          		test.assertTrue(results.a === 2);

          	// Let's close the db
          	client.close();
        	});
      	    });
    	};

	client.open(function(err, p_client) {
  		client.collection('test_insert', test);
	});

Certainly full featured...

Install:

	$ git clone https://github.com/christkv/node-mongodb-native
	$ cd node-mongodb-native
	$ make

Success:

	'build' finished successfully (5.523s)
	=== EXECUTING TEST_BSON ===
	=== EXECUTING TEST_FULL_BSON ===
	make[1]: Leaving directory `/home/user/grpwnd/node_modules/node-mongodb-native/external-libs/bson'


-  But... the [syntax](http://stackoverflow.com/questions/4688693/node-js-mongodb) of [MongoSkin](https://github.com/guileen/node-mongoskin) is far simpler to grok.

e.g:

	var mongo = require('mongoskin');
	var db = mongo.db('admin:pass@localhost/mydb?auto_reconnnect');
	db.collection('mycollection').find().toArray(function(err, items){
  		 // do something with items
	});

Quite simpel... :-)

	$ npm install mongoskin 

	make[1]: Leaving directory `/home/user/grpwnd/node_modules/mongoskin/node_modules/mongodb/external-libs/bson'
	mongoskin@0.1.3 ./node_modules/mongoskin 
	└── mongodb@0.9.4-5



--------

####NPM Packages

	$ npm install express mongoose express-mongoose connect-mongodb jade stylus less expresso forever forms express-resource
	$ su -
	$ npm install nodemon -g

####[Git Setup](http://help.github.com/linux-set-up-git/)

If you have not yet registered for a [GitHub]() account, what are you wating for? Go to (https://github.com/signup/free)[https://github.com/signup/free] and get your **Free** account! :-)

Now run the initial commands in terminal:

*Replace with your own details*

	$ git config --global user.name "**Alan Touring**"
	$ git config --global user.email **grpwnd@gmail.com**

**IF** you don't alreay have an SSH Public/Private key you will need to create one:

	$ ssh-keygen -t dsa

This creates a pair of keys in the directory: /home/user/.ssh/
to view the files:

	$ cd /home/user/.ssh/
	$ ls

open/view the id_dsa.pub file with:

	$ cat id_dsa.pub

The output will look something like this:

	ssh-dss AAAAB3NzaC1kc3MAAACBAMTbrIUDNhE+Krfp1JxTU0DjqLoF0cigYe/6DmGx/	ZcXR306A7SBTZMeHcSRPaIP/2O2H3T16eG43l9vJfQqCdYmQ4zDSFhdHnIdbW1hBoYjCZhYK4N661K6Mc7ON5Llw15232WF9SR8w9EefU7PYih42RDwna/+i8pKEieu74sTAAAAFQCQ4VEcqQfnDb+R0MGmgESOUNAC9QAAAIBrH6H+ticqBTZ9x+qQNyHL1A3o7jvPF5oMLuOfxonZefWN300+toOBf0URsyCaZb7leO+jybb+F2ybnGXzQd0m2h6HXDLvbyT3WQ2BBePiaQUbedaDr3n5MrMf6IF44v8J3/fS1kASMcuvywMijVzvxQElY14uFllFmLfirFfZ0gAAAIA9Yielpsm9XxGwYfpIy9SemLJ8HWZv2lbD6PGUD4GxE5tqTe5PyFDxRMhuyCrp8xeL/vtMoh7V0NIPKI5wbQULmEM7OnFkyLQjKTFaZI2aoEN7kooIGUaVRiNku1aY4o4/ukGKfaQqeJtg3HV3nzJBJnITnGTzYMJG7U5kghQyZw== user@debian

Note: if you have never seen public/private key before please go do your [ssh homework](http://en.wikipedia.org/wiki/Secure_Shell)

Copy this as you need to paste it into your [GitHub SSH settings](https://github.com/account/ssh)

Now back in the terminal:

	$ mkdir grpwnd
	$ cd grpwnd
	$ git init
	$ touch README
	$ git add README
	$ git commit -m 'first commit'
	$ git remote add origin git@github.com:grpwnd/grpwnd.git
	$ git push -u origin master

Existing Git Repo?

	$ cd existing_git_repo
	$ git remote add origin git@github.com:grpwnd/grpwnd.git
	$ git push -u origin master
	
On a new computer:
	
	$ git clone git://github.com/grpwnd/grpwnd
	$ cd grpwnd
	$ git remote add tpsorigin git@github.com:grpwnd/grpwnd.git


####LAMP Stack

For when you need to resort to bad habits... [setup tutorial](http://linux.justinhartman.com/Setting_up_a_LAMP_Server)

#####Apache2+PHP5:

Install:

	$ apt-get install apache2 php5 libapache2-mod-php5

Output:

	Creating config file /etc/php5/cli/php.ini with new version
	update-alternatives: using /usr/bin/php5 to provide /usr/bin/php (php) in auto mode.
	Setting up php5-suhosin (0.9.32.1-1) ... done.

Start:

	$ /etc/init.d/apache2 start

Check:

	$ vi /var/www/test.php

Paste:
	
	<?php phpinfo(); ?>

php.ini:

	$ gedit /etc/php5/apache2/php.ini

**DEVELOPMENT VALUES**:

-  memory_limit = 1028M
-  max_execution_time = 300
-  max_input_time = 600
-  upload_max_filesize = 500M
-  post_max_size = 280M

Restart:

	$ /etc/init.d/apache2 restart

#####MySQL

Install:

	$ apt-get install mysql-server mysql-client php5-mysql

Conf:

	$ gedit /etc/mysql/my.cnf

#####PHPMyAdmin

Install:

	$ apt-get install phpmyadmin

Update conf:

	$ vi /etc/apache2/apache2.conf

Paste:

	Include /etc/phpmyadmin/apache.conf

#####*SuperQuick* **INSECURE** PHP File Uploads *NEVER USE IN PRODUCTION!!* :

upload.html:

	<html>
	  <body>

		<form action="uploader.php" method="post" enctype="multipart/form-data">
		 <label for="file">Filename:</label>
		 <input type="file" name="file" id="file" /> 
		 <br />
		 <input type="submit" name="submit" value="Submit" />
		</form>

	  </body>
	</html>

uploader.php:

	<?php
	  $target_path = "./uploads/";

	  $target_path = $target_path . basename( $_FILES['file']['name']); 

	if(move_uploaded_file($_FILES['file']['tmp_name'], $target_path)) {
	    echo "The file ".  basename( $_FILES['file']['name']) ." has been uploaded";
	} else{
    	    echo "There was an error uploading the file to :: " .$target_path ." ... please try again!";
	}
	?>

Import a MYSQL Dump:

	mysql -u username -p databasename < mysqlfile.sql
e.g.

	mysql -u root -p dealzip < dealzip6m_8m.sql




##Appendix B - Misc Resources

- [Javascript Namespace Declaration](http://stackoverflow.com/questions/881515/javascript-namespace-declaration) -- essential for keeping code tidy.

- [Javascript Date Basics](http://www.web-source.net/web_development/javascript_date.htm)

	var now = new Date();	

		getTime() - Number of milliseconds since 1/1/1970 @ 12:00 AM
		getSeconds() - Number of seconds (0-59)
		getMinutes() - Number of minutes (0-59)
		getHours() - Number of hours (0-23)
		getDay() - Day of the week(0-6). 0 = Sunday, ... , 6 = Saturday
		getDate() - Day of the month (0-31)
		getMonth() - Number of month (0-11)
		getFullYear() - The four digit year (1970-9999)

- [StackOverflow Discussion of Best IDE for JS](http://stackoverflow.com/questions/41880/javascript-ides), [With JQuery Support](http://stackoverflow.com/questions/209126/good-javascript-ide-with-jquery-support) and [JSf + HTML](http://stackoverflow.com/questions/187818/any-ides-for-javascript-html) -- I'm using [jedit](http://www.jedit.org/) as its lightweigt, has a file browser and opens each source file in its own window which is good if you have multi-monitor config. :-) -- But another option is [Aptana Studio](http://docs.aptana.com/docs/index.php/Installing_Aptana_on_Linux) which is more feature-rich but I find it a bit slower when running in a VM. if you have a *Native* linux/mac computer with a decent amount of RAM, then Aptana is the way to go.

- Excellent [Object.size method](http://stackoverflow.com/questions/5223/length-of-javascript-associative-array) for determining the size of any object/array in JS. -- I think it might be the *exact* same one as in DC's *The Good Parts*.

- [MongoDB Security & Authentication](http://www.mongodb.org/display/DOCS/Security+and+Authentication) - For obvious reasons, we need to ensure a simple level of security. But as we are sharing our code on GitHub we need to remember to change the passwords in production. :-)

- [MongoDB Command Line Parameters](http://www.mongodb.org/display/DOCS/Command+Line+Parameters) a good list of all the options you can pass into the **mongod** command to specify a diff port, data dir or mem cache.

- [Node JS Event Emiters and Callbacks](http://howtonode.org/control-flow-part-ii) - Read up if you are having issues understanding the diference.

- [Getting started with Node.io](https://github.com/chriso/node.io/wiki/Getting-Started) - The Wiki for the project.

- [Good introduction to Global Variables in JS](http://snook.ca/archives/javascript/global_variable) - If you have not yet read *"The Good Parts"* by DC then this will be a good primer. 


-------


###Interesting Stuff To Look Into *Later*

- [Monkey.org Crawl](http://monkey.org/~provos/crawl/) utility starts a depth-first traversal of the web at the specified URLs. It stores all JPEG images that match the configured constraints. Crawl is fairly fast and allows for graceful termination. After terminating crawl, it is possible to restart it at exactly the same spot where it was terminated. Crawl keeps a persistent database that allows multiple crawls without revisiting sites. -- ** Look into when building a more feature-rich crawler **

- 
