import { claimToken } from '../../modules/Drop/drop.slice'
import { hideModal } from '../../modules/Modal'

export const confettiActions = [claimToken.fulfilled, hideModal]
