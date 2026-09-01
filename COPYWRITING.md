# Règles d'écriture

Extraites du code de Somekind, avant remise à zéro. Ce ne sont pas des
préférences : chaque règle ci-dessous était appliquée partout dans le produit,
et la plupart portaient déjà leur justification en commentaire.

---

## 1. Le proverbe

Chaque écran se termine par une phrase en « Parce que… ». Toujours un objet du
quotidien qui fait — ou ne fait pas — exactement ce qu'il allait faire. Jamais
un bénéfice, jamais une promesse, jamais de vocabulaire de métier.

> Parce qu'une belle cuisine n'a jamais fait à manger.
> Parce qu'on ne remercie jamais l'ascenseur qui marche.
> Parce qu'une voiture rouge n'avance pas plus vite.
> Parce qu'on pose le chemin là où les gens marchent déjà.
> Parce qu'un jardin, ça s'entretient.
> Parce que personne ne prend son café de la même façon.
> Parce qu'on regarde toujours dans le sac avant de partir.
> Parce que tout le monde a déjà fait semblant de trouver ça raisonnable.
> Parce qu'une liste de courses évite de rentrer avec trois fromages.

Une par écran, pas deux. C'est la seule figure de style que la maison
s'autorise, et elle ne vaut que parce qu'elle est rare et régulière.

## 2. Dire comme le client dit, pas comme le métier dit

Le code le notait à l'endroit exact où la tentation était la plus forte :

> *Said as the client would say it, not as the trade does.*

La page ne disait donc pas « solution e-commerce » mais « la boutique qui les
porte ». Et quand il a fallu expliquer le nom, on n'a pas expliqué : on a cité
trois clients.

> « Une sorte de site où les gens pourraient réserver eux-mêmes, sans nous appeler. »
> « Un truc un peu comme une boutique, sauf qu'on ne vend rien en ligne. »
> « Une page qui dirait ce qu'on fait, sans avoir l'air d'une plaquette. »

**Règle** : avant d'expliquer une idée au visiteur, vérifier s'il ne l'a pas
déjà dite lui-même ce mois-ci. Si oui, on cite au lieu d'expliquer.

## 3. « On » pour la maison, « vous » pour le client

La voix éditoriale dit « on » : *on construit*, *on l'héberge, on le surveille,
on le répare*. Le « nous » est réservé aux messages de service — formulaires,
erreurs, accusés de réception — où la maison parle en tant qu'institution :
*Nous vous renvoyons le détail de votre configuration.*

Ne jamais mélanger les deux dans un même bloc.

## 4. Une histoire plutôt qu'une liste, quand la liste n'a pas été vécue

C'était écrit noir sur blanc dans les données :

> *A line of maintenance nobody has lived through reads as a line of
> maintenance; a Sunday in November does not.*

D'où, à la place d'une puce « supervision des certificats » :

> Un dimanche de novembre, quatre heures du matin : un certificat expire. Rien
> n'a prévenu personne, ce genre de chose arrive simplement à sa date. Au
> réveil, les visiteurs tombent sur une page d'avertissement rouge, et ils s'en
> vont.

**Règle** : une liste pour ce que le lecteur peut vérifier, une scène pour ce
qu'il doit ressentir.

## 5. Le chiffre plutôt que le logo

Deux projets présentés, pas un mur de logos :

> *Each one carries a number that can be checked by asking them, which a logo
> cannot.*

## 6. Une propriété absente vaut mieux qu'une propriété inventée

Le commentaire du schema.org, qui vaut pour tout le reste :

> *`Organization` et non `LocalBusiness` : ce dernier promet un établissement,
> avec adresse, horaires et zone de chalandise. Rien de tout cela n'est vrai
> ici.*

## 7. Nommer l'acte, pas le chiffre

Le bouton principal disait « Voir le prix ». Il a été corrigé, avec sa raison :

> *« Voir le prix » sent someone looking for something already printed two lines
> above ; what the button actually opens is a quote built on their own answers.*

→ **« Chiffrer mon projet »**. Un bouton nomme ce qu'il déclenche.

## 8. Dire ce que coûte le clic, sous le clic

`15 min, gratuit, sans engagement` — juste sous le bouton. Le visiteur ne doit
jamais avoir à demander ce qui l'attend derrière.

## 9. Le prix arrive après les questions, jamais avant

> *Quoting 8,900 to someone who has not yet said what they want is how you lose
> them on the first screen.*

Le bandeau de totaux n'était rendu qu'à partir de l'écran d'estimation.

## 10. Une erreur dit quoi faire, et laisse une porte ouverte

> La demande n'a pas pu être envoyée. Écrivez à hello@… et nous prenons le relais.
> L'envoi de confirmation n'est pas encore activé de notre côté. Sans nouvelles,
> écrivez directement à hello@…

Jamais « une erreur est survenue ». Toujours : ce qui s'est passé, et le chemin
de secours.

## 11. Rassurer à l'endroit où on demande, pas dans les mentions légales

Sous les deux champs du seuil d'entrée :

> Pas de démarchage. Ces coordonnées servent uniquement à vous renvoyer votre
> estimation.

## 12. Les capitales, et ce qui n'y a pas droit

Tous les titres de page à une seule taille, en capitales :

> *The reference sets them all in capitals at the same scale, so the page reads
> as one voice instead of a ladder of importance.*

Et le corps de texte est la seule chose qui n'est pas en capitales :

> *The body copy is the one thing here meant to be read as prose, so it is the
> one thing that does not shout. No case is forced on it, which is what lets a
> capital inside a sentence mean something.*

C'est ce qui permettait d'écrire SOME et KIND en capitales à l'intérieur d'une
phrase : la page mettait ainsi un mot entre guillemets sans guillemets, quand
elle parlait du mot au lieu de s'en servir.

> **Dérogation en vigueur.** Les titres ne sont plus en capitales depuis que la
> page est composée en Garamond italique : l'italique d'une Garalde tient tout
> entière dans ses bas de casse, et la passer en capitales revient à payer une
> police pour n'en rien voir. Le reste de la règle tient : une seule taille de
> titre, et le corps de texte reste la seule chose qui ne crie pas.

## 13. Le nom ne se traduit pas

> *It is the name being taken apart, and the name is English on a French page.*

## 14. Un drapeau ne dit jamais une langue

Le sélecteur nommait la langue en toutes lettres :

> *A flag stands for a country and never for a language, and half of Europe
> would be entitled to take offence at whichever one we picked.*

## 15. Typographie française, sans exception

- Apostrophe courbe `’`, jamais `'` — *l'héberge*, *qu'on*, *n'avance*.
- Guillemets `« … »` avec espaces insécables, jamais `"` ni `“ ”` en français.
- Les espaces fines insécables des montants (`8 900 €`) étaient remplacées par
  une espace normale à l'affichage : elles se lisent comme des artefacts dans
  certaines polices.

## 16. Jamais de concaténation : des jetons

Toute phrase à trou passait par `fill()` et des jetons `{token}` :

```
Étape {n} sur {total}
Environ {weeks} à partir du lancement · {meetings} avec vous.
Nous produisons ce qui manque : {items}.
```

Et tout pluriel était déclaré, jamais deviné : `{ one: 'semaine', many: 'semaines' }`.

## 17. Tout ce qui est visible existe dans les deux langues

Type `L<T> = Record<Locale, T>`. Une chaîne monolingue ne compile pas. C'est la
règle qui a empêché la version anglaise de dériver.
