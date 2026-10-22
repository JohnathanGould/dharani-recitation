/* ---------- Text ----------
   The text of the study document, one entry per verse.
   alts = other attested readings (mostly Lokesh Chandra's 1988 reconstruction); all are accepted in practice.
   lc = translation is uncertain because some words are obscure. */
export const SECTIONS = {1: 'Homage', 2: 'In praise: what he does', 3: 'Announcing the heart dhāraṇī', 4: 'The mantra', 5: 'Offerings (svāhā)', 6: 'Closing'};
export const DOC = [];
const add = (sec, sk, en, x) => DOC.push(Object.assign({id: DOC.length + 1, sec, sk, en}, x || {}));
add(1, "namo ratna-trayāya", "Homage to the Three Jewels (Buddha, Dharma and Sangha).");
add(1, "nama āryāvalokiteśvarāya bodhisattvāya", "Homage to the noble Avalokiteśvara, the bodhisattva,", {"alts": ["namo āryāvalokiteśvarāya bodhisattvāya"], "note": "Nama is the regular form of namaḥ before ā. Some texts read namo."});
add(1, "mahāsattvāya mahākāruṇikāya", "the great being, the greatly compassionate one.", {"alts": ["mahāsattvāya mahākaruṇikāya"]});
add(2, "sarva bandhana chedana-karāya", "To the one who cuts through all bonds.", {"alts": ["sarva-bandhana-cchedana-karāya"], "note": "Chandra writes cchedana with a doubled c. Both are accepted."});
add(2, "sarva bhava samudraṃ śoṣaṇa-karāya", "To the one who dries up the ocean of existence.", {"alts": ["sarva-bhava-samudra-śoṣaṇa-karāya"], "note": "Chandra has samudra without the nasal ṃ, inside the compound."});
add(2, "sarva vyādhi praśamana-karāya", "To the one who calms all illness.");
add(2, "sarva mṛtyu upadrava vināśana-karāya", "To the one who destroys the dangers and calamities of death.", {"alts": ["sarv-ety-upadrava-vināśana-karāya"], "note": "Chandra reads sarv-ety-upadrava (\"all calamities\"). Your document has the chant reading mṛtyu (\"death\")."});
add(2, "sarva bhayeṣu trāṇa-karāya", "To the one who protects from every fear.");
add(3, "tasmān namas-kṛtvā idam", "Having paid homage, [I give] this", {"alts": ["tasmāt namas kṛtvā idaṃ", "tasmai namaskṛtvā imaṃ"], "note": "Tasmān is tasmāt before n. Chandra reads tasmai namaskṛtvā imaṃ (\"having bowed to him, this\"). All three are accepted."});
add(3, "āryāvalokiteśvara bhāṣitaṃ nīlakaṇṭhaṃ api nāma hṛdayam", "the heart [dhāraṇī] spoken by Avalokiteśvara, also named Nīlakaṇṭha (\"Blue-Throated\").", {"alts": ["āryāvalokiteśvara-bhāṣitaṃ nīlakaṇṭha-nāma", "āryāvalokiteśvara bhāṣitaṃ nīlakaṇṭha pi nama"], "note": "Chandra reads nīlakaṇṭha-nāma with no api, and puts hṛdayaṃ at the start of the next verse. Api means \"also\". It probably explains the chant line nīlakaṇṭha pi nama."});
add(3, "āvartayiṣyāmi sarvārtha-sādhanaṃ śubham", "I shall recite it, auspicious, accomplishing every aim,", {"alts": ["hṛdayaṃ vartayiṣyāmi sarv-ārtha-sādhakaṃ śubhaṃ", "hṛdayaṃ āvartayiṣyāmi sarvārtha-sādhanaṃ śubhaṃ"], "note": "Chandra reads hṛdayaṃ vartayiṣyāmi and sādhakaṃ. All of them mean \"I shall recite\" and \"accomplishing\"."});
add(3, "ajeyaṃ sarva-bhūtānāṃ bhava-mārga-viśuddhakam", "unconquerable, purifying the path of existence of all beings.", {"alts": ["ajeyaṃ sarva-bhūtānāṃ bhava-mārga-viśodhakaṃ"], "note": "Chandra reads viśodhakaṃ (\"purifier\"). Viśuddhaka is a less usual form."});
add(4, "tadyathā oṃ āloke ālokamati lokātikrānte", "Thus: Oṃ! O light, O one whose mind is light, O one who has gone beyond the world,", {"alts": ["tadyathā oṃ āloka e āloka-mati lokātikrānta"], "note": "Chandra reads āloka e and lokātikrānta, which sound almost the same."});
add(4, "he hare āryāvalokiteśvara mahābodhisattva", "O Hari, noble Avalokiteśvara, great bodhisattva!", {"alts": ["ehi hare āryāvalokiteśvara mahābodhisattva"], "note": "Chandra reads ehi (\"come\") here instead of he (\"O\")."});
add(4, "he bodhisattva he mahābodhisattva", "O bodhisattva, O great bodhisattva.");
add(4, "he vīrya-bodhisattva he mahākāruṇika smara hṛdayam", "O heroic bodhisattva, O greatly compassionate one, remember the heart [dhāraṇī].", {"alts": ["he vīrya-bodhisattva he mahākāruṇikā smara hṛdayaṃ"]});
add(4, "hi hi hare āryāvalokiteśvara maheśvara parama-maitra-citta mahākāruṇika", "Hi hi, O Hari, noble Avalokiteśvara, great lord, whose mind is supremely kind, O greatly compassionate one.", {"alts": ["ehy-ehi hare āryāvalokiteśvara maheśvara paramārtha-citta mahākāruṇikā"], "lc": true, "note": "Chandra reads ehy-ehi (\"come, come\") and paramārtha-citta (\"of the highest-truth mind\"). Your document reads parama-maitra-citta (\"of supremely kind mind\"). I could not tell which one is older."});
add(4, "kuru kuru karman", "Do, do the work.", {"alts": ["kuru-kuru karma"]});
add(4, "sādhaya sādhaya vidyām", "Accomplish, accomplish the spell (vidyā).", {"alts": ["sādhaya-sādhaya vidyam"]});
add(4, "dhuru dhuru vīryanti mahāvīryanti", "Dhuru dhuru, vīryanti, mahāvīryanti. Your document translates this as \"sustain, sustain great courage and energy\".", {"alts": ["dhuru-dhuru viyanta e mahā-viyanta e"], "lc": true, "note": "I could not find vīryanti as a Sanskrit word. Chandra reads viyanta, which is also obscure. The translation treats it as coming from vīrya (\"courage\"), which may be a later reading."});
add(4, "dhara dhara dharendreśvara", "Hold, hold, O lord of the earth-bearers.", {"lc": true, "note": "Your document translates dharendreśvara as \"sovereign bearer of the Dharma\", but the word has no \"dharma\" in it. Dhara means \"holding\" and indra means \"chief\", so \"lord of the earth-bearers\" is closer."});
add(4, "cala cala vimala amala mūrte", "Move, move, O pure and stainless embodiment.", {"alts": ["cala-cala vimal-āmala"], "note": "Chandra reads cala-cala vimal-āmala and then goes straight on to āryāvalokiteśvara jina."});
add(4, "āryāvalokiteśvara jina kṛṣṇa-jaṭā-makuṭa-valam", "Noble Avalokiteśvara, conqueror (jina), crowned with dark matted hair,", {"lc": true, "note": "Chandra reads kṛṣṇa-jaṭā-makuṭā 'varama prarama virama. The ending valam in your document is unclear to me."});
add(4, "mā pralamba mahāsiddha vidyādhara", "do not delay, O great accomplished one, holder of knowledge.", {"lc": true, "note": "Chandra has this part as 'varama prarama virama mahāsiddha-vidyādhara. Mā pralamba literally means \"do not hang back\", and is probably a later reading of those words."});
add(4, "vara vara mahāvara", "Boon, boon, great boon (or: excellent, excellent, supremely excellent).", {"lc": true, "note": "Chandra has no line like this one, and goes straight to bala-bala mahābala."});
add(4, "bala bala mahābala", "Strength, strength, great strength.", {"note": "Chandra continues malla-malla mahāmalla, which your document leaves out."});
add(4, "cala cala mahācala", "Move, move, great mover.", {"note": "Your document translates mahācala as \"great unshakable one\". Unshakable would be acala, so I translate it as \"great mover\"."});
add(4, "kṛṣṇa-varṇa nigha kṛṣṇa-pakṣa nirghātana", "O dark-hued one, nigha, destroyer of the dark side.", {"lc": true, "note": "Nigha is unclear. Chandra reads kṛṣṇa-varṇa dīrgha-kṛṣṇa-pakṣa-nirghātana, so nigha may be a shortened dīrgha (\"long\")."});
add(4, "he padma-hasta cara cara deśa-careśvara", "O lotus-handed one, roam, roam, lord of those who roam the lands.", {"lc": true, "note": "Chandra reads niśācareśvara (\"lord of night-roamers\") instead of deśa-careśvara."});
add(4, "kṛṣṇa-sarpa-kṛta-yajñopavīta", "O one wearing the sacred thread made from a black serpent.");
add(4, "ehyehi mahāvarāha-mukha", "Come, come, great boar-faced one.", {"alts": ["ehy-ehi mahāvarāha-mukha"]});
add(4, "tripura-dāhaneśvara nārāyaṇa-varūpa vara-mārga-ari", "Lord who burns the three cities, Nārāyaṇa-form, enemy of the excellent path.", {"lc": true, "note": "Chandra reads tripura-dahan-eśvara nārāyaṇa-balopabala-veśa-dhara, which is quite different from the second half here. I am not sure how vara-mārga-ari should be read."});
add(4, "he nīlakaṇṭha he mahākara", "O Blue-Throated one, O great doer.", {"alts": ["he nīlakaṇṭha he mahākāla"], "note": "Chandra reads mahākāla (\"great time\", or \"great dark one\")."});
add(4, "hala hala viṣa nirjita lokasya", "Hala hala, poison, conquered, of the world. Your document translates this as \"consume, consume the poison that afflicts the world\".", {"lc": true, "note": "Chandra reads halāhala-viṣa nirjita lokasya. Halāhala is the name of the deadly poison in the Śiva story, so the first word is probably halāhala with a short hala in your document."});
add(4, "rāga-viṣa vināśana", "Destroy the poison of craving.");
add(4, "dveṣa-viṣa vināśana", "Destroy the poison of aversion.");
add(4, "moha-viṣa vināśana", "Destroy the poison of delusion.");
add(4, "huru huru māla", "Huru huru (sound syllables), māla. Your document translates this as \"drive away the defilements\".", {"alts": ["hulu-hulu malla"], "lc": true, "note": "Chandra reads hulu-hulu malla (\"O wrestler\"). Māla could mean \"garland\" or \"defilement\" (mala)."});
add(4, "huru huru hare mahāpadmanābha", "Huru huru, O Hari, O great lotus-naveled one.", {"alts": ["hulu hare mahā-padmanābha"]});
add(4, "sara sara śrī śrī", "Flow, flow; auspicious radiance.", {"lc": true, "note": "Chandra reads sara-sara siri-siri suru-suru muru-muru, mostly sound syllables."});
add(4, "suru suru bhūru bhūru", "Suru suru (flow, flow); bhūru bhūru (sound syllables).", {"lc": true, "note": "Your document translates bhūru as \"arise\", but I could not confirm that. Chandra reads muru-muru here."});
add(4, "buddhaya buddhaya bodhaya bodhaya", "Awaken, awaken; cause to awaken, cause to awaken.", {"alts": ["budhya-budhya bodhaya-bodhaya"]});
add(4, "maitrī nīlakaṇṭha ehyehi", "O kind Blue-Throated one, come.", {"alts": ["bodhayā maitriya nīlakaṇṭha"], "note": "Chandra reads bodhayā maitriya nīlakaṇṭha and then goes on to ehy-ehi."});
add(4, "vāma-sthita siṃha-mukha", "O lion-faced one, standing on the left.", {"alts": ["ehy-ehi vāma-sthita-siṃha-mukha"]});
add(4, "hasa hasa muñca muñca", "Laugh, laugh; release, release.");
add(4, "mahāṭṭahāsaṃ ehyehi pa mahāsiddha-yogeśvara", "Great laughter; come, [pa], great accomplished lord of yogis.", {"alts": ["mahāṭṭahāsaṃ ehyehi bho mahāsiddha-yogeśvara", "ehy-ehi bho mahāsiddha-yogeśvara"], "lc": true, "note": "The word pa is unexplained. Chandra reads bho (\"O!\"), which is probably what is meant."});
add(4, "bhaṇa bhaṇa vāco", "Speak, speak the words.", {"alts": ["bhaṇa-bhaṇa vācaṃ"]});
add(4, "sādhaya sādhaya vidyām", "Accomplish, accomplish the spell (vidyā).", {"alts": ["sādhaya-sādhaya vidyāṃ"]});
add(4, "smara smaratāṃ bhagavantaṃ lokita-vilokitaṃ lokeśvaraṃ tathāgatam", "Remember, remember the Blessed One, the one who sees and is seen, the Lord of the World, the Thus-Gone One.", {"alts": ["smara-smara taṃ bhagavantaṃ lokita-vilokitaṃ lokeśvaram tathāgataṃ"], "note": "Chandra reads smara-smara taṃ (\"remember, remember him\"). Smaratāṃ in your document may be a variant of that."});
add(4, "dadāhi me darśana-kāmasya darśanam", "Grant me, who longs to see you, a vision of you.");
add(4, "prahlādaya manaḥ svāhā", "Gladden my mind. Svāhā!");
add(5, "siddhāya svāhā", "To the Accomplished One. Svāhā!");
add(5, "mahāsiddhāya svāhā", "To the Greatly Accomplished One. Svāhā!");
add(5, "siddhayogeśvarāya svāhā", "To the Accomplished Lord of Yoga. Svāhā!", {"alts": ["siddha-yogeśvarāya svāhā"]});
add(5, "nīlakaṇṭhāya svāhā", "To the Blue-Throated One. Svāhā!");
add(5, "varāhamukhāya svāhā", "To the Boar-Faced One. Svāhā!", {"alts": ["varāha-mukhāya svāhā"]});
add(5, "mahādara-siṃhamukhāya svāhā", "To the Great Lion-Faced One. Svāhā!", {"alts": ["mahā-narasiṃha-mukhāya svāhā"], "lc": true, "note": "Chandra reads mahā-narasiṃha-mukhāya (\"great man-lion-faced\"). I am not sure what dara is meant to be in your document."});
add(5, "siddhavidyādharāya svāhā", "To the Accomplished Bearer of Sacred Knowledge. Svāhā!", {"alts": ["siddha-vidyādharāya svāhā"]});
add(5, "padmahastāya svāhā", "To the Lotus-Handed One. Svāhā!", {"alts": ["padma-hastāya svāhā"]});
add(5, "kṛṣṇa-sarpa-kṛta-yajñopavītāya svāhā", "To the one wearing the sacred thread made from the dark serpent. Svāhā!");
add(5, "mahālakūṭadharāya svāhā", "To the great bearer of the lakūṭa. Svāhā!", {"alts": ["mahā-lakuṭadharāya svāhā"], "lc": true, "note": "Your document translates this as \"great bearer of the poison\", but kūṭa does not mean poison. Chandra reads lakuṭa, which means \"staff\" or \"club\". I translate it neutrally."});
add(5, "cakrayuddhāya svāhā", "To the one armed with the wheel (cakra). Svāhā!", {"alts": ["cakr-āyudhāya svāhā", "cakra-āyudhāya svāhā"], "lc": true, "note": "Yuddha means \"battle\", and āyudha means \"weapon\". The translation in your document (\"armed with the wheel\") matches Chandra's cakr-āyudhāya, so cakrayuddhāya may be a miscopy."});
add(5, "śaṅkha-śabdāni bodhanāya svāhā", "To the one who awakens through the sound of the conch. Svāhā!", {"alts": ["śaṅkha-śabda-nibodhanāya svāhā"], "note": "Chandra reads śaṅkha-śabda-nibodhanāya (\"awakened by the sound of the conch\")."});
add(5, "vāma-skandha-deśa-sthita kṛṣṇa-jināya svāhā", "To the one at the left shoulder, [clad in] black skin. Svāhā!", {"alts": ["vāma-skandha-deśa-sthita-kṛṣṇ-ājināya svāhā"], "lc": true, "note": "Your document translates jināya as \"Victorious One\". Chandra reads kṛṣṇ-ājināya, \"with a black antelope skin\" (ajina), which fits the left-shoulder image better."});
add(5, "vyāghra-carma-nivāsanāya svāhā", "To the one clothed in tiger skin. Svāhā!", {"alts": ["vyāghra-carma-nivasanāya svāhā"]});
add(5, "lokeśvarāya svāhā", "To the Lord of the World. Svāhā!");
add(5, "sarvasiddheśvarāya svāhā", "To the Lord of all the Accomplished. Svāhā!", {"alts": ["sarva-siddheśvarāya svāhā"]});
add(6, "namo bhagavate āryāvalokiteśvarāya bodhisattvāya", "Homage to the Blessed Avalokiteśvara, the bodhisattva,");
add(6, "mahāsattvāya mahākāruṇikāya", "the great being, the greatly compassionate one.");
add(6, "sidhyantu me mantra-padāni svāhā", "May the words of this mantra be accomplished. Svāhā!", {"alts": ["siddhyantu me mantra-padāni svāhā"], "note": "Sanskrit spells it siddhyantu, with a doubled d. Chants often write sidhyantu."});

