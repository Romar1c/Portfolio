export type Projet = {
  Nom_Projet: string;
  Description: string[];
}

export type Formation = {
  Nom: string;
  Lieu: string;
  Date: string;
  Nom_Diplome: string;
  Projet_Realise: Projet[];
};

export type Experience = {
  Lieu: string;
  Date: string;
  Titre: string;
  Missions: string[];
};

export type Langue = {
  Nom: string;
  Niveau: string;
};

export type CVData = {
  Nom: string;
  Prenom: string;
  Mail: string;
  Numero: string;
  Adress: string;
  Intro: string;
  Competences: string[];
  Langages_Technique: string[];
  Outils_Technique: string[];
  Langues: Langue[];
  Formations: Formation[];
  Experiences: Experience[];
};
