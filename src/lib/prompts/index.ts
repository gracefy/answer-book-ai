import { oraclePrompt } from './oracle'
import { therapistPrompt } from './therapist'

// Build prompts for different personas
// Each persona contains:
// - label: Display name
// - color: Gradient color used for UI theme
// - shortPrompt: Used for the first, short response
// - longPrompt: Used for expanded explanations when user clicks to reveal more
export const prompts = {
  oracle: oraclePrompt,
  therapist: therapistPrompt,
}