/* What you wrote before, compared with the Sanskrit (verses 1 to 10 only) */
export const STUDY = {
 1: {yours: 'Namo Ratna Trayaya', fixes: [{y: 'Ratna Trayaya', s: 'ratna-trayāya', kind: 'sound', t: 'Your letters are right. The second-to-last a is long: rut-nuh-truh-YAH-yuh. Written "trayaya" the last three syllables look identical, and they are not.'}]},
 2: {yours: 'Namo Aryavelokitesvaraya Boddhisatvaya', fixes: [
  {y: 'Namo', s: 'nama', kind: 'sound', t: 'Verse 1 starts namo. Chandra\'s longer text starts verse 2 with nama (namaḥ before ā), which is your own research. His shorter reconstruction has namo here, so both readings exist.'},
  {y: 'Aryavelokitesvaraya', s: 'āryāvalokiteśvarāya', kind: 'slip', t: 'avalokita begins a-va-lo, so "velo" should be "valo". The first ā and the ā before -ya are long (ah). ś is "sh": ...taysh-vuh-rah-yuh.'},
  {y: 'Boddhisatvaya', s: 'bodhisattvāya', kind: 'slip', t: '"dh" is one sound (d with a puff of breath), so only one d. The t is doubled: bo-dhi-sat-tvā-ya, and the final ā is long.'}]},
 3: {yours: 'Mahasatvaya Mayakarunikiya', fixes: [
  {y: 'Mahasatvaya', s: 'mahāsattvāya', kind: 'sound', t: 'mahā means "great" and its second a is long: muh-HAH. Sattva keeps the doubled t.'},
  {y: 'Mayakarunikiya', s: 'mahākāruṇikāya', kind: 'slip', t: '"Maya" lost its h: it is mahā ("great") again. kāruṇika starts with a long ā and ends -kā-ya, not -ki-ya. ṇ is an n said with the tongue curled back.'}]},
 4: {yours: 'Sarva Bandhana Cheedana Karaya', fixes: [
  {y: 'Cheedana', s: 'chedana', kind: 'key', t: '"ee" is a pronunciation spelling for the sound "ay". Sanskrit e is always "ay", so the real spelling is chedana (chhay-duh-nuh, "cutting"). Chandra writes it cchedana with a doubled c, which is also accepted.'},
  {y: 'Karaya', s: 'karāya', kind: 'sound', t: 'The -rā- is long: kuh-RAH-yuh. kara means "maker, doer".'}]},
 5: {yours: 'Sarva Bhava Samoodrum Shosana Karaya', fixes: [
  {y: 'Samoodrum', s: 'samudra / samudraṃ', kind: 'key', t: '"oo" is a pronunciation spelling for u. Chandra\'s text has samudra inside the compound. Your -um ending matches the chant reading samudraṃ, where ṃ is a nasal hum. Both are accepted here.'},
  {y: 'Shosana', s: 'śoṣaṇa', kind: 'key', t: 'A good pronunciation spelling. Sanskrit writes ś and ṣ for its two "sh" sounds and ṇ for the curled-tongue n, so śoṣaṇa is said shoh-shuh-nuh.'}]},
 6: {yours: 'Sarva Veyadhee Prosamana Karaya', fixes: [
  {y: 'Veyadhee', s: 'vyādhi', kind: 'key', t: 'Your spelling captures the sound. Sanskrit writes vyādhi: vyah-dhih, with a long ā and a short final i.'},
  {y: 'Prosamana', s: 'praśamana', kind: 'slip', t: 'It starts with pra-, not pro-. ś is "sh": pruh-shuh-muh-nuh.'}]},
 7: {yours: 'Sarva Mryitu Upadravha Vinishana Karaya', fixes: [
  {y: 'Mryitu', s: 'mṛtyu / ety', kind: 'key', t: 'Your word is the chant reading mṛtyu. ṛ is a vowel that sounds like "ri", so it is said mrit-yoo. Chandra\'s reconstruction reads sarv-ety-upadrava instead. Both are accepted here.'},
  {y: 'Upadravha', s: 'upadrava', kind: 'slip', t: 'No h here. It is u-pa-dra-va: oo-puh-druh-vuh.'},
  {y: 'Vinishana', s: 'vināśana', kind: 'slip', t: 'The second syllable is nā (long a), and the "sh" comes from ś in the third: vih-nah-shuh-nuh.'}]},
 8: {yours: 'Sarva...', fixes: [{y: 'Sarva...', s: 'sarva-bhayeṣu trāṇa-karāya', kind: 'ok', t: 'This is where your memory stops. The line goes on: bhayeṣu trāṇa karāya, "to the one who protects in all fears".'}]},
 9: {yours: 'tasmān namas kṛtvā idaṃ', fixes: [{y: 'tasmān namas kṛtvā idaṃ', s: 'tasmān namas-kṛtvā idam', kind: 'ok', t: 'A real reading. tasmān is tasmāt before n (a regular sound change), and it matches chant recordings and some web texts. Chandra reads tasmai namaskṛtvā imaṃ instead, with tasmai ("to him") as the grammatical partner of "bowed". Both are accepted here.'}]},
 10: {yours: 'āryāvalokiteśvara bhāṣitaṃ nīlakaṇṭhanām api nāma hṛdayam', fixes: [
  {y: 'āryāvalokiteśvara bhāṣitaṃ', s: 'āryāvalokiteśvara bhāṣitaṃ', kind: 'ok', t: 'Matches every version I found.'},
  {y: 'nīlakaṇṭhanām api nāma', s: 'nīlakaṇṭhaṃ api nāma', kind: 'slip', t: 'Your printed document has nīlakaṇṭhaṃ (with ṃ, a nasal hum), not nīlakaṇṭhanām. Api means "also", so the phrase reads "also named Nīlakaṇṭha". I said earlier that I could not make your phrase parse, and that was only because of the extra nā. With the ṃ it parses. Chandra reads nīlakaṇṭha-nāma without api, and both are accepted.'},
  {y: 'hṛdayam', s: 'hṛdayam', kind: 'ok', t: 'Your document keeps hṛdayam ("heart") at the end of this line, so you had it right. Chandra puts hṛdayaṃ at the start of the next verse instead.'}]}
};

