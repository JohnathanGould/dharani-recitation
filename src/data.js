/* ---------- Text ----------
   The text of the study document, one entry per verse.
   lc = translation is uncertain because some words are obscure. */
export const SECTIONS = {1: 'Homage', 2: 'In praise: what he does', 3: 'Announcing the heart dhāraṇī', 4: 'The mantra', 5: 'Offerings (svāhā)', 6: 'Closing'};
export const DOC = [];
const add = (sec, sk, en, x) => DOC.push(Object.assign({id: DOC.length + 1, sec, sk, en}, x || {}));
add(1, "namo ratna-trayāya", "Homage to the Three Jewels (Buddha, Dharma and Sangha).");
add(1, "nama āryāvalokiteśvarāya bodhisattvāya", "Homage to the noble Avalokiteśvara, the bodhisattva,");
add(1, "mahāsattvāya mahākāruṇikāya", "the great being, the greatly compassionate one.");
add(2, "sarva bandhana chedana-karāya", "To the one who cuts through all bonds.");
add(2, "sarva bhava samudraṃ śoṣaṇa-karāya", "To the one who dries up the ocean of all existence.");
add(2, "sarva vyādhi praśamana-karāya", "To the one who calms all illness.");
add(2, "sarva mṛtyu upadrava vināśana-karāya", "To the one who destroys all the dangers and calamities of death.");
add(2, "sarva bhayeṣu trāṇa-karāya", "To the one who protects from every fear.");
add(3, "tasmān namas-kṛtvā idam", "Having paid homage, [I give] this");
add(3, "āryāvalokiteśvara bhāṣitaṃ nīlakaṇṭhaṃ api nāma hṛdayam", "the heart [dhāraṇī] spoken by Avalokiteśvara, also named Nīlakaṇṭha (\"Blue-Throated\").");
add(3, "āvartayiṣyāmi sarvārtha-sādhanaṃ śubham", "I shall recite it, auspicious, accomplishing every aim,");
add(3, "ajeyaṃ sarva-bhūtānāṃ bhava-mārga-viśuddhakam", "unconquerable, purifying the path of existence of all beings.");
add(4, "tadyathā oṃ āloke ālokamati lokātikrānte", "Thus: Oṃ! O light, O one whose mind is light, O one who has gone beyond the world,");
add(4, "he hare āryāvalokiteśvara mahābodhisattva", "O Hari, noble Avalokiteśvara, great bodhisattva!");
add(4, "he bodhisattva he mahābodhisattva", "O bodhisattva, O great bodhisattva.");
add(4, "he vīrya-bodhisattva he mahākāruṇika smara hṛdayam", "O heroic bodhisattva, O greatly compassionate one, remember the heart [dhāraṇī].");
add(4, "hi hi hare āryāvalokiteśvara maheśvara parama-maitra-citta mahākāruṇika", "Hi hi, O Hari, noble Avalokiteśvara, great lord, whose mind is supremely kind, O greatly compassionate one.", {"lc": true});
add(4, "kuru kuru karman", "Do, do the work.");
add(4, "sādhaya sādhaya vidyām", "Accomplish, accomplish the spell (vidyā).");
add(4, "dhuru dhuru vīryanti mahāvīryanti", "Dhuru dhuru, vīryanti, mahāvīryanti.", {"lc": true});
add(4, "dhara dhara dharendreśvara", "Hold, hold, O lord of the earth-bearers.", {"lc": true});
add(4, "cala cala vimala amala mūrte", "Move, move, O pure and stainless embodiment.");
add(4, "āryāvalokiteśvara jina kṛṣṇa-jaṭā-makuṭa-valam", "Noble Avalokiteśvara, conqueror (jina), crowned with dark matted hair,", {"lc": true});
add(4, "mā pralamba mahāsiddha vidyādhara", "do not delay, O great accomplished one, holder of knowledge.", {"lc": true});
add(4, "vara vara mahāvara", "Boon, boon, great boon (or: excellent, excellent, supremely excellent).", {"lc": true});
add(4, "bala bala mahābala", "Strength, strength, great strength.");
add(4, "cala cala mahācala", "Move, move, great mover.");
add(4, "kṛṣṇa-varṇa nigha kṛṣṇa-pakṣa nirghātana", "O dark-hued one, nigha, destroyer of the dark side.", {"lc": true});
add(4, "he padma-hasta cara cara deśa-careśvara", "O lotus-handed one, roam, roam, lord of those who roam the lands.", {"lc": true});
add(4, "kṛṣṇa-sarpa-kṛta-yajñopavīta", "O one wearing the sacred thread made from a black serpent.");
add(4, "ehyehi mahāvarāha-mukha", "Come, come, great boar-faced one.");
add(4, "tripura-dāhaneśvara nārāyaṇa-varūpa vara-mārga-ari", "Lord who burns the three cities, Nārāyaṇa-form, enemy of the excellent path.", {"lc": true});
add(4, "he nīlakaṇṭha he mahākara", "O Blue-Throated one, O great doer.");
add(4, "hala hala viṣa nirjita lokasya", "Hala hala, poison, conquered, of the world.", {"lc": true});
add(4, "rāga-viṣa vināśana", "Destroy the poison of craving.");
add(4, "dveṣa-viṣa vināśana", "Destroy the poison of aversion.");
add(4, "moha-viṣa vināśana", "Destroy the poison of delusion.");
add(4, "huru huru māla", "Huru huru (sound syllables), māla.", {"lc": true});
add(4, "huru huru hare mahāpadmanābha", "Huru huru, O Hari, O great lotus-naveled one.");
add(4, "sara sara śrī śrī", "Flow, flow; auspicious radiance.", {"lc": true});
add(4, "suru suru bhūru bhūru", "Suru suru (flow, flow); bhūru bhūru (sound syllables).", {"lc": true});
add(4, "buddhaya buddhaya bodhaya bodhaya", "Awaken, awaken; cause to awaken, cause to awaken.");
add(4, "maitrī nīlakaṇṭha ehyehi", "O kind Blue-Throated one, come.");
add(4, "vāma-sthita siṃha-mukha", "O lion-faced one, standing on the left.");
add(4, "hasa hasa muñca muñca", "Laugh, laugh; release, release.");
add(4, "mahāṭṭahāsaṃ ehyehi pa mahāsiddha-yogeśvara", "Great laughter; come, [pa], great accomplished lord of yogis.", {"lc": true});
add(4, "bhaṇa bhaṇa vāco", "Speak, speak the words.");
add(4, "sādhaya sādhaya vidyām", "Accomplish, accomplish the spell (vidyā).");
add(4, "smara smaratāṃ bhagavantaṃ lokita-vilokitaṃ lokeśvaraṃ tathāgatam", "Remember, remember the Blessed One, the one who sees and is seen, the Lord of the World, the Thus-Gone One.");
add(4, "dadāhi me darśana-kāmasya darśanam", "Grant me, who longs to see you, a vision of you.");
add(4, "prahlādaya manaḥ svāhā", "Gladden my mind. Svāhā!");
add(5, "siddhāya svāhā", "To the Accomplished One. Svāhā!");
add(5, "mahāsiddhāya svāhā", "To the Greatly Accomplished One. Svāhā!");
add(5, "siddhayogeśvarāya svāhā", "To the Accomplished Lord of Yoga. Svāhā!");
add(5, "nīlakaṇṭhāya svāhā", "To the Blue-Throated One. Svāhā!");
add(5, "varāhamukhāya svāhā", "To the Boar-Faced One. Svāhā!");
add(5, "mahādara-siṃhamukhāya svāhā", "To the Great Lion-Faced One. Svāhā!", {"lc": true});
add(5, "siddhavidyādharāya svāhā", "To the Accomplished Bearer of Sacred Knowledge. Svāhā!");
add(5, "padmahastāya svāhā", "To the Lotus-Handed One. Svāhā!");
add(5, "kṛṣṇa-sarpa-kṛta-yajñopavītāya svāhā", "To the one wearing the sacred thread made from the dark serpent. Svāhā!");
add(5, "mahālakūṭadharāya svāhā", "To the great bearer of the lakūṭa. Svāhā!", {"lc": true});
add(5, "cakrayuddhāya svāhā", "To the one armed with the wheel (cakra). Svāhā!", {"lc": true});
add(5, "śaṅkha-śabdāni bodhanāya svāhā", "To the one who awakens through the sound of the conch. Svāhā!");
add(5, "vāma-skandha-deśa-sthita kṛṣṇa-jināya svāhā", "To the one at the left shoulder, [clad in] black skin. Svāhā!", {"lc": true});
add(5, "vyāghra-carma-nivāsanāya svāhā", "To the one clothed in tiger skin. Svāhā!");
add(5, "lokeśvarāya svāhā", "To the Lord of the World. Svāhā!");
add(5, "sarvasiddheśvarāya svāhā", "To the Lord of all the Accomplished. Svāhā!");
add(6, "namo bhagavate āryāvalokiteśvarāya bodhisattvāya", "Homage to the Blessed Avalokiteśvara, the bodhisattva,");
add(6, "mahāsattvāya mahākāruṇikāya", "the great being, the greatly compassionate one.");
add(6, "sidhyantu me mantra-padāni svāhā", "May the words of this mantra be accomplished. Svāhā!");

