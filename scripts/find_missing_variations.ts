import { AP_PHYSICS_C_EM_MCQS } from '../lib/mcqs/ap-physics-c-em';
for (const lesson of AP_PHYSICS_C_EM_MCQS) {
  for (const mcq of lesson.mcqs) {
    const m = mcq as any;
    if (!m.variations || m.variations.length === 0) {
      console.log(`${lesson.lessonSlug}\t${m.id}\t${m.question.substring(0, 80).replace(/\n/g, ' ')}`);
    }
  }
}
