export namespace backend {
	
	export class Base {
	    HP: number;
	    Attack: number;
	    Defense: number;
	    "Sp. Attack": number;
	    "Sp. Defense": number;
	    Speed: number;
	
	    static createFrom(source: any = {}) {
	        return new Base(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.HP = source["HP"];
	        this.Attack = source["Attack"];
	        this.Defense = source["Defense"];
	        this["Sp. Attack"] = source["Sp. Attack"];
	        this["Sp. Defense"] = source["Sp. Defense"];
	        this.Speed = source["Speed"];
	    }
	}
	export class PokemonProfile {
	    height: string;
	    weight: string;
	    egg: string[];
	    ability: string[][];
	    gender: string;
	
	    static createFrom(source: any = {}) {
	        return new PokemonProfile(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.height = source["height"];
	        this.weight = source["weight"];
	        this.egg = source["egg"];
	        this.ability = source["ability"];
	        this.gender = source["gender"];
	    }
	}
	export class PokemonDescription {
	    id: number;
	    name: string;
	    description: string;
	    types: string[];
	    base: Base;
	    profile: PokemonProfile;
	    abilities: string[];
	
	    static createFrom(source: any = {}) {
	        return new PokemonDescription(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.id = source["id"];
	        this.name = source["name"];
	        this.description = source["description"];
	        this.types = source["types"];
	        this.base = this.convertValues(source["base"], Base);
	        this.profile = this.convertValues(source["profile"], PokemonProfile);
	        this.abilities = source["abilities"];
	    }
	
		convertValues(a: any, classs: any, asMap: boolean = false): any {
		    if (!a) {
		        return a;
		    }
		    if (a.slice && a.map) {
		        return (a as any[]).map(elem => this.convertValues(elem, classs));
		    } else if ("object" === typeof a) {
		        if (asMap) {
		            for (const key of Object.keys(a)) {
		                a[key] = new classs(a[key]);
		            }
		            return a;
		        }
		        return new classs(a);
		    }
		    return a;
		}
	}

}

