import Debug from 'debug';
import { CommandDefinition, CommandParameter, CommandArgument } from '@chimpwizards/wand/commons/command/'
import { Init } from '@chimpwizards/wand/commands/'

const debug = Debug("w:cli:commands:init");

@CommandDefinition({ 
    description: 'Add new cli extensions',
    alias: 'l',
    examples: [
        [`spell add application`, `Add the applicatin spell`],
        [`spell add application --force`, `Force an update of the application spell`],
        [`spell add application --release 1.2`, `Install version 1.2 for the application spell`],
        [`spell add application --no-global`, `Install spell local to current application`],
    ]
})
export class Spell extends Init  { 

    @CommandArgument({ description: 'Spell name', name: 'spell-name'})
    @CommandParameter({ description: 'Spell name'})
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