/* Word meanings, keyed by the word part */
const GLOSS_LIST = [
 ['namo','homage'],['nama','homage'],['ratna','jewel'],['trayāya','to the triad'],['āryāvalokiteśvarāya','to the noble Avalokiteśvara ("Lord who looks down")'],['āryāvalokiteśvara','the noble Avalokiteśvara'],
 ['bodhisattvāya','to the bodhisattva (awakening being)'],['mahāsattvāya','to the great being'],['mahākāruṇikāya','to the greatly compassionate one'],['mahākaruṇikāya','to the greatly compassionate one'],
 ['sarva','all'],['sarv','all'],['bandhana','bond, fetter'],['cchedana','cutting'],['chedana','cutting'],['karāya','to the doer, maker'],['bhava','existence, becoming'],['samudra','ocean'],['samudraṃ','ocean'],
 ['śoṣaṇa','drying up'],['vyādhi','illness'],['praśamana','calming'],['ety','calamity (īti)'],['upadrava','affliction, misfortune'],['vināśana','destroying'],['mṛtyu','death'],['bhayeṣu','in fears'],['trāṇa','protection'],
 ['tasmai','to him'],['tasmāt','therefore, from him'],['tasmān','therefore, from him'],['namaskṛtvā','having bowed'],['namas','homage'],['kṛtvā','having made'],['imaṃ','this'],['idaṃ','this'],['bhāṣitaṃ','spoken'],
 ['nīlakaṇṭha','Blue-Throated'],['nāma','named'],['hṛdayaṃ','heart, essence'],['vartayiṣyāmi','I shall recite'],['ārtha','aim, purpose'],['sādhakaṃ','accomplishing'],['śubhaṃ','auspicious'],
 ['ajeyaṃ','unconquerable'],['bhūtānāṃ','of beings'],['mārga','path'],['viśodhakaṃ','purifying'],
 ['tadyathā','thus, namely'],['oṃ','sacred syllable'],['āloka','light'],['e','O!'],['mati','mind'],['lokātikrānta','one who has gone beyond the world'],['ehi','come!'],['ehy','come!'],['hare','O Hari'],
 ['mahābodhisattva','great bodhisattva'],['mahā','great'],['he','O!'],['bodhisattva','bodhisattva'],['vīrya','heroic energy'],['mahākāruṇikā','O greatly compassionate one'],['smara','remember!'],
 ['maheśvara','great lord'],['paramārtha','ultimate truth'],['citta','mind'],['kuru','do!'],['karma','action, work'],['sādhaya','accomplish!'],['vidyam','spell, knowledge'],['vidyāṃ','spell, knowledge'],
 ['dehi','give!'],['tvaraṃ','quickly'],['kāmam','what is desired'],['gama','go (obscure)'],['vihaṅgama','sky-goer, bird'],['vigama','departing (obscure)'],['siddha','accomplished one'],['yogeśvara','lord of yogis'],
 ['dhuru','obscure'],['viyanta','obscure'],['dhara','holding, bearer'],['dharendreśvara','lord of the earth-bearers (uncertain)'],['cala','move!'],['vimal','stainless'],['āmala','spotless'],['jina','conqueror'],
 ['kṛṣṇa','black, dark'],['jaṭā','matted hair'],['makuṭā','crown'],['varama','obscure'],['prarama','obscure'],['virama','obscure'],['mahāsiddha','great accomplished one'],['vidyādhara','knowledge-holder'],
 ['bala','strong'],['mahābala','very strong one'],['malla','wrestler, hero'],['mahāmalla','great wrestler'],['mahācala','Great Immovable One'],['varṇa','color'],['dīrgha','long'],['pakṣa','wing, side'],['nirghātana','smiter'],
 ['padma','lotus'],['hasta','hand'],['cara','roam!'],['niśācareśvara','lord of night-roamers'],['sarpa','snake'],['kṛta','made, worn'],['yajñopavīta','sacred thread'],['mahāvarāha','great boar'],['mukha','face'],
 ['tripura','Three Cities'],['dahan','burning'],['eśvara','lord'],['nārāyaṇa','Nārāyaṇa'],['balopabala','strength and lesser strength'],['veśa','form, guise'],['mahākāla','Great Time'],['halāhala','the halāhala poison'],
 ['viṣa','poison'],['nirjita','conquered'],['lokasya','of the world'],['rāga','desire, passion'],['dveṣa','hatred'],['moha','delusion'],['hulu','sound syllable'],['padmanābha','Lotus-Navel'],['sara','flow (or sound)'],
 ['siri','sound syllable'],['suru','sound syllable'],['muru','sound syllable'],['budhya','awaken!'],['bodhaya','cause to awaken!'],['bodhayā','cause to awaken (uncertain form)'],['maitriya','friendly, benevolent'],
 ['vāma','left'],['sthita','standing'],['siṃha','lion'],['hasa','laugh!'],['muñca','release!'],['mahāṭṭahāsam','great roaring laughter'],['bho','O!'],['bhaṇa','speak!'],['vācaṃ','speech, word'],['taṃ','that'],
 ['bhagavantaṃ','the Blessed One'],['lokita','looked upon'],['vilokitaṃ','surveyed'],['lokeśvaram','Lord of the World'],['tathāgataṃ','the Tathāgata'],['dadāhi','grant!'],['me','to me, my'],['darśana','seeing, vision'],
 ['kāmasya','of one who desires'],['darśanam','vision'],['prahlādaya','gladden!'],['manaḥ','mind'],['svāhā','hail! (closing exclamation)'],
 ['siddhāya','to the accomplished one'],['mahāsiddhāya','to the greatly accomplished one'],['yogeśvarāya','to the lord of yogis'],['nīlakaṇṭhāya','to Nīlakaṇṭha'],['varāha','boar'],['narasiṃha','man-lion'],
 ['mukhāya','to the face'],['vidyādharāya','to the knowledge-holder'],['hastāya','to the hand'],['yajñopavītāya','to the wearer of the sacred thread'],['lakuṭadharāya','to the bearer of the staff'],['cakr','discus'],
 ['āyudhāya','to the weapon-bearer'],['śaṅkha','conch'],['śabda','sound'],['nibodhanāya','to the awakener'],['skandha','shoulder'],['deśa','place'],['kṛṣṇ','black'],['ājināya','to the antelope-skin wearer'],
 ['vyāghra','tiger'],['carma','skin'],['nivasanāya','to the one clothed'],['lokeśvarāya','to the Lord of the World'],['siddheśvarāya','to the lord of the accomplished'],['bhagavate','to the Blessed One'],
 ['siddhyantu','may they be accomplished'],['mantra','mantra'],['padāni','words, phrases'],
 ['apaloka','one who looks upon (uncertain)'],['sarpa','snake, creep (uncertain)'],['sarp','snake'],['opavīta','sacred thread'],['dharāṇi','earth'],['rāja','king'],['mūrtte','O form, embodiment'],['re','hey!'],
 ['praṇāśaya','destroy!'],['viṣaṃ','poison'],['darśanena','by seeing'],['stavanaṃ','praise'],['stavaṃ','praise'],['tasya','to him'],['sādhanaṃ','accomplishing'],['viśodhakam','purifying'],['hṛdayam','heart, essence'],
 ['mama','my'],['vijayate','victory (obscure form)'],['mahāvijayate','great victory'],['mahābali','great strength'],['śaṅkarāya','to Śaṅkara (Śiva)'],['vyāghrāya','to the tiger'],['cakra','discus, wheel'],['bodhiya','awaken!'],['vimala','stainless'],['dhāraṇī','memory-spell'],
 ['āloke','light'],['ālokamati','one whose mind is light'],['lokātikrānte','gone beyond the world'],['maheśvara','great lord'],['parama','supreme'],['maitra','kind'],['citta','mind'],['vidyām','spell, knowledge'],
 ['dharendreśvara','lord of the earth-bearers'],['mūrte','O embodiment'],['jaṭā','matted hair'],['makuṭa','crown'],['mā','do not'],['pralamba','hang back, delay'],['vara','boon, excellent'],['bala','strength'],
 ['cala','move'],['nigha','(unclear)'],['nirghātana','destroyer'],['deśa','region'],['careśvara','lord of those who roam'],['tripura','three cities'],['dāhaneśvara','lord who burns'],['nārāyaṇa','Nārāyaṇa (Viṣṇu)'],['varūpa','form'],['ari','enemy'],
 ['hala','(poison, halāhala)'],['nirjita','conquered'],['lokasya','of the world'],['rāga','craving'],['dveṣa','aversion'],['moha','delusion'],['viṣa','poison'],['vināśana','destroyer'],['māla','garland or defilement'],['padmanābha','lotus-naveled'],
 ['śrī','auspicious radiance'],['buddhaya','awaken!'],['bodhaya','cause to awaken!'],['vāma','left'],['sthita','standing'],['hasa','laugh!'],['muñca','release!'],['mahāṭṭahāsaṃ','great laughter'],['pa','(unexplained)'],['bhaṇa','speak!'],['vāco','words'],
 ['smaratāṃ','(let them) remember'],['bhagavantaṃ','the Blessed One'],['lokita','seen'],['vilokitaṃ','seeing'],['lokeśvaraṃ','Lord of the World'],['tathāgatam','Thus-Gone One'],['dadāhi','give!'],['me','to me'],['kāmasya','of one who longs'],['darśanam','vision'],
 ['mahādara','(unclear)'],['yuddhāya','to battle'],['lakūṭadharāya','to the bearer of the lakūṭa'],['śabdāni','sounds'],['bodhanāya','to the one who awakens'],['skandha','shoulder'],['jināya','to the conqueror'],['nivāsanāya','to the one clothed'],['sarvasiddheśvarāya','to the lord of all the accomplished'],['bhagavate','to the Blessed One'],
 ['idam','this'],['nīlakaṇṭhaṃ','Blue-Throated'],['api','also'],['āvartayiṣyāmi','I shall recite'],['sarvārtha','every aim'],['śubham','auspicious'],['viśuddhakam','purifying'],['mahākāruṇika','greatly compassionate one'],
 ['hi','(sound syllable)'],['karman','work, action'],['vīryanti','(unclear)'],['mahāvīryanti','(unclear)'],['amala','spotless'],['valam','(unclear)'],['mahāvara','great boon'],['ehyehi','come, come'],['mahākara','great doer'],['huru','(sound syllable)'],
 ['mahāpadmanābha','great lotus-naveled one'],['bhūru','(sound syllable)'],['maitrī','kind, friendly'],['siddhayogeśvarāya','to the accomplished lord of yoga'],['varāhamukhāya','to the boar-faced one'],['siṃhamukhāya','to the lion-faced one'],
 ['siddhavidyādharāya','to the accomplished bearer of knowledge'],['padmahastāya','to the lotus-handed one'],['mahālakūṭadharāya','to the great bearer of the lakūṭa'],['cakrayuddhāya','to the one with the wheel (see note)'],['sidhyantu','may they be accomplished']
];
export const keyOf = s => s.normalize('NFC').toLowerCase().replace(/[^\p{L}\p{M}]/gu, '');
export const GLOSS = {}; GLOSS_LIST.forEach(g => { GLOSS[keyOf(g[0])] = g[1]; });
