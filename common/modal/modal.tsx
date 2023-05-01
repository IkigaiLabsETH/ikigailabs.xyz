import { values } from 'ramda'
import { Allowlist, showAllowlist } from '../../modules/Allowlist'
import { interactionProgressAction } from '../../modules/Collection/Token/token.slice'
import { claimToken } from '../../modules/Drop/drop.slice'
import { InteractionSteps } from '../../modules/InteractionSteps'
import { MintPass } from '../../modules/MintPass'
import { showMintPassDetails } from '../../modules/MintPasses'
import { SuccessfulMintModal } from '../../modules/SuccessfulMintModal'
import { SuccessModal } from '../../modules/SuccessModal'

export const modalActions = [showMintPassDetails, showAllowlist, claimToken.fulfilled, interactionProgressAction]

export const MODALS = {
  [showMintPassDetails.type]: (data: any) => <MintPass {...data} />,
  [showAllowlist.type]: () => <Allowlist />,
  [claimToken.fulfilled.type]: (data: any) => (
    <SuccessModal>
      <SuccessfulMintModal {...data} />
    </SuccessModal>
  ),
  [interactionProgressAction.type]: (steps: any[]) => <InteractionSteps steps={values(steps)} />,
}
