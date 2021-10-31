export interface newTask  {
    id: number;
    profile: string;
    site: string;
    mode: string;
    project: string;
    monitorDelay: number;
    monitorMode: string;
    policyId?: string;
    verified?: string;
    priceLimit: number;
    status?: string;
    parameters?: derpBirds | babyAlienClub | yummiUniverse | clayNation | tigerSociety | lionlegends | spoopynaru | zomebiechains | cardanotrees;

};

export interface profile  {
    id: number;
    profileName: string;
    email: string,
    password: string,
};


export interface proxyList  {
    id: number;
    name: string;
    data: any[]
};


export interface proxy {
    proxy: string,
    status: string
};

export interface tasksList {
    id?: number;
    title: string;
};


export interface derpBirds {
        rarity: string;
        back: string;
        body: string;
        ears: string;
        eyes: string;
        head: string;
        tail: string;
        color: string;
        beakface: string;
        basecolor: string;
        perfect: string;
};

export interface babyAlienClub {
        hat: string;
        face: string;
        accessory: string;
        mouth: string;
        background: string;
        body: string;
        eyes: string;
        clothes: string;
        traitCount: string;
};

export interface yummiUniverse {
        background: string;
        face: string;
        body: string;
        headwear: string;
};

export interface clayNation {
    body: string;
    eyes: string;
    brows: string;
    mouth: string;
    clothes: string;
    background: string;
    wings: string;
    accessories: string;
    hatsandhair: string;
}

export interface tigerSociety {
    background: string;
    body: string;
    texture: string;
    expression: string;
    eyeWear: string;
    hat: string;
    props: string;
    hair: string;
    rareElement: string;
    jacket: string;
    scarf: string;
    traitCount: string;
}

export interface lionlegends {
    background: string;
    fur: string;
    clothes: string;
    mouth: string;
    eyeWear: string;
    hat: string;
}

export interface spoopynaru {
    background: string;
    face: string;
    headwear: string;
    body: string;
}

export interface zomebiechains {
    hat: string;
    eyes: string;
    nose: string;
    skin: string;
    mouth: string;
    chains: string;
    weapon: string;
    clothing: string;
    earrings: string;
    background: string;
    traitcount: string;
}

export interface cardanotrees {
    fruits: string;
    flowers: string;
    abundance: string;
    species: string;
    numTrees: string;
    enviroment: string;
    country: string;
}

