import type { CourseCedLessons } from "./types";

/**
 * AP Biology CED lessons — every topic from Units 1-8 of the 2024-25 CED.
 * Tone matches the rest of the catalog: direct, mechanism-focused, and
 * aligned to what actually appears on the AP Biology exam (big ideas,
 * scientific practices, FRQ phrasing). No equations beyond Hardy–Weinberg
 * and surface-area-to-volume, which are the only formulas AP Bio tests.
 */

export const AP_BIOLOGY_CED_LESSONS: CourseCedLessons = {
  // =========================================================================
  // UNIT 1 — CHEMISTRY OF LIFE
  // =========================================================================
  "1.1": {
    id: "1.1",
    title: "Structure of Water and Hydrogen Bonding",
    summary:
      "Water's polarity and hydrogen bonding drive cohesion, adhesion, high specific heat, and its role as the universal biological solvent.",
    lesson:
      "Water is a bent molecule. Oxygen hogs the shared electrons, so the O end carries a partial negative charge and each H carries a partial positive charge — the molecule is polar. That polarity lets each water molecule form up to four hydrogen bonds with neighboring waters, and those hydrogen bonds are the source of every \"emergent\" property you will cite on the exam.\n\nCohesion is water sticking to water. It produces surface tension and, together with adhesion (water sticking to polar walls), pulls water up the xylem of plants via transpiration. High specific heat means water resists temperature change — a huge deal for organisms that must keep cytoplasm in a narrow thermal window and for oceans that buffer climate. High heat of vaporization means sweating and panting are effective cooling strategies: breaking all those H-bonds takes a lot of energy, and that energy leaves the skin. Finally, because water is polar, it dissolves ionic and polar solutes (hydrophilic substances) while excluding nonpolar substances (hydrophobic) — the same exclusion that drives membrane and protein folding.\n\nOn the FRQ, expect prompts like \"explain how hydrogen bonding contributes to water's role in X.\" The answer is always the same logical chain: polar molecule → H-bonds → specific property → biological consequence. Practice writing that chain in one clean sentence.",
    keyIdeas: [
      "Water is polar because oxygen is more electronegative than hydrogen.",
      "Hydrogen bonds between water molecules explain cohesion, adhesion, and high specific heat.",
      "Polarity makes water the solvent for polar/ionic solutes and excludes nonpolar ones.",
      "Every water property on the AP exam traces back to hydrogen bonding.",
    ],
    commonMistakes: [
      "Calling hydrogen bonds \"covalent\" — they are intermolecular attractions, not shared-electron bonds.",
      "Saying water has high specific heat \"because it is polar.\" Polarity enables H-bonds; the H-bonds store the energy.",
      "Forgetting to tie the property back to a biological consequence — the rubric wants the chain, not just the fact.",
    ],
  },
  "1.2": {
    id: "1.2",
    title: "Elements of Life",
    summary:
      "Just four elements — C, H, O, N — make up ~96% of living matter, with P and S rounding out the essentials for nucleic acids and proteins.",
    lesson:
      "Carbon is the backbone element because it forms four covalent bonds and can chain with itself into rings, branches, and long skeletons. That is why every macromolecule family (carbohydrates, lipids, proteins, nucleic acids) is built on carbon. Hydrogen and oxygen follow, with nitrogen showing up in every amino acid and nucleotide base, phosphorus anchoring the DNA/RNA backbone and ATP, and sulfur in the R-groups of cysteine and methionine that help fold and stabilize proteins.\n\nTrace elements (Fe, Mg, Ca, K, Na, I, Zn, etc.) are needed in smaller amounts but are non-negotiable: iron in hemoglobin, magnesium in chlorophyll, calcium in bones and signaling, iodine in thyroid hormone. Students sometimes dismiss these as trivia, but FRQ prompts often ask why a specific element matters — and the answer hinges on its role in a particular macromolecule or reaction.\n\nThe big idea is that chemistry imposes constraints. Life is carbon-based not because evolution \"chose\" carbon but because carbon's bonding versatility makes the diversity of biological molecules possible. Phosphorus is in ATP because the P-O-P linkage stores transferable chemical energy. You will see this logic again in every later unit.",
    keyIdeas: [
      "C, H, O, N make up the bulk of living matter.",
      "Carbon's four bonds let it build chains, rings, and branches — the basis of all macromolecules.",
      "Phosphorus is in ATP and nucleic acids; sulfur is in some amino acid R-groups.",
      "Trace elements are small in quantity but essential in function (Fe → hemoglobin, Mg → chlorophyll).",
    ],
    commonMistakes: [
      "Listing elements without tying them to a specific macromolecule or process.",
      "Confusing trace elements with being unimportant — they are often rate-limiting.",
      "Forgetting that phosphorus is the energy-transfer element in ATP.",
    ],
  },
  "1.3": {
    id: "1.3",
    title: "Introduction to Macromolecules",
    summary:
      "All four macromolecules are polymers built from monomers via dehydration synthesis and broken down via hydrolysis.",
    lesson:
      "There are four biological macromolecule families: carbohydrates, lipids, proteins, and nucleic acids. Three of the four (carbs, proteins, nucleic acids) are true polymers — long chains of repeating monomer units. Lipids are not strictly polymers but are assembled by similar bond-forming reactions.\n\nDehydration synthesis (condensation) joins two monomers by removing a water molecule and forming a covalent bond at the joining site. Hydrolysis is the reverse: adding water breaks a bond and yields two smaller pieces. This single pair of reactions builds and tears down every macromolecule in the cell. Monomers map to polymers as follows: monosaccharides → polysaccharides, amino acids → proteins, nucleotides → nucleic acids, and for lipids, glycerol + fatty acids → triglycerides.\n\nWhy it matters: the structure-function theme is hammered here. The sequence of monomers (e.g., the amino acid sequence of a protein, the nucleotide sequence of DNA) encodes information that determines three-dimensional structure, which determines function. Changing even one monomer can change shape and thus change what the molecule does. You'll cite this logic again in sickle cell, enzyme specificity, and antibody binding.",
    keyIdeas: [
      "Four macromolecule families: carbs, lipids, proteins, nucleic acids.",
      "Dehydration synthesis builds polymers (removes H₂O); hydrolysis breaks them (adds H₂O).",
      "Monomers → polymers: monosaccharides → polysaccharides, amino acids → proteins, nucleotides → nucleic acids.",
      "Monomer sequence determines structure, which determines function.",
    ],
    commonMistakes: [
      "Saying lipids are \"true polymers\" — they aren't, but they are still macromolecules.",
      "Mixing up hydrolysis and dehydration direction — remember H₂O is released when bonds form.",
      "Losing points for not connecting sequence → structure → function.",
    ],
  },
  "1.4": {
    id: "1.4",
    title: "Carbohydrates",
    summary:
      "Monosaccharides polymerize into polysaccharides for energy storage (starch, glycogen) or structural roles (cellulose, chitin).",
    lesson:
      "Monosaccharides like glucose have the general formula (CH₂O)ₙ. They exist mostly as ring forms in solution and are the cell's primary short-term energy source because their bonds release usable energy when oxidized. Two monosaccharides joined by dehydration synthesis form a disaccharide (sucrose, lactose, maltose) linked by a glycosidic bond. Many monosaccharides linked together form a polysaccharide.\n\nFunction follows structure. Starch is α-1,4-linked glucose used by plants as energy storage; glycogen is a heavily branched version animals store in liver and muscle. Cellulose is β-1,4-linked glucose whose alternating orientation creates straight, rigid chains that hydrogen-bond into microfibrils — the reason plant cell walls are strong and the reason humans cannot digest it (our enzymes only recognize α-linkages). Chitin replaces an OH with an N-acetyl group and forms fungal cell walls and arthropod exoskeletons.\n\nThe big idea here is that a tiny change (α vs. β linkage, branched vs. linear) produces a totally different emergent property (energy store vs. structural material). That's structure → function in one sentence, and it's the argument the exam expects on the FRQ.",
    keyIdeas: [
      "Carbs are (CH₂O)ₙ; monosaccharides are the monomers.",
      "α-linked glucose polymers (starch, glycogen) are digestible energy stores.",
      "β-linked glucose (cellulose) is a rigid structural polymer humans cannot digest.",
      "Branched glycogen releases glucose fast; linear starch/cellulose pack tightly.",
    ],
    commonMistakes: [
      "Forgetting that α vs. β glycosidic linkage changes digestibility and function.",
      "Calling cellulose an \"energy molecule\" — it is structural.",
      "Ignoring that branching in glycogen is an adaptation for rapid glucose release.",
    ],
  },
  "1.5": {
    id: "1.5",
    title: "Lipids",
    summary:
      "Lipids are hydrophobic molecules — fats, phospholipids, steroids — that store energy, build membranes, and serve as signals.",
    lesson:
      "Lipids are defined by what they lack: polarity. Because they are nonpolar, they don't mix with water — the same property that lets phospholipid bilayers partition the cell from its environment.\n\nTriglycerides are glycerol + three fatty acids joined by ester bonds. Saturated fatty acids (no C=C double bonds) pack tightly and are solid at room temperature; unsaturated fatty acids have kinks from cis double bonds and stay liquid. Fats store more than twice the energy per gram of carbohydrates because their C-H bonds are highly reduced — there's more energy to release when they are oxidized.\n\nPhospholipids are the membrane molecule: a glycerol backbone, two fatty acid tails (hydrophobic), and a phosphate head (hydrophilic). Amphipathic molecules like these self-assemble into bilayers in water because the tails exclude water while the heads face it — a purely entropic result that builds every membrane in every cell.\n\nSteroids (cholesterol, testosterone, estrogen) have four fused carbon rings. Cholesterol modulates membrane fluidity; the sex hormones are signaling molecules that cross membranes and bind intracellular receptors. Waxes are long-chain lipids that waterproof plant leaves and insect cuticles.",
    keyIdeas: [
      "Lipids are hydrophobic; fats store more energy per gram than carbs.",
      "Saturated = no C=C, packs tight, solid. Unsaturated = kinked, liquid.",
      "Phospholipids are amphipathic — polar head, nonpolar tails — and form bilayers spontaneously.",
      "Steroids (four rings) include cholesterol and sex hormones.",
    ],
    commonMistakes: [
      "Calling lipids polymers — they aren't; they're assembled but not from repeating identical monomers.",
      "Forgetting that phospholipid bilayer self-assembly is driven by the hydrophobic effect, not by any active process.",
      "Confusing cis (kinked) with trans (straight) unsaturated fats.",
    ],
  },
  "1.6": {
    id: "1.6",
    title: "Nucleic Acids",
    summary:
      "DNA and RNA are polymers of nucleotides whose sequence encodes heritable information for building proteins.",
    lesson:
      "A nucleotide has three parts: a pentose sugar (deoxyribose in DNA, ribose in RNA), a phosphate group, and a nitrogenous base. The bases are the four you will cite constantly: adenine and guanine are purines (double ring); cytosine and thymine (DNA) or uracil (RNA) are pyrimidines (single ring).\n\nNucleotides polymerize via phosphodiester bonds between the 3' OH of one sugar and the 5' phosphate of the next. That directionality is why we describe DNA as running 5' to 3' — enzymes like DNA polymerase only add nucleotides to a free 3' end. Two strands pair antiparallel via hydrogen bonds: A pairs with T (or U) using two bonds; G pairs with C using three bonds. GC-rich regions are therefore harder to separate — a detail that matters in replication and PCR.\n\nDNA is double-stranded and used for long-term information storage. RNA is single-stranded, more chemically reactive because of the 2' OH, and plays many roles (mRNA, tRNA, rRNA, regulatory RNAs). The phosphate backbone is negatively charged at physiological pH, which is why DNA migrates toward the positive electrode in gel electrophoresis.\n\nStructure dictates function: sequence codes information; complementarity enables replication and transcription; directionality constrains every polymerase in the cell.",
    keyIdeas: [
      "Nucleotide = sugar + phosphate + base.",
      "A–T (or A–U) = 2 H-bonds; G–C = 3 H-bonds — GC is more stable.",
      "Strands are antiparallel; DNA is read 5' → 3'.",
      "DNA is dsDNA for storage; RNA is single-stranded and functionally diverse.",
    ],
    commonMistakes: [
      "Mixing up purines (A, G) and pyrimidines (C, T, U).",
      "Forgetting the antiparallel orientation when drawing base pairs.",
      "Calling the phosphate backbone \"hydrophobic\" — it is negatively charged and hydrophilic.",
    ],
  },
  "1.7": {
    id: "1.7",
    title: "Proteins",
    summary:
      "Proteins are polymers of amino acids whose four levels of structure — primary, secondary, tertiary, quaternary — determine their function.",
    lesson:
      "An amino acid has an amino group, a carboxyl group, and a variable R-group attached to a central carbon. The R-group determines whether the amino acid is nonpolar, polar, acidic, or basic — i.e., how it will interact with water and with other amino acids when the chain folds.\n\nDehydration synthesis between the carboxyl of one amino acid and the amino group of the next forms a peptide bond. A chain of amino acids is a polypeptide; one or more folded polypeptides is a protein.\n\nFour levels of structure:\n1. Primary — the amino acid sequence itself, determined by the mRNA.\n2. Secondary — local folds stabilized by H-bonds between backbone atoms (α-helices and β-pleated sheets).\n3. Tertiary — the overall 3D fold stabilized by R-group interactions: H-bonds, ionic bonds, disulfide bridges (cysteine), and the hydrophobic effect pulling nonpolar R-groups inward.\n4. Quaternary — assembly of multiple polypeptides into a functional complex (hemoglobin's four subunits).\n\nWhen a protein denatures — from heat, pH change, or salt — the secondary, tertiary, and quaternary structure unravel, but the primary sequence (held by covalent peptide bonds) is unchanged. Function is lost because shape is lost; the enzyme active site, receptor binding pocket, or antibody CDR no longer fits its ligand. Sickle-cell anemia is the canonical example: one amino acid change (Glu → Val at position 6 of β-globin) turns soluble hemoglobin into polymerizing fibers that deform red blood cells.",
    keyIdeas: [
      "Amino acids share a backbone and differ by their R-group.",
      "Peptide bonds link amino acids; the sequence is primary structure.",
      "Secondary = backbone H-bonds (α-helix, β-sheet). Tertiary = R-group interactions. Quaternary = multiple subunits.",
      "Denaturation disrupts 2°/3°/4° but preserves primary sequence; function is lost with shape.",
    ],
    workedExample: {
      prompt:
        "Explain why a single amino acid substitution (Glu → Val) in β-hemoglobin causes sickle-cell anemia.",
      solution:
        "Glutamate has a negatively charged (polar) R-group; valine has a nonpolar R-group. Substituting Val for Glu at the surface of β-globin creates a hydrophobic patch. When hemoglobin is deoxygenated, that hydrophobic patch binds a complementary pocket on a neighboring hemoglobin, causing molecules to polymerize into fibers. The fibers distort red cells into the sickle shape, making them rigid and prone to clogging capillaries — a direct chain from primary-structure change to quaternary-structure aggregation to physiological dysfunction.",
    },
    commonMistakes: [
      "Saying denaturation breaks the primary structure — it doesn't; peptide bonds stay intact.",
      "Confusing the forces at each structure level — backbone H-bonds for 2°, R-group interactions for 3°.",
      "Forgetting that the hydrophobic effect is usually the dominant folding force.",
    ],
  },

  // =========================================================================
  // UNIT 2 — CELL STRUCTURE AND FUNCTION
  // =========================================================================
  "2.1": {
    id: "2.1",
    title: "Cell Structure and Function",
    summary:
      "Every organelle is a solution to a compartmentalization problem — separate environments that let incompatible reactions run in parallel.",
    lesson:
      "Eukaryotic cells divide labor across membrane-bound organelles. The nucleus stores DNA and keeps transcription separated from translation. Ribosomes — free in the cytosol or bound to the rough ER — read mRNA and build proteins. The rough ER folds and modifies secretory and membrane proteins; the smooth ER synthesizes lipids and detoxifies drugs. Vesicles shuttle cargo to the Golgi, which sorts, tags, and ships proteins. Mitochondria oxidize fuel to ATP via cellular respiration, and chloroplasts (in plants and algae) convert light to chemical energy via photosynthesis. Lysosomes digest cellular debris; peroxisomes break down fatty acids and detoxify reactive oxygen. Vacuoles store water, ions, and pigments; the central vacuole keeps plant cells turgid.\n\nProkaryotes lack these membrane-bound organelles but still specialize: the nucleoid holds a circular chromosome, ribosomes (smaller, 70S) translate, and many reactions localize to the plasma membrane or to membrane-less regions.\n\nThe unifying principle is compartmentalization. Enzymes that would interfere with each other (e.g., digestive hydrolases in a lysosome vs. cytoplasmic proteins) are kept apart. Gradients (H⁺ across the inner mitochondrial membrane) can only be maintained because the compartment has a barrier. Anywhere on the exam where you see an organelle, ask what incompatible reactions it is separating — that's the why.",
    keyIdeas: [
      "Organelles compartmentalize incompatible chemistry.",
      "Nucleus → DNA; rough ER/Golgi → secretory pathway; mitochondrion → ATP; chloroplast → photosynthesis.",
      "Lysosomes digest; peroxisomes detoxify; vacuoles store.",
      "Prokaryotes lack membrane-bound organelles but still organize reactions spatially.",
    ],
    commonMistakes: [
      "Memorizing organelles without explaining why their compartment matters.",
      "Calling ribosomes \"organelles\" in the bound-to-membrane sense — they are ribonucleoprotein complexes, not membrane-bound.",
      "Forgetting that the plasma membrane in prokaryotes often does the work of ER/mitochondria.",
    ],
  },
  "2.2": {
    id: "2.2",
    title: "Cell Size",
    summary:
      "Cells stay small because surface area grows as r² while volume grows as r³ — a mismatch that limits exchange with the environment.",
    lesson:
      "As a cell gets larger, its volume (where metabolism happens) grows faster than its surface area (where exchange happens). The surface-area-to-volume (SA:V) ratio therefore drops. At some size, the membrane can no longer import nutrients and export wastes fast enough to meet the cell's internal demand, so the cell either divides, dies, or adopts a specialized shape.\n\nReal cells work around this in multiple ways. Small cells simply stay small. Long, thin cells (neurons, root hair cells) and cells with finger-like projections (microvilli in the intestine) sacrifice compactness to keep SA:V high. Internal membranes (the ER, inner mitochondrial membrane) increase effective surface area without changing the cell's outer dimensions.\n\nOn the FRQ you may be asked to calculate SA:V for a cube or sphere and explain what the ratio predicts. The calculation is routine; the reasoning is the point. A small, flat, or highly folded cell can exchange; a large, spherical one cannot. This is why multicellularity is such a powerful strategy — it lets organisms be large without any single cell being large.",
    keyIdeas: [
      "SA scales as r²; volume scales as r³ — so SA:V drops as size increases.",
      "Small cells and folded shapes (microvilli, cristae) maintain a high SA:V.",
      "Low SA:V limits nutrient uptake and waste export.",
      "Multicellularity allows organisms to grow large without individual cells growing large.",
    ],
    workedExample: {
      prompt:
        "Compare the SA:V ratios of two cubic cells with side lengths 2 µm and 4 µm. Which one is better at exchange, and why?",
      solution:
        "Small cube: SA = 6(2²) = 24 µm²; V = 2³ = 8 µm³; SA:V = 3.0. Large cube: SA = 6(4²) = 96 µm²; V = 4³ = 64 µm³; SA:V = 1.5. The 2-µm cell has twice the surface area per unit volume, so it can exchange nutrients and wastes with its surroundings far more efficiently per unit of metabolism — the essential reason cells stay small.",
    },
    commonMistakes: [
      "Computing SA and V without dividing them — the ratio is what matters.",
      "Forgetting that cristae and microvilli are adaptations for SA:V, not decoration.",
      "Assuming larger cells are \"more advanced.\" They're not; they're constrained by exchange.",
    ],
  },
  "2.3": {
    id: "2.3",
    title: "Plasma Membrane",
    summary:
      "The fluid mosaic: a phospholipid bilayer studded with proteins, cholesterol, and carbohydrate tags that controls every entry and exit.",
    lesson:
      "The plasma membrane is a phospholipid bilayer with its hydrophilic heads facing the aqueous environment inside and outside the cell and its hydrophobic tails sandwiched in the middle. This arrangement forms spontaneously in water because it minimizes exposure of the tails to water — the hydrophobic effect does the work.\n\nEmbedded in the bilayer are proteins with specific jobs: transport proteins (channels and pumps), receptor proteins that bind signaling ligands, enzymes, anchor proteins that connect to the cytoskeleton, and cell-identity proteins that let the immune system recognize self. Carbohydrates attached to proteins (glycoproteins) and lipids (glycolipids) on the extracellular side act as molecular name tags for cell-cell recognition.\n\nCholesterol wedged between phospholipids buffers fluidity: at high temperatures it restricts movement; at low temperatures it prevents packing. Fatty acid saturation matters too — unsaturated tails kink and keep the membrane fluid; saturated tails pack and stiffen it. Cells in cold environments often increase unsaturation to maintain fluidity — a classic homeostasis example.\n\nThe whole structure is called the \"fluid mosaic\" for good reason: lipids and most proteins diffuse laterally within the bilayer, and the composition on the inner and outer leaflets is asymmetric (important for signaling and apoptosis recognition).",
    keyIdeas: [
      "Phospholipid bilayer + embedded proteins + cholesterol + surface carbohydrates.",
      "Hydrophobic effect drives bilayer self-assembly.",
      "Cholesterol buffers fluidity against temperature; unsaturated tails keep membranes fluid.",
      "Surface carbs and proteins handle cell-cell recognition.",
    ],
    commonMistakes: [
      "Drawing lipid tails facing outward — they always face inward, away from water.",
      "Saying cholesterol \"makes the membrane more fluid\" — it actually buffers against extremes.",
      "Forgetting that glycolipids and glycoproteins always face the extracellular side.",
    ],
  },
  "2.4": {
    id: "2.4",
    title: "Membrane Permeability",
    summary:
      "Small, nonpolar molecules cross the lipid bilayer freely; polar and charged species need protein help.",
    lesson:
      "Membrane permeability is a property of the bilayer: the hydrophobic interior is permeable to anything that is small and nonpolar. O₂, CO₂, and steroid hormones pass through with essentially no resistance. Small uncharged polar molecules like water and urea can trickle through slowly; larger polar molecules (glucose) and every ion essentially cannot cross unaided because the charged or polar surface cannot transit the hydrophobic core without an enormous energy cost.\n\nThat's why transport proteins exist. Channels provide a hydrophilic tunnel for ions and water (aquaporins); carrier proteins bind a specific solute and undergo a conformational change to release it on the other side. Pumps do the same but couple the motion to ATP hydrolysis to move things against their gradients.\n\nPermeability is not a fixed property — cells can change it. Aquaporin expression in kidney collecting ducts is regulated by ADH, letting the body fine-tune water reabsorption. Ion channels open and close in response to voltage, ligand binding, or mechanical stress. The bilayer sets the rules; the proteins enforce — and bend — them.",
    keyIdeas: [
      "Small, nonpolar molecules diffuse through the bilayer freely.",
      "Small polar molecules move slowly; large polar molecules and ions essentially do not cross alone.",
      "Channels and carriers provide polar pathways through the membrane.",
      "Permeability is regulated — the cell can open or close specific channels as needed.",
    ],
    commonMistakes: [
      "Calling water \"freely permeable\" — it actually moves much faster via aquaporins than through the bare bilayer.",
      "Assuming size is the only factor — polarity matters at least as much.",
      "Ignoring that regulation of channel expression is a homeostasis mechanism.",
    ],
  },
  "2.5": {
    id: "2.5",
    title: "Membrane Transport",
    summary:
      "Passive transport follows the gradient (no ATP); active transport pushes against it (requires energy).",
    lesson:
      "Passive transport moves solutes down their concentration gradient. Simple diffusion handles nonpolar molecules through the bilayer; facilitated diffusion uses channels and carrier proteins to move polar solutes and ions down-gradient without energy input. Osmosis is the diffusion of water across a selectively permeable membrane from low to high solute concentration — really just water moving down its own gradient.\n\nActive transport moves solutes against their concentration gradient, which costs energy. Primary active transport couples transport directly to ATP hydrolysis (the sodium-potassium pump moves 3 Na⁺ out and 2 K⁺ in per ATP). Secondary active transport uses the gradient set up by a primary pump to drive another solute against its gradient — the Na⁺/glucose symporter in the intestine is the textbook example.\n\nBulk transport moves large quantities at once: endocytosis (phagocytosis, pinocytosis, receptor-mediated) brings material in; exocytosis ships it out. These are vesicle-based and require energy for membrane remodeling.\n\nOn the FRQ, always state the direction relative to the gradient and whether ATP is involved. \"Moves glucose across the membrane\" is not enough — the rubric wants \"against the gradient via secondary active transport coupled to the Na⁺ gradient.\"",
    keyIdeas: [
      "Passive transport = down gradient, no ATP. Active transport = against gradient, requires ATP (directly or indirectly).",
      "Facilitated diffusion uses channels/carriers but is still passive.",
      "The Na⁺/K⁺ pump (3 out, 2 in, 1 ATP) sets up gradients that power secondary active transport.",
      "Endocytosis and exocytosis move bulk cargo and require energy.",
    ],
    commonMistakes: [
      "Labeling facilitated diffusion as active — it isn't; it's protein-mediated but still down-gradient.",
      "Forgetting that secondary active transport still ultimately requires ATP (upstream).",
      "Confusing tonicity with concentration in osmosis problems.",
    ],
  },
  "2.6": {
    id: "2.6",
    title: "Facilitated Diffusion",
    summary:
      "Channels and carriers give polar solutes a protein-lined path through the membrane — passive because no ATP is spent.",
    lesson:
      "Facilitated diffusion is passive transport through a protein. It exists because polar solutes and ions cannot cross the hydrophobic bilayer interior on their own. A channel protein forms a continuous hydrophilic pore: ion channels select by size and charge (the K⁺ channel is selective because its carbonyl oxygens mimic the hydration shell of K⁺ but not Na⁺); aquaporins form water-specific pores.\n\nCarrier proteins work differently: they bind a solute on one side, undergo a conformational change, and release it on the other side. GLUT family transporters move glucose this way. Carriers saturate — there is a limited number of them, so at high solute concentration, transport rate plateaus (analogous to enzyme Vmax). Channels don't saturate the same way because solutes pass through without specific binding.\n\nWhether a solute moves in or out depends only on its electrochemical gradient (concentration + charge). Regulation happens by controlling how many channels are open, which is where ligand-gated and voltage-gated channels come in — they make membrane permeability programmable.",
    keyIdeas: [
      "Facilitated diffusion is passive: no ATP, solute moves down gradient.",
      "Channels form continuous pores; carriers bind, flip, and release.",
      "Carriers saturate at high substrate concentration; channels mostly don't.",
      "Gated channels let the cell control when facilitated diffusion happens.",
    ],
    commonMistakes: [
      "Calling it active transport because it uses a protein.",
      "Assuming channels carry everything — they are highly selective.",
      "Forgetting that ion movement depends on both concentration AND charge gradients.",
    ],
  },
  "2.7": {
    id: "2.7",
    title: "Tonicity and Osmoregulation",
    summary:
      "Hypotonic, isotonic, hypertonic — tonicity is about water's tendency to enter or leave the cell, and cells have evolved ways to manage it.",
    lesson:
      "Tonicity describes a solution's effect on a cell's water content relative to the cell's cytoplasm. In a hypotonic environment (lower solute outside), water flows in and the cell swells — and without a wall, bursts. In a hypertonic environment (higher solute outside), water leaves and the cell shrinks. In isotonic, there is no net water movement.\n\nOrganisms manage tonicity constantly. Freshwater protists live in hypotonic surroundings and would bloat without contractile vacuoles that pump excess water out. Plant cells sit in hypotonic soil water by design: water enters, the central vacuole swells, and the cell pushes against the rigid cell wall to create turgor pressure — the reason plants stand upright. In a hypertonic environment, plants plasmolyze (membrane pulls away from the wall) and wilt.\n\nAnimal cells have no wall, so osmoregulation is tightly controlled. Kidneys match urine concentration to water balance; marine fish continuously drink seawater and excrete salt; freshwater fish excrete copious dilute urine. The theme is that water moves by osmosis, and every organism has a strategy for the tonicity of its environment.",
    keyIdeas: [
      "Hypotonic → water in; hypertonic → water out; isotonic → balanced.",
      "Plant cells thrive when slightly hypotonic (turgor); animal cells require isotonic blood.",
      "Contractile vacuoles pump water out in hypotonic protists.",
      "Tonicity describes the destination of water, not absolute solute amount.",
    ],
    workedExample: {
      prompt:
        "A plant cell placed in a strongly hypertonic salt solution wilts and becomes flaccid. Explain at the cellular level what happened.",
      solution:
        "Water inside the central vacuole has a lower solute concentration than the surrounding hypertonic solution, so water leaves the vacuole by osmosis. The vacuole shrinks, turgor pressure is lost, the plasma membrane pulls away from the cell wall (plasmolysis), and the tissue can no longer support itself mechanically — hence wilting.",
    },
    commonMistakes: [
      "Confusing tonicity with osmolarity — tonicity accounts only for solutes that cannot cross the membrane.",
      "Forgetting plant cells want slight hypotonic conditions (for turgor), not isotonic.",
      "Saying water \"moves toward higher concentration\" without specifying of solutes, not water.",
    ],
  },
  "2.8": {
    id: "2.8",
    title: "Mechanisms of Transport",
    summary:
      "Active transport pumps, co-transporters, and bulk transport by endocytosis/exocytosis all require the cell to spend energy.",
    lesson:
      "Active transport costs ATP — either spent directly (primary) or stored in a gradient created by an earlier ATP-driven pump (secondary). The Na⁺/K⁺ pump is the universal reference: it exports 3 Na⁺ and imports 2 K⁺ per ATP, maintaining the electrochemical gradient every animal cell depends on. The proton pump (H⁺-ATPase) does the same in plant, fungal, and bacterial cells.\n\nCo-transporters harness those gradients. Symporters move two solutes in the same direction (Na⁺ and glucose together in intestinal epithelium); antiporters move two solutes in opposite directions (Na⁺ in, H⁺ out, in the stomach lining and kidney tubules). Secondary active transport is \"free\" only in the local sense; somewhere upstream, ATP was spent to make the gradient.\n\nBulk transport moves large cargo. Phagocytosis (\"cell eating\") engulfs large particles; pinocytosis (\"cell drinking\") takes up extracellular fluid; receptor-mediated endocytosis binds specific ligands via surface receptors, pinches off a vesicle, and delivers it to a lysosome or other compartment. Exocytosis is the reverse — secretory vesicles fuse with the plasma membrane to release contents and integrate new membrane proteins at the same time.",
    keyIdeas: [
      "Active transport is against-gradient; secondary active transport rides a primary gradient.",
      "Na⁺/K⁺ pump and H⁺-ATPase are the workhorse primary pumps.",
      "Symporter = same direction; antiporter = opposite direction.",
      "Endocytosis/exocytosis move bulk cargo via vesicles and cost energy too.",
    ],
    commonMistakes: [
      "Forgetting the stoichiometry of the Na⁺/K⁺ pump (3:2, not 1:1).",
      "Calling secondary active transport \"passive\" — it's still against a gradient.",
      "Mixing up phagocytosis (solids) and pinocytosis (liquids).",
    ],
  },
  "2.9": {
    id: "2.9",
    title: "Cell Compartmentalization",
    summary:
      "Membrane-bound organelles let eukaryotes run many incompatible reactions simultaneously in separate microenvironments.",
    lesson:
      "Compartmentalization is the reason eukaryotic cells can specialize. Lysosomes hold pH 5 and hydrolytic enzymes that would destroy the cell if they were free in the cytoplasm. Mitochondria maintain a sharp H⁺ gradient across the inner membrane — impossible without a sealed compartment. The nucleus physically separates transcription from translation, allowing mRNA processing (splicing, capping, poly-A tail) to occur before the mRNA meets a ribosome.\n\nEach organelle has local enzymes and local conditions. The smooth ER hosts lipid synthesis; the rough ER folds membrane and secretory proteins and tags misfolded ones for destruction. The Golgi receives ER vesicles, further modifies proteins (glycosylation), and sorts them to their destinations. Peroxisomes handle reactive-oxygen-generating reactions where containment matters. Chloroplasts use stacked thylakoid membranes to maximize photosynthetic surface area and to separate the light reactions from the Calvin cycle.\n\nCompartmentalization also enables efficient substrate channeling: intermediates generated in one reaction remain local, increasing the effective concentration and the rate of the next reaction. The price is that the cell must run an elaborate logistics system (protein targeting sequences, vesicle trafficking, membrane contact sites) to deliver the right molecules to the right compartment.",
    keyIdeas: [
      "Compartments let incompatible reactions coexist within one cell.",
      "Organelles keep ions, pH, and enzymes locally concentrated.",
      "Protein targeting signals route each molecule to its correct compartment.",
      "Compartmentalization is the architectural reason for eukaryotic metabolic complexity.",
    ],
    commonMistakes: [
      "Treating organelles as separate entities rather than a connected logistics network.",
      "Forgetting that internal folding (cristae, thylakoids) amplifies compartmentalization.",
      "Ignoring that prokaryotes still compartmentalize via membrane regions, just without membrane-bound organelles.",
    ],
  },
  "2.10": {
    id: "2.10",
    title: "Origins of Cell Compartmentalization",
    summary:
      "Endosymbiotic theory explains mitochondria and chloroplasts as descendants of engulfed prokaryotes.",
    lesson:
      "Mitochondria and chloroplasts are too similar to bacteria to be an accident. They have their own circular DNA, their own 70S ribosomes, and double membranes where the inner membrane resembles a bacterial plasma membrane. They divide by binary fission, independent of the cell's cell cycle. The endosymbiotic theory — championed by Lynn Margulis — proposes that these organelles descend from free-living prokaryotes that were engulfed by an ancestral eukaryote and retained as permanent partners. Mitochondria trace to an α-proteobacterium; chloroplasts to a cyanobacterium.\n\nThis single idea explains a lot. It explains why the electron transport chains of mitochondria and chloroplasts are membrane-embedded (the inner membrane is the bacterial legacy). It explains why antibiotics targeting bacterial ribosomes can have side effects on mitochondria. It predicts — correctly — that some proteins of these organelles are encoded in the nuclear genome (imported after evolution transferred genes to the host).\n\nThe rest of the endomembrane system (ER, Golgi, nuclear envelope) likely arose by infolding of the ancestral plasma membrane. The current arrangement — compartments that bud, fuse, and exchange cargo — is a product of both endosymbiosis and membrane invagination over more than a billion years.",
    keyIdeas: [
      "Mitochondria and chloroplasts have their own DNA, ribosomes, and double membranes — evidence of endosymbiosis.",
      "They divide by binary fission, independent of host cell division.",
      "Antibiotics targeting bacterial ribosomes can harm mitochondria — a functional legacy.",
      "The endomembrane system likely arose from plasma membrane infoldings.",
    ],
    commonMistakes: [
      "Claiming mitochondria \"evolved from\" chloroplasts or vice versa — they had separate ancestors.",
      "Saying organelle DNA is linear like the nucleus's — it is circular like bacteria's.",
      "Forgetting the double-membrane evidence (outer = host, inner = engulfed bacterium).",
    ],
  },

  // =========================================================================
  // UNIT 3 — CELLULAR ENERGETICS
  // =========================================================================
  "3.1": {
    id: "3.1",
    title: "Enzymes",
    summary:
      "Enzymes are protein (or RNA) catalysts that lower the activation energy of specific reactions by stabilizing the transition state.",
    lesson:
      "Every metabolic reaction in the cell is too slow to sustain life without catalysis. Enzymes solve that problem. They don't change the equilibrium of the reaction or the overall ΔG; they simply lower the activation energy so the reaction proceeds fast enough.\n\nMechanistically, enzymes bind a substrate at the active site. The active site is a 3D pocket shaped — more or less — to fit the substrate. The once-favored lock-and-key model has been refined to induced fit: substrate binding causes the enzyme to adjust its shape so its catalytic residues are positioned to stabilize the transition state. Lowering the transition-state energy is what lowers activation energy.\n\nEnzymes are specific. A protease cleaves peptide bonds; it doesn't touch phosphodiester bonds. Specificity comes from complementary shape and chemistry between active site and substrate. Enzymes are also reusable — after products leave, the enzyme returns to its original state.\n\nKey vocab: substrate (input), product (output), active site (where binding and catalysis happen). Regulation is pervasive: cells control enzyme activity by turning genes on/off, by covalent modification (phosphorylation), and by allosteric binding at sites distant from the active site.",
    keyIdeas: [
      "Enzymes lower activation energy; they don't change ΔG or the equilibrium.",
      "Induced-fit binding at the active site stabilizes the transition state.",
      "Enzymes are specific, reusable, and regulated.",
      "Most enzymes are proteins; some (ribozymes) are RNA.",
    ],
    commonMistakes: [
      "Saying enzymes \"make reactions go forward\" — they accelerate both forward and reverse.",
      "Confusing activation energy with ΔG.",
      "Forgetting the difference between lock-and-key (rigid) and induced fit (flexible).",
    ],
  },
  "3.2": {
    id: "3.2",
    title: "Environmental Impacts on Enzyme Function",
    summary:
      "Temperature, pH, and inhibitors shift enzyme activity by changing shape or blocking the active site.",
    lesson:
      "Enzymes have an optimal temperature and pH where activity is highest. Below the optimum, molecular collisions are too infrequent — activity is sluggish. Above the optimum, thermal motion disrupts the H-bonds and R-group interactions that hold the tertiary structure together; the enzyme denatures and loses function. Human enzymes peak near 37 °C; hyperthermophile enzymes peak near 90 °C because they evolved under different selection pressure.\n\npH shifts protonation states of R-groups, particularly acidic and basic ones in the active site. Shift them and the active site loses the charges it needs for catalysis. Pepsin works at stomach pH ~2; trypsin at intestinal pH ~8. Push pepsin to pH 8 and it unfolds; do the reverse for trypsin.\n\nInhibitors come in two main flavors. Competitive inhibitors mimic the substrate and bind the active site — they can be outcompeted by adding more substrate. Non-competitive (allosteric) inhibitors bind elsewhere and change the enzyme's shape, which lowers activity regardless of substrate concentration. Allosteric activators do the opposite. Cells exploit these mechanisms in feedback regulation: the end product of a pathway often allosterically inhibits the first committed enzyme to prevent overproduction.",
    keyIdeas: [
      "Each enzyme has an optimum temperature and pH; extremes denature it.",
      "Competitive inhibitors bind the active site and can be outcompeted by substrate.",
      "Non-competitive/allosteric inhibitors bind elsewhere and cannot be outcompeted.",
      "Feedback inhibition shuts off pathways when the end product accumulates.",
    ],
    workedExample: {
      prompt:
        "An enzyme's reaction rate drops when an inhibitor is added. Adding more substrate completely restores the rate. What type of inhibition is this?",
      solution:
        "Competitive inhibition. Because the inhibitor competes with the substrate for the active site, raising substrate concentration shifts the equilibrium of binding toward substrate, and Vmax is eventually restored — the defining signature of competitive inhibition versus non-competitive (in which Vmax cannot be restored regardless of substrate concentration).",
    },
    commonMistakes: [
      "Saying denaturation breaks peptide bonds — it doesn't.",
      "Assuming inhibitors are always bad — cells use them for regulation constantly.",
      "Forgetting that Vmax is restored only in competitive inhibition.",
    ],
  },
  "3.3": {
    id: "3.3",
    title: "Cellular Energy",
    summary:
      "ATP is the universal energy currency; its hydrolysis drives unfavorable reactions by coupling them to a favorable one.",
    lesson:
      "Cells need energy in a form that can be deployed on demand. That form is ATP — adenosine triphosphate. ATP stores energy in the phosphoanhydride bonds between its three phosphates. Hydrolyzing the terminal phosphate yields ADP + Pᵢ and releases roughly 7.3 kcal/mol under standard conditions (much more under cellular conditions).\n\nATP is the currency, not the bank. Cells don't stockpile it; they regenerate it from ADP as fast as it's consumed. The trick that makes ATP useful is energy coupling. An endergonic reaction (ΔG > 0) is joined to ATP hydrolysis (ΔG << 0) so that the combined reaction is exergonic overall. This is how cells build macromolecules, pump ions against gradients, and power muscle contraction.\n\nThe first law of thermodynamics says energy is conserved — cells convert energy from form to form but do not create it. The second law says every energy conversion increases the entropy of the universe. Living systems stay locally ordered only by continuously dumping disorder (heat, waste) into their surroundings. Metabolism is the engine that does this work, and ATP is the coin it spends.",
    keyIdeas: [
      "ATP stores usable energy in its terminal phosphate bonds.",
      "Hydrolysis of ATP → ADP + Pᵢ releases energy used to drive endergonic reactions.",
      "Energy coupling lets unfavorable reactions proceed when paired with ATP hydrolysis.",
      "The cell regenerates ATP continuously — it is a currency, not a reservoir.",
    ],
    commonMistakes: [
      "Calling ATP \"high energy\" in a way that implies huge absolute energy content — it is the context (cellular conditions + coupling) that matters.",
      "Confusing ATP with ADP on diagrams.",
      "Forgetting that thermodynamics limits what metabolism can do, even with enzymes.",
    ],
  },
  "3.4": {
    id: "3.4",
    title: "Photosynthesis",
    summary:
      "Plants and algae use light to split water and reduce CO₂ into sugar via the light reactions (ATP + NADPH) and the Calvin cycle (sugar).",
    lesson:
      "Photosynthesis runs in chloroplasts and converts light energy into chemical energy stored in glucose. It has two stages.\n\nThe light reactions happen in the thylakoid membranes. Chlorophyll in photosystem II absorbs a photon, ejects an excited electron, and replaces it by splitting water — which releases O₂ as a byproduct. The electron travels down an electron transport chain, pumping H⁺ into the thylakoid lumen. Photosystem I re-excites the electron using another photon and passes it to NADP⁺, forming NADPH. The resulting H⁺ gradient drives ATP synthesis via chemiosmosis (ATP synthase). Products: ATP, NADPH, O₂.\n\nThe Calvin cycle (light-independent reactions) runs in the stroma. CO₂ is fixed onto RuBP by the enzyme rubisco, yielding 3-carbon PGA. PGA is reduced using ATP and NADPH to G3P, some of which leaves the cycle to build glucose while the rest regenerates RuBP. Three turns fix three CO₂ and yield one net G3P; six turns yield one glucose.\n\nBoth stages matter, and the exam wants you to see the flow: light → excited electron → ATP and NADPH → reducing power for carbon fixation → sugar. Anywhere in that chain can be disrupted, and a good FRQ often asks what happens if one piece fails.",
    keyIdeas: [
      "Light reactions: H₂O split, O₂ released, ATP + NADPH produced in thylakoid membranes.",
      "Calvin cycle: CO₂ fixed by rubisco onto RuBP, reduced to G3P using ATP and NADPH.",
      "Chemiosmosis: H⁺ gradient across thylakoid membrane drives ATP synthase.",
      "Overall: 6 CO₂ + 6 H₂O + light → C₆H₁₂O₆ + 6 O₂.",
    ],
    commonMistakes: [
      "Saying O₂ comes from CO₂ — it comes from splitting H₂O.",
      "Confusing photosystems I and II (II feeds I; the numbers reflect discovery order, not flow).",
      "Forgetting that the Calvin cycle needs the products of the light reactions — if the lights go off, the cycle stops when ATP/NADPH run out.",
    ],
  },
  "3.5": {
    id: "3.5",
    title: "Cellular Respiration",
    summary:
      "Cells oxidize glucose to CO₂ and water through glycolysis, pyruvate oxidation, the Krebs cycle, and oxidative phosphorylation.",
    lesson:
      "Cellular respiration is how heterotrophs — and autotrophs in the dark — extract energy from glucose. The goal is to transfer high-energy electrons from glucose, step by step, to O₂, capturing that energy in ATP along the way.\n\nGlycolysis (cytoplasm) splits glucose (6C) into two pyruvate (3C) molecules, netting 2 ATP and 2 NADH. No oxygen required. Pyruvate oxidation (mitochondrial matrix) converts each pyruvate to acetyl-CoA, releasing CO₂ and producing NADH. The Krebs (citric acid) cycle oxidizes acetyl-CoA fully to CO₂, yielding 3 NADH, 1 FADH₂, and 1 ATP per acetyl-CoA — so 6 NADH, 2 FADH₂, and 2 ATP per glucose.\n\nOxidative phosphorylation is where most ATP comes from. NADH and FADH₂ deposit electrons at complexes I and II of the electron transport chain. Electrons flow through the chain to O₂ (the final electron acceptor), reducing it to H₂O. The energy released pumps H⁺ from matrix to intermembrane space, setting up a proton gradient. ATP synthase harnesses the flow of H⁺ back into the matrix to phosphorylate ADP → ATP — chemiosmosis, same principle as in photosynthesis. A full glucose yields roughly 30–32 ATP.\n\nWithout O₂, the ETC backs up and NAD⁺ runs out. Fermentation regenerates NAD⁺ from NADH so glycolysis can keep running: lactic acid fermentation in animal muscle, alcoholic fermentation in yeast. Far less ATP, but it keeps the cell alive.",
    keyIdeas: [
      "Four stages: glycolysis, pyruvate oxidation, Krebs cycle, oxidative phosphorylation.",
      "O₂ is the final electron acceptor in aerobic respiration.",
      "Most ATP comes from chemiosmosis through ATP synthase, driven by the H⁺ gradient.",
      "Fermentation regenerates NAD⁺ so glycolysis can continue when O₂ is absent.",
    ],
    workedExample: {
      prompt:
        "A researcher blocks ATP synthase with an inhibitor. What happens to the H⁺ gradient across the inner mitochondrial membrane, and what happens to O₂ consumption?",
      solution:
        "H⁺ cannot flow back to the matrix, so the gradient keeps building. The growing gradient raises the energy cost of pumping, so the electron transport chain slows and eventually halts. Because O₂ is the terminal electron acceptor of a stalled ETC, O₂ consumption drops to near zero. ATP synthesis also ceases — the reason ATP synthase inhibitors (oligomycin) are lethal.",
    },
    commonMistakes: [
      "Forgetting that the majority of ATP is made by oxidative phosphorylation, not the Krebs cycle.",
      "Confusing the mitochondrial matrix (site of Krebs) with the intermembrane space (H⁺ reservoir).",
      "Saying fermentation \"makes ATP\" — it doesn't; it regenerates NAD⁺ so glycolysis can keep producing ATP.",
    ],
  },

  // =========================================================================
  // UNIT 4 — CELL COMMUNICATION AND CELL CYCLE
  // =========================================================================
  "4.1": {
    id: "4.1",
    title: "Cell Communication",
    summary:
      "Cells signal through direct contact, short-range local signaling, and long-range hormones — all converging on receptor binding.",
    lesson:
      "Cells must coordinate. Signaling lets them do it. There are four broad modes. Direct contact (gap junctions in animals, plasmodesmata in plants) lets adjacent cells share small molecules and electrical signals. Cell-cell recognition uses surface molecules — MHC proteins, for example — so immune cells can distinguish self from non-self. Local signaling uses paracrine messengers (growth factors) that diffuse only to nearby cells, or synaptic neurotransmitters that cross a micron-wide cleft. Long-distance signaling uses hormones carried by blood (or by vascular tissue in plants).\n\nEvery mode depends on receptor proteins that bind a specific ligand. The specificity of the receptor determines which cells respond. Insulin binds only cells with insulin receptors; estrogen crosses membranes and binds intracellular receptors that act as transcription factors. If the right cell has the right receptor, the message gets through; without the receptor, the same molecule is ignored.\n\nThe evolutionary theme is that the core machinery is ancient and conserved. Quorum sensing in bacteria — cells releasing small molecules that build up until a population threshold is reached — looks, at a molecular level, a lot like hormone signaling in multicellular organisms. Signaling came before multicellularity and underwrote its evolution.",
    keyIdeas: [
      "Four modes: direct contact, local (paracrine/synaptic), long-distance (endocrine), and cell-cell recognition.",
      "Every signal requires a receptor; specificity is set by which receptors a cell expresses.",
      "Quorum sensing shows signaling predates multicellularity.",
      "Without the right receptor, the signal produces no response.",
    ],
    commonMistakes: [
      "Confusing paracrine with endocrine — paracrine is short-range, endocrine is blood-borne.",
      "Forgetting gap junctions (animal) and plasmodesmata (plant) as direct-contact channels.",
      "Ignoring the role of receptor expression in tissue specificity.",
    ],
  },
  "4.2": {
    id: "4.2",
    title: "Introduction to Signal Transduction",
    summary:
      "Reception, transduction, response: the three stages by which an extracellular signal becomes a cellular change.",
    lesson:
      "Signal transduction has three stages. Reception is ligand binding to a specific receptor. Transduction is the relay — a cascade of events inside the cell that amplifies and specifies the signal. Response is the cellular change: altered gene expression, enzyme activity, cytoskeletal rearrangement, or secretion.\n\nReceptor classes matter. G-protein-coupled receptors (GPCRs) are the largest family; ligand binding activates a G-protein that then activates or inhibits downstream enzymes. Receptor tyrosine kinases (RTKs) dimerize on ligand binding and phosphorylate each other, creating docking sites for relay proteins. Ligand-gated ion channels open or close in response to ligand binding, directly changing membrane potential. Intracellular receptors bind small, hydrophobic ligands (steroid hormones, thyroid hormone) that crossed the membrane on their own; the receptor-ligand complex usually acts directly on DNA.\n\nAmplification is the payoff of a transduction cascade. One receptor activates many G-proteins; each activated enzyme makes many second messengers; each second messenger activates many downstream kinases. A single hormone molecule can trigger a response involving millions of product molecules.",
    keyIdeas: [
      "Three stages: reception, transduction, response.",
      "Four receptor types: GPCRs, RTKs, ion channels, intracellular receptors.",
      "Transduction cascades amplify the signal by orders of magnitude.",
      "Intracellular receptors act as transcription factors once bound.",
    ],
    commonMistakes: [
      "Forgetting that intracellular receptors require lipid-soluble ligands.",
      "Treating transduction as a single-step \"signal\" — it is multi-step and amplified.",
      "Confusing GPCR and RTK mechanisms on the FRQ.",
    ],
  },
  "4.3": {
    id: "4.3",
    title: "Signal Transduction Pathways",
    summary:
      "Phosphorylation cascades and second messengers like cAMP and Ca²⁺ relay, amplify, and specify intracellular signals.",
    lesson:
      "Phosphorylation cascades are the bread and butter of signal transduction. Kinases (add phosphate) turn each other on in a chain; phosphatases (remove phosphate) turn them off. The cascade amplifies the signal and gives cells exquisite control over where and when it runs.\n\nSecond messengers carry signals through the cytoplasm. cAMP, made by adenylyl cyclase downstream of GPCRs, activates protein kinase A. cGMP works similarly in smooth muscle relaxation (think Viagra). Calcium ions are released from the ER via IP₃-gated channels and from the extracellular space via voltage- or ligand-gated channels; Ca²⁺ binds calmodulin or troponin to trigger muscle contraction, neurotransmitter release, and gene expression. DAG and IP₃ are lipid/messenger pairs from PIP₂ cleavage.\n\nAmplification, branching, and cross-talk. A single extracellular ligand can trigger multiple parallel cascades that interact — cross-talk — to integrate many signals into a single response. Cells use scaffolding proteins to assemble cascade components locally so the right substrates get phosphorylated and not random ones.\n\nDisease connection: Cholera toxin locks the Gs protein on, flooding intestinal epithelial cells with cAMP, opening Cl⁻ channels, and causing catastrophic water loss. Every element of a transduction cascade can be — and is — drug-targeted.",
    keyIdeas: [
      "Kinase cascades add phosphates; phosphatases remove them — reversibility allows control.",
      "cAMP, Ca²⁺, IP₃, DAG are the classic second messengers.",
      "Signal amplification can turn one ligand into millions of effector molecules.",
      "Cross-talk and scaffolding integrate and localize signaling.",
    ],
    commonMistakes: [
      "Assuming kinases are always activating — in some pathways phosphorylation inactivates.",
      "Forgetting calcium is stored in the ER (and mitochondria), not just outside the cell.",
      "Writing \"the signal\" as a single molecule without showing the amplification step.",
    ],
  },
  "4.4": {
    id: "4.4",
    title: "Feedback",
    summary:
      "Negative feedback stabilizes; positive feedback amplifies — two building blocks behind every homeostatic system.",
    lesson:
      "Feedback is how systems regulate themselves. Negative feedback produces a response that opposes the original change. If body temperature rises, vasodilation and sweating cool you down; as temperature falls back to setpoint, the response turns off. Blood glucose regulation by insulin (lowers glucose) and glucagon (raises glucose) is classic negative feedback.\n\nPositive feedback amplifies the original change. Labor contractions trigger oxytocin release, which causes more intense contractions and more oxytocin — terminating only with delivery. Blood clotting accelerates itself until a clot is complete. Positive feedback is less common because unchecked amplification tends to be dangerous; it almost always has an explicit endpoint or shut-off.\n\nWhen analyzing a system on the FRQ, name the stimulus, the sensor (receptor), the integrator (often the brain or a signaling hub), and the effector that carries out the response. State explicitly whether the response opposes or amplifies the stimulus. That four-part framework keeps your answers structured and rubric-friendly.",
    keyIdeas: [
      "Negative feedback opposes change → stability/homeostasis.",
      "Positive feedback amplifies change → rapid, decisive events (birth, clotting).",
      "Homeostatic systems have stimulus, sensor, integrator, effector.",
      "Positive feedback always has a defined endpoint; otherwise runaway is fatal.",
    ],
    commonMistakes: [
      "Calling a response negative feedback just because it \"feels bad\" — the definition is about direction, not valence.",
      "Missing the endpoint of positive feedback loops.",
      "Skipping the sensor/effector labels on FRQ.",
    ],
  },
  "4.5": {
    id: "4.5",
    title: "Cell Cycle",
    summary:
      "Cells grow, replicate DNA, and divide in a strict sequence — G₁, S, G₂, M — with checkpoints ensuring each step finishes before the next starts.",
    lesson:
      "The cell cycle has two major phases: interphase and mitosis. Interphase itself splits into G₁ (growth), S (DNA synthesis — each chromosome is replicated into two sister chromatids), and G₂ (more growth, preparation for division). Most cells spend most of their lives in interphase.\n\nMitosis is the nuclear division phase: prophase (chromosomes condense, nuclear envelope breaks down, spindle forms), metaphase (chromosomes align at the metaphase plate), anaphase (sister chromatids separate and move to opposite poles), telophase (chromosomes decondense, nuclear envelopes reform). Cytokinesis — division of the cytoplasm — usually overlaps late mitosis, pinching the cell in two (animal) or building a cell plate (plant).\n\nMitosis produces two genetically identical daughter cells from one parent cell. It's how multicellular organisms grow, how tissues repair, and how many unicellular eukaryotes reproduce. Contrast with meiosis (two divisions, haploid gametes, with recombination) covered in Unit 5.\n\nThe outcome of mitosis is reliability: each daughter gets a full copy of the parent genome. That reliability depends on accurate DNA replication in S phase and accurate chromosome segregation in M phase — any failure produces aneuploidy (missing or extra chromosomes), which is usually fatal or cancerous.",
    keyIdeas: [
      "Cell cycle: G₁ → S (DNA replicated) → G₂ → M (mitosis + cytokinesis).",
      "Mitosis: prophase, metaphase, anaphase, telophase.",
      "Mitosis yields two genetically identical diploid daughter cells.",
      "Reliability requires accurate replication (S) and segregation (M).",
    ],
    commonMistakes: [
      "Confusing S phase (DNA replication) with M phase (chromosome segregation).",
      "Forgetting that sister chromatids are identical copies joined at the centromere.",
      "Mixing up mitosis and meiosis — mitosis keeps ploidy, meiosis halves it.",
    ],
  },
  "4.6": {
    id: "4.6",
    title: "Regulation of Cell Cycle",
    summary:
      "Checkpoints at G₁/S, G₂/M, and M-phase ensure the cell divides only when conditions are right — and cancer is what happens when they fail.",
    lesson:
      "The cell cycle is driven by cyclins (whose levels rise and fall) and cyclin-dependent kinases (CDKs, whose activity is turned on by binding the right cyclin). Specific cyclin-CDK pairs drive the transitions: at G₁/S, the cell decides whether to commit to division; at G₂/M, it verifies DNA replication succeeded; during mitosis, the spindle assembly checkpoint confirms all chromosomes are properly attached before anaphase begins.\n\nCheckpoints are interrogations. Is the DNA undamaged? (If not, p53 arrests the cycle or triggers apoptosis.) Has DNA replicated fully? Are chromosomes attached to the spindle? Is nutrient supply sufficient? If any answer is no, the cell pauses or exits the cycle into G₀.\n\nCancer arises when these checkpoints fail. Mutations in proto-oncogenes (like Ras) lock cell cycle go-signals on; mutations in tumor suppressors (p53, Rb) knock out the checkpoints. The result is unchecked division. Cancer is, mechanistically, a cell-cycle regulation failure — which is why studying the cycle is studying the disease.\n\nGrowth factors are external inputs into this machinery. They bind receptors on the cell surface, trigger signaling cascades (Unit 4.3), and push the cell through G₁. Without growth factors, most cells stay quiescent in G₀.",
    keyIdeas: [
      "Cyclins + CDKs drive cell cycle transitions.",
      "Checkpoints at G₁/S, G₂/M, and M verify readiness before progression.",
      "p53 halts or kills cells with damaged DNA.",
      "Cancer = broken checkpoints + constitutive go-signals (oncogenes + tumor suppressor loss).",
    ],
    commonMistakes: [
      "Saying cyclins are the active kinases — they are regulatory; CDKs are the kinases.",
      "Confusing tumor suppressors with oncogenes — loss of tumor suppressors is bad; gain-of-function in oncogenes is bad.",
      "Forgetting that G₀ is a reversible exit from the cycle, not a phase of it.",
    ],
  },

  // =========================================================================
  // UNIT 5 — HEREDITY
  // =========================================================================
  "5.1": {
    id: "5.1",
    title: "Meiosis",
    summary:
      "Two rounds of division from one diploid cell produce four haploid gametes — the cellular foundation of sexual reproduction.",
    lesson:
      "Meiosis reduces chromosome number from diploid (2n) to haploid (n) in two sequential divisions.\n\nMeiosis I separates homologous chromosomes. In prophase I, homologs pair (synapsis) and cross over, swapping segments. In metaphase I, homologous pairs line up — each pair can flip independently of any other (independent assortment). In anaphase I, homologs separate to opposite poles (sister chromatids stay together — this is the key difference from mitosis). Telophase I and cytokinesis produce two haploid cells, each with replicated chromosomes.\n\nMeiosis II looks like mitosis of a haploid cell: sister chromatids are finally pulled apart. Four haploid cells result, each with one copy of each chromosome, each genetically different from the others and from the parent cell.\n\nThe math: starting with one diploid cell (2n) with 2n chromosomes after S phase still has 2n structures (as replicated chromosomes). After meiosis I, each daughter has n replicated chromosomes. After meiosis II, each final cell has n chromosomes as single chromatids. Contrast with mitosis, which produces two 2n cells from one 2n cell.",
    keyIdeas: [
      "Meiosis I separates homologs; meiosis II separates sister chromatids.",
      "One diploid → four genetically distinct haploid cells.",
      "Crossing over (prophase I) and independent assortment (metaphase I) generate genetic variation.",
      "Reduction division (2n → n) happens in meiosis I, not II.",
    ],
    commonMistakes: [
      "Saying meiosis II halves chromosome number — it's meiosis I that reduces ploidy.",
      "Drawing sister chromatids separating in meiosis I — they don't.",
      "Forgetting that all four products of meiosis are genetically different.",
    ],
  },
  "5.2": {
    id: "5.2",
    title: "Meiosis and Genetic Diversity",
    summary:
      "Crossing over, independent assortment, and random fertilization together create enormous genetic variation among offspring.",
    lesson:
      "Meiosis is a variation generator. Three mechanisms contribute.\n\nCrossing over during prophase I swaps homologous segments between maternal and paternal chromosomes, producing recombinant chromatids that carry new combinations of alleles. The farther apart two genes are on a chromosome, the more likely crossing over separates them — the basis of genetic mapping.\n\nIndependent assortment during metaphase I means that for each homologous pair, the maternal vs. paternal orientation is random and independent of every other pair. For humans with 23 pairs, that's 2²³ ≈ 8 million possible combinations of chromosomes per gamete, before you even count crossing over.\n\nRandom fertilization multiplies the diversity: any one of ~8 million sperm genotypes can fuse with any one of ~8 million egg genotypes, so even ignoring crossing over, the diversity among potential offspring from one human couple is ≈ 70 trillion.\n\nAll this variation is the raw material evolution acts on. Without recombination and independent assortment, sexually reproducing populations would accumulate mutations but have limited capacity to rearrange them into new combinations — and would adapt far more slowly than they do.",
    keyIdeas: [
      "Crossing over rearranges alleles within a chromosome.",
      "Independent assortment rearranges whole chromosomes — 2ⁿ combinations for n pairs.",
      "Random fertilization compounds the diversity still further.",
      "Meiotic variation is the raw material for natural selection.",
    ],
    commonMistakes: [
      "Confusing crossing over (prophase I) with independent assortment (metaphase I).",
      "Thinking each human gamete is 2²³ — it is the number of possible combinations, not chromosomes.",
      "Forgetting random fertilization as a third major source of variation.",
    ],
  },
  "5.3": {
    id: "5.3",
    title: "Mendelian Genetics",
    summary:
      "Genes come in paired alleles; dominant masks recessive; alleles segregate and assort independently during gamete formation.",
    lesson:
      "Mendel's three laws: Segregation — every gamete carries only one allele for each gene, chosen at random from the diploid parent's pair. Independent Assortment — alleles of different genes segregate independently (true when the genes are on different chromosomes or far apart on the same chromosome). Dominance — in a heterozygote, one allele's phenotype is expressed over the other's.\n\nThe vocabulary matters on the FRQ: genotype (the allele pair), phenotype (the observable trait), homozygous (two copies of the same allele), heterozygous (two different alleles), dominant allele (expressed in heterozygote, usually capitalized), recessive allele (expressed only when homozygous).\n\nPunnett squares organize predictions. A monohybrid Aa × Aa cross gives 1 AA : 2 Aa : 1 aa — a genotype ratio of 1:2:1 and a phenotype ratio of 3:1 (when A is fully dominant). A dihybrid AaBb × AaBb yields the classic 9:3:3:1 phenotype ratio when genes are on separate chromosomes and both follow complete dominance.\n\nThese ratios are predictions, not guarantees. Real data deviate because sample sizes are finite and because linkage, incomplete dominance, codominance, and environmental effects complicate Mendel's simple picture. Chi-square tests (Unit 9 statistical practice) formalize whether a deviation is statistically significant or just sampling noise.",
    keyIdeas: [
      "Segregation: one allele per gamete; independent assortment: alleles for separate genes segregate independently.",
      "3:1 phenotype ratio for Aa × Aa; 9:3:3:1 for AaBb × AaBb.",
      "Genotype (alleles) determines phenotype (observable) via dominance rules.",
      "Predicted ratios assume no linkage, complete dominance, and large samples.",
    ],
    workedExample: {
      prompt:
        "A heterozygous brown-eyed individual (Bb, where B is dominant) mates with a blue-eyed individual (bb). Predict the offspring genotype and phenotype ratios.",
      solution:
        "Gametes: Bb parent produces ½ B, ½ b. bb parent produces all b. Punnett square gives ½ Bb (brown) and ½ bb (blue). Genotype ratio 1 Bb : 1 bb; phenotype ratio 1 brown : 1 blue. This is a test cross — crossing with a homozygous recessive reveals the unknown parent's genotype directly.",
    },
    commonMistakes: [
      "Writing genotypes as phenotypes (or vice versa) on the FRQ.",
      "Assuming 3:1 or 9:3:3:1 without checking the genes are unlinked.",
      "Forgetting to use uppercase for dominant and lowercase for recessive alleles consistently.",
    ],
  },
  "5.4": {
    id: "5.4",
    title: "Non-Mendelian Genetics",
    summary:
      "Incomplete dominance, codominance, multiple alleles, sex linkage, pleiotropy, and epistasis — Mendel's rules don't cover everything.",
    lesson:
      "Mendel's simple dominance and segregation explain some traits, but biology is messier.\n\nIncomplete dominance: the heterozygote shows an intermediate phenotype (red × white snapdragons → pink). Codominance: both alleles express simultaneously (AB blood type has both A and B antigens). Multiple alleles: a gene can have more than two variants in the population (ABO has Iᴬ, Iᴮ, i), though each individual still carries only two.\n\nSex linkage: genes on sex chromosomes (usually the X) produce skewed inheritance patterns. Males (XY) have only one X, so recessive X-linked traits like hemophilia and red-green colorblindness appear much more often in males than females. Y-linked traits pass father to son.\n\nPleiotropy: one gene affects many phenotypes (sickle-cell affects oxygen transport, malaria resistance, and many organs). Epistasis: one gene masks or modifies the expression of another (coat color in Labrador retrievers — e/e masks the B/b gene, producing yellow regardless of B). Polygenic inheritance: many genes contribute to one continuous trait (height, skin color) yielding bell-curve distributions rather than discrete categories.\n\nEnvironmental effects complete the picture. Identical genotypes can produce different phenotypes depending on temperature (Himalayan rabbits' dark fur on cold extremities), diet, or social context. Phenotype = genotype × environment, always.",
    keyIdeas: [
      "Incomplete dominance blends phenotypes; codominance expresses both.",
      "X-linked recessive traits hit males more than females.",
      "Pleiotropy: one gene, many traits. Epistasis: one gene masks another.",
      "Polygenic traits produce continuous, bell-curve distributions.",
    ],
    workedExample: {
      prompt:
        "A color-blind father (X^cY) mates with a carrier mother (X^Cx^c). What is the probability their daughter is color blind? Their son?",
      solution:
        "Daughters inherit one X from each parent: ½ X^C X^c (carrier, normal vision) and ½ X^c X^c (color blind). Sons inherit Y from father and either X^C or X^c from mother: ½ X^C Y (normal) and ½ X^c Y (color blind). So daughters have ½ probability of being color blind; sons also have ½ probability — matching the pattern that X-linked recessive traits hit both sexes when the father is affected.",
    },
    commonMistakes: [
      "Confusing codominance (both expressed) with incomplete dominance (blended).",
      "Forgetting males are hemizygous for X-linked genes.",
      "Treating polygenic traits with Punnett squares as if they were monogenic.",
    ],
  },
  "5.5": {
    id: "5.5",
    title: "Environmental Effects on Phenotype",
    summary:
      "Phenotype is the product of genotype and environment — identical genotypes can express differently under different conditions.",
    lesson:
      "Genes set the range of possible phenotypes; environment determines which one is expressed. Hydrangea flowers are blue in acidic soil and pink in alkaline soil — the plants are genetically identical. Himalayan rabbits have a temperature-sensitive enzyme for fur pigment, producing dark extremities (cool) and pale body (warm). Identical human twins raised in different environments diverge in height, weight, and disease susceptibility despite sharing DNA.\n\nThis theme comes up everywhere in modern biology. Epigenetics — heritable changes in gene expression without DNA sequence change — is a molecular mechanism for environmental influence, with DNA methylation and histone modification responding to diet, stress, and temperature. Phenotypic plasticity lets organisms acclimate to shifting conditions without evolving new alleles; examples include cold acclimation in plants and exercise-induced muscle hypertrophy in animals.\n\nOn the FRQ, watch for prompts that ask why genetically identical organisms can look different, or why genetically different individuals can look similar. The answer almost always routes through environment and gene expression.",
    keyIdeas: [
      "Phenotype = genotype × environment.",
      "Epigenetic modifications (DNA methylation, histone marks) are responsive to environment.",
      "Phenotypic plasticity: one genotype, many phenotypes across conditions.",
      "Natural selection ultimately acts on phenotype, not directly on genotype.",
    ],
    commonMistakes: [
      "Writing phenotype and genotype as synonyms.",
      "Forgetting that epigenetic changes do not change DNA sequence.",
      "Overlooking environment when asked why identical genotypes differ.",
    ],
  },

  // =========================================================================
  // UNIT 6 — GENE EXPRESSION AND REGULATION
  // =========================================================================
  "6.1": {
    id: "6.1",
    title: "DNA and RNA Structure",
    summary:
      "DNA is the double-helix library; RNA is the single-stranded workhorse — structural differences matter for their different jobs.",
    lesson:
      "DNA and RNA are both nucleic acids, but the chemical differences between them encode different roles. DNA has deoxyribose (no 2' OH), is double-stranded, and uses thymine. RNA has ribose (2' OH), is usually single-stranded, and uses uracil. The 2' OH in RNA makes it more reactive and less stable — which is why DNA is the long-term archive and RNA is the disposable message.\n\nDNA's antiparallel double helix has A-T and G-C pairs, major and minor grooves that proteins read, and a 5'→3' directionality that every polymerase obeys. Its structure is a masterpiece of information storage: redundant (two strands with the same information) and stable (intertwined helix, H-bonded core, negatively charged backbone repelling nucleases).\n\nRNA's functional diversity comes from folding. mRNA is a linear message. tRNA folds into a cloverleaf that brings amino acids to the ribosome. rRNA folds into the scaffolds and active sites of ribosomes — ribosomes are ribozymes, with peptide bond formation catalyzed by RNA, not protein. Regulatory RNAs (miRNA, siRNA, lncRNA) have come into focus as major regulators of gene expression over the past two decades.\n\nOn the FRQ, tie structure to function explicitly. Why is DNA double stranded? → Redundancy and templating. Why is RNA single stranded? → Functional flexibility. Why does DNA use thymine? → To detect and repair deaminated cytosines (which become uracil).",
    keyIdeas: [
      "DNA: deoxyribose, double-stranded, thymine, stable archive.",
      "RNA: ribose (2' OH), single-stranded, uracil, reactive and functional.",
      "DNA antiparallel helix; read/written 5'→3' by every polymerase.",
      "Ribosomes are ribozymes — RNA catalyzes peptide bond formation.",
    ],
    commonMistakes: [
      "Writing thymine in RNA or uracil in DNA.",
      "Drawing parallel DNA strands — they are antiparallel.",
      "Forgetting the 2' OH is what makes RNA chemically distinct from DNA.",
    ],
  },
  "6.2": {
    id: "6.2",
    title: "DNA Replication",
    summary:
      "Semiconservative, 5'→3', leading vs lagging strand, proofreading — the copy mechanism that makes heredity work.",
    lesson:
      "DNA replication is semiconservative: each daughter duplex contains one original strand and one new strand. It proceeds 5'→3', with DNA polymerase adding nucleotides to the 3' OH of a growing strand.\n\nThe machinery: helicase unwinds the duplex; single-stranded binding proteins stabilize it; topoisomerase relieves the supercoiling ahead of the fork; primase lays down short RNA primers because DNA polymerase cannot start from nothing; DNA polymerase III (in bacteria) synthesizes new DNA; DNA polymerase I removes primers and fills in; ligase seals the nicks.\n\nBecause synthesis only goes 5'→3', the two template strands are copied differently. The leading strand is synthesized continuously toward the moving fork. The lagging strand is synthesized in short Okazaki fragments away from the fork, each started by its own primer — then primers are removed and fragments are joined by ligase. Same polymerase, same 5'→3' rule, but the geometry forces the lagging strand into chunks.\n\nProofreading by the polymerase (3'→5' exonuclease activity) reduces the error rate to ~1 in 10⁹ — crucial for genome fidelity. Additional mismatch repair systems mop up the errors proofreading misses. Every error that slips through is a potential mutation.",
    keyIdeas: [
      "Semiconservative: each daughter has one old + one new strand.",
      "DNA polymerase adds 5'→3' only; primers are required.",
      "Leading strand is continuous; lagging strand uses Okazaki fragments.",
      "Proofreading + mismatch repair keep error rates low but nonzero.",
    ],
    commonMistakes: [
      "Drawing synthesis 3'→5' — polymerases can't do that.",
      "Forgetting that the lagging strand has primers at every Okazaki fragment, not just at origin.",
      "Confusing DNA pol I (removes primers, fills in) with DNA pol III (main replicative polymerase).",
    ],
  },
  "6.3": {
    id: "6.3",
    title: "Transcription and RNA Processing",
    summary:
      "RNA polymerase copies genes into pre-mRNA, which is then capped, spliced, and tailed to become mature mRNA.",
    lesson:
      "Transcription is DNA → RNA. RNA polymerase (no primer needed) binds promoter DNA, unwinds the duplex locally, and reads the template strand 3'→5' while synthesizing RNA 5'→3'. The RNA is identical to the coding strand except that U replaces T. In eukaryotes, RNA polymerase II transcribes protein-coding genes; pol I transcribes most rRNA, pol III transcribes tRNA and some small RNAs.\n\nIn eukaryotes, pre-mRNA undergoes three modifications. A 5' cap (modified G) is added co-transcriptionally — it protects the mRNA and is recognized by the ribosome. A 3' poly-A tail is added after cleavage — it protects the mRNA from degradation and affects translation efficiency. Splicing removes introns and joins exons, catalyzed by the spliceosome (small nuclear ribonucleoproteins, snRNPs). Alternative splicing lets one gene produce multiple mRNA isoforms, vastly expanding the proteome from a fixed number of genes.\n\nProkaryotes skip most of this: no nucleus, no introns (usually), no capping; transcription and translation are coupled in the cytoplasm. Eukaryotic processing adds regulatory layers but costs time and energy — the tradeoff underlies how eukaryotes achieve complex regulation.",
    keyIdeas: [
      "RNA polymerase binds promoters and synthesizes RNA 5'→3' without a primer.",
      "Template strand is read 3'→5'; RNA sequence matches coding strand (U for T).",
      "Eukaryotic pre-mRNA gets a 5' cap, poly-A tail, and introns spliced out.",
      "Alternative splicing creates multiple proteins from one gene.",
    ],
    commonMistakes: [
      "Confusing template and coding strands.",
      "Forgetting prokaryotes generally lack introns and splicing.",
      "Saying transcription uses a primer — it doesn't.",
    ],
  },
  "6.4": {
    id: "6.4",
    title: "Translation",
    summary:
      "Ribosomes read mRNA codons and assemble polypeptides; tRNAs deliver amino acids one codon at a time.",
    lesson:
      "Translation is mRNA → protein. The genetic code is a triplet code: each three-nucleotide codon specifies one amino acid. The code is nearly universal (strong evidence for common ancestry), redundant (multiple codons per amino acid), and includes a start codon (AUG, also methionine) and three stop codons (UAA, UAG, UGA).\n\ntRNAs are the adaptors. Each tRNA carries a specific amino acid and has an anticodon that pairs with the matching mRNA codon. Aminoacyl-tRNA synthetases (one per amino acid) charge each tRNA with its correct amino acid — the key quality-control step that keeps the code faithful.\n\nThe ribosome has three tRNA-binding sites: A (arriving aminoacyl-tRNA), P (peptidyl, growing chain), and E (exit). At initiation, the small ribosomal subunit finds the 5' cap and scans to the AUG; the large subunit joins and places Met-tRNA in the P site. Elongation cycles: an aminoacyl-tRNA enters A, peptide bond forms (catalyzed by the rRNA), the ribosome translocates one codon, the E-site tRNA exits. Termination happens when a release factor recognizes a stop codon and hydrolyzes the completed polypeptide from the P-site tRNA.\n\nPost-translation, proteins fold (often with chaperones), may be cleaved, may receive sugars or phosphates, and are routed to their destination — membrane, lumen, nucleus, mitochondrion — by signal sequences.",
    keyIdeas: [
      "Codons (3 nt) specify amino acids; the code is universal and redundant.",
      "tRNAs carry amino acids; anticodons pair with codons.",
      "Ribosome sites A → P → E cycle during elongation; rRNA catalyzes peptide bond formation.",
      "Start codon AUG; stop codons UAA, UAG, UGA.",
    ],
    commonMistakes: [
      "Saying translation makes RNA — it makes protein from RNA.",
      "Mixing up codon (mRNA) and anticodon (tRNA).",
      "Forgetting that ribosomes are ribozymes — the catalytic activity is RNA.",
    ],
  },
  "6.5": {
    id: "6.5",
    title: "Regulation of Gene Expression",
    summary:
      "Cells control gene expression at transcription, RNA processing, translation, and protein activity — multiple layers tuned for specificity and speed.",
    lesson:
      "Not every gene is on in every cell. A neuron and a liver cell share the same genome but express very different subsets — the basis of differentiation. Regulation happens at multiple levels.\n\nIn prokaryotes, operons bundle related genes under a single promoter. The lac operon is induced only when lactose is present and glucose is scarce: lactose inactivates the lac repressor, letting RNA polymerase transcribe; low glucose raises cAMP, which recruits CAP to enhance transcription. The trp operon is repressed when tryptophan is abundant — the end product feedback-inhibits its own synthesis. Operons give fast, coordinated responses to environmental changes.\n\nEukaryotes regulate more elaborately. Transcription factors (activators and repressors) bind enhancer and silencer DNA sequences that can be thousands of bases from the promoter; DNA looping brings them together. Chromatin accessibility matters: DNA wrapped tightly around nucleosomes (heterochromatin) is off-limits; loosened, acetylated chromatin (euchromatin) is accessible. DNA methylation at promoter CpG islands silences genes. Alternative splicing and miRNAs control which mRNAs make proteins. Proteasomal degradation controls protein lifespan.\n\nDifferential gene expression is how one genome makes many cell types. A muscle cell is a muscle cell because it expresses muscle-specific transcription factors that turn on muscle-specific genes — a cascade that can be initiated by a single master regulator (MyoD is the classic example).",
    keyIdeas: [
      "Prokaryotes: operons (lac, trp) respond to environment.",
      "Eukaryotes: transcription factors + enhancers/silencers + chromatin state.",
      "DNA methylation and histone modification silence or activate genes.",
      "Differential gene expression underlies cell differentiation.",
    ],
    commonMistakes: [
      "Treating the lac operon as constitutively on — it is inducible.",
      "Confusing enhancer and promoter — enhancers can act at long distances.",
      "Forgetting post-transcriptional layers (miRNAs, splicing, protein degradation).",
    ],
  },
  "6.6": {
    id: "6.6",
    title: "Gene Expression and Cell Specialization",
    summary:
      "Cell differentiation arises from differential gene expression orchestrated by transcription factor networks and signaling from neighbors.",
    lesson:
      "During development, a zygote divides into cells that progressively specialize. Each cell type has the same DNA (with rare exceptions), but they express different genes — which is why they look, behave, and do different things.\n\nMaster regulatory genes at the top of transcription-factor hierarchies initiate differentiation cascades. MyoD is sufficient to drive fibroblasts into muscle cells. The HOX family of transcription factors sets up body plans — their order on the chromosome matches the order of segments they pattern, a stunningly conserved feature across animals.\n\nMorphogens are signaling molecules whose concentration gradient tells cells where they are in the embryo. High Sonic Hedgehog on the ventral side of the neural tube and low on the dorsal side specifies motor neurons vs. interneurons. Cells interpret the local concentration through receptor signaling and switch on the appropriate TF suites.\n\nApoptosis (programmed cell death) is an essential part of development too — sculpting fingers by killing interdigital cells, pruning neuronal connections. Induction, where one tissue influences a neighbor's fate (e.g., the lens induced by optic vesicle contact with ectoderm), stitches the whole picture together. The theme: one genome + regulated differential expression + cell-cell signals = a body.",
    keyIdeas: [
      "All differentiated cells carry the same DNA; they differ in expression patterns.",
      "Master regulators (MyoD, HOX) drive differentiation cascades.",
      "Morphogen gradients provide positional information.",
      "Apoptosis and induction sculpt tissues during development.",
    ],
    commonMistakes: [
      "Thinking differentiated cells lost genes they don't use — they didn't.",
      "Forgetting that HOX gene order on the chromosome mirrors body segment order.",
      "Skipping apoptosis as a constructive developmental process.",
    ],
  },
  "6.7": {
    id: "6.7",
    title: "Mutations",
    summary:
      "DNA sequence changes — point mutations, insertions, deletions, chromosomal rearrangements — are the ultimate source of genetic variation.",
    lesson:
      "Mutations are any change to the DNA sequence. They arise from replication errors, mutagens (UV, radiation, chemicals), or faulty repair. Most are neutral; some are deleterious; occasionally, one is beneficial.\n\nPoint mutations affect a single base. Silent mutations change a codon to a synonymous one — no amino acid change. Missense mutations change one amino acid (sickle-cell's Glu→Val is classic). Nonsense mutations change an amino-acid codon to a stop codon, producing a truncated, usually nonfunctional protein. Frameshift mutations arise from insertions or deletions not in multiples of three — they shift the reading frame downstream, garbling every codon after the mutation site. Frameshifts are usually devastating.\n\nLarger-scale changes include chromosomal rearrangements (deletions, duplications, inversions, translocations) and aneuploidy (extra or missing chromosomes, usually from non-disjunction in meiosis). Down syndrome (trisomy 21) is the best-known aneuploidy.\n\nNot all mutations are bad. Gene duplications give evolution raw material to innovate — a duplicated gene can accumulate changes while the original keeps its function. Mutations in regulatory regions (not protein-coding) can change when and where a gene is expressed without touching the protein. Over evolutionary time, this is a major source of novelty.",
    keyIdeas: [
      "Silent, missense, nonsense, frameshift — four point mutation outcomes.",
      "Frameshifts from insertions/deletions not in multiples of 3 change every downstream codon.",
      "Aneuploidy (e.g., trisomy 21) often results from meiotic non-disjunction.",
      "Mutations in regulatory regions can change expression patterns without altering proteins.",
    ],
    commonMistakes: [
      "Assuming all mutations are harmful — most are neutral; some are beneficial.",
      "Conflating point mutations with frameshifts.",
      "Forgetting that mutations in gametes are heritable; somatic mutations are not.",
    ],
  },
  "6.8": {
    id: "6.8",
    title: "Biotechnology",
    summary:
      "PCR, gel electrophoresis, CRISPR, plasmid cloning, and sequencing are the tools biologists use to read, write, and manipulate DNA.",
    lesson:
      "Biotechnology turns molecular biology into engineering. Core tools you must know:\n\nPCR (polymerase chain reaction) amplifies a specific DNA region using primers and a thermostable polymerase (Taq). Cycles of denaturation (~95 °C), annealing (~55 °C), and extension (~72 °C) double target DNA each cycle — 30 cycles yield roughly a billion-fold amplification. PCR underlies DNA diagnostics, forensics, and most sequencing workflows.\n\nGel electrophoresis separates DNA fragments by size. DNA, negatively charged, migrates through an agarose gel toward the positive electrode; smaller fragments move faster. A ladder of known sizes gives you size by comparison.\n\nRestriction enzymes cut DNA at specific palindromic sequences; ligase glues fragments together. Plasmids, small circular bacterial DNAs, are engineered to carry a gene of interest plus a selection marker and used to transform bacteria — the basis of insulin production, for example.\n\nCRISPR-Cas9 is the current game-changer. A guide RNA targets Cas9 to a specific DNA sequence, where Cas9 cuts. The cell's repair machinery then either introduces small edits (non-homologous end joining) or, with a template, makes precise substitutions (homology-directed repair). CRISPR works in essentially any organism and is fueling both therapy and basic research.\n\nSequencing has moved from Sanger (chain termination, one read at a time) to next-generation massively parallel methods. The result is that reading a human genome takes hours and costs hundreds of dollars, not years and billions.",
    keyIdeas: [
      "PCR: denature, anneal, extend — doubles target DNA each cycle.",
      "Gel electrophoresis separates by size; smaller moves faster toward the positive electrode.",
      "Restriction enzymes + ligase + plasmids enable cloning.",
      "CRISPR-Cas9 cuts at a sequence specified by a guide RNA.",
    ],
    commonMistakes: [
      "Saying DNA migrates toward the negative electrode — phosphates are negative, so it moves toward positive.",
      "Forgetting PCR requires primers to define the amplified region.",
      "Treating CRISPR as magic — it needs a guide RNA plus Cas9 plus cellular repair to finish the edit.",
    ],
  },

  // =========================================================================
  // UNIT 7 — NATURAL SELECTION
  // =========================================================================
  "7.1": {
    id: "7.1",
    title: "Introduction to Natural Selection",
    summary:
      "Heritable variation + differential reproductive success = adaptation. That is Darwin's argument, and it still runs modern biology.",
    lesson:
      "Natural selection needs three ingredients. First, variation: individuals in a population differ in their traits. Second, heritability: those traits are passed to offspring (today we know via genes). Third, differential reproductive success: individuals with some traits leave more surviving offspring than individuals with other traits. Combine these and, over generations, the frequencies of alleles in the population shift toward those associated with higher fitness in the current environment. That shift is evolution.\n\nFitness is not how strong or long-lived an organism is — it is how many offspring it leaves that themselves reproduce. A peacock's tail may reduce survival but boosts mating success enough that the tail trait spreads. Malaria resistance via heterozygous sickle-cell allele reduces survival in some contexts but boosts it where malaria is endemic.\n\nNatural selection is not goal-directed. There is no \"trying\" to become better. Selection acts on whatever variation currently exists; if it exists and is heritable and correlates with reproductive success, it will change in frequency. If none of those conditions holds, nothing happens. This is why evolution produces locally optimized, historically constrained organisms — not perfect ones.",
    keyIdeas: [
      "Three ingredients: variation, heritability, differential reproductive success.",
      "Fitness = reproductive success relative to others in the population.",
      "Selection acts on phenotypes; changes allele frequencies over generations.",
      "Evolution is not goal-directed — it is the consequence of the three ingredients.",
    ],
    commonMistakes: [
      "Defining fitness as strength or longevity instead of reproductive success.",
      "Saying organisms \"adapt\" in their lifetime via selection — individual adaptations are acclimation; selection operates on populations over generations.",
      "Implying selection has a purpose or direction.",
    ],
  },
  "7.2": {
    id: "7.2",
    title: "Natural Selection",
    summary:
      "Directional, stabilizing, and disruptive selection — three patterns for how selection reshapes a trait distribution.",
    lesson:
      "Selection leaves a signature on a trait's distribution.\n\nDirectional selection shifts the mean in one direction. Peppered moths going from light to dark during the Industrial Revolution is a classic example — dark moths were better camouflaged on soot-blackened trees. Antibiotic resistance in bacteria is the version we're living through now.\n\nStabilizing selection favors the average and penalizes extremes, reducing variance. Human birth weight is the canonical case: too small and survival is poor; too large and delivery is risky; mid-sized babies have the best outcomes.\n\nDisruptive selection favors both extremes over the average, increasing variance and potentially leading to bimodal distributions — and sometimes to speciation. Darwin's finches during drought years experienced disruptive selection on beak size: small beaks worked on one seed type, large beaks on another, intermediate beaks on neither.\n\nSexual selection is a related force: mates choose based on showy traits (or battle for access), and the chosen traits spread even if they reduce survival. Peacock tails, deer antlers, and bird song are products of sexual selection — specifically intersexual (mate choice) or intrasexual (competition) selection.",
    keyIdeas: [
      "Directional: shifts the mean. Stabilizing: reduces variance. Disruptive: splits into extremes.",
      "Sexual selection favors mating-success traits even at survival cost.",
      "Graphs of before-and-after trait distributions tell you which type is acting.",
      "Selection produces local adaptation to current conditions, not absolute \"improvement.\"",
    ],
    commonMistakes: [
      "Confusing directional with disruptive on graph-based questions.",
      "Treating stabilizing selection as \"no evolution\" — allele frequencies can still change at loci affecting variance.",
      "Forgetting sexual selection is a distinct mode with distinct signatures.",
    ],
  },
  "7.3": {
    id: "7.3",
    title: "Artificial Selection",
    summary:
      "Humans breed plants and animals for desired traits, producing rapid and dramatic phenotype changes from standing variation.",
    lesson:
      "Artificial selection works the same way as natural selection, except humans determine who reproduces. Ten thousand years of selective breeding turned a wolf ancestor into every dog breed from Chihuahua to Great Dane, turned teosinte into modern corn, and turned wild mustard into broccoli, cauliflower, kale, Brussels sprouts, cabbage, and kohlrabi — all from the same species (Brassica oleracea).\n\nThat same mechanism is how agriculture works. Farmers select for yield, pest resistance, drought tolerance. Animal breeders select for milk production, growth rate, temperament. Results are often fast and dramatic because the underlying alleles already existed as standing variation in the ancestral population; selection just concentrated them.\n\nDarwin used artificial selection as his entry point into natural selection — he argued that if breeders could produce so much change in a few generations with artificial selection, the environment could produce immense change over geological timescales through natural selection. The logic still holds, and the mechanism is identical: differential reproductive success leading to allele frequency change.",
    keyIdeas: [
      "Artificial selection = natural selection with humans choosing parents.",
      "It works on standing variation in the ancestral population.",
      "Effects can be large and fast (dogs, corn, cabbage).",
      "Darwin's argument: if breeders can do this in a few generations, nature can do far more over geological time.",
    ],
    commonMistakes: [
      "Claiming artificial selection \"creates\" new traits — it selects existing variation (with occasional new mutations).",
      "Treating artificial and natural selection as fundamentally different mechanisms.",
      "Ignoring trade-offs: domestic animals often lose traits needed in the wild.",
    ],
  },
  "7.4": {
    id: "7.4",
    title: "Population Genetics",
    summary:
      "Populations evolve when allele frequencies change — selection, drift, migration, mutation, and non-random mating are the five mechanisms.",
    lesson:
      "The population, not the individual, is the unit of evolution. A gene pool is the sum of all alleles in all individuals of a population. Microevolution is change in allele frequencies over generations, and five forces can cause it:\n\n1. Natural selection — differential survival and reproduction based on phenotype.\n2. Genetic drift — random fluctuations in allele frequency due to sampling. Drift matters most in small populations (founder effect, bottleneck).\n3. Gene flow — migration into or out of the population changes the allele mix.\n4. Mutation — the ultimate source of new alleles but a slow force on its own.\n5. Non-random mating — assortative mating or inbreeding changes genotype frequencies (and allele frequencies indirectly via selection against deleterious recessives).\n\nThe Hardy-Weinberg principle gives the null model: in a population with no evolution, allele and genotype frequencies stay constant across generations. Any deviation implies one or more of the five forces is acting. Population genetics is, in effect, the quantitative study of how these forces combine to shape real gene pools.",
    keyIdeas: [
      "Five forces: selection, drift, gene flow, mutation, non-random mating.",
      "Drift matters most in small populations (bottleneck, founder effect).",
      "Gene flow homogenizes; selection differentiates.",
      "Hardy-Weinberg is the no-evolution null; deviations point to which force is acting.",
    ],
    commonMistakes: [
      "Ignoring drift — it operates even without selection.",
      "Confusing microevolution (allele-frequency change) with macroevolution (speciation and above).",
      "Treating mutation alone as sufficient for meaningful short-term evolution — selection/drift do the heavy lifting.",
    ],
  },
  "7.5": {
    id: "7.5",
    title: "Hardy–Weinberg Equilibrium",
    summary:
      "p² + 2pq + q² = 1 is the null model: no evolution in an infinite, randomly mating population with no selection, mutation, or migration.",
    lesson:
      "Hardy-Weinberg is a quantitative null hypothesis. If allele A has frequency p and allele a has frequency q (with p + q = 1), then genotype frequencies are p² (AA), 2pq (Aa), q² (aa) — provided five conditions hold: very large population (no drift), no selection, no mutation, no migration, and random mating.\n\nPractically, you're given a phenotype frequency and asked to find allele frequencies or carrier frequency. Start from q² (frequency of homozygous recessive) because that phenotype is usually the one you can count; take the square root to get q, then p = 1 − q, and compute 2pq for heterozygote frequency.\n\nReal populations almost never meet all five conditions. That's the point: when real data deviate from H-W predictions, the deviation tells you that selection, drift, migration, or something else is acting. H-W is the flat line from which evolutionary signal is measured.\n\nOn the AP FRQ, you'll often see an allele-frequency calculation followed by \"has evolution occurred?\" The answer requires comparing observed to H-W predicted and arguing explicitly about which assumption is being violated.",
    keyIdeas: [
      "p + q = 1 (alleles); p² + 2pq + q² = 1 (genotypes).",
      "Assumes large population, no selection, no mutation, no migration, random mating.",
      "Deviation from H-W means at least one assumption is violated — i.e., evolution is happening.",
      "q² gives the easiest entry point for problems.",
    ],
    workedExample: {
      prompt:
        "In a population of 10,000 people, 16 are homozygous recessive for a disease. Assuming Hardy-Weinberg equilibrium, what fraction are carriers?",
      solution:
        "q² = 16/10000 = 0.0016, so q = 0.04. p = 1 − q = 0.96. Carrier frequency = 2pq = 2(0.96)(0.04) = 0.0768, or about 7.7% — roughly 768 carriers in the population. This is why recessive diseases appear so rare even when carriers are common: (0.04)² is tiny, but 2(0.96)(0.04) is hundreds of times larger.",
    },
    commonMistakes: [
      "Setting q² equal to the entire recessive allele frequency instead of the recessive-phenotype frequency.",
      "Forgetting to take the square root before computing p.",
      "Declaring evolution absent without checking whether observed frequencies actually match p², 2pq, q².",
    ],
  },
  "7.6": {
    id: "7.6",
    title: "Evidence of Evolution",
    summary:
      "Fossils, anatomy, embryology, biogeography, and molecular data converge on one conclusion: common descent with modification.",
    lesson:
      "Evolution is supported by multiple independent lines of evidence, which is why it is the unifying framework of biology.\n\nFossil record: transitional forms (Tiktaalik between fish and tetrapods, Archaeopteryx between dinosaurs and birds, whale ancestors with legs) show stepwise morphological change over time, dated by radiometric methods.\n\nComparative anatomy: homologous structures (human arm, whale flipper, bat wing) share a common bone plan despite very different functions, indicating shared ancestry. Analogous structures (bird wing vs. insect wing) have similar function from different origins — convergent evolution under similar selective pressures. Vestigial structures (whale pelvis, human appendix) are leftovers from ancestors' functional forms.\n\nEmbryology: early development is strikingly similar across vertebrates (pharyngeal arches, tails). Genes and developmental pathways are deeply conserved.\n\nBiogeography: species distributions match geological history — marsupials dominate Australia because Australia separated early; island species resemble nearby mainland species more than distant relatives.\n\nMolecular evidence is the modern clincher. DNA and protein sequences let us build phylogenies that agree, independently, with morphological trees. Conserved genes (cytochrome c, ribosomal RNA, Hox genes) map deep ancestry. Pseudogenes — nonfunctional relics — sit in the same places in closely related species, hard to explain except by descent.",
    keyIdeas: [
      "Fossil, anatomical, embryological, biogeographical, molecular evidence all agree.",
      "Homologous = shared ancestry; analogous = convergence under similar pressures.",
      "Molecular phylogenies independently confirm morphological ones.",
      "Common descent explains patterns no other hypothesis does.",
    ],
    commonMistakes: [
      "Confusing homology with analogy.",
      "Treating gaps in the fossil record as lack of evidence — every transitional fossil is an addition.",
      "Forgetting that molecular evidence is fully independent of morphological evidence.",
    ],
  },
  "7.7": {
    id: "7.7",
    title: "Common Ancestry",
    summary:
      "All life shares a last universal common ancestor, evidenced by shared genetic code, core machinery, and deep biochemical similarities.",
    lesson:
      "All known life uses DNA as genetic material, the same nearly-universal genetic code, the same 20 standard amino acids, ATP as energy currency, and lipid-bilayer membranes. That list of shared features is hard to explain except by common ancestry — the last universal common ancestor (LUCA), probably a prokaryote-like organism that lived roughly 3.5–4 billion years ago.\n\nThe three domains — Bacteria, Archaea, Eukarya — descend from LUCA. Archaea share ribosomal and transcriptional machinery with Eukarya, suggesting that eukaryotes emerged from an archaeal lineage (with later endosymbiotic acquisition of mitochondria and chloroplasts from bacterial lineages).\n\nGenes that remain in essentially all organisms (ribosomal RNA, core metabolic enzymes) are used to construct the universal tree of life. They are conserved because changes to such essential machinery are usually lethal — so they change slowly and retain signal over vast timescales.\n\nCommon ancestry does not mean every feature traces to LUCA. Many traits evolved much later. But the deep features — DNA, protein synthesis, core metabolism — are legacies of that shared origin.",
    keyIdeas: [
      "All life shares DNA, the genetic code, 20 amino acids, ATP, and lipid membranes.",
      "LUCA ≈ 3.5–4 Gya; three domains (Bacteria, Archaea, Eukarya) descend from it.",
      "Eukaryotes likely descend from an archaeal lineage that acquired mitochondria via endosymbiosis.",
      "Deeply conserved genes build the universal tree of life.",
    ],
    commonMistakes: [
      "Saying LUCA was \"the first organism\" — it was the last common ancestor of living lineages, not the origin of life.",
      "Treating the three domains as a progression — they are sister branches.",
      "Confusing deep homology (shared legacy) with analogy.",
    ],
  },
  "7.8": {
    id: "7.8",
    title: "Continuing Evolution",
    summary:
      "Evolution is ongoing and observable — antibiotic resistance, pesticide resistance, and viral evolution are happening in real time.",
    lesson:
      "Evolution isn't a historical process to be studied in fossils — it is happening right now, fast enough to matter on human timescales.\n\nAntibiotic resistance is the textbook example. When an antibiotic is applied, bacteria with resistance alleles (pre-existing or acquired via horizontal gene transfer) survive and reproduce; susceptible bacteria don't. Within days, the population shifts toward resistance. MRSA, multidrug-resistant TB, and CRE are direct consequences. Overuse in medicine and agriculture accelerates the process.\n\nInsecticide and herbicide resistance do the same thing in agriculture. Glyphosate-resistant weeds, Bt-resistant insects, and pyrethroid-resistant mosquitoes are all rapid evolutionary responses to chemical selection pressure.\n\nViral evolution is a constant: influenza and SARS-CoV-2 accumulate mutations and recombinations that can enhance transmission or immune escape, which is why flu shots are updated annually and why new COVID variants emerged.\n\nThese aren't arguments for or against evolution — they are observations of it. They also have public-health weight: understanding evolution is understanding how to stop or slow it, whether by rotating antibiotics, managing refuge populations in agriculture, or designing vaccines that target conserved epitopes.",
    keyIdeas: [
      "Antibiotic, pesticide, and viral evolution are directly observable in real time.",
      "Selection pressure + standing variation + fast generation times = fast evolution.",
      "Horizontal gene transfer spreads resistance alleles across bacterial species.",
      "Evolutionary biology informs public health and agriculture.",
    ],
    commonMistakes: [
      "Saying bacteria \"become resistant\" by learning — they don't; resistant variants survive and reproduce.",
      "Forgetting horizontal gene transfer as a major resistance spreader.",
      "Treating evolution as too slow to matter on human timescales.",
    ],
  },
  "7.9": {
    id: "7.9",
    title: "Phylogeny",
    summary:
      "Phylogenetic trees reconstruct evolutionary history using shared derived characters (synapomorphies) rather than superficial similarities.",
    lesson:
      "A phylogenetic tree shows hypothesized evolutionary relationships. Nodes are common ancestors; tips are living or extinct taxa; branches represent lineages through time. Branch length can represent time or number of changes depending on the tree.\n\nBuilding a tree means identifying synapomorphies — shared derived characters that unite a clade to the exclusion of outgroups. Feathers are a synapomorphy of birds (and their theropod dinosaur ancestors). Four limbs are a synapomorphy of tetrapods. Shared primitive (ancestral) characters do not group — they were already there. Parsimony picks the tree that requires the fewest evolutionary changes to explain the data.\n\nA clade is monophyletic: an ancestor and all its descendants. Paraphyletic groups (like \"reptiles\" excluding birds) include an ancestor and some but not all descendants — they are not valid clades. Polyphyletic groups (unrelated taxa lumped by convergence) are also not valid clades.\n\nModern trees combine morphological and molecular data. Molecular clocks use the steady accumulation of neutral mutations to estimate divergence times; combined with calibration from fossils, they produce dated trees that are cornerstones of evolutionary biology.",
    keyIdeas: [
      "Synapomorphy = shared derived character that defines a clade.",
      "Monophyletic (valid) vs paraphyletic (incomplete) vs polyphyletic (unrelated).",
      "Parsimony picks the tree with the fewest inferred changes.",
      "Molecular clocks + fossil calibration give dated phylogenies.",
    ],
    commonMistakes: [
      "Reading tree rotation as meaningful — nodes can be rotated without changing the topology.",
      "Grouping taxa by superficial (analogous) similarity instead of shared derived characters.",
      "Interpreting tip position left-to-right as \"more advanced\" or \"less advanced.\"",
    ],
  },
  "7.10": {
    id: "7.10",
    title: "Speciation",
    summary:
      "New species arise when populations diverge enough to become reproductively isolated — allopatric (geographic) or sympatric (no physical barrier).",
    lesson:
      "Under the biological species concept, a species is a group of interbreeding populations reproductively isolated from other such groups. Speciation is the process by which one lineage splits into two reproductively isolated ones.\n\nAllopatric speciation happens when a physical barrier (mountain, river, ocean, glacier) splits a population. Each part experiences different selection pressures, drifts independently, and accumulates distinct genetic changes. Over time, even if the barrier lifts, the populations may no longer interbreed — speciation is complete. Darwin's finches, each colonizing a different Galápagos island, are the textbook case.\n\nSympatric speciation happens without geographic isolation, driven by instant reproductive isolation mechanisms. Polyploidy (especially common in plants) is the fastest: a chromosome-doubled individual cannot produce viable offspring with diploid parents, so it is reproductively isolated in one generation. Assortative mating, habitat shifts, and disruptive selection on mating traits can also drive sympatric speciation.\n\nReproductive isolation comes from prezygotic barriers (temporal, behavioral, mechanical, gametic) or postzygotic ones (hybrid inviability, sterility, breakdown). Speciation is usually gradual (punctuated equilibrium debates notwithstanding), and can be reversible if barriers weaken before divergence is complete.",
    keyIdeas: [
      "Allopatric: geographic barrier → divergence → reproductive isolation.",
      "Sympatric: speciation without geographic isolation, often via polyploidy or assortative mating.",
      "Prezygotic and postzygotic barriers prevent gene flow between emerging species.",
      "Polyploidy can produce speciation in a single generation.",
    ],
    commonMistakes: [
      "Treating the biological species concept as universal — it doesn't apply to asexual or fossil organisms.",
      "Conflating speciation with adaptation — you can adapt without speciating.",
      "Forgetting that sympatric speciation is real and common in plants.",
    ],
  },
  "7.11": {
    id: "7.11",
    title: "Variations in Populations",
    summary:
      "Genetic diversity within a population is the raw material for evolution; its loss makes populations fragile.",
    lesson:
      "Genetic diversity is the variety of alleles in a population's gene pool. It's generated by mutation, recombination, and gene flow; it's maintained by large population size and heterozygote advantage (sickle-cell in malarial regions, MHC diversity in immunity); it's eroded by drift, bottlenecks, and strong directional selection.\n\nWhy it matters: diverse populations have more raw material for selection to work with, so they adapt faster when environments change. Low-diversity populations — cheetahs after their Pleistocene bottleneck, many endangered species today — face correlated risks: a single pathogen or environmental shift can wipe out the whole population because few individuals have resistance alleles.\n\nAgriculture has learned this the hard way. Monocultures (cloned crop varieties) are genetically uniform, efficient, and catastrophically vulnerable. The Irish potato famine, Panama disease in bananas, and Southern corn leaf blight all hit genetically uniform crops hard. Conservation biology emphasizes maintaining diversity in endangered species for the same reason.\n\nOn the FRQ, whenever you see \"why is genetic diversity important,\" the answer is adaptive capacity: diversity → resilience to environmental change → long-term population survival.",
    keyIdeas: [
      "Diversity generators: mutation, recombination, gene flow.",
      "Diversity reducers: drift, bottlenecks, strong directional selection.",
      "Low diversity → high vulnerability to pathogens, environmental change.",
      "Diversity is essential for long-term population survival.",
    ],
    commonMistakes: [
      "Confusing allele diversity with individual diversity — the pool matters, not just outward variety.",
      "Forgetting heterozygote advantage as a diversity-maintaining force.",
      "Treating monocultures as optimal just because they're productive short-term.",
    ],
  },
  "7.12": {
    id: "7.12",
    title: "Origins of Life on Earth",
    summary:
      "Abiotic synthesis of monomers, polymer assembly on surfaces, RNA-world self-replication, protocell compartmentalization — the plausible chain from chemistry to life.",
    lesson:
      "The origin of life is still an open research question, but the outline is plausible. Miller-Urey-style experiments showed that amino acids and other biomonomers form abiotically from simulated early-Earth conditions (CH₄, NH₃, H₂, H₂O + electrical sparks). Meteorites contain amino acids, confirming such synthesis happens in space too.\n\nPolymers could have formed on clay or mineral surfaces that concentrate monomers and catalyze bond formation. The RNA world hypothesis proposes that early life used RNA both for information storage (sequence) and catalysis (ribozymes) — ribosomes being the living evidence that RNA is catalytically capable. Later, proteins (more catalytically versatile) took over most enzymes, and DNA (more stable) took over storage, relegating RNA to its modern intermediary roles.\n\nProtocells are another piece — lipid vesicles that form spontaneously from amphiphilic molecules in water, providing compartmentalization. A protocell plus self-replicating RNA gives you something very close to life by the usual definitions.\n\nAges matter. Earth formed ~4.5 Gya; the earliest microbial fossils are ~3.5 Gya; the earliest stromatolites (layered microbial mats) ~3.5 Gya. Photosynthesis evolved perhaps 2.5 Gya, oxygenating the atmosphere (Great Oxidation Event) and enabling aerobic respiration. Eukaryotes appear in the fossil record ~2 Gya; multicellularity ~1 Gya; the Cambrian explosion of animal body plans ~540 Mya. Life has been evolving for most of Earth's history.",
    keyIdeas: [
      "Biomonomers form abiotically (Miller-Urey, meteorites).",
      "RNA world: RNA as both information and catalyst precedes DNA/protein systems.",
      "Protocells from lipid vesicles provide compartmentalization.",
      "Earth ~4.5 Gya, life ~3.5 Gya, photosynthesis ~2.5 Gya, eukaryotes ~2 Gya.",
    ],
    commonMistakes: [
      "Treating abiogenesis as proven rather than a strongly supported hypothesis.",
      "Confusing origin of life with evolution — they are distinct questions.",
      "Saying \"RNA evolved into DNA\" — they co-exist; DNA was recruited later as a more stable archive.",
    ],
  },

  // =========================================================================
  // UNIT 8 — ECOLOGY
  // =========================================================================
  "8.1": {
    id: "8.1",
    title: "Responses to the Environment",
    summary:
      "Organisms respond to environmental cues through behavior and physiology, and those responses reflect evolutionary history.",
    lesson:
      "Organisms sense their environment and respond — and those responses are shaped by selection. Behavioral responses include innate behaviors (fixed action patterns like a moth flying toward light), learned behaviors (classical and operant conditioning), and complex social behaviors (cooperative breeding, altruism explained by kin selection and inclusive fitness).\n\nPhysiological responses include homeostatic regulation (thermoregulation, osmoregulation), circadian rhythms (entrained by light), and seasonal responses (photoperiodism in plants, migration in animals).\n\nSignaling within species organizes social life: mating displays, territorial calls, alarm calls, waggle dances in bees, quorum sensing in bacteria. Between species, signaling includes aposematic coloration (warning predators), mimicry (Batesian and Müllerian), and plant volatiles that summon herbivore predators.\n\nCooperation has an evolutionary rationale despite looking costly to individuals. Hamilton's rule (rB > C) predicts that altruism toward relatives can evolve when the benefit to the recipient times their relatedness outweighs the cost to the actor. This is why workers in social insects sacrifice their own reproduction for their sisters — they share, on average, more genes with sisters than they would with their own offspring in haplodiploid systems.",
    keyIdeas: [
      "Innate vs learned behaviors — both are shaped by selection.",
      "Homeostatic physiology maintains internal stability against external change.",
      "Intraspecific signaling structures mating and social behavior.",
      "Altruism evolves where inclusive fitness benefits exceed individual costs.",
    ],
    commonMistakes: [
      "Treating behavior as separate from evolution — all behaviors have genetic and selective components.",
      "Forgetting that cooperation can be explained by inclusive fitness, not just \"for the good of the species.\"",
      "Mixing up Batesian (harmless mimics a harmful) and Müllerian (two harmful species converge) mimicry.",
    ],
  },
  "8.2": {
    id: "8.2",
    title: "Energy Flow Through Ecosystems",
    summary:
      "Energy flows one way — sun → producers → consumers → decomposers — losing ~90% at each trophic level.",
    lesson:
      "Ecosystems run on energy flow. Photoautotrophs (plants, algae, cyanobacteria) capture sunlight via photosynthesis, fixing CO₂ into organic matter. Chemoautotrophs (some bacteria) do the same using chemical energy from inorganic compounds near hydrothermal vents.\n\nEnergy moves up the food chain. Primary consumers (herbivores) eat producers; secondary consumers (carnivores) eat primary consumers; tertiary consumers eat secondary. Decomposers (bacteria, fungi) break down dead organisms and waste, releasing nutrients for reuse.\n\nThe 10% rule: on average, only about 10% of the energy in one trophic level transfers to the next. The rest is lost as heat (cellular respiration), in undigested waste, or in bodies not eaten. This is why food chains have typically four or five links at most — there is too little energy left to support a higher level.\n\nNet primary productivity (NPP) is the rate at which producers convert solar energy into biomass, minus what they respire. NPP sets the upper bound on everything else in the ecosystem. Tropical rainforests have the highest NPP; deserts and polar regions the lowest. Oceans collectively produce about half of Earth's NPP, mostly via phytoplankton.",
    keyIdeas: [
      "Energy flows one-way; ~10% transferred between trophic levels.",
      "Producers → primary → secondary → tertiary consumers + decomposers.",
      "NPP sets the upper limit on ecosystem productivity.",
      "Energy is lost at each level as heat, waste, and unconsumed biomass.",
    ],
    commonMistakes: [
      "Confusing energy flow (one-way) with nutrient cycling (cyclical).",
      "Forgetting decomposers as a distinct and essential group.",
      "Thinking the 10% rule is exact rather than a rough average.",
    ],
  },
  "8.3": {
    id: "8.3",
    title: "Population Ecology",
    summary:
      "Populations grow exponentially when resources are unlimited (dN/dt = rN) and logistically when they approach carrying capacity K.",
    lesson:
      "Exponential growth (dN/dt = rN) produces a J-shaped curve — unlimited resources, constant per-capita rate r. It happens rarely for long but shows up in invasive species, bacteria in fresh media, and populations recovering from a crash.\n\nLogistic growth adds a carrying capacity K: dN/dt = rN(1 − N/K). As the population approaches K, the growth rate slows because resources become limiting, producing an S-shaped curve. Real populations usually track a logistic pattern and often overshoot K, then crash, oscillating around it.\n\nLife-history strategies fall on a spectrum between two extremes. r-selected species (many small offspring, little parental care, fast generation, high mortality) dominate unstable environments — think mice, dandelions, insects. K-selected species (few large offspring, lots of parental investment, slow generation, high survivorship) dominate stable environments — think elephants, humans, oak trees.\n\nDensity-dependent factors (competition, disease, predation) intensify with population density and regulate populations near K. Density-independent factors (weather, natural disasters) hit regardless of density and can trigger crashes in any population.",
    keyIdeas: [
      "Exponential: dN/dt = rN (J-curve, unlimited).",
      "Logistic: dN/dt = rN(1 − N/K) (S-curve, bounded by K).",
      "r-selected = many small, fast; K-selected = few large, slow.",
      "Density-dependent factors regulate near K; density-independent don't care about density.",
    ],
    workedExample: {
      prompt:
        "A population of 50 rabbits lives in a habitat with carrying capacity K = 500 and intrinsic rate r = 0.2. Estimate the current growth rate dN/dt using the logistic equation.",
      solution:
        "dN/dt = rN(1 − N/K) = 0.2 × 50 × (1 − 50/500) = 0.2 × 50 × 0.9 = 9 rabbits per time unit. The population is well below K, so growth is close to — but slightly slower than — exponential. As N approaches 500, the (1 − N/K) term shrinks toward 0 and growth levels off.",
    },
    commonMistakes: [
      "Using r where rmax is meant, or vice versa.",
      "Forgetting that at N = K, dN/dt = 0 under the logistic model.",
      "Describing species as strictly r or K rather than on a continuum.",
    ],
  },
  "8.4": {
    id: "8.4",
    title: "Effect of Density on Populations",
    summary:
      "Density-dependent and density-independent factors regulate populations differently and in different environments.",
    lesson:
      "Density-dependent factors get stronger as population density rises. Competition for resources intensifies as more individuals share the same pool. Disease transmits more easily in dense populations. Predators can concentrate their effort where prey is abundant. Territorial behavior and stress responses limit reproduction at high density. These factors pull populations toward K and prevent unlimited growth.\n\nDensity-independent factors act regardless of density. A freeze kills the same proportion of plants whether there are ten or ten thousand. A hurricane destroys habitat whether it's full or empty. These factors dominate in unstable environments (deserts, early successional systems) and can cause crashes that density-dependent factors don't predict.\n\nReal populations experience both. Density-independent events open space; density-dependent processes determine what fills it and how fast.\n\nThis distinction matters for management. Density-dependent regulation suggests stable populations near K — good for sustainable harvest planning. Density-independent volatility means populations can crash unpredictably, requiring precautionary buffers. Fisheries, wildlife management, and pest control all turn on correctly identifying which forces dominate a target population.",
    keyIdeas: [
      "Density-dependent factors (competition, disease, predation) scale with density.",
      "Density-independent factors (weather, disasters) act regardless of density.",
      "Density-dependent forces regulate near K; density-independent can crash populations at any density.",
      "Management must identify which forces dominate a given population.",
    ],
    commonMistakes: [
      "Treating competition and weather as the same kind of regulator.",
      "Forgetting that disease spread is density-dependent.",
      "Assuming populations at equilibrium are never crashed by external events.",
    ],
  },
  "8.5": {
    id: "8.5",
    title: "Community Ecology",
    summary:
      "Species interact through competition, predation, mutualism, commensalism, parasitism — shaping each other's abundance and distribution.",
    lesson:
      "A community is all the species in an area. They interact, and those interactions take five main forms.\n\nCompetition: both species negatively affected as they vie for shared resources. Gause's competitive exclusion principle says two species with identical niches cannot coexist indefinitely; one will outcompete the other. Real species usually coexist via resource partitioning — subdividing a niche in time, space, or food type.\n\nPredation/herbivory: one species eats another. Coevolution produces predator weapons and prey defenses (thorns, toxins, camouflage, warning coloration, mimicry).\n\nMutualism: both species benefit. Mycorrhizal fungi-plant relationships, pollinator-flower coevolution, and gut microbiome-host dynamics.\n\nCommensalism: one benefits, the other is unaffected. Barnacles on whales, birds nesting in trees.\n\nParasitism: one benefits at the other's cost. Tapeworms, fleas, and many viruses — parasites evolve to extract resources while keeping hosts alive long enough to reproduce.\n\nKeystone species have an outsized effect on community structure — sea otters eating urchins allow kelp forests to flourish; wolves in Yellowstone reshape river systems by changing elk behavior. Disturbances — fires, floods, storms — reset succession and maintain diversity.",
    keyIdeas: [
      "Five interactions: competition, predation, mutualism, commensalism, parasitism.",
      "Competitive exclusion drives niche partitioning.",
      "Coevolution produces matched predator-prey and mutualist-mutualist traits.",
      "Keystone species and disturbances maintain diversity disproportionately.",
    ],
    commonMistakes: [
      "Confusing commensalism (0,+) with mutualism (+,+).",
      "Forgetting that parasitism is predation on a slower timescale.",
      "Missing the competitive exclusion principle's strong implication for coexistence.",
    ],
  },
  "8.6": {
    id: "8.6",
    title: "Biodiversity",
    summary:
      "Biodiversity spans genes, species, and ecosystems — higher diversity means greater resilience and productivity.",
    lesson:
      "Biodiversity has three levels. Genetic diversity within a species (Unit 7.11) is the raw material of evolution. Species diversity measures richness (number of species) and evenness (how equal their abundances are) in a community. Ecosystem diversity is the variety of habitats and biogeographical regions across a landscape.\n\nDiverse ecosystems are generally more productive, more stable, and more resilient. With more species filling more niches, productivity can fully exploit available energy and nutrients. Functional redundancy — multiple species doing similar jobs — means the loss of one species doesn't collapse the function. This is why diverse grasslands recover from drought faster than low-diversity grasslands, and why coral reefs with high fish diversity rebuild faster after bleaching events.\n\nBiodiversity provides ecosystem services directly useful to humans: pollination (a third of our food), water filtration, soil formation, pest control, climate regulation, medicinal compounds. The loss of biodiversity — the sixth mass extinction in progress — threatens these services and with them the systems that support human life.\n\nConservation biology tries to maintain biodiversity through habitat protection, restoration, corridors between fragmented habitats, captive breeding, invasive species management, and climate policy. The evidence base argues that these interventions work when applied at scale.",
    keyIdeas: [
      "Three levels: genetic, species, ecosystem diversity.",
      "Species diversity = richness + evenness.",
      "Higher diversity → higher productivity, stability, resilience.",
      "Ecosystem services depend on biodiversity; its loss threatens human systems.",
    ],
    commonMistakes: [
      "Equating biodiversity with species count alone — evenness matters too.",
      "Treating ecosystem services as \"extras\" rather than essentials.",
      "Forgetting that genetic diversity within species is part of biodiversity.",
    ],
  },
  "8.7": {
    id: "8.7",
    title: "Disruptions in Ecosystems",
    summary:
      "Natural and human disturbances — fires, floods, invasive species, climate change, pollution — reshape ecosystems, sometimes irreversibly.",
    lesson:
      "Ecosystems are constantly disturbed. Some disturbances are natural and part of the system: fire in chaparral, periodic flooding in riparian zones, hurricane gaps in tropical forests. Communities have often coevolved with these disturbances — lodgepole pine cones only open after fire, prairie plants regenerate from roots after burns. Intermediate-disturbance regimes often produce the highest diversity.\n\nHuman-caused disturbances are different in scale and rate. Habitat destruction (deforestation, urbanization) eliminates habitat outright. Habitat fragmentation cuts large habitats into small disconnected pieces, increasing edge effects and limiting gene flow. Invasive species — introduced outside their native ranges — can outcompete natives that lack coevolved defenses (zebra mussels, cane toads, cheatgrass). Pollution (nutrients, toxins, plastics) changes chemistry; eutrophication of lakes from fertilizer runoff triggers algal blooms, hypoxia, and fish kills.\n\nClimate change is the overarching multiplier. Rising temperatures shift species ranges poleward and upslope; species that can't track the shift are lost. Ocean acidification from CO₂ absorption damages corals and shelled organisms. Phenological mismatches (bloom timing vs. pollinator emergence) disrupt coevolved relationships.\n\nEcological succession — primary after total clearance (glacier retreat, lava fields), secondary after partial disturbance (abandoned farms, burned forests) — describes how ecosystems rebuild. Sometimes succession leads back to the original community; sometimes, after severe or repeated disturbance, to a different stable state. Either way, the AP exam wants you to trace the chain: disturbance → change in species composition → change in ecosystem function → feedback to other systems.",
    keyIdeas: [
      "Disturbance is natural; many communities require it.",
      "Human-caused disturbances (habitat loss, invasives, pollution, climate change) operate on larger and faster scales.",
      "Ecological succession rebuilds communities after disturbance — primary or secondary.",
      "Severe disturbance can push ecosystems to alternative stable states.",
    ],
    commonMistakes: [
      "Treating all disturbance as bad — many communities depend on it.",
      "Confusing primary (starts from bare rock/no soil) with secondary (starts with soil intact) succession.",
      "Ignoring climate change as a multiplier on every other disturbance type.",
    ],
  },
};
