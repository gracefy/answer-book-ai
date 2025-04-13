import { oraclePrompt } from './oracle'
import { therapistPrompt } from './therapist'

/**
 * Mapping of character personas to their corresponding prompt configurations.
 *
 * Each entry includes:
 * - label: Display name for UI (e.g. "The Oracle")
 * - color: Gradient class for themed styling
 * - shortPrompt: System prompt for generating short initial responses
 * - longPrompt: System prompt for expanded follow-up explanations
 *
 * Used in prompt selection and to control AI behavior.
 */
export const prompts = {
  oracle: oraclePrompt,
  therapist: therapistPrompt,
}
