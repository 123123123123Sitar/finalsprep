import type { CourseCedLessons } from "./types";

/**
 * AP United States History CED lessons — every topic from Periods 1-9 of
 * the 2024-25 CED. Narratives foreground causation, continuity/change,
 * and comparison — the three historical thinking skills APUSH scores.
 * Each lesson is written so a student can answer SAQ, DBQ, and LEQ
 * prompts with specific evidence + periodization in mind.
 *
 * Worked examples model SAQ-style responses (claim + evidence +
 * reasoning) because that is the form most often tested and most often
 * missed by students who otherwise know the content.
 */

export const AP_US_HISTORY_CED_LESSONS: CourseCedLessons = {
  // =========================================================================
  // PERIOD 1 — 1491-1607
  // =========================================================================
  "1.1": {
    id: "1.1",
    title: "Contextualizing Period 1",
    summary:
      "Before 1492 the Americas held millions of people in societies as diverse as Eurasia's. European contact after 1492 set off the largest biological and cultural exchange in human history.",
    lesson:
      "Period 1 frames the big question APUSH will revisit for nine periods: how did contact between peoples reshape the societies involved?\n\nOn the eve of contact, **Native American societies** ranged from complex urban polities (Cahokia on the Mississippi, Aztec Tenochtitlán, Inca Cuzco) to semi-sedentary agriculturalists (Pueblo, Iroquois, Algonquian) to mobile hunter-gatherers (Plains, Arctic, sub-Arctic). Estimates put the pre-contact Western Hemisphere population between 50-100 million.\n\n**Europe** in 1491 was climbing out of the Black Death, consolidating into dynastic states (Spain, Portugal, France, England), and hungry for Asian spices and precious metals. Ottoman control of eastern trade routes pushed Iberian states to look west.\n\n**West Africa** was organized into powerful states (Songhai, Kongo, Benin) that already engaged in a trans-Saharan slave trade. After 1492 Europeans pulled that trade westward across the Atlantic.\n\nAfter 1492 three developments redefined the hemisphere:\n- The **Columbian Exchange** of pathogens, plants, animals, and people (1.4).\n- **Spanish conquest** of Aztec and Inca empires followed by a caste-based colonial system (1.5).\n- Emergence of **racialized chattel slavery** linking Africa, the Americas, and Europe (1.5-1.6).\n\nThe period ends in 1607 with the founding of Jamestown — the first permanent English colony — opening Period 2.",
    keyIdeas: [
      "Pre-contact Americas were densely populated and politically diverse.",
      "European expansion was driven by commerce, religion, and state competition, enabled by shipping + gunpowder technology.",
      "Contact triggered the Columbian Exchange, which reshaped both hemispheres biologically and economically.",
      "Spain built the first large European colonial system in the Americas; racialized African slavery became tied to it.",
    ],
    commonMistakes: [
      "Describing pre-contact Native societies as uniformly 'primitive' or nomadic.",
      "Treating 'Europe' as monolithic — it was fragmented and competitive.",
      "Forgetting West Africa as the third party in the Atlantic system.",
    ],
  },
  "1.2": {
    id: "1.2",
    title: "Native American Societies Before European Contact",
    summary:
      "Native peoples adapted to their regional environments, producing distinctive economies, governments, and belief systems across the hemisphere.",
    lesson:
      "Native American cultural variation tracked **environment**. Five regional patterns anchor the APUSH framework:\n\n- **Southwest (Pueblo, Hohokam, Anasazi)**: maize-bean-squash agriculture enabled by irrigation; adobe cities like Chaco Canyon and Mesa Verde; religious life centered on kivas.\n- **Great Basin and Great Plains**: arid, difficult farming; semi-nomadic or nomadic peoples hunted bison, gathered plants. Mounted Plains horse culture only emerges AFTER Spanish contact reintroduces horses.\n- **Northwest and California**: abundant salmon, acorns, coastal resources supported dense, sedentary, non-agricultural societies (Chinook, Chumash). Status hierarchies (potlatch) without farming.\n- **Mississippi River Valley (Mound Builders)**: Cahokia near present-day St. Louis was an urban center of perhaps 20,000 c. 1100 CE, built on maize agriculture moved north from Mesoamerica.\n- **Northeast Woodlands (Iroquois, Algonquian)**: mixed hunting, fishing, and Three Sisters farming (corn, beans, squash). The **Iroquois Confederacy** (Haudenosaunee) of five (later six) nations was a sophisticated federation with a Great Law of Peace.\n\nMesoamerican and Andean societies — **Aztec** and **Inca** — were imperial polities with millions of subjects, tribute states, monumental architecture, and developed calendars/record-keeping (quipu, glyphs). These empires, not 'empty land,' were what Spanish conquistadors encountered.\n\nCommon threads across this diversity: spiritual relationships with land, matrilineal or kin-based organization in many societies, and trade networks linking distant regions (e.g., obsidian, shell beads, copper).",
    keyIdeas: [
      "Environment drove regional adaptation — the Southwest, Plains, Northwest, Mississippi, and Northeast each had distinctive economies.",
      "Agriculture (especially maize) supported the densest, most hierarchical societies; non-agricultural salmon/acorn economies in the Northwest still supported complex societies.",
      "The Iroquois Confederacy and Mississippian mound cities show sophisticated political organization predating European contact.",
      "Aztec and Inca empires ruled millions — contact was with empires, not empty land.",
    ],
    commonMistakes: [
      "Assuming all Native societies were nomadic — many were urban and agricultural.",
      "Placing horses and the Plains riding culture in the pre-contact period — horses were reintroduced by Spaniards.",
      "Underestimating pre-contact population (widely estimated 50-100M).",
    ],
    workedExample: {
      prompt:
        "Briefly explain ONE specific way that the natural environment shaped the development of a Native American society before European contact.",
      solution:
        "The arid environment of the Southwest led Pueblo peoples to develop irrigation-based maize agriculture, which in turn supported densely populated adobe settlements such as Mesa Verde and Chaco Canyon. Because reliable water was scarce, Pueblo societies built water-management systems that required coordinated labor and supported the emergence of kiva-centered religious and political institutions — a settled, agricultural pattern that contrasts with the mobile hunter-gatherer societies of the neighboring Great Basin.",
    },
  },
  "1.3": {
    id: "1.3",
    title: "European Exploration in the Americas",
    summary:
      "Between 1450 and 1600 European states — especially Portugal and Spain — launched oceanic voyages driven by 'God, gold, and glory,' enabled by new ship and navigation technology.",
    lesson:
      "Three forces pushed Europeans across the Atlantic:\n\n1. **Economic**: Ottoman capture of Constantinople (1453) choked off overland access to Asian spices, silk, and precious metals. Rulers wanted a sea route.\n2. **Religious**: Catholic monarchs sought to spread Christianity after the *Reconquista* ended Muslim rule in Iberia (1492).\n3. **Political**: competition among Spain, Portugal, France, England, and the Netherlands for prestige, territory, and revenue.\n\nNew **technology** made oceanic travel possible: the **caravel** (maneuverable lateen-rigged ship), magnetic compass, astrolabe, improved maps, and gunpowder weapons.\n\n**Portugal** led early, pioneering African coastal trade under Prince Henry the Navigator, rounding the Cape of Good Hope (Dias, 1488) and reaching India (da Gama, 1498).\n\n**Spain** bet on a westward route. **Columbus** (1492) reached the Bahamas; he died believing he had found Asia. The **Treaty of Tordesillas** (1494), brokered by the pope, divided the 'non-Christian world' between Spain (west) and Portugal (east) — giving Portugal Brazil and Spain the rest of the Americas.\n\n**Spanish conquistadors** followed: Balboa crossed Panama (1513); Magellan's crew circumnavigated the globe (1519-22); Cortés toppled the Aztec Empire (1521); Pizarro the Inca (1533). Silver mines at **Potosí** (1545) began flooding Europe with bullion, triggering price revolution (inflation) across the continent.\n\nEngland, France, and the Netherlands came late. England's failed Roanoke colony (1585) and John Cabot's claim (1497) were modest compared to Spain's empire — but the English would dominate North America's eastern seaboard by the 17th century.",
    keyIdeas: [
      "Motivations: God, gold, glory — religion, wealth, state competition.",
      "Technology (caravel, compass, astrolabe, gunpowder) enabled oceanic voyages.",
      "Portugal along Africa to Asia; Spain westward to the Americas.",
      "Treaty of Tordesillas (1494) split the Americas between Spain and Portugal.",
      "Silver from Potosí integrated the Americas into a global economy and fueled European inflation.",
    ],
    commonMistakes: [
      "Crediting Columbus with knowing he had found a new continent — he did not.",
      "Confusing the Line of Demarcation — Portugal got Brazil and routes east; Spain got the rest of the Americas.",
      "Ignoring Ottoman blockade of overland routes as a trigger for oceanic exploration.",
    ],
    workedExample: {
      prompt:
        "Briefly explain ONE specific technological development that made European exploration of the Americas possible.",
      solution:
        "The caravel, a maneuverable ship with triangular lateen sails, allowed Portuguese and later Spanish crews to sail against the wind and travel safely along unfamiliar coasts. Combined with the magnetic compass and improved astrolabes for celestial navigation, the caravel made trans-Atlantic voyages practical for the first time — making Columbus's 1492 crossing and the subsequent Spanish colonization of the Caribbean possible.",
    },
  },
  "1.4": {
    id: "1.4",
    title: "Columbian Exchange, Spanish Exploration, and Conquest",
    summary:
      "After 1492 plants, animals, people, and pathogens crossed the Atlantic in both directions. Disease collapsed Native populations, enabling Spanish conquest of the Aztec and Inca empires.",
    lesson:
      "The **Columbian Exchange** is the bi-directional transfer of organisms, goods, and people across the Atlantic after 1492.\n\n**To the Americas**: wheat, rice, sugar, coffee, bananas; horses, pigs, cattle, sheep, chickens; measles, smallpox, influenza, typhus, malaria, yellow fever.\n\n**To Europe and Africa**: maize, potatoes, tomatoes, cassava, beans, squash, tobacco, cacao; syphilis (most likely); new sources of silver and gold.\n\n**Demographic catastrophe**: Native populations had no acquired immunity to Eurasian diseases. Estimates range widely, but 50-90% mortality over the first century is the scholarly consensus. Entire societies collapsed before most Europeans ever arrived in person.\n\n**Spanish conquest** leveraged this disaster. **Cortés** (1519-21) allied with Aztec rivals (Tlaxcalans), exploited Aztec ruler Moctezuma's hesitation, and benefited from a smallpox epidemic that weakened Tenochtitlán in 1520-21. **Pizarro** (1532-33) captured the Inca Atahualpa amid a smallpox-driven civil war between Atahualpa and his brother Huáscar.\n\nOnce conquest was complete, the Spanish built the **silver economy** on Potosí (Bolivia) and Zacatecas (Mexico) labor — extracted first under the encomienda and later the mita/repartimiento systems (1.5). Silver flowed to Spain, then to China in exchange for luxury goods, globally integrating markets for the first time and causing inflation in Europe (the 'price revolution').\n\n**In Europe**, American foods transformed diets: the **potato** alone may have boosted European population by 25% by 1800, because it yielded more calories per acre than any grain.\n\nThe Columbian Exchange is APUSH's first big example of **interconnected global causation**: one ship's arrival in the Caribbean reshapes Andean mining, Ming China's economy, and Irish diets.",
    keyIdeas: [
      "Bi-directional transfer: diseases and livestock to Americas; crops (potato, maize, tomato) to Europe.",
      "Disease killed 50-90% of Native populations — the single largest driver of conquest.",
      "Cortés (Aztec 1521) and Pizarro (Inca 1533) used Native allies and disease more than superior arms.",
      "Potosí silver globalized markets and caused European inflation.",
    ],
    commonMistakes: [
      "Attributing Spanish victories primarily to horses or guns rather than disease and alliances.",
      "Treating the Columbian Exchange as only harmful or only beneficial — it was transformative in both directions.",
      "Forgetting the potato's demographic impact on Europe.",
    ],
    workedExample: {
      prompt:
        "Briefly explain ONE specific effect of the Columbian Exchange on either Europeans or Native Americans.",
      solution:
        "The introduction of Eurasian diseases such as smallpox to the Americas produced catastrophic demographic collapse among Native Americans, with mortality rates estimated between 50 and 90 percent in the first century after contact. This population loss destabilized Native political systems — for example, a smallpox epidemic in 1520-21 Tenochtitlán weakened Aztec resistance and enabled Cortés's conquest — and opened labor and land for Spanish colonization across Mesoamerica and the Andes.",
    },
  },
  "1.5": {
    id: "1.5",
    title: "Labor, Slavery, and Caste in the Spanish Colonial System",
    summary:
      "Spain built a hierarchical colonial society that exploited Native labor through the encomienda and repartimiento and imported enslaved Africans as Native populations collapsed.",
    lesson:
      "Spanish colonies needed labor for silver mines, sugar plantations, and ranches. They developed a sequence of coercive labor systems.\n\n**Encomienda** (1500s): the crown 'entrusted' Native laborers to a Spanish conquistador (encomendero) who could demand labor and tribute in exchange for 'Christianization.' In practice encomienda was forced labor that hastened Native mortality. Reformers, most famously **Bartolomé de las Casas**, denounced it as genocide; his advocacy led to the **New Laws (1542)** that weakened encomienda.\n\n**Repartimiento and mita** replaced encomienda — rotating labor drafts in which Native communities sent workers to Spanish enterprises for set periods. The Andean **mita** conscripted adult men to the Potosí silver mines; tens of thousands died.\n\nAs disease destroyed Native laborers and reform pressure grew, Spain turned to **African chattel slavery** already used on sugar plantations in the Atlantic islands. Enslaved Africans had partial immunity to European diseases and were not protected by Spanish laws governing Native subjects. By 1600, hundreds of thousands had been trafficked to Spanish America; the trade accelerated in the 17th and 18th centuries.\n\n**Casta system**: a racial hierarchy legitimized the colonial order. From top to bottom:\n- **Peninsulares** (born in Spain) — held highest offices.\n- **Criollos** (Creoles, American-born Spaniards) — wealthy but blocked from top posts.\n- **Mestizos** (Spanish + Native), **mulattoes** (Spanish + African), **zambos** (Native + African).\n- **Indios** (Native Americans) — separate legal 'republic of Indians' with tribute obligations.\n- **Africans** (enslaved and free).\n\nRace in Spanish America was negotiable through intermarriage, wealth, and baptism — a contrast APUSH pairs with the rigid Black/white binary that emerged in British North America (2.6).",
    keyIdeas: [
      "Encomienda → repartimiento/mita: Native forced-labor systems to extract silver and crops.",
      "Bartolomé de las Casas pushed reforms (New Laws, 1542) that limited encomienda.",
      "African slavery scaled up as Native populations collapsed.",
      "Casta system created a racial hierarchy with peninsulares on top, Africans/Natives on bottom.",
      "Spanish racial categories were more fluid than the later Anglo-American binary.",
    ],
    commonMistakes: [
      "Confusing encomienda (grant of labor) with hacienda (landed estate) or outright slavery — they overlap but differ legally.",
      "Ignoring Las Casas and intra-Spanish debates — the system had critics inside the empire.",
      "Assuming Spanish-American race hierarchy operated the same way as the later U.S. color line.",
    ],
    workedExample: {
      prompt:
        "Briefly explain ONE specific reason the Spanish shifted from Native to African enslaved labor in their American colonies.",
      solution:
        "Epidemic disease destroyed Native labor forces in the Spanish Caribbean and Mesoamerica, making the encomienda system unsustainable. Enslaved Africans, who had greater immunity to Eurasian diseases from centuries of trans-Saharan trade contact, offered Spanish colonists a labor source that could survive harsh plantation and mining conditions. Combined with reformist pressure like Bartolomé de las Casas's critique of Native enslavement, this demographic reality pushed the Spanish to expand the trans-Atlantic slave trade in the 16th century.",
    },
  },
  "1.6": {
    id: "1.6",
    title: "Cultural Interactions Between Europeans, Native Americans, and Africans",
    summary:
      "Contact produced cultural exchange, syncretism, and resistance as Europeans, Native Americans, and Africans shaped one another in the colonial Atlantic.",
    lesson:
      "Contact was not one-way. All three groups shaped the others, sometimes through blending and sometimes through conflict.\n\n**European → Native**: missionaries (Franciscan, Jesuit, Dominican) spread Catholicism; the Requerimiento (1513) was a legal document read aloud in Spanish demanding Native submission and justifying conquest. Native peoples adopted European crops, metal tools, horses, and sometimes Christianity — often syncretically, blending it with existing beliefs (e.g., the **Virgin of Guadalupe**, who fuses Catholic Marian devotion with the Aztec goddess Tonantzin).\n\n**Native → European**: Europeans adopted Native foods (maize, potatoes, tomatoes, tobacco, chocolate), navigation knowledge, military tactics (woodland warfare), and political concepts (some historians link the Iroquois Great Law of Peace to Enlightenment federal ideas — debated but raised).\n\n**African → American colonies**: enslaved Africans brought agricultural expertise (rice cultivation, especially influential in the Carolina Lowcountry later), musical traditions, linguistic and religious practices (Yoruba, Kongo) that fused with Christianity in **Vodou, Santería, Candomblé**, and African-American Christianity.\n\n**Resistance**:\n- Native peoples resisted through armed revolt — e.g., the **Pueblo Revolt (1680)** led by Popé, which drove Spanish colonists out of New Mexico for 12 years (borderline between Periods 1 and 2 but frequently cited in Period 1 context because it targeted the Spanish colonial system).\n- Native peoples also resisted culturally, retaining languages, religions, and kinship practices despite missionary pressure.\n- Enslaved Africans resisted through escape, sabotage, and uprisings.\n\n**Debate over Native humanity**: the **Valladolid Debate (1550-51)** between Las Casas and Sepúlveda asked whether Natives were rational beings deserving of protection. Las Casas won the argument formally; in practice exploitation continued.\n\nThe core APUSH insight: contact cultures were hybrid, not one group imposing uniformly on another.",
    keyIdeas: [
      "Syncretism: Virgin of Guadalupe, African-Christian fusions (Vodou, Santería).",
      "Europeans adopted Native foods and tactics; Natives adopted European tools, animals, sometimes Christianity.",
      "Pueblo Revolt (1680) is the iconic Native resistance story for this period.",
      "Las Casas vs. Sepúlveda debated Native humanity; formal decision did not end exploitation.",
    ],
    commonMistakes: [
      "Treating Native/African populations as passive recipients rather than active agents.",
      "Overstating total conversion to Christianity — blended practices were more common.",
      "Ignoring African cultural influence on colonial societies.",
    ],
    workedExample: {
      prompt:
        "Briefly explain ONE specific example of cultural blending or resistance between Europeans and Native Americans in the period 1491-1607.",
      solution:
        "In Spanish Mexico, the apparition of the Virgin of Guadalupe to the Native convert Juan Diego in 1531 fused Catholic Marian devotion with veneration of the Aztec goddess Tonantzin at the same hillside shrine. This syncretic figure allowed indigenous Mexicans to adopt Catholicism on partly familiar terms and became a lasting symbol of Mexican identity — illustrating that Native peoples did not simply accept European religion but adapted it through their own cultural frameworks.",
    },
  },
  "1.7": {
    id: "1.7",
    title: "Causation in Period 1",
    summary:
      "Period 1's central causal chain: European technology + state competition + disease + African labor reshape the Atlantic world.",
    lesson:
      "Synthesizing Period 1, APUSH asks you to construct **causal chains** linking contact to its consequences.\n\n**Chain 1 — Why did Europeans come?**\n- Ottoman blockade of overland Asian trade → incentive for sea routes.\n- Dynastic consolidation (Spain after Reconquista 1492) → state capacity to fund voyages.\n- Caravel, compass, astrolabe → technical feasibility.\n- Missionary impulse (post-Reconquista Catholic zeal) → religious justification.\n\n**Chain 2 — Why did conquest succeed?**\n- Smallpox and other diseases collapse Native populations (50-90% mortality).\n- Spanish alliances with rival Native groups (Tlaxcalans against Aztecs).\n- Gunpowder and steel gave tactical (not strategic) advantages.\n- Internal crises (Inca civil war) at the moment of Spanish arrival.\n\n**Chain 3 — Why did racialized slavery emerge?**\n- Native labor force collapses from disease.\n- Las Casas's reforms limit encomienda.\n- Existing Atlantic slave networks (Portuguese-African) could be scaled up.\n- Sugar and silver economies demanded enormous labor inputs.\n\n**Chain 4 — What changed in the Atlantic world?**\n- Americas: demographic collapse, Spanish casta society, forced African migration.\n- Europe: silver inflation ('price revolution'), new foods boost population (potato → Ireland, Northern Europe), wealth shifts from Italy/Germany to Atlantic powers.\n- Africa: intensified slave trade disrupts West African societies; some states (Asante, Dahomey) grow by engaging in it.\n\n**Continuity**: Native societies persisted, Spanish institutions retained feudal elements, Christian missionary work continued.\n\n**Change**: the hemispheres were linked permanently; global markets, disease pools, and agricultural systems became interconnected.",
    keyIdeas: [
      "Multiple causes combined — single-factor explanations (just guns, just disease, just greed) are incomplete.",
      "Short-term vs long-term consequences: immediate conquest + centuries-long demographic and economic reshaping.",
      "Period 1 introduces the Atlantic world as a causal system tying four continents together.",
    ],
    commonMistakes: [
      "Offering single-factor explanations where APUSH rewards multi-causal reasoning.",
      "Ignoring African agency in the Atlantic system — treating the continent as passive.",
      "Conflating short-term and long-term effects.",
    ],
  },

  // =========================================================================
  // PERIOD 2 — 1607-1754
  // =========================================================================
  "2.1": {
    id: "2.1",
    title: "Contextualizing Period 2",
    summary:
      "Between Jamestown's founding (1607) and the Seven Years' War's outbreak (1754), European powers established competing colonial systems in North America with distinct labor regimes, religions, and relationships to Native peoples.",
    lesson:
      "Period 2 is the story of four European colonial systems overlapping in North America:\n\n- **Spanish** (Florida, New Mexico, California later): mission and presidio model; small settler population; assimilationist in rhetoric.\n- **French** (New France along the St. Lawrence and Mississippi): sparse settlement; fur-trade alliances with Native peoples (Huron, Algonquin); intermarriage and Catholic mission work.\n- **Dutch** (New Netherland, 1614-1664): commercial; trade-oriented; tolerant; founded New Amsterdam (later New York after English conquest in 1664).\n- **English** (Virginia 1607, Plymouth 1620, Massachusetts Bay 1630, and on down the coast): large settler populations, permanent family-based communities, and expansion that displaced Native peoples.\n\nThe **English model's distinctiveness** matters for APUSH: large, family-based, land-hungry settler populations produced deeper displacement of Native peoples than French or Dutch models and required a sustained labor supply — first indentured servants, then enslaved Africans (2.3-2.6).\n\nAfrican slavery became central to the southern and Caribbean colonies. By 1750 enslaved Africans were roughly 40% of Virginia's population and a majority of South Carolina's.\n\nReligious diversity within English colonies — Puritans in New England, Anglicans in the Chesapeake and South, Quakers and other dissenters in Pennsylvania, Catholics in Maryland — would matter for Period 3's political culture.\n\nThe period ends on the eve of the **Seven Years' War (1754-63)**, which will break the uneasy equilibrium and set up revolution.",
    keyIdeas: [
      "Four European systems coexisted: Spanish (mission), French (trade/alliance), Dutch (commerce), English (settlement).",
      "English colonies were unusual in being large, family-based, land-hungry — which drove sharper Native conflict.",
      "Regional differences within the English colonies (New England vs. Middle vs. Chesapeake vs. South) set up later sectionalism.",
      "African slavery expanded dramatically during this period in the South and Caribbean.",
    ],
    commonMistakes: [
      "Treating 'British colonies' as uniform — regional differences are huge.",
      "Ignoring French and Spanish colonies that surrounded the British on three sides.",
      "Placing African slavery late in the period — it was large and growing by 1700.",
    ],
  },
  "2.2": {
    id: "2.2",
    title: "European Colonization",
    summary:
      "Spain, France, the Netherlands, and England pursued different colonial strategies driven by national goals, geography, and relationships with Native peoples.",
    lesson:
      "Each European power's colonial strategy reflected its resources and goals.\n\n**Spain** (from the 1500s): extracted wealth, converted Native peoples, and ruled through missions and presidios (forts). Florida's St. Augustine (1565) is the oldest continuously occupied European settlement in the U.S. New Mexico was settled from 1598; Pueblo Revolt (1680) temporarily expelled the Spanish. Spain's small settler population depended on Native labor.\n\n**France** (from 1608, Quebec): fur trade drove everything. Low settler numbers (tens of thousands, not hundreds of thousands) and extensive intermarriage and alliance with Native peoples. Jesuit missionaries accompanied traders. France claimed a huge inland empire — the St. Lawrence Valley, Great Lakes, Mississippi River down to New Orleans (founded 1718) — but the settlement was thin.\n\n**Netherlands** (1614-1664): commercial colonies focused on fur (Fort Orange/Albany) and the Caribbean sugar trade. New Amsterdam was diverse, tolerant, and commercial. England seized it in 1664 and renamed it New York.\n\n**England** (from 1607): a mix of royal, proprietary, and joint-stock company colonies. Unlike Spain and France, England sent large numbers of settlers — driven by overpopulation, religious dissent, and economic opportunity. Major foundings:\n- **Virginia** (1607, Jamestown — joint-stock Virginia Company, then royal colony 1624).\n- **Plymouth** (1620, Separatist Pilgrims).\n- **Massachusetts Bay** (1630, Puritan 'city upon a hill' — John Winthrop).\n- **Maryland** (1634, Catholic refuge — Lord Baltimore).\n- **Rhode Island** (1636, Roger Williams — religious tolerance).\n- **Carolinas** (1663, proprietary).\n- **Pennsylvania** (1681, William Penn — Quaker).\n- **Georgia** (1733, buffer colony, debtors' refuge — James Oglethorpe).\n\n**Key consequence**: the large English settler population — and its insistence on owning land — made displacement of Native peoples more thorough than in French or Spanish North America.",
    keyIdeas: [
      "Spain: mission/presidio, labor extraction.",
      "France: fur trade, alliance, intermarriage, small settler population.",
      "Netherlands: commercial, tolerant, short-lived as a North American power.",
      "England: large, family-based settlement, diverse colony types (royal, proprietary, joint-stock).",
    ],
    commonMistakes: [
      "Confusing royal, proprietary, and charter colonies — a proprietary colony is granted to an owner (Penn, Baltimore); royal is governed directly by the crown.",
      "Forgetting the French inland empire — the Mississippi Valley was French territory for most of this period.",
      "Treating New Amsterdam as insignificant — it set the pluralist, commercial character of later New York.",
    ],
    workedExample: {
      prompt:
        "Briefly explain ONE specific difference between French and English colonization in North America before 1754.",
      solution:
        "French colonization was dominated by the fur trade and relied on small numbers of male traders and missionaries who formed alliances and intermarried with Native peoples like the Huron and Algonquin. English colonization, by contrast, sent tens of thousands of families seeking land for farms — colonies such as Virginia and Massachusetts Bay displaced Native communities to make room for plantations and towns. This demographic difference made English settlement far more disruptive to Native sovereignty than French trading posts.",
    },
  },
  "2.3": {
    id: "2.3",
    title: "The Regions of British Colonies",
    summary:
      "Four distinct regions — New England, Middle, Chesapeake, and Southern (Lower South) — developed different economies, labor systems, and societies that set up later sectional conflict.",
    lesson:
      "British North America was not one society. Four regions diverged in climate, economy, population, and values.\n\n**New England** (Massachusetts, Connecticut, New Hampshire, Rhode Island):\n- Rocky soil, short growing season → subsistence farming + fishing, shipbuilding, trade.\n- Puritan families migrated together → balanced sex ratio, high birth rates, tight-knit towns organized around the Congregational church.\n- Few enslaved people; mostly free family labor.\n- Town meetings and high literacy (to read Scripture) — Harvard (1636) founded to train clergy.\n\n**Middle Colonies** (New York, New Jersey, Pennsylvania, Delaware):\n- Fertile soil + navigable rivers → wheat and other grains ('breadbasket colonies').\n- Religious and ethnic diversity: Dutch, German, Scots-Irish, English Quakers, Jews, Catholics.\n- Mixed labor: free farmers, indentured servants, some enslaved people.\n- Philadelphia and New York became major commercial ports.\n\n**Chesapeake** (Virginia, Maryland):\n- Tobacco monoculture.\n- Early reliance on indentured servants (often paid in land after their 5-7 year term) — produced a large population of poor freedmen.\n- **Bacon's Rebellion (1676)**: Nathaniel Bacon led poor whites, indentured servants, and some enslaved Black men against Governor Berkeley over Native policy and class grievances. Aftermath accelerated the shift from indentured servitude to racialized African slavery — elites wanted a labor force with no freedom dues and no political voice.\n- Anglican Church established.\n- Chesapeake society was male-skewed, disease-ridden, and family life unstable early on; by 1700 stabilization and a rising planter elite.\n\n**Southern / Lower South** (South Carolina, North Carolina, Georgia):\n- Rice and indigo plantations; African enslaved people were majority of S.C. population by 1710.\n- Heavy African cultural influence (Gullah, rice-farming expertise).\n- Plantation elite resembled Caribbean society more than New England's.\n\nThese regional differences will drive disputes over slavery, tariffs, and representation well into the 19th century.",
    keyIdeas: [
      "New England: Puritan, family farms, town meetings, trade/fishing.",
      "Middle Colonies: diverse, grain-exporting, Quaker-influenced tolerance.",
      "Chesapeake: tobacco, indentured servants then enslaved Africans, Anglican.",
      "Lower South: rice/indigo, enslaved African majority, planter aristocracy.",
      "Bacon's Rebellion (1676) pushed the Chesapeake toward African slavery and away from indentured servitude.",
    ],
    commonMistakes: [
      "Treating slavery as primarily a Deep South phenomenon in this period — it was present everywhere.",
      "Confusing Puritans (Massachusetts Bay) with Pilgrims (Plymouth) — Pilgrims were Separatists, Puritans were not.",
      "Missing Bacon's Rebellion's key role in the shift to racialized slavery.",
    ],
    workedExample: {
      prompt:
        "Briefly explain ONE specific way the Chesapeake colonies differed economically from the New England colonies.",
      solution:
        "The Chesapeake colonies of Virginia and Maryland built their economy around tobacco, a labor-intensive cash crop exported to Europe through a plantation system that initially relied on English indentured servants and, after Bacon's Rebellion in 1676, on enslaved Africans. New England colonies, constrained by rocky soil and short growing seasons, developed a mixed economy of subsistence farming, fishing, shipbuilding, and Atlantic trade — and did not require large-scale coerced labor, producing a society organized around family farms and Puritan towns rather than plantations.",
    },
  },
  "2.4": {
    id: "2.4",
    title: "Transatlantic Trade",
    summary:
      "Mercantilist policy bound the colonies to England's economy. The triangular trade linked England, Africa, and the Americas through manufactured goods, enslaved people, and raw materials.",
    lesson:
      "**Mercantilism** held that national wealth was measured in bullion, that colonies existed to benefit the mother country, and that trade should be tightly regulated. England imposed its mercantilist program through the **Navigation Acts** (starting 1651):\n- Enumerated colonial goods (tobacco, sugar, indigo) could be shipped only to England or other English colonies.\n- Goods imported into the colonies had to pass through English ports.\n- Only English or colonial ships with mostly English crews could carry colonial trade.\n\nEnforcement was loose (the period of 'salutary neglect' — 2.7) but smugglers and colonial merchants grew wealthy.\n\n**Triangular trade** (a useful simplification rather than a literal route):\n- **Leg 1**: manufactured goods (firearms, textiles, rum) from Europe/New England to West Africa.\n- **Leg 2 — the Middle Passage**: enslaved Africans shipped to the Caribbean and North America. Mortality of 10-20% per voyage; roughly 12.5 million Africans were trafficked across the Atlantic in total (c. 1500-1870).\n- **Leg 3**: Caribbean sugar and molasses, southern tobacco, New England fish and timber back to Europe.\n\nNew England's distilleries turned Caribbean molasses into rum, completing a triangle within the triangle.\n\n**Effects**:\n- Integrated colonial economies into Atlantic networks.\n- Built fortunes among New England and Middle Colony merchants.\n- Expanded the **African slave trade** to its 18th-century peak.\n- Created economic dependence that English policymakers would leverage (and over-leverage) in the 1760s.\n\nBy 1750 the colonies produced commodities (tobacco, rice, indigo, naval stores, wheat) essential to the British economy, and Britain supplied virtually all colonial manufactured goods.",
    keyIdeas: [
      "Mercantilism: colonies enrich the mother country; regulate trade accordingly.",
      "Navigation Acts restricted colonial trade routes and ship crews.",
      "Triangular trade involved manufactured goods, enslaved Africans, and raw materials — tied England, West Africa, and the Americas.",
      "Middle Passage had 10-20% mortality; ~12.5M Africans trafficked in total.",
      "Salutary neglect let colonial economies grow under loose enforcement.",
    ],
    commonMistakes: [
      "Describing the triangular trade as a literal three-stop route — it was a simplified model.",
      "Understating the Middle Passage's scale.",
      "Missing that the Navigation Acts were widely evaded before the 1760s.",
    ],
    workedExample: {
      prompt:
        "Briefly explain ONE specific effect of the Navigation Acts on the British North American colonies before 1750.",
      solution:
        "The Navigation Acts required colonial exports such as tobacco and sugar to be shipped only to England or other English colonies, which guaranteed a protected market and stimulated a New England shipbuilding industry to carry this traffic. However, loose enforcement — an informal policy of 'salutary neglect' — allowed colonial merchants to smuggle and to develop independent commercial networks with the French and Dutch Caribbean, producing a wealthy, self-confident colonial merchant class that would later resist stricter enforcement after 1763.",
    },
  },
  "2.5": {
    id: "2.5",
    title: "Interactions Between American Indians and Europeans",
    summary:
      "Land hunger, trade, and disease structured colonial-Native relations. Major conflicts — Metacom's War, the Pueblo Revolt, and the Yamasee War — show the range of Native responses.",
    lesson:
      "Two patterns shaped colonial-Native interaction:\n\n**Trade and alliance** were strongest where Europeans wanted furs or allies and had few settlers — the French in New France, the Dutch at Fort Orange, and the early English backcountry. Native leaders (Pocahontas, Metacom at first, Iroquois League) negotiated as sovereigns.\n\n**Displacement and conflict** intensified wherever settlers wanted land — above all the English colonies. Key conflicts:\n\n- **Powhatan Wars** (Virginia, 1610-14, 1622, 1644-46): the Powhatan Confederacy attempted to contain and then expel English settlers after Jamestown. Tobacco boom drove land seizure. After 1646 the Powhatan were effectively subjugated.\n\n- **Pequot War** (1636-37): New England colonists, allied with Narragansett and Mohegan rivals, destroyed the Pequot at the Mystic massacre.\n\n- **Metacom's War / King Philip's War** (1675-76): New England Native peoples, led by Wampanoag sachem Metacom (Philip to the English), launched a devastating war that destroyed roughly a dozen colonial towns and killed thousands on both sides. Colonial victory — with help from Mohawk allies — effectively broke Native military power in southern New England. Proportional to population, it is among the deadliest wars in American history.\n\n- **Pueblo Revolt** (1680): Popé led Pueblo peoples in New Mexico against Spanish priests and officials, killing hundreds of Spaniards and driving the colony out for 12 years. When Spain returned, it softened religious persecution. This is the most successful Native revolt against European power.\n\n- **Yamasee War** (1715-17, South Carolina): Native traders attacked Carolina colonists over debt and enslavement; the war nearly destroyed the colony. Cherokee alliance saved the English.\n\n**Longer-term dynamics**:\n- Native peoples used **diplomatic balancing**, playing European powers against each other (especially Iroquois).\n- **Disease** kept reducing Native populations and eroding political capacity.\n- European goods (guns, metal tools, alcohol) reshaped Native economies and internal politics.\n- **Land treaties** were persistently broken by settler pressure even when crown or colonial governments wanted peace.",
    keyIdeas: [
      "Trade and alliance vs. displacement and conflict — two different logics depending on what Europeans wanted.",
      "Metacom's War (1675-76) was catastrophic for New England Natives and shattered their military power.",
      "Pueblo Revolt (1680) is the most successful Native uprising — expelled Spanish for 12 years.",
      "Native peoples played European powers against each other diplomatically (Iroquois diplomacy).",
    ],
    commonMistakes: [
      "Treating Native peoples as passive victims — they were active military and diplomatic agents.",
      "Confusing the Pequot War with King Philip's War — both are New England conflicts 40 years apart.",
      "Forgetting the Pueblo Revolt as the biggest Native success.",
    ],
    workedExample: {
      prompt:
        "Briefly explain ONE specific cause of conflict between British colonists and Native Americans between 1607 and 1754.",
      solution:
        "British colonial agriculture — tobacco in the Chesapeake, mixed farming in New England — required continual expansion into Native lands, which Native peoples had not agreed to cede. This land hunger triggered Metacom's War in 1675-76, when the Wampanoag sachem Metacom led a regional coalition against New England colonists who had repeatedly encroached on hunting grounds and pressured Native converts. The structural conflict between large settler populations seeking farmland and Native polities seeking to preserve territory made this kind of war recurrent across the period.",
    },
  },
  "2.6": {
    id: "2.6",
    title: "Slavery in the British Colonies",
    summary:
      "Between 1607 and 1754 chattel slavery became entrenched as a racialized, heritable institution in all British colonies, dominant in the South and essential to the Atlantic economy.",
    lesson:
      "Slavery in the British colonies went through three phases between 1607 and 1754.\n\n**Phase 1 — Mixed labor (1619-1660s)**: the first Africans arrived in Virginia in 1619, brought by an English privateer. For several decades some Africans were treated as indentured servants with eventual freedom; others were enslaved. Status was unclear and varied case by case. In the Chesapeake, English indentured servants vastly outnumbered Africans.\n\n**Phase 2 — Codification (1660s-1700s)**: after **Bacon's Rebellion** (1676), Virginia elites decided that indentured servants — many armed, many landless after their terms — were too politically dangerous. Slavery was legally hardened:\n- **Partus sequitur ventrem** (Virginia, 1662): a child's status followed the mother's, making slavery heritable.\n- **1667 Virginia law**: baptism did not confer freedom.\n- **Virginia Slave Codes of 1705**: codified enslaved Africans as property, restricted movement, barred intermarriage with whites, denied legal rights.\n- South Carolina passed similar codes in 1696 and 1712.\n\nSimultaneously, direct imports of enslaved Africans surged as sugar, tobacco, and rice demand rose.\n\n**Phase 3 — Expansion and resistance (1700-1754)**: by 1750, enslaved Africans were ~40% of Virginia's population and a majority of South Carolina's. Plantations grew in size.\n\n**Resistance** took many forms:\n- **Stono Rebellion** (1739, South Carolina): about 80 enslaved Africans, some of whom had been soldiers in the Kongo, seized weapons and marched toward Spanish Florida (which offered freedom). Colonial militia crushed the revolt; South Carolina passed the Negro Act of 1740 tightening controls.\n- **New York Slave Revolt** (1712) and the **New York Conspiracy** (1741).\n- **Day-to-day resistance**: slowed work, broken tools, escape, cultural preservation (language, religion, family).\n\n**Regional variation**:\n- Caribbean (Jamaica, Barbados): enslaved majorities, brutal sugar work, high mortality, constant resistance.\n- Lower South (S.C., Georgia): rice plantations, African majorities.\n- Chesapeake: tobacco, enslaved people lived in smaller units, more contact with free whites.\n- Middle Colonies and New England: smaller numbers, often urban domestic labor, but slavery legal everywhere.\n\nBy 1754 slavery was woven into colonial law, economy, and culture — impossible to remove without structural upheaval.",
    keyIdeas: [
      "Mixed-status Africans (1619-1660s) gave way to racialized chattel slavery by 1705 (Virginia Slave Codes).",
      "Partus sequitur ventrem (1662) made slavery heritable through the mother.",
      "Bacon's Rebellion (1676) accelerated the transition from indentured servitude to African slavery.",
      "Stono Rebellion (1739) was the largest colonial slave revolt; led to harsher codes.",
      "Slavery existed everywhere in the colonies but was most economically central in the Southern colonies.",
    ],
    commonMistakes: [
      "Claiming Africans arrived in 1619 already legally enslaved — the status was ambiguous for decades.",
      "Missing the role of Bacon's Rebellion in pushing the shift to slavery.",
      "Treating New England as slavery-free — slavery was legal everywhere.",
    ],
    workedExample: {
      prompt:
        "Briefly explain ONE specific reason the institution of chattel slavery became more entrenched in the British colonies between 1607 and 1754.",
      solution:
        "After Bacon's Rebellion in 1676, Chesapeake elites grew alarmed at the political danger posed by armed, landless former indentured servants and shifted toward enslaved Africans as a more controllable labor force. This shift was codified in laws like the Virginia slave codes of 1705, which defined enslaved Africans as heritable property with no legal rights. Combined with rising demand for tobacco and rice, this legal and demographic transition made slavery the dominant labor system of the Southern colonies by 1750.",
    },
  },
  "2.7": {
    id: "2.7",
    title: "Colonial Society and Culture",
    summary:
      "The Enlightenment and the Great Awakening reshaped colonial thought; representative assemblies and salutary neglect created political habits that anticipated independence.",
    lesson:
      "Colonial society by 1750 looked recognizably American in several ways.\n\n**Political culture**:\n- **Representative assemblies** emerged in nearly every colony (Virginia House of Burgesses, 1619; Massachusetts General Court). They controlled taxation and increasingly challenged royal governors.\n- **Salutary neglect**: Prime Minister Robert Walpole (1720s-40s) deliberately loosened enforcement of the Navigation Acts. Colonists grew accustomed to self-government and light regulation.\n- Colonial voters were a larger share of the adult male population than in Britain — property qualifications were easier to meet because land was abundant.\n\n**The Enlightenment** (c. 1680-1800):\n- Ideas of natural rights, reason, and consent of the governed spread through books and print culture.\n- John Locke's *Two Treatises* (1689) argued government arises from consent and must protect life, liberty, and property.\n- Benjamin Franklin embodied Enlightenment practicality — science, civic improvement, print, and deism.\n\n**The Great Awakening** (c. 1730s-40s):\n- A wave of emotional, evangelical revivalism across the colonies.\n- Preachers: **Jonathan Edwards** ('Sinners in the Hands of an Angry God,' 1741) and the itinerant **George Whitefield**, whose tours drew tens of thousands in open-air sermons.\n- Split colonial Protestantism between **'Old Lights'** (traditional, rational) and **'New Lights'** (emotional, evangelical).\n- Effects: increased religious diversity (new denominations — Methodists, Baptists); democratized religious authority (ordinary people could claim direct inspiration); contributed to a shared intercolonial experience that foreshadowed revolutionary unity.\n\n**Print culture**: newspapers (Franklin's *Pennsylvania Gazette*), almanacs (*Poor Richard's*), books linked the colonies. The **Zenger Trial** (1735) established a practical basis for press freedom.\n\n**Social structure**:\n- Pronounced regional elites: Southern planters, Boston merchants, Philadelphia Quakers, New York patroon families.\n- Middle class of farmers, artisans, small merchants.\n- Lower strata: indentured servants, free laborers, enslaved people.\n\n**Women** were legally subordinate (coverture) but managed households and farms. Women's role in revivals gave them limited religious authority.\n\nBy 1754 the colonies shared enough in political, religious, and commercial life that intercolonial political action became possible — setting up Period 3.",
    keyIdeas: [
      "Representative assemblies + salutary neglect bred political self-government.",
      "Enlightenment (Locke, Franklin) and Great Awakening (Edwards, Whitefield) reshaped ideas simultaneously.",
      "Great Awakening split Protestants into Old Lights and New Lights; democratized religious authority.",
      "Zenger Trial (1735) established a basis for freedom of the press.",
      "Shared print culture and revivalism built intercolonial identity that later supported revolution.",
    ],
    commonMistakes: [
      "Treating the Enlightenment and Great Awakening as opposites — many colonists participated in both.",
      "Forgetting salutary neglect as the political backdrop for colonial self-rule.",
      "Dating the Great Awakening to the Revolution — it crested in the 1740s.",
    ],
    workedExample: {
      prompt:
        "Briefly explain ONE specific way the Great Awakening influenced colonial society in the 18th century.",
      solution:
        "The Great Awakening democratized religious authority by allowing itinerant evangelists like George Whitefield and ordinary believers to claim spiritual leadership without traditional clerical training, breaking the monopoly of established churches such as the Congregationalists in New England and the Anglicans in the South. This cultural pattern — ordinary people challenging elite authority on moral grounds — established habits of dissent and intercolonial communication that contributed to the revolutionary political resistance of the 1760s and 1770s.",
    },
  },
  "2.8": {
    id: "2.8",
    title: "Comparison in Period 2",
    summary:
      "Period 2 rewards comparison across colonial regions and across European imperial systems: labor, Native relations, religion, and governance all varied by region and metropole.",
    lesson:
      "Period 2 is most often tested through **comparison** — between British colonial regions and between European imperial systems.\n\n**Comparing British regions**:\n- **New England**: fishing, shipbuilding, mixed farms; free family labor; Puritan Congregational; balanced demographics; Metacom's War defined Native relations.\n- **Middle Colonies**: grain 'breadbasket'; mixed labor, some enslaved; religiously and ethnically diverse (Quaker, Dutch Reformed, Lutheran); Penn's treaties produced earlier peace with Native peoples.\n- **Chesapeake**: tobacco; indentured → enslaved; Anglican; male-skewed early then stabilized; Powhatan Wars.\n- **Lower South**: rice and indigo; enslaved African majority by 1710 (S.C.); Anglican; Yamasee War.\n\n**Comparing empires**:\n- **Spanish**: bullion and conversion; small settler population; mission/presidio; elaborate casta hierarchy.\n- **French**: fur trade and alliance; very small settler population; intermarriage and Métis society; Catholic.\n- **English**: large family settlement; Native displacement; Protestant pluralism; rigid Black/white racial binary by 1705.\n\n**Why the differences mattered**:\n- Large English settler populations → deeper Native displacement → more conflict.\n- Different labor systems → different economies → later sectional conflict over slavery.\n- Protestant pluralism vs. Catholic uniformity → later religious liberty norms.\n- Rigid Anglo-American racial binary → the specific American color line that persisted into the 20th century.\n\nKnowing these comparisons matters for LEQ prompts like 'compare the Chesapeake and New England colonies' or 'compare British and French colonization.'",
    keyIdeas: [
      "Four British regions differed in economy, labor, religion, demography, and Native relations.",
      "Spanish, French, and English empires differed in goal, settler scale, and Native policy.",
      "Regional and imperial comparisons are LEQ/DBQ fuel.",
      "Racial categorization was more rigid in Anglo America than in Spanish or French America.",
    ],
    commonMistakes: [
      "Over-generalizing 'the colonies' rather than distinguishing regions.",
      "Ignoring the French and Spanish empires when the prompt only says 'British.'",
      "Treating labor systems as uniform across the South.",
    ],
  },

  // =========================================================================
  // PERIOD 3 — 1754-1800
  // =========================================================================
  "3.1": {
    id: "3.1",
    title: "Contextualizing Period 3",
    summary:
      "Between 1754 and 1800 Britain's North American colonies fought a world war for empire, revolted, declared independence, drafted two constitutions, and launched the first modern republic — all within a single generation.",
    lesson:
      "Period 3 compresses extraordinary political change into 46 years.\n\nIn **1754** the colonies were loyal British subjects enjoying salutary neglect. Between 1754 and 1763 the **Seven Years' War** (French and Indian War in North America) ejected France from North America and tripled Britain's war debt.\n\nTo pay that debt, Britain tightened imperial control — the **Proclamation of 1763**, **Sugar Act** (1764), **Stamp Act** (1765), **Townshend Acts** (1767), **Tea Act** (1773), **Intolerable Acts** (1774). Colonial resistance escalated from pamphlets to boycotts to armed rebellion.\n\nThe **American Revolution** (1775-83) blended Enlightenment philosophy (Locke on natural rights, consent) with older English constitutional traditions (no taxation without representation). The **Declaration of Independence** (July 4, 1776) announced the break; the **Treaty of Paris (1783)** recognized it.\n\nTwo constitutions followed:\n- **Articles of Confederation** (ratified 1781) — a weak central government that could not tax, regulate commerce, or enforce treaties.\n- **U.S. Constitution** (ratified 1788, in force 1789) — a stronger federal system with separated powers, resolved through compromises on representation and slavery.\n\nThe **Washington** and **Adams** administrations tested the new government — financial plan, Whiskey Rebellion, Jay's Treaty, first political parties (Federalists vs. Democratic-Republicans), Alien and Sedition Acts, Kentucky and Virginia Resolutions.\n\nPeriod 3 closes with the **Revolution of 1800** — the peaceful transfer of power from Adams to Jefferson — and sets up an era of Republican dominance.",
    keyIdeas: [
      "From loyal colonies (1754) to independent republic (1783) to functioning federal government (1789).",
      "Post-war British debt drove the tax crisis that sparked revolution.",
      "Two constitutions: weak Articles, then stronger federal Constitution with Bill of Rights.",
      "First party system (Federalists vs. Democratic-Republicans) forms by 1790s.",
    ],
    commonMistakes: [
      "Dating the Revolution to only 1775-1783 — political upheaval ran 1763-1800.",
      "Confusing the Articles with the Constitution — they are two separate documents.",
      "Assuming independence was inevitable in 1763 — reconciliation was plausible well into 1775.",
    ],
  },
  "3.2": {
    id: "3.2",
    title: "The Seven Years' War (The French and Indian War)",
    summary:
      "The Seven Years' War (1754-63) drove France out of North America, doubled British debt, and ended salutary neglect — setting the stage for imperial crisis.",
    lesson:
      "The **French and Indian War** (1754-63) was the North American theater of the global **Seven Years' War**. It began with skirmishes in the Ohio River Valley, where French forts blocked British colonial expansion. A young **George Washington** led Virginia troops to disaster at Fort Necessity (1754).\n\nThe **Albany Plan of Union (1754)**, proposed by Benjamin Franklin, called for an intercolonial council to coordinate defense. The colonies rejected it — too much centralization — but it foreshadowed later union.\n\nThe war went badly for Britain until William Pitt took over war policy (1757), borrowed heavily, paid British regulars, and won decisive victories at Louisbourg (1758) and **Quebec (1759)** under General Wolfe. By 1760 New France had fallen.\n\nThe **Treaty of Paris (1763)** was a British triumph:\n- France lost Canada and all territory east of the Mississippi to Britain.\n- Spain, a late French ally, lost Florida to Britain but gained Louisiana from France.\n- France kept some Caribbean sugar islands.\n\n**Consequences**:\n- **Debt**: Britain's war debt roughly doubled. Parliament moved to make colonies help pay.\n- **Proclamation of 1763**: forbade colonial settlement west of the Appalachians to prevent conflict with Native peoples — angered land-hungry colonists and speculators.\n- **Pontiac's Rebellion (1763-66)**: a pan-tribal uprising led by Ottawa leader Pontiac against British post-war policies; prompted the Proclamation Line.\n- **End of salutary neglect**: Britain began enforcing trade laws and stationing regulars in the colonies.\n- **Colonial self-confidence**: colonists had fought alongside and observed British regulars — and noticed British contempt for colonial troops.\n\nThe war thus produced the two conditions for revolution: British fiscal desperation and colonial resistance to new controls.",
    keyIdeas: [
      "French and Indian War (1754-63) was North American theater of global Seven Years' War.",
      "Britain won; France expelled from North America; Britain gained territory east of Mississippi.",
      "Albany Plan of Union (1754) failed but foreshadowed cooperation.",
      "Proclamation of 1763 barred settlement west of the Appalachians.",
      "War debt + Pontiac's Rebellion → end of salutary neglect.",
    ],
    commonMistakes: [
      "Treating the French and Indian War as separate from the Seven Years' War — it is the same conflict, different theater.",
      "Forgetting the Proclamation of 1763 as a key colonial grievance.",
      "Missing the debt-driven logic of later Parliamentary taxation.",
    ],
    workedExample: {
      prompt:
        "Briefly explain ONE specific way the Seven Years' War contributed to the coming of the American Revolution.",
      solution:
        "The Seven Years' War left Britain with a doubled national debt, prompting Parliament to impose new taxes on the colonies — the Sugar Act of 1764 and the Stamp Act of 1765 — to defray the costs of empire. Because colonists had developed a tradition of self-taxation through their own assemblies, these parliamentary taxes appeared illegitimate, triggering boycotts, the Stamp Act Congress, and the political mobilization that escalated into the Revolution within a decade.",
    },
  },
  "3.3": {
    id: "3.3",
    title: "Taxation Without Representation",
    summary:
      "Between 1764 and 1774 Parliament imposed new taxes and regulations on the colonies; colonists responded with protest, boycott, and eventually open resistance — framing the conflict as a defense of English liberties.",
    lesson:
      "The ten-year tax crisis moved through predictable cycles: **British act → colonial protest → partial repeal → new crisis**.\n\n**Sugar Act (1764)**: lowered the molasses duty but enforced it strictly. Colonists objected to trials in admiralty courts (no juries).\n\n**Stamp Act (1765)**: a direct tax on printed materials (newspapers, legal documents, playing cards). Colonial response was intense:\n- **Virginia Resolves** (Patrick Henry).\n- **Stamp Act Congress** (Oct 1765, nine colonies in NYC) — first intercolonial political meeting.\n- **Sons of Liberty** organized intimidation of stamp distributors.\n- **Non-importation agreements** — boycotts of British goods.\nParliament repealed the Stamp Act (1766) but passed the **Declaratory Act** asserting authority to legislate for the colonies 'in all cases whatsoever.'\n\n**Townshend Acts (1767)**: duties on glass, lead, paint, paper, tea. Colonists boycotted; **John Dickinson's** *Letters from a Farmer* argued against external taxation used for revenue. Most Townshend duties repealed (1770) except the tea tax.\n\n**Boston Massacre (March 5, 1770)**: British soldiers fired into a crowd, killing five (including Crispus Attucks). Paul Revere's engraving turned it into propaganda. John Adams defended the soldiers; most were acquitted.\n\n**Tea Act (1773)**: not a new tax but a monopoly favoring the East India Company. Colonists feared the precedent. **Boston Tea Party (Dec 16, 1773)**: colonists disguised as Mohawks destroyed 340 chests of tea.\n\n**Intolerable / Coercive Acts (1774)**: Parliament's punishment — closed Boston Harbor, altered Massachusetts charter, allowed soldier quartering, moved trials of officials to Britain. The **Quebec Act** extended Canadian boundaries and tolerated Catholicism — added to colonial alarm.\n\n**First Continental Congress (Sept-Oct 1774)**: 12 colonies met in Philadelphia; agreed to the Continental Association (boycott) and to meet again if grievances were unredressed.\n\nBy spring 1775, tensions had militarized. Lexington and Concord followed in April.",
    keyIdeas: [
      "Pattern: tax → protest → partial repeal → new measure.",
      "'No taxation without representation' rooted in English constitutional tradition.",
      "Stamp Act Congress (1765) was the first intercolonial political gathering.",
      "Tea Act (1773) sparked the Boston Tea Party, which triggered the Intolerable Acts.",
      "First Continental Congress (1774) coordinated resistance short of independence.",
    ],
    commonMistakes: [
      "Confusing 'virtual' vs. 'actual' representation — Parliament claimed colonists were virtually represented; colonists denied it.",
      "Thinking colonists wanted independence from the start — most wanted restoration of old rights within the empire.",
      "Forgetting the Declaratory Act: repealing the Stamp Act did not concede principle.",
    ],
    workedExample: {
      prompt:
        "Briefly explain ONE specific way colonists resisted British taxation between 1764 and 1774.",
      solution:
        "Colonists organized nonimportation agreements, coordinated colony by colony, that pledged merchants and consumers to boycott British goods. After the Stamp Act of 1765 and again after the Townshend Acts of 1767, these boycotts cut British exports to the colonies by roughly 40 percent, pressuring London merchants to lobby for repeal. The boycotts also politicized colonial women as household consumers and artisans, creating a shared, intercolonial form of protest that prepared the ground for later cooperation in the Continental Congress.",
    },
  },
  "3.4": {
    id: "3.4",
    title: "Philosophical Foundations of the American Revolution",
    summary:
      "Revolutionaries drew on Enlightenment natural-rights philosophy, English constitutional tradition, and republican ideology to justify independence and design a new government.",
    lesson:
      "Three intellectual streams converged in revolutionary thought:\n\n**1. Enlightenment natural rights (Locke)**:\n- John Locke's *Second Treatise of Government* (1689) argued that people are born with natural rights to life, liberty, and property; government exists by consent to protect those rights; and people may alter or abolish a government that violates them.\n- Jefferson rewrote this as 'life, liberty, and the pursuit of happiness' in the Declaration.\n- Montesquieu's *Spirit of the Laws* (1748) argued for separation of powers — adopted in U.S. Constitution.\n- Rousseau's social contract ideas circulated.\n\n**2. English constitutional tradition**:\n- The 1215 **Magna Carta**, 1628 **Petition of Right**, 1689 **Bill of Rights** had established limits on royal power and the principle of consent to taxation through Parliament.\n- Colonists argued they had the same rights as Englishmen — which included taxation only by their own representatives.\n\n**3. Republican ideology (the 'Country' tradition)**:\n- A strand of English thought — Cato's Letters, Trenchard and Gordon — warned that power always conspires against liberty. Virtue and vigilance were required; luxury and corruption destroyed republics.\n- Colonists read British taxation and standing armies as classic signs of corruption.\n\n**Key revolutionary texts**:\n- **Thomas Paine, *Common Sense* (Jan 1776)**: a cheap pamphlet arguing in plain language for independence and against monarchy. Sold 120,000+ copies in three months; made independence talk mainstream.\n- **Declaration of Independence (July 4, 1776)**: Jefferson's Lockean preamble + list of grievances against George III + declaration of independence.\n- **Federalist and Anti-Federalist papers** (1787-88): debates over the Constitution.\n\n**Limits of revolutionary ideology**:\n- Revolutionaries excluded enslaved people, women, Native peoples, and landless men from the full promise of equality.\n- But the universalist language — 'all men are created equal' — would fuel later movements for abolition, women's rights, and civil rights.\n\nAPUSH wants you to see the Revolution as an ideological event as much as a military one.",
    keyIdeas: [
      "Locke (natural rights) + Montesquieu (separation of powers) + English constitutional rights + republican ideology.",
      "Paine's *Common Sense* (1776) made independence popular and unpretentious.",
      "Declaration of Independence applied Lockean theory to Britain's rule.",
      "Universalist language contained contradictions with slavery, patriarchy, and Native dispossession — contradictions that fueled later reform.",
    ],
    commonMistakes: [
      "Crediting Locke alone — English constitutional history and republican ideology mattered too.",
      "Forgetting Paine — his pamphlet, more than any philosopher, made independence popular.",
      "Treating revolutionary ideology as fully delivered at the time — it was aspirational and contested.",
    ],
    workedExample: {
      prompt:
        "Briefly explain ONE specific way Enlightenment ideas influenced the American Revolution.",
      solution:
        "John Locke's argument that governments derive their authority from the consent of the governed and exist to protect natural rights directly shaped Thomas Jefferson's Declaration of Independence, which asserts that 'all men are created equal' and endowed with 'unalienable Rights' of 'Life, Liberty and the pursuit of Happiness.' This framing allowed the colonies to justify revolution as a lawful response to a government that had violated its compact — converting specific grievances over taxation and military occupation into a universal political principle.",
    },
  },
  "3.5": {
    id: "3.5",
    title: "The American Revolution",
    summary:
      "From Lexington and Concord (April 1775) to the Treaty of Paris (1783), the Americans defeated Britain with help from France — securing independence through a combination of strategic patience, foreign alliance, and ideological commitment.",
    lesson:
      "**Military phases**:\n\n**1775 — Outbreak**:\n- **Lexington and Concord (April 19, 1775)**: British troops marched to seize colonial arms; minutemen engaged. 'The shot heard round the world.'\n- **Second Continental Congress** (May 1775): created the Continental Army, appointed **George Washington** as commander.\n- **Bunker Hill (June 1775)**: costly British victory; showed colonial militia could stand against regulars.\n- **Olive Branch Petition** (July 1775) — a final, rejected attempt at reconciliation.\n\n**1776 — Independence**:\n- Paine's *Common Sense* (January).\n- British evacuated Boston (March) after Washington placed cannons from Ticonderoga on Dorchester Heights.\n- **Declaration of Independence (July 4, 1776)**.\n- British captured New York (summer-fall 1776); Washington retreated through New Jersey.\n- Washington's Christmas night crossing of the Delaware and victory at **Trenton** (Dec 26, 1776) — morale-saving.\n\n**1777 — Turning point**:\n- British plan to split the colonies via the Hudson Valley.\n- **Saratoga (October 1777)** — American victory under Horatio Gates; entire British army under Burgoyne surrendered. This convinced **France** to ally with the United States (formal treaty Feb 1778). Spain and the Netherlands later joined.\n\n**1778-1780 — Southern strategy**:\n- Washington's army wintered at **Valley Forge (1777-78)** under harsh conditions; Baron von Steuben drilled them into a professional force.\n- British shifted to the South, capturing Savannah (1778) and Charleston (1780).\n- Partisan leaders (Francis Marion, 'Swamp Fox') harassed British supply lines; Nathanael Greene's campaign wore down Cornwallis.\n\n**1781 — Yorktown**:\n- Cornwallis retreated to Yorktown, Virginia.\n- French fleet (de Grasse) blocked escape by sea; Washington and Rochambeau trapped him by land.\n- **Cornwallis surrendered Oct 19, 1781**.\n\n**1783 — Peace**:\n- **Treaty of Paris (1783)**: Britain recognized U.S. independence; U.S. boundaries extended from Atlantic to Mississippi, from Great Lakes to 31st parallel (Florida to Spain). Debts and loyalist property issues left unresolved — would fester into the 1790s.\n\n**Why America won**:\n- Home-field advantage, difficult terrain.\n- Washington's strategic patience (avoid decisive loss).\n- French alliance provided money, arms, troops, and a fleet.\n- British logistical challenges across the Atlantic.\n- Ideological commitment — colonists saw themselves fighting for survival.",
    keyIdeas: [
      "Lexington/Concord (1775) opened the war; Treaty of Paris (1783) closed it.",
      "Saratoga (1777) was the diplomatic turning point — brought in the French alliance.",
      "Yorktown (1781) was the military endgame — French fleet + American and French land forces.",
      "Treaty of Paris gave the U.S. the Mississippi boundary and independence; left debts and loyalist issues open.",
    ],
    commonMistakes: [
      "Treating Yorktown as the decisive turning point — Saratoga is the diplomatic turning point, Yorktown the military conclusion.",
      "Overlooking the French (and Spanish, Dutch) role — the war was global.",
      "Skipping Valley Forge's role in professionalizing the Continental Army.",
    ],
    workedExample: {
      prompt:
        "Briefly explain ONE specific reason the Americans won the Revolutionary War.",
      solution:
        "The American victory at Saratoga in October 1777 convinced France to enter the war as a formal ally in 1778, transforming a colonial rebellion into a global conflict that stretched British resources. French loans, weapons, troops under Rochambeau, and the fleet under Admiral de Grasse proved decisive at Yorktown in 1781, where de Grasse's blockade prevented Cornwallis from evacuating by sea. Without this foreign assistance, the Continental Army's limited manpower and finances would likely not have been enough to compel British surrender.",
    },
  },
  "3.6": {
    id: "3.6",
    title: "The Influence of Revolutionary Ideals",
    summary:
      "Revolutionary language of liberty and equality inspired — but did not fully deliver — expanded rights for women, enslaved people, and later movements; it also inspired revolutions abroad.",
    lesson:
      "Revolutionary ideals did not automatically transform American society, but they set in motion real changes and created contradictions that later reformers would exploit.\n\n**Slavery**:\n- **Northern gradual emancipation**: Pennsylvania (1780), Massachusetts (via court, 1783), and other Northern states abolished slavery between 1780 and 1804 — gradual schemes, not instant.\n- The **Northwest Ordinance of 1787** banned slavery in the Northwest Territory, establishing a long-term sectional line.\n- Some Southern states eased manumission (Virginia 1782) and the free Black population grew.\n- But the Constitution protected slavery (three-fifths clause, slave trade clause, fugitive slave clause), and slavery expanded with cotton after 1793.\n\n**Women and 'Republican Motherhood'**:\n- **Abigail Adams** asked her husband John to 'remember the ladies' (1776); he didn't.\n- Women participated in boycotts, made supplies, sometimes fought disguised.\n- The ideology of **Republican Motherhood** gave women a civic role as educators of virtuous citizens — justifying expanded female education but not political rights.\n- **Judith Sargent Murray** ('On the Equality of the Sexes,' 1790) argued for women's intellectual equality.\n\n**Religion**:\n- Virginia Statute for Religious Freedom (1786, Jefferson) separated church and state.\n- First Amendment (1791) forbade a federal establishment.\n- Disestablishment of state churches followed in New England slowly (Massachusetts finally in 1833).\n\n**Native Americans**:\n- Most Native peoples fought with Britain (correctly judging British land policy was less aggressive than American). Treaty of Paris ignored them; the U.S. treated Native lands as conquered.\n- Native dispossession accelerated after 1783.\n\n**International influence**:\n- **French Revolution (1789)**: Declaration of the Rights of Man (1789) echoed American documents; Lafayette corresponded with Jefferson.\n- **Haitian Revolution (1791-1804)**: enslaved people overthrew French rule and slavery — the only successful slave revolution in history.\n- **Latin American independence** (1810s-20s): Bolívar and San Martín invoked American precedent.\n\n**Paradox of Period 3**: the same revolution that proclaimed 'all men are created equal' produced a Constitution that counted enslaved people as 3/5 of a person. This contradiction will drive sectional conflict all the way to 1865.",
    keyIdeas: [
      "Northern gradual emancipation + Northwest Ordinance created a sectional line on slavery.",
      "Republican Motherhood gave women a civic role but not political rights.",
      "Virginia Statute + First Amendment began American separation of church and state.",
      "Native peoples lost ground; Treaty of Paris ignored them.",
      "American Revolution inspired French, Haitian, and Latin American revolutions.",
    ],
    commonMistakes: [
      "Claiming the Revolution immediately freed enslaved people — emancipation was gradual and partial.",
      "Exaggerating women's political gains — Republican Motherhood was an ideological role, not suffrage.",
      "Forgetting Haitian Revolution as the most radical consequence of revolutionary ideals.",
    ],
    workedExample: {
      prompt:
        "Briefly explain ONE specific way the ideals of the American Revolution influenced society in the period 1776-1800.",
      solution:
        "Revolutionary rhetoric that 'all men are created equal' pressured northern states to end slavery, producing gradual emancipation laws beginning with Pennsylvania in 1780. The Northwest Ordinance of 1787 extended this by barring slavery from new territories north of the Ohio River. While these measures left slavery intact in the South and operated gradually rather than immediately, they established a legal sectional line on slavery that shaped national politics — including the Missouri Compromise and Civil War — for the next eight decades.",
    },
  },
  "3.7": {
    id: "3.7",
    title: "The Articles of Confederation",
    summary:
      "The first U.S. constitution (1781-89) created a weak national government suited to revolutionary fears of tyranny but unable to manage finance, commerce, or internal unrest.",
    lesson:
      "The **Articles of Confederation**, drafted 1777 and ratified 1781, reflected the lesson revolutionaries drew from British tyranny: keep the central government weak.\n\n**Structure**:\n- One-house Congress; each state one vote.\n- No president, no federal courts.\n- 9 of 13 states to pass major legislation; unanimity to amend.\n- Congress could declare war, make treaties, coin money — but could NOT tax, regulate interstate commerce, or enforce its decisions.\n\n**Successes**:\n- Won the Revolutionary War (mostly under the Continental Congress that preceded the Articles).\n- **Land Ordinance of 1785**: surveyed the Northwest Territory into a grid of townships; reserved one section for public schools.\n- **Northwest Ordinance of 1787**: set orderly process for territories to become states (five states, later Ohio, Indiana, Illinois, Michigan, Wisconsin); banned slavery in the Northwest Territory; protected civil liberties in new states.\n\n**Failures**:\n- **No taxing power**: Congress could only request money from states; most states paid little. Continental currency became worthless.\n- **No commerce power**: states imposed tariffs on each other; trade disputes multiplied.\n- **No enforcement**: treaties (like the Treaty of Paris) could not be made to bind states; British troops remained in Northwest posts; Spain closed the Mississippi to American trade (1784).\n- **No executive**: Congress conducted foreign policy clumsily.\n\n**Shays's Rebellion (1786-87)**:\n- Massachusetts farmer Daniel Shays, a veteran, led armed farmers to shut down courthouses to stop debt foreclosures.\n- The state militia suppressed it; but Congress could not help.\n- Elites across the states concluded that the government needed to be stronger to protect property and order.\n\n**Response**: **Annapolis Convention (Sept 1786)** called for a convention to address commerce; the Philadelphia meeting (May-Sept 1787) went far beyond that brief and drafted a new Constitution.\n\nAPUSH often contrasts the Articles and the Constitution point-by-point — know both columns.",
    keyIdeas: [
      "Articles: one-house Congress, no tax/commerce powers, no executive, unanimity to amend.",
      "Successes: winning the war, Land Ordinance of 1785, Northwest Ordinance of 1787.",
      "Failures: inability to tax, regulate commerce, enforce treaties, or suppress uprisings.",
      "Shays's Rebellion (1786-87) showed the danger of weakness and pushed elites toward the Philadelphia Convention.",
    ],
    commonMistakes: [
      "Forgetting the Articles' real accomplishments — the Northwest Ordinance is one of the most important early laws.",
      "Crediting the Articles with winning the Revolutionary War — the Articles were not ratified until 1781.",
      "Missing Shays's Rebellion as the specific trigger for the Constitutional Convention.",
    ],
    workedExample: {
      prompt:
        "Briefly explain ONE specific weakness of the Articles of Confederation that led to calls for a new Constitution.",
      solution:
        "The Articles of Confederation gave Congress no power to tax, forcing the national government to depend on voluntary state contributions that were rarely paid in full. As a result, Congress could not pay Revolutionary War debts or maintain a reliable military. When armed farmers in Massachusetts led by Daniel Shays shut down courts in 1786-87 to block debt foreclosures, the national government was unable to respond — alarming elites and prompting the Philadelphia Convention of 1787 that drafted the stronger federal Constitution.",
    },
  },
  "3.8": {
    id: "3.8",
    title: "The Constitutional Convention and Debates over Ratification",
    summary:
      "Delegates at Philadelphia (1787) drafted a new Constitution through compromises on representation, slavery, and federal power; ratification required a contentious state-by-state debate between Federalists and Anti-Federalists.",
    lesson:
      "The **Philadelphia Convention** met May-September 1787. 55 delegates from 12 states (Rhode Island boycotted). George Washington presided; James Madison took the notes and became 'Father of the Constitution.'\n\n**Major disagreements and compromises**:\n\n- **Representation — Virginia Plan vs. New Jersey Plan**:\n  - *Virginia Plan (Madison)*: bicameral legislature with representation by population in both houses (favored big states).\n  - *New Jersey Plan*: unicameral legislature with equal representation per state (favored small states).\n  - **Great Compromise (Connecticut Compromise, Roger Sherman)**: bicameral — House by population, Senate with two per state.\n\n- **Slavery**:\n  - *Three-Fifths Compromise*: enslaved people counted as 3/5 for representation and direct taxation.\n  - *Slave trade clause*: Congress could not ban the international slave trade until 1808.\n  - *Fugitive slave clause*: required return of escaped enslaved people across state lines.\n\n- **Executive**:\n  - Single president with 4-year term, electoral college to choose.\n  - Powers balanced by congressional advise-and-consent, veto override, impeachment.\n\n- **Federalism**:\n  - Enumerated powers for Congress (Art. I, Sec. 8) + supremacy clause + necessary-and-proper clause.\n  - States retained 'reserved' powers (later explicit in 10th Amendment).\n\n**Ratification debate (1787-88)**:\n\n- **Federalists** (Madison, Hamilton, Jay) — favored ratification; wrote **The Federalist Papers** (85 essays) to persuade New York. Key essays:\n  - *Federalist 10* (Madison): large republic controls faction.\n  - *Federalist 51* (Madison): separation of powers and checks and balances — 'if men were angels…'\n  - *Federalist 78* (Hamilton): judicial review.\n\n- **Anti-Federalists** (Patrick Henry, George Mason, Samuel Adams, Mercy Otis Warren) — feared the Constitution created an aristocratic central government far from the people; demanded a **Bill of Rights** and protection for state sovereignty.\n\n**Outcome**: Delaware ratified first (Dec 1787); Virginia and New York ratified after Federalists promised a Bill of Rights. **Ninth state, New Hampshire, ratified in June 1788**, making the Constitution effective. North Carolina and Rhode Island held out until 1789-90.\n\nThe **Bill of Rights** (first ten amendments), drafted by Madison, was ratified in 1791 — fulfilling the Federalist promise.",
    keyIdeas: [
      "Great Compromise: bicameral legislature, House by population + Senate with two per state.",
      "Three-Fifths Compromise + slave trade + fugitive slave clauses entrenched slavery in the Constitution.",
      "Federalists wrote The Federalist Papers; Anti-Federalists demanded a Bill of Rights.",
      "Federalist 10 (large republic) and 51 (checks and balances) are key texts.",
      "Bill of Rights (1791) closed the deal.",
    ],
    commonMistakes: [
      "Confusing the Virginia Plan (population) and New Jersey Plan (equal) — which plan big/small states supported.",
      "Calling the Three-Fifths Compromise a limit on slavery — it boosted Southern representation.",
      "Forgetting that Anti-Federalists, though defeated, won the Bill of Rights.",
    ],
    workedExample: {
      prompt:
        "Briefly explain ONE specific compromise at the Constitutional Convention that addressed conflicts among the states.",
      solution:
        "The Great Compromise, proposed by Connecticut's Roger Sherman, resolved the clash between large and small states over representation by creating a bicameral Congress: a House of Representatives apportioned by population (favoring larger states like Virginia) and a Senate with two seats for each state regardless of size (favoring smaller states like Delaware). This structural compromise made ratification politically possible and established the basic architecture of the U.S. Congress that remains in place today.",
    },
  },
  "3.9": {
    id: "3.9",
    title: "The Constitution",
    summary:
      "The 1787 Constitution created a federal government of enumerated, separated, and checked powers designed to prevent tyranny while enabling national action; the Bill of Rights (1791) added explicit individual protections.",
    lesson:
      "The Constitution is structured around four ideas: **federalism, separation of powers, checks and balances, and popular sovereignty**.\n\n**Federalism**:\n- Powers divided between national and state governments.\n- **Enumerated powers** (Art. I, Sec. 8): tax, regulate interstate commerce, coin money, declare war, raise armies, necessary-and-proper clause.\n- **Supremacy Clause** (Art. VI): Constitution and federal law trump state law.\n- **10th Amendment**: powers not delegated reserved to states or the people.\n\n**Separation of powers** (Montesquieu):\n- **Legislative** (Art. I): Congress makes laws.\n- **Executive** (Art. II): President executes laws, commands military, negotiates treaties (with Senate consent).\n- **Judicial** (Art. III): Supreme Court interprets law. Judicial review (that courts can strike down laws violating the Constitution) was asserted in **Marbury v. Madison (1803)** — Period 4, but foreshadowed here.\n\n**Checks and balances**:\n- Presidential veto; Congressional override.\n- Senate confirmation of appointments and treaties.\n- Impeachment by House, trial by Senate.\n- Judicial review of laws.\n\n**Popular sovereignty**:\n- 'We the People' in the Preamble.\n- House elected directly; Senate by state legislatures (until 17th Amendment, 1913); electors chose president.\n\n**Amendment process** (Art. V): 2/3 of both houses + 3/4 of states. Deliberately difficult.\n\n**The Bill of Rights (1791)** — first ten amendments:\n- **1st**: speech, press, religion, assembly, petition.\n- **2nd**: bear arms.\n- **3rd**: no quartering.\n- **4th**: unreasonable searches.\n- **5th**: due process, no double jeopardy, no self-incrimination.\n- **6th**: speedy jury trial.\n- **7th**: civil jury trial.\n- **8th**: no cruel and unusual punishment.\n- **9th**: unenumerated rights retained.\n- **10th**: powers reserved to states or the people.\n\n**Slavery in the Constitution**: three-fifths clause (Art. I, Sec. 2); 1808 ban on import prohibitions (Art. I, Sec. 9); fugitive slave clause (Art. IV, Sec. 2). The Constitution did not use the word 'slavery' but was saturated with compromises protecting it.\n\nAPUSH will ask you to **evaluate** the Constitution — did it establish a more democratic or more aristocratic government than what came before? Evidence for both: it expanded popular participation in the House, but insulated the Senate, presidency, and judiciary.",
    keyIdeas: [
      "Four ideas: federalism, separation of powers, checks and balances, popular sovereignty.",
      "Enumerated powers + supremacy clause + 10th Amendment define federalism.",
      "Bill of Rights (1791) protects individual liberties from federal government.",
      "Slavery entrenched through 3/5 clause, slave trade clause, fugitive slave clause.",
      "Amendment process is intentionally difficult.",
    ],
    commonMistakes: [
      "Confusing the Bill of Rights with the original Constitution — it was a later addition.",
      "Saying the Constitution abolished slavery — it protected it.",
      "Missing the electoral college's anti-democratic function.",
    ],
    workedExample: {
      prompt:
        "Briefly explain ONE specific feature of the U.S. Constitution that reflects the framers' fear of concentrated power.",
      solution:
        "The Constitution's system of checks and balances — for example, giving Congress the power to impeach and remove a president, requiring Senate consent for presidential appointments and treaties, and empowering the president to veto congressional legislation — prevents any single branch from acting without the cooperation of another. Drawing on Montesquieu's doctrine of separation of powers, the framers designed these overlapping controls because they had seen Parliament and the king act together to violate colonial liberties and wanted a structure that forced ambition to counter ambition.",
    },
  },
  "3.10": {
    id: "3.10",
    title: "Shaping a New Republic",
    summary:
      "Washington (1789-97) and Adams (1797-1801) built federal institutions, survived foreign and domestic crises, and presided over the birth of the first party system.",
    lesson:
      "**Washington's administration (1789-97)**:\n\n- Appointed a cabinet — Secretary of State **Jefferson**, Secretary of Treasury **Hamilton**, Secretary of War Knox, Attorney General Randolph.\n- Signed **Judiciary Act of 1789** — organized the federal court system (Supreme Court with 6 justices, district/circuit courts).\n\n**Hamilton's Financial Plan**:\n- **Assumption** of state Revolutionary debts by the federal government — tied creditors to the nation.\n- **Bank of the United States** (1791) — chartered for 20 years; Jefferson and Madison argued it was unconstitutional (strict construction); Hamilton defended it via the necessary-and-proper clause (loose construction).\n- **Tariff and excise taxes** (including whiskey) to fund debt service.\n- **Encouraged manufactures**: *Report on Manufactures* (1791).\n\n**Political parties emerge**:\n- **Federalists** (Hamilton): strong central government, commercial/manufacturing economy, pro-British, loose construction, elite-led.\n- **Democratic-Republicans** (Jefferson, Madison): limited central government, agrarian economy, pro-French, strict construction, broader (white male) participation.\n\n**Whiskey Rebellion (1794)**: Pennsylvania farmers refused to pay the excise tax. Washington led 13,000 militia to suppress it — showing the federal government's new muscle in contrast to the Articles' paralysis during Shays's Rebellion.\n\n**Foreign policy**:\n- **Neutrality Proclamation (1793)** after France and Britain went to war.\n- **Jay's Treaty (1794)** with Britain — settled some issues (British withdrew from Northwest posts) but didn't address impressment; Democratic-Republicans hated it.\n- **Pinckney's Treaty (1795)** with Spain — gained navigation rights on the Mississippi and access to New Orleans.\n- **Battle of Fallen Timbers (1794)** and **Treaty of Greenville (1795)** — U.S. forced a Native coalition to cede much of present-day Ohio.\n\n**Washington's Farewell Address (1796)**: warned against permanent foreign alliances and political parties (even as parties were already forming).\n\n**John Adams's administration (1797-1801)**:\n- **XYZ Affair (1797-98)**: French agents demanded bribes to negotiate with American envoys. Outrage led to the **Quasi-War** with France (1798-1800, naval, undeclared).\n- **Alien and Sedition Acts (1798)**: Federalist laws targeting Democratic-Republican immigrants and critics — criminalized 'false, scandalous' criticism of the government.\n- **Kentucky and Virginia Resolutions (1798-99)** (Jefferson, Madison): argued states could 'nullify' unconstitutional federal laws — a doctrine that would echo in the 1830s and 1860s.\n- **Convention of 1800** ended the Quasi-War.\n\n**Election of 1800**: Jefferson defeated Adams after a contentious campaign; power transferred peacefully from one party to another — the '**Revolution of 1800**.'",
    keyIdeas: [
      "Washington set precedents: cabinet, two-term limit, farewell address.",
      "Hamilton's plan: assumption of debt, Bank of the U.S., tariff, excise — pro-commerce, loose construction.",
      "First party system: Federalists vs. Democratic-Republicans.",
      "Whiskey Rebellion (1794) showed federal enforcement power.",
      "Alien and Sedition Acts (1798) + Kentucky/Virginia Resolutions raised nullification early.",
    ],
    commonMistakes: [
      "Confusing Whiskey Rebellion (1794, crushed) with Shays's Rebellion (1786-87, exposed weakness) — both relevant but distinct.",
      "Missing that Jay's Treaty was unpopular domestically but important for keeping the peace.",
      "Treating the Alien and Sedition Acts as uncontroversially unconstitutional — they were accepted by Federalist courts at the time.",
    ],
    workedExample: {
      prompt:
        "Briefly explain ONE specific reason the Democratic-Republican Party opposed the Federalist Party in the 1790s.",
      solution:
        "Democratic-Republicans led by Thomas Jefferson and James Madison opposed Alexander Hamilton's plan to charter a national Bank of the United States, arguing that the Constitution nowhere authorized such an institution and that a 'strict construction' of enumerated powers barred it. They feared that Hamilton's program — assumption of state debts, the Bank, and federal support for manufacturing — concentrated economic power in commercial elites and would push the young republic toward the British-style centralized state that revolutionaries had just overthrown.",
    },
  },
  "3.11": {
    id: "3.11",
    title: "Developing an American Identity",
    summary:
      "A distinct American national identity formed slowly through shared revolutionary memory, republican political culture, and developing literature, art, and education — though contested by regional differences.",
    lesson:
      "After independence, Americans had to decide what it meant to be American.\n\n**Shared memory of the Revolution**:\n- The Fourth of July became a national holiday; parades, toasts, and militia musters commemorated independence.\n- Figures like Washington became objects of civic veneration — Charles Willson Peale's portraits, Parson Weems's biography (with the apocryphal cherry-tree story).\n- Revolutionary battlefields and texts (Declaration, Constitution) were treated as sacred.\n\n**Republican political culture**:\n- Emphasis on civic virtue, public spirit, and citizen participation.\n- Suspicion of standing armies, aristocracy, and luxury.\n- Public schools (Jefferson's plans in Virginia; later Horace Mann) to educate virtuous citizens.\n\n**American English and letters**:\n- **Noah Webster** wrote his *American Dictionary* (1828) deliberately to Americanize spelling and build a shared language identity; his 'blue-backed' spelling books were used for generations.\n- Early novelists: Charles Brockden Brown, later Washington Irving and James Fenimore Cooper (Period 4) — drew on American settings and themes.\n\n**Art and architecture**:\n- Neoclassical architecture (Jefferson's Monticello, U.S. Capitol) evoked Roman republican virtue.\n- Peale's, Gilbert Stuart's portraits of founders became national icons.\n\n**Religion**: Protestantism shaped civic discourse; denominations multiplied after disestablishment.\n\n**Tensions and limits**:\n- **Regional identities** (New England Yankee, Southern planter, frontier settler) were often stronger than national identity.\n- **Enslaved people, Native peoples, women** were excluded from the developing 'American' self-image even when they contributed to it.\n- **Language about Native Americans** as 'savages' was baked into national identity — the 'vanishing Indian' narrative began in this period.\n\n**National symbols**:\n- Eagle, flag, 'E pluribus unum,' Lady Liberty — all take shape in this period.\n\n**Republican Motherhood** (see 3.6) gave women a civic role but restricted them to the domestic sphere.\n\nBy 1800 Americans had a political system and shared revolutionary memory, but a single national identity was still forming and contested — an evolution that continues through Period 4.",
    keyIdeas: [
      "Shared revolutionary memory (Fourth of July, Washington veneration) built nationhood.",
      "Republican civic culture emphasized virtue, education, and skepticism of aristocracy.",
      "Noah Webster's dictionary and spellers Americanized the English language.",
      "Regional identities often trumped national identity.",
      "'American' identity excluded enslaved people, Native peoples, and women at the level of rights even as their labor and presence shaped the country.",
    ],
    commonMistakes: [
      "Claiming a fully formed American identity by 1800 — it was still assembling.",
      "Missing women's partial inclusion via Republican Motherhood.",
      "Ignoring how early national identity rested on Native dispossession.",
    ],
  },
  "3.12": {
    id: "3.12",
    title: "Movement in the Early Republic",
    summary:
      "After 1783, Americans pushed west into the Ohio Valley and beyond, displacing Native peoples and testing federal Indian policy through treaties, wars, and the Northwest Ordinance.",
    lesson:
      "Westward expansion accelerated after independence.\n\n**Framework for expansion**:\n- **Land Ordinance of 1785**: surveyed Northwest Territory into a rectangular grid of six-mile-square townships; raised federal revenue through land sales.\n- **Northwest Ordinance of 1787**: procedure for territories to become states on equal footing; banned slavery in the Northwest Territory; protected civil liberties.\n- **Treaty of Paris (1783)** gave the U.S. land east of the Mississippi, but Native peoples who lived there had not ceded their rights.\n\n**Conflict with Native peoples**:\n- **Northwest Indian War (1785-95)**: a confederacy led by Miami and Shawnee leaders resisted American settlers. U.S. defeats at Harmar (1790) and St. Clair's disaster (1791) — the worst American loss to Natives.\n- **Battle of Fallen Timbers (1794)**: General 'Mad' Anthony Wayne defeated the confederacy.\n- **Treaty of Greenville (1795)**: tribes ceded most of present-day Ohio in exchange for payments.\n- Southeast: Creek, Cherokee, Choctaw, Chickasaw, Seminole faced similar pressure; the **Yazoo land fraud (1795)** scandal involved Georgia's sale of Native lands.\n\n**Migration patterns**:\n- New Englanders moved into western New York, northern Ohio, later the Great Lakes.\n- Virginians and Carolinians moved into Kentucky, Tennessee, and later the Gulf states.\n- **Kentucky (1792)** and **Tennessee (1796)** became states.\n- Enslaved people were forcibly moved by their enslavers into new territories.\n\n**Federal Indian policy**:\n- Early Washington policy favored 'civilization' programs (farming, Christianity) to incorporate Native peoples.\n- In practice, land pressure and settler violence dominated outcomes.\n\n**Foreign complications**:\n- Britain retained Northwest posts until Jay's Treaty (1794).\n- Spain closed the Mississippi until Pinckney's Treaty (1795) opened New Orleans to American shipment.\n\n**Long-term significance**:\n- Expansion set a pattern — ordinance → settlement → Native conflict → removal → new state — that repeated across the 19th century.\n- The Northwest Ordinance's ban on slavery in the territory created the sectional geography of free vs. slave states.",
    keyIdeas: [
      "Land Ordinance (1785) + Northwest Ordinance (1787) structured territorial expansion.",
      "Northwest Indian War → Battle of Fallen Timbers (1794) → Treaty of Greenville (1795) opened Ohio.",
      "Kentucky (1792) and Tennessee (1796) become states.",
      "Federal 'civilization' policy coexisted with settler violence and dispossession.",
    ],
    commonMistakes: [
      "Overlooking Native military resistance — St. Clair's defeat (1791) was a major American loss.",
      "Skipping the Northwest Ordinance's slavery ban — it matters for sectionalism.",
      "Treating expansion as peaceful — it was violent and contested.",
    ],
    workedExample: {
      prompt:
        "Briefly explain ONE specific way federal policy shaped westward expansion between 1783 and 1800.",
      solution:
        "The Northwest Ordinance of 1787 established an orderly process for territories north of the Ohio River to apply for statehood on equal footing with existing states once they reached 60,000 free inhabitants. By also guaranteeing civil liberties and banning slavery in the Northwest Territory, the Ordinance attracted settlers and structured the geography of free states, while its process template was reused in later territorial expansion. Its provisions made federal policy — not simply private settlement — the lead driver of U.S. growth into the Ohio Valley.",
    },
  },
  "3.13": {
    id: "3.13",
    title: "Continuity and Change in Period 3",
    summary:
      "Between 1754 and 1800 the United States broke from Britain and built a federal republic, but continuities — slavery, patriarchy, Native dispossession, and Anglo-American legal forms — persisted beneath the revolutionary rhetoric.",
    lesson:
      "**Changes**:\n- From colonies within the British Empire to an independent republic.\n- From monarchy to representative government with separation of powers.\n- From established Anglican Church to constitutional religious liberty (at federal level).\n- From loose colonial trade networks to a national market and Hamilton's financial system.\n- From parochial colonial identities to the beginnings of a national identity.\n- From Articles' weakness to the Constitution's effective federal government.\n- From a loyal colonial population to a politically mobilized citizenry with mass parties by 1800.\n\n**Continuities**:\n- **Slavery persisted** and in the South expanded, protected in the Constitution.\n- **Native dispossession** continued under U.S. authority as it had under British.\n- **Patriarchy** remained intact — women had no federal political rights and limited legal rights.\n- **Anglo-American common law** and jury trial traditions carried over.\n- **Protestantism** remained the cultural default.\n- **Regional differences** (New England, Middle, South) continued to structure politics.\n- **Voting restricted to white men with property** in most states, though property requirements were beginning to ease.\n\n**Evaluating the Revolution's radicalism**:\n- **Radical**: republican government, disestablishment (in most states), northern emancipation, expanded political participation among white men.\n- **Conservative**: slavery protected, women excluded, Native peoples dispossessed, property protected against radical redistribution.\n\nHistorians debate whether the Revolution was 'radical' (Gordon Wood) or incomplete/conservative (some leftist historiography). APUSH rewards students who can marshal evidence on both sides.\n\n**Looking ahead to Period 4**:\n- The Revolution of 1800 transferred power peacefully — but it also inaugurated Republican dominance that lasted 24 years.\n- Slavery and sectionalism, already embedded, would intensify with cotton.\n- Westward expansion would accelerate with the Louisiana Purchase (1803).",
    keyIdeas: [
      "Change: from colonies to republic; from monarchy to representative government; from Articles to Constitution.",
      "Continuity: slavery, patriarchy, Native dispossession, Anglo-American legal forms, Protestant default.",
      "Evaluate radicalism with evidence on both sides.",
      "Period 3 sets up Period 4's sectional and expansionist trajectory.",
    ],
    commonMistakes: [
      "Describing the Revolution as fully radical or fully conservative without nuance.",
      "Ignoring continuities — the framers preserved much of colonial society.",
      "Forgetting the 1800 Revolution as an institutional test passed.",
    ],
  },

  // =========================================================================
  // PERIOD 4 — 1800-1848
  // =========================================================================
  "4.1": {
    id: "4.1",
    title: "Contextualizing Period 4",
    summary:
      "Between 1800 and 1848 the United States tripled in territory, industrialized, democratized (for white men), experienced religious revival, and generated reform movements — while slavery expanded and tensions with Native peoples deepened.",
    lesson:
      "Period 4 is the **age of transformation**. The young republic became a continental, market-driven, and increasingly democratic society.\n\n**Political transformation**:\n- Jeffersonian Republican dominance (1801-25), then breakdown and the rise of the **Second Party System** — Democrats (Jackson) vs. Whigs (Clay).\n- Universal white male suffrage by 1840.\n- First mass political parties with nominating conventions, campaigning, and partisan press.\n\n**Economic transformation — the Market Revolution**:\n- Canals (Erie, 1825), steamboats, railroads, telegraph.\n- Lowell textile mills, interchangeable parts, cotton gin.\n- Shift from subsistence farming to cash-crop and wage labor.\n- North-South economic divergence sharpens: Northern manufacturing + commercial agriculture vs. Southern cotton and slavery.\n\n**Territorial expansion**:\n- Louisiana Purchase (1803), War of 1812 outcomes, Adams-Onís Treaty (1819), Texas annexation (1845), Oregon Treaty (1846), Mexican Cession (1848).\n\n**Religious and cultural transformation**:\n- **Second Great Awakening** (early 1800s-1840s) revivals across the country.\n- Transcendentalism, Hudson River School — distinctly American cultural forms.\n\n**Reform**:\n- Abolitionism, women's rights, temperance, education reform, prison/asylum reform, utopian communities.\n\n**Slavery expands**:\n- Cotton gin (1793) + new territories fuel cotton kingdom.\n- Missouri Compromise (1820) opens the sectional question.\n- Nat Turner's rebellion (1831), Gag Rule (1836-44).\n\n**Native displacement**:\n- Indian Removal Act (1830), Trail of Tears (1838-39).\n\n**End of period**:\n- 1848: Seneca Falls Convention, end of Mexican-American War, California gold discovery — all setting up Period 5's crises.",
    keyIdeas: [
      "Market Revolution reshaped economy, demography, and sectional alignment.",
      "Democratization (for white men) through universal suffrage and mass parties.",
      "Second Great Awakening fueled reform movements.",
      "Territorial expansion across the continent.",
      "Slavery expanded with cotton; sectional tensions rose.",
    ],
    commonMistakes: [
      "Treating 'democratization' as applying to women, Native peoples, or enslaved people — it did not.",
      "Missing the linkage between Second Great Awakening and reform movements.",
      "Skipping the economic roots of sectionalism (cotton + wage labor North).",
    ],
  },
  "4.2": {
    id: "4.2",
    title: "The Rise of Political Parties and the Era of Jefferson",
    summary:
      "The 1800 election inaugurated Democratic-Republican dominance. Jefferson and Madison expanded U.S. territory, fought the War of 1812, and presided over the decline of the Federalists.",
    lesson:
      "**Revolution of 1800**: Jefferson's defeat of Adams transferred power peacefully from Federalists to Democratic-Republicans. The House decided the tied Jefferson-Burr vote, prompting the **12th Amendment (1804)** — separate ballots for president and vice president.\n\n**Jeffersonian governance** (1801-09):\n- Reduced federal spending, cut the army and navy, eliminated excise taxes.\n- But Jefferson kept the Bank of the United States and Hamilton's financial structure.\n- **Marbury v. Madison (1803)**: Chief Justice John Marshall established **judicial review** — the Supreme Court can strike down unconstitutional laws.\n- **Louisiana Purchase (1803)**: bought from Napoleon for $15M; doubled U.S. territory. Jefferson, a strict constructionist, stretched his constitutional principles to do it.\n- **Lewis and Clark Expedition (1804-06)** explored the Louisiana Territory and beyond to the Pacific, guided by Sacagawea.\n- **Embargo Act (1807)**: Jefferson's attempt to coerce Britain and France through trade cut-off; hurt American shippers instead; repealed 1809.\n\n**Madison's administration (1809-17)**:\n- Inherited escalating British impressment of American sailors and British support for Native resistance under **Tecumseh** and his brother **Tenskwatawa (the Prophet)** in the Ohio Valley.\n- **Battle of Tippecanoe (1811)**: William Henry Harrison defeated Tecumseh's confederacy.\n- **War of 1812 (1812-15)**:\n  - 'War Hawks' (Clay, Calhoun) pushed for war over British maritime abuses and Native threat.\n  - Washington, D.C., burned by British (1814); Dolley Madison saved Washington's portrait.\n  - **Hartford Convention (1814-15)**: New England Federalists threatened secession over the war — destroyed the party's national credibility.\n  - **Battle of New Orleans (Jan 1815)**: Andrew Jackson's decisive victory, fought after the **Treaty of Ghent** had already been signed (Dec 1814). Made Jackson a national hero.\n  - Treaty of Ghent restored status quo ante; both sides turned to other matters.\n\n**Era of Good Feelings (1817-25)** under **James Monroe**:\n- Federalists collapsed; nominally single-party period.\n- **American System** (Henry Clay) — tariffs, Bank, internal improvements.\n- Growing sectional tensions under the surface.\n\n**Decline of Federalists**: the Hartford Convention's secession talk, combined with the war's patriotic outcome, ended the Federalist Party as a national force by 1820.",
    keyIdeas: [
      "Revolution of 1800 transferred power peacefully; 12th Amendment (1804) fixed election flaws.",
      "Marbury v. Madison (1803) established judicial review.",
      "Louisiana Purchase (1803) doubled U.S. territory.",
      "War of 1812 ended in a draw but killed the Federalist Party.",
      "Era of Good Feelings masked growing sectional divisions.",
    ],
    commonMistakes: [
      "Treating the War of 1812 as a clear American victory — it was a draw except at New Orleans.",
      "Missing Marbury v. Madison as establishing judicial review.",
      "Forgetting that Jefferson preserved Hamilton's financial institutions even while cutting spending.",
    ],
    workedExample: {
      prompt:
        "Briefly explain ONE specific consequence of the War of 1812 for the United States.",
      solution:
        "The War of 1812 discredited the Federalist Party after New England Federalists at the Hartford Convention of 1814-15 proposed constitutional amendments and hinted at secession just as Andrew Jackson's victory at New Orleans made the war seem a national triumph. Voters branded the Federalists as disloyal, and the party collapsed as a national force by 1820, producing a temporary one-party 'Era of Good Feelings' under James Monroe and clearing the way for the new political alignment of Jacksonian Democrats and Whigs.",
    },
  },
  "4.3": {
    id: "4.3",
    title: "Politics and Regional Interests",
    summary:
      "Economic growth after 1815 magnified regional divisions over tariffs, banking, internal improvements, and — most dangerously — slavery in the territories.",
    lesson:
      "After 1815 three regional economies pulled in different directions:\n\n- **North**: manufacturing + commercial agriculture → wanted **high tariffs** (to protect industry) and **internal improvements** (roads, canals).\n- **West**: agriculture for markets → wanted internal improvements and cheap land.\n- **South**: cotton exports → wanted **low tariffs** (to keep British goods affordable) and did not need federal improvements.\n\n**American System (Henry Clay)**:\n- Protective tariff (**Tariff of 1816**).\n- Second Bank of the United States (1816, chartered for 20 years).\n- Federal internal improvements (mostly blocked by Madison's and Monroe's vetoes — though states built canals).\n\n**Panic of 1819**:\n- First major postwar depression — speculation, bank tightening, falling cotton prices.\n- Hurt the West; produced distrust of the Second BUS.\n\n**Missouri Crisis (1819-21)**:\n- Missouri applied for statehood in 1819. Admission as a slave state would tip the Senate balance (11 free, 11 slave).\n- **James Tallmadge** (NY) proposed gradual emancipation in Missouri — Southerners erupted.\n- **Missouri Compromise (1820, Clay)**: Missouri admitted as slave state; Maine as free state; slavery banned north of 36°30′ in the rest of the Louisiana Territory.\n- Jefferson called it 'a fire bell in the night' — recognized it as an omen.\n\n**Tariff disputes**:\n- **Tariff of 1828 ('Tariff of Abominations')**: high duties that especially hurt the South.\n- **Nullification Crisis (1832-33, see 4.8)**: South Carolina (Calhoun) declared the tariff null; Jackson responded with the Force Bill.\n\n**Internal improvements**:\n- **Erie Canal (1825)** linked NYC to the Great Lakes — built by New York state; transformed the Northeast economy.\n- Turnpikes, steamboats, and early railroads followed.\n\n**McCulloch v. Maryland (1819)**: Marshall Court upheld the federal Bank and struck down Maryland's tax on it, affirming federal supremacy and loose construction.\n\n**Gibbons v. Ogden (1824)**: Marshall Court broadened the federal commerce power over interstate steamboat licensing.\n\nThese regional tensions — tariffs, banking, improvements, and slavery — set up the Jacksonian party alignments and the deeper sectionalism of Period 5.",
    keyIdeas: [
      "Three regions with different economic interests (North, West, South).",
      "American System: tariff + Bank + improvements — Clay's program.",
      "Missouri Compromise (1820): Missouri slave, Maine free, 36°30′ line.",
      "Marshall Court rulings (McCulloch 1819, Gibbons 1824) strengthened federal power.",
      "Tariff of Abominations (1828) set up nullification.",
    ],
    commonMistakes: [
      "Calling Clay's American System 'democratic' — it was nationalist, not populist.",
      "Treating the Missouri Compromise as a solution — it was a postponement.",
      "Forgetting John Marshall — his court rulings defined federal power in this period.",
    ],
    workedExample: {
      prompt:
        "Briefly explain ONE specific reason slavery became a divisive national issue by 1820.",
      solution:
        "Missouri's application for statehood in 1819 threatened to break the sectional balance between free and slave states in the U.S. Senate, where each section had 11 seats. Congressman James Tallmadge's proposed amendment to prohibit new slaves in Missouri ignited bitter debate, forcing Henry Clay to craft the Missouri Compromise of 1820, which admitted Missouri as a slave state, Maine as free, and banned slavery above 36°30′ in the rest of the Louisiana Territory. The crisis exposed how westward expansion inescapably tied territorial growth to the politics of slavery, a linkage that would fuel sectional conflict for the next forty years.",
    },
  },
  "4.4": {
    id: "4.4",
    title: "America on the World Stage",
    summary:
      "Between 1800 and 1848 the U.S. asserted itself in the Western Hemisphere (Monroe Doctrine), settled boundaries with Britain and Spain, and expanded aggressively against Native peoples and Mexico.",
    lesson:
      "**Adams-Onís Treaty (1819)**:\n- Spain ceded Florida to the U.S. and set a boundary between Spanish territory and the Louisiana Purchase (west to the Pacific via the 42nd parallel).\n- Negotiated by Secretary of State **John Quincy Adams** — he considered it his greatest achievement.\n\n**Latin American independence and Monroe Doctrine (1823)**:\n- Between 1810 and 1825 most of Latin America won independence from Spain and Portugal (Bolívar, San Martín).\n- Fearing European reconquest, President **James Monroe** — drafted largely by JQ Adams — declared:\n  - Western Hemisphere closed to further European colonization.\n  - U.S. would not interfere in European affairs or existing European colonies.\n  - Any European intervention in American independent states would be considered a hostile act.\n- The Doctrine had little enforcement power at the time (Britain's navy was really what kept Europeans out), but became a long-term basis for U.S. foreign policy.\n\n**Boundary settlements with Britain**:\n- **Rush-Bagot Agreement (1817)**: demilitarized the Great Lakes.\n- **Convention of 1818**: established U.S.-Canada border at the 49th parallel from Lake of the Woods to the Rockies; joint occupation of Oregon.\n- **Webster-Ashburton Treaty (1842)**: settled the Maine-Canada border.\n- **Oregon Treaty (1846)**: extended the 49th parallel to the Pacific, peacefully resolving 'Fifty-four Forty or Fight.'\n\n**Expansion against Mexico**:\n- **Texas Revolution (1835-36)**: Anglo settlers in Mexican Texas, led by Sam Houston, declared independence. After Alamo (March 1836) and San Jacinto (April 1836), Mexico effectively lost the region, though it did not recognize independence.\n- **Texas annexation (1845)**: Tyler pushed through by joint resolution; triggered the Mexican-American War (see 5.3).\n- **Mexican-American War (1846-48)**: Polk's war; ended with **Treaty of Guadalupe Hidalgo (1848)** — Mexican Cession (present-day California, Nevada, Utah, most of Arizona and New Mexico, parts of Colorado and Wyoming).\n\n**Native peoples treated as foreign nations**:\n- Treaties signed and broken; **Indian Removal Act (1830)** and **Trail of Tears (1838-39)** (see 4.8) displaced Cherokee, Creek, Choctaw, Chickasaw, Seminole from the Southeast.\n\nBy 1848, the U.S. spanned the continent — from Atlantic to Pacific — creating the question 'free or slave?' for each new acquisition. Period 4 ends on this question.",
    keyIdeas: [
      "Adams-Onís Treaty (1819): Florida for the U.S.; continental boundary set.",
      "Monroe Doctrine (1823) closed Western Hemisphere to further European colonization.",
      "Boundary settlements with Britain (1818, 1842, 1846) peacefully set the northern border.",
      "Mexican-American War (1846-48) produced the Mexican Cession.",
      "Expansion raised the 'free or slave' question for every new territory.",
    ],
    commonMistakes: [
      "Assuming Monroe Doctrine had immediate enforcement muscle — it didn't; Britain enforced it.",
      "Confusing Adams-Onís (1819) with the Mexican Cession (1848).",
      "Treating the Oregon Treaty as violent — it was peaceful compromise.",
    ],
    workedExample: {
      prompt:
        "Briefly explain ONE specific way U.S. foreign policy changed between 1800 and 1848.",
      solution:
        "By 1823 the United States had moved from Washington's 1796 advice to avoid 'permanent alliances' to an assertive hemispheric posture expressed in the Monroe Doctrine, which declared the Western Hemisphere closed to further European colonization and warned that any European intervention in the independent states of Latin America would be treated as a hostile act. Although the young U.S. Navy could not enforce this claim alone, the Doctrine signaled a shift from defensive neutrality to an aspiring regional power role that would guide American diplomacy for the next century.",
    },
  },
  "4.5": {
    id: "4.5",
    title: "Market Revolution: Industrialization",
    summary:
      "Between 1815 and 1848 new transportation, communication, and manufacturing technologies created a national market economy — the Market Revolution — concentrating industry in the Northeast and cotton in the South.",
    lesson:
      "The **Market Revolution** describes the interconnected changes that transformed America from local subsistence economies to a national market.\n\n**Transportation revolution**:\n- **Roads and turnpikes**: National Road (begun 1811) from Cumberland, Maryland to Illinois.\n- **Steamboats**: Robert Fulton's *Clermont* (1807) made upstream river travel cheap; Mississippi and Ohio River commerce exploded.\n- **Canals**: the **Erie Canal (1817-25)** linked Albany to Buffalo, connecting the Great Lakes with New York City; cut freight costs from NYC to Buffalo by about 95%. Canal boom followed across the North.\n- **Railroads**: Baltimore & Ohio chartered 1827; by 1840 the U.S. had 3,000 miles of track; by 1860 over 30,000 miles, concentrated in the North.\n- **Telegraph**: Samuel Morse (1844) transmitted 'What hath God wrought' — instantaneous long-distance communication.\n\n**Industrial manufacturing**:\n- **Lowell system** (Massachusetts, 1820s): textile mills employed young farm women ('mill girls') in boardinghouses under paternalistic supervision. Declined in the 1840s as Irish immigrants arrived and wages fell.\n- **Interchangeable parts**: Eli Whitney's firearms contract (1798) pioneered standardized parts; adopted in the Springfield and Harpers Ferry armories and later in the 'American System of Manufactures.'\n- **Cotton gin** (Whitney, 1793): mechanized cleaning short-staple cotton — and thereby vastly expanded slavery in the Deep South (cotton production rose 50× from 1790 to 1860).\n- **Sewing machine** (Howe, 1846; Singer, 1850s).\n\n**Agricultural mechanization**:\n- **John Deere's steel plow** (1837) broke tough prairie soils.\n- **Cyrus McCormick's mechanical reaper** (1831) multiplied wheat yields per labor hour.\n\n**Effects**:\n- Regional specialization: Northeast manufactures, Midwest grain and livestock, South cotton.\n- Rising incomes (for some) and a consumer culture.\n- Urbanization: NYC, Philadelphia, Boston, and new mill towns.\n- Wage labor replaced independent artisan work for many; workers formed early unions.\n- **Cyclical panics** (1819, 1837, 1857) — the new economy was boom-and-bust.\n\nThe Market Revolution produced both abundance and inequality, national integration and deepening sectionalism.",
    keyIdeas: [
      "Erie Canal (1825) symbolized the transportation revolution.",
      "Lowell system: paternalistic textile mills staffed by women.",
      "Interchangeable parts + cotton gin → American System of Manufactures + expanded slavery.",
      "Telegraph (1844) enabled real-time national communication.",
      "Regional specialization: NE manufactures, Midwest grain, South cotton.",
    ],
    commonMistakes: [
      "Treating the Market Revolution as purely beneficial — it produced wage dependence and recurrent panics.",
      "Forgetting that the cotton gin expanded slavery.",
      "Confusing interchangeable parts (Whitney, firearms) with Ford's assembly line (20th century).",
    ],
    workedExample: {
      prompt:
        "Briefly explain ONE specific way the Market Revolution reshaped the U.S. economy between 1815 and 1848.",
      solution:
        "The completion of the Erie Canal in 1825 dramatically lowered the cost of shipping grain and goods between the Great Lakes and New York City — roughly 95 percent per ton — which tied Midwestern agriculture to eastern cities and made New York the nation's premier commercial port. Combined with railroads, steamboats, and the telegraph, the canal integrated regional economies into a national market, specialized Northeastern manufacturing and Midwestern grain production, and accelerated the urbanization of cities like Buffalo, Rochester, and New York.",
    },
  },
  "4.6": {
    id: "4.6",
    title: "Market Revolution: Society and Culture",
    summary:
      "Market expansion created a middle class, a wage-earning working class, new gender roles (cult of domesticity), and surged European immigration — reshaping daily life in the Northern states.",
    lesson:
      "**Class formation**:\n\n- **Middle class** (merchants, professionals, shopkeepers, clerks): rising prosperity, church-centered respectability, investment in education, cult of domesticity.\n- **Working class** (factory workers, day laborers, journeymen, servants): wage dependence, housing and diet insecurity, early union activity.\n- **Enslaved labor** (South): cotton expansion locked millions into intensifying plantation work.\n\n**Gender and family**:\n- **'Cult of Domesticity' / 'True Womanhood'**: an ideology that middle-class women should preside over a virtuous, private domestic sphere marked by piety, purity, submissiveness, and domesticity. Men worked in the competitive public sphere.\n- **Separate spheres** justified excluding women from politics but also carved out a cultural authority that many women turned into activism — abolition, temperance, education.\n- Birth rates declined among the middle class — children became economic costs rather than farm labor.\n\n**Religion**:\n- **Second Great Awakening** (4.10) crested in these decades, especially along the Erie Canal's 'burned-over district' in upstate New York.\n- Revivalism, reformism, and new denominations (Mormons, Millerites/Adventists).\n\n**Immigration**:\n- **Irish** (fleeing the 1845-49 Great Famine) — poor, Catholic, urban laborers in Northeastern cities; faced 'No Irish Need Apply' discrimination.\n- **Germans** — often skilled artisans and farmers who moved into the Midwest; brought beer, lager, and a mix of Catholic and Protestant traditions.\n- Between 1840 and 1860, roughly 4.2 million immigrants arrived — over 10% of the population.\n- **Nativism**: American (Know-Nothing) Party peaked mid-1850s, opposing Catholic immigrants.\n\n**Urbanization**:\n- NYC went from ~60,000 (1800) to over 500,000 (1850).\n- Tenements, cholera epidemics, gangs, and political machines (Tammany Hall) emerged.\n\n**Labor movement**:\n- **National Trades' Union (1834)**; local trade unions of printers, cobblers, and textile workers.\n- **Lowell mill strikes (1834, 1836)** and the **Lowell Female Labor Reform Association** (1845) pushed back against wage cuts and long hours.\n- **Commonwealth v. Hunt (1842, Massachusetts)**: court ruled unions were not illegal conspiracies.\n\nBy 1848, the North looked like an industrializing society with class tensions and reform energy — the South, in contrast, was becoming more slavery-dependent and politically defensive.",
    keyIdeas: [
      "Market Revolution produced a middle class and a wage-earning working class.",
      "Cult of domesticity defined middle-class women's role; also enabled female activism.",
      "Irish and German immigration surged 1840-60; nativism followed.",
      "Urbanization exploded with accompanying disease, housing, and political machine problems.",
      "Early labor organizing — Lowell strikes, trade unions, Commonwealth v. Hunt.",
    ],
    commonMistakes: [
      "Treating the cult of domesticity as just oppression — it created space for reform activism too.",
      "Forgetting German immigration in this period (not just Irish).",
      "Missing nativism's political presence before the 1850s — the Know-Nothing Party grew out of these pressures.",
    ],
    workedExample: {
      prompt:
        "Briefly explain ONE specific way the Market Revolution changed American society between 1800 and 1848.",
      solution:
        "The Market Revolution created a distinct urban middle class — merchants, professionals, clerks — whose households centered on the 'cult of domesticity,' an ideology that idealized women as pious moral guardians of the private home while men worked in the competitive public economy. This separation of spheres excluded middle-class women from formal politics but also gave them cultural authority that many turned into reform activism in the Second Great Awakening, abolitionism, temperance, and women's rights movements — culminating in the 1848 Seneca Falls Convention.",
    },
  },
  "4.7": {
    id: "4.7",
    title: "Expanding Democracy",
    summary:
      "Between 1820 and 1840 most states abolished property qualifications for white men, political participation exploded, and mass parties with nominating conventions and partisan press emerged.",
    lesson:
      "Political democracy expanded dramatically — but narrowly, only for white men.\n\n**Property qualifications fall**:\n- Between 1800 and 1840, most states eliminated property requirements to vote or hold office for white men.\n- New states entering the Union (Indiana 1816, Illinois 1818, Michigan 1837) came in with near-universal white male suffrage.\n- By 1840, 80% of white men could vote.\n\n**Political mobilization**:\n- **Voter turnout** rose from ~25% of eligible voters in 1824 to ~80% in 1840 — a massive jump.\n- Political **nominating conventions** replaced caucuses (Anti-Masons 1831, Democrats 1832).\n- **Partisan press**: newspapers became political organs (Whig *New York Tribune* under Horace Greeley; Democratic *Washington Globe*).\n- Campaign spectacles: barbecues, torchlight parades, slogans ('Tippecanoe and Tyler Too,' 1840).\n\n**Election of 1824 — 'Corrupt Bargain'**:\n- Four Democratic-Republican candidates: Jackson (most popular votes), J.Q. Adams, Clay, Crawford.\n- No electoral majority → House decided. Clay backed Adams; Adams named Clay Secretary of State.\n- Jackson's supporters called it the 'corrupt bargain' — galvanized **Democrats** around Jackson.\n\n**Election of 1828 — Jackson vs. Adams rematch**:\n- Jackson won decisively with expanded white male electorate.\n- Inauguration featured a rowdy crowd at the White House — symbol of popular democracy.\n\n**Rise of the Second Party System**:\n- **Democrats** (Jackson): limited federal power, opposition to Bank, states' rights (with nationalist streak), agrarian base but also urban immigrant voters.\n- **Whigs** (Clay, Webster, later Lincoln): American System, federal activism for internal improvements and industry, moral reform, evangelical Protestant base.\n\n**Limits**:\n- Women, enslaved people, most free Black men, and Native peoples remained excluded.\n- Several Northern states (e.g., Pennsylvania 1838) that had allowed free Black men to vote now disenfranchised them.\n- Property restrictions on women's property persisted.\n\n**Jacksonian 'democracy'** expanded white male political power sharply while narrowing possibilities for Black Americans and women. APUSH wants you to note this dual character — expansion AND exclusion.",
    keyIdeas: [
      "Property requirements fall for white men; voter turnout jumps to 80% by 1840.",
      "'Corrupt Bargain' of 1824 galvanized Jackson's Democratic Party.",
      "Second Party System: Democrats (Jackson) vs. Whigs (Clay).",
      "Nominating conventions, partisan press, campaign spectacle emerge.",
      "Democratization was for white men — not women, enslaved people, or most free Black men.",
    ],
    commonMistakes: [
      "Calling Jacksonian democracy universal — it was white-male suffrage.",
      "Confusing Democrats (Jacksonian) with earlier Democratic-Republicans (Jeffersonian) — they share a lineage but are distinct parties.",
      "Missing disenfranchisement of free Black men in Northern states during this period.",
    ],
    workedExample: {
      prompt:
        "Briefly explain ONE specific way American political participation changed between 1800 and 1840.",
      solution:
        "Between 1800 and 1840 most states eliminated property qualifications for voting by white men, and voter turnout in presidential elections rose from about 25 percent of eligible voters in 1824 to roughly 80 percent in 1840. Combined with the rise of mass nominating conventions, partisan newspapers, and spectacle campaigning — torchlight parades, barbecues, and slogans like 'Tippecanoe and Tyler Too' — these changes transformed elections from elite deliberations into mass popular contests organized by the new Democratic and Whig parties of the Second Party System.",
    },
  },
  "4.8": {
    id: "4.8",
    title: "Jackson and Federal Power",
    summary:
      "Andrew Jackson (1829-37) wielded expanded executive power against the Second Bank, nullification, and Native nations — defining the presidency and the Democratic Party.",
    lesson:
      "Jackson's presidency redefined the executive office and the federal government's use of its power.\n\n**Spoils system**:\n- 'To the victor belong the spoils' (a Jackson ally's phrase) — replaced federal appointees with party loyalists. Institutionalized patronage.\n\n**Bank War**:\n- Jackson considered the Second Bank of the United States an unconstitutional instrument of elite privilege.\n- **Veto of Bank recharter (1832)**: Jackson's veto message was populist — attacked the Bank as aristocratic and foreign-owned.\n- Withdrew federal deposits to **'pet banks'** (state banks).\n- Consequences: easy credit, speculation, and then the **Panic of 1837** (inherited by Van Buren).\n- **Specie Circular (1836)**: Jackson required specie (gold/silver) for public land — contributed to the panic.\n\n**Nullification Crisis (1832-33)**:\n- **Tariff of 1828 ('Abominations')** and **Tariff of 1832** hurt the South.\n- **John C. Calhoun** (Jackson's VP turned opponent) anonymously wrote *South Carolina Exposition and Protest* (1828), arguing states could nullify federal laws.\n- South Carolina declared the tariffs null (November 1832).\n- Jackson's response: **Proclamation to the People of South Carolina** (denied nullification), **Force Bill (1833)** authorizing military action, AND compromise — Clay's **Compromise Tariff of 1833** gradually lowered duties.\n- Crisis ended with nullification defeated but not the idea; it would return in secession.\n\n**Indian Removal**:\n- **Indian Removal Act (1830)**: authorized the president to negotiate treaties trading Native lands east of the Mississippi for lands west.\n- **Worcester v. Georgia (1832)**: Marshall Court ruled Georgia had no authority over Cherokee lands. Jackson allegedly said 'John Marshall has made his decision; now let him enforce it' (probably apocryphal but captures his stance). He ignored the ruling.\n- **Treaty of New Echota (1835)**: a small faction of Cherokees signed it; most rejected it.\n- **Trail of Tears (1838-39)**: under Jackson's successor Van Buren, U.S. troops forced ~16,000 Cherokees from Georgia to Oklahoma; roughly 4,000 died.\n- Similar removals: Choctaw (1830-33), Creek (1836), Chickasaw (1837), Seminole (after bitter Second Seminole War 1835-42).\n\n**Executive power**:\n- Jackson vetoed more bills than all previous presidents combined.\n- Established the president as a direct representative of 'the people' — a claim his opponents ('King Andrew') bitterly resisted.\n\nJackson's record polarizes historians: champion of ordinary white men, or authoritarian architect of ethnic cleansing and patronage corruption. APUSH expects you to hold both.",
    keyIdeas: [
      "Bank War: veto (1832) → pet banks → Panic of 1837 → Specie Circular.",
      "Nullification Crisis (1832-33): Calhoun vs. Jackson; Force Bill + Compromise Tariff.",
      "Indian Removal Act (1830) → Trail of Tears (1838-39).",
      "Worcester v. Georgia (1832) ruled for Cherokee; Jackson ignored it.",
      "Jackson expanded the presidency — 'King Andrew' to his critics.",
    ],
    commonMistakes: [
      "Confusing Nullification Crisis (1832-33) with secession (1860) — related logic but different events.",
      "Crediting Jackson with enforcing Worcester v. Georgia — he defied it.",
      "Treating Jackson's opposition to the Bank as purely principled — personal animosity and political strategy also drove it.",
    ],
    workedExample: {
      prompt:
        "Briefly explain ONE specific way Andrew Jackson used federal power during his presidency.",
      solution:
        "Jackson used federal power to force the removal of Native nations from the Southeast, signing the Indian Removal Act of 1830 and deploying U.S. troops to carry out removals despite the Supreme Court's ruling in Worcester v. Georgia (1832) that Georgia had no jurisdiction over Cherokee lands. The policy culminated in the Trail of Tears of 1838-39, when roughly 16,000 Cherokees were marched to Oklahoma under armed guard and approximately 4,000 died — an exercise of executive power that prioritized settler land hunger over treaty obligations and judicial authority.",
    },
  },
  "4.9": {
    id: "4.9",
    title: "The Development of an American Culture",
    summary:
      "In the early 19th century a distinctively American literature, art, and intellectual life emerged — Transcendentalism, the Hudson River School, and new genres of popular fiction reflected national self-consciousness.",
    lesson:
      "American culture after 1820 grew self-consciously distinct from European models.\n\n**Literature**:\n- **Washington Irving** (*Rip Van Winkle*, 1819; *The Legend of Sleepy Hollow*, 1820) — folklore-infused American settings.\n- **James Fenimore Cooper** (*The Last of the Mohicans*, 1826 — the Leatherstocking Tales) — frontier mythology.\n- **Edgar Allan Poe** — Gothic short stories and poems; inventor of the detective story.\n- **Nathaniel Hawthorne** (*The Scarlet Letter*, 1850) — Puritan psychological drama.\n- **Herman Melville** (*Moby-Dick*, 1851) — American epic (just outside period but often paired).\n- **Walt Whitman** (*Leaves of Grass*, 1855) — democratic free verse.\n- **Emily Dickinson** — private poet of interior life (post-1850 mostly).\n\n**Transcendentalism** (1830s-40s):\n- New England movement emphasizing intuition, nature, self-reliance, and moral reform.\n- **Ralph Waldo Emerson**: essays ('Self-Reliance,' 'Nature') urged individualism and moral vision.\n- **Henry David Thoreau**: *Walden* (1854) on simple living in nature; 'Civil Disobedience' (1849) influenced Gandhi and King.\n- **Margaret Fuller**: *Woman in the Nineteenth Century* (1845) — feminist Transcendentalism.\n- Utopian experiment: Brook Farm (1841-47).\n\n**Art**:\n- **Hudson River School** (Thomas Cole, Frederic Church, Asher Durand): landscape painters who found American nature sublime and spiritually meaningful.\n- **Genre painting** (William Sidney Mount, George Caleb Bingham): scenes of ordinary American life and politics.\n\n**Architecture**: Greek Revival dominated — state capitols, plantation houses — echoing classical republic.\n\n**Popular culture**:\n- Penny press (N.Y. *Sun* 1833, *Herald* 1835) brought cheap daily newspapers to urban masses.\n- Dime novels and illustrated papers.\n- **Minstrel shows** (from 1830s): white performers in blackface caricatured African Americans — a troubling and enormously popular form that shaped racial stereotypes.\n\n**Utopian communities**:\n- **New Harmony** (Owen, 1825): secular communalism.\n- **Oneida Community** (Noyes, 1848): religious communalism; 'complex marriage.'\n- **Shakers**: celibate, gender-egalitarian religious community.\n- **Mormons** (Joseph Smith, 1830; migration to Utah by 1847 under Brigham Young).\n\nThe outcome: by 1848 America had a literary canon, a visual arts tradition, and a variety of experimental communities — all signs that 'America' was culturally coming into its own.",
    keyIdeas: [
      "Transcendentalism: Emerson, Thoreau, Fuller — intuition, nature, reform.",
      "Hudson River School: landscape painting as national art form.",
      "Washington Irving, Cooper, Poe, Hawthorne, Melville, Whitman — American literary canon.",
      "Penny press + minstrel shows = popular culture with political and racial impact.",
      "Utopian communities (New Harmony, Oneida, Shakers, Mormons) expressed reform impulse.",
    ],
    commonMistakes: [
      "Forgetting the Hudson River School as an artistic expression of national identity.",
      "Treating Transcendentalism as apolitical — Thoreau's 'Civil Disobedience' was radical.",
      "Skipping minstrelsy's role in shaping racial culture.",
    ],
  },
  "4.10": {
    id: "4.10",
    title: "The Second Great Awakening",
    summary:
      "A wave of evangelical revivalism (c. 1790s-1840s) democratized religion, preached human perfectibility, and fueled reform movements — temperance, abolition, women's rights.",
    lesson:
      "The **Second Great Awakening** was a series of revivals that crested in the 1820s-40s.\n\n**Key features**:\n- **Emotional, emotional, mass conversion experiences** at camp meetings — the **Cane Ridge Revival** (Kentucky, 1801) drew thousands.\n- **Arminian theology** (free will) displaced Calvinist predestination — ordinary people could choose salvation through faith and moral effort.\n- **Burned-over district** of upstate New York along the Erie Canal — so many revivals 'burned over' that there was little combustible material left.\n- Growth of **Methodists, Baptists** (often itinerant preachers reaching frontier and poor); later **Mormonism** (Joseph Smith's *Book of Mormon*, 1830).\n- Denominations developed extensive lay participation and women's active roles in prayer groups and voluntary societies.\n\n**Preachers**:\n- **Charles Grandison Finney** — the most influential revivalist, urged perfectionism (Christians could approach sinlessness through reform) and emphasized human agency.\n- **Timothy Dwight** (Yale) — earlier figure.\n- **Lyman Beecher** — connected revival to social reform.\n\n**Perfectionism and reform**:\n- If individuals could choose salvation and society could be perfected, then sin should be eliminated in public life.\n- Revivalists and their followers led movements against:\n  - **Alcohol** (Temperance — American Temperance Society, 1826).\n  - **Slavery** (evangelical abolitionism — Garrison, Tappan brothers).\n  - **Sabbath-breaking** (Sabbatarianism).\n  - Lack of education (common-school movement — Horace Mann).\n  - **Prostitution** (Female Moral Reform Society).\n- The Awakening supplied the moral language and organizational forms (voluntary societies, tract publishing, traveling agents) that reform movements used.\n\n**Women's role**:\n- Women were majority of evangelical converts and organizers.\n- Revival experience gave them moral authority; many moved into reform work (WCTU precursors, abolition, women's rights).\n\n**New religious movements**:\n- **Mormons** (Church of Jesus Christ of Latter-day Saints, 1830): founded by Joseph Smith; persecuted and migrated west under Brigham Young to Great Salt Lake (1847).\n- **Millerites / Adventists** predicted Christ's return in 1844; after disappointment, reorganized as Seventh-day Adventists.\n- **Shakers**, **Oneida** community, Transcendentalism adjacent.\n\nBy 1848 the Awakening had restructured American Protestantism, enabled mass reform activism, and created the evangelical political voice that would matter from the 1850s onward.",
    keyIdeas: [
      "Revivalism crested 1820s-40s; 'burned-over district' in upstate New York.",
      "Arminian theology emphasized free will and human agency.",
      "Perfectionism linked revival to social reform (temperance, abolition, education).",
      "Methodists, Baptists, Mormons, Adventists grew; women were central organizers.",
      "Finney was the signature preacher — emphasized perfectionism and reform.",
    ],
    commonMistakes: [
      "Confusing the Second Great Awakening with the First (1730s-40s).",
      "Treating it as purely religious — it was a major political and reform force.",
      "Forgetting women's prominent role.",
    ],
    workedExample: {
      prompt:
        "Briefly explain ONE specific way the Second Great Awakening influenced American reform movements in the early 19th century.",
      solution:
        "The Second Great Awakening's message that individuals and society could be morally perfected through spiritual commitment gave reformers a religious justification for attacking public sins. Preachers like Charles Grandison Finney linked personal salvation to collective moral improvement, inspiring converts to join voluntary societies for temperance (American Temperance Society, 1826), abolition (American Anti-Slavery Society, 1833), and education reform. Women, who were a majority of converts, were especially active in these organizations, which carried evangelical language and structure into political advocacy.",
    },
  },
  "4.11": {
    id: "4.11",
    title: "An Age of Reform",
    summary:
      "Between 1820 and 1848 Americans organized reform movements on an unprecedented scale — abolition, women's rights, temperance, education, prisons/asylums, and utopian communities.",
    lesson:
      "**Abolitionism** (see 4.12 for more detail):\n- **William Lloyd Garrison** launched *The Liberator* (1831), demanding immediate, uncompensated emancipation.\n- **American Anti-Slavery Society** (1833) with Garrison, Tappan brothers, Theodore Dwight Weld.\n- **Frederick Douglass** (*Narrative*, 1845; *North Star*, 1847) — fugitive turned leading abolitionist orator.\n- **Sojourner Truth** — formerly enslaved, abolitionist, women's rights advocate.\n- **Harriet Beecher Stowe** — *Uncle Tom's Cabin* (1852, Period 5).\n- **Underground Railroad** — **Harriet Tubman** (after her 1849 escape).\n- Tactics: petitions, moral suasion, journalism, Liberty Party (1840), aiding fugitives.\n\n**Women's rights**:\n- Grew out of abolition. Women like **Sarah and Angelina Grimké** and **Lucretia Mott** were excluded from the 1840 World Anti-Slavery Convention in London — radicalizing them.\n- **Seneca Falls Convention (1848, Elizabeth Cady Stanton and Mott)**: *Declaration of Sentiments* modeled on the Declaration of Independence; demanded suffrage, property rights, divorce rights, educational access.\n- **Susan B. Anthony** joined the movement soon after.\n\n**Temperance**:\n- **American Temperance Society** (1826) pushed 'teetotalism' (total abstinence).\n- **Maine Law (1851)** became the first state prohibition.\n- Alcohol consumption fell sharply across the period.\n\n**Education**:\n- **Horace Mann** (Massachusetts) pushed publicly funded 'common schools' with professional teachers and a standard curriculum.\n- Early public high schools and normal schools (teacher training).\n- **Mt. Holyoke (Mary Lyon, 1837)** and **Oberlin (1833, co-ed + admitted Black students)** — women's higher education.\n\n**Prisons, asylums, and disability**:\n- **Dorothea Dix** exposed the treatment of the mentally ill and pushed for state-funded asylums.\n- **Penitentiary movement**: Auburn (congregate) and Eastern State (separate) systems — aimed at reform through routine and silence.\n- **Thomas Gallaudet** founded a school for the deaf (1817).\n\n**Utopian experiments**:\n- New Harmony, Brook Farm, Oneida, Shakers, Mormons.\n- Fourier phalanxes.\n\n**Labor reform**:\n- 10-hour day campaigns in factories and for federal workers (won in 1840).\n- Early unions and strikes.\n\n**Common thread**: Reformers shared an Enlightenment + evangelical confidence that human institutions could be remade to reflect moral truth. They often overlapped — the same individuals worked on abolition, women's rights, temperance, and education.",
    keyIdeas: [
      "Abolition: Garrison, Douglass, Tubman, Stowe, AAS, Underground Railroad.",
      "Women's rights: Seneca Falls 1848, Declaration of Sentiments, Stanton and Mott.",
      "Temperance: American Temperance Society, Maine Law (1851).",
      "Education: Horace Mann, common schools, women's colleges.",
      "Dix on asylums; Dorothea Dix on mental health; penitentiary movement.",
    ],
    commonMistakes: [
      "Separating abolition and women's rights — they were intertwined.",
      "Treating Seneca Falls as demanding only suffrage — it demanded property, divorce, and educational rights too.",
      "Missing Dix on mental health reform.",
    ],
    workedExample: {
      prompt:
        "Briefly explain ONE specific reform movement of the early 19th century and its goal.",
      solution:
        "The women's rights movement crystallized at the Seneca Falls Convention in July 1848, organized by Elizabeth Cady Stanton and Lucretia Mott. Its Declaration of Sentiments, modeled on the Declaration of Independence, argued that 'all men and women are created equal' and demanded women's suffrage, control over their own property and wages, equal access to education, and rights within marriage. Although suffrage would not be secured federally until 1920, Seneca Falls launched an organized women's rights movement that pursued these goals for the next seventy-two years.",
    },
  },
  "4.12": {
    id: "4.12",
    title: "African Americans in the Early Republic",
    summary:
      "Free Black communities, abolitionist leaders, and enslaved resistance shaped African American life between 1800 and 1848, as slavery expanded and racial restrictions tightened.",
    lesson:
      "African Americans in Period 4 faced two divergent situations — free communities in the North and the expanding slave system in the South — and fought back on both fronts.\n\n**Free Black communities (North and urban South)**:\n- Gradual emancipation laws freed Northern enslaved people over decades; by 1830 slavery was essentially gone from the North.\n- Free Black churches: **African Methodist Episcopal (AME) Church** founded by Richard Allen (1816).\n- Mutual aid societies, schools, newspapers (**Freedom's Journal**, 1827 — first Black-owned newspaper).\n- **David Walker's Appeal** (1829) — militant pamphlet calling on enslaved people to resist, widely suppressed in the South.\n- Legal and social restrictions: many Northern states barred Black voting, testifying against whites, mixed schooling, interracial marriage.\n- Some free Black migration to **Liberia** via the American Colonization Society (controversial; Douglass and most Black leaders opposed colonization).\n\n**Abolitionist leaders**:\n- **Frederick Douglass** — escaped from slavery (1838), published *Narrative of the Life* (1845), launched *North Star* (1847).\n- **Sojourner Truth** — formerly enslaved itinerant preacher, abolitionist, and women's rights speaker ('Ain't I a Woman?' 1851, technically Period 5).\n- **Harriet Tubman** — escaped 1849, returned repeatedly via the Underground Railroad to free dozens of enslaved people.\n- **Henry Highland Garnet** — called for armed resistance (1843 Buffalo convention).\n\n**Enslaved resistance**:\n- **Gabriel's Rebellion** (Virginia, 1800): planned uprising of enslaved blacksmith Gabriel Prosser, betrayed before execution.\n- **Denmark Vesey Plot** (Charleston, 1822): planned uprising; betrayed; Vesey executed. Led to crackdowns on free Black sailors.\n- **Nat Turner's Rebellion** (Virginia, August 1831): Turner and ~70 followers killed roughly 55-60 white Virginians before being suppressed. Aftermath: Southern states passed harsher slave codes — limiting Black education, assembly, literacy — and closed down open debate over slavery.\n- **Day-to-day resistance**: broken tools, slow work, feigned illness, flight, family preservation, spiritual practice.\n\n**Free Black political organizing**:\n- **Colored Conventions Movement** from 1830 — regular national meetings of Black leaders to strategize on abolition, civil rights, education.\n\n**Tightening of slavery in the South**:\n- Cotton gin + territorial expansion → cotton kingdom → internal slave trade (estimated 1M people forcibly moved from Upper South to Deep South between 1790 and 1860).\n- Slave codes harden after Nat Turner (1831) and the 1830s abolitionist mail crisis.\n- **Gag Rule (1836-44)**: House of Representatives tabled all anti-slavery petitions without debate; John Quincy Adams led the successful fight to repeal it.\n\nBy 1848 slavery was deeper and more politically dangerous than ever, and free Black leaders had built the institutions that would fight it through Period 5.",
    keyIdeas: [
      "Free Black institutions: AME Church (Allen), Freedom's Journal, Walker's Appeal.",
      "Major abolitionists: Douglass, Truth, Tubman, Garnet.",
      "Enslaved revolts: Gabriel (1800), Vesey (1822), Nat Turner (1831).",
      "Nat Turner triggered Southern crackdown on Black literacy and anti-slavery speech.",
      "Gag Rule (1836-44) showed Congress's attempt to silence the issue.",
    ],
    commonMistakes: [
      "Ignoring free Black political and religious institutions.",
      "Treating enslaved people as passive — resistance was constant.",
      "Missing the Gag Rule as a political flashpoint in the House.",
    ],
    workedExample: {
      prompt:
        "Briefly explain ONE specific consequence of Nat Turner's Rebellion (1831) for the American South.",
      solution:
        "Nat Turner's rebellion in August 1831, in which enslaved people killed roughly 55-60 white Virginians before being suppressed, prompted Southern legislatures to pass harsher slave codes that banned teaching enslaved people to read, restricted their movement and assembly, and tightened patrols. Virginia's 1832 legislative debate on gradual emancipation — the last serious Southern white conversation about ending slavery — ended in rejection, after which the South's political elite closed ranks around a pro-slavery defense that included the Gag Rule in Congress from 1836 to 1844.",
    },
  },
  "4.13": {
    id: "4.13",
    title: "The Society of the South in the Early Republic",
    summary:
      "Cotton tied the South to slavery economically, culturally, and politically; the region's society was stratified among planters, yeomen, poor whites, and enslaved people, with ideologies defending slavery's expansion.",
    lesson:
      "The Old South by 1848 was a cotton-driven, slavery-based society.\n\n**The cotton economy**:\n- Eli Whitney's cotton gin (1793) made short-staple cotton profitable across the Deep South's upland soils.\n- Cotton production: ~3,000 bales (1790) → ~2,300,000 bales (1848). By 1860 the U.S. grew 3/4 of world cotton, nearly all with enslaved labor.\n- Cotton was the largest U.S. export — around 60% of export value on the eve of the Civil War.\n- Northern merchants and British textile mills were financially linked to the cotton economy.\n\n**Social hierarchy**:\n- **Planter elite** (~1% owned 50+ enslaved people) — dominated politics, set cultural standards, lived in relative splendor.\n- **Small slaveholders** (~25% of white Southern families owned at least one enslaved person).\n- **Yeoman farmers** — non-slaveholding independent farmers, largest white class; subsistence and some cash crops.\n- **Poor whites** — often landless, marginal economically but insisted on racial privilege.\n- **Free Black people** — ~250,000 by 1860, concentrated in Upper South cities; rights sharply restricted.\n- **Enslaved people** — nearly 4 million by 1860; labor, skill, and culture sustained the region.\n\n**Enslaved life**:\n- Mostly on plantations of 10-50 enslaved people.\n- Families formed despite the law's refusal to recognize slave marriage; sale still broke families.\n- **Culture**: syncretic Christianity (with Black preachers), spirituals, African-derived music and dance, storytelling.\n- **Resistance**: slowed work, sabotage, escape, occasional revolt.\n\n**Pro-slavery ideology**:\n- Early Revolutionary-era rhetoric had called slavery 'a necessary evil.' By the 1830s-40s it became a **'positive good'** defense:\n  - **John C. Calhoun** (1837): slavery 'a positive good' because it supposedly civilized Africans and freed white men for republican citizenship.\n  - **George Fitzhugh** (*Sociology for the South*, 1854 — Period 5): argued that enslaved people were better off than free wage workers in the North.\n  - Ministers defended slavery biblically.\n  - Writers used pseudo-scientific racism.\n\n**Politics**:\n- Southern political power in the federal government rested on the three-fifths clause.\n- Southern leaders worked to expand slavery into territories to keep Senate parity.\n\n**Cultural life**:\n- Honor culture — dueling, paternalism, rigid gender roles.\n- Southern women of the planter class lived under strict patriarchal norms but often managed large households including enslaved labor.\n\n**Key fact**: most white Southerners did NOT own enslaved people, yet slavery shaped nearly every aspect of Southern life — the planter elite's dominance persuaded yeoman and poor whites to defend the system.",
    keyIdeas: [
      "Cotton + gin + slavery = Old South's economic base; 60% of U.S. exports by 1860.",
      "Social hierarchy: planters, small slaveholders, yeomen, poor whites, free Black people, enslaved people.",
      "Pro-slavery ideology shifted from 'necessary evil' to 'positive good' (Calhoun 1837).",
      "Three-fifths clause gave Southern political power at the federal level.",
      "Enslaved culture — music, religion, family — was a form of endurance and resistance.",
    ],
    commonMistakes: [
      "Thinking most Southerners owned enslaved people — only a quarter of Southern white families did.",
      "Treating enslaved people as culturally blank — they built rich cultural and religious traditions.",
      "Dating the 'positive good' defense of slavery too early — it took hold in the 1830s.",
    ],
    workedExample: {
      prompt:
        "Briefly explain ONE specific way the cotton economy shaped the South in the early 19th century.",
      solution:
        "The mechanization of cotton cleaning by Eli Whitney's gin in 1793, combined with expansion into the Deep South after the Louisiana Purchase and Indian removals, made cotton the region's dominant cash crop and drove explosive growth in enslaved labor — U.S. cotton production rose from about 3,000 bales in 1790 to over 2 million bales by 1848. This profitability entrenched the planter elite's political power and led Southern ideologues like John C. Calhoun by 1837 to defend slavery as a 'positive good' rather than a necessary evil, hardening sectional conflict with the free-labor North.",
    },
  },
  "4.14": {
    id: "4.14",
    title: "Causation in Period 4",
    summary:
      "Period 4's central causal question: how did market integration, democratization for white men, and territorial expansion intensify sectional conflict and set up the crisis of Period 5?",
    lesson:
      "**Causal chain 1 — Market Revolution → regional divergence**:\n- Transportation revolution integrates markets.\n- Regional specialization: Northeast manufactures, Midwest grain, South cotton.\n- Northern wage labor + cotton-based Southern slavery → divergent labor systems.\n- Tariff conflicts (1828, 1832) express the divergence politically.\n\n**Causal chain 2 — Democratization → new political order**:\n- Property requirements fall → expanded white male suffrage.\n- Election of 1824 'Corrupt Bargain' → Jacksonian Democrats.\n- Second Party System: Democrats vs. Whigs.\n- Mass parties, nominating conventions, partisan press emerge.\n- Exclusion of women, Black men (sometimes re-disenfranchised), Native peoples from the expansion.\n\n**Causal chain 3 — Second Great Awakening + Enlightenment → reform**:\n- Revivalism + perfectionism → voluntary societies.\n- Abolition, women's rights, temperance, education, asylum reform interlock.\n- Reformers' moral language and organizing techniques shape later sectional politics.\n\n**Causal chain 4 — Territorial expansion → sectional crisis**:\n- Louisiana Purchase (1803), Adams-Onís (1819), Texas (1845), Oregon (1846), Mexican Cession (1848).\n- Each acquisition forces 'free or slave?' decision.\n- Missouri Compromise (1820) postpones the question; Wilmot Proviso (1846) reopens it.\n\n**Causal chain 5 — Slavery expansion + pro-slavery ideology → intransigence**:\n- Cotton gin + new lands → cotton kingdom.\n- Internal slave trade moves 1M people south and west.\n- Nat Turner (1831) → Southern crackdown → Gag Rule → abolitionist mobilization.\n- 'Positive good' defense makes Southern leaders unwilling to negotiate.\n\n**Continuity and change**:\n- **Change**: market economy, mass democracy (white men), territorial scale, cultural identity, reform culture.\n- **Continuity**: slavery persists and deepens; Native dispossession continues; women excluded from formal politics; wage inequality grows.\n\nPeriod 4's contradictions — democratic aspiration + slavery expansion, reform culture + Native removal, national integration + regional divergence — will detonate in Period 5.",
    keyIdeas: [
      "Market Revolution drove regional divergence that fueled sectionalism.",
      "Democratization for white men created mass politics AND excluded women, Black Americans, Native peoples.",
      "Second Great Awakening + Enlightenment produced reform activism across multiple fronts.",
      "Territorial expansion forced the 'free or slave?' question repeatedly.",
      "Pro-slavery ideology hardened, making compromise harder as the period closed.",
    ],
    commonMistakes: [
      "Telling the story of democratization without the exclusions.",
      "Ignoring the economic logic of sectionalism — tariffs and labor systems, not just slavery.",
      "Missing the reform culture's contribution to later anti-slavery politics.",
    ],
  },

  // =========================================================================
  // PERIOD 5 — 1844-1877
  // =========================================================================
  "5.1": {
    id: "5.1",
    title: "Contextualizing Period 5",
    summary:
      "Between 1844 and 1877 the U.S. seized half of Mexico, broke apart over slavery, fought a civil war that ended slavery, and failed to reconstruct the South on equal terms.",
    lesson:
      "Period 5 is the period of **catastrophe and transformation**. The United States spanned the continent by 1848 but then tore itself apart over the question of slavery's expansion.\n\n**Expansion to the Pacific**:\n- Manifest Destiny ideology justified westward expansion.\n- Texas annexation (1845), Oregon Treaty (1846), Mexican-American War (1846-48) delivered the Mexican Cession.\n\n**Sectional crisis**:\n- **Wilmot Proviso (1846)** proposed banning slavery in any territory taken from Mexico — failed but defined the coming fight.\n- **Compromise of 1850**: California free, tougher Fugitive Slave Act.\n- **Kansas-Nebraska Act (1854)** abandoned the Missouri Compromise line, creating 'Bleeding Kansas.'\n- **Dred Scott (1857)** held Congress could not restrict slavery in territories.\n- **John Brown's raid (1859)** — final escalation.\n\n**Civil War (1861-65)**:\n- **Lincoln's election (1860)** triggered secession — 11 Southern states formed the Confederacy.\n- Four years of brutal conflict killed ~750,000 Americans.\n- **Emancipation Proclamation (1863)** and the **13th Amendment (1865)** ended slavery.\n- Wartime federal expansion: income tax, national currency, Homestead Act, Pacific Railway Act, Morrill Land-Grant Act.\n\n**Reconstruction (1865-77)**:\n- **Thirteenth (1865), Fourteenth (1868), Fifteenth (1870) Amendments** reconstructed the constitutional order.\n- Freedmen voted, served in Congress, built institutions.\n- White terrorism (KKK) and federal retreat ended Reconstruction with the **Compromise of 1877**.\n\nBy 1877, slavery was gone but white supremacy returned to the South through Jim Crow, sharecropping, and Supreme Court retrenchment.",
    keyIdeas: [
      "Expansion 1844-48 triggered the sectional crisis.",
      "Every political compromise on slavery unraveled between 1850 and 1860.",
      "Civil War (1861-65) ended slavery and revolutionized federal power.",
      "Three Reconstruction Amendments (13, 14, 15) reconstructed citizenship.",
      "Reconstruction failed by 1877; Jim Crow replaced slavery with legal segregation.",
    ],
    commonMistakes: [
      "Treating the Civil War as solely about states' rights — slavery was the issue.",
      "Thinking Reconstruction gave lasting civil rights — most gains were rolled back by 1900.",
      "Skipping the war's role in transforming the federal government.",
    ],
  },
  "5.2": {
    id: "5.2",
    title: "Manifest Destiny",
    summary:
      "Manifest Destiny — the ideology that the U.S. was divinely destined to span the continent — justified aggressive westward expansion, war with Mexico, and Native removal in the 1840s.",
    lesson:
      "**Manifest Destiny** was coined by journalist **John L. O'Sullivan** in 1845:\n- Americans had a 'manifest destiny' to 'overspread the continent allotted by Providence for the free development of our yearly multiplying millions.'\n- Four ingredients: God's providence, Anglo-Saxon racial destiny, republican liberty spread, and economic opportunity.\n\n**Motivations for expansion**:\n- **Economic**: farmland, Pacific ports for Asia trade, gold (California, 1848).\n- **Strategic**: prevent British/Mexican control of the West.\n- **Demographic pressure**: growing population and settlers pushing west.\n- **Ideological**: racial and religious supremacist beliefs.\n- **Slavery's expansion**: Southerners wanted new slave states.\n\n**Texas annexation (1845)**:\n- Anglo settlers had filled Mexican Texas under terms that required Catholicism and banned slavery; most ignored both.\n- Texas Revolution (1835-36): Alamo, Goliad, San Jacinto. Sam Houston captured Santa Anna; Texas independent.\n- U.S. delayed annexation because of slavery politics.\n- **James K. Polk** (Democrat, elected 1844) ran on annexation.\n- Outgoing President Tyler pushed through annexation by joint resolution (Feb 1845).\n\n**Oregon**:\n- U.S. and Britain had jointly occupied Oregon since 1818.\n- '54-40 or Fight' slogan in Polk's campaign threatened war with Britain.\n- **Oregon Treaty (1846)** peacefully extended the 49th parallel boundary to the Pacific.\n\n**Mormon migration (1846-47)**:\n- Under Brigham Young, Latter-day Saints trekked from Illinois (after Joseph Smith's murder 1844) to the Great Salt Lake, establishing Utah as a Mormon commonwealth.\n\n**California Gold Rush (1849)**:\n- Gold discovered at Sutter's Mill (Jan 1848) just before the Mexican Cession was finalized.\n- 300,000+ migrants ('49ers) rushed to California from across the world.\n- Effect: California skipped territorial phase and applied for statehood (as free state) in 1849 — triggering Compromise of 1850.\n\n**Critics**:\n- Whigs (including young Abraham Lincoln) opposed the Mexican-American War as Polk's war of conquest.\n- Henry David Thoreau refused to pay taxes ('Civil Disobedience,' 1849).\n- Abolitionists saw expansion as a slave-power conspiracy.\n- Mexican, Native American, and Californio residents were the immediate losers.",
    keyIdeas: [
      "Manifest Destiny ideology (O'Sullivan, 1845) justified expansion as providential.",
      "Texas annexed (1845), Oregon settled peacefully (1846), Mexican Cession gained (1848).",
      "Polk's expansionist agenda drove the war with Mexico.",
      "California Gold Rush (1849) accelerated statehood and sectional crisis.",
      "Critics (Lincoln, Thoreau, abolitionists) saw expansion as aggressive and tied to slavery.",
    ],
    commonMistakes: [
      "Missing the racial and religious supremacist ideology at the core of Manifest Destiny.",
      "Treating expansion as consensual — it was contested politically and militarily.",
      "Forgetting the California Gold Rush's role in triggering the 1850 crisis.",
    ],
    workedExample: {
      prompt:
        "Briefly explain ONE specific way the ideology of Manifest Destiny shaped U.S. expansion in the 1840s.",
      solution:
        "The claim that Americans had a providential right to overspread the continent, popularized by journalist John L. O'Sullivan in 1845, provided moral justification for President James K. Polk's aggressive territorial agenda — the annexation of Texas in 1845, the Oregon boundary settlement at the 49th parallel in 1846, and the Mexican-American War of 1846-48 that yielded the Mexican Cession. Manifest Destiny translated expansion into a national mission rather than imperial conquest, muting political opposition and legitimizing the displacement of Mexican and Native American peoples in the acquired territories.",
    },
  },
  "5.3": {
    id: "5.3",
    title: "The Mexican-American War",
    summary:
      "Polk's war with Mexico (1846-48) added the Southwest and California to the U.S.; the Wilmot Proviso question of slavery in new territories reopened the sectional crisis.",
    lesson:
      "**Background**:\n- Mexico had never recognized Texas's independence and saw U.S. annexation in 1845 as theft.\n- The Texas-Mexico border was disputed: Texas claimed the Rio Grande; Mexico claimed the Nueces (a river ~150 miles north).\n- Polk also wanted California and the Southwest.\n\n**Polk's provocation**:\n- Polk sent John Slidell to Mexico City to buy the disputed territory (rejected).\n- Ordered Zachary Taylor's army to the Rio Grande — into disputed territory.\n- In April 1846 Mexican forces attacked Taylor's troops.\n- Polk asked Congress for war declaration; Congress complied (May 1846).\n- **Whigs**, including Illinois Representative **Abraham Lincoln**, opposed the war. Lincoln's 'Spot Resolutions' demanded Polk identify the exact spot where American blood had been shed on 'American soil.'\n\n**Military campaigns**:\n- **Taylor** defeated Mexican forces at Monterrey and Buena Vista.\n- **Winfield Scott** landed at Veracruz and marched inland, capturing Mexico City (Sept 1847).\n- **John C. Frémont** and **Stephen Kearny** took California (Bear Flag Revolt + California Battalion).\n\n**Treaty of Guadalupe Hidalgo (1848)**:\n- Mexico ceded ~525,000 sq miles — present-day California, Nevada, Utah, and parts of Arizona, New Mexico, Colorado, and Wyoming.\n- U.S. paid $15 million plus assumed $3.25 million in claims.\n- Mexican residents in the ceded territory given a year to choose citizenship; rights (including property) nominally protected (often violated in practice).\n\n**Wilmot Proviso (1846)**:\n- **David Wilmot** (D-PA) proposed that slavery be banned in any territory acquired from Mexico.\n- Passed the House repeatedly, blocked by the Senate.\n- The Proviso never became law but **realigned politics by section rather than party** — Northern Whigs and Democrats voted together against Southern Whigs and Democrats.\n\n**Gadsden Purchase (1853)**:\n- Under Pierce, U.S. bought ~30,000 sq miles in southern Arizona/New Mexico for $10M to facilitate a southern transcontinental railroad route.\n\n**Consequences**:\n- Added territory that now had to be organized — with the slavery question unavoidable.\n- The **Mexican Cession** question — free or slave? — generated the Compromise of 1850.\n- Veterans and officers of the war (Grant, Lee, Jackson, Sherman) became Civil War leaders.\n- Mexican Americans became U.S. citizens with rights poorly protected.",
    keyIdeas: [
      "Polk provoked war over disputed border; Congress declared war 1846.",
      "Whigs (Lincoln) opposed as aggressive war of conquest.",
      "Treaty of Guadalupe Hidalgo (1848): Mexican Cession + $15M payment.",
      "Wilmot Proviso sectionalized politics even though it never passed.",
      "Future Civil War commanders cut their teeth in Mexico.",
    ],
    commonMistakes: [
      "Treating the war as defensive — Polk provoked it.",
      "Ignoring Wilmot Proviso because it didn't become law — its political effect was decisive.",
      "Confusing Gadsden Purchase with the Mexican Cession — different years, different territory.",
    ],
    workedExample: {
      prompt:
        "Briefly explain ONE specific political consequence of the Mexican-American War for the United States.",
      solution:
        "The territory acquired from Mexico in 1848 forced Congress to confront whether slavery would be permitted in the new lands, fracturing the two-party system along sectional lines. Representative David Wilmot's 1846 Proviso proposing to ban slavery in any Mexican cession passed the House repeatedly but failed in the Senate, yet realigned voting: Northern Whigs and Democrats voted together against Southern Whigs and Democrats. This sectional realignment foreshadowed the collapse of the Whig Party in the early 1850s and the rise of the antislavery Republican Party by 1854.",
    },
  },
  "5.4": {
    id: "5.4",
    title: "The Compromise of 1850",
    summary:
      "A package of five laws brokered by Henry Clay, Daniel Webster, and Stephen Douglas resolved the immediate territorial crisis but entrenched the Fugitive Slave Act, which radicalized Northern opinion.",
    lesson:
      "**Context**: California's application for admission (1849) as a free state would break Senate balance (15 free, 15 slave). Southern threats of secession grew.\n\n**Clay's package** (later passed as separate bills by Senator Stephen Douglas):\n1. **California admitted as a free state**.\n2. **Utah and New Mexico territories** organized with **popular sovereignty** on slavery (the people of each territory would decide).\n3. **Texas boundary** fixed in exchange for federal assumption of Texas debt.\n4. **Slave trade (not slavery) abolished** in Washington, D.C.\n5. **Fugitive Slave Act** — the most inflammatory:\n   - Required Northerners to assist in capturing alleged fugitive slaves.\n   - Gave special federal commissioners authority (paid $10 if alleged fugitive was returned, $5 if not — bias built in).\n   - Accused had no right to jury trial or to testify.\n   - Northerners who refused to cooperate faced fines and imprisonment.\n\n**How it passed**:\n- Clay's attempt to bundle failed; old Clay nearly gave up.\n- **Stephen Douglas** (D-IL) broke the package into individual bills, cobbling different majorities for each.\n\n**Key speeches**:\n- Calhoun's dying speech read by a colleague: warned of disunion.\n- Webster's 'Seventh of March' speech: Massachusetts Whig defended compromise including Fugitive Slave Act — infuriated abolitionists.\n- William Seward's 'Higher Law' speech: moral law above the Constitution on slavery.\n\n**Consequences**:\n- **Immediate**: crisis temporarily defused; Union preserved.\n- **Northern reaction to Fugitive Slave Act**: mass opposition. Abolitionists organized to resist — rescues of fugitives (Shadrach Minkins, Anthony Burns). **Personal Liberty Laws** passed by Northern states to obstruct enforcement.\n- **Harriet Beecher Stowe** wrote *Uncle Tom's Cabin* (1852) in moral outrage — sold 300,000 copies in its first year; dramatized slavery for Northern readers.\n- **Underground Railroad** activity intensified; many fugitives fled to Canada.\n- The Compromise did not end sectional crisis — it just moved it.\n\n**Death of the Whigs**:\n- The Whig Party split North/South over the compromise, especially the Fugitive Slave Act.\n- By 1856 the Whigs had effectively collapsed.",
    keyIdeas: [
      "Five-part compromise: CA free, popular sovereignty in UT/NM, Texas boundary, DC slave trade abolished, Fugitive Slave Act.",
      "Douglas broke Clay's bundle into separate bills to pass them.",
      "Fugitive Slave Act radicalized Northern opinion and abolitionism.",
      "Stowe's Uncle Tom's Cabin (1852) popularized anti-slavery feelings.",
      "Compromise worked only briefly; Whig Party collapsed.",
    ],
    commonMistakes: [
      "Describing the Compromise as if all five parts passed together as one bill — they passed separately.",
      "Forgetting the Fugitive Slave Act as the most explosive element.",
      "Missing Douglas's role alongside Clay and Webster.",
    ],
    workedExample: {
      prompt:
        "Briefly explain ONE specific way the Compromise of 1850 intensified sectional conflict.",
      solution:
        "The Fugitive Slave Act included in the Compromise of 1850 required Northerners to assist federal commissioners in capturing alleged escaped slaves, denied accused fugitives a jury trial, and paid commissioners more for sending the accused into slavery than for freeing them. These provisions turned ordinary Northerners into enforcers of Southern slavery, triggering dramatic rescues of fugitives (such as Shadrach Minkins in Boston, 1851), personal-liberty laws in Northern states to obstruct the act, and an outpouring of anti-slavery literature including Harriet Beecher Stowe's Uncle Tom's Cabin — making sectional compromise harder rather than easier.",
    },
  },
  "5.5": {
    id: "5.5",
    title: "Sectional Conflict: Regional Differences",
    summary:
      "By the 1850s the North and South had diverged into two distinct societies — free-labor vs. slave, industrial vs. agricultural, mass democratic vs. planter-dominated — with incompatible political goals.",
    lesson:
      "**Economic divergence**:\n- **North**: industrial manufacturing (textiles, iron, machinery), commercial agriculture, large cities, wage labor, immigration (Irish, Germans), railroads.\n- **South**: cotton + slavery + plantation system, mostly rural, few cities, few immigrants, small industrial base.\n- Census of 1860 illustrates the gap — North had more manufacturing workers than the South had free adults.\n\n**Social divergence**:\n- **North**: developing middle class, reform culture, public schools, expanding suffrage (for white men).\n- **South**: planter-dominated social hierarchy, honor culture, weaker public education, more rigid gender and racial codes.\n\n**Ideological divergence**:\n- **North**: 'Free Labor' ideology — dignity of wage work + possibility of upward mobility; dominant Republican Party theme.\n- **South**: 'Positive Good' defense of slavery (Calhoun, Fitzhugh, Hammond) — claim that slavery civilized Africans and freed whites for republican citizenship.\n\n**Political divergence**:\n- Second Party System (Democrats vs. Whigs) collapsed in the early 1850s.\n- New parties: **Know-Nothings (American Party)** — nativist, short-lived; **Republican Party (1854)** — formed by anti-Nebraska Whigs, Free-Soilers, antislavery Democrats.\n- Democrats split North/South.\n\n**Cultural touchstones**:\n- *Uncle Tom's Cabin* (1852) polarized opinion.\n- *Impending Crisis of the South* (Hinton Helper, 1857) argued slavery hurt poor whites.\n- George Fitzhugh's *Sociology for the South* and *Cannibals All!* defended slavery as superior to free labor.\n\n**Immigration**:\n- Ireland and Germany → Northern cities.\n- South remained demographically stagnant for free whites.\n- Nativism (Know-Nothings) crosscut sectional conflict until Republicans absorbed most of its voters.\n\n**Key point for APUSH**: the 'regional differences' question is about more than slavery — it's about two diverging societies with different economies, demographies, politics, and ideologies. The question was whether they could coexist politically.",
    keyIdeas: [
      "Economic: Northern industry + wage labor vs. Southern cotton + slavery.",
      "Ideological: Free Labor vs. Positive Good.",
      "Political: Second Party System collapses; Republican Party emerges (1854).",
      "Immigration reshaped the North; South demographically static.",
      "Books and pamphlets polarized public opinion.",
    ],
    commonMistakes: [
      "Reducing sectionalism to slavery alone — it encompassed economies and cultures.",
      "Skipping the Republican Party's founding in 1854.",
      "Treating Northern workers as uniformly antislavery — many were hostile to Black equality even while opposing slavery's expansion.",
    ],
    workedExample: {
      prompt:
        "Briefly explain ONE specific economic difference between the North and the South by 1850.",
      solution:
        "By 1850 the Northern economy was dominated by industrial manufacturing, a rapidly expanding railroad network, and waged factory labor in cities like Lowell, Philadelphia, and New York, supported by growing Irish and German immigration. The Southern economy, by contrast, was built on cotton plantations worked by enslaved Africans, with limited manufacturing, few large cities, and almost no immigration. By 1860 the free states produced more manufactured goods in a single year than the slave states produced in a decade — an asymmetry that gave the Union decisive industrial advantages during the Civil War.",
    },
  },
  "5.6": {
    id: "5.6",
    title: "Failure of Compromise",
    summary:
      "Between 1854 and 1860, Kansas-Nebraska, Bleeding Kansas, Dred Scott, the Lincoln-Douglas debates, and John Brown's raid dismantled every attempt at sectional accommodation.",
    lesson:
      "**Kansas-Nebraska Act (1854, Stephen Douglas)**:\n- Organized Kansas and Nebraska territories using **popular sovereignty** on slavery.\n- Explicitly **repealed the Missouri Compromise line** (36°30′).\n- Outraged Northerners because it opened previously free territory to slavery.\n- Broke the Democratic Party in the North; led directly to the founding of the **Republican Party (1854)**.\n\n**Bleeding Kansas (1854-61)**:\n- Pro-slavery and anti-slavery settlers rushed to Kansas to control the territorial vote.\n- Pro-slavery 'Border Ruffians' from Missouri crossed to vote fraudulently.\n- Two rival governments: pro-slavery at Lecompton, anti-slavery at Topeka.\n- Violence: **Sack of Lawrence** (May 1856); **John Brown's Pottawatomie Massacre** (May 1856).\n- **Lecompton Constitution (1857)**: pro-slavery, fraudulent. Douglas broke with Buchanan to oppose it; Congress rejected it.\n\n**Caning of Charles Sumner (May 1856)**:\n- After Sumner's 'Crime Against Kansas' speech mocking Senator Andrew Butler, Butler's cousin, Representative **Preston Brooks**, beat Sumner nearly to death with a cane on the Senate floor.\n- Sumner took 3 years to recover; Brooks became a Southern hero.\n\n**Election of 1856**:\n- Democrat James Buchanan won; Republican John C. Frémont carried the North.\n- Republicans had never existed 3 years earlier.\n\n**Dred Scott v. Sandford (1857)**:\n- Chief Justice **Roger Taney**'s opinion:\n  1. Dred Scott, as a Black person, could not be a U.S. citizen and had no standing to sue.\n  2. Slaves were property; the 5th Amendment's protection of property meant Congress could not ban slavery in any territory.\n  3. The **Missouri Compromise** had been unconstitutional all along.\n- Implications: no free territory was possible; popular sovereignty was meaningless; the Constitution was a pro-slavery document.\n- **Republican response**: outrage; the decision galvanized the party.\n\n**Lincoln-Douglas Debates (1858)**:\n- U.S. Senate race in Illinois; Lincoln challenged Douglas to 7 debates.\n- Douglas articulated the **Freeport Doctrine**: territorial legislatures could effectively exclude slavery by refusing to pass protective police laws — preserving popular sovereignty in practice.\n- Douglas won the Senate seat (by the state legislature) but the Freeport Doctrine alienated Southern Democrats.\n- Lincoln gained national reputation with the 'House Divided' speech (June 1858).\n\n**John Brown's Raid on Harpers Ferry (Oct 1859)**:\n- Brown led 21 men to seize the federal arsenal at Harpers Ferry, Virginia, hoping to spark a slave uprising.\n- Federal troops under Col. Robert E. Lee crushed the raid within 36 hours.\n- Brown hanged (Dec 1859) — Northern abolitionists treated him as a martyr.\n- The South read this as proof that the North was bent on racial revolution.\n\nBy late 1859, sectional trust was gone. Election of 1860 tipped the country into secession.",
    keyIdeas: [
      "Kansas-Nebraska Act (1854) repealed Missouri Compromise; founded Republican Party.",
      "Bleeding Kansas — violent settler conflict 1854-61.",
      "Dred Scott (1857) ruled Black people had no rights; Congress could not ban slavery in territories.",
      "Lincoln-Douglas debates (1858) made Lincoln a national figure.",
      "John Brown's raid on Harpers Ferry (1859) terrified the South.",
    ],
    commonMistakes: [
      "Misdating Dred Scott — it's 1857, after Kansas-Nebraska.",
      "Crediting the Freeport Doctrine with saving popular sovereignty — it actually split the Democrats.",
      "Forgetting the Caning of Sumner as emblematic of sectional violence.",
    ],
    workedExample: {
      prompt:
        "Briefly explain ONE specific way the Dred Scott v. Sandford decision (1857) intensified sectional conflict.",
      solution:
        "Chief Justice Roger Taney's ruling that Congress lacked constitutional authority to ban slavery in any federal territory effectively declared the Missouri Compromise — the basis of sectional accommodation since 1820 — unconstitutional and implied that no popular vote or territorial legislature could exclude slavery either. Republicans denounced the decision as a pro-slavery constitutional coup, and Abraham Lincoln argued in his 'House Divided' speech that Dred Scott threatened to nationalize slavery. The decision thus radicalized Republicans, delegitimized compromise, and pushed the country toward the open break of 1860.",
    },
  },
  "5.7": {
    id: "5.7",
    title: "Election of 1860 and Secession",
    summary:
      "Lincoln's 1860 election on a free-soil platform triggered the secession of seven Deep South states; after Fort Sumter, four more followed, forming the Confederacy.",
    lesson:
      "**Democratic Party splits**:\n- Charleston convention (April 1860): Southern Democrats demanded a platform protecting slavery in the territories. Douglas refused. Southern delegates walked out.\n- Democrats split into two:\n  - **Northern Democrats**: Stephen Douglas, popular sovereignty.\n  - **Southern Democrats**: John C. Breckinridge, slave code for the territories.\n- **Constitutional Union Party** (John Bell) — mostly old Whigs urging preservation of the Union without taking a slavery position.\n- **Republicans**: Abraham Lincoln (dark-horse nominee) on a platform of **no expansion of slavery into the territories**; did not call for abolition in existing slave states.\n\n**Election results (Nov 1860)**:\n- Lincoln: 40% of popular vote but majorities in the North — won the Electoral College.\n- He was not even on the ballot in most Southern states.\n- Secession machinery began immediately.\n\n**Secession begins (Dec 1860-Feb 1861)**:\n- **South Carolina seceded Dec 20, 1860** — first state.\n- By February 1861: Mississippi, Florida, Alabama, Georgia, Louisiana, Texas joined. Seven Deep South states formed the **Confederate States of America** in Montgomery (Feb 1861), adopting a constitution that explicitly protected slavery and made it perpetual.\n- **Jefferson Davis** elected Confederate president.\n\n**Justifications for secession**:\n- Primary stated reason in state secession declarations: protection of slavery.\n- Southern leaders argued that the Constitution was a compact from which states could withdraw.\n- 'States' rights' was the legal form; the substantive right being defended was slavery.\n\n**Buchanan's lame-duck paralysis** (Dec 1860-March 1861): denied secession was legal but also denied he had authority to stop it.\n\n**Crittenden Compromise** (Dec 1860) proposed constitutional amendments to preserve the Missouri Compromise line and protect slavery permanently. Lincoln opposed; died.\n\n**Lincoln's inauguration (March 4, 1861)**:\n- Refused to recognize secession; promised not to invade but would hold federal property.\n- 'We are not enemies, but friends.'\n\n**Fort Sumter (April 12-13, 1861)**:\n- Confederate artillery fired on the U.S. garrison at Fort Sumter in Charleston Harbor.\n- Federal surrender April 13.\n- Lincoln called for 75,000 militia.\n- **Upper South secession**: Virginia, Arkansas, Tennessee, North Carolina joined the Confederacy after Lincoln's call for troops.\n- **Border states** (Delaware, Maryland, Kentucky, Missouri) stayed in the Union despite slavery — Lincoln worked carefully to keep them.\n- **West Virginia** broke from Virginia and joined the Union (admitted 1863).",
    keyIdeas: [
      "Democrats split 1860; Republicans ran Lincoln on no-expansion-of-slavery.",
      "Lincoln won Electoral College with <40% of popular vote, no Southern votes.",
      "South Carolina seceded Dec 1860; six more Deep South states by Feb 1861.",
      "Fort Sumter (April 12-13, 1861) started the war; four more states seceded.",
      "Border states (MD, KY, MO, DE) stayed in the Union.",
    ],
    commonMistakes: [
      "Claiming secession was about states' rights in the abstract — state declarations named slavery explicitly.",
      "Confusing the first wave of secession (Dec 1860-Feb 1861) with the second wave (after Sumter).",
      "Forgetting West Virginia's split from Virginia.",
    ],
    workedExample: {
      prompt:
        "Briefly explain ONE specific reason Southern states seceded after the election of 1860.",
      solution:
        "Southern secessionists interpreted Abraham Lincoln's victory — on a Republican platform pledging to bar slavery from the territories — as evidence that Southern political power in the federal government was permanently broken and that the institution of slavery was now vulnerable to eventual federal action. South Carolina's December 1860 declaration of secession explicitly cited threats to slavery, stating that Northern states had 'assumed the right of deciding upon the propriety of our domestic institutions.' Six Deep South states followed this same logic within weeks, forming the Confederate States of America to preserve slavery beyond federal reach.",
    },
  },
  "5.8": {
    id: "5.8",
    title: "Military Conflict in the Civil War",
    summary:
      "The Civil War (1861-65) became a 'total war' that killed ~750,000 Americans; Union victory hinged on industrial advantages, Lincoln's leadership, the Emancipation Proclamation, and key battles from Antietam to Appomattox.",
    lesson:
      "**Strategic balance**:\n- **Union advantages**: population 22 million vs. 9 million (3.5 million enslaved), 90% of manufacturing, 70% of railroads, navy, better finance.\n- **Confederate advantages**: defensive war on home ground, experienced military leadership (Lee, Jackson, Longstreet), motivated armies.\n- **Union strategy**: Anaconda Plan — blockade, take Mississippi River, split Confederacy, press Richmond.\n- **Confederate strategy**: defensive, hope for foreign recognition (Britain, France) and for Northern war-weariness.\n\n**Eastern theater**:\n- **First Bull Run / Manassas (July 1861)**: Confederate victory; ended illusion of a quick war.\n- **Peninsula Campaign (1862)**: McClellan advanced on Richmond, was pushed back by Lee in the **Seven Days Battles**.\n- **Second Bull Run (Aug 1862)**: Lee decisively beat Pope.\n- **Antietam (Sept 17, 1862)**: bloodiest single day in U.S. history (23,000 casualties). Tactical draw, strategic Union win — stopped Lee's Maryland invasion. Gave Lincoln the political space to issue the **Emancipation Proclamation**.\n- **Fredericksburg (Dec 1862)** and **Chancellorsville (May 1863)**: Confederate victories; but Stonewall Jackson killed at Chancellorsville.\n- **Gettysburg (July 1-3, 1863)**: turning point; Lee's invasion of Pennsylvania repulsed. Pickett's Charge fails. Confederate army never again invaded the North.\n\n**Western theater**:\n- **Forts Henry and Donelson (Feb 1862)**: Grant's first major victories.\n- **Shiloh (April 1862)**: Grant held off surprise Confederate attack; massive casualties.\n- **Vicksburg (July 4, 1863)**: Grant's siege gave the Union control of the Mississippi — splitting the Confederacy. Fell same weekend as Gettysburg.\n- **Chattanooga (Nov 1863)**: Union control of Tennessee; gateway to Georgia.\n\n**Total war (1864-65)**:\n- Grant (now general-in-chief) pursued a war of attrition against Lee in Virginia — **Wilderness, Spotsylvania, Cold Harbor** (spring 1864), staggering casualties.\n- Siege of Petersburg (July 1864-April 1865).\n- **Sherman's March**: captured Atlanta (Sept 1864) before the election; 'March to the Sea' (Nov-Dec 1864) to Savannah; destroyed infrastructure and food across Georgia and then the Carolinas.\n- Sherman's total-war strategy broke Southern civilian will.\n\n**Ending**:\n- Lee abandoned Petersburg (April 2, 1865); surrendered at **Appomattox Court House (April 9, 1865)**.\n- Other Confederate armies surrendered through May 1865.\n- **Lincoln assassinated by John Wilkes Booth at Ford's Theatre (April 14, 1865)**, five days after Appomattox.\n\n**Casualties**: ~750,000 military dead (roughly 620,000 older estimates, revised upward by demographic studies). Combined with civilian deaths and the enslaved population's suffering, the Civil War remains the deadliest war in U.S. history.\n\n**Black Union soldiers**: about 180,000 served (roughly 10% of Union forces) after 1863; units like the 54th Massachusetts fought heroically (Fort Wagner, July 1863).",
    keyIdeas: [
      "Union's industrial, demographic, and naval advantages; Confederacy's defensive posture + leadership.",
      "Antietam (Sept 1862) enabled the Emancipation Proclamation.",
      "Gettysburg + Vicksburg (July 1863) were the double turning point.",
      "Sherman's March + Grant's attrition broke the South by 1865.",
      "Lincoln assassinated April 14, 1865, days after Appomattox.",
    ],
    commonMistakes: [
      "Calling Antietam a big tactical victory — it was a draw that happened to stop Lee.",
      "Giving Gettysburg sole credit for the turning point — Vicksburg was equally decisive.",
      "Underestimating Black troops' role — 180,000 served.",
    ],
    workedExample: {
      prompt:
        "Briefly explain ONE specific way the Union's advantages in resources affected the outcome of the Civil War.",
      solution:
        "The Union's industrial superiority — roughly 90 percent of the nation's manufacturing capacity and 70 percent of its railroad mileage in 1861 — enabled sustained production of weapons, uniforms, and supplies and rapid transport of men and materiel to critical fronts. These advantages underwrote General Ulysses S. Grant's 1864-65 war of attrition in Virginia and General William T. Sherman's long logistical campaign through Georgia and the Carolinas, both of which depended on a supply chain that the Confederacy, with limited industry and deteriorating railroads, could not match.",
    },
  },
  "5.9": {
    id: "5.9",
    title: "Government Policies During the Civil War",
    summary:
      "The Union used the war to expand federal power — emancipation, national currency, income tax, Homestead Act, transcontinental railroad, land-grant colleges — building the modern American state.",
    lesson:
      "**Emancipation**:\n- **Confiscation Acts (1861, 1862)**: authorized seizure of Confederate property, including enslaved people.\n- **Emancipation Proclamation (Jan 1, 1863)**: declared enslaved people in Confederate-controlled areas 'forever free.' Did not apply to border states or occupied Union areas — but turned the war into a war to end slavery and authorized Black enlistment.\n- **Thirteenth Amendment (ratified Dec 1865)**: abolished slavery throughout the U.S. — Lincoln's legacy; he had pushed for it in 1864 election and January 1865 House passage.\n\n**Wartime economic legislation (often pushed through while Southern Democrats were absent from Congress)**:\n- **Homestead Act (1862)**: 160 acres of public land free to anyone who farmed it for 5 years. Accelerated Great Plains settlement.\n- **Pacific Railway Act (1862)**: federal subsidies + land grants to build a transcontinental railroad (completed 1869).\n- **Morrill Land-Grant Act (1862)**: federal land granted to states to found public colleges (agricultural and mechanical arts) — gave us state universities.\n- **Morrill Tariff (1861)**: high protective tariff — Republican economic policy.\n- **National Banking Acts (1863, 1864)**: chartered national banks, created a uniform national currency ('greenbacks').\n- **Internal Revenue Act (1862)**: first federal income tax (up to 3%).\n- **Department of Agriculture** established (1862).\n\n**Civil liberties in wartime**:\n- Lincoln suspended **habeas corpus** in several areas (Maryland 1861, later nationwide for draft resisters). Controversial; ex parte Merryman ruling ignored.\n- **Conscription Act (March 1863)**: first federal draft; allowed substitution and $300 commutation — 'rich man's war, poor man's fight.' **New York Draft Riots** (July 1863): violence against Black New Yorkers; 100+ killed.\n- Suppression of opposition newspapers ('Copperheads' — anti-war Democrats).\n\n**Lincoln's leadership**:\n- Assembled a 'Team of Rivals' cabinet (Seward, Chase).\n- Managed a difficult coalition of Republicans (including Radical Republicans who pushed for rapid emancipation and civil rights).\n- **Gettysburg Address (Nov 19, 1863)**: redefined the war as a test of whether government 'of the people, by the people, for the people' could endure.\n- **Second Inaugural (March 4, 1865)**: called for 'malice toward none; with charity for all' — laid the moral groundwork for Reconstruction.\n\n**Confederate government**:\n- Struggled with states' rights — governors (Brown of Georgia, Vance of NC) resisted Richmond's demands.\n- Conscription and impressment, taxation in kind, print money → inflation (cumulative 9,000% by 1864).\n- Lost slaves to self-emancipation during Union advances.\n\n**Women's roles in both wars**:\n- **Sanitary Commission** (Union): volunteer medical and supply work.\n- Clara Barton's nursing work; later founded the American Red Cross.\n- Women managed farms, ran businesses, worked in factories, served as spies (both sides).",
    keyIdeas: [
      "Emancipation Proclamation (1863) → 13th Amendment (1865).",
      "Homestead Act, Pacific Railway Act, Morrill Land-Grant Act — Republican legislation of 1862.",
      "National banking system + greenbacks + income tax transformed federal finance.",
      "Draft + suspension of habeas corpus tested civil liberties.",
      "Gettysburg Address reframed the war's meaning; 13th Amendment ended slavery.",
    ],
    commonMistakes: [
      "Saying the Emancipation Proclamation freed all enslaved people — it did not apply to border states.",
      "Missing the economic legislation (Homestead, Land-Grant, Pacific Railway) that reshaped the country.",
      "Forgetting the New York Draft Riots as class and race violence.",
    ],
    workedExample: {
      prompt:
        "Briefly explain ONE specific way the federal government's role expanded during the Civil War.",
      solution:
        "The Republican-controlled Congress used the absence of Southern Democrats during secession to pass a suite of 1862 laws that permanently expanded federal economic authority: the Homestead Act, which distributed 160-acre farms from the public domain; the Pacific Railway Act, which subsidized the transcontinental railroad through land grants and bonds; and the Morrill Land-Grant Act, which funded state agricultural and engineering colleges. Combined with the National Banking Acts of 1863-64, which created a national currency, and the first federal income tax in 1862, this legislation established a federal government far larger and more active in the economy than anything that had existed before secession.",
    },
  },
  "5.10": {
    id: "5.10",
    title: "Reconstruction",
    summary:
      "Reconstruction (1865-77) rebuilt the Union, abolished slavery, established Black citizenship, and briefly secured voting rights for Black men through the 13th, 14th, and 15th Amendments and Reconstruction Acts.",
    lesson:
      "**Phases of Reconstruction**:\n\n**Presidential Reconstruction (1865-67)**:\n- **Lincoln's 10% Plan (1863)** — 10% of 1860 voters take loyalty oath, state readmitted.\n- **Radical Republicans** wanted tougher terms: **Wade-Davis Bill (1864)** — 50% oath and exclude former Confederates; Lincoln pocket-vetoed.\n- **Andrew Johnson** (Democratic unionist from Tennessee) took over after Lincoln's assassination. His Reconstruction plan:\n  - Pardoned most Confederates.\n  - Required states to ratify 13th Amendment, repudiate debts, and nullify secession.\n- Southern states quickly passed **Black Codes** (1865-66) — labor controls that looked like slavery lite.\n- **Freedmen's Bureau** (1865) — federal agency providing food, schools, legal aid to freedpeople and poor whites; headed by O.O. Howard.\n\n**Congressional / Radical Reconstruction (1867-77)**:\n- Congress rejected Johnson's Southern governments.\n- **Civil Rights Act of 1866**: defined citizenship and rights; Johnson vetoed; Congress overrode (first major override of presidential veto).\n- **Fourteenth Amendment (ratified 1868)**: birthright citizenship, equal protection, due process at state level, reduced representation for states denying Black men the vote.\n- **Reconstruction Acts (1867)**: divided South into 5 military districts; required new state constitutions with Black male suffrage; required 14th Amendment ratification.\n- **Fifteenth Amendment (ratified 1870)**: prohibited denying vote based on race, color, or previous servitude (but not sex — frustrating many women's rights activists).\n\n**Impeachment of Johnson (1868)**:\n- Johnson violated the (contested) **Tenure of Office Act** by firing Secretary of War Edwin Stanton.\n- House impeached; Senate trial fell one vote short of conviction. Johnson stayed but lost political influence.\n\n**Reconstruction governments in the South (1867-77)**:\n- Coalitions of Black voters, white Republicans ('**scalawags**' to opponents), and Northern migrants ('**carpetbaggers**' to opponents).\n- Elected **hundreds of Black officials** including 2 U.S. Senators (Hiram Revels and Blanche K. Bruce from Mississippi) and 14 U.S. Representatives.\n- Achievements: **public schools** (for Black and white children) where none had existed; new state constitutions; some property and marriage rights for women; infrastructure investment.\n\n**Black communities rebuild**:\n- Founded **churches** (AME, AME Zion), schools (HBCUs like Howard, Fisk, Hampton), newspapers, mutual aid societies.\n- Reunited families; sought education; acquired small plots of land.\n- **Sharecropping** emerged as the dominant labor system — Black families worked plots of land in exchange for a share of the crop; in practice often debt peonage.\n\n**Resistance and violence**:\n- **Ku Klux Klan** (founded 1866, Tennessee) waged terror campaigns — whippings, lynchings, murders of Black voters and Republican officials.\n- **Enforcement Acts / Ku Klux Klan Act (1870-71)** — federal law targeting KKK; Grant administration used them to prosecute hundreds of Klansmen.\n- White paramilitary groups (Red Shirts, White League) continued violence.\n- **Colfax Massacre (Louisiana, 1873)**: at least 60 Black men killed by white paramilitaries.\n\n**Supreme Court retrenchment**:\n- **Slaughterhouse Cases (1873)**: narrowed 14th Amendment's privileges and immunities clause.\n- **U.S. v. Cruikshank (1876)**: limited federal power to prosecute civil rights violations by individuals.",
    keyIdeas: [
      "Three Reconstruction Amendments: 13th (abolition), 14th (citizenship/equal protection), 15th (Black male suffrage).",
      "Congressional Reconstruction (1867+) imposed military districts and Black male suffrage.",
      "Black leaders elected to Congress and state offices; HBCUs and churches built.",
      "Sharecropping emerged as new labor system, often a trap of debt.",
      "KKK terror + Enforcement Acts defined the struggle over federal power in the South.",
    ],
    commonMistakes: [
      "Confusing Lincoln's 10% Plan with Johnson's Presidential Reconstruction.",
      "Missing the Freedmen's Bureau's role.",
      "Describing Johnson's impeachment as successful — he was acquitted by one vote.",
    ],
    workedExample: {
      prompt:
        "Briefly explain ONE specific achievement of Reconstruction between 1865 and 1877.",
      solution:
        "Between 1865 and 1870 Congress and the states ratified the Thirteenth, Fourteenth, and Fifteenth Amendments, which abolished slavery, guaranteed birthright citizenship and equal protection of the laws, and prohibited racial discrimination in voting. Combined with the Reconstruction Acts of 1867 requiring Black male suffrage in the former Confederacy, these provisions transformed the legal foundations of American citizenship and enabled more than 2,000 African Americans to hold public office, including two U.S. Senators from Mississippi — achievements that endured constitutionally even after the political retreat of the late 1870s.",
    },
  },
  "5.11": {
    id: "5.11",
    title: "Failure of Reconstruction",
    summary:
      "By 1877 Reconstruction collapsed under Southern white terror, Northern fatigue, Supreme Court retrenchment, and the Compromise of 1877 — leaving Jim Crow, sharecropping, and disenfranchisement.",
    lesson:
      "Reconstruction's end had multiple causes:\n\n**Southern white resistance**:\n- **KKK and paramilitary terror** systematically attacked Black voters and Republican officials.\n- **'Redeemer' Democrats** campaigned on restoring white supremacy; they regained state governments one by one: Tennessee (1869), Virginia and North Carolina (1870), Georgia (1871), Alabama (1874), Mississippi (1875), and the last three — South Carolina, Louisiana, Florida — by 1877.\n- **Mississippi Plan (1875)**: open violence and fraud to intimidate Black voters; Grant refused to send federal troops.\n\n**Northern fatigue**:\n- By the mid-1870s Northern voters tired of federal intervention.\n- **Liberal Republicans** (1872) split from Grant; wanted civil service reform and amnesty for ex-Confederates.\n- **Panic of 1873**: economic depression distracted Northern attention and weakened support for Reconstruction spending.\n- Corruption scandals in Grant administration (Crédit Mobilier 1872, Whiskey Ring 1875) damaged Republican credibility.\n\n**Supreme Court retrenchment**:\n- **Slaughterhouse Cases (1873)**: narrowly interpreted 14th Amendment privileges and immunities.\n- **U.S. v. Cruikshank (1876)**: limited federal power to prosecute private violations of civil rights — gutted Enforcement Acts.\n- **U.S. v. Reese (1876)**: limited federal enforcement of 15th Amendment.\n\n**Compromise of 1877**:\n- Disputed 1876 election between Samuel Tilden (D) and Rutherford B. Hayes (R). Electoral Commission awarded Hayes 20 disputed electoral votes.\n- Informal bargain: Hayes became president; in exchange, federal troops withdrew from the three remaining Southern states under federal supervision (SC, LA, FL); Reconstruction effectively over.\n\n**Aftermath — Jim Crow era begins**:\n- **Disenfranchisement** via literacy tests, poll taxes, grandfather clauses, white primaries — most thorough in Mississippi (1890 constitution).\n- **Segregation** (Jim Crow) codified in law from late 1880s; **Plessy v. Ferguson (1896)** affirmed 'separate but equal.'\n- **Sharecropping and crop-lien system** trapped Black (and many poor white) farmers in debt.\n- **Convict leasing** — a slavery substitute in prisons.\n- **Lynching** — extralegal violence to enforce white supremacy; peaked 1890s but continued for decades.\n\n**What survived**:\n- **Three constitutional amendments** remained the law (eventually enforced in mid-20th century civil rights era).\n- **Black churches, schools, HBCUs** survived and built capacity for later movements.\n- **Family and community** rebuilt, often through great effort.\n\n**Historical memory**:\n- For a century, the 'Dunning School' portrayed Reconstruction as a failure of Black governance and Northern overreach.\n- Later historians (W.E.B. Du Bois's *Black Reconstruction*, 1935; Eric Foner, 1988) restored Reconstruction as an 'unfinished revolution' betrayed by white supremacy and federal retreat.",
    keyIdeas: [
      "Southern white terror (KKK, paramilitary) overthrew Reconstruction governments.",
      "Supreme Court gutted enforcement of 14th and 15th Amendments.",
      "Compromise of 1877: Hayes for presidency, federal troops withdrawn from South.",
      "Jim Crow (segregation), disenfranchisement, sharecropping, convict leasing, and lynching replaced slavery.",
      "Reconstruction's constitutional legacy survived for later civil rights use.",
    ],
    commonMistakes: [
      "Blaming Reconstruction's failure on Black officials' 'incompetence' — a Dunning School myth now rejected.",
      "Dating full Jim Crow to 1877 — legal segregation ramped up through the 1880s-90s.",
      "Forgetting that the three Reconstruction Amendments remained law, even when unenforced.",
    ],
    workedExample: {
      prompt:
        "Briefly explain ONE specific reason Reconstruction ended by 1877.",
      solution:
        "Sustained paramilitary violence by white Democrats — the Ku Klux Klan, White League, and Red Shirts — targeted Black voters and Republican officials, especially through the 'Mississippi Plan' of 1875 and similar campaigns that used intimidation and fraud to prevent Black and Republican voting. Combined with Northern voter fatigue after the Panic of 1873 and Grant administration scandals, and with Supreme Court decisions like U.S. v. Cruikshank (1876) that weakened federal enforcement power, this violence allowed 'Redeemer' Democrats to regain control of Southern state governments — a process sealed by the Compromise of 1877, which withdrew the last federal troops from the South.",
    },
  },
  "5.12": {
    id: "5.12",
    title: "Comparison in Period 5",
    summary:
      "Period 5 rewards comparison between Northern and Southern societies, between Reconstruction goals and achievements, and between different phases of Reconstruction policy.",
    lesson:
      "**Comparing North and South on the eve of war**:\n- Economy: industrial-commercial North vs. cotton-slavery South.\n- Population: 22M vs. 9M (3.5M enslaved).\n- Infrastructure: 70% of railroads in the North.\n- Ideology: Free Labor vs. Positive Good of slavery.\n- Political system: mass democracy for white men vs. planter-dominated.\n\n**Comparing Union and Confederate war efforts**:\n| Dimension | Union | Confederacy |\n|-----------|-------|-------------|\n| Mobilization | 2.1M served | ~750-900K served |\n| Finance | Greenbacks, national banks, bonds, income tax | Print money → hyperinflation |\n| Home front | Cities continue, factories boom | Food shortages, refugee crises |\n| Foreign policy | British neutrality secured | Recognition never came |\n| Emancipation | Moved toward freeing enslaved people | Defended slavery to the end |\n\n**Comparing phases of Reconstruction**:\n- **Lincoln's 10% Plan**: lenient, focused on restoration.\n- **Johnson's Presidential Reconstruction**: even more lenient; enabled Black Codes.\n- **Radical/Congressional Reconstruction**: military districts, Black suffrage, 14th and 15th Amendments, Enforcement Acts.\n- **Redemption**: white supremacist governments retake the South through terror and fraud.\n\n**Comparing goals and achievements**:\n- **Abolition**: achieved (13th Amendment).\n- **Black citizenship**: achieved legally (14th Amendment), undermined in practice.\n- **Black suffrage**: achieved legally (15th), undermined through disenfranchisement by 1890s.\n- **Economic independence for freedpeople**: never achieved; sharecropping trapped them.\n- **Long-term civil rights**: constitutional foundation laid; enforcement delayed until mid-20th century.\n\n**Comparing Period 5 to later civil rights movements**:\n- Reconstruction Amendments became the legal basis for 1950s-60s civil rights victories (Brown v. Board, Civil Rights Acts).\n- In that sense Reconstruction was unfinished, not failed.\n\nAPUSH LEQ prompts often ask you to evaluate the extent of change or to compare — come armed with these comparative structures.",
    keyIdeas: [
      "North-South comparison sets up the war and shows why the Union won.",
      "Reconstruction phases (Lincoln → Johnson → Congressional → Redemption) have distinct goals and results.",
      "Reconstruction achieved legal abolition and citizenship but not economic or political security for Black people.",
      "Constitutional legacy outlasted political failure.",
    ],
    commonMistakes: [
      "Treating 'the South' as monolithic — Upper South, Deep South, border states differed.",
      "Missing the 13th-14th-15th Amendments as the lasting achievement.",
      "Skipping the economic dimension of Reconstruction's failure (sharecropping).",
    ],
  },

  // =========================================================================
  // PERIOD 6 — 1865-1898
  // =========================================================================
  "6.1": {
    id: "6.1",
    title: "Contextualizing Period 6",
    summary:
      "Between 1865 and 1898 the U.S. industrialized on an unprecedented scale, conquered and settled the West, absorbed 20 million immigrants, and grappled with inequality, labor unrest, and the limits of Gilded Age politics.",
    lesson:
      "Period 6 is the era of **industrial capitalism**, mass immigration, and Western settlement — a period of growth that produced enormous wealth and severe inequality.\n\n**Industrial expansion**:\n- U.S. became the world's largest industrial economy by 1890.\n- Steel (Carnegie), oil (Rockefeller), finance (Morgan), railroads dominate the economy.\n- Gross domestic product tripled between 1869 and 1899.\n\n**Western settlement**:\n- Transcontinental Railroad (completed 1869).\n- Homestead Act (1862) pulled millions west.\n- Native peoples dispossessed through war, reservation policy, Dawes Act (1887).\n- Mining booms, cattle drives, sodbusting Plains farms.\n- Frontier 'closed' per the 1890 census.\n\n**Mass immigration**:\n- 20 million immigrants, increasingly from Southern and Eastern Europe.\n- Urban ethnic enclaves; tensions with native-born Americans; Chinese Exclusion Act (1882).\n\n**Labor and inequality**:\n- Wage labor dominant in industry; strikes (Great Railroad Strike 1877, Haymarket 1886, Homestead 1892, Pullman 1894).\n- Knights of Labor, then AFL (Gompers, 1886).\n- Social Darwinism, Gospel of Wealth justify inequality; Social Gospel and reformers push back.\n\n**Politics**:\n- Close elections, narrow partisan margins.\n- Patronage and corruption ('Tweed Ring,' spoils system).\n- Pendleton Civil Service Act (1883).\n- Populism rises in the 1890s; Bryan's 'Cross of Gold' (1896).\n\n**The 'New South'**:\n- Boosterism vs. sharecropping reality.\n- Jim Crow codified; Plessy v. Ferguson (1896).\n\n**Foreign policy**:\n- Seward buys Alaska (1867).\n- Growing expansionism by the 1890s (see Period 7).\n\n**End of period**: 1898 Spanish-American War transitions to Period 7's imperial phase.",
    keyIdeas: [
      "Industrial expansion concentrated wealth in the Northeast and Midwest.",
      "Mass immigration + urbanization reshaped cities and politics.",
      "Western settlement + Dawes Act + railroads dispossessed Native peoples.",
      "Labor unrest was constant; class politics entered the national stage.",
      "Jim Crow was erected in the South; Plessy (1896) capped it.",
    ],
    commonMistakes: [
      "Treating 'Gilded Age' as just corruption — it was structural inequality, not personal failings.",
      "Missing the scale of immigration.",
      "Skipping Native dispossession as central to Western settlement.",
    ],
  },
  "6.2": {
    id: "6.2",
    title: "Westward Expansion: Economic Development",
    summary:
      "Railroads, mining, ranching, and homesteading transformed the West into an integrated region of the American economy between 1865 and 1898.",
    lesson:
      "**Railroads**:\n- **Transcontinental Railroad (1862-69)**: Union Pacific (building westward) met Central Pacific (building east from Sacramento, largely built by Chinese immigrants) at Promontory Summit, Utah (May 1869).\n- Land grants of 174 million acres to railroad companies — by sections alternating with government land.\n- By 1900, five transcontinentals connected East and West.\n- Railroads set national **time zones** (1883) and standardized commerce.\n- Standardization of gauges and tracks.\n\n**Mining**:\n- **Comstock Lode** (Nevada, 1859) silver.\n- Later rushes: Pikes Peak Colorado (1859), Black Hills Dakota (1874), Klondike Yukon/Alaska (1896-98).\n- Boom towns; Chinese and European immigrant labor; migration of wealth and labor east after booms.\n- Hard-rock mining gave way to corporate operations by 1890s.\n\n**Cattle frontier**:\n- **Long drives** from Texas to railheads in Kansas (Abilene, Dodge City) 1866-85.\n- 'Beef bonanza' built fortunes.\n- Harsh winters (1886-87), overgrazing, barbed wire (Glidden, 1874), and rail expansion ended the open range.\n- **Cowboy** (a mixed workforce — Black, Mexican, Anglo) became an American cultural icon.\n\n**Farming the Plains**:\n- **Homestead Act (1862)**: 160 acres free after 5 years of farming. Many plots too small for arid Plains; many claims failed.\n- **Timber Culture Act (1873), Desert Land Act (1877)**: expanded homesteading.\n- Sodbusters' plows broke the tough prairie grasses with John Deere's steel plow.\n- **Dry farming**, windmills, **barbed wire**, and **railroads** enabled Plains agriculture.\n- Great Plains became the nation's wheat and cattle belt.\n- **Grange movement (1867+)** organized farmers politically.\n\n**Environmental impact**:\n- Bison herds destroyed — estimated 30M to 50M bison reduced to ~1,000 by 1890; deliberately to undermine Plains Native peoples.\n- Topsoil erosion eventually fueled the 1930s Dust Bowl.\n- Water scarcity driving irrigation politics to the present.\n\n**Industrial integration**:\n- Western raw materials (wheat, beef, ore, timber) flowed east by rail.\n- Eastern manufactured goods flowed west.\n- Created a truly national economy.",
    keyIdeas: [
      "Transcontinental Railroad (1869) integrated the West into the national economy.",
      "Mining, cattle, and homesteading were three overlapping economic frontiers.",
      "Bison destruction was deliberate and catastrophic.",
      "Plains agriculture was enabled by tech (steel plow, barbed wire, windmills) and politics (Homestead Act).",
      "Grange movement (1867+) organized farmers.",
    ],
    commonMistakes: [
      "Treating the West as unoccupied — it was Native land actively dispossessed.",
      "Missing Chinese labor on railroads.",
      "Claiming the open range ended only because of tech — harsh winters and overgrazing also ended it.",
    ],
    workedExample: {
      prompt:
        "Briefly explain ONE specific way railroads transformed the U.S. economy between 1865 and 1898.",
      solution:
        "The completion of the transcontinental railroad in 1869 and the subsequent construction of four additional transcontinental lines by 1900 linked Western agricultural and mining regions to Eastern manufacturing and financial centers, enabling goods to cross the continent in days rather than months. The need for coordinated schedules drove the adoption of standardized national time zones in 1883 and uniform track gauges, creating a genuinely national market in which Chicago's meatpackers, Pittsburgh's steel mills, and Kansas wheat farmers operated within a single integrated economy.",
    },
  },
  "6.3": {
    id: "6.3",
    title: "Westward Expansion: Social and Cultural Development",
    summary:
      "Western settlement dispossessed Native peoples through military defeat, reservation policy, and the Dawes Act; it also produced a multiethnic society of European immigrants, Black Exodusters, Chinese workers, and Mexican Americans.",
    lesson:
      "**Native American dispossession**:\n\n- **Plains Wars (1860s-70s)**:\n  - Sand Creek Massacre (Colorado, 1864): militia attacked a Cheyenne camp; ~150 killed, mostly women and children.\n  - Red Cloud's War (1866-68): Lakota forced U.S. to abandon Bozeman Trail forts.\n  - Fort Laramie Treaty (1868) created Great Sioux Reservation.\n  - Black Hills gold (1874) violated the treaty.\n  - **Battle of Little Bighorn (June 1876)**: Lakota and Cheyenne under Sitting Bull and Crazy Horse wiped out Custer's 7th Cavalry.\n  - U.S. then pursued systematic defeat; Sitting Bull surrendered 1881.\n- **Wounded Knee Massacre (Dec 1890)**: U.S. Army killed ~250-300 Lakota, mostly women and children, ending the Plains Wars.\n- **Nez Perce (1877)**: Chief Joseph's 1,200-mile retreat ending in surrender.\n- **Apache Wars** (Southwest) under Geronimo ended 1886.\n\n- **Reservation policy**:\n  - Indian Appropriations Act (1871) ended the practice of treating tribes as sovereign nations.\n  - Bureau of Indian Affairs became administrator of reservations — often corrupt.\n\n- **Dawes Severalty Act (1887)**:\n  - Broke up tribal lands into individual allotments (160 acres per family).\n  - 'Surplus' land sold to whites.\n  - Aim: forced assimilation; tribes lost ~⅔ of land base by 1934.\n  - Indian boarding schools (Carlisle, 1879) forcibly assimilated Native children — 'Kill the Indian, save the man' (Richard Pratt).\n\n- **Ghost Dance movement (1889-90)**: spiritual revival predicting disappearance of whites and restoration of Native life. Spread across the Plains. Triggered U.S. military panic and Wounded Knee.\n\n**African Americans in the West**:\n- **Exodusters (1879+)**: ~40,000 Black Southerners migrated to Kansas to escape Redemption-era violence.\n- **Buffalo Soldiers**: Black cavalry regiments (9th, 10th).\n- **Cowboys**: an estimated 25% of cowboys were Black; a similar share Mexican.\n\n**Chinese Americans**:\n- Provided most of the Central Pacific's track labor.\n- Worked mines, agriculture, small businesses.\n- **Chinese Exclusion Act (1882)** barred nearly all Chinese immigration — first major federal immigration restriction by nationality.\n- Violence (Rock Springs Massacre, Wyoming, 1885 — 28 Chinese miners killed).\n\n**Mexican Americans**:\n- Treaty of Guadalupe Hidalgo (1848) promised property rights; in practice, land was taken through courts, fraud, and violence.\n- Concentrated in the Southwest; many worked as agricultural laborers, miners, railroad workers, ranchers.\n\n**Frontier ideology**:\n- **Frederick Jackson Turner's 'Frontier Thesis' (1893)**: the frontier experience had shaped American democracy, individualism, and character. The 1890 census had declared the frontier closed. Influential but critiqued — ignored Native, Black, Mexican, Chinese presence.",
    keyIdeas: [
      "Plains Wars and Wounded Knee (1890) culminated in Native military defeat.",
      "Dawes Act (1887) broke up tribal lands and forced assimilation.",
      "Exodusters, Buffalo Soldiers, Chinese laborers, Mexican Americans made the West multiethnic.",
      "Chinese Exclusion Act (1882) was the first major federal immigration restriction.",
      "Turner's Frontier Thesis (1893) mythologized the frontier as shaping American democracy.",
    ],
    commonMistakes: [
      "Confusing Wounded Knee (1890) with earlier engagements — it was the culminating massacre.",
      "Treating the Dawes Act as protective — it destroyed tribal land bases.",
      "Forgetting Chinese labor and Chinese exclusion in Western history.",
    ],
    workedExample: {
      prompt:
        "Briefly explain ONE specific way federal policy affected Native Americans between 1865 and 1898.",
      solution:
        "The Dawes Severalty Act of 1887 broke up communal tribal landholdings into individual 160-acre allotments for Native families and sold the 'surplus' land to white settlers, intending to force assimilation into Anglo-American farming. The result was catastrophic: by 1934, Native peoples had lost roughly two-thirds of their 1887 land base. Combined with Indian boarding schools like Carlisle, which forcibly separated Native children from their families and languages, Dawes was a sustained federal effort to destroy Native societies from within.",
    },
  },
  "6.4": {
    id: "6.4",
    title: "The 'New South'",
    summary:
      "Boosters promised a modernized industrial South, but sharecropping, Jim Crow laws, disenfranchisement, and Plessy v. Ferguson (1896) reinscribed racial hierarchy and poverty.",
    lesson:
      "**'New South' vision**:\n- **Henry Grady** (Atlanta newspaper editor) promoted a 'New South' of industry, railroads, and reconciliation with the North in speeches and editorials through the 1880s.\n- Some industrial growth: **textile mills** moved south, taking advantage of cheap labor, proximity to cotton, and low taxes. **Birmingham, Alabama**, became a steel center. **Tobacco** manufacturing (Duke family) in North Carolina.\n- Railroads expanded.\n\n**But the majority reality was poor, rural, and agricultural**:\n- **Sharecropping** — tenant farmers (Black and increasingly white) worked land in exchange for a share of the crop; storekeepers' credit at high rates (crop-lien system) locked most in perpetual debt.\n- Cotton prices declined in the 1880s-90s, deepening rural poverty.\n- South lagged the North in income per capita by a wide margin.\n\n**Disenfranchisement**:\n- **Mississippi Constitution of 1890** pioneered legal disenfranchisement using:\n  - **Literacy tests** with subjective grading by white registrars.\n  - **Poll taxes**.\n  - **Grandfather clauses** (exempted those whose ancestors had voted pre-1867 — exempting poor whites but not Black voters).\n  - **Understanding clauses**.\n- Other Southern states adopted similar constitutions in the 1890s-1900s.\n- Black voter registration in Louisiana fell from ~130,000 (1896) to ~1,300 (1904).\n\n**Jim Crow segregation**:\n- State and local laws segregated railroads, streetcars, hotels, restaurants, schools, cemeteries, drinking fountains.\n- **Plessy v. Ferguson (1896)**: Supreme Court upheld 'separate but equal' under the 14th Amendment. Justice John Marshall Harlan's lone dissent: 'the Constitution is color-blind.'\n\n**Lynching**:\n- Peaked in the 1890s — 100+ per year.\n- **Ida B. Wells** published *Southern Horrors* (1892) exposing lynching and was driven out of Memphis.\n\n**Black responses**:\n- **Booker T. Washington** — Tuskegee Institute (1881). Atlanta Compromise speech (1895): accept segregation temporarily; focus on economic self-help and vocational education.\n- **W.E.B. Du Bois** (later, Period 7) — demanded full civil rights and higher education; founded NAACP (1909).\n- **National Association of Colored Women** (1896): Black women's civic reform.\n- Migration north (Great Migration began ~1910).\n\n**Populism and race**:\n- Populist Party (1892) attempted a biracial coalition in some Southern states.\n- Democrats used 'race card' ruthlessly to break Populism; by 1896 biracial politics in the South was crushed.\n\nBy 1898 the South was an apartheid society within the United States, with white supremacy buttressed by law, violence, and poverty.",
    keyIdeas: [
      "Grady's 'New South' rhetoric overstated industrial progress.",
      "Sharecropping + crop-lien system kept most rural Southerners poor.",
      "Mississippi Plan (1890) legally disenfranchised Black voters.",
      "Plessy v. Ferguson (1896) upheld 'separate but equal.'",
      "Washington's accommodationist strategy contested by Du Bois and Wells later.",
    ],
    commonMistakes: [
      "Overstating New South industrial progress relative to persistent agrarian poverty.",
      "Confusing Plessy (1896) with Brown (1954) — Plessy upheld segregation.",
      "Missing Ida B. Wells and Booker T. Washington as key figures.",
    ],
    workedExample: {
      prompt:
        "Briefly explain ONE specific way racial hierarchy was enforced in the South between 1865 and 1898.",
      solution:
        "Beginning with Mississippi's 1890 constitution, Southern states introduced literacy tests with subjective grading by white registrars, poll taxes, and grandfather clauses that exempted white voters with pre-1867 voting ancestors while excluding nearly all Black voters. The result was dramatic: in Louisiana, registered Black voters fell from roughly 130,000 in 1896 to 1,300 in 1904. Combined with the Supreme Court's Plessy v. Ferguson ruling in 1896 upholding 'separate but equal,' these measures reinstalled white supremacy as law across the post-Reconstruction South.",
    },
  },
  "6.5": {
    id: "6.5",
    title: "Technological Innovation",
    summary:
      "Between 1865 and 1898 a wave of inventions — steel, electricity, telephone, light bulb, typewriter, phonograph — transformed industry and daily life.",
    lesson:
      "**Steel**:\n- **Bessemer process** (introduced to the U.S. in the 1860s, refined by Andrew Carnegie): blew air through molten iron to remove carbon, producing steel cheaply and at scale.\n- Steel enabled taller buildings (skyscrapers, made possible by Otis's elevator), longer bridges (Brooklyn Bridge, 1883), better rails, and larger ships.\n\n**Electricity**:\n- **Thomas Edison** invented the practical incandescent light bulb (1879) and built the first commercial power station (Pearl Street, NYC, 1882) using direct current.\n- **Nikola Tesla** and **George Westinghouse** championed **alternating current (AC)**, which won the 'War of Currents' because AC could be transmitted over longer distances.\n- Electricity lit streets and factories, powered streetcars (Richmond electric streetcar, 1888), and transformed manufacturing.\n\n**Communication**:\n- **Alexander Graham Bell** patented the telephone (1876).\n- By 1900, 1.3 million telephones in use; AT&T dominant.\n- **Samuel Morse's telegraph** (earlier) integrated national communication; **transatlantic cable** (1866) connected U.S. and Europe.\n- **Typewriter** (Sholes, 1868; commercialized by Remington from 1874) and Edison's **phonograph** (1877) transformed offices and entertainment.\n\n**Industrial processes**:\n- **Assembly-line precursors**: meatpacking 'disassembly' lines in Chicago (Armour, Swift).\n- **Interchangeable parts** from Civil War armories spread to sewing machines, bicycles, later automobiles.\n- **Scientific management (Frederick Taylor, 1890s-1900s)**: time-motion studies to optimize labor productivity.\n\n**Agricultural technology**:\n- **Mechanical reaper** (McCormick), steel plow (Deere), combine harvesters mechanized farming.\n- **Refrigerated railcars** (Swift, 1870s) allowed Chicago to dress beef and ship it nationally.\n\n**Building the city**:\n- **Skyscrapers**: Home Insurance Building in Chicago (1885, 10 stories, steel skeleton).\n- **Subways**: Boston (1897), New York (1904, early 20th century).\n- **Elevator** (Otis, 1853 safety design) made skyscrapers livable.\n\n**Consumer impact**:\n- **Sewing machines**, **phonographs**, **cameras** (Kodak, 1888), **bicycles** made technology personal.\n- **Mail-order catalogs** (Sears 1886, Montgomery Ward 1872) brought urban consumer goods to rural households.",
    keyIdeas: [
      "Steel + electricity + telephone = foundations of the modern economy.",
      "Edison's light bulb (1879), Bell's telephone (1876), Bessemer steel process — canonical inventions.",
      "Skyscrapers and elevators transformed city skylines.",
      "Refrigerated railcars nationalized meat markets.",
      "Scientific management (Taylor) began rationalizing labor.",
    ],
    commonMistakes: [
      "Crediting Edison with inventing electricity — he commercialized it.",
      "Confusing Bessemer process with Gilded Age labor practices — they're separate topics.",
      "Forgetting mail-order catalogs (Sears, Ward) as consumer-technology access.",
    ],
    workedExample: {
      prompt:
        "Briefly explain ONE specific technological innovation of 1865-1898 and its economic impact.",
      solution:
        "The Bessemer process, adopted at scale by Andrew Carnegie's steel works in Pittsburgh in the 1870s, drastically reduced the cost of producing steel — from roughly $100 a ton in the 1860s to about $12 a ton by the 1890s. Cheap steel enabled the massive expansion of railroads, the construction of skyscrapers with steel frames in Chicago and New York, and the rise of the American steel industry to world leadership by 1900, making Carnegie one of the richest men in the world and reshaping American cities and industry.",
    },
  },
  "6.6": {
    id: "6.6",
    title: "The Rise of Industrial Capitalism",
    summary:
      "Vertical and horizontal integration, trusts, and investment banking concentrated wealth in a handful of companies and industrialists — 'captains of industry' or 'robber barons' — reshaping the American economy.",
    lesson:
      "**Corporate strategies**:\n\n- **Vertical integration** (Carnegie): control every stage of production — Carnegie Steel owned iron mines, coke ovens, ore ships, rails, and mills. Reduces costs, prevents suppliers from overcharging.\n- **Horizontal integration** (Rockefeller): buy out competitors to dominate one stage of production. Standard Oil controlled ~90% of U.S. refining by 1879.\n- **Trusts**: legal device (1882 Standard Oil Trust) in which stockholders of multiple companies transferred shares to trustees who operated the group as a single entity — evading anti-monopoly laws.\n- **Holding companies**: after state laws allowed (New Jersey, 1889), corporations could simply own other corporations.\n\n**The great industrialists**:\n\n- **Andrew Carnegie (steel)**: 'Gospel of Wealth' (1889) argued the rich had a duty to give back; funded libraries, Carnegie Hall, universities.\n- **John D. Rockefeller (oil)**: built Standard Oil; used secret rebates and predatory pricing; later philanthropy (University of Chicago).\n- **Cornelius Vanderbilt (railroads/shipping)**.\n- **J.P. Morgan (finance)**: bailed out the U.S. Treasury in 1895; organized U.S. Steel (1901, Period 7 — first billion-dollar corporation); created bank trusts.\n- **Leland Stanford, James J. Hill, Collis P. Huntington (railroads)**.\n\n**Ideologies**:\n\n- **Social Darwinism** (Herbert Spencer; William Graham Sumner): applied 'survival of the fittest' to economic competition; taught that inequality was natural and beneficial; laissez-faire government was virtuous.\n- **Gospel of Wealth** (Carnegie): wealth acquisition was justified if accompanied by philanthropy; critiqued Social Darwinism's indifference to the poor.\n- **Rags-to-riches mythology** (Horatio Alger novels from 1867): ordinary boys could rise through hard work, virtue, luck.\n- **Critics**: Edward Bellamy's *Looking Backward* (1888) imagined a cooperative socialist future; Henry George's *Progress and Poverty* (1879) blamed inequality on land-rent monopolization and proposed a single tax.\n\n**Regulation**:\n- **Interstate Commerce Act (1887)**: created the Interstate Commerce Commission (ICC) to regulate railroads — first federal regulatory agency, though initially weak.\n- **Sherman Antitrust Act (1890)**: prohibited 'combinations in restraint of trade.' Enforcement weak until Progressive Era. Used against labor unions more than monopolies in the 1890s.\n\n**Inequality**:\n- By 1890 the top 1% owned an estimated 51% of real and personal property.\n- Industrial workers earned subsistence wages in dangerous conditions.\n- Child labor widespread.\n- 10-12 hour workdays were typical.",
    keyIdeas: [
      "Vertical integration (Carnegie) + horizontal integration (Rockefeller) + trusts concentrated industry.",
      "Social Darwinism and Gospel of Wealth were competing ideologies of the era.",
      "Sherman Antitrust Act (1890) was weak as initially enforced.",
      "Morgan was the era's dominant financier.",
      "Enormous inequality: top 1% owned majority of wealth.",
    ],
    commonMistakes: [
      "Confusing vertical and horizontal integration.",
      "Thinking the Sherman Antitrust Act successfully broke up monopolies — it was weak until Progressive Era.",
      "Treating the 'robber baron' vs. 'captain of industry' debate as settled.",
    ],
    workedExample: {
      prompt:
        "Briefly explain ONE specific business strategy used by industrialists between 1865 and 1898.",
      solution:
        "John D. Rockefeller practiced horizontal integration by buying out or driving out competing oil refiners, consolidating them under Standard Oil, which controlled roughly 90 percent of U.S. petroleum refining by 1879. To coordinate these holdings while avoiding state anti-monopoly laws, Rockefeller's attorneys created the Standard Oil Trust in 1882, a legal device in which stockholders transferred their shares to trustees who ran the combined companies as a single entity — allowing Rockefeller to set prices and crush remaining rivals until Progressive-era antitrust action broke Standard up in 1911.",
    },
  },
  "6.7": {
    id: "6.7",
    title: "Labor in the Gilded Age",
    summary:
      "Industrial workers organized, struck, and were often violently suppressed; the Knights of Labor, American Federation of Labor, and key strikes (Great Railroad Strike, Haymarket, Homestead, Pullman) defined the era's labor history.",
    lesson:
      "**Working conditions**:\n- 10-12 hour workdays, 6 days/week.\n- Low wages at subsistence level — around $400-500 annually for industrial workers.\n- Dangerous work: tens of thousands of deaths and injuries annually in industry.\n- Child labor; women underpaid relative to men.\n- Boom-bust cycles (Panics of 1873, 1893) produced massive unemployment.\n\n**Union organizing**:\n\n- **National Labor Union (1866)**: short-lived.\n- **Knights of Labor (1869, grew after 1879 under Terence Powderly)**:\n  - Inclusive — open to Black, women, skilled, and unskilled workers (excluded bankers, lawyers, gamblers).\n  - Advocated 8-hour day, cooperative workshops, opposition to child labor.\n  - Membership peaked at ~700,000 in 1886.\n  - Collapsed after being (unfairly) blamed for **Haymarket (1886)**.\n\n- **American Federation of Labor (AFL, 1886, Samuel Gompers)**:\n  - Federation of craft unions of skilled workers.\n  - 'Bread-and-butter unionism' — focused on wages, hours, and conditions rather than politics.\n  - Excluded most unskilled workers, women, and often Black workers.\n  - Surpassed Knights in membership by 1890s; became dominant labor organization.\n\n**Major strikes**:\n\n- **Great Railroad Strike (1877)**: wage cuts triggered strikes that spread from Baltimore & Ohio to nationwide; federal troops suppressed it; ~100 killed. First national strike.\n- **Haymarket Affair (May 1886, Chicago)**: during a rally for 8-hour day, a bomb killed police officers; authorities responded with violence. 8 anarchists convicted (evidence weak); 4 hanged. Destroyed Knights of Labor politically; made 'anarchist' a scare word.\n- **Homestead Strike (July 1892)**: Carnegie Steel's Homestead, PA mill; manager Henry Clay Frick locked out workers over wages. Pinkerton agents arrived by barge and a gun battle killed ~10. PA state militia broke the strike. Crushed unionization in steel for 40+ years.\n- **Pullman Strike (May-July 1894)**: Pullman Palace Car Company cut wages but not company-town rents. Workers struck; **Eugene V. Debs's American Railway Union (ARU)** supported with a nationwide rail boycott. Grover Cleveland sent federal troops and obtained an injunction under the Sherman Antitrust Act. Strike broken; Debs jailed. Debs became a socialist.\n\n**Other workers' struggles**:\n- Women workers in textile, garment, and clerical trades; some organizing.\n- Black workers often excluded by white unions; organized separately (Colored National Labor Union, 1869).\n- Chinese workers excluded by both unions and federal law (1882 Chinese Exclusion Act).\n\n**Government posture**:\n- Federal courts repeatedly issued anti-strike injunctions.\n- **In re Debs (1895)**: Supreme Court upheld injunctions against strikes.\n- Sherman Antitrust Act used against unions more than monopolies.\n\nOrganized labor made slow progress. Real breakthroughs came in the Progressive Era and especially the New Deal.",
    keyIdeas: [
      "Knights of Labor (inclusive) vs. AFL (skilled craft unions).",
      "Great Railroad Strike (1877), Haymarket (1886), Homestead (1892), Pullman (1894) — four signature strikes.",
      "Haymarket destroyed Knights; Homestead crushed steel unionization.",
      "Pullman Strike broken by federal injunction; Debs turned socialist.",
      "Federal government and courts sided with employers.",
    ],
    commonMistakes: [
      "Confusing Knights of Labor with AFL — Knights were inclusive, AFL craft-based.",
      "Blaming Haymarket on the Knights — they had no direct role.",
      "Forgetting that Sherman Antitrust was used against strikes.",
    ],
    workedExample: {
      prompt:
        "Briefly explain ONE specific reason labor organizing was difficult in the late 19th century.",
      solution:
        "Federal and state governments consistently sided with employers against strikes. During the 1894 Pullman Strike, President Grover Cleveland dispatched federal troops on the pretext of protecting mail trains and obtained an injunction against Eugene V. Debs's American Railway Union under the Sherman Antitrust Act, jailing Debs and breaking the strike. Combined with court rulings like In re Debs (1895) that upheld anti-strike injunctions, and with employer tactics such as hiring Pinkerton guards at the 1892 Homestead lockout, this legal and coercive environment made sustained unionization extremely difficult until the Progressive and New Deal eras.",
    },
  },
  "6.8": {
    id: "6.8",
    title: "Immigration and Migration in the Gilded Age",
    summary:
      "About 20 million immigrants arrived between 1865 and 1914, increasingly from Southern and Eastern Europe; internal migration brought rural Americans — including Southern Black Americans — into cities.",
    lesson:
      "**Scale**:\n- 1865-1914: ~25 million immigrants to the U.S., with the rate accelerating sharply from the 1880s onward.\n- By 1910, about 15% of the U.S. population was foreign-born — historic high.\n\n**Changing composition**:\n- **Old immigrants** (pre-1880): Northern/Western Europe — Germans, Irish, British, Scandinavians. Often Protestant (except Irish Catholics); often had some resources.\n- **New immigrants** (1880s-1920s): Southern/Eastern Europe — Italians, Poles, Russians (including ~2M Jews fleeing pogroms), Slovaks, Greeks, Czechs. Often Catholic or Jewish; often poorer; often non-English-speaking.\n- Chinese immigration curtailed by **Chinese Exclusion Act (1882)**; Japanese and other Asian immigration grew until the 'Gentlemen's Agreement' (1907) and 1924 restriction.\n- Mexican immigration: small but present, especially after the Mexican Revolution (1910).\n\n**Push factors**:\n- European population boom, rural displacement, political persecution (Jewish pogroms in Russia), economic stagnation in Southern/Eastern Europe.\n\n**Pull factors**:\n- American industrial job demand.\n- Homestead Act land.\n- Chain migration — immigrants joining family and friends.\n- Political freedom.\n\n**Ellis Island (1892)**: primary processing station for European immigrants arriving in New York; ~12 million passed through.\n**Angel Island (1910)**: processing station for Asian immigrants in San Francisco Bay; often detained immigrants for weeks while interrogating them.\n\n**Urban settlement**:\n- Immigrants clustered in ethnic neighborhoods (Little Italy, Chinatown, Jewish Lower East Side) — churches, newspapers, aid societies.\n- By 1890, ~75% of population in major cities was first- or second-generation immigrant.\n\n**Internal migration**:\n- Rural to urban: farm consolidation, agricultural depression pushed young people to cities.\n- **Black migration from the South**:\n  - **Exodusters (1879)**: ~40,000 to Kansas.\n  - **Great Migration proper** (c. 1910-1970): millions from rural South to Northern industrial cities; beginning in this period, accelerating after 1915.\n  - Pushed by Jim Crow, sharecropping, lynching; pulled by industrial jobs.\n\n**Settlement houses**:\n- **Jane Addams's Hull House** (Chicago, 1889) and **Lillian Wald's Henry Street Settlement** (NYC, 1893): middle-class reformers living in working-class neighborhoods offering social services, English classes, kindergartens.\n\n**Political machines**:\n- Urban political machines (Tammany Hall in NYC, controlled by 'Boss Tweed' 1860s-70s, later others): traded jobs, services, and legal help to immigrants in exchange for votes.\n- Machines were corrupt but filled the social-service vacuum before welfare state existed.",
    keyIdeas: [
      "Shift from Northern/Western to Southern/Eastern European immigration in the 1880s.",
      "Ellis Island (1892), Angel Island (1910) as processing stations.",
      "Chinese Exclusion Act (1882) barred Chinese immigration.",
      "Ethnic enclaves, settlement houses, political machines shaped urban life.",
      "Early Black migration from the South began in this period.",
    ],
    commonMistakes: [
      "Not distinguishing 'old' vs. 'new' immigrants.",
      "Missing Chinese Exclusion (1882) as the first major restriction.",
      "Assuming settlement houses solved problems — they provided limited services but worked on a small scale.",
    ],
    workedExample: {
      prompt:
        "Briefly explain ONE specific way immigration changed American cities between 1865 and 1898.",
      solution:
        "Mass immigration from Southern and Eastern Europe beginning in the 1880s transformed American cities into dense, multi-ethnic enclaves. By 1890 roughly 75 percent of the population of major cities like New York and Chicago was first- or second-generation immigrant, living in neighborhoods organized around churches, synagogues, ethnic newspapers, and mutual aid societies. These communities also became the political base of urban machines like New York's Tammany Hall, which traded services and jobs for immigrant votes and mediated between newcomers and an otherwise hostile Anglo-American civic order.",
    },
  },
  "6.9": {
    id: "6.9",
    title: "Responses to Immigration in the Gilded Age",
    summary:
      "Nativists pushed for immigration restriction; reformers ran settlement houses and Americanization programs; ethnic communities built institutions for mutual support.",
    lesson:
      "Native-born Americans responded to immigration with a mix of hostility, assimilation pressure, and genuine aid.\n\n**Nativism**:\n- **American Protective Association (APA, 1887)**: anti-Catholic organization (successor to the Know-Nothings of 1850s). Reached ~500,000 members briefly.\n- **Immigration Restriction League (1894)** pushed for literacy tests to limit Southern and Eastern European immigration. (Tests eventually passed 1917 over Wilson's veto.)\n- Labor unions (AFL) often opposed unrestricted immigration — newcomers competed for jobs.\n- **Chinese Exclusion Act (1882)**: banned most Chinese immigration; renewed in 1892 (Geary Act) and made permanent (1902). Not repealed until 1943.\n- Anti-Chinese violence: Rock Springs Massacre (1885), anti-Chinese riots in the 1880s.\n- **'Yellow Peril'** racial fears about Asians.\n\n**Americanization programs**:\n- Public schools taught English and civic norms.\n- Settlement houses provided English classes, citizenship training, kindergartens, clubs, and job referrals.\n- Employers (Henry Ford later) insisted on English and Protestant norms.\n- **Melting pot** ideology vs. more pluralist views like Horace Kallen's 'cultural pluralism' (1915, just after this period).\n\n**Ethnic community responses**:\n- **Churches and synagogues** — Catholic parishes, Eastern Orthodox churches, Lutheran and Reformed churches, synagogues.\n- **Parochial schools** (Catholic) preserved religion and ethnic language.\n- **Mutual aid societies** provided sickness, death, and unemployment benefits before social insurance.\n- **Foreign-language newspapers** (Yiddish *Forverts*, German and Italian dailies).\n- **Fraternal orders** and cultural associations.\n\n**Political responses**:\n- Urban **political machines** (Tammany Hall, Chicago's machines) incorporated immigrants into politics quickly.\n- Immigrants also participated in labor organizing.\n- Some turned to socialism, anarchism, or Zionism.\n\n**Settlement houses (the reform side)**:\n- **Jane Addams's Hull House** (1889, Chicago): classes, daycare, arts, advocacy for labor and public health reforms.\n- **Lillian Wald** launched visiting nurse services from Henry Street Settlement.\n- Settlement-house workers trained a generation of Progressive reformers (Frances Perkins, future Secretary of Labor under FDR, started at Hull House).\n\n**Education and civic life**:\n- Rising **compulsory school laws** pulled immigrant children into public schools.\n- Mixed results: many children did integrate, but at cultural cost; dual identity was common.\n\n**Religious diversity**:\n- Catholic Church became the largest denomination by number — a major shift in American religious landscape.\n- Judaism grew sharply with Eastern European migration.\n\nThe immigration question would remain central in American politics through the 1924 National Origins Act and beyond.",
    keyIdeas: [
      "Nativist organizations (APA, Immigration Restriction League) pushed for limits.",
      "Chinese Exclusion Act (1882) was the first major federal restriction.",
      "Settlement houses offered aid and trained Progressive reformers.",
      "Urban political machines incorporated immigrants.",
      "Ethnic communities built churches, newspapers, mutual aid societies.",
    ],
    commonMistakes: [
      "Ignoring Chinese Exclusion as nativism's most concrete legal victory in this period.",
      "Underestimating urban political machines' role as immigrant mediator.",
      "Forgetting settlement houses as a training ground for Progressive reformers.",
    ],
  },
  "6.10": {
    id: "6.10",
    title: "Development of the Middle Class",
    summary:
      "A growing middle class of clerks, managers, professionals, and small business owners expanded in late 19th-century cities — with new consumption, leisure, and gender patterns.",
    lesson:
      "The late 19th century produced an expanding middle class, distinct from both the planter-merchant elite and the industrial working class.\n\n**Composition**:\n- **Professionals**: doctors, lawyers, engineers, accountants, teachers.\n- **Managers and clerks**: needed by growing corporations.\n- **Small business owners** and independent shopkeepers.\n- **Civil servants**: expanding after civil service reforms.\n\n**Consumer culture**:\n- **Department stores**: Macy's (NYC), Marshall Field's (Chicago), Wanamaker's (Philadelphia) offered wide selection under one roof. Many hired women as clerks.\n- **Mail-order catalogs**: Montgomery Ward (1872), Sears (1886) brought goods to rural homes.\n- **Advertising** grew into a distinct industry; brand names emerged (Ivory Soap, Coca-Cola, Kodak).\n- **Mass-produced goods** — furniture, clothing, appliances — replaced homemade.\n\n**Women's roles**:\n- Middle-class women typically did not work for wages — maintained 'separate spheres.'\n- But increasingly entered **clerical work** (typists, stenographers), **teaching**, **nursing**, **retail sales**.\n- Women's colleges: Vassar (1861), Smith (1871), Wellesley (1875), Bryn Mawr (1885). Increasing access to higher education for middle-class women.\n- **'New Woman'** archetype by 1890s: bicycle-riding, more educated, more independent.\n- **Women's clubs** (General Federation of Women's Clubs, 1890): civic reform.\n\n**Leisure and culture**:\n- **Baseball**: National League (1876); became 'national pastime.'\n- **Football**, **boxing**, **cycling** grew.\n- **Vaudeville** theater, **dime museums**, amusement parks (Coney Island from 1880s).\n- **Public libraries** (Carnegie's gifts built thousands).\n- **Chautauqua movement**: summer adult education assemblies from 1874.\n\n**Housing**:\n- **Streetcar suburbs** made possible by electric streetcars (1888+) — middle classes moved out of urban cores to new neighborhoods with single-family homes.\n- **Victorian architecture**, manicured lawns, parlors with pianos.\n\n**Education**:\n- Public high schools expanded (2,500 in 1890; 14,000 by 1920).\n- Colleges added professional schools.\n- Morrill Land-Grant (1862) and Second Morrill (1890) expanded state universities.\n\n**Cultural anxieties**:\n- **Neurasthenia**: fashionable diagnosis for middle-class exhaustion (particularly for women).\n- **Cult of strenuousness** (TR later): response to fears of effeminacy.\n- Class anxieties about fitting in, keeping up with consumer culture.\n\n**Racial and ethnic limits**:\n- Middle-class life was largely white and native-born.\n- Black middle class existed (teachers, ministers, undertakers, small business owners) but faced Jim Crow ceiling; W.E.B. Du Bois's 'Talented Tenth' concept.\n- Ethnic (Irish, Jewish, Italian) middle classes emerged by second generation.",
    keyIdeas: [
      "Middle class of clerks, managers, professionals expanded with corporate growth.",
      "Department stores, mail-order catalogs, advertising created consumer culture.",
      "Women entered clerical, teaching, nursing jobs; 'New Woman' archetype by 1890s.",
      "Leisure: baseball, amusement parks, vaudeville, public libraries.",
      "Streetcar suburbs separated middle-class residence from work.",
    ],
    commonMistakes: [
      "Treating the middle class as purely white Anglo-Protestant — ethnic and Black middle classes existed, differently constrained.",
      "Missing the consumer-culture dimension of middle-class identity.",
      "Claiming women were newly working for wages universally — middle-class women were more likely to work than in past, but majority still did not.",
    ],
  },
  "6.11": {
    id: "6.11",
    title: "Reform in the Gilded Age",
    summary:
      "Settlement houses, the Social Gospel, civil service reform, and civic reform societies built the organizational foundation for Progressive-era politics to come.",
    lesson:
      "Gilded Age reform did not yet have the political scale of Progressivism, but it built the capacities Progressives would use.\n\n**Settlement house movement**:\n- **Jane Addams's Hull House (1889)** and **Lillian Wald's Henry Street (1893)** — settlement houses where middle-class women and men lived among the urban poor to provide services and advocate for reforms.\n- By 1910 there were ~400 settlement houses nationally.\n- Work: daycare, English classes, clubs, arts, public health nursing, housing campaigns, labor advocacy.\n- Trained a generation of Progressive reformers (Florence Kelley, Frances Perkins, Julia Lathrop).\n\n**Social Gospel**:\n- **Washington Gladden**, **Walter Rauschenbusch** — Protestant ministers applying Christian ethics to urban poverty, inequality, and labor rights.\n- Critiqued Social Darwinism; urged Christians to reform society collectively.\n- Influenced Progressive political reform.\n\n**Civil service reform**:\n- **Pendleton Civil Service Act (1883)** — after President Garfield's assassination by a disappointed office-seeker (1881). Created the **Civil Service Commission**; merit-based federal appointments (10% initially, growing over time).\n- Undercut patronage-based machine politics.\n\n**Muckraking roots**:\n- Earlier than the Progressive muckrakers, journalists exposed corruption — **Thomas Nast's cartoons** of Boss Tweed (*Harper's*, 1870s) helped bring down the Tweed Ring in New York.\n- **Henry George's *Progress and Poverty*** (1879) and **Edward Bellamy's *Looking Backward*** (1888) offered utopian alternatives.\n\n**Temperance**:\n- **Woman's Christian Temperance Union (WCTU, 1874)** under **Frances Willard** — combined temperance with women's rights, labor, and social reform.\n\n**Black reform**:\n- **Booker T. Washington's Tuskegee Institute (1881)** focused on vocational training and economic self-help; **Atlanta Compromise speech (1895)** accepted temporary political and social subordination.\n- **Ida B. Wells** launched anti-lynching campaign (*Southern Horrors*, 1892).\n- **National Association of Colored Women** (1896).\n\n**Women's suffrage**:\n- **NAWSA** (National American Woman Suffrage Association, 1890) — merged Stanton/Anthony and Stone organizations.\n- State victories in the West: Wyoming admitted 1890 with woman suffrage (dated back to 1869 territorial law); Colorado (1893), Utah (1896), Idaho (1896).\n- National suffrage delayed until the 19th Amendment (1920).\n\n**Environmental / preservationist**:\n- **Yellowstone National Park (1872)** — first national park.\n- **John Muir** founded the **Sierra Club (1892)**.\n\n**Urban reform**:\n- Civic leagues and charity organization societies pushed for tenement laws, public health measures, and street paving.\n\n**Populism** (see 6.13): agrarian reform movement — the largest political response to Gilded Age inequality.\n\nReform energy was real but limited — major federal social reform awaited the Progressive Era.",
    keyIdeas: [
      "Settlement houses (Hull House 1889) offered services and trained Progressive reformers.",
      "Social Gospel applied Christianity to social problems.",
      "Pendleton Civil Service Act (1883) began merit-based federal employment.",
      "WCTU combined temperance, women's rights, and labor reform.",
      "Yellowstone (1872), Sierra Club (1892) launched conservation.",
    ],
    commonMistakes: [
      "Treating Progressivism as if it arose from nothing — Gilded Age reform laid the foundation.",
      "Forgetting the Pendleton Act's date (1883) and its origin in Garfield's assassination.",
      "Skipping the conservation beginnings (Yellowstone, Sierra Club).",
    ],
  },
  "6.12": {
    id: "6.12",
    title: "Controversies over the Role of Government in the Gilded Age",
    summary:
      "Debates over laissez-faire vs. regulation produced the Interstate Commerce Act (1887), Sherman Antitrust Act (1890), and early federal regulation — though enforcement was weak.",
    lesson:
      "**Laissez-faire orthodoxy**:\n- Dominant political and economic ideology: limited federal intervention in the economy.\n- Backed by Social Darwinism, business lobbying, and Supreme Court jurisprudence hostile to regulation.\n- Courts invoked **substantive due process** (14th Amendment) to strike down state labor laws — e.g., **Lochner v. New York (1905, Period 7)** struck down a bakers' hour law.\n\n**Pressures for regulation**:\n- **Farmers**: railroad rates, grain elevator fees, debt, monopoly prices.\n- **Workers**: wages, hours, safety.\n- **Small businesses**: trusts' predatory pricing.\n- **Middle-class reformers**: corruption, inequality, public health.\n\n**Granger movement (1867+)**:\n- Oliver Kelley's **Patrons of Husbandry** (Grange) organized farmers for mutual aid and political action.\n- **Granger Laws** in Midwestern states (1870s) regulated railroad rates and grain elevator fees.\n- **Munn v. Illinois (1877)**: Supreme Court upheld state regulation of grain elevators as 'affected with a public interest.'\n- **Wabash v. Illinois (1886)**: reversed direction — held that states could not regulate **interstate** rates; prompted federal action.\n\n**Interstate Commerce Act (1887)**:\n- Created the **Interstate Commerce Commission (ICC)** — first federal regulatory agency.\n- Required 'reasonable and just' rates; banned rebates and pooling.\n- Weak enforcement — courts sided with railroads in most early cases.\n\n**Sherman Antitrust Act (1890)**:\n- Prohibited 'every contract, combination... or conspiracy in restraint of trade.'\n- Weak enforcement — **U.S. v. E.C. Knight Co. (1895)** ruled sugar manufacturing was not 'commerce' and thus outside Sherman's reach, undercutting it.\n- Often used against unions (*In re Debs*, 1895) until Progressive-era activation under TR.\n\n**Money question**:\n- Gold vs. silver was a central Gilded Age political debate.\n- **Bland-Allison Act (1878)** and **Sherman Silver Purchase Act (1890)** allowed limited silver coinage.\n- Farmers wanted more silver ('free silver') to expand money supply and ease debt.\n- Repeal of Sherman Silver Purchase (1893) during Panic of 1893 intensified Populist anger.\n\n**Tariff**:\n- Republicans favored high tariffs to protect industry; Democrats wanted lower tariffs.\n- **McKinley Tariff (1890)** raised rates to record levels; **Wilson-Gorman Tariff (1894)** lowered them modestly.\n- **Dingley Tariff (1897)** raised them again after McKinley's election.\n\n**Pension system**:\n- Civil War veterans' pensions grew into a major federal expense — first 'welfare state' of the era, directed at Union veterans and their families.\n\n**Indian policy as federal action**:\n- Dawes Act (1887) and boarding-school system as state-building.\n\n**Judicial retrenchment**:\n- *Slaughterhouse Cases (1873)*, *Civil Rights Cases (1883)*, *Plessy (1896)* narrowed federal civil rights enforcement.\n- Meanwhile, corporations used the 14th Amendment (*Santa Clara County v. Southern Pacific R.R., 1886*) to claim constitutional protection as 'persons.'",
    keyIdeas: [
      "Dominant ideology: laissez-faire; pressure from farmers, workers, small business.",
      "Interstate Commerce Act (1887): first federal regulatory agency.",
      "Sherman Antitrust Act (1890): weak but foundational.",
      "Money debate: gold vs. silver, farmers wanted inflation.",
      "Supreme Court often sided with corporations; used 14th Amendment creatively.",
    ],
    commonMistakes: [
      "Claiming early regulations worked — most were gutted by courts until Progressive Era.",
      "Missing the gold-silver debate's centrality.",
      "Forgetting that Sherman Antitrust was used against unions more than against monopolies initially.",
    ],
    workedExample: {
      prompt:
        "Briefly explain ONE specific way the federal government's role in the economy expanded between 1865 and 1898.",
      solution:
        "The Interstate Commerce Act of 1887, passed after Wabash v. Illinois (1886) limited state regulation of interstate railroads, created the Interstate Commerce Commission — the first federal regulatory agency. The ICC required 'reasonable and just' railroad rates and banned pooling and rebates, establishing a precedent that the federal government could regulate private industry for public benefit. Although courts initially sided with railroads in most cases and weakened enforcement, the Act laid the institutional foundation for later Progressive regulation such as the Hepburn Act of 1906.",
    },
  },
  "6.13": {
    id: "6.13",
    title: "Politics in the Gilded Age",
    summary:
      "Close elections, intense partisanship, patronage machines, and the rise of Populism characterized Gilded Age politics; Bryan's 1896 campaign marked its climax and collapse.",
    lesson:
      "**Party balance**:\n- **Republicans** dominated presidential politics (1868-92, winning all but Cleveland's two non-consecutive terms) but margins were narrow.\n- **Democrats** controlled the House often; Republicans the Senate often.\n- Voter turnout was high — ~75-80% in presidential elections.\n- Sectional alignment: Solid South for Democrats; Northeast + Midwest leaned Republican.\n- Party identities tied to Civil War memory, religion/ethnicity, and economic interests — less to ideology.\n\n**Patronage and machines**:\n- Urban political machines (Tammany Hall in NYC; Daley's predecessors in Chicago) provided jobs and services in exchange for votes.\n- **Boss Tweed's Tweed Ring** (NYC, 1860s-70s) stole ~$200M before Thomas Nast's cartoons and reformer pressure brought him down (1871).\n- **Spoils system** — federal jobs distributed based on party loyalty.\n- **Pendleton Civil Service Act (1883)** began merit system.\n\n**Corruption scandals**:\n- **Crédit Mobilier (1872)**: Union Pacific stock scheme implicating congressmen.\n- **Whiskey Ring (1875)**: federal tax fraud.\n- **Star Routes postal scandal**.\n\n**Key presidential elections**:\n- **1876**: Hayes-Tilden disputed; Compromise of 1877 ended Reconstruction.\n- **1880**: **James Garfield** elected; assassinated 1881.\n- **1884**: Grover Cleveland (Democrat) — first Democrat since before the Civil War.\n- **1888**: Benjamin Harrison won electoral college despite losing popular vote.\n- **1892**: Cleveland returned.\n- **1896**: McKinley vs. Bryan — realignment.\n\n**Panic of 1893**:\n- Economic depression — 20% unemployment at peak, railroad and bank failures, Cleveland administration damaged.\n- Repeal of Sherman Silver Purchase Act (1893) angered Populists.\n- **Coxey's Army (1894)**: Jacob Coxey's march of unemployed to Washington demanding public works.\n\n**Populism**:\n- **Farmers' Alliances** (Northern, Southern, Colored) organized in the 1880s.\n- **People's (Populist) Party (1892)**: Omaha Platform demanded:\n  - Free coinage of silver (inflation).\n  - Federal income tax.\n  - Direct election of senators.\n  - 8-hour workday.\n  - Public ownership of railroads, telegraph, telephone.\n  - Postal savings banks.\n  - **Subtreasury plan** — federal crop storage and loans to farmers.\n- Populist presidential candidate **James Weaver** won 1M votes and 22 electoral votes in 1892.\n\n**Election of 1896 — critical realignment**:\n- Democrats nominated **William Jennings Bryan** (Nebraska) after his 'Cross of Gold' speech for free silver.\n- Populists fused with Democrats on Bryan.\n- **Republicans**: William McKinley, managed by **Mark Hanna**, raised an unprecedented war chest from business.\n- McKinley won (271-176 EV) — campaign message of sound money, protective tariff, prosperity.\n- **Outcome**: Populism folded into Democratic Party; Republicans dominant until 1932 (with exception of Wilson's wartime terms). Solid South Democratic.\n\n**Presidents to remember**:\n- Hayes, Garfield (assassinated), Arthur, Cleveland (2x), Harrison, McKinley — the 'forgettable' Gilded Age presidents. But Cleveland (vetoed Civil War pension bills, crushed Pullman) and McKinley (Spanish-American War, imperialism) matter.",
    keyIdeas: [
      "Close elections, high turnout, sectional partisanship.",
      "Patronage and urban machines (Tammany) organized politics.",
      "Populist Party (1892) pushed free silver and federal reforms.",
      "Bryan's 'Cross of Gold' (1896) and McKinley's victory realigned politics.",
      "Pendleton Act (1883) began civil service reform.",
    ],
    commonMistakes: [
      "Dismissing Gilded Age politics as unimportant because of surface corruption — it shaped economic policy and 1896 realignment.",
      "Missing the Populist platform's wide scope (not just silver).",
      "Confusing Bryan (populist, silver) with McKinley (Republican, gold, high tariff).",
    ],
    workedExample: {
      prompt:
        "Briefly explain ONE specific goal of the Populist (People's) Party in the 1890s.",
      solution:
        "The Populist Party's 1892 Omaha Platform demanded the free and unlimited coinage of silver at a 16-to-1 ratio with gold, intending to expand the money supply and raise agricultural prices for indebted farmers who had suffered under falling commodity prices and tight money during the Gilded Age. The platform also demanded direct election of U.S. senators, a graduated federal income tax, an 8-hour workday, and government ownership of railroads and telegraphs — a wide-ranging agrarian-labor program that captured 1 million votes in 1892 and became the basis of William Jennings Bryan's 1896 Democratic campaign.",
    },
  },
  "6.14": {
    id: "6.14",
    title: "Continuity and Change in Period 6",
    summary:
      "Period 6 saw dramatic change — industrialization, urbanization, immigration, Western settlement — and deep continuities: white supremacy reasserted, class inequality hardened, Native dispossession completed.",
    lesson:
      "**Change**:\n- **Economy**: from agrarian to industrial; U.S. became world's largest manufacturer.\n- **Population**: 20M+ immigrants; urbanization (cities grew 5x).\n- **Geography**: West settled; frontier 'closed' (1890).\n- **Technology**: steel, electricity, telephone, railroads transformed daily life.\n- **Labor**: wage work dominant; unions emerged.\n- **Politics**: civil service reform, first federal regulatory agencies (ICC, Sherman Antitrust), Populist movement.\n- **Consumption**: department stores, mail-order, advertising.\n- **Science**: Darwinism, germ theory, engineering.\n\n**Continuity**:\n- **Slavery replaced with Jim Crow**: legal segregation, disenfranchisement, sharecropping — white supremacy preserved under new forms.\n- **Native dispossession continued**: Plains Wars, Dawes Act, boarding schools.\n- **Class inequality persisted and deepened**: top 1% owned >50% of wealth.\n- **Patriarchy**: women could not vote nationally; most confined to limited professions.\n- **Patronage politics**: though reformed, remained influential.\n- **Regional tensions**: North-South divide now overlaid with urban-rural and East-West.\n\n**Evaluating the period**:\n- **Optimistic view** (Mark Twain's sardonic label 'Gilded Age' aside): America became a great industrial power; millions of immigrants found opportunity; democracy expanded formally for white men.\n- **Critical view**: Inequality, Native genocide, Jim Crow, labor repression, and political corruption marred the promise.\n- Both are true simultaneously.\n\n**Looking ahead to Period 7**:\n- Economic concentration and Populist agitation → Progressive movement.\n- Frontier closing + Mahan's naval theory + expanding industry → imperialism (Spanish-American War 1898).\n- Mass immigration and urbanization → Progressive reforms + eventual restriction (1920s).\n- Jim Crow entrenched → NAACP (1909) and long civil rights struggle.\n- Labor agitation → AFL growth and socialist alternatives (Debs).\n\nPeriod 6's contradictions — abundance and inequality, democracy and white supremacy, national integration and class conflict — set up the reform movements of Period 7.",
    keyIdeas: [
      "Change: industrialization, urbanization, mass immigration, Western settlement, technology.",
      "Continuity: white supremacy (Jim Crow), Native dispossession, class inequality, patriarchy.",
      "Both celebratory and critical views of the era capture real features.",
      "Period 6 sets up Progressive reform and imperial expansion in Period 7.",
    ],
    commonMistakes: [
      "Narrating only change without the hardening continuities (Jim Crow, Native dispossession).",
      "Skipping the period's foundational technological shifts.",
      "Treating 'the Gilded Age' as just corruption rather than structural inequality.",
    ],
  },

  // =========================================================================
  // PERIOD 7 — 1890-1945
  // =========================================================================
  "7.1": {
    id: "7.1",
    title: "Contextualizing Period 7",
    summary:
      "Between 1890 and 1945 the U.S. became a global power and reshaped itself through Progressive reform, two world wars, the Great Depression, and the New Deal — with expanded federal government and a transformed relationship to the wider world.",
    lesson:
      "Period 7 is the longest APUSH period and contains the greatest domestic and international change.\n\n**Imperial expansion**:\n- **Spanish-American War (1898)**: Cuba, Puerto Rico, Guam, Philippines.\n- Open Door Notes (1899-1900) in China; Panama Canal (1914); Big Stick, Dollar Diplomacy, Moral Diplomacy.\n\n**Progressive Era (c. 1890-1920)**:\n- Muckraking journalism; regulation of trusts, food, labor; direct democracy reforms.\n- 16th-19th Amendments: income tax, direct election of senators, Prohibition, women's suffrage.\n\n**World War I (1914-18)**:\n- Initial neutrality; entry 1917 after Lusitania, Zimmermann telegram.\n- Home front: CPI propaganda, Espionage/Sedition Acts, Great Migration, women's war work.\n- Failed Versailles Treaty ratification and League of Nations.\n\n**1920s**:\n- Mass consumer culture (cars, radio, film), Jazz Age, flappers.\n- Conservative resurgence: Prohibition, immigration restriction (1921, 1924), KKK revival, Scopes Trial (1925).\n- Harlem Renaissance.\n- Republican economic policy — tax cuts, high tariffs, laissez-faire.\n\n**Great Depression (1929-41)**:\n- Stock crash (October 1929); cascading bank and business failures.\n- Hoover's limited response vs. FDR's **New Deal** (1933+) — relief, recovery, reform.\n- Labor rights (Wagner Act), Social Security, TVA, WPA, SEC.\n\n**World War II (1939-45)**:\n- American neutrality and then support for Allies (Lend-Lease 1941).\n- Pearl Harbor (Dec 7, 1941) → American entry.\n- European and Pacific theaters; D-Day (1944); atomic bombs (Aug 1945).\n- Home front: production boom, Rosie the Riveter, Japanese internment, Double V campaign.\n\n**End of period**: 1945 U.S. emerges as superpower, UN established, atomic age begins — setting up Cold War.",
    keyIdeas: [
      "Imperial expansion after 1898 signaled U.S. as world power.",
      "Progressive Era reshaped government and society through regulation and amendments.",
      "WWI led to brief global engagement then 1920s retreat.",
      "Great Depression + New Deal expanded federal government permanently.",
      "WWII made U.S. a global superpower.",
    ],
    commonMistakes: [
      "Lumping Progressivism with the New Deal — they differ in scope and federal capacity.",
      "Skipping 1920s as boring — it had major political and cultural shifts.",
      "Missing the continuity between WWI home-front civil liberties violations and later episodes.",
    ],
  },
  "7.2": {
    id: "7.2",
    title: "Imperialism: Debates",
    summary:
      "By the 1890s expanding industrial capacity, naval theorists, missionary impulses, and closing frontier anxieties pushed the U.S. toward overseas imperialism — debated by imperialists and anti-imperialists.",
    lesson:
      "**Arguments for imperialism**:\n\n- **Economic**: American industry produced more than domestic consumers could absorb; new markets and raw material sources abroad seemed essential. Closing of the frontier (1890) removed a domestic outlet.\n- **Strategic**: **Alfred Thayer Mahan's *The Influence of Sea Power Upon History* (1890)** argued that great powers needed large navies and coaling stations — required overseas colonies.\n- **Racial/ideological**: **Social Darwinism** applied to nations; **'Anglo-Saxonism'** and the **'White Man's Burden'** (Kipling, 1899).\n- **Religious**: Protestant missionary movements (e.g., Josiah Strong's *Our Country*, 1885) believed America was called to Christianize and 'civilize' the world.\n- **Nationalist**: post-Civil War reunification produced nationalist energy; Spanish-American War veterans (Roosevelt's 'Rough Riders') embodied martial virtue.\n\n**Arguments against imperialism (Anti-Imperialist League, 1898)**:\n\n- **Republican tradition**: empire is incompatible with republic; annexing peoples who cannot self-govern undermines consent.\n- **Constitutional**: no constitutional authority to govern people without their consent (echoing Declaration).\n- **Economic**: overseas possessions are expensive to defend.\n- **Racial (from the other side)**: some anti-imperialists (e.g., some Southern Democrats) opposed adding nonwhite peoples to the U.S.\n- **Moral**: **Mark Twain** became a vocal critic; his essay 'To the Person Sitting in Darkness' (1901) attacked imperialism.\n- Other notable anti-imperialists: Andrew Carnegie, Jane Addams, Samuel Gompers, William Jennings Bryan.\n\n**Hawaii (1893-98)**:\n- American sugar planters, backed by U.S. Marines, overthrew Queen Liliʻuokalani (1893).\n- Cleveland refused annexation; McKinley pushed it through (**annexed 1898** during Spanish-American War).\n\n**Alaska** (earlier, 1867): Seward's 'Icebox' purchase from Russia for $7.2M; seemed foolish at the time but proved rich in resources.\n\n**Samoa (1899)**: U.S. and Germany partitioned the islands.\n\n**Midway, Wake, Guam** — Pacific coaling stations.\n\n**Debates intensified with Spanish-American War (1898)** and the Philippine question.",
    keyIdeas: [
      "Mahan's naval theory (1890) + closing frontier + missionary impulse → imperialist ideology.",
      "'White Man's Burden' and Social Darwinism justified expansion racially.",
      "Anti-Imperialist League: Twain, Carnegie, Addams, Bryan opposed.",
      "Hawaii annexed 1898; Alaska bought 1867.",
      "Debates over whether empire was compatible with republic.",
    ],
    commonMistakes: [
      "Assuming imperialism was uncontested — the Anti-Imperialist League was significant.",
      "Confusing the annexation of Hawaii (1898) with its statehood (1959).",
      "Skipping Mahan as the key strategic theorist.",
    ],
    workedExample: {
      prompt:
        "Briefly explain ONE specific argument for or against U.S. imperialism in the late 19th century.",
      solution:
        "Naval strategist Alfred Thayer Mahan argued in The Influence of Sea Power Upon History (1890) that the prosperity and security of great powers depended on large modern navies supported by an empire of coaling stations, shipping lanes, and markets. His argument — echoed by Theodore Roosevelt, Henry Cabot Lodge, and Secretary of State John Hay — provided a strategic rationale for acquiring Hawaii, building the Panama Canal, and taking the Philippines and Puerto Rico from Spain in 1898, translating frontier-era expansionism into overseas imperialism.",
    },
  },
  "7.3": {
    id: "7.3",
    title: "The Spanish-American War",
    summary:
      "The 1898 Spanish-American War — sparked by Cuban rebellion, yellow journalism, and the Maine explosion — left the U.S. holding Cuba (via Platt Amendment), Puerto Rico, Guam, and the Philippines (after a brutal war).",
    lesson:
      "**Background**:\n- Cuban independence movement led by José Martí began 1895; Spanish General Weyler's reconcentration camps created humanitarian horrors.\n- **Yellow journalism**: **Hearst's New York Journal** and **Pulitzer's New York World** sensationalized Spanish atrocities.\n- **De Lôme Letter (Feb 1898)**: Spanish ambassador privately mocked McKinley; published — inflamed opinion.\n- **USS Maine** exploded in Havana Harbor (Feb 15, 1898), killing 266 sailors. 'Remember the Maine' became a war cry; cause later determined to be likely internal combustion, not Spanish sabotage.\n- **McKinley asked for war** (April 1898); Congress added the **Teller Amendment** pledging no annexation of Cuba.\n\n**The war (April-August 1898)**:\n- **'Splendid little war'** (John Hay's phrase): 10 weeks, ~380 U.S. combat dead, ~2,900 disease dead.\n\n- **Pacific theater**:\n  - **Battle of Manila Bay (May 1, 1898)**: Commodore **George Dewey** destroyed the Spanish fleet.\n  - Filipino independence fighters under **Emilio Aguinaldo** cooperated, expecting independence.\n\n- **Caribbean theater**:\n  - **Cuba**: Naval blockade; land invasion landed at Santiago (June 1898). **Theodore Roosevelt's 'Rough Riders'** charged up **San Juan (Kettle) Hill** (July 1898). Black Buffalo Soldiers also fought heroically.\n  - **Puerto Rico**: invaded.\n\n**Treaty of Paris (Dec 1898)**:\n- Spain ceded **Puerto Rico, Guam, and the Philippines** to U.S. for $20M.\n- Cuba became 'independent' but under U.S. control via the **Platt Amendment (1901)**:\n  - U.S. could intervene in Cuba to preserve independence/order.\n  - U.S. leased Guantanamo Bay naval base (held to this day).\n  - Cuba could not enter treaties limiting its independence or incur unsustainable debt.\n\n**Philippine-American War (1899-1902)**:\n- Filipinos resisted American rule under Aguinaldo.\n- Brutal war: ~4,200 American dead, ~20,000 Filipino combatants dead, up to 200,000 Filipino civilian dead from war, famine, disease.\n- Atrocities on both sides; U.S. torture techniques (water cure) publicly exposed.\n- U.S. ruled the Philippines until independence in 1946.\n\n**Insular Cases (1901-22)**:\n- Supreme Court rulings that the Constitution 'did not follow the flag' automatically — the U.S. could hold territories whose inhabitants lacked full constitutional rights.\n- Puerto Rico became an 'unincorporated territory'; status unresolved.\n\n**Annexation of Hawaii (July 1898)**: pushed through during wartime.\n\n**Consequences**:\n- U.S. became an imperial power with colonies.\n- Roosevelt rode Cuban fame to the vice presidency (1900) and presidency after McKinley's assassination (1901).\n- Open Door Notes in China (1899-1900, John Hay) sought to preserve American commercial access amid European and Japanese carve-up.\n- Set stage for 20th-century U.S. role as global power.",
    keyIdeas: [
      "Cuban rebellion + yellow journalism + Maine → war with Spain.",
      "Teller Amendment (pre-war) pledged no Cuba annexation; Platt Amendment (1901) made Cuba a protectorate.",
      "U.S. acquired Puerto Rico, Guam, Philippines, Hawaii in 1898.",
      "Philippine-American War (1899-1902) was brutal and long.",
      "Insular Cases ruled Constitution does not automatically follow the flag.",
    ],
    commonMistakes: [
      "Confusing Teller (pre-war) and Platt (post-war) Amendments.",
      "Skipping the Philippine-American War — it was the bloody aftermath.",
      "Treating the Maine as definitely destroyed by Spain — it probably wasn't.",
    ],
    workedExample: {
      prompt:
        "Briefly explain ONE specific consequence of the Spanish-American War (1898) for the United States.",
      solution:
        "The Treaty of Paris of December 1898 transferred Puerto Rico, Guam, and the Philippines from Spain to the United States, and a joint resolution annexed Hawaii the same year — transforming the U.S. from a continental republic into an imperial power with overseas colonies. Governance of the new territories raised novel constitutional questions resolved in the Insular Cases (1901-22), which held that the Constitution did not automatically extend to these 'unincorporated' territories, and Filipino resistance led to the brutal Philippine-American War (1899-1902) before U.S. colonial administration was fully established.",
    },
  },
  "7.4": {
    id: "7.4",
    title: "The Progressives",
    summary:
      "Between 1900 and 1920 a broad reform movement regulated industry, expanded democracy (amendments 16-19), and reshaped American government through presidential leadership and muckraking journalism.",
    lesson:
      "Progressivism was not a single movement but a diverse coalition of reformers.\n\n**Muckrakers (exposé journalists)**:\n- **Ida Tarbell**: *History of the Standard Oil Company* (1904).\n- **Upton Sinclair**: *The Jungle* (1906) exposed Chicago meatpacking horrors → Pure Food and Drug Act and Meat Inspection Act (both 1906).\n- **Jacob Riis**: *How the Other Half Lives* (1890) documented tenement squalor with photographs.\n- **Lincoln Steffens**: *The Shame of the Cities* exposed urban corruption.\n- **Ida B. Wells**: anti-lynching investigations.\n\n**Theodore Roosevelt's 'Square Deal' (1901-09)**:\n- **Trust-busting**: revived Sherman Antitrust; successfully prosecuted Northern Securities (railroad trust, 1904), then Standard Oil. Distinguished 'good' trusts (regulate) from 'bad' trusts (break up).\n- **Anthracite Coal Strike (1902)**: Roosevelt intervened on workers' behalf — first president to do so.\n- **Hepburn Act (1906)**: strengthened ICC's rate-setting power.\n- **Pure Food and Drug Act** + **Meat Inspection Act (1906)**.\n- **Conservation**: 230M acres of public lands; National Forest Service (1905, Gifford Pinchot); Antiquities Act (1906).\n\n**Taft (1909-13)**:\n- Continued trust-busting (90 prosecutions, more than TR).\n- **Payne-Aldrich Tariff (1909)**: high rates angered Progressive Republicans.\n- Conservation controversy (**Ballinger-Pinchot**) alienated TR.\n- **Mann-Elkins Act (1910)** extended ICC authority.\n\n**Election of 1912 — four-way race**:\n- TR's Progressive ('Bull Moose') Party (*New Nationalism* — strong federal regulation).\n- Taft (Republican).\n- Woodrow Wilson (Democrat, *New Freedom* — restore competition, break up trusts).\n- Debs (Socialist, ~900,000 votes).\n- Wilson won with 42% of popular vote.\n\n**Wilson's 'New Freedom' (1913-21)**:\n- **Underwood Tariff (1913)**: lowered tariffs; introduced federal income tax (enabled by 16th Amendment).\n- **Federal Reserve Act (1913)**: created central banking system with 12 regional banks — still the backbone of U.S. monetary policy.\n- **Clayton Antitrust Act (1914)**: strengthened antitrust, exempted labor unions from antitrust prosecutions.\n- **Federal Trade Commission (1914)**: regulatory body for unfair competition.\n\n**Progressive constitutional amendments**:\n- **16th (1913)**: federal income tax.\n- **17th (1913)**: direct election of senators.\n- **18th (1919)**: Prohibition of alcohol.\n- **19th (1920)**: women's suffrage.\n\n**State-level reforms**:\n- **Initiative, referendum, recall** to bypass legislatures.\n- **Direct primaries** for candidate selection.\n- **Workmen's compensation** laws.\n- **Child labor laws** (though federal attempts struck down in *Hammer v. Dagenhart*, 1918).\n- **Minimum wage** for women (*Muller v. Oregon*, 1908, upheld).\n- **Prohibition of child labor** in factories (state laws).\n\n**Limits and contradictions**:\n- **Progressivism and race**: Most Progressives were indifferent or hostile to Black civil rights. Wilson **segregated the federal civil service (1913)**. *Birth of a Nation* (1915) screened at the White House.\n- **NAACP** founded 1909 by Du Bois and others.\n- **Eugenics** movement found supporters among Progressives.\n- Labor reforms excluded most agricultural and domestic workers (disproportionately Black).\n\n**Women's suffrage**:\n- **NAWSA** under Carrie Chapman Catt (Winning Plan).\n- **Alice Paul's National Woman's Party** (1916) pushed more radical tactics — White House picketing, hunger strikes.\n- **19th Amendment (1920)** secured women's right to vote federally.",
    keyIdeas: [
      "Muckrakers (Tarbell, Sinclair, Riis, Steffens) exposed corporate/political abuses.",
      "TR's Square Deal: trust-busting, labor mediation, consumer protection, conservation.",
      "Wilson's New Freedom: tariff reform, Federal Reserve, Clayton Antitrust, FTC.",
      "Four Progressive amendments (16-19): income tax, direct senators, Prohibition, women's suffrage.",
      "Progressivism largely excluded Black Americans; Wilson segregated federal civil service.",
    ],
    commonMistakes: [
      "Calling Progressivism uniformly liberal — many reformers were nativist, racist, and/or pro-Prohibition.",
      "Confusing New Nationalism (TR) and New Freedom (Wilson).",
      "Missing the 1912 four-way election.",
    ],
    workedExample: {
      prompt:
        "Briefly explain ONE specific way Progressive reforms changed American government or society in the early 20th century.",
      solution:
        "The Progressive Era produced four constitutional amendments between 1913 and 1920 that permanently reshaped American federalism and democracy: the 16th Amendment authorized a federal income tax, the 17th required direct election of U.S. Senators, the 18th imposed national Prohibition, and the 19th guaranteed women the right to vote. Combined with federal regulatory innovations like the Federal Reserve System (1913), Federal Trade Commission (1914), and Pure Food and Drug Act (1906), these amendments and laws created a federal government with the taxing, regulatory, and democratic infrastructure to intervene in the economy at a national scale.",
    },
  },
  "7.5": {
    id: "7.5",
    title: "World War I: Military and Diplomacy",
    summary:
      "The U.S. entered World War I in 1917 after submarine warfare and the Zimmermann telegram; American troops tipped the balance on the Western Front; Wilson's Fourteen Points and failed Versailles ratification defined the peace.",
    lesson:
      "**Causes of the war (1914)**:\n- Long-term: alliance systems (Triple Entente: France, Britain, Russia vs. Triple Alliance/Central Powers: Germany, Austria-Hungary, Ottoman Empire, Italy initially), militarism, imperial rivalry, nationalism.\n- Immediate: assassination of Archduke Franz Ferdinand (June 1914) → Austria-Hungary's ultimatum → alliance cascades → war.\n\n**U.S. neutrality (1914-17)**:\n- Wilson urged neutrality 'in thought as well as action.'\n- But British blockade and trade with Allies made the U.S. economically tied to the Entente.\n- **German submarine warfare** — **Lusitania sinking (May 1915)** killed 1,198 people (128 Americans) — caused outrage.\n- **Sussex Pledge (May 1916)**: Germany agreed not to sink passenger ships without warning.\n- Wilson campaigned 1916 on 'He kept us out of war.'\n\n**Entry into the war (April 1917)**:\n- **Unrestricted submarine warfare resumed** (Feb 1917) — Germany gambled it could force Britain out before American troops arrived.\n- **Zimmermann Telegram** (Feb 1917): German foreign secretary proposed alliance with Mexico against U.S., promising return of territories lost in 1848.\n- Russian February Revolution (March 1917) removed the czar — made Allied war look more democratic.\n- Wilson asked for war (April 2, 1917); Congress approved (April 6).\n\n**American Expeditionary Forces (AEF)**:\n- Under **General John J. Pershing**.\n- First significant U.S. forces arrived summer 1917; deployed as independent command.\n- Fresh American troops decisive at **Belleau Wood** (June 1918), **Second Marne** (July 1918), **Meuse-Argonne Offensive** (Sept-Nov 1918).\n- **~4.7M Americans served; ~116,000 died** (half from influenza pandemic).\n\n**Armistice (Nov 11, 1918)** — 'eleventh hour of the eleventh day of the eleventh month.'\n\n**Wilson's Fourteen Points (Jan 1918)**:\n- Vision for postwar order: open diplomacy, freedom of the seas, arms reduction, self-determination for nationalities, **League of Nations**.\n- Reflected Progressive faith in international law and institutions.\n\n**Treaty of Versailles (June 1919)**:\n- Wilson went to Paris personally (unprecedented).\n- Negotiated with **Clemenceau (France), Lloyd George (Britain), Orlando (Italy)** — the 'Big Four.'\n- Harsh terms on Germany: War Guilt clause (Article 231), reparations, disarmament, loss of colonies and territory.\n- **League of Nations** established as part of the treaty.\n\n**U.S. rejection of the treaty**:\n- **Henry Cabot Lodge** led Senate Republican opposition.\n- Feared League's **Article X** (collective security) would commit U.S. to foreign wars without congressional approval.\n- Wilson refused compromise; suffered stroke (Oct 1919) while campaigning nationally.\n- Senate rejected the Treaty of Versailles **twice (Nov 1919, March 1920)**.\n- U.S. signed separate peace with Germany (1921); never joined League of Nations.\n\n**Consequences**:\n- U.S. returned to partial isolation in the 1920s.\n- League of Nations weakened without U.S. participation.\n- Harsh Versailles terms + German economic collapse would feed Nazi rise.\n- U.S. emerged as leading creditor nation.",
    keyIdeas: [
      "U.S. neutrality 1914-17 strained by submarine warfare.",
      "Lusitania, unrestricted sub warfare, Zimmermann Telegram → U.S. entry April 1917.",
      "AEF under Pershing turned tide in 1918.",
      "Wilson's Fourteen Points + League of Nations rejected by Senate.",
      "Senate (Lodge) rejected Versailles twice (1919-20).",
    ],
    commonMistakes: [
      "Treating U.S. entry as primarily ideological — submarine warfare and Zimmermann were immediate triggers.",
      "Confusing Wilson's idealism with Senate realism — Lodge's objections were specific, not just obstructionist.",
      "Forgetting the 1918 influenza pandemic as half of U.S. military deaths.",
    ],
    workedExample: {
      prompt:
        "Briefly explain ONE specific reason the United States entered World War I in 1917.",
      solution:
        "Germany's resumption of unrestricted submarine warfare in February 1917 threatened American shipping to Europe and produced unacceptable mounting casualties among U.S. merchant sailors. Combined with the Zimmermann Telegram — a decoded German message proposing an anti-U.S. alliance with Mexico in exchange for returning territories lost in 1848 — public opinion turned decisively hawkish, and President Wilson asked Congress to declare war on April 2, 1917, arguing that the world 'must be made safe for democracy.'",
    },
  },
  "7.6": {
    id: "7.6",
    title: "World War I: Home Front",
    summary:
      "Mobilization reshaped the home front — war agencies, propaganda, suppression of dissent, the Great Migration, women's war work — in ways that outlasted the war.",
    lesson:
      "**Mobilization for war**:\n\n- **War Industries Board (WIB)** under **Bernard Baruch**: coordinated industrial production, standardized products.\n- **Food Administration** (Herbert Hoover): promoted 'Meatless Mondays,' 'Wheatless Wednesdays' — voluntary conservation.\n- **Fuel Administration**.\n- **Committee on Public Information (CPI, 'Creel Committee')**: propaganda — pamphlets, posters ('Uncle Sam Wants You'), films, Four-Minute Men.\n- **Liberty Bonds**: funded ~2/3 of war cost.\n- **Selective Service Act (1917)**: first federal draft since Civil War; ~24M registered, ~2.8M drafted.\n\n**Suppression of dissent**:\n- **Espionage Act (1917)**: criminalized interfering with war effort or encouraging disloyalty.\n- **Sedition Act (1918)**: criminalized 'disloyal, profane, scurrilous, or abusive language' about government.\n- ~2,000 prosecuted; ~1,000 convicted.\n- **Eugene V. Debs** jailed for anti-war speech (1918), ran for president from prison in 1920 (~900,000 votes).\n- **Schenck v. United States (1919)**: Holmes's 'clear and present danger' test upheld Espionage Act — 'not free to shout fire in a crowded theater.'\n- IWW repressed; German-Americans harassed; sauerkraut renamed 'liberty cabbage.'\n\n**Great Migration (c. 1910-1930)**:\n- Roughly 500,000 Black Americans moved from the South to Northern cities during the WWI era, seeking industrial jobs and escape from Jim Crow.\n- Chicago, Detroit, Philadelphia, New York saw Black populations surge.\n- Created Black urban communities; Harlem Renaissance followed.\n- **Race riots**: East St. Louis (1917, ~100 Black dead), Chicago (1919), Washington DC (1919) — white violence against expanding Black communities during 'Red Summer' of 1919.\n\n**Women on the home front**:\n- Replaced men in factories, offices, transportation.\n- Women's Land Army worked farms.\n- Provided final push for 19th Amendment (1920).\n\n**Organized labor**:\n- **War Labor Board** mediated disputes; generally favored 8-hour day and unions.\n- AFL membership grew; wages rose.\n- But after war (1919), massive strike wave (4M+ workers) crushed: Seattle General Strike, Boston Police Strike, Steel Strike.\n\n**Red Scare (1919-20)**:\n- Bolshevik Revolution (1917) and postwar labor unrest spurred panic.\n- Bombings (Apr-Jun 1919) targeted officials including Attorney General **A. Mitchell Palmer**.\n- **Palmer Raids (1919-20)**: DOJ and young J. Edgar Hoover led raids on suspected radicals; thousands arrested, hundreds of foreign-born deported.\n- Scare faded by mid-1920; but precedent for later witch-hunts.\n\n**Influenza pandemic (1918-19)**:\n- Killed ~675,000 Americans (more than U.S. combat deaths in WWI).\n- Spread by troop movements and by local governments' reluctance to implement restrictions.",
    keyIdeas: [
      "WIB, CPI, Food Administration mobilized economy and public opinion.",
      "Espionage (1917) and Sedition (1918) Acts suppressed dissent; Schenck upheld them.",
      "Great Migration (c. 1910-1930) moved ~500,000 Black Americans north during the war era.",
      "Red Summer (1919) and Palmer Raids (1919-20) reflected postwar racial and political tensions.",
      "1918 influenza killed more Americans than the war did.",
    ],
    commonMistakes: [
      "Forgetting that civil liberties were systematically suppressed.",
      "Missing the Great Migration as a WWI-era phenomenon.",
      "Ignoring the 1918 influenza pandemic.",
    ],
    workedExample: {
      prompt:
        "Briefly explain ONE specific way World War I affected American society on the home front.",
      solution:
        "Wartime industrial demand for labor, combined with the Great Migration from the Jim Crow South, moved roughly 500,000 African Americans to Northern cities like Chicago, Detroit, and New York between 1910 and the early 1920s. This demographic shift created the economic and cultural foundation for 1920s Black urban life — including the Harlem Renaissance — but also triggered white violence, most visibly in the East St. Louis riot of 1917, the 1919 Chicago riot, and other episodes of the 'Red Summer' of 1919, in which dozens of Black Americans were killed as white mobs attacked expanding Black neighborhoods.",
    },
  },
  "7.7": {
    id: "7.7",
    title: "1920s: Innovations in Communication and Technology",
    summary:
      "The 1920s produced a mass consumer culture based on automobiles, radio, film, electricity, and new forms of advertising — transforming daily life and cementing the North's urban dominance.",
    lesson:
      "**Automobile**:\n- **Henry Ford's Model T** (1908) + **assembly line** (1913) → mass-produced, affordable cars.\n- Model T price dropped from $850 (1908) to $260 (1925).\n- By 1929, ~23 million cars registered (approx. 1 per 5 Americans).\n- Spurred related industries: steel, rubber, oil, glass, roads (Federal Highway Act 1921).\n- Transformed geography: **suburbs** expanded; rural isolation reduced; **truck shipping** replaced some rail freight.\n\n**Electricity**:\n- By 1930, ~70% of urban households had electricity (but only ~10% of rural households — **Rural Electrification Administration (1935)** began addressing this).\n- **Appliances**: refrigerators, washing machines, vacuum cleaners, irons, radios.\n- **Chain stores** (A&P, Woolworth's) standardized retail.\n\n**Radio**:\n- **KDKA** (Pittsburgh, 1920) first commercial broadcast.\n- By 1929, ~40% of households owned a radio.\n- **NBC (1926)**, **CBS (1927)** created national networks.\n- Mass audiences for news, sports (Babe Ruth, heavyweight boxing), music (jazz), drama.\n- Radio created shared national culture across regions.\n\n**Motion pictures**:\n- **Hollywood** emerged in the 1910s-20s as the film capital.\n- Silent films peaked with epics; **'The Jazz Singer' (1927)** introduced synchronized sound.\n- Stars (Charlie Chaplin, Mary Pickford, Douglas Fairbanks) became household names.\n- 'Movie palaces' opened in cities; weekly attendance ~80M by 1929.\n\n**Aviation**:\n- **Charles Lindbergh's solo transatlantic flight** (May 1927, NY to Paris) — celebrity instant.\n- Commercial aviation began.\n\n**Advertising**:\n- **Bruce Barton's *The Man Nobody Knows* (1925)**: recast Jesus as a founder of modern business.\n- Psychologically informed ads sold cars, cigarettes, beauty products on emotion and status.\n\n**Credit**:\n- **Installment buying** (buy-now-pay-later) made expensive goods (cars, appliances) accessible.\n- 60% of cars sold on credit by 1927.\n- Consumer debt as a feature rather than disgrace for the first time.\n\n**Economy**:\n- Overall prosperity (GDP grew ~40% 1919-29).\n- Stock market boom (Dow rose 5x 1921-29).\n- But inequality widened; farmers and some industrial workers left behind.\n- Overproduction, uneven wealth, weak banking, and speculative excess set up the 1929 crash.\n\n**Cultural effects**:\n- Mass culture became standardizing force — same films, songs, brand names nationwide.\n- Suburbs + cars + appliances reshaped domestic life.\n- Women's magazines promoted new domestic technology.\n\nBy 1929, the United States was the most consumer-oriented, technologically networked society in the world — and also the most exposed to financial collapse.",
    keyIdeas: [
      "Ford's assembly line (1913) and Model T made car ownership mass-market.",
      "Radio (from 1920), film (Hollywood), and advertising created national mass culture.",
      "Installment credit drove consumer spending.",
      "Electrification transformed urban households; rural electricity lagged.",
      "Prosperity was uneven: farmers and many workers did not share equally.",
    ],
    commonMistakes: [
      "Crediting Ford with inventing the car — he didn't; he made it cheap.",
      "Treating 1920s prosperity as universal — rural and industrial inequality was sharp.",
      "Missing installment credit as a driver of spending.",
    ],
  },
  "7.8": {
    id: "7.8",
    title: "1920s: Cultural and Political Controversies",
    summary:
      "The 1920s saw fierce cultural battles — Prohibition, immigration restriction, Scopes Trial, KKK revival, Red Scare, Harlem Renaissance, Lost Generation — reflecting tension between modernity and tradition.",
    lesson:
      "**Prohibition (1920-33)**:\n- **18th Amendment (ratified 1919)** and **Volstead Act (1919)** banned manufacture, sale, transport of alcohol.\n- Driven by WCTU, Anti-Saloon League, Progressive reformers, Protestant clergy.\n- Created speakeasies, bootlegging, and organized crime (Al Capone's Chicago empire).\n- Led to corruption of law enforcement.\n- **21st Amendment (1933)** repealed.\n\n**Immigration restriction**:\n- **Emergency Quota Act (1921)**: quotas based on 1910 census — 3% of foreign-born.\n- **National Origins Act (1924)**: quotas based on 1890 census — 2% of foreign-born; excluded Asians entirely; intentionally biased toward Northern/Western European immigration.\n- Mexican immigration not capped.\n- Ended the era of mass European immigration.\n\n**Red Scare (1919-20)** and continued anti-radicalism:\n- **Palmer Raids** (1919-20) — 3,000+ arrested, hundreds deported.\n- **Sacco and Vanzetti case** (1920-27): two Italian immigrant anarchists convicted of robbery-murder on contested evidence; executed 1927 despite international protests.\n\n**KKK revival**:\n- Klan, revived in 1915 after *Birth of a Nation*, peaked at ~4-5 million members c. 1925.\n- Now targeted not only Black Americans but Catholics, Jews, immigrants, radicals.\n- Strong in Indiana, Oregon, Colorado — not just the South.\n- Decline by late 1920s amid internal scandals.\n\n**Fundamentalism vs. Modernism / Scopes Trial (1925)**:\n- Fundamentalist Protestants opposed Darwinian evolution.\n- Tennessee's Butler Act (1925) banned teaching evolution.\n- **John Scopes**, a Dayton, Tennessee teacher, was tried for teaching evolution.\n- **Clarence Darrow** (defense) vs. **William Jennings Bryan** (prosecution, died days after).\n- Scopes convicted (fined $100, later overturned on technicality).\n- Public spectacle damaged fundamentalism's cultural prestige; quietly stayed strong among believers.\n\n**Harlem Renaissance**:\n- Black cultural flowering in Harlem in the 1920s.\n- Writers: **Langston Hughes**, **Zora Neale Hurston**, **Claude McKay**, **Countee Cullen**, **James Weldon Johnson**.\n- Artists: Jacob Lawrence (later), Aaron Douglas.\n- Musicians: **Louis Armstrong**, **Duke Ellington**, **Bessie Smith**.\n- Philosopher: **Alain Locke's *The New Negro*** (1925).\n- **Marcus Garvey**'s United Negro Improvement Association (UNIA) — Black pride, 'Back to Africa' movement; Garvey imprisoned 1925 for mail fraud.\n\n**Lost Generation**:\n- Ernest Hemingway, F. Scott Fitzgerald (*The Great Gatsby*, 1925), Sinclair Lewis (*Babbitt*, 1922), Gertrude Stein, e.e. cummings.\n- Critical of American materialism, conformity, postwar disillusion.\n\n**Women's lives**:\n- **19th Amendment (1920)** gave women the vote.\n- **Flappers** — young women with short hair, short skirts, open smoking and drinking.\n- **Margaret Sanger's American Birth Control League (1921, later Planned Parenthood, 1942)** pushed contraception.\n- But most women were still homemakers; 19th Amendment did not transform daily politics.\n\n**Politics**:\n- **Warren G. Harding (1921-23)**: 'Return to Normalcy'; Teapot Dome Scandal (1921-24) — Interior Secretary Albert Fall took bribes.\n- **Calvin Coolidge (1923-29)**: 'The business of America is business'; tax cuts (Mellon's plan), high tariffs (Fordney-McCumber 1922).\n- **Herbert Hoover (1929-33)**: promised continued prosperity; overtaken by Depression.\n\n**Foreign policy**:\n- **Washington Naval Conference (1921-22)** — disarmament treaties.\n- **Kellogg-Briand Pact (1928)** — ~60 nations renounced war (unenforceable).\n- **Dawes Plan (1924)** rescheduled German reparations via American loans; **Young Plan (1929)** continued.\n- Trade and tariff fights (Fordney-McCumber 1922; Smoot-Hawley 1930).",
    keyIdeas: [
      "Prohibition (1920-33) produced bootlegging and organized crime.",
      "National Origins Act (1924) ended mass European immigration.",
      "KKK revived after 1915 Birth of a Nation; peaked mid-1920s.",
      "Scopes Trial (1925) dramatized fundamentalist vs. modernist culture clash.",
      "Harlem Renaissance produced a Black cultural flowering.",
    ],
    commonMistakes: [
      "Treating Prohibition as just moral reform — it produced massive crime networks.",
      "Missing National Origins Act's shaping effect for decades.",
      "Forgetting Teapot Dome scandal under Harding.",
    ],
    workedExample: {
      prompt:
        "Briefly explain ONE specific cultural conflict of the 1920s and its significance.",
      solution:
        "The 1925 Scopes Trial in Dayton, Tennessee pitted fundamentalist Protestant defenders of a state law banning the teaching of evolution, led by William Jennings Bryan, against modernist defenders of academic freedom led by Clarence Darrow. Although Scopes was convicted, the broadcast-era media spectacle damaged fundamentalism's cultural prestige nationally, even as fundamentalist belief remained strong in many Southern and rural communities. The trial crystallized a broader 1920s divide between urban, modernist, often immigrant-influenced culture and rural, Protestant, native-born traditionalism that would shape American politics for decades.",
    },
  },
  "7.9": {
    id: "7.9",
    title: "The Great Depression",
    summary:
      "The 1929 stock market crash, cascading banking failures, Smoot-Hawley Tariff, and Hoover's limited response produced the deepest economic crisis in U.S. history — with unemployment reaching 25%.",
    lesson:
      "**Causes of the Depression (multiple, interacting)**:\n\n1. **Stock market speculation**: margin buying (as little as 10% down) inflated stock prices far beyond underlying values.\n2. **Banking weakness**: ~25,000 banks, many small and under-regulated; no deposit insurance; runs catastrophic.\n3. **Underconsumption**: wages did not keep pace with productivity; wealth concentration meant producers had fewer consumers.\n4. **Agricultural crisis**: farm prices collapsed after WWI; farmers carried debt.\n5. **International debt system**: German reparations paid via U.S. loans to Germany; collapse rippled globally.\n6. **Overproduction**: manufacturers produced more than markets could absorb.\n7. **Federal Reserve mistakes**: tightened money supply when loosening was needed.\n\n**The crash (October 1929)**:\n- **Black Thursday (Oct 24, 1929)**, **Black Tuesday (Oct 29, 1929)** — dramatic sell-offs.\n- Dow lost ~25% in two days; by 1932 it had lost ~89% from its 1929 peak.\n\n**The Depression deepens (1929-33)**:\n- **Unemployment**: 3% (1929) → **25% (1933)**.\n- GDP fell ~30%.\n- Roughly 9,000 banks failed (1930-33); depositors lost savings (no FDIC yet).\n- Industrial production halved.\n- Farm income fell ~60%.\n- International trade collapsed with **Smoot-Hawley Tariff (1930)** — raised tariffs to record highs, triggered foreign retaliation.\n\n**Social effects**:\n- Bread lines, soup kitchens, **Hoovervilles** (shantytowns).\n- Rural evictions; Dust Bowl (early 1930s): drought + over-farmed Plains → massive dust storms; ~2.5 million migrants ('Okies') to California.\n- Birth rate fell; marriages delayed.\n- Suicide rate rose.\n- Scottsboro Boys case (1931): nine Black teenagers falsely accused of rape; miscarriages of justice highlighted Jim Crow.\n\n**Hoover's response**:\n- Had been praised as 'Great Engineer' and humanitarian (WWI Belgian relief).\n- Initial belief that downturn was normal cyclical adjustment.\n- Later responses:\n  - **Reconstruction Finance Corporation (RFC, 1932)**: loans to banks, railroads, insurance companies.\n  - **Federal Home Loan Bank Act (1932)**.\n  - Continued **balanced budgets** and reluctance to provide direct relief.\n- **Bonus Army (summer 1932)**: ~20,000 WWI veterans and families marched on Washington demanding early payment of bonuses; camped near Capitol. Hoover ordered **Gen. Douglas MacArthur** to disperse them; MacArthur burned camps. Image of veterans being driven off by troops devastated Hoover's reputation.\n\n**Election of 1932**:\n- **Franklin D. Roosevelt** (NY governor, Democrat) vs. Hoover.\n- FDR's 'New Deal' promise vague but confident; won 472-59 electoral votes.\n- Four-month gap between election (Nov 1932) and inauguration (March 1933) — since shortened by **20th Amendment (1933)**.\n- In that interval, banking crisis worsened.\n\n**By March 1933**: ~15 million unemployed; bank holidays in many states; national mood desperate. FDR inaugurated March 4, 1933 — 'the only thing we have to fear is fear itself.'",
    keyIdeas: [
      "Multiple causes: speculation, banking weakness, underconsumption, agricultural crisis, Smoot-Hawley, Fed mistakes.",
      "Unemployment reached ~25%; Dow lost ~89% from 1929 peak.",
      "Hoover's limited response (RFC, reluctance to direct relief) failed to arrest collapse.",
      "Bonus Army fiasco (1932) destroyed Hoover's reputation.",
      "FDR landslide 1932 on vague but confident 'New Deal' promise.",
    ],
    commonMistakes: [
      "Reducing causes to the stock crash alone — multiple structural problems preceded and amplified it.",
      "Describing Hoover as doing nothing — he did act, but inadequately.",
      "Missing Smoot-Hawley's role in international trade collapse.",
    ],
    workedExample: {
      prompt:
        "Briefly explain ONE specific cause of the Great Depression in the United States.",
      solution:
        "Banking system weakness — roughly 25,000 small, under-regulated, uninsured banks by 1929 — turned initial losses into cascading collapse when depositors, alarmed by bank failures, rushed to withdraw funds and forced additional banks into insolvency. Between 1930 and 1933 about 9,000 banks failed and depositors lost billions in savings. Combined with the Federal Reserve's decision to tighten rather than expand the money supply during the crisis, this financial contagion turned the 1929 stock market crash into a decade-long Depression that bottomed out with 25 percent unemployment by 1933.",
    },
  },
  "7.10": {
    id: "7.10",
    title: "The New Deal",
    summary:
      "Between 1933 and 1939 FDR's New Deal delivered relief, recovery, and reform — expanding federal government, recognizing labor rights, and creating Social Security — transforming the American state.",
    lesson:
      "**First Hundred Days (March-June 1933)**:\n- **Bank Holiday** (March 1933): Roosevelt closed banks nationwide; reopened only sound ones under the **Emergency Banking Act**.\n- **Glass-Steagall Act (1933)**: separated commercial from investment banking; created **Federal Deposit Insurance Corporation (FDIC)** — insured deposits.\n- **Civilian Conservation Corps (CCC, 1933)**: employed ~3M young men in forestry, parks, and conservation.\n- **Agricultural Adjustment Act (AAA, 1933)**: paid farmers to reduce production to raise prices. Struck down in 1936; revised version held.\n- **National Industrial Recovery Act (NIRA, 1933)**: created the **NRA (Blue Eagle)** — industry codes for prices, wages, hours; Section 7a guaranteed right to organize. Struck down in **Schechter v. U.S. (1935)**.\n- **Tennessee Valley Authority (TVA, 1933)**: federal agency providing electricity, flood control, and development across seven states.\n- **Federal Emergency Relief Administration (FERA)**: direct cash relief (Harry Hopkins).\n- **Home Owners' Loan Corporation (HOLC)**: refinanced mortgages.\n\n**Second New Deal (1935-38)**:\n- **Works Progress Administration (WPA, 1935)**: employed ~8.5M total in construction, art, theater, writing ('Federal Writers' Project' oral histories).\n- **National Labor Relations Act (Wagner Act, 1935)**: guaranteed private-sector workers' right to organize and bargain collectively. Transformative for industrial unions.\n- **Social Security Act (1935)**: old-age pensions (at 65), unemployment insurance, Aid to Dependent Children, aid to elderly/blind/disabled. Payroll-tax funded.\n- **Wealth Tax Act (1935)**: steeply progressive income tax.\n- **Public Utility Holding Company Act (1935)**: regulated utility monopolies.\n- **Banking Act of 1935**: strengthened Federal Reserve.\n- **Rural Electrification Administration (REA, 1935)**: brought electricity to rural America.\n- **Fair Labor Standards Act (1938)**: minimum wage ($0.25/hr), maximum hours (44/wk initially, dropping to 40), ban on most child labor.\n\n**Critics — left and right**:\n- **Huey Long** (LA): 'Share Our Wealth' — confiscate large fortunes, guarantee every family $5,000 income. Assassinated 1935.\n- **Father Charles Coughlin**: radio priest who turned anti-Semitic and anti-New Deal by mid-1930s.\n- **Dr. Francis Townsend**: monthly pensions for retirees — forerunner of Social Security.\n- **Republicans and conservatives**: saw New Deal as socialist.\n\n**Court-packing plan (1937)**:\n- After Supreme Court struck down NRA (Schechter 1935) and AAA (Butler 1936), FDR proposed adding up to 6 new justices.\n- Politically disastrous — Congress rejected.\n- But **'switch in time that saved nine'**: Justice Owen Roberts began upholding New Deal laws (*West Coast Hotel v. Parrish*, 1937, upheld minimum wage).\n\n**Recession of 1937-38**:\n- FDR cut spending in 1937, triggering a new downturn.\n- Reversed in 1938, resumed spending.\n\n**Labor breakthrough**:\n- **Congress of Industrial Organizations (CIO, 1935)** under **John L. Lewis** organized industrial unions (autos, steel, rubber).\n- **Sit-down strikes** at GM (1936-37) and other plants.\n- Wagner Act created an enduring legal framework.\n\n**Limits of the New Deal**:\n- **Race**: Social Security excluded agricultural and domestic workers (disproportionately Black); discrimination in CCC and WPA; redlining in FHA mortgages.\n- FDR refused to push federal anti-lynching legislation to preserve Southern Democratic support.\n- **Eleanor Roosevelt** pushed internal reform; Mary McLeod Bethune led FDR's 'Black cabinet.'\n- Native Americans: **Indian Reorganization Act (1934, John Collier)** reversed Dawes, restored tribal self-government and some lands.\n- **Mexican Repatriation (1929-39)**: up to 1M Mexican Americans (many U.S. citizens) deported under pressure.\n- Women: Frances Perkins (Secretary of Labor, first woman in cabinet) led labor reforms; Eleanor Roosevelt expanded role of First Lady.\n\n**Election of 1936**: FDR won 523-8 electoral votes — massive ratification. Created the New Deal coalition: Northern workers, Southern whites, urban immigrants, Black voters (shift), farmers.\n\n**Significance**:\n- Did not fully end Depression (unemployment still ~14% in 1940; WWII mobilization finished the recovery).\n- Created regulatory state, welfare state, and labor-protection framework that lasted into the 21st century.\n- Changed the meaning of American liberalism — expanded government to protect ordinary Americans.",
    keyIdeas: [
      "First Hundred Days: Emergency Banking, CCC, AAA, NIRA, TVA.",
      "Second New Deal: WPA, Wagner Act, Social Security — the lasting pillars.",
      "FDR's court-packing plan failed but Court stopped striking down laws.",
      "New Deal excluded many Black Americans via agricultural/domestic worker exemptions.",
      "Built enduring New Deal coalition: workers, urban ethnic, Southern whites, later Black voters.",
    ],
    commonMistakes: [
      "Treating the New Deal as a single plan — it evolved across First and Second phases.",
      "Claiming it ended the Depression — WWII did.",
      "Missing the race-inflected exclusions (agricultural and domestic workers).",
    ],
    workedExample: {
      prompt:
        "Briefly explain ONE specific way the New Deal permanently changed the relationship between the federal government and the American people.",
      solution:
        "The Social Security Act of 1935 established the first national system of old-age pensions, unemployment insurance, and aid to dependent children, creating a federal obligation to provide economic security against old age, joblessness, and poverty. Funded through payroll taxes and administered by a new Social Security Administration, the program created a direct financial relationship between the federal government and ordinary Americans that did not exist before 1935, redefined the scope of federal responsibility, and survived every subsequent administration — shaping American expectations of government for the next ninety years.",
    },
  },
  "7.11": {
    id: "7.11",
    title: "Interwar Foreign Policy",
    summary:
      "Between 1920 and 1941 the U.S. mixed isolationism with selective engagement — Washington Naval Conference, disarmament treaties, Neutrality Acts, and eventually Lend-Lease as fascism spread.",
    lesson:
      "After rejecting the League of Nations, the U.S. pursued a mixed foreign policy.\n\n**1920s**:\n- **Washington Naval Conference (1921-22)**: five-power treaty limited capital ships (U.S., Britain, Japan at 5:5:3 ratio; France, Italy smaller). Nine-power treaty reaffirmed Open Door in China.\n- **Dawes Plan (1924)**: U.S. loans refinanced German reparations.\n- **Kellogg-Briand Pact (1928)**: renounced war — ~60 signatories; unenforceable.\n- **High tariffs** (Fordney-McCumber 1922) limited trade.\n- **Mexican oil nationalization dispute** managed without war.\n\n**Good Neighbor Policy (Hoover-FDR)**:\n- End of recurring U.S. military interventions in Latin America (Caribbean Basin).\n- **Stimson Doctrine (1932)**: U.S. would not recognize territorial changes made by force — response to Japan's seizure of Manchuria.\n- Withdrawals from Nicaragua (1933), Haiti (1934).\n- **Pan-American Conferences** cultivated cooperation.\n- FDR's 1933 promise: U.S. would be 'good neighbor' to Latin America.\n\n**Rise of fascism (1930s)**:\n- **Mussolini** in Italy (1922).\n- **Hitler** in Germany (chancellor 1933).\n- **Japan**: invaded Manchuria (1931), full China war (1937).\n- **Spanish Civil War (1936-39)**: Franco's nationalists (backed by Germany/Italy) vs. Republicans (backed by USSR); U.S. neutral under Neutrality Acts.\n\n**Neutrality Acts (1935, 1936, 1937)**:\n- Passed after **Nye Committee** investigations (1934-36) claimed WWI had been driven by 'merchants of death' (arms manufacturers).\n- Prohibited arms sales to belligerents, loans, travel on belligerent ships, etc.\n- Revised in 1937: **'cash-and-carry'** — belligerents could buy non-military goods if they paid cash and transported themselves.\n\n**FDR's shift toward intervention**:\n- **Quarantine Speech (1937, Chicago)**: hinted at need to 'quarantine' aggressor nations; public response cautious.\n- **Munich Conference (September 1938)**: Britain and France allowed Germany to take Sudetenland — appeasement.\n- **Germany invaded Poland (September 1939)**; Britain and France declared war.\n- **Neutrality Act of 1939**: allowed arms sales on cash-and-carry basis — benefited Britain and France.\n- **Destroyers-for-Bases Deal (Sept 1940)**: 50 old destroyers to Britain for Caribbean/Atlantic bases.\n- **Two-Ocean Navy Act (1940)**.\n- **Selective Training and Service Act (Sept 1940)**: first peacetime draft.\n- **Election of 1940**: FDR won third term; pledged 'again and again and again' not to send American boys into war.\n- **Lend-Lease Act (March 1941)**: U.S. could lend or lease military equipment to any nation whose defense was deemed vital to U.S. security. Eventually provided $50B in aid to Britain, USSR, China, and others.\n- **Atlantic Charter (August 1941)**: FDR and Churchill articulated postwar goals — self-determination, free trade, disarmament, collective security.\n- **Undeclared naval war** in Atlantic by late 1941.\n\n**Asia and Japan**:\n- U.S. imposed **oil and steel embargoes (1940-41)** after Japan's moves into French Indochina.\n- Japan saw embargoes as existential threat; planners prepared war.\n- **Pearl Harbor attack (Dec 7, 1941)**: Japanese strike killed 2,400 Americans, damaged Pacific Fleet.\n- Congress declared war on Japan (Dec 8, 1941).\n- **Germany and Italy declared war on the U.S. (Dec 11, 1941)** — fulfilling their Axis obligations, bringing U.S. fully into European war.",
    keyIdeas: [
      "1920s: naval disarmament, Dawes Plan, Kellogg-Briand, high tariffs.",
      "Good Neighbor Policy softened Latin American interventions.",
      "Neutrality Acts (1935-37) aimed to avoid WWI mistakes.",
      "Cash-and-carry (1939), Lend-Lease (1941) shifted U.S. toward Allies.",
      "Pearl Harbor (Dec 7, 1941) → full U.S. entry into WWII.",
    ],
    commonMistakes: [
      "Treating 1920s as pure isolationism — it had active economic and Caribbean dimensions.",
      "Confusing Neutrality Acts (multiple) with Lend-Lease (1941).",
      "Forgetting the oil embargo as the trigger for Japan's decision to attack.",
    ],
    workedExample: {
      prompt:
        "Briefly explain ONE specific way U.S. foreign policy changed between 1935 and 1941.",
      solution:
        "Between 1935 and 1941 U.S. policy shifted from strict non-intervention under the Neutrality Acts — which banned arms sales and loans to belligerents — to active support of the Allies through cash-and-carry arms sales in 1939 and especially the Lend-Lease Act of March 1941, which authorized the president to provide military equipment to nations 'vital to U.S. defense' without requiring payment. By year's end, Lend-Lease aid was flowing to Britain, the USSR, and China, and the U.S. had effectively joined the anti-fascist coalition short of formal war — a transformation completed by the Japanese attack on Pearl Harbor in December 1941.",
    },
  },
  "7.12": {
    id: "7.12",
    title: "World War II: Mobilization",
    summary:
      "The U.S. home front mobilized massively — production boom, women and minorities in industry, rationing, Japanese internment, and Double V campaign — ending the Depression and setting new social dynamics.",
    lesson:
      "**Production boom**:\n- War Production Board directed industry.\n- GDP roughly doubled 1939-45.\n- 'Arsenal of Democracy' produced staggering quantities: ~300,000 aircraft, ~90,000 tanks, ~2.4M trucks.\n- Ford's Willow Run plant produced a B-24 bomber every ~hour.\n- Henry J. Kaiser's shipyards built Liberty ships in days.\n\n**Labor and workforce**:\n- Unemployment fell to ~1% by 1944.\n- **Women** entered war industries in unprecedented numbers — 'Rosie the Riveter' iconic image.\n- ~6M women in the paid workforce; many in factory jobs previously reserved for men.\n- Women's labor force participation rose from ~27% to ~37%.\n- After the war many were pushed back to domestic roles, but the precedent was set.\n- **Black Americans**: **A. Philip Randolph's March on Washington Movement** (1941) pressured FDR to issue **Executive Order 8802**: banned employment discrimination in war industries; created Fair Employment Practices Commission.\n- **Great Migration accelerated**: ~1.5M Black Americans moved to Northern and Western cities.\n- **Mexican Americans**: **Bracero Program (1942-64)** brought Mexican agricultural workers.\n- **Zoot Suit Riots (1943, Los Angeles)**: white servicemen attacked Mexican American youth.\n\n**Financing the war**:\n- **War Bonds** drives.\n- Income tax broadened massively — first applied to most workers (previously only wealthy).\n- **Withholding introduced (1943)**.\n- Federal spending grew from ~10% of GDP pre-war to ~45% in 1945.\n\n**Rationing**:\n- **Office of Price Administration (OPA)** administered ration books for meat, sugar, gasoline, rubber, etc.\n- Victory gardens — 20M home gardens produced ~40% of vegetables.\n\n**Japanese internment (Executive Order 9066, Feb 1942)**:\n- Roughly 110,000-120,000 Japanese Americans on the West Coast — including ~70,000 U.S.-born citizens (Nisei) — forced into 10 internment camps (Manzanar, Tule Lake, etc.).\n- Families lost homes, businesses, property; most never recovered.\n- **Korematsu v. United States (1944)**: Supreme Court upheld internment as wartime military necessity.\n- **442nd Regimental Combat Team**: Nisei soldiers became one of the most decorated units in U.S. military history.\n- **Civil Liberties Act of 1988** formally apologized and paid $20,000 to each surviving internee.\n- Germans and Italians in the U.S. faced some restrictions but nothing like the Japanese treatment.\n\n**Native Americans**:\n- Code Talkers (Navajo, Comanche) used their languages for unbreakable military codes.\n- Many Native Americans left reservations for war industry jobs and military service.\n\n**Black soldiers and sailors**:\n- ~1.2M Black Americans served, usually in segregated units.\n- **Tuskegee Airmen** (332nd Fighter Group) flew combat missions.\n- **Double V campaign**: victory against fascism abroad AND racism at home.\n- Black press (Pittsburgh Courier) pushed the Double V.\n\n**Propaganda and culture**:\n- **Office of War Information** produced films, posters, radio programs.\n- Hollywood aligned behind war effort: *Casablanca* (1942), war documentaries.\n- Rosie the Riveter (Norman Rockwell's Saturday Evening Post cover, 1943; J. Howard Miller's 'We Can Do It!' poster).\n\nThe war ended the Depression, reshuffled labor, accelerated civil rights activism, and built a federal state on a scale that the New Deal only hinted at.",
    keyIdeas: [
      "Production boom doubled GDP and ended Depression.",
      "Women ('Rosie') and Black workers entered industry; Great Migration accelerated.",
      "Executive Order 8802 (1941) banned war-industry discrimination after Randolph's threat.",
      "Japanese internment (EO 9066, 1942) imprisoned 110,000+ — upheld in Korematsu.",
      "Double V campaign linked anti-fascism and anti-racism.",
    ],
    commonMistakes: [
      "Treating Rosie the Riveter as simple liberation — many women were pushed back after the war.",
      "Missing that most Japanese internees were U.S. citizens.",
      "Forgetting Executive Order 8802 and the March on Washington Movement's role.",
    ],
    workedExample: {
      prompt:
        "Briefly explain ONE specific way World War II affected the home front experience of one group of Americans.",
      solution:
        "Executive Order 9066, issued in February 1942, led to the forced relocation of roughly 110,000 to 120,000 Japanese Americans — including roughly 70,000 U.S.-born citizens — from the West Coast into ten internment camps such as Manzanar and Tule Lake. Families lost homes, farms, and businesses; the Supreme Court upheld the policy in Korematsu v. United States (1944) on grounds of military necessity. Congress later formally apologized and provided $20,000 in reparations to each surviving internee under the Civil Liberties Act of 1988, acknowledging the internment as a profound violation of civil liberties.",
    },
  },
  "7.13": {
    id: "7.13",
    title: "World War II: Military",
    summary:
      "In Europe and the Pacific, Allied forces turned the tide at Midway, Stalingrad, Kursk, and El Alamein (1942-43); D-Day (June 1944) opened a Western Front; atomic bombs on Hiroshima and Nagasaki (August 1945) ended the war.",
    lesson:
      "**Europe-first strategy**:\n- At Arcadia Conference (Dec 1941-Jan 1942), FDR and Churchill agreed to defeat Germany first, then Japan.\n- Soviets bore the brunt of German ground war (~27M Soviet dead).\n\n**North Africa and Italy**:\n- **Operation Torch (Nov 1942)**: U.S.-British landings in Morocco and Algeria under **Eisenhower**.\n- North Africa cleared by May 1943.\n- **Sicily (July 1943)** and mainland Italy invasion (September 1943). Italy surrendered, but Germany occupied and resisted. **Anzio**, **Monte Cassino** — bloody.\n\n**Eastern Front (Soviet)**:\n- **Stalingrad (1942-43)**: Soviet victory destroyed the German 6th Army.\n- **Kursk (July 1943)**: largest tank battle in history; Soviet victory.\n- Soviets advanced westward throughout 1944-45.\n\n**Strategic bombing**:\n- British (Bomber Command) by night, U.S. 8th Air Force by day.\n- Destroyed German industrial cities; killed hundreds of thousands.\n- **Dresden (Feb 1945)**: firebombed with ~25,000 dead — still debated.\n\n**D-Day (June 6, 1944)**:\n- **Operation Overlord** under Eisenhower — Allied landings at five Normandy beaches (Utah, Omaha, Gold, Juno, Sword).\n- ~160,000 troops landed on first day; ~4,400 Allied dead at Omaha alone.\n- Breakout in July; Paris liberated Aug 25; reached Rhine by early 1945.\n- **Battle of the Bulge (Dec 1944-Jan 1945)**: German counteroffensive in Ardennes; halted.\n\n**Victory in Europe (May 8, 1945 — V-E Day)**:\n- Hitler suicide (April 30, 1945) as Soviets entered Berlin.\n- Germany surrendered.\n\n**Pacific theater**:\n- **Battle of Coral Sea (May 1942)**: first naval battle fought entirely by carrier aircraft; tactical draw, strategic U.S. success.\n- **Battle of Midway (June 1942)**: turning point — U.S. sank 4 Japanese carriers in a single engagement (having broken Japanese codes).\n- **Guadalcanal (Aug 1942-Feb 1943)**: first Allied ground offensive in Pacific.\n- **Island-hopping strategy** under Admiral Nimitz (Central Pacific) and MacArthur (Southwest Pacific): bypass strongholds, isolate them.\n- **Tarawa (1943), Saipan (1944), Philippine Sea (1944), Iwo Jima (Feb-Mar 1945, Rosenthal's flag-raising photo), Okinawa (Apr-Jun 1945)** — each bloodier than the last.\n- Japanese **kamikaze** attacks from late 1944.\n\n**Manhattan Project (1942-45)**:\n- Under **J. Robert Oppenheimer** at Los Alamos; funded ~$2B.\n- First test at Trinity Site, New Mexico (July 16, 1945).\n- Scientists divided over use.\n\n**End of war in Pacific**:\n- **Potsdam Declaration (July 1945)**: demanded unconditional Japanese surrender.\n- **Hiroshima (Aug 6, 1945)**: 'Little Boy' killed ~140,000 (immediate and over time).\n- **Soviet invasion of Manchuria (Aug 8, 1945)**.\n- **Nagasaki (Aug 9, 1945)**: 'Fat Man' killed ~74,000.\n- **Japan surrendered (Aug 15, announced; formal surrender Sept 2, 1945 on USS Missouri)**.\n\n**Holocaust**:\n- Nazi genocide killed ~6M Jews and ~5M others (Roma, Slavs, disabled, LGBT, political prisoners).\n- Allies learned scope as camps (Majdanek, Auschwitz, Bergen-Belsen, Dachau) were liberated in 1944-45.\n- Earlier signals dismissed or de-prioritized; **St. Louis** ship of Jewish refugees turned away (1939).\n- **Nuremberg Trials (1945-46)**: leading Nazis tried for crimes against humanity — established individual responsibility for state crimes.\n\n**Casualties (global)**:\n- Total ~70-85M dead (civilians and military).\n- U.S. military dead: ~405,000.\n- Soviet military + civilian dead: ~27M.",
    keyIdeas: [
      "Europe-first strategy: North Africa → Italy → D-Day.",
      "Midway (June 1942) was the Pacific turning point.",
      "D-Day (June 6, 1944) opened second front.",
      "Atomic bombs on Hiroshima (Aug 6) and Nagasaki (Aug 9) ended the war in the Pacific.",
      "Holocaust killed ~6M Jews; Nuremberg Trials tried major Nazis.",
    ],
    commonMistakes: [
      "Crediting the U.S. alone with beating Germany — Soviets bore most ground combat.",
      "Confusing D-Day (1944) with Pearl Harbor (1941).",
      "Skipping Nagasaki or treating the atomic decision as uncontested.",
    ],
    workedExample: {
      prompt:
        "Briefly explain ONE specific reason the United States dropped atomic bombs on Japan in August 1945.",
      solution:
        "American planners projected that a conventional invasion of Japan's home islands would produce hundreds of thousands of Allied casualties and many more Japanese casualties, based on costly recent battles at Iwo Jima and Okinawa. President Truman and his advisers concluded that dropping the atomic bombs on Hiroshima on August 6 and Nagasaki on August 9, 1945, would force immediate Japanese surrender without an invasion; Truman also hoped that displaying the weapon would strengthen American diplomatic leverage against the Soviet Union as postwar issues loomed. Japan surrendered on August 15, 1945, ending the war.",
    },
  },
  "7.14": {
    id: "7.14",
    title: "Postwar Diplomacy",
    summary:
      "Yalta (Feb 1945), Potsdam (July 1945), UN founding, Bretton Woods, and growing U.S.-Soviet tensions defined the postwar order — laying groundwork for the Cold War.",
    lesson:
      "**Yalta Conference (February 1945)**:\n- FDR, Churchill, Stalin in Crimea.\n- Agreed on:\n  - Division of Germany into four occupation zones (U.S., Britain, France, USSR).\n  - USSR would enter war against Japan 3 months after V-E Day (in exchange for Pacific territorial concessions).\n  - Free elections in Eastern Europe — interpreted differently by Stalin (controlled) and Western leaders (free).\n  - United Nations structure.\n- Controversial: critics later said FDR 'gave away' Eastern Europe; defenders note Soviet armies already occupied the region.\n\n**Death of FDR (April 12, 1945)**: Harry Truman assumed presidency with limited foreign policy background and briefing on the Manhattan Project.\n\n**Potsdam Conference (July-August 1945)**:\n- Truman, Churchill (replaced mid-conference by Attlee after UK election), Stalin.\n- Confirmed German occupation; set Oder-Neisse line as provisional Polish-German border; 'denazification, demilitarization, democratization' of Germany.\n- **Potsdam Declaration** demanded Japan's unconditional surrender.\n- Truman told Stalin U.S. had 'a new weapon of unusual destructive force' — Stalin unsurprised (Soviet spies already knew).\n\n**UN founding (April-June 1945, San Francisco)**:\n- Charter signed June 26, 1945; U.S. ratified.\n- **Structure**:\n  - **General Assembly**: all member nations.\n  - **Security Council**: 5 permanent members (U.S., USSR, UK, France, China) with veto; 6 (later 10) rotating members.\n  - **Secretariat, ICJ, specialized agencies** (WHO, UNESCO, etc.).\n- Unlike League of Nations, U.S. joined from start; HQ in New York.\n- **Universal Declaration of Human Rights (1948)**: Eleanor Roosevelt led drafting committee.\n\n**Bretton Woods Conference (July 1944)**:\n- Created postwar financial architecture:\n  - **International Monetary Fund (IMF)**: stabilize exchange rates.\n  - **International Bank for Reconstruction and Development (World Bank)**: fund reconstruction.\n  - Dollar pegged to gold ($35/oz); other currencies pegged to dollar.\n- U.S. emerged as global financial power.\n\n**Denazification and war crimes trials**:\n- **Nuremberg Trials (1945-46)**: 22 major Nazi leaders tried; 12 sentenced to death.\n- **Tokyo Trials (1946-48)**: Japanese leaders tried — Hirohito not tried.\n- Established principle that individuals could be held responsible for state crimes.\n\n**Economic reconstruction**:\n- Marshall Plan would follow (1948, Period 8).\n\n**Decolonization begins**:\n- UK left India (1947, partition into India and Pakistan).\n- Netherlands in Indonesia, France in Indochina — contested.\n- U.S. granted Philippines independence (1946, as promised in 1930s).\n- Decolonization accelerates in Periods 8 and 9.\n\n**Growing U.S.-USSR tensions**:\n- Disputes over Polish government, nuclear technology, Iran (Soviets delayed withdrawal from northern Iran, 1946), Turkey (Soviet pressure on straits), Greek civil war.\n- **Churchill's Iron Curtain speech** (Fulton, MO, March 1946): 'from Stettin in the Baltic to Trieste in the Adriatic, an iron curtain has descended across the Continent.'\n- **George Kennan's 'Long Telegram'** (Feb 1946) and 'X Article' (July 1947, *Foreign Affairs*): argued Soviet expansionism required 'containment.'\n- By 1947 the Cold War had effectively begun.\n\n**Atomic age anxiety**:\n- U.S. monopoly on nuclear weapons until **Soviet test (Aug 1949)**.\n- **Baruch Plan (1946)** for international atomic control failed.\n- Arms race loomed.",
    keyIdeas: [
      "Yalta (Feb 1945): German zones, Soviet Pacific entry, UN, Polish elections.",
      "Potsdam (July-Aug 1945): confirmed occupation; ultimatum to Japan.",
      "UN founded June 1945 — U.S. joined, unlike League.",
      "Bretton Woods (1944): IMF, World Bank, dollar-gold standard.",
      "Iron Curtain speech (1946) + Kennan's Long Telegram → containment doctrine.",
    ],
    commonMistakes: [
      "Blaming FDR for 'giving away' Eastern Europe — Soviet armies already held it.",
      "Confusing Yalta (February 1945) with Potsdam (July-August 1945).",
      "Missing Bretton Woods as the economic backbone of the postwar order.",
    ],
  },
  "7.15": {
    id: "7.15",
    title: "Comparison in Period 7",
    summary:
      "Period 7 rewards comparison of WWI and WWII home fronts, of Progressive and New Deal reform, and of interwar isolationism versus postwar engagement.",
    lesson:
      "**WWI vs. WWII home fronts**:\n\n| Dimension | WWI | WWII |\n|-----------|-----|------|\n| Duration | 19 months for U.S. | 45 months for U.S. |\n| Mobilization | Significant | Total economic and social |\n| Women in industry | Some | Massive (Rosie) |\n| Black migration | Began Great Migration | Accelerated it |\n| Civil liberties | Espionage/Sedition Acts; Palmer Raids | Japanese internment; less general suppression |\n| Propaganda | CPI (Creel) | OWI + Hollywood |\n| Postwar labor | Red Scare, strikes crushed | Strike wave 1946 after Taft-Hartley |\n| Result | Return to isolationism | Superpower role |\n\n**Progressivism vs. New Deal**:\n\n| Dimension | Progressive Era (1900-20) | New Deal (1933-39) |\n|-----------|---------------------------|---------------------|\n| Scope | Mostly regulatory | Regulatory + welfare state |\n| Federal scale | Growing but limited | Explosive growth |\n| Labor rights | Limited | Wagner Act established |\n| Social insurance | None federally | Social Security |\n| Constitutional battles | Lochner era | Court-packing crisis |\n| Leadership | TR, Wilson | FDR |\n| Lasting institutions | Fed Reserve, FTC, 16-19 Amendments | SSA, FDIC, SEC, FLSA |\n\n**Interwar isolationism vs. postwar engagement**:\n- 1920s-30s: Senate rejected Versailles, Neutrality Acts, high tariffs.\n- 1940s: Lend-Lease, UN, Bretton Woods, NATO (1949), permanent alliances.\n- Shift: from 'no entangling alliances' to 'leader of the free world.'\n\n**Two world wars' domestic consequences**:\n- Each accelerated federal expansion — WWI built temporary war agencies; WWII built a permanent federal state.\n- Each created civil-liberties crises — Sedition Acts + Palmer Raids; Japanese internment.\n- Each reshaped demographics — Great Migration began WWI, accelerated WWII.\n- Each ended with a reassessment of U.S. role — retreat after WWI, global leadership after WWII.\n\nPeriod 7 thus closes a century of expansion and modernization and opens the era of superpower rivalry and civil rights revolution.",
    keyIdeas: [
      "WWI and WWII home fronts differ in scale, duration, inclusion, and civil-liberties effects.",
      "Progressive Era and New Deal both expanded federal government; New Deal was more structural.",
      "Interwar isolationism gave way to permanent global engagement after WWII.",
      "Each war reshaped migration, labor, and civil liberties.",
    ],
    commonMistakes: [
      "Treating Progressivism and the New Deal as simple extensions of each other.",
      "Overstating continuity between WWI and WWII home fronts.",
      "Missing the scale of federal expansion during WWII relative to WWI.",
    ],
  },

  // =========================================================================
  // PERIOD 8 — 1945-1980
  // =========================================================================
  "8.1": {
    id: "8.1",
    title: "Contextualizing Period 8",
    summary:
      "Between 1945 and 1980 the U.S. waged the Cold War, experienced postwar prosperity and suburbanization, fought the Vietnam War, saw the civil rights and women's movements transform American society, and entered a period of crisis in the 1970s.",
    lesson:
      "Period 8 is defined by two great stories: the **Cold War** abroad and the **civil rights revolution** at home.\n\n**Cold War**:\n- U.S. and USSR emerged as superpowers; ideology, nuclear arms, and proxy wars defined rivalry.\n- Containment: Truman Doctrine, Marshall Plan, NATO (1949).\n- Hot wars in Korea (1950-53) and Vietnam (1955-75).\n- Nuclear brinkmanship: Cuban Missile Crisis (1962); détente (1970s).\n\n**Domestic prosperity**:\n- Baby Boom (1946-64); GI Bill; Levittown suburbs; Interstate Highway Act (1956); Sunbelt migration.\n- 1950s-60s growth unprecedented; middle class expanded.\n\n**Civil rights movement**:\n- Brown v. Board (1954), Montgomery Bus Boycott (1955-56), Little Rock (1957), sit-ins (1960), Freedom Rides (1961), March on Washington (1963), Civil Rights Act (1964), Voting Rights Act (1965).\n- Later: Black Power, Malcolm X, MLK assassination (1968), Fair Housing Act (1968).\n\n**Other rights movements**:\n- Women (NOW 1966, ERA, Roe v. Wade 1973).\n- Latino (UFW, Chicano Movement).\n- Native American (AIM, 1969 Alcatraz).\n- LGBTQ (Stonewall 1969).\n\n**Great Society (1964-65)**:\n- LBJ's War on Poverty: Medicare, Medicaid, ESEA, Immigration Act.\n\n**Vietnam War**:\n- Gradual escalation under Kennedy and LBJ.\n- Gulf of Tonkin (1964), Tet (1968), Nixon's Vietnamization, fall of Saigon (1975).\n- Antiwar movement and counterculture.\n\n**1970s crisis**:\n- Stagflation; oil crises (1973, 1979); Watergate (1972-74); Carter's difficulties; Iran hostage crisis (1979).\n- End of New Deal consensus; rise of modern conservatism (Reagan 1980).",
    keyIdeas: [
      "Cold War structured foreign policy from 1945 through 1991.",
      "Postwar prosperity produced Baby Boom, suburbs, Sunbelt, consumer culture.",
      "Civil rights movement dismantled Jim Crow legally by 1965.",
      "Vietnam War divided the country and ended in defeat.",
      "Late-period crisis set stage for conservative ascendancy.",
    ],
    commonMistakes: [
      "Treating the civil rights movement as a single period; it evolves across decades with phases.",
      "Skipping Vietnam's domestic political and cultural impact.",
      "Missing the 1970s economic shocks as a New Deal inflection point.",
    ],
  },
  "8.2": {
    id: "8.2",
    title: "The Cold War from 1945 to 1980",
    summary:
      "The U.S.-Soviet rivalry drove American foreign policy through containment, NATO, Korea, Cuba, Vietnam, and détente — defining geopolitics from 1945 to 1991.",
    lesson:
      "**Origins (1945-47)**:\n- Disputes over Eastern Europe, nuclear weapons, Germany.\n- **Kennan's Long Telegram (1946)** / 'X Article' (1947): containment doctrine.\n- **Truman Doctrine (March 1947)**: $400M aid to Greece and Turkey to resist communism; set open-ended commitment to 'support free peoples.'\n- **Marshall Plan (1948-52)**: ~$13B in aid to rebuild Western Europe; tied recipients to the U.S. economic sphere; USSR refused.\n- **Berlin Blockade (1948-49)**: Soviets cut off West Berlin; U.S./UK airlift supplied the city; NATO formed (1949).\n- **NATO (1949)** — first peacetime U.S. military alliance; collective security.\n- **Soviet atomic bomb (1949)**, **Communist victory in China (Oct 1949, Mao)** — shook U.S. confidence.\n\n**Korean War (1950-53)**:\n- North Korea invaded South (June 1950).\n- UN forces under **MacArthur** landed at Inchon (Sept 1950) and pushed north; Chinese intervention (Nov 1950) drove UN back.\n- War stabilized near 38th parallel; Truman fired MacArthur (April 1951) for insubordination (wanting to expand war to China).\n- **Armistice (July 1953)** — war never formally ended.\n- ~37,000 U.S. dead.\n\n**NSC-68 (April 1950)**: secret national security document advocated massive military buildup; became basis for Cold War defense spending.\n\n**Eisenhower era (1953-61)**:\n- **'New Look'** defense: more reliance on nuclear weapons ('massive retaliation'), less on conventional forces — cheaper.\n- **Dulles's brinkmanship**.\n- **CIA covert operations**:\n  - Iran (1953): overthrew Mossadegh, restored Shah.\n  - Guatemala (1954): overthrew Arbenz.\n  - Bay of Pigs (April 1961, planned under Ike, executed by JFK): failed.\n- **Warsaw Pact (1955)** — Soviet response to NATO.\n- **Suez Crisis (1956)**: U.S. pressured Britain, France, Israel to withdraw from Egypt.\n- **Hungarian Uprising (1956)**: crushed by USSR; U.S. did not intervene.\n- **Sputnik (Oct 1957)**: Soviet satellite shocked U.S.; **NASA** (1958), **National Defense Education Act (1958)**.\n\n**Kennedy (1961-63)**:\n- **Bay of Pigs (April 1961)**: failed invasion of Cuba.\n- **Berlin Wall built (Aug 1961)**: divided Berlin.\n- **Cuban Missile Crisis (Oct 1962)**: U.S. discovered Soviet nuclear missiles in Cuba. 13-day crisis ended with Soviet withdrawal in exchange for secret U.S. withdrawal of Jupiter missiles from Turkey. Closest point to nuclear war.\n- **Peace Corps (1961)**.\n- **Partial Test Ban Treaty (1963)**: banned atmospheric nuclear testing.\n\n**Johnson and Vietnam escalation (1963-68)**: see 8.8.\n\n**Nixon (1969-74)**:\n- **Détente** with Soviets: **SALT I (1972)**, **ABM Treaty (1972)**.\n- **Opening to China (Feb 1972)**: Nixon visit to Beijing; normalized relations (completed 1979).\n- **Vietnamization** and withdrawal.\n- **Chile (1973)**: CIA-backed coup overthrew Allende.\n\n**Carter (1977-81)**:\n- **Camp David Accords (1978)**: mediated Egypt-Israel peace.\n- **Panama Canal Treaties (1977)**.\n- **Soviet invasion of Afghanistan (Dec 1979)**: ended détente; U.S. boycotted 1980 Olympics.\n- **Iran hostage crisis (Nov 1979-Jan 1981)**: undermined Carter's presidency.",
    keyIdeas: [
      "Containment (Kennan) defined U.S. strategy from 1947.",
      "Truman Doctrine, Marshall Plan, NATO structured Western alliance.",
      "Korean War (1950-53) was the first hot war.",
      "Cuban Missile Crisis (Oct 1962) was the nuclear near-miss.",
      "Détente (Nixon) thawed briefly; Afghanistan invasion (1979) ended it.",
    ],
    commonMistakes: [
      "Treating Cold War as only ideological — economic and strategic considerations drove policy.",
      "Confusing Truman Doctrine (aid) with Marshall Plan (economic recovery).",
      "Missing CIA covert operations as a key instrument.",
    ],
    workedExample: {
      prompt:
        "Briefly explain ONE specific way the United States implemented the policy of containment between 1945 and 1960.",
      solution:
        "The Marshall Plan, announced by Secretary of State George Marshall in 1947 and enacted in 1948, channeled roughly $13 billion in U.S. economic aid to Western European nations between 1948 and 1952, rebuilding war-shattered economies and binding them to the U.S. commercial and political sphere. By strengthening Western Europe economically, the plan reduced the appeal of domestic communist parties — particularly in France and Italy — and created a stable anti-Soviet bloc that would be formalized militarily in NATO the following year, directly implementing Kennan's containment logic without requiring U.S. military commitment.",
    },
  },
  "8.3": {
    id: "8.3",
    title: "The Red Scare",
    summary:
      "Between 1947 and 1957 fear of domestic Communist subversion produced loyalty oaths, HUAC hearings, the Rosenberg trial, and McCarthyism — with lasting effects on civil liberties, labor, and culture.",
    lesson:
      "**Triggers**:\n- Soviet atomic bomb (1949) and Chinese Communist victory (1949) suggested communism was advancing.\n- Spy cases: **Alger Hiss** (State Department official; convicted of perjury 1950; whether he was a spy remains debated, though Venona project later suggested yes).\n- **Rosenbergs**: Julius and Ethel convicted of atomic espionage (1951); executed 1953 — controversial case; Julius was a spy per Soviet records; Ethel's role disputed.\n- Korean War (1950-53) heightened anti-Communist tension.\n\n**Federal programs**:\n- **Truman's Loyalty Program (1947)**: screened 4M+ federal employees; thousands dismissed or resigned, mostly without due process.\n- **HUAC (House Un-American Activities Committee)**:\n  - **Hollywood Ten (1947)**: writers and directors cited for contempt after refusing to name Communists. Hollywood blacklist followed — hundreds of writers, actors, directors unable to work.\n  - **Alger Hiss hearings (1948)**: **Richard Nixon** made his name.\n\n**McCarran Internal Security Act (1950)** required Communist-front organizations to register; established detention authority for suspected subversives.\n\n**McCarthyism**:\n- **Sen. Joseph McCarthy (R-WI)** — Feb 1950 Wheeling speech claimed he had a list of State Department Communists.\n- Used congressional hearings, press coverage, and innuendo to accuse government officials, Army officers, academics.\n- **Army-McCarthy Hearings (spring 1954)**: McCarthy attacked the Army; televised hearings exposed his bullying to a national audience.\n- 'Have you no sense of decency, sir?' — Joseph Welch to McCarthy.\n- Senate **censured McCarthy (Dec 1954)** 67-22.\n- McCarthy died 1957.\n\n**Cultural and labor effects**:\n- Blacklists in Hollywood, universities, labor unions (CIO expelled 11 Communist-led unions in 1949).\n- Teachers, librarians, civil servants fired.\n- **Taft-Hartley Act (1947)** required union officers to sign non-Communist affidavits.\n- Self-censorship in media, academia; narrowing of political discourse.\n- **Lavender Scare (1950s)**: federal government dismissed thousands of suspected gay and lesbian employees as 'security risks.'\n\n**Civil liberties and Supreme Court**:\n- **Dennis v. U.S. (1951)**: upheld Smith Act convictions of Communist Party leaders.\n- **Yates v. U.S. (1957)**: distinguished advocacy of abstract doctrine from incitement — narrowed Smith Act.\n- By late 1950s Court began moderating anti-Communist laws.\n\n**Dissent and continuity**:\n- Some intellectuals resisted — Edward R. Murrow's 1954 *See It Now* broadcast on McCarthy was a turning point in elite opinion.\n- But the Red Scare remapped American politics — made Democratic Party cautious of appearing 'soft on communism,' shaping Vietnam decisions; marginalized the left; paralyzed some unions.\n\n**Parallels to earlier Red Scare (1919-20)**: both followed war, targeted foreigners and labor, used extralegal means. This second one was broader, more institutional, and longer-lived.",
    keyIdeas: [
      "Loyalty Program (1947), HUAC hearings, and blacklists suppressed dissent.",
      "Hiss and Rosenberg cases turned spy fear into major political drama.",
      "McCarthy's methods peaked 1950-54; Army-McCarthy Hearings and Senate censure ended his career.",
      "Lavender Scare targeted LGBT federal workers alongside suspected Communists.",
      "Red Scare narrowed political discourse and pushed Democrats toward hawkish foreign policy.",
    ],
    commonMistakes: [
      "Treating McCarthy as the only driver — federal loyalty programs preceded him.",
      "Forgetting the Lavender Scare.",
      "Missing the long-term effects on Democratic foreign policy stances.",
    ],
    workedExample: {
      prompt:
        "Briefly explain ONE specific way the Red Scare affected American society between 1947 and 1957.",
      solution:
        "The House Un-American Activities Committee's 1947 investigation of the Hollywood Ten for alleged Communist influence in the film industry prompted major studios to adopt a blacklist that eventually barred several hundred writers, directors, and actors from working under their own names, sometimes for a decade or more. The blacklist both narrowed American film content — steering studios away from controversial political themes — and reshaped public discourse, as teachers, librarians, labor leaders, and federal employees feared that mere past association with left-wing causes could destroy their careers, contributing to a broader pattern of self-censorship during the early Cold War.",
    },
  },
  "8.4": {
    id: "8.4",
    title: "Economy After 1945",
    summary:
      "A generation of postwar prosperity produced the Baby Boom, suburban growth, interstate highways, Sunbelt migration, and a middle class that was broader — if still racially stratified — than any before.",
    lesson:
      "**Postwar boom**:\n- GDP grew ~5% annually in the 1950s.\n- U.S. accounted for ~50% of world manufacturing output.\n- Average family income roughly doubled from 1945 to 1970 (in real terms).\n- Unemployment low (~3-4%); inflation modest.\n\n**Demographic shifts**:\n- **Baby Boom (1946-64)**: ~76 million born — reshaped every subsequent decade.\n- **Suburbanization**: Levittown (Long Island, 1947; 17,000+ mass-produced homes) and countless imitators. By 1960, ~1/3 of Americans lived in suburbs.\n- **Sunbelt migration**: population and industry moved to the South and West (California, Texas, Arizona, Florida). Air conditioning, defense spending, and retirement migration drove it.\n- **Great Migration** continued — Black Americans to Northern cities.\n- By 1970 more Americans lived in suburbs than in cities.\n\n**Enabling policies**:\n- **GI Bill (1944)** provided education, home loans, unemployment benefits — sent ~8M veterans to college, helped millions buy homes. (Discriminated in practice against Black veterans, especially in the South.)\n- **Federal Housing Administration (FHA)** and **Veterans Administration** mortgages — low down payments, long terms — made homeownership mass-market.\n- **Redlining** — federal and private practice of refusing mortgages in Black neighborhoods — entrenched racial segregation.\n- **Interstate Highway Act (1956)**: $25B authorized; 41,000 miles of highway built over ~2 decades; rationale was defense (dispersing population for nuclear war) plus commerce.\n- **FHA subsidized suburban single-family homes**, not urban apartment buildings; structurally favored white suburbanites.\n\n**Consumer culture**:\n- TV: 9% of households (1950) → 90% (1960).\n- Credit cards (Diners Club 1950; BankAmericard 1958).\n- Shopping malls, McDonald's (1955 franchise by Ray Kroc), drive-ins, Disneyland (1955).\n- **Madison Avenue**: advertising industry at new scale.\n\n**Industries**:\n- Auto industry (Big Three: GM, Ford, Chrysler) dominated.\n- Military-industrial complex; aerospace (Boeing, Lockheed).\n- **Eisenhower's Farewell Address (Jan 1961)** warned of 'military-industrial complex' influence.\n\n**Labor**:\n- AFL-CIO merger (1955).\n- Membership peaked ~35% of workforce in 1950s-60s.\n- Postwar contracts linked wages to productivity; **Treaty of Detroit (1950)** between GM and UAW.\n\n**Limits and inequalities**:\n- **Poverty** remained: **Michael Harrington's *The Other America* (1962)** identified ~40M Americans in poverty — especially rural (Appalachia), elderly, minorities, migrant workers, Native Americans on reservations.\n- **Racial inequality**: Black median family income ~55% of white; Black unemployment roughly 2x white.\n- **Gender inequality**: few married middle-class women worked for wages; those who did faced unequal pay and limited fields.\n- **Deindustrialization** of Northeast/Midwest began in 1960s-70s as factories moved to Sunbelt and abroad.\n- Cities lost tax base and political power; urban crises built by late 1960s.",
    keyIdeas: [
      "Postwar boom + GI Bill + FHA/VA mortgages + Interstate Highway Act (1956) enabled suburban middle class.",
      "Sunbelt migration shifted population to the South and West.",
      "Consumer culture: TV, credit cards, malls, fast food.",
      "Redlining and housing discrimination structured racial inequality.",
      "Ike warned of military-industrial complex (1961).",
    ],
    commonMistakes: [
      "Treating postwar prosperity as universal — racial and regional gaps were severe.",
      "Missing Interstate Highway Act as both defense and commerce policy.",
      "Skipping the role of the GI Bill in class expansion.",
    ],
    workedExample: {
      prompt:
        "Briefly explain ONE specific way federal policy shaped American society after World War II.",
      solution:
        "The Servicemen's Readjustment Act (GI Bill) of 1944 provided returning veterans with tuition support, low-interest home loans, and unemployment payments, sending about 8 million veterans to college between 1944 and 1956 and enabling millions to purchase suburban homes through federally backed mortgages. Combined with FHA and VA lending, the GI Bill helped build a mass homeownership middle class — but discriminatory administration, especially in Southern states, and federal redlining of Black neighborhoods systematically excluded most Black veterans from these benefits, entrenching a racial wealth gap that persisted into the 21st century.",
    },
  },
  "8.5": {
    id: "8.5",
    title: "Culture After 1945",
    summary:
      "Postwar culture mixed consumer conformity and conservative values with countercurrents — Beat Generation, rock 'n' roll, feminist critique — that set up 1960s upheaval.",
    lesson:
      "**Conformity and its critics**:\n- **David Riesman's *The Lonely Crowd* (1950)** diagnosed 'other-directed' postwar Americans.\n- **William Whyte's *The Organization Man* (1956)** critiqued corporate culture.\n- **C. Wright Mills's *The Power Elite* (1956)** identified intertwined military, corporate, and political elites.\n\n**Religion**:\n- Church attendance peaked in 1950s (roughly half of Americans attended weekly).\n- 'Under God' added to Pledge of Allegiance (1954); 'In God We Trust' national motto (1956) — Cold War religiosity.\n- **Billy Graham** led evangelical revival.\n\n**Rock 'n' Roll**:\n- Emerged mid-1950s combining R&B, country, and gospel.\n- **Elvis Presley**, **Chuck Berry**, **Little Richard**, **Buddy Holly**.\n- Scandalized traditionalists with sexual imagery and racial integration (Black and white performers/audiences).\n- Teen subculture emerged as demographic force.\n\n**Beat Generation**:\n- **Jack Kerouac's *On the Road* (1957)**, **Allen Ginsberg's 'Howl' (1956)**, **William Burroughs's *Naked Lunch* (1959)**.\n- Rejected materialism, celebrated spontaneity, drugs, Eastern spirituality, sexuality.\n- Prefigured 1960s counterculture.\n\n**Television**:\n- Idealized domesticity: *I Love Lucy* (1951-57), *Leave It to Beaver*, *Father Knows Best*, *The Honeymooners*, *The Ed Sullivan Show*.\n- Also: crime dramas, westerns, variety shows.\n- Television integrated American consumer culture — everyone watched the same things.\n- News coverage emerged (Murrow, later Cronkite); civil rights and Vietnam footage would shape politics.\n\n**Gender and the family**:\n- **Baby Boom** plus suburban ideology idealized homemaker mom + breadwinner dad + children.\n- **Betty Friedan's *The Feminine Mystique* (1963)** — diagnosed 'the problem that has no name' — suburban middle-class women's frustration.\n- Feminist movement of 1960s-70s grew from this critique.\n\n**Sexuality**:\n- **Kinsey Reports (1948, 1953)** shocked public with frank study of American sexual behavior; revealed much wider range of practices than publicly acknowledged.\n\n**Literature and arts**:\n- **J.D. Salinger's *The Catcher in the Rye* (1951)**: adolescent alienation.\n- **Flannery O'Connor**, **Ralph Ellison (*Invisible Man*, 1952)**, **James Baldwin**, **Saul Bellow**, **Norman Mailer**.\n- **Abstract Expressionism** (Jackson Pollock, Mark Rothko, Willem de Kooning) — American art center of gravity moved from Paris to New York.\n\n**Film**:\n- Hollywood studio system challenged by TV and antitrust rulings.\n- **Method acting** (Marlon Brando, *On the Waterfront*, 1954).\n- Youth-oriented films (*Rebel Without a Cause*, 1955).\n\n**Juvenile delinquency panic**:\n- Comic books (Fredric Wertham's *Seduction of the Innocent*, 1954) blamed for crime.\n- Comics Code Authority (1954) tamed the industry.\n\n**Race in culture**:\n- Jackie Robinson integrated Major League Baseball (1947).\n- Black musicians shaped rock 'n' roll; but systemic racism persisted.\n- Civil rights imagery (Emmett Till 1955, Little Rock 1957) broadcast nationally on TV.\n\nPostwar culture thus contained both the conformist veneer and the oppositional seeds that would explode in the 1960s.",
    keyIdeas: [
      "Conformity + consumerism on the surface; Beat, rock, Feminine Mystique underneath.",
      "Cold War religiosity: 'Under God,' 'In God We Trust.'",
      "TV standardized national culture.",
      "Beat Generation prefigured counterculture.",
      "Friedan's Feminine Mystique (1963) launched second-wave feminism.",
    ],
    commonMistakes: [
      "Treating 1950s as uniformly conservative — countercurrents were already present.",
      "Missing the role of television in nationalizing culture.",
      "Skipping Kinsey Reports as cultural shock.",
    ],
  },
  "8.6": {
    id: "8.6",
    title: "Early Steps in the Civil Rights Movement (1940s and 1950s)",
    summary:
      "Between 1945 and 1960 desegregation of the military, Brown v. Board (1954), Montgomery Bus Boycott (1955-56), and Little Rock (1957) laid the foundation for the mass civil rights movement of the 1960s.",
    lesson:
      "The civil rights movement did not begin in 1954 — but between 1945 and 1960 a series of breakthroughs built the base for later mass mobilization.\n\n**Military and federal**:\n- **Truman's Executive Order 9981 (July 1948)**: desegregated the armed forces; integration largely complete by Korean War.\n- **Executive Order 9980 (1948)**: desegregated federal workforce.\n- **President's Committee on Civil Rights** (1946) report *To Secure These Rights* (1947) recommended sweeping reforms.\n\n**NAACP legal strategy**:\n- **Charles Hamilton Houston** and **Thurgood Marshall** led NAACP Legal Defense Fund to attack segregation step by step.\n- Early victories: **Smith v. Allwright (1944)** — struck down white primaries; **Shelley v. Kraemer (1948)** — barred enforcement of racial housing covenants; **Sweatt v. Painter (1950)** — struck down 'separate but equal' in professional schools.\n\n**Brown v. Board of Education (May 17, 1954)**:\n- Consolidated five cases challenging segregated schools.\n- **Chief Justice Earl Warren** wrote the unanimous opinion: 'separate educational facilities are inherently unequal.'\n- Overturned **Plessy v. Ferguson (1896)** in education.\n- **Brown II (1955)**: ordered desegregation 'with all deliberate speed' — vague phrase enabled massive Southern resistance.\n\n**Massive Resistance**:\n- **Southern Manifesto (1956)**: 101 Southern members of Congress pledged to oppose Brown.\n- School closures (Prince Edward County, Virginia, 1959-64); white private 'segregation academies'.\n- States passed 'interposition' and 'nullification' resolutions.\n\n**Little Rock (Sept 1957)**:\n- Arkansas Governor Orval Faubus used National Guard to block 9 Black students from Central High School.\n- **Eisenhower federalized the Guard and sent 101st Airborne** troops to escort 'Little Rock Nine.'\n- Federal enforcement of desegregation established.\n\n**Emmett Till (Aug 1955)**:\n- 14-year-old Black boy from Chicago lynched in Mississippi for allegedly whistling at a white woman.\n- **Mamie Till Bradley** insisted on open-casket funeral; *Jet* magazine published the photograph.\n- Acquittal of killers despite clear evidence galvanized Black activists nationwide — especially young ones like Rosa Parks.\n\n**Montgomery Bus Boycott (Dec 1955-Dec 1956)**:\n- **Rosa Parks** arrested for refusing to give up her bus seat (Dec 1, 1955) — a planned act of civil disobedience by a longtime NAACP activist.\n- **Montgomery Improvement Association** led by young **Martin Luther King Jr.** organized a 381-day boycott.\n- **Jo Ann Robinson** and the Women's Political Council printed and distributed the boycott flyer overnight.\n- **Browder v. Gayle (1956)**: Supreme Court upheld ruling that segregated buses were unconstitutional.\n- Boycott ended in victory. King emerged as national figure.\n\n**Southern Christian Leadership Conference (SCLC, 1957)**: King and other Black ministers; nonviolent direct action rooted in Black churches.\n\n**Civil Rights Acts of 1957 and 1960**:\n- First federal civil rights legislation since Reconstruction.\n- Created Civil Rights Commission and Civil Rights Division at DOJ.\n- Weakly enforced voting protections.\n\n**Lunch counter sit-ins (Feb 1960)**:\n- **Four Black college students** at Woolworth's in Greensboro, NC started sit-ins.\n- Spread across the South — thousands arrested.\n- Led to **Student Nonviolent Coordinating Committee (SNCC, April 1960, Ella Baker's mentorship)** — the student wing of the movement.\n\nBy 1960, the legal and moral groundwork was laid for mass mobilization.",
    keyIdeas: [
      "Truman desegregated military (1948); NAACP won step-by-step legal victories 1944-54.",
      "Brown v. Board (1954) overturned Plessy in education.",
      "Emmett Till's lynching (1955) galvanized Black activists.",
      "Montgomery Bus Boycott (1955-56) made King a national leader.",
      "Sit-ins (1960) ushered in direct action phase.",
    ],
    commonMistakes: [
      "Treating the civil rights movement as starting with MLK — Houston, Marshall, Baker, and many activists preceded him.",
      "Missing that Brown II's 'deliberate speed' language allowed delay.",
      "Skipping Emmett Till and Little Rock.",
    ],
    workedExample: {
      prompt:
        "Briefly explain ONE specific way the civil rights movement advanced between 1945 and 1960.",
      solution:
        "The Supreme Court's 1954 decision in Brown v. Board of Education unanimously ruled that racially segregated public schools were 'inherently unequal,' overturning the 1896 Plessy v. Ferguson doctrine of 'separate but equal' in education. Though enforcement was slow — the 1955 Brown II decision's 'all deliberate speed' language allowed Southern states to resist for years, prompting President Eisenhower to send the 101st Airborne to Little Rock, Arkansas in 1957 — the ruling established a constitutional basis for dismantling Jim Crow and inspired grassroots activism, including the Montgomery Bus Boycott of 1955-56 that launched Martin Luther King Jr.'s national leadership.",
    },
  },
  "8.7": {
    id: "8.7",
    title: "America as a World Power",
    summary:
      "Between 1945 and 1980 the U.S. projected power globally through alliances, covert operations, nuclear arms, the space race, and foreign aid — defining the post-WWII international order.",
    lesson:
      "**Institutions of U.S. global power**:\n\n- **Military alliances**: NATO (1949), SEATO (1954), CENTO (1955), OAS (1948, Americas), bilateral treaties with Japan (1951), South Korea (1953), Philippines, Taiwan. Roughly 40 alliance relationships by 1960s.\n- **Foreign aid**: Marshall Plan (1948-52), Point Four Program (Truman, 1949) for developing nations, Food for Peace (1954), USAID (1961).\n- **Intelligence**: **CIA (1947)** — espionage and covert operations; **NSA (1952)** for signals intelligence.\n- **Nuclear arsenal**: grew from dozens in 1945 to ~30,000 warheads by 1966. Intercontinental missiles (ICBMs), submarine-launched (SLBMs), and bombers formed the 'nuclear triad.'\n- **U.S. dollar** as global reserve currency (Bretton Woods until 1971).\n\n**Space Race**:\n- **Sputnik (Oct 1957)**: Soviet satellite shocked the U.S.\n- **NASA (1958)**; **National Defense Education Act (1958)** funded science/math/language education.\n- **Yuri Gagarin (April 1961)** — first human in space.\n- **Kennedy's moon challenge (May 1961)**: 'before this decade is out.'\n- **Apollo 11 (July 20, 1969)**: Neil Armstrong's 'one small step.'\n- Tied to Cold War prestige; demonstrated U.S. technology; spinoff technologies (microchips, integrated circuits).\n\n**CIA covert operations**:\n- **Iran (1953)**: Operation Ajax overthrew Prime Minister Mohammad Mossadegh after his oil nationalization; restored Shah Mohammad Reza Pahlavi. Contributed to 1979 Iranian Revolution.\n- **Guatemala (1954)**: PBSUCCESS overthrew democratically elected Jacobo Arbenz after land reform affected United Fruit Company.\n- **Bay of Pigs (April 1961)**: failed invasion of Cuba.\n- **Dominican Republic, Chile (1973, Allende's overthrow, CIA support for Pinochet)**.\n- **Vietnam, Laos, Cambodia** covert war expansion.\n\n**Middle East**:\n- **Recognition of Israel (May 1948)** within hours of its declaration.\n- **Eisenhower Doctrine (1957)**: U.S. aid and force to defend Middle Eastern states against communism.\n- **Six-Day War (1967)**: Israel vs. Egypt/Syria/Jordan; U.S. strengthened relationship with Israel.\n- **Yom Kippur War (1973)**: led to Arab oil embargo.\n- **OPEC oil crises (1973, 1979)**: forced U.S. to rethink energy policy.\n- **Camp David Accords (Sept 1978, Carter)**: mediated Egypt-Israel peace treaty.\n- **Iran hostage crisis (1979-81)**: 52 Americans held 444 days after Shah's fall.\n\n**Latin America**:\n- **Alliance for Progress (1961, Kennedy)**: $20B aid program for Latin America, though outcomes mixed.\n- **Dominican intervention (1965, LBJ)** to prevent leftist takeover.\n- **Allende coup (Sept 11, 1973)**: CIA-backed Chilean military overthrew Salvador Allende; Pinochet's dictatorship followed.\n- **Panama Canal Treaties (1977, Carter)**: returned canal to Panama by 1999.\n\n**Asia beyond Vietnam**:\n- **Occupation of Japan** (1945-52) transformed Japan into democratic ally and economic powerhouse.\n- **Nixon's opening to China (Feb 1972)**: began process of normalization, completed under Carter (1979).\n- **Taiwan**: U.S. maintained defense commitment despite 1979 recognition of PRC.\n\n**Africa**:\n- Decolonization sped up after 1960.\n- U.S. pushed mix of anti-communist support for authoritarian regimes and limited democracy promotion.\n\n**Transition by 1980**: Carter's human rights rhetoric met Soviet invasion of Afghanistan (Dec 1979) and Iran hostage crisis; Reagan would bring more aggressive Cold War posture.",
    keyIdeas: [
      "Alliances, foreign aid, nuclear arsenal, CIA, NASA all projected power.",
      "Space race: Sputnik (1957) → Apollo 11 (1969).",
      "CIA covert operations: Iran 1953, Guatemala 1954, Chile 1973 shaped Third World politics.",
      "Middle East: Israel recognition 1948; 1973-79 oil crises reshaped energy politics.",
      "Panama Canal Treaties (1977) + Camp David (1978) = Carter's signature achievements.",
    ],
    commonMistakes: [
      "Forgetting covert operations as a core Cold War instrument.",
      "Treating the space race as only technical — it was strategic prestige.",
      "Missing the 1973 oil embargo's role in reshaping U.S. politics and energy policy.",
    ],
  },
  "8.8": {
    id: "8.8",
    title: "The Vietnam War",
    summary:
      "The Vietnam War (1955-75) escalated from French defeat to massive U.S. commitment after Gulf of Tonkin (1964); Tet (1968) shifted opinion; Nixon's Vietnamization and Paris Accords (1973) ended U.S. involvement; Saigon fell in 1975.",
    lesson:
      "**Origins**:\n- Vietnamese independence movement under **Ho Chi Minh** (Viet Minh) fought French colonial rule and Japanese occupation.\n- **French defeat at Dien Bien Phu (May 1954)**; **Geneva Accords (July 1954)** divided Vietnam at 17th parallel, with promised national elections in 1956.\n- U.S. refused to sign Accords; backed anti-Communist Republic of Vietnam (South) under **Ngo Dinh Diem**.\n- Elections never held.\n\n**Eisenhower and Kennedy (1954-63)**:\n- 'Domino theory' — if Vietnam fell, other Asian countries would.\n- Eisenhower sent advisors (~900 by 1960).\n- **Kennedy escalated advisors to ~16,000** by 1963.\n- Diem unpopular (Catholic in Buddhist country); Buddhist monks self-immolated (1963).\n- **Diem assassinated in CIA-backed coup (Nov 1963)** — three weeks before JFK.\n\n**LBJ escalation (1964-68)**:\n- **Gulf of Tonkin Incident (Aug 1964)**: alleged North Vietnamese attacks on U.S. destroyers (facts disputed).\n- **Gulf of Tonkin Resolution (Aug 1964)**: Congress authorized force without formal war declaration — only 2 senators (Morse, Gruening) voted against.\n- **Operation Rolling Thunder (1965-68)**: sustained bombing of North Vietnam.\n- **Ground troops**: 184,000 (end of 1965) → **536,000 peak (1968)**.\n- **Viet Cong (National Liberation Front)** — Southern Communist insurgents — fought U.S./ARVN with support from North.\n- **Tet Offensive (Jan-Feb 1968)**: VC/NVA simultaneous attacks on cities and bases across South Vietnam. Tactical defeat for Communists but strategic shock — American public saw the war as unwinnable.\n- Walter Cronkite declaration (Feb 1968): war 'mired in stalemate.'\n- **Johnson announced he would not seek reelection (March 31, 1968)**.\n\n**Antiwar movement**:\n- Teach-ins (1965+), campus protests, Students for a Democratic Society (SDS).\n- **Selective Service** (draft) — middle-class college deferments pushed disproportionate burden onto poor and working-class, including Black, Latino, and white men.\n- **Muhammad Ali** refused induction (1967).\n- Mass marches on Washington (1967, 1969, 1971).\n- **Kent State (May 4, 1970)**: Ohio National Guard killed 4 students at antiwar protest; **Jackson State (May 14, 1970)**: Mississippi police killed 2 Black students — received much less attention.\n- **Pentagon Papers (June 1971)**: Daniel Ellsberg leaked classified history of war showing government lies.\n- **New York Times Co. v. United States (1971)**: Supreme Court allowed papers' publication.\n\n**Nixon and Vietnamization (1969-73)**:\n- **Vietnamization**: turn fighting over to ARVN while U.S. withdrew.\n- U.S. troops declined from ~540,000 (1969) to ~25,000 (1972).\n- **Secret bombing of Cambodia (1969-73)** and **invasion (April 1970)** — expanded the war.\n- **Laos invasion (1971)**.\n- Paris Peace Talks dragged.\n- **'Christmas Bombing' of Hanoi (Dec 1972)**.\n- **Paris Peace Accords (Jan 1973)**: U.S. withdrew combat forces; prisoners returned; ceasefire (broken immediately).\n\n**War Powers Resolution (Nov 1973)**:\n- Over Nixon's veto — required president to notify Congress within 48 hours of committing troops and withdraw after 60-90 days without congressional authorization.\n\n**Fall of Saigon (April 30, 1975)**:\n- North Vietnamese forces overran South Vietnam after Congress cut aid.\n- Iconic helicopter evacuation from U.S. embassy roof.\n- Vietnam reunified under Communist government; Khmer Rouge took Cambodia; Laos followed.\n- **~58,000 American dead**; ~1-3 million Vietnamese dead; hundreds of thousands of Cambodians killed by Khmer Rouge genocide.\n\n**Refugees**: ~1.5M Vietnamese fled; large Southeast Asian population arrived in the U.S.\n\n**Domestic consequences**:\n- **'Vietnam Syndrome'** — reluctance to commit U.S. ground forces overseas.\n- Cynicism about government and media.\n- Drafted end of the draft (1973).\n- Lingering divisions over veterans' treatment; Vietnam Veterans Memorial (1982).",
    keyIdeas: [
      "Origins in French colonialism + Cold War domino theory.",
      "LBJ escalation after Gulf of Tonkin (1964); Tet (Jan-Feb 1968) turned opinion.",
      "Nixon's Vietnamization and expansion of war into Cambodia/Laos.",
      "Paris Accords (1973) + Saigon's fall (1975) ended U.S. involvement.",
      "War Powers Resolution (1973) tried to limit future commitments.",
    ],
    commonMistakes: [
      "Treating Tet as a U.S. military defeat — it was a tactical win but strategic political loss.",
      "Missing Cambodia and Laos as extensions of the war.",
      "Forgetting Pentagon Papers and their constitutional significance.",
    ],
    workedExample: {
      prompt:
        "Briefly explain ONE specific way the Vietnam War affected the United States.",
      solution:
        "The Tet Offensive of January-February 1968 — in which Viet Cong and North Vietnamese forces launched coordinated attacks on cities across South Vietnam — was a tactical defeat for the Communist forces but a decisive political shock in the United States, because Americans had been told the war was being won. Veteran news anchor Walter Cronkite's February 1968 declaration that the war was 'mired in stalemate,' combined with nightly television coverage of combat and mounting casualties, collapsed public support; Lyndon Johnson announced at the end of March 1968 that he would not seek reelection, opening the door to Nixon's election on a promise to end the war.",
    },
  },
  "8.9": {
    id: "8.9",
    title: "The Great Society",
    summary:
      "LBJ's Great Society (1964-65) — Civil Rights Act, Voting Rights Act, Medicare, Medicaid, Immigration Act, ESEA, War on Poverty — was the largest federal expansion since the New Deal.",
    lesson:
      "After Kennedy's assassination (Nov 22, 1963) brought Lyndon Johnson to the presidency, he pushed a massive legislative agenda using his political skills, Kennedy's memory, and the 1964 landslide.\n\n**1964 landslide**:\n- LBJ vs. **Barry Goldwater** (R-AZ), conservative who had opposed Civil Rights Act.\n- LBJ 61% of popular vote; carried huge Democratic majorities into Congress.\n- Goldwater's few states (Deep South + Arizona) foreshadowed regional realignment.\n\n**Civil Rights Act of 1964**:\n- **Prohibited discrimination** in employment, public accommodations, and federally funded programs based on race, color, religion, sex, or national origin.\n- **Title VII** created the EEOC.\n- Passed after longest Senate filibuster in history (57 days) broken by cloture.\n- LBJ to aide: 'We have lost the South for a generation.'\n\n**War on Poverty**:\n- **Economic Opportunity Act (1964)**: Office of Economic Opportunity; Job Corps; VISTA; Head Start; Legal Services; Community Action Program.\n- Aimed to give the poor 'hand up, not handout.'\n\n**Voting Rights Act of 1965**:\n- Passed after Selma-to-Montgomery march and 'Bloody Sunday' (March 7, 1965).\n- **Banned literacy tests** and authorized federal registrars in jurisdictions with histories of discrimination.\n- Black voter registration surged: in Mississippi from 6% (1964) to 60% (1968).\n- **Shelby County v. Holder (2013)** later struck down the preclearance formula.\n\n**Medicare and Medicaid (1965)**:\n- **Medicare**: federal health insurance for Americans 65+.\n- **Medicaid**: federal-state program for low-income Americans.\n- Both remain foundational to U.S. health care.\n\n**Immigration and Nationality Act (Hart-Celler, 1965)**:\n- **Abolished the national origins quota system** of 1924.\n- Established preference for family reunification and skills.\n- Reopened immigration from Asia, Latin America, Africa; transformed American demographics in following decades.\n\n**Elementary and Secondary Education Act (1965)**:\n- First major federal aid to public schools (~$1B).\n- Title I funded schools in low-income areas.\n\n**Higher Education Act (1965)**: federal student loans, Pell Grants (via later amendments).\n\n**Other Great Society measures**:\n- **Housing and Urban Development Act (1965)**; Department of HUD created.\n- **Department of Transportation (1966)**.\n- **Clean Air Act (1963)**, **Water Quality Act (1965)**, **Wilderness Act (1964)**, **Highway Beautification Act (1965)**.\n- **National Endowment for the Arts/Humanities (1965)**.\n- **Public Broadcasting Act (1967)** → NPR (1970), PBS (1970).\n- **Consumer protection**: **Ralph Nader's *Unsafe at Any Speed* (1965)** → National Traffic and Motor Vehicle Safety Act (1966).\n\n**Achievements and limits**:\n- **Poverty rate** fell from ~22% (1959) to ~12% (1969).\n- Medicare/Medicaid transformed health coverage for elderly and poor.\n- Voting Rights Act transformed Southern politics.\n- But: Vietnam War costs ballooned, competing with domestic spending.\n- Inflation began climbing by late 1960s.\n- Urban riots (Watts 1965, Detroit and Newark 1967) revealed limits of federal programs.\n- **Kerner Commission Report (1968)**: 'Our nation is moving toward two societies, one Black, one white — separate and unequal.'\n- Conservative backlash grew — culminating in 1968 Nixon victory.\n\n**Why it matters**: the Great Society, together with the New Deal, defined federal government's active role in American life for a half century. Many programs persist today.",
    keyIdeas: [
      "Civil Rights Act (1964) and Voting Rights Act (1965) ended Jim Crow in law.",
      "Medicare/Medicaid (1965) established federal health insurance for elderly and poor.",
      "Immigration Act (1965) abolished national-origins quotas.",
      "War on Poverty cut poverty rate from ~22% to ~12% in a decade.",
      "Urban riots and Vietnam War costs constrained the Great Society's later years.",
    ],
    commonMistakes: [
      "Confusing the Civil Rights Act (1964) with the Voting Rights Act (1965) — different laws, different years, different focuses.",
      "Missing the 1965 Immigration Act's long demographic consequences.",
      "Treating the Great Society as a failure — it achieved major, enduring gains.",
    ],
    workedExample: {
      prompt:
        "Briefly explain ONE specific way the Great Society expanded the federal government's role in American life.",
      solution:
        "The Social Security Amendments of 1965 created Medicare, a federal health insurance program for Americans aged 65 and older, and Medicaid, a federal-state program providing health coverage for low-income Americans. By guaranteeing that elderly and poor Americans could access hospital and physician care regardless of private insurance status, Medicare and Medicaid permanently extended the federal government's responsibility for social welfare beyond the New Deal's Social Security pensions into direct health care provision — a role that has only expanded since, with the Affordable Care Act of 2010 building explicitly on the 1965 framework.",
    },
  },
  "8.10": {
    id: "8.10",
    title: "The African American Civil Rights Movement (1960s)",
    summary:
      "Sit-ins, Freedom Rides, March on Washington, Selma, and federal civil rights/voting rights legislation dismantled legal Jim Crow between 1960 and 1968, even as Black Power, urban riots, and King's assassination marked new phases.",
    lesson:
      "**Direct action phase (1960-65)**:\n\n- **Sit-ins (Feb 1960, Greensboro NC)** and subsequent mass movement of college students across the South.\n- **SNCC (April 1960)** formed under Ella Baker's guidance.\n- **Freedom Rides (May 1961)**: CORE-organized interracial bus trips through the South to desegregate interstate travel. Attacked in Anniston and Birmingham. Federal intervention followed **Boynton v. Virginia (1960)** ruling against segregation in interstate travel.\n- **Albany Movement (1961-62)**: protests in Georgia; mostly a defeat because of savvy police response.\n- **Birmingham Campaign (April-May 1963)**: MLK arrested, wrote **'Letter from Birmingham Jail.'** Police Commissioner Bull Connor used fire hoses and police dogs on children (**Children's Crusade**) — televised. Pressured Kennedy to propose civil rights bill.\n- **Medgar Evers** assassinated (June 1963, Mississippi NAACP leader).\n- **March on Washington (Aug 28, 1963)**: ~250,000 people; MLK's 'I Have a Dream' speech.\n- **16th Street Baptist Church bombing (Sept 15, 1963, Birmingham)**: killed four girls.\n- **JFK assassination (Nov 22, 1963)**; LBJ picked up civil rights legislation.\n\n- **Civil Rights Act (July 1964)**.\n\n- **Mississippi Freedom Summer (1964)**: SNCC voter registration drive.\n- **Three activists murdered (Goodman, Chaney, Schwerner, June 1964)**; bodies found in August — federal prosecution.\n- **Mississippi Freedom Democratic Party (MFDP, Fannie Lou Hamer)** challenged all-white Mississippi delegation at 1964 Democratic convention; offered token compromise; rejected.\n\n- **Selma campaign (early 1965)**: voter registration.\n- **Bloody Sunday (March 7, 1965)**: state troopers attacked marchers crossing Edmund Pettus Bridge — televised.\n- **Selma-to-Montgomery march (March 21-25, 1965)**.\n- **Voting Rights Act (Aug 1965)**.\n\n**Key organizations**:\n- **SCLC** (MLK, church-based) — nonviolent direct action.\n- **SNCC** (students, grassroots).\n- **CORE** (Congress of Racial Equality, interracial).\n- **NAACP** (older, legal).\n- **Urban League**.\n\n**Black Power phase (1965-68)**:\n- **Malcolm X** — NOI minister, then independent after 1964 hajj; critiqued nonviolence and integrationism; assassinated **Feb 21, 1965**.\n- **Watts riots (Aug 1965)** — days of rioting in Los Angeles following police incident.\n- **Stokely Carmichael's 'Black Power' speech (June 1966)**: called for Black political and economic self-determination.\n- **Black Panthers (founded Oct 1966, Oakland)** — Huey Newton and Bobby Seale; armed self-defense, community programs (free breakfast, health clinics). FBI's **COINTELPRO** infiltrated and sabotaged.\n- **Detroit and Newark riots (1967)**; **Kerner Commission Report (1968)** — 'two societies, separate and unequal.'\n\n**MLK's later campaigns**:\n- **'Beyond Vietnam' speech (April 4, 1967)**: broke with LBJ, criticized the war.\n- **Poor People's Campaign** (1968 plan).\n- **Memphis sanitation workers strike** — 'I Am a Man' placards.\n- **MLK assassinated April 4, 1968** by James Earl Ray at Lorraine Motel in Memphis.\n- Riots in 100+ cities followed; Washington burned.\n\n**Fair Housing Act (April 1968)**: banned housing discrimination; rushed through after King's assassination.\n\n**Robert F. Kennedy assassinated (June 5, 1968)** after winning California primary.\n\nBy 1968, legal Jim Crow was dismantled, but de facto segregation in housing, schools, employment, and policing remained — and the movement had fragmented.",
    keyIdeas: [
      "1960-65 direct-action phase: sit-ins, Freedom Rides, Birmingham, March on Washington, Selma.",
      "Civil Rights Act (1964) + Voting Rights Act (1965) ended legal Jim Crow.",
      "Malcolm X assassinated (1965); Black Power phase began with Carmichael (1966).",
      "Black Panthers (1966), Detroit/Newark riots (1967), Kerner Commission (1968).",
      "MLK assassinated April 4, 1968; Fair Housing Act followed.",
    ],
    commonMistakes: [
      "Presenting MLK and Malcolm X as simple opposites — both evolved; Malcolm moved toward broader coalition before his death.",
      "Treating Black Power as uniformly violent — Panthers ran clinics and breakfast programs.",
      "Missing Fannie Lou Hamer and the MFDP at 1964 convention.",
    ],
    workedExample: {
      prompt:
        "Briefly explain ONE specific way civil rights activists challenged segregation between 1960 and 1965.",
      solution:
        "In February 1960, four Black college students sat down at a segregated lunch counter at a Woolworth's store in Greensboro, North Carolina and refused to leave when denied service, launching a wave of nonviolent sit-ins that spread to more than 70 cities within two months. The tactic — staged by students organized into the Student Nonviolent Coordinating Committee from April 1960 — desegregated many Southern lunch counters through sustained economic pressure and national media coverage, and helped build the grassroots direct-action movement that would lead to the Civil Rights Act of 1964.",
    },
  },
  "8.11": {
    id: "8.11",
    title: "The Civil Rights Movement Expands",
    summary:
      "Latino, Native American, Asian American, women's, and LGBTQ rights movements organized in the 1960s-70s, drawing on Black civil rights methods to demand equality and recognition.",
    lesson:
      "The Black civil rights movement inspired and overlapped with other rights movements.\n\n**Chicano Movement**:\n- **Cesar Chavez** and **Dolores Huerta** founded the **United Farm Workers (UFW, 1962-66)**.\n- **Delano Grape Strike (1965-70)**: 5-year strike + national boycott forced growers to sign contracts.\n- **'La Causa'** linked labor and civil rights.\n- **Chicano Moratorium (1970, Los Angeles)**: antiwar march; journalist Rubén Salazar killed.\n- **MEChA** (Chicano student organization, 1969).\n- **Tijerina's land grant activism** in New Mexico; **Corky Gonzales's 'I Am Joaquín'** poem (1967).\n- Bilingual education expansion; **Lau v. Nichols (1974)** required schools to address language needs.\n\n**Native American rights**:\n- **Termination Policy (1953-68)** had sought to end tribal status; protests forced reversal.\n- **National Indian Youth Council (1961)**.\n- **Occupation of Alcatraz (Nov 1969-June 1971)**: Indians of All Tribes seized the closed federal prison island, claimed it under an 1868 treaty's 'surplus federal land' provision. 19 months of occupation drew national attention.\n- **American Indian Movement (AIM, 1968)** under Dennis Banks, Russell Means.\n- **Trail of Broken Treaties (1972)**: march on Washington; occupied BIA headquarters.\n- **Wounded Knee II (Feb-May 1973)**: AIM occupied Wounded Knee, SD; 71-day standoff with federal agents.\n- **Indian Self-Determination Act (1975)**.\n- **American Indian Religious Freedom Act (1978)**.\n\n**Women's movement**:\n- **Betty Friedan's *Feminine Mystique* (1963)** — launched second wave.\n- **President's Commission on the Status of Women (1961, Eleanor Roosevelt)** report.\n- **Equal Pay Act (1963)**, **Title VII of Civil Rights Act (1964)**, **Title IX (Education Amendments 1972)** — banned sex discrimination in federally funded education.\n- **National Organization for Women (NOW, 1966)** led by Friedan.\n- **Ms. magazine (1971, Gloria Steinem)**.\n- **Equal Rights Amendment (ERA)**: passed Congress 1972; needed 38 states; only 35 ratified by 1982 deadline (later revived politically). **Phyllis Schlafly's STOP ERA** led opposition.\n- **Roe v. Wade (Jan 1973)**: Supreme Court recognized constitutional right to abortion under right to privacy (14th Amendment); reshaped politics for decades.\n- **Our Bodies, Ourselves (1973, Boston Women's Health Book Collective)**.\n- **Radical feminism** and women of color feminism critiqued mainstream NOW.\n\n**LGBTQ rights**:\n- **Mattachine Society (1950), Daughters of Bilitis (1955)** — early homophile organizations.\n- **Stonewall riots (June 28, 1969)**: NYC patrons of the Stonewall Inn fought back against police raid; traditionally marked as start of modern gay rights movement.\n- First Pride march (1970).\n- **Gay Liberation Front (1969-72)**.\n- **American Psychiatric Association removed homosexuality from DSM (1973)**.\n- **Harvey Milk** elected San Francisco supervisor (1977); assassinated 1978.\n- **AIDS crisis** began early 1980s (Period 9).\n\n**Asian American movement**:\n- **'Asian American'** term coined by activist Yuji Ichioka (1968).\n- Student strikes at SF State (1968) and UC Berkeley led to Ethnic Studies departments.\n- **Redress movement for Japanese American internees** (1970s-80s); **Civil Liberties Act of 1988** provided apology and reparations.\n\n**Disability rights**:\n- **Section 504 of Rehabilitation Act (1973)**: banned discrimination by recipients of federal funds.\n- **Education for All Handicapped Children Act (1975)** — later IDEA.\n- Independent Living Movement (Ed Roberts, Berkeley 1972).\n- Led to **Americans with Disabilities Act (1990)** in Period 9.\n\n**Environmental movement**:\n- **Rachel Carson's *Silent Spring* (1962)** warned of pesticide damage.\n- **Earth Day (April 22, 1970)**: ~20M Americans participated.\n- **EPA (1970, Nixon)**; **Clean Air Act (1970), Clean Water Act (1972), Endangered Species Act (1973)**.\n\nThese movements together remade American citizenship — and generated the backlash that conservative politics would mobilize in the 1970s-80s.",
    keyIdeas: [
      "Chicano movement: UFW, Delano, Chicano Moratorium.",
      "Native: Alcatraz (1969), AIM, Wounded Knee II (1973).",
      "Women: Title IX (1972), Roe (1973), ERA (unratified).",
      "LGBTQ: Stonewall (1969), APA DSM change (1973), Harvey Milk.",
      "Disability rights + environmental movement also expand in this era.",
    ],
    commonMistakes: [
      "Treating these as isolated from the Black movement — they often shared leaders and tactics.",
      "Missing Title IX's impact on women's education and athletics.",
      "Skipping Stonewall as the gay rights movement's turning point.",
    ],
    workedExample: {
      prompt:
        "Briefly explain ONE specific way the civil rights methods of the 1960s inspired another social movement.",
      solution:
        "Cesar Chavez and Dolores Huerta applied the nonviolent direct-action tactics of Martin Luther King Jr.'s movement to labor organizing among California farmworkers, founding the United Farm Workers in the mid-1960s and leading the Delano Grape Strike from 1965 to 1970. Combined with a national consumer boycott of grapes and public marches and fasts, the campaign pressured growers into signing union contracts and inspired Chicano movement activism across the Southwest — including the Chicano Moratorium antiwar march of 1970 — demonstrating how the legal and moral framework created by the Black freedom movement could be extended to labor and ethnic rights struggles.",
    },
  },
  "8.12": {
    id: "8.12",
    title: "Youth Culture of the 1960s",
    summary:
      "The counterculture, antiwar movement, and student New Left reshaped American culture around challenges to authority, sexual mores, drug laws, and political engagement.",
    lesson:
      "**Demographic backdrop**: Baby Boom generation came of age in the 1960s — 76M people, a massive demographic bulge. By 1970 ~50% of Americans were under 30.\n\n**Student New Left**:\n- **Students for a Democratic Society (SDS, 1960)**.\n- **Port Huron Statement (1962, Tom Hayden)**: called for 'participatory democracy,' rejected Cold War liberalism.\n- **Free Speech Movement (UC Berkeley, 1964)**: students protested university restrictions on political activity.\n- **Teach-ins** on Vietnam (1965+).\n- Antiwar mass marches 1967, 1969, 1971.\n- Campus occupations (Columbia 1968).\n- Kent State shootings (May 1970).\n\n**Counterculture**:\n- Rejection of materialism, conformity, and mainstream sexual/drug mores.\n- **Hippies** in Haight-Ashbury (San Francisco) and other communities.\n- **Timothy Leary's 'Turn on, tune in, drop out'** (LSD advocacy).\n- **Communes** and alternative lifestyles.\n- **Rock music**: Beatles (British Invasion from 1964), Bob Dylan's folk-to-rock shift, Jefferson Airplane, Grateful Dead, Jimi Hendrix, Janis Joplin.\n- **Woodstock (Aug 1969, upstate NY)**: 400,000+ at music festival; symbolized counterculture peak.\n- **Altamont (Dec 1969)**: Hells Angels security killed an attendee — symbolized the 'death of the Sixties' for some commentators.\n- **Drugs**: marijuana, LSD, later harder drugs.\n\n**Sexual revolution**:\n- **Birth control pill** (FDA-approved 1960) separated sex from reproduction for many.\n- **Griswold v. Connecticut (1965)**: right to contraception for married couples (later extended to unmarried).\n- **Eisenstadt v. Baird (1972)**; **Roe v. Wade (1973)**.\n- Premarital sex and cohabitation became more common.\n- Gay rights movement (Stonewall 1969).\n- AIDS crisis of 1980s would dramatically reshape sexual culture.\n\n**Generation gap**:\n- Parents' WWII generation and children's Baby Boom generation diverged sharply on politics, sex, drugs, music, clothes.\n- 'Don't trust anyone over 30.'\n\n**Cultural products**:\n- **New Journalism** (Hunter S. Thompson's gonzo journalism; Tom Wolfe, Joan Didion).\n- Film: *The Graduate* (1967), *Easy Rider* (1969), *Bonnie and Clyde* (1967).\n- Television: *The Smothers Brothers*, *Laugh-In*.\n\n**Women and counterculture**:\n- Sexual revolution cut multiple ways — 'free love' sometimes meant pressure, not liberation.\n- Robin Morgan's essay 'Goodbye to All That' (1970) broke from male-dominated New Left.\n- Women of color within movements often fought racism from white activists.\n\n**Environmentalism**:\n- Earth Day (April 22, 1970) mobilized ~20M — a largely youth-driven event.\n\n**Aftermath**:\n- Counterculture's influence on music, fashion, attitudes toward authority, and sexuality endured.\n- Mainstream absorption in the 1970s (long hair, jeans, rock music all went corporate).\n- Conservative backlash framed the counterculture as permissive decline.\n\n**Limits**:\n- Counterculture was largely white and middle-class; Black, Latino, Native movements had parallel but different trajectories.\n- Drug use casualties; burnout.\n- 'Silent majority' (Nixon's phrase, 1969) of Americans who resented counterculture voted Republican 1968-72.",
    keyIdeas: [
      "Baby Boom produced massive youth cohort reshaping 1960s culture.",
      "New Left (SDS, Port Huron Statement) called for participatory democracy.",
      "Counterculture mixed music, drugs, sexuality, communes.",
      "Pill (1960) + Griswold (1965) + Roe (1973) = sexual revolution + reproductive rights.",
      "Nixon's 'silent majority' mobilized conservative backlash.",
    ],
    commonMistakes: [
      "Treating the counterculture as uniformly liberating — it could be sexist, racist, and chaotic.",
      "Confusing the New Left (political) with the counterculture (cultural) — overlap but not identical.",
      "Missing the backlash the counterculture provoked.",
    ],
  },
  "8.13": {
    id: "8.13",
    title: "The Environment and Natural Resources from 1968 to 1980",
    summary:
      "Environmental crises and activism produced the EPA, Clean Air and Water Acts, Endangered Species Act, and — after two 1970s oil crises — major federal energy policy changes.",
    lesson:
      "**Rising environmental awareness**:\n- **Rachel Carson's *Silent Spring* (1962)** warned about DDT and other pesticides.\n- **Santa Barbara oil spill (Jan 1969)** and **Cuyahoga River fire (June 1969)** dramatized pollution.\n- **Earth Day (April 22, 1970)** brought ~20M Americans into the streets.\n\n**Federal legislation (Nixon era, bipartisan)**:\n- **National Environmental Policy Act (NEPA, 1970)** — required environmental impact statements.\n- **Environmental Protection Agency (EPA)** created December 1970.\n- **Clean Air Act (1970)** — major amendments regulated emissions, set ambient air quality standards.\n- **Clean Water Act (1972)**.\n- **Endangered Species Act (1973)**.\n- **Occupational Safety and Health Act (OSHA, 1970)** — workplace safety.\n- **Consumer Product Safety Act (1972)** → Consumer Product Safety Commission.\n- **DDT banned (1972)**.\n- **Safe Drinking Water Act (1974)**.\n- **Toxic Substances Control Act (1976)**.\n- **Resource Conservation and Recovery Act (1976)** — hazardous waste.\n- **Superfund / CERCLA (1980)** — Carter-era law to clean up hazardous sites.\n\n**Energy crises**:\n\n- **1973 Oil Crisis**: OPEC (Organization of the Petroleum Exporting Countries) imposed embargo on U.S. and others for supporting Israel in Yom Kippur War.\n  - Gas prices quadrupled.\n  - Long lines, rationing, rising inflation.\n  - Showed U.S. vulnerability to foreign energy supplies.\n- **1979 Oil Crisis**: Iranian Revolution disrupted Iranian oil production.\n  - Gas prices rose ~50%.\n  - Carter's 'malaise' speech (July 1979) called for energy conservation and national purpose.\n\n**Energy policy responses**:\n- **55 mph national speed limit (1974)** to save fuel.\n- **Corporate Average Fuel Economy (CAFE) standards (1975)** — mandated auto fuel economy gains.\n- **Strategic Petroleum Reserve (1975)**.\n- **Department of Energy (1977)**.\n- **National Energy Act (1978)**: energy conservation incentives.\n- **Windfall Profits Tax on oil companies (1980)**.\n\n**Nuclear power**:\n- Expanded as alternative to fossil fuels.\n- **Three Mile Island accident (March 1979, PA)**: partial core meltdown; evacuation of nearby communities; no immediate deaths but devastated public confidence.\n- After TMI, no new U.S. nuclear plants ordered for decades.\n\n**Conservation and preservation**:\n- **Alaska National Interest Lands Conservation Act (1980)**: protected 100M acres of Alaska.\n- **Wilderness Act of 1964** (earlier) had created wilderness preservation system.\n\n**Critics and controversies**:\n- Industries pushed back on regulatory costs.\n- Environmental justice movement began (1970s-80s): **Warren County, NC PCB landfill protests (1982)** — Black residents objected to toxic dump in their community, coined 'environmental racism.'\n- Anti-regulatory politics increasingly potent in 1970s; Reagan would campaign on deregulation.\n\nBy 1980, the federal environmental regulatory state existed — a major and largely bipartisan legacy of the Nixon-Carter years.",
    keyIdeas: [
      "Earth Day (1970) + NEPA + EPA (1970) launched the modern environmental regulatory state.",
      "Clean Air (1970), Clean Water (1972), Endangered Species Act (1973), Superfund (1980) — major bipartisan laws.",
      "1973 and 1979 oil crises forced energy policy changes (CAFE, 55 mph, DOE).",
      "Three Mile Island (1979) ended nuclear expansion.",
      "Environmental justice movement emerged in 1970s-80s.",
    ],
    commonMistakes: [
      "Crediting only Democrats for environmental laws — EPA and Clean Air Act came under Nixon.",
      "Conflating the two oil crises — 1973 (embargo) and 1979 (Iranian Revolution).",
      "Missing environmental justice as a distinct strand.",
    ],
  },
  "8.14": {
    id: "8.14",
    title: "Society in Transition",
    summary:
      "Between 1968 and 1980 stagflation, Watergate, deindustrialization, social conflict, and the collapse of New Deal liberalism set up the rise of modern conservatism.",
    lesson:
      "The period 1968-80 was marked by convergent crises that undermined postwar liberal consensus.\n\n**Economic troubles**:\n- **Stagflation**: simultaneous high unemployment AND high inflation — previously thought impossible under Keynesian theory.\n- Causes: Vietnam War spending + Great Society expansion without tax increases → inflation; two oil shocks (1973, 1979); declining productivity; increased foreign competition.\n- **Nixon ended Bretton Woods gold standard (Aug 1971)**: dollar floated; ended the 1944 monetary order.\n- **Wage and price controls (1971-74)**: Nixon's effort to stop inflation.\n- **Deindustrialization**: factories closed in Northeast and Midwest ('Rust Belt'); steel, auto, textile industries shrank.\n- **Energy crises** (see 8.13).\n- **Inflation** reached 13% in 1979.\n\n**Political crises**:\n- **1968 — convulsion year**: Tet Offensive, LBJ withdrawal, MLK and RFK assassinations, Chicago Democratic Convention police riot, Nixon victory.\n- **Nixon** (1969-74):\n  - **Southern Strategy**: Republican outreach to white Southerners unhappy with civil rights; transformed the South from Democratic to Republican stronghold.\n  - **'Silent majority'** rhetoric.\n  - **New Federalism**: revenue-sharing with states.\n  - **Expanded regulations** paradoxically (EPA, OSHA, Title IX, Clean Air Act).\n  - **Détente + opening to China (1972)**.\n  - **Vietnam withdrawal (1973)**.\n\n**Watergate**:\n- **June 17, 1972**: Five men arrested burglarizing Democratic National Committee HQ at Watergate office complex in Washington DC.\n- Investigations by **Washington Post**'s Woodward and Bernstein (Deep Throat, later identified as FBI's Mark Felt).\n- **Senate Watergate Committee (1973)**: televised hearings revealed White House taping system.\n- **Saturday Night Massacre (Oct 1973)**: Nixon fired special prosecutor Archibald Cox; Attorney General Richardson resigned.\n- **United States v. Nixon (July 1974)**: Supreme Court ordered Nixon to release tapes.\n- **House Judiciary Committee voted three articles of impeachment**; Nixon's political support collapsed.\n- **Nixon resigned (Aug 9, 1974)** — only U.S. president to resign.\n- **Gerald Ford** assumed presidency; **pardoned Nixon (Sept 1974)** — controversial move.\n- Effects: lasting public cynicism; **War Powers Resolution (1973)**; **Freedom of Information Act amendments (1974)**; **Ethics in Government Act (1978)**.\n\n**Ford (1974-77)**: Inherited stagflation, Vietnam's fall, energy crisis. Lost 1976 to Carter.\n\n**Carter (1977-81)**:\n- Outsider image (peanut farmer, evangelical, 'I'll never lie to you').\n- Deregulation of airlines (1978), trucking (1980), banking (1980) — began the deregulatory turn conservatives would accelerate.\n- Successes: Panama Canal treaties (1977), Camp David (1978), Department of Education (1979).\n- Struggles: stagflation, energy crises, **Iran hostage crisis (Nov 1979-Jan 1981)**, Soviet invasion of Afghanistan (Dec 1979).\n- 1980 primary challenge from Ted Kennedy; general-election defeat by Reagan.\n\n**Conservative movement rise**:\n- **Goldwater movement (1964)**, even in defeat, built infrastructure.\n- **Neoconservatives** (Irving Kristol, Norman Podhoretz) — former liberals moved right.\n- **Religious right**: **Jerry Falwell's Moral Majority (1979)** mobilized evangelicals on abortion (after Roe 1973), ERA, school prayer, gay rights.\n- **Tax revolt**: **Proposition 13 (California, 1978)** capped property taxes; model for similar laws.\n- **Think tanks**: Heritage Foundation (1973), Cato Institute (1977), American Enterprise Institute (expanded).\n- **Supply-side economics** (Laffer, Kemp) — cutting taxes would raise revenue.\n\n**1980 election**:\n- Reagan vs. Carter (plus John Anderson independent).\n- Reagan 489-49 electoral votes; Republican Senate majority for first time since 1954.\n- Realignment that dominated politics to 2008 (and contested since).\n\nPeriod 8 ends with the Cold War still active, American power constrained, and the New Deal consensus giving way to a new conservative era.",
    keyIdeas: [
      "Stagflation + oil shocks + deindustrialization undermined New Deal consensus.",
      "Watergate: burglary (1972) → tapes → Nixon resignation (Aug 1974).",
      "Carter's presidency torn by inflation, Iran hostage crisis, Afghanistan.",
      "Conservative movement: religious right, tax revolt, supply-side economics.",
      "Reagan's 1980 victory marked political realignment.",
    ],
    commonMistakes: [
      "Missing Nixon's paradoxically activist domestic policy (EPA, wage/price controls).",
      "Confusing Watergate with other 1970s scandals.",
      "Forgetting the religious right's 1970s mobilization as key to 1980 realignment.",
    ],
    workedExample: {
      prompt:
        "Briefly explain ONE specific reason American politics shifted toward conservatism in the 1970s.",
      solution:
        "Stagflation — the simultaneous high unemployment and high inflation that afflicted the U.S. economy throughout the 1970s after Vietnam War spending and the 1973 OPEC oil embargo — undermined public confidence in Keynesian economic management and the Democratic Party that had dominated since the New Deal. Combined with the Iran hostage crisis of 1979-81, Watergate's aftershock of public distrust, and the rise of the religious right through Jerry Falwell's Moral Majority (1979) in response to Roe v. Wade and other social changes, these economic and cultural shocks enabled Ronald Reagan's landslide 1980 victory on a platform of tax cuts, deregulation, and Cold War toughness.",
    },
  },
  "8.15": {
    id: "8.15",
    title: "Continuity and Change in Period 8",
    summary:
      "Period 8 combined dramatic change (end of Jim Crow, expansion of rights, Cold War escalation and détente) with deep continuities (racial inequality, gender hierarchies, Cold War suspicions).",
    lesson:
      "**Change**:\n- **Civil rights**: legal segregation dismantled (Brown 1954, Civil Rights Act 1964, Voting Rights Act 1965, Fair Housing Act 1968).\n- **Women's rights**: entry to workforce, Title IX, Roe v. Wade, greater educational parity.\n- **LGBTQ movement** emerged (Stonewall 1969, APA DSM 1973).\n- **Native American** self-determination after decades of termination policy.\n- **Federal government expansion**: Great Society programs, environmental regulation, energy policy, enforcement agencies.\n- **Demographic**: Baby Boom, Sunbelt migration, post-1965 immigration.\n- **Economic restructuring**: from industrial to service, from unionized to non-unionized, from heavy manufacturing to Sunbelt growth.\n- **Foreign policy**: superpower role; alliances; Vietnam defeat.\n- **Political realignment**: Solid Democratic South broke; Republicans became dominant in presidential elections; conservatism ascendant by 1980.\n\n**Continuity**:\n- **Racial inequality**: Black poverty, unemployment, and wealth gaps persisted even after legal Jim Crow ended.\n- **De facto segregation** in housing, schools, neighborhoods (especially after white flight to suburbs).\n- **Patriarchy**: though softened, gender pay gaps and domestic expectations persisted.\n- **Cold War anti-Communism** dominated foreign policy throughout.\n- **Military-industrial complex** remained a structural feature.\n- **Poverty** fell but remained.\n- **Conservative social values** retained strong base, especially in South and Midwest.\n- **Federal-state tensions** continued, often reframed as 'states' rights' on civil rights and regulation.\n\n**Evaluating the period**:\n- **Liberal view**: dramatic moral and legal progress — Jim Crow ended, women's and other movements expanded rights.\n- **Conservative critique**: federal government overreached, undermined traditional institutions; social disorder.\n- **Radical critique**: reforms didn't touch deep structural inequalities.\n- All three framings found political voice.\n\n**Looking ahead to Period 9**:\n- Reagan's election marks the end of New Deal liberal dominance.\n- Cold War will end with USSR's collapse (1991).\n- Globalization, neoliberal economics, cultural backlash, and political polarization will define Period 9.\n- Civil rights gains will be contested but mostly preserved; Supreme Court will narrow some.",
    keyIdeas: [
      "Change: civil rights, women's/LGBTQ/Native movements, federal expansion, political realignment.",
      "Continuity: racial inequality, patriarchy, Cold War, poverty, military-industrial complex.",
      "Different political framings (liberal, conservative, radical) each captured real features.",
      "Period 8 sets up Period 9's conservative era and globalization.",
    ],
    commonMistakes: [
      "Telling only the progress story without the continuities.",
      "Missing political realignment from Solid Democratic South to Republican Sunbelt.",
      "Ignoring the structural persistence of racial inequality after legal Jim Crow.",
    ],
  },

  // =========================================================================
  // PERIOD 9 — 1980-Present
  // =========================================================================
  "9.1": {
    id: "9.1",
    title: "Contextualizing Period 9",
    summary:
      "Since 1980 the U.S. has experienced conservative ascendancy, the end of the Cold War, globalization, demographic change, technology revolution, terrorism and two long wars, financial crisis, and deep political polarization.",
    lesson:
      "Period 9 is the shortest but fastest-moving APUSH period — and the one most connected to students' lived experience.\n\n**Conservative ascendancy (1980s+)**:\n- Reagan (1981-89): tax cuts, deregulation, military buildup, Supreme Court shift.\n- Republican dominance in presidential elections 1968-88 (except Carter); Democrats adapt under Clinton (1993-2001).\n- Polarization deepens through 1990s-2010s; partisan media (Fox News 1996; MSNBC; social media).\n\n**End of the Cold War**:\n- Soviet reforms (perestroika, glasnost) under Gorbachev.\n- Fall of Berlin Wall (Nov 1989); Soviet Union dissolved (Dec 1991).\n- U.S. as sole superpower briefly; new global role contested.\n\n**Globalization**:\n- Trade agreements (NAFTA 1994, WTO 1995, China in WTO 2001).\n- Outsourcing, rise of China as manufacturing power, Rust Belt decline.\n- Financial integration — Wall Street's global reach.\n\n**Technology revolution**:\n- PC (1980s), Internet (1990s+, commercial 1995), smartphones (2007+), social media (Facebook 2004, Twitter 2006, TikTok 2017).\n- Remade economy, politics, culture, media.\n\n**Demographic change**:\n- Post-1965 immigration reshaped population — Latino and Asian American populations grew dramatically.\n- Aging white population; projected non-Hispanic white minority mid-21st century.\n- Same-sex marriage legalized (Obergefell 2015).\n\n**Wars and terrorism**:\n- **9/11 (2001)** transformed foreign and domestic policy.\n- Afghanistan War (2001-21); Iraq War (2003-11).\n- Patriot Act, surveillance expansion.\n\n**Economic crises**:\n- **Great Recession (2007-09)**: worst since Great Depression; government bailouts, Dodd-Frank regulation.\n- Wealth inequality growing.\n\n**Political realignment and polarization**:\n- Obama (2009-17) — first Black president; signed Affordable Care Act (2010).\n- Trump (2017-21, 2025-) — outsider populism.\n- COVID-19 pandemic (2020+) reshaped economy, politics.\n- Rising movements: Black Lives Matter, #MeToo, climate activism, conservative populism.",
    keyIdeas: [
      "Conservative ascendancy from Reagan through Bush-era.",
      "End of Cold War (1991) left U.S. as sole superpower.",
      "Globalization transformed economy; deindustrialization intensified.",
      "9/11 and wars reshaped foreign policy and civil liberties.",
      "Great Recession, Obama/Trump era polarization.",
    ],
    commonMistakes: [
      "Treating Period 9 as just 'recent' without structure — it has clear phases.",
      "Missing the tech and demographic shifts as first-order changes.",
      "Skipping the 1991 Soviet collapse.",
    ],
  },
  "9.2": {
    id: "9.2",
    title: "Reagan and Conservatism",
    summary:
      "Reagan (1981-89) cut taxes, deregulated, built up the military, and reshaped the Supreme Court; his coalition combined economic conservatives, religious right, Cold War hawks, and Sunbelt voters.",
    lesson:
      "**The Reagan coalition**:\n- **Economic conservatives** wanting tax cuts and deregulation (Milton Friedman, Chicago school).\n- **Religious right** (Moral Majority under Jerry Falwell, later Christian Coalition under Pat Robertson) on abortion, school prayer, 'family values.'\n- **Cold War hawks** favoring military buildup and anti-Communist activism.\n- **Neoconservatives** (former liberals, often Jewish intellectuals, worried about détente's concessions).\n- **Reagan Democrats**: working-class whites attracted by cultural conservatism and promises to restore economic pride.\n- **Southern and Sunbelt whites**: completing the partisan realignment begun by Nixon.\n\n**Reaganomics / Supply-side**:\n- **Economic Recovery Tax Act (1981)**: cut top marginal rate from 70% to 50%; further cut to 28% in 1986.\n- Argued tax cuts would spur investment and increase revenue (**Laffer curve**).\n- **Military buildup**: defense spending rose ~50% in real terms; $1.6T over 5 years; Strategic Defense Initiative (SDI, 'Star Wars') 1983.\n- **Deficits ballooned**: $79B (1981) → $221B (1986).\n- **Tax Reform Act (1986)**: simplified tax code, closed many loopholes.\n- **Recession (1981-82)**: Fed Chairman Volcker raised interest rates to break inflation; unemployment reached 10.8%.\n- **Recovery (1983+)**: long expansion, inflation tamed, unemployment fell.\n\n**Deregulation**:\n- Air traffic controllers strike (**PATCO, Aug 1981**): Reagan fired 11,345 striking controllers — signal that labor would not be accommodated.\n- Deregulation of trucking, airlines (begun under Carter) continued.\n- Savings and Loan deregulation led to **S&L crisis (late 1980s)** — ~$160B federal bailout.\n- Environmental enforcement weakened; EPA appointments cut staff.\n\n**Social policy**:\n- Cuts to welfare and social spending.\n- **War on Drugs** expanded; crack cocaine penalties far harsher than powder (1986 Anti-Drug Abuse Act) — racially disparate impact.\n- AIDS crisis: Reagan silent until 1985; activist pressure (ACT UP, 1987) forced policy changes.\n- **Immigration Reform and Control Act (IRCA, 1986)**: legalized ~3M undocumented immigrants; criminalized hiring undocumented workers.\n\n**Judicial appointments**:\n- **Sandra Day O'Connor (1981)**: first woman on Supreme Court.\n- **Antonin Scalia (1986)**: conservative jurist.\n- **Anthony Kennedy (1988)**: after Bork's failed 1987 nomination.\n- **William Rehnquist** elevated to Chief Justice (1986).\n- Hundreds of lower-court appointments shifted federal judiciary rightward.\n\n**Foreign policy (see 9.3 for Cold War end)**:\n- **'Evil empire' speech (1983)**.\n- Covert operations in Central America: support for Contras in Nicaragua against Sandinistas; backing of Salvadoran government against leftist guerrillas.\n- **Iran-Contra scandal (1985-87)**: administration sold arms to Iran (despite embargo) and diverted proceeds to fund Nicaraguan Contras (despite Boland Amendment prohibition). Oliver North, John Poindexter, and others convicted; Reagan's role ambiguous.\n- **Grenada invasion (1983)**.\n- **Libya bombing (1986)**.\n- **Beirut barracks bombing (Oct 1983)**: 241 U.S. Marines killed; U.S. withdrew from Lebanon.\n\n**Cultural legacy**:\n- **'Morning in America'** advertising (1984 reelection) — optimism, patriotism.\n- **MTV**, cable news growth, televangelists.\n- **Reagan Democrats** and rightward shift in popular politics.\n\n**Criticisms**:\n- Inequality grew — top 1% share of income rose substantially.\n- Deficits (despite promise to reduce them) and national debt tripled.\n- HIV/AIDS response inadequate.\n- Environmental and labor rollbacks.\n\n**George H.W. Bush (1989-93)**:\n- Ran on 'kinder, gentler' continuation of Reagan.\n- **Americans with Disabilities Act (1990)** — bipartisan.\n- **Clean Air Act Amendments (1990)**.\n- Broke 'read my lips: no new taxes' pledge — cost him politically.\n- **Gulf War (1991)**: liberated Kuwait after Iraq's invasion; 540,000 U.S. troops; coalition victory in ~6 weeks.\n- Lost 1992 to Clinton amid recession.",
    keyIdeas: [
      "Reagan coalition: economic conservatives, religious right, Cold War hawks, Reagan Democrats, Sunbelt.",
      "Tax cuts (1981, 1986) + military buildup = tripled national debt.",
      "PATCO firings (1981) signaled labor's weakening position.",
      "Judicial appointments shifted federal courts rightward for decades.",
      "Iran-Contra scandal damaged but did not end Reagan's presidency.",
    ],
    commonMistakes: [
      "Accepting the Laffer curve claim as empirically demonstrated — it is contested.",
      "Missing inequality as a key Reagan-era trend.",
      "Forgetting Iran-Contra scandal.",
    ],
    workedExample: {
      prompt:
        "Briefly explain ONE specific way conservative politics reshaped the United States during the 1980s.",
      solution:
        "The 1981 Economic Recovery Tax Act, signed by President Ronald Reagan, cut the top marginal federal income tax rate from 70 percent to 50 percent, with further cuts in the 1986 Tax Reform Act bringing it to 28 percent. Combined with a major increase in defense spending — about 50 percent higher in real terms over five years — these supply-side tax policies sharply reduced federal revenues, tripled the national debt from about $900 billion in 1980 to more than $2.6 trillion by 1988, and contributed to widening income inequality, signaling a durable shift in federal fiscal policy away from the New Deal / Great Society expansion.",
    },
  },
  "9.3": {
    id: "9.3",
    title: "The End of the Cold War",
    summary:
      "Between 1985 and 1991 Soviet reforms under Gorbachev, Reagan and Bush's negotiation, popular uprisings in Eastern Europe, and Soviet economic collapse ended the Cold War and dissolved the USSR.",
    lesson:
      "**Crisis of Soviet system (early 1980s)**:\n- Economic stagnation, oil-price drop, arms-race costs.\n- Afghanistan quagmire (Soviets invaded Dec 1979; U.S. armed mujahideen via Pakistan).\n- Aging gerontocracy: Brezhnev (1982), Andropov (1984), Chernenko (1985).\n\n**Gorbachev's reforms (1985-91)**:\n- **Glasnost** ('openness') — relaxed censorship, allowed public debate.\n- **Perestroika** ('restructuring') — limited market reforms.\n- Withdrew from Afghanistan (1988-89).\n- Refused to use force to save Eastern European Communist regimes — key to the 1989 revolutions.\n\n**Reagan's shift**:\n- Early hard-line ('evil empire,' SDI) gave way to negotiation.\n- **Reykjavik Summit (Oct 1986)** nearly agreed on elimination of nuclear weapons.\n- **INF Treaty (Dec 1987)**: eliminated intermediate-range nuclear missiles.\n- 'Mr. Gorbachev, tear down this wall' (Berlin, June 1987) — speech.\n\n**1989 — year of revolutions in Eastern Europe**:\n- **Poland (June 1989)**: Solidarity won elections.\n- **Hungary (Sept 1989)**: opened border with Austria.\n- **East Germany (Oct-Nov 1989)**: protests, government collapsed.\n- **Berlin Wall opened (Nov 9, 1989)** — defining image.\n- **Czechoslovakia (Nov-Dec 1989)**: Velvet Revolution.\n- **Romania (Dec 1989)**: Ceaușescu executed.\n- **Bulgaria**: government fell.\n\n**Reunification of Germany (Oct 1990)**:\n- Bush (George H.W.) and Baker worked with Gorbachev and Kohl.\n- Germany unified within NATO (controversial for Russians later).\n\n**Gulf War (1990-91)**:\n- Iraq's Saddam Hussein invaded Kuwait (Aug 1990).\n- U.S. built massive coalition including Soviets.\n- **Operation Desert Storm (Jan-Feb 1991)**: 6-week air war + 100-hour ground war liberated Kuwait.\n- Bush declared 'New World Order' of cooperative international politics.\n- Cold War clearly over as U.S. and USSR cooperated.\n\n**Soviet collapse (1991)**:\n- **Baltic states** (Lithuania, Latvia, Estonia) declared independence 1990-91.\n- **August coup attempt (Aug 1991)**: hardliners tried to oust Gorbachev; Boris Yeltsin led resistance from Russian Parliament.\n- After coup failed, republics declared independence in rapid succession.\n- **Ukraine voted for independence (Dec 1, 1991)**.\n- **Soviet Union dissolved (Dec 25, 1991)**; Gorbachev resigned. Yeltsin led new **Russian Federation**.\n\n**Post-Cold War U.S. posture**:\n- **'Peace dividend'**: defense spending cuts in 1990s.\n- **NATO expansion**: Czech Republic, Hungary, Poland (1999); Baltic states (2004); others.\n- **Russian collapse and recovery**: Yeltsin's chaotic 1990s; Putin's consolidation from 2000.\n- **Unipolar moment**: U.S. as sole superpower, briefly.\n\n**Continuing strategic rivalries**:\n- Russia's 2008 invasion of Georgia, 2014 annexation of Crimea, 2022 full invasion of Ukraine — ended the post-Cold War honeymoon.\n- China's rise as economic and military power.\n\nThe Cold War's end created enormous expectations that were only partially met. The structure of international politics is still being reshuffled.",
    keyIdeas: [
      "Gorbachev's glasnost/perestroika + refusal to use force enabled 1989 revolutions.",
      "INF Treaty (1987) + fall of Berlin Wall (1989) + Soviet dissolution (1991) ended Cold War.",
      "German reunification within NATO completed 1990.",
      "Gulf War (1991) demonstrated post-Cold War U.S. primacy.",
      "NATO expansion + Russian recovery set stage for renewed tensions.",
    ],
    commonMistakes: [
      "Giving Reagan sole credit — Gorbachev's choices were decisive.",
      "Confusing 1989 (Wall falls) with 1991 (Soviet Union dissolves).",
      "Missing Bush (elder) and Baker's role in reunification and Gulf War.",
    ],
    workedExample: {
      prompt:
        "Briefly explain ONE specific reason the Cold War ended between 1985 and 1991.",
      solution:
        "Mikhail Gorbachev, who became Soviet general secretary in 1985, launched reforms — glasnost (openness) and perestroika (economic restructuring) — intended to revive a stagnant Soviet economy. Crucially, he also refused to use Soviet military force to preserve Communist regimes in Eastern Europe, allowing the 1989 revolutions in Poland, Hungary, East Germany, Czechoslovakia, and Romania to unfold. Combined with U.S.-Soviet arms control (the 1987 INF Treaty) and economic pressure that Moscow could no longer match, these choices dismantled the Warsaw Pact bloc and, by December 1991, the Soviet Union itself.",
    },
  },
  "9.4": {
    id: "9.4",
    title: "A Changing Economy",
    summary:
      "Globalization, deindustrialization, financialization, and technological change reshaped the American economy since 1980, producing both prosperity and sharp inequality, and culminating in the 2007-09 Great Recession.",
    lesson:
      "**Globalization**:\n- **NAFTA (1994)**: Clinton signed — eliminated most U.S.-Canada-Mexico tariffs.\n- **WTO (1995)**: replaced GATT; regulated global trade.\n- **China's WTO entry (2001)**: accelerated manufacturing shift.\n- Trade deficit with China grew steadily.\n- Opponents (unions, Ross Perot's 'giant sucking sound' in 1992 debate) warned of job losses.\n\n**Deindustrialization**:\n- Manufacturing employment fell from ~18M (1980) to ~12M (2015).\n- Rust Belt collapse: steel, auto, textile industries shrank.\n- Communities hollowed out; labor force participation and life expectancy fell in some regions.\n- Some manufacturing jobs replaced by warehouse, trucking, service work.\n\n**Financialization**:\n- Financial sector grew from ~4% of GDP (1980) to ~8%+ (2000s).\n- Wall Street deregulation: **Gramm-Leach-Bliley Act (1999)** repealed Glass-Steagall, allowing commercial and investment banking combinations.\n- Complex financial products (derivatives, mortgage-backed securities).\n- Hedge funds, private equity grew.\n\n**Technology boom**:\n- PC revolution (1980s): Microsoft, Apple, Intel.\n- **Internet commercialization (1995+)**: Netscape IPO (1995); Amazon (1994); Google (1998).\n- **Dot-com bubble (1995-2000)** and crash (2000-02).\n- Post-bubble, tech giants emerged: Google, Apple (iPhone 2007), Facebook (2004), Amazon, later Netflix.\n- Smartphones (2007+) and social media transformed daily life.\n\n**Economic growth and inequality**:\n- **1990s boom**: strong growth, low unemployment; Clinton balanced budgets (1998-2001 surpluses).\n- Inequality grew: top 1% share of income doubled from ~10% (1980) to ~20%+ by 2010s.\n- CEO-to-worker pay ratio rose from ~30:1 (1980) to 300+:1 (2010s).\n- **Wage stagnation** for median workers; productivity gains captured by capital.\n\n**Housing bubble and financial crisis**:\n- 2001-06: loose monetary policy, subprime mortgage lending, mortgage-backed securities boom.\n- **Housing peak (2006)**; prices began falling.\n- **Bear Stearns collapsed (March 2008)**; **Lehman Brothers bankruptcy (Sept 15, 2008)** triggered panic.\n- **TARP (Oct 2008)**: $700B bank bailout (Bush signed; Obama continued).\n- Federal Reserve cut rates to near zero; 'quantitative easing' began.\n- **Auto industry bailout (2008-09)**: saved GM and Chrysler.\n- Unemployment peaked ~10% (Oct 2009); recovery slow.\n- **Great Recession (Dec 2007-June 2009)**: longest since Great Depression.\n\n**Policy response**:\n- **American Recovery and Reinvestment Act (2009)**: $787B stimulus (tax cuts, infrastructure, state aid).\n- **Dodd-Frank Act (2010)**: major financial reform — Consumer Financial Protection Bureau, Volcker rule, resolution authority for failing banks, stress tests.\n- Ongoing debate over whether reforms adequate.\n\n**Longer-term trends**:\n- **Student debt**: $1.7T+ outstanding by 2020s.\n- **Health care costs**: rising as share of GDP — 18%+.\n- **Corporate concentration**: in many industries (tech, airlines, retail).\n- **Gig economy**: Uber, Lyft, delivery apps — workers often classified as contractors without benefits.\n- **Climate economics**: costs of disasters rising; renewable energy growing; Inflation Reduction Act (2022) provided $369B for clean energy.\n\n**Pandemic economy (2020-23)**:\n- COVID-19 caused sharpest short-term downturn in U.S. history (spring 2020); massive federal stimulus (CARES Act 2020, American Rescue Plan 2021).\n- Inflation surged in 2021-22 to highest rates since early 1980s.\n- Remote work, urban-rural dynamics shifted.\n\nThe post-1980 economy combines dynamism and disruption — rising prosperity for some alongside deep insecurity for others.",
    keyIdeas: [
      "NAFTA (1994), WTO (1995), China WTO (2001) accelerated globalization.",
      "Deindustrialization of Rust Belt + rise of tech sector + financialization.",
      "Inequality grew sharply from 1980 onward.",
      "Great Recession (2007-09) triggered by housing/mortgage crisis.",
      "Dodd-Frank (2010) attempted major financial reform.",
    ],
    commonMistakes: [
      "Treating globalization as inevitable — it was policy-driven.",
      "Missing the scale of the 2008 crisis.",
      "Skipping tech industry's concentration and power.",
    ],
    workedExample: {
      prompt:
        "Briefly explain ONE specific way the U.S. economy changed since 1980.",
      solution:
        "Trade agreements such as the North American Free Trade Agreement (1994) and China's 2001 entry into the World Trade Organization accelerated the globalization of U.S. manufacturing: American manufacturing employment fell from roughly 18 million workers in 1980 to about 12 million by 2015, hollowing out Rust Belt communities in Ohio, Michigan, and Pennsylvania. While tech, finance, and service industries grew dramatically over the same period — producing new wealth concentrated in coastal metros — the geographic and class divide this transformation created has reshaped American politics, underlying the appeal of both Bernie Sanders's 2016 primary campaign and Donald Trump's protectionist 'America First' platform.",
    },
  },
  "9.5": {
    id: "9.5",
    title: "Migration and Immigration in the 1990s and 2000s",
    summary:
      "Post-1965 immigration transformed American demographics, dominated by Latin American and Asian immigrants; debates over undocumented immigration, border enforcement, and citizenship became central to politics.",
    lesson:
      "**Scale and composition**:\n- Foreign-born share of U.S. population: 4.7% (1970) → 13.6% (2020) — highest since early 20th century.\n- By 2020, ~45 million foreign-born residents; of whom ~11 million undocumented.\n- Sources: **Latin America** (especially Mexico, Central America, Caribbean) and **Asia** (China, India, Philippines, Vietnam, Korea) dominant.\n- **Hispanic/Latino** population rose from ~6% (1970) to ~19% (2020) — now the largest minority group.\n- **Asian American** population rose from ~1% (1970) to ~7% (2020) — fastest growing.\n\n**Key legal developments**:\n- **Immigration Reform and Control Act (IRCA, 1986, Reagan)**:\n  - Legalized ~3 million undocumented immigrants (amnesty).\n  - Criminalized hiring undocumented workers (employer sanctions).\n  - Enforcement weak; undocumented population grew again.\n- **Immigration Act of 1990**: raised total legal immigration, introduced diversity visa lottery and H-1B visas.\n- **Illegal Immigration Reform and Immigrant Responsibility Act (1996, Clinton)**: expanded grounds for deportation.\n- **DREAM Act**: proposed since 2001 to legalize undocumented youth brought as children; never passed.\n- **DACA (Deferred Action for Childhood Arrivals, 2012, Obama executive action)**: protection from deportation for 'Dreamers' — contested in courts.\n- **Post-9/11**: Department of Homeland Security (2003) took over immigration enforcement; ICE created.\n\n**Immigration politics**:\n- **California's Proposition 187 (1994)**: barred undocumented immigrants from public services; mostly struck down by courts. Backlash helped turn California Democratic.\n- **Arizona's SB 1070 (2010)**: required police to check immigration status; partly struck down in **Arizona v. United States (2012)**.\n- Border enforcement ramped up: ~500 miles of fencing built; Border Patrol budget grew from $263M (1990) to $4.7B+ (2020).\n- Debate: path to citizenship vs. strict enforcement; comprehensive immigration reform repeatedly failed in Congress (2006, 2007, 2013).\n- Trump administration (2017-21) emphasized enforcement: 'Muslim ban' (2017, upheld in narrower form by Supreme Court 2018), family separation at border (2018), wall construction, reduced refugee admissions, 'Remain in Mexico' policy.\n- Biden administration (2021-25) mixed approach; rising border crossings.\n\n**Internal migration**:\n- **Sunbelt growth**: continuing shift south and west. Top metros: Houston, Phoenix, Atlanta, Dallas, Tampa.\n- Rust Belt stagnation: Detroit, Cleveland, Buffalo, Pittsburgh, St. Louis lost population.\n- **Reverse Great Migration**: some Black Americans returning to the South (Atlanta, Houston, Dallas) since the 1990s.\n\n**Cultural and economic impact**:\n- **Bilingual education** debates; Spanish as second language of commerce and media (Univision, Telemundo).\n- **Immigrant entrepreneurship**: high in tech (Intel, Google, Zoom founders immigrants), retail, restaurants, small business.\n- Immigrants provided labor across the economy, especially in agriculture, construction, hospitality, health care, and tech.\n- **Remittances** from U.S. to Mexico, Central America, Philippines, India — billions annually.\n\n**Refugee populations**:\n- **Vietnam War (1975)**: ~1.5M Southeast Asians.\n- **Cuban Mariel boatlift (1980)**: 125,000.\n- **Soviet Jews (1970s-80s)**; **Bosnians (1990s)**; **Somalis, Sudanese, Iraqi (2000s)**; **Afghans (2021)**; **Ukrainians (2022)**.\n- Refugee ceiling varies with administration; Trump reduced to 15,000 (FY 2021); Biden raised.\n\n**Demographic projections**:\n- **Census Bureau projects non-Hispanic white population to fall below 50% by ~2045**.\n- Already true among children under 18 since 2020.\n- Shapes politics, marketing, education, and language of American identity.",
    keyIdeas: [
      "Post-1965 immigration reshaped demographics — Latin American and Asian dominant.",
      "IRCA (1986) amnesty; later reforms (1990, 1996) and DACA (2012).",
      "Immigration politics polarized from California's Prop 187 through Trump's wall.",
      "Sunbelt growth + Rust Belt decline + reverse Great Migration.",
      "Demographic projections: non-Hispanic white minority by ~2045.",
    ],
    commonMistakes: [
      "Treating undocumented immigrants as all Mexican — they come from many countries.",
      "Missing IRCA (1986) as the last major amnesty.",
      "Skipping internal migration patterns (Sunbelt, reverse Great Migration).",
    ],
    workedExample: {
      prompt:
        "Briefly explain ONE specific way immigration changed American society between 1980 and 2020.",
      solution:
        "The foreign-born share of the U.S. population rose from about 6 percent in 1980 to nearly 14 percent in 2020, with most new immigrants arriving from Latin America and Asia under the preference system established by the 1965 Immigration Act. This demographic shift expanded the Hispanic population to roughly 19 percent of Americans by 2020, established bilingual commerce and media, and concentrated politically in states like California, Texas, Florida, and New Jersey — reshaping debates over education, language, labor, and citizenship, while also fueling a sustained nativist response that culminated in the 2016 election of Donald Trump on an explicit anti-immigration platform.",
    },
  },
  "9.6": {
    id: "9.6",
    title: "Challenges of the 21st Century",
    summary:
      "Since 2000 the U.S. has faced terrorism and long wars, political polarization, climate change, the COVID-19 pandemic, technological disruption, and debates over the future of American democracy.",
    lesson:
      "**9/11 and the War on Terror**:\n- **September 11, 2001**: al-Qaeda hijackers flew planes into the World Trade Center (Twin Towers collapsed), the Pentagon, and a Pennsylvania field (Flight 93). ~2,977 killed.\n- **Afghanistan War (2001-21)**: overthrew Taliban; hunted al-Qaeda; longest U.S. war. **Osama bin Laden killed (May 2011)** in Pakistan raid. U.S. withdrawal (Aug 2021); Taliban retook Kabul.\n- **Iraq War (2003-11)**: Bush admin claimed WMDs (never found) and ties to al-Qaeda (never proven). Saddam Hussein overthrown; insurgency followed; **Abu Ghraib prisoner abuse** scandal (2004); eventual rise of ISIS (2014).\n- **Patriot Act (Oct 2001)**: expanded surveillance authorities.\n- **Department of Homeland Security (2003)**.\n- **Guantánamo Bay** detention facility (2002-): legal status of detainees contested; **Hamdi v. Rumsfeld (2004)**, **Rasul v. Bush (2004)**, **Boumediene v. Bush (2008)** held detainees had some constitutional rights.\n- **Snowden revelations (2013)**: NSA mass surveillance of Americans.\n\n**Obama era (2009-17)**:\n- First Black president.\n- **Affordable Care Act (2010)**: expanded insurance coverage (Medicaid expansion, subsidies, individual mandate, pre-existing conditions protection). Survived **NFIB v. Sebelius (2012)** (upheld as tax) and other challenges.\n- **Dodd-Frank (2010)**: financial reform.\n- **DACA (2012)**: deferred deportation for Dreamers.\n- **Same-sex marriage**: Obama evolved to support (2012); **Obergefell v. Hodges (2015)** — Supreme Court recognized constitutional right.\n- **Paris Climate Accord (2015)**.\n- **Iran nuclear deal (JCPOA, 2015)**.\n- **Cuba opening (2015)**.\n- **Black Lives Matter** movement began 2013 (after Trayvon Martin killing); intensified after Ferguson, MO (Michael Brown 2014), Cleveland (Tamir Rice 2014), and George Floyd (Minneapolis, May 2020).\n\n**Trump era (2017-21, 2025-)**:\n- Populist 'America First' platform.\n- **Tax Cuts and Jobs Act (2017)**: cut corporate rate from 35% to 21%.\n- Withdrew from Paris, JCPOA, TPP.\n- Trade war with China; tariffs on allies.\n- Three Supreme Court appointments (Gorsuch, Kavanaugh, Barrett) — solidified conservative majority.\n- **First impeachment (2019-20)**: Ukraine pressure. Acquitted.\n- **COVID-19 pandemic (2020-)**: ~1.2M U.S. deaths through 2024.\n- **Economic shutdown and stimulus (2020-21)**: CARES Act ($2.2T), American Rescue Plan ($1.9T, 2021).\n- **George Floyd protests (summer 2020)**: largest protests in U.S. history.\n- **2020 election**: Biden defeated Trump; Trump refused to concede.\n- **January 6, 2021 Capitol attack**: Trump supporters stormed Capitol; delayed certification.\n- **Second impeachment (Jan 2021)**: 'Incitement of insurrection'; acquitted.\n\n**Biden era (2021-25)**:\n- **American Rescue Plan (2021)**: pandemic relief.\n- **Infrastructure Investment and Jobs Act (2021)**: ~$1.2T over 10 years.\n- **Inflation Reduction Act (2022)**: ~$369B clean energy; prescription drug pricing reform.\n- **CHIPS and Science Act (2022)**: semiconductor manufacturing incentives.\n- **Afghanistan withdrawal (Aug 2021)**: chaotic.\n- **Russia invaded Ukraine (Feb 2022)**: U.S. led Western support with $100B+ in aid and weapons.\n- **Dobbs v. Jackson Women's Health (June 2022)**: Supreme Court overturned Roe v. Wade; abortion returned to states.\n- **Affirmative action struck down in college admissions (2023)**.\n- **2024 election**: Trump defeated Harris; returned to presidency.\n\n**Climate and environment**:\n- Temperature records repeatedly broken.\n- Wildfires (California, Oregon), hurricanes (Katrina 2005, Harvey 2017, Maria 2017, Ian 2022), sea-level rise.\n- **Inflation Reduction Act (2022)** largest U.S. climate legislation.\n- Trump admin disengaging from climate commitments (2017-21, again 2025-).\n\n**Polarization**:\n- Party alignment hardened; geographic sorting; partisan media.\n- Trust in institutions — press, courts, Congress, elections — declined.\n- Rising populism on both right (Trump, Tea Party 2009) and left (Occupy 2011, Sanders 2016, 2020).\n- Social media amplified both engagement and misinformation.\n\n**Technology**:\n- Smartphones (iPhone 2007) ubiquitous.\n- Social media (Facebook 2004, Twitter 2006, Instagram 2010, TikTok 2017) reshaped information and politics.\n- Artificial intelligence (ChatGPT, 2022+) raising new questions.\n\nPeriod 9 is open-ended. The questions it raises — about democracy, inequality, climate, identity — remain central to contemporary American life.",
    keyIdeas: [
      "9/11 → Afghanistan and Iraq wars, Patriot Act, DHS, Guantánamo.",
      "Obama: ACA (2010), Obergefell (2015), Iran deal, Paris climate.",
      "Trump era: tax cuts, COVID, Jan 6, Supreme Court shift.",
      "Dobbs (2022) overturned Roe; major polarization issue.",
      "COVID-19, climate change, polarization define contemporary challenges.",
    ],
    commonMistakes: [
      "Treating 9/11 only as attack without the long policy consequences (Patriot Act, wars, surveillance).",
      "Missing the Supreme Court's rightward shift under Trump appointments.",
      "Skipping January 6 as a constitutional event.",
    ],
    workedExample: {
      prompt:
        "Briefly explain ONE specific way the events of September 11, 2001 changed American foreign and domestic policy.",
      solution:
        "The September 11, 2001 attacks triggered two sustained U.S. military interventions — the Afghanistan War (2001-21) and the Iraq War (2003-11) — and produced domestic security and surveillance changes including the USA Patriot Act of October 2001, which expanded federal authority to monitor communications and financial transactions, and the creation of the Department of Homeland Security in 2003. Combined with the Guantánamo Bay detention program and the expansion of National Security Agency surveillance programs later revealed by Edward Snowden in 2013, these policies reshaped the relationship between the federal government and civil liberties and committed the United States to a global counter-terrorism posture lasting more than two decades.",
    },
  },
  "9.7": {
    id: "9.7",
    title: "Causation in Period 9",
    summary:
      "Period 9's central causal chains: conservative ascendancy + globalization + tech revolution + end of Cold War + 9/11 + financial crisis + pandemic produced the polarized, unequal, technologically saturated 21st-century America.",
    lesson:
      "**Causal chain 1 — Rise of conservatism**:\n- 1970s stagflation and cultural anxieties discredited New Deal liberalism.\n- Religious right (Moral Majority 1979), tax revolt (Prop 13 1978), Sunbelt growth, Reagan Democrats mobilized conservative coalition.\n- Reagan's 1980 and 1984 victories realigned politics.\n- Supreme Court turned conservative over decades of appointments.\n- Tea Party (2009) and Trump (2016, 2024) extended populist conservatism.\n\n**Causal chain 2 — End of Cold War → new world disorder**:\n- Soviet economic weakness + Gorbachev reforms + Eastern European revolutions → Soviet dissolution 1991.\n- U.S. unipolar moment 1991-2001.\n- 9/11 and responses (Patriot Act, Afghanistan, Iraq) defined the 2000s.\n- Russian recovery (Putin) + Chinese rise + Middle East instability produced multipolar strategic environment by 2020s.\n\n**Causal chain 3 — Globalization and deindustrialization**:\n- NAFTA (1994), WTO (1995), China WTO (2001) accelerated trade.\n- U.S. manufacturing employment fell; Rust Belt declined.\n- Wall Street, tech, and service sectors grew.\n- Inequality rose sharply.\n- Economic anxiety fueled populism (Occupy 2011, Sanders 2016, Trump 2016).\n\n**Causal chain 4 — Technology revolution**:\n- PCs (1980s), Internet (1990s+), smartphones (2007+), social media, AI.\n- Transformed economy, news media, politics, interpersonal life.\n- Concentration of tech platforms (Google, Meta, Amazon, Apple, Microsoft).\n- Information ecosystem fractured; misinformation flourished.\n\n**Causal chain 5 — Demographic change**:\n- Post-1965 immigration reshaped racial composition.\n- White Christian majority in decline; new religious and ethnic diversity.\n- Cultural and political backlash fueled immigration debates and restrictionist politics.\n\n**Causal chain 6 — Institutional stress**:\n- Congressional dysfunction + deepening partisan polarization.\n- Supreme Court's politicization intensifying (Bush v. Gore 2000; recent rulings on abortion, guns, administrative state).\n- Trust in mass media, government, courts declined.\n- January 6, 2021: most serious institutional shock since 1860s.\n\n**Continuity**:\n- Capitalism with strong federal regulatory role.\n- Constitutional framework (despite stresses).\n- Role of elections and party competition.\n- Civil rights achievements largely preserved in law.\n- Suburb/city/rural divide.\n- Racial inequality persistent.\n\n**Change**:\n- Demographics, technology, economy, international role, identity politics all transformed.\n\n**Open questions** (APUSH will not grade you on current events but will expect you to recognize continuity and change):\n- Can American democracy sustain its polarization?\n- Will U.S. remain a superpower as China rises?\n- How will climate change reshape politics and economy?\n- How will the country adapt to demographic change?\n- What is the next phase of inequality politics?\n\nPeriod 9 remains unfinished history — the story APUSH asks you to understand not as closed narrative but as accelerating, contested, still-in-progress.",
    keyIdeas: [
      "Conservative ascendancy + globalization + tech + demographic change = post-1980 America.",
      "Cold War end (1991) → unipolar moment → multipolar contest.",
      "Deindustrialization + inequality fueled populism left and right.",
      "Tech revolution reshaped economy, media, politics.",
      "Period 9 is ongoing — continuity and change both central.",
    ],
    commonMistakes: [
      "Treating Period 9 as too 'current' to analyze historically — APUSH expects analytical framing.",
      "Offering single-cause explanations (just Reagan, just 9/11, just tech).",
      "Missing the interplay of economic, cultural, technological, and demographic change.",
    ],
  },
};







