Developer Environment Configuration
===================================

These are the steps to get up and running with a clean installation of your OS.  Many steps, such as creating your SSH keypair may not be necessary if you already have a functioning development environment.


* One-Time Setup
  * System-Specific Steps
  * Install the Sun/Oracle Java 6 JDK
  * Install the Oracle Java 7 JDK
  * Install git and maven
    * Configure maven
    * Configure gradle
  * Create an SSH Keypair
  * Configure your SSH keys in Stash
  * Install VirtualBox
  * Install Vagrant
    * Configure your AWS Credentials
    * Prepare your vagrant environment
* Checkout and prepare sf-webapp
  * Get the code
  * Setup developer.ini
  * Download Realtime Update dependencies
    * Troubleshooting
* Run the app
* Install Facebook Certificates

# One-Time Setup

## System-Specific Steps

*OSX*

**Disable OSX Firewall**

1. Open "System Preferences"
2. Go to "Security and Privacy"
3. Go to the "Firewall" tab
4. Click "Turn off Firewall

*Ubuntu*

**Install nfsd**

In a terminal session, enter:

```
sudo apt-get install -y nfs-kernel-server
```

## Install the Sun/Oracle Java 6 JDK

Java 6 is required for sf-webapp versions v5.4 and prior.

*OSX*

Open Terminal, and enter:

```
java -version
```

You will either see the version of the currently installed JVM, or you will be prompted to install the Sun JDK 1.6. Download the last 1.6 release from Apple's support site: http://support.apple.com/kb/DL1572?viewlocale=en_US

*Ubuntu*

Open a Terminal and enter:

```
sudo apt-add-repository ppa:webupd8team/java
sudo apt-get update
sudo apt-get install oracle-java6-installer
sudo update-java-alternatives -s java-6-oracle
```

## Install the Oracle Java 7 JDK

Java 7 is required for sf-webapp versions v.7.0 and greater and all Social Network Gateway and Riverstore versions.

*OSX*

1. Download the JDK from Oracle. 
2. Install the downloaded package.
3. Create or edit ~/.bash_profile with the following contents:

```
# set the default jdk to Java 7
export JAVA_HOME=$(/usr/libexec/java_home -v 1.7)
 
alias java6='JAVA_HOME=$(/usr/libexec/java_home -v 1.6) "$@"'
```
4. Open (or close and re-open your shell)
5. Verify your default JDK:

```
bcarr@harley:~$ java -version
 
java version "1.7.0_45"
Java(TM) SE Runtime Environment (build 1.7.0_45-b18)
Java HotSpot(TM) 64-Bit Server VM (build 24.45-b08, mixed mode)
 
bcarr@harley:~$ java6 java -version
 
 
java version "1.6.0_65"
Java(TM) SE Runtime Environment (build 1.6.0_65-b14-462-11M4609)
Java HotSpot(TM) 64-Bit Server VM (build 20.65-b04-462, mixed mode)
```

*Ubuntu*

Open a Terminal and enter:

```
sudo apt-add-repository ppa:webupd8team/java
sudo apt-get update
sudo apt-get install oracle-java7-installer
sudo update-java-alternatives -s java-7-oracle
```

## Install git and maven

*OSX*



*Ubuntu*


### Configure maven

*OSX*

*Ubuntu*


### Configure gradle

*OSX*

*Ubuntu*


## Create an SSH Keypair

*OSX*

*Ubuntu*

## Configure your SSH keys in Stash

*OSX*

*Ubuntu*

## Install VirtualBox

*OSX*

*Ubuntu*

## Install Vagrant

*OSX*

*Ubuntu*

### Configure your AWS Credentials

*OSX*

*Ubuntu*

### Prepare your vagrant environment

*OSX*

*Ubuntu*

# Checkout and prepare sf-webapp

*OSX*

*Ubuntu*

## Get the code

*OSX*

*Ubuntu*

## Setup developer.ini

*OSX*

*Ubuntu*

## Download Realtime Update dependencies

*OSX*

*Ubuntu*

### Troubleshooting

*OSX*

*Ubuntu*

# Run the app

*OSX*

*Ubuntu*

# Install Facebook Certificates


# Install Eclipse

https://www.eclipse.org/downloads/

## Vaadin Plug-in for Eclipse

http://vaadin.com/eclipse




