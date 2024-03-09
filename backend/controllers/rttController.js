exports.calculerRTT = (req, res) => {
    const { annee, joursTravailles, congesPayes } = req.body;

    const nombreJoursAnnee = estBissextile(annee) ? 366 : 365;
    const weekends = nombreWeekends(annee);

    const joursFeriesHorsWeekend = nombreJoursFeriesHorsWeekend(annee);

    console.log('====================================');
    console.log(nombreJoursAnnee, joursTravailles, weekends, joursFeriesHorsWeekend, congesPayes);
    console.log('====================================');

    const joursRTT = nombreJoursAnnee - joursTravailles - weekends - joursFeriesHorsWeekend - congesPayes;

    res.json({ joursRTT });
};

function estBissextile(annee) {
    return (annee % 4 === 0 && annee % 100 !== 0) || (annee % 400 === 0);
}

function nombreWeekends(annee) {
    let nbWeekends = 0;
    for (let mois = 0; mois < 12; mois++) {
        for (let jour = 1; jour <= 31; jour++) {
            let date = new Date(annee, mois, jour);
            // Vérifie si le jour est un samedi (6) ou un dimanche (0)
            if (date.getMonth() === mois && (date.getDay() === 0 || date.getDay() === 6)) {
                nbWeekends++;
            }
        }
    }
    return nbWeekends;
}


function calculerPaques(annee) {
    const a = annee % 19;
    const b = Math.floor(annee / 100);
    const c = annee % 100;
    const d = Math.floor(b / 4);
    const e = b % 4;
    const f = Math.floor((b + 8) / 25);
    const g = Math.floor((b - f + 1) / 3);
    const h = (19 * a + b - d - g + 15) % 30;
    const i = Math.floor(c / 4);
    const k = c % 4;
    const l = (32 + 2 * e + 2 * i - h - k) % 7;
    const m = Math.floor((a + 11 * h + 22 * l) / 451);
    const n = (h + l - 7 * m + 114);
    const mois = Math.floor(n / 31);
    const jour = (n % 31) + 1;
    return new Date(annee, mois - 1, jour);
}

function ajouterJours(date, jours) {
    var result = new Date(date);
    result.setDate(result.getDate() + jours);
    return result;
}

function nombreJoursFeriesHorsWeekend(annee) {
    const paques = calculerPaques(annee);
    const lundiDePaques = ajouterJours(paques, 1);
    const ascension = ajouterJours(paques, 39);
    const pentecote = ajouterJours(paques, 49);
    const lundiDePentecôte = ajouterJours(pentecote, 1);


    // Inclut maintenant les jours fériés mobiles
    const joursFeriesFixesEtMobiles = [
        { mois: 0, jour: 1 },   // 1er janvier
        { mois: 4, jour: 1 },   // Fête du travail, 1er mai
        { mois: 4, jour: 8 },   // Victoire 1945, 8 mai
        { mois: 6, jour: 14 },  // Fête Nationale, 14 juillet
        { mois: 7, jour: 15 },  // Assomption, 15 août
        { mois: 10, jour: 1 },  // Toussaint, 1er novembre
        { mois: 10, jour: 11 }, // Armistice, 11 novembre
        { mois: 11, jour: 25 },  // Noël, 25 décembre
        { mois: lundiDePaques.getMonth(), jour: lundiDePaques.getDate() }, // Pâques
        { mois: ascension.getMonth(), jour: ascension.getDate() }, // Ascension
        { mois: lundiDePentecôte.getMonth(), jour: lundiDePentecôte.getDate() } // Pentecôte
    ];

    console.log('====================================');
    console.log(joursFeriesFixesEtMobiles);
    console.log('====================================');

    let nombreJoursFeriesHorsWeekend = 0;

    joursFeriesFixesEtMobiles.forEach(jourFerie => {
        let date = new Date(annee, jourFerie.mois, jourFerie.jour);
        if (date.getDay() !== 0 && date.getDay() !== 6) { // Vérifie si le jour férié ne tombe pas un weekend
            nombreJoursFeriesHorsWeekend++;
        }
    });

    return nombreJoursFeriesHorsWeekend;
}


