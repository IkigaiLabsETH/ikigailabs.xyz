import { Allowlist, showAllowlist } from '../../modules/Allowlist'
import { MintPass } from '../../modules/MintPass'
import { showMintPassDetails } from '../../modules/MintPasses'
import { Modal } from '../types'

export const modalActions = [showMintPassDetails, showAllowlist]

export const MODAL_MAPPING = {
  [showMintPassDetails.type]: Modal.mintPass,
  [showAllowlist.type]: Modal.allowlist,
}

export const MODALS = {
  [showMintPassDetails.type]: (data: any) => <MintPass {...data} />,
  [showAllowlist.type]: () => <Allowlist />,
}
