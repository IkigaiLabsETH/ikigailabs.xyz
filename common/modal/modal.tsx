import { values } from 'ramda'
import { Allowlist, showAllowlist } from '../../modules/Allowlist'
import { MintPass } from '../../modules/MintPass'
import { showMintPassDetails } from '../../modules/MintPasses'
import { mintSuccess } from '../../modules/Drop'
import { SuccessfulModal } from '../../modules/Drop/SuccessModal'
import { changeRoute } from '../app'

export const openModalActions = [
  showMintPassDetails,
  showAllowlist,
  mintSuccess,
]
export const closeModalActions = [changeRoute]

export const MODALS = {
  [showMintPassDetails.type]: (data: any) => <MintPass {...data} />,
  [showAllowlist.type]: () => <Allowlist />,
  [mintSuccess.type]: (data: any) => <SuccessfulModal {...data} />,
}
