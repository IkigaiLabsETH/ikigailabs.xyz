import { Allowlist, showAllowlist } from '../../modules/Allowlist'
import { claimToken } from '../../modules/Drop/drop.slice'
import { MintPass } from '../../modules/MintPass'
import { showMintPassDetails } from '../../modules/MintPasses'
import { SuccessfulMintModal } from '../../modules/SuccessfulMintModal'
import { SuccessModal } from '../../modules/SuccessModal'

export const modalActions = [showMintPassDetails, showAllowlist, claimToken.fulfilled]

export const MODALS = {
  [showMintPassDetails.type]: (data: any) => <MintPass {...data} />,
  [showAllowlist.type]: () => <Allowlist />,
  [claimToken.fulfilled.type]: (data: any) => (
    <SuccessModal>
      <SuccessfulMintModal {...data} />
    </SuccessModal>
  ),
}
