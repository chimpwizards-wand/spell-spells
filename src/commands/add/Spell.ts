import Debug from 'debug';
import { Config } from '@chimpwizards/wand'
import { CommandDefinition, CommandParameter, CommandArgument } from '@chimpwizards/wand/commons/command/index'
import { Execute } from '@chimpwizards/wand'
import { Init } from '../Init';

const chalk = require('chalk');
const boxen = require('boxen');
const clear = require("clear");
const figlet = require("figlet");
const debug = Debug("w:cli:commands:init");

@CommandDefinition({ 
    description: 'Add new spell',
    alias: 's',
    examples: [
        [`add spell application`, `Add the applicatin spell`],
        [`add spell application --force`, `Force an update of the application spell`],
        [`add spell application --release 1.2`, `Install version 1.2 for the application spell`],
        [`add spell application --no-global`, `Install spell local to current application`],
    ]
})
export class Spell extends Init  { 

    @CommandArgument({ description: 'spell name', required: true})
    name: string = '';

    spells: string[] = []
    getSpells() {
        return this.spells;
    }

    execute(yargs: any): void {
        debug(`Add Spell`)

        //Install Package
        this.spells.push(`spell-${this.name}`)
        super.execute(yargs);

        //Register package in datastore

    }

}

export function register ():any {
    debug(`Registering....`)
    let command = new Spell();
    debug(`INIT: ${JSON.stringify(Object.getOwnPropertyNames(command))}`)

    return command.build()
}

