'use strict';
var Generator = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
var slug = require('slug');

module.exports = Generator.extend({
  prompting: function () {
    // Have Yeoman greet the user.
    this.log(yosay(
      'Welcome to the slick ' + chalk.red('generator-umicms-components') + ' generator!'
    ));

    var prompts = [
      {
        name: 'destRootPath',
        message: 'Give the relative path to the root of UMI.CMS',
        default: './'
      },
      {
        name: 'title',
        message: 'What is the title of the new UMI.CMS module?',
        default: 'My Module Title'
      },
      {
        name: 'name',
        message: 'What is the name (slug) of the new UMI.CMS module?',
        default: 'my_module_name'
      },
      {
        name: 'moduleDescription',
        message: 'Give me a description on what your module is supposed to do',
        default: 'A sample description'
      },

      //author and header info
      {
        name: 'authorName',
        message: 'Who is the creator of this module?',
        default: 'Alexey Kornilov'
      },
      {
        name: 'authorEmail',
        message: 'What is your primary e-mail address',
        default: 'mail@site.com'
      },

      {
        name: 'authorURL',
        message: 'What is the site where the author can be reached?',
        default: 'http://site.com'
      },

      {
        name: 'authorGitHub',
        message: 'What is your gitHub account?',
        default: ''
      },

      {
        name: 'authorCompanyName',
        message: '(optional) What is your company name?',
        default: 'Company Name'
      }
    ];

    return this.prompt(prompts).then(function (props) {
      // To access props later use this.props.someAnswer;
      this.props = props;
      var today = new Date();

      var prefix = today.getUTCMonth() + 1;
      prefix += '-' + today.getDate();
      prefix += '-' + today.getFullYear();

      this.currentDate = prefix;
      this.destRootPath = props.destRootPath;
      this.title = props.title;
      this.name = props.name;
      this.safeModuleName = slug(this.name, {
        replacement: '_',
        lower: false
      });
      this.moduleDescription = props.moduleDescription;
      this.authorName = props.authorName;
      this.authorEmail = props.authorEmail;
      this.authorURL = props.authorURL;
      this.authorGitHub = props.authorGitHub;
      this.authorTwitter = props.authorTwitter;
      this.authorCompanyName = props.authorCompanyName;
    }.bind(this));
  },

  writing: function () {
    var destModulePath = this.destRootPath + 'classes/modules/' + this.safeModuleName;
    var destComponentsPath = this.destRootPath + 'classes/components/' + this.safeModuleName;

    var tplsTemplate = {
      currentDate: this.currentDate,
      destRootPath: this.destRootPath,
      title: this.title,
      name: this.name,
      safeModuleName: this.safeModuleName,
      moduleDescription: this.moduleDescription,
      authorEmail: this.authorEmail,
      authorURL: this.authorURL,
      authorGitHub: this.authorGitHub,
      authorTwitter: this.authorTwitter,
      authorCompanyName: this.authorCompanyName
    }

    this.fs.copyTpl(
      this.templatePath('classes/_install.php'),
      this.destinationPath(destModulePath + '/install.php'), tplsTemplate
    );
    this.fs.copyTpl(
      this.templatePath('classes/_class.php'),
      this.destinationPath(destModulePath + '/class.php'), tplsTemplate
    );
    this.fs.copyTpl(
      this.templatePath('classes/_admin.php'),
      this.destinationPath(destModulePath + '/__admin.php'), tplsTemplate
    );
    this.fs.copyTpl(
      this.templatePath('classes/_event_handlers.php'),
      this.destinationPath(destModulePath + '/__events.php'), tplsTemplate
    );
    this.fs.copyTpl(
      this.templatePath('classes/events.php'),
      this.destinationPath(destModulePath + '/events.php'), tplsTemplate
    );
    this.fs.copyTpl(
      this.templatePath('classes/permissions.php'),
      this.destinationPath(destModulePath + '/permissions.php'), tplsTemplate
    );
    this.fs.copyTpl(
      this.templatePath('classes/_i18n.php'),
      this.destinationPath(destModulePath + '/i18n.php'), tplsTemplate
    );
    this.fs.copyTpl(
      this.templatePath('classes/_i18n.en.php'),
      this.destinationPath(destModulePath + '/i18n.en.php'), tplsTemplate
    );
    this.fs.copyTpl(
      this.templatePath('classes/_lang.php'),
      this.destinationPath(destModulePath + '/lang.php'), tplsTemplate
    );
    this.fs.copyTpl(
      this.templatePath('classes/_lang.en.php'),
      this.destinationPath(destModulePath + '/lang.en.php'), tplsTemplate
    );
    this.fs.copyTpl(
      this.templatePath('classes/_custom.php'),
      this.destinationPath(destModulePath + '/__custom.php'), tplsTemplate
    );
    this.fs.copyTpl(
      this.templatePath('classes/_custom_adm.php'),
      this.destinationPath(destModulePath + '/__custom_adm.php'), tplsTemplate
    );
    this.fs.copy(
      this.templatePath('classes/custom_events.php'),
      this.destinationPath(destModulePath + '/custom_events.php')
    );
    this.fs.copy(
      this.templatePath('classes/custom_perms.php'),
      this.destinationPath(destModulePath + '/permissions.custom.php')
    );


  },

  install: function () {
    // this.installDependencies();
  }
});
