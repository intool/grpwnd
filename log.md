#Welcome to GrPwnd!
This is a log for everything I've done with the project.
Its structured chronologically so you can follow at home :-)

#**ZERO Warranty is implied or suggested by OpenSourcing this code!!** 

If you don't know what you are doing '*under the hood*' of a PC or you have never written any code, this will not be the best place to learn... Not that the log is incomplete, just because I do not recommend trying to *fly* before you can crawl! Go read up on [JavaScript](http://en.wikipedia.org/wiki/JavaScript), [HTML](http://en.wikipedia.org/wiki/HTML) [Servers](http://en.wikipedia.org/wiki/Web_server) and [How Web Servers Work](http://www.howstuffworks.com/web-server.htm/printable) before attempting any of the *fancy* **NodeJS** stuff! NodeJS is the ClusterBomb of Programming... Seriously kids, don't play with weapons! 

##
There are plenty of excellent NodeJS resources





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

####NPM (Node Package Manager)

Run this command in your terminal:

	$ curl http://npmjs.org/install.sh | sh

Success message:

	>> /usr/local/bin/npm -> /usr/local/lib/node_modules/npm/bin/npm.js npm@1.0.9 /usr/local/lib/node_modules/npm 
	>> It worked

else troubleshoot at: [https://github.com/isaacs/npm](https://github.com/isaacs/npm)

####MongoDB (the place to store all our data)

add mongo... :-)

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

it will look something like:

	ssh-dss AAAAB3NzaC1kc3MAAACBAMTbrIUDNhE+Krfp1JxTU0DjqLoF0cigYe/6DmGx/	ZcXR306A7SBTZMeHcSRPaIP/2O2H3T16eG43l9vJfQqCdYmQ4zDSFhdHnIdbW1hBoYjCZhYK4N661K6Mc7ON5Llw15232WF9SR8w9EefU7PYih42RDwna/+i8pKEieu74sTAAAAFQCQ4VEcqQfnDb+R0MGmgESOUNAC9QAAAIBrH6H+ticqBTZ9x+qQNyHL1A3o7jvPF5oMLuOfxonZefWN300+toOBf0URsyCaZb7leO+jybb+F2ybnGXzQd0m2h6HXDLvbyT3WQ2BBePiaQUbedaDr3n5MrMf6IF44v8J3/fS1kASMcuvywMijVzvxQElY14uFllFmLfirFfZ0gAAAIA9Yielpsm9XxGwYfpIy9SemLJ8HWZv2lbD6PGUD4GxE5tqTe5PyFDxRMhuyCrp8xeL/vtMoh7V0NIPKI5wbQULmEM7OnFkyLQjKTFaZI2aoEN7kooIGUaVRiNku1aY4o4/ukGKfaQqeJtg3HV3nzJBJnITnGTzYMJG7U5kghQyZw== user@debian

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

