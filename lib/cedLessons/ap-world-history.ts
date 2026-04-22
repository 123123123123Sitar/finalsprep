import type { CourseCedLessons } from "./types";

/**
 * AP World History: Modern CED lessons — every topic from Units 1-9 of the
 * 2024-25 CED. Narratives foreground the three reasoning processes the
 * exam scores: causation, continuity & change over time (CCOT), and
 * comparison. Each lesson is written so a student can answer SAQ, DBQ, and
 * LEQ prompts with specific evidence and clear periodization.
 *
 * Worked examples model SAQ-style responses (claim + evidence + reasoning)
 * because that is the form most often tested and most often missed by
 * students who otherwise know the content. Diagrams (timelines, trade-route
 * maps, comparative empire charts) anchor visual memory.
 */

export const AP_WORLD_HISTORY_CED_LESSONS: CourseCedLessons = {
  // =========================================================================
  // UNIT 1 — THE GLOBAL TAPESTRY (c. 1200-1450)
  // =========================================================================
  "1.1": {
    id: "1.1",
    title: "Developments in East Asia from c. 1200 to c. 1450",
    summary:
      "Song China was the most commercialized, urbanized society on earth in 1200; its innovations and Confucian institutions shaped Korea, Japan, and Vietnam for centuries.",
    lesson:
      "By 1200 the **Song Dynasty (960-1279)** had built the world's most sophisticated economy. Three structural features matter:\n\n1. **Meritocratic bureaucracy.** The civil-service exam, rooted in **Neo-Confucianism** (a Song revival blending Confucian ethics with Buddhist metaphysics, championed by Zhu Xi), staffed government with scholar-officials chosen by exam rather than birth. This created a powerful **scholar-gentry** class and locked Confucian patriarchy into law (foot binding spread among elite women).\n\n2. **Commercial revolution.** Champa rice from Vietnam (early-ripening, drought-resistant) doubled harvests and let population pass 100 million. **Paper money** (jiaozi), the magnetic compass, gunpowder, woodblock printing, and the largest iron industry on earth (Kaifeng) supported booming cities like Hangzhou (1M+).\n\n3. **Tributary system.** Neighbors — Korea (Goryeo), Japan, Vietnam (Dai Viet) — sent tribute and acknowledged Chinese cultural primacy without being conquered.\n\n**Korea (Goryeo, 918-1392)** copied the Chinese exam, adopted Buddhism + Confucianism, but kept a hereditary aristocracy. **Japan** during this period was *feudal* — the emperor was a figurehead while shoguns (Kamakura 1185-1333, Ashikaga 1336-1573) ruled through samurai bound by **bushido**. Japan borrowed Chinese script and Buddhism (Zen, Pure Land) but adapted, not copied. **Vietnam** kept exams and Mahayana Buddhism but resisted Chinese political domination.\n\nIn 1279 the Mongols ended the Song and founded the **Yuan Dynasty** (covered in 2.2). The Han Chinese **Ming (1368-1644)**, founded by Zhu Yuanzhang after expelling the Mongols, restored Confucian orthodoxy, rebuilt the Grand Canal, and (briefly) launched **Zheng He's** treasure fleets (1405-33) before turning inward.",
    keyIdeas: [
      "Song China = most commercialized, urbanized economy of 1200 — Champa rice, paper money, gunpowder, compass.",
      "Neo-Confucianism + civil-service exam created scholar-gentry rule and reinforced patriarchy (foot binding).",
      "Tributary system spread Chinese culture (script, Buddhism, Confucianism) without conquest.",
      "Japan stayed feudal under shoguns and samurai; Korea and Vietnam selectively borrowed Chinese institutions.",
      "Ming (1368) restored Han rule after the Mongol Yuan; Zheng He's voyages projected power before isolation.",
    ],
    commonMistakes: [
      "Calling the Song 'isolationist' — it was the most commercially open economy of its day.",
      "Treating Korea, Japan, Vietnam as identical 'sinified' states — each adapted Chinese models differently.",
      "Forgetting Neo-Confucianism is a SONG synthesis (not original Confucianism) and its effects on women.",
    ],
    workedExample: {
      prompt:
        "Briefly explain ONE specific way Song economic developments shaped East Asia between c. 1200 and c. 1450.",
      solution:
        "The introduction of Champa rice from Vietnam allowed the Song to support a population over 100 million and a network of major cities like Hangzhou. The agricultural surplus financed paper money (jiaozi), iron and porcelain manufacturing for export, and the civil-service exam that filled the bureaucracy with Neo-Confucian scholar-officials. This template — commercial agriculture funding a Confucian state — was copied by Goryeo Korea and Dai Viet, spreading East Asian economic integration well before 1450.",
    },
    diagram:
      '<svg viewBox="0 0 400 240" xmlns="http://www.w3.org/2000/svg"><rect width="400" height="240" fill="#fafaf9"/><text x="200" y="22" text-anchor="middle" font-family="serif" font-size="14" fill="#1c1917" font-weight="bold">East Asia c. 1200-1450</text><line x1="40" y1="200" x2="360" y2="200" stroke="#44403c" stroke-width="2"/><g font-family="sans-serif" font-size="10" fill="#1c1917"><text x="40" y="220" text-anchor="middle">1200</text><text x="120" y="220" text-anchor="middle">1279</text><text x="200" y="220" text-anchor="middle">1368</text><text x="280" y="220" text-anchor="middle">1405</text><text x="360" y="220" text-anchor="middle">1450</text></g><rect x="40" y="60" width="80" height="20" fill="#fed7aa" stroke="#c2410c"/><text x="80" y="74" text-anchor="middle" font-size="10">Song</text><rect x="120" y="90" width="80" height="20" fill="#fde68a" stroke="#a16207"/><text x="160" y="104" text-anchor="middle" font-size="10">Yuan (Mongol)</text><rect x="200" y="60" width="160" height="20" fill="#bbf7d0" stroke="#15803d"/><text x="280" y="74" text-anchor="middle" font-size="10">Ming</text><rect x="280" y="120" width="60" height="16" fill="#fecaca" stroke="#b91c1c"/><text x="310" y="132" text-anchor="middle" font-size="9">Zheng He</text><text x="40" y="50" font-size="9" fill="#57534e">Champa rice • paper money • compass</text></svg>',
  },
  "1.2": {
    id: "1.2",
    title: "Developments in Dar al-Islam from c. 1200 to c. 1450",
    summary:
      "After the Abbasid Caliphate fragmented, new Islamic states (Mamluks, Delhi Sultanate, Mali) sustained Islamic civilization while it expanded through trade, scholarship, and Sufi missionaries.",
    lesson:
      "By 1200, the unified **Abbasid Caliphate** had broken into competing successor states — but **Dar al-Islam** ('the abode of Islam'), the cultural-religious zone, kept growing.\n\n**Political fragmentation, cultural cohesion.** Turkic and Mongol invasions reshaped the political map:\n- **Seljuk Turks** (Sunni) had already taken Baghdad (1055).\n- The **Mongol Hulegu** sacked Baghdad in **1258**, ending the Abbasid caliphate as a real political force.\n- **Mamluks** (slave-soldier dynasty) ruled Egypt, defeated the Mongols at **Ain Jalut (1260)** — the first major Mongol defeat — and protected Cairo as the new center of Sunni learning.\n- The **Delhi Sultanate** (1206-1526) brought Turkic-Persian Islamic rule to north India.\n- In West Africa, **Mali** (under Mansa Musa, r. 1312-37) made Timbuktu a Sunni scholarly hub.\n\n**Cultural flourishing.** Despite political turmoil, this is a golden age of Islamic scholarship:\n- **Ibn Battuta** (1304-c.1369) — Moroccan jurist who traveled ~75,000 miles across Dar al-Islam, leaving the *Rihla* travelogue.\n- **Ibn Khaldun** (1332-1406) — Tunisian historian; his *Muqaddimah* founded social-historical analysis.\n- **Nasir al-Din al-Tusi** — astronomer/mathematician at Maragheh; his planetary models later influenced Copernicus.\n- **Sufism** — mystical Islam that emphasized personal experience of God and was the main vehicle for conversion in Anatolia, Bengal, sub-Saharan Africa, and Southeast Asia.\n\n**Continuities** with earlier Dar al-Islam: scholarly transmission of Greek/Persian/Indian texts via Arabic; Sharia-based legal systems; commercial integration via dhows in the Indian Ocean (2.3) and caravans across the Sahara (2.4).\n\n**Changes**: shift of cultural centers from Baghdad to Cairo, Cordoba (until 1492), Delhi, and Timbuktu; Turkic and Persianate political-military elites layered atop Arabic religious-legal institutions.",
    keyIdeas: [
      "Abbasid political fragmentation — but Dar al-Islam EXPANDED culturally and geographically.",
      "Mongol sack of Baghdad 1258; Mamluks stop the Mongols at Ain Jalut 1260; Cairo replaces Baghdad as Sunni center.",
      "Delhi Sultanate (1206) brings Islam to north India; Mali (Mansa Musa) makes Timbuktu a center of learning.",
      "Ibn Battuta (travel), Ibn Khaldun (history), al-Tusi (astronomy) — golden age of scholarship.",
      "Sufism is the main engine of conversion outside the Arab heartland.",
    ],
    commonMistakes: [
      "Saying Dar al-Islam 'declined' after 1258 — politically yes, culturally and geographically it expanded.",
      "Confusing the religious community (Dar al-Islam) with any single state.",
      "Forgetting Sufi mystics as the primary missionaries (not conquering armies).",
    ],
    workedExample: {
      prompt:
        "Briefly explain ONE specific way Islamic intellectual life continued or expanded between c. 1200 and c. 1450.",
      solution:
        "After the Mongol sack of Baghdad in 1258, Cairo under the Mamluks became a leading center of Sunni scholarship and hosted institutions like al-Azhar. Scholars such as Ibn Khaldun developed new analytic histories (the *Muqaddimah*), while astronomers at the Maragheh observatory (al-Tusi) produced planetary models later used by Copernicus. The continuity of Arabic scholarly networks across politically fragmented states shows that Dar al-Islam's intellectual life expanded even as its political unity fractured.",
    },
  },
  "1.3": {
    id: "1.3",
    title: "Developments in South and Southeast Asia from c. 1200 to c. 1450",
    summary:
      "Hindu, Buddhist, and Muslim states coexisted across South and Southeast Asia, often shaped by Indian Ocean trade and Indian cultural diffusion ('Indianization').",
    lesson:
      "**South Asia** in 1200 was politically divided. The Turkic-Persian **Delhi Sultanate (1206-1526)** ruled most of north India through five successive dynasties. Sultans imposed a *jizya* (non-Muslim tax) but mostly tolerated Hindu practice; massive temples were sometimes destroyed, but most Hindus remained Hindu.\n- **Bhakti movement** (devotional Hinduism) democratized worship by emphasizing personal love of a god (Vishnu, Shiva), bypassing caste and Brahmin priests. It paralleled Sufi devotional Islam, and the two movements converged in figures like Kabir and later Guru Nanak (Sikhism, c.1500).\n- **Vijayanagara Empire (1336-1646)** in south India was a Hindu power explicitly founded to resist Muslim expansion; it dominated south Indian trade.\n- **Rajputs** were Hindu warrior-clans who fought, allied with, and intermarried with sultans.\n\n**Southeast Asia**'s key story is **Indianization**: ruling elites adopted Hindu/Buddhist religion, Sanskrit, devaraja ('god-king') ideology, and Indian art via Indian Ocean traders — without ever being conquered by India.\n- **Khmer Empire (Angkor)** in Cambodia built **Angkor Wat** (early 12th c.), originally a Vishnu temple, later Buddhist. Massive hydraulic engineering supported a million-person capital.\n- **Srivijaya** (7th-13th c., Sumatra) controlled the Malacca Strait; rich on Indian Ocean tolls; Mahayana Buddhist.\n- **Majapahit** (1293-1527, Java) replaced Srivijaya; Hindu-Buddhist; controlled spice trade through Indonesia.\n- **Sukhothai** (Thailand) and **Vietnam** (Dai Viet) embraced Theravada Buddhism and Mahayana Buddhism respectively.\n\n**Muslim merchants and Sufis** introduced Islam to coastal Southeast Asia from c. 1200 onward — the conversion of the Sultanate of **Malacca** (founded 1400, converted c.1414) and Aceh would make Indonesia the largest Muslim country on earth.",
    keyIdeas: [
      "Delhi Sultanate (Muslim) ruled north India; Vijayanagara (Hindu) ruled the south; both are large, sophisticated states.",
      "Bhakti (Hindu devotional) and Sufi (Muslim mystical) movements democratized religion and converged.",
      "'Indianization' = Southeast Asian states adopt Hindu/Buddhist religion, Sanskrit, devaraja kingship via TRADE, not conquest.",
      "Angkor Wat (Khmer), Srivijaya, Majapahit show Hindu-Buddhist sophistication; Malacca brings Islam to the islands by 1400.",
    ],
    commonMistakes: [
      "Saying the Delhi Sultanate forcibly converted India — most of the population stayed Hindu.",
      "Treating Indianization as a colonial conquest rather than cultural diffusion.",
      "Forgetting that Islam reached Southeast Asia mainly through MERCHANTS AND SUFIS, not armies.",
    ],
  },
  "1.4": {
    id: "1.4",
    title: "State Building in the Americas",
    summary:
      "The Aztec (Mexica) Empire and the Inca Empire built large, tribute-based states in the Americas — different ecologies, different solutions.",
    lesson:
      "Two large American empires bracket this period.\n\n**Aztec / Mexica Empire (c. 1345-1521)** — central Mexico.\n- Capital **Tenochtitlán** (founded 1325 on a lake island; 200,000-300,000 people, larger than any contemporary European city).\n- Tripled in size after the **Triple Alliance (1428)** of Tenochtitlán, Texcoco, and Tlacopan.\n- Government was a **tribute empire** — local rulers stayed in place but sent tribute (food, textiles, cacao, captives) to the Mexica.\n- **Religion** demanded human sacrifice to feed the sun god Huitzilopochtli; the **Flower Wars** captured prisoners specifically for sacrifice. This made the Aztecs hated by subject peoples — fatal in 1519 when Tlaxcalans allied with Cortés.\n- Engineering: chinampas (floating gardens) fed the city; causeways and an aqueduct connected it to the mainland.\n\n**Inca Empire (Tawantinsuyu, c. 1438-1533)** — Andes, Pacific coast.\n- Stretched 2,500 miles from Ecuador to Chile, the largest pre-Columbian empire.\n- Capital **Cuzco**; ceremonial center **Machu Picchu**.\n- Centralized state with **mit'a** labor tax — every able-bodied adult owed labor on roads, terraces, and temples.\n- **Quipu** (knotted strings) recorded census, tribute, and accounts despite no written script.\n- Road system >25,000 miles long, with relay runners (chasquis).\n- Religion centered on the sun god **Inti**; the Sapa Inca (emperor) was Inti's descendant — a divine kingship.\n\n**Other societies** — Maya city-states (already past their classical peak by 1200), Mississippian mound cities (Cahokia c.1100 was the largest, declining by 1300), and dozens of less-centralized peoples (Iroquois Confederacy, Pueblo, Plains hunter-gatherers).\n\n**Comparison** — Aztec: indirect rule, terror religion, lake-island agriculture. Inca: direct rule, labor tax, vertical mountain agriculture, no markets (state redistribution).",
    keyIdeas: [
      "Aztec Empire = tribute empire ruling central Mexico from Tenochtitlán; built on Triple Alliance (1428).",
      "Aztec religion required human sacrifice — alienated subject peoples (a fatal weakness in 1519).",
      "Inca Empire = centralized Andean state, mit'a labor tax, quipu records, 25,000-mile road network.",
      "Both ran sophisticated agriculture: Aztec chinampas; Inca terraces + freeze-drying potatoes.",
      "Other significant societies: Maya (declining), Cahokia (declining), Iroquois Confederacy (rising).",
    ],
    commonMistakes: [
      "Calling the Aztecs and Inca 'primitive' — they ruled millions and built engineering on European-imperial scale.",
      "Treating the Maya as still dominant in 1200 — Maya classical collapse was c. 900 CE.",
      "Forgetting that Aztec resentment among subject peoples enabled Cortés's 1519-21 conquest.",
    ],
    workedExample: {
      prompt:
        "Briefly compare the Aztec and Inca methods of governing their empires.",
      solution:
        "Both states were large tribute empires, but their administration diverged. The Aztecs ruled indirectly: conquered city-states kept their own rulers and customs but sent tribute (food, textiles, sacrificial captives) to Tenochtitlán. The Incas ruled directly through a centralized bureaucracy that imposed the *mit'a* labor tax, built an integrated road system, and recorded everything on quipu. The contrast — Aztec indirect rule with religious terror, Inca direct rule with state redistribution — reflects different ecologies (lake-basin city vs. vertical Andes) and explains why post-conquest Spanish administrators reused Inca but not Aztec systems.",
    },
  },
  "1.5": {
    id: "1.5",
    title: "State Building in Africa",
    summary:
      "West African empires (Mali, Songhai), East African Swahili coast city-states, and central African Great Zimbabwe each built wealth through different long-distance trade networks.",
    lesson:
      "Africa in this period had sophisticated states whose wealth came from trade.\n\n**West Africa** — trans-Saharan gold-salt trade (covered fully in 2.4):\n- **Ghana** (c.300-1200) had peaked before this period.\n- **Mali (c.1235-1600)**, founded by **Sundiata Keita**, controlled the upper Niger and the gold fields. **Mansa Musa** (r. 1312-37), the richest individual in recorded history, made the **hajj to Mecca in 1324-25** with so much gold he crashed Egyptian and Arabian gold prices for a decade. He returned with scholars and architects who turned **Timbuktu** into an Islamic intellectual center (Sankore Madrasa).\n- **Songhai (c.1464-1591)** under **Sunni Ali** and **Askia Muhammad** would later replace Mali (covered also in 2.4).\n- Government blended traditional kingship with Islam; rulers were Muslim, but most rural subjects practiced traditional religions or syncretism.\n\n**East Africa — Swahili Coast** (c. 1000-1500): a string of independent **city-states** (Kilwa, Mombasa, Mogadishu, Sofala, Zanzibar) on the Indian Ocean. They grew rich on **Indian Ocean trade** (gold, ivory, slaves OUT; cotton, porcelain, glass IN). The **Swahili** language is Bantu grammar with heavy Arabic vocabulary — a fusion that mirrors the merchant-class culture: Muslim, urban, multiethnic.\n\n**Great Zimbabwe** (c.1100-1450): a stone-walled royal complex in present-day Zimbabwe. The kingdom controlled gold flows from the interior to the Swahili Coast. The dry-stone walls (Great Enclosure ~32 ft tall) are the largest pre-modern stone architecture in sub-Saharan Africa. It declined by ~1450 likely from environmental exhaustion (overgrazing, deforestation).\n\n**Christian Ethiopia (Aksum/Solomonic dynasty)** kept Coptic Christianity surrounded by Islam; **Lalibela's** rock-hewn churches (c.1200) symbolize this distinct trajectory.\n\n**Continuities** across African states: importance of **kinship** networks, trade-based wealth, syncretic religion, and matrilineal lines in some societies.",
    keyIdeas: [
      "Mali (Mansa Musa, hajj 1324) = trans-Saharan gold empire; Timbuktu becomes an Islamic learning center.",
      "Swahili Coast city-states (Kilwa, Mombasa) = Indian Ocean merchant cities; Bantu + Arabic = Swahili language.",
      "Great Zimbabwe = stone-walled state controlling gold-to-coast trade; declined ~1450 from environmental stress.",
      "Christian Ethiopia stayed independent and Christian, surrounded by Islam (Lalibela churches).",
      "African states integrated into TWO major networks — trans-Saharan (Mali) and Indian Ocean (Swahili).",
    ],
    commonMistakes: [
      "Treating sub-Saharan Africa as 'isolated' — it was deeply connected to Eurasia by 1200.",
      "Confusing Ghana, Mali, and Songhai — they are sequential West African empires.",
      "Forgetting that Swahili Coast cities were INDEPENDENT city-states, not a unified empire.",
    ],
  },
  "1.6": {
    id: "1.6",
    title: "Developments in Europe from c. 1200 to c. 1450",
    summary:
      "Europe was politically fragmented under feudalism, dominated by the Catholic Church, and devastated by the Black Death — but also seeing the rise of towns, universities, and centralized monarchies.",
    lesson:
      "**Political fragmentation under feudalism.** Europe had no single state. **Feudalism** structured society: kings granted land (fiefs) to nobles in exchange for military service; nobles extracted labor and rent from **serfs** under **manorialism**. The **Holy Roman Empire** was a loose confederation of German principalities; France and England were consolidating monarchies; Italy was a patchwork of republics (Venice, Florence, Genoa) and papal lands.\n\n**The Catholic Church** was the most universal institution. The pope held spiritual and substantial political authority; bishops collected tithes; monasteries ran schools, libraries, hospitals; church courts handled marriage and inheritance. The **Great Schism (1378-1417)** — when two and briefly three rival popes claimed the throne — undermined papal prestige and helped seed later Reformation movements.\n\n**Universities** emerged from cathedral schools — Bologna (1088), Paris (c.1150), Oxford (c.1167) — and translated **Aristotle**, Galen, Euclid from Arabic and Greek (often via Muslim Spain). **Thomas Aquinas** (*Summa Theologica*, 1265-74) synthesized Aristotelian reason and Catholic theology.\n\n**The Crusades (1095-1291)** failed militarily but dramatically increased European exposure to Mediterranean trade, Islamic medicine and mathematics, and Asian luxury goods.\n\n**Black Death (1347-1351)** killed an estimated **30-50% of Europeans** in four years, traveling along Mongol-era trade routes (Genoese ships from Crimea brought it to Sicily). Consequences:\n- Labor shortage → peasant wages rose, weakening serfdom in Western Europe.\n- Peasant revolts (English Peasants' Revolt 1381, Jacquerie 1358).\n- Religious crisis — flagellants, anti-Jewish pogroms, and questioning of Church authority.\n- Long-term shift toward more monetized, commercial economies.\n\n**State centralization** quickened in the late 14th and 15th centuries: France and England drained each other in the **Hundred Years' War (1337-1453)** but emerged with stronger royal authority and the seeds of national identity (Joan of Arc).\n\n**Italian Renaissance** is just beginning by 1450 — covered fully in AP Euro but worth flagging here.",
    keyIdeas: [
      "Feudalism + manorialism organized political and economic life; Catholic Church was the universal institution.",
      "Universities (Bologna, Paris, Oxford) recovered Aristotle through Arabic translations.",
      "Crusades (1095-1291) increased European contact with Islamic civilization and Asian trade.",
      "Black Death killed 30-50% of Europe (1347-51) — broke serfdom in Western Europe and shook Church authority.",
      "Hundred Years' War (1337-1453) accelerated French and English state centralization.",
    ],
    commonMistakes: [
      "Calling medieval Europe a 'dark age' — it had universities, cathedrals, and rising commerce.",
      "Forgetting the Black Death's role in WEAKENING serfdom (in Western Europe) but later REINFORCING it (in Eastern Europe).",
      "Overstating the Renaissance before 1450 — the high Renaissance is post-1450.",
    ],
  },
  "1.7": {
    id: "1.7",
    title: "Comparison in the Period from c. 1200 to c. 1450",
    summary:
      "Across Eurasia and Africa, c. 1200-1450 societies built complex states integrated by long-distance trade — but with very different political, religious, and labor systems.",
    lesson:
      "This topic asks you to **compare** state-building across regions. The CED expects students to handle similarities AND differences with specific evidence.\n\n**Similarities across regions, c. 1200-1450**:\n- All major regions developed **complex bureaucracies** to administer territory and tax (Song China, Delhi Sultanate, Mali, Inca, Byzantine).\n- Most relied on **religion to legitimize authority** — Confucian Mandate of Heaven (China), divine kingship (Inca, Aztec, Mali, Khmer), papal blessing (European monarchs), caliphal authority (Islamic states).\n- Long-distance **trade integration** funded states everywhere — Silk Road cities, Indian Ocean ports, trans-Saharan caravans, European Hanseatic ports.\n- **Patriarchy** was nearly universal, though varying in intensity (Song foot binding vs. relative freedom for Mongol women).\n\n**Differences**:\n- **Political structure**: Song China = centralized meritocratic bureaucracy; Europe = decentralized feudalism; Mali/Aztec = tribute confederations; Inca = direct labor-tax bureaucracy.\n- **Religion**: monotheistic Christianity (Europe, Ethiopia), Islam (Dar al-Islam), Confucianism + Buddhism (East Asia), Hinduism (S Asia), Indigenous polytheism (Aztec, Inca, Sub-Saharan).\n- **Labor**: serfdom (Europe, Russia), free peasantry (Song), tribute labor (mit'a in Inca), slavery in Mediterranean and Islamic worlds.\n- **Gender**: relatively higher status for women in Mongol and some sub-Saharan societies; sharp restriction in Song China (Neo-Confucianism, foot binding) and elite Christian Europe.\n\n**Continuity and change**:\n- Continuities: agriculture-based economies; religion-state alliance; trade networks build wealth.\n- Changes: rise of new empires (Mongol, Mali, Aztec, Inca); spread of Islam beyond Arab heartland; commercialization of Song China; Black Death's blow to European serfdom.",
    keyIdeas: [
      "Comparison rubric: similarities AND differences with specific examples from at least two regions.",
      "Universal: complex bureaucracies, religious legitimation, trade-based wealth, patriarchy.",
      "Variable: political structure (centralized vs. feudal), religion, labor systems, women's status.",
      "Continuity: religion-legitimized agrarian states. Change: new empires, Islamic expansion, Black Death.",
    ],
    commonMistakes: [
      "Listing facts about each region in isolation instead of explicitly comparing.",
      "Forgetting that comparison essays require BOTH similarities and differences.",
      "Vague generalizations ('all societies were patriarchal') without specific examples.",
    ],
    workedExample: {
      prompt:
        "Compare the methods used by ONE state in Afro-Eurasia and ONE state in the Americas to administer their empires between c. 1200 and c. 1450.",
      solution:
        "Both Song China and the Inca Empire used centralized bureaucracies to administer large territories, but their methods differed sharply. The Song staffed the bureaucracy through Neo-Confucian civil-service exams, paid officials in coin from a monetized commercial economy, and integrated provinces with the Grand Canal and paper money. The Inca had no writing or money; instead, the state imposed the *mit'a* labor tax, kept records on quipu, and integrated the empire through a 25,000-mile road network maintained by chasqui runners. Both were centralized, but Song relied on a literate scholar-gentry and markets while the Inca relied on labor service and state redistribution.",
    },
  },

  // =========================================================================
  // UNIT 2 — NETWORKS OF EXCHANGE (c. 1200-1450)
  // =========================================================================
  "2.1": {
    id: "2.1",
    title: "The Silk Roads",
    summary:
      "Overland Eurasian trade routes carried luxury goods, religions, technologies, and disease between China, Central Asia, the Middle East, and Europe — and revived in the Mongol era.",
    lesson:
      "The **Silk Roads** were a network (not a single road) of overland routes across Central Asia linking China to the Mediterranean. They had operated since the Han/Roman era but **expanded after 1200** because of Song commercial growth and especially the **Pax Mongolica** (1250s-1350s) — Mongol unification made caravans safe across the entire route.\n\n**What moved**:\n- **Eastward** (to China): horses, silver, glass, woolens, spices.\n- **Westward** (from China): silk, porcelain, paper, gunpowder technology.\n- **Religion**: Buddhism reached China (earlier), Islam reached Central Asia and northwest China; Nestorian Christianity reached Mongol courts.\n- **Disease**: the Black Death likely traveled west along Silk Road and Mongol routes from China/Central Asia in the 1340s.\n- **People**: merchants like **Marco Polo** (Venetian, 1271-95) and **Ibn Battuta** moved across and wrote about it.\n\n**Trade-enabling innovations** of the period:\n- **Camel saddles** (Bactrian for cold steppes) increased load capacity.\n- **Caravanserai** — government- or merchant-built inns spaced ~25 miles (one day's travel) gave caravans water, fodder, security, banking. Chains of them lined Silk Road and trans-Saharan routes.\n- **Banking innovations**: Chinese **flying cash** and later **paper money**; Islamic **sakk** (origin of 'check') let merchants deposit money in one city and draw it in another.\n- **Mongol yam relay system** — postal stations with fresh horses every ~25 miles let messages travel hundreds of miles per day.\n\n**Cities** that grew on Silk Road traffic: Samarkand, Bukhara, Kashgar, Hangzhou, Constantinople. **Diasporic merchant communities** (Sogdians earlier, Uyghurs, Jews, Armenians, Genoese) formed in trading cities — they brought their religions and cuisines along with their goods.\n\nThe Silk Roads **declined after ~1350** when the Black Death disrupted trade, the Mongol Empire fragmented, and the Ming turned inward.",
    keyIdeas: [
      "Silk Roads = overland network across Central Asia, ENABLED in this period by Pax Mongolica (1250-1350).",
      "Carried silk, porcelain, gunpowder west; horses, glass, silver east; religions and disease in both directions.",
      "Caravanserai, camel saddles, paper money/sakk made long-distance trade feasible.",
      "Marco Polo and Ibn Battuta documented trans-Eurasian travel; Mongol yam relays sped communication.",
      "Silk Roads declined after 1350 (Black Death + Mongol fragmentation).",
    ],
    commonMistakes: [
      "Calling it 'the Silk Road' (singular) — it was a network of many routes.",
      "Forgetting that the Mongols REVIVED, not disrupted, Silk Road trade.",
      "Listing only goods — religions, technologies, and DISEASE traveled too.",
    ],
    workedExample: {
      prompt:
        "Briefly explain ONE specific reason for the expansion of long-distance overland trade on the Silk Roads between c. 1200 and c. 1450.",
      solution:
        "The Mongol conquests of the 13th century unified the political authority across most of Central Asia, producing the Pax Mongolica. With one regime patrolling the routes, caravans could travel from Karakorum to Tabriz with relative safety, and Mongol postal stations (the *yam* system) supported merchants and diplomats. As a result, traders like Marco Polo and Ibn Battuta could traverse the entire network, and goods like Chinese porcelain reached Europe in greater volume than in any prior century.",
    },
    diagram:
      '<svg viewBox="0 0 400 240" xmlns="http://www.w3.org/2000/svg"><rect width="400" height="240" fill="#fafaf9"/><text x="200" y="22" text-anchor="middle" font-family="serif" font-size="14" fill="#1c1917" font-weight="bold">Silk Roads: Major Hubs</text><circle cx="50" cy="120" r="6" fill="#c2410c"/><text x="50" y="140" text-anchor="middle" font-size="9">Constantinople</text><circle cx="110" cy="110" r="5" fill="#c2410c"/><text x="110" y="100" text-anchor="middle" font-size="9">Tabriz</text><circle cx="170" cy="105" r="5" fill="#c2410c"/><text x="170" y="95" text-anchor="middle" font-size="9">Samarkand</text><circle cx="220" cy="115" r="5" fill="#c2410c"/><text x="220" y="105" text-anchor="middle" font-size="9">Kashgar</text><circle cx="290" cy="125" r="5" fill="#c2410c"/><text x="290" y="115" text-anchor="middle" font-size="9">Dunhuang</text><circle cx="360" cy="140" r="6" fill="#c2410c"/><text x="360" y="160" text-anchor="middle" font-size="9">Chang\'an</text><path d="M 50 120 Q 110 90 170 105 T 290 125 Q 320 130 360 140" fill="none" stroke="#a16207" stroke-width="2" stroke-dasharray="4 3"/><text x="200" y="190" text-anchor="middle" font-size="10" fill="#57534e">Silk &amp; porcelain west • Horses &amp; silver east</text><text x="200" y="210" text-anchor="middle" font-size="10" fill="#57534e">Buddhism, Islam, Black Death also moved</text></svg>',
  },
  "2.2": {
    id: "2.2",
    title: "The Mongol Empire and the Modern World",
    summary:
      "The Mongol Empire (1206-c.1368) was the largest contiguous land empire in history; its conquests devastated cities but its peace integrated Eurasia, transferring technologies, ideas, and disease.",
    lesson:
      "**Genghis Khan (Temujin, r. 1206-27)** unified the Mongol tribes in 1206 and launched conquests that, under his sons and grandsons, produced the largest contiguous land empire in history — from Korea to Hungary by 1260.\n\n**Conquest model**: superb mounted archers, ruthless terror against cities that resisted (Baghdad 1258, Kievan Rus 1240, Khwarezm), tolerance for cities that submitted, and meritocratic recruitment of administrators (often Persian, Chinese, or Uyghur).\n\nAfter Genghis's death the empire split into four **khanates**:\n- **Yuan Dynasty** (China, Kublai Khan, 1271-1368) — moved capital to Khanbaliq (Beijing).\n- **Ilkhanate** (Persia, Hulegu's descendants) — converted to Islam by 1295.\n- **Chagatai Khanate** (Central Asia).\n- **Golden Horde** (Russia/Eastern Europe) — collected tribute from Russian princes for ~240 years.\n\n**Pax Mongolica** (1250s-1350s): the four khanates were often at odds, but joint protection of caravans made Eurasia safer than at any time before. Consequences:\n- **Technology transfer**: Chinese gunpowder, paper money, printing, and the magnetic compass moved west.\n- **Numerical systems**: Indo-Arabic numerals reached Europe through Italy; Persian astronomy and medicine reached China.\n- **Cuisine**: noodle/dumpling traditions spread (probably both directions).\n- **Yuan administrative reorganization**: kept Chinese bureaucracy but suspended the civil-service exam and used foreign administrators (Marco Polo claimed he served Kublai Khan).\n- **Religious tolerance**: Mongols favored no religion; Tibetan Buddhism, Nestorian Christianity, and Islam all gained ground in the khanates.\n- **Black Death**: bubonic plague originated in Central Asia, traveled west via Mongol-controlled routes, reached Crimea by 1346, and Europe by 1347.\n\n**Decline**: by ~1350 the Yuan was weakening (ousted by Ming in 1368), the Ilkhanate had collapsed, the Black Death had broken the trade routes, and successor states (Timurid, Muscovy) replaced the Mongol khanates by 1500.",
    keyIdeas: [
      "Genghis Khan unified Mongols in 1206; by 1260 the empire stretched Korea to Hungary — largest contiguous in history.",
      "Four khanates after Genghis: Yuan (China), Ilkhanate (Persia), Chagatai, Golden Horde (Russia).",
      "Pax Mongolica (1250-1350) enabled massive Eurasian exchange of technology, ideas, disease.",
      "Gunpowder, printing, compass moved west; Indo-Arabic numerals, astronomy moved east.",
      "Mongol religious tolerance + meritocratic recruitment = paradox of brutal conquest + cosmopolitan rule.",
      "Black Death traveled along Mongol routes; empire fractured by 1368 (Ming ousts Yuan).",
    ],
    commonMistakes: [
      "Treating the Mongols as PURELY destructive — they integrated Eurasia like never before.",
      "Confusing khanates — Yuan (China), Ilkhanate (Persia), Golden Horde (Russia), Chagatai (Central Asia).",
      "Forgetting Mongols were religiously tolerant and used Persian, Chinese, and Uyghur administrators.",
    ],
    workedExample: {
      prompt:
        "Briefly explain ONE specific way the Mongol Empire facilitated cultural or technological exchange across Afro-Eurasia.",
      solution:
        "By unifying the territory from China to Persia under one political authority during the Pax Mongolica, the Mongols enabled the safe transfer of Chinese inventions like gunpowder, the magnetic compass, and printing technology westward to the Islamic world and Europe. Mongol khans actively recruited Persian and Chinese administrators across their realm, so techniques and texts moved in both directions — Persian astronomers worked at the Yuan court, while Indo-Arabic numerals spread eastward into Chinese commerce. The Mongols' political integration of Eurasia briefly produced an unprecedented exchange that prefigured early modern globalization.",
    },
  },
  "2.3": {
    id: "2.3",
    title: "Exchange in the Indian Ocean",
    summary:
      "The Indian Ocean trade network was the largest pre-modern maritime system, integrating East Africa, Arabia, India, Southeast Asia, and China through monsoon-driven seasonal sailing.",
    lesson:
      "The **Indian Ocean trade** was the world's largest maritime exchange before the Atlantic and Pacific opened up. By 1200 it linked four sub-regions:\n1. **East Africa** (Swahili Coast: Kilwa, Mombasa, Sofala) — gold, ivory, slaves out; cloth, porcelain in.\n2. **Arabian Peninsula and Persian Gulf** (Aden, Hormuz) — frankincense, dates, horses; entrepôts for Mediterranean goods.\n3. **India** (Calicut, Cambay, Gujarat) — cotton textiles (the world's most desired manufactured product), pepper, gemstones.\n4. **Southeast Asia / China** (Malacca, Quanzhou, Guangzhou) — spices (cloves, nutmeg from the Spice Islands), silk, porcelain.\n\n**Why it boomed 1200-1450**:\n- **Monsoon winds** — predictable seasonal reversals (NE in winter, SW in summer) let ships make round trips at known times. Knowledge of monsoons let captains plan inventories and contracts.\n- **Improved ships**: Arab/Indian **dhows** with lateen sails for maneuverability; Chinese **junks** with watertight bulkheads, sternpost rudders, and capacity over 1,000 tons.\n- **Magnetic compass** (Chinese), **astrolabe** (improved by Muslims), and lateen sails — together let crews navigate open water.\n- **Diasporic merchant communities** — Gujarati Hindus, Tamil merchants, Arab/Persian Muslims, Chinese — settled in foreign ports, intermarried, created stable trust networks.\n- **State support**: Song subsidized junks, Mamluks taxed Red Sea trade, Mali protected interior caravans connecting to Indian Ocean.\n\n**Cultural and demographic effects**:\n- Spread of **Islam** to Swahili Coast and Indonesian archipelago (Malacca converts c.1414).\n- Swahili **language** = Bantu + Arabic vocabulary.\n- Migration of crops: bananas, coconuts, sugar across the basin.\n- **Zheng He's voyages (1405-33)** — seven Ming expeditions of huge treasure fleets reached Africa, demonstrating Chinese capacity but ending without colonization.",
    keyIdeas: [
      "Indian Ocean trade = largest pre-modern maritime system; linked E. Africa, Arabia, India, SE Asia, China.",
      "Monsoon winds (predictable seasonal reversals) enabled scheduled long voyages.",
      "Dhows (Arab/Indian) and junks (Chinese) + compass and astrolabe = open-water navigation.",
      "Diasporic merchants (Gujarati, Tamil, Arab, Chinese) provided trust networks in foreign ports.",
      "Islam spread to Swahili Coast and Indonesia via merchants/Sufis; Zheng He's fleets (1405-33) projected Ming power.",
    ],
    commonMistakes: [
      "Calling the Indian Ocean trade 'small' compared to Silk Roads — it was much larger by volume.",
      "Forgetting MONSOONS — the wind cycle is the single biggest enabling factor.",
      "Treating Zheng He as a colonizer — the fleets gathered tribute and prestige but did not establish colonies.",
    ],
  },
  "2.4": {
    id: "2.4",
    title: "Trans-Saharan Trade Routes",
    summary:
      "Camel caravans across the Sahara connected West African gold and salt to North Africa and the Mediterranean, fueling the rise of Mali and Songhai and spreading Islam.",
    lesson:
      "The **trans-Saharan trade** had functioned for centuries but **expanded dramatically c. 1200-1450**.\n\n**What moved**:\n- **South to north**: gold (West African gold supplied medieval Mediterranean coinage), salt FROM the Sahara to West African farmers (who lacked it), enslaved people, ivory, kola nuts.\n- **North to south**: salt slabs from Saharan mines (Taghaza), books, glass, manufactured goods, horses.\n\n**Key innovation: the camel saddle.** Different saddle designs (North African vs. Arabian) had spread by ~700 CE; this — plus camels' ability to drink 25 gallons in 10 minutes and travel 100+ miles between drinks — made caravans of 1,000+ camels feasible.\n\n**Caravanserai across the Sahara** at oases (Taghaza, Awdaghust, Bilma) gave caravans water, fodder, security.\n\n**Empires built on this trade**:\n- **Mali (c.1235-1600)** — Mansa Musa's hajj (1324-25) showcased Mali's gold wealth so spectacularly that Egyptian gold prices crashed for over a decade. Timbuktu became a center of Islamic learning (Sankore Madrasa, libraries).\n- **Songhai (c.1464-1591)** — replaced Mali; Sunni Ali expanded militarily; Askia Muhammad (r.1493-1528) made hajj, standardized administration along Islamic lines, expanded Timbuktu's scholarly status.\n\n**Spread of Islam in West Africa**:\n- Conversion came through MERCHANTS, not conquest.\n- Rulers and urban elites converted; rural farmers often kept traditional religions or syncretized.\n- Women in West Africa enjoyed more public role than orthodox Islam allowed in Arab heartland — Ibn Battuta noted (and disapproved of) women not veiled in Mali.\n\n**Decline**: trans-Saharan trade declined after ~1500 as Portuguese caravels reached West African coasts directly, bypassing Saharan middlemen and shifting the gold trade Atlantic-ward (covered in Unit 4).",
    keyIdeas: [
      "Trans-Saharan trade: West African gold + ivory + slaves NORTH; Saharan salt + Mediterranean goods SOUTH.",
      "Camel saddle + caravanserai at oases = caravan-scale Sahara crossing feasible.",
      "Mali (Mansa Musa hajj 1324) and Songhai (Askia Muhammad) built empires on this trade.",
      "Islam spread to West Africa via MERCHANTS; rulers converted; rural areas often syncretic.",
      "Decline after 1500 as Portuguese caravels reached West African coast directly.",
    ],
    commonMistakes: [
      "Forgetting that SALT moved south while gold moved north — the gold-salt exchange was symmetrical.",
      "Saying Islam was forced on West Africans — it spread via traders, not conquest.",
      "Treating Timbuktu as just a trading post — it was a major scholarly center (Sankore Madrasa, manuscript libraries).",
    ],
  },
  "2.5": {
    id: "2.5",
    title: "Cultural Consequences of Connectivity",
    summary:
      "Long-distance trade spread religions, languages, technologies, and crops — producing syncretic cultures, hybrid art, and new scholarly synthesis across Afro-Eurasia.",
    lesson:
      "The trade networks of Unit 2 carried more than goods. The CED expects students to point to specific cultural transfers.\n\n**Religion spread along trade routes**:\n- **Buddhism** had reached China centuries before; in this period it diversified (Chan/Zen, Pure Land) and Tibetan Buddhism spread to the Mongols.\n- **Islam** spread via Indian Ocean and trans-Saharan merchants and Sufis to Swahili Coast, Mali/Songhai, Bengal, Malacca, Indonesia.\n- **Christianity** spread via missions (Nestorians along Silk Road), and Crusades brought Mediterranean Christianity into prolonged contact with Islam.\n\n**Syncretic religious blends**:\n- **Sikhism** (Guru Nanak, c.1500) fused bhakti Hinduism with Sufi Islam.\n- **Bhakti** itself drew on Sufi devotional patterns.\n- **Sufi orders** (Naqshbandi, Qadiri) blended local saints with Islamic worship — central to West African and South Asian conversion.\n- In China, **Neo-Confucianism** absorbed Buddhist metaphysics into a Confucian frame.\n\n**Language and literacy**:\n- **Swahili** = Bantu + Arabic.\n- **Persian** spread as literary language across Dar al-Islam from Constantinople to Delhi.\n- **Arabic** spread as religious/scholarly language to Mali, Spain, Persia.\n\n**Technology**:\n- **Gunpowder** (Chinese, ~9th c.) reached Europe via Mongol routes by ~1300; transformed warfare.\n- **Printing** (Chinese woodblock, then Korean/Chinese movable type) — Gutenberg's 1450 press in Europe was independent invention, but the idea is Chinese.\n- **Paper money** (Song) inspired Mongol experiments and influenced later European banking.\n- **Astronomy/mathematics**: Indo-Arabic numerals reached Europe via Italy (Fibonacci, 1202); Persian astronomical models reached China; Greek astronomy passed through Arabic to Latin Europe.\n\n**Art and architecture**:\n- Ming **blue-and-white porcelain** used cobalt mined in Persia, reflecting Persian aesthetics — then was exported to Persia, the Ottoman Empire, and Europe (later inspiring Delft and Meissen).\n- **Mosques** in Mali (Djenné Great Mosque) used local mud-brick construction with Islamic architectural plan.\n- **Khmer Angkor Wat** — Hindu cosmology in Khmer architectural form.\n\n**Travelers** as cultural conduits: **Marco Polo**, **Ibn Battuta**, **Margery Kempe** (English mystic-traveler), **Rabban bar Sauma** (Mongol Christian to Europe).",
    keyIdeas: [
      "Religion spreads along trade routes: Islam to W Africa, Swahili Coast, Bengal, Indonesia; Buddhism diversifies in East Asia.",
      "Syncretism: Sikhism, Sufi-bhakti convergence, Neo-Confucianism absorbing Buddhism.",
      "Language: Swahili (Bantu+Arabic), Persian as Dar al-Islam literary lingua franca.",
      "Technology: gunpowder, printing, paper money, Indo-Arabic numerals all flow westward from East/South Asia.",
      "Art: blue-and-white porcelain blends Chinese craft + Persian cobalt + global export.",
      "Travelers (Marco Polo, Ibn Battuta) document cultural integration of Afro-Eurasia.",
    ],
    commonMistakes: [
      "Listing only goods — religion, language, ideas, art moved too.",
      "Treating cultural exchange as one-way (East to West or vice versa) — it was multidirectional.",
      "Forgetting SYNCRETISM — most spread religions adapted to local cultures rather than displacing them.",
    ],
  },
  "2.6": {
    id: "2.6",
    title: "Environmental Consequences of Connectivity",
    summary:
      "Long-distance trade transferred crops, animals, and pathogens — most catastrophically the Black Death, which killed 30-50% of Europeans and reshaped the Mediterranean and East.",
    lesson:
      "**Crop diffusion** in this period:\n- **Champa rice** from Vietnam to Song China (early-ripening, drought-resistant) drove Chinese population past 100M.\n- **Bananas** spread from SE Asia to Africa via Indian Ocean trade well before 1200, with major effect on Bantu agricultural expansion in Africa.\n- **Sugar** from India spread west via Arabs to Mediterranean and the Atlantic islands (Madeira, Canaries) — laying foundation for the Atlantic slave economy of the next period.\n- **Cotton** moved from India to West Africa, China, Egypt; **citrus** from SE Asia to Mediterranean.\n\n**Animal diffusion**:\n- **Camels** (multiple breeds) spread from Arabia/Central Asia across Sahara, enabling trans-Saharan trade.\n- **Horses** from Central Asia were exported to India and elsewhere; military demand sustained Indian Ocean horse trade.\n\n**Disease — the Black Death (1346-53)**:\n- Yersinia pestis bubonic plague originated in Central Asia, traveled along Mongol trade routes, reached Crimea by 1346 (carried on Italian ships escaping a siege).\n- From Sicily and Genoa it crossed Europe in 4 years.\n- **Mortality**: 30-50% of Europe (some cities, 60%+); ~1/3 of the Middle East; significant deaths in China and Central Asia.\n- **Demographic consequences**: depopulation, labor shortage in Europe, peasant wage gains, breakdown of serfdom in Western Europe.\n- **Religious consequences**: questioning of Church authority, flagellants, anti-Jewish pogroms in Europe.\n- **Long-term economic consequences**: surviving European peasants more mobile and prosperous; helped create conditions for late medieval commercial revival and eventually the Renaissance.\n\n**Environmental degradation**:\n- **Deforestation** in Mediterranean (shipbuilding, fuel) and around mining centers.\n- **Soil exhaustion** at Great Zimbabwe (overgrazing/deforestation contributed to its decline ~1450).\n- **Water management strain** — Khmer hydraulic system at Angkor degraded over centuries, contributing to the empire's fall.",
    keyIdeas: [
      "Crops moved: Champa rice to Song China; bananas to Africa; sugar to Mediterranean; cotton globally.",
      "Black Death (1346-53): traveled Mongol routes from Central Asia; killed 30-50% of Europe.",
      "Black Death broke Western European serfdom and shook Church authority.",
      "Environmental: deforestation in Mediterranean; soil/water exhaustion at Great Zimbabwe and Angkor.",
    ],
    commonMistakes: [
      "Forgetting that the Black Death's IMPACT was differentiated — Western Europe saw wage gains and mobility, Eastern Europe later saw a 'second serfdom.'",
      "Calling the Black Death a 'European' disease — it killed across Eurasia and North Africa.",
      "Ignoring crop diffusion (Champa rice, bananas, sugar) as having major demographic consequences.",
    ],
  },
  "2.7": {
    id: "2.7",
    title: "Comparison of Economic Exchange",
    summary:
      "Silk Road, Indian Ocean, and trans-Saharan networks shared commercial features but differed in scale, geography, and cultural effects.",
    lesson:
      "This is the unit's comparative-reasoning topic. Compare the THREE trade networks systematically.\n\n**Similarities**:\n- All carried **luxury goods** (silk, spices, gold, porcelain) AND religion, technology, and disease.\n- All depended on **state protection** (Mongols, Mali, Mamluks, Song) and **diasporic merchant communities** (Sogdians, Gujaratis, Genoese).\n- All used **credit/banking innovations** — sakk (Islamic), flying cash (Chinese), letters of exchange (later European).\n- All experienced **expansion 1200-1350** (Pax Mongolica, monsoon predictability, Mali stability) and **disruption ~1350+** (Black Death, Mongol fragmentation).\n\n**Differences — geography and infrastructure**:\n- **Silk Roads**: overland; caravans of camels; caravanserai at oases.\n- **Indian Ocean**: maritime; dhows and junks; monsoon-driven; port cities.\n- **Trans-Saharan**: overland; camel caravans across desert; oasis caravanserai.\n\n**Differences — scale**:\n- Indian Ocean carried the largest VOLUME of goods (bulk goods like rice, timber, cotton, not just luxury).\n- Silk Roads carried mostly low-volume luxuries and traveled longer overland.\n- Trans-Saharan was regionally critical (gold, salt) but smaller scale than the other two.\n\n**Differences — cultural diffusion**:\n- Indian Ocean spread Islam to E Africa and SE Asia (Malacca conversion).\n- Trans-Saharan spread Islam to West Africa (Mali, Songhai).\n- Silk Roads spread Buddhism (earlier), then Islam, then enabled Mongol-era exchange of technology.\n\n**Continuities and changes** in the network era 1200-1450:\n- **Continuities**: monsoon trade in Indian Ocean had operated since antiquity; Silk Road dates to Han/Roman era.\n- **Changes**: Mongol unification supercharged Silk Roads; Champa rice transformed Chinese demography; Black Death disrupted all networks.",
    keyIdeas: [
      "All three networks carried luxury goods + religion + tech + disease, expanded 1200-1350, declined post-1350.",
      "Indian Ocean = LARGEST volume; maritime; monsoon-driven.",
      "Silk Roads = overland; revived by Pax Mongolica.",
      "Trans-Saharan = overland; gold-salt; channeled Islam into West Africa.",
      "Each network had its own diasporic merchants, banking innovations, and state protectors.",
    ],
    commonMistakes: [
      "Treating the three networks as separate — they connected (Mali gold reached the Indian Ocean via Cairo).",
      "Forgetting that Indian Ocean was the LARGEST in volume.",
      "Confusing which religions spread on which route (Islam dominates two of the three; Buddhism dominates East Asian end of the Silk Roads).",
    ],
    workedExample: {
      prompt:
        "Compare the methods of facilitating trade on the Silk Roads and in the Indian Ocean between c. 1200 and c. 1450.",
      solution:
        "Both networks relied on improved transport technology and merchant diaspora communities to function over long distances. The Silk Roads used overland camel caravans staged at caravanserai (one day apart) under Mongol or Islamic state protection, with sakk (Islamic checks) for credit. The Indian Ocean relied on maritime dhows (Arab/Indian) and Chinese junks navigating predictable monsoon winds with the magnetic compass and astrolabe, with Gujarati, Tamil, Arab, and Chinese diasporic merchants embedded in port cities like Calicut, Kilwa, and Malacca. The shared infrastructure of credit and merchant trust networks differed mostly in their physical medium: caravanserai versus port city.",
    },
  },

  // =========================================================================
  // UNIT 3 — LAND-BASED EMPIRES (c. 1450-1750)
  // =========================================================================
  "3.1": {
    id: "3.1",
    title: "Empires Expand",
    summary:
      "Between c. 1450 and 1750, gunpowder empires — Ottoman, Safavid, Mughal, Qing, Russian — expanded by combining cavalry traditions with new artillery and centralized state finance.",
    lesson:
      "The CED groups five 'gunpowder empires' that all rose between ~1450 and 1750:\n\n**Ottoman Empire (1299-1922)** — Sunni Turkish/Anatolian. Took **Constantinople in 1453** under Mehmed II using massive bronze cannons against Theodosian walls — symbolic end of the Byzantine Empire. Suleiman the Magnificent (r. 1520-66) extended the empire from Hungary to Egypt to Iraq.\n\n**Safavid Empire (1501-1722)** — Shia Persian. **Shah Ismail I** founded it in 1501 by converting (and forcing conversion of) Persian Sunni majority to **Twelver Shia Islam** — making Iran a permanent Shia outlier in the Islamic world. Constant border wars with Sunni Ottomans (Battle of Chaldiran 1514, Ottoman victory using guns vs. Safavid cavalry).\n\n**Mughal Empire (1526-1857)** — Sunni Turko-Mongol ruling Hindu-majority India. **Babur**, descended from both Timur and Genghis Khan, defeated the Delhi Sultanate at **Panipat (1526)** with field artillery and matchlocks. **Akbar (r.1556-1605)** consolidated the empire over most of the subcontinent.\n\n**Qing Dynasty (1644-1912)** — Manchu people from northeast Asia. Ming weakness + peasant rebellion (Li Zicheng took Beijing 1644) opened the door; the Manchu Qing entered through the Great Wall, defeated Li, and ruled China for 268 years. **Kangxi (r.1661-1722)** and **Qianlong (r.1735-96)** doubled China's territory by absorbing Mongolia, Tibet, and Xinjiang.\n\n**Russian Empire** — Orthodox Christian. **Ivan III** broke Mongol Golden Horde tribute (1480); **Ivan IV 'the Terrible'** (r.1547-84) crowned himself **Tsar** (Caesar) and pushed across the Volga. **Peter the Great** (r.1682-1725) modernized military and administration on European lines and pushed to the Baltic (St. Petersburg founded 1703).\n\n**Common features** of expansion:\n- **Gunpowder weapons** (cannons, muskets) crushed older fortifications and cavalry-only armies.\n- **Permanent standing armies** financed by centralized taxation (Ottoman Janissaries, Russian streltsy).\n- **Military meritocracy** for elite forces (devshirme/Janissaries; Manchu banner armies).\n- **Religion-based legitimacy** (Sunni caliph for Ottomans, Shia imam for Safavids, Hindu-Muslim synthesis attempts for Mughals, Mandate of Heaven for Qing, Orthodox tsar for Russia).",
    keyIdeas: [
      "Five gunpowder empires: Ottoman, Safavid, Mughal, Qing, Russian — all expanded ~1450-1750.",
      "Constantinople 1453 (Ottomans), Panipat 1526 (Mughals) = gunpowder defeating older orders.",
      "Safavid conversion to Twelver Shia (1501) creates permanent Sunni-Shia divide; Ottoman-Safavid border wars constant.",
      "Qing (Manchu) enter China after 1644 Ming collapse; double territory by absorbing Inner Asia.",
      "Russia: Ivan III ends Mongol tribute (1480); Ivan IV crowned Tsar; Peter the Great westernizes.",
      "All five used gunpowder + standing armies + central taxation + religious legitimation.",
    ],
    commonMistakes: [
      "Forgetting that Mughals were Muslims ruling a Hindu-majority population.",
      "Thinking the Qing were ethnic Han Chinese — they were Manchu invaders who adapted Confucian rule.",
      "Confusing Sunni Ottomans with Shia Safavids — the conflict between them is a central feature of the period.",
    ],
    workedExample: {
      prompt:
        "Briefly explain ONE specific way gunpowder weapons enabled empire expansion between c. 1450 and 1750.",
      solution:
        "Ottoman use of large bronze cannons in 1453 brought down the Theodosian walls of Constantinople, walls that had repelled attackers for over a millennium. The conquest gave the Ottomans control of the Bosporus and a base from which to expand into the Balkans and Egypt. Similar use of field artillery and matchlock muskets at Panipat (1526) let Babur defeat the Delhi Sultanate with a smaller force, founding the Mughal Empire. In both cases, gunpowder rendered older fortifications and cavalry-only armies obsolete, allowing centralized states to project power over much larger territories.",
    },
    diagram:
      '<svg viewBox="0 0 400 240" xmlns="http://www.w3.org/2000/svg"><rect width="400" height="240" fill="#fafaf9"/><text x="200" y="22" text-anchor="middle" font-family="serif" font-size="14" fill="#1c1917" font-weight="bold">Land-Based Gunpowder Empires</text><line x1="40" y1="200" x2="360" y2="200" stroke="#44403c" stroke-width="2"/><g font-family="sans-serif" font-size="9" fill="#1c1917"><text x="40" y="220" text-anchor="middle">1450</text><text x="120" y="220" text-anchor="middle">1550</text><text x="200" y="220" text-anchor="middle">1650</text><text x="280" y="220" text-anchor="middle">1750</text><text x="360" y="220" text-anchor="middle">1850</text></g><rect x="40" y="40" width="320" height="14" fill="#fed7aa" stroke="#c2410c"/><text x="44" y="51" font-size="9">Ottoman 1299-1922</text><rect x="80" y="60" width="180" height="14" fill="#bfdbfe" stroke="#1d4ed8"/><text x="84" y="71" font-size="9">Safavid 1501-1722</text><rect x="100" y="80" width="240" height="14" fill="#fde68a" stroke="#a16207"/><text x="104" y="91" font-size="9">Mughal 1526-1857</text><rect x="195" y="100" width="165" height="14" fill="#bbf7d0" stroke="#15803d"/><text x="199" y="111" font-size="9">Qing 1644-1912</text><rect x="40" y="120" width="320" height="14" fill="#fecaca" stroke="#b91c1c"/><text x="44" y="131" font-size="9">Russia (Tsardom &#8594; Empire)</text></svg>',
  },
  "3.2": {
    id: "3.2",
    title: "Empires: Administration",
    summary:
      "Land-based empires built bureaucracies, raised revenue (tax farming, land grants), and recruited elite servants — often from non-elite or non-native populations to bypass aristocratic rivals.",
    lesson:
      "All five empires faced the same problem: how to govern huge multi-ethnic territories without giving regional elites enough power to challenge the center. Their solutions show striking convergences.\n\n**Recruiting servants outside the hereditary elite**:\n- **Ottoman devshirme**: every few years, Christian boys from the Balkans were taken, converted to Islam, trained, and made into the **Janissary** infantry corps or palace administration. They were technically slaves of the sultan — and so loyal only to him.\n- **Mughal mansabdar system**: Akbar ranked nobles by *mansab* (military rank) and assigned them *jagir* (land revenue grants) in rotating provinces — preventing them from building local power bases. Many mansabdars were Persian, Afghan, or Hindu Rajput, not just Mughal aristocrats.\n- **Qing banner system**: Manchu, Mongol, and Han Chinese troops organized into eight banners reporting to the emperor; the Qing also maintained the Confucian civil-service exam and recruited Han bureaucrats.\n- **Russian boyars** were the old hereditary nobility; **Peter the Great** created a **Table of Ranks (1722)** that based status on service, not birth — undercutting boyar autonomy.\n\n**Tax systems**:\n- **Tax farming** — selling tax-collection rights to private contractors (Ottoman *iltizam*, Mughal *zamindar*) — produced revenue but corruption.\n- **Cadastral surveys** — Mughal *zabt* under Akbar measured land and standardized rates.\n- **Tribute** — Qing collected from tributaries (Korea, Vietnam, Tibet); Russia collected fur tribute (yasak) from Siberian peoples.\n\n**Architecture as imperial messaging**:\n- Ottoman **Süleymaniye Mosque** (Sinan, 1550s) — domed mosque rivaling Hagia Sophia.\n- Mughal **Taj Mahal** (Shah Jahan, c.1632-53) — Persian/Indian/Islamic synthesis.\n- Safavid **Isfahan** redesign under Shah Abbas — central plaza, grand mosques.\n- Qing **Forbidden City** (kept from Ming) and **Potala Palace** in Lhasa (claimed Buddhist patronage of Tibet).\n- Russian **St. Petersburg** (Peter, 1703) — built from scratch as a 'window on the West.'\n\n**Common tools of legitimacy**: religious orthodoxy (Sunni, Shia, Confucian, Orthodox), monumental architecture, court ceremonial, patronage of artists and scholars.",
    keyIdeas: [
      "All gunpowder empires built bureaucracies that bypassed hereditary elites.",
      "Devshirme/Janissaries (Ottoman); mansabdars (Mughal); bannermen + scholar-gentry (Qing); Table of Ranks (Russia).",
      "Tax farming raised revenue but bred corruption (iltizam, zamindar).",
      "Monumental architecture (Süleymaniye, Taj Mahal, Forbidden City, St. Petersburg) projected imperial power.",
    ],
    commonMistakes: [
      "Treating devshirme as just slavery — it was also a path to enormous power inside the Ottoman state.",
      "Forgetting Akbar's Hindu Rajput mansabdars — Mughal administration was multi-religious.",
      "Confusing Manchu banners with the Confucian exam system — the Qing kept BOTH.",
    ],
  },
  "3.3": {
    id: "3.3",
    title: "Empires: Belief Systems",
    summary:
      "Empires used religion to legitimize rule — but managing religiously diverse populations forced choices between coercion (Safavid Shi'ization), tolerance (Akbar), and selective enforcement (Ottoman millets, Qing Confucianism).",
    lesson:
      "Each empire used belief systems both to legitimize the dynasty and to manage subject populations.\n\n**Ottoman Empire — Sunni caliphate + millet system**:\n- Sultan claimed to be **caliph** of Sunni Islam after taking Mecca/Medina (1517).\n- The **millet system** organized non-Muslim subjects (Greek Orthodox, Armenian Christians, Jews) into self-governing religious communities under their own religious leaders, paying jizya.\n- This was tolerance with hierarchy — non-Muslims had legal autonomy but lower civic status.\n\n**Safavid Empire — forced Shi'ization**:\n- Shah Ismail I imposed **Twelver Shi'ism** on a Persian population that had been mostly Sunni; this made Persia a permanent Shia state.\n- Created sharp religious-political conflict with Sunni Ottomans (Battle of Chaldiran 1514).\n- Religious scholars (ulama) became enormously powerful inside the state.\n\n**Mughal Empire — religious experiment**:\n- **Akbar (r.1556-1605)** abolished the **jizya** on Hindus, sponsored translation of Hindu epics into Persian, married Hindu Rajput princesses, and proposed **Din-i Ilahi** ('Divine Faith') — a syncretic court religion that never spread beyond the court but symbolized his approach.\n- His great-grandson **Aurangzeb (r.1658-1707)** reversed course — reimposed jizya, persecuted Sikhs and Hindus, destroyed temples, expanded the empire militarily but alienated Hindu and Sikh subjects.\n- The Hindu-Muslim balance Akbar built and Aurangzeb broke is a textbook **continuity-and-change** case.\n\n**Qing Dynasty**:\n- Adopted Confucianism + Mandate of Heaven to legitimize Manchu rule over Han Chinese.\n- Patronized **Tibetan Buddhism** to bolster claims over Tibet and Mongolia.\n- Imposed the **queue** (Manchu hairstyle) on Han men — a daily marker of submission.\n\n**Russian Empire — Orthodox Christianity**:\n- Tsars defended **Russian Orthodoxy** as 'Third Rome' after 1453.\n- Conquered Muslim Volga and Siberian peoples were sometimes pressured to convert; sometimes simply taxed.\n- The Russian Orthodox Church was subordinated to the state under **Peter the Great** (Holy Synod, 1721 — Peter abolished the Patriarch).\n\n**Religion and arts**: Persian/Mughal miniature painting, Ottoman calligraphy and tile (İznik), Russian iconography, Qing porcelain — all expressed religious patronage.",
    keyIdeas: [
      "Ottoman millet system tolerated non-Muslim communities under their own clergy + jizya.",
      "Safavids forced Twelver Shia on Persia, making it a permanent Sunni-Shia border.",
      "Akbar (Mughal) tolerated, abolished jizya, tried Din-i Ilahi; Aurangzeb reversed and reimposed jizya.",
      "Qing patronized both Confucianism (rule Han) and Tibetan Buddhism (claim Tibet/Mongolia).",
      "Russia anchored identity in Orthodox Christianity ('Third Rome'); Peter subordinated Church to state.",
    ],
    commonMistakes: [
      "Calling the Ottoman millet system 'multicultural' in a modern sense — it was hierarchical.",
      "Forgetting the Akbar→Aurangzeb reversal as a CHANGE within Mughal religious policy.",
      "Treating all gunpowder empires as religiously identical — Sunni vs. Shia vs. Confucian vs. Orthodox shaped each state's politics.",
    ],
  },
  "3.4": {
    id: "3.4",
    title: "Comparison in Land-Based Empires",
    summary:
      "Land-based empires shared gunpowder, bureaucracy, and religious legitimation but diverged in their succession rules, treatment of religious minorities, and integration with global trade.",
    lesson:
      "Comparison synthesis topic. Build a chart in your mind across the five empires.\n\n**Common features (similarities)**:\n- All used **gunpowder weapons** to expand and centralize.\n- All built **standing armies** financed by central taxation.\n- All recruited servants from **outside the traditional aristocracy** (devshirme, mansabdar, bannermen, Table of Ranks).\n- All used **religion to legitimize** the ruler (caliph, shah, padishah, Son of Heaven, tsar).\n- All produced **monumental architecture** as imperial messaging.\n- All ruled **multi-ethnic, multi-religious populations** and had to develop strategies for governing them.\n\n**Key differences**:\n- **Religion**: Sunni Ottoman / Shia Safavid / Sunni-ruling-Hindu Mughal / Confucian-Buddhist Qing / Orthodox Russian.\n- **Succession**: no single rule; the Ottomans practiced fratricide (heir killed brothers, formalized by Mehmed II in 1450s) — preventing civil war but at cost of bloodshed; Mughals had open succession wars (Aurangzeb killed his brothers); Qing emperors chose their successor in secret; Russian tsarist succession by primogeniture (with frequent coups).\n- **Treatment of religious minorities**: Ottoman millet (autonomy + jizya); Safavid coercion (Shi'ization); Akbar tolerance vs. Aurangzeb persecution; Russia generally pressured but tolerated.\n- **Integration with global trade**: Ottomans controlled Mediterranean–Asian trade until Portuguese routes around Africa eroded that monopoly; Mughals and Qing exported textiles/porcelain for silver bullion; Russia traded furs to China and Europe; Safavids traded silk.\n\n**Continuity and change** over 1450-1750:\n- Continuities: gunpowder warfare; centralized taxation; multi-ethnic rule.\n- Changes: rise of these empires; Atlantic trade reshaped Eurasia (silver flowed in, eventually destabilized economies); religious policy oscillations within empires.",
    keyIdeas: [
      "Five empires share gunpowder + bureaucracy + religious legitimation + non-aristocratic elites.",
      "Differ on religion, succession (Ottoman fratricide vs. Mughal civil war vs. Qing secret choice).",
      "Differ on treatment of minorities (millet vs. Shi'ization vs. tolerance/persecution oscillation).",
      "All eventually integrated with Atlantic-driven global trade, primarily as silver receivers.",
    ],
    commonMistakes: [
      "Failing to PAIR similarities and differences in comparison answers.",
      "Forgetting that succession crises were a recurring weakness across all five empires.",
      "Treating land-based empires as 'isolated' from the maritime Atlantic world (Unit 4) — they were deeply linked through silver and trade.",
    ],
    workedExample: {
      prompt:
        "Compare Ottoman and Mughal methods of governing religiously diverse populations between c. 1450 and 1750.",
      solution:
        "Both empires ruled large religiously mixed populations and granted some accommodation to non-ruling religions. The Ottomans used the millet system, organizing Greek Orthodox, Armenian, and Jewish subjects into self-governing communities under their own religious leaders, who collected the jizya in exchange for legal autonomy. The Mughals under Akbar went further toward integration: he abolished the jizya in 1564, married Hindu Rajput princesses, and incorporated Hindu nobles into the mansabdari system. However, Aurangzeb reversed this policy after 1658 — reimposing jizya and destroying temples — while the Ottoman millet system remained essentially stable through 1750. The two empires shared the goal of stabilizing diverse rule but differed in whether minorities were partners in administration (Mughal Akbar) or self-governing tributary communities (Ottoman millet).",
    },
  },

  // =========================================================================
  // UNIT 4 — TRANSOCEANIC INTERCONNECTIONS (c. 1450-1750)
  // =========================================================================
  "4.1": {
    id: "4.1",
    title: "Technological Innovations from 1450 to 1750",
    summary:
      "Improved ships (caravel, carrack, fluyt), navigation tools (astrolabe, magnetic compass), and cartography enabled European long-distance oceanic voyages.",
    lesson:
      "Maritime technology — much of it borrowed and combined from earlier non-European sources — made trans-oceanic voyaging routine for the first time.\n\n**Ships**:\n- **Caravel** (Portuguese, 15th c.): small, maneuverable, lateen-rigged for upwind sailing along African coasts.\n- **Carrack** (15th-16th c.): larger square-rigged ocean ship for trans-Atlantic and Indian Ocean voyages — Columbus's *Santa María* and da Gama's flagship.\n- **Galleon** (16th c.): combined cargo capacity with gun decks; backbone of Spanish silver fleets and Atlantic slaving.\n- **Dutch fluyt** (late 16th c.): cheap, mass-produced cargo ship with small crew — gave the Dutch a decisive cost advantage in 17th-century shipping.\n\n**Navigation**:\n- **Magnetic compass** (Chinese, transmitted through Indian Ocean) — let crews navigate without sight of land.\n- **Astrolabe and quadrant** (improved by Muslims) — measured latitude from the sun's angle.\n- **Lateen sail** (Arab/Mediterranean) — let ships sail closer to the wind.\n- **Sternpost rudder** (Chinese) — let large ships steer reliably.\n- **Cartography**: Portuguese and later Dutch chart-making produced increasingly accurate **portolan charts**; Mercator's 1569 projection let captains plot constant-bearing courses.\n\n**Knowledge transfer was global**:\n- Compass and rudder = Chinese.\n- Astrolabe + lateen sail = Muslim/Mediterranean.\n- Caravel/galleon = Iberian.\n\nThe combination, diffused via the Indian Ocean and Mediterranean, gave Europeans the toolkit for Atlantic, Pacific, and trans-Indian Ocean voyages.\n\n**Knowledge of the wind systems**:\n- The **volta do mar** ('return through the sea') — Portuguese discovery that to return north against the African coastal winds, you should sail far west into the Atlantic to catch the westerlies — was as important as any technology.\n- Magellan's crew (1519-22) navigated the Pacific only by understanding equatorial currents.",
    keyIdeas: [
      "Caravel, carrack, galleon, fluyt — new ship designs for ocean travel and bulk cargo.",
      "Magnetic compass (China), astrolabe (Muslim), lateen sail (Mediterranean), sternpost rudder (China) all combined.",
      "Cartography: portolan charts, Mercator projection (1569).",
      "Volta do mar (Portuguese knowledge of Atlantic wind patterns) was as important as any single tool.",
    ],
    commonMistakes: [
      "Treating navigation tech as European invention — most components were imported from China and the Islamic world.",
      "Forgetting that wind/current knowledge (volta do mar) was as crucial as ships and instruments.",
      "Confusing carrack (smaller, earlier) and galleon (larger, gun-decked).",
    ],
  },
  "4.2": {
    id: "4.2",
    title: "Exploration: Causes and Events from 1450 to 1750",
    summary:
      "Driven by 'God, gold, glory,' Iberian states pioneered Atlantic and Indian Ocean voyages; northern Europeans (Dutch, English, French) followed by 1600 and built the long-term advantage.",
    lesson:
      "**Why Europeans went exploring (motivations)**:\n- **Economic**: Ottoman dominance over land routes to Asia (after 1453) made a sea route to Indian Ocean spice markets immensely valuable. European demand for silk, spices, sugar, and porcelain was enormous.\n- **Religious**: Iberian crusading momentum carried over from the **Reconquista** (completed 1492). Spreading Christianity was both a sincere motive and a justification.\n- **Political**: state competition between Portugal, Spain, Netherlands, England, France pushed each to seek strategic and commercial advantage.\n- **Technological**: see 4.1.\n- **State support**: Portuguese crown under **Prince Henry the Navigator** (15th c.) systematically funded West African voyages.\n\n**Portugal's Indian Ocean pivot**:\n- **Bartolomeu Dias** rounded the Cape of Good Hope (1488).\n- **Vasco da Gama** reached Calicut, India (1498) — opened a direct sea route to the Indian Ocean.\n- Portuguese established **trading-post empire**: Goa (India), Hormuz, Malacca, Macau — armed factories rather than territorial colonies.\n\n**Spain's westward gamble**:\n- **Christopher Columbus** (1492) reached the Bahamas while seeking Asia; died believing he had found Asia.\n- **Treaty of Tordesillas (1494)**, brokered by the pope, divided non-Christian world: Spain west, Portugal east — gave Brazil to Portugal.\n- **Magellan/Elcano** (1519-22) circumnavigated the globe.\n- **Cortés** (1519-21) and **Pizarro** (1532-33) toppled Aztec and Inca empires (see 4.4).\n\n**Northern Europeans (later, then dominant)**:\n- **English (John Cabot 1497, Roanoke 1585, Jamestown 1607)** sought a Northwest Passage to Asia, settled North America.\n- **Dutch (Henry Hudson 1609; VOC founded 1602; WIC 1621)** built the largest commercial empire in 17th century.\n- **French (Cartier, Champlain, Quebec 1608)** developed the fur trade with North American Indigenous peoples.\n- All three eventually challenged Iberian dominance with **joint-stock companies** that pooled investor capital.\n\n**Motivations summary in CED-friendly form**: 'God, gold, glory' — religion, wealth, state competition.",
    keyIdeas: [
      "Motivations: religion, wealth (spices, silver), state competition, technology, royal sponsorship.",
      "Portugal: Dias 1488, da Gama 1498 → Indian Ocean trading-post empire (Goa, Malacca, Macau).",
      "Spain: Columbus 1492 → Treaty of Tordesillas 1494 → Cortés/Pizarro topple Aztec/Inca; Magellan 1519-22.",
      "Northern Europeans (Dutch, English, French) follow with joint-stock companies (VOC 1602, EIC 1600).",
    ],
    commonMistakes: [
      "Saying Columbus 'discovered America' — he died thinking he was in Asia and never set foot in mainland US.",
      "Forgetting Treaty of Tordesillas as the legal basis for Spanish/Portuguese partition.",
      "Thinking the English/Dutch came first — Iberians dominated for ~100 years, then northerners overtook them.",
    ],
  },
  "4.3": {
    id: "4.3",
    title: "Columbian Exchange",
    summary:
      "After 1492, plants, animals, people, and pathogens crossed the Atlantic in both directions — restructuring diets, ecosystems, demographics, and economies on every continent.",
    lesson:
      "The **Columbian Exchange** is the bi-directional transfer of organisms across the Atlantic after 1492 — arguably the most consequential ecological event since the last ice age.\n\n**To the Americas**:\n- Crops: wheat, rice, sugar (transformative — Caribbean plantation economy), coffee, bananas, citrus.\n- Animals: horses (transformed Plains cultures), pigs (rapid feral spread), cattle (ranching), sheep, chickens.\n- Pathogens: **smallpox, measles, influenza, typhus, malaria, yellow fever** — the demographic catastrophe of the millennium.\n\n**To Europe, Africa, Asia**:\n- **Maize** (corn) — adopted in southern Europe, China, sub-Saharan Africa; supported population growth.\n- **Potato** — adopted in northern Europe (Ireland, Germany, Russia); estimated to have boosted European population by 25%+ by 1800.\n- **Manioc/cassava** — adopted in sub-Saharan Africa; high-calorie crop tolerant of poor soils, became staple.\n- **Tomato, chili pepper, cacao, vanilla, peanut, tobacco, sweet potato** — transformed cuisines.\n- **Syphilis** (most likely) — possible reverse transfer.\n- **Silver** from Potosí (1545) and Zacatecas — globalized trade and inflated European prices ('price revolution').\n\n**Demographic catastrophe in the Americas**:\n- Native populations had no immunity to Eurasian diseases.\n- Estimates: 50-90% mortality over the first century.\n- Tenochtitlán fell in 1521 amid a smallpox epidemic; Inca civil war (1532) was complicated by smallpox.\n- Caribbean Taino populations were nearly extinct by 1550.\n\n**Economic consequences**:\n- **Sugar plantations** in Caribbean and Brazil drove the **Atlantic slave trade** (4.5).\n- **Silver flow**: Potosí silver shipped to Spain, then to China for porcelain and silk; created a global silver economy.\n- **European inflation** (price revolution) destabilized fixed-rent landlords, helped commercial classes.\n\n**Demographic boom outside the Americas**:\n- Potato + maize fed European/African/Chinese population growth in the 17th-18th centuries — China's population doubled in the 18th century partly thanks to American crops.\n\n**The CED's framing**: this is the textbook case of how an ecological event drives political, economic, and demographic history simultaneously.",
    keyIdeas: [
      "Bi-directional transfer of crops, animals, people, pathogens after 1492.",
      "TO Americas: smallpox, horses, sugar, wheat, cattle. TO rest of world: potato, maize, manioc, tomato, silver.",
      "Native population collapse: 50-90% mortality from disease — basis of Spanish conquest.",
      "Potato + maize fueled 17th-18th c. population growth in Europe, Africa, China.",
      "Potosí silver globalized trade and caused European 'price revolution' inflation.",
    ],
    commonMistakes: [
      "Treating the exchange as one-way (only diseases TO Americas) — crops moved BOTH ways with massive demographic effects.",
      "Underestimating disease mortality — 50-90% is the standard estimate.",
      "Forgetting that potato and maize boosted EUROPEAN, AFRICAN, AND CHINESE populations.",
    ],
    workedExample: {
      prompt:
        "Briefly explain ONE specific demographic or economic effect of the Columbian Exchange in the period c. 1450 to 1750.",
      solution:
        "The introduction of New World silver from the Spanish mines at Potosí (after 1545) flooded Europe and ultimately China with bullion, integrating the global economy as Europeans used American silver to buy Asian luxuries. In Europe, the surge of silver triggered a 'price revolution' of sustained inflation that hurt landlords on fixed rents and benefited commercial merchants. In China, demand for silver to pay the Ming and later Qing tax in cash made China the world's silver sink, deepening Pacific trade via the Manila galleons. The Columbian Exchange therefore did not just shift biology — it created the first truly global currency system.",
    },
  },
  "4.4": {
    id: "4.4",
    title: "Maritime Empires Established",
    summary:
      "Spain built a vast territorial American empire; Portugal and the Dutch built trading-post empires; the English and French planted settler and plantation colonies — each model serving different goals.",
    lesson:
      "Different European powers built different KINDS of overseas empires.\n\n**Spanish territorial empire (Americas + Philippines)**:\n- **Cortés (1519-21)** allied with Tlaxcalans, exploited a smallpox epidemic, and toppled the Aztec Empire — Tenochtitlán fell August 1521.\n- **Pizarro (1532-33)** captured Atahualpa during the Inca civil war and conquered the Inca Empire.\n- Spain organized the Americas into **viceroyalties** (New Spain, Peru, later Río de la Plata, New Granada) ruled by viceroys and audiencias.\n- **Encomienda → repartimiento/mita** labor systems exploited Native populations (covered fully in 4.7).\n- **Silver** mines (Potosí 1545, Zacatecas) financed the empire; the **Manila galleons** (1565-1815) shipped silver from Acapulco to the Philippines and on to China.\n\n**Portuguese trading-post empire**:\n- Strung **fortified ports** (Goa, Hormuz, Malacca, Macau, Mozambique) along the Indian Ocean.\n- Did not try to conquer Asian states; extracted profit from controlling trade choke-points.\n- In Brazil, however, Portuguese established **plantation colonies** for sugar — using Indigenous and especially African enslaved labor.\n\n**Dutch commercial empire**:\n- **VOC (Dutch East India Company, 1602)** — first joint-stock company with permanent capital; received from the Dutch state the right to wage war, sign treaties, mint coin.\n- VOC seized Spice Islands (Banda massacres 1621), Java, Cape Colony (1652), and dominated 17th c. Asian trade.\n- **WIC (West India Company, 1621)** — operated in Atlantic; founded New Amsterdam (later New York), controlled Atlantic slave trade for decades.\n\n**English settler/plantation colonies**:\n- **Jamestown (1607)** — first permanent English settlement in North America; grew on tobacco.\n- New England (Plymouth 1620, MA Bay 1630) — settler/family colonies driven by Puritan religion.\n- Caribbean sugar plantations (Barbados 1627, Jamaica 1655) — enslaved-labor sugar.\n- **EIC (English East India Company, 1600)** — at first a trading-post company in India; gradually evolved into territorial ruler in Bengal after Plassey (1757).\n\n**French colonies**:\n- **Quebec (1608)** — fur trade with Algonquian and Huron allies; relatively small settler population.\n- Caribbean sugar (Saint-Domingue, the richest colony in 18th c.).\n- **Louisiana** — claimed Mississippi Valley for furs and strategic depth.\n\n**Comparison framing**:\n- Territorial conquest empires: Spain (Americas), eventually English (NE America, India).\n- Trading-post empires: Portugal (Indian Ocean), early Dutch.\n- Plantation colonies: Portuguese Brazil, Caribbean (English/French/Dutch).\n- Settler colonies: New England, French Canada (smaller scale).\n\nEach model's choice depended on local conditions: native states in Asia were too strong to conquer, so trading posts; Caribbean ecology favored sugar plantations; New England climate favored settler families.",
    keyIdeas: [
      "Spanish territorial empire in Americas via conquest of Aztec (1521) and Inca (1533); silver economy.",
      "Portuguese trading-post empire in Indian Ocean (Goa, Malacca, Macau) + plantation Brazil.",
      "Dutch VOC (1602) — joint-stock company with state powers; dominated 17th c. Asian trade.",
      "English/French began with trading posts and settler colonies, expanded to Caribbean plantations and (English) Indian conquest.",
      "Manila galleons (1565-1815) connected American silver to Asian markets via Philippines.",
    ],
    commonMistakes: [
      "Treating all European empires as one model — Spanish (territorial), Portuguese (trading-post), English (settler+plantation), Dutch (commercial) differed deeply.",
      "Forgetting joint-stock companies (VOC, EIC) as a financial innovation that made northern European expansion possible.",
      "Confusing Cortés (Aztec, 1521) and Pizarro (Inca, 1533).",
    ],
  },
  "4.5": {
    id: "4.5",
    title: "Maritime Empires Maintained and Developed",
    summary:
      "Mercantilist policies, joint-stock companies, the Atlantic slave trade, and triangular trade sustained European maritime empires and produced the Atlantic World economy.",
    lesson:
      "European empires of 1450-1750 were maintained by interlocking economic institutions.\n\n**Mercantilism**: state-directed economic theory holding that:\n- A country's wealth = its stock of bullion.\n- Trade is zero-sum; export more than you import.\n- Colonies should produce raw materials and buy manufactures from the mother country.\n- States used **navigation acts** (English, 1651, 1660) requiring colonial trade to use English ships and pass through English ports.\n\n**Joint-stock companies** were the period's defining business form:\n- **VOC (Dutch, 1602)** — first with permanent capital; investors traded shares on the Amsterdam Stock Exchange.\n- **EIC (English, 1600)** — initially trading post in India; eventually conquered Bengal.\n- These pooled investor capital, spread risk over many voyages, and enabled state-scale projects without bankrupting any single merchant.\n\n**Atlantic slave trade**:\n- ~12.5 million Africans embarked across the Atlantic between 1500 and 1866; ~10.7 million arrived alive (the **Middle Passage** killed roughly 15%).\n- Driven by sugar, tobacco, rice, cotton plantation labor demand in the Americas.\n- **Triangular trade** schematic: manufactured goods (textiles, guns, alcohol) Europe→Africa; enslaved Africans Africa→Americas; sugar/tobacco/rum Americas→Europe.\n- African states (Asante, Dahomey, Kongo) became deeply enmeshed — selling captives in exchange for guns, which raised the stakes of warfare and slave-raiding.\n\n**Plantation system**:\n- Caribbean and Brazilian sugar plantations were industrial-scale enterprises with specialized labor, capital, and processing technology.\n- High mortality: enslaved populations had to be constantly replenished by new imports.\n\n**State-chartered monopolies** in Russia (Russian-American Company) and others extended the model.\n\n**Silver and the global economy**:\n- Spanish silver via Manila galleons sustained the Pacific link.\n- China's silver-based economy (Single-Whip tax law, 1581) absorbed enormous quantities of New World silver.\n- When silver supply contracted in the 17th century (mining slowdown + Ming/Spanish crises), it triggered a **17th-century general crisis** affecting China, Spain, Ottoman, and others.",
    keyIdeas: [
      "Mercantilism: bullion-hoarding, export-positive, colonies as raw-material suppliers + captive markets.",
      "Joint-stock companies (VOC, EIC) pooled capital and acquired state-like powers in Asia.",
      "Atlantic slave trade: ~12.5M embarked; triangular trade structure; African states (Asante, Dahomey) participated.",
      "Plantation system extracted enslaved labor for sugar/tobacco/cotton; industrial scale.",
      "Manila galleons + Chinese silver demand created the first truly global economy.",
    ],
    commonMistakes: [
      "Calling mercantilism 'free trade' — it was the OPPOSITE (state-managed and protectionist).",
      "Treating Africans only as victims — African states actively participated in supplying captives in exchange for European goods.",
      "Forgetting the Manila galleons as the first sustained Pacific trade route.",
    ],
  },
  "4.6": {
    id: "4.6",
    title: "Internal and External Challenges to State Power",
    summary:
      "Slave revolts, peasant uprisings, religious dissent, and dynastic crises challenged states across the early modern world — from Maroon communities to Pugachev to Aurangzeb's revolts.",
    lesson:
      "Early modern states faced significant resistance.\n\n**Slave resistance in the Atlantic**:\n- **Maroon communities** — escaped enslaved Africans formed independent settlements: Palmares (Brazil, 17th c., lasted nearly a century), Jamaican Maroons (forced British to sign treaties 1739-40), Suriname, Saint-Domingue.\n- Ship-board revolts during the Middle Passage.\n- Day-to-day resistance (work slowdowns, sabotage, escape).\n\n**Peasant rebellions**:\n- **Russia — Pugachev's Rebellion (1773-75)** — Cossack-led peasant revolt under Catherine the Great; nearly succeeded before brutal suppression. Showed how serfdom under Catherine had become explosive.\n- **China — multiple rebellions** weakened the late Ming (Li Zicheng's 1644 revolt opened the way for the Qing).\n- **Ottoman Empire — Celali Revolts** (late 16th-17th c.): provincial uprisings driven by tax pressure, military demobilization, and silver inflation.\n\n**Indigenous resistance**:\n- **Pueblo Revolt (1680, New Mexico)** — Pope's coordinated uprising drove Spanish colonists out of Santa Fe for 12 years. The most successful Indigenous revolt against European colonization in North America.\n- **Metacom's War / King Philip's War (1675-78, New England)** — devastating Indigenous coalition against English settlers.\n- **Inca Túpac Amaru II (1780, Peru)** — claimed Inca descent; massive Andean revolt against Spanish (suppressed but inspired later independence movements).\n\n**Religious dissent**:\n- Mughal Empire: Sikh resistance (Guru Tegh Bahadur executed by Aurangzeb 1675); Maratha confederacy (Shivaji, 1674) carved out a Hindu state in the Deccan, fatally weakening the Mughals.\n- Russia: **Old Believers** rejected Patriarch Nikon's reforms (1666) and were persecuted for centuries.\n\n**Dynastic and succession crises**:\n- Mughal succession wars after Aurangzeb's death (1707) fragmented the empire.\n- Ming–Qing transition (1644) involved decades of warfare.\n- Ottoman 'Sultanate of Women' (16th-17th c.) — power shifted to harem politics during weak sultans.\n\n**Colonial-elite resistance**:\n- Latin American **criollos** (American-born Spaniards) increasingly resented exclusion from top peninsular offices — set the stage for 19th-century independence (Unit 5).",
    keyIdeas: [
      "Slave revolts produced Maroon communities (Palmares, Jamaica, Suriname) — long-lasting free Black societies.",
      "Pugachev's Rebellion (1773-75) shook Russia; Celali Revolts shook the Ottomans; Pueblo Revolt (1680) drove Spanish out of New Mexico for 12 years.",
      "Túpac Amaru II (1780) and Metacom (1675) led major Indigenous resistance.",
      "Religious dissent: Sikh and Maratha resistance to Aurangzeb; Russian Old Believers against Nikon.",
      "Dynastic crises (Mughal post-1707; Ming–Qing 1644) eroded state power.",
    ],
    commonMistakes: [
      "Treating enslaved Africans as passive — Maroon communities and revolts were widespread.",
      "Forgetting the Pueblo Revolt as the most successful pre-1776 anti-colonial uprising in N. America.",
      "Confusing Túpac Amaru I (Inca, 1572) with Túpac Amaru II (1780 revolt).",
    ],
  },
  "4.7": {
    id: "4.7",
    title: "Changing Social Hierarchies from 1450 to 1750",
    summary:
      "New colonial economies created racial hierarchies (Spanish casta system) and enriched merchant classes, while the global silver economy strained traditional gentry, peasant, and noble structures.",
    lesson:
      "The early modern world produced new social orders alongside continuities.\n\n**Spanish casta system in the Americas**:\n- **Peninsulares** (born in Spain) — highest officials.\n- **Criollos / Creoles** (American-born Spaniards) — wealthy, blocked from top posts.\n- **Mestizos** (Spanish + Native), **mulattoes** (Spanish + African), **zambos** (Native + African).\n- **Indios** (Native peoples) — separate legal 'república de indios' with tribute obligations.\n- **Africans** (enslaved and free).\nRace was somewhat negotiable through wealth, baptism, and intermarriage in Spanish America — a contrast to the rigid Black/white binary in British North America.\n\n**British North America's racial code**:\n- **Bacon's Rebellion (1676)** in Virginia mixed indentured European servants with enslaved Africans; in response, Virginia hardened laws separating 'white' indentured servants (eventually freed) from 'Black' enslaved people (perpetually enslaved). The category 'white' as a legal-racial identity congealed.\n- **Slave codes** restricted manumission, intermarriage, and Black property ownership.\n\n**Continuities in Asian and African hierarchies**:\n- **Mughal mansabdars** ranked nobility by service and military rank.\n- **Ottoman askeri vs. reaya** (military/administrative class vs. taxpaying subjects).\n- **Qing scholar-gentry** held local power through the exam system.\n- **West African sociopolitical hierarchies** (royal lineages, slave lineages, merchant guilds) persisted.\n\n**New merchant classes**:\n- European bourgeoisie expanded with Atlantic trade and joint-stock investment.\n- Ottoman Greek and Armenian merchants thrived in Mediterranean trade.\n- Gujarati and Tamil merchants in Indian Ocean.\n\n**Strain on traditional elites**:\n- European nobles on fixed rents lost ground to inflation (price revolution).\n- Russian boyars sidelined by Peter's Table of Ranks.\n- Japanese **samurai** under Tokugawa peace lost military function and many fell into debt to merchants.\n\n**Women in the era**:\n- **Querelle des femmes** in early modern Europe — debates about women's nature.\n- **Queens regnant** (Elizabeth I, Mary Stuart, Christina of Sweden, Catherine the Great) showed women could rule.\n- Most peasant and enslaved women experienced increasing labor demands; sex ratios in Atlantic slave trade left African women bearing more agricultural labor.\n- Mughal/Safavid/Ottoman elite women operated through harem politics.",
    keyIdeas: [
      "Spanish casta system: peninsulares > criollos > mestizos/mulattoes > indios > Africans — somewhat fluid through wealth.",
      "British N. America hardened racial slavery after Bacon's Rebellion (1676); 'white' became a legal category.",
      "Atlantic trade enriched European merchant bourgeoisie + joint-stock investors.",
      "Traditional elites strained: European nobility (price revolution), Russian boyars (Peter), Japanese samurai (Tokugawa peace).",
      "Female rulers (Elizabeth I, Catherine the Great) coexisted with worsening peasant/enslaved women's burdens.",
    ],
    commonMistakes: [
      "Treating the casta system as fully fixed — it was hierarchical but somewhat negotiable.",
      "Forgetting Bacon's Rebellion as the trigger for the legal hardening of racial slavery in Virginia.",
      "Saying merchant classes overthrew nobility — they did not in this period; that comes in Unit 5.",
    ],
  },
  "4.8": {
    id: "4.8",
    title: "Continuity and Change from 1450 to 1750",
    summary:
      "Continuities: religion-legitimized agrarian states, patriarchy, dynastic politics. Changes: oceanic trade integration, Columbian Exchange, silver-based global economy, Atlantic slavery, new Asian gunpowder empires.",
    lesson:
      "The CCOT topic asks you to weigh continuities against changes across 1450-1750.\n\n**Continuities**:\n- **Agriculture-based economies** still employed most of humanity.\n- **Religion-legitimized monarchies** remained the dominant political form.\n- **Patriarchy** persisted (with significant regional variation).\n- **Slavery** existed before 1450 (Mediterranean, Indian Ocean, trans-Saharan) — the Atlantic system was an EXPANSION of an existing institution, not the invention of slavery.\n- **Long-distance trade** of luxury goods existed before — but volume and geographic scope expanded.\n- **Land-based empires** (Ottoman, Mughal, Qing, Russia) used many tools that earlier empires (Roman, Han, Abbasid) had used.\n\n**Major changes**:\n- **Oceanic integration**: Atlantic and Pacific trade networks now connected ALL inhabited continents (except Australia until 1788).\n- **Columbian Exchange** restructured ecology and demography globally.\n- **Silver-based global economy** linked Potosí to Manila to China.\n- **Atlantic slave trade** moved millions of Africans, transformed African states, and built the Americas' colonial economies.\n- **Joint-stock companies** (VOC 1602, EIC 1600) created a new financial-political form.\n- **New gunpowder empires** (Ottoman, Safavid, Mughal, Qing) replaced or absorbed older states.\n- **Religious change**: Protestant Reformation (1517+) shattered Latin Christian unity; Catholic Counter-Reformation; Sikhism founded; Safavid Shi'ization; Akbar's experiments.\n- **Scientific Revolution** (Copernicus 1543, Newton 1687) reshaped European intellectual life and would feed Enlightenment in Unit 5.\n- **Demographic upheaval**: massive Native American depopulation; Atlantic African deportation; European/African/Chinese population growth from American crops.\n\n**Periodization argument**: 1450 marks the start of sustained transoceanic European voyaging (post-1492 Columbus, 1498 da Gama). 1750 marks the start of the Industrial Revolution and the political revolutions of Unit 5.",
    keyIdeas: [
      "Continuities: agriculture, religion-state, patriarchy, slavery (existed before — Atlantic was expansion), long-distance trade.",
      "Changes: oceanic integration, Columbian Exchange, silver economy, Atlantic slave trade, joint-stock companies, gunpowder empires.",
      "Religious changes: Reformation, Counter-Reformation, Sikhism, Shi'ization, Akbar.",
      "Scientific Revolution lays groundwork for Enlightenment (Unit 5).",
      "Periodization: 1450 = sustained transoceanic voyaging; 1750 = industrial/political revolutions about to begin.",
    ],
    commonMistakes: [
      "Saying Atlantic slavery 'invented' slavery — slavery existed before; the Atlantic system was an unprecedented EXPANSION.",
      "Listing only changes — strong CCOT essays balance both.",
      "Forgetting that most people in 1750 still lived as agricultural peasants — change was uneven.",
    ],
    workedExample: {
      prompt:
        "Evaluate the extent to which transoceanic exchanges between c. 1450 and c. 1750 changed economies in the Americas.",
      solution:
        "Transoceanic exchanges fundamentally restructured American economies. Before 1492 Native economies were diverse but oriented around regional networks (Aztec tribute, Inca redistribution, Mississippian trade). After Spanish conquest, the silver economy of Potosí and Zacatecas integrated the Americas into a global system: Andean labor (mit'a) extracted silver shipped to Spain and onward to China via Manila galleons. In Brazil and the Caribbean, sugar plantations worked by enslaved Africans replaced Indigenous economies destroyed by disease — making the Atlantic world the engine of the early modern global economy. Some continuity remained: subsistence agriculture and Indigenous trade networks survived in interior regions. But the dominant economic logic of the Americas had changed completely — from regional tribute and reciprocity to extractive, export-oriented integration with Europe and Asia.",
    },
  },

  // =========================================================================
  // UNIT 5 — REVOLUTIONS (c. 1750-1900)
  // =========================================================================
  "5.1": {
    id: "5.1",
    title: "The Enlightenment",
    summary:
      "Enlightenment thinkers — Locke, Voltaire, Rousseau, Wollstonecraft — applied reason to politics and society, producing ideas (natural rights, popular sovereignty, separation of powers) that fueled revolutions worldwide.",
    lesson:
      "The **Enlightenment** (~1680-1800) was an intellectual movement built on the **Scientific Revolution's** empiricism (Galileo, Newton). Key claims:\n- **Reason** can discover natural laws of human society as Newton found them in physics.\n- **Natural rights** belong to all humans by virtue of being human (life, liberty, property — Locke).\n- **Popular sovereignty**: legitimate government rests on the consent of the governed.\n- **Separation of powers** (Montesquieu) prevents tyranny.\n- **Religious toleration** (Voltaire, Locke) reduces religious conflict.\n- **Progress** is possible through education and reform.\n\n**Major figures**:\n- **John Locke** (*Two Treatises of Government*, 1689) — natural rights, social contract, right of revolution.\n- **Voltaire** — religious toleration, free speech, critique of clerical and aristocratic privilege.\n- **Montesquieu** (*The Spirit of the Laws*, 1748) — separation of powers, climate-determined institutions.\n- **Rousseau** (*The Social Contract*, 1762) — 'general will,' direct popular sovereignty, education through nature.\n- **Adam Smith** (*Wealth of Nations*, 1776) — free markets, division of labor, invisible hand.\n- **Mary Wollstonecraft** (*A Vindication of the Rights of Woman*, 1792) — extended Enlightenment rights to women.\n- **Diderot's Encyclopédie** — popularized Enlightenment ideas across literate Europe.\n\n**Echoes worldwide**:\n- **American Declaration of Independence (1776)** — Jefferson borrowed Locke (life, liberty, pursuit of happiness; consent of governed; right of revolution).\n- **French Declaration of the Rights of Man and Citizen (1789)** — natural rights, popular sovereignty.\n- **Haitian Constitution (1801)** — extended rights to formerly enslaved people.\n- **Latin American independence** (Bolívar, San Martín) — explicitly invoked Enlightenment.\n- Later: **Olympe de Gouges** (Declaration of the Rights of Woman, 1791); **abolitionist movements**; **Liberalism** as ideology.\n\n**Limits and contradictions**:\n- Most Enlightenment thinkers excluded women, the propertyless, enslaved Africans, and colonized peoples from 'rights of man.'\n- Wollstonecraft, Olympe de Gouges, and abolitionists pushed back from inside the tradition.\n- Latin American Bourbon Reforms attempted Enlightenment-inspired efficiency without political openness — generated criollo backlash.",
    keyIdeas: [
      "Enlightenment = applying reason to politics/society; natural rights, popular sovereignty, separation of powers.",
      "Locke (natural rights), Montesquieu (separation), Rousseau (general will), Smith (markets), Wollstonecraft (women's rights).",
      "Direct influence on US 1776, French 1789, Haitian 1801, Latin American independence.",
      "Limits: most thinkers excluded women, the poor, enslaved, colonized — challenged from within (Wollstonecraft, Gouges, abolitionists).",
    ],
    commonMistakes: [
      "Treating the Enlightenment as one homogeneous ideology — Rousseau and Voltaire disagreed sharply.",
      "Forgetting Wollstonecraft and Olympe de Gouges as Enlightenment thinkers.",
      "Saying Enlightenment caused revolutions alone — economic crises and elite politics also mattered (5.2).",
    ],
  },
  "5.2": {
    id: "5.2",
    title: "Nationalism and Revolutions in the Period from 1750 to 1900",
    summary:
      "Enlightenment ideas + nationalism + economic strain produced political revolutions: American (1776), French (1789), Haitian (1791-1804), Latin American (1810s-20s), and 1848 European revolutions.",
    lesson:
      "**American Revolution (1775-83)**:\n- Triggered by British post-Seven Years' War taxes (Stamp Act 1765, Tea Act 1773) without colonial representation.\n- Justified by Locke's natural rights — Declaration of Independence (1776).\n- Outcome: independent republic; Constitution (1787) institutionalized separation of powers.\n- **Influence**: model for later anti-colonial revolutions.\n\n**French Revolution (1789-99)**:\n- Causes: state bankruptcy from Seven Years' and American wars; bread crisis; Enlightenment critique of absolute monarchy and clergy.\n- **Estates-General (May 1789)** → **National Assembly** (June) → **Declaration of the Rights of Man and Citizen (Aug 1789)** → **Storming of the Bastille (July 14)**.\n- Radicalization: Reign of Terror (1793-94) under Robespierre; ~17,000 executed by guillotine.\n- **Napoleon** (consul 1799, emperor 1804) spread the **Napoleonic Code** — meritocracy, religious toleration, civil equality — across conquered Europe before defeat at Waterloo (1815).\n- **Long-term influence**: nationalism, civil rights, secularization of law.\n\n**Haitian Revolution (1791-1804)**:\n- Saint-Domingue (Haiti) was France's richest sugar colony; ~500,000 enslaved Africans, ~30,000 white planters.\n- Inspired by French 1789, enslaved Haitians revolted in 1791 under leaders including **Toussaint Louverture**.\n- Defeated French (Napoleon's expeditionary force devastated by yellow fever); declared independence as **Haiti** in 1804 under **Jean-Jacques Dessalines**.\n- **First successful slave revolt to create an independent state**; second republic in the Americas (after US).\n- Provoked global anxiety; spurred US Louisiana Purchase (Napoleon abandoned American empire after Haiti).\n\n**Latin American Independence (~1810-1825)**:\n- Triggered by Napoleon's invasion of Spain (1808) — Spanish American criollos seized opportunity.\n- **Simón Bolívar** liberated Venezuela, Colombia, Ecuador, Peru, Bolivia.\n- **José de San Martín** liberated Argentina, Chile, helped Peru.\n- **Mexico**: **Hidalgo's Grito de Dolores (1810)** mobilized Indigenous and mestizo masses; independence in 1821.\n- **Brazil** (1822) independence from Portugal — peaceful transition to Brazilian Empire under Pedro I.\n- **Outcome**: criollo-led independent states, but social hierarchies (race, gender) largely intact.\n\n**1848 Revolutions in Europe**:\n- Wave of liberal-nationalist uprisings across France, German states, Habsburg empire, Italian states.\n- Mostly failed in the short term (suppressed by 1850), but advanced ideals of constitutional government, abolition of feudalism, and nationalism.\n\n**Nationalism's rise**:\n- Defined by **Benedict Anderson** as 'imagined community' of shared language, history, and territory.\n- Examples: **German unification** under Bismarck (1871), **Italian unification** (Cavour, Garibaldi, 1861-71), **Greek independence** (1832) from Ottomans.\n- Nationalism could be liberal (1848 demands for constitutions) or reactionary (later late-19th-c. ethnonationalism leading to WWI).",
    keyIdeas: [
      "Atlantic revolutions: US (1776), French (1789), Haitian (1791-1804), Latin American (1810-25).",
      "Haitian Revolution = first successful slave revolt creating an independent state; sent shockwaves through Atlantic.",
      "1848 European revolutions = mostly failed but advanced liberal nationalism.",
      "Nationalism = 'imagined community' of language/history/territory; unifies Germany (1871) and Italy (1871).",
      "Latin American independence kept social hierarchy intact under criollo leadership.",
    ],
    commonMistakes: [
      "Confusing the order/causation of revolutions — Haitian revolution INSPIRED later abolitionism but was triggered by French 1789.",
      "Forgetting Latin American independence's CONTINUITY in social hierarchy (criollos took power; Indigenous and Black populations stayed marginalized).",
      "Treating 1848 revolutions as failures — they failed politically short term but seeded long-term changes.",
    ],
    workedExample: {
      prompt:
        "Briefly explain ONE specific way Enlightenment ideas shaped a political revolution between 1750 and 1900.",
      solution:
        "John Locke's argument that legitimate government depends on the consent of the governed and that people have the right to overthrow tyrannical rulers directly shaped the US Declaration of Independence in 1776. Thomas Jefferson borrowed Locke's framing — 'life, liberty, and the pursuit of happiness,' and the right to alter or abolish destructive government — to justify the colonies' break with Britain. The same Lockean ideas then echoed in the French Declaration of the Rights of Man and Citizen (1789), the Haitian Constitution (1801), and the constitutions of newly independent Latin American republics in the 1820s.",
    },
  },
  "5.3": {
    id: "5.3",
    title: "Industrial Revolution Begins",
    summary:
      "The Industrial Revolution began in Britain c.1750-1850 due to coal, capital, colonies, agricultural change, and innovation — transforming production, work, and global power.",
    lesson:
      "Why **Britain first**? The CED expects causal multiplicity:\n\n1. **Coal and iron**: Britain had abundant coal in close proximity to iron ore — the energy and material for steam engines and machines.\n2. **Agricultural revolution** (c.1700+): enclosure, four-field rotation (Townshend), seed drill (Tull), and selective breeding raised food output, freed labor for cities.\n3. **Capital**: profits from Atlantic trade and colonial plantations available for investment; **Bank of England (1694)** + sophisticated credit markets.\n4. **Colonies**: cotton from India and US South for Lancashire mills; captive markets for finished textiles.\n5. **Population growth** (driven partly by potato + improved nutrition) provided labor and demand.\n6. **Geography**: navigable rivers + coastline = cheap internal shipping.\n7. **Government**: stable property rights, low internal tariffs, patent system encouraging innovation.\n8. **Cultural**: Protestant work ethic, Royal Society and scientific networks (Newton, Boulton, Watt).\n\n**Initial breakthroughs in cotton textiles** (1760s-90s):\n- **Flying shuttle** (Kay, 1733) — doubled weaving speed.\n- **Spinning jenny** (Hargreaves, 1764) — multiple spindles.\n- **Water frame** (Arkwright, 1769) — water-powered spinning.\n- **Spinning mule** (Crompton, 1779) — fine, strong yarn.\n- **Power loom** (Cartwright, 1785) — mechanized weaving.\n\n**Steam power transformed everything**:\n- **Newcomen engine (1712)** — pumped water from coal mines.\n- **James Watt's separate condenser (1769)** — dramatically more efficient steam engine.\n- Applied to factories, locomotives (Stephenson's *Rocket* 1829), steamships.\n\n**Iron and rail**:\n- **Henry Cort's puddling and rolling (1784)** — wrought iron at scale.\n- **Bessemer process (1856)** — cheap steel.\n- **Railway boom** (Britain 1830s, Germany/US 1840s, India 1850s) — collapsed transport time/cost.\n\n**Factory system**: production moved from cottages to centralized mills with disciplined wage labor — the model for all industrial economies.\n\n**Global context**: 1750 China and India had per-capita incomes comparable to Western Europe. By 1900, Britain's per-capita income was several times theirs — the **Great Divergence**.",
    keyIdeas: [
      "Britain first: coal+iron, agricultural revolution, capital from Atlantic trade, colonies, government stability, scientific culture.",
      "Cotton textiles mechanized first (flying shuttle, jenny, water frame, mule, power loom).",
      "James Watt's separate condenser (1769) made steam efficient — applied to factories, locomotives, ships.",
      "Iron + steel + railways transformed transport and military.",
      "Factory system = central wage labor, disciplined hours, specialized work.",
      "Great Divergence: by 1900 Western Europe far surpassed China and India in per-capita income.",
    ],
    commonMistakes: [
      "Crediting a single cause (just steam, or just coal) — multiple causes are required.",
      "Treating the Industrial Revolution as instantaneous — it took ~100 years to transform Britain.",
      "Forgetting that Atlantic-trade profits and colonial cotton supplies fed British industrialization.",
    ],
    diagram:
      '<svg viewBox="0 0 400 240" xmlns="http://www.w3.org/2000/svg"><rect width="400" height="240" fill="#fafaf9"/><text x="200" y="22" text-anchor="middle" font-family="serif" font-size="14" fill="#1c1917" font-weight="bold">Why Britain Industrialized First</text><g font-family="sans-serif" font-size="10" fill="#1c1917"><rect x="20" y="50" width="100" height="40" fill="#fed7aa" stroke="#c2410c"/><text x="70" y="65" text-anchor="middle">Coal + Iron</text><text x="70" y="80" text-anchor="middle" font-size="9">co-located</text><rect x="140" y="50" width="100" height="40" fill="#fde68a" stroke="#a16207"/><text x="190" y="65" text-anchor="middle">Ag Revolution</text><text x="190" y="80" text-anchor="middle" font-size="9">enclosure, surplus</text><rect x="260" y="50" width="120" height="40" fill="#bbf7d0" stroke="#15803d"/><text x="320" y="65" text-anchor="middle">Atlantic Capital</text><text x="320" y="80" text-anchor="middle" font-size="9">trade + colonies</text><rect x="20" y="110" width="100" height="40" fill="#bfdbfe" stroke="#1d4ed8"/><text x="70" y="125" text-anchor="middle">Innovation</text><text x="70" y="140" text-anchor="middle" font-size="9">patent + science</text><rect x="140" y="110" width="100" height="40" fill="#fecaca" stroke="#b91c1c"/><text x="190" y="125" text-anchor="middle">Population</text><text x="190" y="140" text-anchor="middle" font-size="9">labor + demand</text><rect x="260" y="110" width="120" height="40" fill="#e9d5ff" stroke="#7e22ce"/><text x="320" y="125" text-anchor="middle">Stable Govt</text><text x="320" y="140" text-anchor="middle" font-size="9">property rights</text><rect x="100" y="180" width="200" height="40" fill="#1c1917" stroke="#000"/><text x="200" y="200" text-anchor="middle" fill="#fafaf9">Industrial Revolution</text><text x="200" y="215" text-anchor="middle" fill="#fafaf9" font-size="9">cotton, steam, iron, rail</text></g></svg>',
  },
  "5.4": {
    id: "5.4",
    title: "Industrialization Spreads in the Period from 1750 to 1900",
    summary:
      "Industrialization spread from Britain to Belgium, France, German states, US (mid-19th c.); to Russia and Japan (late 19th c.); China and Ottoman Empire lagged or industrialized partially.",
    lesson:
      "**First wave (Britain, c.1750-1830)** — described in 5.3.\n\n**Second wave (Continental Europe + US, c.1815-1870)**:\n- **Belgium** (independent 1830) — first continental industrializer; coal-iron-textiles model copied from Britain.\n- **France** — slower; smaller coal reserves, more rural population.\n- **German states / Zollverein (1834)** — customs union accelerated industrial integration; railroad boom.\n- **United States** — Northeast textile mills (Lowell), then explosive railway and steel growth after Civil War (1865+).\n\n**Late industrializers using state direction**:\n- **Russia under Sergei Witte (1890s)** — built **Trans-Siberian Railway** (1891-1904), foreign investment, state-led iron/steel; remained agrarian and politically autocratic.\n- **Japan: Meiji Restoration (1868)** — overthrew Tokugawa shogun, restored imperial authority, sent missions abroad ('Iwakura Mission 1871'), abolished samurai privileges, built railways, factories, and modern army/navy. Japan won wars against China (1895) and Russia (1904-5), shocking Europeans by industrializing fast enough to defeat a great power.\n- **Egypt under Muhammad Ali (r.1805-48)** — early industrial reform with cotton mills, conscript army, modernized bureaucracy. Pressure from European banks and military forced reversal; Egypt became British protectorate (1882).\n\n**Lagging industrializers**:\n- **Qing China** — **Self-Strengthening Movement (1861-95)** built arsenals and shipyards but failed to transform economy; defeated by Japan 1895.\n- **Ottoman Tanzimat reforms (1839-76)** modernized law, education, army; partial industrial development; debt and European interference deepened.\n- **India** under British rule was DEINDUSTRIALIZED in textiles — British policy and Lancashire competition wiped out Indian cotton manufacturing.\n\n**Causes of variable industrialization**:\n- Coal/iron access; political stability; capital availability; protective tariffs vs. free trade pressure; colonial subordination (India).\n- The CED frames late industrialization as **state-led** (Russia, Japan) vs. **market-led** (Britain, US), with **mixed** in Germany.",
    keyIdeas: [
      "Industrialization spread: Belgium → France/Germany/US → Russia/Japan → partial in Egypt, Ottoman, China.",
      "Meiji Restoration (1868) — Japan industrialized fast enough to defeat Russia (1905).",
      "Russia under Witte built Trans-Siberian Railway; state-led, foreign-funded.",
      "China's Self-Strengthening Movement (1861-95) failed; Ottoman Tanzimat partial; Egypt absorbed by Britain.",
      "India was DEINDUSTRIALIZED by British policy — once world's leading cotton manufacturer.",
    ],
    commonMistakes: [
      "Forgetting that India was industrially advanced before colonization and was DEINDUSTRIALIZED by Britain.",
      "Treating Meiji Japan as merely 'westernized' — it selectively adapted Western technology while preserving emperor worship and state direction.",
      "Confusing the order/timing — Britain (1750+), continental (1815+), Russia/Japan (late 19th c.).",
    ],
  },
  "5.5": {
    id: "5.5",
    title: "Technology of the Industrial Age",
    summary:
      "Steam, steel, railways, telegraph, electricity, internal combustion, chemicals, and mass production transformed economic and military capabilities — especially in the Second Industrial Revolution (1870s+).",
    lesson:
      "Industrial-age technology unfolded in two waves.\n\n**First Industrial Revolution (c.1750-1850)** — covered in 5.3:\n- Steam engine (Watt 1769); cotton textile machinery; iron puddling; canals and early railways.\n\n**Second Industrial Revolution (c.1870-1914)** — heavier, more science-driven, more global:\n- **Steel**: **Bessemer process (1856)** and open-hearth (Siemens-Martin) made steel cheap; Andrew Carnegie's US steel empire dominated.\n- **Electricity**: Faraday's electromagnetism (1830s) → Edison's incandescent bulb (1879) and DC grids (1882) → Tesla/Westinghouse AC distribution (1890s) → electrified factories, streetcars, lighting.\n- **Internal combustion engine** (Otto 1876) → automobile (Benz/Daimler 1885; Ford Model T 1908) and aircraft (Wright Brothers 1903).\n- **Chemicals**: synthetic dyes (Perkin 1856), fertilizers (German chemical industry), dynamite (Nobel 1867), Haber-Bosch ammonia (1909) — fed global agriculture.\n- **Communications**: telegraph (Morse 1844; trans-Atlantic cable 1866), telephone (Bell 1876), radio (Marconi 1895).\n- **Transport**: ocean steamships shrank Atlantic to 7-10 days; **Suez Canal (1869)** halved Europe-Asia distance; **Panama Canal (1914)** linked Atlantic and Pacific.\n- **Mass production**: interchangeable parts (US 'American system'), Frederick Taylor's scientific management (1911), Ford's moving assembly line (1913).\n\n**Military technology**:\n- **Breech-loading rifles** and **machine guns (Maxim 1884)** gave Europeans devastating advantage in colonial wars.\n- **Steel warships** (HMS *Dreadnought* 1906) and **submarines** transformed naval power.\n- **High-explosive shells, barbed wire, poison gas** would dominate WWI (Unit 7).\n\n**Effects on time and space**:\n- Telegraph + railway compressed information and travel times by orders of magnitude.\n- **Standard time zones** adopted (1884 International Meridian Conference) — needed because trains crossed local times.\n- Newspapers, photography, and cheap print created mass culture.\n\n**Global impact**:\n- Industrial military technology made European imperial conquest of Africa and Asia possible (Unit 6).\n- Refrigerated shipping let Argentina export beef and Australia export wool — global commodity markets.",
    keyIdeas: [
      "Second Industrial Revolution (1870-1914) was steel + electricity + chemicals + internal combustion + mass production.",
      "Bessemer steel, Edison electricity, Otto/Benz engines, Haber-Bosch ammonia.",
      "Telegraph, telephone, radio shrank communication; Suez (1869) and Panama (1914) shrank shipping.",
      "Maxim machine gun (1884) made European colonial conquests militarily decisive.",
      "Standard time zones (1884) and assembly lines (Ford 1913) standardized work.",
    ],
    commonMistakes: [
      "Conflating the First (steam, textiles, iron) and Second (steel, electricity, chemicals, internal combustion) Industrial Revolutions.",
      "Forgetting the military implications (machine gun) for imperialism.",
      "Treating Suez Canal as British-built — it was French-engineered (de Lesseps), British-controlled later.",
    ],
  },
  "5.6": {
    id: "5.6",
    title: "Industrialization: Government's Role from 1750 to 1900",
    summary:
      "Governments shifted from mercantilism toward laissez-faire (Britain), state-led industrialization (Russia, Japan, Germany), and protectionism (US after 1816, Bismarck after 1879).",
    lesson:
      "Government economic ideology and policy shifted dramatically across the period.\n\n**Mercantilism → Laissez-Faire**:\n- 18th-century mercantilism: state-managed trade, protective tariffs, state monopolies.\n- **Adam Smith** (*Wealth of Nations*, 1776) attacked this — argued free markets allocate resources better.\n- **Britain** moved to free trade by 1846 (repeal of Corn Laws under Robert Peel) — confident its industrial lead would prevail without protection.\n- **David Ricardo** added comparative advantage; **John Stuart Mill** popularized laissez-faire liberalism.\n\n**Continental + American protectionism**:\n- **United States**: Hamilton's Report on Manufactures (1791) and tariffs (1816, 1828) protected nascent Northeast industry.\n- **German Zollverein (1834)** — internal free trade among German states; external tariffs.\n- **Friedrich List** (German economist) argued newly industrializing nations need PROTECTION until they catch up to Britain — 'infant industry' argument.\n- **Bismarck (1879)** introduced major German tariffs on grain and steel.\n\n**State-led industrialization**:\n- **Russia (Witte, 1892-1903)** — state finance, foreign loans, Trans-Siberian Railway, government-built iron and steel works.\n- **Meiji Japan** — government built railways, telegraphs, model factories (later sold to private *zaibatsu*); imperial army and navy on Western model.\n- **Egypt (Muhammad Ali)** — state factories for cotton, weapons, until European pressure dismantled the program.\n\n**Government regulation of labor (slowly emerged)**:\n- **British Factory Acts** (1833+) — limited child labor, set hour limits.\n- **Mines Act (1842)** — banned women and children underground.\n- **Public Health Act (1848)** — first sanitation legislation.\n- **Education Acts (1870, 1880)** — compulsory primary education.\n- **Bismarck's social insurance (1883-89)** — health, accident, old-age insurance — to undercut socialist appeal.\n- **Prohibition of slave trade** (Britain 1807) and slavery (Britain 1833, US 1865, Brazil 1888) — state action against labor systems.\n\n**Imperialism as state policy**:\n- States supported overseas investments and conquests to secure raw materials and markets — 'flag follows trade.'\n- **Berlin Conference (1884-85)** divided Africa among European powers.",
    keyIdeas: [
      "Britain led free trade after Corn Law repeal (1846); rest of industrializers used PROTECTION (Friedrich List).",
      "State-led industrialization: Russia (Witte), Meiji Japan, Muhammad Ali's Egypt.",
      "Britain pioneered factory regulation (Factory Acts 1833+); Bismarck pioneered social insurance (1883-89).",
      "Slave trade abolished (Britain 1807); slavery abolished (Britain 1833, US 1865, Brazil 1888).",
      "States supported imperial expansion to secure raw materials and markets.",
    ],
    commonMistakes: [
      "Treating laissez-faire as universal — most countries used PROTECTION, only Britain went free trade.",
      "Forgetting Bismarck's social insurance (1880s) as government welfare provision.",
      "Confusing slave trade abolition (1807) with slavery abolition (varied by country, 1833-1888).",
    ],
  },
  "5.7": {
    id: "5.7",
    title: "Economic Developments and Innovations in the Industrial Age",
    summary:
      "Industrialization produced corporations, stock markets, banking, multinational firms, urbanization, and global commodity chains linking colonized agricultural producers to industrial cores.",
    lesson:
      "Industrialization generated new economic structures.\n\n**Corporate and financial innovations**:\n- **Limited liability laws** (Britain 1855, 1862) — investors could lose only what they invested, not personal assets — unleashed massive equity markets.\n- **Joint-stock corporations** raised vast capital for railroads, steel, oil.\n- **Stock exchanges** (London, New York, Paris, Berlin, Tokyo) traded equities continuously.\n- **Investment banks** (Rothschilds, Morgan, Credit Mobilier) financed railways and government bonds globally.\n- **Industrial concentration**: by ~1900, **trusts** (US — Standard Oil, US Steel) and **cartels** (German chemicals, steel) dominated industries.\n- **Multinational firms** (Standard Oil, Singer Sewing, United Fruit, Unilever) operated across borders.\n\n**Urbanization**:\n- 1800: ~3% of world population in cities >100,000. 1900: ~14%.\n- London hit 6.5M by 1900; New York, Paris, Berlin, Tokyo all millions.\n- Urban living conditions: cholera epidemics, slums (Engels' *Condition of the Working Class*, 1845).\n- Public sanitation, sewers, water mains, gas/electricity, transit (subways, trams) gradually transformed cities.\n\n**Global commodity chains**:\n- **Cotton**: US South + Egypt + India → British mills → finished cloth → world markets (including India that lost its handlooms).\n- **Sugar**: Cuba, Brazil, Caribbean → European/N. American refineries.\n- **Rubber**: Belgian Congo + Brazil → tires for bikes, autos.\n- **Tea**: Indian and Ceylonese plantations → British market (replacing Chinese tea).\n- **Beef**: Argentine pampas → refrigerated ships → European tables.\n- These chains relied on colonized labor (often coerced — see 6.3) and tied colonized economies to industrial cores.\n\n**Standardization and scale**:\n- **Interchangeable parts** + assembly lines → mass production.\n- **Frederick Taylor's scientific management** (1911) — time-motion studies broke work into measurable tasks.\n- **Department stores** (Bon Marché 1852, Wanamaker's, Macy's) and mail-order catalogs (Sears) created mass consumer markets.\n\n**Effects on agriculture**:\n- Mechanization (Cyrus McCormick's reaper 1834, Deere's plow 1837) transformed US Great Plains and Argentine pampas.\n- Grain prices fell globally — collapsed European peasant farming, drove migration.",
    keyIdeas: [
      "Limited liability + joint-stock corporations + stock exchanges = modern finance.",
      "Trusts (US — Standard Oil) and cartels (Germany) dominated industries by 1900.",
      "Multinationals (Standard Oil, Singer, United Fruit) operated across borders.",
      "Global commodity chains (cotton, sugar, rubber, tea, beef) linked colonized producers to industrial cores.",
      "Mass production (assembly lines), scientific management (Taylor), department stores = mass consumer markets.",
    ],
    commonMistakes: [
      "Confusing trust and cartel — both are concentration but US trusts merged firms while German cartels coordinated independent ones.",
      "Forgetting that India lost its handloom textile industry to British competition.",
      "Treating corporations as ancient — modern joint-stock LIMITED LIABILITY is mid-19th-c. (Britain 1855).",
    ],
  },
  "5.8": {
    id: "5.8",
    title: "Reactions to the Industrial Economy from 1750 to 1900",
    summary:
      "Industrialization produced ideological responses (socialism, Marxism, anarchism), labor movements (unions, strikes), reform legislation, and rebellions (Luddites, Taiping).",
    lesson:
      "Industrial conditions — long hours, low wages, child labor, urban squalor — sparked diverse responses.\n\n**Utopian socialism**:\n- **Robert Owen** (Britain) built model factory village at New Lanark; advocated cooperatives.\n- **Charles Fourier** (France) imagined 'phalansteries' — cooperative communes.\n- **Saint-Simon** — technocratic planning by industrial elite.\n\n**Marxism**:\n- **Karl Marx** + **Friedrich Engels**: *Communist Manifesto* (1848), *Das Kapital* (1867).\n- History as class struggle; **proletariat** (workers) will overthrow **bourgeoisie** (owners) and establish a classless society.\n- Argued capitalism's contradictions (overproduction, falling profit rates) doom it.\n- **First International** (1864-76); **Second International** (1889) — international socialist movement.\n\n**Anarchism**:\n- **Mikhail Bakunin** — abolish state and capitalism together.\n- Spread in Russia, Italy, Spain, Latin America.\n- Anarchist assassinations of leaders (US President McKinley 1901; Empress Elisabeth of Austria 1898) made the movement a perceived threat.\n\n**Labor movements**:\n- **Trade unions** legalized in Britain (1824 Combination Acts repealed; 1871 Trade Union Act).\n- **Strikes** — Pullman strike (US 1894), Haymarket affair (US 1886).\n- **May Day (May 1)** as international labor day from 1889.\n\n**Reform liberalism**:\n- John Stuart Mill (later) — extended liberalism toward reform: women's suffrage, regulation of monopolies.\n- **Progressive movement** (US, late 19th c.) — antitrust, consumer protection.\n\n**Working-class political parties**:\n- German **SPD (1875)** became the largest socialist party in Europe before WWI.\n- British **Labour Party (1900)**.\n\n**Conservative reactions**:\n- **Bismarck's social insurance** (1883-89) — co-opted socialist demands while persecuting socialist organizers (Anti-Socialist Laws 1878-90).\n- Catholic social teaching — **Rerum Novarum (1891)** — affirmed workers' rights to organize while opposing socialism.\n\n**Pre-industrial protest**:\n- **Luddites** (Britain 1811-16) smashed textile machinery — early protest against displacement.\n- Captain Swing riots (English farm laborers, 1830-31).\n\n**Rebellions in the colonized world**:\n- **Taiping Rebellion (China 1850-64)** — Hong Xiuquan's syncretic Christian movement against Qing; 20-30 million dead.\n- **Indian Rebellion of 1857** — sepoy uprising vs. British East India Company; led to direct Crown rule.",
    keyIdeas: [
      "Marxism (1848) framed industrial conflict as proletariat vs. bourgeoisie; globally influential.",
      "Anarchism, labor unions, strikes, May Day, socialist parties (SPD 1875).",
      "Bismarck's social insurance and Rerum Novarum (1891) co-opted/responded to socialism.",
      "Luddites smashed machines; Taiping Rebellion + 1857 India Rebellion = colonized-world responses.",
    ],
    commonMistakes: [
      "Conflating socialism and communism — communism (Marx) is a subset of socialism.",
      "Forgetting that Bismarck SUPPRESSED socialism politically while ADOPTING its policies.",
      "Underestimating Taiping Rebellion's scale — 20-30M dead, the deadliest civil war ever.",
    ],
  },
  "5.9": {
    id: "5.9",
    title: "Society and the Industrial Age",
    summary:
      "Industrialization restructured class, gender, and family life — created urban working and middle classes, separated work from home, and provoked first-wave feminism.",
    lesson:
      "**New class structure**:\n- **Industrial bourgeoisie** — factory owners, financiers, merchants — accumulated unprecedented wealth and political power.\n- **Middle class** — managers, professionals (doctors, lawyers, engineers), white-collar clerks, teachers — expanded with corporate growth.\n- **Industrial working class (proletariat)** — wage laborers in factories and mines; long hours, dangerous conditions, no job security.\n- **Rural peasantry** still the majority of humans in 1900 but shrinking share in industrialized regions.\n\n**Gender and the cult of domesticity**:\n- Middle-class ideology held that men belong in 'public sphere' (work, politics) and women in 'private sphere' (home, children) — the **separate spheres** doctrine.\n- Working-class women, however, worked in textile mills, domestic service, agriculture; their labor was essential.\n- **Cult of domesticity** prescribed piety, purity, submissiveness, domesticity — but applied mainly to white middle-class women.\n\n**First-wave feminism**:\n- **Seneca Falls Convention (1848, US)** — Elizabeth Cady Stanton, Lucretia Mott; Declaration of Sentiments demanded suffrage.\n- **Mary Wollstonecraft** (1792) had earlier argued for women's education and rights.\n- **Suffragists**: by 1900 New Zealand (1893), Australia (1902) had granted women's vote; UK and US after WWI.\n- **Married Women's Property Acts** (UK 1870, 1882) let married women own property.\n\n**Family change**:\n- Industrial work separated home and workplace for the first time.\n- Birth rates fell in industrializing countries (urban families had fewer children) — the **demographic transition**.\n- Compulsory schooling (UK 1880, US states variable) extended childhood.\n\n**Health and standards of living**:\n- Long-term: living standards rose for workers (real wages roughly doubled in Britain 1850-1900).\n- Short-term: early industrial cities had falling life expectancy (cholera, TB, polluted water).\n- Public health responses (sanitation, vaccination — Jenner 1796 smallpox; Pasteur germ theory 1860s) gradually improved life expectancy.\n\n**Consumer culture**:\n- Cheap mass-produced goods (clothing, soap, processed food) became available.\n- Department stores, advertising, brand names emerged.\n\n**Migration**:\n- ~50 million Europeans emigrated to Americas, Australia, South Africa 1820-1914.\n- ~30 million Indians and Chinese migrated as indentured workers, traders, settlers (covered in 6.6).",
    keyIdeas: [
      "New class structure: industrial bourgeoisie, middle class (managerial/professional), proletariat, rural peasantry.",
      "Separate spheres ideology assigned middle-class women to home; working-class women still labored.",
      "First-wave feminism: Seneca Falls 1848, Wollstonecraft 1792; suffrage in NZ 1893, Australia 1902; UK/US after WWI.",
      "Demographic transition: industrializing societies' birth and death rates fall.",
      "Mass migration: ~50M Europeans + ~30M Asians migrated 1820-1914.",
    ],
    commonMistakes: [
      "Treating 'separate spheres' as describing all women — it was ideal for middle class only.",
      "Forgetting Seneca Falls (1848) as the start of organized US women's suffrage.",
      "Underestimating migration scale of the era — global diaspora reshaping Americas, SE Asia, Caribbean.",
    ],
  },
  "5.10": {
    id: "5.10",
    title: "Continuity and Change in the Industrial Age",
    summary:
      "Industrial Age changes (factory system, urbanization, global commodity chains, industrial empires) coexisted with continuities (peasant majority, patriarchy, agrarian colonialism in many regions).",
    lesson:
      "CCOT synthesis topic.\n\n**Major changes (1750-1900)**:\n- **Production**: factory system replaced cottage and artisan production in industrial regions.\n- **Energy**: shift from human/animal/water/wood to coal/steam/electricity.\n- **Population**: world population doubled (~800M to ~1.6B).\n- **Urbanization**: 3% to 14% in cities >100,000.\n- **Transport**: steamships, railroads collapsed time and cost of long-distance movement.\n- **Communication**: telegraph (1844) and telephone (1876) made instant global communication possible.\n- **Politics**: rise of nation-states, mass politics, suffrage expansion, socialist parties.\n- **Empire**: industrial Europeans colonized 80%+ of Africa and most of Asia (covered in Unit 6).\n- **Society**: new class structure; first-wave feminism; abolition of slavery (Britain 1833, US 1865, Brazil 1888).\n- **Ideologies**: liberalism, socialism, nationalism, anarchism — all 19th-century products.\n\n**Major continuities**:\n- **Most humans still rural peasants** in 1900 — China, India, Russia, Africa overwhelmingly agricultural.\n- **Patriarchy** continued globally though challenged.\n- **Religion** remained central to most lives; secularization was an industrial-Western phenomenon.\n- **Hierarchy** persisted — colonial racial hierarchy replaced/added to older caste/class systems.\n- **Famine and disease** still killed massively (Irish Famine 1845-49; Great Chinese Famine of 1876-79; Indian famines under British rule).\n- **Slavery** ended legally but coerced labor (indenture, debt peonage) continued.\n\n**Periodization debate**:\n- 1750 = start of industrial transformation (Britain).\n- 1900 = High Industrial age, eve of WWI which would shatter the European order.\n\n**Argumentation note for the LEQ**: strong CCOT essays must specify WHAT changed, WHAT stayed the same, and HOW MUCH — the rubric rewards qualified judgments more than absolute claims.",
    keyIdeas: [
      "Changes: factory system, fossil energy, urbanization, mass politics, industrial empire, new ideologies.",
      "Continuities: most humans peasants; patriarchy; religion; hierarchy; famine and disease.",
      "Slavery legally ended but coerced labor (indenture, debt peonage) continued.",
      "Periodization: 1750 (industrial start) → 1900 (eve of WWI).",
      "Strong CCOT essays QUALIFY change with specific evidence on both sides.",
    ],
    commonMistakes: [
      "Listing only changes — strong essays balance with continuities.",
      "Forgetting that most of humanity in 1900 still lived agriculturally.",
      "Treating industrial change as universal — much of Africa, Asia, Latin America industrialized partially or not at all by 1900.",
    ],
    workedExample: {
      prompt:
        "Evaluate the extent to which industrialization changed gender roles in the period c. 1750 to 1900.",
      solution:
        "Industrialization significantly changed gender roles in industrializing societies but left major continuities. In Britain and the US, the rise of the factory separated home and workplace and produced the middle-class 'separate spheres' ideology, which assigned women to domestic life. At the same time, working-class women became factory laborers (Lowell mills, Manchester textiles), upending older household economies. By 1900 first-wave feminists like Stanton, Mott, and the British suffragists had organized for political rights, winning the vote in New Zealand (1893) and Australia (1902). However, patriarchy continued: women across most of the world remained excluded from political power, paid less than men, and bore primary responsibility for childcare. Industrialization changed the FORM of patriarchal organization more than it abolished it.",
    },
  },

  // =========================================================================
  // UNIT 6 — CONSEQUENCES OF INDUSTRIALIZATION (c. 1750-1900)
  // =========================================================================
  "6.1": {
    id: "6.1",
    title: "Rationales for Imperialism from 1750 to 1900",
    summary:
      "Industrial Europeans justified imperialism through Social Darwinism, the 'civilizing mission,' Christian evangelism, racial 'science,' and economic 'necessity.'",
    lesson:
      "**New imperialism (~1870-1914)** was justified by a cluster of ideologies — used selectively to legitimize what economic and strategic interests already sought.\n\n**Social Darwinism**:\n- Misapplied Darwin's *Origin of Species* (1859): 'survival of the fittest' to nations and races.\n- **Herbert Spencer** popularized the idea that European dominance proved European racial superiority.\n- Justified colonial conquest as 'natural' competition.\n\n**Scientific racism**:\n- Phrenology, craniometry (Samuel Morton, *Crania Americana* 1839), and racial typologies claimed objective racial hierarchies.\n- Used to justify colonial rule, slavery's legacy, segregation, and immigration restrictions.\n\n**'Civilizing mission' / 'White Man's Burden'**:\n- **Rudyard Kipling's poem** 'The White Man's Burden' (1899) — directed at the US after taking the Philippines — framed empire as moral duty to uplift 'lesser races.'\n- French version: **mission civilisatrice**.\n- Used to justify schools, missions, infrastructure built by colonial regimes — though the actual benefits to colonized populations were limited.\n\n**Christian evangelism**:\n- Protestant and Catholic missionary societies (London Missionary Society 1795; White Fathers 1868) built schools, hospitals, conducted conversions.\n- **David Livingstone** (Scottish, in Africa) embodied the missionary-explorer ideal.\n- Mission stations sometimes opposed colonial brutality (Las Casas earlier; Henry Morton Stanley vs. Belgian Congo cruelty later).\n\n**Economic rationales**:\n- **J. A. Hobson** (*Imperialism: A Study*, 1902) argued European capital surplus required overseas outlets — colonies as investment targets and captive markets.\n- **Lenin** (*Imperialism, the Highest Stage of Capitalism*, 1916) extended Hobson — imperialism as inevitable late capitalism.\n- Industrial Europe NEEDED rubber (Congo, Malaya), oil (Persia, Mexico), cotton (Egypt, India, US South), tin (Bolivia, Malaya), tea (India, Ceylon), gold/diamonds (South Africa).\n\n**Strategic rationales**:\n- **Suez Canal** (1869) made Egypt strategic; Britain occupied Egypt (1882).\n- Naval bases worldwide (Gibraltar, Aden, Singapore, Hong Kong, Cape Town).\n- Coal stations for steamship empires.\n- 'Great Game' between Britain and Russia in Central Asia.\n\n**Domestic political rationales**:\n- Imperial expansion as outlet for nationalist energy and distraction from class conflict.\n- Bismarck used colonies cynically — to acquire diplomatic chips, not territory he valued.\n\n**Critics** existed throughout — anti-imperialist liberals (J.A. Hobson), socialists (Rosa Luxemburg, Lenin), anti-imperial leagues in US (Mark Twain). Their critiques would shape 20th-century anti-colonial movements.",
    keyIdeas: [
      "Social Darwinism and scientific racism justified European 'fitness' to rule.",
      "Civilizing mission / White Man's Burden / mission civilisatrice = moral framing.",
      "Christian missionary work spread alongside (and sometimes against) imperial conquest.",
      "Economic: Hobson and Lenin saw imperialism as outlet for capital surplus; industrial demand for raw materials.",
      "Strategic: Suez (1882), naval bases, coal stations, Great Game.",
    ],
    commonMistakes: [
      "Treating ideological rationales as the REAL cause — they justified what economic + strategic interests already pursued.",
      "Forgetting that critics (Hobson, Twain, Lenin) existed inside imperial countries.",
      "Confusing scientific racism (19th c.) with informal racism (older) — scientific racism claimed empirical authority.",
    ],
  },
  "6.2": {
    id: "6.2",
    title: "State Expansion from 1750 to 1900",
    summary:
      "Industrial-era European empires colonized Africa (Berlin Conference 1884-85), South Asia (British Raj after 1857), and Southeast Asia; the US expanded across continent and overseas; Russia across Asia.",
    lesson:
      "**Africa — 'Scramble for Africa' (~1880-1914)**:\n- In 1880, ~10% of Africa was European-ruled. By 1914, ~90% (only Ethiopia and Liberia remained independent).\n- **Berlin Conference (1884-85)**: 14 European powers + US partitioned Africa with no Africans present; established 'effective occupation' rule.\n- Britain (Egypt, Sudan, Kenya, Nigeria, South Africa, Rhodesia) — Cecil Rhodes' 'Cape to Cairo.'\n- France (Algeria, West Africa, Indochina, Madagascar).\n- Belgium — **Congo Free State** under King Leopold II as personal property; rubber atrocities killed millions.\n- Germany (Tanganyika, Cameroon, SW Africa — site of Herero and Nama genocide 1904-08).\n- Portugal (Angola, Mozambique).\n- Italy (Libya, Eritrea, Somalia; FAILED to take Ethiopia, defeated at **Adwa 1896**).\n\n**Methods of conquest**:\n- **Maxim machine gun (1884)** — devastating asymmetric firepower.\n- **Quinine** — let Europeans operate in malarial regions.\n- **Steamboats** on African rivers.\n- **Indirect rule** (British) — co-opt local chiefs to govern; cheaper, less manpower.\n- **Direct rule** (French) — replace local rulers with French-appointed administrators.\n- **Settler colonies** (Algeria, Kenya, South Africa, Rhodesia) — European settlement and land alienation.\n\n**India**:\n- **East India Company rule (1757-1858)** after Battle of Plassey (1757).\n- **Indian Rebellion 1857** (Sepoy Mutiny) — sparked by greased cartridges, deeper grievances. Suppressed brutally.\n- **British Raj** = direct Crown rule (1858-1947). Queen Victoria declared 'Empress of India' (1876).\n- Built railways, telegraphs, English-medium universities — also extracted wealth and deindustrialized cotton.\n\n**Southeast Asia**:\n- **Dutch East Indies** (Indonesia) — VOC consolidation from 1600s; Dutch government rule from 1800.\n- **British Malaya, Burma**.\n- **French Indochina** (Vietnam, Cambodia, Laos).\n- **US Philippines** after 1898 Spanish-American War — fought brutal Philippine-American War (1899-1902).\n- **Siam (Thailand)** preserved independence by playing British against French.\n\n**US continental expansion**:\n- **Louisiana Purchase (1803)**, **Mexican-American War (1846-48)** added Texas, California, SW.\n- **Manifest Destiny** ideology.\n- Native displacement: Trail of Tears (1838-39), Plains Wars, reservations.\n- Overseas: Hawaii (annexed 1898), Philippines, Cuba, Puerto Rico after 1898.\n\n**Russia** expanded across Siberia (Cossacks since 16th c.), Caucasus, Central Asia (Tashkent 1865, Bukhara 1868).\n\n**Japan** (industrialized) joined the imperialist club: Taiwan (1895), Korea (1905 protectorate, 1910 annexation).",
    keyIdeas: [
      "Scramble for Africa: 10% European in 1880 → 90% by 1914; Berlin Conference (1884-85) partitioned with no Africans present.",
      "Methods: machine gun, quinine, steamboats, railroads + indirect rule (British) vs. direct rule (French).",
      "India: 1857 Rebellion → British Raj (Crown rule from 1858); Victoria 'Empress of India' 1876.",
      "Ethiopia defeated Italian invasion at Adwa 1896 — Africa's only successful resistance.",
      "US expansion: continental (Manifest Destiny) and overseas after 1898; Japan: Taiwan 1895, Korea 1910.",
    ],
    commonMistakes: [
      "Forgetting Ethiopia's Adwa (1896) victory and Liberia's independence — Africa wasn't ALL colonized.",
      "Treating the Berlin Conference as conquest itself — it set RULES; conquest still required wars.",
      "Confusing indirect (British) and direct (French) rule.",
    ],
  },
  "6.3": {
    id: "6.3",
    title: "Indigenous Responses to State Expansion from 1750 to 1900",
    summary:
      "Colonized peoples resisted militarily (Zulu, Maori, Xhosa, Boxer, Ghost Dance), politically (Indian National Congress), and ideologically (Pan-Africanism, Pan-Islamism, Hindu reform).",
    lesson:
      "Resistance to industrial-era imperialism took many forms.\n\n**Armed resistance**:\n- **Zulu Kingdom** under **Shaka** (early 19th c.) and later **Cetshwayo** defeated a British invasion at **Isandlwana (1879)** before being conquered after Rorke's Drift / Ulundi.\n- **Xhosa Wars** (eastern Cape, 1779-1879) — series of nine wars between Xhosa and British/Boer settlers.\n- **Maori Wars** (New Zealand, 1845-72) — Maori used trench warfare effectively but were eventually defeated.\n- **Mahdist State / Mahdist War** in Sudan (1881-99) — Sufi Muslim leader Muhammad Ahmad declared himself **Mahdi**, defeated and killed General Gordon at Khartoum (1885); finally crushed at **Omdurman (1898)** — where machine guns killed ~10,000 Mahdists.\n- **Herero and Nama Genocide** (German SW Africa, 1904-08) — 80% of Herero killed in retribution for uprising.\n- **Boxer Rebellion** (China 1899-1901) — Yihequan ('Boxers') with Empress Dowager Cixi's encouragement attacked foreigners and Chinese Christians; suppressed by **Eight-Nation Alliance**.\n- **Ghost Dance** (Plains Indians, 1890) — religious revival movement; ended with massacre at **Wounded Knee (1890)**.\n- **Cuban independence wars** (1868-78, 1895-98) — eventually completed by US intervention 1898.\n\n**Internal reform / 'modernizing' resistance**:\n- **Self-Strengthening Movement** (China 1861-95) — adopt Western military technology while preserving Confucian society. Failed to prevent defeat by Japan (1895).\n- **Tanzimat reforms** (Ottoman 1839-76) — modernize legal, military, educational systems.\n- **Meiji Restoration** (Japan 1868) — most successful version, became imperial power.\n\n**Political organization**:\n- **Indian National Congress (1885)** — initially elite Hindu and Muslim organization seeking reform; later (under Gandhi from 1915) became mass independence movement.\n- **Egyptian Urabi Revolt (1881-82)** — nationalist army officers vs. British/French financial control; suppression led to British occupation.\n- **South African National Native Congress (1912)** — became African National Congress.\n\n**Religious/cultural revival**:\n- **Pan-Islamism** (Jamal al-Din al-Afghani, late 19th c.) — Muslim solidarity against Western imperialism.\n- **Hindu reform** (Ram Mohan Roy, Brahmo Samaj 1828; Vivekananda 1893) — modernize Hindu practice while resisting Westernization.\n- **Pan-African ideas** — Edward Blyden, later W.E.B. Du Bois.\n- **Cixi-era reforms** in late Qing — too late to save the dynasty.",
    keyIdeas: [
      "Armed resistance: Zulu (Isandlwana 1879), Mahdist Sudan, Boxer Rebellion (1899-1901), Ghost Dance/Wounded Knee (1890).",
      "Reform-from-within: Chinese Self-Strengthening, Ottoman Tanzimat, Japan Meiji (only Japan succeeded).",
      "Political: Indian National Congress (1885), Egyptian Urabi Revolt (1881-82).",
      "Religious/cultural: Pan-Islamism (al-Afghani), Hindu reform (Roy, Vivekananda), Pan-Africanism (Blyden).",
      "Most armed resistance failed against industrial military tech, but it shaped 20th-century anti-colonial movements.",
    ],
    commonMistakes: [
      "Treating colonized peoples as passive — resistance was constant.",
      "Forgetting that Japan (Meiji) is the case where reform-from-within succeeded.",
      "Confusing Boxer Rebellion (anti-foreigner from below) with Self-Strengthening (state-led modernization).",
    ],
  },
  "6.4": {
    id: "6.4",
    title: "Global Economic Development from 1750 to 1900",
    summary:
      "Industrialization integrated the world into a single capitalist economy with industrial cores (Europe, US, Japan), commodity-producing peripheries (Africa, Latin America, much of Asia), and global migration.",
    lesson:
      "By 1900 the world was economically integrated as never before — but unequally.\n\n**Industrial cores** (~15% of world population):\n- Britain, Belgium, France, Germany, US, Japan.\n- Manufactured industrial goods, exported them, controlled finance and shipping.\n\n**Commodity-producing peripheries**:\n- **Latin America** — Argentina (beef, wheat), Chile (copper, nitrates), Brazil (coffee, rubber), Cuba (sugar).\n- **Africa** — Congo (rubber, ivory), South Africa (gold, diamonds), Egypt (cotton).\n- **South/SE Asia** — India (cotton, tea, jute), Ceylon (tea), Malaya (tin, rubber), Indonesia (sugar, tobacco).\n- **Middle East** — Persia (oil after 1908), Egypt (cotton).\n\n**Free trade vs. protection**:\n- Britain pushed free trade after 1846 (used naval and diplomatic power to open markets — China after Opium Wars; Japan after Perry 1853).\n- US, Germany, Russia, Japan protected industries with tariffs.\n\n**Financial integration**:\n- **Gold standard** (Britain from 1821; most major economies by 1900) made currencies convertible — facilitated trade.\n- **London** = global financial capital; Lombard Street financed railways from Argentina to India.\n- Capital flowed from London/Paris/Berlin to colonial and semi-colonial regions.\n\n**Global commodity chains** (covered in 5.7):\n- Cotton, sugar, rubber, tea, beef, oil, diamonds, gold — produced in colonies/semi-colonies, processed and consumed in industrial cores.\n\n**Crisis of indigenous economies**:\n- **India** — deindustrialized in textiles; coerced into commercial agriculture (indigo, cotton, opium); famines under British rule (1876-78, 1896-1900) killed tens of millions.\n- **China** — silver outflow, opium imports (Opium Wars 1839-42, 1856-60), unequal treaties, semi-colonial status by 1900.\n- **Africa** — pre-existing trade redirected toward export commodities; cash-crop economies displaced subsistence farming.\n\n**Settler economies**:\n- US, Canada, Australia, New Zealand, Argentina, Chile, South Africa, Algeria, Kenya, Rhodesia.\n- European settlers + capital + land-grabbing from Indigenous populations.",
    keyIdeas: [
      "Industrial cores (Europe, US, Japan) vs. commodity peripheries (Africa, Latin America, much of Asia).",
      "Gold standard + London capital integrated global finance.",
      "British free trade (post-1846) imposed via naval/diplomatic power; rest of industrializers protected.",
      "Famines under British India (1876-78, 1896-1900) killed tens of millions.",
      "Settler economies (US, Canada, Australia, Argentina, S. Africa) combined European capital + immigration + land-grabbing.",
    ],
    commonMistakes: [
      "Treating global economic integration as benign — it was extractive and concentrated wealth in industrial cores.",
      "Forgetting that India under British rule suffered massive famines.",
      "Confusing free trade (British policy) with the gold standard (international monetary system).",
    ],
  },
  "6.5": {
    id: "6.5",
    title: "Economic Imperialism from 1750 to 1900",
    summary:
      "European powers dominated nominally independent states (China after Opium Wars, Ottoman, Latin America) through unequal treaties, financial control, and infrastructure (railroads, ports).",
    lesson:
      "**Economic imperialism** — political control short of formal annexation — operated through several mechanisms.\n\n**Unequal treaties**:\n- **China**: lost the **First Opium War (1839-42)** and signed the **Treaty of Nanjing**: ceded **Hong Kong**, opened five **treaty ports** (Shanghai, Canton, etc.), paid indemnity, granted **extraterritoriality** (foreigners exempt from Chinese law). Second Opium War (1856-60) deepened concessions; British and French sacked the **Summer Palace (1860)**. By 1900 China had **spheres of influence** carved out by Britain, France, Russia, Germany, Japan.\n- **Japan**: forced open by **Commodore Matthew Perry's** US 'Black Ships' (1853-54); signed the unequal **Treaty of Kanagawa (1854)** and Harris Treaty (1858). Meiji-era diplomats labored decades to renegotiate — finally fully equal by 1911.\n- **Ottoman Empire**: Capitulations (older), expanded in 19th c.; foreign creditors took over Ottoman finances via **Public Debt Administration (1881)**.\n\n**Financial control**:\n- **Egypt** — Khedive Ismail's debts to European banks for the Suez Canal led to British/French dual financial control (1876), then **British occupation (1882)**.\n- **Ottoman Public Debt Administration** collected major Ottoman tax revenues for European bondholders.\n\n**Latin American 'informal empire'**:\n- Latin American republics were politically independent but economically dependent — British capital built Argentine and Brazilian railways; British naval power enforced free trade.\n- **United Fruit Company** dominated Central America's banana economies — 'banana republics.'\n- **US Monroe Doctrine (1823)** declared the Americas off-limits to European intervention; later **Roosevelt Corollary (1904)** asserted US right to intervene in Latin America to stabilize finances.\n- Later: US Marines occupied Haiti (1915-34), Dominican Republic (1916-24), Nicaragua intermittently.\n\n**Infrastructure built for extraction**:\n- Railways often connected resource-producing interiors to coastal ports — designed to export commodities, not integrate national markets.\n- Telegraph lines connected colonial administrative centers, not local communities.\n\n**Indemnities and reparations**:\n- China paid huge indemnities after Opium Wars and Boxer Rebellion (1901, $333M over 39 years).\n- Mexico, Cuba, Haiti repeatedly forced to pay.",
    keyIdeas: [
      "Unequal treaties: Treaty of Nanjing (1842) — Hong Kong, treaty ports, extraterritoriality; Japan opened by Perry (1853-54).",
      "China's spheres of influence by 1900; semi-colonial status.",
      "Egypt and Ottoman: foreign financial control via Public Debt Administration; UK occupied Egypt 1882.",
      "Latin America: politically independent but economically dependent on British capital; US Monroe Doctrine + Roosevelt Corollary.",
      "Infrastructure built for extraction (port-bound railroads).",
    ],
    commonMistakes: [
      "Calling China a 'colony' — it was semi-colonial; never formally a single power's colony.",
      "Forgetting that Latin America was economically dependent despite political independence.",
      "Confusing extraterritoriality (foreigners outside local law) with treaty ports (open trade cities).",
    ],
  },
  "6.6": {
    id: "6.6",
    title: "Causes of Migration in an Interconnected World",
    summary:
      "Industrialization, transportation revolution, demographic pressure, and labor demand drove unprecedented migration: Europeans to Americas, Indians and Chinese as indentured laborers across British and other empires.",
    lesson:
      "1820-1914 saw the largest pre-WWII migration in history.\n\n**Push factors**:\n- **Population pressure** — European population doubled in the 19th c., outstripping rural employment.\n- **Famines** — Irish Potato Famine (1845-49) drove ~1M to America, ~1M dead.\n- **Religious/political persecution** — Russian Jews after pogroms (1881+), German revolutionaries after 1848.\n- **Land scarcity** — declining peasant landholdings, enclosure, mechanization displacing farm labor.\n- **Climate disasters** — droughts in China, India.\n\n**Pull factors**:\n- **Labor demand** in industrializing US, Argentina, Australia.\n- **Cheap, fast transport** — steamships cut Atlantic crossing from 6 weeks to 7-10 days.\n- **End of slavery** opened plantations to indentured/contract labor.\n- **Gold rushes** (California 1849, Australia 1851, S. Africa 1880s).\n\n**Major flows**:\n- **European migration to Americas** — ~50-55 million 1820-1914. UK/Ireland, Germany, Italy, Scandinavia, Eastern Europe → US, Canada, Argentina, Brazil.\n- **Indian indentured workers** — ~1.5M Indians shipped under contract to Caribbean (Trinidad, Guyana), Mauritius, Fiji, South Africa, Malaya — replacing enslaved labor.\n- **Chinese migration** — ~10-20 million, mostly within Asia (SE Asia) but also to US (Gold Rush, transcontinental railroad), Latin America, Caribbean. **Chinese Exclusion Act (US 1882)** halted Chinese immigration.\n- **Japanese migration** to Hawaii, Brazil, Peru, US west coast.\n- **Forced internal migration**: Russian serfs to Siberia after emancipation (1861).\n\n**Indentured labor system**:\n- 'Coolie' contracts — 5-7 year terms, harsh conditions, often little better than slavery.\n- Critics (humanitarian, abolitionist) called it 'a new system of slavery' (Hugh Tinker).\n\n**Restrictionist backlash**:\n- US Chinese Exclusion Act 1882; Gentlemen's Agreement with Japan 1907; National Origins Act 1924.\n- White Australia policy (1901).\n- Anti-Asian movements in California, British Columbia, Chile, Peru.",
    keyIdeas: [
      "Push: population pressure, famines (Ireland 1845-49), persecution (Russian Jews), land scarcity.",
      "Pull: industrial labor demand, cheap steamship transport, end of slavery, gold rushes.",
      "European migration ~50M to Americas; Chinese ~10-20M (mostly within Asia); Indian ~1.5M indentured to British colonies.",
      "Indentured labor ('coolie') replaced enslaved labor on plantations — 'new system of slavery.'",
      "Backlash: Chinese Exclusion Act (US 1882), White Australia Policy (1901).",
    ],
    commonMistakes: [
      "Treating migration as only European → America — Asian migration (Indian indentured, Chinese SE Asia) was equally global.",
      "Forgetting indenture as a coerced labor system between slavery and free labor.",
      "Dating Chinese Exclusion to wrong moment — 1882, the US's first major immigration restriction.",
    ],
  },
  "6.7": {
    id: "6.7",
    title: "Effects of Migration",
    summary:
      "Migration created diaspora communities, reshaped destination demographics and cultures, drove return remittances, and provoked nativist backlash and ethnic tension.",
    lesson:
      "Effects on **destination societies**:\n- **Demographic transformation** — by 1900, US, Canada, Argentina, Australia were majority European-descent (Indigenous peoples reduced by disease and dispossession).\n- **Labor**: cheap immigrant labor built railways (Chinese on US Central Pacific 1860s), worked plantations (Indian indenture), staffed factories (European in US).\n- **Cultural diffusion**: European foods (Italian pasta, Polish pierogi), languages, religions (Catholic surge in US); Chinese food in SE Asia; Indian food in S. Africa, Caribbean.\n- **Political effects** — large immigrant communities reshaped urban politics (Tammany Hall in NYC); race politics in white-settler states.\n\n**Effects on origin societies**:\n- **Remittances** flowed home (Italian, Irish, Chinese remittances supported families and villages).\n- **Demographic relief** — outflow eased land pressure in Italy, Ireland, southern China.\n- **Return migrants** brought new ideas, capital, sometimes political activism.\n\n**Diasporic communities**:\n- **Chinese** in SE Asia (Singapore, Malaya, Vietnam, Indonesia) — became merchant minorities; sometimes targets of violence (anti-Chinese pogroms).\n- **Indians** in Africa (Kenya, Uganda, S. Africa) and Caribbean — created lasting Indo-African and Indo-Caribbean populations.\n- **Lebanese/Syrian** merchants spread to West Africa, Latin America.\n- **Irish** in US, Britain, Australia.\n- **Jews** (post-1881 pogroms) to US, Argentina, Palestine.\n\n**Nativist backlash**:\n- US **Know-Nothings** (1850s, anti-Catholic), **American Protective Association** (1880s anti-immigrant).\n- Anti-Chinese riots (San Francisco 1877, Vancouver 1907, Chile 1907).\n- Anti-Italian violence (1891 New Orleans lynching of 11 Italians).\n- **Pogroms** in Russia and Eastern Europe.\n- Restrictionist immigration laws (US 1882, 1907, 1917, 1924; Australia 1901).\n\n**Ethnic neighborhoods**:\n- **Chinatowns**, Little Italys, Jewish East Side, Polish neighborhoods — provided support networks but also became targets of stereotyping.\n\n**Effects on Indigenous peoples**:\n- US, Canada, Australia, Argentina dispossessed Native populations through conquest, treaty violations, disease, and forced displacement (US Plains Wars; Argentine **Conquest of the Desert** 1870s; Canadian residential schools).\n\n**Comparison**:\n- Some migration was **voluntary economic** (most European to Americas).\n- Some was **coerced labor** (Indian indenture, Chinese 'coolie' trade).\n- Some was **flight from persecution** (Russian Jews).\n- Some was **internal/forced** (Russian peasants to Siberia).",
    keyIdeas: [
      "Destination effects: demographic transformation, cultural diffusion, urban political reshaping, racial conflict.",
      "Origin effects: remittances, demographic relief, return migrants spreading ideas.",
      "Diasporic communities: Chinese in SE Asia, Indians in Africa/Caribbean, Lebanese in W. Africa/Latin America.",
      "Nativist backlash: Know-Nothings, anti-Chinese riots, restrictionist immigration laws.",
      "Indigenous dispossession (Plains Wars, Argentine Conquest of the Desert, Australian frontier wars).",
    ],
    commonMistakes: [
      "Treating immigrants only as victims of nativism — migration also reshaped politics, food, religion.",
      "Forgetting remittances as a major economic flow back to origin societies.",
      "Confusing voluntary migration with coerced indenture.",
    ],
  },
  "6.8": {
    id: "6.8",
    title: "Causation in the Imperial Age",
    summary:
      "Industrialization caused (and was caused by) imperialism, migration, and global economic integration — creating cycles of cause and effect that produced the modern world economy by 1900.",
    lesson:
      "This is the unit's causation-synthesis topic. The CED expects you to handle multi-level causation.\n\n**Industrial Revolution caused**:\n- New imperialism (industrial demand for raw materials and markets; military-tech advantage).\n- Mass migration (industrial labor demand + transport revolution).\n- Global commodity chains (cotton, sugar, rubber, oil).\n- New ideologies (nationalism, socialism, anarchism, scientific racism).\n- Demographic transition.\n\n**Imperialism caused**:\n- Forced integration of colonies into industrial commodity chains.\n- Famines and demographic crises in colonized regions.\n- Indigenous resistance movements (most failed in 19th c. but seeded 20th-c. nationalism).\n- Inter-imperial rivalries that contributed to WWI (Unit 7).\n- Forced/voluntary migration of Indians, Africans, Chinese.\n\n**Migration caused**:\n- Reshaped Americas, Australia demographics.\n- Diasporic networks of trade and political activism.\n- Nativist backlash and immigration restriction.\n- Remittances supporting origin societies.\n\n**Global economic integration caused**:\n- Concentration of wealth in industrial cores.\n- Famines from cash-crop dependency in colonies.\n- New financial crises (1873 Long Depression; 1893 US Panic).\n- Standardization of time, weights, currencies.\n\n**Reciprocal causation** is key:\n- Industrialization made imperialism feasible AND profitable; imperialism provided raw materials AND markets sustaining industrialization.\n- Migration both responded to AND deepened economic integration.\n- Resistance movements both responded to AND helped delegitimize imperialism over time.\n\n**Periodization**:\n- 1750 = beginning of industrial transformation.\n- 1900 = peak of industrial-imperial order; eve of WWI which would shatter it.\n\n**LEQ-style framing**: by 1900 the world economy was integrated to a degree never previously seen — but on terms that concentrated wealth in industrial cores and would soon be challenged by anti-colonial movements (Unit 8) and global wars (Unit 7).",
    keyIdeas: [
      "Industrialization caused imperialism, migration, commodity chains, ideologies, demographic transition.",
      "Imperialism caused famines, resistance movements, inter-imperial rivalries (→ WWI), forced migration.",
      "Migration caused demographic transformation, diasporas, nativist backlash, remittances.",
      "Reciprocal causation: industrialization and imperialism reinforced each other.",
      "By 1900 the global economic integration was unprecedented but extractive.",
    ],
    commonMistakes: [
      "Treating causation as one-way — industrialization → imperialism is true, but imperialism also fed industrialization.",
      "Listing causes without weighing them — strong causation essays prioritize.",
      "Forgetting that resistance movements (failed in 19th c.) seeded successful 20th-c. anti-colonial movements.",
    ],
    workedExample: {
      prompt:
        "Evaluate the relative importance of economic, political, and ideological causes of European imperialism between 1750 and 1900.",
      solution:
        "All three causes were essential, but economic and strategic factors were most fundamental, with ideology serving largely to justify them. Economically, industrialization created insatiable demand for raw materials (cotton from India, rubber from the Congo, oil from Persia) and markets for finished goods, while London capital sought overseas investment outlets — Hobson and Lenin would systematize this view. Politically, inter-state competition (Britain vs. France vs. Germany) drove a 'scramble' so that powers raced to claim territory before rivals did, and military technology (Maxim gun, steamships, quinine) made conquest feasible. Ideologies — Social Darwinism, the 'civilizing mission,' Christian evangelism — provided moral justification, but they followed rather than initiated imperial pushes; thus economic demand and strategic competition were the deeper causes, with ideology amplifying and legitimizing them.",
    },
  },

  // =========================================================================
  // UNIT 7 — GLOBAL CONFLICT (c. 1900-present)
  // =========================================================================
  "7.1": {
    id: "7.1",
    title: "Shifting Power After 1900",
    summary:
      "By 1900, old land empires (Ottoman, Qing, Russian) faced internal crisis while industrial powers (US, Germany, Japan) rose; Russian (1917), Mexican (1910), Chinese (1911) revolutions overthrew old orders.",
    lesson:
      "**Decline of old land empires**:\n- **Ottoman Empire** — 'Sick Man of Europe.' Lost Balkans (Greek 1832, Bulgarian 1878, Balkan Wars 1912-13). **Young Turks** seized power (1908) and tried constitutional reform; CUP (Committee of Union and Progress) led during WWI.\n- **Qing China** — defeats by Japan (1895) and Eight-Nation Alliance (1900) discredited the dynasty; **1911 Revolution** under **Sun Yat-Sen's** Three Principles of the People (nationalism, democracy, livelihood) overthrew the Qing. Republic founded 1912 but quickly fragmented into warlordism.\n- **Russian Empire** — defeated by Japan (1905) → **1905 Revolution** → tsar grants Duma; full collapse in **1917 Revolution** (covered below).\n\n**Mexican Revolution (1910-20)**:\n- Long dictatorship under **Porfirio Díaz** had concentrated land in elite hands.\n- **Madero** sparked revolt in 1910; Díaz fled in 1911.\n- Civil war between Madero, **Pancho Villa**, **Emiliano Zapata** ('Land and Liberty'), Carranza.\n- **Constitution of 1917** — land reform, labor rights, anticlericalism, restrictions on foreign ownership.\n- ~1 million dead; first major 20th-c. social revolution.\n\n**Russian Revolution (1917)**:\n- WWI strain + bread shortages → **February Revolution** (March 1917 Western calendar) — tsar abdicated; Provisional Government formed.\n- **Lenin** returned (German train) to lead **Bolsheviks**; **October Revolution** (November) seized power.\n- **Civil War (1918-22)** between Reds (Bolsheviks) and Whites (anti-communist coalition + foreign intervention).\n- 1922: founded **Soviet Union**.\n- First Marxist state — became model for 20th-century communist movements.\n\n**Rise of new powers**:\n- **United States** — surpassed Britain in industrial output by ~1900; entered WWI (1917) and WWII (1941) as decisive force.\n- **Germany** unified 1871 — fastest-growing industrial power in Europe; military and naval rivalry with Britain (Anglo-German naval race).\n- **Japan** — Meiji industrialization; defeated China (1895), Russia (1905); annexed Korea (1910); rose as East Asian power.\n\n**Anti-colonial seeds**:\n- Indian National Congress's growing assertiveness (split 1907 into moderates and extremists; **Bal Gangadhar Tilak's** swaraj demand).\n- African National Congress founded 1912 in South Africa.\n- Pan-Asianism, Pan-Africanism gaining traction among educated elites.",
    keyIdeas: [
      "Old land empires decline: Ottoman ('Sick Man'), Qing (1911 Revolution), Russian (1917 Revolution).",
      "Mexican Revolution (1910-20) → Constitution of 1917 with land reform and labor rights.",
      "Russian Revolution: February (tsar abdicates) → October (Bolsheviks) → Civil War → USSR (1922).",
      "Rising powers: US (largest industrial economy by 1900), Germany (unified 1871), Japan (defeated Russia 1905).",
      "Anti-colonial movements grow (Indian National Congress, ANC 1912).",
    ],
    commonMistakes: [
      "Confusing February and October Russian Revolutions (both 1917; February overthrew tsar, October Bolsheviks).",
      "Treating 1911 Republic of China as a stable government — it fragmented into warlordism.",
      "Forgetting Mexican Revolution as the FIRST major 20th-century social revolution.",
    ],
  },
  "7.2": {
    id: "7.2",
    title: "Causes of World War I",
    summary:
      "Long-term causes: militarism, alliances, imperialism, nationalism (M.A.I.N.). Trigger: Sarajevo assassination (June 1914) cascaded through alliance systems into general war.",
    lesson:
      "The **M.A.I.N.** mnemonic — though oversimplified — captures the core long-term causes.\n\n**Militarism**:\n- Anglo-German **naval race** — Britain's HMS *Dreadnought* (1906) launched a battleship arms race.\n- Mass conscript armies; detailed mobilization plans (Schlieffen Plan for Germany — quick defeat of France through Belgium, then turn east).\n- Once mobilization began, plans were hard to stop.\n\n**Alliances**:\n- **Triple Alliance** (1882): Germany, Austria-Hungary, Italy.\n- **Triple Entente** (1907): France, Russia, Britain.\n- Designed to deter war but instead chained powers into mutual escalation.\n\n**Imperialism**:\n- Inter-imperial competition (Britain vs. Germany over colonies, Russia vs. Austria over Balkans).\n- Two Moroccan Crises (1905, 1911) brought France and Germany close to war.\n\n**Nationalism**:\n- Pan-Slavism — Russian and Serbian sponsorship of South Slav nationalism aimed at Austria-Hungary.\n- Pan-Germanism.\n- Revanchism — French desire to recover Alsace-Lorraine (lost to Germany 1871).\n- Nationalism within Austria-Hungary (Czechs, Croats, Serbs) destabilized the empire.\n\n**Balkan tinderbox**:\n- Ottoman retreat created a power vacuum.\n- **Balkan Wars (1912-13)** — Bulgaria, Serbia, Greece, Montenegro defeated Ottomans; second war saw Bulgaria fight its former allies.\n- Serbia emerged stronger and more confrontational with Austria-Hungary.\n\n**Trigger — June 28, 1914**:\n- **Archduke Franz Ferdinand** (heir to Austria-Hungary) assassinated in Sarajevo by **Gavrilo Princip** (Bosnian Serb, member of Black Hand).\n- Austria-Hungary issued ultimatum to Serbia; Serbia accepted most demands.\n- Austria-Hungary declared war on Serbia (July 28).\n- Russia mobilized to defend Serbia.\n- Germany declared war on Russia (Aug 1) and France (Aug 3).\n- German invasion of neutral Belgium brought Britain in (Aug 4).\n- **Within a week**, all major European powers were at war.\n\n**Why such a small spark caused such a big fire**:\n- Rigid mobilization plans (Schlieffen) made delay impossible.\n- Alliances mechanically activated each side.\n- Decades of tension primed all powers to fight.\n- Many leaders expected a short, decisive war ('home by Christmas').",
    keyIdeas: [
      "M.A.I.N. — Militarism, Alliances, Imperialism, Nationalism — long-term causes.",
      "Anglo-German naval race; Schlieffen Plan; Triple Alliance vs. Triple Entente.",
      "Balkan Wars (1912-13) destabilized SE Europe; Serbia confrontational with Austria.",
      "Trigger: Franz Ferdinand assassinated by Princip (June 28, 1914).",
      "Mobilization plans + alliance commitments turned local crisis into general war within a week.",
    ],
    commonMistakes: [
      "Saying the assassination CAUSED WWI — it triggered it; deeper causes had been building for decades.",
      "Forgetting the Balkan Wars (1912-13) as immediate context.",
      "Treating leaders as expecting a long war — most expected a short, decisive conflict.",
    ],
    diagram:
      '<svg viewBox="0 0 400 240" xmlns="http://www.w3.org/2000/svg"><rect width="400" height="240" fill="#fafaf9"/><text x="200" y="22" text-anchor="middle" font-family="serif" font-size="14" fill="#1c1917" font-weight="bold">Causes of WWI: M.A.I.N.</text><g font-family="sans-serif" font-size="10" fill="#1c1917"><rect x="40" y="50" width="140" height="50" fill="#fed7aa" stroke="#c2410c"/><text x="110" y="70" text-anchor="middle" font-weight="bold">Militarism</text><text x="110" y="84" text-anchor="middle" font-size="9">naval race, conscription</text><text x="110" y="96" text-anchor="middle" font-size="9">Schlieffen Plan</text><rect x="220" y="50" width="140" height="50" fill="#fde68a" stroke="#a16207"/><text x="290" y="70" text-anchor="middle" font-weight="bold">Alliances</text><text x="290" y="84" text-anchor="middle" font-size="9">Triple Alliance vs.</text><text x="290" y="96" text-anchor="middle" font-size="9">Triple Entente</text><rect x="40" y="120" width="140" height="50" fill="#bbf7d0" stroke="#15803d"/><text x="110" y="140" text-anchor="middle" font-weight="bold">Imperialism</text><text x="110" y="154" text-anchor="middle" font-size="9">colonial rivalry</text><text x="110" y="166" text-anchor="middle" font-size="9">Moroccan crises</text><rect x="220" y="120" width="140" height="50" fill="#bfdbfe" stroke="#1d4ed8"/><text x="290" y="140" text-anchor="middle" font-weight="bold">Nationalism</text><text x="290" y="154" text-anchor="middle" font-size="9">Pan-Slavism, revanchism</text><text x="290" y="166" text-anchor="middle" font-size="9">Balkans</text><rect x="100" y="190" width="200" height="35" fill="#1c1917"/><text x="200" y="210" text-anchor="middle" fill="#fafaf9">Sarajevo (Jun 28, 1914)</text><text x="200" y="222" text-anchor="middle" fill="#fafaf9" font-size="9">trigger &#8594; general war</text></g></svg>',
  },
  "7.3": {
    id: "7.3",
    title: "Conducting World War I",
    summary:
      "WWI was a total war fought with industrial weapons (machine guns, gas, tanks, planes) on stalemated trench fronts; mobilized civilians, colonial troops, and women; ended with US entry tipping the balance.",
    lesson:
      "**Western Front** stalemated quickly:\n- Schlieffen Plan failed at the **First Battle of the Marne (Sept 1914)** — French and British stopped the German advance ~30 miles from Paris.\n- Both sides dug in; **trench warfare** stretched 400+ miles from English Channel to Swiss border.\n- Major battles for negligible territory: **Verdun (1916)** ~700,000 casualties; **Somme (July-Nov 1916)** ~1 million casualties; **Passchendaele (1917)** another vast bloodletting.\n\n**Eastern Front** was more mobile:\n- Russia faced Germany and Austria-Hungary across vast space.\n- Russia suffered massive losses (Tannenberg Aug 1914) and political collapse (1917 Revolution → Brest-Litovsk treaty 1918 ceded huge territory).\n\n**Other fronts**:\n- **Italy** (joined Entente 1915) vs. Austria-Hungary in mountainous Alpine warfare.\n- **Ottoman Empire** (joined Central Powers 1914): **Gallipoli (1915-16)** Anglo-French/ANZAC failed amphibious assault; T.E. Lawrence and Arab Revolt (1916-18); promises like the **Sykes-Picot Agreement (1916)** carving up Ottoman lands.\n- **Africa** — German colonies fought over; African porters and soldiers conscripted.\n- **Naval** — German U-boats vs. British surface fleet; Battle of Jutland (1916) inconclusive.\n\n**Industrial weapons**:\n- **Machine guns** dominated no man's land.\n- **Poison gas** (chlorine, mustard) introduced at Ypres 1915.\n- **Tanks** debuted at Somme (1916).\n- **Aircraft** for reconnaissance, dogfights, primitive bombing.\n- **Submarines** (U-boats) attacked merchant shipping.\n\n**Total war and home fronts**:\n- **Conscription** — millions of soldiers mobilized.\n- **Rationing** — food, fuel.\n- **Women's labor** — replacing men in factories, transit, offices.\n- **Propaganda** — government control of information.\n- **Civil liberties suspended** — Britain's Defence of the Realm Act, US Espionage Act 1917.\n\n**Colonial troops**:\n- ~1 million Indians served Britain; ~600,000 Africans + Algerians/Vietnamese served France; West Indians, Maori, Vietnamese, etc.\n- Colonial soldiers' service shaped post-war demands for self-determination.\n\n**US entry (April 1917)**:\n- German unrestricted submarine warfare (sinking *Lusitania* 1915, then resumed 1917) and **Zimmermann Telegram** (German offer to Mexico) brought US in.\n- US troops arrived in 1918, tipping balance.\n\n**End of war**:\n- German spring 1918 offensive failed; Allied counteroffensive pushed back.\n- Bulgaria, Ottoman, Austria-Hungary surrendered Sept-Oct 1918.\n- German Kaiser abdicated; **Armistice signed Nov 11, 1918**.\n- **~17 million dead** (military + civilian); **~20 million wounded**; plus **1918-19 Spanish flu** that killed ~50 million globally.",
    keyIdeas: [
      "Western Front: trench stalemate (Verdun, Somme, Passchendaele) — millions dead for negligible movement.",
      "Eastern Front: Russia collapsed (Brest-Litovsk 1918); Italy and Ottoman fronts also active.",
      "Industrial weapons: machine guns, poison gas, tanks, planes, U-boats.",
      "Total war: conscription, rationing, women in factories, propaganda, suspended civil liberties.",
      "Colonial troops (1M Indians, ~600K Africans + colonial soldiers) — service drove post-war anti-colonial demands.",
      "US entry (April 1917) tipped the balance; Armistice Nov 11, 1918; ~17M dead.",
    ],
    commonMistakes: [
      "Treating WWI as only a European war — it was global with African, Asian, and Pacific theaters.",
      "Forgetting colonial troops' contributions and the political consequences for empire.",
      "Confusing trench warfare characteristics — it was mostly stalemated despite massive casualties.",
    ],
  },
  "7.4": {
    id: "7.4",
    title: "The Economy in the Interwar Period",
    summary:
      "Post-WWI economic instability — German reparations, US Roaring Twenties, 1929 Crash, Great Depression — produced mass unemployment, deflation, and political polarization.",
    lesson:
      "**Treaty of Versailles (1919)** imposed heavy **reparations** on Germany ($33B, ~$400B today) — economists like **John Maynard Keynes** (*Economic Consequences of the Peace*, 1919) warned this would destabilize Europe.\n\n**1920s — uneven recovery**:\n- **US 'Roaring Twenties'** — strongest economy in history at the time; consumer credit, stock speculation, automobile boom.\n- **German hyperinflation (1923)** — Reichsmark collapsed (4.2 trillion marks per US dollar at peak); wiped out middle-class savings; political radicalization (Hitler's Beer Hall Putsch 1923).\n- **Dawes Plan (1924)** and **Young Plan (1929)** rescheduled German reparations using US loans.\n- **France/Britain** — uneven; Britain's industries (coal, textiles) failed to recover.\n- **USSR — NEP (1921-28)** allowed limited private agriculture; replaced by Stalin's **Five-Year Plans (1928+)** — forced collectivization, rapid industrialization.\n- **Latin America** — boom from US investment; commodity export dependence vulnerable to price collapse.\n\n**Great Depression (1929-39)**:\n- **Wall Street Crash (Oct 1929)** triggered global collapse.\n- US bank failures (~9,000 banks); industrial production halved by 1933.\n- **Smoot-Hawley Tariff (1930)** raised US tariffs and global trade collapsed by ~65% by 1932.\n- Unemployment: US peaked at 25% (1933); Germany 30%; UK 22%.\n- Worldwide, governments fell, currencies abandoned the gold standard.\n\n**Political consequences**:\n- **US: New Deal** (FDR 1933+) — public works, banking reform, Social Security (1935).\n- **Germany: Nazi rise** — Hitler chancellor January 1933; promised jobs, restored national pride.\n- **UK: National Government** under MacDonald.\n- **France: Popular Front** (Léon Blum 1936) — leftist coalition, then collapsed.\n- **USSR — relatively insulated** because of state-controlled economy; appeared to many as Western alternative.\n- **Latin America** — populist nationalists (Cárdenas in Mexico, Vargas in Brazil) emerged.\n\n**Keynes vs. orthodoxy**:\n- **Keynes** (*General Theory*, 1936) argued for government deficit spending in downturns.\n- Most governments only adopted Keynesian remedies during/after WWII (which itself ended the Depression).",
    keyIdeas: [
      "Versailles reparations destabilized Germany; Keynes warned in 1919.",
      "1920s: US Roaring Twenties; German hyperinflation 1923; rescheduled by Dawes (1924) and Young (1929) Plans.",
      "Wall Street Crash Oct 1929 → Great Depression: ~25% US unemployment, world trade collapsed 65%.",
      "Smoot-Hawley Tariff (1930) deepened collapse.",
      "Political consequences: FDR New Deal, Hitler chancellor Jan 1933, USSR appeared insulated.",
      "Keynes (1936) advocated deficit spending — adopted broadly only after WWII.",
    ],
    commonMistakes: [
      "Saying Versailles 'caused' Hitler — it set conditions; Hitler still required Depression and political opportunity.",
      "Forgetting that the Depression was GLOBAL, not just American.",
      "Treating the New Deal as Keynesian — it was eclectic and only partly Keynesian; full Keynesian fiscal policy came with WWII.",
    ],
  },
  "7.5": {
    id: "7.5",
    title: "Unresolved Tensions After World War I",
    summary:
      "Versailles imposed harsh terms on Germany; League of Nations was weak; mandates replaced Ottoman/German colonies; Wilson's self-determination did not extend to colonized peoples — setting stage for WWII.",
    lesson:
      "**Treaty of Versailles (June 1919)** — punishments for Germany:\n- **Article 231 (War Guilt Clause)** — Germany accepted sole responsibility.\n- **Reparations** — $33B (covered in 7.4).\n- **Territorial losses** — Alsace-Lorraine to France; Polish Corridor; loss of all colonies.\n- **Military restrictions** — army limited to 100,000; no air force, submarines, tanks; demilitarized Rhineland.\n- Germans regarded the treaty as humiliating *Diktat*.\n\n**Other treaties**:\n- **Treaty of Saint-Germain (1919)** with Austria — broken into Austria, Hungary, Czechoslovakia, Yugoslavia.\n- **Treaty of Trianon (1920)** with Hungary — lost 2/3 of territory.\n- **Treaty of Sèvres (1920)** with Ottoman — partitioned; nationalist resistance under **Mustafa Kemal Atatürk** revoked it via **Treaty of Lausanne (1923)** establishing the Turkish Republic (1923) — capital moved to Ankara, secularization, Latin alphabet, women's suffrage 1934.\n\n**League of Nations (1920)**:\n- Wilson's brainchild — but US Senate rejected membership (isolationist Senate, Lodge).\n- Without US, USSR (initially), or Germany (initially), League was weak.\n- Failed to prevent Italian invasion of Ethiopia (1935), Japanese invasion of Manchuria (1931), German rearmament.\n\n**Mandate system**:\n- League gave former Ottoman territories (Iraq, Syria, Lebanon, Palestine, Transjordan) and former German colonies (Tanganyika, Cameroon, SW Africa, Pacific islands) as 'mandates' to victor powers — colonial rule with veneer of trusteeship.\n- **Sykes-Picot Agreement (1916)** had already secretly carved up Arab lands between Britain and France, contradicting promises to Arabs (McMahon-Hussein Correspondence).\n- **Balfour Declaration (1917)** committed Britain to a Jewish national home in Palestine — set up Israeli-Palestinian conflict.\n\n**Self-determination's limits**:\n- Wilson's Fourteen Points promised self-determination — applied to European nationalities but NOT colonized Asians and Africans.\n- **Vietnamese leader Ho Chi Minh** appeared at Versailles seeking Vietnamese independence; was ignored.\n- Pan-Africanist W.E.B. Du Bois organized Pan-African Congress (1919) in Paris; ignored.\n- **May Fourth Movement (China 1919)** — Chinese intellectuals enraged that Versailles handed German concessions in Shandong to Japan, not back to China — birthed Chinese nationalism + Communist Party (1921).\n\n**Disarmament efforts**:\n- **Washington Naval Conference (1921-22)** capped battleship construction.\n- **Kellogg-Briand Pact (1928)** — 62 nations 'renounced war.'\n- Both proved largely symbolic when crisis came.\n\n**Setting the stage for WWII**:\n- German revanchism, weakened League, unresolved colonial tensions, economic depression, and rising fascism would converge by the late 1930s.",
    keyIdeas: [
      "Versailles: War Guilt, reparations, territorial loss, military limits — Germans called it Diktat.",
      "Ottoman partition (Sèvres 1920) revoked by Atatürk's Turkish Republic (Lausanne 1923).",
      "League of Nations weak (no US); failed to stop Manchuria (1931), Ethiopia (1935).",
      "Mandate system: colonial rule with trusteeship veneer (Iraq, Syria, Palestine, Tanganyika).",
      "Self-determination NOT extended to colonized — Ho Chi Minh, Du Bois, May 4 Movement (1919).",
      "Sykes-Picot (1916) and Balfour Declaration (1917) seeded Middle East conflicts.",
    ],
    commonMistakes: [
      "Saying the US joined the League of Nations — it did NOT (Senate rejected).",
      "Forgetting Atatürk's Turkey — successful nationalist revision of Sèvres.",
      "Treating self-determination as universal — it explicitly excluded colonized peoples.",
    ],
  },
  "7.6": {
    id: "7.6",
    title: "Causes of World War II",
    summary:
      "Fascism (Mussolini, Hitler), Japanese militarism, Great Depression, failed appeasement, and unresolved WWI grievances led to WWII.",
    lesson:
      "**Rise of fascism**:\n- **Italy: Mussolini** — March on Rome (1922) brought him to power; built first fascist state — single party, corporatist economy, glorification of state and leader, suppression of opposition.\n- **Germany: Hitler** — Beer Hall Putsch (1923) failed; *Mein Kampf* (1925) outlined antisemitism, Lebensraum, Aryan supremacy. Depression (1930-33) made Nazi Party second-largest in 1932 elections; Hindenburg appointed Hitler Chancellor January 1933. **Reichstag Fire (Feb 1933)** → Enabling Act → dictatorship. Nuremberg Laws (1935) stripped Jews of citizenship.\n- **Spain: Civil War (1936-39)** — Nationalist (Franco, supported by Germany/Italy) vs. Republican (loyalist, supported by USSR + International Brigades). Franco won 1939 — Spain stayed neutral but fascist.\n- **Japan: militarist takeover** — civilian governments weakened by Depression; **Manchurian Incident (1931)** — army staged Mukden bombing as pretext for invading Manchuria; League condemnation led to Japan leaving League (1933). Full invasion of China (1937 — **Marco Polo Bridge Incident**); **Rape of Nanjing (Dec 1937)** killed ~200,000-300,000.\n\n**Hitler's expansion**:\n- **Rearmament** (1935 — open repudiation of Versailles).\n- **Reoccupation of Rhineland** (1936).\n- **Anschluss with Austria** (March 1938).\n- **Sudetenland** annexation (Oct 1938) — **Munich Agreement** as Britain (Chamberlain) and France appeased.\n- **Czechoslovakia dismembered** (March 1939) — appeasement collapsed.\n- **Molotov-Ribbentrop Pact (Aug 1939)** — Hitler-Stalin nonaggression with secret protocols dividing Eastern Europe.\n- **Sept 1, 1939** — Germany invaded Poland; Britain/France declared war Sept 3.\n\n**Why appeasement failed**:\n- Britain/France wanted to avoid another WWI; misjudged Hitler's ambitions.\n- USSR, excluded from Munich, signed pact with Germany.\n- Each Hitler success emboldened the next.\n\n**Pacific war origins**:\n- Japanese invasion of China (1937) escalated.\n- US embargoed oil and steel to Japan (1940-41) over China.\n- Japan attacked **Pearl Harbor (Dec 7, 1941)** to disable US Pacific Fleet while seizing SE Asian oil/rubber.\n- Hitler declared war on US (Dec 11) — globalizing the war.\n\n**Underlying causes**:\n- Unresolved WWI grievances (Versailles).\n- Great Depression delegitimized liberal democracies.\n- Failed collective security (League).\n- Ideological dynamism of fascism.\n- Industrial-military capacity of Germany, Japan.",
    keyIdeas: [
      "Fascism: Mussolini (1922), Hitler (1933), Franco (1939). Single party, leader cult, corporatism, suppression.",
      "Japan: Manchurian Incident (1931), full invasion of China (1937), Nanjing (1937).",
      "Hitler: rearm (1935), Rhineland (1936), Anschluss (1938), Sudetenland-Munich (Sept 1938), Czech (March 1939).",
      "Molotov-Ribbentrop Pact (Aug 1939) divided E. Europe; Sept 1, 1939 invasion of Poland → war.",
      "Appeasement failed; Pearl Harbor (Dec 7, 1941) brought US in; Hitler declared war on US Dec 11.",
    ],
    commonMistakes: [
      "Treating Hitler as a unique cause — fascism rose across Europe and militarism in Japan.",
      "Forgetting that Japan's war in Asia (1937) PREDATES European war (1939).",
      "Confusing appeasement with isolationism — appeasement is active concession; isolationism is non-engagement.",
    ],
  },
  "7.7": {
    id: "7.7",
    title: "Conducting World War II",
    summary:
      "WWII mobilized total war on a global scale: Allied victories at Stalingrad, Midway, El Alamein turned tide; D-Day (1944) and atomic bombs (1945) ended it; ~70 million dead.",
    lesson:
      "**Major theaters and turning points**:\n\n**European Theater**:\n- **Blitzkrieg** — German invasions of Poland (1939), Denmark/Norway (April 1940), Low Countries/France (May-June 1940), Yugoslavia/Greece (1941). France fell in 6 weeks.\n- **Battle of Britain (July-Oct 1940)** — RAF defeated Luftwaffe; Britain held alone (with Empire and US Lend-Lease).\n- **Operation Barbarossa (June 22, 1941)** — Hitler invaded USSR; largest invasion in history.\n- **Stalingrad (Aug 1942-Feb 1943)** — Soviet victory destroyed German 6th Army; turning point.\n- **El Alamein (Oct-Nov 1942)** — British defeated Rommel in N. Africa.\n- **D-Day (June 6, 1944)** — Allied landing at Normandy.\n- **Battle of the Bulge (Dec 1944-Jan 1945)** — last German offensive.\n- **Berlin (April-May 1945)** — Soviet capture; Hitler suicide April 30; **VE Day May 8, 1945**.\n\n**Pacific Theater**:\n- Japanese rapid expansion 1941-42 — Philippines, Malaya, Singapore (Feb 1942 fall a stunning British defeat), Dutch East Indies, Burma.\n- **Battle of Midway (June 1942)** — US carriers destroyed 4 Japanese carriers; turning point.\n- **Island-hopping** strategy under Nimitz/MacArthur — Guadalcanal (1942-43), Iwo Jima (1945), Okinawa (1945).\n- **Atomic bombs**: **Hiroshima Aug 6**, **Nagasaki Aug 9, 1945**.\n- **Japanese surrender Aug 15, 1945**; formal **VJ Day Sept 2, 1945** (USS Missouri).\n\n**Total war**:\n- All Allied and Axis economies mobilized for war production.\n- Women in factories (US 'Rosie the Riveter,' Soviet women on front lines, British women in Land Army).\n- Strategic bombing of cities — Dresden, Tokyo (more deaths than Hiroshima from firebombing), Coventry, Hamburg.\n- Rationing, propaganda, civil-liberty restrictions.\n- US Japanese-American internment (1942-46).\n\n**Colonial troops**:\n- ~2.5 million Indians served Britain.\n- ~1 million Africans (British, French colonies).\n- Free French forces drew heavily on West/North African colonies.\n- Caribbean, Australian, NZ, Canadian troops served.\n\n**Wartime conferences**:\n- **Atlantic Charter (1941)** — FDR/Churchill principles for postwar.\n- **Tehran (1943)** — FDR/Churchill/Stalin coordinated strategy.\n- **Yalta (Feb 1945)** — divided postwar Europe; UN agreed.\n- **Potsdam (July-Aug 1945)** — Truman/Churchill (then Attlee)/Stalin; Cold War tensions emerging.\n\n**Casualties**:\n- ~70-85 million dead (military + civilian).\n- USSR: ~27 million.\n- China: ~15-20 million.\n- Germany: ~7 million.\n- Poland: ~6 million (3M Polish Jews + 3M ethnic Poles).\n- Japan: ~3 million.\n- US: ~420,000.",
    keyIdeas: [
      "European turning points: Battle of Britain (1940), Stalingrad (1942-43), El Alamein (1942), D-Day (June 6, 1944), Berlin (May 1945).",
      "Pacific turning points: Midway (June 1942), island-hopping; Hiroshima/Nagasaki (Aug 1945).",
      "Total war mobilized economies, women workers, strategic bombing of cities.",
      "Colonial troops: 2.5M Indians + 1M+ Africans + Caribbean, ANZAC, Canadian fought for Allies.",
      "Yalta (Feb 1945) and Potsdam (July-Aug 1945) shaped postwar order; Cold War emerging.",
      "~70-85M dead; USSR ~27M, China ~15-20M.",
    ],
    commonMistakes: [
      "Forgetting USSR's central role and 27M dead — Eastern Front was the largest theater.",
      "Treating Pacific war as separate — it was one global war from 1941.",
      "Underestimating Tokyo firebombing — killed more than Hiroshima.",
    ],
  },
  "7.8": {
    id: "7.8",
    title: "Mass Atrocities After 1900",
    summary:
      "20th-century industrialized states perpetrated mass atrocities: Armenian Genocide (1915-23), Holocaust (1941-45), Rape of Nanjing (1937), Cambodian (1975-79), Rwandan (1994), Bosnian (1992-95).",
    lesson:
      "Industrial-state capacity for organized killing produced unprecedented atrocities.\n\n**Armenian Genocide (1915-23)**:\n- During WWI, Ottoman Young Turk government ordered deportation and massacre of Armenian Christians in eastern Anatolia.\n- ~1-1.5 million Armenians killed via massacres, death marches, starvation.\n- Pattern of dehumanization → forced removal → killing — became template recognized by later scholars.\n- Turkey continues to dispute the 'genocide' label.\n\n**Stalinist purges and Holodomor (1932-33, 1937-38)**:\n- **Holodomor** — Stalin's collectivization-driven famine in Ukraine killed ~3.5-7.5 million.\n- **Great Purge (1937-38)** — political terror killed ~700,000+; ~1 million more sent to Gulag.\n- **Gulag** system held millions over decades; 1-2 million estimated dead.\n\n**Rape of Nanjing (Dec 1937-Jan 1938)**:\n- Japanese army's mass rape and killing in captured Chinese capital — ~200,000-300,000 killed; estimated 20,000-80,000 women raped.\n\n**The Holocaust (1941-1945)**:\n- Nazi Germany systematically murdered ~6 million Jews — about 2/3 of European Jewry.\n- Also killed: ~250,000+ Roma, ~250,000 disabled, ~3 million Soviet POWs, Polish elites, gay men, Jehovah's Witnesses, political dissidents.\n- **Stages**:\n  1. **Discrimination** — Nuremberg Laws (1935) stripped Jewish citizenship.\n  2. **Ghettoization** — Polish Jews forced into Warsaw, Łódź, Krakow ghettos.\n  3. **Mobile killing units (Einsatzgruppen)** — followed German army into USSR, mass-shot ~1.5M Jews (Babi Yar, Sept 1941).\n  4. **Death camps** — **Wannsee Conference (Jan 1942)** coordinated 'Final Solution.' Auschwitz-Birkenau, Treblinka, Sobibor, Belzec used gas chambers; Auschwitz killed ~1.1M.\n- The Holocaust used industrial methods (rail, gas, bureaucracy) at unprecedented scale.\n\n**Postwar**:\n- **Nuremberg Trials (1945-46)** — Nazi leaders tried for crimes against humanity; new legal framework.\n- **UN Genocide Convention (1948)** — defined and outlawed genocide.\n- Term 'genocide' coined by **Raphael Lemkin (1944)**.\n\n**Postwar atrocities**:\n- **Cambodian Genocide (1975-79)** — Khmer Rouge under Pol Pot killed ~1.5-2 million in agrarian utopia ideology.\n- **Bosnian War (1992-95)** — Serb forces killed ~8,000 Bosniak men/boys at **Srebrenica (July 1995)** in worst European massacre since WWII; ethnic cleansing widespread.\n- **Rwandan Genocide (April-July 1994)** — Hutu extremists killed ~800,000 Tutsis and moderate Hutus in 100 days, mostly with machetes.\n- **Darfur (2003+)** — Sudanese government and Janjaweed attacks on non-Arab Darfuris.\n\n**Patterns**:\n- Modern bureaucracy + propaganda + dehumanization + technology = industrial-scale killing.\n- International community often slow to intervene (Rwanda 1994 a notorious failure).",
    keyIdeas: [
      "Armenian Genocide (1915-23) — ~1-1.5M Armenians killed by Ottomans during WWI.",
      "Holodomor (1932-33) Ukrainian famine; Stalin's Great Purge (1937-38).",
      "Rape of Nanjing (Dec 1937) — Japanese atrocity in captured Chinese capital.",
      "Holocaust (1941-45): ~6M Jews murdered; industrial death camps after Wannsee (1942).",
      "Genocide Convention (1948); Lemkin coined 'genocide.'",
      "Postwar atrocities: Cambodia (1975-79), Bosnia (Srebrenica 1995), Rwanda (1994).",
    ],
    commonMistakes: [
      "Treating the Holocaust as the only genocide — Armenian, Cambodian, Rwandan, Bosnian also fit.",
      "Forgetting Holodomor as a deliberate famine.",
      "Underestimating Holocaust scale — ~6M Jews + millions of other victims.",
    ],
  },
  "7.9": {
    id: "7.9",
    title: "Causation in Global Conflict",
    summary:
      "20th-c. global conflicts (WWI, WWII, Cold War proxy wars) shared causes — industrial military power, ideological extremism, nationalism, imperial competition — but each had distinct triggers and dynamics.",
    lesson:
      "Causation-synthesis topic for the unit.\n\n**Common causes of 20th-c. conflicts**:\n- **Industrial military capacity** — mass-produced weapons (machine gun, plane, tank, atomic bomb) made wars deadlier.\n- **Nationalism** — both classical (German, Italian, Japanese, Serbian) and ethnic (Hutu/Tutsi).\n- **Ideologies** — fascism, communism, anti-colonialism.\n- **Imperial rivalry** — pre-WWI European; post-WWII Cold War (US vs. USSR).\n- **Economic instability** — Great Depression delegitimized democracies and helped fascism.\n- **Failed international institutions** — League of Nations (interwar); often weak UN responses.\n\n**Distinct features**:\n- **WWI**: alliance system + mobilization plans + Balkan crisis turned local trigger into general war.\n- **WWII**: revisionist powers (Germany, Italy, Japan) + appeasement + Depression.\n- **Cold War proxy wars** (Korea, Vietnam, Angola, Afghanistan): superpower ideological competition fought via local clients (Unit 8).\n- **Post-1991 conflicts** (Yugoslavia, Rwanda, Iraq, Syria): often driven by ethnonationalism and state collapse rather than great-power confrontation (Unit 8/9).\n\n**Effects of 20th-c. conflicts**:\n- ~70-100 million dead in WWI + WWII alone.\n- Decolonization accelerated (WWI sparked Indian/African nationalism; WWII shattered European empires).\n- New international institutions (League → UN; IMF, World Bank).\n- Cold War bipolar order replaced multipolar European order.\n- Rise of US and USSR; later China.\n- Mass forced migrations (Partition of India 1947 ~15M; postwar European displacement).\n\n**Continuities**:\n- War remained common; total wars largely replaced by limited/proxy/civil wars.\n- Patriarchy, hierarchy, nationalism persisted even after their excesses.\n\n**LEQ framing**: 'evaluate the causes of WWI / WWII / Cold War' essays should weigh long-term structural causes against immediate triggers, and consider the role of contingency.",
    keyIdeas: [
      "Common causes: industrial military, nationalism, ideologies, imperial rivalry, economic instability.",
      "WWI: alliance + mobilization + Balkans; WWII: revisionist powers + appeasement + Depression.",
      "Cold War proxy wars; post-1991 ethnonational and state-collapse conflicts.",
      "Effects: ~70-100M dead; decolonization accelerated; UN/IMF/World Bank; bipolar then multipolar.",
      "Mass migrations: Partition of India 1947 ~15M; postwar European displacement.",
    ],
    commonMistakes: [
      "Treating wars as purely one-cause events — multi-causal analysis is essential.",
      "Forgetting that decolonization was an indirect EFFECT of European wars weakening empires.",
      "Listing wars without comparing — strong essays compare and contrast causes across conflicts.",
    ],
    workedExample: {
      prompt:
        "Compare the causes of World War I and World War II.",
      solution:
        "Both wars arose from industrial-military capacity, nationalism, alliance systems, and imperial competition, but their triggers and ideological character differed sharply. WWI grew from Balkan instability, an Anglo-German naval race, and rigid mobilization plans; the Sarajevo assassination cascaded through alliances into general war within a week. WWII was driven by ideologically revisionist powers — Nazi Germany, fascist Italy, militarist Japan — that explicitly sought to overturn the post-WWI Versailles order. The Great Depression delegitimized liberal democracies and enabled fascist rise; appeasement at Munich (1938) accelerated rather than restrained Hitler. Both wars therefore had structural similarities (industrial capacity, nationalism), but WWI was triggered by miscalculation within an alliance system while WWII was driven by deliberate ideological aggression and democratic failure.",
    },
  },

  // =========================================================================
  // UNIT 8 — COLD WAR AND DECOLONIZATION (c. 1900-present)
  // =========================================================================
  "8.1": {
    id: "8.1",
    title: "Setting the Stage for the Cold War and Decolonization",
    summary:
      "WWII left two superpowers (US, USSR) with incompatible ideologies, devastated European empires unable to hold colonies, and a fractured Europe — setting the stage for Cold War bipolarity and decolonization.",
    lesson:
      "**WWII's geopolitical legacy**:\n- **Two superpowers**: US (sole nuclear power 1945-49; largest economy; intact homeland) and USSR (largest army; Eastern European occupation; massive war losses).\n- European powers (Britain, France, Germany) economically devastated.\n- Japan occupied by US; Germany divided into 4 occupation zones.\n- Atomic bombs (Aug 1945) opened nuclear age.\n\n**Wartime conferences shaped postwar order**:\n- **Yalta (Feb 1945)** — agreed UN, Allied control of Germany, free Polish elections (which Stalin then ignored).\n- **Potsdam (July-Aug 1945)** — Truman/Stalin tensions over Eastern Europe and atomic bomb.\n\n**Ideological divide**:\n- US: liberal democracy, capitalism, market economies, Atlantic Charter principles.\n- USSR: communism, single-party rule, planned economy, security buffer zone in Eastern Europe.\n- Each saw the other as an existential threat.\n\n**Iron Curtain**:\n- **Churchill's 1946 Fulton, MO speech** — 'an iron curtain has descended across the Continent' from Stettin to Trieste.\n- Soviet Eastern European satellites: Poland, East Germany, Czechoslovakia, Hungary, Romania, Bulgaria, Albania (until 1961 split with USSR), Yugoslavia (Tito; broke from Stalin 1948).\n\n**United Nations (founded 1945)**:\n- Security Council with 5 permanent members (US, USSR, UK, France, China — initially Republic, then PRC after 1971) with veto.\n- General Assembly with all member states.\n- Various agencies (WHO, UNESCO, UNICEF).\n- More effective than League — but Cold War vetoes paralyzed major decisions.\n\n**Bretton Woods system (1944)**:\n- Created **IMF** (currency stabilization) and **World Bank** (reconstruction lending).\n- Established US dollar (gold-backed) as global reserve currency.\n- **GATT (1947)** for trade liberalization (replaced 1995 by WTO).\n\n**Decolonization pressure**:\n- WWII destroyed European prestige (Singapore fell to Japan 1942, dispelling 'invincible' British rule).\n- Colonial troops who fought for Allies returned with raised expectations.\n- US (officially anti-colonial; though Cold War complicated this) and USSR both supported anti-colonial movements rhetorically.\n- Indian National Congress and African nationalists ready to push.\n\n**Marshall Plan (1947) and economic reconstruction** previewed in 8.2.",
    keyIdeas: [
      "WWII left US and USSR as superpowers; European empires economically devastated.",
      "Yalta (Feb 1945) and Potsdam (July-Aug 1945) shaped postwar; Stalin took Eastern Europe.",
      "Iron Curtain (Churchill 1946); Soviet satellites in Eastern Europe.",
      "UN founded 1945 with Security Council veto; more effective than League but limited by Cold War.",
      "Bretton Woods (1944) created IMF, World Bank, dollar reserve, GATT (1947).",
      "WWII destroyed European prestige; colonial troops + nationalist movements primed for decolonization.",
    ],
    commonMistakes: [
      "Treating Cold War as inevitable — wartime cooperation collapsed but US/USSR briefly worked together.",
      "Forgetting Bretton Woods institutions still shape global finance today.",
      "Confusing the Iron Curtain (metaphor for Cold War divide) with the Berlin Wall (1961 physical wall).",
    ],
  },
  "8.2": {
    id: "8.2",
    title: "The Cold War",
    summary:
      "1945-1991 bipolar conflict between US-led capitalist West and Soviet-led communist East — fought through proxy wars, arms races, and ideological competition rather than direct combat.",
    lesson:
      "**Origins (1945-49)**:\n- Stalin imposed communist regimes in Eastern Europe; US/UK objected.\n- **Truman Doctrine (March 1947)** — US would aid free peoples resisting subjugation; supported Greece/Turkey.\n- **Marshall Plan (1948-52)** — $13B (~$165B today) to rebuild Western Europe; tied recipients to US economy and away from communism.\n- **Berlin Blockade (1948-49)** — Stalin cut access to Western Berlin; US/UK/France airlifted supplies for ~11 months.\n- **NATO (1949)** — US-led military alliance; **Warsaw Pact (1955)** — Soviet response.\n- **Communist victory in China (1949)** — Mao defeated Chiang Kai-shek; PRC founded; CKS retreated to Taiwan.\n- **USSR atomic bomb (1949)** ended US nuclear monopoly.\n\n**Korean War (1950-53)**:\n- **June 1950**: North Korea (communist, Kim Il-sung) invaded South Korea.\n- US-led UN forces (MacArthur) pushed back; Inchon landing (Sept 1950) → near-total reconquest of North.\n- Chinese intervention (Oct 1950) — drove UN back to roughly 38th parallel.\n- 1953 armistice (no peace treaty); Korea remains divided.\n- ~3 million Korean civilian + military dead.\n\n**Brinkmanship and arms race**:\n- US and USSR developed **hydrogen bombs** (1952, 1953).\n- **Mutual Assured Destruction (MAD)** doctrine — neither could attack without total destruction.\n- **Sputnik (1957)** — first artificial satellite; shocked the West; **Space Race** to moon (US Apollo 11, July 1969).\n- **U-2 incident (1960)** — US spy plane shot down over USSR.\n\n**Cuban Missile Crisis (Oct 1962)**:\n- USSR placed nuclear missiles in Cuba (in response to US missiles in Turkey + Bay of Pigs invasion 1961).\n- 13-day standoff between Kennedy and Khrushchev.\n- Resolved: USSR withdrew Cuba missiles; US secretly removed Turkey missiles.\n- Closest the world came to nuclear war.\n- Led to direct hotline between Washington and Moscow; partial test ban treaty (1963).\n\n**Vietnam War (1955-75)**:\n- French defeated by Vietminh at **Dien Bien Phu (1954)**; Vietnam partitioned at 17th parallel.\n- US support escalated under Kennedy; Tonkin Gulf Resolution (1964) under Johnson; ~500,000 US troops by 1968.\n- **Tet Offensive (Jan 1968)** shifted US opinion.\n- Nixon **Vietnamization** + bombing of Cambodia (1969-70).\n- **Paris Peace Accords (1973)** US withdrew; **Saigon fell April 30, 1975**.\n- ~3 million Vietnamese + 58,000 US dead.\n\n**Détente (1969-79)**:\n- **Nixon's visit to China (Feb 1972)** — opened US-PRC relations, exploiting Sino-Soviet split.\n- **SALT I (1972)** and **SALT II (1979)** arms-limitation treaties.\n- **Helsinki Accords (1975)** — recognition of European borders + human rights commitments.\n\n**Soviet invasion of Afghanistan (1979-89)**:\n- USSR invaded to support communist government.\n- US (CIA) funded mujahideen guerrillas (including Osama bin Laden's network).\n- USSR's 'Vietnam' — withdrew 1989 in defeat; helped collapse Soviet system.\n\n**Reagan and 'Second Cold War' (1980s)**:\n- Reagan called USSR 'Evil Empire' (1983); accelerated arms buildup; Strategic Defense Initiative ('Star Wars') 1983.\n- USSR economy strained; **Gorbachev** (1985) introduced **glasnost** (openness) and **perestroika** (restructuring).\n\n**End of Cold War (1989-91)** — covered fully in 8.8.",
    keyIdeas: [
      "Truman Doctrine (1947), Marshall Plan ($13B), Berlin Airlift (1948-49), NATO (1949), Warsaw Pact (1955).",
      "Communist China (1949) + USSR bomb (1949) shaped early Cold War.",
      "Korean War (1950-53) ended in stalemate at 38th parallel; ~3M dead.",
      "Cuban Missile Crisis (Oct 1962) — closest to nuclear war.",
      "Vietnam War (1955-75): Dien Bien Phu (1954), Tet (1968), Saigon fall (1975); ~3M Vietnamese + 58K US dead.",
      "Détente: Nixon-China (1972), SALT, Helsinki (1975); broken by Soviet invasion of Afghanistan (1979).",
      "Reagan buildup; Gorbachev's glasnost/perestroika set up Cold War's end.",
    ],
    commonMistakes: [
      "Treating Cold War as direct US-USSR combat — they fought via PROXY wars (Korea, Vietnam, Afghanistan, Angola).",
      "Forgetting Sino-Soviet split (1960s) and Nixon's exploitation of it.",
      "Confusing NATO (US-led, 1949) with Warsaw Pact (Soviet-led, 1955).",
    ],
  },
  "8.3": {
    id: "8.3",
    title: "Effects of the Cold War",
    summary:
      "Cold War shaped third-world proxy wars (Korea, Vietnam, Angola, Afghanistan), Non-Aligned Movement, military-industrial complexes, space race, and pervasive intelligence/security states.",
    lesson:
      "**Proxy wars in the Global South**:\n- **Korea, Vietnam, Afghanistan** (covered in 8.2).\n- **Angola/Mozambique civil wars** (1975-92) — MPLA (Soviet/Cuban-backed) vs. UNITA (US/South African-backed).\n- **Nicaragua** (1979-90) — Sandinistas (left) vs. Contras (US-backed); Iran-Contra scandal (1986-87).\n- **El Salvador, Guatemala** civil wars (US-backed governments vs. left-wing guerrillas).\n- **Ethiopia/Somalia Ogaden War** (1977-78).\n- These conflicts ravaged decolonizing societies — proxy framing prolonged conflicts that might have ended sooner.\n\n**Non-Aligned Movement (NAM, founded 1961)**:\n- **Bandung Conference (1955, Indonesia)** brought together Asian-African states (Nehru, Sukarno, Nasser, Zhou Enlai, Tito).\n- Formal NAM founded at Belgrade 1961 (Tito, Nehru, Nasser, Nkrumah, Sukarno).\n- Sought independence from both blocs; promoted decolonization, development, peaceful coexistence.\n- Limited practical leverage but morally influential.\n\n**Arms race and MAD**:\n- US/USSR each accumulated tens of thousands of nuclear warheads at peak.\n- Hair-trigger alert; 1983 incidents (Stanislav Petrov; Able Archer) brought close to accidental war.\n- **Nuclear Non-Proliferation Treaty (1968)** sought to limit further nuclear states.\n\n**Space race**:\n- Sputnik (1957), Yuri Gagarin first human in space (1961), Apollo 11 Moon landing (July 1969).\n- Spinoff technologies (computing, materials science, communications satellites).\n\n**Domestic effects in US/USSR**:\n- Massive **military-industrial complex** — Eisenhower's 1961 farewell warning.\n- Intelligence agencies (CIA, KGB) operated globally; covert interventions in Iran (1953 Mossadegh overthrow), Guatemala (1954 Arbenz overthrow), Chile (1973 Allende overthrow).\n- US **McCarthyism** (1950-54) — witch hunt for communists in government, media, academia.\n- USSR maintained pervasive secret police (KGB).\n- Political tests (loyalty oaths in US; party membership in USSR).\n\n**Cultural Cold War**:\n- US cultural exports (jazz, Hollywood, Coca-Cola) and Voice of America vs. Soviet propaganda.\n- 1968 — wave of student protests across Western and Eastern bloc cities.\n- **Prague Spring (1968)** — Czech reform crushed by Warsaw Pact invasion.\n\n**Cold War effects on decolonization**:\n- Both superpowers supported decolonization rhetorically (US for markets; USSR for ideological allies).\n- BUT: when newly independent states leaned 'wrong,' superpowers intervened to overthrow them (Mossadegh 1953, Lumumba 1961, Allende 1973).\n- Cold War distorted the political economies of new states with arms, debt, and authoritarianism.\n\n**Intelligence and surveillance**:\n- Built infrastructure (NSA, KGB) and norms that have outlived the Cold War.",
    keyIdeas: [
      "Proxy wars: Korea, Vietnam, Angola, Afghanistan, Nicaragua, Ethiopia.",
      "Non-Aligned Movement (Bandung 1955, Belgrade 1961): Nehru, Nasser, Tito, Nkrumah; sought independence from blocs.",
      "Arms race + MAD; close calls (Cuba 1962, Able Archer 1983); NPT (1968).",
      "Space race: Sputnik (1957), Gagarin (1961), Apollo 11 (1969).",
      "Domestic: military-industrial complex, intelligence agencies, McCarthyism, KGB.",
      "Covert interventions: Iran (1953), Guatemala (1954), Chile (1973), Lumumba (1961).",
    ],
    commonMistakes: [
      "Forgetting NAM as a third path — many new states tried to avoid bloc alignment.",
      "Treating Cold War as just bipolar — Sino-Soviet split, NAM, and decolonization complicated it.",
      "Underestimating covert intervention's impact on Global South politics.",
    ],
  },
  "8.4": {
    id: "8.4",
    title: "Spread of Communism After 1900",
    summary:
      "Communism spread from USSR (1917) to Eastern Europe (1945+), China (1949), Vietnam (1954/75), Cuba (1959), Angola/Mozambique (1975) — adapting Marxism-Leninism to local conditions.",
    lesson:
      "**Russian/Soviet communism (1917+)**:\n- Lenin adapted Marx for an agrarian Russia: vanguard party leads workers; one-party state; planned economy.\n- **Stalin** (1924-53) — collectivization (1929+) destroyed kulak farmers; Five-Year Plans industrialized rapidly; gulag and purges; victory in WWII gave system enormous prestige.\n- **Khrushchev (1953-64)** — 'Secret Speech' (1956) denounced Stalin; **destalinization** but kept party rule; Cuban Missile Crisis.\n- **Brezhnev (1964-82)** — stagnation; Brezhnev Doctrine (1968) justified intervention to defend communism (Czechoslovakia).\n- **Gorbachev (1985-91)** — glasnost, perestroika; unintentionally collapsed the system (8.8).\n\n**Eastern European satellites (1945+)**:\n- Communist regimes installed in Poland, East Germany, Czechoslovakia, Hungary, Romania, Bulgaria, Albania.\n- Yugoslavia under **Tito** broke from Stalin (1948) — pursued non-aligned path with workers' self-management.\n- Resistance: **Hungarian Revolution (1956)** crushed by Soviet tanks; **Prague Spring (1968)** crushed; Polish **Solidarity** (1980) emerged.\n\n**Chinese communism**:\n- **Mao Zedong** founded PRC (Oct 1, 1949) after defeating Chiang Kai-shek's Nationalists in civil war (Long March 1934-35; resumed civil war 1946-49).\n- Adapted Marxism for peasant majority — peasant revolution rather than industrial workers.\n- **Land reform (1950s)** redistributed land from landlords to peasants.\n- **Great Leap Forward (1958-62)** — disastrous attempt at rapid industrialization through communes; famine killed ~30-45 million.\n- **Cultural Revolution (1966-76)** — Mao mobilized Red Guards against party 'capitalist roaders'; intellectuals persecuted; ~1 million killed.\n- **Deng Xiaoping (1978+)** — economic reform ('socialism with Chinese characteristics') — opened to markets while keeping CCP rule.\n\n**Vietnam**:\n- **Ho Chi Minh** declared Vietnamese independence in 1945 using American Declaration's words; French refused; First Indochina War (1946-54) ended with French defeat at Dien Bien Phu.\n- **Vietnam War (1955-75)** US fought to prevent South Vietnam falling to communism — failed.\n- Reunified under communist Hanoi 1976.\n\n**Cuba**:\n- **Fidel Castro and Che Guevara** overthrew US-backed Batista in **1959 Revolution**.\n- Allied with USSR after US Bay of Pigs (1961); state-led economy; literacy and healthcare advances; long-term economic stagnation.\n- Castro's regime survived USSR collapse.\n\n**African and Latin American communist/socialist states**:\n- **Angola (MPLA), Mozambique (FRELIMO), Ethiopia (Mengistu), Nicaragua (Sandinistas)** — variants of Marxism.\n- Most reformed or collapsed after Cold War's end.\n\n**Why communism's appeal**:\n- Promised rapid industrialization, anti-colonial liberation, social equity.\n- Offered model of state-led modernization different from capitalist West.\n- Shaped 20th-c. mass movements — for better and worse.",
    keyIdeas: [
      "Soviet model (1917+) became template; satellites in E. Europe (1945+).",
      "Mao's PRC (1949) adapted Marxism to peasantry; Great Leap Forward (1958-62) famine killed ~30-45M; Cultural Revolution (1966-76).",
      "Tito's Yugoslavia broke from Stalin (1948); Hungarian Revolution (1956), Prague Spring (1968) crushed.",
      "Vietnam (1945+ Ho Chi Minh; reunified 1976); Cuba (Castro 1959).",
      "Deng Xiaoping (1978+) reformed Chinese economy while keeping CCP rule.",
      "Angola, Mozambique, Ethiopia, Nicaragua adopted Marxist variants in 1970s-80s.",
    ],
    commonMistakes: [
      "Treating communism as monolithic — Soviet, Chinese, Yugoslav, Cuban variants differed deeply.",
      "Forgetting Great Leap Forward famine (1958-62) as one of history's deadliest.",
      "Confusing Mao's revolution (1949) with the 1911 republican revolution.",
    ],
  },
  "8.5": {
    id: "8.5",
    title: "Decolonization After 1900",
    summary:
      "Most colonized nations gained independence between 1945 and 1975 — through negotiation (India 1947, Ghana 1957), war (Vietnam, Algeria, Angola), or both — using nationalism, mass mobilization, and Cold War leverage.",
    lesson:
      "**Why decolonization accelerated post-WWII**:\n- WWII shattered European prestige and economic capacity.\n- Colonial troops returned with raised expectations.\n- US and USSR officially anti-colonial.\n- UN Charter (1945) endorsed self-determination.\n- Anti-colonial movements had matured during interwar period.\n\n**India (1947)** — defining decolonization case:\n- **Indian National Congress** (founded 1885) became mass party under **Mohandas K. Gandhi** (returned from S. Africa 1915).\n- Gandhi's **satyagraha** (truth-force, nonviolent resistance) — Salt March (1930), Quit India (1942).\n- **Muslim League** under **Muhammad Ali Jinnah** demanded separate Muslim state.\n- **Partition (Aug 1947)** — British divided into India (Hindu majority) and Pakistan (Muslim majority).\n- **~15 million displaced**, ~1-2 million dead in communal violence.\n- Pakistan's eastern wing seceded as **Bangladesh (1971)** after war.\n\n**African decolonization**:\n- **Ghana (1957)** under **Kwame Nkrumah** — first sub-Saharan African colony to gain independence; inspired others.\n- **'Year of Africa' (1960)** — 17 African countries became independent.\n- **Algerian War (1954-62)** — long, brutal war against French settler colony; ~500,000-1.5M dead; **Frantz Fanon** (*The Wretched of the Earth*, 1961) became theorist of decolonial violence.\n- **Kenya — Mau Mau Uprising (1952-60)** — Kikuyu-led insurgency against British; brutal British counterinsurgency; independence under Kenyatta 1963.\n- **Portuguese colonies (Angola, Mozambique, Guinea-Bissau)** — long wars 1961-74; independent after Portugal's 1974 Carnation Revolution.\n- **Zimbabwe (1980)** — after long Rhodesian Bush War.\n- **South African apartheid** (1948-94) — white minority rule; Nelson Mandela imprisoned 1962-90; majority rule 1994.\n\n**Southeast Asian decolonization**:\n- **Indonesia (1945-49)** — declared independence under **Sukarno** during Japanese surrender; Dutch resisted militarily; finally recognized 1949.\n- **Vietnam** — covered in 8.2.\n- **Philippines (1946)** — US granted promised independence after WWII.\n- **Malaysia (1957)**, **Singapore (1965)** — British departure with relatively smooth transition.\n\n**Middle East**:\n- **Israel (1948)** — Jewish state established under UN Partition; Arab-Israeli War 1948 displaced ~700,000 Palestinians (Nakba).\n- **Egypt** — Nasser's officers overthrew king (1952); nationalized **Suez Canal (1956)** → Suez Crisis with British/French/Israeli intervention forced back by US/Soviet pressure — symbolic moment of European imperial decline.\n- **Iran (1951-53)** — Mossadegh nationalized oil; CIA/MI6 coup restored Shah; long-term consequences for 1979 revolution.\n- **Algeria (1962)** — won war for independence.\n- **Saudi Arabia, Iraq, Syria, Jordan, Lebanon** — emerged from earlier mandates.\n\n**Methods of decolonization**:\n- Nonviolent: Gandhi (India), Nkrumah (Ghana).\n- Negotiated transition: most British colonies post-1957.\n- Armed struggle: Algeria, Vietnam, Angola, Mozambique, Kenya, Zimbabwe.\n- Often combinations.\n\n**Common challenges for new states**: borders drawn by colonizers; weak institutions; economic dependency; ethnic/religious tensions; Cold War interference.",
    keyIdeas: [
      "WWII weakened European empires; UN endorsed self-determination; anti-colonial movements ready.",
      "India 1947 (Gandhi's satyagraha; Partition displaced ~15M); Pakistan/Bangladesh 1971.",
      "Ghana 1957 (Nkrumah); 'Year of Africa' 1960 — 17 countries independent.",
      "Algerian War (1954-62), Mau Mau (1952-60), Portuguese colonial wars (1961-74) = armed struggles.",
      "Indonesia 1945/49 (Sukarno); Vietnam 1976; Israel 1948; Suez Crisis (1956) marked end of European Middle East dominance.",
    ],
    commonMistakes: [
      "Saying decolonization was peaceful — many colonies (Algeria, Vietnam, Angola, Kenya) won independence through war.",
      "Forgetting the Partition of India displaced ~15 million.",
      "Treating apartheid South Africa as decolonized — it was settler-rule until 1994.",
    ],
    workedExample: {
      prompt:
        "Compare the methods used in TWO independence movements between 1900 and 2001.",
      solution:
        "The Indian and Algerian independence movements both ended European colonial rule but used radically different methods. Gandhi's Indian National Congress used satyagraha — mass nonviolent civil disobedience including the 1930 Salt March and the 1942 Quit India movement — combined with sustained negotiation; the British transferred power in August 1947 (with the catastrophic Partition that followed). Algeria's National Liberation Front (FLN) waged a brutal armed struggle from 1954 to 1962 against French settler colonialism, using urban bombings (Battle of Algiers) and rural insurgency; France responded with widespread torture and reprisals before withdrawing. Both movements drew on nationalist and anti-colonial ideologies, but India's mass nonviolent movement contrasts with Algeria's armed liberation war — a difference shaped by the demographic balance (Algeria had a million European settlers; India did not) and the ideology of FLN leaders influenced by Frantz Fanon.",
    },
  },
  "8.6": {
    id: "8.6",
    title: "Newly Independent States",
    summary:
      "Post-colonial states faced inherited colonial borders, weak institutions, ethnic tensions, economic dependency, and Cold War pressure — producing diverse trajectories from democracy (India) to dictatorship (many).",
    lesson:
      "**Common challenges**:\n- **Colonial borders** ignored ethnic, religious, linguistic boundaries — often grouped rivals or split unities.\n- **Weak institutions** — colonial bureaucracies trained few locals for senior positions.\n- **Economic dependency** — extractive economies oriented to former metropole.\n- **Cold War pressure** — superpowers pulled new states toward alignment with arms, aid, conditional loans.\n- **Population growth** strained resources and budgets.\n\n**Different trajectories**:\n\n**India** — sustained parliamentary democracy (with one Emergency interruption 1975-77 under Indira Gandhi); large public sector with private market mix; nonalignment foreign policy; communal tensions remained (1984 anti-Sikh riots; 1992 Babri Masjid demolition; 2002 Gujarat riots).\n\n**Pakistan** — alternating military and civilian rule; Bangladesh secession 1971; nuclear weapons (1998).\n\n**Sub-Saharan Africa** — many states had military coups (Nigeria multiple times, Ghana 1966, Uganda Idi Amin 1971-79). One-party rule common (Tanzania under Nyerere; Zambia under Kaunda; Côte d'Ivoire under Houphouët-Boigny). Some democratic transitions in 1990s (South Africa 1994; Ghana, Senegal others).\n\n**Indonesia** — Sukarno's 'Guided Democracy' overthrown by Suharto's 1965 coup (with mass killing of 500,000+ alleged communists); Suharto 'New Order' rule 1967-98; democratization 1998.\n\n**Latin America** (politically independent earlier but economically/politically dependent):\n- Wave of military dictatorships during Cold War (Brazil 1964, Argentina 1976, Chile 1973 — Pinochet's coup against Allende).\n- 'Dirty Wars' — disappearances, torture (~30,000 disappeared in Argentina).\n- Democratic transitions in 1980s-90s.\n\n**Middle East**:\n- **Egypt's Nasser** (r.1956-70) — Pan-Arab nationalism; nationalized Suez 1956; defeated in Six-Day War 1967.\n- **Iran 1979 Revolution** — Shia clerical state under **Ayatollah Khomeini**; hostage crisis 1979-81.\n- **Iran-Iraq War (1980-88)** — devastating regional conflict.\n- **Israeli-Arab wars** — 1948, 1956, 1967 (Six-Day, Israel took West Bank, Gaza, Sinai, Golan), 1973 (Yom Kippur), 1982 (Lebanon).\n- **Palestinian movement** — PLO under Arafat; First Intifada (1987-93); Oslo Accords (1993).\n\n**Genocides in newly independent states**:\n- Cambodia (Khmer Rouge 1975-79) — covered in 7.8.\n- Rwanda (1994) — covered in 7.8.\n- Bosnia (1992-95) — covered in 7.8.\n\n**Economic strategies**:\n- **Import substitution industrialization (ISI)** — Latin America, India tried to substitute domestic production for imports; mixed results.\n- **Export-led growth** — 'Asian Tigers' (Hong Kong, Singapore, S. Korea, Taiwan) industrialized rapidly through manufactured exports; Japan's earlier example.\n- **State-led socialism** — USSR-aligned states.\n- **Structural adjustment** — IMF/World Bank loans (1980s+) required privatization, austerity in many post-colonial economies.\n\n**Migration**:\n- Decolonization triggered massive movement: Partition India (1947), expulsion of Asians from Uganda (1972), Vietnamese boat people (1975+), Indian/Pakistani Muslims to UK/Gulf, North Africans to France.",
    keyIdeas: [
      "Inherited colonial borders, weak institutions, economic dependency, Cold War pressure shaped post-colonial trajectories.",
      "Democracies (India), military rule (Latin American dirty wars), one-party rule (much of Africa).",
      "Iran 1979 Revolution; Iran-Iraq War (1980-88); Israeli-Arab wars (1948-1982); Palestinian movement.",
      "Asian Tigers (HK, Singapore, S. Korea, Taiwan) export-led industrialization vs. Latin American ISI.",
      "Structural adjustment programs (IMF, 1980s+) imposed austerity in indebted post-colonial economies.",
      "Migration: Partition India, Vietnamese boat people, Asian-Ugandan expulsion, post-colonial Britain/France.",
    ],
    commonMistakes: [
      "Treating post-colonial states as uniformly authoritarian — India sustained democracy throughout.",
      "Forgetting Cold War pressure as a major distorter of post-colonial politics.",
      "Confusing the Asian Tigers with all of Asia — they were specific export-led successes.",
    ],
  },
  "8.7": {
    id: "8.7",
    title: "Global Resistance to Established Power Structures After 1900",
    summary:
      "20th-c. movements challenged established power: civil rights, second-wave feminism, anti-apartheid, anti-Vietnam War, environmental movements, indigenous rights, LGBTQ+ rights.",
    lesson:
      "**Civil Rights Movement (US, 1950s-60s)**:\n- Built on earlier NAACP (1909) and Brown v. Board (1954).\n- **Montgomery Bus Boycott (1955-56)** triggered by Rosa Parks; King's leadership emerged.\n- **Civil Rights Act (1964)** banned discrimination in public accommodations and employment.\n- **Voting Rights Act (1965)** ended literacy tests and federal voting protection.\n- **Black Power** movement (Malcolm X, Stokely Carmichael, Black Panthers) pursued more radical aims.\n- **King assassinated 1968**.\n\n**Anti-apartheid movement (S. Africa, 1948-94)**:\n- ANC under Mandela (imprisoned 1962-90).\n- International **boycotts, divestment, sanctions** pressured Pretoria from 1980s.\n- 1990: de Klerk released Mandela, legalized ANC.\n- 1994: Mandela elected first majority-rule president.\n- **Truth and Reconciliation Commission (1995-2002)** under Tutu sought restorative justice.\n\n**Second-wave feminism (1960s-70s)**:\n- **Betty Friedan's *Feminine Mystique* (1963)** — critique of suburban middle-class confinement.\n- **National Organization for Women (NOW, 1966)**.\n- Reproductive rights — **Roe v. Wade (1973)** in US.\n- Equal pay, employment discrimination laws.\n- Globally — UN Decade for Women (1975-85); Beijing Conference (1995).\n\n**Anti-Vietnam War movement** — student protests, draft resistance, 1968 turning point in US politics.\n\n**1968 — global wave of protest**:\n- France: May 1968 student-worker general strike nearly toppled de Gaulle.\n- Czechoslovakia: Prague Spring crushed.\n- Mexico: Tlatelolco massacre.\n- US: Columbia, Chicago Democratic Convention.\n- Yugoslavia, Pakistan, Brazil, Japan.\n\n**Environmental movements**:\n- **Rachel Carson's *Silent Spring* (1962)** — DDT and pesticide critique.\n- **Earth Day (1970)** mobilized 20M+ Americans.\n- Greenpeace (1971), Sierra Club expanded.\n- **Climate change** science emerged in 1980s; Rio Earth Summit (1992); Kyoto Protocol (1997); Paris Agreement (2015).\n\n**Indigenous rights**:\n- US American Indian Movement (AIM, founded 1968); Wounded Knee occupation (1973).\n- New Zealand Maori revival.\n- Canadian Indigenous activism led to constitutional recognition (1982) and Truth and Reconciliation (2008-15).\n- **Bolivia: Evo Morales (2006)** — first Indigenous president.\n\n**LGBTQ+ rights**:\n- **Stonewall riots (1969)** in NYC catalyzed gay liberation movement.\n- Decriminalization of homosexuality across Western democracies (UK 1967, US Lawrence v. Texas 2003).\n- Marriage equality (Netherlands first 2001; US 2015 Obergefell).\n- Persecution continues in many countries.\n\n**Religious revivals as resistance**:\n- **Liberation theology** in Latin America (1960s-70s) — Catholic priests serving the poor.\n- **Iranian Revolution (1979)** — Shia clerical resistance to Western-aligned Shah.\n- Hindu nationalism in India (BJP rising from 1980s+).\n- Christian evangelical movements in US, Latin America, Africa.",
    keyIdeas: [
      "Civil Rights Movement: MLK, Civil Rights Act 1964, Voting Rights Act 1965; Black Power radicalism.",
      "Anti-apartheid: Mandela, international BDS pressure, 1994 majority rule, TRC.",
      "Second-wave feminism: Friedan, NOW, Roe v. Wade (1973), Beijing 1995.",
      "1968 = global protest wave — Paris, Prague, Mexico City, US.",
      "Environmental: Silent Spring (1962), Earth Day (1970), climate Paris Agreement (2015).",
      "LGBTQ+: Stonewall (1969), marriage equality (Netherlands 2001, US 2015).",
      "Religious revivals: Iranian Revolution (1979), liberation theology, Hindu nationalism, evangelical movements.",
    ],
    commonMistakes: [
      "Treating these movements as separate — they often inspired each other and overlapped (civil rights → women's, gay, anti-war).",
      "Forgetting global 1968 as transnational moment.",
      "Confusing first-wave (suffrage, ~1900-1920) and second-wave (1960s-70s) feminism.",
    ],
  },
  "8.8": {
    id: "8.8",
    title: "End of the Cold War",
    summary:
      "Soviet economic stagnation, Reagan pressure, Gorbachev's reforms, and Eastern European 1989 revolutions ended Cold War; USSR dissolved December 1991.",
    lesson:
      "**Soviet decline by mid-1980s**:\n- Economy stagnated; consumer goods scarce; technology lagged.\n- War in Afghanistan (1979-89) drained resources, cost Soviet credibility.\n- Reagan-era arms buildup forced Soviet matching expenditure.\n- Eastern European satellites economically struggling.\n\n**Gorbachev (1985-91)**:\n- Took power as reformist; introduced **glasnost** (openness — relaxed censorship) and **perestroika** (economic restructuring — limited market mechanisms).\n- Goals: revitalize Soviet system; did not anticipate dissolving it.\n- Renounced **Brezhnev Doctrine** (1988) — Eastern European satellites could not expect Soviet military intervention.\n- Met Reagan/Bush at Reykjavik (1986), Washington (1987 INF Treaty), Malta (1989).\n\n**1989 Revolutions** — Eastern Europe:\n- **Poland**: Solidarity (legalized 1989) won partially-free elections; Mazowiecki first non-communist PM.\n- **Hungary**: opened border to Austria (May 1989) — let East Germans flee West.\n- **East Germany — Berlin Wall fell Nov 9, 1989**; reunification with West Germany Oct 1990.\n- **Czechoslovakia — Velvet Revolution (Nov 1989)** — playwright Václav Havel became president.\n- **Romania — Ceaușescu overthrown and executed (Dec 1989)** — only violent revolution.\n- **Bulgaria, Yugoslavia (later disintegrating in wars 1991-99)**.\n\n**Soviet dissolution**:\n- **Aug 1991 coup attempt** by hardliners against Gorbachev failed; Yeltsin (Russian president) emerged as leader.\n- **Baltic states (Estonia, Latvia, Lithuania)** declared independence.\n- **Dec 25, 1991**: Gorbachev resigned; USSR dissolved into 15 successor states.\n- Russia under Yeltsin pursued rapid 'shock therapy' privatization — chaotic; oligarchs accumulated wealth; standard of living collapsed in 1990s.\n\n**Post-Cold War order** (covered in Unit 9):\n- **NATO expansion** to former Warsaw Pact states (Poland, Hungary, Czech Republic 1999; Baltics 2004; etc.).\n- **EU expansion** eastward.\n- **Yugoslav Wars (1991-95, 1999)** — Bosnia, Croatia, Kosovo.\n- Russia's relative decline; later resurgence under Putin (1999+).\n\n**Why USSR collapsed**:\n- Economic failure of central planning (longer-term).\n- Failure to keep up with information-age technology.\n- Loss of legitimacy as Stalin-era certainties faded.\n- Gorbachev's reforms unleashed forces beyond his control.\n- Nationalist movements within USSR (Baltic, Caucasus).\n\n**Why peacefully (mostly)**:\n- Gorbachev refused to use force to hold Eastern Europe.\n- Soviet elite divided.\n- Western support and example of prosperity.",
    keyIdeas: [
      "Soviet stagnation, Afghan war drain, Reagan arms buildup, plus Eastern European struggles.",
      "Gorbachev (1985-91): glasnost (openness), perestroika (economic restructuring); renounced Brezhnev Doctrine.",
      "1989: Poland (Solidarity), Hungary, Berlin Wall (Nov 9), Czechoslovakia (Velvet), Romania (violent).",
      "Aug 1991 hardliner coup failed; Dec 25, 1991 USSR dissolved into 15 states.",
      "Post-Cold War: NATO/EU expansion east; Yugoslav wars; Russian shock therapy chaos.",
    ],
    commonMistakes: [
      "Saying Reagan 'won' the Cold War — Soviet internal failures + Gorbachev's choices were primary.",
      "Forgetting that Gorbachev wanted to REFORM, not END, the Soviet system.",
      "Treating 1989 as one event — it cascaded across countries through 1991.",
    ],
  },
  "8.9": {
    id: "8.9",
    title: "Causation in the Age of the Cold War and Decolonization",
    summary:
      "Cold War and decolonization were intertwined: superpowers competed for newly independent states' allegiance; decolonization both enabled and constrained Cold War proxy fights; both reshaped global order.",
    lesson:
      "Causation-synthesis topic for Unit 8.\n\n**How Cold War shaped decolonization**:\n- Both superpowers officially supported decolonization rhetorically.\n- Each saw new states as potential allies.\n- USSR provided arms and political training (Vietnam, Angola, Cuba, etc.).\n- US provided economic aid + sometimes covert intervention against left-leaning new governments (Iran 1953, Guatemala 1954, Chile 1973, Lumumba 1961).\n- 'Three worlds' framing: First World (US-led), Second (Soviet-led), Third (decolonizing).\n\n**How decolonization shaped Cold War**:\n- New states became battlegrounds (Korea, Vietnam, Angola, Afghanistan).\n- Non-Aligned Movement (Bandung 1955) tried to chart third path.\n- Anti-colonial nationalism complicated bipolar framing — Nasser's Egypt, Castro's Cuba, Tito's Yugoslavia all defied easy categorization.\n- Sino-Soviet split (1960s) showed communism wasn't monolithic.\n\n**Common 20th-c. effects**:\n- Mass migrations (Partition India 15M; Vietnamese boat people; African refugees).\n- Cold War militarization of post-colonial politics.\n- Economic dependency reinforced by aid/loans/conditions.\n- Authoritarian regimes propped up by superpower clients.\n- Conversely, end of Cold War (1989-91) opened wave of democratization (Eastern Europe, Latin America, parts of Africa).\n\n**Why these processes ended together (~1991)**:\n- USSR collapse (8.8) ended Cold War.\n- Most decolonization complete by 1980 (Zimbabwe last major British, Namibia 1990).\n- South Africa's apartheid ended 1994 — completed African political decolonization.\n\n**Reciprocal causation**:\n- Cold War FUNDED both sides' interventions in decolonizing states.\n- Decolonizing states' instability gave superpowers OPPORTUNITIES for proxy intervention.\n- Each phenomenon shaped the other for ~45 years.\n\n**LEQ framing**: 'evaluate the impact of the Cold War on decolonization' or 'compare effects of Cold War in Africa, Asia, Latin America.'",
    keyIdeas: [
      "Cold War + decolonization were intertwined for ~45 years.",
      "Both superpowers competed for new states; covert interventions (Iran 1953, Chile 1973).",
      "Bandung 1955 + NAM tried for third path; Sino-Soviet split (1960s) showed communism not monolithic.",
      "End of Cold War (1991) opened wave of democratization (E. Europe, Latin America, S. Africa 1994).",
      "Reciprocal causation: each phenomenon shaped the other.",
    ],
    commonMistakes: [
      "Treating Cold War and decolonization as separate processes — they were entangled.",
      "Forgetting NAM as a meaningful third path.",
      "Underestimating how covert interventions shaped Global South politics.",
    ],
    workedExample: {
      prompt:
        "Briefly explain ONE specific way the Cold War shaped decolonization between 1945 and 1991.",
      solution:
        "The Cold War turned newly independent states into proxy battlegrounds, prolonging and intensifying their internal conflicts. In Angola after independence from Portugal in 1975, the Soviet Union and Cuba supported the Marxist MPLA government while the United States and apartheid South Africa supported the UNITA opposition under Savimbi — extending Angola's civil war until 2002 with hundreds of thousands of deaths. Similar dynamics played out in Mozambique, Nicaragua, Afghanistan, and Vietnam. The Cold War therefore not only shaped which post-colonial governments were considered legitimate but also armed and financed conflicts that might otherwise have ended much sooner.",
    },
  },

  // =========================================================================
  // UNIT 9 — GLOBALIZATION (c. 1900-present)
  // =========================================================================
  "9.1": {
    id: "9.1",
    title: "Advances in Technology and Exchange After 1900",
    summary:
      "20th and 21st-c. technology — containerization, jet aviation, satellites, computing, internet — radically accelerated global movement of goods, people, and information.",
    lesson:
      "**Transportation**:\n- **Jet aviation** (commercial Boeing 707, 1958) — collapsed travel time; today ~100,000 flights per day globally.\n- **Container shipping** (Malcolm McLean, 1956) — standardized 20-foot/40-foot steel boxes revolutionized maritime trade; cut shipping costs ~95%.\n- **Highway and pipeline** systems integrated continental economies.\n\n**Communication**:\n- **Radio** (Marconi 1895; broadcast 1920s) — first electronic mass medium.\n- **Television** (1930s; mass adoption 1950s+).\n- **Satellites** — Sputnik (1957); Telstar (1962); GPS (full operation 1995).\n- **Computing** — ENIAC (1946) → microprocessors (Intel 4004, 1971) → personal computers (Apple II 1977, IBM PC 1981).\n- **Internet** — ARPANET (1969) → TCP/IP (1983) → World Wide Web (Berners-Lee 1989) → mass adoption 1990s+.\n- **Mobile phones** — first commercial 1983; smartphones (iPhone 2007) → ~6.5 billion users today.\n- **Social media** (Facebook 2004, Twitter 2006, TikTok 2016).\n\n**Energy**:\n- **Petroleum** age — accelerated post-WWI; oil-fueled cars, planes, ships, plastics, fertilizer.\n- **Nuclear power** — first commercial 1954; expanded after 1973 oil shock; setbacks after Three Mile Island (1979), Chernobyl (1986), Fukushima (2011).\n- **Renewables** — solar, wind growing rapidly post-2000.\n\n**Medical/Bio**:\n- **Antibiotics** (Penicillin discovered Fleming 1928; produced at scale by 1944) — saved millions in WWII and after.\n- **Vaccines** — polio (Salk 1955), measles, smallpox eradicated (WHO 1980).\n- **DNA structure** (Watson, Crick, Franklin 1953); Human Genome Project (1990-2003).\n- **mRNA vaccines** developed rapidly during COVID-19 (2020).\n\n**Agricultural Green Revolution (1950s-70s)**:\n- **Norman Borlaug's** semi-dwarf wheat; IRRI rice (IR8 1966).\n- High-yield seeds + synthetic fertilizers + irrigation tripled grain production in India, Mexico, Pakistan, Philippines.\n- Saved estimated 1 billion lives from famine.\n- Tradeoffs: fossil-fuel-intensive; chemical runoff; smaller farmers squeezed.\n\n**Effects on global exchange**:\n- Containerization made global supply chains feasible — Apple iPhone assembled in China from components from Korea, Japan, Taiwan, Germany, etc.\n- Internet made information instantaneously global.\n- Air travel made tourism a major industry.",
    keyIdeas: [
      "Containerization (1956) cut shipping costs ~95% — key to globalization.",
      "Jet aviation (1958+); satellites (1957+); GPS (1995); internet (1989+); smartphones (2007+).",
      "Petroleum dominated 20th-c. energy; renewables rising post-2000.",
      "Antibiotics (penicillin 1944), vaccines (smallpox eradicated 1980), DNA (1953), Human Genome (2003), mRNA (2020).",
      "Green Revolution (1950s-70s) — Borlaug, IRRI; tripled grain output, saved ~1B lives.",
    ],
    commonMistakes: [
      "Underestimating the container ship's role — it was as transformative as jet aviation.",
      "Forgetting Green Revolution's role in averting massive Asian famines.",
      "Dating the internet to the wrong moment — ARPANET 1969, web 1989, mass 1990s.",
    ],
  },
  "9.2": {
    id: "9.2",
    title: "Technological Advances and Limitations After 1900: Disease",
    summary:
      "Modern medicine eradicated smallpox and reduced many diseases — but globalization spread new pandemics (1918 flu, HIV/AIDS, SARS, COVID-19) and antibiotic-resistant pathogens.",
    lesson:
      "**Triumphs**:\n- **Vaccines**: smallpox (eradicated WHO 1980); polio (Salk 1955; near-eradicated); measles, mumps, rubella, hepatitis, HPV.\n- **Antibiotics**: penicillin (mass-produced WWII), streptomycin (TB), penicillin derivatives — transformed surgery, childbirth, infections.\n- **Public health**: clean water, sewer, sanitation in industrial cities cut typhoid, cholera, dysentery.\n- **Antiretrovirals (ARVs)** for HIV (1996+) — turned HIV from death sentence to manageable condition.\n- **Cancer treatments** — chemotherapy, immunotherapy.\n- **Life expectancy globally**: ~30 years (1900) → ~73 years (2023).\n\n**Pandemics**:\n- **1918 Spanish Flu (H1N1)** — killed ~50-100 million globally (more than WWI).\n- **HIV/AIDS** — emerged 1980s from chimpanzees in Central Africa; ~40 million dead globally; ARVs since 1996 transformed prognosis but ~30M+ still living with HIV.\n- **SARS (2002-03)** — novel coronavirus; ~800 deaths; rapid containment.\n- **H1N1 swine flu (2009)** — pandemic but less severe than feared.\n- **Ebola** outbreaks (2014-16 W. Africa) — vaccines developed.\n- **COVID-19 (2019-)** — SARS-CoV-2 from Wuhan; ~7 million confirmed deaths; estimated 15-20M+ excess; vaccines developed in record 11 months (mRNA Pfizer/Moderna).\n\n**New challenges**:\n- **Antibiotic resistance** — MRSA, drug-resistant TB, gonorrhea — over-prescription + agricultural use; WHO calls one of the top 10 health threats.\n- **Zoonotic spillover** — habitat destruction + livestock densities increase pandemic risk.\n- **Non-communicable diseases** (heart, cancer, diabetes) now leading killers globally as infectious diseases recede.\n- **Mental health** crisis — depression, anxiety widely under-recognized.\n- **Health disparities** — within and between countries (US Black-white life expectancy gap ~5 years; sub-Saharan Africa life expectancy ~62 vs. Europe ~80).\n\n**Globalization and disease**:\n- Air travel can move pathogens worldwide in hours (SARS, COVID).\n- Conversely, global cooperation on vaccines (COVAX) and surveillance (WHO).\n- Vaccine inequity in COVID — wealthy countries vaccinated faster.",
    keyIdeas: [
      "Smallpox eradicated 1980; polio near-eradicated; antibiotics + vaccines + public health doubled global life expectancy.",
      "1918 flu killed ~50-100M; HIV/AIDS ~40M dead; COVID-19 ~7M confirmed (15-20M+ excess).",
      "ARVs (1996) transformed HIV prognosis; mRNA vaccines (Pfizer/Moderna 2020) record-fast.",
      "New challenges: antibiotic resistance, zoonotic spillover, non-communicable diseases, mental health, disparities.",
      "Globalization both spreads disease faster AND enables global response.",
    ],
    commonMistakes: [
      "Forgetting the 1918 flu killed more than WWI.",
      "Underestimating HIV/AIDS scale (~40M dead globally).",
      "Treating COVID as the first pandemic of the era — SARS, H1N1, Ebola were rehearsals.",
    ],
  },
  "9.3": {
    id: "9.3",
    title: "Technological Advances: Debates About the Environment After 1900",
    summary:
      "Industrial growth and population have caused climate change, ozone depletion, deforestation, biodiversity loss — provoking environmental movements, treaties (Montreal 1987, Paris 2015), and political conflict.",
    lesson:
      "**Major environmental challenges**:\n\n**Climate change**:\n- CO₂ from fossil fuels has warmed the planet ~1.2°C since pre-industrial.\n- Effects: sea-level rise, more extreme weather, ocean acidification, ecosystem stress, climate refugees.\n- 2020s: increasingly severe wildfires, heatwaves, hurricanes, glacier melt.\n- **IPCC** (Intergovernmental Panel on Climate Change, 1988+) synthesizes science.\n- **Treaties**: UNFCCC (1992 Rio), **Kyoto Protocol (1997)** required developed-country cuts; **Paris Agreement (2015)** all countries set voluntary targets to limit warming to 1.5-2°C; mixed compliance.\n\n**Ozone depletion**:\n- CFCs (chlorofluorocarbons used in refrigerants/aerosols) damaged stratospheric ozone.\n- **Antarctic ozone hole** discovered 1985.\n- **Montreal Protocol (1987)** phased out CFCs — most successful environmental treaty; ozone layer healing.\n\n**Deforestation**:\n- Amazon, SE Asia, Central Africa losing forests for agriculture, logging, ranching.\n- Threatens biodiversity and carbon sequestration.\n\n**Biodiversity loss**:\n- Extinction rates 100-1,000× background — 'sixth mass extinction.'\n- Habitat destruction, climate change, pollution drive losses.\n- **Convention on Biological Diversity (1992)**.\n\n**Air, water, plastic pollution**:\n- Beijing, Delhi, etc. air-quality crises.\n- Plastic in oceans (~8 million tons enter annually); microplastics in food chain.\n- Water scarcity in dry regions worsening with climate change.\n\n**Nuclear and chemical accidents**:\n- **Bhopal (1984)** — Union Carbide leak in India killed ~3,800-15,000.\n- **Chernobyl (1986)** — Soviet nuclear disaster.\n- **Fukushima (2011)** — Japanese nuclear disaster after tsunami.\n\n**Environmental movement**:\n- **Silent Spring** (Carson 1962) — DDT critique.\n- Earth Day (1970), Greenpeace (1971), 350.org, Sunrise Movement, Fridays for Future (Greta Thunberg).\n- Indigenous-led resistance (Standing Rock pipeline 2016; Amazon protectors).\n\n**Energy transition**:\n- Solar PV cost fell ~90% 2010-2020 — now cheapest electricity in many regions.\n- Wind capacity expanding rapidly.\n- Electric vehicles scaling (Tesla Model S 2012; China leading EV adoption 2020s).\n- Coal declining in West, still major in China/India/SE Asia.\n\n**Debates**:\n- Developed vs. developing country responsibility (historical emissions vs. current).\n- Carbon pricing (taxes vs. cap-and-trade).\n- Geoengineering proposals.\n- Just transition for fossil-fuel workers.\n\n**'Anthropocene'** — proposed geological epoch for human-dominated Earth.",
    keyIdeas: [
      "Climate change: ~1.2°C warming; IPCC; UNFCCC (1992), Kyoto (1997), Paris (2015).",
      "Montreal Protocol (1987) successfully phased out CFCs — ozone healing.",
      "Deforestation, sixth mass extinction, plastic pollution accelerating.",
      "Bhopal (1984), Chernobyl (1986), Fukushima (2011) major disasters.",
      "Renewable energy costs collapsed post-2010; EVs scaling.",
      "Anthropocene = proposed epoch for human-dominated Earth.",
    ],
    commonMistakes: [
      "Treating Paris Agreement as legally binding emissions cuts — it's voluntary national targets.",
      "Forgetting Montreal Protocol as a successful precedent — it's the model for climate cooperation.",
      "Underestimating renewable energy's economic competitiveness post-2015.",
    ],
  },
  "9.4": {
    id: "9.4",
    title: "Economics in the Global Age",
    summary:
      "Post-1945: Bretton Woods (IMF, World Bank), GATT/WTO, neoliberalism (Reagan/Thatcher), Asian Tiger industrialization, China's market reforms, 2008 financial crisis, rise of inequality.",
    lesson:
      "**Bretton Woods order (1944-71)**:\n- **IMF** stabilized currencies; **World Bank** funded development; **GATT (1947)** liberalized trade.\n- **US dollar** convertible to gold; other currencies pegged to dollar.\n- 1971: Nixon ended dollar-gold convertibility — floating exchange rates since.\n\n**Postwar prosperity (1945-73)**:\n- 'Trente Glorieuses' in Western Europe — fast growth, rising wages, welfare states.\n- US dominance — 25%+ of world GDP at peak.\n- Japan's 'economic miracle' — keiretsu, MITI-led industrial policy; world's #2 economy by 1968.\n- USSR steady growth in 1950s-60s; stagnation by 1970s.\n\n**Oil shocks (1973, 1979)**:\n- **OPEC** embargo against US/allies (1973) over Yom Kippur War; oil prices quadrupled.\n- **1979** — Iranian Revolution disrupted supply; second price shock.\n- Triggered stagflation (high inflation + unemployment) — broke postwar consensus.\n\n**Neoliberal turn (1979+)**:\n- **Margaret Thatcher (UK 1979-90)** privatized state industries, weakened unions, cut top tax rates.\n- **Ronald Reagan (US 1981-89)** tax cuts, deregulation, anti-union (PATCO 1981 firing).\n- **Washington Consensus (1980s+)** — IMF/World Bank loans conditional on privatization, deregulation, openness, fiscal austerity.\n- Spread to Latin America (Chile under Pinochet earlier; Mexico, Argentina), Eastern Europe (post-1989 'shock therapy').\n\n**Asian industrialization**:\n- **'Asian Tigers'** (Hong Kong, Singapore, S. Korea, Taiwan) industrialized via export-led growth + state guidance.\n- **China — Deng Xiaoping (1978+)** opened to foreign investment, established Special Economic Zones (Shenzhen 1980); growth ~10%/year for 30 years; lifted ~800M out of poverty; became world's #2 economy by 2010.\n- **India — 1991 reforms** under Manmohan Singh dismantled License Raj; growth accelerated.\n- **Vietnam (đổi mới 1986+)**, Indonesia, Malaysia.\n\n**Global supply chains**:\n- Multinational corporations (Apple, Walmart, Toyota) integrate production across many countries.\n- Outsourcing of manufacturing from West to lower-wage Asia.\n\n**Trade liberalization**:\n- **WTO (1995)** replaced GATT; binding dispute resolution; China joined 2001.\n- **NAFTA (1994)** US-Canada-Mexico; later USMCA (2020).\n- **EU Single Market (1993)**, Eurozone (1999).\n- Recent backlash: Brexit (2016), Trump tariffs (2018+).\n\n**2008 financial crisis**:\n- US subprime mortgage collapse → Lehman Brothers bankruptcy (Sept 2008) → global financial panic.\n- Bank bailouts (TARP $700B); central banks slashed rates and bought assets (QE).\n- **Eurozone debt crisis (2010-15)** — Greece, Spain, Portugal, Ireland.\n- Deepened inequality and political polarization.\n\n**Inequality and discontent**:\n- Globalization lifted billions out of extreme poverty BUT concentrated gains at top.\n- Western middle/working classes stagnated since 1980 in real terms.\n- Populist backlash (Trump 2016, Brexit 2016, European far-right rise).\n- Global wealth concentration: top 1% owns ~46% of global wealth (Oxfam).\n\n**COVID-19 economic shock (2020)**:\n- Largest contraction since Great Depression; massive fiscal/monetary response.\n- Inflation surge 2021-23.\n- Supply chain reorganization (reshoring, friend-shoring).",
    keyIdeas: [
      "Bretton Woods (IMF, World Bank, GATT, dollar-gold) shaped postwar economy.",
      "Postwar 'golden age' (1945-73) ended with oil shocks (1973, 1979).",
      "Neoliberalism (Thatcher, Reagan 1980s; Washington Consensus): privatization, deregulation, openness.",
      "Asian Tigers + China (Deng 1978+) + India (1991) industrialized via export-led growth.",
      "WTO (1995); China joined 2001; globalization integrated supply chains.",
      "2008 financial crisis + COVID 2020 = major recent shocks; populist backlash to globalization.",
    ],
    commonMistakes: [
      "Treating neoliberalism as universal — it was specific 1980s+ policy turn, not all post-1945 capitalism.",
      "Forgetting China's reforms (1978+) lifted ~800M out of poverty.",
      "Underestimating 2008 crisis as a turning point against unrestricted globalization.",
    ],
  },
  "9.5": {
    id: "9.5",
    title: "Calls for Reform and Responses After 1900",
    summary:
      "Civil rights, feminism, indigenous, LGBTQ+, environmental, and economic justice movements (Occupy, BLM, Arab Spring) called for systemic change — with mixed results.",
    lesson:
      "Builds on movements covered in 8.7. The CED expects you to extend into 21st-c. examples.\n\n**Civil rights / racial justice continuing**:\n- Affirmative action; sustained inequality in US, Brazil, S. Africa.\n- **Black Lives Matter (2013+)** — initially after Trayvon Martin, exploded after George Floyd's murder (May 2020) — globalized as protest movement.\n- Critical Race Theory debates.\n- Indigenous rights gains (UN Declaration on the Rights of Indigenous Peoples, 2007).\n\n**Women's rights ongoing**:\n- **Beijing Declaration (1995)** UN Conference on Women.\n- **#MeToo (2017+)** — global wave of sexual harassment exposure starting with Harvey Weinstein revelations.\n- Continued gender pay gap, underrepresentation in leadership.\n- Reproductive rights contested — Roe v. Wade overturned by Dobbs (2022) in US; legalization in Argentina, Ireland, Mexico.\n\n**LGBTQ+ rights**:\n- Marriage equality spreading (32+ countries by 2023).\n- Trans rights debates intensifying.\n- Persecution continues in 65+ countries (homosexuality illegal).\n\n**Anti-austerity / economic justice**:\n- **Occupy Wall Street (2011)** — 'We are the 99%' framing on inequality.\n- Greek anti-austerity protests; Spanish 15-M (Indignados) movement.\n- US: Bernie Sanders campaigns (2016, 2020); Elizabeth Warren.\n- Global minimum corporate tax (G7/G20 agreement 2021).\n\n**Arab Spring (2010-12)**:\n- Tunisian street vendor Mohamed Bouazizi self-immolation (Dec 2010) sparked uprising.\n- Tunisian regime fell (Jan 2011); Egyptian Mubarak fell (Feb 2011); Libyan Gaddafi killed (Oct 2011); Syrian uprising became civil war (2011+); Yemen, Bahrain protests.\n- Outcomes: Tunisia became fragile democracy; Egypt military rule restored 2013; Libya, Syria, Yemen collapsed into wars.\n- Mostly disappointing democratic outcomes — but reshaped political consciousness.\n\n**Hong Kong protests (2014, 2019-20)**:\n- Umbrella Movement (2014) and 2019 anti-extradition bill protests met with PRC crackdown (2020 National Security Law).\n\n**Climate movement**:\n- **Greta Thunberg's Fridays for Future (2018+)**.\n- Extinction Rebellion (2018+).\n- Indigenous-led pipeline resistance (Standing Rock 2016).\n\n**Religious revival movements**:\n- Hindu nationalism (BJP/Modi government from 2014).\n- Christian evangelical movements globally.\n- Salafi/Wahhabi spread; ISIS rise (2014) and territorial defeat (2019).\n\n**Anti-globalization to anti-establishment**:\n- 1999 Seattle WTO protests began anti-globalization wave.\n- After 2008 financial crisis, mutated into populist anti-establishment politics — Trump, Brexit, Le Pen, Modi, Bolsonaro, Meloni, AfD.\n\n**State responses**:\n- Repression (China, Russia, Iran).\n- Co-optation (some welfare expansion in Latin America, Europe).\n- Concession (some marriage equality, climate commitments).\n- Backlash (anti-protest laws, surveillance).",
    keyIdeas: [
      "Black Lives Matter (2013+, peak 2020); #MeToo (2017+); ongoing racial and gender justice movements.",
      "Marriage equality spreading; Roe v. Wade overturned 2022; reproductive rights legalized in Argentina (2020), Ireland (2018), Mexico (2021).",
      "Occupy Wall Street (2011); anti-austerity protests; Bernie Sanders campaigns.",
      "Arab Spring (2010-12) — mostly failed politically but reshaped consciousness.",
      "Hong Kong protests (2014, 2019-20) crushed by PRC.",
      "Climate movement: Thunberg, Extinction Rebellion, indigenous-led resistance.",
      "Populist backlash: Trump, Brexit, Modi, Bolsonaro — partial anti-establishment turn.",
    ],
    commonMistakes: [
      "Treating Arab Spring as wholly successful — most countries saw worse outcomes.",
      "Forgetting that #MeToo and BLM reshaped culture beyond formal political wins.",
      "Confusing anti-globalization (1999+ left) with anti-establishment populism (2010s+ partly right).",
    ],
  },
  "9.6": {
    id: "9.6",
    title: "Globalized Culture After 1900",
    summary:
      "Mass media, English as global lingua franca, sports, music, food, and digital culture spread globally — producing both homogenization and renewed local identity.",
    lesson:
      "**Cultural globalization mechanisms**:\n- Hollywood, Bollywood, Nollywood, K-pop industries with global reach.\n- Internet platforms (YouTube, Netflix, TikTok) cross borders instantly.\n- English as global lingua franca for business, science, internet — ~1.5 billion speakers (mostly non-native).\n- International sports — FIFA World Cup, Olympics watched by billions.\n\n**American/Western cultural exports**:\n- Hollywood, Disney, music, fashion, fast food (McDonald's, Coca-Cola, Starbucks).\n- 'McDonaldization' / 'Coca-Colonization' critiques.\n\n**Counter-flows**:\n- **K-pop** (BTS, Blackpink) — Korean cultural wave globally.\n- **Bollywood** — India's film industry, biggest by film count, global diaspora following.\n- **Anime/manga** — Japanese cultural products in West.\n- **Latin American music** — reggaeton, salsa global.\n- **Telenovelas** from Brazil, Mexico — popular in many countries.\n\n**Sports**:\n- **FIFA World Cup** (every 4 years) — most-watched event.\n- **Olympics** — modern revived Athens 1896.\n- **Cricket** — global in former British colonies (India, Pakistan, Australia, England, S. Africa, West Indies).\n- **Basketball, NFL, soccer** crossing into new markets.\n\n**Music**:\n- Jazz, rock, hip-hop, electronic — American genres globally.\n- Beatles (1960s) → globalization of pop.\n- Streaming (Spotify, YouTube) made music instantly global.\n\n**Food**:\n- Sushi, pizza, kebab, taco, bubble tea — culinary cross-pollination.\n- Coffee chains, fast food.\n\n**Religious globalization**:\n- Pentecostal/evangelical Christianity expanding rapidly in Africa, Latin America, Asia — now over 600 million.\n- Islamic global ummah — pilgrimage, satellite TV (Al Jazeera), digital scholarship.\n- Buddhism in West (mindfulness movement).\n\n**Hybrid identities**:\n- Diasporic communities sustain home culture while integrating into host society.\n- Children of immigrants often bicultural.\n\n**Digital culture**:\n- Social media reshape communication, politics, mental health.\n- Memes, viral videos cross languages.\n- Concerns about attention, polarization, mental health (esp. teens).\n\n**Resistance to homogenization**:\n- France's protections for French language and cinema.\n- Quebec language laws.\n- Indigenous language revival.\n- 'Slow food' movements.\n\n**Both / and**:\n- Globalization simultaneously homogenizes (similar brands worldwide) AND fragments (niche subcultures online; revived local identities reactively).",
    keyIdeas: [
      "Mass media, English lingua franca, internet platforms, global sports = mechanisms.",
      "Western (Hollywood, fast food) AND counter-flows (K-pop, Bollywood, anime, telenovelas).",
      "Religious globalization: Pentecostalism, Islamic ummah, Buddhism in West.",
      "Hybrid identities; diasporic communities biculturally adapt.",
      "Digital culture reshapes communication; concerns about polarization, mental health.",
      "Resistance: language laws, indigenous revival, slow food.",
      "Globalization simultaneously homogenizes AND renews local identities.",
    ],
    commonMistakes: [
      "Treating globalization as one-way Western export — counter-flows are equally global.",
      "Forgetting religious globalization — Pentecostalism alone is 600M+.",
      "Dismissing local resistance — language and identity revivals are real and growing.",
    ],
  },
  "9.7": {
    id: "9.7",
    title: "Resistance to Globalization After 1900",
    summary:
      "Resistance to globalization comes from labor (anti-NAFTA), religious revival, populist nationalism, anti-Western movements, environmentalism, and cultural protectionism.",
    lesson:
      "**Anti-globalization left (1990s-2000s)**:\n- **1999 Seattle WTO protests** ('Battle of Seattle') — labor, environmental, anti-corporate coalition.\n- **World Social Forum (Porto Alegre 2001+)** — 'Another world is possible' counterpoint to Davos.\n- Critiques: WTO/IMF favor capital over labor; structural adjustment harms poor; environmental destruction.\n\n**Religious anti-globalization**:\n- **Iranian Revolution (1979)** — Khomeini's Islamic state explicitly rejected Western liberalism.\n- **Salafi/Wahhabi spread** — Saudi-funded conservative Islam.\n- **Al-Qaeda** (founded 1988 by Osama bin Laden) and Islamist terrorism: 9/11 (2001) attacks killed ~3,000; led to US invasions of Afghanistan (2001) and Iraq (2003).\n- **ISIS** (2014-19) territorially controlled parts of Iraq/Syria; brutal violence; defeated 2019 but ideological networks persist.\n- **Christian fundamentalism** in US politics; **Hindu nationalism** (RSS/BJP) in India.\n\n**Populist nationalism (2010s+)**:\n- **US: Trump (2016, 2024)** — anti-immigration, tariffs, 'America First.'\n- **UK: Brexit (June 2016 referendum)** — left EU.\n- **Hungary: Orbán** — 'illiberal democracy.'\n- **India: Modi (2014+)** — Hindu nationalism + economic reform.\n- **Brazil: Bolsonaro (2018-22)**.\n- **Italy: Meloni (2022+)**, France's National Rally rising.\n- Common themes: anti-immigration, cultural traditionalism, opposition to liberal/cosmopolitan elites, ambivalence toward democracy.\n\n**Russia under Putin (1999+)**:\n- 'Sovereign democracy'; conservative values; anti-Western.\n- Invaded Georgia (2008), annexed Crimea (2014), invaded Ukraine (Feb 2022).\n- Energy weaponization; election interference.\n\n**China's authoritarian capitalism**:\n- Embraced economic globalization while resisting political liberalism.\n- Xi Jinping (2012+) consolidated power; 'Chinese dream'; Belt and Road Initiative; surveillance state in Xinjiang.\n- Increasing assertion in South China Sea, Taiwan tensions.\n\n**Cultural protectionism**:\n- France's quotas for French-language film and music.\n- Quebec language laws (Bill 101, 1977; Bill 96, 2022).\n- Bhutan's Gross National Happiness; tourism limits.\n\n**Environmental anti-growth**:\n- Degrowth movements in Europe and academic circles.\n- Indigenous-led resistance to extractive industries.\n\n**Common reasons for anti-globalization**:\n- Job losses to outsourcing in developed-country manufacturing.\n- Cultural anxiety over immigration and demographic change.\n- Religious objection to liberal cosmopolitanism.\n- Inequality and stagnant wages for working/middle classes.\n- Loss of national sovereignty to international institutions and capital.",
    keyIdeas: [
      "Anti-globalization left: Seattle 1999, World Social Forum, structural adjustment critiques.",
      "Religious: Iranian Revolution (1979), Al-Qaeda + 9/11 (2001), ISIS (2014-19), Hindu nationalism.",
      "Populist nationalism (2010s+): Trump, Brexit, Orbán, Modi, Bolsonaro, Meloni.",
      "Putin Russia: Crimea (2014), Ukraine invasion (Feb 2022).",
      "China: economic globalization + political authoritarianism; Xi Jinping; BRI.",
      "Cultural protectionism (France, Quebec); environmental degrowth.",
      "Drivers: outsourcing, immigration anxiety, religion, inequality, sovereignty.",
    ],
    commonMistakes: [
      "Treating anti-globalization as one ideology — left, religious, populist-right strands differ.",
      "Forgetting 9/11 as a turning point in 21st-c. politics.",
      "Underestimating Russian invasion of Ukraine (2022) as a direct rejection of post-Cold War order.",
    ],
  },
  "9.8": {
    id: "9.8",
    title: "Institutions Developing in a Globalized World",
    summary:
      "International institutions (UN, IMF, WTO, EU, WHO, NATO) and non-state actors (NGOs, multinational corporations, terrorist networks) have grown alongside states in shaping global affairs.",
    lesson:
      "**Inter-governmental institutions**:\n\n**United Nations (1945+)**:\n- General Assembly (193 members), Security Council (5 permanent vetoes + 10 rotating).\n- Specialized agencies: WHO (health), UNESCO (education/culture), UNICEF (children), UNHCR (refugees), ILO (labor), FAO (food).\n- Peacekeeping: 70+ missions since 1948; mixed record.\n- Successes: smallpox eradication, refugee protection, decolonization framework.\n- Failures: Rwanda 1994, Bosnia 1995 inadequate response.\n\n**Bretton Woods**:\n- **IMF** — 190 members; balance-of-payments crises; structural adjustment (controversial).\n- **World Bank** — development lending.\n- **WTO (1995)** — trade liberalization, dispute resolution; gridlock since Doha Round (2001+).\n\n**Regional institutions**:\n- **European Union (1993 from EEC roots)** — single market, common currency (Eurozone 1999), free movement; Brexit (2020) departure; ongoing integration challenges.\n- **NATO (1949)** — military alliance; expanded post-Cold War to former Warsaw Pact (Poland, Czech, Hungary 1999; Baltics 2004; Sweden, Finland 2023-24 after Russian Ukraine invasion).\n- **ASEAN (1967)** — Southeast Asian economic cooperation.\n- **African Union (2002, replacing OAU)** — 55 African states.\n- **Mercosur** (Latin American trade bloc).\n- **BRICS (2009)** — Brazil, Russia, India, China, S. Africa; expanded 2024.\n- **G7, G20** — informal coordination of major economies.\n\n**Global health**:\n- WHO led smallpox eradication (1980); polio campaign; COVID-19 response (mixed).\n- COVAX for vaccine equity.\n\n**International law**:\n- **International Criminal Court (2002)** prosecutes genocide, crimes against humanity, war crimes.\n- Nuremberg (1945-46), Tokyo (1946-48), ICTY (Yugoslavia 1993), ICTR (Rwanda 1994) precursors.\n\n**Non-state actors**:\n- **Multinational corporations** (Apple, Microsoft, Walmart, Amazon, Saudi Aramco) with revenues exceeding many states' GDP.\n- **NGOs**: Amnesty International (1961), Doctors Without Borders / MSF (1971), Human Rights Watch, Oxfam, Greenpeace, Bill & Melinda Gates Foundation.\n- **Terrorist networks**: Al-Qaeda, ISIS, Hezbollah, Boko Haram, Hamas — non-state violent actors.\n- **Drug cartels** — Mexican, Colombian; trans-national criminal networks.\n- **Hacker collectives**, ransomware groups.\n\n**Climate cooperation**:\n- UNFCCC framework (1992); annual COP meetings; Paris Agreement (2015).\n- Voluntary national targets; uneven compliance.\n\n**Tensions in institutional order**:\n- Rising powers (China, India, Brazil) demand more representation in old institutions (Security Council, IMF voting).\n- US-China rivalry tests institutions.\n- Russia's Ukraine invasion (2022) challenges UN Charter principles.\n- Disinformation, social media, AI complicate global governance.",
    keyIdeas: [
      "UN (1945+) and Bretton Woods institutions (IMF, World Bank, WTO) shape global order.",
      "Regional: EU (single market + Eurozone); NATO (expanded post-Cold War); ASEAN, AU, BRICS.",
      "International Criminal Court (2002) + ad hoc tribunals (ICTY, ICTR) for genocide/war crimes.",
      "Non-state actors grew: multinationals, NGOs (MSF, Amnesty, Gates), terrorist networks, criminal cartels.",
      "Climate: UNFCCC + Paris Agreement (2015) — voluntary, uneven.",
      "Rising powers + great-power conflict strain old institutions.",
    ],
    commonMistakes: [
      "Treating institutions as substitutes for state power — they constrain but don't replace states.",
      "Forgetting that NGOs and multinationals are major non-state actors.",
      "Underestimating regional institutions (EU especially) as deeper integration than UN.",
    ],
  },
  "9.9": {
    id: "9.9",
    title: "Continuity and Change in a Globalized World",
    summary:
      "Late 20th-c. and 21st-c. globalization brought unprecedented integration, technology, prosperity for billions — but also persistent inequality, conflict, environmental crisis, and great-power tension.",
    lesson:
      "Final synthesis topic.\n\n**Major changes since c. 1900**:\n- **Population**: ~1.6B (1900) → ~8B (2023).\n- **Life expectancy**: ~30 (1900) → ~73 (2023).\n- **Urbanization**: ~14% (1900) → ~57% (2023, urban for first time in history).\n- **Extreme poverty**: ~75% (1900) → ~10% (2020).\n- **Literacy**: ~20% (1900) → ~87% (2020).\n- **Decolonization** ended formal European empires.\n- **Cold War order** built and dismantled.\n- **Information revolution** — internet + smartphones changed everything.\n- **Globalized economy** — supply chains, multinationals, instant capital flow.\n- **Women's status** improved across most domains.\n- **LGBTQ+ rights** expanded in many countries.\n- **Climate change** emerged as defining 21st-c. challenge.\n- **Religion** revived globally despite secularization predictions.\n- **Mass migration** ongoing — ~280M international migrants (2020).\n\n**Major continuities**:\n- **Inequality** persists — between and within countries.\n- **Patriarchy** persists despite gains.\n- **Racism** and ethnic discrimination persist.\n- **War** and authoritarianism persist (Russia-Ukraine 2022; China's Xinjiang; Sudan, Yemen civil wars).\n- **Religion** remains central in much of human life.\n- **Nation-state** remains the dominant political form despite global integration.\n- **Hunger** affects ~700M (~9% of humanity).\n\n**Key tensions of the era**:\n- Universalism vs. particularism (universal human rights vs. cultural/religious distinctiveness).\n- Sovereignty vs. supranational governance.\n- Growth vs. environmental limits.\n- Globalization vs. local identity.\n- Technological optimism vs. existential risks (nuclear, climate, AI).\n\n**Periodization debate**:\n- 1900 = high European imperial age.\n- 1945 = Cold War + decolonization.\n- 1991 = post-Cold War 'unipolar moment' / globalization peak.\n- 2008/2016/2020/2022 = various proposed turning points away from peak globalization.\n- 'End of history' (Fukuyama 1989) thesis collapsed in 2010s as authoritarianism and great-power competition returned.\n\n**The 21st-c. challenges**:\n- Climate change.\n- Pandemic preparedness.\n- AI governance.\n- Great-power competition (US-China; Russia-Europe).\n- Inequality.\n- Demographic shifts (aging Europe/Japan; growing Africa).\n- Migration.\n- Democratic backsliding.\n\n**The CED's framing**: students should be able to argue both 'globalization made the world more interconnected and prosperous than ever' AND 'globalization has produced backlash, inequality, and crisis' — strong essays handle the tension.",
    keyIdeas: [
      "Massive 20th-c. changes: population ~1.6B→8B, life expectancy 30→73, urbanization, literacy, extreme poverty fell.",
      "Continuities: inequality, patriarchy, racism, war, religion, nation-state, hunger.",
      "Tensions: universalism vs. particularism, sovereignty vs. global governance, growth vs. environment.",
      "Periodization: 1991 peak globalization; 2008/2016/2020/2022 = backlash markers.",
      "21st-c. challenges: climate, pandemic, AI, great-power competition, inequality, democratic backsliding.",
    ],
    commonMistakes: [
      "Listing only changes — strong CCOT essays balance with continuities.",
      "Treating globalization as wholly positive or wholly negative — it's both.",
      "Forgetting that the nation-state remains the dominant political form despite global integration.",
    ],
    workedExample: {
      prompt:
        "Evaluate the extent to which globalization changed the world economy from 1900 to the present.",
      solution:
        "Globalization transformed the world economy in unprecedented ways while leaving significant continuities. Changes include the integration of supply chains across continents (Apple's iPhone draws components from a dozen countries); the emergence of new industrial powers (China lifting ~800M out of poverty after Deng's 1978 reforms; Asian Tigers via export-led growth); financial integration via floating exchange rates after 1971 and global capital markets; and instantaneous information flow via the internet. Multinational corporations, the WTO (1995), regional blocs (EU, NAFTA), and the IMF/World Bank shape the order. However, key continuities persist: most production still happens within national borders, the nation-state remains the primary economic regulator, agricultural and informal-sector workers remain most of the global labor force, and inequality both within and between countries persists at extreme levels (top 1% own ~46% of global wealth). The 2008 financial crisis and the post-2016 populist backlash show that globalization has provoked sustained resistance. Globalization therefore represents one of the most fundamental economic transformations in human history but has not abolished older patterns of state-organized economic life or structural inequality.",
    },
  },
};