/* What you wrote before, compared with the Sanskrit (verses 1 to 10 only) */
export const STUDY = {
 1: {yours: 'Namo Ratna Trayaya', fixes: [{y: 'Ratna Trayaya', s: 'ratna-trayāya', kind: 'sound', t: 'Your letters are right. The second-to-last a is long: rut-nuh-truh-YAH-yuh. Written "trayaya" the last three syllables look identical, and they are not.'}]},
 2: {yours: 'Namo Aryavelokitesvaraya Boddhisatvaya', fixes: [
  {y: 'Namo', s: 'nama', kind: 'sound', t: 'Verse 1 starts with namo, but your document starts this verse with nama: namaḥ ("homage") is written nama before ā.'},
  {y: 'Aryavelokitesvaraya', s: 'āryāvalokiteśvarāya', kind: 'slip', t: 'avalokita begins a-va-lo, so "velo" should be "valo". The first ā and the ā before -ya are long (ah). ś is "sh": ...taysh-vuh-rah-yuh.'},
  {y: 'Boddhisatvaya', s: 'bodhisattvāya', kind: 'slip', t: '"dh" is one sound (d with a puff of breath), so only one d. The t is doubled: bo-dhi-sat-tvā-ya, and the final ā is long.'}]},
 3: {yours: 'Mahasatvaya Mayakarunikiya', fixes: [
  {y: 'Mahasatvaya', s: 'mahāsattvāya', kind: 'sound', t: 'mahā means "great" and its second a is long: muh-HAH. Sattva keeps the doubled t.'},
  {y: 'Mayakarunikiya', s: 'mahākāruṇikāya', kind: 'slip', t: '"Maya" lost its h: it is mahā ("great") again. kāruṇika starts with a long ā and ends -kā-ya, not -ki-ya. ṇ is an n said with the tongue curled back.'}]},
 4: {yours: 'Sarva Bandhana Cheedana Karaya', fixes: [
  {y: 'Cheedana', s: 'chedana', kind: 'key', t: '"ee" is a pronunciation spelling for the sound "ay". Sanskrit e is always "ay", so the real spelling is chedana (chhay-duh-nuh, "cutting").'},
  {y: 'Karaya', s: 'karāya', kind: 'sound', t: 'The -rā- is long: kuh-RAH-yuh. kara means "maker, doer".'}]},
 5: {yours: 'Sarva Bhava Samoodrum Shosana Karaya', fixes: [
  {y: 'Samoodrum', s: 'samudraṃ', kind: 'key', t: '"oo" is a pronunciation spelling for u. Your -um ending is right: ṃ is a nasal hum, so samudraṃ is said suh-moo-drum.'},
  {y: 'Shosana', s: 'śoṣaṇa', kind: 'key', t: 'A good pronunciation spelling. Sanskrit writes ś and ṣ for its two "sh" sounds and ṇ for the curled-tongue n, so śoṣaṇa is said shoh-shuh-nuh.'}]},
 6: {yours: 'Sarva Veyadhee Prosamana Karaya', fixes: [
  {y: 'Veyadhee', s: 'vyādhi', kind: 'key', t: 'Your spelling captures the sound. Sanskrit writes vyādhi: vyah-dhih, with a long ā and a short final i.'},
  {y: 'Prosamana', s: 'praśamana', kind: 'slip', t: 'It starts with pra-, not pro-. ś is "sh": pruh-shuh-muh-nuh.'}]},
 7: {yours: 'Sarva Mryitu Upadravha Vinishana Karaya', fixes: [
  {y: 'Mryitu', s: 'mṛtyu', kind: 'key', t: 'Your word is right: mṛtyu, "death". ṛ is a vowel that sounds like "ri", so it is said mrit-yoo.'},
  {y: 'Upadravha', s: 'upadrava', kind: 'slip', t: 'No h here. It is u-pa-dra-va: oo-puh-druh-vuh.'},
  {y: 'Vinishana', s: 'vināśana', kind: 'slip', t: 'The second syllable is nā (long a), and the "sh" comes from ś in the third: vih-nah-shuh-nuh.'}]},
 8: {yours: 'Sarva...', fixes: [{y: 'Sarva...', s: 'sarva-bhayeṣu trāṇa-karāya', kind: 'ok', t: 'This is where your memory stops. The line goes on: bhayeṣu trāṇa karāya, "to the one who protects in all fears".'}]},
 9: {yours: 'tasmān namas kṛtvā idaṃ', fixes: [{y: 'tasmān namas kṛtvā idaṃ', s: 'tasmān namas-kṛtvā idam', kind: 'ok', t: 'Matches your document. tasmān is tasmāt ("therefore") before n, a regular sound change. Your document writes the last word idam; idaṃ is the same word with ṃ.'}]},
 10: {yours: 'āryāvalokiteśvara bhāṣitaṃ nīlakaṇṭhanām api nāma hṛdayam', fixes: [
  {y: 'āryāvalokiteśvara bhāṣitaṃ', s: 'āryāvalokiteśvara bhāṣitaṃ', kind: 'ok', t: 'Matches your document.'},
  {y: 'nīlakaṇṭhanām api nāma', s: 'nīlakaṇṭhaṃ api nāma', kind: 'slip', t: 'Your printed document has nīlakaṇṭhaṃ (with ṃ, a nasal hum), not nīlakaṇṭhanām. Api means "also", so the phrase reads "also named Nīlakaṇṭha".'},
  {y: 'hṛdayam', s: 'hṛdayam', kind: 'ok', t: 'Your document keeps hṛdayam ("heart") at the end of this line, so you had it right.'}]}
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
