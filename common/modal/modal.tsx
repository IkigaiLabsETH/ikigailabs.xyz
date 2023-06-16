import { values } from 'ramda'
import { Allowlist, showAllowlist } from '../../modules/Allowlist'
import { interactionProgressAction } from '../../modules/Collection/Token/token.slice'
import { InteractionSteps } from '../../modules/InteractionSteps'
import { MintPass } from '../../modules/MintPass'
import { showMintPassDetails } from '../../modules/MintPasses'

export const modalActions = [showMintPassDetails, showAllowlist, interactionProgressAction]

export const MODALS = {
  [showMintPassDetails.type]: (data: any) => <MintPass {...data} />,
  [showAllowlist.type]: () => <Allowlist />,
  [interactionProgressAction.type]: (steps: any[]) => <InteractionSteps steps={values(steps)} />,
}
