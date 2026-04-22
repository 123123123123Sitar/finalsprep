import type { CourseCedLessons } from "./types";

/**
 * AP Environmental Science CED lessons — every topic from Units 1-9 of
 * the 2024-25 CED. Mechanism-first explanations that prioritize the
 * "why" behind ecosystems, cycles, human-impact causal chains, and
 * policy responses. APES FRQs reward connected reasoning (source →
 * effect → mitigation), so each lesson lines up that chain explicitly.
 *
 * Inline LaTeX uses \\(...\\) so the MathRender pipeline picks it up.
 */

export const AP_ENVIRONMENTAL_CED_LESSONS: CourseCedLessons = {
  // =========================================================================
  // UNIT 1 — THE LIVING WORLD: ECOSYSTEMS
  // =========================================================================
  "1.1": {
    id: "1.1",
    title: "Introduction to Ecosystems",
    summary:
      "An ecosystem is a community of living organisms interacting with each other and with their abiotic environment. Energy flows through and matter cycles within it.",
    lesson:
      "An **ecosystem** consists of all the living (**biotic**) and nonliving (**abiotic**) components of an area and the interactions between them. Scale is flexible — a rotting log, a coral reef, a forest, a pond can each be analyzed as an ecosystem.\n\n**Biotic factors**: producers (plants, algae, some bacteria), consumers (herbivores, carnivores, omnivores), and decomposers (fungi, bacteria).\n\n**Abiotic factors**: sunlight, temperature, water, nutrients, soil, pH, salinity, and disturbances (fire, storms).\n\nTwo key flows:\n- **Energy** flows one-way through the ecosystem: in as sunlight, captured by producers, passed along food chains, and lost as heat at every step.\n- **Matter** (carbon, nitrogen, phosphorus, water) cycles within the ecosystem through biogeochemical cycles (1.4–1.7).\n\nEcosystems are organized in a hierarchy: individual → population → community → ecosystem → biome → biosphere. Each level adds interactions: a population tracks one species; a community tracks all species in an area; an ecosystem adds the abiotic environment.\n\nEcosystems are dynamic — composition and function shift over time due to disturbance, succession (2.7), and human activity.",
    keyIdeas: [
      "Biotic (living) + abiotic (nonliving) components + interactions = ecosystem.",
      "Energy flows through; matter cycles within.",
      "Hierarchy: individual → population → community → ecosystem → biome → biosphere.",
      "Producers, consumers, decomposers are the three functional biotic groups.",
    ],
    commonMistakes: [
      "Treating biotic and abiotic as a list without interactions — the interactions are the point.",
      "Claiming matter is \"used up\" — it cycles; only energy is lost to heat.",
      "Forgetting decomposers — they return nutrients to the abiotic pool.",
    ],
  },
  "1.2": {
    id: "1.2",
    title: "Terrestrial Biomes",
    summary:
      "Terrestrial biomes are large regions defined by climate (temperature and precipitation) and the dominant vegetation that climate supports.",
    lesson:
      "A **biome** is a large geographic region characterized by its climate and its dominant plant community. The two primary climate axes are **average annual temperature** and **annual precipitation** — a climograph plots biomes against these axes.\n\nMajor terrestrial biomes:\n- **Tropical rainforest**: warm, wet year-round; highest biodiversity; nutrient-poor soils (nutrients stored in biomass).\n- **Tropical savanna / grassland**: warm with distinct wet/dry seasons; scattered trees; grazers.\n- **Desert**: < 25 cm precipitation/yr; hot or cold; plants with water-storing / small-leaf adaptations.\n- **Temperate grassland**: moderate precipitation, cold winters; deep fertile soils (breadbasket regions).\n- **Temperate deciduous forest**: moderate precipitation; broadleaf trees that drop leaves in winter.\n- **Temperate rainforest** (e.g., Pacific Northwest): cool, wet; large conifers.\n- **Boreal forest / taiga**: long cold winters, short summers; coniferous trees; cover huge area.\n- **Tundra**: very cold, permafrost; short growing season; low-lying plants, no trees.\n\nBiomes shift with **latitude** (warmer at equator, colder toward poles) and **altitude** (similar pattern on a mountain). A rain-shadow effect drives deserts on the lee side of mountain ranges. **Climate change** is already shifting biome boundaries poleward and upward.",
    keyIdeas: [
      "Biomes are defined by climate (T and precipitation) and dominant vegetation.",
      "Latitude and altitude produce parallel biome patterns.",
      "Tropical rainforests = highest biodiversity but poor soils.",
      "Temperate grasslands have the richest soils (good for agriculture).",
    ],
    commonMistakes: [
      "Confusing savanna (tropical) with temperate grassland.",
      "Claiming tropical rainforest soils are fertile because they support so much life.",
      "Equating taiga with tundra — taiga has trees, tundra does not.",
    ],
  },
  "1.3": {
    id: "1.3",
    title: "Aquatic Biomes",
    summary:
      "Aquatic biomes are classified by salinity (freshwater vs marine) and further by depth, flow, and proximity to land.",
    lesson:
      "Aquatic biomes cover about 75% of Earth's surface. Primary split: **freshwater** (rivers, lakes, wetlands) vs **marine** (oceans, estuaries, coral reefs).\n\nFreshwater:\n- **Rivers and streams**: flowing water; oxygen-rich; nutrient input from land.\n- **Lakes and ponds**: stratified by depth into littoral (shallow, vegetated), limnetic (open surface), and profundal (deep, dark) zones. Stratification inverts seasonally (turnover) in temperate lakes.\n- **Wetlands**: areas saturated with water at least part of the year. High biodiversity, flood control, water filtration. Threatened by drainage for agriculture.\n\nMarine:\n- **Open ocean / pelagic zone**: photic zone (sunlit) supports phytoplankton — the base of nearly all marine food webs.\n- **Coral reefs**: shallow tropical; enormous biodiversity; threatened by warming and acidification (9.6–9.7).\n- **Estuaries**: where rivers meet the sea; brackish water; extremely productive nursery for many marine species.\n- **Intertidal zones**: exposed at low tide, submerged at high; organisms adapted to extreme variability.\n- **Benthic / abyssal**: sea floor; chemosynthetic vents in deep zones where light doesn't reach.\n\n**Dissolved oxygen (DO)**, salinity, temperature, depth, and flow are the key abiotic variables setting which organisms live where.",
    keyIdeas: [
      "Aquatic biomes split by salinity first; then by depth, flow, light.",
      "Estuaries and wetlands are among the most productive ecosystems on Earth.",
      "Coral reefs have enormous biodiversity, are highly threatened.",
      "Photic (lit) vs aphotic zones divide deep-water communities.",
    ],
    commonMistakes: [
      "Treating all marine environments as homogeneous — zonation is central.",
      "Ignoring estuaries as transition zones — their brackish water is their defining feature.",
      "Forgetting that wetlands and coral reefs are disproportionately threatened despite small area.",
    ],
  },
  "1.4": {
    id: "1.4",
    title: "The Carbon Cycle",
    summary:
      "Carbon cycles among atmosphere, ocean, biosphere, soils, and rocks. Photosynthesis and respiration drive the short cycle; burial and volcanism drive the long one.",
    lesson:
      "Carbon moves among five reservoirs: **atmosphere** (as CO₂ and CH₄), **biosphere** (plants, animals), **ocean** (dissolved CO₂, bicarbonate, carbonate, organic matter), **soil / sediments**, and **rocks / fossil fuels**.\n\n**Fast cycle** (biosphere ↔ atmosphere, on timescales of days to decades):\n- **Photosynthesis**: \\(6\\,\\text{CO}_2 + 6\\,\\text{H}_2\\text{O} \\to \\text{C}_6\\text{H}_{12}\\text{O}_6 + 6\\,\\text{O}_2\\). Removes CO₂.\n- **Respiration**: reverse reaction. Returns CO₂.\n- **Decomposition**: dead organic matter → CO₂ via microbial respiration.\n\n**Slow cycle** (millions of years):\n- Dead organisms buried without full decomposition become fossil fuels (coal, oil, natural gas).\n- Marine organisms precipitate carbonate shells → limestone.\n- Volcanoes and weathering exchange carbon between rock and atmosphere.\n\n**Human disruptions**:\n- Fossil fuel combustion releases fossil carbon to the atmosphere at rates orders of magnitude faster than natural burial.\n- Deforestation reduces photosynthetic uptake and often burns stored carbon.\n- Cement production releases CO₂ from limestone.\n- The ocean absorbs about a quarter of emitted CO₂ → acidification (9.7).\n\nNet result: atmospheric CO₂ has risen from ~280 ppm pre-industrial to >420 ppm today. This drives the greenhouse effect intensification (Unit 9).",
    keyIdeas: [
      "Reservoirs: atmosphere, biosphere, ocean, soil, rocks.",
      "Fast cycle: photosynthesis ↔ respiration/decomposition.",
      "Slow cycle: burial (fossil fuels, limestone) and volcanism.",
      "Humans shift carbon from rock/biosphere to atmosphere via combustion and deforestation.",
    ],
    commonMistakes: [
      "Forgetting the ocean as a carbon reservoir and sink.",
      "Conflating photosynthesis and cellular respiration (they're reverses).",
      "Omitting cement production as a non-combustion CO₂ source.",
    ],
  },
  "1.5": {
    id: "1.5",
    title: "The Nitrogen Cycle",
    summary:
      "Nitrogen moves between atmosphere (N₂), soil (NH₄⁺, NO₃⁻), and organisms via fixation, nitrification, assimilation, ammonification, and denitrification.",
    lesson:
      "About 78% of the atmosphere is N₂, but most organisms can't use it directly — the triple bond is too strong. Nitrogen becomes biologically available through:\n\n1. **Nitrogen fixation**: N₂ → NH₃ / NH₄⁺. Performed by **Rhizobium** bacteria (in legume root nodules), free-living soil bacteria (Azotobacter), and cyanobacteria. Industrial **Haber-Bosch** process (fertilizer manufacture) fixes roughly as much N as all biological fixation combined.\n2. **Nitrification**: NH₄⁺ → NO₂⁻ → NO₃⁻. Performed by nitrifying bacteria (Nitrosomonas, Nitrobacter). NO₃⁻ is the form most plants prefer.\n3. **Assimilation**: plants take up NH₄⁺ or NO₃⁻ into proteins and nucleic acids; animals eat plants or each other.\n4. **Ammonification**: decomposers return nitrogen to soil as NH₄⁺ from dead organisms and waste.\n5. **Denitrification**: anaerobic bacteria convert NO₃⁻ → N₂ back to atmosphere.\n\nLightning also fixes a small amount of atmospheric N per year.\n\n**Human impacts**:\n- Synthetic fertilizer (Haber-Bosch) doubled the global nitrogen cycle. Runoff causes eutrophication (8.5) and dead zones (e.g., Gulf of Mexico).\n- Fossil fuel combustion releases NO_x → contributes to photochemical smog (7.2) and acid rain (7.7).\n- Animal agriculture concentrates N in manure lagoons → local pollution.",
    keyIdeas: [
      "Five steps: fixation, nitrification, assimilation, ammonification, denitrification.",
      "Atmospheric N₂ is inert to most organisms; bacteria and Haber-Bosch fix it.",
      "Plants use NH₄⁺ and NO₃⁻, not N₂.",
      "Fertilizers cause runoff → eutrophication; combustion makes NO_x → smog/acid rain.",
    ],
    commonMistakes: [
      "Thinking plants pull N directly from the atmosphere.",
      "Confusing nitrification (adds oxygen) with denitrification (removes oxygen, releases N₂).",
      "Forgetting Haber-Bosch is a human-scale input that rivals natural fixation.",
    ],
  },
  "1.6": {
    id: "1.6",
    title: "The Phosphorus Cycle",
    summary:
      "Phosphorus has no atmospheric phase — it cycles through rock weathering, soil, water, organisms, and sediments. Often the limiting nutrient in freshwater systems.",
    lesson:
      "Unlike carbon and nitrogen, **phosphorus has no significant atmospheric reservoir**. It cycles through:\n\n- **Rocks**: phosphate (PO₄³⁻) in apatite weathers slowly into soils and water.\n- **Soil and water**: dissolved phosphate.\n- **Organisms**: assimilated into DNA, RNA, ATP, phospholipids, and bones.\n- **Sediments**: dead organisms and waste eventually settle on ocean floors; over millions of years, tectonic uplift returns sediments to the surface.\n\nBecause weathering is slow, phosphorus is often the **limiting nutrient** in freshwater ecosystems — adding it spikes algal growth.\n\n**Human impacts**:\n- **Mining** phosphate rock for fertilizer (major sources: Morocco, USA, China) — reserves are finite.\n- **Runoff** from agricultural fertilizer and manure → eutrophication (8.5).\n- **Detergents** historically contained phosphates; banned in many countries.\n- **Sewage treatment** now includes phosphorus removal in many plants.\n\nPeak phosphorus is a real concern: unlike nitrogen (which can be fixed from the atmosphere indefinitely), phosphorus can only be mined from rock, and supplies are finite on human timescales.",
    keyIdeas: [
      "No atmospheric phase — cycle goes rock → soil/water → organisms → sediments → rock.",
      "Often the limiting nutrient in freshwater ecosystems.",
      "Mined for fertilizer; supply is finite.",
      "Runoff causes eutrophication just like nitrogen runoff.",
    ],
    commonMistakes: [
      "Assuming P behaves like N or C with an atmospheric reservoir.",
      "Ignoring P as a limiting nutrient in lakes and ponds.",
      "Forgetting that mined P is effectively nonrenewable.",
    ],
  },
  "1.7": {
    id: "1.7",
    title: "The Hydrologic (Water) Cycle",
    summary:
      "Water moves among ocean, atmosphere, and land via evaporation, transpiration, condensation, precipitation, runoff, infiltration, and groundwater flow.",
    lesson:
      "Earth's water is ~97% salt water (oceans), ~2% glacial ice, <1% accessible freshwater. The hydrologic cycle moves water between these reservoirs through:\n\n- **Evaporation**: liquid → vapor; powered by solar energy. Oceans dominate.\n- **Transpiration**: water vapor released from plant leaves; \"evapotranspiration\" combines evaporation and transpiration.\n- **Condensation**: vapor → droplets, forming clouds.\n- **Precipitation**: rain, snow, sleet, hail.\n- **Runoff**: surface flow into streams, rivers, lakes, and back to ocean.\n- **Infiltration**: water soaking into soil.\n- **Percolation**: downward movement of water to **aquifers** (groundwater reservoirs).\n- **Groundwater flow**: slow subsurface movement toward discharge zones (springs, streams, oceans).\n\n**Human impacts**:\n- **Aquifer depletion** (Ogallala aquifer in central US, North China Plain) where withdrawal exceeds recharge → subsidence, saltwater intrusion in coastal aquifers.\n- **Urbanization**: impervious surfaces increase runoff, decrease infiltration → flash flooding, reduced groundwater recharge (see 5.13).\n- **Deforestation**: removes transpiration, reduces local rainfall, increases erosion.\n- **Dams and diversions**: alter flow regimes, sediment transport, estuarine salinity.\n- **Climate change**: intensifies the hydrologic cycle — more droughts in dry regions, heavier rains in wet regions.",
    keyIdeas: [
      "Processes: evaporation, transpiration, condensation, precipitation, runoff, infiltration, percolation.",
      "Only ~1% of Earth's water is accessible freshwater.",
      "Aquifers recharge slowly; depletion causes subsidence and saltwater intrusion.",
      "Climate change intensifies hydrologic extremes.",
    ],
    commonMistakes: [
      "Forgetting transpiration — plants move huge volumes of water.",
      "Treating groundwater as a fast reservoir — it can take thousands of years to recharge.",
      "Ignoring urbanization's role in increasing runoff relative to infiltration.",
    ],
  },
  "1.8": {
    id: "1.8",
    title: "Primary Productivity",
    summary:
      "Primary productivity is the rate at which producers convert sunlight into biomass. GPP minus respiration equals NPP, which is what feeds the food web.",
    lesson:
      "**Primary productivity** is the rate at which autotrophs (mainly plants, algae, and photosynthetic bacteria) convert sunlight into chemical energy (biomass).\n\n- **Gross primary productivity (GPP)**: total biomass produced per unit area per time.\n- **Net primary productivity (NPP)** = GPP − R, where R is the producer's own respiration. Units: kcal/m²/yr or g/m²/yr.\n\nOnly NPP is available to consumers. GPP about 50% is lost to respiration.\n\n**Productivity by biome** (highest to lowest):\n- Tropical rainforests, estuaries, coral reefs, swamps/marshes: ~2,000+ g/m²/yr.\n- Temperate forests, grasslands: ~600–1,200.\n- Boreal forests, agricultural land: ~400–800.\n- Deserts, tundra, open ocean: <100–200.\n\nThe **open ocean** has low productivity *per area* but huge total because of sheer size — it still contributes about half of global NPP.\n\n**Limiting factors**: sunlight, temperature, water, nutrients (especially N and P). Agricultural productivity is raised by removing nutrient limits (fertilizer) and water limits (irrigation).\n\nNPP is the foundation: everything above producers in the food web depends on it (1.10, 1.11).",
    keyIdeas: [
      "GPP = total photosynthetic production; NPP = GPP − respiration.",
      "Only NPP is available to consumers.",
      "Tropical rainforests, estuaries, coral reefs have highest per-area NPP.",
      "Limits: sunlight, water, temperature, nutrients.",
    ],
    commonMistakes: [
      "Using GPP where NPP is the right measure.",
      "Claiming the open ocean is unproductive — low per area, huge total.",
      "Forgetting respiration is subtracted to get NPP.",
    ],
  },
  "1.9": {
    id: "1.9",
    title: "Trophic Levels",
    summary:
      "Trophic levels are feeding positions in a food chain: producers, primary/secondary/tertiary consumers, and decomposers.",
    lesson:
      "A **trophic level** is an organism's position in the feeding hierarchy:\n\n- **Producers (autotrophs, level 1)**: plants, algae, photosynthetic bacteria, chemosynthetic bacteria (deep-sea vents).\n- **Primary consumers (herbivores, level 2)**: eat producers. Examples: rabbits, deer, zooplankton, grasshoppers.\n- **Secondary consumers (level 3)**: eat primary consumers. Snakes eating rabbits, small fish eating zooplankton.\n- **Tertiary consumers (level 4)**: eat secondary consumers. Owls, large fish, lions.\n- **Quaternary consumers (level 5)**: apex predators. Sharks, eagles.\n- **Decomposers / detritivores**: fungi, bacteria, earthworms — break down dead organic matter from every level, returning nutrients to soil.\n\n**Omnivores** straddle levels (humans, bears, raccoons). Most real ecosystems are food *webs* (1.11), not simple chains.\n\n**Biomass pyramids**: biomass decreases sharply at each higher trophic level because of energy loss (1.10). A typical forest has orders of magnitude more plant biomass than top-predator biomass.\n\n**Apex predators** are especially vulnerable — low population density, high biomagnification load (8.8), high sensitivity to habitat fragmentation.",
    keyIdeas: [
      "Producers → primary → secondary → tertiary → apex consumers.",
      "Decomposers recycle nutrients across all levels.",
      "Biomass shrinks up the pyramid due to energy losses.",
      "Apex predators are disproportionately vulnerable.",
    ],
    commonMistakes: [
      "Placing decomposers outside the food chain — they're central.",
      "Ignoring omnivores or assigning them a single trophic level.",
      "Assuming food chains are linear — real ones branch into webs.",
    ],
  },
  "1.10": {
    id: "1.10",
    title: "Energy Flow and the 10% Rule",
    summary:
      "Roughly 10% of energy at one trophic level passes to the next. The rest is lost as heat (respiration) or as uneaten/undigested material.",
    lesson:
      "Energy flow through food chains is inefficient. The **10% rule** states that on average only ~10% of the energy stored in one trophic level is incorporated into the biomass of the next level. The other ~90% is lost to:\n\n- **Cellular respiration** (heat lost doing work).\n- **Uneaten material** (plant parts consumers can't access).\n- **Undigested material** (feces).\n- **Movement and maintenance** — warm-blooded animals spend much more energy on this than cold-blooded ones.\n\nEfficiency varies: herbivore-to-carnivore transfers can reach ~15%; some aquatic systems exceed 20% because fish (cold-blooded) waste less on thermoregulation. The 10% figure is a useful default.\n\n**Consequences**:\n- Short food chains (3–4 levels) are more energy-efficient than long ones.\n- Apex predators can only be supported where producer biomass is large.\n- Eating lower on the food chain (plants, herbivores) feeds more people per hectare of land than eating higher (meat). A hectare growing grain feeds ~10× more people than a hectare grazing beef cattle.\n\nSample calculation: 10,000 kcal of grass → 1,000 kcal of rabbit → 100 kcal of fox → 10 kcal of eagle. Four trophic steps lose 99.9% of the original energy.",
    keyIdeas: [
      "~10% of energy transfers to the next trophic level; ~90% is lost.",
      "Losses: respiration (heat), uneaten, undigested, maintenance.",
      "Food chains are typically ≤ 4–5 levels long because of these losses.",
      "Lower-trophic-level diets support more people per unit land.",
    ],
    workedExample: {
      prompt:
        "A grassland has 100,000 kcal/m²/yr of NPP. Using the 10% rule, how much energy reaches tertiary consumers?",
      solution:
        "Producer NPP: 100,000 kcal. Primary consumers: 10,000. Secondary: 1,000. Tertiary: 100 kcal/m²/yr.",
    },
    commonMistakes: [
      "Using exactly 10% in every scenario without noting it's an average.",
      "Forgetting metabolic heat loss in the \"90%\" lost fraction.",
      "Confusing energy transfer with biomass transfer (related but not identical).",
    ],
  },
  "1.11": {
    id: "1.11",
    title: "Food Chains and Food Webs",
    summary:
      "Food chains show a single feeding path; food webs show the interconnected network. Loss of a species ripples through connected links.",
    lesson:
      "A **food chain** is a linear sequence of who-eats-whom: grass → grasshopper → frog → snake → hawk. Useful for teaching energy flow (1.10), but oversimplified.\n\nA **food web** is the interconnected network of feeding relationships in an ecosystem. Real organisms often eat multiple prey species and are eaten by multiple predators. Food webs are more stable than chains — if one prey species disappears, predators can shift to others.\n\n**Keystone species** have a disproportionate effect on the structure of the community relative to their biomass. Classic example: sea otters along the Pacific coast eat sea urchins; without otters, urchins devastate kelp forests. Remove a keystone species and the web collapses into a different configuration.\n\n**Trophic cascades**: effects at one level propagate multiple levels away. Reintroducing wolves to Yellowstone reduced elk populations, let willows recover, brought beavers back, reshaped rivers — an ecosystem-level cascade.\n\n**Invasive species** (9.8) that enter without natural predators can disrupt native webs — the new predator may dominate; the new prey may outcompete natives; the new pathogen may wipe out populations without immunity.\n\nBroader resilience: webs with high diversity and many redundant links tend to withstand disturbance better than simple chains.",
    keyIdeas: [
      "Food chain = linear; food web = network of chains.",
      "Keystone species have outsized effects on community structure.",
      "Trophic cascades: changes at one level propagate upward/downward.",
      "Web complexity tends to increase resilience.",
    ],
    commonMistakes: [
      "Treating a chain as if it captures ecosystem dynamics.",
      "Equating \"abundant\" with \"keystone\" — keystone is about impact, not population size.",
      "Ignoring decomposers when drawing webs.",
    ],
  },

  // =========================================================================
  // UNIT 2 — THE LIVING WORLD: BIODIVERSITY
  // =========================================================================
  "2.1": {
    id: "2.1",
    title: "Introduction to Biodiversity",
    summary:
      "Biodiversity has three levels — genetic, species, and ecosystem — and higher biodiversity generally increases ecosystem resilience and productivity.",
    lesson:
      "**Biodiversity** is the variety of life at three levels:\n\n- **Genetic diversity**: variation in alleles within a species. High genetic diversity lets a population adapt to changing conditions and resist disease.\n- **Species diversity**: the number of species (**species richness**) and their relative abundances (**evenness**) in a community.\n- **Ecosystem (habitat) diversity**: variety of ecosystems in a region.\n\nTwo common metrics:\n- **Species richness** = count of species.\n- **Simpson's / Shannon indices** incorporate evenness — a community with 100 evenly distributed species has higher diversity than one dominated by a single species.\n\n**Why diversity matters**:\n- **Resilience**: diverse ecosystems recover from disturbance faster.\n- **Productivity**: higher diversity often means higher NPP (complementary resource use).\n- **Ecosystem services** (2.2): pollination, water filtration, climate regulation all depend on diverse biota.\n- **Medicinal and economic value**: many drugs originate in natural compounds; agricultural varieties need wild genetic stocks for breeding.\n\n**Hotspots** are regions with unusually high biodiversity that are also under severe threat — Madagascar, the Amazon, Southeast Asian forests, Mediterranean basins. Conservation prioritizes hotspots because protecting a small area safeguards many species.",
    keyIdeas: [
      "Three levels: genetic, species, ecosystem.",
      "Species diversity = richness + evenness.",
      "Diverse systems are more resilient and productive.",
      "Hotspots concentrate biodiversity under high threat — priority for conservation.",
    ],
    commonMistakes: [
      "Treating richness alone as the whole picture — evenness matters too.",
      "Forgetting genetic diversity within a species.",
      "Ignoring the service/economic value of biodiversity.",
    ],
  },
  "2.2": {
    id: "2.2",
    title: "Ecosystem Services",
    summary:
      "Ecosystem services are the benefits humans receive from ecosystems — provisioning, regulating, supporting, and cultural.",
    lesson:
      "**Ecosystem services** are the benefits humans derive from nature. The standard four-category framework:\n\n- **Provisioning**: food, fresh water, timber, fiber, medicinal compounds, genetic resources.\n- **Regulating**: climate regulation, water purification, flood control, pollination, pest control, disease regulation.\n- **Supporting**: soil formation, nutrient cycling, primary production, oxygen production. These underpin all others.\n- **Cultural**: recreation, aesthetics, spiritual value, education, tourism.\n\nServices have real economic value even though they're often unpriced. Attempts to quantify them (e.g., Costanza et al. 1997) put global services in the tens of trillions of dollars per year — comparable to global GDP. When a wetland is drained for development, the market gain is visible; the lost flood-control and filtration services are not.\n\n**Examples**:\n- Insect pollination worth ~\\$200 billion/yr to global agriculture; threatened by pesticide use, habitat loss, and disease.\n- Mangroves buffer coastal storms and prevent erosion — removing them for shrimp farms increases hurricane damage.\n- Forests filter and store water; New York City invested in Catskill watershed protection rather than a more expensive filtration plant.\n\nRecognizing services changes cost-benefit calculations for land-use decisions — many conservation measures are economically rational once services are priced.",
    keyIdeas: [
      "Four categories: provisioning, regulating, supporting, cultural.",
      "Services have real economic value even when unpriced.",
      "Losing services often shows up as hidden costs (floods, lost pollination).",
      "Conservation can be economically rational when services are valued.",
    ],
    commonMistakes: [
      "Listing only provisioning (food, wood) and ignoring regulating/cultural/supporting.",
      "Treating ecosystem services as \"free\" and ignoring opportunity costs of losing them.",
      "Confusing biodiversity (variety) with the services (benefits) that diversity provides.",
    ],
  },
  "2.3": {
    id: "2.3",
    title: "Island Biogeography",
    summary:
      "Island biogeography predicts species number from island size (larger = more species) and distance from mainland (closer = more species).",
    lesson:
      "The **theory of island biogeography** (MacArthur & Wilson, 1967) predicts that the number of species on an island reflects a balance between **immigration** (new species arriving) and **extinction** (existing species dying out).\n\nTwo main drivers:\n- **Island size**: larger islands support more habitat and larger populations → lower extinction rate → more species.\n- **Distance from mainland**: closer islands receive more immigrants → higher immigration rate → more species.\n\nGraphically, plot immigration (decreasing with number of species already present) and extinction (increasing with number) curves; their intersection is the equilibrium species count for that island.\n\n**Applications beyond literal islands**:\n- **Habitat islands**: isolated patches of forest in agricultural landscapes, mountain-top ecosystems, lake-fragment systems all behave like islands.\n- **Habitat fragmentation**: breaking a large forest into many small patches creates island-like dynamics, reducing the total number of species supported.\n- **Corridor design**: connecting fragments with biological corridors effectively increases island size and reduces isolation.\n- **Reserve design** (\"SLOSS\" debate — single large or several small): often a single large reserve preserves more species than many small ones for a given total area.\n\nIsland biogeography predicts extinction waves following deforestation: small isolated forest fragments lose species over decades even without further disturbance.",
    keyIdeas: [
      "Species count ≈ balance of immigration vs extinction.",
      "Larger islands support more species; closer islands receive more immigrants.",
      "Habitat fragmentation creates island-like dynamics on land.",
      "Reserve design benefits from large connected areas.",
    ],
    commonMistakes: [
      "Applying only to literal oceanic islands — the theory is general.",
      "Ignoring distance effect and focusing only on size.",
      "Expecting immediate extinction after fragmentation — it plays out over decades (\"extinction debt\").",
    ],
  },
  "2.4": {
    id: "2.4",
    title: "Ecological Tolerance",
    summary:
      "Each species has a range of abiotic conditions it can survive; within that range is an optimum. Beyond its tolerance limits, the organism dies.",
    lesson:
      "Every species has a **range of tolerance** for each abiotic factor — temperature, pH, salinity, moisture, oxygen. Outside the range of tolerance, the organism cannot survive.\n\nWithin the range, performance is best in an **optimum range** (preferred conditions), degrades in **zones of physiological stress** near the edges, and becomes impossible in **zones of intolerance**.\n\nThe graph looks like a bell curve with hard cutoffs — abundance peaks at the optimum and tapers toward the edges.\n\nSeveral factors can limit tolerance simultaneously (**Liebig's law of the minimum**): whichever resource is in shortest supply sets the ceiling, regardless of how abundant others are. A plant with plentiful water, sunlight, and phosphorus but insufficient nitrogen will still be nitrogen-limited.\n\n**Generalist vs specialist**: generalists have wide tolerance ranges (3.1); specialists are narrow. Wide tolerance makes generalists more resilient to environmental change.\n\n**Climate change** and **pollution** shift conditions — organisms either shift their ranges (poleward, upslope), acclimate behaviorally, evolve, or die locally. Mobile species like birds can shift rapidly; soil organisms and slow-growing trees struggle.",
    keyIdeas: [
      "Tolerance range: zones of optimum, stress, intolerance, lethality.",
      "Liebig's law of the minimum: the scarcest resource limits growth.",
      "Generalists tolerate broader conditions than specialists.",
      "Shifting conditions (climate, pollution) force range shifts, acclimation, evolution, or extinction.",
    ],
    commonMistakes: [
      "Treating tolerance as a single cutoff rather than a gradient.",
      "Ignoring multi-factor limits — considering just temperature when multiple factors interact.",
      "Confusing acclimation (individual) with adaptation (population-level evolution).",
    ],
  },
  "2.5": {
    id: "2.5",
    title: "Natural Disruptions to Ecosystems",
    summary:
      "Fires, floods, volcanic eruptions, and climate shifts reshape ecosystems. Many systems are adapted to periodic disturbance.",
    lesson:
      "Natural **disturbances** are part of ecosystem dynamics — rarely do habitats sit in steady state for long.\n\nCommon types:\n- **Fires**: many ecosystems (chaparral, boreal forest, prairie) are fire-adapted — some seeds require heat to germinate; some species resprout quickly. Suppressing fire often backfires (fuel loads build up; eventual fires are catastrophic).\n- **Floods**: part of the regime for riparian ecosystems — floodplains receive sediment, nutrients, and get reset.\n- **Hurricanes, tornadoes**: blow down trees, open canopy gaps, reshape coastlines.\n- **Droughts**: stress vegetation, change species composition, increase fire risk.\n- **Volcanic eruptions**: destroy ecosystems locally; release gases and ash that alter regional climate for years.\n- **Pest outbreaks / disease**: bark beetle outbreaks kill vast forest areas.\n\n**Long-term shifts**:\n- Earth's **Milankovitch cycles** (orbital/axial variations) drive ice-age cycles on 10,000–100,000 year timescales.\n- **Volcanism** over millions of years shaped biomes and mass extinctions.\n- **Meteorite impacts** (K-Pg extinction 66 million years ago) reset whole biotas.\n\nHumans alter disturbance regimes — suppressing fires, straightening rivers to prevent floods, introducing invasive species — often with counterproductive long-term results. Restoration ecology increasingly tries to restore natural disturbance regimes rather than fight them.",
    keyIdeas: [
      "Natural disturbances are normal, not anomalous.",
      "Many ecosystems are fire/flood-adapted; suppression backfires.",
      "Long-term climate shifts (Milankovitch cycles) drive ice ages.",
      "Human alteration of disturbance regimes often has unintended effects.",
    ],
    commonMistakes: [
      "Viewing disturbance as purely destructive — it resets and renews systems.",
      "Ignoring that fire suppression increases eventual fire severity.",
      "Confusing disturbance (event) with succession (recovery trajectory).",
    ],
  },
  "2.6": {
    id: "2.6",
    title: "Adaptations",
    summary:
      "Adaptations are heritable traits that improve survival/reproduction in a specific environment. Natural selection acts on variation within populations.",
    lesson:
      "An **adaptation** is a heritable trait that improves an organism's fitness in its environment. Adaptations arise through **natural selection**: individuals with traits that enhance survival and reproduction leave more offspring; those traits become more common in the population.\n\nFor evolution by natural selection, three conditions must hold:\n1. **Variation** in the trait within the population.\n2. **Heritability** — traits pass from parents to offspring.\n3. **Differential reproductive success** — some variants leave more offspring than others.\n\nExamples:\n- **Structural**: thick fur in arctic mammals; spines on cacti; wings for flight.\n- **Physiological**: antifreeze proteins in Antarctic fish; kangaroo rats concentrate urine extremely to save water.\n- **Behavioral**: migration, hibernation, mating displays, communal hunting.\n- **Life history**: annual plants vs perennial; K vs r reproductive strategies (3.2).\n\nAdaptations are responses to **selective pressures** — climate, predators, competitors, food availability, mates. They are local and specific: polar bears' adaptations to Arctic conditions would be fatal in the tropics.\n\n**Rate of evolution**: usually slow (thousands of generations), but can be fast when selection is strong. Pesticide resistance in insects, antibiotic resistance in bacteria, industrial melanism in peppered moths all evolved within decades under intense selection.\n\n**Limits**: evolution is constrained by existing genetic variation and morphology. Species can't evolve what they have no genetic basis for. When environments change faster than adaptation can keep up, extinction follows.",
    keyIdeas: [
      "Adaptation = heritable trait that improves fitness.",
      "Natural selection needs variation, heritability, and differential reproduction.",
      "Structural, physiological, behavioral, and life-history adaptations exist.",
      "Rapid evolution is real under strong selection (pesticide/antibiotic resistance).",
    ],
    commonMistakes: [
      "Claiming organisms adapt \"on purpose\" — evolution is not goal-directed.",
      "Confusing individual acclimation with population adaptation.",
      "Assuming all traits are adaptations (some are byproducts or neutral).",
    ],
  },
  "2.7": {
    id: "2.7",
    title: "Ecological Succession",
    summary:
      "Succession is the directional change in a community over time after disturbance. Primary (bare rock) starts from scratch; secondary (post-fire field) builds on existing soil.",
    lesson:
      "**Ecological succession** is the predictable sequence of community changes in an area over time after disturbance.\n\n**Primary succession** occurs on newly exposed substrate with no soil — lava flows, retreating glaciers, bare rock. Sequence:\n1. **Pioneer species** (lichens, mosses) colonize bare rock, secrete acids that break it down, and begin soil formation.\n2. Small plants (grasses, herbs) establish as soil accumulates.\n3. Shrubs and small trees replace them.\n4. Larger, slower-growing trees eventually dominate.\n5. A **climax community** is reached — a relatively stable long-term composition determined by regional climate.\n\nPrimary succession takes hundreds to thousands of years because soil building is slow.\n\n**Secondary succession** occurs where disturbance removes vegetation but leaves soil intact — after fire, flood, logging, abandoned farmland.\n1. Annual weeds colonize first (quick-reproducing, wind-dispersed seeds).\n2. Perennial herbs and grasses.\n3. Shrubs and pioneer trees (aspen, birch, pine).\n4. Late-successional species (oak, maple, hickory in temperate eastern US).\n\nSecondary succession is much faster — decades to a couple centuries.\n\n**Modern view**: \"climax communities\" are less fixed than the classical model suggested; disturbance regimes (fire intervals, flooding cycles) keep many ecosystems in perpetual mid-succession states. The **intermediate disturbance hypothesis** suggests species diversity peaks at moderate disturbance frequencies.",
    keyIdeas: [
      "Primary succession: starts from bare substrate, no soil; slow.",
      "Secondary succession: starts with intact soil; faster.",
      "Pioneer species are small, fast-growing, hardy (lichens, annuals).",
      "Climax communities depend on regional climate; often held in mid-succession by disturbance.",
    ],
    commonMistakes: [
      "Calling abandoned farmland primary succession (it's secondary — soil is present).",
      "Expecting succession to always reach a final static climax.",
      "Ignoring disturbance regimes that keep ecosystems cycling.",
    ],
  },

  // =========================================================================
  // UNIT 3 — POPULATIONS
  // =========================================================================
  "3.1": {
    id: "3.1",
    title: "Generalist and Specialist Species",
    summary:
      "Generalists use many resources and habitats; specialists rely on few. Generalists are more resilient to change; specialists are more efficient in stable conditions.",
    lesson:
      "Species differ in their **niche breadth** — the range of resources, habitats, and conditions they tolerate.\n\n**Generalists** have wide niches. They eat many foods, live in many habitats, and adapt to varied conditions. Examples: raccoons, coyotes, cockroaches, humans, dandelions, white-tailed deer. Generalists cope well with change, including human disturbance.\n\n**Specialists** have narrow niches. They depend on specific foods, habitats, or conditions. Examples: giant panda (bamboo), koala (eucalyptus), pitcher plants (nutrient-poor bogs), monarch butterfly larvae (milkweed), spotted owl (old-growth forest). Specialists excel at their niche but are vulnerable when conditions shift.\n\n**Trade-offs**:\n- **Stable environments favor specialists** — tight adaptation outcompetes generalists when the target resource is reliable.\n- **Changing environments favor generalists** — flexibility is more valuable than optimization.\n\n**Human effects**: anthropogenic change disproportionately harms specialists (habitat loss, climate change remove their narrow niches). Many urban wildlife species are generalists that thrive in human-altered landscapes (pigeons, rats, raccoons).\n\nMost invasive species (9.8) are generalists — they can exploit new environments where they lack evolved predators or pathogens.",
    keyIdeas: [
      "Generalists: wide niche, resilient to change.",
      "Specialists: narrow niche, efficient but vulnerable.",
      "Stable environments favor specialists; changing ones favor generalists.",
      "Human impact disproportionately threatens specialists.",
    ],
    commonMistakes: [
      "Treating specialist as \"advanced\" — it's niche width, not a ranking.",
      "Assuming generalists are always common — many are, but it depends on the system.",
      "Forgetting the stability-vs-change trade-off.",
    ],
  },
  "3.2": {
    id: "3.2",
    title: "K-Selected and r-Selected Species",
    summary:
      "r-selected species invest in many offspring with little parental care; K-selected species invest in few offspring with heavy investment.",
    lesson:
      "**r-selected** species maximize growth rate (\\(r\\)). Traits:\n- Many offspring per reproductive event.\n- Little or no parental care.\n- Short lifespan, early sexual maturity.\n- High infant mortality but high population recovery after crashes.\n- Examples: insects, weeds, bacteria, frogs, oysters, mice, dandelions.\n\nWell-suited to **unstable environments** — boom/bust dynamics, rapid colonization of new habitats.\n\n**K-selected** species optimize for carrying capacity (\\(K\\)). Traits:\n- Few offspring; heavy parental investment.\n- Long lifespan, late sexual maturity.\n- Low infant mortality, low reproductive output per individual.\n- Competitive adults persist for years or decades.\n- Examples: elephants, whales, humans, oak trees, most primates, albatrosses.\n\nBest suited to **stable environments** near carrying capacity, where competition for resources matters more than rapid reproduction.\n\n**Spectrum, not categories**: most species fall between extremes. Humans have few offspring (K-ish) but can colonize new habitats rapidly (r-ish). Many fish release millions of eggs (r) but also live long and grow slowly (K-ish).\n\n**Conservation implications**: K-selected species (large mammals, slow-reproducing trees) are harder to recover from disturbance because they reproduce slowly. r-selected species can rebound rapidly from near-extinction if habitat exists. This is why whales and elephants get more conservation attention per individual — losses are harder to replace.",
    keyIdeas: [
      "r-selected: many offspring, low investment, short life, unstable habitats.",
      "K-selected: few offspring, high investment, long life, stable habitats.",
      "A continuum, not a dichotomy.",
      "K-selected species are slower to recover from disturbance.",
    ],
    commonMistakes: [
      "Treating the two categories as absolute.",
      "Ignoring that humans don't fit cleanly into either.",
      "Assuming large = K-selected (mostly true but not always).",
    ],
  },
  "3.3": {
    id: "3.3",
    title: "Survivorship Curves",
    summary:
      "Type I (high survival until old age — K-selected, humans), Type II (constant mortality — birds), Type III (high early mortality — r-selected, oysters).",
    lesson:
      "A **survivorship curve** plots the number of surviving individuals from a cohort against age (log scale on y-axis). Three idealized shapes:\n\n- **Type I (convex)**: low mortality early; most deaths in old age. Characteristic of **K-selected** species with few offspring and heavy parental care. Humans, elephants, most large mammals.\n- **Type II (straight line)**: constant mortality rate across all ages. Many birds, small mammals, reptiles. Equal chance of dying at any age.\n- **Type III (concave)**: very high mortality early (most young die); the few that survive live long. Characteristic of **r-selected** species with many offspring and no parental care. Oysters, frogs, fish, plants producing many seeds.\n\nIn practice, real species show combinations — e.g., humans historically had Type III-like infant mortality followed by Type I adulthood, smoothing toward pure Type I as medicine reduced early deaths.\n\n**Uses**:\n- Comparing reproductive strategies.\n- Life-insurance actuarial tables are essentially Type I curves.\n- Conservation: species with Type I curves are sensitive to adult mortality (poaching, fishing); species with Type III can tolerate juvenile losses but are vulnerable if recruitment fails.\n\nData come from cohort studies (follow a birth cohort over time) or cross-sectional snapshots (ages of deaths in a population).",
    keyIdeas: [
      "Type I: survive well, die old (K-selected, human-like).",
      "Type II: constant death rate (many birds).",
      "Type III: die young, survivors live long (r-selected, oyster-like).",
      "Real curves often blend types; humans shifted from III-toward-I historically.",
    ],
    commonMistakes: [
      "Mixing up Type I and Type III.",
      "Plotting on a linear y-axis (should be logarithmic to reveal shape).",
      "Forgetting that real species blend types.",
    ],
  },
  "3.4": {
    id: "3.4",
    title: "Carrying Capacity",
    summary:
      "Carrying capacity (K) is the maximum population size an environment can sustain long-term. Exceeding K causes resource depletion and population crash.",
    lesson:
      "**Carrying capacity (K)** is the maximum population size of a species that an environment can support indefinitely, given resource availability (food, water, shelter, space).\n\nLogistic growth model:\n\n$$\\frac{dN}{dt} = rN\\left(1 - \\frac{N}{K}\\right).$$\n\n- Near \\(N = 0\\): growth is nearly exponential (\\(\\approx rN\\)).\n- Near \\(N = K\\): growth slows (the \\((1 - N/K)\\) term approaches 0).\n- At \\(N = K\\): growth stops.\n\nPlot gives a sigmoid S-curve.\n\n**Overshoot and crash**: if a population exceeds K (via fast growth, resource pulse, or lag), resources are depleted faster than they regenerate, and the population crashes back (sometimes below K). The classic reindeer-on-St.-Matthew-Island story is an overshoot: introduced reindeer consumed all the lichen in ~30 years, then starved.\n\n**Density-dependent factors** (limit population as it grows): competition, predation, disease, parasitism, waste buildup. They keep populations near K.\n\n**Density-independent factors** (affect all individuals regardless of density): weather extremes, volcanic eruptions, fires. They can drive populations far below K.\n\n**K is not fixed**: it depends on resource availability, which changes with season, climate, and human activity. Habitat destruction reduces K; irrigation can raise it temporarily.",
    keyIdeas: [
      "K = max sustainable population; set by resource availability.",
      "Logistic growth: \\(dN/dt = rN(1 - N/K)\\); sigmoid curve.",
      "Overshoot → crash when resources are depleted.",
      "Density-dependent vs density-independent limits.",
    ],
    workedExample: {
      prompt:
        "A population of 100 rabbits has \\(r = 0.5\\) and \\(K = 1000\\). Find its instantaneous growth rate.",
      solution:
        "\\(dN/dt = rN(1 - N/K) = 0.5\\cdot 100\\cdot (1 - 0.1) = 45\\) rabbits/time unit.",
    },
    commonMistakes: [
      "Treating K as a constant of nature rather than a function of resources.",
      "Confusing density-dependent and density-independent factors.",
      "Expecting perfect S-curves in nature (real populations oscillate around K).",
    ],
  },
  "3.5": {
    id: "3.5",
    title: "Population Growth and Resource Availability",
    summary:
      "Exponential growth (J-curve) occurs with unlimited resources; logistic growth (S-curve) emerges when resources become limiting.",
    lesson:
      "Two idealized population-growth models:\n\n**Exponential growth** (J-curve) assumes unlimited resources:\n\n$$\\frac{dN}{dt} = rN\\ \\Rightarrow\\ N(t) = N_0 e^{rt}.$$\n\nGrowth rate is proportional to current population — bigger means faster. Produces a J-shaped curve with no upper limit. Only approximated in real systems when a population first colonizes new habitat or after a crash.\n\n**Logistic growth** (S-curve) adds resource limitation:\n\n$$\\frac{dN}{dt} = rN\\left(1 - \\frac{N}{K}\\right).$$\n\nAt low densities, behaves exponentially. Near \\(K\\), growth slows to zero. S-shaped curve.\n\n**Biotic potential**: the maximum possible growth rate \\(r\\) under ideal conditions — unlimited food, water, space, no disease, no predation. Real growth is always below biotic potential due to **environmental resistance** (density-dependent limits).\n\n**Population pyramids and age structure** (3.6) shape real trajectories — a growing population has more young individuals, which accelerates growth; a shrinking one is older, which amplifies decline.\n\n**Human population** has shown roughly exponential growth over the past few centuries, though growth rates have been declining since ~1970. The global population curve is expected to level off mid-century, resembling logistic growth with \\(K \\sim 10\\)–11 billion.",
    keyIdeas: [
      "Exponential: \\(N = N_0 e^{rt}\\); J-curve; unlimited resources.",
      "Logistic: \\(dN/dt = rN(1 - N/K)\\); S-curve; K limits growth.",
      "Real growth < biotic potential due to environmental resistance.",
      "Human growth rate peaked ~1970 and has been declining since.",
    ],
    commonMistakes: [
      "Using J-curves for long-term predictions (real systems hit limits).",
      "Forgetting that exponential and logistic agree at very low N.",
      "Confusing growth rate (\\(r\\)) with population size (\\(N\\)).",
    ],
  },
  "3.6": {
    id: "3.6",
    title: "Age Structure Diagrams",
    summary:
      "Age-structure diagrams (population pyramids) show population distribution by age and sex. Shape reveals whether population is growing, stable, or declining.",
    lesson:
      "An **age-structure diagram** (population pyramid) plots age cohorts on the y-axis with male and female counts on the two sides of the x-axis. Shape reveals demographic trends:\n\n- **Expansive** (triangle, wide base): many children relative to adults → rapid growth. Common in developing countries (Niger, Ethiopia, Uganda).\n- **Stationary** (rectangle, roughly equal cohorts): births ≈ deaths → stable population. Most developed countries (US, UK, Canada).\n- **Contractive** (inverted, narrow base): fewer children than adults → shrinking population. Japan, Germany, Italy, South Korea, increasingly China.\n\nWhy shape matters:\n- Expansive populations will continue growing even if fertility drops (population **momentum**), because cohorts currently in their teens will have children.\n- Contractive populations face workforce/pension problems — fewer workers support more retirees.\n\n**Dependency ratio** = (under 15 + over 64) / (15–64). High ratios strain economies.\n\n**Policy responses**:\n- Rapidly growing populations: family-planning access, women's education, economic development.\n- Shrinking populations: pro-natalist policies, immigration, longer working lives.\n\nAge-structure diagrams tie to demographic transition (3.9) — countries move through characteristic shapes as they develop.",
    keyIdeas: [
      "Shape: expansive = triangle (growth); stationary = rectangle; contractive = inverted.",
      "Expansive populations have built-in growth momentum even with falling fertility.",
      "Dependency ratio = dependents / working-age.",
      "Shape tracks demographic transition stages.",
    ],
    commonMistakes: [
      "Reading the shape as purely current fertility, ignoring age momentum.",
      "Forgetting the x-axis often shows absolute numbers, sometimes percentages.",
      "Confusing age structure with survivorship curves (different axes).",
    ],
  },
  "3.7": {
    id: "3.7",
    title: "Total Fertility Rate",
    summary:
      "TFR = average number of children per woman over her lifetime. Replacement rate ≈ 2.1; below → population decline; above → growth.",
    lesson:
      "**Total fertility rate (TFR)** is the average number of children a woman would bear over her lifetime at current age-specific fertility rates. Units: children per woman.\n\n**Replacement-level fertility**: TFR ≈ 2.1 in developed countries (slightly above 2.0 to account for child mortality). Below replacement, a population shrinks (without immigration); above, it grows.\n\n**Patterns**:\n- Developed countries: TFR generally 1.3–2.0 (Japan, Italy, South Korea very low).\n- Rapidly developing countries: TFR falling toward replacement.\n- Least-developed countries: TFR 3–5+ (sub-Saharan Africa highest).\n\n**Factors lowering TFR**:\n- Women's education.\n- Access to contraception and family planning.\n- Urbanization (children are less economic assets in cities).\n- Child mortality declines (no need for large family as insurance).\n- Delayed marriage / career-first trajectories.\n\n**Factors raising TFR**:\n- Agricultural economies where child labor helps.\n- Cultural / religious norms favoring large families.\n- Low status of women.\n- High child mortality.\n\n**Global trend**: TFR has been falling almost everywhere since 1960 (global TFR ~5 in 1960 → ~2.3 today). Projection: global population peaks mid-century.\n\n**TFR ≠ growth rate**: a country can have TFR well above 2 but shrinking population if death rate is high (wars, disease).",
    keyIdeas: [
      "TFR = children per woman; replacement ≈ 2.1.",
      "Below replacement ⇒ population shrinks (without immigration).",
      "Education, contraception, urbanization drop TFR.",
      "Global TFR has fallen from ~5 to ~2.3 since 1960.",
    ],
    commonMistakes: [
      "Confusing TFR with birth rate (births per 1000 people, different denominator).",
      "Ignoring immigration, which can offset low TFR.",
      "Assuming TFR = growth rate (death rate matters too).",
    ],
  },
  "3.8": {
    id: "3.8",
    title: "Human Population Dynamics",
    summary:
      "Global population crossed 8 billion in 2022, driven by falling death rates with lagging fertility declines. Growth is now concentrated in sub-Saharan Africa.",
    lesson:
      "Global human population at a glance: ~1 billion in 1800, 2 billion in 1927, 4 billion in 1974, 8 billion in 2022. UN projections: peak around 10.4 billion in the 2080s, then decline.\n\n**Crude birth rate (CBR)** = births per 1000 people per year.\n**Crude death rate (CDR)** = deaths per 1000 per year.\n**Rate of natural increase** = (CBR − CDR)/10 = %/yr.\n**Population doubling time** (the **rule of 70**): years to double ≈ 70 / annual % growth rate.\n\nGlobal growth rate peaked near 2.1%/yr in the late 1960s and has since fallen to ~0.9%/yr. Falling rate, but a much larger base — annual population additions peaked later, around 90 million/yr.\n\n**Regional trends**:\n- **Africa**: TFR still high (>4 in many countries); population will roughly double by 2100.\n- **Asia**: most countries at or below replacement; China and India now comparable in size.\n- **Europe / North America**: flat or slowly shrinking without immigration.\n- **Latin America**: near replacement-level fertility.\n\n**Drivers of rapid growth (20th century)**:\n- Medical advances → lower child and infant mortality.\n- Green Revolution (5.3) → more food.\n- Public health (vaccines, sanitation, antibiotics) → lower death rates.\n- Lagging fertility decline → compounding growth.\n\n**Current challenges**: sub-Saharan population growth requires massive expansion of education, healthcare, food, and jobs; simultaneously, aging societies face pension and workforce gaps (Japan, South Korea, Italy).",
    keyIdeas: [
      "World population: 1 B (1800) → 8 B (2022); expected peak ~10.4 B around 2080.",
      "Rule of 70: doubling time ≈ 70 / (% growth rate).",
      "Most growth now in sub-Saharan Africa.",
      "Developed world faces aging populations and workforce pressures.",
    ],
    workedExample: {
      prompt:
        "A country has CBR = 30, CDR = 10. Find the annual growth rate and doubling time.",
      solution:
        "Growth rate = (30 − 10)/10 = 2.0 %/yr. Doubling time ≈ 70/2 = 35 years.",
    },
    commonMistakes: [
      "Dividing CBR − CDR by 100 instead of 1000 (the denominator is 1000 people).",
      "Using the rule of 70 with absolute growth instead of percent.",
      "Assuming population growth everywhere is still rapid — it's concentrated regionally.",
    ],
  },
  "3.9": {
    id: "3.9",
    title: "Demographic Transition",
    summary:
      "Countries move through four stages: high birth/death (pre-industrial), falling death (transitional), falling birth (industrial), low birth/death (post-industrial).",
    lesson:
      "The **demographic transition model** describes four stages countries pass through as they industrialize:\n\n- **Stage 1 (pre-industrial)**: high CBR, high CDR. Population stable or slowly growing. Subsistence agriculture; high child mortality. No country is fully in Stage 1 today.\n- **Stage 2 (transitional)**: CDR falls sharply (sanitation, vaccines, food supply). CBR stays high. Population grows rapidly. Sub-Saharan Africa, some of South Asia.\n- **Stage 3 (industrial)**: CBR falls (urbanization, women's education, access to contraception, lower child mortality reduces need for large families). Growth slows. Latin America, China, India have largely moved through this stage.\n- **Stage 4 (post-industrial)**: low CBR, low CDR. Population stable or slightly shrinking. US, Europe, Japan, South Korea.\n- Some demographers add a **Stage 5**: CBR below CDR → population shrinks without immigration. Japan, Germany, Italy.\n\n**Drivers of the transition**:\n- Death rate drops first (easier: medicine, food, sanitation) — this causes Stage 2 growth spike.\n- Birth rate drops later (cultural/economic shifts lag) — this causes Stage 3 slowdown.\n- Total population grows substantially during the transition (often doubling or tripling) before stabilizing.\n\n**Applied**: the demographic transition explains why global population has grown so fast and why it is projected to stabilize. Policy-wise, accelerating the transition (women's education, healthcare, family planning) is the most effective humanitarian approach to population concerns.",
    keyIdeas: [
      "Stage 1: high CBR & CDR; stable. 2: CDR drops, rapid growth. 3: CBR drops, slowdown. 4: low CBR & CDR, stable. (5: shrinking.)",
      "Death rate falls before birth rate — creating the population surge.",
      "Sub-Saharan Africa still in Stage 2; most of Asia and Latin America in Stage 3.",
      "Accelerating the transition = women's education, contraception, healthcare.",
    ],
    commonMistakes: [
      "Assuming all countries progress on the same timeline.",
      "Ignoring that death rate drops first (the asymmetry is what creates growth).",
      "Calling Stage 5 universal — it depends on immigration and policy.",
    ],
  },

  // =========================================================================
  // UNIT 4 — EARTH SYSTEMS AND RESOURCES
  // =========================================================================
  "4.1": {
    id: "4.1",
    title: "Plate Tectonics",
    summary:
      "Earth's lithosphere is broken into plates that move over the mantle. Boundaries between plates create earthquakes, volcanoes, and mountain ranges.",
    lesson:
      "Earth's **lithosphere** (crust + upper mantle) is divided into about a dozen major **tectonic plates** that float and move on the ductile **asthenosphere** beneath. Movement is driven by convection in the mantle and by slab pull at subduction zones.\n\n**Three boundary types**:\n\n- **Divergent** (plates move apart): new crust forms at **mid-ocean ridges** (e.g., Mid-Atlantic Ridge) and rift valleys (East African Rift). Basaltic volcanism.\n- **Convergent** (plates collide):\n  - **Oceanic-continental** → oceanic plate subducts under lighter continental, forming volcanic arcs and deep trenches (Andes, Cascades).\n  - **Oceanic-oceanic** → older/denser subducts, creating island arcs (Japan, Mariana Islands).\n  - **Continental-continental** → neither subducts; collision builds mountains (Himalayas from India-Eurasia).\n- **Transform** (plates slide past each other): earthquakes but little volcanism (San Andreas Fault).\n\n**Hotspots**: volcanic plumes from deep mantle, roughly stationary as plates move over them. Creates island chains (Hawaiian Islands, Yellowstone track).\n\n**Environmental relevance**:\n- Earthquakes and volcanic eruptions are major natural disturbances.\n- Volcanic soils are among the most fertile (weathered minerals → nutrients).\n- Subduction zones generate most large earthquakes and tsunamis.\n- Tectonic uplift creates mountain ranges that drive regional climate (rain shadows, orographic precipitation).\n- Long-term carbon cycle: subduction stores carbon in the mantle; volcanism releases it.",
    keyIdeas: [
      "Plates move on the asthenosphere via mantle convection.",
      "Divergent, convergent, and transform boundaries each produce distinctive features.",
      "Subduction drives most large earthquakes, tsunamis, and arc volcanism.",
      "Hotspots create island chains independent of plate boundaries.",
    ],
    commonMistakes: [
      "Confusing convergent types — each combination behaves differently.",
      "Claiming hotspots move with plates (they're ~stationary; plates move over them).",
      "Forgetting that volcanic soils are fertile despite eruptions being destructive short-term.",
    ],
  },
  "4.2": {
    id: "4.2",
    title: "Soil Formation and Erosion",
    summary:
      "Soil forms from weathered rock + organic matter over centuries. Erosion (wind, water, ice) removes topsoil faster than it forms when vegetation is disturbed.",
    lesson:
      "**Soil formation** is slow: typically 100–1000 years per cm of topsoil. Drivers (the **CLORPT** acronym):\n- **Climate** (temperature, precipitation).\n- **Organisms** (roots, decomposers, burrowers).\n- **Relief** (topography — slope affects drainage and erosion).\n- **Parent material** (weathered bedrock underlying the soil).\n- **Time**.\n\n**Soil profile** has distinct **horizons** (4.3):\n- **O**: organic matter (leaf litter, humus).\n- **A**: topsoil — dark, rich in organic matter and roots.\n- **E**: eluviated — leached zone (sometimes absent).\n- **B**: subsoil — clay and mineral accumulation.\n- **C**: weathered parent material.\n- **R**: bedrock.\n\n**Erosion** removes topsoil via wind and water. Accelerated by:\n- **Plowing** (especially on slopes).\n- **Overgrazing** (removes vegetation that holds soil).\n- **Deforestation** (roots no longer bind soil).\n- **Construction** (exposes bare soil).\n\nThe 1930s **Dust Bowl** is the classic US example: intensive plowing of native prairie + drought → massive wind erosion of millions of tons of topsoil.\n\n**Prevention**:\n- **Contour plowing** (furrows along contours, not up-down slope).\n- **Terracing** on steep land.\n- **Cover crops** between harvests.\n- **Windbreaks / shelterbelts** (tree rows).\n- **No-till agriculture** leaves residues that protect soil.\n- **Crop rotation** preserves soil structure and nutrients.\n\nTopsoil is effectively a nonrenewable resource on human timescales — losing it to erosion is among the most serious long-term agricultural problems.",
    keyIdeas: [
      "Soil forms slowly (centuries per cm) from weathering + organic input.",
      "CLORPT drivers: Climate, Organisms, Relief, Parent material, Time.",
      "Horizons (top to bottom): O, A, E, B, C, R.",
      "Erosion is accelerated by plowing, grazing, deforestation, construction.",
    ],
    commonMistakes: [
      "Confusing horizon order.",
      "Treating topsoil as quickly renewable — it isn't.",
      "Forgetting that wind erosion matters alongside water erosion.",
    ],
  },
  "4.3": {
    id: "4.3",
    title: "Soil Composition and Properties",
    summary:
      "Soils are mixtures of sand, silt, clay, organic matter, water, and air. Texture, porosity, permeability, pH, and fertility determine what grows.",
    lesson:
      "Soil is ~45% **minerals** (sand, silt, clay), ~5% **organic matter (humus)**, ~25% **water**, ~25% **air** — percentages vary.\n\n**Particle-size classes** (by texture):\n- **Sand** (0.05–2 mm): large, gritty. Drains fast; low water retention.\n- **Silt** (0.002–0.05 mm): medium, feels like flour. Intermediate.\n- **Clay** (< 0.002 mm): tiny particles, sticky when wet. Holds water and nutrients but drains poorly.\n\n**Loam** is roughly equal parts sand, silt, and clay — ideal for most crops (good drainage, good retention).\n\n**Key properties**:\n- **Porosity**: fraction of pore space.\n- **Permeability**: how easily water flows through.\n- **Water-holding capacity**: how much water the soil retains.\n- **Cation-exchange capacity (CEC)**: capacity to hold nutrient cations (K⁺, Ca²⁺, Mg²⁺). Clays and organic matter have high CEC.\n- **pH**: typical soils 5–8. Most crops prefer slightly acidic (6.0–7.0). Too acidic → add lime; too alkaline → add sulfur.\n\n**Soil tests** measure texture, pH, and nutrient levels (N, P, K) to guide amendments.\n\n**Organic matter / humus** improves nearly every property: holds water, slows erosion, feeds microbes, retains nutrients. That's why adding compost, cover crops, and manure benefits most soils.",
    keyIdeas: [
      "Texture: sand, silt, clay. Loam ≈ equal mix → ideal for most crops.",
      "Clay holds water/nutrients but drains poorly; sand is the opposite.",
      "Key properties: porosity, permeability, water-holding capacity, CEC, pH.",
      "Humus improves almost every soil property.",
    ],
    commonMistakes: [
      "Ranking soils by just one property instead of the balance.",
      "Forgetting that loam is the ideal mix (not sand or clay alone).",
      "Ignoring pH when discussing fertility (affects nutrient availability).",
    ],
  },
  "4.4": {
    id: "4.4",
    title: "Earth's Atmosphere",
    summary:
      "Earth's atmosphere is 78% N₂, 21% O₂, plus Ar, CO₂, water vapor, and trace gases. It has layered structure: troposphere, stratosphere, mesosphere, thermosphere.",
    lesson:
      "Atmospheric composition (dry air):\n- Nitrogen (N₂): ~78%.\n- Oxygen (O₂): ~21%.\n- Argon (Ar): ~1%.\n- Carbon dioxide (CO₂): ~0.04% (420+ ppm and rising).\n- Trace gases (Ne, He, CH₄, N₂O, O₃).\n- Variable **water vapor** (0–4%): major greenhouse gas, drives weather.\n\n**Vertical structure** (bottom to top):\n- **Troposphere** (0–~12 km): 80% of mass; temperature **decreases** with altitude; all weather happens here.\n- **Stratosphere** (12–50 km): temperature **increases** with altitude due to **ozone layer** absorbing UV radiation (9.1). Jet aircraft cruise near the tropopause.\n- **Mesosphere** (50–85 km): temperature decreases again. Meteors burn up here.\n- **Thermosphere** (85–600+ km): temperature increases sharply (absorption of X-rays, UV). Aurora and ISS orbit here.\n- **Exosphere**: transition to space.\n\n**Functions of the atmosphere**:\n- Provides oxygen for respiration.\n- Absorbs harmful UV radiation (ozone layer).\n- Traps heat (greenhouse effect) — without it, Earth would average ~-18°C instead of ~15°C.\n- Distributes heat around the planet (wind patterns, 4.5).\n- Carries water vapor for the hydrologic cycle.\n\n**Anthropogenic changes**: CO₂ and other greenhouse gases (9.4) have risen markedly; stratospheric ozone depleted by CFCs (9.1-9.2); tropospheric pollutants (Unit 7) cause smog, acid rain.",
    keyIdeas: [
      "Composition: ~78% N₂, ~21% O₂, <1% Ar + CO₂ + trace.",
      "Layers: troposphere (weather) → stratosphere (ozone) → mesosphere → thermosphere.",
      "Temperature alternates direction through the layers because of absorption.",
      "Atmosphere supports life by providing O₂, blocking UV, and trapping heat.",
    ],
    commonMistakes: [
      "Putting the ozone layer in the troposphere (it's stratospheric).",
      "Listing oxygen before nitrogen in composition.",
      "Treating temperature as monotonic with altitude — it alternates.",
    ],
  },
  "4.5": {
    id: "4.5",
    title: "Global Wind Patterns",
    summary:
      "Uneven solar heating drives convection cells (Hadley, Ferrel, Polar). The Coriolis effect deflects winds, producing trade winds, westerlies, and polar easterlies.",
    lesson:
      "Solar radiation strikes the equator more directly than the poles, creating an uneven heating gradient. Air rises at the equator, cools at altitude, sinks at ~30° latitude, flows along the surface back to the equator — the **Hadley cell**. Two more cells (Ferrel and Polar) complete the pattern in each hemisphere.\n\n**Major wind belts** (shaped by Hadley cells + **Coriolis effect**):\n- **Trade winds** (0°–30°): from NE in N hemisphere, SE in S hemisphere, blowing toward equator.\n- **Westerlies** (30°–60°): from W toward E (our latitude in North America and Europe).\n- **Polar easterlies** (60°–90°): from E toward W.\n\n**Coriolis effect** is the apparent deflection of moving objects (including air and water) due to Earth's rotation. Deflects right in the N hemisphere, left in the S. Strongest at poles, zero at equator. Shapes large-scale weather and ocean currents.\n\n**Pressure belts**:\n- Equatorial low (rising air → wet, rainforests).\n- Subtropical high (sinking air at 30° → dry, deserts at ~30°N and S).\n- Subpolar low (rising air at 60°).\n- Polar high.\n\n**Jet streams** are fast, narrow rivers of air at the tropopause that steer weather systems — two per hemisphere (subtropical and polar front).\n\n**ITCZ** (Intertropical Convergence Zone): band near equator where NE and SE trades meet; rising air → heavy rain; seasonally shifts north/south with solar declination → monsoon rains in India, West Africa.",
    keyIdeas: [
      "Three convection cells per hemisphere: Hadley, Ferrel, Polar.",
      "Wind belts: trade winds, westerlies, polar easterlies.",
      "Coriolis: deflects right (N hem.), left (S hem.).",
      "Subtropical highs at ~30° create major deserts (Sahara, Australian outback).",
    ],
    commonMistakes: [
      "Reversing the Coriolis direction.",
      "Forgetting deserts form under descending air at 30° latitude.",
      "Confusing jet stream (aloft, strong) with surface winds.",
    ],
  },
  "4.6": {
    id: "4.6",
    title: "Watersheds",
    summary:
      "A watershed (drainage basin) is the land area that drains into a single body of water. Water quality integrates everything upstream.",
    lesson:
      "A **watershed** (or **drainage basin**) is the total land area from which water drains into a particular stream, river, lake, or ocean. Every point on Earth's land surface is in some watershed.\n\nWatersheds are delineated by **ridges and high ground** that separate drainage directions. The Mississippi River watershed covers ~40% of the continental US; smaller creek watersheds cover a few square kilometers.\n\n**Why watersheds matter**:\n- **Water quality downstream integrates every input upstream** — pollution sources throughout the watershed end up at the outlet. The Gulf of Mexico dead zone is the product of fertilizer runoff throughout the Mississippi watershed (8.5).\n- **Hydrology**: impervious surfaces (roads, rooftops, parking lots) increase runoff, reduce infiltration, and intensify flash flooding. A urbanizing watershed behaves very differently from a forested one.\n- **Habitat connectivity**: fish and aquatic organisms move along the drainage network; dams fragment it.\n\n**Watershed management** addresses water supply, quality, flooding, erosion, and habitat at the basin scale. Key practices:\n- Riparian buffers (vegetated strips along streams) filter runoff.\n- Stormwater retention / detention basins slow runoff.\n- Source-water protection (watersheds supplying drinking water receive extra regulation).\n- Cross-boundary cooperation — watersheds rarely match political boundaries, so management often involves multiple cities, states, or countries.\n\nExamples: New York City invested in protecting Catskill/Delaware watersheds instead of building massive filtration plants, saving billions while preserving source-water quality.",
    keyIdeas: [
      "Watershed = area that drains to a single body of water.",
      "Water quality downstream reflects all upstream inputs.",
      "Urbanization increases runoff and flooding.",
      "Management happens at basin scale, often crossing political lines.",
    ],
    commonMistakes: [
      "Thinking watersheds follow political boundaries.",
      "Ignoring cumulative upstream effects on downstream water quality.",
      "Forgetting impervious surfaces dramatically alter watershed hydrology.",
    ],
  },
  "4.7": {
    id: "4.7",
    title: "Solar Radiation and Earth's Seasons",
    summary:
      "Earth's 23.5° axial tilt — not its distance to the sun — causes seasons. Sunlight strikes more directly in summer hemisphere and at lower angle in winter.",
    lesson:
      "Earth's axis is tilted **23.5°** relative to its orbital plane. As Earth orbits the sun, the tilt causes the N and S hemispheres to alternately point toward the sun.\n\n**Seasons** arise from two effects:\n- **Angle of incidence**: sunlight strikes the summer hemisphere nearly perpendicular (concentrated energy). In the winter hemisphere, the same sunlight is spread over more area and passes through more atmosphere (less intense).\n- **Day length**: summer hemisphere gets more daylight hours; winter hemisphere gets less.\n\nKey dates (Northern Hemisphere):\n- **June solstice** (~June 21): N pole tilted toward sun; longest day; summer begins.\n- **December solstice** (~Dec 21): N pole tilted away; shortest day; winter begins.\n- **Equinoxes** (March & September): axis perpendicular to sun-Earth line; day and night equal.\n\n**Tropical latitudes** (near equator): sun high year-round → warm year-round, no strong seasonal temperature swing.\n**Polar latitudes**: 24-hour darkness in winter, 24-hour sunlight in summer.\n\nSolstice sun angles can be computed: on summer solstice at latitude \\(L\\) (N hem.): solar altitude at noon = \\(90° - L + 23.5°\\).\n\n**Distance misconception**: Earth is actually closest to the sun (**perihelion**) in early January, during N-hemisphere winter. Distance matters very little; axial tilt dominates.\n\n**Climate implications**: seasonality drives plant growth cycles, animal migration, human agriculture, and energy use patterns.",
    keyIdeas: [
      "Seasons come from axial tilt (23.5°), not distance to sun.",
      "Summer hemisphere: sunlight more direct + longer days.",
      "Solstices = extremes; equinoxes = balance points.",
      "Tropics have weak seasons; poles have extreme ones.",
    ],
    commonMistakes: [
      "Attributing seasons to Earth's elliptical orbit / distance to sun.",
      "Ignoring day length — angle alone doesn't capture it.",
      "Forgetting that the S hemisphere has opposite seasons at the same time.",
    ],
  },
  "4.8": {
    id: "4.8",
    title: "Earth's Geography and Climate",
    summary:
      "Climate at a location depends on latitude, elevation, proximity to oceans, ocean currents, and topography (rain shadows, windward slopes).",
    lesson:
      "A region's **climate** — long-term average weather — depends on several interacting factors:\n\n- **Latitude**: how much direct sunlight the region receives; sets basic warm-cold gradient.\n- **Elevation**: temperature decreases about 6.5°C per 1000 m rise; mountains are cooler than valleys at the same latitude.\n- **Proximity to oceans**: large water bodies moderate temperature (oceans heat/cool slowly). Coastal areas have smaller annual temperature swings than interiors. Example: San Francisco vs Kansas at similar latitude — SF mild year-round, Kansas extreme.\n- **Ocean currents**: warm currents (Gulf Stream) warm the lands they flow past (Western Europe). Cold currents (Humboldt) cool adjacent lands (coastal Peru, dry).\n- **Wind patterns**: prevailing winds carry heat and moisture (4.5).\n- **Topography**:\n  - **Windward slope**: moist air rises, cools, releases precipitation. Lush.\n  - **Leeward (rain shadow)**: dry descending air. Deserts like the Mojave, eastern Cascades.\n\n**Microclimate**: small-scale variations within a broader climate zone. A north-facing slope, a forest clearing, or an urban heat island each have distinct conditions.\n\n**Global wind/ocean system**: atmospheric circulation (4.5) and ocean circulation (thermohaline conveyor) together redistribute heat from tropics toward poles; without this, the equator would be much hotter and poles much colder.\n\nClimate at a given location emerges from the interaction of all these factors, which is why two points at the same latitude can have totally different climates (e.g., London vs Labrador).",
    keyIdeas: [
      "Climate drivers: latitude, elevation, ocean proximity, currents, winds, topography.",
      "Oceans moderate temperature; interiors are extreme.",
      "Rain shadows form on leeward sides of mountains.",
      "Ocean currents redistribute heat across ocean basins.",
    ],
    commonMistakes: [
      "Using only latitude to predict climate.",
      "Forgetting rain shadows — windward side and leeward side differ dramatically.",
      "Ignoring ocean currents — Gulf Stream is why Europe isn't as cold as Canada.",
    ],
  },
  "4.9": {
    id: "4.9",
    title: "El Niño and La Niña",
    summary:
      "ENSO is a periodic shift of Pacific Ocean temperatures and winds. El Niño = warm eastern Pacific; La Niña = cold. Drives global weather anomalies.",
    lesson:
      "The **El Niño-Southern Oscillation (ENSO)** is the most important source of year-to-year climate variability on Earth.\n\n**Normal conditions (ENSO-neutral)**:\n- Trade winds blow westward across the tropical Pacific.\n- Surface water piles up in the western Pacific (warm pool near Indonesia).\n- Cold water upwells along the coast of Peru — rich fisheries.\n- Indonesia/Australia get heavy rain; western South America is dry.\n\n**El Niño**:\n- Trade winds weaken or reverse.\n- Warm water sloshes back east toward the central and eastern Pacific.\n- Upwelling off Peru shuts down; fisheries crash.\n- Indonesia/Australia dry (drought/wildfires); Peru/Ecuador flood.\n- **Global teleconnections**: warmer, wetter winter in southern US; mild in Canada; variable elsewhere. Shifts jet streams.\n- Recurs every 3–7 years; typically lasts 9–12 months.\n\n**La Niña**:\n- Trade winds strengthen; warm pool intensifies in the west; upwelling intensifies in the east.\n- Exaggerated normal conditions — heavier Australian rains, drier South American coast.\n- Cooler, wetter Pacific Northwest; drier US Southwest.\n\n**Impacts**:\n- Agriculture (drought/flood swings).\n- Fisheries (especially Peruvian anchovy).\n- Tropical cyclone frequency (El Niño suppresses Atlantic hurricanes, enhances Pacific).\n- Wildfire risk in Indonesia, Australia, US West.\n- Global temperature spikes correlate with strong El Niños (2016 was a record-warm El Niño year).\n\nENSO is natural and recurrent, but warming background conditions may intensify impacts.",
    keyIdeas: [
      "ENSO = periodic Pacific sea-surface temperature oscillation.",
      "El Niño: weak trades, warm east Pacific, Peruvian fisheries crash, Indonesia droughts.",
      "La Niña: strong trades, cold east Pacific, amplified normal patterns.",
      "Global teleconnections affect weather across continents.",
    ],
    commonMistakes: [
      "Confusing El Niño and La Niña directions.",
      "Thinking ENSO is a local Peru phenomenon (it's global).",
      "Expecting ENSO to reverse annually — cycle is 3–7 years.",
    ],
  },

  // =========================================================================
  // UNIT 5 — LAND AND WATER USE
  // =========================================================================
  "5.1": {
    id: "5.1",
    title: "The Tragedy of the Commons",
    summary:
      "Shared, unregulated resources get overused because each user captures the full benefit of use while sharing the cost of depletion across everyone.",
    lesson:
      "Garrett Hardin's **tragedy of the commons** (1968) describes what happens when a shared resource lacks individual ownership or regulation. Each user's individually rational choice — take as much as possible — collectively destroys the resource.\n\n**The mechanism**: consider a shared pasture with 100 herders. If one herder adds a cow, that herder gains the full economic benefit (one extra cow). But the cost — slightly more grazing pressure on the pasture — is distributed across all 100 herders. Benefit > personal cost, so every herder adds cows. Eventually the pasture is overgrazed and ruined for everyone.\n\nThe key structural features:\n- **Open access** (no property rights or regulation).\n- **Rivalrous consumption** (my use reduces what's available for you).\n- **Diffuse costs, concentrated benefits**.\n\n**Real-world commons**:\n- **Ocean fisheries** (5.8): overfishing has collapsed cod, Atlantic bluefin tuna, and many other stocks.\n- **Atmosphere**: no single polluter pays the full cost of their emissions (the foundation of climate policy debates).\n- **Groundwater aquifers** (1.7): any landowner can pump; cumulative pumping exceeds recharge.\n- **Public grazing lands**, **freshwater rivers**, **forests**.\n\n**Solutions** fall into three broad categories:\n- **Government regulation**: quotas, permits, catch limits, emissions caps. Example: catch limits on commercial fisheries.\n- **Privatization**: convert the common into private property. Works for some resources (land) but not others (atmosphere).\n- **Community governance** (Elinor Ostrom's Nobel-winning work): local users negotiate rules when they trust each other and can monitor use. Common in traditional fisheries, irrigation systems, grazing cooperatives.\n\n**Cap-and-trade** systems combine regulation (a hard total cap) with market flexibility (tradable permits) — used for SO₂ in the US Acid Rain Program and for CO₂ in the EU ETS.",
    keyIdeas: [
      "Open-access + rivalrous resources tend to be overused because benefits are individual but costs are shared.",
      "Classic examples: fisheries, atmosphere, groundwater, public grazing lands.",
      "Solutions: regulation, privatization, or community governance.",
      "Cap-and-trade blends a regulatory cap with market-based trading.",
    ],
    commonMistakes: [
      "Assuming all shared resources are tragedies — Ostrom showed community governance often works.",
      "Confusing tragedy of the commons with simple greed — the problem is structural, not moral.",
      "Thinking privatization always solves it (you can't privatize the atmosphere).",
    ],
  },
  "5.2": {
    id: "5.2",
    title: "Clearcutting",
    summary:
      "Clearcutting removes all trees in an area at once. Efficient and profitable short-term but causes erosion, habitat loss, and carbon release.",
    lesson:
      "**Clearcutting** is a forestry technique where every tree in a defined area is cut down simultaneously. The opposite of **selective cutting** (only specific trees removed).\n\n**Why it's used**:\n- Economical and efficient for even-aged forests.\n- Required for shade-intolerant species (pines, aspens) that need full sunlight to regenerate.\n- Enables mechanized harvesting.\n\n**Environmental consequences**:\n- **Soil erosion**: without tree roots to hold soil, rain washes away topsoil into streams.\n- **Sediment pollution**: eroded soil clouds streams, harms fish (salmon spawn in clear gravel).\n- **Increased runoff**: no canopy to intercept rain, no roots to absorb water → flooding downstream.\n- **Loss of habitat**: forest species (spotted owl, many songbirds) need mature trees.\n- **Reduced biodiversity**: clearcuts regrow as even-aged monocultures rather than diverse old forests.\n- **Carbon release**: burning slash and decomposing debris release stored CO₂.\n- **Microclimate shifts**: loss of shade raises local temperatures, dries soils.\n- **Edge effects**: remaining forest fragments near cuts lose interior species.\n\n**Alternatives**:\n- **Selective cutting**: removes only certain trees; maintains canopy and habitat.\n- **Shelterwood cutting**: removes trees in phases, leaving some to provide seeds and shade for regeneration.\n- **Strip cutting**: long narrow strips cut; buffer strips between act as seed sources.\n\n**Sustainable forestry certification** (FSC, SFI) requires practices that maintain forest structure and biodiversity — see 5.17.",
    keyIdeas: [
      "Clearcutting = all trees removed at once; efficient but ecologically destructive.",
      "Consequences: erosion, flooding, habitat loss, carbon release, biodiversity loss.",
      "Alternatives: selective, shelterwood, strip cutting.",
      "Sustainable forestry attempts to harvest while preserving structure and biodiversity.",
    ],
    commonMistakes: [
      "Treating clearcutting as always wrong — some fire-adapted ecosystems actually need full disturbance.",
      "Forgetting the carbon-release aspect.",
      "Confusing selective with shelterwood cutting.",
    ],
  },
  "5.3": {
    id: "5.3",
    title: "The Green Revolution",
    summary:
      "Mid-20th-century shift to high-yield crops, synthetic fertilizer, pesticides, and irrigation dramatically increased food output but brought new environmental costs.",
    lesson:
      "The **Green Revolution** (roughly 1940s–1970s) transformed global agriculture. Led by Norman Borlaug, it combined several innovations:\n\n- **High-yield variety (HYV) crops**: dwarf wheat and rice that put more energy into grain than stem.\n- **Synthetic fertilizers** (Haber-Bosch nitrogen) applied at large scales.\n- **Synthetic pesticides** (insecticides, herbicides) to protect against losses.\n- **Irrigation** expansion to stabilize yields.\n- **Mechanization** (tractors, harvesters) replacing draft animals and manual labor.\n- **Monocultures**: huge fields of a single crop for efficient machinery use.\n\n**Results**:\n- Global grain production more than tripled from 1960 to 2000.\n- India became self-sufficient in grain by the 1970s; Mexico, the Philippines, and Pakistan saw similar turnarounds.\n- Famines that killed millions in prior decades largely disappeared from most of Asia.\n\n**Costs**:\n- **Soil degradation**: monocultures + heavy tillage → erosion, loss of organic matter.\n- **Water pollution**: fertilizer runoff → eutrophication (8.5); pesticide runoff → aquatic toxicity.\n- **Groundwater depletion**: irrigation drained aquifers (Ogallala, North China Plain, Punjab).\n- **Loss of crop genetic diversity**: thousands of traditional landraces replaced by a few HYV cultivars.\n- **Pesticide resistance**: insects and weeds evolved resistance, triggering chemical arms races.\n- **Fossil-fuel dependence**: mechanization, fertilizer manufacture, and pesticide production are energy-intensive.\n- **Economic concentration**: small farmers sometimes displaced by large operations that could afford the inputs.\n\n**Current conversation**: the next phase emphasizes sustainable intensification — higher yields per hectare without the environmental damage, via precision agriculture, drip irrigation, integrated pest management (5.14), cover cropping, and possibly GM crops.",
    keyIdeas: [
      "Green Revolution = HYV crops + synthetic fertilizer + pesticides + irrigation + mechanization.",
      "Tripled global grain production and averted major famines.",
      "Costs: soil degradation, water pollution, aquifer depletion, loss of crop diversity, fossil fuel reliance.",
      "Sustainable intensification aims to reproduce yield gains without the ecological costs.",
    ],
    commonMistakes: [
      "Portraying it as purely beneficial or purely harmful — it was both.",
      "Forgetting the genetic narrowing of crops that came with HYVs.",
      "Ignoring its fossil-fuel dependence (tractors, fertilizer, pesticides).",
    ],
  },
  "5.4": {
    id: "5.4",
    title: "Impacts of Agricultural Practices",
    summary:
      "Tilling, monocropping, slash-and-burn, and confined animal feeding operations degrade soil, water, air, and biodiversity in distinct ways.",
    lesson:
      "Agricultural practices have ecosystem-scale impacts that vary with the practice:\n\n- **Tilling / plowing**: breaks soil structure, kills soil biota, exposes organic matter to decomposition. Benefits short-term planting but accelerates erosion and carbon release.\n- **Slash-and-burn** (swidden): tropical subsistence practice — cut vegetation, burn, plant for a few years, move on. Sustainable at low intensity; destructive at scale because soils are nutrient-poor (1.2 tropical rainforest section) and regeneration is slow.\n- **Monocropping**: planting the same single crop year after year. Depletes specific nutrients, worsens pest outbreaks (single food source), requires heavier pesticide use, and reduces genetic diversity.\n- **Rotational cropping**: alternating crops (e.g., corn → soybeans → wheat) restores nutrients and breaks pest cycles.\n- **Overgrazing**: livestock strip vegetation faster than it regrows; exposes soil; causes desertification in semi-arid regions (Sahel, parts of western US).\n- **Confined Animal Feeding Operations (CAFOs)**: massive indoor animal-raising facilities. Efficient meat production but concentrate manure into lagoons (leaks → water pollution), require antibiotics that fuel resistance, produce methane, and create animal-welfare concerns.\n- **Excess fertilizer**: runoff eutrophies waterways (8.5); volatilizes as N₂O (a potent greenhouse gas).\n- **Irrigation without drainage**: salts accumulate in soil — **salinization** — eventually sterilizing the field.\n\n**Mitigation** (tie to 5.15 sustainable agriculture):\n- No-till or reduced-till.\n- Crop rotation and cover crops.\n- Integrated pest management (5.14).\n- Precision fertilizer and irrigation.\n- Silvopasture and rotational grazing.\n\nThese practices can produce yields comparable to conventional agriculture while rebuilding soil carbon, reducing runoff, and lowering input costs.",
    keyIdeas: [
      "Tilling accelerates erosion + carbon release; no-till preserves soil.",
      "Monocropping depletes nutrients, boosts pests; rotation helps.",
      "Overgrazing leads to soil loss and desertification.",
      "CAFOs concentrate pollution, drive antibiotic resistance, emit methane.",
    ],
    commonMistakes: [
      "Conflating slash-and-burn (subsistence) with commercial deforestation.",
      "Treating monocropping as inevitable rather than a choice with known costs.",
      "Missing that irrigation without drainage salinizes fields.",
    ],
  },
  "5.5": {
    id: "5.5",
    title: "Irrigation Methods",
    summary:
      "Flood, furrow, spray, drip, and subsurface irrigation differ dramatically in water efficiency, salinization risk, and energy needs.",
    lesson:
      "Roughly 70% of human freshwater withdrawals go to irrigation. Methods differ in efficiency:\n\n- **Flood (basin) irrigation**: fields are flooded with water. Simple, cheap, used for rice paddies. Very low efficiency (~30–40%); heavy losses to evaporation and deep seepage. High salinization risk.\n- **Furrow irrigation**: water flows down channels between crop rows. Slightly more efficient than flood but similar issues. Used widely in row crops.\n- **Spray / sprinkler irrigation**: water pumped through pipes, sprayed overhead. Efficiency ~60–75%. Common in US (center-pivot systems make the famous green circles visible from planes). Evaporation losses are significant in hot, dry conditions.\n- **Drip (micro) irrigation**: water delivered drop-by-drop through small tubes at plant roots. Efficiency 90–95%. Reduces evaporation, weed growth, and salt buildup. Israel pioneered; now widespread for high-value crops (vineyards, orchards, vegetables).\n- **Subsurface irrigation / subirrigation**: water table raised to crop roots from below. High efficiency when soils are appropriate.\n\n**Salinization**: irrigation water always contains dissolved salts. When water evaporates from soil, salts remain. Over years, concentrations rise, eventually killing crops. Salinization has damaged tens of millions of hectares worldwide; ancient Mesopotamian civilizations collapsed partly from this.\n\n**Waterlogging**: over-irrigation saturates soil, suffocating roots.\n\n**Aquifer depletion**: rapid pumping drains groundwater faster than recharge (Ogallala in the central US, North China Plain, Punjab). Leads to subsidence (land sinking) and saltwater intrusion in coastal aquifers.\n\n**Solutions**: drip irrigation, precision scheduling, crop selection (drought-tolerant varieties), mulching, and pricing water at its true cost.",
    keyIdeas: [
      "Flood < furrow < sprinkler < drip in efficiency.",
      "Drip irrigation reaches ~90–95% efficiency; ideal for water-stressed regions.",
      "Salinization and waterlogging are the main long-term risks.",
      "Groundwater irrigation is depleting aquifers worldwide (Ogallala, North China Plain).",
    ],
    commonMistakes: [
      "Ranking by cost only, not by efficiency.",
      "Missing that flood irrigation causes the most salinization.",
      "Forgetting that aquifer-fed irrigation isn't sustainable if pumping > recharge.",
    ],
  },
  "5.6": {
    id: "5.6",
    title: "Pest Control Methods",
    summary:
      "Synthetic pesticides (insecticides, herbicides, fungicides) boost short-term yields but cause resistance, non-target harm, and bioaccumulation.",
    lesson:
      "Before synthetic pesticides, farmers relied on crop rotation, tillage, manual removal, and biological controls. The modern era began with **DDT** (1940s) and expanded into classes like organochlorines, organophosphates, carbamates, pyrethroids, and neonicotinoids.\n\n**Types**:\n- **Insecticides**: kill insects (DDT, neonicotinoids, pyrethroids).\n- **Herbicides**: kill weeds (glyphosate/Roundup, atrazine, 2,4-D).\n- **Fungicides**: kill fungi.\n- **Rodenticides**, **nematicides**, etc.\n\n**Benefits**:\n- Dramatically higher yields.\n- Reduced crop losses to pests.\n- Disease vector control (DDT against malaria mosquitoes saved millions of lives before banned for agricultural use).\n\n**Costs**:\n- **Resistance**: pesticides create intense selection pressure. Resistant individuals survive and reproduce; within a few generations, the population is dominated by resistant variants. Leads to a **pesticide treadmill** — stronger or new pesticides required.\n- **Non-target harm**: pesticides kill beneficial insects (pollinators, natural predators), birds, fish.\n- **Bioaccumulation / biomagnification** (8.8): persistent pesticides concentrate up food chains — DDT thinning raptor eggshells (bald eagle, peregrine falcon) is the classic Rachel Carson *Silent Spring* story.\n- **Human health**: acute poisoning for applicators; chronic exposure linked to cancers, endocrine disruption (8.3), reproductive effects.\n- **Water contamination**: atrazine is the most commonly detected pesticide in US waterways.\n\n**Alternatives / improvements**:\n- **Biological control**: natural predators (ladybugs for aphids; parasitic wasps).\n- **Integrated Pest Management (IPM, 5.14)**: combine multiple tactics; use pesticides only when thresholds exceeded.\n- **Genetically modified crops**: Bt corn produces its own insecticide — reduces external pesticide use but raises resistance concerns.\n- **Crop rotation** and **polycultures** reduce pest pressure.\n\n**Regulation** (US): EPA registers pesticides under FIFRA. Some (DDT, chlordane) have been banned; others (glyphosate, neonicotinoids) are debated.",
    keyIdeas: [
      "Pesticide classes: insecticides, herbicides, fungicides.",
      "Resistance evolves rapidly under pesticide pressure (the treadmill).",
      "Non-target damage + bioaccumulation are signature ecosystem-level costs.",
      "Alternatives: IPM, biological control, GM crops, crop rotation.",
    ],
    commonMistakes: [
      "Assuming pesticides target only pests — they affect whole communities.",
      "Ignoring the evolutionary pressure driving resistance.",
      "Treating glyphosate as harmless (it's the most-used herbicide; effects are debated).",
    ],
  },
  "5.7": {
    id: "5.7",
    title: "Meat Production Methods",
    summary:
      "Grazing (extensive) vs CAFOs (intensive) trade land use, water use, emissions, and animal welfare differently. Meat has a higher environmental footprint than plant foods.",
    lesson:
      "Two ends of the meat-production spectrum:\n\n- **Free-range / pastoral / grazing**: animals graze on grass. Low external input; can maintain grasslands; slower growth. Land-intensive — very large pastures per animal.\n- **Concentrated Animal Feeding Operations (CAFOs)**: animals confined in feedlots or barns, fed concentrated grain (often corn and soy). Fast growth, high output per worker, high output per acre of *animal* space (but not per acre of *feed* land).\n\n**Environmental costs of meat** (especially beef):\n- **Land use**: livestock occupy ~25% of Earth's ice-free land. Feed crops (corn, soy) drive much deforestation (Amazon clearing for cattle and soy).\n- **Water use**: ~15,000 L of water per kg of beef (feed crops dominate this); ~4,000 for pork, ~4,000 for chicken, ~200 for potatoes.\n- **Greenhouse gases**: livestock produce ~14.5% of global GHG emissions. Cattle emit methane (enteric fermentation) — methane has ~28× the global warming potential of CO₂ over 100 years. Manure lagoons release N₂O (~265× GWP of CO₂).\n- **Water pollution**: CAFO manure lagoons leak or overflow; nitrogen and phosphorus runoff fuels eutrophication (8.5).\n- **Antibiotic resistance**: CAFOs use antibiotics prophylactically; selects for resistant bacteria that spread to humans (8.15).\n- **Animal welfare**: close confinement, no outdoor access, high stress in many CAFOs.\n\n**Efficiency hierarchy**:\n- Beef: ~10% feed-to-food conversion (inefficient).\n- Pork, chicken, farmed fish: 20–40% (more efficient).\n- Insects, plant foods: much higher efficiency still.\n\n**Alternatives**:\n- **Plant-based diets** dramatically lower environmental footprint per calorie.\n- **Alternative proteins**: plant-based meats (Impossible, Beyond), cultivated meat, insects.\n- **Better management**: rotational grazing, silvopasture, manure digestion for biogas.\n\nPolicy-wise, reducing meat consumption (especially beef) is one of the most impactful individual actions for climate.",
    keyIdeas: [
      "Grazing vs CAFOs: extensive vs intensive, each with trade-offs.",
      "Beef dominates meat's environmental footprint (land, water, methane).",
      "CAFOs: efficient output but manure, antibiotics, and welfare problems.",
      "Plant-forward diets cut environmental impact per calorie substantially.",
    ],
    commonMistakes: [
      "Treating all meat equivalently — beef is the outlier in footprint.",
      "Forgetting methane from cattle has much higher GWP than CO₂.",
      "Ignoring antibiotic use in CAFOs as a human-health concern.",
    ],
  },
  "5.8": {
    id: "5.8",
    title: "Impacts of Overfishing",
    summary:
      "Overfishing has collapsed major fisheries, damaged habitats (bottom trawling), and caused massive bycatch. A textbook tragedy of the commons.",
    lesson:
      "**Overfishing** occurs when fish are caught faster than they can reproduce. Classic examples:\n\n- **Atlantic cod (Newfoundland)**: collapsed 1992 after centuries of fishing; 40,000 jobs lost overnight; stock still has not fully recovered despite 30+ year closures.\n- **Atlantic bluefin tuna**: down 90%+ from historical populations; still fished.\n- **Peruvian anchovy** (1972): overfishing plus El Niño drove a crash; industry took decades to recover.\n- **Many reef fish, sharks**: sharks especially vulnerable (slow-growing, late reproduction).\n\nFAO estimates ~34% of marine fish stocks are overfished and ~60% are fished to maximum sustainable levels.\n\n**Fishing techniques** with heavy impacts:\n- **Bottom trawling**: nets dragged along the sea floor. Destroys corals, sponges, and benthic habitats. The marine equivalent of clearcutting.\n- **Longlining**: miles of baited hooks. Catches target species but also **bycatch** — seabirds (albatross), sea turtles, sharks.\n- **Drift nets / gill nets**: \"walls\" of net; entangle everything passing through. Largely banned for this reason.\n- **Purse seining**: encircle schools; can catch non-target species (tuna operations historically killed many dolphins).\n- **Ghost fishing**: lost/abandoned nets continue catching fish indefinitely.\n\n**Bycatch** can exceed target catch in shrimp trawling (historically up to 5–20 kg of bycatch per kg of shrimp).\n\n**Responses**:\n- **Quotas / Total Allowable Catches (TACs)**.\n- **Individual Transferable Quotas (ITQs)**: assign each fisher a share of the total catch — aligns incentives.\n- **Marine Protected Areas (MPAs)** and no-take zones.\n- **Gear restrictions** (turtle excluder devices, weighted lines, dolphin-safe nets).\n- **Sustainable seafood certifications** (MSC).\n- **Aquaculture** (5.16) as a substitute (with its own environmental issues).\n\nRecovery is possible — well-managed stocks (US Pacific hake, Norwegian herring) have rebounded after regulatory reforms.",
    keyIdeas: [
      "Overfishing: catch > reproduction. Classic examples: Atlantic cod, bluefin tuna.",
      "Bottom trawling destroys benthic habitat; longlining and gill nets cause bycatch.",
      "ITQs, MPAs, gear rules, and certification schemes can restore fisheries.",
      "Recovery is possible but often slow (decades).",
    ],
    commonMistakes: [
      "Assuming ocean fisheries are unlimited.",
      "Forgetting the habitat damage from bottom trawling.",
      "Confusing ITQs with simple privatization (they're community-monitored quota shares).",
    ],
  },
  "5.9": {
    id: "5.9",
    title: "Impacts of Mining",
    summary:
      "Surface (strip, open-pit, mountaintop removal) and subsurface mining each cause habitat destruction, tailings, acid drainage, and water pollution.",
    lesson:
      "Mining extracts economically valuable minerals (metals, coal, phosphate, rare earths, sand, gravel). Every stage has environmental costs.\n\n**Surface mining** (used when deposits are near the surface):\n- **Strip mining**: long strips of overburden removed to expose coal or minerals; common for shallow coal seams.\n- **Open-pit mining**: huge pits for metals like copper, gold. Bingham Canyon (Utah) is visible from space.\n- **Mountaintop removal**: blasting off mountain summits to expose coal seams; overburden dumped in valleys. Appalachian coal region; devastating for stream ecosystems.\n- **Placer mining**: washing sediments to extract gold, gemstones; disturbs rivers.\n\n**Subsurface (underground) mining**: tunnels and shafts. Smaller surface footprint but:\n- Worker hazards (collapses, black lung from coal dust).\n- Methane explosions in coal mines.\n- Subsidence (surface sinking into abandoned tunnels).\n- Acid mine drainage from exposed ores.\n\n**Environmental impacts**:\n- **Habitat destruction**: forests, streams, whole ecosystems replaced with pits or tailings.\n- **Tailings** (waste rock after ore extraction): huge volumes, often stored in dams. Tailings-dam failures (Brumadinho, Brazil, 2019; 270+ dead) release toxic slurries.\n- **Acid mine drainage (AMD)**: sulfide minerals (pyrite) exposed to air and water oxidize to sulfuric acid, leaching heavy metals into streams. Can persist for centuries.\n- **Heavy-metal contamination**: lead, arsenic, mercury, cadmium in waters and soils downstream.\n- **Cyanide heap leach gold mining**: cyanide dissolves gold from crushed ore; spills devastate aquatic ecosystems.\n- **Dust and air pollution**: particulates, sometimes radioactive (uranium mining).\n- **Deforestation**: Amazon gold mining clears forests and poisons rivers with mercury.\n- **Carbon emissions** from coal mining and combustion.\n\n**Regulation and mitigation**:\n- **Surface Mining Control and Reclamation Act (SMCRA, 1977)**: requires reclamation of mined land in the US.\n- **Clean Water Act** and state regulations on discharges.\n- **Reclamation**: regrading, replacing topsoil, revegetation. Partially restores ecosystems but rarely matches predisturbance conditions.\n- **Green mining**: dust suppression, water recycling, tailings repurposing, renewable power for operations.\n- **Recycling**: reduces primary extraction needs — recycling aluminum uses ~5% of the energy of primary production.",
    keyIdeas: [
      "Surface types: strip, open-pit, mountaintop removal, placer.",
      "Subsurface mining: less visible disturbance but dangerous and prone to subsidence.",
      "Acid mine drainage (AMD) and tailings failures are long-lasting environmental legacies.",
      "Reclamation + recycling reduce impacts; don't eliminate them.",
    ],
    commonMistakes: [
      "Ignoring acid mine drainage's multi-century timescale.",
      "Assuming reclamation restores original ecosystems.",
      "Forgetting mercury in small-scale gold mining.",
    ],
  },
  "5.10": {
    id: "5.10",
    title: "Impacts of Urbanization",
    summary:
      "Urbanization replaces habitat with impervious surfaces, increases runoff, creates heat islands, consumes resources, and concentrates pollution.",
    lesson:
      "More than half of humanity now lives in urban areas (rising toward 70% by 2050). Urbanization transforms landscapes in several ways:\n\n**Land conversion**:\n- Habitat loss as forests, wetlands, grasslands are paved.\n- **Urban sprawl**: low-density development consumes more land per person than compact cities.\n- Agricultural land lost to development (prime cropland near cities vanishes).\n\n**Impervious surfaces** (concrete, asphalt, rooftops):\n- **Increased runoff** — stormwater sheets off paved surfaces instead of infiltrating (1.7).\n- **Flash flooding** during storms.\n- **Reduced groundwater recharge**.\n- **Thermal pollution**: hot runoff from pavement heats urban streams (8.6).\n- **Pollutant transport**: runoff carries oil, salts, sediment, fertilizer, pet waste to streams.\n\n**Urban heat island effect**:\n- Cities are 1–5 °C warmer than surrounding countryside due to dark surfaces absorbing sunlight, heat from vehicles and buildings, and lack of vegetation.\n- Exacerbates heat waves; raises AC energy use.\n- Mitigation: green roofs, urban trees, reflective (\"cool\") pavement, light-colored rooftops.\n\n**Resource consumption**:\n- Cities import food, energy, water; export waste and pollution.\n- **Saltwater intrusion** where coastal groundwater is pumped for urban use.\n- Large ecological footprints (5.11).\n\n**Air quality**:\n- Higher concentrations of particulates, NOₓ, ozone (7.2) from traffic, industry, heating.\n- Indoor air issues compounded by outdoor pollution.\n\n**Light and noise pollution**:\n- Light pollution disrupts wildlife (sea turtle nesting, migrating birds) and human sleep.\n- Noise pollution (7.8) affects communication in wildlife and stress in humans.\n\n**Mitigation / smart growth**:\n- **Compact, mixed-use development** reduces sprawl.\n- **Public transit, bike lanes, walkability** reduce vehicle miles.\n- **Green infrastructure** (bioswales, permeable pavement, rain gardens) mitigates runoff (5.13).\n- **Urban green space** reduces heat island and improves mental health.\n- **Transit-oriented development** concentrates growth near transit nodes.",
    keyIdeas: [
      "Urbanization: habitat loss + impervious surfaces + resource concentration.",
      "Impervious surfaces drive flooding, runoff pollution, less groundwater recharge.",
      "Urban heat island raises city temperatures several degrees.",
      "Smart growth, green infrastructure, and transit reduce impacts.",
    ],
    commonMistakes: [
      "Equating urbanization with pollution only — the land-use change is equally important.",
      "Forgetting urban heat island arises from surfaces, not just \"more people.\"",
      "Assuming sprawl = urbanization (sprawl is the low-density variant).",
    ],
  },
  "5.11": {
    id: "5.11",
    title: "Ecological Footprints",
    summary:
      "An ecological footprint measures the biologically productive land + water area needed to support a lifestyle. Global footprint exceeds Earth's biocapacity.",
    lesson:
      "The **ecological footprint** (Wackernagel & Rees) expresses resource consumption and waste absorption as the area of productive land and water required to support it. Units: **global hectares (gha)** — standardized hectares of average world productivity.\n\n**Components**:\n- Cropland to feed the person.\n- Grazing land for meat/dairy.\n- Fishing grounds for seafood.\n- Forest for timber and paper.\n- Built-up land (roads, houses, infrastructure).\n- **Carbon footprint**: forest area needed to absorb CO₂ emissions — by far the largest component for wealthy countries.\n\n**Biocapacity**: the productive area available, measured the same way. Earth's total biocapacity is ~1.6 gha per person (and falling as degradation outpaces population growth).\n\n**Current footprints** (approximate):\n- World average: ~2.7 gha.\n- USA, Canada, Australia: ~8 gha.\n- Europe: ~4–5 gha.\n- China: ~3.7 gha.\n- India, sub-Saharan Africa: ~1 gha.\n\nHumanity's total footprint is ~1.75× Earth's biocapacity — we are in **overshoot**, depleting natural capital faster than it regenerates.\n\n**Earth Overshoot Day**: the date each year when humanity's annual demand exceeds what Earth can regenerate in a year. In 1971 it was in December; in recent years it's been in late July.\n\n**Reducing footprint**:\n- **Diet**: eating lower on the food chain reduces the land footprint dramatically.\n- **Transportation**: switch to transit, EVs, walk/bike; fly less.\n- **Energy**: efficiency, renewables.\n- **Consumption**: buy less, buy used, repair, recycle.\n- **Housing**: smaller, more efficient homes in compact communities.\n\nThe footprint concept makes inequities visible: if everyone lived like the average American, we'd need about 5 Earths.",
    keyIdeas: [
      "Footprint = productive area needed to sustain a lifestyle, in gha.",
      "Biocapacity is ~1.6 gha/person; humanity's footprint ~1.75× biocapacity.",
      "Wealthy countries have the largest per-capita footprints (mostly carbon).",
      "Diet, transport, energy, and housing are the big levers.",
    ],
    workedExample: {
      prompt:
        "If Earth's total biocapacity is 12 billion gha and there are 8 billion people, what's the per-capita biocapacity? What happens if the average footprint is 2.7 gha?",
      solution:
        "Per-capita biocapacity = 12/8 = 1.5 gha. Average footprint (2.7) / biocapacity (1.5) ≈ 1.8 — we'd need ~1.8 Earths to sustain current consumption indefinitely.",
    },
    commonMistakes: [
      "Confusing ecological footprint with carbon footprint (carbon is a subset).",
      "Forgetting biocapacity falls when land is degraded.",
      "Ignoring that the average hides huge per-capita inequities.",
    ],
  },
  "5.12": {
    id: "5.12",
    title: "Introduction to Sustainability",
    summary:
      "Sustainability means meeting present needs without compromising future generations — maintaining ecological, economic, and social systems indefinitely.",
    lesson:
      "The classic Brundtland Commission definition (1987): **sustainable development** is \"development that meets the needs of the present without compromising the ability of future generations to meet their own needs.\"\n\nThree pillars (triple bottom line):\n- **Environmental**: maintain ecosystems, biodiversity, and natural capital.\n- **Economic**: provide livelihoods and prosperity.\n- **Social**: ensure equity, health, education, and cultural continuity.\n\n**Sustainability criteria** for a resource or practice:\n- **Renewable resources** used at rates ≤ regeneration.\n- **Nonrenewable resources** used efficiently, with alternatives developed before depletion.\n- **Waste** generated ≤ assimilative capacity of ecosystems.\n- **Biodiversity** preserved (because function depends on it).\n- **Equity** across generations and within them.\n\n**Examples of sustainable vs unsustainable**:\n- **Sustainable**: solar/wind power, sustainable forestry (5.17), rotational grazing, drip irrigation.\n- **Unsustainable**: fossil fuels, aquifer mining, bottom-trawl fisheries, monoculture without soil restoration.\n\n**UN Sustainable Development Goals (SDGs, 2015)**: 17 interlinked goals for 2030 — no poverty, zero hunger, good health, quality education, gender equality, clean water, affordable energy, etc. Provide a framework for national policy and corporate strategy.\n\n**Strong vs weak sustainability**:\n- **Weak**: natural capital (ecosystems) can be substituted by human capital (infrastructure, knowledge).\n- **Strong**: some natural capital is irreplaceable; must be preserved.\nEnvironmental economists generally favor strong sustainability for key ecosystem services.\n\n**Obstacles**: short-term thinking, political cycles shorter than environmental timescales, externalities unpriced in markets, unequal power (those who benefit from unsustainable practices may not be those who bear the costs).",
    keyIdeas: [
      "Sustainability = meeting present needs without compromising the future.",
      "Three pillars: environmental, economic, social.",
      "UN SDGs (2015) are a 17-goal framework to 2030.",
      "Strong vs weak sustainability differ on whether natural capital is substitutable.",
    ],
    commonMistakes: [
      "Treating sustainability as only environmental.",
      "Confusing sustainability with conservation (sustainability includes human wellbeing).",
      "Assuming any green label = sustainable (greenwashing is real).",
    ],
  },
  "5.13": {
    id: "5.13",
    title: "Methods to Reduce Urban Runoff",
    summary:
      "Green infrastructure — rain gardens, permeable pavement, green roofs, bioswales, retention ponds — slows runoff and restores infiltration.",
    lesson:
      "Urbanization's impervious surfaces (5.10) generate massive stormwater runoff. **Green infrastructure** distributes, slows, and infiltrates runoff close to where it falls — cheaper and more effective than ever-larger storm sewers.\n\n**Techniques**:\n\n- **Rain gardens**: depressions planted with deep-rooted native plants that collect roof or street runoff and allow it to infiltrate. Filter pollutants.\n- **Bioswales**: linear vegetated channels along streets/parking lots that slow and filter runoff.\n- **Permeable pavement**: concrete, asphalt, or pavers designed to let water pass through. Reduces runoff volume; recharges groundwater.\n- **Green roofs**: vegetation on rooftops. Absorb rain, reduce runoff, cool buildings, increase roof lifespan, improve air quality.\n- **Rain barrels / cisterns**: capture roof runoff for garden use; reduce stormwater flow.\n- **Retention / detention basins**: collect runoff and release slowly; prevent downstream flooding.\n- **Urban trees**: canopy intercepts rainfall; roots improve infiltration; additional cooling.\n- **Constructed wetlands**: engineered to receive urban runoff; filter pollutants biologically.\n- **Disconnecting downspouts**: route roof runoff onto lawns instead of into storm drains.\n\n**Benefits beyond hydrology**:\n- Heat-island reduction (5.10).\n- Habitat for urban wildlife.\n- Aesthetic and mental-health value.\n- Air quality improvement.\n\n**Policy tools**:\n- **Stormwater utility fees** charged proportional to impervious surface area — incentivize reducing it.\n- **Permeable pavement requirements** in new construction.\n- **Green roof mandates** (adopted by Toronto, Paris, others).\n- **Low-Impact Development (LID)** design standards.\n\nCities like Philadelphia (Green City, Clean Waters plan), Portland, and Seattle have invested heavily in green infrastructure as more cost-effective than concrete-only (\"gray\") alternatives.",
    keyIdeas: [
      "Green infrastructure distributes and slows runoff near source.",
      "Tools: rain gardens, bioswales, permeable pavement, green roofs, rain barrels, retention basins, urban trees.",
      "Co-benefits: heat reduction, air quality, habitat, aesthetics.",
      "Stormwater fees and LID codes are policy levers.",
    ],
    commonMistakes: [
      "Treating runoff purely as a pipe-and-sewer problem (gray infrastructure).",
      "Forgetting the heat-island and biodiversity co-benefits.",
      "Confusing retention (holds water) with detention (releases slowly).",
    ],
  },
  "5.14": {
    id: "5.14",
    title: "Integrated Pest Management",
    summary:
      "IPM combines monitoring, biological controls, cultural practices, and targeted pesticide use only when economic thresholds are exceeded.",
    lesson:
      "**Integrated Pest Management (IPM)** is a decision-based approach that uses all available tools in combination to keep pest populations below economically damaging levels, minimizing pesticide use.\n\n**Core principles**:\n\n1. **Monitoring / scouting**: regularly inspect crops, count pests, identify species. Data-driven, not calendar-based spraying.\n2. **Economic threshold**: only intervene when pest density would cause more damage than control costs — accept low pest levels.\n3. **Prevention first**:\n   - **Cultural controls**: crop rotation, sanitation, resistant varieties, timing of planting.\n   - **Mechanical / physical**: row covers, traps, handpicking, tillage.\n4. **Biological controls**:\n   - Predators (ladybugs for aphids; parasitic wasps for tomato hornworms).\n   - Pathogens (*Bacillus thuringiensis* / Bt).\n   - Pheromone disruption (confuses mating).\n5. **Chemical controls as last resort**:\n   - Choose selective pesticides (affect target pest only).\n   - Use lowest effective dose.\n   - Rotate modes of action to prevent resistance.\n   - Time applications to minimize non-target exposure.\n6. **Evaluation**: monitor outcomes; adjust approach next season.\n\n**Benefits**:\n- Reduced pesticide use (often 50–90%), lowering pollution and non-target harm.\n- Slower resistance evolution.\n- Lower input costs for farmers.\n- Healthier ecosystems and pollinators.\n\n**Challenges**:\n- Requires more knowledge and labor than spray-on-schedule approaches.\n- Some pests cross threshold quickly; IPM needs fast response.\n- Training and extension services are essential.\n\nIPM has been successfully deployed in cotton (where resistance devastated Texas in the 1970s), orchards, rice systems, and urban landscaping. It's the cornerstone of sustainable agriculture (5.15).",
    keyIdeas: [
      "IPM: monitor, prevent, biocontrol, pesticides only when thresholds exceeded.",
      "Economic threshold = damage cost > treatment cost.",
      "Rotates and reduces pesticide use — slows resistance.",
      "Needs more knowledge than spray-on-schedule; saves money long-term.",
    ],
    commonMistakes: [
      "Assuming IPM bans pesticides (it restricts and times them).",
      "Forgetting that monitoring is the cornerstone.",
      "Confusing IPM with purely organic methods (it can include synthetic chemicals, strategically).",
    ],
  },
  "5.15": {
    id: "5.15",
    title: "Sustainable Agriculture",
    summary:
      "Sustainable agriculture maintains yields while restoring soil health, reducing inputs, and preserving biodiversity. Tools: no-till, cover crops, rotation, IPM, agroforestry.",
    lesson:
      "**Sustainable agriculture** aims to produce food indefinitely without degrading the resource base. Key practices:\n\n- **No-till / conservation tillage**: leave crop residues; plant without plowing. Benefits: reduces erosion, builds soil carbon, preserves soil biota, saves fuel. Requires different weed-management strategies (sometimes more herbicide, offset by IPM).\n- **Cover crops** (winter rye, clover, vetch): planted between cash crops. Prevent erosion, add organic matter, fix nitrogen (legumes), suppress weeds, reduce nutrient leaching.\n- **Crop rotation**: alternate crops across years to break pest/disease cycles, balance nutrient demands, and improve soil. The classic corn-soybean rotation in the US Midwest; more diverse 3–4-crop rotations provide greater benefits.\n- **Polycultures / intercropping**: multiple crops in the same field. \"Three Sisters\" (maize, beans, squash) of indigenous American agriculture.\n- **Integrated pest management (IPM, 5.14)**.\n- **Agroforestry**: integrate trees with crops or livestock. **Alley cropping** (rows of trees between crops); **silvopasture** (trees + livestock).\n- **Contour plowing, terracing, strip cropping**: reduce erosion on slopes.\n- **Reduced and precision irrigation** (drip, sensors, variable-rate).\n- **Precision agriculture**: GPS, drones, sensors, variable-rate application — put fertilizer/pesticide only where and when needed.\n- **Composting and manure management**: recycle organic matter.\n- **Rotational / managed grazing**: mimic natural disturbance; livestock graze one paddock briefly, then move on, letting vegetation recover.\n- **Agroecological approaches**: whole-farm design that mimics natural ecosystems.\n- **Organic farming**: excludes synthetic pesticides and fertilizers, emphasizes compost, cover crops, biocontrols; certified under USDA Organic in the US.\n\n**Economic dimension**: sustainable practices often have higher labor inputs and transition costs but lower input costs and comparable/better long-term yields. Soil-carbon building and risk reduction are increasingly valued.\n\n**Policy tools**: USDA conservation programs (EQIP, CSP), carbon-market payments, organic certification premiums, research funding for agroecology.",
    keyIdeas: [
      "Core practices: no-till, cover crops, rotation, IPM, agroforestry, rotational grazing.",
      "Maintains yields while rebuilding soil, cutting inputs, preserving biodiversity.",
      "Precision agriculture matches inputs to need, reducing waste.",
      "Organic is one approach; sustainability is broader than organic certification.",
    ],
    commonMistakes: [
      "Equating sustainable with organic (organic is one type).",
      "Assuming sustainable = low yield — evidence often shows comparable yields.",
      "Forgetting labor and training costs of transition.",
    ],
  },
  "5.16": {
    id: "5.16",
    title: "Aquaculture",
    summary:
      "Aquaculture (fish farming) produces over half of seafood today. Efficient but raises issues of water pollution, disease, genetic contamination, and feed dependence.",
    lesson:
      "**Aquaculture** is the farming of aquatic species — fish, shellfish, seaweed. It now accounts for over half of global seafood consumption (it overtook capture fisheries around 2013).\n\n**Types**:\n- **Freshwater**: catfish, tilapia, carp, trout.\n- **Marine / mariculture**: salmon, shrimp, oysters, mussels, seaweed.\n- **Net pens in coastal waters** (salmon farming in Norway, Chile, Scotland).\n- **Ponds** (shrimp in SE Asia; catfish in southern US).\n- **Recirculating aquaculture systems (RAS)**: closed-loop indoor tanks — highest water efficiency, lowest disease/escape risk.\n\n**Benefits**:\n- Takes pressure off wild fisheries (5.8).\n- Very efficient feed conversion for fish and especially shellfish (shellfish filter water and need no feed).\n- High protein output per unit land/water.\n- Can be located inland (RAS) or low-impact (bivalves, seaweed).\n\n**Concerns**:\n- **Water pollution**: fish waste, uneaten feed, and antibiotics flow from net pens; can fuel eutrophication and algal blooms.\n- **Disease and parasite spread**: dense populations breed pathogens. Sea lice from salmon farms infect wild salmon.\n- **Antibiotic use**: as in CAFOs (5.7), drives resistance.\n- **Escapes**: farmed fish escape and interbreed with wild populations, reducing genetic fitness (Atlantic salmon hybridization).\n- **Habitat destruction**: **mangrove clearance** for shrimp farms in SE Asia and Latin America has removed coastal protection, nurseries for wild fish, and carbon stocks.\n- **Feed dependence**: carnivorous species (salmon, shrimp) require fishmeal and fish oil — so farming them depletes smaller wild fish (anchovy, menhaden). Feed-conversion ratio: ~1.2 kg feed per kg salmon in modern farms, but feed itself comes partly from wild fish. Net fish-in-fish-out ratio has improved but remains a concern.\n- **Chemical use**: pesticides to control sea lice; contaminate surrounding waters.\n\n**Sustainable aquaculture**:\n- **Bivalve / seaweed farming**: net environmental positive — filter water, sequester carbon, need no feed.\n- **Integrated Multi-Trophic Aquaculture (IMTA)**: fish + shellfish + seaweed in same system; waste from fish feeds the others.\n- **RAS**: minimal environmental footprint but energy-intensive.\n- **Plant-based fish feeds**: reduce wild-fish dependence.\n- **Certifications**: ASC (Aquaculture Stewardship Council), BAP.",
    keyIdeas: [
      "Aquaculture supplies most seafood; alternative to capture fisheries.",
      "Issues: pollution, disease, escapes, feed dependence, mangrove loss.",
      "Shellfish and seaweed have low/negative footprints; salmon and shrimp highest.",
      "IMTA, RAS, and plant-based feeds move aquaculture toward sustainability.",
    ],
    commonMistakes: [
      "Assuming aquaculture always relieves pressure on wild fisheries — it can increase it via feed demand.",
      "Forgetting mangrove destruction from shrimp farming.",
      "Treating all aquaculture the same (bivalves ≠ salmon in impact).",
    ],
  },
  "5.17": {
    id: "5.17",
    title: "Sustainable Forestry",
    summary:
      "Sustainable forestry harvests wood while maintaining forest ecosystems. Selective cutting, certification (FSC), and plantations reduce pressure on old growth.",
    lesson:
      "**Sustainable forestry** meets current wood demands without degrading future forest productivity or biodiversity.\n\n**Practices**:\n\n- **Selective cutting**: remove specific mature or valuable trees; canopy preserved. Mimics natural gap dynamics.\n- **Shelterwood cutting**: remove trees in phases; leave some to provide seed and shade for next generation.\n- **Strip cutting**: cut narrow strips with buffer strips left; buffers seed the cuts.\n- **Uneven-aged management**: forest has trees of many ages, providing diverse habitat.\n- **Reduced-impact logging**: careful planning of roads/skid trails; directional felling; reducing collateral damage.\n- **Extended rotations**: longer time between harvests, producing larger, more valuable trees and better habitat.\n- **Plantation forestry on marginal land**: fast-growing species (pine, eucalyptus) grown like crops; reduces pressure on natural forests but have low biodiversity themselves.\n\n**Certification schemes**:\n- **Forest Stewardship Council (FSC)**: strictest; covers biodiversity, worker rights, indigenous rights.\n- **Sustainable Forestry Initiative (SFI)**: industry-developed; less strict.\n- **PEFC** (Programme for the Endorsement of Forest Certification).\n\nCertified wood commands small price premiums and is required by many large buyers (IKEA, Home Depot in some markets).\n\n**Reforestation** and **afforestation**:\n- **Reforestation**: replanting previously forested areas.\n- **Afforestation**: planting on land not recently forested.\n- Both sequester carbon, reduce erosion, restore habitat. Native species preferred; monoculture plantations are less beneficial ecologically.\n\n**Ecosystem-based forestry** integrates timber with water protection, biodiversity, carbon storage, and cultural uses. Increasingly, **Payments for Ecosystem Services** compensate landowners for keeping forests standing (e.g., REDD+ in the tropics).\n\n**Illegal logging** remains a huge problem globally — accounts for ~15–30% of traded wood; drives deforestation in Amazon, Congo Basin, SE Asia.\n\n**Fire management**: prescribed burns reduce fuel loads; total suppression (misguided in fire-adapted systems) produces catastrophic fires.",
    keyIdeas: [
      "Sustainable forestry: selective, shelterwood, strip cutting; extended rotations; reduced-impact logging.",
      "Certification: FSC (strict), SFI, PEFC.",
      "Reforestation + afforestation sequester carbon, restore habitat.",
      "Illegal logging and mismanaged fire regimes remain major challenges.",
    ],
    commonMistakes: [
      "Equating tree planting with forest restoration (diversity, age structure matter).",
      "Treating all certifications equally (FSC is stricter than SFI).",
      "Forgetting prescribed fire is part of sustainable management in fire-adapted systems.",
    ],
  },

  // =========================================================================
  // UNIT 6 — ENERGY RESOURCES AND CONSUMPTION
  // =========================================================================
  "6.1": {
    id: "6.1",
    title: "Renewable and Nonrenewable Resources",
    summary:
      "Renewable resources regenerate on human timescales (solar, wind, biomass, hydro); nonrenewable ones do not (fossil fuels, nuclear fuels, most minerals).",
    lesson:
      "Resources are classified by whether they regenerate on timescales useful to humans.\n\n**Renewable resources**: replenish naturally in years to decades.\n- **Perpetual**: effectively limitless on human timescales — **solar**, **wind**, **tidal**, **geothermal** (at many scales).\n- **Potentially renewable**: regenerate if used sustainably, but can be depleted — **biomass**, **freshwater**, **fertile soil**, **timber**, **fisheries**. Misused, they become effectively nonrenewable on relevant timescales.\n\n**Nonrenewable resources**: formed over geological timescales; effectively finite.\n- **Fossil fuels**: coal, oil, natural gas. Formed over 100+ million years.\n- **Nuclear fuels**: uranium, thorium. Abundant but technically nonrenewable.\n- **Mineral resources**: iron, aluminum, copper, lithium, rare earths. Finite, though recyclable.\n\n**Energy vs resource ambiguity**: hydroelectric dams use renewable water flow, but construction alters habitat permanently; biomass is renewable if regrown, but using it faster than regrowth makes it nonrenewable in practice.\n\n**Current global energy mix** (approximate):\n- Fossil fuels: ~80% (oil ~32%, coal ~26%, natural gas ~23%).\n- Renewables: ~15% (hydro, biomass, wind, solar).\n- Nuclear: ~5%.\n\n**Trends**: renewable share is rising rapidly (solar/wind cost declines); fossil share declining but still dominant. Global energy use still growing overall.\n\n**Transition drivers**: climate change (9.4), air pollution (7.x), energy security, falling renewable costs. Obstacles: existing fossil infrastructure, grid integration challenges, transition economics, politics.",
    keyIdeas: [
      "Renewable: regenerates naturally; perpetual (sun/wind) or potentially renewable (biomass/water/soil).",
      "Nonrenewable: geological-timescale formation — fossil fuels, nuclear, minerals.",
      "Potentially renewable resources can be depleted by overuse.",
      "Fossil fuels are ~80% of global energy; renewables rising fast.",
    ],
    commonMistakes: [
      "Calling nuclear renewable (it isn't — uranium is finite).",
      "Treating all biomass as renewable (deforestation makes it non-renewable in practice).",
      "Confusing primary energy (all sources) with electricity (~20% of energy).",
    ],
  },
  "6.2": {
    id: "6.2",
    title: "Global Energy Consumption",
    summary:
      "Wealthy industrialized nations consume far more energy per capita than developing ones. Global consumption has more than doubled since 1980.",
    lesson:
      "Global primary energy consumption has risen from ~300 EJ (exajoules) in 1980 to ~600 EJ today (more than doubling), driven by population growth and rising living standards.\n\n**Per-capita consumption varies enormously**:\n- USA, Canada, Australia: ~300+ GJ/person/year.\n- Western Europe, Japan: ~120–180 GJ.\n- China: ~100 GJ (rapidly rising).\n- India: ~25 GJ.\n- Sub-Saharan Africa: ~15 GJ.\n\n**Sector breakdown** (approximate):\n- Industry: ~30% (steel, cement, chemicals are big users).\n- Buildings (heating, cooling, lighting): ~30%.\n- Transportation: ~28% (mostly oil).\n- Non-energy uses (feedstocks): ~10%.\n\n**Fuel mix** varies by region:\n- **China**: coal-heavy (~55%), but massive renewable additions.\n- **USA**: diverse — oil, gas, renewables, nuclear, some coal.\n- **Europe**: lower coal, more gas, high renewable growth.\n- **Africa**: biomass still major for cooking (wood, charcoal, dung); health and deforestation costs.\n- **Middle East**: oil and gas dominate.\n\n**Trends**:\n- **Electrification**: share of final energy delivered as electricity rising as transport (EVs) and heating (heat pumps) electrify.\n- **Renewables**: solar and wind growing rapidly; now cheapest new electricity in many markets.\n- **Efficiency**: energy per unit GDP falling in most countries (decoupling).\n- **Developing-country growth**: energy demand rising fastest in India, SE Asia, Africa.\n\n**Equity**: 750 million people lack electricity; 2.3 billion lack clean cooking fuels — main drivers of indoor air pollution (7.5) and premature deaths.\n\n**Projections** (IEA): global demand continues rising through 2050 even with efficiency gains, as developing nations build out infrastructure. Meeting this with low-carbon sources is the defining challenge.",
    keyIdeas: [
      "Global primary energy ~600 EJ/yr; doubled since 1980.",
      "US per-capita consumption ~20× sub-Saharan Africa.",
      "Sectors: industry ~30%, buildings ~30%, transport ~28%.",
      "750 M people lack electricity; 2.3 B lack clean cooking fuels.",
    ],
    commonMistakes: [
      "Ignoring that developing countries' growing consumption dominates future demand.",
      "Forgetting biomass is still a major cooking fuel in low-income regions.",
      "Assuming electrification is universal (it isn't).",
    ],
  },
  "6.3": {
    id: "6.3",
    title: "Fuel Types and Uses",
    summary:
      "Different fuels power different sectors: coal for electricity, oil for transport, natural gas for heat/electricity, uranium for baseload electricity, biomass for cooking.",
    lesson:
      "Each fuel has characteristic uses based on energy density, form, and infrastructure.\n\n**Coal** (solid, high carbon):\n- Primarily **electricity generation** (~40% of global power, declining).\n- **Steel production** (metallurgical coal).\n- Highest CO₂ emissions per unit energy of any fossil fuel; heavy SO₂, NOₓ, mercury, particulate emissions.\n- Easy to store, transport by rail.\n\n**Petroleum / oil** (liquid hydrocarbon):\n- Dominates **transportation** (~95% of transport fuel is oil-derived): gasoline, diesel, jet fuel.\n- Chemical **feedstocks**: plastics, pharmaceuticals, fertilizers.\n- Heating oil in some regions.\n- Energy-dense, transportable — hard to replace for aviation, shipping, long-haul trucking.\n\n**Natural gas** (methane, CH₄):\n- **Electricity** (peaking and baseload).\n- **Heating** (homes, industry).\n- **Industrial processes** (chemicals, fertilizer).\n- Burns cleaner than coal (less SO₂, particulate, CO₂ per kWh), but methane leaks can offset climate benefits (methane is ~80× as potent as CO₂ over 20 years).\n- Requires pipelines or liquefaction (LNG) for transport.\n\n**Nuclear** (uranium-235 fission):\n- **Baseload electricity** — runs constantly at high capacity.\n- Extremely energy-dense (a pencil-eraser-sized pellet ≈ ton of coal).\n- No direct CO₂ from fission.\n\n**Biomass** (wood, crop residues, dung, biofuels):\n- **Cooking and heating** in developing countries (major source of indoor air pollution).\n- **Biofuels** (ethanol, biodiesel) blended with transport fuels.\n- **Co-firing** with coal in power plants.\n\n**Other renewables**: electricity (wind, solar, hydro, geothermal) — can be used broadly via the grid.\n\n**Sector challenges**: hardest to decarbonize are aviation, shipping, long-haul trucking, and heavy industry (steel, cement, chemicals) — most oil demand. Solutions: electrification, hydrogen (6.11), synthetic fuels, efficiency.",
    keyIdeas: [
      "Coal → electricity + steel; high CO₂ and pollutants.",
      "Oil → transportation + chemicals; hard to replace.",
      "Natural gas → electricity + heat; cleaner burn but methane leaks.",
      "Nuclear → baseload electricity; biomass → cooking and biofuels.",
    ],
    commonMistakes: [
      "Assuming oil is used mainly for electricity (it's mostly transportation).",
      "Treating natural gas as a clean fuel ignoring methane leaks.",
      "Forgetting biomass is a major cooking fuel in low-income countries.",
    ],
  },
  "6.4": {
    id: "6.4",
    title: "Distribution of Natural Energy Resources",
    summary:
      "Energy resources are unevenly distributed. Concentration drives geopolitics, trade, and infrastructure build-outs.",
    lesson:
      "Energy resources are geographically concentrated; this shapes trade, economies, and geopolitics.\n\n**Oil**:\n- **Top reserves**: Venezuela, Saudi Arabia, Canada (oil sands), Iran, Iraq.\n- **Top producers**: USA, Saudi Arabia, Russia.\n- **OPEC** coordinates production among major exporters (Saudi-led).\n- Oil disputes have driven wars and influenced US foreign policy for decades.\n\n**Natural gas**:\n- **Top reserves**: Russia, Iran, Qatar.\n- **Top producers**: USA, Russia, Iran.\n- Transport is harder than oil — pipelines or LNG ships — so markets are more regional.\n\n**Coal**:\n- **Top reserves**: USA, Russia, Australia, China, India.\n- **Top producers**: China (half of world output), USA, India, Indonesia, Australia.\n- Widely distributed → less geopolitical concentration than oil.\n\n**Uranium**:\n- **Top producers**: Kazakhstan, Canada, Australia, Namibia, Niger, Russia.\n\n**Solar**:\n- Highest insolation in low-latitude deserts (Sahara, Arabian Peninsula, Atacama, US Southwest, Australia).\n- Everywhere has *some* solar potential.\n\n**Wind**:\n- Strongest in high-latitude coastal zones (North Sea, Great Plains, Patagonia, south coast of Australia).\n- Offshore has steadier, stronger wind.\n\n**Hydropower**:\n- Concentrated where topography + rainfall combine: Norway, Canada, Brazil, China, DRC.\n- Three Gorges (China) is the world's largest hydroelectric dam.\n\n**Geothermal**:\n- Tectonically active regions — Iceland, NZ, Indonesia, Philippines, Kenya (Rift Valley), western US.\n\n**Biomass**: widely available but most concentrated in tropical forests and agricultural regions.\n\n**Mineral requirements for renewables**: solar needs silicon, silver, tellurium; wind needs rare earths (neodymium, dysprosium); batteries need lithium, cobalt, nickel. **China** dominates processing of many critical minerals; Congo produces most cobalt; Chile and Australia produce most lithium. The renewable transition is creating new geopolitical dependencies, though different from oil.",
    keyIdeas: [
      "Oil: concentrated in Middle East, Venezuela, Russia, USA.",
      "Coal: widely distributed — less geopolitical leverage.",
      "Renewables: vary by latitude/terrain — solar in deserts, wind on coasts/plains, hydro in mountain regions.",
      "Critical minerals for renewables create new geopolitical dependencies.",
    ],
    commonMistakes: [
      "Assuming energy resources are evenly distributed.",
      "Forgetting China's dominance in critical mineral processing.",
      "Ignoring that hydropower potential is geographically limited.",
    ],
  },
  "6.5": {
    id: "6.5",
    title: "Fossil Fuels",
    summary:
      "Coal, oil, and natural gas formed from buried organic matter over 100+ million years. They power civilization but drive climate change, air pollution, and habitat damage.",
    lesson:
      "**Formation**:\n- **Coal**: compressed and heated plant matter (mostly from ancient swamps 300+ million years ago). Ranks (least to most energy-dense): peat → lignite → bituminous → anthracite.\n- **Oil and natural gas**: compressed and heated marine microorganisms in sedimentary basins. Migrate upward until trapped by impermeable cap rock.\n- **Unconventional sources**: **oil sands** (tar sand + bitumen; Alberta, Venezuela), **shale oil/gas** (fracked from tight formations; US Bakken/Marcellus/Permian).\n\n**Extraction**:\n- **Coal**: strip mining (surface), mountaintop removal, underground mining (5.9).\n- **Oil/gas**: drilling — onshore and offshore. Modern **hydraulic fracturing (fracking)**: inject high-pressure water, sand, and chemicals to fracture shale and release hydrocarbons. Greatly expanded US production in the 2010s.\n- **Oil sands**: surface mining or in-situ steam injection.\n\n**Combustion and impacts**:\n- **CO₂** from combustion drives climate change (Unit 9). Coal ~820 g CO₂/kWh; gas ~490; oil ~720 (varies).\n- **SO₂**: mostly from coal with sulfur content → acid rain (7.7).\n- **NOₓ**: high-temp combustion from all fossil fuels → smog (7.2), acid rain.\n- **Particulate matter (PM)**: soot from coal, diesel → respiratory disease.\n- **Mercury, heavy metals**: coal combustion → bioaccumulation (8.8).\n- **VOCs**: from oil refining and gasoline → photochemical smog precursors.\n\n**Extraction-specific impacts**:\n- **Fracking**: groundwater contamination concerns; induced earthquakes from wastewater injection; methane leaks.\n- **Oil sands**: massive habitat destruction, tailings ponds, high energy input (EROI far lower than conventional oil).\n- **Offshore drilling spills**: Deepwater Horizon (2010) spilled 4 million barrels into the Gulf of Mexico.\n- **Pipeline leaks**: tens of thousands annually in US.\n- **Coal ash**: fly ash + bottom ash — hazardous waste; Kingston Fossil Plant spill (2008) released 1 billion gallons.\n\n**Lifecycle**: extraction + transport + combustion + disposal all carry costs. **External costs** (health, climate) are estimated at several \\$ per gallon of gasoline but are not priced at the pump.\n\n**Subsidies**: fossil fuels receive an estimated \\$5+ trillion/yr globally in implicit subsidies (unpriced externalities) — a huge distortion relative to renewables.",
    keyIdeas: [
      "Coal (plants) + oil/gas (marine microbes) formed over geological time.",
      "Emissions: CO₂, SO₂, NOₓ, PM, mercury, VOCs — drive climate and pollution.",
      "Fracking and oil-sands extraction have their own local impacts.",
      "Fossil fuel subsidies (implicit) dwarf renewable subsidies.",
    ],
    commonMistakes: [
      "Conflating oil with gasoline (gasoline is one refined product).",
      "Forgetting natural gas has methane-leak problems alongside CO₂.",
      "Assuming coal is cheap — external costs make it more expensive than renewables.",
    ],
  },
  "6.6": {
    id: "6.6",
    title: "Nuclear Power",
    summary:
      "Nuclear fission generates electricity without direct CO₂. Dense, reliable, but expensive, with concerns over waste, accidents, and weapons proliferation.",
    lesson:
      "**Nuclear fission**: splitting heavy atoms (mostly uranium-235) releases neutrons and huge amounts of energy. A self-sustaining chain reaction heats water; steam drives turbines.\n\n**Reactor types**:\n- **Light Water Reactors (LWR)**: dominant globally. Water acts as coolant + moderator. Subtypes: **PWR** (pressurized water), **BWR** (boiling water).\n- **CANDU** (Canadian): uses heavy water, natural uranium.\n- **Gen IV reactors**: future designs with passive safety, higher efficiency, reduced waste.\n- **Small Modular Reactors (SMRs)**: smaller factory-built units being developed.\n\n**Fuel cycle**:\n1. **Mining**: uranium ore (yellowcake U₃O₈) mined.\n2. **Enrichment**: natural U is 0.7% U-235; enriched to ~3–5% for reactors (much higher for weapons).\n3. **Fuel fabrication**: pellets → rods → assemblies.\n4. **Reactor operation**: ~18–24 months per fuel load.\n5. **Spent fuel storage**: cooling pools → dry cask storage. Highly radioactive for thousands of years.\n6. **Reprocessing** (France, Russia) extracts usable plutonium and uranium from spent fuel; not done in US for weapons-proliferation reasons.\n7. **Long-term disposal**: no country has a functioning deep geologic repository yet (Finland's Onkalo is close).\n\n**Advantages**:\n- **Low CO₂**: ~12 g CO₂/kWh lifecycle, competitive with wind/solar.\n- **High capacity factor** (~90%) — produces power constantly.\n- **Energy-dense**: tiny fuel volumes.\n- **Small land footprint**.\n\n**Concerns**:\n- **Accident risk**: Three Mile Island (1979, limited), Chernobyl (1986, massive), Fukushima (2011, tsunami-triggered). Modern designs have extensive passive safety.\n- **Radioactive waste**: spent fuel remains hazardous for 10,000+ years.\n- **Cost**: new plants are expensive (\\$8–15 B for a GW-scale reactor in the US); cost overruns common. SMRs aim to lower this.\n- **Proliferation**: enrichment technology can produce weapons-grade material.\n- **Water use**: thermal cooling uses large volumes of water.\n- **Decommissioning**: after 40–60 years, plants must be dismantled and site cleaned — expensive.\n\n**Current status**: 10% of global electricity; ~440 reactors operating. France, Ukraine, Slovakia heavily reliant. Some countries (Germany) phasing out; others (China, India, UK) building new plants.\n\n**Fusion** (hydrogen isotopes fusing into helium) remains experimental — ITER under construction in France; many private efforts. Commercial fusion power is probably decades away, though recent progress has been real.",
    keyIdeas: [
      "Fission heats water → steam → turbine; uranium-235 fuel.",
      "Low lifecycle CO₂; high reliability; expensive; long-lived waste.",
      "Accidents: Three Mile Island, Chernobyl, Fukushima.",
      "No country has a fully operational long-term waste repository.",
    ],
    commonMistakes: [
      "Calling nuclear renewable (uranium is finite).",
      "Assuming modern reactors are as dangerous as Chernobyl (they aren't).",
      "Confusing fission (operating) with fusion (experimental).",
    ],
  },
  "6.7": {
    id: "6.7",
    title: "Energy from Biomass",
    summary:
      "Biomass fuels (wood, dung, crops, biofuels) are renewable if regrown, but have air-pollution, land-use, and efficiency concerns.",
    lesson:
      "**Biomass** is organic material used for fuel. Energy originally captured by photosynthesis; can be renewable if regrowth matches use.\n\n**Forms**:\n- **Solid biomass**: wood, charcoal, crop residues, dung. Used for cooking and heating. Still the main cooking fuel for ~2.3 billion people.\n- **Liquid biofuels**: \n  - **Ethanol**: fermented from sugars/starches (corn in US, sugarcane in Brazil).\n  - **Biodiesel**: from vegetable oils (soybean, canola, palm) or animal fats.\n  - **Cellulosic ethanol**: from non-food plant fibers (switchgrass, corn stover) — promising but not widely commercial.\n- **Biogas**: methane from anaerobic digestion of manure, food waste, sewage.\n- **Waste-to-energy**: combusting municipal solid waste for electricity.\n\n**Carbon accounting**:\n- If biomass is regrown, CO₂ released in combustion is reabsorbed by new growth — **carbon neutral in principle**.\n- In practice, regrowth is slow (decades for trees); land-use change (clearing forest for biofuel crops) can emit more carbon than fossil fuels saved.\n- **Indirect land-use change (ILUC)**: displacing food production to grow biofuels can push agriculture into forests elsewhere.\n\n**Concerns**:\n- **Indoor air pollution** (7.5): biomass stoves kill ~3 million/yr from respiratory disease. Clean-cookstove programs are a major global health effort.\n- **Deforestation**: wood fuel demand drives forest loss in many low-income countries.\n- **Food vs fuel**: corn ethanol uses ~40% of US corn harvest; raises food prices.\n- **Net energy**: corn ethanol's EROI is near 1 (barely produces more energy than used to grow and process); sugarcane ethanol is much better.\n- **Water and fertilizer inputs** for biofuel crops.\n- **Particulate emissions** from combustion.\n\n**Benefits when done well**:\n- **Biogas** from manure or waste: waste reduction + renewable energy. Common in India and parts of Europe.\n- **Residue-based biomass**: using crop waste doesn't compete with food.\n- **Biochar**: pyrolysis of biomass → charcoal + energy; charcoal stored in soil sequesters carbon and improves soil.\n- **Advanced biofuels** (algae, cellulosic): could avoid food competition.\n\n**Policy**: US Renewable Fuel Standard requires ethanol blending; EU has biofuel targets; both have faced sustainability criticisms.",
    keyIdeas: [
      "Biomass: wood, crops, waste → solid fuel, ethanol, biodiesel, biogas.",
      "Carbon-neutral *if* regrowth balances use; ILUC can negate benefits.",
      "Indoor air pollution from biomass cooking kills ~3 M/yr.",
      "Corn ethanol has poor EROI; sugarcane much better; residues/biogas better still.",
    ],
    commonMistakes: [
      "Calling all biomass carbon-neutral without accounting for regrowth time and ILUC.",
      "Forgetting indoor air pollution is the leading biomass concern health-wise.",
      "Treating corn ethanol as sustainable (it's largely a subsidy creation).",
    ],
  },
  "6.8": {
    id: "6.8",
    title: "Solar Energy",
    summary:
      "Photovoltaics (PV) convert sunlight directly to electricity; concentrated solar uses mirrors to heat fluid. Costs have fallen dramatically; now cheapest new electricity in most markets.",
    lesson:
      "**Solar photovoltaic (PV)**:\n- Semiconductor panels (silicon) generate DC electricity when struck by photons.\n- Panel + inverter converts to AC for grid.\n- **Utility-scale** solar farms (100+ MW) and **distributed rooftop** systems.\n- **Capacity factor**: 15–25% (sun shines only part of the day).\n- **LCOE** (levelized cost of electricity) for utility solar has fallen from ~\\$0.40/kWh in 2010 to <\\$0.05/kWh in 2024 — among the cheapest electricity in history.\n- Module manufacturing dominated by China.\n\n**Concentrated Solar Power (CSP)**:\n- Mirrors focus sunlight to heat a working fluid → steam → turbine.\n- Can include **thermal storage** (molten salt) → dispatchable power even at night.\n- Works best in very sunny, dry regions (Mojave, North Africa, Spain).\n- Less cost-competitive than PV for electricity.\n\n**Passive solar**:\n- Building design that captures solar heat in winter, rejects it in summer (orientation, overhangs, thermal mass, insulation).\n- Very low operating cost once built.\n\n**Solar hot water**:\n- Flat-plate or evacuated-tube collectors heat water directly. Common in China, Israel, Mediterranean.\n\n**Advantages**:\n- No direct emissions or fuel costs.\n- Modular — kilowatts to gigawatts.\n- Fuel is free and inexhaustible on human timescales.\n- Distributed systems reduce transmission losses.\n- Rapidly falling costs.\n\n**Challenges**:\n- **Intermittency**: no sun at night, reduced on cloudy days. Requires storage (batteries, pumped hydro), grid flexibility, or other sources.\n- **Land use**: utility-scale solar needs large area (can be combined with grazing, agriculture — **agrivoltaics**).\n- **Materials**: silicon, silver, tellurium, indium. Silver is especially supply-constrained.\n- **Manufacturing emissions**: making panels has an emissions footprint, paid back in 1–3 years of operation.\n- **End-of-life recycling**: panels last ~25–30 years; recycling infrastructure still immature.\n\n**Storage + solar** combos (solar + battery) are now competing with natural gas peaking plants. Combined with wind (different availability profile), renewables + storage can meet much of grid demand.",
    keyIdeas: [
      "PV: semiconductor panels → DC electricity; now cheapest new electricity.",
      "CSP: mirrors → heat → steam; can include thermal storage.",
      "Capacity factor 15–25% — intermittent; needs storage/grid flexibility.",
      "Land, materials (silicon/silver), and end-of-life recycling are ongoing challenges.",
    ],
    commonMistakes: [
      "Treating solar as useless at night (storage + grid can handle it).",
      "Forgetting PV is distinct from solar thermal.",
      "Ignoring rapid cost declines (old data gives outdated picture).",
    ],
  },
  "6.9": {
    id: "6.9",
    title: "Hydroelectric Power",
    summary:
      "Hydropower uses falling water to turn turbines. Low-carbon electricity at scale, but dams cause habitat fragmentation, sediment changes, and displaced communities.",
    lesson:
      "**Hydroelectric** plants convert the potential energy of elevated water to electricity:\n\n$$E = mgh, \\quad P = \\rho Q g h \\eta,$$\n\nwhere \\(Q\\) is flow rate, \\(h\\) is head (height drop), and \\(\\eta\\) is efficiency (~90%).\n\n**Types**:\n- **Large impoundment** (reservoir dams): Hoover, Three Gorges, Itaipu. Provide storage and dispatchable power.\n- **Run-of-river**: no (or tiny) reservoir; uses river flow directly. Less disruptive but capacity varies with flow.\n- **Pumped hydro storage**: two reservoirs at different elevations; pump water up when electricity is cheap/abundant, release to generate when needed. Dominant form of grid-scale energy storage.\n- **Micro-hydro**: small systems for rural electrification.\n\n**Advantages**:\n- Very low operating cost once built.\n- Low lifecycle CO₂.\n- Dispatchable — can ramp up/down quickly.\n- Long-lived (50–100+ years).\n- Reservoirs can provide flood control, irrigation, water supply, recreation.\n- Pumped hydro complements intermittent renewables.\n\n**Environmental and social impacts**:\n- **Habitat fragmentation**: dams block fish migration (salmon in Columbia, sturgeon in many rivers). Fish ladders help but incompletely.\n- **Sediment trapping**: rivers deposit sediment in reservoirs, starving downstream deltas. Nile sediments trapped by Aswan High Dam accelerated Nile Delta erosion.\n- **Altered flow regimes**: natural flood pulses suppressed; downstream ecosystems adapted to those pulses decline.\n- **Water temperature changes**: water released from reservoir depths is colder than surface; disrupts downstream ecology.\n- **Methane emissions**: reservoirs in tropical forests emit methane from decomposing flooded vegetation — can rival fossil fuels in lifecycle impact for some tropical dams.\n- **Displacement**: large dams have displaced tens of millions of people (Three Gorges alone displaced ~1.3 million).\n- **Seismic risk**: large reservoirs can trigger earthquakes.\n- **Evaporation losses** in arid regions.\n\n**Global context**: hydropower = ~15% of global electricity and ~50% of low-carbon electricity. Norway ~99% hydro; Brazil ~65%; Canada ~60%. Best sites in wealthy countries are largely developed; remaining potential concentrated in DRC, India, SE Asia, Africa.\n\n**Dam removal**: aging dams with limited benefits and significant environmental costs are being removed — Elwha River (Washington) restoration is a prominent example.",
    keyIdeas: [
      "Power ~ ρQgh — flow rate × head.",
      "Low-carbon, dispatchable; good pair for intermittent renewables via pumped storage.",
      "Impacts: fish migration blocks, sediment trapping, altered flows, displacement.",
      "Tropical reservoirs can emit substantial methane from decomposing vegetation.",
    ],
    workedExample: {
      prompt: "A dam has head \\(h = 50\\) m, flow \\(Q = 100\\) m³/s, efficiency 90%. Estimate power output.",
      solution:
        "\\(P = 1000\\cdot 100\\cdot 9.8\\cdot 50\\cdot 0.9 \\approx 44\\) MW. (Density of water 1000 kg/m³.)",
    },
    commonMistakes: [
      "Treating hydropower as impact-free.",
      "Forgetting methane emissions from tropical reservoirs.",
      "Confusing pumped storage (net energy sink, net storage) with conventional hydro (net source).",
    ],
  },
  "6.10": {
    id: "6.10",
    title: "Geothermal Energy",
    summary:
      "Geothermal extracts Earth's internal heat. High-grade resources in tectonically active regions; ground-source heat pumps work anywhere for space heating/cooling.",
    lesson:
      "**Geothermal energy** taps heat generated in Earth's interior (mostly radioactive decay of uranium, thorium, potassium in the mantle and crust).\n\n**High-grade electricity generation**:\n- Requires high subsurface temperatures (>150 °C) and permeability — found in tectonically active regions: Iceland, New Zealand, Indonesia, Philippines, Kenya (Rift Valley), Italy, western US (The Geysers).\n- **Dry steam plants**: direct steam from underground drives turbines. Oldest design.\n- **Flash steam plants**: hot water depressurizes, flashes to steam. Most common today.\n- **Binary cycle plants**: geothermal water heats a secondary working fluid (lower boiling point). Work at lower temperatures.\n- Global geothermal electricity: ~100 GWe installed, modest share of global mix.\n\n**Low-grade: ground-source heat pumps (GSHP)**:\n- Use the stable shallow-ground temperature (~10–15 °C year-round) as a heat source in winter and sink in summer.\n- Work anywhere — not just volcanic regions.\n- 3–5× more efficient than electric resistance heating.\n- Higher upfront cost, long payback.\n\n**Direct use**:\n- **District heating**: Reykjavik heats the whole city with geothermal.\n- Greenhouses, fish farms, industrial processes, spa baths.\n\n**Advantages**:\n- Low carbon lifecycle (~40 g CO₂/kWh).\n- High capacity factor (90%+) — baseload, dispatchable.\n- Small land footprint.\n- Domestic resource (no fuel imports).\n\n**Challenges**:\n- Geographic limitation for electricity.\n- Upfront drilling costs are high and risky.\n- Some plants release CO₂, H₂S, and trace heavy metals (varies by site).\n- **Enhanced Geothermal Systems (EGS)**: inject water into hot dry rock — expands potential but has induced minor earthquakes.\n- Over-extraction can cool reservoirs.\n\n**Heat pumps for buildings** are increasingly recognized as central to decarbonizing space heating/cooling — not always \"geothermal\" (air-source heat pumps are more common and cheaper), but ground-source offers higher efficiency in extreme climates.",
    keyIdeas: [
      "Geothermal electricity: high-temp resources in tectonic regions.",
      "Plant types: dry steam, flash, binary cycle.",
      "Ground-source heat pumps: space heating/cooling anywhere, very efficient.",
      "Dispatchable + low-carbon; geographic limits and drilling risks.",
    ],
    commonMistakes: [
      "Limiting geothermal to electricity (direct use and heat pumps are huge).",
      "Assuming all geothermal is emissions-free (CO₂ + H₂S from some plants).",
      "Thinking ground-source heat pumps require active volcanism (they don't).",
    ],
  },
  "6.11": {
    id: "6.11",
    title: "Hydrogen Fuel Cell",
    summary:
      "Hydrogen fuel cells combine H₂ + O₂ → H₂O + electricity. Clean at point of use, but hydrogen must be produced (currently from natural gas); \"green hydrogen\" from renewables is the goal.",
    lesson:
      "**Hydrogen fuel cells** directly convert chemical energy of hydrogen to electricity (bypassing combustion, bypassing Carnot efficiency limits). Reaction:\n\n$$2\\text{H}_2 + \\text{O}_2 \\to 2\\text{H}_2\\text{O} + \\text{electricity} + \\text{heat}.$$\n\n**Cell operation** (PEM fuel cell):\n- Anode: H₂ → 2H⁺ + 2e⁻.\n- Electrons flow through external circuit (electricity).\n- Protons diffuse through membrane.\n- Cathode: 4H⁺ + 4e⁻ + O₂ → 2H₂O.\n- Only emissions: water and waste heat.\n\n**Efficiency**: 40–60% for the stack; higher for combined heat+power.\n\n**Applications**:\n- **Vehicles**: Toyota Mirai, Hyundai Nexo, hydrogen buses, trains, trucks.\n- **Stationary power**: backup power, remote power, some utility demos.\n- **Aerospace, shipping**: potential for sectors hard to electrify.\n\n**Hydrogen production (the real climate question)**:\n- **Gray hydrogen**: steam methane reforming — CH₄ + H₂O → CO + 3H₂, then CO + H₂O → CO₂ + H₂. Current dominant method; emits CO₂.\n- **Blue hydrogen**: same + carbon capture and storage (CCS).\n- **Green hydrogen**: **electrolysis** of water with renewable electricity — 2H₂O → 2H₂ + O₂. Low-carbon but expensive; cost falling with renewable electricity.\n- **Pink hydrogen**: electrolysis with nuclear electricity.\n\n**Storage/transport**:\n- Hydrogen is lightest element — low energy density by volume.\n- Stored as compressed gas (350–700 bar) or liquid (−253 °C).\n- Leaks easily; safety protocols needed.\n- Can be injected into natural gas pipelines (small percentages).\n\n**Advantages**:\n- Clean at point of use.\n- Fast refueling (compared to batteries).\n- Good for heavy/long-haul applications where batteries are inadequate.\n\n**Challenges**:\n- ~95% of current H₂ is gray → overall not green.\n- Efficiency chain (electricity → H₂ → fuel cell → motion) loses more energy than direct battery-electric.\n- Infrastructure (refueling, pipelines) nearly nonexistent.\n- Cost: fuel cells expensive; electrolyzers expensive.\n\n**Outlook**: most analysts see hydrogen playing a key role in hard-to-electrify sectors (steel, fertilizer, long-haul shipping, aviation synfuels) rather than passenger cars (batteries likely to dominate).",
    keyIdeas: [
      "Fuel cell: H₂ + O₂ → H₂O + electricity; clean at point of use.",
      "Most hydrogen today is \"gray\" from natural gas — emits CO₂.",
      "Green hydrogen: electrolysis with renewable electricity — low-carbon, costly.",
      "Likely role: heavy transport, industry, fertilizer — not passenger cars.",
    ],
    commonMistakes: [
      "Calling hydrogen \"clean\" without considering production pathway.",
      "Confusing fuel cells (electrochemical) with combustion.",
      "Assuming hydrogen will replace gasoline in cars (batteries are winning that race).",
    ],
  },
  "6.12": {
    id: "6.12",
    title: "Wind Energy",
    summary:
      "Wind turbines convert kinetic energy of moving air into electricity. Rapidly scaling globally; capacity factors higher offshore. Bird/bat mortality and siting are main concerns.",
    lesson:
      "**Wind turbines** extract kinetic energy from air via lift on rotor blades. Shaft → gearbox → generator → grid.\n\n**Power** available in wind is:\n\n$$P = \\tfrac{1}{2}\\rho A v^3,$$\n\nwhere \\(\\rho\\) is air density, \\(A\\) is swept area, \\(v\\) is wind speed. **Cubic** dependence on speed — small changes in wind speed cause huge changes in power.\n\n**Betz limit**: no turbine can extract more than 59.3% of incoming wind energy (momentum must be conserved). Real turbines achieve ~40–50%.\n\n**Types**:\n- **Horizontal-axis wind turbines (HAWT)**: standard three-blade design, dominant for utility.\n- **Vertical-axis (VAWT)**: niche applications.\n- **Offshore**: fixed-bottom or floating platforms. Higher winds, steadier, less visual/noise impact — but more expensive.\n\n**Scale**: modern onshore turbines 3–5 MW; offshore 10–15 MW. Blades 80–120 m long.\n\n**Capacity factor**:\n- Onshore: 30–45%.\n- Offshore: 40–55%+ (steadier wind).\n\n**Advantages**:\n- Low lifecycle CO₂ (~11 g/kWh).\n- No fuel costs; no water use; small land footprint (can combine with crops/grazing).\n- Costs have plummeted — onshore wind now cheaper than new coal/gas in many markets.\n- Mature technology.\n\n**Challenges**:\n- **Intermittency**: variable output; wind doesn't blow on demand. Grid balancing needed.\n- **Location**: best winds often far from load centers — transmission required.\n- **Bird and bat mortality**: though smaller than losses to buildings, cats, cars. Careful siting (avoid migration corridors), radar-triggered shutdowns, and painted blades reduce kills.\n- **Visual and noise impact**: \"NIMBY\" opposition in some communities.\n- **Blade disposal**: fiberglass blades hard to recycle; research underway.\n- **Rare-earth magnets**: permanent magnets in some turbines use neodymium/dysprosium — supply chain issues.\n\n**Leaders**: China (largest capacity), US, Germany, India, Spain, UK (offshore leader). EU's North Sea is the world's largest offshore build-out.\n\n**Grid integration**: wind + solar are complementary (sun stronger in summer/day, wind often stronger at night/winter). Combined with storage and transmission, renewables can cover increasing fractions of grid demand.",
    keyIdeas: [
      "Power scales as cube of wind speed — siting is critical.",
      "Betz limit caps extractable fraction at 59.3%.",
      "Offshore has higher capacity factor, higher cost.",
      "Key concerns: intermittency, bird/bat mortality, transmission from remote sites.",
    ],
    workedExample: {
      prompt:
        "Wind speed doubles from 5 m/s to 10 m/s. How much does available wind power change?",
      solution:
        "Power ∝ v³, so power increases by 2³ = 8×.",
    },
    commonMistakes: [
      "Assuming wind power scales linearly with wind speed (it's cubic).",
      "Overestimating bird mortality versus other anthropogenic causes.",
      "Forgetting the Betz limit sets a hard ceiling.",
    ],
  },
  "6.13": {
    id: "6.13",
    title: "Energy Conservation",
    summary:
      "The cheapest and cleanest kWh is the one you don't use. Efficiency, building envelopes, electrification, and behavior change cut consumption.",
    lesson:
      "**Energy conservation** = reducing energy demand through efficiency + behavior. Distinct from **energy efficiency** (technical) though often used interchangeably.\n\n**Buildings** (~40% of energy use):\n- **Insulation**: walls, attic, windows — reduces heating/cooling demand.\n- **Efficient windows** (double/triple pane, low-e coatings).\n- **Air sealing**: prevents heated/cooled air from leaking.\n- **Efficient HVAC**: heat pumps ~3–4× more efficient than resistance heating or gas combustion.\n- **LED lighting**: ~10× more efficient than incandescent, 2× more than fluorescent.\n- **ENERGY STAR** appliances.\n- **Passive house** standards: ultra-low-energy buildings.\n\n**Transportation** (~28%):\n- **CAFE standards**: Corporate Average Fuel Economy — US minimum vehicle MPG.\n- **Electric vehicles (EVs)**: 3–4× more efficient than combustion engines; emissions depend on grid.\n- **Public transit**: 5–20× more efficient per passenger-mile than single-occupant car.\n- **Active transportation** (walking, biking).\n- **Telecommuting** (partial displacement of commuting).\n- **Aerodynamic truck improvements**, tire efficiency.\n\n**Industry**:\n- **Combined Heat and Power (CHP / cogeneration)**: use waste heat from power generation for process heat; 80%+ overall efficiency vs 33% for electricity alone.\n- **Motors, pumps, compressed air**: efficiency upgrades (motors account for ~60% of industrial electricity).\n- **Process redesign**: heat integration, recovery, new processes.\n\n**Appliances**:\n- **Refrigerators** now use ~75% less energy than 1970s models for same capacity.\n- **Heat-pump water heaters**.\n- **Standby power** (\"vampire loads\"): small but cumulative.\n\n**Behavioral**:\n- Thermostat set-points (1 °C in a typical climate ≈ 5–10% heating energy).\n- Turning off unused devices.\n- Full laundry/dishwasher loads.\n- Cold-water laundry.\n\n**Jevons paradox**: efficiency gains can increase total use by lowering per-use cost. Mitigated by policy (efficiency + carbon pricing).\n\n**Policy tools**:\n- **Building codes** (IECC, California Title 24).\n- **Appliance standards**.\n- **Utility demand-side management** programs (rebates, audits).\n- **Carbon pricing** (tax or cap-and-trade).\n- **Tax credits** (for EVs, heat pumps, insulation — US IRA).\n\nEnergy efficiency is typically the most cost-effective climate action, with negative abatement costs (saves money while cutting emissions). McKinsey cost curves consistently place efficiency at the bottom of the cost stack.",
    keyIdeas: [
      "Conservation (less use) + efficiency (more output per unit) complement each other.",
      "Biggest levers: building envelope, heat pumps, LEDs, EVs/transit, industrial motors/CHP.",
      "Jevons paradox: efficiency can increase use absent policy.",
      "Efficiency is typically the cheapest way to cut emissions — negative cost.",
    ],
    commonMistakes: [
      "Dismissing efficiency as \"too small\" to matter.",
      "Confusing conservation (doing less) with efficiency (doing more with less).",
      "Ignoring Jevons paradox — efficiency without policy can backfire at scale.",
    ],
  },

  // =========================================================================
  // UNIT 7 — ATMOSPHERIC POLLUTION
  // =========================================================================
  "7.1": {
    id: "7.1",
    title: "Introduction to Air Pollution",
    summary:
      "Air pollutants are primary (emitted directly) or secondary (formed in the atmosphere). Six US EPA criteria pollutants: CO, NOₓ, SO₂, O₃, PM, Pb.",
    lesson:
      "**Air pollution** = any substance in air at concentrations high enough to harm humans, ecosystems, or property. Pollutants are classified by origin:\n\n- **Primary pollutants**: emitted directly from sources. Examples: CO, SO₂, NO, PM, VOCs.\n- **Secondary pollutants**: formed in the atmosphere through chemical reactions. Examples: ground-level ozone (O₃), photochemical smog, acid rain, NO₂ (partly — NO oxidizes to NO₂ in air).\n\n**US EPA Criteria Pollutants** (Clean Air Act, 1970/1990):\n1. **Carbon monoxide (CO)**: from incomplete combustion (car exhaust, gas heaters). Binds hemoglobin, blocks O₂ transport. Odorless, deadly in closed spaces.\n2. **Nitrogen oxides (NOₓ = NO + NO₂)**: high-T combustion (engines, power plants). Contribute to smog (7.2), acid rain (7.7), ground-level ozone.\n3. **Sulfur dioxide (SO₂)**: burning sulfur-containing coal/oil, some industrial. Causes acid rain (7.7), respiratory irritation.\n4. **Ozone (O₃)**: secondary — formed when NOₓ + VOCs react in sunlight. Ground-level O₃ damages lungs and plants (distinct from beneficial stratospheric ozone, 9.1).\n5. **Particulate matter (PM)**: PM₁₀ (diameter ≤ 10 μm, inhalable); PM₂.₅ (≤ 2.5 μm, penetrates deep into lungs, crosses into bloodstream). From combustion, dust, construction, natural sources. Leading cause of air pollution deaths (~7 million/yr globally).\n6. **Lead (Pb)**: once from leaded gasoline (banned in US 1996), now mostly from industrial processes and paint. Neurotoxin.\n\n**Sources**:\n- **Stationary**: power plants, factories, refineries.\n- **Mobile**: cars, trucks, ships, airplanes.\n- **Area**: many small distributed sources (dry cleaners, gas stations, homes).\n\n**Health impacts**:\n- **Acute**: asthma attacks, COPD exacerbation, heart attacks.\n- **Chronic**: lung cancer, cardiovascular disease, developmental problems.\n- **Environmental justice**: communities near highways, refineries, power plants — often lower-income, minority — bear disproportionate burden.\n\n**Regulation**: Clean Air Act sets National Ambient Air Quality Standards (NAAQS) for criteria pollutants. States implement via State Implementation Plans. Dramatic improvement since 1970: US criteria pollutants down 70%+ while GDP tripled.",
    keyIdeas: [
      "Primary (emitted) vs secondary (formed) pollutants.",
      "Six US criteria pollutants: CO, NOₓ, SO₂, O₃, PM, Pb.",
      "PM₂.₅ is deadliest — deep lung + bloodstream penetration.",
      "Clean Air Act cut US pollutants 70%+ while economy tripled.",
    ],
    commonMistakes: [
      "Confusing ground-level ozone (harmful) with stratospheric ozone (protective).",
      "Treating NO₂ as purely primary — part is secondary (from NO oxidation).",
      "Forgetting PM₂.₅ is more dangerous than PM₁₀.",
    ],
  },
  "7.2": {
    id: "7.2",
    title: "Photochemical Smog",
    summary:
      "Photochemical smog forms when NOₓ and VOCs react in sunlight to produce ground-level ozone and other oxidants. Peaks in warm, sunny, vehicle-heavy cities.",
    lesson:
      "**Photochemical smog** is a secondary pollution mixture formed on warm, sunny days in urban areas. Key ingredients:\n\n- **NOₓ** (primarily NO from vehicle exhaust).\n- **Volatile organic compounds (VOCs)**: gasoline vapors, solvents, paints, biogenic emissions (trees emit isoprene/terpenes).\n- **Sunlight (UV)**.\n\n**Core chemistry**:\n1. NO₂ + UV → NO + O.\n2. O + O₂ → **O₃** (ground-level ozone).\n3. VOCs react with the resulting radicals, regenerating NO₂ and producing more O₃ plus **peroxyacetyl nitrate (PAN)**, aldehydes, and other oxidants.\n\nNet effect: a brown haze with high ozone and PAN — the classic Los Angeles, Mexico City, Beijing (on smog days), Delhi smog.\n\n**Conditions that favor smog**:\n- Warm (reactions accelerate).\n- Sunny (drives photolysis).\n- Stagnant air / thermal inversion (7.3).\n- Dense traffic (NOₓ + VOC sources).\n- Topography (valleys trap air — LA basin, Denver, Mexico City).\n\n**Health and environmental effects**:\n- **Respiratory irritation**: coughing, shortness of breath, asthma attacks.\n- **Reduced lung function** with chronic exposure.\n- **Eye irritation** from PAN.\n- **Plant damage**: ozone reduces photosynthesis, damages leaves — affects crop yields (soybeans, wheat, cotton) globally.\n- **Material damage**: rubber, plastics, paints degrade.\n\n**Diurnal pattern**: NO and VOCs emitted in morning rush → O₃ peaks mid-afternoon → decreases overnight (no sunlight).\n\n**Control**:\n- **Reduce NOₓ**: catalytic converters on vehicles, low-NOₓ burners on power plants.\n- **Reduce VOCs**: vapor-recovery nozzles at gas stations, reformulated gasoline, water-based paints.\n- **Reduce driving**: transit, EVs, carpooling.\n- **Air quality alerts**: restrict industrial activity on bad days.\n\nUS urban ozone has dropped substantially but remains a compliance challenge for many cities.",
    keyIdeas: [
      "Smog = NOₓ + VOCs + sunlight → O₃ + PAN + aldehydes.",
      "Peaks mid-afternoon in warm, sunny, traffic-heavy cities.",
      "Thermal inversion and mountain topography trap it.",
      "Control: reduce NOₓ and VOCs at the source.",
    ],
    commonMistakes: [
      "Confusing photochemical smog with industrial/\"London smog\" (sulfurous).",
      "Expecting smog to peak during rush hour (O₃ lags emissions).",
      "Forgetting ozone forms from multiple precursors, not just one.",
    ],
  },
  "7.3": {
    id: "7.3",
    title: "Thermal Inversion",
    summary:
      "Normally air cools with altitude; in a thermal inversion a warm layer sits atop cool air, trapping pollution near the ground.",
    lesson:
      "Normally, the troposphere cools with altitude (~6.5 °C/km). Warm air rises, cold air sinks, and pollution disperses vertically.\n\n**Thermal inversion**: a layer of warm air sits above a layer of cooler air. The normal temperature gradient is reversed. Cold surface air is denser and trapped below the warm \"lid\"; vertical mixing stops. Pollutants accumulate.\n\n**How inversions form**:\n- **Radiation inversion**: on clear calm nights, ground radiates heat, cooling near-surface air while air aloft stays warmer. Common in valleys and basins.\n- **Subsidence inversion**: high-pressure systems compress and warm descending air; common in LA basin especially in summer.\n- **Frontal inversion**: warm air rides over cold air at a weather front.\n- **Topography-enhanced**: mountains restrict horizontal mixing; valleys collect cold air overnight.\n\n**Consequences**:\n- Photochemical smog (7.2) pools → brown haze, high ozone.\n- Particulates accumulate to hazardous levels.\n- Respiratory and cardiac events spike.\n- Visibility drops.\n\n**Notorious events**:\n- **Donora, Pennsylvania (1948)**: week-long inversion trapped zinc smelter emissions. 20 dead, thousands sickened. Catalyzed US air pollution regulation.\n- **Great Smog of London (1952)**: inversion + coal smoke + fog killed ~12,000. Led to the UK Clean Air Act of 1956.\n- **Los Angeles (ongoing)**: basin topography + subsidence inversions produce persistent smog.\n- **Delhi, Beijing, Mexico City**: modern examples where inversions worsen already high emissions.\n\n**Inversion breaks** when surface heating lifts the cold layer (sunny afternoon), or winds arrive to mix air, or a storm front moves through.\n\n**Policy implication**: air quality alerts and emergency emission restrictions are triggered during forecast inversions.",
    keyIdeas: [
      "Inversion: warm air over cold air — opposite of normal gradient.",
      "Traps surface pollutants; worsens smog and particulate concentrations.",
      "Types: radiation, subsidence, frontal; topography amplifies effects.",
      "Historical disasters: Donora (1948), London (1952) — drove clean-air laws.",
    ],
    commonMistakes: [
      "Assuming inversions cause pollution (they concentrate existing pollution).",
      "Treating them as rare — they're common in valleys and coastal basins.",
      "Forgetting they can last for days under persistent high pressure.",
    ],
  },
  "7.4": {
    id: "7.4",
    title: "Atmospheric CO₂ and Particulates",
    summary:
      "CO₂ is the dominant anthropogenic greenhouse gas (9.4). Particulates (PM) cause massive health impacts and have complex climate effects (mostly cooling).",
    lesson:
      "**Atmospheric CO₂**:\n- Pre-industrial concentration: ~280 ppm.\n- 2024: >420 ppm and rising ~2–3 ppm/yr.\n- Sources (anthropogenic): fossil fuel combustion (~75%), deforestation (~10%), cement (~4%), agriculture and land use (~10%).\n- Sinks (absorb excess): oceans (~25%), terrestrial biosphere (~30%); remainder stays in atmosphere (~45%).\n- Dominant cause of observed warming since 1950 (9.5).\n- Ocean absorption → acidification (9.7).\n\n**Keeling curve**: continuous measurements at Mauna Loa since 1958 show the clearest long-term trend in environmental science — rising sawtooth with annual NH-vegetation cycle.\n\n**Particulate matter (PM)**:\n- **Sources**:\n  - Combustion (coal, diesel, wood burning).\n  - Industrial processes (cement, mining).\n  - Construction and road dust.\n  - Agriculture (tilling, livestock).\n  - Wildfires.\n  - Natural: sea salt, volcanic ash, desert dust (Sahara, Gobi plumes travel thousands of km).\n  - **Secondary particles**: sulfate, nitrate, organic aerosols form in atmosphere from SO₂, NOₓ, VOCs.\n- **Size classes**:\n  - **PM₁₀** (≤10 μm): coarse. Deposit in upper airways.\n  - **PM₂.₅** (≤2.5 μm): fine. Reach alveoli.\n  - **Ultrafine (<0.1 μm)**: cross into bloodstream.\n\n**Health impacts**:\n- WHO: 4.2 million premature deaths/yr from outdoor air pollution (mostly PM₂.₅).\n- Increases cardiovascular disease, stroke, lung cancer, COPD, reduced lung development in children.\n- No safe threshold below which PM₂.₅ shows no harm.\n\n**Climate effects of particulates** (complex):\n- **Aerosols scatter sunlight → cooling** (direct effect).\n- **Brighten clouds → more reflective → cooling** (indirect effect). Net anthropogenic aerosol effect estimated at ~–1 W/m² (cooling), partly masking greenhouse warming.\n- **Black carbon (soot)**: absorbs sunlight → warming. Darkens snow/ice → accelerates melt. Second-largest anthropogenic warming agent after CO₂ on short timescales.\n- **Dust/volcanic aerosols** can cause short-term cooling (Pinatubo 1991 cooled Earth ~0.5 °C for ~2 years).\n\n**Policy tension**: cleaning up SO₂ (aerosols) reduces cooling effect → slightly accelerates warming. But the health benefits vastly outweigh climate trade-off.",
    keyIdeas: [
      "CO₂: 280 → 420+ ppm; ~75% from fossil fuels.",
      "Keeling curve is the canonical record of anthropogenic CO₂ rise.",
      "PM₂.₅ = leading cause of air-pollution deaths (~4 M/yr).",
      "Most aerosols cool the climate (partly masking greenhouse warming); black carbon warms.",
    ],
    commonMistakes: [
      "Treating CO₂ as a pollutant in the EPA criteria-pollutant sense (it's a greenhouse gas, regulated separately).",
      "Thinking particulates only impact lungs — cardiovascular effects are huge.",
      "Forgetting aerosols have mostly been cooling.",
    ],
  },
  "7.5": {
    id: "7.5",
    title: "Indoor Air Pollutants",
    summary:
      "Indoor air is often more polluted than outdoor. Sources: cooking fuels, tobacco smoke, radon, asbestos, VOCs, mold, dust mites. Global killer via household biomass.",
    lesson:
      "Humans spend ~90% of time indoors, where pollutant concentrations can exceed outdoor levels several-fold.\n\n**Major indoor pollutants**:\n\n- **Biomass smoke**: wood, dung, charcoal, coal for cooking/heating. Major source of PM₂.₅ and CO in low-income households. WHO: 3.2 million premature deaths/yr, mostly women and children. **Improved cookstoves** and **LPG transitions** are major global health interventions.\n- **Tobacco smoke**: primary or secondhand. Leading cause of indoor air mortality in higher-income settings. Hundreds of compounds including CO, formaldehyde, PM, carcinogens.\n- **Radon**: odorless radioactive gas from uranium decay in soil/rock. Seeps through basements and foundations. Leading cause of lung cancer in nonsmokers (~20,000 deaths/yr in US). Mitigation: sub-slab depressurization, sealing foundations.\n- **Asbestos**: fibrous mineral used in insulation, tiles before ~1980. Inhalation causes mesothelioma and asbestosis decades later. Banned in many countries; abatement tightly regulated.\n- **Volatile Organic Compounds (VOCs)**: paint, solvents, adhesives, new carpets/furniture (\"new building smell\"), cleaning products, air fresheners. Formaldehyde is a common one. Cause irritation, headaches; some carcinogenic (benzene, formaldehyde).\n- **Combustion byproducts**: CO, NO₂, PM from gas stoves, fireplaces, poorly vented heaters. CO is the silent killer — hundreds of deaths/yr in US.\n- **Mold / fungi**: thrive in damp areas. Allergic reactions, asthma exacerbation; some (*Stachybotrys*, black mold) produce mycotoxins.\n- **Dust mites, cockroach allergens, pet dander**: major asthma triggers.\n- **Pesticides**: from indoor applications or tracked in on shoes.\n- **Lead**: old paint (pre-1978 US housing) and dust. Developmental neurotoxin in children.\n\n**\"Sick building syndrome\"**: clusters of non-specific symptoms (headaches, fatigue) in workers in tight, poorly ventilated buildings. Mitigated by better ventilation, fewer off-gassing materials.\n\n**Reducing indoor air pollution**:\n- **Ventilation**: mechanical (HRV/ERV), operable windows.\n- **Source control**: low-VOC products, no-smoking policies, electric stoves, vented combustion appliances.\n- **Filtration**: HEPA filters for particulates; activated carbon for VOCs.\n- **Radon testing** and mitigation where elevated.\n- **Humidity control**: 30–50% to limit mold and dust mites.\n- **CO detectors** on every floor.\n\nIn aggregate, indoor air pollution rivals or exceeds outdoor pollution as a health burden globally — the cleaner fuels transition is as important as grid decarbonization for public health.",
    keyIdeas: [
      "Indoor air often dirtier than outdoor; we spend 90% of time indoors.",
      "Biomass cooking smoke kills ~3.2 M/yr globally.",
      "Radon: invisible, odorless; leading cause of lung cancer in nonsmokers.",
      "Mitigation: ventilation, source control, filtration, low-VOC materials.",
    ],
    commonMistakes: [
      "Assuming indoor air is cleaner than outdoor.",
      "Overlooking radon because it's invisible.",
      "Treating mold as purely aesthetic — health impacts are real.",
    ],
  },
  "7.6": {
    id: "7.6",
    title: "Reduction of Air Pollutants",
    summary:
      "Technologies (scrubbers, catalytic converters, electrostatic precipitators) + regulation (Clean Air Act, vehicle standards) + fuel switching + behavior cut emissions.",
    lesson:
      "Air pollution control combines **technology**, **regulation**, and **behavior/fuel choices**.\n\n**Power plants**:\n- **Electrostatic precipitators (ESPs)**: charge particles, collect them on oppositely charged plates. Remove 99%+ of PM.\n- **Fabric filters (baghouses)**: trap PM on porous fabric.\n- **Flue-gas desulfurization (scrubbers)**: spray flue gas with alkaline slurry (limestone) → captures SO₂ as calcium sulfate (gypsum). Removes 90%+ of SO₂.\n- **Selective catalytic reduction (SCR)**: adds NH₃ and uses catalyst to reduce NOₓ to N₂.\n- **Low-NOₓ burners**: control combustion temperatures to suppress NOₓ formation.\n- **Carbon capture (CCS)**: captures CO₂ from exhaust; stores underground. Still expensive, limited deployment.\n- **Mercury controls**: activated carbon injection.\n\n**Vehicles**:\n- **Catalytic converters** (required in US since 1975): Pt/Pd/Rh catalysts convert CO → CO₂, unburned HC → CO₂ + H₂O, NOₓ → N₂ + O₂. Require unleaded gasoline.\n- **Fuel injection** with O₂ sensors (replacing carburetors) — precise stoichiometric mixture.\n- **Particulate filters** on diesel.\n- **Reformulated gasolines** and ultra-low-sulfur diesel.\n- **Evaporative controls**: sealed fuel systems, vapor recovery.\n- **EVs and hybrids**: eliminate tailpipe emissions entirely (electric) or reduce them (hybrid).\n\n**Industry**:\n- Process redesign, cleaner feedstocks.\n- Leak detection and repair (LDAR) for VOCs.\n- Vapor recovery at refineries.\n\n**Regulatory framework (US)**:\n- **Clean Air Act** (1970, amended 1977, 1990).\n- **National Ambient Air Quality Standards (NAAQS)** for criteria pollutants.\n- **New Source Performance Standards** for new industrial sources.\n- **State Implementation Plans** address local conditions.\n- **Acid Rain Program** (1990 Amendments): cap-and-trade for SO₂ — cut emissions 40%+ far cheaper than predicted.\n- **Vehicle standards**: CAFE for fuel economy; Tier 2 and Tier 3 emission standards.\n- **Mercury and Air Toxics Standards (MATS)** for power plants.\n\n**International**:\n- **Montreal Protocol** (1987): phased out ozone-depleting CFCs — one of the most successful environmental treaties ever (9.2).\n- **Paris Agreement** (2015): national CO₂ commitments.\n- **UN Gothenburg Protocol**: regional caps on SO₂, NOₓ, VOCs.\n\n**Indoor-specific** (7.5): ventilation, CO detectors, radon mitigation, low-VOC materials, smoking bans.\n\n**Fuel switching**:\n- Coal → natural gas (cleaner burn, lower CO₂).\n- Gas → electricity (with clean grid).\n- Clean cookstoves replacing biomass.\n\n**Achievements**: US criteria pollutants down 70%+ since 1970 even as GDP tripled — proof that pollution control and growth can coexist.",
    keyIdeas: [
      "Power plants: ESPs, baghouses, scrubbers (SO₂), SCR (NOₓ), low-NOₓ burners.",
      "Vehicles: catalytic converters, fuel injection, particulate filters, EVs.",
      "Regulation (Clean Air Act, Acid Rain Program) is central to progress.",
      "Cap-and-trade for SO₂ cut emissions faster and cheaper than expected.",
    ],
    commonMistakes: [
      "Conflating different control technologies (scrubbers ≠ ESPs).",
      "Forgetting catalytic converters require unleaded gasoline.",
      "Assuming regulation stifles growth — evidence shows the opposite.",
    ],
  },
  "7.7": {
    id: "7.7",
    title: "Acid Rain",
    summary:
      "SO₂ and NOₓ emissions react in the atmosphere with water to form sulfuric and nitric acids, which fall as acid rain, damaging lakes, forests, and buildings.",
    lesson:
      "**Acid deposition** includes acid rain, acid snow, and dry deposition of acidic particles.\n\n**Formation** (simplified):\n- SO₂ + H₂O + oxidants → **H₂SO₄** (sulfuric acid).\n- NOₓ + H₂O + oxidants → **HNO₃** (nitric acid).\nBoth are strong acids. Normal rain is slightly acidic (pH ~5.6) due to dissolved CO₂; acid rain can be pH 4 or lower.\n\n**Sources**:\n- **SO₂**: coal-fired power plants, smelters, oil refineries.\n- **NOₓ**: high-T combustion — power plants and vehicles.\n\n**Transport**: emissions can travel hundreds of km before depositing. Midwestern US power-plant emissions acidified New England lakes; UK/German emissions damaged Scandinavian forests — a cross-border problem.\n\n**Effects**:\n- **Aquatic**: lakes in regions with low-buffering (granitic) bedrock acidify dramatically. Fish populations decline when pH drops below ~5. Adirondacks (NY), Sweden, Norway had thousands of lakes damaged.\n- **Forests**: soil acidification leaches calcium and magnesium (plant nutrients), mobilizes toxic aluminum, damages roots. High-elevation red spruce in Appalachians and central Europe's Black Forest dieback.\n- **Buildings and monuments**: dissolves marble and limestone (calcium carbonate + acid → dissolves). Weathered statues, corroded metal, stained surfaces.\n- **Human health**: direct exposure to acid rain isn't the primary concern; the SO₂ and PM precursors cause respiratory damage.\n\n**Responses**:\n- **US Acid Rain Program** (1990 Clean Air Act Amendments): cap-and-trade for SO₂ — introduced the first major cap-and-trade system. SO₂ emissions down ~80% since 1990 at a fraction of predicted cost. NOₓ controls via separate programs.\n- **Scrubbers** on coal plants; shift to lower-sulfur coals and natural gas.\n- **Catalytic converters** and SCR for NOₓ.\n- **Liming** acidified lakes and soils — temporary treatment.\n\n**Status**: North American and European acid rain have dramatically improved. Recovery of lake and forest ecosystems is underway but slow (decades). Remaining hotspot: East Asia, especially from Chinese and Indian coal, though both are installing scrubbers.",
    keyIdeas: [
      "SO₂ + NOₓ → H₂SO₄ + HNO₃ → acid rain (pH often <5).",
      "Sources: coal power (SO₂) + high-T combustion (NOₓ).",
      "Damages lakes (fish kills), forests (nutrient leaching), buildings.",
      "US Acid Rain Program cap-and-trade cut SO₂ ~80% cheaper than predicted.",
    ],
    commonMistakes: [
      "Saying all rain is neutral — normal rain is mildly acidic from CO₂.",
      "Assuming acid rain damages occur where emissions happen (they travel hundreds of km).",
      "Equating pH difference linearly — it's a log scale (pH 4 is 10× more acidic than pH 5).",
    ],
  },
  "7.8": {
    id: "7.8",
    title: "Noise Pollution",
    summary:
      "Excessive sound from traffic, industry, construction, aircraft, and oceans damages hearing, causes stress, and disrupts wildlife communication and navigation.",
    lesson:
      "**Noise pollution**: unwanted or harmful sound. Measured in **decibels (dB)** on a logarithmic scale — 10 dB increase = 10× sound intensity, perceived as ~2× loudness.\n\n**Common sources and levels** (approximate):\n- Quiet room: 30 dB.\n- Conversation: 60 dB.\n- City traffic: 70–85 dB.\n- Power mower: 90 dB.\n- Rock concert, chainsaw: 110 dB.\n- Jet engine at 30 m: 130 dB (painful).\n\n**Hearing damage thresholds**:\n- Prolonged exposure >85 dB: permanent hearing loss risk.\n- >120 dB: acute damage possible.\n- OSHA limit: 90 dB time-weighted average over 8-hour workday.\n\n**Human health impacts** (beyond hearing):\n- Stress, hypertension, cardiovascular disease from chronic exposure.\n- Sleep disturbance — reduced recovery, cognitive performance.\n- Impaired learning in children near airports/highways (documented effects on reading, memory).\n- Tinnitus.\n\n**Wildlife impacts**:\n- **Birds**: urban birds sing louder and at higher frequencies to compete with traffic noise; reproductive success declines.\n- **Bats**: echolocation disrupted by traffic/industrial noise.\n- **Marine mammals**: whales and dolphins use sound for communication, navigation, hunting. Shipping, sonar, seismic airgun surveys cause:\n  - Behavioral changes (avoidance, reduced feeding).\n  - Hearing damage.\n  - Beaching events linked to military sonar exercises.\n- **Fish**: reduced reproductive success near boat traffic.\n\n**Ocean noise pollution** has risen dramatically in recent decades — shipping alone has doubled ambient ocean noise every decade since 1950. Efforts include **quiet ship design**, slower speeds, routing around sensitive areas.\n\n**Mitigation**:\n- **Source reduction**: quieter engines, mufflers, electric vehicles (far quieter than combustion at low speeds).\n- **Path interruption**: highway sound walls, forest buffers, building insulation.\n- **Receiver protection**: earplugs, headphones, room acoustic design.\n- **Regulation**: noise ordinances, aircraft night-curfews, OSHA workplace rules, product labeling.\n- **Land-use planning**: separating residential areas from highways, airports, factories.\n\nNoise pollution often disproportionately affects lower-income communities (adjacent to highways, airports, industrial zones) — environmental justice dimension.",
    keyIdeas: [
      "dB is logarithmic; +10 dB = 10× intensity.",
      "Chronic exposure >85 dB causes hearing loss + cardiovascular effects.",
      "Ocean shipping noise disrupts whale communication and navigation.",
      "Mitigation: source reduction, barriers, insulation, regulation.",
    ],
    commonMistakes: [
      "Treating noise as a nuisance only (it has measurable health impacts).",
      "Assuming dB is a linear scale.",
      "Forgetting ocean noise pollution — it's massive and growing.",
    ],
  },

  // =========================================================================
  // UNIT 8 — AQUATIC AND TERRESTRIAL POLLUTION
  // =========================================================================
  "8.1": {
    id: "8.1",
    title: "Sources of Pollution",
    summary:
      "Point sources are identifiable and localized (factories, sewage pipes); nonpoint sources are diffuse (agricultural runoff, urban stormwater). Nonpoint is often harder to control.",
    lesson:
      "Pollution sources are classified by whether they can be traced to a single location.\n\n**Point sources**: discharge from a specific, identifiable location.\n- Industrial outfalls (factories, refineries).\n- Sewage treatment plant effluent.\n- Power plant thermal discharges.\n- Oil spills from a tanker or platform.\n- CAFO manure lagoons (sometimes treated as point sources).\n\nPoint sources are **easier to regulate** — can measure at the outfall, set permits (NPDES in the US), monitor compliance.\n\n**Nonpoint sources**: diffuse, spread across the landscape, hard to trace to a single point.\n- Agricultural runoff (fertilizer, pesticides, sediment, manure) from fields.\n- Urban stormwater (oil, salts, sediment, pet waste, heavy metals) from streets and lawns.\n- Atmospheric deposition (acid rain, mercury from power plants) onto watersheds.\n- Construction site erosion.\n- Leaking septic systems.\n- Lawn-care runoff (fertilizer, herbicides).\n\nNonpoint is often the **dominant water-pollution problem** in regions with well-regulated industry. The Chesapeake Bay dead zone and Gulf of Mexico dead zone (8.5) are driven mostly by nonpoint agricultural runoff.\n\n**Regulatory responses**:\n- **Clean Water Act (US, 1972)** regulates point sources via NPDES permits.\n- **Nonpoint source programs** rely on best-management practices (BMPs), cost-share incentives, land-use planning — less enforceable but improving.\n- **Total Maximum Daily Loads (TMDLs)** set pollutant budgets for impaired waterways; require watershed-wide action.\n- **Riparian buffer requirements**, **cover crop incentives**, **erosion control laws**.\n\n**Transboundary pollution**: effluent, runoff, and atmospheric deposition cross state and national borders — the Mississippi's contributions to the Gulf dead zone originate in 30+ states.\n\nFor any pollutant, understanding the source type guides mitigation: point sources get permits; nonpoint sources need land-use and practice changes across whole watersheds.",
    keyIdeas: [
      "Point source: identifiable location (pipe, smokestack). Easy to regulate.",
      "Nonpoint source: diffuse (runoff from farms/cities). Harder to regulate.",
      "Clean Water Act targets point sources via NPDES; nonpoint via programs and incentives.",
      "Nonpoint is often the dominant remaining water-quality problem.",
    ],
    commonMistakes: [
      "Classifying agricultural runoff as point source (usually nonpoint).",
      "Assuming nonpoint pollution is a smaller problem (often it's larger).",
      "Confusing Clean Air and Clean Water Acts.",
    ],
  },
  "8.2": {
    id: "8.2",
    title: "Human Impacts on Ecosystems",
    summary:
      "Human activities degrade ecosystems through habitat loss, pollution, overexploitation, invasive species, and climate change — the \"HIPPO\" framework.",
    lesson:
      "E.O. Wilson's **HIPPO** framework lists the major human drivers of biodiversity and ecosystem loss, in order of impact:\n\n1. **H — Habitat destruction/fragmentation** (biggest cause). Deforestation for agriculture, urbanization, road-building, mining. ~80% of Earth's land surface affected.\n2. **I — Invasive species** (9.8). Non-native species lacking natural controls outcompete, prey on, or spread diseases to natives.\n3. **P — Pollution** (Units 7-8). Pesticides, nutrient runoff, plastics, toxic metals, air pollution.\n4. **P — Population** (human) growth. Multiplies every other pressure — more people → more resource demand → more impact. But per-capita consumption also matters — an American causes much more impact than a subsistence farmer.\n5. **O — Overharvesting** (overfishing, overhunting, illegal wildlife trade). Specific species or groups can be wiped out even while habitat remains intact.\n\n**Specific ecosystem impacts**:\n- **Wetlands**: drained for agriculture (>50% lost globally since 1900).\n- **Forests**: Amazon, Congo, SE Asia rainforests under active deforestation; boreal forests under climate stress.\n- **Coral reefs**: bleaching from warming + acidification; fishing; pollution — could lose 70–90% by 2100 at current warming.\n- **Grasslands**: converted to cropland; much of Great Plains and African savannas.\n- **Rivers**: dammed, channelized, polluted — most major rivers are altered.\n- **Soils**: eroded, compacted, salinized, contaminated.\n\n**Cascading effects**: loss of keystone species (1.11), trophic cascades, collapse of ecosystem services (2.2).\n\n**Global assessments**:\n- **IPBES (2019)**: ~1 million species threatened with extinction (of ~8 million total); extinction rate 100–1000× pre-human background rate.\n- **Living Planet Index**: average vertebrate population down ~69% since 1970.\n\n**Responses** span Units 5-9: protected areas, restoration, sustainable use, policy, international agreements (CITES, CBD, Ramsar).",
    keyIdeas: [
      "HIPPO: Habitat loss, Invasives, Pollution, Population, Overharvesting.",
      "Habitat loss dominates; climate change is rising in importance.",
      "IPBES 2019: ~1 M species threatened; extinction rate 100–1000× natural.",
      "Responses need to attack all HIPPO pressures simultaneously.",
    ],
    commonMistakes: [
      "Ignoring interactions — climate change worsens habitat loss worsens species loss.",
      "Treating population growth as the sole driver (consumption per capita matters too).",
      "Overlooking invasive species as a major cause.",
    ],
  },
  "8.3": {
    id: "8.3",
    title: "Endocrine Disruptors",
    summary:
      "Endocrine disruptors mimic or block hormones at low doses. Sources: plastics (BPA, phthalates), pesticides (atrazine), pharmaceuticals, detergents — cause reproductive and developmental effects.",
    lesson:
      "**Endocrine disruptors** are chemicals that interfere with hormone systems — production, release, transport, binding, action, or breakdown of hormones. Because hormones act at very low concentrations, endocrine disruptors can have effects at doses far below conventional toxic thresholds.\n\n**Common endocrine disruptors**:\n- **Bisphenol A (BPA)**: plastics (polycarbonate, epoxy linings in cans). Mimics estrogen.\n- **Phthalates**: plasticizers in flexible PVC, cosmetics, fragrance.\n- **Atrazine**: herbicide; feminizes male frogs at trace doses.\n- **DDT/DDE** (legacy): estrogen mimics; linked to raptor eggshell thinning.\n- **PCBs**: industrial coolants (banned 1979); still in old buildings and sediments.\n- **Dioxins**: combustion byproducts, paper bleaching.\n- **Pharmaceuticals**: synthetic estrogens (birth control pills) in sewage; cause fish feminization downstream.\n- **Perfluorinated compounds (PFAS)**: non-stick, stain resistant, firefighting foams — \"forever chemicals.\"\n- **Flame retardants (PBDEs)**.\n\n**Classical toxicology assumes dose-response is monotonic** (more dose → more effect). Endocrine disruptors often have **non-monotonic** responses — effects at very low doses, perhaps absent at higher ones. This challenges traditional risk assessment.\n\n**Windows of susceptibility**: exposure during fetal and early life development can cause lasting effects — the endocrine system is establishing itself.\n\n**Observed effects**:\n- **Wildlife**: intersex fish downstream of sewage plants; alligator reproductive issues in Lake Apopka (FL) after a pesticide spill; feminized frogs from atrazine-contaminated water.\n- **Humans**: declining sperm counts (multiple studies), earlier puberty, reproductive cancers, altered sex ratios, obesity, metabolic disorders — all have endocrine-disruption components.\n\n**Regulation**:\n- **Toxic Substances Control Act (TSCA, reformed 2016)** in the US.\n- **EU REACH** regulation is stricter for endocrine disruptors.\n- BPA banned in baby bottles and sippy cups in many jurisdictions.\n- **Endocrine Disruption Screening Program (EPA)**: testing chemicals.\n\n**Avoidance**: BPA-free containers, filtered water, fewer fragranced products, less processed food, avoid PFAS-treated products. But many exposures are unavoidable given how widespread these chemicals are.",
    keyIdeas: [
      "Endocrine disruptors interfere with hormones at very low doses.",
      "Examples: BPA, phthalates, atrazine, PCBs, PFAS, pharmaceuticals.",
      "Non-monotonic dose-response challenges traditional risk assessment.",
      "Fetal/early-life exposures have outsized, lifelong effects.",
    ],
    commonMistakes: [
      "Assuming safe dose = below LD50 (hormone effects occur far below acute toxicity).",
      "Ignoring developmental windows where small doses matter most.",
      "Forgetting wildlife has shown clear effects (feminized frogs, intersex fish).",
    ],
  },
  "8.4": {
    id: "8.4",
    title: "Human Impacts on Wetlands and Mangroves",
    summary:
      "Wetlands and mangroves are among Earth's most valuable and most destroyed ecosystems. Drainage, fill, aquaculture, and pollution have removed half of global wetlands.",
    lesson:
      "**Wetlands** include marshes, swamps, bogs, fens, and prairie potholes. Defined by saturated soils + adapted vegetation. Cover ~6% of Earth's land surface.\n\n**Ecosystem services** (extremely high per unit area):\n- **Water filtration**: plants and microbes remove nitrogen, phosphorus, pesticides, sediment. Some wetlands remove >90% of incoming nitrogen.\n- **Flood control**: wetlands absorb storm surges and heavy rain — a \"sponge\" effect. Louisiana coastal wetlands reduce hurricane damage.\n- **Groundwater recharge**.\n- **Carbon storage**: peatlands and mangroves store vast amounts of carbon in soils. Tropical peat fires (Indonesia) release 2–3× as much CO₂ as Europe's entire annual emissions in bad years.\n- **Habitat**: disproportionate biodiversity for their area; critical for migratory birds, amphibians, many fish spawning.\n- **Fisheries support**: estuarine wetlands are nurseries for most commercial fish and shellfish.\n- **Cultural, recreational, educational value**.\n\n**Losses**: more than **50% of wetlands** worldwide have been lost since 1900, mostly to agriculture. US lost ~half of its original wetlands; Everglades drained for farmland and development; prairie potholes filled for wheat and corn.\n\n**Regulation**:\n- **Ramsar Convention (1971)**: international wetlands treaty.\n- **US Clean Water Act §404**: requires permits for dredging and fill. Often contested.\n- **\"No net loss\"** policy requires wetland mitigation — created wetlands to offset losses. Replacements rarely match the ecological function of originals.\n\n**Mangroves**: intertidal forests in tropical and subtropical coastlines.\n- Buffer storm surge — Indian Ocean tsunami damage was lower where mangroves remained.\n- Nurseries for reef fish, shrimp, crabs.\n- Sequester carbon at among the highest rates of any ecosystem (\"blue carbon\").\n- Support traditional coastal livelihoods.\n\n**Mangrove losses**:\n- Cleared for **shrimp farms** (5.16) — biggest single driver.\n- Coastal development, road-building.\n- Pollution and altered freshwater flow.\n\nAbout 35% of global mangroves lost since 1980, though rate has slowed with growing recognition of their value. Restoration projects in Vietnam, Philippines, Senegal are showing success.\n\n**Wetland restoration**: hydrology restored, invasive vegetation removed, native plants replanted. Recovery of ecosystem services can take decades but is proven.",
    keyIdeas: [
      "Wetlands: filter water, buffer floods, store carbon, provide habitat.",
      "~50% of global wetlands lost since 1900.",
      "Mangroves: buffer storms, nurseries, huge blue carbon — mostly lost to shrimp farms.",
      "Protection: Ramsar Convention, CWA §404, restoration projects.",
    ],
    commonMistakes: [
      "Treating wetlands as \"wasted land.\"",
      "Underestimating their carbon storage (peatlands + mangroves hold huge stores).",
      "Forgetting tropical peat fires are a major climate event.",
    ],
  },
  "8.5": {
    id: "8.5",
    title: "Eutrophication",
    summary:
      "Excess nutrients (mostly N and P) fuel algal blooms that, when they die and decompose, deplete dissolved oxygen and create dead zones.",
    lesson:
      "**Eutrophication** is nutrient enrichment of water bodies leading to excessive primary production, oxygen depletion, and ecosystem damage.\n\n**The causal chain**:\n1. **Nutrient inputs**: nitrogen (fertilizer runoff, sewage, manure, atmospheric NOₓ deposition) and phosphorus (fertilizer, detergents historically, sewage). P is often limiting in freshwater; N in marine.\n2. **Algal bloom**: rapid growth of phytoplankton fueled by excess nutrients. Harmful algal blooms (HABs) include toxin-producing cyanobacteria (blue-green algae) and *Karenia brevis* red tides.\n3. **Blocked light**: dense surface algae shade submerged aquatic vegetation (seagrasses, pondweeds), killing them.\n4. **Algae die, sink, decompose**. Decomposition consumes dissolved oxygen (DO).\n5. **Hypoxia** (DO < 2 mg/L) or **anoxia** (DO ≈ 0). Fish flee or die; many invertebrates die. **Dead zone** emerges.\n\n**Famous dead zones**:\n- **Gulf of Mexico** off Mississippi delta: one of the world's largest (avg ~15,000 km²); driven by fertilizer runoff across the corn belt.\n- **Chesapeake Bay**: improved but still stressed.\n- **Baltic Sea**: chronic hypoxia.\n- **Lake Erie**: recurring cyanobacteria blooms (Toledo water crisis 2014).\n\n**Cultural eutrophication** vs **natural eutrophication**: lakes naturally age over millennia; human inputs accelerate it by orders of magnitude.\n\n**Harmful algal blooms (HABs)**:\n- **Cyanotoxins** (microcystin): liver toxic; contaminate drinking water.\n- **Red tides**: *Karenia* releases brevetoxins → fish kills, respiratory irritation.\n- **Pfiesteria**: dinoflagellate linked to Chesapeake fish kills.\n\n**Climate change + eutrophication**: warmer water holds less O₂ and favors cyanobacteria → worsening HABs.\n\n**Reductions**:\n- **Phosphate-free detergents** (banned 1970s-80s): cut P loads substantially.\n- **Sewage treatment** with N and P removal.\n- **Nutrient management plans** on farms (4R stewardship: right source, right rate, right time, right place).\n- **Riparian buffers**: vegetated strips along streams.\n- **Cover crops** to retain nutrients over winter.\n- **Wetland restoration** to filter runoff.\n- **Manure management**: digesters, better storage.\n- **Reducing meat consumption**: most corn/soy goes to livestock; less demand = less fertilizer.\n\n**Policy**: Chesapeake Bay has a binding TMDL; Gulf states have voluntary plans. Progress is slow because nonpoint sources (8.1) are hard to regulate.",
    keyIdeas: [
      "Nutrient enrichment → algal bloom → decomposition → oxygen depletion → dead zone.",
      "N and P are the main nutrients; fertilizer runoff is the dominant cause.",
      "Major dead zones: Gulf of Mexico, Chesapeake, Baltic, Lake Erie.",
      "HABs include toxic cyanobacteria; climate change worsens them.",
    ],
    commonMistakes: [
      "Assuming algae themselves cause the oxygen drop (it's the decomposition).",
      "Overlooking cyanotoxins as a human-health issue.",
      "Missing that nonpoint agricultural sources dominate in many watersheds.",
    ],
  },
  "8.6": {
    id: "8.6",
    title: "Thermal Pollution",
    summary:
      "Warm water discharges from power plants and urban runoff reduce dissolved oxygen and stress aquatic species adapted to cooler conditions.",
    lesson:
      "**Thermal pollution**: addition of warm water to aquatic systems that alters temperature enough to harm organisms.\n\n**Sources**:\n- **Power plants**: fossil and nuclear plants draw huge volumes of cooling water, return it warmer (by several °C). A 1000 MW plant might discharge enough heated water to warm a river noticeably for miles.\n- **Industrial cooling**.\n- **Urban stormwater**: runoff from hot asphalt and rooftops is much warmer than natural streams.\n- **Deforestation along streams**: loss of riparian shade warms water.\n- **Dam releases**: when releases come from warm surface water in summer, or conversely from cold deep water (cold pollution) disrupting downstream ecology.\n\n**Why temperature matters**:\n- **Dissolved oxygen (DO)** decreases as water warms (gas solubility falls). Fish kills in summer are partly DO-driven.\n- **Metabolism and oxygen demand rise** with temperature — aquatic animals need more O₂ precisely when less is available.\n- **Species tolerance ranges (2.4)**: cold-water species (trout, salmon) die as waters exceed their thermal limits.\n- **Disease susceptibility** rises with heat stress.\n- **Spawning cues** disrupted — temperature triggers many fish spawning events.\n- **Phenology mismatch**: timing of plankton blooms, insect emergence, migrations all temperature-cued.\n\n**Cold pollution**: large dams that release water from reservoir depths produce colder-than-normal water downstream, which can eliminate warm-water species.\n\n**Mitigation**:\n- **Cooling towers**: evaporate water to release heat before return, or use air cooling.\n- **Cooling ponds**: retention basins for heat dissipation.\n- **Once-through cooling restrictions**: EPA rules (Clean Water Act §316) now limit once-through cooling.\n- **Closed-cycle cooling**: recirculates water; small intake, small discharge.\n- **Riparian restoration**: replant trees along streams for shade.\n- **Green infrastructure (5.13)**: permeable pavement, bioswales — reduce hot runoff.\n- **Detention basins**: let hot runoff cool before release.\n\n**Future challenge**: climate change itself is warming waters — thermal pollution compounds the problem. Many power plants are also seeing reduced cooling water availability during summer heat waves.",
    keyIdeas: [
      "Warm-water discharge lowers DO and stresses aquatic life.",
      "Main sources: power plant cooling water + urban stormwater + riparian deforestation.",
      "Species with narrow thermal tolerance (trout, salmon) hit first.",
      "Mitigation: cooling towers, closed-cycle systems, riparian shade, green stormwater.",
    ],
    commonMistakes: [
      "Confusing thermal pollution with chemical pollution.",
      "Missing that solubility of O₂ drops as water warms.",
      "Overlooking urban stormwater as a thermal source.",
    ],
  },
  "8.7": {
    id: "8.7",
    title: "Persistent Organic Pollutants (POPs)",
    summary:
      "POPs resist breakdown, bioaccumulate, biomagnify up food chains, and travel globally. Examples: DDT, PCBs, dioxins, PFAS.",
    lesson:
      "**Persistent organic pollutants (POPs)** are organic (carbon-based) compounds with four key properties:\n\n1. **Persistence**: resist environmental breakdown; half-lives of years to decades.\n2. **Bioaccumulation**: lipophilic (fat-soluble) → accumulate in fatty tissues of organisms.\n3. **Biomagnification**: concentrations increase up food chains (8.8).\n4. **Long-range transport**: travel atmospherically and by ocean currents worldwide — found in Arctic wildlife thousands of km from source.\n\n**Major POPs**:\n- **DDT**: insecticide; widely used 1940s–70s. Thinned raptor eggshells (Rachel Carson, *Silent Spring*). Banned in most countries.\n- **PCBs**: industrial dielectric fluids, coolants. Banned 1979; still leaching from old transformers and sediments.\n- **Dioxins and furans**: combustion byproducts (waste incineration, forest fires), some industrial processes. Extremely toxic at trace levels.\n- **Chlordane, aldrin, dieldrin, heptachlor**: legacy pesticides, banned.\n- **Hexachlorobenzene, HCB**: fungicide, industrial byproduct.\n- **Polybrominated diphenyl ethers (PBDEs)**: flame retardants.\n- **Perfluorinated compounds (PFAS, \"forever chemicals\")**: non-stick coatings, waterproofing, firefighting foams. Now found in blood of nearly all humans worldwide.\n\n**Effects** (varies by compound):\n- **Cancer**: many POPs are carcinogens.\n- **Endocrine disruption** (8.3).\n- **Reproductive and developmental harm**.\n- **Immune suppression**.\n- **Neurotoxicity**.\n\n**Global distribution**: POPs volatilize in warm regions, transport toward poles, condense in cold. **Arctic bioaccumulation** is severe — Inuit populations and polar bears have among the highest body burdens of POPs despite no local industrial sources. This \"grasshopper effect\" or \"global distillation\" is a defining feature.\n\n**Stockholm Convention (2001)**: international treaty to eliminate or restrict POPs. Started with \"dirty dozen\" (DDT, PCBs, aldrin, chlordane, etc.); expanded to cover PBDEs, PFAS, HBCD, others.\n\n**Current challenges**: legacy contamination in sediments, soils, and food webs persists for decades after bans. New POPs continue to be identified and added. PFAS remediation is especially difficult because they don't degrade — requires incineration or advanced oxidation.",
    keyIdeas: [
      "POPs: persistent, bioaccumulative, biomagnify, long-range transported.",
      "Examples: DDT, PCBs, dioxins, chlordane, PBDEs, PFAS.",
      "Stockholm Convention coordinates global phase-out.",
      "Arctic bioaccumulation (global distillation) affects populations far from sources.",
    ],
    commonMistakes: [
      "Assuming banned POPs are gone — they persist in sediments for decades.",
      "Confusing persistence (time) with bioaccumulation (concentration in organisms).",
      "Treating PFAS as short-lived — they're literally called forever chemicals.",
    ],
  },
  "8.8": {
    id: "8.8",
    title: "Bioaccumulation and Biomagnification",
    summary:
      "Bioaccumulation = buildup of a toxin in an individual organism over time. Biomagnification = increasing concentration up a food chain.",
    lesson:
      "Two related but distinct processes by which persistent toxins reach harmful levels.\n\n**Bioaccumulation**: within a single organism, intake exceeds excretion. Fat-soluble toxins accumulate in fatty tissues. A fish continuously consuming contaminated plankton slowly accumulates those contaminants in its muscles and fat.\n\n**Biomagnification**: each step up the food chain concentrates the toxin. Because energy transfer is ~10% (1.10), organisms at higher trophic levels eat many prey over their lifetimes. Bioaccumulating toxins from all those prey are retained, not excreted.\n\nTypical magnification factor: 10–100× per trophic level for some POPs. A 4-level food chain might concentrate a toxin **10,000×** from water to top predator.\n\n**Classic example — DDT and bald eagles**:\n- DDT in water: 0.000003 ppm.\n- Plankton: 0.04 ppm.\n- Small fish: 0.5 ppm.\n- Large fish: 2 ppm.\n- Fish-eating birds: 25+ ppm.\nResult: thinned eggshells → reproductive failure → near-extinction of bald eagle, peregrine falcon, brown pelican before DDT was banned (1972) and populations recovered.\n\n**Mercury**:\n- Released by coal combustion, gold mining, some industrial processes.\n- Methylated by bacteria in water/sediments → **methylmercury**, a potent neurotoxin.\n- Biomagnifies in aquatic food chains.\n- **Top predator fish** (tuna, swordfish, shark, king mackerel) have the highest levels — FDA advises pregnant women to limit consumption.\n- Minamata disease (Japan, 1950s-60s): industrial mercury poisoning caused severe birth defects and deaths.\n\n**Other biomagnifying substances**:\n- POPs (8.7): PCBs, dioxins, PBDEs.\n- Mercury, lead, cadmium.\n\n**Implications**:\n- **Apex predators** at greatest risk — and humans who eat seafood at top of chain.\n- **Subsistence communities** (Arctic Inuit, fishing villages) disproportionately exposed.\n- **Pregnant women and children** most sensitive (neurodevelopment).\n- **Ecosystem-wide effects**: loss of top predators cascades.\n\n**Mitigation**: eliminate persistent toxins at source. Current strategies: Mercury — Minamata Convention (2013), reducing coal emissions. POPs — Stockholm Convention. Advisory systems warn consumers which fish to avoid.",
    keyIdeas: [
      "Bioaccumulation: buildup in individual; biomagnification: buildup up food chain.",
      "Top predators bear the highest concentrations — eagles, tuna, polar bears, humans.",
      "Classic cases: DDT → eagles; mercury → tuna/swordfish, Minamata Bay.",
      "Prevention requires source reduction — remediation is expensive and slow.",
    ],
    workedExample: {
      prompt:
        "A toxin present at 0.001 ppm in water magnifies 10× at each of 4 trophic levels. What is the concentration in the top predator?",
      solution:
        "Top level = 0.001 × 10⁴ = 10 ppm. A 10,000-fold concentration from water to apex predator.",
    },
    commonMistakes: [
      "Using the terms interchangeably — they're related but distinct.",
      "Forgetting methylation converts inorganic mercury to biomagnifying methylmercury.",
      "Treating DDT ban as a purely environmental decision (it also protected human health).",
    ],
  },
  "8.9": {
    id: "8.9",
    title: "Solid Waste Disposal",
    summary:
      "Landfills, incinerators, recycling, composting, and the ocean (illegal) are primary solid-waste fates. Sanitary landfills require liners, leachate collection, and methane management.",
    lesson:
      "Global municipal solid waste (MSW) generation: ~2 billion tonnes/yr, projected ~3.4 billion by 2050. Per-capita generation is highest in wealthy countries.\n\n**MSW composition** (typical developed country):\n- Food/organic: ~30%.\n- Paper: ~20%.\n- Plastics: ~12%.\n- Yard waste: ~12%.\n- Metals, glass, rubber, textiles, wood: remainder.\n\n**Disposal methods**:\n\n**Sanitary landfills**: engineered to isolate waste from environment.\n- **Clay + synthetic (HDPE) liners** prevent leachate migration into groundwater.\n- **Leachate collection** at the base → treated as wastewater.\n- **Methane capture**: anaerobic decomposition of organics → methane. Modern landfills capture it for electricity or flaring. Uncaptured, methane is a potent greenhouse gas (9.4).\n- **Daily cover** (soil) reduces odors, pests, litter.\n- **Final cap and monitoring** for decades after closure.\n\n**Problems with landfills**:\n- Land consumption.\n- Groundwater contamination (especially older unlined dumps).\n- Methane emissions (3% of US GHG emissions from landfills).\n- **Environmental justice**: landfills disproportionately sited near lower-income communities.\n- NIMBY resistance to new sites.\n- **Plastic persistence**: plastics barely degrade; \"landfill-archaeology\" shows newspapers legible decades later.\n\n**Open dumps**: common in developing countries. No liners, no leachate control, frequent fires, scavenging by waste pickers — significant health and environmental harms.\n\n**Incineration / waste-to-energy (WTE)**:\n- Burns waste, generating heat/electricity.\n- Reduces volume by ~90%, mass by ~75%.\n- Ash still requires landfill.\n- Air emissions: particulates, CO₂, dioxins (if temperatures are high and consistent, dioxins are largely destroyed).\n- Modern plants with filters/scrubbers/precipitators are relatively clean; older plants can be major polluters.\n- Common in Europe, Japan (space-constrained). Controversial — critics argue they disincentivize reduction and recycling.\n\n**Ocean dumping**: banned by international law (London Convention) but still occurs illegally. Plastic in oceans (8.9 continued) is a major and growing problem — 8 million tonnes/yr enter oceans.\n\n**Hazardous waste**: separate stream (radioactive, industrial chemical, medical, pesticide). Regulated under RCRA and CERCLA (Superfund) in US.\n\n**E-waste**: fastest-growing stream. Heavy metals + precious metals. Often shipped to developing countries for informal dismantling — severe health impacts on workers.\n\n**Better approaches** (see 8.10): reduce, reuse, recycle, compost.",
    keyIdeas: [
      "Sanitary landfills: liners, leachate collection, methane capture.",
      "Incineration reduces volume 90% but produces air emissions and ash.",
      "Open dumps (developing countries) have no environmental controls.",
      "E-waste and plastics are fast-growing problem streams.",
    ],
    commonMistakes: [
      "Thinking modern landfills contaminate aquifers freely (engineered ones don't, barring failures).",
      "Confusing municipal with hazardous waste (separate regulatory streams).",
      "Assuming incineration is clean (depends heavily on pollution controls).",
    ],
  },
  "8.10": {
    id: "8.10",
    title: "Waste Reduction Methods",
    summary:
      "Waste management hierarchy (from best to worst): reduce → reuse → recycle → compost → waste-to-energy → landfill.",
    lesson:
      "The **waste management hierarchy** (EPA, UN) ranks strategies by environmental preference:\n\n1. **Source reduction (prevention)** — don't produce the waste in the first place. Lightweight packaging, durable products, digital instead of paper, buying less. Highest impact.\n2. **Reuse** — repair, refill, repurpose. Glass bottle deposit systems; reusable bags; thrift stores; repair cafés.\n3. **Recycling** — reprocess materials into new products. Aluminum, paper, cardboard, glass, many plastics, metals, electronics.\n4. **Composting** — biological decomposition of organics into soil amendment. Food, yard waste, paper.\n5. **Energy recovery (WTE)** — combustion or anaerobic digestion for energy.\n6. **Treatment and disposal** — landfilling (last resort).\n\n**Recycling**:\n- **Aluminum**: ~95% less energy than primary production; highly economical; closed-loop recyclable indefinitely. Can be recycled from can to new can in ~60 days.\n- **Paper**: fibers shorten each recycling cycle; ~5–7 cycles before disposal. Still saves energy and trees.\n- **Glass**: infinitely recyclable; high energy savings.\n- **Plastics**: varies enormously by resin:\n  - **PET** (#1, bottles): recyclable, common.\n  - **HDPE** (#2): recyclable.\n  - **#3–7**: often not economically recyclable.\n  - Global plastic recycling rate is only ~9%.\n- **Metals** (steel, copper): recycled extensively.\n- **E-waste**: valuable metals (gold, silver, copper, rare earths) recoverable but often shipped to poor recycling facilities overseas.\n\n**Challenges in recycling**:\n- **Contamination**: one bad item can spoil a batch.\n- **Market volatility**: recycled materials compete with virgin commodities.\n- **China's \"National Sword\" (2018)**: refused contaminated imports; US/EU recycling systems scrambled.\n- **Single-stream recycling** has high contamination rates; dual-stream is cleaner.\n- **\"Wishcycling\"**: tossing non-recyclables in the bin hoping they'll be recycled — causes contamination.\n\n**Composting**:\n- Home composting: yard + food waste.\n- Municipal composting: large-scale diversion of organics from landfills (Seattle, San Francisco).\n- Diverts the largest single waste stream (food + yard); reduces landfill methane.\n- Benefits: soil amendment, carbon sequestration, reduced fertilizer use.\n\n**Extended Producer Responsibility (EPR)**: shifts responsibility for end-of-life disposal to manufacturers. Common in Europe for electronics, packaging — incentivizes design for recyclability.\n\n**Circular economy**: systemic design that minimizes virgin-resource extraction and waste — products designed for disassembly, repair, reuse, and recycling from the start.\n\n**Behavior and policy**: bottle bills, plastic bag bans, pay-as-you-throw pricing, single-use plastic restrictions (EU 2021), deposit-return schemes — all shift incentives toward reduction.",
    keyIdeas: [
      "Hierarchy: reduce → reuse → recycle → compost → energy → landfill.",
      "Aluminum and glass recycle indefinitely with huge energy savings; plastics limited.",
      "Composting diverts the largest stream (organics) and reduces landfill methane.",
      "EPR and circular-economy design shift incentives to manufacturers.",
    ],
    commonMistakes: [
      "Treating recycling as the top priority (reduction and reuse are higher).",
      "Assuming all plastics are recyclable (only some resin codes are, reliably).",
      "\"Wishcycling\" — tossing dubious items in recycling increases contamination.",
    ],
  },
  "8.11": {
    id: "8.11",
    title: "Sewage Treatment",
    summary:
      "Municipal sewage treatment has primary (physical), secondary (biological), tertiary (chemical/advanced) stages — reducing BOD, pathogens, nutrients before discharge.",
    lesson:
      "**Sewage** (domestic wastewater) contains: water, human waste, detergents, food scraps, pharmaceuticals, microplastics, industrial effluents. Treatment protects public health (waterborne diseases) and ecosystem health (oxygen demand, nutrients).\n\n**Stages of conventional treatment**:\n\n**Preliminary**: bar screens (remove rags, trash), grit chambers (remove sand, gravel).\n\n**Primary (physical)**:\n- Sedimentation tank → solids settle as **primary sludge**; grease/oil floats, skimmed off.\n- Removes ~30–40% of suspended solids and BOD.\n\n**Secondary (biological)**:\n- Microbes consume dissolved organic matter, converting it to CO₂ + biomass + water.\n- **Activated sludge**: aerated tanks with microbial flocs; biomass settles in secondary clarifiers; sludge partly recycled.\n- **Trickling filters**: sewage sprayed over rock/plastic media with biofilm.\n- Removes ~85–95% of BOD and suspended solids.\n- Generates **secondary sludge** (biomass).\n\n**Tertiary (advanced)**:\n- **Nutrient removal**: nitrification (NH₄⁺ → NO₃⁻) + denitrification (NO₃⁻ → N₂); P removed biologically or chemically (alum precipitation).\n- **Sand filtration** for remaining solids.\n- **Activated carbon** for trace organics.\n- **Disinfection**: chlorination, UV, or ozone — kills pathogens before discharge.\n\n**Effluent**: meets NPDES permit limits; discharged to streams, rivers, or oceans.\n\n**Sludge (biosolids) treatment**:\n- **Anaerobic digestion**: microbes break down sludge, producing **methane** used for plant energy.\n- **Dewatering**.\n- **Disposal**: land application as fertilizer (if contaminants low), incineration, landfill.\n- **Heavy-metal and pharmaceutical** contamination limits land-application.\n\n**Emerging concerns**:\n- **Pharmaceuticals and personal-care products** pass through most plants → hormones, antidepressants, antibiotics in downstream waters.\n- **Microplastics** pass through many plants.\n- **Combined Sewer Overflows (CSOs)**: in older cities, heavy rain overwhelms combined sewers → untreated sewage discharged. NYC, Philadelphia, many Great Lakes cities.\n\n**Decentralized systems**:\n- **Septic tanks**: onsite; solids settle, liquids drain through soil absorption fields (leach field). Rural/suburban.\n- **Constructed wetlands**: engineered wetlands treat effluent using natural biological processes.\n\n**Global context**: ~2.3 billion people lack basic sanitation; untreated sewage is the largest source of waterborne disease. Improving sewage infrastructure is among the highest-impact public health interventions globally.",
    keyIdeas: [
      "Treatment stages: preliminary → primary (settle) → secondary (microbial) → tertiary (nutrient/polish) → disinfection.",
      "Primary removes ~30% BOD; secondary ~90%; tertiary handles nutrients + trace contaminants.",
      "Anaerobic digestion of sludge yields biogas.",
      "CSOs, pharmaceuticals, and microplastics are persistent challenges.",
    ],
    commonMistakes: [
      "Thinking secondary treatment handles nutrients (usually needs tertiary).",
      "Assuming all sewage is treated (combined sewer overflows during storms aren't).",
      "Forgetting pharmaceuticals largely pass through conventional plants.",
    ],
  },
  "8.12": {
    id: "8.12",
    title: "Lethal Dose 50% (LD50)",
    summary:
      "LD50 is the dose that kills 50% of a test population. Standardized comparison of acute toxicity — lower LD50 = more toxic.",
    lesson:
      "**LD50 (median lethal dose)**: the dose of a substance that kills 50% of a test population (usually rats or mice) in a specified time (typically 14 days). Units: **mg/kg body weight** (sometimes μg/kg).\n\nLower LD50 → more toxic. Botulinum toxin's LD50 (~1 ng/kg) is millions of times lower than table salt's (~3000 mg/kg).\n\n**Related measures**:\n- **LC50**: median lethal concentration — used for inhalation or aquatic exposure (air: mg/L or ppm; water: μg/L).\n- **ED50**: median effective dose — threshold for a non-lethal effect.\n- **TD50**: median toxic dose — threshold for a defined toxic effect.\n- **NOAEL**: no observed adverse effect level.\n- **LOAEL**: lowest observed adverse effect level.\n\n**Acute vs chronic**: LD50 measures **acute** toxicity (single or short-term exposure). Chronic toxicity (long-term low-dose effects — carcinogenesis, endocrine disruption, developmental harm) isn't captured and often matters more.\n\n**Uses**:\n- Classify chemicals for labeling and shipping.\n- Derive safe exposure limits (typically divide LD50 by uncertainty factors of 10–1000 to get human reference doses).\n- Compare relative toxicity of substances.\n\n**Limitations**:\n- Acute-only (misses chronic effects).\n- Species-specific (rat LD50 ≠ human LD50).\n- Route-dependent (oral vs dermal vs inhalation differ).\n- Ignores **non-monotonic** dose-response of endocrine disruptors (8.3).\n- **Ethical concerns** about animal testing; alternatives (cell culture, computational toxicology) increasingly used.\n\n**Interpreting labels**:\n- Extremely toxic: LD50 < 1 mg/kg.\n- Highly toxic: 1–50 mg/kg.\n- Moderately toxic: 50–500 mg/kg.\n- Slightly toxic: 500–5000 mg/kg.\n- Practically non-toxic: > 5000 mg/kg.\n\n**Examples** (oral rat LD50):\n- Botulinum toxin: ~1 ng/kg.\n- Dioxin: ~20 μg/kg.\n- Nicotine: ~50 mg/kg.\n- Caffeine: ~190 mg/kg.\n- Aspirin: ~200 mg/kg.\n- Ethanol: ~7,000 mg/kg.\n- Table salt: ~3,000 mg/kg.\n\nHigh LD50 doesn't mean the substance is safe at any dose — it just means acute lethal dose is high. Chronic exposure at lower levels may still cause cancer, endocrine disruption, etc.",
    keyIdeas: [
      "LD50 = dose that kills 50% of test animals; mg/kg body weight.",
      "Lower LD50 = more acutely toxic.",
      "Acute measure only; doesn't capture chronic or low-dose effects.",
      "Safe human doses usually derived by applying 10–1000× uncertainty factors.",
    ],
    commonMistakes: [
      "Treating LD50 as the safe dose (it's a lethal threshold).",
      "Assuming higher LD50 means totally safe — chronic effects may persist.",
      "Ignoring species and route-of-exposure differences.",
    ],
  },
  "8.13": {
    id: "8.13",
    title: "Dose Response Curve",
    summary:
      "Plots biological response against dose. Sigmoid shape with threshold; LD50 is the midpoint. Non-monotonic curves occur for endocrine disruptors.",
    lesson:
      "A **dose-response curve** shows how biological effect increases with dose of a substance. Typical form: a sigmoid (S-curve).\n\n**Key features**:\n- **Threshold**: dose below which no effect is observed (NOAEL). Not all toxins show a threshold — some carcinogens may be harmful at any nonzero dose (linear no-threshold model).\n- **LOAEL**: lowest dose where effect is observed.\n- **LD50 / ED50**: dose at 50% response.\n- **Maximum (plateau)**: 100% response — adding more dose doesn't change response.\n\n**Horizontal axis**: often plotted on a **logarithmic scale** because responses span many orders of magnitude.\n\n**Types of curves**:\n- **Monotonic**: response monotonically increases with dose (classical assumption). Threshold + sigmoid.\n- **Non-monotonic**: effects appear at low doses, disappear at mid doses, reappear at high doses. Characteristic of **endocrine disruptors (8.3)** — hormones naturally have U-shaped or inverted-U responses.\n- **Hormesis**: low doses beneficial, high doses harmful (debated; example: some radiation studies).\n\n**Factors affecting response**:\n- **Species** (rats ≠ humans).\n- **Age** (fetuses, children, elderly often more sensitive).\n- **Sex**.\n- **Weight and body composition** (fat-soluble toxins distribute differently).\n- **Genetic variation** (fast/slow metabolizers).\n- **Exposure route** (oral, inhalation, dermal, injection).\n- **Frequency** (acute single dose vs chronic repeated exposure).\n- **Interactions with other substances** (e.g., alcohol + Tylenol, smoking + asbestos).\n\n**Safety factors**: regulatory agencies derive human reference doses by dividing NOAEL or LOAEL by **uncertainty factors** (typically 10 for interspecies, 10 for human variability, additional factors for severity or chronic exposure) — often a combined 100–1000× reduction.\n\n**Epidemiological dose-response**: human studies relate exposure (air pollution, mercury in diet) to outcomes (cancer rates, IQ). Often no clear threshold observed — harmful effects extend down to very low doses.\n\n**Practical takeaway**: dose response is foundational to toxicology and environmental policy. But the low-dose region — most relevant for real-world exposures — is often poorly characterized, especially for endocrine disruptors and carcinogens.",
    keyIdeas: [
      "Dose-response: sigmoid curve with threshold (NOAEL), LD50 at midpoint.",
      "Endocrine disruptors often show non-monotonic curves — low doses harmful.",
      "Safety factors of 10–1000× applied to NOAEL for human reference doses.",
      "Fetus, children, elderly often more sensitive than average adults.",
    ],
    commonMistakes: [
      "Assuming below threshold = zero risk (not always true).",
      "Ignoring non-monotonic responses for endocrine disruptors.",
      "Extrapolating animal data directly to humans without uncertainty factors.",
    ],
  },
  "8.14": {
    id: "8.14",
    title: "Pollution and Human Health",
    summary:
      "Air, water, and chemical pollution cause acute and chronic disease: respiratory, cardiovascular, cancer, reproductive, neurodevelopmental. Burden falls disproportionately on disadvantaged communities.",
    lesson:
      "Environmental pollution is a leading cause of global disease and premature death — Lancet estimated ~9 million pollution-related premature deaths/yr (2019), more than from any individual disease category.\n\n**By pathway**:\n\n**Air pollution** (Unit 7): ~6–7 million premature deaths/yr.\n- **Outdoor**: PM₂.₅ → cardiovascular disease, lung cancer, stroke, COPD.\n- **Indoor** (biomass cooking, 7.5): ~3 million deaths/yr.\n- **Ground-level ozone**: asthma, reduced lung function.\n- **Lead**: neurodevelopmental harm; blood lead levels fell dramatically after leaded gas phase-out.\n\n**Water pollution**:\n- **Waterborne diseases** (cholera, typhoid, rotavirus): biggest killer in areas without sewage treatment.\n- **Nitrate in drinking water**: methemoglobinemia (\"blue baby syndrome\") from well water near fertilized fields.\n- **Lead pipes** (Flint, MI, 2014): lead exposure in children.\n- **PFAS**: contaminated drinking water in thousands of US communities.\n- **Arsenic**: natural and anthropogenic; Bangladesh well water crisis poisoned millions.\n- **Mercury in fish** (8.8): neurodevelopmental harm.\n- **Pathogens** in recreational water: E. coli, *Cryptosporidium*.\n\n**Soil and food contamination**:\n- **Lead in old paint/soil** in urban environments: children playing in yards near roads and old houses.\n- **Pesticide residues** on food.\n- **Heavy metals** in fish and rice from polluted waters.\n\n**Chemical exposures**:\n- **Endocrine disruptors** (8.3): reproductive and developmental effects.\n- **Carcinogens**: benzene, formaldehyde, dioxins, radon.\n- **Neurotoxicants**: lead, mercury, organophosphates.\n\n**Specific diseases linked to pollution**:\n- Asthma, COPD, lung cancer.\n- Heart attacks, stroke.\n- Bladder, breast, liver cancers.\n- Birth defects.\n- IQ loss from lead.\n- Autism and ADHD (suspected contributions).\n- Parkinson's disease (pesticide links).\n- Antibiotic resistance (CAFO and medical overuse).\n\n**Environmental justice**:\n- Pollution exposure is **not** random — lower-income and minority communities live closer to highways, refineries, waste sites, and lack access to clean water at higher rates.\n- **Environmental racism**: documented pattern in US waste-site siting, refinery locations, drinking water quality.\n- **EJ movement** and **Executive Order 12898** (1994) attempt to address disparities.\n- Flint water crisis, \"Cancer Alley\" (Louisiana petrochemical corridor), lead paint in urban housing — prominent cases.\n\n**Children's vulnerability**:\n- Higher breathing rate per body weight.\n- Developing nervous and endocrine systems.\n- More hand-to-mouth contact.\n- Longer future exposure horizon.\nSo environmental standards often explicitly consider child protection.",
    keyIdeas: [
      "Pollution causes ~9 M premature deaths/yr globally (Lancet 2019).",
      "Air pollution (mostly PM₂.₅) is the largest category.",
      "Environmental-justice issue: disadvantaged communities bear disproportionate burden.",
      "Children more vulnerable due to physiology + behavior + developmental stage.",
    ],
    commonMistakes: [
      "Assuming regulation has solved the problem — 9 M/yr still die.",
      "Overlooking indoor air and drinking water for outdoor air only.",
      "Ignoring environmental justice dimension.",
    ],
  },
  "8.15": {
    id: "8.15",
    title: "Pathogens and Infectious Diseases",
    summary:
      "Infectious diseases respond to environmental change. Drivers: climate shifts, land use, water/sanitation, antibiotic overuse, globalization, biodiversity loss.",
    lesson:
      "Infectious disease remains a major global killer — environmental factors shape transmission, outbreak frequency, and geographic spread.\n\n**Categories**:\n- **Bacterial**: cholera (*Vibrio cholerae*), TB, *E. coli*, Lyme (*Borrelia*).\n- **Viral**: influenza, dengue, Zika, West Nile, HIV, COVID-19.\n- **Parasitic**: malaria (*Plasmodium*), schistosomiasis, Chagas, trypanosomiasis.\n- **Fungal**: Valley fever (coccidioidomycosis), chytrid fungus (amphibian declines).\n\n**Transmission routes**:\n- **Waterborne**: contaminated water (cholera, typhoid). Major cause of child deaths globally; improving sanitation is the key intervention.\n- **Vector-borne**: mosquitoes (malaria, dengue, Zika, West Nile), ticks (Lyme), fleas (plague).\n- **Airborne/droplet**: influenza, TB, COVID-19.\n- **Direct contact**: Ebola, MRSA.\n- **Foodborne**: Salmonella, Listeria, E. coli.\n- **Zoonotic**: pathogens jumping from animals to humans (HIV, COVID-19, Ebola, bird flu). ~75% of emerging infectious diseases are zoonotic.\n\n**Environmental drivers**:\n- **Climate change (9.5)**: \n  - Warming extends mosquito ranges poleward and upslope — malaria, dengue, Zika spreading.\n  - Tick-borne diseases expanding (Lyme disease northward across US and into Canada).\n  - Warmer waters favor *Vibrio* (cholera).\n  - Heavy rain events spread pathogens in stormwater.\n- **Land-use change**:\n  - **Deforestation** brings people into contact with previously remote wildlife — Ebola, Nipah virus spillovers.\n  - **Habitat fragmentation** alters reservoir host dynamics (Lyme increased with fragmented forests in northeastern US).\n- **Urbanization and travel**: dense populations + global connectivity accelerate spread (SARS 2003, COVID-19 2020).\n- **Biodiversity loss**: in some systems, the **dilution effect** — diverse communities reduce disease transmission (hosts compete/dilute). Losing diversity concentrates pathogens in competent hosts.\n- **Wildlife trade**: wet markets and bushmeat implicated in many spillovers.\n- **Water and sanitation**: inadequate sewage treatment = cholera, typhoid, hepatitis A.\n- **Antibiotic overuse** (CAFOs, medical misuse): drives resistance. WHO estimates 10 M deaths/yr from antimicrobial resistance by 2050 without action.\n- **Vaccine hesitancy** enables reemergence (measles, polio).\n\n**Emerging and reemerging**:\n- **COVID-19** (2019–): showed how zoonotic spillover + global connectivity can be catastrophic.\n- **Ebola** outbreaks in West and Central Africa.\n- **Nipah, Hendra**: fruit-bat-to-human/animal zoonoses.\n- **Antibiotic resistance**: MRSA, CRE, carbapenem-resistant organisms.\n\n**One Health approach**: recognizes human, animal, and environmental health as interconnected. Surveillance, wildlife health monitoring, integrated veterinary + medical response.\n\n**Policy tools**:\n- Universal water and sanitation access (SDG 6).\n- Vector control (insecticide-treated bednets cut malaria deaths ~50%).\n- Vaccination programs.\n- Antibiotic stewardship.\n- Pandemic preparedness (WHO, CDC).\n- Forest protection + wildlife trade regulation to reduce spillover risk.",
    keyIdeas: [
      "Environmental change drives disease spread: climate, land use, sanitation, antibiotics.",
      "75% of emerging infectious diseases are zoonotic.",
      "Climate change is expanding vector-borne diseases (malaria, dengue, Lyne).",
      "One Health: human + animal + environmental health are one system.",
    ],
    commonMistakes: [
      "Treating infectious disease as unrelated to environmental science.",
      "Overlooking antibiotic resistance as a major threat.",
      "Ignoring the link between deforestation/wildlife trade and zoonotic spillover.",
    ],
  },

  // =========================================================================
  // UNIT 9 — GLOBAL CHANGE
  // =========================================================================
  "9.1": {
    id: "9.1",
    title: "Stratospheric Ozone Depletion",
    summary:
      "Stratospheric ozone (O₃) shields Earth from UV radiation. CFCs and related halocarbons catalytically destroy O₃, thinning the layer — notably the Antarctic \"ozone hole.\"",
    lesson:
      "The **ozone layer** in the stratosphere (15–35 km altitude) absorbs ~99% of incoming solar UV-B and UV-C radiation. Without it, surface UV would be lethal to most life — the ozone layer made terrestrial life possible.\n\n**Natural ozone cycle (Chapman cycle)**:\n- O₂ + UV → 2 O.\n- O + O₂ → O₃.\n- O₃ + UV → O₂ + O.\nEquilibrium concentration ~10 ppm in the stratospheric ozone layer.\n\n**Chlorofluorocarbons (CFCs)**:\n- Synthesized for refrigeration (Freon), aerosol propellants, solvents, foam blowing agents starting in the 1930s.\n- Inert in troposphere — exactly why they were commercially successful.\n- Inert = very long atmospheric lifetime (decades to centuries).\n- Eventually drift up to stratosphere, where UV finally breaks them: CFCl₃ + UV → CFCl₂ + Cl.\n\n**Catalytic destruction**:\n- Cl + O₃ → ClO + O₂.\n- ClO + O → Cl + O₂.\nNet: O₃ + O → 2 O₂. Crucially, **Cl is regenerated** — a single Cl atom can destroy ~100,000 O₃ molecules before it eventually deposits.\n\n**The Antarctic ozone hole**:\n- Discovered 1985 (Joe Farman et al.).\n- Each austral spring (Sept–Oct), stratospheric ozone over Antarctica drops ~50–70%.\n- **Polar stratospheric clouds** form in the extreme cold; provide surfaces for reactions that release Cl from reservoir compounds (HCl, ClONO₂). When sunlight returns, rapid O₃ destruction.\n- **Polar vortex** isolates Antarctic air; ozone-rich air from mid-latitudes can't mix in.\n- Arctic experiences smaller, variable depletion.\n\n**Other ozone-depleting substances (ODS)**:\n- CFCs.\n- HCFCs (transitional replacements — less harmful but still deplete).\n- **Halons** (fire suppression).\n- **Methyl bromide** (fumigation).\n- **Carbon tetrachloride**, methyl chloroform.\n\n**Impacts of depletion**:\n- **Skin cancer** (melanoma, basal/squamous): UV-B exposure is a major cause.\n- **Cataracts**.\n- **Immune suppression**.\n- **Crop damage** and **phytoplankton damage** — reduced productivity, cascading ecosystem effects.\n- **DNA damage** across species.\n\n**Regulatory response**:\n- **Vienna Convention (1985)**: framework.\n- **Montreal Protocol (1987)**: landmark treaty phasing out CFCs. **Ratified by every country** — extraordinary international cooperation.\n- **Kigali Amendment (2016)**: phases out HFCs (replacements for CFCs that didn't deplete ozone but are potent greenhouse gases).\n\n**Current status**: ozone layer slowly recovering; Antarctic hole expected to close by ~2060–2070 if compliance continues. One of the clearest environmental success stories.",
    keyIdeas: [
      "Stratospheric ozone absorbs UV-B/UV-C, protecting life.",
      "CFCs catalytically destroy O₃: Cl atoms recycle many times.",
      "Antarctic ozone hole forms annually due to PSCs + polar vortex.",
      "Montreal Protocol (1987) — universal ratification; recovery underway.",
    ],
    commonMistakes: [
      "Confusing stratospheric (protective) with tropospheric (harmful) ozone.",
      "Blaming HCFC replacements for the hole (they deplete less).",
      "Forgetting the Kigali Amendment addresses HFCs' climate impact.",
    ],
  },
  "9.2": {
    id: "9.2",
    title: "Reducing Ozone Depletion",
    summary:
      "The Montreal Protocol phased out ozone-depleting substances globally. Replacements (HCFCs → HFCs → next-gen) track evolving science.",
    lesson:
      "**Montreal Protocol on Substances that Deplete the Ozone Layer (1987)**, amended multiple times (London, Copenhagen, Montreal, Beijing, Kigali). Often called the most successful environmental treaty ever.\n\n**Mechanism**:\n- **Binding targets** with specific phase-out schedules.\n- **Differentiated responsibilities**: developed countries phased out first (production halted by 1996 for CFCs); developing countries had ~10-year grace period.\n- **Multilateral Fund**: helps developing countries transition — technology transfer and financial support.\n- **Compliance mechanism**: trade sanctions against non-parties, monitoring by Ozone Secretariat.\n- **Universal ratification**: every UN member state.\n\n**Phase-out timeline**:\n- **CFCs**: developed countries by 1996; developing by 2010.\n- **Halons**: developed by 1994; developing by 2010.\n- **Methyl bromide**: phased out by 2015 for most uses (some critical-use exemptions).\n- **HCFCs** (transitional replacements): 2030 for developed, 2040 for developing.\n- **HFCs** (Kigali Amendment, 2016): phased down ~80–85% by 2047.\n\n**Replacements evolved**:\n- Generation 1: **HCFCs** (e.g., R-22). Less destructive to ozone than CFCs but still harmful.\n- Generation 2: **HFCs** (e.g., R-134a). Do not deplete ozone but are potent greenhouse gases — 1000s× GWP of CO₂. Kigali Amendment addresses these.\n- Generation 3: **HFOs** (hydrofluoroolefins, e.g., R-1234yf), hydrocarbons (propane, isobutane), CO₂, ammonia. Lower GWP, sometimes flammable or toxic.\n\n**Consumer and industry actions**:\n- Refrigerator/air conditioner recycling: recovery of refrigerants, not venting to atmosphere.\n- Technician training and certification.\n- Label requirements for equipment.\n\n**Remaining challenges**:\n- **Illegal CFC emissions** detected from East Asia ~2013–2018 — showed compliance is ongoing work.\n- **HFC phase-down** requires replacement infrastructure, training.\n- **Heat pumps** (crucial for electrifying heating) use refrigerants — sourcing low-GWP alternatives matters.\n\n**Wider lesson**: Montreal Protocol shows global environmental cooperation is possible when (1) science is clear, (2) replacements are available, (3) industry can adapt economically, and (4) consumers see personal stakes (skin cancer). Climate policy has struggled with weaker versions of each condition.\n\n**Co-benefits**: Montreal Protocol has avoided an estimated 0.5–1 °C of additional warming because CFCs/HCFCs/HFCs are also potent greenhouse gases. It is quietly the most successful *climate* treaty too.",
    keyIdeas: [
      "Montreal Protocol (1987) phased out ODS; universal ratification.",
      "Differentiated timelines + financial support for developing countries.",
      "HFC (next-gen) phase-down under Kigali Amendment; GWP concerns.",
      "Also counts as the most successful climate treaty due to GHG co-benefits.",
    ],
    commonMistakes: [
      "Confusing Montreal Protocol (ozone) with Kyoto / Paris (climate).",
      "Treating HFCs as fully safe — they don't deplete ozone but are potent GHGs.",
      "Assuming the ozone problem is solved (recovery is slow and ongoing).",
    ],
  },
  "9.3": {
    id: "9.3",
    title: "The Greenhouse Effect",
    summary:
      "Greenhouse gases absorb outgoing infrared radiation and re-emit it, trapping heat. Natural effect keeps Earth ~33 °C warmer than otherwise; anthropogenic enhancement drives warming.",
    lesson:
      "The **greenhouse effect** is a natural process that keeps Earth's surface warm enough for life.\n\n**Mechanism**:\n1. Sun emits mostly **visible + near-IR** light.\n2. Atmosphere is largely transparent to this; ~70% of sunlight reaches the surface (30% reflected).\n3. Surface absorbs and warms, then re-radiates energy in the **thermal-infrared** (peaks around 10 μm for ~288 K).\n4. **Greenhouse gases (GHGs)** absorb the outgoing IR and re-emit it in all directions, including back to the surface.\n5. Surface warms more than it would without GHGs.\n\nEnergy balance: in steady state, outgoing IR at top-of-atmosphere = incoming absorbed sunlight. GHGs raise the effective emitting altitude (cold upper layers), so surface must be warmer to balance.\n\n**Without GHGs**: Earth's average surface temperature would be ~–18 °C. With natural GHGs: ~+15 °C. Net effect: ~+33 °C of warming.\n\n**Major greenhouse gases** (by relative importance to natural greenhouse effect):\n- **Water vapor (H₂O)**: largest natural GHG; responds to temperature (feedback rather than primary forcing).\n- **Carbon dioxide (CO₂)**: long-lived (~300+ years effective); dominant human-driven forcing.\n- **Methane (CH₄)**: ~28× GWP of CO₂ over 100 years; shorter-lived (~12 years).\n- **Nitrous oxide (N₂O)**: ~265× GWP; lifetime ~114 years.\n- **Ozone (O₃)**: tropospheric O₃ is a GHG.\n- **Halocarbons** (CFCs, HFCs, PFCs, SF₆): very potent per molecule but low abundance.\n\n**Global Warming Potential (GWP)**: ratio of heat-trapping by a gas vs CO₂ over a chosen time frame (typically 100 years). Allows comparison of emissions on a common scale.\n\n**Radiative forcing**: net change in energy balance at top of atmosphere from a perturbation, in W/m². Anthropogenic forcing is ~3 W/m² (CO₂ ~2 W/m² of that).\n\n**Feedbacks**:\n- **Positive (amplifying)**:\n  - Water vapor: warmer air holds more H₂O (strongest feedback).\n  - Ice-albedo: melting ice reveals darker surfaces that absorb more.\n  - Permafrost methane: thawing releases CH₄ and CO₂.\n- **Negative (dampening)**:\n  - Infrared emission (Stefan-Boltzmann) — warmer surface emits more IR.\n  - Some cloud feedbacks (debated).\n\n**Natural vs enhanced**: The natural effect is essential; the problem is rapid **enhancement** from anthropogenic GHG emissions (9.4).",
    keyIdeas: [
      "GHGs absorb outgoing IR and re-emit it, warming surface ~33 °C above no-GHG baseline.",
      "Major GHGs: H₂O, CO₂, CH₄, N₂O, O₃, halocarbons.",
      "GWP normalizes different gases on a CO₂-equivalent scale over a time horizon.",
      "Positive feedbacks (water vapor, ice-albedo) amplify initial warming.",
    ],
    commonMistakes: [
      "Calling the greenhouse effect \"bad\" — the natural effect makes life possible.",
      "Treating H₂O as a driver (it's a feedback, not a primary anthropogenic forcing).",
      "Ignoring that methane is short-lived but very potent (CH₄ reductions have fast climate payoff).",
    ],
  },
  "9.4": {
    id: "9.4",
    title: "Increases in the Greenhouse Gases",
    summary:
      "CO₂, CH₄, and N₂O have risen dramatically since industrialization. Sources: fossil fuels, deforestation, agriculture, waste. Driving observed warming.",
    lesson:
      "Atmospheric GHG concentrations have risen to levels unprecedented in hundreds of thousands of years (ice-core records):\n\n**CO₂**:\n- Pre-industrial: 280 ppm (stable for ~10,000 years).\n- 2024: 420+ ppm (+50%).\n- Higher than any time in ~3+ million years (Pliocene).\n- **Sources**: fossil fuel combustion (~75%), deforestation and land-use change (~10%), cement (~4%), other.\n- **Sinks**: oceans (~25% of emissions), land biosphere (~30%). ~45% stays in atmosphere.\n- Long lifetime (~300+ years effective, ~1000 years for full re-equilibration).\n\n**CH₄ (methane)**:\n- Pre-industrial: ~720 ppb.\n- 2024: ~1900 ppb (~2.6×).\n- **Sources**: natural wetlands, rice paddies, livestock (enteric fermentation — beef, dairy), manure, landfills, fossil fuel leaks (coal mines, natural gas systems), biomass burning, permafrost thaw.\n- ~28× GWP over 100 years, ~84× over 20 years.\n- Lifetime ~12 years — reductions produce fast climate benefits.\n- Recent anomaly: CH₄ growth accelerating since ~2020, possibly from wetland feedbacks and fossil emissions.\n\n**N₂O (nitrous oxide)**:\n- Pre-industrial: ~270 ppb.\n- 2024: ~335 ppb.\n- **Sources**: synthetic fertilizer application (biggest), manure, burning biomass/fossil fuels, industrial processes.\n- ~265× GWP; lifetime ~114 years.\n- Also depletes stratospheric ozone.\n\n**Halocarbons** (CFCs, HCFCs, HFCs, PFCs, SF₆):\n- All anthropogenic.\n- **Per-molecule GWP** from ~1,000 to ~23,000.\n- **CFCs declining** since Montreal Protocol; **HFCs rising**, now Kigali phase-down (9.2).\n- **SF₆**: insulator in electrical switchgear; GWP ~23,500.\n\n**Tropospheric ozone**: increased since industrialization from smog chemistry.\n\n**Water vapor**: feedback, not forcing — rises with warmer air holding more moisture, amplifying the CO₂/CH₄-driven warming.\n\n**By sector (global GHG emissions)**:\n- Energy (electricity, heat): ~30%.\n- Industry: ~20%.\n- Agriculture, forestry, land use: ~20%.\n- Transport: ~15%.\n- Buildings: ~6%.\n- Other: remainder.\n\n**By country** (2022 approximate):\n- China: ~30%.\n- USA: ~14%.\n- EU: ~8%.\n- India: ~7%.\n- Russia: ~5%.\n**Cumulative historical**: US + EU + UK ~50% of all emissions since 1850 — drives equity debates in climate negotiations.\n\n**Evidence for anthropogenic origin**:\n- **Isotopic fingerprint**: fossil CO₂ is depleted in ¹³C and has no ¹⁴C (it's too old). Atmospheric CO₂ shows both signatures shifting toward fossil.\n- **Decline in atmospheric O₂** matches combustion consumption.\n- **Mass-balance accounting**: known emissions reconcile with observed atmospheric accumulation + measured ocean/land uptake.",
    keyIdeas: [
      "CO₂ 280 → 420 ppm; CH₄ 720 → 1900 ppb; N₂O 270 → 335 ppb since pre-industrial.",
      "Sources: fossil fuels (CO₂), agriculture + fossil leaks (CH₄), fertilizer (N₂O), industry (halocarbons).",
      "Isotopic fingerprints confirm anthropogenic origin.",
      "Methane reductions produce fast climate benefits due to short lifetime.",
    ],
    commonMistakes: [
      "Treating all GHGs the same — lifetimes and GWPs differ dramatically.",
      "Ignoring cumulative historical emissions when discussing responsibility.",
      "Confusing current-year emissions (China largest) with cumulative (US largest).",
    ],
  },
  "9.5": {
    id: "9.5",
    title: "Global Climate Change",
    summary:
      "Enhanced greenhouse effect is warming Earth ~1.2 °C above pre-industrial. Consequences include melting ice, sea-level rise, weather extremes, and ecosystem disruption.",
    lesson:
      "**Global warming** = rising global mean surface temperature. **Climate change** = broader shifts (precipitation, extremes, ocean properties, cryosphere, ecology) that accompany warming.\n\n**Observed changes**:\n- **Global mean surface temperature** up ~1.2 °C since pre-industrial (1850–1900). 2023 and 2024 were each the hottest years on record.\n- **Land warming faster than ocean** (land has lower heat capacity).\n- **Arctic warming 3–4× the global average** (\"Arctic amplification\" from ice-albedo feedback).\n- **Ocean warming**: upper 2000 m of ocean has absorbed >90% of excess heat.\n- **Sea-level rise**: ~20 cm since 1900; accelerating (current rate ~3.6 mm/yr). Due to thermal expansion + melting glaciers + ice sheets.\n- **Sea ice**: Arctic summer sea ice declining ~13%/decade; could be ice-free in summer this century.\n- **Ice sheets**: Greenland and Antarctica losing hundreds of billions of tons/yr.\n- **Mountain glaciers**: almost universally retreating; Himalayan, Alpine, Andean glaciers threaten water supplies.\n- **Permafrost thaw**: releasing CH₄ and CO₂; infrastructure collapse in Arctic.\n- **Ocean acidification** (9.7).\n- **Ocean deoxygenation**: warmer, more stratified oceans lose O₂.\n- **Precipitation shifts**: wet areas wetter, dry areas drier; more intense rainfall events.\n- **Extreme weather**: heat waves more frequent and intense; heavier precipitation events; stronger tropical cyclones (though not necessarily more total); droughts in some regions.\n- **Ecosystem shifts**: species ranges moving poleward and upslope; phenology (flowering, migration, breeding) shifting earlier in spring.\n- **Human health**: heat deaths, vector-borne disease expansion, air-quality effects, food/water insecurity.\n- **Food systems**: yield declines in some staple crops with warming; some polar gains.\n\n**Projections** (IPCC AR6, depending on emissions scenario):\n- **Low emissions (SSP1-1.9)**: ~1.4 °C warming by 2100 if rapid reductions.\n- **Middle (SSP2-4.5)**: ~2.7 °C.\n- **High (SSP5-8.5)**: ~4.4 °C.\n- **Sea level**: +0.3 to +1.0 m by 2100, more after. Multi-meter rise possible over centuries with ice-sheet instability.\n- **Tipping points**: Amazon forest dieback, West Antarctic ice sheet collapse, permafrost methane, monsoon shifts — potentially irreversible if crossed.\n\n**Impacts by region**:\n- **Island nations**: existential threat from sea-level rise (Maldives, Tuvalu, Marshall Islands).\n- **Arctic communities**: thawing permafrost, vanishing ice, hunting collapse.\n- **Coastal megacities**: flooding risk (Jakarta, Miami, Dhaka, Mumbai, Shanghai).\n- **Mediterranean, SW US, southern Africa**: aridification, water stress.\n- **Sub-Saharan Africa, South Asia**: food security risks compounding poverty.\n\n**Policy frameworks**:\n- **UNFCCC (1992)**: umbrella treaty.\n- **Kyoto Protocol (1997)**: binding commitments for developed countries (expired).\n- **Paris Agreement (2015)**: nationally determined contributions (NDCs); aims to hold warming \"well below 2 °C\", pursue 1.5 °C.\n- **IPCC reports**: scientific synthesis every 5–7 years.\n\n**Mitigation**: reduce emissions (renewable energy, efficiency, electrification, reforestation, methane + N₂O action).\n**Adaptation**: sea walls, drought-tolerant crops, urban cooling, flood-resilient design, managed retreat — essential because some warming is locked in.",
    keyIdeas: [
      "~1.2 °C warming since pre-industrial; accelerating.",
      "Arctic warming 3–4× global average; sea level rising; ice sheets losing mass.",
      "Impacts: extremes, ecosystem shifts, health, food/water, coastal risk.",
      "Paris Agreement targets <2 °C (aiming 1.5 °C); tipping points loom if we overshoot.",
    ],
    commonMistakes: [
      "Confusing weather (short-term) with climate (long-term).",
      "Assuming warming is uniform — land warms faster, Arctic fastest.",
      "Ignoring that some warming is locked in — adaptation is essential alongside mitigation.",
    ],
  },
  "9.6": {
    id: "9.6",
    title: "Ocean Warming",
    summary:
      "The ocean has absorbed >90% of excess heat from greenhouse warming. Consequences: coral bleaching, stratification, deoxygenation, shifting species, stronger storms.",
    lesson:
      "Oceans hold ~1000× the heat capacity of the atmosphere and have absorbed ~90% of the extra heat trapped by anthropogenic GHGs. Ocean heat content (OHC) is a far more sensitive indicator than air temperature.\n\n**Observed changes**:\n- **Upper 2000 m** of the ocean has warmed steadily since the 1970s.\n- Surface waters have warmed ~0.9 °C since pre-industrial.\n- **Marine heat waves** — persistent warm-anomaly events — becoming more frequent and intense.\n\n**Consequences**:\n\n**Coral bleaching**:\n- Corals live in symbiosis with photosynthetic algae (zooxanthellae).\n- Sustained temperatures ~1 °C above summer max trigger expulsion of algae → **bleaching** (coral turns white, loses food source).\n- Short events recoverable; repeated or prolonged bleaching kills corals.\n- **Mass bleaching events** on Great Barrier Reef (2016, 2017, 2020, 2022, 2024); Caribbean, Maldives, Hawaii.\n- Ocean acidification (9.7) compounds thermal stress.\n- If warming continues, 70–90% of coral reefs likely lost by mid-century.\n\n**Thermal expansion and sea-level rise**:\n- Water expands when heated.\n- Accounts for ~40% of observed sea-level rise; ice melt the rest.\n\n**Stratification**:\n- Warm surface layer becomes less dense; harder to mix with cold nutrient-rich deep water.\n- Reduces upwelling and surface nutrient supply → less phytoplankton productivity in the tropics.\n- Fewer fish at higher trophic levels.\n\n**Deoxygenation**:\n- Warmer water holds less dissolved O₂ (solubility falls).\n- Stratification reduces mixing of O₂-rich surface with deeper layers.\n- **Ocean dead zones** expanding (compound with eutrophication, 8.5).\n\n**Species range shifts**:\n- Fish moving poleward — many stocks redistributed across political boundaries (disputes over reallocated catches).\n- Tropical species invading temperate seas.\n- Polar species running out of habitat.\n\n**Stronger tropical cyclones**:\n- Warmer sea surface temperatures provide more energy.\n- Trend toward stronger peak intensities (Category 4-5), heavier rainfall, slower movement (more flooding).\n- Storm surge compounded by sea-level rise.\n\n**Ice-sheet destabilization**:\n- Warm ocean water undercutting Antarctic ice shelves → accelerated glacier flow into the sea.\n- Thwaites Glacier (\"Doomsday Glacier\") particularly concerning.\n\n**Fisheries impacts**:\n- Cold-water species (cod, salmon, lobster in Gulf of Maine) declining.\n- Warm-water species expanding.\n- Traditional fisheries face transformation.\n\n**Solutions**: fundamentally, emission reductions (no way to re-cool oceans quickly). Marine protected areas + ecosystem-based management can buffer stress. Reef restoration and assisted evolution attempts to give corals a chance.",
    keyIdeas: [
      "Oceans have absorbed ~90% of excess heat.",
      "Marine heat waves, coral bleaching, stratification, deoxygenation are key impacts.",
      "Stronger hurricanes, faster ice-sheet loss, species redistributions follow.",
      "Only emissions cuts reduce the driver; adaptation + protection buy time.",
    ],
    commonMistakes: [
      "Focusing only on air temperature — ocean heat content is the better climate indicator.",
      "Treating bleaching as direct thermal death (it's algal expulsion first).",
      "Assuming oceans buffer us indefinitely — they transfer heat back and lose O₂ doing so.",
    ],
  },
  "9.7": {
    id: "9.7",
    title: "Ocean Acidification",
    summary:
      "Oceans absorb ~25% of anthropogenic CO₂, forming carbonic acid and lowering pH. Harms organisms that build CaCO₃ shells (corals, mollusks, some plankton).",
    lesson:
      "**Ocean acidification (OA)** = decrease in ocean pH caused by absorption of atmospheric CO₂. Sometimes called \"the other CO₂ problem.\"\n\n**Chemistry**:\n\n$$\\text{CO}_2 + \\text{H}_2\\text{O} \\rightleftharpoons \\text{H}_2\\text{CO}_3 \\rightleftharpoons \\text{H}^+ + \\text{HCO}_3^- \\rightleftharpoons 2\\text{H}^+ + \\text{CO}_3^{2-}.$$\n\nMore atmospheric CO₂ drives more dissolution, more H₂CO₃, more H⁺ → **lower pH**. Also shifts equilibrium: free carbonate ion **CO₃²⁻** decreases as H⁺ rises (H⁺ + CO₃²⁻ → HCO₃⁻). The drop in carbonate ion is the primary ecological concern.\n\n**Observed**:\n- Surface ocean pH: ~8.2 pre-industrial → ~8.1 today.\n- A drop of 0.1 pH sounds small but equals ~30% more H⁺ (log scale).\n- Projected to reach ~7.8 by 2100 under high emissions — the largest and fastest pH shift in tens of millions of years.\n\n**Biological impacts**:\n\n**Calcifying organisms** — those making CaCO₃ shells or skeletons — are most affected:\n- **Corals**: slower calcification, weaker skeletons, reef erosion. Compounds with thermal bleaching (9.6).\n- **Mollusks** (oysters, clams, mussels, pteropods): larval shells dissolve or fail to form. Pacific Northwest oyster hatcheries had major failures around 2005–2010.\n- **Pteropods** (sea butterflies, tiny pelagic snails): key food for salmon and whales; shells visibly pitting in acidified waters.\n- **Coralline algae**: reef-builders and nursery habitat.\n- **Calcareous phytoplankton** (coccolithophores): base of marine food web.\n\n**Non-calcifying impacts**:\n- Altered fish behavior (impaired predator avoidance in some larvae).\n- Algal community shifts.\n- Sea urchin reproduction.\n\n**Cold and deep waters** acidify fastest (hold more CO₂). **Polar regions** and **upwelling zones** (Pacific Northwest) are most vulnerable.\n\n**Aragonite saturation state**: a key metric — when undersaturated, aragonite (a form of CaCO₃ that many organisms use) literally dissolves. Polar oceans are projected to be aragonite-undersaturated this century.\n\n**Ecosystem impacts**:\n- Collapsing reefs undermine fisheries and coastal protection.\n- Shellfish industries stressed.\n- Food web disruptions if plankton composition shifts.\n\n**Solutions**:\n- **Emissions reductions** are the only long-term solution.\n- Local buffering (some oyster farms monitor and buffer pH).\n- Reducing other stressors (pollution, overfishing) builds resilience.\n- Protection of macroalgae/seagrass beds which can locally raise pH via photosynthesis.\n\nOA and warming (9.6) are **the twin climate impacts on oceans** — both stem from CO₂, both require the same fix.",
    keyIdeas: [
      "CO₂ + seawater → carbonic acid → lower pH + less CO₃²⁻.",
      "Surface pH fell ~0.1 (30% more H⁺); could fall another 0.3 by 2100.",
      "Calcifiers (corals, mollusks, pteropods, coccolithophores) most vulnerable.",
      "Only emissions cuts address the root cause.",
    ],
    workedExample: {
      prompt:
        "pH fell from 8.2 to 8.1. How much has [H⁺] increased?",
      solution:
        "[H⁺] = 10⁻ᵖᴴ. Ratio = 10⁻⁸·¹ / 10⁻⁸·² = 10⁰·¹ ≈ 1.26 — about 26% more H⁺. Often rounded to ~30%.",
    },
    commonMistakes: [
      "Thinking a 0.1 pH drop is small — it's 26% more acidity.",
      "Confusing OA with ocean warming (both caused by CO₂, but different mechanisms).",
      "Ignoring carbonate ion — pH is the input, CO₃²⁻ shortage is the ecological effect.",
    ],
  },
  "9.8": {
    id: "9.8",
    title: "Invasive Species",
    summary:
      "Non-native species introduced by humans often lack natural predators in their new range, outcompete or prey on natives, and spread disease. Huge economic and ecological costs.",
    lesson:
      "**Invasive species** = non-native species that cause ecological or economic harm in a new environment. Not all non-natives are invasive — some integrate harmlessly — but many cause serious damage.\n\n**Pathways of introduction**:\n- **Ballast water**: ships take on water (with organisms) at one port and discharge at another. Source of zebra mussels, many others.\n- **Hull fouling**: organisms attached to ship hulls.\n- **Deliberate introductions** for pest control, hunting, or ornamental purposes — often backfire (cane toad in Australia).\n- **Pet trade**: Burmese pythons in the Everglades from released pets.\n- **Aquarium dumping**: lionfish in the Atlantic/Caribbean.\n- **Horticulture**: ornamental plants escape gardens (kudzu, Japanese knotweed, Bradford pear).\n- **Accidental transport**: wood packing material (emerald ash borer).\n- **Climate change**: shifting ranges allow species into new areas (not technically invasive but similar dynamics).\n\n**Why they thrive**:\n- **Enemy release**: no co-evolved predators, parasites, or diseases in the new range.\n- **Naive prey**: local species lack defenses against novel predators.\n- **Empty niches**: when humans disturb ecosystems, invasives can fill gaps.\n- **Fast reproduction, wide tolerance**: many invasives are r-selected generalists.\n\n**Impacts**:\n- **Native species decline** or extinction (especially island endemics). Brown tree snake on Guam eliminated most native birds.\n- **Ecosystem engineering changes**: zebra mussels filter lake water → clearer water but collapsed plankton → altered food web.\n- **Agricultural damage**: locusts, Asian long-horned beetles, spotted lanternfly.\n- **Human health**: disease vectors (Asian tiger mosquito), allergens.\n- **Economic cost**: US alone >$120 billion/yr in control and damages.\n\n**Iconic examples**:\n- **Zebra/quagga mussels** (Great Lakes, from Black Sea ballast).\n- **Kudzu** (SE US, from Japan — planted for erosion control, now \"the vine that ate the South\").\n- **Cane toads** in Australia (introduced for beetle control; poisonous, decimating native predators).\n- **Emerald ash borer** (killed hundreds of millions of ash trees in North America).\n- **Burmese python** (Everglades; collapsed small-mammal populations).\n- **Lionfish** (Atlantic/Caribbean reefs; voracious predator, no natural enemies).\n- **European starlings**: 200 released in NYC in 1890s → millions across NA.\n- **Feral pigs** in southern US.\n- **Cheatgrass** in Western US (fire-adapted, displaces native grasses, worsens wildfire cycles).\n\n**Management**:\n- **Prevention** is cheapest and most effective: ballast water treatment, inspections, quarantines, public education.\n- **Early detection and rapid response (EDRR)** before establishment.\n- **Mechanical control**: hand removal, mowing, trapping.\n- **Chemical control**: herbicides, pesticides (can harm non-targets).\n- **Biological control**: introducing the invasive's natural enemy — careful testing required to avoid secondary invasions.\n- **Physical barriers**: Asian carp barriers in Chicago canals.\n- **Public hunting incentives**: lionfish derbies, python challenges.\n\n**Regulations**: **Lacey Act (US, 1900)** restricts interstate wildlife transport; **Injurious Wildlife** list; USDA plant inspection. International: IMO ballast water convention.",
    keyIdeas: [
      "Invasives: introduced species causing ecological/economic harm.",
      "Success factors: enemy release, naive prey, empty niches, fast reproduction.",
      "Pathways: ballast, pet trade, horticulture, accidental transport.",
      "Management: prevention >> early detection >> established control.",
    ],
    commonMistakes: [
      "Calling every non-native invasive — only those causing harm qualify.",
      "Forgetting most invasives entered via ships, not pets.",
      "Underestimating biocontrol risks (introduced controls sometimes become new invasives).",
    ],
  },
  "9.9": {
    id: "9.9",
    title: "Endangered Species",
    summary:
      "Species become endangered through habitat loss, overharvesting, pollution, invasives, and climate change. Protection via Endangered Species Act, CITES, captive breeding, habitat restoration.",
    lesson:
      "**IUCN Red List** classifies species by extinction risk:\n- **Extinct (EX)** / **Extinct in the Wild (EW)**.\n- **Critically Endangered (CR)**.\n- **Endangered (EN)**.\n- **Vulnerable (VU)**.\n- **Near Threatened (NT)**.\n- **Least Concern (LC)**.\n- **Data Deficient (DD)**.\n\nAs of recent assessments, ~40,000+ species are threatened with extinction; 1 million+ plants and animals at risk according to IPBES 2019.\n\n**Causes** (HIPPO, 8.2):\n- Habitat loss/fragmentation — biggest driver.\n- Overharvesting (fishing, hunting, illegal wildlife trade).\n- Pollution.\n- Invasive species (especially on islands).\n- Climate change (increasingly important; shifts ranges faster than species can adapt).\n- Disease (chytrid fungus decimating amphibians; white-nose syndrome in bats).\n\n**Species traits that increase extinction risk**:\n- Specialist (3.1) with narrow habitat needs.\n- K-selected (3.2) with slow reproduction (whales, elephants, condors).\n- Large body size (more resources needed, more visible to hunters).\n- Small population and restricted range.\n- Low genetic diversity.\n- Island endemics (no retreat).\n- Top predators (biomagnification, habitat fragmentation).\n\n**Iconic endangered species**:\n- **Amur leopard** (CR, ~100 individuals).\n- **Vaquita porpoise** (CR, <20 individuals — fishing bycatch in Gulf of California).\n- **Sumatran elephant, rhino, orangutan, tiger** — palm oil deforestation.\n- **African elephants** — poaching for ivory.\n- **Pangolins** (world's most-trafficked mammal).\n- **Monarch butterfly** — pesticide use, habitat loss.\n- **Polar bears** — sea ice loss (9.6).\n- **Coral species** — bleaching and acidification.\n\n**Conservation strategies**:\n- **Habitat protection**: parks, reserves, marine protected areas. Scale + connectivity (2.3) matter.\n- **Species-specific recovery plans**: bald eagle, peregrine falcon, humpback whale have all recovered from endangered status.\n- **Captive breeding + reintroduction**: California condor (from 22 to 500+), black-footed ferret, red wolf.\n- **Corridors** and **habitat restoration** to reconnect fragmented populations.\n- **Anti-poaching** enforcement, training, intelligence.\n- **Legal protection**: Endangered Species Act (US), national laws elsewhere.\n- **Community-based conservation**: aligning local livelihoods with species protection.\n- **Seed banks** (Svalbard) and **frozen zoos** for genetic material.\n- **Market interventions**: sustainable certification, demand reduction campaigns.\n\n**Legal frameworks**:\n- **Endangered Species Act (US, 1973)**: lists species, prohibits harm, mandates recovery plans, designates critical habitat. Responsible for bald eagle, grey wolf, sea otter recoveries.\n- **CITES (Convention on International Trade in Endangered Species, 1975)**: regulates international trade. Three appendices by threat level.\n- **Marine Mammal Protection Act (US)**, **Migratory Bird Treaty Act**.\n- **CBD (Convention on Biological Diversity, 1992)**.\n- **Ramsar Convention** (wetlands).\n\n**Captive breeding ethics and limits**: can save species from extinction but is costly, small-scale, and species re-released often struggle. Habitat must be saved too.",
    keyIdeas: [
      "IUCN categories: LC → NT → VU → EN → CR → EW → EX.",
      "HIPPO drivers + climate change drive extinction risk.",
      "Specialists, K-selected, large, island-endemic species most vulnerable.",
      "ESA, CITES, captive breeding, habitat protection all contribute to recovery.",
    ],
    commonMistakes: [
      "Thinking captive breeding alone saves species (habitat is essential).",
      "Confusing endangered (formal designation) with threatened (broader).",
      "Ignoring climate change as a rising extinction driver.",
    ],
  },
  "9.10": {
    id: "9.10",
    title: "Human Impacts on Biodiversity",
    summary:
      "We are in a human-driven mass extinction. Biodiversity loss threatens ecosystem services and resilience. Solutions span protected areas, policy, restoration, and behavior.",
    lesson:
      "Biodiversity is declining at unprecedented rates, widely recognized as Earth's **sixth mass extinction** — the first driven by a single species.\n\n**Evidence**:\n- **Background extinction rate** (from fossil record): ~1 species/million species/year.\n- **Current rate**: 100–1000× background — some estimates higher.\n- **Living Planet Index**: average vertebrate population abundance down ~69% since 1970.\n- **IPBES 2019**: ~1 million species at risk of extinction in coming decades.\n- **Insect declines**: multiple studies show 70–80% biomass losses in some ecosystems over decades.\n- **Coral losses**: half of live coral cover gone globally since 1950s.\n\n**Drivers** (rank-ordered, IPBES 2019):\n1. **Land-use change** (habitat destruction and fragmentation).\n2. **Direct exploitation** (overfishing, hunting, logging, trade).\n3. **Climate change** (rising importance).\n4. **Pollution**.\n5. **Invasive species**.\n\n**Why biodiversity matters**:\n- **Ecosystem services** (2.2): pollination, water purification, climate regulation, disease regulation, nutrient cycling — all depend on diverse biotic communities.\n- **Resilience**: diverse ecosystems recover better from disturbance.\n- **Medicinal and scientific value**: ~25–50% of pharmaceuticals derive from natural compounds; new discoveries continue.\n- **Food security**: crop genetic diversity needed for breeding against pests and climate stress.\n- **Cultural, spiritual, aesthetic value**.\n- **Intrinsic value**: many ethical frameworks hold that species have inherent right to exist.\n\n**Extinction cascades**:\n- Loss of **keystone species** (1.11) reshapes entire communities.\n- Trophic cascades ripple through food webs.\n- Mutualistic partners (pollinators and plants) can co-extinct.\n\n**Global conservation response**:\n\n**Protected areas**:\n- Currently ~17% of land and ~8% of oceans protected.\n- Global Biodiversity Framework (Kunming-Montreal 2022) aims for **30% by 2030** (\"30 by 30\").\n- **Effectiveness varies** — many \"paper parks\" lack enforcement.\n\n**International agreements**:\n- **Convention on Biological Diversity (CBD, 1992)**.\n- **Kunming-Montreal Global Biodiversity Framework (2022)** — latest targets.\n- **CITES** for trade.\n- **Ramsar** for wetlands.\n- **Bonn Convention** for migratory species.\n\n**Restoration ecology**:\n- **Reforestation, wetland restoration, prairie restoration**.\n- **Rewilding**: reintroduce extirpated species (wolves in Yellowstone; beavers in UK; European bison).\n- **De-extinction** research (mammoth, thylacine) — controversial.\n\n**Economic instruments**:\n- **Payments for Ecosystem Services (PES)**.\n- **REDD+** (tropical forest carbon).\n- **Biodiversity credits** (emerging).\n- **Subsidy reform**: remove subsidies that drive habitat loss (fisheries, agriculture).\n\n**Individual actions**:\n- **Plant-forward diet** reduces land footprint massively.\n- **Sustainable seafood** (MSC, Seafood Watch).\n- **Support conservation organizations**.\n- **Reduce pesticide use** at home; support pollinators.\n- **Vote for conservation policies**.\n- **Travel responsibly**; avoid wildlife-harming products.\n\n**Key insight**: biodiversity loss is not separate from climate change — they are linked crises driven by the same over-consumption and amplified by each other. Addressing them together (nature-based climate solutions) is more effective than either alone. Protecting intact ecosystems = cheapest and most effective climate + biodiversity action available.",
    keyIdeas: [
      "Current extinction rate 100–1000× background; sixth mass extinction.",
      "Drivers (IPBES): land-use change > direct exploitation > climate > pollution > invasives.",
      "Biodiversity underpins ecosystem services, food, medicine, resilience.",
      "30 by 30 protected-area target + restoration + behavior shifts are the major levers.",
    ],
    commonMistakes: [
      "Treating biodiversity and climate change as separate problems (they're linked).",
      "Focusing only on charismatic species and missing insects, fungi, microbes.",
      "Assuming protected areas alone suffice — enforcement, connectivity, and sustainable use outside them all matter.",
    ],
  },
};
