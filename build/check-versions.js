'use strict';
const packageConfig = require('../package');
const semver = require('semver');
const chalk = require('chalk');
const shell = require('shelljs');

function exec (cmd) {
    return require('child_process').execSync(cmd).toString().trim()
}

const versions = [
    {
        name: 'node',
        currentVersion: semver.clean(process.version),
        versionRequirement: packageConfig.engines.node
    }
];

if (shell.which('npm')) {
    versions.push({
        name: 'npm',
        currentVersion: exec('npm -version'),
        versionRequirement: packageConfig.engines.npm
    })
}


module.exports = function () {
    const warnings = [];
    for (let i = 0; i < versions.length; i++) {
        const version = versions[i];

        if (!semver.satisfies(versions[0].currentVersion, versions[0].versionRequirement)) {
            warnings.push(version.name + ': ' + chalk.red(version.currentVersion) + ' should be ' + chalk.green(version.versionRequirement))
        }
    }

    if (warnings.length) {
        console.log('');
        console.log(chalk.yellow('To use this template, you must update following to modules:'));
        console.log();

        for (let i = 0; i < warnings.length; i++) {
            const warning = warnings[i];
            console.log('  ' + warning);
        }

        console.log();
        process.exit(1);
    }
};