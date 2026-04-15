import type { CourseCurriculum } from "./types";

export const HISTORY_CURRICULUM: Record<string, CourseCurriculum> = {
  // =========================================================================
  // AP US HISTORY (APUSH)
  // =========================================================================
  "ap-us-history": {
    courseSlug: "ap-us-history",
    examFormat: {
      length: "3 hours 15 minutes",
      structure:
        "55 MCQ (55 min) + 3 SAQ (40 min) + 1 DBQ (60 min) + 1 LEQ (40 min).",
      scoring:
        "MCQ 40%, SAQ 20%, DBQ 25%, LEQ 15%. DBQ has 7 points, LEQ has 6, evaluated on a rubric.",
    },
    framing:
      "APUSH is the most storied AP exam. It's not about memorizing dates — it's about historical thinking: causation, continuity and change, comparison, contextualization. The DBQ is famous for requiring synthesis of 7 documents into a coherent argument. Strong students read primary sources weekly and write practice DBQs every month.",
    units: [
      {
        unitNumber: 1,
        title: "Period 1: 1491-1607",
        overview:
          "Pre-Columbian Native American societies, European contact, the Columbian Exchange, and early colonization.",
        examWeight: "4-6%",
        bigIdeas: [
          "Pre-Columbian Americas had diverse, complex societies.",
          "The Columbian Exchange transferred plants, animals, diseases, and people between hemispheres.",
          "Spanish colonization: encomienda, casta system, missions.",
          "European diseases devastated indigenous populations.",
          "African slavery began as a response to labor shortages after indigenous mortality.",
        ],
        essentials: [
          {
            heading: "Native American societies",
            body: "Diverse: Aztecs, Incas, Mississippians, Puebloans, Eastern Woodland nations. Agriculture (maize), urbanization (Cahokia), trade networks. Spiritual practices linked to the land.",
          },
          {
            heading: "Columbian Exchange",
            body: "Plants (corn, potatoes, tomatoes to Europe; wheat, sugar to Americas), animals (horses, cattle to Americas), diseases (smallpox to Americas decimated populations), people (Africans, Europeans to Americas).",
          },
          {
            heading: "Spanish conquest",
            body: "Cortés (Aztecs, 1519-21), Pizarro (Incas, 1532). Encomienda system: indigenous labor in exchange for 'protection' (effectively slavery). Casta system: racial hierarchy with peninsulares at top.",
          },
          {
            heading: "Origins of African slavery",
            body: "Indigenous labor proved insufficient due to disease mortality. Africans brought as enslaved labor on plantations. Chattel slavery emerged — a uniquely harsh, hereditary form.",
          },
        ],
        keyFacts: [
          "Columbus arrived 1492.",
          "Tenochtitlán was one of the largest cities in the world in 1500.",
          "The Columbian Exchange reshaped global diets.",
        ],
        commonMistakes: [
          "Assuming Native Americans were homogeneous.",
          "Missing the role of disease in conquest.",
          "Conflating the Columbian Exchange with the slave trade.",
        ],
        examStrategy:
          "Period 1 questions test causation and the Columbian Exchange. Period 1 is short but foundational — don't skip.",
        studyTips: [
          "Memorize the Columbian Exchange items.",
          "Know the timeline: 1491, 1492, 1519, 1521.",
          "Practice causation: why did Europeans colonize?",
        ],
      },
      {
        unitNumber: 2,
        title: "Period 2: 1607-1754",
        overview:
          "British colonization: regional differences, slavery expansion, trade, and colonial culture.",
        examWeight: "6-8%",
        bigIdeas: [
          "British colonies varied by region: New England (religion, trade), Middle (diversity), Chesapeake (tobacco, slavery), Southern (rice, large plantations).",
          "Slavery institutionalized in the South; smaller-scale in the North.",
          "Triangular trade connected New England, West Africa, and the Caribbean.",
          "Great Awakening was a religious revival.",
          "Colonies developed representative institutions.",
        ],
        essentials: [
          {
            heading: "Regional differences",
            body: "New England: Puritan religion, small farms, shipbuilding, fishing, education (Harvard 1636). Middle: religious/ethnic diversity, wheat, commerce (NYC, Philadelphia). Chesapeake: tobacco, indentured servitude → slavery. Southern: rice, indigo, large plantations.",
          },
          {
            heading: "Slavery in the colonies",
            body: "Introduced 1619 Virginia. Chattel slavery codified by 1660s-70s. Racial hierarchies established. Northern colonies had smaller enslaved populations; Southern colonies heavily dependent.",
          },
          {
            heading: "Triangular trade",
            body: "Northern/European manufactured goods → West Africa. Enslaved Africans → Caribbean/Americas. Sugar, tobacco → Europe/North America. Middle Passage: brutal conditions killing ~15% of enslaved.",
          },
          {
            heading: "Great Awakening",
            body: "1730s-40s religious revival. Jonathan Edwards, George Whitefield. Emphasized personal conversion. Created new denominations, questioned established authority — seeds of revolutionary thinking.",
          },
          {
            heading: "Colonial government",
            body: "Virginia House of Burgesses (1619). Mayflower Compact (1620). Town meetings in New England. Self-governance grew despite British neglect (salutary neglect).",
          },
        ],
        keyFacts: [
          "1619: first enslaved Africans arrived in Virginia; House of Burgesses formed.",
          "Bacon's Rebellion (1676): class conflict that foreshadowed reliance on enslaved labor.",
          "Great Awakening peaked 1740s.",
        ],
        commonMistakes: [
          "Treating all colonies as 'Puritan'.",
          "Missing the economic diversity across regions.",
          "Underestimating the Middle Passage mortality.",
        ],
        examStrategy:
          "Period 2 questions often ask about regional comparison. Know how New England, Middle, Chesapeake, and Southern differed.",
        studyTips: [
          "Build a 4-region comparison chart.",
          "Memorize key dates: 1607, 1619, 1620.",
          "Practice the Columbian Exchange's continued effects.",
        ],
      },
      {
        unitNumber: 3,
        title: "Period 3: 1754-1800",
        overview:
          "French and Indian War, road to revolution, American Revolution, Constitution, early republic.",
        examWeight: "10-17%",
        bigIdeas: [
          "French and Indian War → British debt → taxation → colonial resistance.",
          "Enlightenment ideas inspired revolutionary thought.",
          "Declaration of Independence (1776) was a philosophical break.",
          "Articles of Confederation → Constitution (1787).",
          "Washington's presidency established precedents.",
        ],
        essentials: [
          {
            heading: "Road to revolution",
            body: "French and Indian War (1754-63): British victory but heavy debt. Taxation without representation: Sugar Act, Stamp Act, Townshend Acts, Tea Act. Boston Massacre (1770), Boston Tea Party (1773). Intolerable Acts (1774). First Continental Congress (1774).",
          },
          {
            heading: "Revolutionary ideology",
            body: "Enlightenment: Locke's natural rights, Montesquieu's separation of powers. Thomas Paine's 'Common Sense' (1776). Declaration of Independence: life, liberty, pursuit of happiness; right of revolution.",
          },
          {
            heading: "The war",
            body: "1775-83. Turning point: Saratoga (1777) brought French alliance. Yorktown (1781) ended major fighting. Treaty of Paris (1783) recognized independence.",
          },
          {
            heading: "Articles of Confederation",
            body: "Weak central government. No taxation power. No executive. Shays' Rebellion (1786) revealed the weaknesses.",
          },
          {
            heading: "Constitution",
            body: "1787 convention. Key compromises: Great Compromise (bicameral), Three-Fifths (slavery counting), Commerce (federal trade power). Bill of Rights (1791) added to secure ratification.",
          },
          {
            heading: "Washington's presidency",
            body: "1789-97. Set precedents: two terms, 'Mr. President', cabinet. Whiskey Rebellion (1794) showed federal power. Farewell Address warned against factions and foreign entanglements.",
          },
          {
            heading: "Early parties",
            body: "Federalists (Hamilton): strong central government, pro-British, commerce. Democratic-Republicans (Jefferson): states' rights, pro-French, agrarian.",
          },
        ],
        keyFacts: [
          "1776: Declaration of Independence.",
          "1787: Constitutional Convention.",
          "1789: First Congress convenes, Washington inaugurated.",
        ],
        commonMistakes: [
          "Confusing the Articles of Confederation with the Constitution.",
          "Missing the ideological side of the revolution (not just taxes).",
          "Forgetting the Bill of Rights was added in 1791.",
        ],
        examStrategy:
          "Period 3 is heavily weighted. Know the progression from French and Indian War to Constitution and the key compromises.",
        studyTips: [
          "Memorize the chain of events 1763 → 1776.",
          "Know the Constitutional compromises.",
          "Practice Declaration of Independence analysis.",
        ],
      },
      {
        unitNumber: 4,
        title: "Period 4: 1800-1848",
        overview:
          "Jefferson's presidency, Market Revolution, Jacksonian democracy, reform movements, slavery expansion.",
        examWeight: "10-17%",
        bigIdeas: [
          "Jefferson expanded America (Louisiana Purchase) and limited federal power.",
          "Market Revolution transformed the economy: roads, canals, factories, the telegraph.",
          "Jacksonian democracy expanded suffrage to white males.",
          "Second Great Awakening sparked reform movements: temperance, abolition, women's rights.",
          "Slavery expanded with cotton; sectional tensions grew.",
        ],
        essentials: [
          {
            heading: "Jeffersonian era",
            body: "Jefferson (1801-09): limited government but enlarged the country via Louisiana Purchase (1803). War of 1812 showed American independence from Britain. Marshall Court established judicial review (Marbury v. Madison, 1803).",
          },
          {
            heading: "Market Revolution",
            body: "Transportation: Erie Canal (1825), railroads. Communication: telegraph (1844). Manufacturing: Lowell mills. Regional specialization: North manufactures, South cotton, West grains.",
          },
          {
            heading: "Jacksonian democracy",
            body: "Universal white male suffrage. Rise of the common man. Indian Removal Act (1830) → Trail of Tears. Opposed the Bank of the United States. Nullification Crisis (1832) with South Carolina.",
          },
          {
            heading: "Second Great Awakening and reform",
            body: "Religious revival 1820s-30s. Reform movements: temperance (alcohol), abolition (Garrison, Douglass), women's rights (Seneca Falls, 1848), asylums and schools, utopian communities.",
          },
          {
            heading: "Slavery expansion",
            body: "Cotton gin (1793) made cotton profitable; slavery grew in the Deep South. Missouri Compromise (1820) maintained free-slave balance. Nat Turner's Rebellion (1831). Abolitionist movement grew.",
          },
          {
            heading: "Southern society",
            body: "Cotton was king. Most white Southerners didn't own slaves but supported slavery. Enslaved people developed distinct cultures blending African traditions with Christianity.",
          },
        ],
        keyFacts: [
          "1803: Louisiana Purchase and Marbury v. Madison.",
          "1820: Missouri Compromise.",
          "1830: Indian Removal Act.",
          "1848: Seneca Falls Convention.",
        ],
        commonMistakes: [
          "Treating Jacksonian democracy as fully democratic (white males only).",
          "Underestimating the Market Revolution's effects.",
          "Missing the Second Great Awakening's reformist outcomes.",
        ],
        examStrategy:
          "Period 4 has strong cause-and-effect chains. Connect the Market Revolution to political and social changes.",
        studyTips: [
          "Build a timeline of reform movements.",
          "Memorize Marshall Court cases.",
          "Practice APUSH-style thematic essays on Market Revolution.",
        ],
      },
      {
        unitNumber: 5,
        title: "Period 5: 1844-1877",
        overview:
          "Manifest Destiny, sectional conflict, Civil War, Reconstruction.",
        examWeight: "10-17%",
        bigIdeas: [
          "Manifest Destiny drove westward expansion and conflict with Mexico.",
          "Sectional crisis: compromises failed to resolve slavery.",
          "Civil War (1861-65): Union victory, slavery abolished.",
          "Reconstruction (1865-77): attempts to rebuild and protect Black rights, ultimately abandoned.",
          "13th, 14th, 15th Amendments restructured citizenship.",
        ],
        essentials: [
          {
            heading: "Manifest Destiny and Mexican-American War",
            body: "Belief that America should stretch to the Pacific. Annexed Texas (1845), fought Mexican-American War (1846-48), gained Mexican Cession. Gold Rush (1849) brought settlers to California.",
          },
          {
            heading: "Sectional crisis",
            body: "Wilmot Proviso (1846): banned slavery in new territories (failed). Compromise of 1850: Fugitive Slave Act. Kansas-Nebraska Act (1854): popular sovereignty. Dred Scott (1857): slaves are property. John Brown (1859). Election of Lincoln (1860).",
          },
          {
            heading: "Civil War",
            body: "Confederate secession (1860-61). Fort Sumter (April 1861). Emancipation Proclamation (1863). Gettysburg (July 1863) turned the tide. Appomattox (April 1865). 620,000+ dead.",
          },
          {
            heading: "Reconstruction",
            body: "Presidential (Johnson) vs Congressional (Radicals). 13th (abolition), 14th (citizenship, equal protection), 15th (voting) Amendments. Freedmen's Bureau. Impeachment of Johnson (1868). Rise of KKK.",
          },
          {
            heading: "End of Reconstruction",
            body: "Compromise of 1877 ended federal troops in the South. Jim Crow laws began. Black disenfranchisement, sharecropping replaced slavery.",
          },
        ],
        keyFacts: [
          "1861-65: Civil War.",
          "13th-15th Amendments (1865-70).",
          "1877: End of Reconstruction.",
        ],
        commonMistakes: [
          "Claiming slavery wasn't the primary cause of the war (it was).",
          "Missing the distinction between Presidential and Congressional Reconstruction.",
          "Underestimating the 14th Amendment's importance.",
        ],
        examStrategy:
          "The DBQ often covers Civil War or Reconstruction. Memorize the 13th-15th Amendments and sectional compromises.",
        studyTips: [
          "Build a timeline of sectional compromises.",
          "Memorize Amendment text.",
          "Practice DBQs on Reconstruction.",
        ],
      },
      {
        unitNumber: 6,
        title: "Period 6: 1865-1898",
        overview:
          "Gilded Age: industrialization, immigration, Populism, Jim Crow, imperialism beginnings.",
        examWeight: "10-17%",
        bigIdeas: [
          "Industrialization transformed the economy and society.",
          "Immigration (especially Southern and Eastern Europe) changed demographics.",
          "Labor unrest: Knights of Labor, AFL, strikes.",
          "Jim Crow segregation replaced slavery in the South.",
          "Populists challenged corporate power.",
        ],
        essentials: [
          {
            heading: "Industrial capitalism",
            body: "Carnegie (steel), Rockefeller (oil), Vanderbilt (railroads). Vertical and horizontal integration. Trusts dominated. Social Darwinism justified inequality.",
          },
          {
            heading: "Labor movement",
            body: "Knights of Labor (1869): inclusive but declined after Haymarket (1886). AFL (1886, Gompers): skilled workers. Major strikes: Great Railroad (1877), Homestead (1892), Pullman (1894). Often suppressed by federal troops.",
          },
          {
            heading: "Immigration and cities",
            body: "Old immigrants (Northern/Western Europe) vs new immigrants (Southern/Eastern Europe, Asian). Ellis Island, Angel Island. Tenements, urban poverty. Nativist backlash (Chinese Exclusion Act 1882).",
          },
          {
            heading: "Jim Crow",
            body: "Plessy v. Ferguson (1896): separate but equal. Segregation laws, poll taxes, literacy tests, grandfather clauses disenfranchised Black Southerners. Lynching as racial terrorism.",
          },
          {
            heading: "Populism",
            body: "Farmers' alliance. Populist Party (1892) advocated free silver, income tax, direct election of senators. William Jennings Bryan's 'Cross of Gold' speech (1896).",
          },
          {
            heading: "Westward expansion",
            body: "Transcontinental Railroad (1869). Homestead Act (1862). Conflicts with Native Americans: Little Bighorn (1876), Wounded Knee (1890). Dawes Act (1887) assimilation policy.",
          },
        ],
        keyFacts: [
          "1869: Transcontinental Railroad completed.",
          "1886: AFL founded, Haymarket Affair.",
          "1896: Plessy v. Ferguson.",
        ],
        commonMistakes: [
          "Treating Robber Barons as purely villainous or heroic.",
          "Missing the role of Jim Crow in ending Reconstruction gains.",
          "Underestimating immigration's scale.",
        ],
        examStrategy:
          "The Gilded Age has rich thematic content. Know industry, labor, immigration, and Jim Crow.",
        studyTips: [
          "Memorize key industrialists and their industries.",
          "Know major labor events.",
          "Practice Jim Crow cases and laws.",
        ],
      },
      {
        unitNumber: 7,
        title: "Period 7: 1890-1945",
        overview:
          "Progressivism, imperialism, WWI, Roaring Twenties, Great Depression, New Deal, WWII.",
        examWeight: "10-17%",
        bigIdeas: [
          "Progressive Era: reforms to address industrialization's ills.",
          "Imperialism and WWI marked America's global rise.",
          "1920s: prosperity, cultural change, nativism.",
          "Great Depression → New Deal expanded federal role.",
          "WWII made the US a superpower.",
        ],
        essentials: [
          {
            heading: "Progressive Era",
            body: "Muckrakers (Upton Sinclair's 'The Jungle'). Reforms: 16th (income tax), 17th (direct Senate election), 18th (Prohibition), 19th (women's suffrage) Amendments. Roosevelt's Square Deal. Wilson's New Freedom.",
          },
          {
            heading: "Imperialism",
            body: "Spanish-American War (1898): Philippines, Puerto Rico, Guam, Cuba. Open Door Policy with China. Roosevelt Corollary. Panama Canal (1914).",
          },
          {
            heading: "World War I",
            body: "Neutrality until 1917. U-boat attacks (Lusitania 1915), Zimmerman Telegram, 'safe for democracy'. Wilson's 14 Points. Senate rejected Treaty of Versailles. Red Scare (1919-20).",
          },
          {
            heading: "Roaring Twenties",
            body: "Consumer culture, radio, movies, jazz. Harlem Renaissance. Flappers. Nativism: immigration quotas (1924), KKK revival. Prohibition and organized crime. Scopes Trial (1925).",
          },
          {
            heading: "Great Depression",
            body: "1929 stock market crash. Hoover's limited response. 25% unemployment. Dust Bowl. Bonus Army (1932).",
          },
          {
            heading: "New Deal",
            body: "FDR elected 1932. Alphabet agencies: CCC, WPA, TVA, SSA. Social Security (1935), Wagner Act, Fair Labor Standards Act. Expanded federal government. Didn't end Depression but provided relief.",
          },
          {
            heading: "World War II",
            body: "Neutrality Acts → Lend-Lease → Pearl Harbor (Dec 1941). Two-front war. D-Day (1944). Manhattan Project → Hiroshima and Nagasaki (1945). US became a superpower.",
          },
        ],
        keyFacts: [
          "1917: US enters WWI.",
          "1929: Stock market crash.",
          "1933: FDR's New Deal begins.",
          "1941: Pearl Harbor, US enters WWII.",
        ],
        commonMistakes: [
          "Thinking the New Deal ended the Depression (WWII did).",
          "Missing the isolationist reaction after WWI.",
          "Underestimating the cultural changes of the 1920s.",
        ],
        examStrategy:
          "Period 7 is dense. Build a timeline and know key reforms, wars, and social changes.",
        studyTips: [
          "Memorize New Deal alphabet agencies.",
          "Build a WWI → WWII timeline.",
          "Practice analyzing political cartoons of the era.",
        ],
      },
      {
        unitNumber: 8,
        title: "Period 8: 1945-1980",
        overview:
          "Cold War, civil rights, Vietnam, Great Society, 1970s stagflation.",
        examWeight: "10-17%",
        bigIdeas: [
          "Cold War shaped foreign and domestic policy.",
          "Civil Rights Movement achieved legal equality.",
          "Great Society expanded welfare state.",
          "Vietnam War divided the country.",
          "1970s: Watergate, oil crisis, stagflation.",
        ],
        essentials: [
          {
            heading: "Early Cold War",
            body: "Truman Doctrine (1947): contain communism. Marshall Plan rebuilt Europe. NATO (1949). Korean War (1950-53). McCarthyism (Red Scare). Eisenhower's brinkmanship.",
          },
          {
            heading: "Civil Rights Movement",
            body: "Brown v. Board (1954). Montgomery Bus Boycott (1955-56). Sit-ins, Freedom Rides. March on Washington (1963). Civil Rights Act (1964), Voting Rights Act (1965). Assassinations: MLK, Malcolm X, RFK.",
          },
          {
            heading: "Great Society",
            body: "LBJ's domestic program. Medicare, Medicaid, War on Poverty, Head Start, Voting Rights Act, Immigration Act of 1965. Biggest expansion of federal role since New Deal.",
          },
          {
            heading: "Vietnam War",
            body: "Gulf of Tonkin (1964) → escalation. Tet Offensive (1968). Anti-war movement. Draft. My Lai Massacre (1968). Nixon's Vietnamization. US withdrawal (1973). Fall of Saigon (1975).",
          },
          {
            heading: "1960s counterculture",
            body: "Hippies, sexual revolution, drug use, feminism (NOW 1966, Roe v. Wade 1973), environmentalism (Earth Day 1970), gay rights (Stonewall 1969).",
          },
          {
            heading: "1970s crises",
            body: "Watergate → Nixon resigns (1974). Oil crisis (1973, 1979). Stagflation. Iran hostage crisis (1979). Three Mile Island. End of postwar prosperity.",
          },
        ],
        keyFacts: [
          "1954: Brown v. Board.",
          "1964-65: Civil Rights Act and Voting Rights Act.",
          "1974: Nixon resigns.",
        ],
        commonMistakes: [
          "Treating the Civil Rights Movement as only MLK.",
          "Missing the Cold War's domestic implications.",
          "Underestimating Vietnam's effect on public trust.",
        ],
        examStrategy:
          "Period 8 has DBQ-friendly themes. Know the civil rights timeline and Cold War milestones.",
        studyTips: [
          "Build a Cold War timeline.",
          "Memorize civil rights legislation.",
          "Practice essays on Great Society.",
        ],
      },
      {
        unitNumber: 9,
        title: "Period 9: 1980-Present",
        overview:
          "Reagan Revolution, end of Cold War, 1990s globalization, 9/11, 2000s-2010s.",
        examWeight: "4-6%",
        bigIdeas: [
          "Reagan and conservatism reshaped politics.",
          "Cold War ended with Soviet collapse (1989-91).",
          "1990s: globalization, tech boom, political scandals.",
          "9/11 and War on Terror.",
          "Growing polarization, financial crisis (2008), digital transformation.",
        ],
        essentials: [
          {
            heading: "Reagan Revolution",
            body: "Elected 1980. Tax cuts, deregulation, military buildup. 'Trickle-down' economics. Anti-union (PATCO strike). Strategic Defense Initiative. Iran-Contra scandal.",
          },
          {
            heading: "End of Cold War",
            body: "Gorbachev's glasnost and perestroika. Berlin Wall fell (1989). Soviet collapse (1991). US became sole superpower.",
          },
          {
            heading: "1990s",
            body: "Clinton presidency. NAFTA (1994). Tech boom, internet emerged. Contract with America (1994). Impeachment (1998). Prosperity.",
          },
          {
            heading: "9/11 and War on Terror",
            body: "Attacks September 11, 2001. Afghanistan War (2001). Iraq War (2003). PATRIOT Act. War on Terror redefined foreign policy.",
          },
          {
            heading: "2000s-2010s",
            body: "Great Recession (2008). Obama presidency (2009-17). Affordable Care Act (2010). Same-sex marriage (Obergefell, 2015). Rise of polarization. Social media transformation.",
          },
        ],
        keyFacts: [
          "1989: Berlin Wall falls.",
          "1991: Soviet Union dissolves.",
          "2001: 9/11.",
          "2008: Financial crisis.",
        ],
        commonMistakes: [
          "Treating Reagan-era supply-side economics uncritically.",
          "Missing the role of end of Cold War in 1990s.",
          "Confusing the Afghanistan and Iraq wars.",
        ],
        examStrategy:
          "Period 9 is short on the exam but closes the course. Know Reagan, Cold War end, 9/11, and 2008.",
        studyTips: [
          "Memorize Reagan's policies.",
          "Build a 1980-present timeline.",
          "Practice essays on the end of the Cold War.",
        ],
      },
    ],
  },

  // =========================================================================
  // AP WORLD HISTORY: MODERN
  // =========================================================================
  "ap-world-history": {
    courseSlug: "ap-world-history",
    examFormat: {
      length: "3 hours 15 minutes",
      structure:
        "55 MCQ (55 min) + 3 SAQ (40 min) + 1 DBQ (60 min) + 1 LEQ (40 min).",
      scoring: "Same format as APUSH. MCQ 40%, SAQ 20%, DBQ 25%, LEQ 15%.",
    },
    framing:
      "AP World History: Modern covers c.1200 CE to the present — not all of human history, just the modern era. The course emphasizes comparison across regions (East Asia, Europe, Africa, Americas, Islamic world) and major themes (trade, empires, revolutions, globalization). You need to be fluent in cross-regional comparison.",
    units: [
      {
        unitNumber: 1,
        title: "The Global Tapestry (c. 1200-1450)",
        overview:
          "Major societies around 1200 CE: Song China, Dar al-Islam, Delhi Sultanate, European kingdoms, Mesoamerica, Africa.",
        examWeight: "8-10%",
        bigIdeas: [
          "Song Dynasty: wealthiest, most technologically advanced civilization.",
          "Dar al-Islam: cultural and scientific flourishing.",
          "Feudal Europe: decentralized, agrarian.",
          "Aztecs and Incas: complex empires in the Americas.",
          "Mali Empire: Mansa Musa's wealth astonished observers.",
        ],
        essentials: [
          {
            heading: "Song China",
            body: "Gunpowder, printing, paper money, compass, porcelain. Civil service exam. Confucian revival. Hangzhou was the world's largest city.",
          },
          {
            heading: "Dar al-Islam",
            body: "Spread of Islam from Spain to Indonesia. Caliphates fragmented but cultural unity remained. House of Wisdom (Baghdad). Preserved and expanded Greek learning.",
          },
          {
            heading: "South and Southeast Asia",
            body: "Delhi Sultanate ruled north India. Vijayanagara in south. Khmer Empire built Angkor Wat. Islam spread through trade.",
          },
          {
            heading: "Americas",
            body: "Aztecs: Tenochtitlán, chinampas, tribute empire. Incas: road system, quipu, terracing. Mississippians: Cahokia urban center.",
          },
          {
            heading: "Africa and Europe",
            body: "Mali Empire (Mansa Musa). Swahili coast traded with Indian Ocean. Feudal Europe: manors, serfdom, Catholic Church, universities began.",
          },
        ],
        keyFacts: [
          "Mansa Musa's 1324 pilgrimage showed Mali's wealth.",
          "Song China invented gunpowder, printing, compass.",
          "Islam was the most widespread religion around 1200.",
        ],
        commonMistakes: [
          "Treating European feudalism as universal.",
          "Missing the complexity of pre-Columbian Americas.",
          "Underestimating Islamic achievements.",
        ],
        examStrategy:
          "Period 1 asks you to compare regions. Build a side-by-side comparison of Song, Islam, Europe, Mesoamerica.",
        studyTips: [
          "Memorize key civilizations and their features.",
          "Practice comparative essays.",
          "Know Song inventions cold.",
        ],
      },
      {
        unitNumber: 2,
        title: "Networks of Exchange (c. 1200-1450)",
        overview:
          "Silk Roads, Mongol Empire, Indian Ocean trade, Trans-Saharan trade, cultural diffusion.",
        examWeight: "8-10%",
        bigIdeas: [
          "Silk Roads: overland Asia trade network.",
          "Mongol Empire unified Eurasia under one political structure.",
          "Indian Ocean trade: monsoon-driven, multi-ethnic.",
          "Trans-Saharan trade: salt, gold, slaves.",
          "Exchanges spread goods, ideas, and disease (Black Death).",
        ],
        essentials: [
          {
            heading: "Silk Roads",
            body: "Chinese luxury goods (silk, porcelain) traded for horses, glass, spices. Passed through Central Asia. Revived under Mongol protection.",
          },
          {
            heading: "Mongol Empire",
            body: "Genghis Khan united Mongols (1206). Largest contiguous land empire. Pax Mongolica facilitated trade. Kublai Khan in China.",
          },
          {
            heading: "Indian Ocean trade",
            body: "Monsoon winds drove seasonal trade. Dhows carried goods between East Africa, Arabia, India, Southeast Asia, China. Swahili coast emerged. Islam spread.",
          },
          {
            heading: "Trans-Saharan trade",
            body: "Camel caravans crossed the Sahara. Salt from Sahara traded for gold from West Africa. Spread Islam to sub-Saharan Africa.",
          },
          {
            heading: "Cultural and environmental consequences",
            body: "Religions spread (Islam, Buddhism). Technologies diffused (paper, compass). Black Death (1347-51) killed ~1/3 of Europe.",
          },
        ],
        keyFacts: [
          "Genghis Khan died 1227.",
          "Indian Ocean trade linked 3 continents.",
          "Black Death arrived in Europe in 1347.",
        ],
        commonMistakes: [
          "Treating the Mongols as only destructive.",
          "Missing the role of monsoons in Indian Ocean trade.",
          "Underestimating disease impact.",
        ],
        examStrategy:
          "Cross-regional comparison is key. Know how trade networks interconnected regions.",
        studyTips: [
          "Map the trade networks.",
          "Compare 3 trade networks side by side.",
          "Practice essays on Mongol impact.",
        ],
      },
      {
        unitNumber: 3,
        title: "Land-Based Empires (c. 1450-1750)",
        overview:
          "Ottoman, Safavid, Mughal, Russian, Ming/Qing China. Gunpowder empires.",
        examWeight: "12-15%",
        bigIdeas: [
          "Gunpowder weapons enabled new empires.",
          "Ottoman Empire dominated the Mediterranean.",
          "Safavid Persia promoted Shia Islam.",
          "Mughal India ruled a vast Hindu-Muslim territory.",
          "Ming and Qing China remained powerful and inward-looking.",
        ],
        essentials: [
          {
            heading: "Ottoman Empire",
            body: "Captured Constantinople (1453). Peak under Suleiman (1520-66). Devshirme system recruited Christian boys for elite janissary corps. Millet system tolerated religious minorities.",
          },
          {
            heading: "Safavid Persia",
            body: "Founded 1501. Promoted Shia Islam as state religion. Rivalry with Sunni Ottomans. Peak under Shah Abbas. Declined in 18th century.",
          },
          {
            heading: "Mughal India",
            body: "Founded 1526 by Babur. Peak under Akbar (religious tolerance) and Shah Jahan (Taj Mahal). Declined after Aurangzeb's intolerance. British took over in 19th century.",
          },
          {
            heading: "Ming and Qing China",
            body: "Ming (1368-1644): rebuilt Great Wall, Forbidden City, Zheng He's voyages. Qing (1644-1912): Manchu conquest, peak under Kangxi and Qianlong. Tribute system.",
          },
          {
            heading: "Russia",
            body: "Ivan the Terrible (1547-84). Peter the Great (1682-1725) modernized, westernized. Catherine the Great expanded the empire.",
          },
        ],
        keyFacts: [
          "1453: Ottomans took Constantinople.",
          "1526: Mughal Empire founded.",
          "1644: Qing Dynasty began.",
        ],
        commonMistakes: [
          "Confusing Sunni Ottomans with Shia Safavids.",
          "Treating all land empires as equivalent.",
          "Missing Russian expansion.",
        ],
        examStrategy:
          "Compare 3 empires: Ottoman, Mughal, Qing. Know their strengths and decline.",
        studyTips: [
          "Build a comparison chart of 5 empires.",
          "Memorize key rulers.",
          "Practice essays on imperial governance.",
        ],
      },
      {
        unitNumber: 4,
        title: "Transoceanic Interconnections (c. 1450-1750)",
        overview:
          "European exploration, Columbian Exchange, maritime empires, Atlantic slave trade.",
        examWeight: "12-15%",
        bigIdeas: [
          "Portuguese and Spanish led the Age of Exploration.",
          "Columbian Exchange transformed global food, disease, populations.",
          "Atlantic slave trade: 12.5 million Africans forcibly transported.",
          "Maritime empires (Spain, Portugal, Dutch, British, French) reshaped the world.",
          "Silver from the Americas financed global trade.",
        ],
        essentials: [
          {
            heading: "Exploration",
            body: "Portuguese under Henry the Navigator rounded Africa. Columbus (1492). Vasco da Gama (1498). Magellan (1519-22 circumnavigation). Motivations: God, gold, glory.",
          },
          {
            heading: "Columbian Exchange",
            body: "Crops: maize, potato, cassava to Old World; wheat, sugar to New World. Animals: horses, cattle to Americas. Disease: smallpox devastated Americas. People: Europeans, Africans arrived.",
          },
          {
            heading: "Maritime empires",
            body: "Spain: silver from Potosí and Mexico. Portugal: trading posts in Africa, India, Brazil. Dutch: VOC, dominated spice trade. British: India, North America. French: Canada, Louisiana.",
          },
          {
            heading: "Atlantic slave trade",
            body: "12.5 million Africans forcibly transported. Middle Passage. Chattel slavery in the Americas. Transformed African societies and American economies.",
          },
          {
            heading: "Global silver trade",
            body: "Spanish silver from Potosí went to Europe and China. Ming China required silver for taxes. Global flows linked economies.",
          },
        ],
        keyFacts: [
          "1492: Columbus.",
          "1519-22: Magellan's circumnavigation.",
          "Silver from Potosí financed global trade.",
        ],
        commonMistakes: [
          "Missing the impact of disease in the Americas.",
          "Treating the slave trade as secondary.",
          "Forgetting China's role in silver flows.",
        ],
        examStrategy:
          "Focus on cause and effect. European exploration → Columbian Exchange → slave trade → global reshaping.",
        studyTips: [
          "Map Atlantic trade routes.",
          "Memorize Columbian Exchange items.",
          "Practice essays on the slave trade's effects.",
        ],
      },
      {
        unitNumber: 5,
        title: "Revolutions (c. 1750-1900)",
        overview:
          "Enlightenment, Atlantic revolutions (American, French, Haitian, Latin American), Industrial Revolution.",
        examWeight: "12-15%",
        bigIdeas: [
          "Enlightenment ideas (natural rights, reason) inspired revolutions.",
          "American (1776), French (1789), Haitian (1791), Latin American independence movements.",
          "Industrial Revolution began in Britain, spread.",
          "Factory system, urbanization, working class, labor movements.",
          "Nationalism emerged as a political force.",
        ],
        essentials: [
          {
            heading: "Enlightenment",
            body: "Locke, Rousseau, Voltaire, Montesquieu. Natural rights, social contract, separation of powers. Inspired revolutionary ideology.",
          },
          {
            heading: "American Revolution",
            body: "1775-83. Independence from Britain. Constitution established republic. Influenced later revolutions.",
          },
          {
            heading: "French Revolution",
            body: "1789-99. Ended absolute monarchy. Declaration of Rights of Man. Terror. Napoleon rose and spread Revolutionary principles across Europe.",
          },
          {
            heading: "Haitian Revolution",
            body: "1791-1804. Only successful slave revolution in modern history. Led by Toussaint Louverture. First Black republic. Shocked slave-owning societies.",
          },
          {
            heading: "Latin American independence",
            body: "Simón Bolívar, José de San Martín. Most of Spanish America independent by 1825. Brazil independent from Portugal (1822). Social hierarchies largely preserved.",
          },
          {
            heading: "Industrial Revolution",
            body: "Began in Britain c.1780. Steam engine, textile machinery, coal. Factory system replaced cottage industry. Urbanization, new social classes. Spread to continental Europe, US, Japan.",
          },
          {
            heading: "Responses to industrialization",
            body: "Marxism (Marx, Engels, 1848 Communist Manifesto), labor unions, socialism, women's rights. Factory Acts addressed worst abuses.",
          },
        ],
        keyFacts: [
          "1776-89: Age of Atlantic Revolutions.",
          "1789: French Revolution, American Constitution.",
          "1848: Revolutions of 1848, Marx's Communist Manifesto.",
        ],
        commonMistakes: [
          "Missing the Haitian Revolution.",
          "Treating industrialization as purely beneficial.",
          "Forgetting Latin American revolutions.",
        ],
        examStrategy:
          "The Atlantic Revolutions and Industrial Revolution are heavily weighted. Know causes, courses, and effects.",
        studyTips: [
          "Compare the 4 Atlantic revolutions.",
          "Map the spread of industrialization.",
          "Practice essays on responses to industrialization.",
        ],
      },
      {
        unitNumber: 6,
        title: "Consequences of Industrialization (c. 1750-1900)",
        overview:
          "New imperialism, economic transformations, migration, indigenous responses.",
        examWeight: "12-15%",
        bigIdeas: [
          "New imperialism: European powers conquered most of Africa and Asia.",
          "Scramble for Africa (1884 Berlin Conference).",
          "Industrial powers needed raw materials and markets.",
          "Scientific racism and Social Darwinism justified imperialism.",
          "Indigenous resistance and accommodation.",
        ],
        essentials: [
          {
            heading: "Causes of new imperialism",
            body: "Industrial needs: raw materials (rubber, cotton), markets, strategic positions. Ideology: Social Darwinism, white man's burden, spreading 'civilization'.",
          },
          {
            heading: "Scramble for Africa",
            body: "Berlin Conference (1884-85) divided Africa without African input. By 1914, only Ethiopia and Liberia remained independent. Belgian Congo was a genocide site.",
          },
          {
            heading: "Asia",
            body: "British Raj in India (1858). Opium Wars forced China open. Japan modernized (Meiji Restoration, 1868) and became a colonizer itself. Southeast Asia divided among European powers.",
          },
          {
            heading: "Indigenous responses",
            body: "Resistance: Sepoy Rebellion (1857), Xhosa Wars, Boxer Rebellion (1899). Accommodation: Western-educated elites. Modernization: Japan, Mexican Porfiriato.",
          },
          {
            heading: "Migration",
            body: "Europeans to Americas, Oceania. Asians as indentured laborers to Americas, Africa. Africans forced labor. Changed demographics globally.",
          },
        ],
        keyFacts: [
          "1858: British Raj.",
          "1884-85: Berlin Conference.",
          "1868: Meiji Restoration.",
        ],
        commonMistakes: [
          "Treating imperialism as purely economic.",
          "Missing Japanese imperialism.",
          "Underestimating indigenous resistance.",
        ],
        examStrategy:
          "New imperialism is DBQ gold. Know causes, methods, effects.",
        studyTips: [
          "Map the Scramble for Africa.",
          "Compare Japanese and Chinese responses to the West.",
          "Practice DBQs on imperialism.",
        ],
      },
      {
        unitNumber: 7,
        title: "Global Conflict (c. 1900-present)",
        overview:
          "World Wars, interwar period, Holocaust, Cold War origins.",
        examWeight: "8-10%",
        bigIdeas: [
          "WWI: industrial warfare on an unprecedented scale.",
          "Interwar: economic crisis, rise of fascism and communism.",
          "WWII: global war, Holocaust, atomic bombs.",
          "Decolonization accelerated after WWII.",
          "Mass atrocities: Holocaust, Armenian genocide, Rwandan genocide.",
        ],
        essentials: [
          {
            heading: "World War I",
            body: "1914-18. Causes: militarism, alliances, imperialism, nationalism, assassination. Trench warfare, poison gas, tanks. Russia withdrew after 1917 revolution. US entered 1917. Ended with Treaty of Versailles (1919) — harsh on Germany.",
          },
          {
            heading: "Interwar period",
            body: "Great Depression began 1929. Rise of fascism: Italy (Mussolini), Germany (Hitler), Japan militarism. Spanish Civil War (1936-39). League of Nations failed to prevent conflict.",
          },
          {
            heading: "World War II",
            body: "1939-45. Axis (Germany, Italy, Japan) vs Allies. Holocaust killed 6 million Jews + others. Pacific War, Pearl Harbor, atomic bombs on Hiroshima and Nagasaki. ~75 million deaths.",
          },
          {
            heading: "Mass atrocities",
            body: "Armenian genocide (1915), Holocaust (1941-45), Stalin's purges, Mao's Great Leap Forward famine, Cambodian genocide, Rwandan genocide (1994).",
          },
        ],
        keyFacts: [
          "1914-18: WWI.",
          "1939-45: WWII.",
          "1945: atomic bombs.",
        ],
        commonMistakes: [
          "Treating WWII as only European.",
          "Missing the link between WWI peace and WWII.",
          "Underestimating non-European participation.",
        ],
        examStrategy:
          "Global conflict often appears in DBQ. Know causes, courses, effects of both wars.",
        studyTips: [
          "Memorize major battles and turning points.",
          "Practice essays on WWI causation.",
          "Map the Holocaust's scale.",
        ],
      },
      {
        unitNumber: 8,
        title: "Cold War & Decolonization (c. 1900-present)",
        overview:
          "Cold War, decolonization, non-aligned movement, proxy wars.",
        examWeight: "8-10%",
        bigIdeas: [
          "US vs Soviet Union ideological struggle.",
          "Decolonization of Asia and Africa.",
          "Proxy wars: Korea, Vietnam, Angola, Afghanistan.",
          "Non-aligned movement tried to stay neutral.",
          "End of Cold War (1989-91).",
        ],
        essentials: [
          {
            heading: "Cold War",
            body: "Capitalism vs communism. NATO vs Warsaw Pact. Arms race, space race, proxy wars. Korean War (1950-53). Cuban Missile Crisis (1962). Vietnam War.",
          },
          {
            heading: "Decolonization",
            body: "India (1947, Gandhi, Nehru). African independence in 1960s. Violent (Algeria, Kenya) and peaceful (Ghana, 1957). Pan-Africanism (Nkrumah, Kenyatta).",
          },
          {
            heading: "Non-aligned movement",
            body: "Bandung Conference (1955) brought together newly independent nations. Nehru, Tito, Nasser, Sukarno. Sought to avoid alignment with either superpower.",
          },
          {
            heading: "Communism after 1900",
            body: "Russia (1917), China (1949, Mao), Cuba (1959, Castro), Vietnam. Mao's Cultural Revolution (1966-76).",
          },
          {
            heading: "End of Cold War",
            body: "Gorbachev's glasnost and perestroika. Berlin Wall fell (1989). USSR dissolved (1991). Post-Cold War: Russia's economic struggles, NATO expansion, conflicts in the Balkans.",
          },
        ],
        keyFacts: [
          "1947: Indian independence, Truman Doctrine.",
          "1949: Chinese Revolution, NATO formed.",
          "1989-91: End of Cold War.",
        ],
        commonMistakes: [
          "Treating the Cold War as only US-Soviet.",
          "Missing the non-aligned movement.",
          "Underestimating decolonization's breadth.",
        ],
        examStrategy:
          "Know the decolonization timeline and Cold War milestones. Practice comparison essays.",
        studyTips: [
          "Memorize decolonization dates.",
          "Map Cold War proxy wars.",
          "Practice essays on non-alignment.",
        ],
      },
      {
        unitNumber: 9,
        title: "Globalization (c. 1900-present)",
        overview:
          "Technology, economics, culture, environment in the global age.",
        examWeight: "8-10%",
        bigIdeas: [
          "Technology accelerated globalization.",
          "Economic globalization: multinationals, free trade, financial integration.",
          "Cultural globalization: spread of ideas, consumer culture.",
          "Environmental challenges: climate change, pollution.",
          "Responses to globalization: reform, resistance, reform.",
        ],
        essentials: [
          {
            heading: "Technology",
            body: "Internet (1990s), mobile phones, GPS, biotechnology. Medical advances extended lifespans. Transportation revolutions.",
          },
          {
            heading: "Economic globalization",
            body: "Bretton Woods (1944) created IMF, World Bank. GATT → WTO. NAFTA, EU. Multinational corporations. Offshoring.",
          },
          {
            heading: "Reforms and responses",
            body: "Women's movements, human rights (Universal Declaration, 1948). Environmental movements (Earth Day 1970). Anti-globalization protests. Religious fundamentalism.",
          },
          {
            heading: "Cultural globalization",
            body: "American consumer culture, Hollywood, McDonalds. Local cultures adapt and resist. Hybrid forms emerge.",
          },
          {
            heading: "Environmental challenges",
            body: "Climate change, pollution, biodiversity loss, deforestation. Paris Agreement (2015). Ongoing global negotiations.",
          },
          {
            heading: "Institutions",
            body: "United Nations (1945). NATO, EU, ASEAN, African Union. Non-governmental organizations.",
          },
        ],
        keyFacts: [
          "1945: UN founded.",
          "1948: Universal Declaration of Human Rights.",
          "2015: Paris Climate Agreement.",
        ],
        commonMistakes: [
          "Treating globalization as only American.",
          "Missing resistance movements.",
          "Forgetting environmental dimensions.",
        ],
        examStrategy:
          "Know the major institutions and their roles. Connect technology, economics, and culture.",
        studyTips: [
          "Memorize key institutions.",
          "Practice essays on globalization's effects.",
          "Know 3 examples of cultural hybridization.",
        ],
      },
    ],
  },

  // =========================================================================
  // AP EUROPEAN HISTORY
  // =========================================================================
  "ap-euro-history": {
    courseSlug: "ap-euro-history",
    examFormat: {
      length: "3 hours 15 minutes",
      structure:
        "55 MCQ (55 min) + 3 SAQ (40 min) + 1 DBQ (60 min) + 1 LEQ (40 min). Same format as APUSH.",
      scoring: "MCQ 40%, SAQ 20%, DBQ 25%, LEQ 15%.",
    },
    framing:
      "AP Euro covers European history from the Renaissance (c. 1450) to the present. Four major themes run throughout: interaction with the environment, cultural/intellectual developments, state-building, social/economic change. The course is dense — the Renaissance alone demands attention.",
    units: [
      {
        unitNumber: 1,
        title: "Renaissance & Exploration",
        overview:
          "Italian and Northern Renaissance, humanism, printing, early European exploration.",
        examWeight: "10-15%",
        bigIdeas: [
          "Italian Renaissance (c. 1350-1550): revival of Greek/Roman learning, humanism.",
          "Northern Renaissance (c. 1450-1550): Christian humanism, Erasmus.",
          "Printing press (Gutenberg 1450s) revolutionized information.",
          "New Monarchies centralized state power.",
          "Early exploration: Portugal, Spain led the way.",
        ],
        essentials: [
          {
            heading: "Italian Renaissance",
            body: "Petrarch (father of humanism). Florence: Medici family, Machiavelli's 'The Prince'. Leonardo, Michelangelo, Raphael. Humanism emphasized individual potential and classical learning.",
          },
          {
            heading: "Northern Renaissance",
            body: "Erasmus ('In Praise of Folly'), Thomas More ('Utopia'). More religious focus than Italian. Printing press spread ideas rapidly.",
          },
          {
            heading: "Printing",
            body: "Gutenberg's movable type (c. 1450). Books cheaper, literacy grew. Enabled the Protestant Reformation (Luther's 95 Theses spread widely).",
          },
          {
            heading: "New Monarchies",
            body: "Spain (Ferdinand and Isabella, 1492 unification and expulsion of Muslims/Jews), England (Henry VII, Tudor dynasty), France (Louis XI). Centralized power, standing armies, taxation.",
          },
          {
            heading: "Exploration",
            body: "Portugal led: Henry the Navigator, Da Gama (1498) to India. Spain: Columbus (1492), Cortés, Pizarro. Commercial revolution and mercantilism followed.",
          },
        ],
        keyFacts: [
          "1450s: Gutenberg's printing press.",
          "1492: Columbus, Spain unification.",
          "1513: Machiavelli's 'The Prince'.",
        ],
        commonMistakes: [
          "Treating Italian and Northern Renaissance as identical.",
          "Missing the printing press's role.",
          "Forgetting early exploration's Portuguese origins.",
        ],
        examStrategy:
          "Unit 1 sets up the course. Know the Renaissance and early exploration well.",
        studyTips: [
          "Memorize key humanists and works.",
          "Compare Italian and Northern Renaissance.",
          "Practice DBQs on the printing press.",
        ],
      },
      {
        unitNumber: 2,
        title: "Age of Reformation",
        overview:
          "Protestant Reformation, Catholic Counter-Reformation, religious wars.",
        examWeight: "10-15%",
        bigIdeas: [
          "Luther's 95 Theses (1517) sparked the Reformation.",
          "Calvinism emphasized predestination, spread widely.",
          "Catholic Reformation (Council of Trent, Jesuits) responded.",
          "Religious wars: French Wars of Religion, Thirty Years' War.",
          "Peace of Westphalia (1648) ended major religious wars.",
        ],
        essentials: [
          {
            heading: "Martin Luther",
            body: "Nailed 95 Theses to Wittenberg church door (1517). Opposed indulgences, emphasized salvation by faith alone, Bible in vernacular. Excommunicated (1521). Translated Bible to German.",
          },
          {
            heading: "Calvinism",
            body: "John Calvin: predestination — God has already chosen the saved. Spread to Geneva, France (Huguenots), Scotland (Presbyterians), Netherlands, England (Puritans).",
          },
          {
            heading: "Anglican Reformation",
            body: "Henry VIII (1533) broke with Rome over divorce. Church of England formed. Initially conservative but later more Protestant under Edward VI and Elizabeth I.",
          },
          {
            heading: "Catholic Reformation",
            body: "Council of Trent (1545-63) reaffirmed Catholic doctrine, reformed abuses. Jesuits (founded by Ignatius Loyola) spread Catholicism globally. Inquisition suppressed heresy.",
          },
          {
            heading: "Wars of Religion",
            body: "French Wars of Religion (1562-98): Catholics vs Huguenots. Edict of Nantes (1598) granted toleration. Thirty Years' War (1618-48): Germany devastated. Peace of Westphalia established state sovereignty.",
          },
        ],
        keyFacts: [
          "1517: Luther's 95 Theses.",
          "1534: English Reformation.",
          "1618-48: Thirty Years' War.",
        ],
        commonMistakes: [
          "Treating all Protestants as equivalent.",
          "Missing the political dimensions of religious conflict.",
          "Forgetting the Peace of Westphalia's significance.",
        ],
        examStrategy:
          "Reformation DBQs are common. Know Luther, Calvin, Catholic response, and religious wars.",
        studyTips: [
          "Compare Luther and Calvin.",
          "Map religious conflicts.",
          "Practice essays on the Peace of Westphalia.",
        ],
      },
      {
        unitNumber: 3,
        title: "Absolutism & Constitutionalism",
        overview:
          "Absolute monarchies (France, Austria, Prussia, Russia), English Civil War, Glorious Revolution.",
        examWeight: "10-15%",
        bigIdeas: [
          "Absolutism: monarchs claimed divine right and absolute power.",
          "Louis XIV of France: 'I am the state'.",
          "English Civil War (1642-49): Parliament vs King.",
          "Glorious Revolution (1688) established constitutional monarchy.",
          "Dutch Republic was a commercial, tolerant exception.",
        ],
        essentials: [
          {
            heading: "Louis XIV",
            body: "Longest reign in European history (1643-1715). Built Versailles. 'I am the state'. Patronized arts. Persecuted Huguenots (revoked Edict of Nantes 1685). Fought numerous wars, exhausted treasury.",
          },
          {
            heading: "Other absolute monarchies",
            body: "Austria: Habsburgs. Prussia: Hohenzollerns, Frederick William built strong military. Russia: Peter the Great westernized, Catherine the Great expanded.",
          },
          {
            heading: "English Civil War",
            body: "Charles I vs Parliament over taxes and religion. Oliver Cromwell led Puritan forces. Charles I executed (1649). Cromwell ruled as Lord Protector. Monarchy restored (1660) under Charles II.",
          },
          {
            heading: "Glorious Revolution",
            body: "James II's Catholicism alarmed Parliament. William of Orange invited to invade (1688). Bloodless coup. English Bill of Rights (1689) limited monarchy. Basis for later constitutional government.",
          },
          {
            heading: "Dutch Republic",
            body: "United Provinces. Republican government, tolerant of religious minorities. Commercial powerhouse (VOC, Amsterdam as financial capital). Declined in 18th century.",
          },
        ],
        keyFacts: [
          "1649: English king Charles I executed.",
          "1688: Glorious Revolution.",
          "1715: Louis XIV died.",
        ],
        commonMistakes: [
          "Treating all absolutism as the same.",
          "Missing the Glorious Revolution's significance.",
          "Forgetting Dutch Republic's exceptionalism.",
        ],
        examStrategy:
          "Compare absolutism and constitutionalism. Know Louis XIV's reign in depth.",
        studyTips: [
          "Memorize key absolute monarchs.",
          "Practice essays on Louis XIV.",
          "Compare England and France's political systems.",
        ],
      },
      {
        unitNumber: 4,
        title: "Scientific, Philosophical & Political Developments",
        overview:
          "Scientific Revolution, Enlightenment, enlightened absolutism.",
        examWeight: "10-15%",
        bigIdeas: [
          "Scientific Revolution: Copernicus → Kepler → Galileo → Newton.",
          "Enlightenment applied reason to society.",
          "Major philosophes: Voltaire, Montesquieu, Rousseau, Diderot.",
          "Enlightened absolutists: Frederick II, Catherine II, Joseph II.",
          "Salons, coffeehouses spread Enlightenment ideas.",
        ],
        essentials: [
          {
            heading: "Scientific Revolution",
            body: "Copernicus (heliocentrism, 1543). Galileo (telescope, supported Copernicus). Kepler (planetary laws). Newton ('Principia', 1687) synthesized with law of gravitation. Scientific method established.",
          },
          {
            heading: "Enlightenment thinkers",
            body: "Voltaire: religious toleration, satire. Montesquieu: separation of powers. Rousseau: social contract, 'general will'. Diderot: Encyclopedia. Locke (earlier): natural rights.",
          },
          {
            heading: "Enlightened absolutism",
            body: "Frederick II of Prussia: religious toleration, legal reform, but militaristic. Catherine II of Russia: correspondence with philosophes, Western reforms, but preserved serfdom. Joseph II of Austria: most radical, abolished serfdom, religious toleration.",
          },
          {
            heading: "Enlightenment culture",
            body: "Salons (hosted by women) spread ideas. Coffeehouses. Public sphere of political debate. Religious toleration grew in practice.",
          },
        ],
        keyFacts: [
          "1543: Copernicus's heliocentric model published.",
          "1687: Newton's 'Principia'.",
          "1751-72: Diderot's Encyclopedia.",
        ],
        commonMistakes: [
          "Missing that Newton synthesized earlier ideas.",
          "Treating Enlightenment as purely anti-religious.",
          "Forgetting salons' role in diffusion.",
        ],
        examStrategy:
          "Know the Scientific Revolution's progression and Enlightenment thinkers.",
        studyTips: [
          "Build a timeline of Scientific Revolution figures.",
          "Memorize Enlightenment philosophers.",
          "Practice essays on enlightened absolutism.",
        ],
      },
      {
        unitNumber: 5,
        title: "Conflict, Crisis & Reaction in the Late 18th Century",
        overview:
          "French Revolution, Napoleonic era, Congress of Vienna, Romanticism.",
        examWeight: "10-15%",
        bigIdeas: [
          "French Revolution (1789): ended absolute monarchy.",
          "Reign of Terror (1793-94): radical phase.",
          "Napoleon rose, conquered much of Europe.",
          "Congress of Vienna (1815) reshaped Europe.",
          "Romanticism reacted against Enlightenment rationalism.",
        ],
        essentials: [
          {
            heading: "French Revolution",
            body: "Causes: financial crisis, Enlightenment ideas, inequality. Estates-General (1789), National Assembly, Declaration of the Rights of Man, Bastille Day (July 14). Royal family fled; captured. King executed (Jan 1793).",
          },
          {
            heading: "Reign of Terror",
            body: "Jacobins (Robespierre) dominated. Thousands executed by guillotine. War with European powers. Ended with Robespierre's own execution (July 1794, Thermidor). Directory (1795-99) followed.",
          },
          {
            heading: "Napoleon",
            body: "Seized power 1799 (coup of 18 Brumaire). Crowned emperor (1804). Napoleonic Code. Conquered most of Europe (peak 1810). Russian campaign (1812) disastrous. Waterloo (1815).",
          },
          {
            heading: "Congress of Vienna",
            body: "1814-15. Metternich dominated. Restored pre-Revolutionary order but with modifications. Balance of power. Conservative reaction.",
          },
          {
            heading: "Romanticism",
            body: "Reaction against Enlightenment rationalism. Emotion, nature, individualism. Wordsworth, Goethe, Beethoven. Influenced nationalism and later Revolutions of 1848.",
          },
        ],
        keyFacts: [
          "1789: French Revolution begins.",
          "1804: Napoleon crowned emperor.",
          "1815: Waterloo, Congress of Vienna.",
        ],
        commonMistakes: [
          "Treating the Revolution as monolithic.",
          "Missing the counter-revolution.",
          "Forgetting Romanticism's political implications.",
        ],
        examStrategy:
          "Know the Revolution's phases and Napoleon's rise/fall.",
        studyTips: [
          "Memorize the Revolution timeline.",
          "Practice essays on Napoleon.",
          "Know Congress of Vienna principles.",
        ],
      },
      {
        unitNumber: 6,
        title: "Industrialization & Its Effects",
        overview:
          "Industrial Revolution in Europe, social changes, 1848 revolutions, ideologies.",
        examWeight: "10-15%",
        bigIdeas: [
          "Industrial Revolution began in Britain, spread to Europe.",
          "New social classes: industrial bourgeoisie, proletariat.",
          "1848 Revolutions: failed liberal/national uprisings.",
          "Ideologies: liberalism, socialism, nationalism, conservatism.",
          "Second Industrial Revolution: steel, chemicals, electricity.",
        ],
        essentials: [
          {
            heading: "Industrial Revolution",
            body: "Started in Britain (textiles, coal, steam). Spread to Belgium, France, Germany. Factories, urbanization, child labor, long hours. Improved material standards but social disruption.",
          },
          {
            heading: "Social effects",
            body: "New classes: middle class (industrialists, merchants), working class (factory workers). Women in factories. Urbanization and slums. Public health crises.",
          },
          {
            heading: "1848 Revolutions",
            body: "Liberal, nationalist, social revolutions across Europe. France (end of July Monarchy, Second Republic), Germany (Frankfurt Parliament), Italy, Austria-Hungary. Most failed within a year.",
          },
          {
            heading: "Ideologies",
            body: "Liberalism: individual rights, free markets. Conservatism: tradition, monarchy. Socialism: collective ownership (Marx 1848). Nationalism: national self-determination.",
          },
          {
            heading: "Second Industrial Revolution",
            body: "1870s-1914. Steel (Bessemer process), chemicals, electricity, internal combustion. Germany and US overtook Britain. Mass production, consumer goods.",
          },
        ],
        keyFacts: [
          "1848: Revolutions, Marx's Communist Manifesto.",
          "1870s-1914: Second Industrial Revolution.",
          "Working class grew rapidly.",
        ],
        commonMistakes: [
          "Missing the 1848 Revolutions' failures.",
          "Treating all ideologies as equivalent.",
          "Forgetting the Second Industrial Revolution.",
        ],
        examStrategy:
          "Industrialization DBQs are common. Know causes, effects, responses.",
        studyTips: [
          "Build a timeline of industrialization.",
          "Memorize 4 major ideologies.",
          "Practice essays on 1848.",
        ],
      },
      {
        unitNumber: 7,
        title: "19th-Century Perspectives & Political Developments",
        overview:
          "Nationalism, unification of Germany and Italy, imperialism, Darwinism.",
        examWeight: "10-15%",
        bigIdeas: [
          "Nationalism drove unification of Germany and Italy.",
          "Bismarck's Realpolitik unified Germany (1871).",
          "New imperialism in Africa and Asia.",
          "Darwin's 'Origin of Species' (1859) transformed thought.",
          "Social Darwinism justified inequality and imperialism.",
        ],
        essentials: [
          {
            heading: "Unification of Italy",
            body: "Cavour (Sardinia-Piedmont) led diplomatic efforts. Garibaldi's Red Shirts in the south. Kingdom of Italy proclaimed (1861), completed with annexation of Rome (1870).",
          },
          {
            heading: "Unification of Germany",
            body: "Bismarck's Realpolitik. Wars with Denmark (1864), Austria (1866), France (1870-71). German Empire proclaimed at Versailles (1871). Kaiser Wilhelm I.",
          },
          {
            heading: "New imperialism",
            body: "1870s-1914. European powers conquered Africa (Berlin Conference 1884-85) and Asia. Motivations: raw materials, markets, strategic, civilizing mission. Scientific racism.",
          },
          {
            heading: "Darwinism",
            body: "'Origin of Species' (1859). Natural selection challenged religious explanations. Social Darwinism applied (misapplied) to justify imperialism, capitalism, racism.",
          },
          {
            heading: "19th century culture",
            body: "Realism in literature (Dickens, Flaubert). Impressionism in art (Monet, Degas). Nietzsche's philosophy. Freud began psychoanalysis.",
          },
        ],
        keyFacts: [
          "1859: Darwin's 'Origin of Species'.",
          "1861: Italian unification.",
          "1871: German unification.",
        ],
        commonMistakes: [
          "Treating unification as inevitable.",
          "Missing the role of Realpolitik.",
          "Forgetting Darwin's social applications.",
        ],
        examStrategy:
          "Unification and imperialism are major themes. Know Bismarck's methods.",
        studyTips: [
          "Memorize wars of unification.",
          "Map imperial conquests.",
          "Practice essays on Bismarck.",
        ],
      },
      {
        unitNumber: 8,
        title: "20th-Century Global Conflicts",
        overview:
          "WWI, Russian Revolution, interwar, fascism, WWII, Holocaust.",
        examWeight: "10-15%",
        bigIdeas: [
          "WWI shattered European confidence.",
          "Russian Revolution (1917) brought communism.",
          "Versailles Treaty punished Germany harshly.",
          "Fascism and Nazism rose in response to interwar crises.",
          "WWII and Holocaust were unprecedented catastrophes.",
        ],
        essentials: [
          {
            heading: "World War I",
            body: "1914-18. Alliance system (Triple Entente vs Triple Alliance). Trench warfare on Western Front. New weapons (machine guns, poison gas, tanks, airplanes). ~17 million deaths. Versailles Treaty (1919) blamed Germany.",
          },
          {
            heading: "Russian Revolution",
            body: "1917: February (tsar abdicates), October (Bolsheviks seize power). Civil War (1918-21). USSR formed (1922). Stalin's purges and forced collectivization.",
          },
          {
            heading: "Interwar period",
            body: "Great Depression (1929). Weimar Germany collapsed economically. Rise of Nazis (Hitler took power 1933). Mussolini in Italy. Spanish Civil War (1936-39). Appeasement failed.",
          },
          {
            heading: "World War II",
            body: "1939-45. Germany invaded Poland (Sept 1939). Fall of France (1940). Battle of Britain. German invasion of USSR (1941). Pearl Harbor brought US in. D-Day (1944). Allied victory.",
          },
          {
            heading: "Holocaust",
            body: "Nazi genocide of 6 million Jews and others (Roma, disabled, homosexuals). Concentration camps, extermination camps, gas chambers. Collaborated with Axis and some civilians. Liberated 1945.",
          },
        ],
        keyFacts: [
          "1914-18: WWI.",
          "1917: Russian Revolution.",
          "1939-45: WWII.",
        ],
        commonMistakes: [
          "Missing the interwar connection.",
          "Treating fascism as only German.",
          "Underestimating Holocaust's scale.",
        ],
        examStrategy:
          "20th century conflicts are heavily weighted. Know interwar as crucial link.",
        studyTips: [
          "Build a WWI → interwar → WWII timeline.",
          "Memorize key leaders and battles.",
          "Practice essays on fascism's rise.",
        ],
      },
      {
        unitNumber: 9,
        title: "Cold War & Contemporary Europe",
        overview:
          "Post-WWII rebuilding, Cold War, decolonization, EU, fall of communism.",
        examWeight: "10-15%",
        bigIdeas: [
          "Post-WWII Europe divided between US and USSR.",
          "Marshall Plan rebuilt Western Europe.",
          "Decolonization ended European empires.",
          "European integration: ECSC → EEC → EU.",
          "Fall of communism (1989-91).",
        ],
        essentials: [
          {
            heading: "Rebuilding",
            body: "Marshall Plan (1948): $13 billion to Western Europe. Rapid recovery (German economic miracle). NATO (1949). USSR's Eastern bloc.",
          },
          {
            heading: "Cold War",
            body: "Containment, arms race, Berlin Wall (1961). Khrushchev's 'secret speech' (1956). Hungarian Revolution (1956), Prague Spring (1968) crushed. Nuclear proliferation.",
          },
          {
            heading: "Decolonization",
            body: "Britain: India (1947), Ghana (1957), Kenya. France: Algeria (1962, after war), Indochina (Dien Bien Phu 1954). Most decolonization by 1970.",
          },
          {
            heading: "European integration",
            body: "European Coal and Steel Community (1951). EEC (1957, Treaty of Rome). EU (Maastricht Treaty 1993). Euro introduced 1999. Brexit (2020) complicated the picture.",
          },
          {
            heading: "Fall of communism",
            body: "Gorbachev's glasnost and perestroika. Polish Solidarity. Berlin Wall fell (1989). Velvet Revolution (Czechoslovakia). USSR dissolved (1991). Yugoslav wars (1990s).",
          },
          {
            heading: "Contemporary issues",
            body: "Feminism (Simone de Beauvoir). Migration (guest workers, refugees). Multiculturalism debates. Environmental movements. Euroskepticism.",
          },
        ],
        keyFacts: [
          "1948: Marshall Plan.",
          "1961-89: Berlin Wall.",
          "1993: Maastricht Treaty (EU).",
        ],
        commonMistakes: [
          "Missing the Marshall Plan's Cold War motive.",
          "Forgetting decolonization's violence.",
          "Treating EU as inevitable.",
        ],
        examStrategy:
          "Cold War and EU are common themes. Know the timeline of integration.",
        studyTips: [
          "Memorize Cold War events.",
          "Build an EU integration timeline.",
          "Practice essays on the fall of communism.",
        ],
      },
    ],
  },
};
