import { MintPass } from '../../modules/MintPass';
import { showMintPassDetails } from '../../modules/MintPasses';
import { Modal } from '../types';

export const modalActions = [
  showMintPassDetails
]

export const MODAL_MAPPING = {
  [showMintPassDetails.type]: Modal.mintPass
}

export const MODALS = {
  [showMintPassDetails.type]: (data: any) => <MintPass {...data} />
}
